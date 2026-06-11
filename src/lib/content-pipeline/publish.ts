import { revalidatePath } from 'next/cache'

import { getSanityWriteClient } from '@/sanity/lib/writeClient'

import { attachGeneratedImages } from './images'
import type { GeneratedPostPayload, PipelineRunInput } from './types'

export async function publishGeneratedPost(
  payload: GeneratedPostPayload,
  options: Pick<PipelineRunInput, 'autoPublish' | 'generateImages'>,
): Promise<{ documentId: string; slug: string }> {
  const client = getSanityWriteClient()
  const docId = `post-${payload.slug}`

  let mainImageRef: string | undefined
  let ogImageRef: string | undefined

  if (options.generateImages) {
    const images = await attachGeneratedImages(client, payload)
    mainImageRef = images.mainImageRef
    ogImageRef = images.ogImageRef
  }

  const document = {
    _id: docId,
    _type: 'post' as const,
    title: payload.title,
    slug: { _type: 'slug' as const, current: payload.slug },
    excerpt: payload.excerpt,
    displayMode: 'composer',
    layoutRecipe: payload.layoutRecipe,
    composerSections: payload.composerSections,
    heroEyebrow: payload.heroEyebrow,
    heroHighlights: payload.heroHighlights.map((item) => ({
      _key: Math.random().toString(36).slice(2, 10),
      ...item,
    })),
    featuredImagePrompt: payload.featuredImagePrompt,
    metaTitle: payload.metaTitle,
    metaDescription: payload.metaDescription,
    focusKeyword: payload.focusKeyword,
    secondaryKeywords: payload.secondaryKeywords,
    faqSchema: payload.faqSchema,
    author: { _type: 'reference' as const, _ref: 'softree-technology' },
    publishedAt: new Date().toISOString(),
    status: options.autoPublish ? 'published' : 'draft',
    reviewStatus: options.autoPublish ? 'approved' : 'draft',
    ...(mainImageRef
      ? {
          mainImage: {
            _type: 'image' as const,
            asset: { _type: 'reference' as const, _ref: mainImageRef },
            alt: payload.title,
          },
        }
      : {}),
    ...(ogImageRef
      ? {
          ogImage: {
            _type: 'image' as const,
            asset: { _type: 'reference' as const, _ref: ogImageRef },
          },
        }
      : {}),
  }

  await client.createOrReplace(document)

  revalidatePath('/blog')
  revalidatePath(`/blog/${payload.slug}`)
  revalidatePath('/sitemap.xml')

  return { documentId: docId, slug: payload.slug }
}
