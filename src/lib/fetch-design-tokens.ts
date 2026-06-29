import 'server-only'

import { cache } from 'react'

import type { DesignTokenSettings } from '@/lib/design-tokens'
import { sanityFetch } from '@/sanity/lib/fetch'

export const DESIGN_TOKENS_QUERY = `*[_id == "globalSettings" || _type == "globalSettings"][0].designTokens {
  accentPreset,
  typographyPreset
}`

/** Published + draft-aware; deduped per request via React cache. */
export const fetchDesignTokens = cache(async (): Promise<DesignTokenSettings | null> => {
  try {
    return await sanityFetch<DesignTokenSettings | null>(DESIGN_TOKENS_QUERY)
  } catch {
    return null
  }
})
