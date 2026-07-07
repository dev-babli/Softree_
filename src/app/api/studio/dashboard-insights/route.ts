import { unstable_cache } from 'next/cache'
import { NextResponse } from 'next/server'

import { auditPageSpeed } from '@/lib/psi/auditPage'
import { fetchGscSnapshot } from '@/lib/studio/gscSnapshot'
import { fetchPosthogSnapshot } from '@/lib/studio/posthogSnapshot'
import { client } from '@/sanity/lib/client'
import type { DashboardInsights } from '@/sanity/studio/dashboard/insightsTypes'

const SITE_BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.softreetechnology.com'

const CONTENT_ISSUES_QUERY = `{
  "stalePublished": count(*[
    _type in ["caseStudy", "post"] &&
    coalesce(status, "published") == "published" &&
    dateTime(_updatedAt) < dateTime(now()) - 60*60*24*90
  ]),
  "pendingReview": count(*[
    _type in ["caseStudy", "post", "marketingPage"] &&
    coalesce(reviewStatus, "draft") != "approved" &&
    coalesce(status, "published") != "archived"
  ]),
  "missingMeta": count(*[
    _type in ["caseStudy", "post"] &&
    coalesce(status, "published") == "published" &&
    (!defined(metaTitle) || !defined(metaDescription))
  ]),
  "missingFaq": count(*[
    _type in ["caseStudy", "post"] &&
    coalesce(status, "published") == "published" &&
    (
      count(coalesce(faqSchema, [])) +
      count(coalesce(faqs, [])) +
      count(coalesce(composerSections[_type == "csFaqSection"].faqs, []))
    ) < 2
  ]),
  "missingAlt": count(*[
    _type in ["caseStudy", "post"] &&
    coalesce(status, "published") == "published" &&
    defined(mainImage.asset) &&
    !defined(mainImage.alt)
  ]),
  "unpublishedDrafts": count(*[
    _type in ["caseStudy", "post"] &&
    coalesce(status, "published") == "draft"
  ])
}`

/** Key marketing routes — PageSpeed audits (cached 1h; dev needs PSI_DASHBOARD=1). */
const PSI_DASHBOARD_PAGES: Array<{
  label: string
  path: string
  strategy: 'mobile' | 'desktop'
}> = [
  { label: 'Homepage', path: '/', strategy: 'mobile' },
  { label: 'Case studies hub', path: '/case-studies', strategy: 'mobile' },
  { label: 'Blog', path: '/blog', strategy: 'mobile' },
  { label: 'Contact', path: '/contact', strategy: 'mobile' },
  { label: 'Services', path: '/services', strategy: 'mobile' },
]

const shouldRunPsi =
  Boolean(process.env.PSI_API_KEY) &&
  (process.env.NODE_ENV !== 'development' || process.env.PSI_DASHBOARD === '1')

async function loadPerformancePages(): Promise<DashboardInsights['performance']> {
  const psiKey = process.env.PSI_API_KEY

  if (!psiKey) {
    return {
      configured: false,
      hint: 'Set PSI_API_KEY to load PageSpeed scores (same key as npm run psi).',
      pages: [],
    }
  }

  if (!shouldRunPsi) {
    return {
      configured: false,
      hint: 'PSI skipped in dev (slow). Set PSI_DASHBOARD=1 to enable, or run npm run psi.',
      pages: [],
    }
  }

  const pages = await Promise.all(
    PSI_DASHBOARD_PAGES.map(async (page) => {
      const url = `${SITE_BASE.replace(/\/$/, '')}${page.path}`
      try {
        const scores = await auditPageSpeed(url, page.strategy, psiKey)
        return {
          label: page.label,
          path: page.path,
          strategy: page.strategy,
          scores: {
            performance: scores.performance,
            seo: scores.seo,
            accessibility: scores.accessibility,
          },
        }
      } catch (err) {
        return {
          label: page.label,
          path: page.path,
          strategy: page.strategy,
          scores: null,
          error: err instanceof Error ? err.message : 'PSI request failed',
        }
      }
    }),
  )

  return { configured: true, pages }
}

async function loadDashboardInsights(): Promise<DashboardInsights> {
  const [contentIssues, posthog, gsc, performance] = await Promise.all([
    client.fetch<DashboardInsights['contentIssues']>(CONTENT_ISSUES_QUERY),
    fetchPosthogSnapshot(),
    fetchGscSnapshot(),
    loadPerformancePages(),
  ])

  return {
    fetchedAt: new Date().toISOString(),
    performance,
    posthog,
    gsc,
    contentIssues,
  }
}

const getCachedInsights = unstable_cache(
  loadDashboardInsights,
  ['softree-studio-dashboard-insights'],
  { revalidate: 3600 },
)

export async function GET(request: Request) {
  const forceRefresh = new URL(request.url).searchParams.get('refresh') === '1'
  const payload = forceRefresh ? await loadDashboardInsights() : await getCachedInsights()
  return NextResponse.json(payload)
}
