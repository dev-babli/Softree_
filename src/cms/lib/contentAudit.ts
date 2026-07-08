import 'server-only'

import {
  countFaqItems,
  type AeoCompletenessDoc,
} from '@/cms/lib/studio/aeoCompleteness'
import { readClient } from '@/cms/lib/readClient'

export type ContentAuditDoc = {
  _id: string
  _type: string
  title?: string
  slug?: string
  faqCount?: number
}

type AuditDoc = AeoCompletenessDoc & {
  _id: string
  _type: string
  title?: string
  slug?: string
  mainImage?: { alt?: string; asset?: unknown } | null
}

const AUDIT_DOCS_QUERY = `*[
  _type in ["caseStudy", "post"] &&
  coalesce(visibility, status, "published") == "published"
] | order(_updatedAt desc) {
  _id,
  _type,
  title,
  "slug": slug.current,
  metaTitle,
  metaDescription,
  faqSchema[] { question, answer },
  composerSections[] {
    _type,
    faqs[] { question, answer }
  },
  mainImage { alt, asset }
}`

function isMissingMeta(doc: AeoCompletenessDoc): boolean {
  return !doc.metaTitle?.trim() || !doc.metaDescription?.trim()
}

function isMissingFaq(doc: AeoCompletenessDoc): boolean {
  return countFaqItems(doc) < 2
}

function isMissingAlt(doc: { mainImage?: { alt?: string; asset?: unknown } | null }): boolean {
  return Boolean(doc.mainImage?.asset) && !doc.mainImage?.alt?.trim()
}

export async function runContentAudit(): Promise<{
  missingMeta: ContentAuditDoc[]
  missingFaq: ContentAuditDoc[]
  missingAlt: ContentAuditDoc[]
}> {
  const docs = await readClient.fetch<AuditDoc[]>(AUDIT_DOCS_QUERY)

  const missingMeta: ContentAuditDoc[] = []
  const missingFaq: ContentAuditDoc[] = []
  const missingAlt: ContentAuditDoc[] = []

  for (const doc of docs ?? []) {
    const row: ContentAuditDoc = {
      _id: doc._id,
      _type: doc._type,
      title: doc.title,
      slug: doc.slug,
      faqCount: countFaqItems(doc),
    }

    if (isMissingMeta(doc)) missingMeta.push(row)
    if (isMissingFaq(doc)) missingFaq.push(row)
    if (isMissingAlt(doc)) missingAlt.push(row)
  }

  return {
    missingMeta: missingMeta.slice(0, 20),
    missingFaq: missingFaq.slice(0, 20),
    missingAlt: missingAlt.slice(0, 20),
  }
}
