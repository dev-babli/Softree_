import { isCaseStudyCategory } from '@/app/case-studies/categoryConfig'

import { getAeoPublishIssues, type AeoCompletenessDoc } from './aeoCompleteness'
import { caseStudyHasStoryContent, type CaseStudyCompletenessDoc } from './caseStudyCompleteness'
import { postHasContent, type PostCompletenessDoc } from './postCompleteness'

export type PublishReadinessDoc = CaseStudyCompletenessDoc &
  PostCompletenessDoc &
  AeoCompletenessDoc & {
    title?: string
    slug?: { current?: string }
    excerpt?: string
    client?: string
    headerTitle?: string
    category?: string
    mainImage?: { asset?: { _ref?: string } }
    mainImageUrl?: string
    sections?: unknown[]
  }

function hasCoverImage(doc: PublishReadinessDoc): boolean {
  return !!(doc.mainImage?.asset?._ref || doc.mainImageUrl)
}

/** Content blockers before publishing on production (type-aware). */
export function getPublishContentBlockers(
  type: string,
  doc: PublishReadinessDoc | null | undefined,
): string[] {
  if (!doc) return ['save the document first']

  const missing: string[] = []
  if (!doc.title) missing.push('title')
  if (!doc.slug?.current) missing.push('slug')

  if (type === 'post') {
    if (!doc.excerpt) missing.push('excerpt')
    if (!hasCoverImage(doc)) missing.push('cover image')
    if (!postHasContent(doc)) missing.push('story content (body or composer sections)')
    return missing
  }

  if (type === 'caseStudy') {
    if (!doc.excerpt) missing.push('excerpt')
    if (!doc.client) missing.push('client')
    if (!doc.headerTitle) missing.push('header title')
    if (!hasCoverImage(doc)) missing.push('cover image')
    if (!caseStudyHasStoryContent(doc)) {
      missing.push('story content (composer sections or challenge/approach/outcome)')
    }
    if (!doc.category || !isCaseStudyCategory(doc.category)) {
      missing.push('technology category')
    }
    return missing
  }

  if (type === 'marketingPage') {
    if ((doc.sections?.length ?? 0) === 0) missing.push('page sections')
    return missing
  }

  return missing
}

export function getPublishAeoBlockers(type: string, doc: PublishReadinessDoc | null | undefined): string[] {
  if (type !== 'caseStudy' && type !== 'post') return []
  return getAeoPublishIssues(doc)
}
