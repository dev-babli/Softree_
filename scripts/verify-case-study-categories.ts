import { config } from 'dotenv'
config({ path: '.env.local' })

import { createClient } from '@sanity/client'
import {
  resolveCaseStudyCategory,
} from '../src/lib/case-study-category'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-05-21',
  useCdn: false,
})

const q = `*[_type=="caseStudy"] | order(_updatedAt desc) {
  title,
  "slug": slug.current,
  status,
  publishedAt,
  _updatedAt,
  mainImageUrl,
  "hasImage": defined(mainImage.asset)
}`

client.fetch(q).then((studies) => {
  console.log(`Total: ${studies.length}\n`)
  for (const study of studies) {
    console.log(
      `[${study.status ?? 'null'}] ${study.slug ?? 'NO SLUG'} | pub:${study.publishedAt ?? '-'} | upd:${study._updatedAt} | img:${study.hasImage || study.mainImageUrl ? 'yes' : 'no'}`,
    )
    console.log(`  ${study.title}`)
  }
})
