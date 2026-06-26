// ─────────────────────────────────────────────────────────────────────────────
// Coach Profile Service — main orchestration layer
//
// Coordinates: form intake → validation → duplicate check →
//              photo processing → AI generation → DB persistence → notifications
// ─────────────────────────────────────────────────────────────────────────────

import { ccQuery } from '@/lib/cc-db'
import { validateFormData, formDataToAIInput } from '@/lib/coach-profiles/validator'
import { generateCoachProfile }               from '@/lib/ai/profile-generator'
import { processCoachPhoto }                  from '@/lib/coach-profiles/image-processor'

import type {
  CoachProfile,
  CoachProfileWithMeta,
  RawFormData,
  AdminDashboardStats,
  NotificationEventType,
  FormSubmission,
  CoachProfileVersion,
  AIGeneratedContent,
} from '@/types/coach-profiles'

// ─── Form submission entry point ──────────────────────────────────────────────
export interface ProcessSubmissionResult {
  profileId:   string
  isNew:       boolean
  warnings:    string[]
  photoError?: string
}

export async function processFormSubmission(
  rawData: RawFormData,
): Promise<ProcessSubmissionResult> {

  // 1. Log the raw submission
  await logFormSubmission(rawData)

  // 2. Validate
  const validation = validateFormData(rawData)
  if (!validation.success) {
    const errorMsg = validation.errors?.map(e => e.message).join('; ') ?? 'Validation failed'
    await markSubmissionError(rawData.submissionId, errorMsg)
    throw new Error(`Validation failed: ${errorMsg}`)
  }

  const data = validation.data!
  const warnings = validation.warnings

  // 3. Duplicate / existing profile detection
  const existing = await findExistingProfile(data.email)
  let profileId: string
  let isNew = false

  if (existing) {
    // Update the existing profile
    profileId = existing.id
    await updateProfileFromFormData(profileId, data, rawData)
    await createNotification('profile_updated', profileId, {
      name:  data.fullName,
      email: data.email,
    })
  } else {
    // Create a new profile (first find or create the coach row)
    const coachId = await findOrCreateCoach(data.email, data.fullName)
    profileId = await createCoachProfile(coachId, data, rawData)
    isNew = true
    await createNotification('profile_created', profileId, {
      name:  data.fullName,
      email: data.email,
    })
  }

  // 4. Process photo (non-blocking — errors stored in metadata)
  let photoError: string | undefined
  if (data.photoDriveId) {
    const photoResult = await processCoachPhoto(data.photoDriveId, profileId)
    if (photoResult.error) {
      photoError = photoResult.error
      await createNotification('photo_missing', profileId, { error: photoResult.error })
    } else {
      await ccQuery(
        `UPDATE coach_profiles SET primary_photo_url = $1, photo_drive_id = $2, photo_metadata = $3 WHERE id = $4`,
        [photoResult.publicUrl, data.photoDriveId, JSON.stringify(photoResult.metadata), profileId],
      )
    }
  } else {
    warnings.push('No photo Drive ID — skipping photo processing')
    await createNotification('photo_missing', profileId, { reason: 'No photo provided in form' })
  }

  // 5. Trigger AI generation asynchronously
  //    (we don't await here — the API route for /generate can be called separately,
  //     or a background job can pick it up via the pending_review status)
  triggerAIGeneration(profileId, data.email).catch(err => {
    console.error(`[CoachProfileService] Background AI generation failed for ${profileId}:`, err)
    createNotification('generation_failed', profileId, { error: String(err) }).catch(() => {})
  })

  // 6. Mark submission as processed
  await markSubmissionProcessed(rawData.submissionId, profileId)

  return { profileId, isNew, warnings, photoError }
}

// ─── AI generation (called directly or from processFormSubmission) ─────────────
export async function triggerAIGeneration(
  profileId: string,
  changedBy = 'system',
): Promise<AIGeneratedContent> {
  const profiles = await ccQuery<CoachProfile>(
    `SELECT * FROM coach_profiles WHERE id = $1`,
    [profileId],
  )
  const profile = profiles[0]
  if (!profile) throw new Error(`Profile not found: ${profileId}`)

  const aiInput = formDataToAIInput({
    submissionId:      profile.form_submission_id ?? profileId,
    timestamp:         profile.created_at,
    fullName:          profile.display_name ?? 'Unknown Coach',
    email:             '',
    title:             profile.title ?? undefined,
    location:          profile.location ?? undefined,
    yearsCoaching:     String(profile.years_coaching ?? ''),
    yearsPlaying:      String(profile.years_playing ?? ''),
    fideRating:        String(profile.fide_rating ?? ''),
    rapidRating:       String(profile.rapid_rating ?? ''),
    blitzRating:       String(profile.blitz_rating ?? ''),
    peakRating:        String(profile.peak_rating ?? ''),
    fideId:            profile.fide_id ?? undefined,
    lichessUsername:   profile.lichess_username ?? undefined,
    chessComUsername:  profile.chess_com_username ?? undefined,
    specializations:   profile.specializations.join(', '),
    languages:         profile.languages.join(', '),
    certifications:    JSON.stringify(profile.certifications),
    tournaments:       JSON.stringify(profile.tournaments),
    achievements:      JSON.stringify(profile.achievements),
    bio:               profile.raw_form_data?.['bio'] as string | undefined,
    coachingPhilosophy:profile.raw_form_data?.['coachingPhilosophy'] as string | undefined,
  })

  const generated = await generateCoachProfile(aiInput)

  await ccQuery(
    `UPDATE coach_profiles SET
       short_bio           = $1,
       full_bio            = $2,
       coaching_philosophy = $3,
       key_highlights      = $4,
       parent_intro        = $5,
       website_summary     = $6,
       ai_generated_at     = now(),
       ai_model_used       = 'claude-opus-4-8',
       ai_generation_count = ai_generation_count + 1,
       profile_status      = CASE WHEN profile_status = 'draft' THEN 'pending_review'::profile_status ELSE profile_status END
     WHERE id = $7`,
    [
      generated.short_bio,
      generated.full_bio,
      generated.coaching_philosophy,
      generated.key_highlights,
      generated.parent_intro,
      generated.website_summary,
      profileId,
    ],
  )

  // Record version snapshot
  await recordVersionChange(profileId, changedBy, 'ai_generation', 'AI profile content generated')

  return generated
}

// ─── CRUD helpers ─────────────────────────────────────────────────────────────
async function findExistingProfile(email: string): Promise<CoachProfile | null> {
  const rows = await ccQuery<CoachProfile>(
    `SELECT cp.*
       FROM coach_profiles cp
       JOIN coaches c ON c.id = cp.coach_id
       JOIN profiles p ON p.id = c.user_id
      WHERE p.email = $1
      LIMIT 1`,
    [email],
  )
  return rows[0] ?? null
}

async function findOrCreateCoach(email: string, fullName: string): Promise<string> {
  // Try to find existing coach by email through profiles join
  const existing = await ccQuery<{ id: string }>(
    `SELECT c.id FROM coaches c
       JOIN profiles p ON p.id = c.user_id
      WHERE p.email = $1 LIMIT 1`,
    [email],
  )
  if (existing[0]) return existing[0].id

  // Create a minimal profile + coach row
  const profileRows = await ccQuery<{ id: string }>(
    `INSERT INTO profiles (email, full_name, role)
     VALUES ($1, $2, 'coach')
     ON CONFLICT (email) DO UPDATE SET full_name = EXCLUDED.full_name
     RETURNING id`,
    [email, fullName],
  )
  const userId = profileRows[0].id

  const coachRows = await ccQuery<{ id: string }>(
    `INSERT INTO coaches (user_id) VALUES ($1)
     ON CONFLICT (user_id) DO NOTHING
     RETURNING id`,
    [userId],
  )
  return coachRows[0]?.id ?? (
    await ccQuery<{ id: string }>(
      `SELECT id FROM coaches WHERE user_id = $1`,
      [userId],
    )
  )[0].id
}

async function createCoachProfile(
  coachId: string,
  data: ReturnType<typeof validateFormData>['data'] & object,
  rawData: RawFormData,
): Promise<string> {
  const rows = await ccQuery<{ id: string }>(
    `INSERT INTO coach_profiles (
       coach_id, display_name, title, location,
       fide_id, lichess_username, chess_com_username,
       profile_status, form_submission_id, raw_form_data
     ) VALUES ($1,$2,$3,$4,$5,$6,$7,'draft',$8,$9)
     ON CONFLICT (coach_id) DO UPDATE SET
       display_name = EXCLUDED.display_name,
       form_submission_id = EXCLUDED.form_submission_id,
       raw_form_data = EXCLUDED.raw_form_data
     RETURNING id`,
    [
      coachId,
      (data as RawFormData).fullName,
      (data as RawFormData).title ?? null,
      (data as RawFormData).location ?? null,
      (data as RawFormData).fideId ?? null,
      (data as RawFormData).lichessUsername ?? null,
      (data as RawFormData).chessComUsername ?? null,
      rawData.submissionId,
      JSON.stringify(rawData),
    ],
  )
  return rows[0].id
}

async function updateProfileFromFormData(
  profileId: string,
  data: ReturnType<typeof validateFormData>['data'] & object,
  rawData: RawFormData,
): Promise<void> {
  await ccQuery(
    `UPDATE coach_profiles SET
       display_name        = COALESCE($1, display_name),
       title               = COALESCE($2, title),
       location            = COALESCE($3, location),
       fide_id             = COALESCE($4, fide_id),
       lichess_username    = COALESCE($5, lichess_username),
       chess_com_username  = COALESCE($6, chess_com_username),
       form_submission_id  = $7,
       raw_form_data       = $8
     WHERE id = $9`,
    [
      (data as RawFormData).fullName,
      (data as RawFormData).title ?? null,
      (data as RawFormData).location ?? null,
      (data as RawFormData).fideId ?? null,
      (data as RawFormData).lichessUsername ?? null,
      (data as RawFormData).chessComUsername ?? null,
      rawData.submissionId,
      JSON.stringify(rawData),
      profileId,
    ],
  )
}

// ─── Form submission log ──────────────────────────────────────────────────────
async function logFormSubmission(rawData: RawFormData): Promise<void> {
  await ccQuery(
    `INSERT INTO form_submissions (submission_id, form_type, raw_data)
     VALUES ($1, 'coach_profile', $2)
     ON CONFLICT (submission_id) DO UPDATE SET raw_data = EXCLUDED.raw_data`,
    [rawData.submissionId, JSON.stringify(rawData)],
  )
}

async function markSubmissionProcessed(submissionId: string, profileId: string): Promise<void> {
  await ccQuery(
    `UPDATE form_submissions
       SET processed = true, processed_at = now(), coach_profile_id = $1
     WHERE submission_id = $2`,
    [profileId, submissionId],
  )
}

async function markSubmissionError(submissionId: string, error: string): Promise<void> {
  await ccQuery(
    `UPDATE form_submissions
       SET retry_count = retry_count + 1, error_message = $1
     WHERE submission_id = $2`,
    [error, submissionId],
  )
}

// ─── Version history ──────────────────────────────────────────────────────────
export async function recordVersionChange(
  profileId: string,
  changedBy: string,
  source: string,
  summary: string,
): Promise<void> {
  // The DB trigger handles the actual snapshot — this just updates metadata
  await ccQuery(
    `UPDATE coach_profile_versions
       SET changed_by = $1, change_source = $2::change_source, change_summary = $3
     WHERE coach_profile_id = $4
       AND version_number = (
         SELECT MAX(version_number) FROM coach_profile_versions WHERE coach_profile_id = $4
       )`,
    [changedBy, source, summary, profileId],
  )
}

// ─── Admin notifications ──────────────────────────────────────────────────────
export async function createNotification(
  type: NotificationEventType,
  profileId: string,
  metadata: Record<string, unknown> = {},
): Promise<void> {
  const titles: Record<NotificationEventType, string> = {
    profile_created:    'New coach profile created',
    profile_updated:    'Coach profile updated',
    generation_failed:  'AI generation failed',
    photo_missing:      'Coach photo missing or failed',
    photo_processed:    'Coach photo processed',
    profile_published:  'Profile published',
    duplicate_detected: 'Duplicate profile detected',
  }

  const messages: Record<NotificationEventType, string> = {
    profile_created:    `A new profile was created for ${metadata.name ?? 'a coach'} (${metadata.email ?? ''})`,
    profile_updated:    `Profile updated for ${metadata.name ?? 'a coach'} via form submission`,
    generation_failed:  `AI generation failed: ${metadata.error ?? 'Unknown error'}`,
    photo_missing:      `No profile photo for coach — please review`,
    photo_processed:    `Photo processed and saved successfully`,
    profile_published:  `Profile is now live on the website`,
    duplicate_detected: `A duplicate submission was detected for ${metadata.email ?? 'unknown email'}`,
  }

  await ccQuery(
    `INSERT INTO admin_notifications (type, coach_profile_id, title, message, metadata)
     VALUES ($1, $2, $3, $4, $5)`,
    [type, profileId, titles[type], messages[type], JSON.stringify(metadata)],
  )
}

// ─── Publish / unpublish ──────────────────────────────────────────────────────
export async function publishProfile(profileId: string, adminEmail: string): Promise<void> {
  await ccQuery(
    `UPDATE coach_profiles
       SET profile_status = 'published', is_public = true, published_at = now()
     WHERE id = $1`,
    [profileId],
  )
  await recordVersionChange(profileId, adminEmail, 'admin_action', 'Profile published')
  await createNotification('profile_published', profileId, {})
}

export async function unpublishProfile(profileId: string, adminEmail: string): Promise<void> {
  await ccQuery(
    `UPDATE coach_profiles
       SET profile_status = 'draft', is_public = false
     WHERE id = $1`,
    [profileId],
  )
  await recordVersionChange(profileId, adminEmail, 'admin_action', 'Profile unpublished')
}

// ─── Fetch helpers ────────────────────────────────────────────────────────────
export async function getProfileById(id: string): Promise<CoachProfileWithMeta | null> {
  const rows = await ccQuery<CoachProfileWithMeta>(
    `SELECT cp.*,
            p.email    AS coach_email,
            p.full_name AS coach_display_name,
            c.is_active AS coach_is_active,
            (SELECT COUNT(*) FROM coach_profile_versions v WHERE v.coach_profile_id = cp.id)::int AS version_count
       FROM coach_profiles cp
       JOIN coaches  c ON c.id = cp.coach_id
       JOIN profiles p ON p.id = c.user_id
      WHERE cp.id = $1`,
    [id],
  )
  return rows[0] ?? null
}

export async function listProfiles(
  status?: string,
  limit = 50,
  offset = 0,
): Promise<CoachProfileWithMeta[]> {
  const whereClause = status ? `WHERE cp.profile_status = $3::profile_status` : ''
  const params: unknown[] = [limit, offset]
  if (status) params.push(status)

  return ccQuery<CoachProfileWithMeta>(
    `SELECT cp.*,
            p.email     AS coach_email,
            p.full_name AS coach_display_name,
            c.is_active AS coach_is_active
       FROM coach_profiles cp
       JOIN coaches  c ON c.id = cp.coach_id
       JOIN profiles p ON p.id = c.user_id
     ${whereClause}
      ORDER BY cp.updated_at DESC
      LIMIT $1 OFFSET $2`,
    params,
  )
}

export async function getAdminDashboardStats(): Promise<AdminDashboardStats> {
  const [countRows, recentRows, notifRows] = await Promise.all([
    ccQuery<{ status: string; cnt: string }>(
      `SELECT profile_status AS status, COUNT(*)::int AS cnt
         FROM coach_profiles GROUP BY profile_status`,
    ),
    listProfiles(undefined, 5, 0),
    ccQuery<{ cnt: string }>(
      `SELECT COUNT(*)::int AS cnt FROM admin_notifications WHERE is_read = false`,
    ),
  ])

  const counts: Record<string, number> = {}
  for (const row of countRows) counts[row.status] = Number(row.cnt)

  const [missingPhotoRow, needsAIRow] = await Promise.all([
    ccQuery<{ cnt: string }>(
      `SELECT COUNT(*)::int AS cnt FROM coach_profiles WHERE primary_photo_url IS NULL`,
    ),
    ccQuery<{ cnt: string }>(
      `SELECT COUNT(*)::int AS cnt FROM coach_profiles WHERE ai_generated_at IS NULL`,
    ),
  ])

  return {
    total:          Object.values(counts).reduce((s, n) => s + n, 0),
    published:      counts['published']      ?? 0,
    draft:          counts['draft']          ?? 0,
    pending_review: counts['pending_review'] ?? 0,
    missing_photo:  Number(missingPhotoRow[0]?.cnt ?? 0),
    needs_ai:       Number(needsAIRow[0]?.cnt ?? 0),
    recent_updates: recentRows,
    unread_notifications: Number(notifRows[0]?.cnt ?? 0),
  }
}

export async function getProfileVersions(profileId: string): Promise<CoachProfileVersion[]> {
  return ccQuery<CoachProfileVersion>(
    `SELECT * FROM coach_profile_versions
      WHERE coach_profile_id = $1
      ORDER BY version_number DESC
      LIMIT 20`,
    [profileId],
  )
}

// ─── Generate HTML export ─────────────────────────────────────────────────────
export function generateProfileHTML(profile: CoachProfileWithMeta): string {
  const rating = profile.fide_rating
    ? `FIDE ${profile.fide_rating}`
    : profile.rapid_rating
    ? `Rapid ${profile.rapid_rating}`
    : ''

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${profile.display_name ?? 'Coach'} — CircleChess</title>
<style>
  body{font-family:Georgia,serif;max-width:800px;margin:40px auto;padding:0 20px;color:#1a1a1a;line-height:1.7}
  h1{font-size:2rem;margin-bottom:4px}
  .subtitle{color:#666;font-size:1.1rem;margin-bottom:20px}
  .photo{width:180px;height:180px;border-radius:50%;object-fit:cover;float:right;margin:0 0 20px 30px}
  .badge{display:inline-block;background:#1a1a2e;color:#fff;padding:4px 12px;border-radius:20px;font-size:.85rem;margin:2px}
  h2{font-size:1.3rem;border-bottom:2px solid #e5e5e5;padding-bottom:6px;margin-top:32px}
  ul{padding-left:20px}
  li{margin-bottom:6px}
  @media print{body{margin:20px}.photo{width:140px;height:140px}}
</style>
</head>
<body>
${profile.primary_photo_url ? `<img class="photo" src="${profile.primary_photo_url}" alt="${profile.display_name}">` : ''}
<h1>${profile.display_name ?? 'Coach'}</h1>
<div class="subtitle">${[profile.title, rating, profile.location].filter(Boolean).join(' · ')}</div>
${profile.specializations.map(s => `<span class="badge">${s}</span>`).join('')}
<div style="clear:both"></div>

${profile.short_bio ? `<p>${profile.short_bio}</p>` : ''}

${profile.full_bio ? `<h2>Biography</h2><p>${profile.full_bio.replace(/\n/g, '</p><p>')}</p>` : ''}
${profile.coaching_philosophy ? `<h2>Coaching Philosophy</h2><p>${profile.coaching_philosophy}</p>` : ''}
${profile.key_highlights?.length ? `<h2>Highlights</h2><ul>${profile.key_highlights.map(h => `<li>${h}</li>`).join('')}</ul>` : ''}
${profile.parent_intro ? `<h2>For Parents</h2><p>${profile.parent_intro}</p>` : ''}
</body>
</html>`
}
