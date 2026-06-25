import { NextResponse, type NextRequest } from 'next/server'
import crypto from 'crypto'

function expectedToken() {
  const pass = process.env.APP_PASSWORD ?? 'admin1234'
  return crypto.createHash('sha256').update(pass + 'cc_session_v1').digest('hex')
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const session = request.cookies.get('cc_session')?.value
  const authenticated = session === expectedToken()

  if (pathname === '/login' && authenticated) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  const protectedPrefixes = ['/student', '/coach', '/admin']
  if (protectedPrefixes.some(p => pathname.startsWith(p)) && !authenticated) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/login', '/admin/:path*', '/coach/:path*', '/student/:path*'],
}
