import 'server-only'

import { createClient } from '@sanity/client'

import { apiVersion, dataset, projectId } from '../env'

/** Fresh reads for server routes, pipelines, and audits (no CDN). */
export const readClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})
