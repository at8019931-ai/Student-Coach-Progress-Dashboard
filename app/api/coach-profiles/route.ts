// ─────────────────────────────────────────────────────────────────────────────
// GET  /api/coach-profiles          — list all profiles (admin)
// POST /api/coach-profiles          — manually create / submit a profile
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { listProfiles, getAdminDashboardStats, processFormSubmission } from '@/services/coach-profile.service'
import { rawFormDataSchema } from '@/lib/coach-profiles/validator'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status') ?? undefined
  const limit  = Math.min(Number(searchParams.get('limit')  ?? 50), 200)
  const offset = Number(searchParams.get('offset') ?? 0)
  const stats  = searchParams.get('stats') === 'true'

  try {
    if (stats) {
      const data = await getAdminDashboardStats()
      return NextResponse.json(data)
    }

    const profiles = await listProfiles(status, limit, offset)
    return NextResponse.json({ profiles, count: profiles.length })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[CoachProfiles GET]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = rawFormDataSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', details: parsed.error.errors }, { status: 400 })
  }

  try {
    const result = await processFormSubmission(parsed.data as Parameters<typeof processFormSubmission>[0])
    return NextResponse.json(result, { status: result.isNew ? 201 : 200 })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: message }, { status: 422 })
  }
}
