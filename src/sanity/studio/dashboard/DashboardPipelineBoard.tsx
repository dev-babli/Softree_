'use client'

import type { ReactNode } from 'react'
import { CaseIcon, DocumentTextIcon, EditIcon, WarningOutlineIcon } from '@sanity/icons'

import type { DashboardData } from './types'
import { countEditsLast7Days } from './utils'

type DashboardPipelineBoardProps = {
  data: DashboardData | null
  loading: boolean
  attentionCount: number
  onNavigate: (path: string) => void
}

type PipelineCardProps = {
  label: string
  value: number
  hint: string
  tone: 'warn' | 'neutral' | 'success' | 'accent'
  icon: ReactNode
  onClick: () => void
}

function PipelineCard({ label, value, hint, tone, icon, onClick }: PipelineCardProps) {
  return (
    <button type="button" className={`softree-dash__pipeline-card softree-dash__pipeline-card--${tone}`} onClick={onClick}>
      <div className="softree-dash__pipeline-icon" aria-hidden>
        {icon}
      </div>
      <div className="softree-dash__pipeline-body">
        <span className="softree-dash__pipeline-value">{value}</span>
        <span className="softree-dash__pipeline-label">{label}</span>
        <span className="softree-dash__pipeline-hint">{hint}</span>
      </div>
    </button>
  )
}

export function DashboardPipelineBoard({
  data,
  loading,
  attentionCount,
  onNavigate,
}: DashboardPipelineBoardProps) {
  const drafts = (data?.caseStudies.drafts ?? 0) + (data?.posts.drafts ?? 0)
  const published = (data?.caseStudies.published ?? 0) + (data?.posts.published ?? 0)
  const edits7d = countEditsLast7Days(data?.activity7d, data?.edits7dCount)

  if (loading) {
    return (
      <div className="softree-dash__pipeline" aria-busy="true">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="softree-dash__pipeline-card softree-dash__pipeline-card--loading">
            <div className="softree-dash__kpi-skeleton" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <nav className="softree-dash__pipeline" aria-label="Content pipeline">
      <PipelineCard
        label="Needs attention"
        value={attentionCount}
        hint="Missing fields or still draft"
        tone={attentionCount > 0 ? 'warn' : 'success'}
        icon={<WarningOutlineIcon />}
        onClick={() => onNavigate('/studio/structure/caseStudies;caseStudiesNeedsWork')}
      />
      <PipelineCard
        label="Drafts in progress"
        value={drafts}
        hint="Unpublished work"
        tone="neutral"
        icon={<EditIcon />}
        onClick={() => onNavigate('/studio/structure/caseStudies;caseStudiesDrafts')}
      />
      <PipelineCard
        label="Live on site"
        value={published}
        hint="Published case studies & posts"
        tone="success"
        icon={<CaseIcon />}
        onClick={() => onNavigate('/studio/structure/caseStudies;caseStudiesPublished')}
      />
      <PipelineCard
        label="Edits this week"
        value={edits7d}
        hint={edits7d === 1 ? '1 update' : 'Team activity'}
        tone="accent"
        icon={<DocumentTextIcon />}
        onClick={() => onNavigate('/studio/structure/caseStudies')}
      />
    </nav>
  )
}
