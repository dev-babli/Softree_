import type {AttentionItem, ContentTypeStats} from './types'

export function formatRelativeTime(iso?: string): string {
  if (!iso) return ''
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return new Date(iso).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})
}

export function getCaseStudyMissing(item: AttentionItem): string[] {
  const missing: string[] = []
  if (!item.client) missing.push('Client')
  if (!item.headerTitle) missing.push('Header title')
  if (!item.excerpt) missing.push('Excerpt')
  if (!item.hasImage) missing.push('Cover image')
  if (!item.hasStory) missing.push('Story sections')
  if (item.status === 'draft') missing.push('Still draft')
  return missing
}

export function getPostMissing(item: AttentionItem): string[] {
  const missing: string[] = []
  if (!item.excerpt) missing.push('Excerpt')
  if (!item.hasBody) missing.push('Body')
  if (!item.hasImage) missing.push('Cover image')
  if (item.status === 'draft') missing.push('Still draft')
  return missing
}

export function publishReadinessPercent(stats: {
  caseStudies: ContentTypeStats
  posts: ContentTypeStats
}): number {
  const total = stats.caseStudies.total + stats.posts.total
  if (total === 0) return 100
  const needsWork = stats.caseStudies.needsWork + stats.posts.needsWork
  const ready = Math.max(0, total - needsWork)
  return Math.round((ready / total) * 100)
}

export function greetingForHour(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export function docPath(type: string, id: string): string {
  switch (type) {
    case 'caseStudy':
      return `/studio/structure/caseStudies;caseStudiesMenu;caseStudiesAll;${id}`
    case 'post':
      return `/studio/structure/blog;blogMenu;postsAll;${id}`
    case 'marketingPage':
      return `/studio/structure/marketing;marketingMenu;${id}`
    default:
      return `/studio/structure/${type};${id}`
  }
}

export function typeLabel(type: string): string {
  switch (type) {
    case 'caseStudy':
      return 'Case study'
    case 'post':
      return 'Blog post'
    case 'marketingPage':
      return 'Marketing page'
    default:
      return type
  }
}
