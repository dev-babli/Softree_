'use client'

import { useMemo } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import type { DashboardData } from './types'
import { DASH_CHART } from './chartTheme'
import { buildLast7DaysActivity } from './utils'
import { RecentEditsList } from './RecentEditsList'

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value?: number }>
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="softree-dash__chart-tooltip">
      <div className="softree-dash__chart-tooltip-label">{label}</div>
      <div className="softree-dash__chart-tooltip-row">
        <span>Edits</span>
        <strong>{payload[0]?.value}</strong>
      </div>
    </div>
  )
}

export function DashboardEditVelocity({
  data,
  loading,
  onOpenDoc,
}: {
  data: DashboardData | null
  loading: boolean
  onOpenDoc: (id: string, type: string) => void
}) {
  const series = useMemo(() => buildLast7DaysActivity(data?.activity7d), [data])

  return (
    <section className="softree-dash__panel softree-dash__velocity">
      <div className="softree-dash__panel-head">
        <div>
          <h2 className="softree-dash__panel-title softree-dash__panel-title--friendly">
            Editorial activity
          </h2>
          <p className="softree-dash__panel-sub">Team edits over the last 7 days</p>
        </div>
      </div>

      {loading ? (
        <div className="softree-dash__chart-skeleton" style={{ margin: '1rem' }} />
      ) : (
        <div className="softree-velocity__chart">
          <ResponsiveContainer width="100%" height={160} minHeight={160}>
            <AreaChart data={series}>
              <defs>
                <linearGradient id="softreeVelocityFill" x1="0" y1="0" x2="0" y2="1">
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
                width={28}
              />
              <Tooltip content={<ChartTooltip />} />
              <Area
                type="monotone"
                dataKey="edits"
                stroke={DASH_CHART.accent}
                strokeWidth={2}
                fill="url(#softreeVelocityFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {!loading && (data?.recentActivity?.length ?? 0) > 0 ? (
        <RecentEditsList items={data?.recentActivity ?? []} onOpen={onOpenDoc} hideHead />
      ) : null}
    </section>
  )
}
