export type ContentTypeStats = {
  total: number
  published: number
  drafts: number
  needsWork: number
}

export type AttentionItem = {
  _id: string
  _type?: 'caseStudy' | 'post'
  title?: string
  client?: string
  headerTitle?: string
  excerpt?: string
  status?: string
  hasImage?: boolean
  hasStory?: boolean
  hasBody?: boolean
  _updatedAt?: string
}

export type ActivityItem = {
  _id: string
  _type: string
  title?: string
  client?: string
  status?: string
  _updatedAt?: string
}

export type DashboardData = {
  caseStudies: ContentTypeStats
  posts: ContentTypeStats
  marketing: {total: number; published: number; drafts: number}
  attentionCaseStudies: AttentionItem[]
  attentionPosts: AttentionItem[]
  recentActivity: ActivityItem[]
  /** All documents touched in the last 7 days — powers velocity chart + KPI. */
  activity7d: Array<{_updatedAt: string}>
  edits7dCount: number
}
