import 'server-only'

import { draftMode } from 'next/headers'
import type { QueryParams } from 'next-sanity'

import { cmsLiveFetch } from './live'
import { cmsClient } from './client'

type CmsFetchOptions = {
  preview?: boolean
  tags?: string[]
}

/** Server fetch with draft-mode support — CMS v2 data layer */
export async function cmsFetch<T>(
  query: string,
  params: QueryParams = {},
  options: CmsFetchOptions = {},
): Promise<T> {
  const { isEnabled: isDraftMode } = await draftMode()
  const preview = options.preview ?? isDraftMode

  if (preview) {
    const { data } = await cmsLiveFetch({
      query,
      params: { ...params, preview: true },
      tags: options.tags || [],
      perspective: 'previewDrafts',
      stega: true,
    })
    return data as T
  }

  // Use standard client for production to enable Next.js Data Cache via tags
  return cmsClient.fetch<T>(
    query,
    { ...params, preview: false },
    {
      next: { tags: options.tags || [] },
      perspective: 'published',
    }
  )
}

export async function isCmsPreviewMode(): Promise<boolean> {
  const { isEnabled } = await draftMode()
  return isEnabled
}

/** @deprecated Use cmsFetch — legacy alias during cutover */
export const sanityFetch = cmsFetch

/** @deprecated Use isCmsPreviewMode */
export const isPreviewMode = isCmsPreviewMode

/** Three-layer fetch: dynamic segments opt out of static cache */
export function getDynamicFetchOptions(isDynamic = false) {
  if (isDynamic || process.env.NODE_ENV === 'development') {
    return { next: { revalidate: 0 } } as const
  }
  return {} as const
}
