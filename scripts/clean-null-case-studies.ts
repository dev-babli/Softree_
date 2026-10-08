import { config } from 'dotenv'
config({ path: '.env.local' })

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-05-21',
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

async function run() {
  const ghostId = 'c387ee20-c1f4-40e1-85ef-78396765fbd3'
  const doc = await client.getDocument(ghostId)
  console.log('Ghost document before:', JSON.stringify(doc, null, 2))

  if (process.env.SANITY_API_TOKEN || process.env.SANITY_API_WRITE_TOKEN) {
    try {
      const res = await client.delete(ghostId)
      console.log('Deleted ghost document successfully:', res)
    } catch (err) {
      console.error('Failed to delete ghost document with token, trying to patch status:', err)
    }
  } else {
    console.log('No write token found in .env.local; skipping deletion from script.')
  }
}

run()
