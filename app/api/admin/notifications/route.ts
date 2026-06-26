// ─────────────────────────────────────────────────────────────────────────────
// GET   /api/admin/notifications          — list unread notifications
// PATCH /api/admin/notifications          — mark all as read
// PATCH /api/admin/notifications?id=[id]  — mark one as read
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { ccQuery }                   from '@/lib/cc-db'
import type { AdminNotification }    from '@/types/coach-profiles'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const limit  = Math.min(Number(new URL(req.url).searchParams.get('limit') ?? 20), 100)
  const unread = new URL(req.url).searchParams.get('unread') !== 'false'

  const where = unread ? 'WHERE is_read = false' : ''

  try {
    const rows = await ccQuery<AdminNotification>(
      `SELECT * FROM admin_notifications ${where} ORDER BY created_at DESC LIMIT $1`,
      [limit],
    )
    return NextResponse.json({ notifications: rows, count: rows.length })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  const id = new URL(req.url).searchParams.get('id')

  try {
    if (id) {
      await ccQuery(`UPDATE admin_notifications SET is_read = true WHERE id = $1`, [id])
    } else {
      await ccQuery(`UPDATE admin_notifications SET is_read = true WHERE is_read = false`, [])
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
