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
      return `/studio/structure/caseStudies;caseStudiesAll;${id}`
    case 'post':
      return `/studio/structure/blog;post;${id}`
    case 'marketingPage':
      return `/studio/structure/marketing;marketingPage;${id}`
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

function localDateKey(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** Fixed 7-day buckets for activity charts (Sanity Insights-style velocity view). */
export function buildLast7DaysActivity(
  items: Array<{_updatedAt?: string}> | undefined,
): Array<{day: string; edits: number; dateKey: string}> {
  const counts = new Map<string, number>()

  for (const item of items ?? []) {
    if (!item._updatedAt) continue
    const key = localDateKey(new Date(item._updatedAt))
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }

  const buckets: Array<{day: string; edits: number; dateKey: string}> = []
  for (let i = 6; i >= 0; i -= 1) {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    d.setDate(d.getDate() - i)
    const dateKey = localDateKey(d)
    buckets.push({
      day: d.toLocaleDateString(undefined, {weekday: 'short'}),
      edits: counts.get(dateKey) ?? 0,
      dateKey,
    })
  }

  return buckets
}

export function countEditsLast7Days(
  items: Array<{_updatedAt?: string}> | undefined,
  totalFromQuery?: number,
): number {
  if (typeof totalFromQuery === 'number') return totalFromQuery
  const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000
  return (items ?? []).filter((item) => {
    if (!item._updatedAt) return false
    return new Date(item._updatedAt).getTime() >= cutoff
  }).length
}

/** PageSpeed / quality score coloring (green ≥90, amber ≥50, red below). */
export function scoreToneColor(score: number): string {
  if (score >= 90) return '#16a34a'
  if (score >= 50) return '#d97706'
  return '#dc2626'
}
