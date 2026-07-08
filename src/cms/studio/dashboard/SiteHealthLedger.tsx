'use client'

import { LaunchIcon } from '@sanity/icons'

import type { DashboardInsights } from './insightsTypes'

function scoreTone(value: number | undefined, good = 90, ok = 70): 'good' | 'warn' | 'bad' | 'muted' {
  if (value == null) return 'muted'
  if (value >= good) return 'good'
  if (value >= ok) return 'warn'
  return 'bad'
}

function LedgerTile({
  title,
  value,
  sub,
  tone = 'muted',
  hint,
  href,
  hrefLabel,
}: {
  title: string
  value: string
  sub?: string
  tone?: 'good' | 'warn' | 'bad' | 'muted'
  hint?: string
  href?: string
  hrefLabel?: string
}) {
  return (
    <article className={`softree-dash__ledger-tile is-${tone}`}>
      <div className="softree-dash__ledger-top">
        <span className="softree-dash__ledger-label">{title}</span>
        <span className={`softree-dash__ledger-dot is-${tone}`} aria-hidden />
      </div>
      <div className="softree-dash__ledger-value">{value}</div>
      {sub ? <p className="softree-dash__ledger-sub">{sub}</p> : null}
      {hint ? <p className="softree-dash__ledger-hint">{hint}</p> : null}
      {href ? (
        <a className="softree-dash__ledger-link" href={href} target="_blank" rel="noopener noreferrer">
          {hrefLabel || 'Open'}
          <LaunchIcon />
        </a>
      ) : null}
    </article>
  )
}

export function SiteHealthLedger({
  insights,
  loading,
}: {
  insights: DashboardInsights | null
  loading: boolean
}) {
  if (loading) {
    return (
      <section className="softree-dash__ledger" aria-label="Site health">
        <div className="softree-dash__ledger-head">
          <h2 className="softree-dash__panel-title">Site health</h2>
        </div>
        <div className="softree-dash__ledger-grid">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="softree-dash__ledger-tile is-muted">
              <div className="softree-dash__ledger-value">—</div>
              <p className="softree-dash__ledger-hint">Loading…</p>
            </div>
          ))}
        </div>
      </section>
    )
  }

  const mobileHome = insights?.performance.pages.find(
    (p) => p.path === '/' && p.strategy === 'mobile',
  )
  const mobilePerf = mobileHome?.scores?.performance
  const mobileSeo = mobileHome?.scores?.seo

  const issueTotal = insights
    ? insights.contentIssues.stalePublished +
      insights.contentIssues.pendingReview +
      insights.contentIssues.missingMeta
    : 0

  return (
    <section className="softree-dash__ledger" aria-label="Site health">
      <div className="softree-dash__ledger-head">
        <h2 className="softree-dash__panel-title">Site health</h2>
        {insights?.fetchedAt ? (
          <span className="softree-dash__ledger-updated">
            Updated {new Date(insights.fetchedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        ) : null}
      </div>

      <div className="softree-dash__ledger-grid">
        <LedgerTile
          title="Performance"
          value={
            insights?.performance.configured && mobilePerf != null
              ? `${mobilePerf}`
              : '—'
          }
          sub={
            insights?.performance.configured && mobileSeo != null
              ? `Homepage mobile · SEO ${mobileSeo}`
              : undefined
          }
          tone={scoreTone(mobilePerf, 90, 50)}
          hint={
            insights?.performance.configured
              ? mobileHome?.error
              : insights?.performance.hint
          }
        />

        <LedgerTile
          title="Traffic (7d)"
          value={
            insights?.posthog.configured
              ? `${insights.posthog.pageviews7d?.toLocaleString() ?? 0}`
              : '—'
          }
          sub={
            insights?.posthog.configured
              ? `${insights.posthog.uniqueVisitors7d?.toLocaleString() ?? 0} unique visitors`
              : undefined
          }
          tone={insights?.posthog.configured ? 'good' : 'muted'}
          hint={insights?.posthog.configured ? undefined : insights?.posthog.hint}
        />

        <LedgerTile
          title="Search (28d)"
          value={
            insights?.gsc.configured
              ? `${insights.gsc.clicks28d?.toLocaleString() ?? 0}`
              : '—'
          }
          sub={
            insights?.gsc.configured
              ? `${insights.gsc.impressions28d?.toLocaleString() ?? 0} impressions · ${insights.gsc.ctr ?? 0}% CTR`
              : undefined
          }
          tone={insights?.gsc.configured ? 'good' : 'muted'}
          hint={insights?.gsc.configured ? undefined : insights?.gsc.hint}
          href={insights?.gsc.consoleUrl}
          hrefLabel="Open Search Console"
        />

        <LedgerTile
          title="Content issues"
          value={`${issueTotal}`}
          sub={
            insights
              ? `${insights.contentIssues.stalePublished} stale · ${insights.contentIssues.pendingReview} review · ${insights.contentIssues.missingMeta} missing SEO`
              : undefined
          }
          tone={issueTotal === 0 ? 'good' : issueTotal <= 5 ? 'warn' : 'bad'}
          hint={
            insights?.contentIssues.unpublishedDrafts
              ? `${insights.contentIssues.unpublishedDrafts} unpublished drafts`
              : undefined
          }
        />
      </div>
    </section>
  )
}
