'use client'

import { LaunchIcon } from '@sanity/icons'

import type { DashboardInsights } from './insightsTypes'

function formatViews(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  return n.toLocaleString()
}

function pageLabel(path: string): string {
  if (path === '/') return 'Homepage'
  if (path.startsWith('/case-studies')) return 'Case studies'
  if (path.startsWith('/blog')) return 'Blog'
  if (path.startsWith('/services')) return 'Services'
  if (path === '/contact') return 'Contact'
  return path.replace(/^\//, '').replace(/-/g, ' ') || 'Page'
}

export function DashboardTopPages({
  insights,
  loading,
}: {
  insights: DashboardInsights | null
  loading: boolean
}) {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')
  const pages = insights?.posthog.topPages ?? []
  const maxViews = pages[0]?.views ?? 1

  return (
    <section className="softree-dash__panel softree-dash__top-pages">
      <div className="softree-dash__panel-head">
        <div>
          <h2 className="softree-dash__panel-title softree-dash__panel-title--friendly">
            Top pages (7 days)
          </h2>
          <p className="softree-dash__panel-sub">Where visitors spend time — from PostHog</p>
        </div>
      </div>

      {loading ? (
        <div className="softree-dash__empty">Loading traffic…</div>
      ) : !insights?.posthog.configured ? (
        <div className="softree-dash__empty softree-dash__empty--setup">
          <p>{insights?.posthog.hint || 'Connect PostHog to see top pages.'}</p>
        </div>
      ) : pages.length === 0 ? (
        <div className="softree-dash__empty">No pageviews recorded this week yet.</div>
      ) : (
        <ul className="softree-top-pages__list">
          {pages.map((page, index) => {
            const pct = Math.round((page.views / maxViews) * 100)
            const href = `${siteUrl}${page.path.startsWith('/') ? page.path : `/${page.path}`}`
            return (
              <li key={page.path}>
                <a
                  className="softree-top-pages__row"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="softree-top-pages__rank">{index + 1}</span>
                  <div className="softree-top-pages__body">
                    <span className="softree-top-pages__name">{pageLabel(page.path)}</span>
                    <code className="softree-top-pages__path">{page.path}</code>
                    <div className="softree-top-pages__bar" aria-hidden>
                      <div className="softree-top-pages__bar-fill" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  <span className="softree-top-pages__views">{formatViews(page.views)}</span>
                  <LaunchIcon className="softree-top-pages__launch" aria-hidden />
                </a>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
