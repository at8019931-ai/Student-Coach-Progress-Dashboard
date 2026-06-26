// ─────────────────────────────────────────────────────────────────────────────
// GET    /api/coach-profiles/[id]   — fetch a single profile
// PATCH  /api/coach-profiles/[id]   — partial update
// DELETE /api/coach-profiles/[id]   — archive (soft delete)
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { ccQuery }                   from '@/lib/cc-db'
import {
  getProfileById,
  publishProfile,
  unpublishProfile,
  recordVersionChange,
} from '@/services/coach-profile.service'

export const runtime = 'nodejs'

type Params = { params: Promise<{ id: string }> }

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params
  try {
    const profile = await getProfileById(id)
    if (!profile) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(profile)
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const { id } = await params
  let body: Record<string, unknown>

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Allowed updatable fields (whitelist prevents mass assignment)
  const allowed = new Set([
    'display_name', 'title', 'headline', 'location',
    'fide_rating', 'rapid_rating', 'blitz_rating', 'peak_rating',
    'fide_id', 'lichess_username', 'chess_com_username',
    'years_coaching', 'years_playing',
    'short_bio', 'full_bio', 'coaching_philosophy',
    'key_highlights', 'parent_intro', 'website_summary',
    'specializations', 'languages', 'certifications',
    'tournaments', 'achievements', 'teaching_formats',
    'profile_status', 'is_public',
  ])

  const updates = Object.entries(body).filter(([k]) => allowed.has(k))
  if (updates.length === 0) {
    return NextResponse.json({ error: 'No updatable fields provided' }, { status: 400 })
  }

  // Handle publish/unpublish via status change
  if (body.profile_status === 'published') {
    await publishProfile(id, 'admin')
    return NextResponse.json({ ok: true, action: 'published' })
  }
  if (body.profile_status === 'draft') {
    await unpublishProfile(id, 'admin')
    return NextResponse.json({ ok: true, action: 'unpublished' })
  }

  // Build dynamic SET clause
  const setClauses = updates.map(([k], i) => `${k} = $${i + 2}`)
  const values     = updates.map(([, v]) =>
    Array.isArray(v) ? v : v,
  )

  try {
    await ccQuery(
      `UPDATE coach_profiles SET ${setClauses.join(', ')} WHERE id = $1`,
      [id, ...values],
    )
    await recordVersionChange(id, 'admin', 'manual_edit', `Updated fields: ${updates.map(([k]) => k).join(', ')}`)
    const updated = await getProfileById(id)
    return NextResponse.json(updated)
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params
  try {
    await ccQuery(
      `UPDATE coach_profiles SET profile_status = 'archived', is_public = false WHERE id = $1`,
      [id],
    )
    return NextResponse.json({ ok: true, archived: id })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
