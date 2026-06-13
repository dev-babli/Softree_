import { config } from 'dotenv'
config({ path: '.env.local' })

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-05-21',
  useCdn: false,
})

const q = `*[_type=="caseStudy"] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  status,
  publishedAt,
  category,
  industry,
  useCase,
  featuredRank,
  detailLayout,
  client
}`

client.fetch(q).then((r) => {
  console.log(JSON.stringify(r, null, 2))
})
