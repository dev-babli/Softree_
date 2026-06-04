import {documentEventHandler} from '@sanity/functions'
import {createClient} from '@sanity/client'

export const handler = documentEventHandler(async ({context, event}) => {
  const {projectId, dataset} = context
  const client = createClient({projectId, dataset, apiVersion: '2026-05-21', token: process.env.SANITY_API_WRITE_TOKEN})

  // Only react to file assets that look like PPTX
  if (event.operation !== 'create') return
  const after = event?.after as { _id?: string; _type?: string; originalFilename?: string } | undefined
  if (!after || after._type !== 'sanity.fileAsset') return
  const name = after.originalFilename || ''
  if (!/\.pptx$/i.test(name)) return

  // Derive a title/slug from filename
  const base = name.replace(/\.pptx$/i, '')
  const safeSlug = base
    .toLowerCase()
    .replace(/[^a-z0-9\-\s]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 96)

  // Create a draft case study prefilled with sensible defaults
  const doc = {
    _type: 'caseStudy',
    title: base,
    headerTitle: base,
    slug: {current: safeSlug || undefined},
    status: 'draft',
    storyType: 'standard',
    heroLayout: 'centered',
    excerpt: `Imported from PPT: ${name}`,
  }

  try {
    await client.create(doc)
    // Optionally: you could post to Slack here to notify editors
  } catch (err) {
    console.error('ppt-to-case-study-on-upload failed to create document', err)
  }
})
