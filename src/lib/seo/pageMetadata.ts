import type { Metadata } from 'next'

import { SITE_URL, ogImages, pageOgImage, twitterImages, type OgImageMeta } from '@/lib/site-metadata'

export function canonicalUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalized}`
}

type SanityImage = {
  asset?: { url?: string }
  alt?: string
}

export function ogFromSanityImage(image: SanityImage | undefined, fallbackPath: string, alt: string): OgImageMeta {
  if (image?.asset?.url) {
    return {
      url: image.asset.url,
      width: 1200,
      height: 630,
      alt: image.alt || alt,
    }
  }
  return pageOgImage(fallbackPath, alt)
}

export function cmsPageMetadata(input: {
  path: string
  title: string
  description?: string
  ogImage?: SanityImage
  ogAlt?: string
}): Metadata {
  const canonical = canonicalUrl(input.path)
  const og = ogFromSanityImage(input.ogImage, input.path, input.ogAlt || input.title)

  return {
    title: input.title,
    description: input.description,
    alternates: { canonical },
    openGraph: {
      title: input.title,
      description: input.description,
      url: canonical,
      images: ogImages(og),
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      images: twitterImages(og),
    },
  }
}
