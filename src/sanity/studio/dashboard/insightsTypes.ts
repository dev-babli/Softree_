export type PerformancePageInsight = {
  label: string
  path: string
  strategy: 'mobile' | 'desktop'
  scores: {
    performance: number
    seo: number
    accessibility: number
  } | null
  error?: string
}

export type DashboardInsights = {
  fetchedAt: string
  performance: {
    configured: boolean
    hint?: string
    pages: PerformancePageInsight[]
  }
  posthog: {
    configured: boolean
    hint?: string
    pageviews7d?: number
    uniqueVisitors7d?: number
  }
  gsc: {
    configured: boolean
    hint?: string
    clicks28d?: number
    impressions28d?: number
    ctr?: number
    consoleUrl: string
  }
  contentIssues: {
    stalePublished: number
    pendingReview: number
    missingMeta: number
    missingFaq: number
    missingAlt: number
    unpublishedDrafts: number
  }
}
