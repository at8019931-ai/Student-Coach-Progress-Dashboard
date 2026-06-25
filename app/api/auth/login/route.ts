import { NextResponse } from 'next/server'
import crypto from 'crypto'

function sessionToken() {
  const pass = process.env.APP_PASSWORD ?? 'admin1234'
  return crypto.createHash('sha256').update(pass + 'cc_session_v1').digest('hex')
}

export async function POST(req: Request) {
  const { password } = await req.json()
  const expected = process.env.APP_PASSWORD ?? 'admin1234'

  if (password !== expected) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set('cc_session', sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
  return res
}
