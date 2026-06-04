/**
 * Delete ALL caseStudy documents from the Sanity dataset.
 * Requires SANITY_API_WRITE_TOKEN in .env.local
 */
import { config } from 'dotenv'
config({ path: '.env.local' })
import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '1zmh4sfw'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-05-21'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!token) {
  console.error('SANITY_API_WRITE_TOKEN is required. Set it in .env.local')
  process.exit(1)
}

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
})

async function deleteAllCaseStudies() {
  console.log(`Connecting to Sanity project ${projectId} / dataset ${dataset}...`)

  // Fetch all caseStudy document IDs
  const docs = await writeClient.fetch<{ _id: string }[]>(
    `*[_type == "caseStudy"]{ _id }`,
    {},
    { perspective: 'raw' }
  )

  if (!docs || docs.length === 0) {
    console.log('No caseStudy documents found. Nothing to delete.')
    return
  }

  console.log(`Found ${docs.length} caseStudy document(s) to delete.`)

  // Sanity requires deleting drafts first, then published
  const ids = docs.map((d) => d._id)
  const draftIds = ids.filter((id) => id.startsWith('drafts.'))
  const publishedIds = ids.filter((id) => !id.startsWith('drafts.'))

  console.log(`  Drafts: ${draftIds.length}`)
  console.log(`  Published: ${publishedIds.length}`)

  // Delete in batches to avoid overwhelming the API
  const BATCH_SIZE = 50
  const allIds = [...draftIds, ...publishedIds]

  for (let i = 0; i < allIds.length; i += BATCH_SIZE) {
    const batch = allIds.slice(i, i + BATCH_SIZE)
    const transaction = writeClient.transaction()
    for (const id of batch) {
      transaction.delete(id)
    }
    await transaction.commit()
    console.log(`Deleted batch ${i / BATCH_SIZE + 1} (${batch.length} docs)`)
  }

  console.log(`Successfully deleted ${allIds.length} caseStudy document(s).`)
}

deleteAllCaseStudies().catch((err) => {
  console.error('Failed to delete case studies:', err)
  process.exit(1)
})
