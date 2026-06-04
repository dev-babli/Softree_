import type { DocumentBadgeComponent } from 'sanity'

type CS = {
  _type?: string
  excerpt?: string
  client?: string
  mainImage?: { asset?: { _ref?: string } }
  mainImageUrl?: string
  challengeContent?: unknown[]
  approachContent?: unknown[]
  outcomeContent?: unknown[]
  body?: unknown[]
}

export const CaseStudyDocumentBadge: DocumentBadgeComponent = (props) => {
  const { draft, published } = props
  const doc = (draft || published) as CS | undefined
  if (!doc || doc._type !== 'caseStudy') return null

  const missing: string[] = []
  if (!doc.excerpt) missing.push('excerpt')
  if (!doc.client) missing.push('client')
  const hasImage = !!(doc.mainImage?.asset?._ref || doc.mainImageUrl)
  if (!hasImage) missing.push('image')
  const hasStory =
    (doc.challengeContent?.length ?? 0) > 0 ||
    (doc.approachContent?.length ?? 0) > 0 ||
    (doc.outcomeContent?.length ?? 0) > 0 ||
    (doc.body?.length ?? 0) > 0
  if (!hasStory) missing.push('story')

  if (missing.length > 0) {
    return { label: `Needs: ${missing.join(', ')}`, color: 'warning' }
  }
  return { label: 'Complete', color: 'success' }
}
