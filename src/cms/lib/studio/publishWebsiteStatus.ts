import type { SanityClient } from '@sanity/client'

import { STUDIO_UI_ONLY_FIELDS } from './studioUiFields'

export type WebsitePublishDoc = {
  status?: string
  visibility?: string
  publishedAt?: string
  slug?: { current?: string }
  _type?: string
} | null | undefined

export function publishedDocumentId(documentId: string): string {
  return documentId.replace(/^drafts\./, '')
}

export function draftDocumentId(documentId: string): string {
  const id = publishedDocumentId(documentId)
  return `drafts.${id}`
}

export function isWebsiteDraft(doc: WebsitePublishDoc): boolean {
  const visibility = doc?.visibility ?? doc?.status ?? 'published'
  return visibility === 'draft'
}

export function buildWebsiteLivePatch(doc: WebsitePublishDoc): {
  set: Record<string, string>
  unset: string[]
} {
  const set: Record<string, string> = { status: 'published', visibility: 'published' }

  if (!doc?.publishedAt) {
    set.publishedAt = new Date().toISOString()
  }

  return {
    set,
    unset: [...STUDIO_UI_ONLY_FIELDS],
  }
}

function stripDraftForPublish(draft: Record<string, unknown>): Record<string, unknown> {
  const next = { ...draft }
  delete next._id
  delete next._updatedAt
  for (const field of STUDIO_UI_ONLY_FIELDS) {
    delete next[field]
  }
  return next
}

/**
 * Patch the published document id (Sanity copies published → draft), then publish.
 * Must run with a write-capable client (Studio session or server token).
 */
export async function commitWebsiteLivePublish(
  client: SanityClient,
  documentId: string,
  doc: WebsitePublishDoc,
): Promise<void> {
  const publishedId = publishedDocumentId(documentId)
  const draftId = draftDocumentId(documentId)
  const { set, unset } = buildWebsiteLivePatch(doc)

  let patch = client.patch(publishedId).set(set)
  if (unset.length > 0) {
    patch = patch.unset(unset)
  }
  await patch.commit({ autoGenerateArrayKeys: true })

  const [draft, published] = await Promise.all([
    client.getDocument(draftId),
    client.getDocument(publishedId),
  ])

  if (!draft) {
    throw new Error('Could not create a draft to publish. Save the document (Ctrl+S) and try again.')
  }

  const draftValue = stripDraftForPublish(draft as Record<string, unknown>)

  let transaction = client.transaction()

  if (published) {
    transaction = transaction.patch(publishedId, {
      ifRevisionID: published._rev,
      unset: ['_revision_lock_pseudo_field_'],
    })
    transaction = transaction.createOrReplace({
      ...draftValue,
      _id: publishedId,
    })
  } else {
    transaction = transaction.create({
      ...draftValue,
      _id: publishedId,
    })
  }

  await transaction.delete(draftId).commit({ tag: 'document.publish' })
}

export async function publishWebsiteLiveViaApi(documentId: string): Promise<void> {
  const response = await fetch('/api/studio/publish-website', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-softree-studio': '1',
    },
    body: JSON.stringify({ documentId: publishedDocumentId(documentId) }),
  })

  let payload: { ok?: boolean; error?: string } = {}
  try {
    payload = (await response.json()) as { ok?: boolean; error?: string }
  } catch {
    // response body may be empty on hard network failures
  }

  if (!response.ok || !payload.ok) {
    throw new Error(
      payload.error ||
        (response.status === 503
          ? 'Server publish is not configured (missing SANITY_API_WRITE_TOKEN).'
          : 'Publish failed — check your connection and try again.'),
    )
  }
}
