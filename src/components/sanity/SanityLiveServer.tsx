import { headers } from 'next/headers'

import { CmsSanityLive } from '@/cms/lib/live'
import { cmsReadToken } from '@/cms/lib/token'

const SKIP_SANITY_LIVE_PREFIXES = ['/studio', '/case-studies/preview']

/** Server-only — never import defineLive from a client component. */
export async function SanityLiveServer() {
  // Without a read token the live SSE connection loops reconnect errors in the console.
  if (!cmsReadToken) return null

  const pathname = (await headers()).get('x-pathname') ?? ''

  if (SKIP_SANITY_LIVE_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return null
  }

  return <CmsSanityLive />
}
