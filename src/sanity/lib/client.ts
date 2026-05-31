import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

const studioUrl =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ||
  process.env.SANITY_STUDIO_URL ||
  '/studio'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  stega: {
    studioUrl,
  },
})
