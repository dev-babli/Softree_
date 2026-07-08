'use client'

import { useMemo, type ReactNode } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import type { DashboardData } from './types'
import type { DashboardInsights } from './insightsTypes'
import { CONTENT_STATUS_COLORS, DASH_CHART } from './chartTheme'
import { RecentEditsList } from './RecentEditsList'
import { buildLast7DaysActivity, scoreToneColor } from './utils'

type DashboardChartsProps = {
  data: DashboardData | null
  insights: DashboardInsights | null
  loading: boolean
  insightsLoading?: boolean
  insightsFailed?: boolean
  insightsRefreshing?: boolean
  readiness: number
  attentionCount: number
  onNavigate?: (path: string) => void
  onOpenDoc?: (id: string, type: string) => void
  onRefreshInsights?: () => void
}

function ChartShell({
  title,
  subtitle,
  children,
  className = '',
  action,
}: {
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
  action?: ReactNode
}) {
  return (
    <section className={`softree-dash__chart-panel ${className}`.trim()}>
      <div className="softree-dash__chart-head">
        <div>
          <h2 className="softree-dash__chart-title">{title}</h2>
          {subtitle ? <p className="softree-dash__chart-sub">{subtitle}</p> : null}
        </div>
        {action}
      </div>
      <div className="softree-dash__chart-body">{children}</div>
    </section>
  )
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ name?: string; value?: number; color?: string }>
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="softree-dash__chart-tooltip">
      {label ? <div className="softree-dash__chart-tooltip-label">{label}</div> : null}
      {payload.map((entry) => (
        <div key={entry.name} className="softree-dash__chart-tooltip-row">
          <span style={{ color: entry.color }}>{entry.name}</span>
          <strong>{entry.value?.toLocaleString()}</strong>
        </div>
      ))}
    </div>
  )
}

const ISSUE_NAV: Record<string, string> = {
  Stale: '/studio/structure/caseStudies;caseStudiesAll',
  'In review': '/studio/structure/caseStudies;caseStudiesNeedsWork',
  'Missing SEO': '/studio/structure/blog;postsNeedsWork',
  Drafts: '/studio/structure/caseStudies;caseStudiesAll',
}

export function DashboardCharts({
  data,
  insights,
  loading,
  insightsLoading = false,
  insightsFailed = false,
  insightsRefreshing = false,
  readiness,
  attentionCount,
  onNavigate,
  onOpenDoc,
  onRefreshInsights,
}: DashboardChartsProps) {
  const contentMix = useMemo(() => {
    if (!data) return []
    return [
      {
        name: 'Case studies',
        published: data.caseStudies.published,
        draft: data.caseStudies.drafts,
        needsWork: data.caseStudies.needsWork,
        path: '/studio/structure/caseStudies',
      },
      {
        name: 'Blog posts',
        published: data.posts.published,
        draft: data.posts.drafts,
        needsWork: data.posts.needsWork,
        path: '/studio/structure/blog',
      },
      {
        name: 'Marketing',
        published: data.marketing.published,
        draft: data.marketing.drafts,
        needsWork: Math.max(
          0,
          data.marketing.total - data.marketing.published - data.marketing.drafts,
        ),
        path: '/studio/structure/marketing',
      },
    ]
  }, [data])

  const issueBreakdown = useMemo(() => {
    if (!insights) return []
    const { stalePublished, pendingReview, missingMeta, missingFaq, missingAlt, unpublishedDrafts } =
      insights.contentIssues
    return [
      { name: 'Stale', value: stalePublished, fill: DASH_CHART.warning },
      { name: 'In review', value: pendingReview, fill: DASH_CHART.accent },
      { name: 'Missing SEO', value: missingMeta, fill: DASH_CHART.accentSoft },
      { name: 'Missing FAQ', value: missingFaq, fill: '#6366f1' },
      { name: 'Missing alt', value: missingAlt, fill: '#0ea5e9' },
      { name: 'Drafts', value: unpublishedDrafts, fill: '#94a3b8' },
    ].filter((d) => d.value > 0)
  }, [insights])

  const activitySeries = useMemo(
    () => buildLast7DaysActivity(data?.activity7d),
    [data],
  )

  const psiScores = useMemo(() => {
    const mobile = insights?.performance.pages.find(
      (p) => p.path === '/' && p.strategy === 'mobile',
    )?.scores
    if (!mobile) return []
    return [
      { metric: 'Performance', score: mobile.performance },
      { metric: 'SEO', score: mobile.seo },
      { metric: 'A11y', score: mobile.accessibility },
    ]
  }, [insights])

  const siteMetrics = useMemo(() => {
    const rows: Array<{ name: string; value: number; fill: string }> = []
    if (insights?.posthog.configured && insights.posthog.pageviews7d != null) {
      rows.push({
        name: 'Pageviews (7d)',
        value: insights.posthog.pageviews7d,
        fill: DASH_CHART.accent,
      })
    }
    if (insights?.posthog.configured && insights.posthog.uniqueVisitors7d != null) {
      rows.push({
        name: 'Visitors (7d)',
        value: insights.posthog.uniqueVisitors7d,
        fill: DASH_CHART.accentSoft,
      })
    }
    if (insights?.gsc.configured && insights.gsc.clicks28d != null) {
      rows.push({
        name: 'GSC clicks',
        value: insights.gsc.clicks28d,
        fill: DASH_CHART.success,
      })
    }
    if (insights?.gsc.configured && insights.gsc.impressions28d != null) {
      rows.push({
        name: 'Impressions',
        value: insights.gsc.impressions28d,
        fill: '#64748b',
      })
    }
    return rows
  }, [insights])

  const updatedLabel = insights?.fetchedAt
    ? `Site data · ${new Date(insights.fetchedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    : insightsLoading
      ? 'Syncing site data…'
      : insightsFailed
        ? 'Site metrics unavailable — content data is live'
        : 'Content data live from Sanity'

  if (loading) {
    return (
      <div className="softree-dash__charts-section">
        <div className="softree-dash__charts-section-head">
          <h2 className="softree-dash__section-title">Content analytics</h2>
        </div>
        <div className="softree-dash__charts-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="softree-dash__chart-panel softree-dash__chart-panel--loading">
              <div className="softree-dash__chart-skeleton" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="softree-dash__charts-section">
      <div className="softree-dash__charts-section-head">
        <div>
          <h2 className="softree-dash__section-title">Content analytics</h2>
          <p className="softree-dash__section-sub">
            Pipeline health, editorial gaps, and site performance
          </p>
        </div>
        <div className="softree-dash__charts-section-actions">
          <span className="softree-dash__charts-updated">{updatedLabel}</span>
          {onRefreshInsights ? (
            <button
              type="button"
              className="softree-dash__refresh-btn"
              onClick={onRefreshInsights}
              disabled={insightsRefreshing || insightsLoading}
              aria-busy={insightsRefreshing}
            >
              {insightsRefreshing ? 'Refreshing…' : 'Refresh site data'}
            </button>
          ) : null}
        </div>
      </div>

      <div className="softree-dash__charts-grid">
        {/* Primary: pipeline (Sanity Insights — Work in Progress + Document Types) */}
        <ChartShell
          title="Content pipeline"
          subtitle="Published · draft · needs work"
          className="softree-dash__chart-panel--wide"
          action={
            onNavigate ? (
              <button
                type="button"
                className="softree-dash__chart-link"
                onClick={() => onNavigate('/studio/structure/caseStudies')}
              >
                Open content
              </button>
            ) : null
          }
        >
          <ResponsiveContainer width="100%" height={280} minHeight={280}>
            <BarChart
              data={contentMix}
              barGap={4}
              barCategoryGap="18%"
              onClick={(state) => {
                const row = state?.activePayload?.[0]?.payload as {path?: string} | undefined
                if (row?.path && onNavigate) onNavigate(row.path)
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={DASH_CHART.grid} vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fill: DASH_CHART.muted, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fill: DASH_CHART.muted, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<ChartTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
                formatter={(value) => (
                  <span style={{ color: DASH_CHART.muted }}>{String(value)}</span>
                )}
              />
              <Bar
                dataKey="published"
                name="Published"
                stackId="a"
                fill={CONTENT_STATUS_COLORS.published}
                cursor={onNavigate ? 'pointer' : undefined}
              />
              <Bar
                dataKey="draft"
                name="Draft"
                stackId="a"
                fill={CONTENT_STATUS_COLORS.draft}
                cursor={onNavigate ? 'pointer' : undefined}
              />
              <Bar
                dataKey="needsWork"
                name="Needs work"
                stackId="a"
                fill={CONTENT_STATUS_COLORS.needsWork}
                radius={[6, 6, 0, 0]}
                cursor={onNavigate ? 'pointer' : undefined}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartShell>

        {/* Readiness gauge */}
        <ChartShell
          title="Publish readiness"
          subtitle={`${attentionCount} items in the queue`}
        >
          <div className="softree-dash__gauge-wrap">
            <ResponsiveContainer width="100%" height={200} minHeight={200}>
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="68%"
                outerRadius="100%"
                barSize={14}
                data={[{ name: 'Readiness', value: readiness, fill: DASH_CHART.accent }]}
                startAngle={90}
                endAngle={-270}
              >
                <RadialBar
                  background={{ fill: '#eef2f6' }}
                  dataKey="value"
                  cornerRadius={8}
                  fill={DASH_CHART.accent}
                />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="softree-dash__gauge-center">
              <span className="softree-dash__gauge-value">{readiness}%</span>
              <span className="softree-dash__gauge-label">ready to publish</span>
            </div>
          </div>
        </ChartShell>

        {/* Issues donut (composition at a glance) */}
        <ChartShell title="Content issues" subtitle="Click a segment to jump in">
          {insightsLoading ? (
            <div className="softree-dash__chart-empty">Loading issue data…</div>
          ) : insightsFailed || !insights ? (
            <div className="softree-dash__chart-empty">
              Could not load site issue metrics. Editorial queue below still reflects Sanity data.
            </div>
          ) : issueBreakdown.length === 0 ? (
            <div className="softree-dash__chart-empty">No open issues — great job.</div>
          ) : (
            <div className="softree-dash__donut-wrap">
              <ResponsiveContainer width="100%" height={200} minHeight={200}>
                <PieChart>
                  <Pie
                    data={issueBreakdown}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={52}
                    outerRadius={78}
                    paddingAngle={2}
                    strokeWidth={0}
                    cursor={onNavigate ? 'pointer' : undefined}
                    onClick={(_, index) => {
                      const item = issueBreakdown[index]
                      const path = item ? ISSUE_NAV[item.name] : undefined
                      if (path && onNavigate) onNavigate(path)
                    }}
                  >
                    {issueBreakdown.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <ul className="softree-dash__donut-legend">
                {issueBreakdown.map((entry) => (
                  <li key={entry.name}>
                    <button
                      type="button"
                      className="softree-dash__donut-legend-btn"
                      onClick={() => {
                        const path = ISSUE_NAV[entry.name]
                        if (path && onNavigate) onNavigate(path)
                      }}
                    >
                      <span className="softree-dash__donut-swatch" style={{ background: entry.fill }} />
                      {entry.name}
                      <strong>{entry.value}</strong>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </ChartShell>

        {/* Activity — Documents Created velocity (Sanity Insights pattern) */}
        <ChartShell
          title="Edit velocity"
          subtitle="Last 7 days · click recent edits to open"
          className="softree-dash__chart-panel--velocity"
        >
          <ResponsiveContainer width="100%" height={200} minHeight={200}>
            <AreaChart data={activitySeries}>
              <defs>
                <linearGradient id="softreeDashActivity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={DASH_CHART.accent} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={DASH_CHART.accent} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={DASH_CHART.grid} vertical={false} />
              <XAxis
                dataKey="day"
                tick={{ fill: DASH_CHART.muted, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fill: DASH_CHART.muted, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<ChartTooltip />} />
              <Area
                type="monotone"
                dataKey="edits"
                name="Edits"
                stroke={DASH_CHART.accent}
                strokeWidth={2}
                fill="url(#softreeDashActivity)"
              />
            </AreaChart>
          </ResponsiveContainer>
          {onOpenDoc ? (
            <RecentEditsList
              items={data?.recentActivity ?? []}
              onOpen={onOpenDoc}
            />
          ) : null}
        </ChartShell>

        {/* PSI — threshold colors */}
        <ChartShell
          title="PageSpeed"
          subtitle={
            insightsRefreshing
              ? 'Refreshing scores…'
              : insightsLoading
                ? 'Loading scores…'
                : insights?.performance.configured
                  ? 'Homepage · mobile'
                  : insights?.performance.hint || 'Connect PSI_API_KEY'
          }
          className={insightsRefreshing ? 'softree-dash__chart-panel--refreshing' : ''}
        >
          {psiScores.length === 0 ? (
            <div className="softree-dash__chart-empty">
              {insightsRefreshing
                ? 'Refreshing PageSpeed scores…'
                : insightsLoading
                  ? 'Fetching PageSpeed scores…'
                  : insights?.performance.hint || 'Scores appear when PageSpeed is connected.'}
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220} minHeight={220}>
              <BarChart data={psiScores} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" stroke={DASH_CHART.grid} vertical={false} />
                <XAxis
                  dataKey="metric"
                  tick={{ fill: DASH_CHART.muted, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis domain={[0, 100]} tick={{ fill: DASH_CHART.muted, fontSize: 11 }} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="score" name="Score" radius={[6, 6, 0, 0]}>
                  {psiScores.map((entry) => (
                    <Cell key={entry.metric} fill={scoreToneColor(entry.score)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartShell>

        {/* Site metrics */}
        <ChartShell
          title="Site metrics"
          subtitle="Traffic & search when connected"
          className={insightsRefreshing ? 'softree-dash__chart-panel--refreshing' : ''}
        >
          {siteMetrics.length === 0 ? (
            <div className="softree-dash__chart-empty">
              {insightsRefreshing
                ? 'Refreshing traffic & search…'
                : insightsLoading
                  ? 'Loading traffic & search…'
                  : 'Connect GSC with GSC_PROPERTY_URL + service account, or paste GSC_SNAPSHOT_JSON.'}
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220} minHeight={220}>
              <BarChart data={siteMetrics} layout="vertical" barSize={16}>
                <CartesianGrid strokeDasharray="3 3" stroke={DASH_CHART.grid} horizontal={false} />
                <XAxis type="number" tick={{ fill: DASH_CHART.muted, fontSize: 11 }} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={110}
                  tick={{ fill: DASH_CHART.ink, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="value" name="Count" radius={[0, 6, 6, 0]}>
                  {siteMetrics.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartShell>
      </div>
    </div>
  )
}
