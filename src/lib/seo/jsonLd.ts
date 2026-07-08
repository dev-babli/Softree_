import { siteUrl } from '@/cms/api'

type JsonLdGraph = Record<string, unknown>

export function buildOrganizationJsonLd(): JsonLdGraph {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Softree Technology',
    url: siteUrl,
    logo: `${siteUrl.replace(/\/$/, '')}/logo.png`,
  }
}

export function buildArticleJsonLd(input: {
  title: string
  description?: string
  url: string
  datePublished?: string
  dateModified?: string
  authorName?: string
}): JsonLdGraph {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    url: input.url,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: input.authorName
      ? { '@type': 'Person', name: input.authorName }
      : { '@type': 'Organization', name: 'Softree Technology' },
    publisher: buildOrganizationJsonLd(),
  }
}

export function buildFaqJsonLd(
  items: Array<{ question: string; answer: string }>,
): JsonLdGraph | null {
  if (!items.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function jsonLdScript(graph: JsonLdGraph | JsonLdGraph[] | null) {
  if (!graph) return null
  return {
    __html: JSON.stringify(Array.isArray(graph) ? graph : graph),
  }
}
