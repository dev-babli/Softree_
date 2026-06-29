import type { NextRequest } from 'next/server'

/** True when the request originates from embedded Studio (/studio) or carries the pipeline secret. */
export function isStudioApiRequest(request: NextRequest | Request): boolean {
  const referer = request.headers.get('referer') || ''
  const origin = request.headers.get('origin') || ''
  const secFetchSite = request.headers.get('sec-fetch-site') || ''

  if (referer.includes('/studio')) return true
  if (origin.includes('/studio')) return true

  // Same-origin fetches from Studio tools (Referer can be omitted in strict policies)
  if (request.headers.get('x-softree-studio') === '1') {
    if (secFetchSite === 'same-origin' || secFetchSite === 'none' || !secFetchSite) return true
  }

  if (secFetchSite === 'same-origin' && referer.includes('/studio')) {
    return true
  }

  const secret = process.env.CONTENT_PIPELINE_SECRET
  if (secret) {
    const auth = request.headers.get('authorization')
    if (auth === `Bearer ${secret}`) return true
  }

  return false
}

export function studioApiUnauthorized() {
  return Response.json({ ok: false, error: 'Studio access only' }, { status: 403 })
}
