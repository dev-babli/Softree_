'use client'

import type { ReactNode } from 'react'
import { EarthGlobeIcon, LaunchIcon, SearchIcon, SparklesIcon } from '@sanity/icons'

import type { DashboardInsights } from './insightsTypes'
import { scoreToneColor } from './utils'

type Tone = 'good' | 'warn' | 'bad' | 'muted'

function toneFromScore(score: number | undefined, good = 90, ok = 50): Tone {
  if (score == null) return 'muted'
  if (score >= good) return 'good'
  if (score >= ok) return 'warn'
  return 'bad'
}

function PulseCard({
  label,
  value,
  detail,
  tone,
  hint,
  icon,
  href,
  hrefLabel,
  onAction,
  actionLabel,
}: {
  label: string
  value: string
  detail?: string
  tone: Tone
  hint?: string
  icon: ReactNode
  href?: string
  hrefLabel?: string
  onAction?: () => void
  actionLabel?: string
}) {
  return (
    <article className={`softree-pulse__card softree-pulse__card--${tone}`}>
      <div className="softree-pulse__card-top">
        <span className="softree-pulse__icon" aria-hidden>
          {icon}
        </span>
        <span className="softree-pulse__label">{label}</span>
      </div>
      <div className="softree-pulse__value">{value}</div>
      {detail ? <p className="softree-pulse__detail">{detail}</p> : null}
      {hint ? <p className="softree-pulse__hint">{hint}</p> : null}
      <div className="softree-pulse__footer">
        {href ? (
          <a className="softree-pulse__link" href={href} target="_blank" rel="noopener noreferrer">
            {hrefLabel || 'Open'}
            <LaunchIcon />
          </a>
        ) : null}
        {onAction && actionLabel ? (
          <button type="button" className="softree-pulse__link" onClick={onAction}>
            {actionLabel}
          </button>
        ) : null}
      </div>
    </article>
  )
}

export function DashboardSitePulse({
  insights,
  loading,
  insightsLoading,
  onRefresh,
  onNavigate,
}: {
  insights: DashboardInsights | null
  loading: boolean
  insightsLoading: boolean
  onRefresh?: () => void
  onNavigate: (path: string) => void
}) {
  const busy = loading || insightsLoading

  const mobileHome = insights?.performance.pages.find((p) => p.path === '/')
  const perf = mobileHome?.scores?.performance
  const seo = mobileHome?.scores?.seo
  const a11y = mobileHome?.scores?.accessibility

  const issueTotal = insights
    ? insights.contentIssues.stalePublished +
      insights.contentIssues.pendingReview +
      insights.contentIssues.missingMeta +
      insights.contentIssues.missingFaq +
      insights.contentIssues.missingAlt
    : 0

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.softreetechnology.com'

  return (
    <section className="softree-pulse" aria-label="Site pulse">
      <div className="softree-pulse__head">
        <div>
          <h2 className="softree-pulse__title">Site pulse</h2>
          <p className="softree-pulse__sub">
            Live performance, traffic, and search — how your pages are doing right now
          </p>
        </div>
        <div className="softree-pulse__actions">
          {insights?.fetchedAt ? (
            <span className="softree-pulse__updated">
              Updated{' '}
              {new Date(insights.fetchedAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          ) : null}
          {onRefresh ? (
            <button type="button" className="softree-pulse__refresh" onClick={onRefresh}>
              Refresh metrics
            </button>
          ) : null}
        </div>
      </div>

      <div className="softree-pulse__grid">
        {busy ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="softree-pulse__card softree-pulse__card--loading">
              <div className="softree-dash__kpi-skeleton" />
            </div>
          ))
        ) : (
          <>
            <PulseCard
              label="Homepage speed (mobile)"
              value={insights?.performance.configured && perf != null ? `${perf}` : '—'}
              detail={
                insights?.performance.configured && perf != null
                  ? `SEO ${seo ?? '—'} · A11y ${a11y ?? '—'} · PageSpeed score`
                  : undefined
              }
              tone={toneFromScore(perf)}
              hint={
                insights?.performance.configured
                  ? mobileHome?.error
                  : insights?.performance.hint || 'Set PSI_API_KEY for live scores'
              }
              icon={<EarthGlobeIcon />}
              href={`${siteUrl.replace(/\/$/, '')}/`}
              hrefLabel="View homepage"
            />
            <PulseCard
              label="Visitors (7 days)"
              value={
                insights?.posthog.configured
                  ? (insights.posthog.uniqueVisitors7d?.toLocaleString() ?? '0')
                  : '—'
              }
              detail={
                insights?.posthog.configured
                  ? `${insights.posthog.pageviews7d?.toLocaleString() ?? 0} pageviews · PostHog`
                  : undefined
              }
              tone={insights?.posthog.configured ? 'good' : 'muted'}
              hint={insights?.posthog.configured ? undefined : insights?.posthog.hint}
              icon={<SparklesIcon />}
            />
            <PulseCard
              label="Google Search (28 days)"
              value={
                insights?.gsc.configured
                  ? (insights.gsc.clicks28d?.toLocaleString() ?? '0')
                  : '—'
              }
              detail={
                insights?.gsc.configured
                  ? `${insights.gsc.impressions28d?.toLocaleString() ?? 0} impressions · ${insights.gsc.ctr ?? 0}% CTR`
                  : undefined
              }
              tone={insights?.gsc.configured ? 'good' : 'muted'}
              hint={insights?.gsc.configured ? undefined : insights?.gsc.hint}
              icon={<SearchIcon />}
              href={insights?.gsc.consoleUrl}
              hrefLabel="Search Console"
            />
            <PulseCard
              label="Editorial gaps"
              value={`${issueTotal}`}
              detail={
                insights
                  ? `${insights.contentIssues.missingMeta} missing SEO · ${insights.contentIssues.missingFaq} need FAQ`
                  : undefined
              }
              tone={issueTotal === 0 ? 'good' : issueTotal <= 6 ? 'warn' : 'bad'}
              hint={
                insights?.contentIssues.unpublishedDrafts
                  ? `${insights.contentIssues.unpublishedDrafts} drafts not published yet`
                  : 'Fix these to improve search & AI discoverability'
              }
              icon={<SparklesIcon />}
              onAction={() => onNavigate('/studio/structure/caseStudies;caseStudiesNeedsWork')}
              actionLabel="Open needs-work"
            />
          </>
        )}
      </div>

      {insights?.performance.configured && perf != null ? (
        <p className="softree-pulse__legend">
          Speed score colors:{' '}
          <span style={{ color: scoreToneColor(95) }}>≥90 great</span>
          {' · '}
          <span style={{ color: scoreToneColor(70) }}>50–89 needs work</span>
          {' · '}
          <span style={{ color: scoreToneColor(40) }}>&lt;50 critical</span>
        </p>
      ) : null}
    </section>
  )
}
