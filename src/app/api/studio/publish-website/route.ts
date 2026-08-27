import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { isStudioApiRequest, studioApiUnauthorized } from '@/lib/studio-api-auth'
import {
  commitWebsiteLivePublish,
  draftDocumentId,
  publishedDocumentId,
  type WebsitePublishDoc,
} from '@/cms/lib/studio/publishWebsiteStatus'
import { getSanityWriteClient } from '@/cms/lib/writeClient'

const bodySchema = z.object({
  documentId: z.string().min(1),
})

function revalidatePublishedPaths(doc: WebsitePublishDoc, documentId: string): void {
  const slug = doc?.slug?.current
  if (!slug) return

  // Clear tag-based caches for defineLive/sanityFetch
  revalidateTag("sanity", "max")
  revalidateTag("sanity:fetch-sync-tags", "max")
  if (doc?._type) {
    revalidateTag(`sanity:${doc._type}`, "max")
  }

  const cleanId = documentId.replace(/^drafts\./, "")
  revalidateTag(`sanity:${cleanId}`, "max")
  revalidateTag(`sanity:drafts.${cleanId}`, "max")

  if (doc?._type === 'caseStudy') {
    revalidatePath('/')
    revalidatePath('/case-studies')
    revalidatePath(`/case-studies/${slug}`)
    return
  }

  if (doc?._type === 'post') {
    revalidatePath('/')
    revalidatePath('/blog')
    revalidatePath(`/blog/${slug}`)
    return
  }

  if (doc?._type === 'marketingPage') {
    revalidatePath(`/p/${slug}`)
  }
}

export async function POST(request: NextRequest) {
  if (!isStudioApiRequest(request)) return studioApiUnauthorized()

  if (!process.env.SANITY_API_WRITE_TOKEN) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Server publish is not configured. Set SANITY_API_WRITE_TOKEN in .env.local.',
      },
      { status: 503 },
    )
  }

  try {
    const { documentId } = bodySchema.parse(await request.json())
    const publishedId = publishedDocumentId(documentId)
    const draftId = draftDocumentId(documentId)
    const client = getSanityWriteClient()

    const [published, draft] = await Promise.all([
      client.getDocument(publishedId) as Promise<WebsitePublishDoc>,
      client.getDocument(draftId) as Promise<WebsitePublishDoc>,
    ])

    if (!published && !draft) {
      return NextResponse.json(
        { ok: false, error: 'Document not found. Save it in Studio first (Ctrl+S).' },
        { status: 404 },
      )
    }

    const docForPatch = (draft ?? published) as WebsitePublishDoc
    await commitWebsiteLivePublish(client, publishedId, docForPatch)

    const live = (await client.getDocument(publishedId)) as WebsitePublishDoc
    revalidatePublishedPaths(live, publishedId)

    return NextResponse.json({ ok: true, documentId: publishedId })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Publish failed'
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
