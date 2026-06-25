import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 })
  }

  const email = process.env.DEV_LOGIN_EMAIL
  const password = process.env.DEV_LOGIN_PASSWORD

  if (!email || !password) {
    return NextResponse.json({ error: 'DEV_LOGIN_EMAIL / DEV_LOGIN_PASSWORD not set in .env.local' }, { status: 500 })
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error || !data.user) {
    return NextResponse.json({ error: error?.message ?? 'Login failed' }, { status: 401 })
  }

  return NextResponse.redirect(new URL('/admin/analytics', process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'))
}
