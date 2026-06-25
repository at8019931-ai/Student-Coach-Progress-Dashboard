import { createServerClient, type CookieMethodsServer } from '@supabase/ssr'
import { type ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet: { name: string; value: string; options?: Partial<ResponseCookie> }[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      } satisfies CookieMethodsServer,
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/login') && user) {
    const role = user.user_metadata?.role ?? 'student'
    return NextResponse.redirect(new URL(`/${role}`, request.url))
  }

  const protectedPrefixes = ['/student', '/coach', '/admin']
  if (protectedPrefixes.some(p => pathname.startsWith(p)) && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (user && process.env.NODE_ENV !== 'development') {
    const role = user.user_metadata?.role ?? 'student'
    if (pathname.startsWith('/coach') && role !== 'coach' && role !== 'admin') {
      return NextResponse.redirect(new URL(`/${role}`, request.url))
    }
    if (pathname.startsWith('/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL(`/${role}`, request.url))
    }
  }

  return supabaseResponse
}
