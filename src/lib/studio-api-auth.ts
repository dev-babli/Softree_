import type { NextRequest } from 'next/server'

/**
 * True when the request can be trusted as coming from the embedded Studio
 * (/studio) or a server-to-server caller holding the pipeline secret.
 *
 * Security notes:
 * - A shared secret (`CONTENT_PIPELINE_SECRET`, sent as `Authorization:
 *   Bearer …`) is the only hard boundary and should be set in production for
 *   any server-to-server access.
 * - For browser calls from the embedded Studio we rely on `Sec-Fetch-Site`,
 *   which browsers set automatically and page scripts cannot override, so a
 *   genuine same-origin Studio fetch reports `same-origin`. This replaces the
 *   previous substring checks on `Referer`/`Origin`, which any non-browser
 *   client could trivially forge (e.g. `Referer: https://evil.example/studio`).
 */

function urlMatchesStudioHost(value: string | null, host: string | null): boolean {
  if (!value || !host) return false
  try {
    const parsed = new URL(value)
    return parsed.host === host && parsed.pathname.startsWith('/studio')
  } catch {
    return false
  }
}

export function isStudioApiRequest(request: NextRequest | Request): boolean {
  // 1) Server-to-server: explicit shared secret (the only hard boundary).
  const secret = process.env.CONTENT_PIPELINE_SECRET
  if (secret) {
    const auth = request.headers.get('authorization')
    if (auth === `Bearer ${secret}`) return true
  }

  // Studio fetches always send this marker (see src/sanity/lib/studioFetch.ts).
  if (request.headers.get('x-softree-studio') !== '1') return false

  // 2) Trust the browser-set Sec-Fetch-Site when present. Cross-site callers
  //    report `cross-site`; only genuine same-origin Studio calls pass.
  const secFetchSite = request.headers.get('sec-fetch-site')
  if (secFetchSite) return secFetchSite === 'same-origin'

  // 3) Fallback for clients/proxies that strip Sec-Fetch metadata: only trust
  //    an Origin/Referer that actually matches this host and the /studio path.
  const host = request.headers.get('host')
  return (
    urlMatchesStudioHost(request.headers.get('origin'), host) ||
    urlMatchesStudioHost(request.headers.get('referer'), host)
  )
}

export function studioApiUnauthorized() {
  return Response.json({ ok: false, error: 'Studio access only' }, { status: 403 })
}
