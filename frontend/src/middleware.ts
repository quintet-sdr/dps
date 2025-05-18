import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')
  const isAuth = Boolean(token)
  const { pathname } = req.nextUrl

  if (pathname === '/' || pathname === '/auth/register') {
    return NextResponse.next()
  }

  if (pathname.startsWith('/auth') && pathname !== '/auth/register' && isAuth) {
    return NextResponse.redirect(new URL('/files', req.url))
  }

  if (pathname === '/files' && !isAuth) {
    return NextResponse.redirect(new URL('/auth', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/auth/:path*', '/files']
}
