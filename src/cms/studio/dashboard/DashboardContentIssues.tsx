'use client'

import type { DashboardInsights } from './insightsTypes'

type IssueRow = {
  id: string
  label: string
  count: number
  why: string
  fixPath: string
  fixLabel: string
}

function buildIssues(insights: DashboardInsights): IssueRow[] {
  const { contentIssues: c } = insights
  return [
    {
      id: 'stale',
      label: 'Stale published content',
      count: c.stalePublished,
      why: 'Not updated in 90+ days — may hurt freshness signals',
      fixPath: '/studio/structure/caseStudies;caseStudiesPublished',
      fixLabel: 'Review published',
    },
    {
      id: 'review',
      label: 'Awaiting review',
      count: c.pendingReview,
      why: 'Review status not approved — blocked from confident publish',
      fixPath: '/studio/structure/caseStudies;caseStudiesNeedsWork',
      fixLabel: 'Open queue',
    },
    {
      id: 'meta',
      label: 'Missing meta title/description',
      count: c.missingMeta,
      why: 'Hurts Google snippets and social previews',
      fixPath: '/studio/structure/blog;postsNeedsWork',
      fixLabel: 'Fix SEO fields',
    },
    {
      id: 'faq',
      label: 'Thin FAQ (AEO)',
      count: c.missingFaq,
      why: 'Fewer than 2 FAQ entries — weak for AI search answers',
      fixPath: '/studio/structure/blog;postsNeedsWork',
      fixLabel: 'Add FAQs',
    },
    {
      id: 'alt',
      label: 'Images missing alt text',
      count: c.missingAlt,
      why: 'Accessibility and image search suffer',
      fixPath: '/studio/structure/caseStudies;caseStudiesNeedsWork',
      fixLabel: 'Add alt text',
    },
    {
      id: 'drafts',
      label: 'Unpublished drafts',
      count: c.unpublishedDrafts,
      why: 'Work started but not live yet',
      fixPath: '/studio/structure/caseStudies;caseStudiesDrafts',
      fixLabel: 'View drafts',
    },
  ].filter((row) => row.count > 0)
}

export function DashboardContentIssues({
  insights,
  loading,
  onNavigate,
}: {
  insights: DashboardInsights | null
  loading: boolean
  onNavigate: (path: string) => void
}) {
  const rows = insights ? buildIssues(insights) : []

  return (
    <section className="softree-dash__panel softree-dash__issues">
      <div className="softree-dash__panel-head">
        <div>
          <h2 className="softree-dash__panel-title softree-dash__panel-title--friendly">
            What to fix for search &amp; AI
          </h2>
          <p className="softree-dash__panel-sub">Each row is actionable — click to jump in Studio</p>
        </div>
      </div>

      {loading ? (
        <div className="softree-dash__empty">Scanning content…</div>
      ) : rows.length === 0 ? (
        <div className="softree-dash__empty softree-dash__empty--celebrate">
          <p className="softree-dash__empty-title">No editorial gaps detected</p>
          <p>Meta, FAQ, alt text, and review status look good across published content.</p>
        </div>
      ) : (
        <ul className="softree-issues__list">
          {rows.map((row) => (
            <li key={row.id}>
              <button
                type="button"
                className="softree-issues__row"
                onClick={() => onNavigate(row.fixPath)}
              >
                <span className="softree-issues__count">{row.count}</span>
                <div className="softree-issues__body">
                  <strong>{row.label}</strong>
                  <span>{row.why}</span>
                </div>
                <span className="softree-issues__action">{row.fixLabel} →</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
