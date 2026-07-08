import { createClient, type SanityClient } from '@sanity/client'

import { apiVersion, dataset, projectId } from '@/cms/api'

let cached: SanityClient | null = null

export function getCmsWriteClient(): SanityClient {
  const token = process.env.SANITY_API_WRITE_TOKEN
  if (!token) {
    throw new Error('SANITY_API_WRITE_TOKEN is not set')
  }

  if (!cached) {
    cached = createClient({
      projectId,
      dataset,
      apiVersion,
      token,
      useCdn: false,
    })
  }

  return cached
}

/** @deprecated Use getCmsWriteClient */
export const getSanityWriteClient = getCmsWriteClient
