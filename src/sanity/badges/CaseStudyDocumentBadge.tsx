import type { DocumentBadgeComponent } from 'sanity'

import { caseStudyHasStoryContent, type CaseStudyCompletenessDoc } from '@/sanity/lib/caseStudyCompleteness'

type CS = CaseStudyCompletenessDoc & {
  _type?: string
  excerpt?: string
  client?: string
  headerTitle?: string
  mainImage?: { asset?: { _ref?: string } }
  mainImageUrl?: string
}

export const CaseStudyDocumentBadge: DocumentBadgeComponent = (props) => {
  const { draft, published } = props
  const doc = (draft || published) as CS | undefined
  if (!doc || doc._type !== 'caseStudy') return null

  const missing: string[] = []
  if (!doc.excerpt) missing.push('excerpt')
  if (!doc.client) missing.push('client')
  if (!doc.headerTitle) missing.push('header')
  const hasImage = !!(doc.mainImage?.asset?._ref || doc.mainImageUrl)
  if (!hasImage) missing.push('image')
  if (!caseStudyHasStoryContent(doc)) missing.push('story')

  if (missing.length > 0) {
    return { label: `Needs: ${missing.join(', ')}`, color: 'warning' }
  }
  return { label: 'Complete', color: 'success' }
}
