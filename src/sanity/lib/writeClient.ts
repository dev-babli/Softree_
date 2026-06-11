import { createClient, type SanityClient } from '@sanity/client'

import { apiVersion, dataset, projectId } from '../env'

let cached: SanityClient | null = null

/** Server-side Sanity client with write access (API routes, pipelines, scripts). */
export function getSanityWriteClient(): SanityClient {
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
