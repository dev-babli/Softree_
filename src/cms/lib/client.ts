import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, studioUrl } from '@/cms/api'

/** Public read client — CMS v2 data layer */
export const cmsClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
  stega: { studioUrl },
})

/** @deprecated Use cmsClient */
export const client = cmsClient
