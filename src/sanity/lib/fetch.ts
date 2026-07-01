import 'server-only'

import { draftMode } from 'next/headers'
import type { QueryParams } from 'next-sanity'

import { liveSanityFetch } from './live'

type SanityFetchOptions = {
  /** Skip published-only filters (used internally when draft mode is on). */
  preview?: boolean
}

/**
 * Server-side Sanity fetch with draft-mode preview support.
 * Wraps defineLive sanityFetch while preserving the legacy (query, params) signature.
 */
export async function sanityFetch<T>(
  query: string,
  params: QueryParams = {},
  options: SanityFetchOptions = {},
): Promise<T> {
  const { isEnabled: isDraftMode } = await draftMode()
  const preview = options.preview ?? isDraftMode

  const { data } = await liveSanityFetch({
    query,
    params: { ...params, preview },
    ...(preview
      ? { perspective: 'previewDrafts' as const, stega: true }
      : { perspective: 'published' as const, stega: false }),
    ...(process.env.NODE_ENV === 'development' ? { next: { revalidate: 0 } } : {}),
  })

  return data as T
}

export async function isPreviewMode(): Promise<boolean> {
  const { isEnabled } = await draftMode()
  return isEnabled
}
