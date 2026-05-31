import 'server-only'

import { draftMode } from 'next/headers'
import type { QueryParams } from 'next-sanity'

import { client } from './client'

const studioUrl =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ||
  process.env.SANITY_STUDIO_URL ||
  '/studio'

const previewClient = client.withConfig({
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  stega: {
    enabled: true,
    studioUrl,
  },
})

type SanityFetchOptions = {
  /** Skip published-only filters (used internally when draft mode is on). */
  preview?: boolean
}

/**
 * Server-side Sanity fetch with draft-mode preview support.
 * In preview, uses previewDrafts perspective so unpublished edits are visible.
 */
export async function sanityFetch<T>(
  query: string,
  params: QueryParams = {},
  options: SanityFetchOptions = {},
): Promise<T> {
  const { isEnabled: isDraftMode } = await draftMode()
  const preview = options.preview ?? isDraftMode

  if (preview) {
    return previewClient.fetch<T>(
      query,
      { ...params, preview: true },
      {
        perspective: 'previewDrafts',
        stega: true,
      },
    )
  }

  return client.fetch<T>(query, { ...params, preview: false })
}

export async function isPreviewMode(): Promise<boolean> {
  const { isEnabled } = await draftMode()
  return isEnabled
}
