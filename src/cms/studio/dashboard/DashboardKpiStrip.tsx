'use client'

import type { ReactNode } from 'react'
import { CaseIcon, DocumentTextIcon, EditIcon, SparklesIcon } from '@sanity/icons'

import type { DashboardData } from './types'
import { countEditsLast7Days } from './utils'
import { DASH_CHART } from './chartTheme'

type DashboardKpiStripProps = {
  data: DashboardData | null
  loading: boolean
  readiness: number
  attentionCount: number
  onNavigate?: (path: string) => void
}

type KpiCardProps = {
  label: string
  value: string
  hint: string
  tone?: 'default' | 'accent' | 'success' | 'warn'
  icon: ReactNode
  onClick?: () => void
}

function KpiCard({ label, value, hint, tone = 'default', icon, onClick }: KpiCardProps) {
  const className = `softree-dash__kpi softree-dash__kpi--${tone}${onClick ? ' softree-dash__kpi--clickable' : ''}`.trim()

  if (onClick) {
    return (
      <button type="button" className={className} onClick={onClick}>
        <div className="softree-dash__kpi-icon" aria-hidden>
          {icon}
        </div>
        <div className="softree-dash__kpi-body">
          <span className="softree-dash__kpi-label">{label}</span>
          <span className="softree-dash__kpi-value">{value}</span>
          <span className="softree-dash__kpi-hint">{hint}</span>
        </div>
      </button>
    )
  }

  return (
    <div className={className}>
      <div className="softree-dash__kpi-icon" aria-hidden>
        {icon}
      </div>
      <div className="softree-dash__kpi-body">
        <span className="softree-dash__kpi-label">{label}</span>
        <span className="softree-dash__kpi-value">{value}</span>
        <span className="softree-dash__kpi-hint">{hint}</span>
      </div>
    </div>
  )
}

export function DashboardKpiStrip({
  data,
  loading,
  readiness,
  attentionCount,
  onNavigate,
}: DashboardKpiStripProps) {
  const edits7d = countEditsLast7Days(data?.activity7d, data?.edits7dCount)

  if (loading) {
    return (
      <div className="softree-dash__kpi-grid" aria-busy="true" aria-label="Loading metrics">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="softree-dash__kpi softree-dash__kpi--loading">
            <div className="softree-dash__kpi-skeleton" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="softree-dash__kpi-grid">
      <KpiCard
        label="Publish readiness"
        value={`${readiness}%`}
        hint={attentionCount === 0 ? 'All clear' : `${attentionCount} need attention`}
        tone={readiness >= 80 ? 'success' : attentionCount > 0 ? 'warn' : 'default'}
        icon={<SparklesIcon />}
        onClick={
          onNavigate && attentionCount > 0
            ? () => onNavigate('/studio/structure/caseStudies;caseStudiesNeedsWork')
            : undefined
        }
      />
      <KpiCard
        label="Case studies live"
        value={`${data?.caseStudies.published ?? 0}`}
        hint={`${data?.caseStudies.needsWork ?? 0} need work · ${data?.caseStudies.drafts ?? 0} drafts`}
        tone="default"
        icon={<CaseIcon />}
        onClick={onNavigate ? () => onNavigate('/studio/structure/caseStudies') : undefined}
      />
      <KpiCard
        label="Blog posts live"
        value={`${data?.posts.published ?? 0}`}
        hint={`${data?.posts.needsWork ?? 0} need work · ${data?.posts.drafts ?? 0} drafts`}
        tone="default"
        icon={<DocumentTextIcon />}
        onClick={onNavigate ? () => onNavigate('/studio/structure/blog') : undefined}
      />
      <KpiCard
        label="Edits (7 days)"
        value={`${edits7d}`}
        hint={edits7d === 1 ? '1 content update' : `${edits7d} content updates`}
        tone={edits7d > 0 ? 'accent' : 'default'}
        icon={<EditIcon style={{ color: DASH_CHART.accent }} />}
      />
    </div>
  )
}
