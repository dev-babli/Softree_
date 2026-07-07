'use client'

import { LaunchIcon } from '@sanity/icons'

import type { DashboardInsights } from './insightsTypes'
import { scoreToneColor } from './utils'

function ScoreBadge({ label, score }: { label: string; score: number | null | undefined }) {
  if (score == null) {
    return (
      <span className="softree-page-score__badge softree-page-score__badge--muted">
        {label} —
      </span>
    )
  }
  const color = scoreToneColor(score)
  return (
    <span className="softree-page-score__badge" style={{ borderColor: color, color }}>
      {label} {score}
    </span>
  )
}

export function DashboardPageScorecards({
  insights,
  loading,
}: {
  insights: DashboardInsights | null
  loading: boolean
}) {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')
  const pages = insights?.performance.pages ?? []

  return (
    <section className="softree-page-scores" aria-label="Page performance">
      <div className="softree-page-scores__head">
        <div>
          <h2 className="softree-page-scores__title">Page performance</h2>
          <p className="softree-page-scores__sub">
            Mobile PageSpeed scores for your key routes — inspired by Vercel Speed Insights
          </p>
        </div>
        {!insights?.performance.configured && !loading ? (
          <p className="softree-page-scores__setup">{insights?.performance.hint}</p>
        ) : null}
      </div>

      <div className="softree-page-scores__grid">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="softree-page-scores__card softree-page-scores__card--loading">
                <div className="softree-dash__kpi-skeleton" />
              </div>
            ))
          : pages.length > 0
            ? pages.map((page) => {
                const url = `${siteUrl}${page.path}`
                const perf = page.scores?.performance
                const ringPct = perf ?? 0
                const ringColor = perf != null ? scoreToneColor(perf) : '#cbd5e1'

                return (
                  <article key={`${page.path}-${page.strategy}`} className="softree-page-scores__card">
                    <div className="softree-page-scores__card-top">
                      <div>
                        <h3 className="softree-page-scores__name">{page.label}</h3>
                        <code className="softree-page-scores__path">{page.path}</code>
                      </div>
                      <div
                        className="softree-page-scores__ring"
                        style={{
                          background: `conic-gradient(${ringColor} ${ringPct * 3.6}deg, #eef2f6 0)`,
                        }}
                        aria-label={perf != null ? `Performance ${perf}` : 'No score'}
                      >
                        <span className="softree-page-scores__ring-inner">
                          {perf ?? '—'}
                        </span>
                      </div>
                    </div>

                    {page.error ? (
                      <p className="softree-page-scores__error">{page.error}</p>
                    ) : (
                      <div className="softree-page-scores__badges">
                        <ScoreBadge label="Perf" score={page.scores?.performance} />
                        <ScoreBadge label="SEO" score={page.scores?.seo} />
                        <ScoreBadge label="A11y" score={page.scores?.accessibility} />
                      </div>
                    )}

                    <a
                      className="softree-page-scores__link"
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open live page
                      <LaunchIcon />
                    </a>
                  </article>
                )
              })
            : (
              <div className="softree-page-scores__empty">
                Connect <code>PSI_API_KEY</code> to score your marketing pages. Run{' '}
                <code>npm run psi</code> for a full audit.
              </div>
            )}
      </div>
    </section>
  )
}
