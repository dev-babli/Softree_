#!/usr/bin/env node
/**
 * Publish loop verify — tests Sanity write token + commitWebsiteLivePublish end-to-end.
 * Run: node scripts/publish-loop-verify.mjs
 */
import { createClient } from '@sanity/client'
import { config } from 'dotenv'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
config({ path: path.join(root, '.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-05-21'
const token = process.env.SANITY_API_WRITE_TOKEN

const STUDIO_UI_ONLY_FIELDS = [
  'editorProgressPanel',
  'faqAeoPanel',
  'seoPreviewPanel',
  'publishChecklistUi',
  'faqReadinessUi',
  'seoPreviewUi',
]

function publishedId(id) {
  return id.replace(/^drafts\./, '')
}

function draftId(id) {
  return `drafts.${publishedId(id)}`
}

function buildWebsiteLivePatch(doc) {
  const set = { status: 'published', visibility: 'published' }
  if (!doc?.publishedAt) set.publishedAt = new Date().toISOString()
  return { set, unset: [...STUDIO_UI_ONLY_FIELDS] }
}

function stripDraftForPublish(draft) {
  const next = { ...draft }
  delete next._id
  delete next._updatedAt
  for (const field of STUDIO_UI_ONLY_FIELDS) delete next[field]
  return next
}

/** Fixed publish — handles draft-only first publish (no published doc yet). */
async function commitWebsiteLivePublish(client, documentId, doc) {
  const pubId = publishedId(documentId)
  const dId = draftId(documentId)
  const { set, unset } = buildWebsiteLivePatch(doc)

  const [draft, published] = await Promise.all([
    client.getDocument(dId),
    client.getDocument(pubId),
  ])

  if (!draft && !published) {
    throw new Error('No draft or published document — save in Studio first (Ctrl+S)')
  }

  if (published) {
    let patch = client.patch(pubId).set(set)
    if (unset.length) patch = patch.unset(unset)
    await patch.commit({ autoGenerateArrayKeys: true })
  }

  const draftAfter = draft || (await client.getDocument(dId))
  if (!draftAfter) {
    throw new Error('No draft to publish after status patch')
  }

  const draftValue = stripDraftForPublish(draftAfter)
  Object.assign(draftValue, set)
  for (const field of unset) delete draftValue[field]

  let tx = client.transaction()
  if (published) {
    const latest = await client.getDocument(pubId)
    tx = tx.patch(pubId, { ifRevisionID: latest._rev })
    tx = tx.createOrReplace({ ...draftValue, _id: pubId })
  } else {
    tx = tx.create({ ...draftValue, _id: pubId })
  }
  if (draftAfter) {
    tx = tx.delete(dId)
  }
  await tx.commit({ tag: 'document.publish' })
}

const results = []
function pass(msg) {
  results.push({ ok: true, msg })
  console.log(`PASS: ${msg}`)
}
function fail(msg) {
  results.push({ ok: false, msg })
  console.error(`FAIL: ${msg}`)
}

async function main() {
  console.log('=== Publish loop verify ===\n')

  if (!projectId) {
    fail('NEXT_PUBLIC_SANITY_PROJECT_ID missing')
    process.exit(1)
  }
  if (!token) {
    fail('SANITY_API_WRITE_TOKEN missing')
    process.exit(1)
  }
  pass(`Env OK (project ${projectId}, dataset ${dataset})`)

  const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false })

  let ping
  try {
    ping = await client.fetch('count(*)')
    pass(`Sanity API reachable (${ping} docs)`)
  } catch (e) {
    fail(`Sanity API error: ${e.message}`)
    process.exit(1)
  }

  const testId = `publish-loop-test-${Date.now()}`
  const testDraftId = `drafts.${testId}`

  try {
    await client.create({
      _id: testDraftId,
      _type: 'post',
      title: 'Publish Loop Test (auto-delete)',
      slug: { _type: 'slug', current: `publish-loop-test-${Date.now()}` },
      excerpt: 'Automated publish loop verification document.',
      status: 'draft',
      visibility: 'draft',
      body: [
        {
          _type: 'block',
          _key: 'a1',
          style: 'normal',
          markDefs: [],
          children: [{ _type: 'span', _key: 'a1s', text: 'Test body', marks: [] }],
        },
      ],
    })
    pass(`Created test draft ${testDraftId}`)
  } catch (e) {
    fail(`Could not create test draft: ${e.message}`)
    process.exit(1)
  }

  try {
    await commitWebsiteLivePublish(client, testId, { status: 'draft', visibility: 'draft' })
    pass('commitWebsiteLivePublish succeeded (draft-only first publish)')
  } catch (e) {
    fail(`commitWebsiteLivePublish failed: ${e.message}`)
  }

  const published = await client.getDocument(testId)
  if (published?.status === 'published' && published?.visibility === 'published') {
    pass('Published doc has status=published and visibility=published')
  } else {
    fail(
      `Published doc wrong state: status=${published?.status}, visibility=${published?.visibility}`,
    )
  }

  const draftGone = await client.getDocument(testDraftId)
  if (!draftGone) {
    pass('Draft removed after publish')
  } else {
    fail('Draft still exists after publish')
  }

  try {
    await client.delete(testId)
    pass('Cleaned up test document')
  } catch (e) {
    fail(`Cleanup failed: ${e.message}`)
  }

  const apiTestId = `api-publish-test-${Date.now()}`
  const apiDraftId = `drafts.${apiTestId}`
  const apiBase = process.env.PUBLISH_LOOP_API_BASE || 'http://127.0.0.1:3000'

  try {
    await client.create({
      _id: apiDraftId,
      _type: 'post',
      title: 'API Publish Route Test (auto-delete)',
      slug: { _type: 'slug', current: apiTestId },
      excerpt: 'Automated publish-website API route verification.',
      status: 'draft',
      visibility: 'draft',
      body: [
        {
          _type: 'block',
          _key: 'b1',
          style: 'normal',
          markDefs: [],
          children: [{ _type: 'span', _key: 's1', text: 'API test', marks: [] }],
        },
      ],
    })
    pass(`Created API test draft ${apiDraftId}`)
  } catch (e) {
    fail(`Could not create API test draft: ${e.message}`)
  }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 30_000)
    const res = await fetch(`${apiBase}/api/studio/publish-website`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-softree-studio': '1',
        Referer: `${apiBase}/studio`,
      },
      body: JSON.stringify({ documentId: apiTestId }),
      signal: controller.signal,
    })
    clearTimeout(timeout)
    const body = await res.json()
    if (res.ok && body.ok) {
      pass(`publish-website API route OK (${apiBase})`)
    } else {
      fail(`publish-website API failed: HTTP ${res.status} ${JSON.stringify(body)}`)
    }
  } catch (e) {
    fail(
      `publish-website API unreachable at ${apiBase}: ${e.message}. Start dev server: npm run dev`,
    )
  }

  const apiPublished = await client.getDocument(apiTestId)
  if (apiPublished?.status === 'published' && apiPublished?.visibility === 'published') {
    pass('API publish produced status=published and visibility=published')
  } else {
    fail(
      `API publish wrong state: status=${apiPublished?.status}, visibility=${apiPublished?.visibility}`,
    )
  }

  try {
    await client.delete(apiTestId)
    await client.delete(apiDraftId).catch(() => {})
    pass('Cleaned up API test document')
  } catch (e) {
    fail(`API test cleanup failed: ${e.message}`)
  }

  const stuckDrafts = await client.fetch(
    `*[_type in ["post","caseStudy","marketingPage"] && _id in path("drafts.**") && defined(scheduledPublishAt) && scheduledPublishAt > now()]{ _id, title, scheduledPublishAt }[0...5]`,
  )
  if (stuckDrafts?.length) {
    console.warn('\nWARN: Documents with future scheduledPublishAt (Publish disabled in Studio):')
    for (const d of stuckDrafts) {
      console.warn(`  - ${d._id} "${d.title}" scheduled ${d.scheduledPublishAt}`)
    }
  } else {
    pass('No drafts blocked by future scheduledPublishAt (sample check)')
  }

  const draftOnlyLive = await client.fetch(
    `*[_type in ["post","caseStudy"] && !defined(*[_id == ^._id][0]._id) && _id in path("drafts.**")]{ _id, title }[0...3]`,
  )
  if (draftOnlyLive?.length) {
    console.warn('\nINFO: Draft-only documents (first publish needs save + Publish in Studio):')
    for (const d of draftOnlyLive) console.warn(`  - ${d._id} "${d.title}"`)
  }

  const failed = results.filter((r) => !r.ok).length
  console.log(`\n=== ${failed ? 'FAILED' : 'ALL PASSED'} (${results.length} checks) ===`)
  process.exit(failed ? 1 : 0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
