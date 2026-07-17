import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const pathname = url.pathname
  const decodedPath = decodeURIComponent(pathname)

  // Normalize case studies path and clean up spaces/underscores
  if (decodedPath.includes('case studies') || decodedPath.includes(' ') || decodedPath.includes('_')) {
    let normalizedPath = decodedPath
      .replace(/\/case studies\//i, '/case-studies/')
      .replace(/_+/g, '-')  // Replace underscores with hyphens
      .replace(/\s+/g, '-') // Replace all spaces with hyphens
      .replace(/-+/g, '-')   // De-duplicate hyphens

    if (normalizedPath.endsWith('-')) {
      normalizedPath = normalizedPath.slice(0, -1)
    }

    url.pathname = normalizedPath
    return NextResponse.redirect(url, 301)
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', pathname)

  if (pathname === '/client') {
    const response = NextResponse.next({
      request: { headers: requestHeaders },
    })
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet')
    return response
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  })
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|webm|mp4)$).*)',
  ],
}
