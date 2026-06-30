import { config } from 'dotenv'
config({ path: '.env.local' })

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '1zmh4sfw',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-05-21',
  useCdn: false,
})

const slug = 'banking-risk-compliance-analytics-global-bank'
const q = `*[_type=="caseStudy" && slug.current==$slug][0]`

client.fetch(q, { slug }).then((r) => {
  console.log(JSON.stringify(r, null, 2))
}).catch(console.error)
