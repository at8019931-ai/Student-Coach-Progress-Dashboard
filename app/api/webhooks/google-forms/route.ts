// ─────────────────────────────────────────────────────────────────────────────
// Webhook receiver for Google Forms submissions
//
// Called by the Google Apps Script trigger attached to the backing Google Sheet.
// The Apps Script POSTs a JSON payload with a shared secret for verification.
//
// POST /api/webhooks/google-forms
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { webhookPayloadSchema }      from '@/lib/coach-profiles/validator'
import { processFormSubmission }     from '@/services/coach-profile.service'

export const runtime = 'nodejs'   // needs pg + fs

export async function POST(req: NextRequest) {
  // 1. Parse body
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  // 2. Validate shape and shared secret
  const parsed = webhookPayloadSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid payload', details: parsed.error.errors },
      { status: 400 },
    )
  }

  const { secret, data } = parsed.data
  const expectedSecret = process.env.WEBHOOK_SECRET

  if (!expectedSecret) {
    console.error('[Webhook] WEBHOOK_SECRET env var not set')
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
  }

  if (secret !== expectedSecret) {
    return NextResponse.json({ error: 'Invalid webhook secret' }, { status: 401 })
  }

  // 3. Process submission
  try {
    const result = await processFormSubmission(data)

    return NextResponse.json({
      ok:        true,
      profileId: result.profileId,
      isNew:     result.isNew,
      warnings:  result.warnings,
      ...(result.photoError ? { photoError: result.photoError } : {}),
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[Webhook] Processing error:', message)
    return NextResponse.json({ error: message }, { status: 422 })
  }
}

// Health check
export async function GET() {
  return NextResponse.json({ ok: true, endpoint: 'google-forms-webhook' })
}
