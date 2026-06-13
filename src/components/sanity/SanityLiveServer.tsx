import { headers } from 'next/headers'

import { SanityLive } from '@/sanity/lib/live'

const SKIP_SANITY_LIVE_PREFIXES = ['/studio', '/case-studies/preview']

/** Server-only — never import defineLive from a client component. */
export async function SanityLiveServer() {
  const pathname = (await headers()).get('x-pathname') ?? ''

  if (SKIP_SANITY_LIVE_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return null
  }

  return <SanityLive />
}
