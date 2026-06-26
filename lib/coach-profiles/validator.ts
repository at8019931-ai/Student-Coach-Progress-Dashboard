// ─────────────────────────────────────────────────────────────────────────────
// Coach profile data validator
// Uses Zod to validate incoming form submissions before processing
// ─────────────────────────────────────────────────────────────────────────────

import { z } from 'zod'
import type { RawFormData, AIGenerationInput } from '@/types/coach-profiles'

// ─── Raw form data schema ─────────────────────────────────────────────────────
export const rawFormDataSchema = z.object({
  submissionId: z.string().min(1, 'submissionId is required'),
  timestamp:    z.string().min(1, 'timestamp is required'),
  fullName:     z.string().min(2, 'Full name must be at least 2 characters').max(120),
  email:        z.string().email('Invalid email address'),
  phone:        z.string().max(30).optional(),
  location:     z.string().max(120).optional(),

  title:               z.string().max(100).optional(),
  headline:            z.string().max(200).optional(),
  bio:                 z.string().max(2000).optional(),
  coachingPhilosophy:  z.string().max(2000).optional(),

  fideRating:          z.string().regex(/^\d{0,4}$/, 'FIDE rating must be a number up to 4 digits').optional(),
  rapidRating:         z.string().regex(/^\d{0,4}$/).optional(),
  blitzRating:         z.string().regex(/^\d{0,4}$/).optional(),
  peakRating:          z.string().regex(/^\d{0,4}$/).optional(),
  fideId:              z.string().max(20).optional(),
  lichessUsername:     z.string().max(50).optional(),
  chessComUsername:    z.string().max(50).optional(),

  yearsCoaching:       z.string().regex(/^\d{0,2}$/, 'Years must be a number').optional(),
  yearsPlaying:        z.string().regex(/^\d{0,2}$/).optional(),

  specializations:     z.string().max(500).optional(),
  languages:           z.string().max(200).optional(),
  teachingFormats:     z.string().max(200).optional(),
  certifications:      z.string().max(2000).optional(),
  tournaments:         z.string().max(2000).optional(),
  achievements:        z.string().max(2000).optional(),

  photoDriveId:        z.string().max(200).optional(),
  photoDriveUrl:       z.string().max(500).optional(),
}).passthrough()   // allow unknown extra form fields

export type ValidatedFormData = z.infer<typeof rawFormDataSchema>

// ─── Validate raw form data ───────────────────────────────────────────────────
export interface ValidationResult {
  success: boolean
  data?:   ValidatedFormData
  errors?: z.ZodError['errors']
  warnings: string[]
}

export function validateFormData(raw: RawFormData): ValidationResult {
  const result = rawFormDataSchema.safeParse(raw)
  const warnings: string[] = []

  if (!result.success) {
    return { success: false, errors: result.error.errors, warnings }
  }

  const data = result.data

  // Soft warnings (don't block processing but log for admin review)
  if (!data.fideRating && !data.rapidRating && !data.blitzRating) {
    warnings.push('No chess ratings provided — profile will not show rating information')
  }
  if (!data.bio && !data.coachingPhilosophy) {
    warnings.push('No bio or coaching philosophy — AI will generate from minimal data')
  }
  if (!data.photoDriveId && !data.photoDriveUrl) {
    warnings.push('No profile photo provided')
  }
  if (!data.yearsCoaching) {
    warnings.push('Years of coaching experience not provided')
  }

  return { success: true, data, warnings }
}

// ─── Parse comma-separated strings into arrays ────────────────────────────────
function parseCSV(value?: string): string[] {
  if (!value) return []
  return value.split(',').map(s => s.trim()).filter(Boolean)
}

// ─── Parse safe integer ───────────────────────────────────────────────────────
function safeInt(value?: string): number | null {
  if (!value) return null
  const n = parseInt(value, 10)
  return isNaN(n) ? null : n
}

// ─── Try to parse JSON array from freetext ────────────────────────────────────
function parseFreeTextArray<T>(value?: string): T[] {
  if (!value) return []
  const trimmed = value.trim()

  // Try JSON first
  if (trimmed.startsWith('[')) {
    try { return JSON.parse(trimmed) } catch { /* fall through */ }
  }

  // Line-by-line fallback: each line becomes a minimal object
  // This handles coaches who type one item per line
  return trimmed
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => ({ title: line, description: line, name: line, issuer: '', result: line })) as unknown as T[]
}

// ─── Map validated form data to AIGenerationInput ────────────────────────────
export function formDataToAIInput(data: ValidatedFormData): AIGenerationInput {
  return {
    fullName:         data.fullName,
    title:            data.title ?? null,
    location:         data.location ?? null,
    yearsCoaching:    safeInt(data.yearsCoaching),
    yearsPlaying:     safeInt(data.yearsPlaying),
    fideRating:       safeInt(data.fideRating),
    rapidRating:      safeInt(data.rapidRating),
    blitzRating:      safeInt(data.blitzRating),
    peakRating:       safeInt(data.peakRating),
    fideId:           data.fideId ?? null,
    lichessUsername:  data.lichessUsername ?? null,
    chessComUsername: data.chessComUsername ?? null,
    specializations:  parseCSV(data.specializations),
    languages:        parseCSV(data.languages),
    teachingFormats:  parseCSV(data.teachingFormats).map(f => ({ format: f as 'group' })),
    certifications:   parseFreeTextArray(data.certifications),
    tournaments:      parseFreeTextArray(data.tournaments),
    achievements:     parseFreeTextArray(data.achievements),
    rawBio:           data.bio ?? null,
    rawPhilosophy:    data.coachingPhilosophy ?? null,
  }
}

// ─── Webhook payload schema ───────────────────────────────────────────────────
export const webhookPayloadSchema = z.object({
  secret: z.string().min(1),
  event:  z.enum(['form_submission', 'form_edit']),
  data:   rawFormDataSchema,
  spreadsheet_id: z.string().optional(),
  row_number:     z.number().optional(),
})

export type ValidatedWebhookPayload = z.infer<typeof webhookPayloadSchema>
