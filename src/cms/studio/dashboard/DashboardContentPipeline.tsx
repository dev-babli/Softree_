'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import type { DashboardData } from './types'
import { CONTENT_STATUS_COLORS, DASH_CHART } from './chartTheme'

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
          <strong>{entry.value}</strong>
        </div>
      ))}
    </div>
  )
}

export function DashboardContentPipeline({
  data,
  loading,
  onNavigate,
}: {
  data: DashboardData | null
  loading: boolean
  onNavigate: (path: string) => void
}) {
  const chartData = data
    ? [
        {
          name: 'Case studies',
          published: data.caseStudies.published,
          draft: data.caseStudies.drafts,
          needsWork: data.caseStudies.needsWork,
          path: '/studio/structure/caseStudies',
        },
        {
          name: 'Blog',
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
    : []

  return (
    <section className="softree-dash__panel softree-dash__pipeline-chart">
      <div className="softree-dash__panel-head">
        <div>
          <h2 className="softree-dash__panel-title softree-dash__panel-title--friendly">
            Content pipeline
          </h2>
          <p className="softree-dash__panel-sub">Published vs draft vs needs work — click a bar</p>
        </div>
      </div>

      {loading ? (
        <div className="softree-dash__chart-skeleton" style={{ margin: '1rem' }} />
      ) : (
        <div className="softree-pipeline-chart__body">
          <ResponsiveContainer width="100%" height={220} minHeight={220}>
            <BarChart
              data={chartData}
              barGap={4}
              onClick={(state) => {
                const row = state?.activePayload?.[0]?.payload as { path?: string } | undefined
                if (row?.path) onNavigate(row.path)
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={DASH_CHART.grid} vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fill: DASH_CHART.muted, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis allowDecimals={false} tick={{ fill: DASH_CHART.muted, fontSize: 11 }} width={28} />
              <Tooltip content={<ChartTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="published" name="Live" stackId="a" fill={CONTENT_STATUS_COLORS.published} radius={[0, 0, 0, 0]} />
              <Bar dataKey="draft" name="Draft" stackId="a" fill={CONTENT_STATUS_COLORS.draft} />
              <Bar
                dataKey="needsWork"
                name="Needs work"
                stackId="a"
                fill={CONTENT_STATUS_COLORS.needsWork}
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  )
}
