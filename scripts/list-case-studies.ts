import { config } from 'dotenv'
config({ path: '.env.local' })

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-05-21',
  useCdn: false,
})

const q = `{
  "nullCases": *[_type=="caseStudy" && (!defined(slug.current) || slug.current == null || slug.current == "" || slug.current == "null")] {
    _id,
    title,
    "slug": slug.current,
    status
  },
  "totalCases": count(*[_type=="caseStudy"]),
  "nullPosts": *[_type=="post" && (!defined(slug.current) || slug.current == null || slug.current == "" || slug.current == "null")] {
    _id,
    title,
    "slug": slug.current,
    status
  },
  "totalPosts": count(*[_type=="post"])
}`

client.fetch(q).then((r) => {
  console.log("SANITY AUDIT RESULT:", JSON.stringify(r, null, 2))
})

