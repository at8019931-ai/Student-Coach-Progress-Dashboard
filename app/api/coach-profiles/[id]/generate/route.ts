// ─────────────────────────────────────────────────────────────────────────────
// POST /api/coach-profiles/[id]/generate
//
// Triggers (or re-triggers) Claude AI profile generation for a coach.
// Returns the generated content and updates the DB.
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { triggerAIGeneration }       from '@/services/coach-profile.service'

export const runtime    = 'nodejs'
export const maxDuration = 60   // AI generation can take up to 60 s

type Params = { params: Promise<{ id: string }> }

export async function POST(req: NextRequest, { params }: Params) {
  const { id }   = await params
  const body     = await req.json().catch(() => ({})) as Record<string, string>
  const changedBy = body.changedBy ?? 'admin'

  try {
    const generated = await triggerAIGeneration(id, changedBy)
    return NextResponse.json({ ok: true, generated })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error(`[Generate] Failed for profile ${id}:`, message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
