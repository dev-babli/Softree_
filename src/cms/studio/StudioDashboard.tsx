'use client'

import {
  CaseIcon,
  CheckmarkCircleIcon,
  DocumentTextIcon,
} from '@sanity/icons'
import {useClient} from 'sanity'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {useRouter} from 'sanity/router'

import './dashboard/dashboard.css'
import {API_VERSION, DASHBOARD_QUERY} from './dashboard/queries'
import type {AttentionItem, DashboardData} from './dashboard/types'
import {
  formatRelativeTime,
  getCaseStudyMissing,
  getPostMissing,
  greetingForHour,
  publishReadinessPercent,
  typeLabel,
} from './dashboard/utils'
import { AiSystemsHealthPanel } from './dashboard/AiSystemsHealthPanel'
import { DashboardContentIssues } from './dashboard/DashboardContentIssues'
import { DashboardContentPipeline } from './dashboard/DashboardContentPipeline'
import { DashboardEditVelocity } from './dashboard/DashboardEditVelocity'
import { DashboardGettingStarted } from './dashboard/DashboardGettingStarted'
import { DashboardPageScorecards } from './dashboard/DashboardPageScorecards'
import { DashboardPipelineBoard } from './dashboard/DashboardPipelineBoard'
import { DashboardQuickTools } from './dashboard/DashboardQuickTools'
import { DashboardSitePulse } from './dashboard/DashboardSitePulse'
import { DashboardTopPages } from './dashboard/DashboardTopPages'
import { DashboardWelcomeHero } from './dashboard/DashboardWelcomeHero'
import type { DashboardInsights } from './dashboard/insightsTypes'

type QueuedItem = AttentionItem & {_type: 'caseStudy' | 'post'}

const CREATE_CASE_STUDY = '/studio/intent/create/template=caseStudy-composer;type=caseStudy/'
const CREATE_POST = '/studio/intent/create/template=post-composer;type=post/'

function healthMessage(readiness: number, attentionCount: number): string {
  if (attentionCount === 0) {
    return 'Site metrics and editorial health are below. Your queue is clear — great time to publish something new.'
  }
  if (readiness >= 80) {
    return `${attentionCount} item${attentionCount === 1 ? '' : 's'} need a final pass. Scores and traffic update when you refresh metrics.`
  }
  return `${attentionCount} item${attentionCount === 1 ? '' : 's'} blocking publish readiness — start with your work queue.`
}

function QueueItem({
  item,
  onOpen,
}: {
  item: QueuedItem
  onOpen: (id: string, type: string) => void
}) {
  const missing =
    item._type === 'caseStudy' ? getCaseStudyMissing(item) : getPostMissing(item)
  const displayName =
    item._type === 'caseStudy'
      ? item.client || item.title || 'Untitled case study'
      : item.title || 'Untitled post'
  const subtitle =
    item._type === 'caseStudy' && item.client && item.title ? item.title : typeLabel(item._type)
  const totalChecks = item._type === 'caseStudy' ? 6 : 4
  const doneChecks = totalChecks - missing.length
  const pct = Math.max(0, Math.round((doneChecks / totalChecks) * 100))

  return (
    <div
      className="softree-dash__queue-item"
      role="button"
      tabIndex={0}
      aria-label={`Open ${displayName}`}
      onClick={() => onOpen(item._id, item._type)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen(item._id, item._type)
        }
      }}
    >
      <div className="softree-dash__queue-icon">
        {item._type === 'caseStudy' ? (
          <CaseIcon style={{width: 18, height: 18}} />
        ) : (
          <DocumentTextIcon style={{width: 18, height: 18}} />
        )}
      </div>
      <div className="softree-dash__queue-body">
        <div className="softree-dash__queue-row">
          <div className="softree-dash__queue-name">{displayName}</div>
          <span className="softree-dash__queue-pct">{pct}%</span>
        </div>
        <div className="softree-dash__queue-meta">
          {subtitle}
          {item._updatedAt ? ` · ${formatRelativeTime(item._updatedAt)}` : ''}
        </div>
        <div className="softree-dash__queue-bar" aria-hidden>
          <div className="softree-dash__queue-bar-fill" style={{width: `${pct}%`}} />
        </div>
        {missing.length > 0 ? (
          <div className="softree-dash__tags">
            <span className="softree-dash__tag softree-dash__tag--next">Next: {missing[0]}</span>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default function StudioDashboard() {
  const client = useClient({apiVersion: API_VERSION})
  const router = useRouter()
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [insights, setInsights] = useState<DashboardInsights | null>(null)
  const [insightsLoading, setInsightsLoading] = useState(true)
  const [insightsFailed, setInsightsFailed] = useState(false)
  const [insightsRefreshing, setInsightsRefreshing] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)

  const fetchInsights = useCallback(async (refresh = false) => {
    if (refresh) {
      setInsightsRefreshing(true)
      setInsightsFailed(false)
    } else {
      setInsightsLoading(true)
      setInsightsFailed(false)
    }

    const controller = new AbortController()
    const timer = window.setTimeout(() => controller.abort(), refresh ? 45_000 : 12_000)

    try {
      const url = refresh
        ? '/api/studio/dashboard-insights?refresh=1'
        : '/api/studio/dashboard-insights'
      const res = await fetch(url, { signal: controller.signal })
      if (!res.ok) {
        setInsightsFailed(true)
        return
      }
      const result = (await res.json()) as DashboardInsights
      setInsights(result)
      setInsightsFailed(false)
    } catch {
      setInsightsFailed(true)
    } finally {
      window.clearTimeout(timer)
      if (refresh) {
        setInsightsRefreshing(false)
      } else {
        setInsightsLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    client
      .fetch<DashboardData>(DASHBOARD_QUERY)
      .then((result) => {
        if (!cancelled) setData(result)
      })
      .catch((err) => {
        if (!cancelled) {
          setLoadError(err instanceof Error ? err.message : 'Could not load dashboard data')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [client])

  useEffect(() => {
    void fetchInsights(false)
  }, [fetchInsights])

  const refreshInsights = useCallback(() => {
    void fetchInsights(true)
  }, [fetchInsights])

  const readiness = data
    ? publishReadinessPercent({caseStudies: data.caseStudies, posts: data.posts})
    : 0

  const attentionQueue = useMemo<QueuedItem[]>(() => {
    if (!data) return []
    const merged: QueuedItem[] = [
      ...data.attentionCaseStudies.map((item) => ({...item, _type: 'caseStudy' as const})),
      ...data.attentionPosts.map((item) => ({...item, _type: 'post' as const})),
    ]
    return merged
      .sort(
        (a, b) =>
          new Date(b._updatedAt || 0).getTime() - new Date(a._updatedAt || 0).getTime(),
      )
      .slice(0, 8)
  }, [data])

  const attentionCount =
    (data?.caseStudies.needsWork ?? 0) + (data?.posts.needsWork ?? 0)

  const openDoc = (id: string, type: string) => {
    router.navigateIntent('edit', {id, type})
  }

  const go = (path: string) => router.navigateUrl({path})

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const metricsBusy = insightsLoading || insightsRefreshing

  return (
    <div className="softree-dash softree-dash--command">
      <div className="softree-dash__inner">
        <DashboardWelcomeHero
          greeting={greetingForHour()}
          subtitle={healthMessage(readiness, attentionCount)}
          readiness={readiness}
          loading={loading}
          onCreateCaseStudy={() => go(CREATE_CASE_STUDY)}
          onCreatePost={() => go(CREATE_POST)}
          onOpenPresentation={() => go('/studio/presentation')}
        />

        {insightsFailed ? (
          <div className="softree-dash__banner softree-dash__banner--warn" role="status">
            Site metrics could not load — editorial data below is still live. Click Refresh metrics
            to retry.
          </div>
        ) : null}

        {loadError ? (
          <div className="softree-dash__banner softree-dash__banner--error" role="alert">
            {loadError}. Try refreshing the page.
          </div>
        ) : null}

        <DashboardSitePulse
          insights={insights}
          loading={metricsBusy}
          insightsLoading={insightsLoading}
          onRefresh={refreshInsights}
          onNavigate={go}
        />

        <DashboardPageScorecards insights={insights} loading={metricsBusy} />

        <DashboardPipelineBoard
          data={data}
          loading={loading}
          attentionCount={attentionCount}
          onNavigate={go}
        />

        <div className="softree-dash__command-grid">
          <div className="softree-dash__command-main">
            <section
              id="softree-attention-queue"
              className="softree-dash__panel softree-dash__queue"
            >
              <div className="softree-dash__panel-head">
                <div>
                  <h2 className="softree-dash__panel-title softree-dash__panel-title--friendly">
                    Your work queue
                  </h2>
                  <p className="softree-dash__panel-sub">
                    What needs your attention before publish
                  </p>
                </div>
                {!loading && attentionCount > 0 ? (
                  <button
                    type="button"
                    className="softree-dash__panel-action"
                    onClick={() => go('/studio/structure/caseStudies;caseStudiesNeedsWork')}
                  >
                    View all ({attentionCount})
                  </button>
                ) : null}
              </div>
              {loading ? (
                <div className="softree-dash__empty">Loading your queue…</div>
              ) : attentionQueue.length === 0 ? (
                <div className="softree-dash__empty softree-dash__empty--celebrate">
                  <div className="softree-dash__empty-icon">
                    <CheckmarkCircleIcon style={{width: 32, height: 32, color: '#16a34a'}} />
                  </div>
                  <p className="softree-dash__empty-title">Queue is clear</p>
                  <p>Check page scores above, then create or publish when ready.</p>
                </div>
              ) : (
                attentionQueue.map((item) => (
                  <QueueItem key={item._id} item={item} onOpen={openDoc} />
                ))
              )}
            </section>

            <DashboardContentPipeline data={data} loading={loading} onNavigate={go} />

            <DashboardContentIssues
              insights={insights}
              loading={metricsBusy}
              onNavigate={go}
            />
          </div>

          <aside className="softree-dash__command-side">
            <DashboardTopPages insights={insights} loading={metricsBusy} />
            <DashboardEditVelocity data={data} loading={loading} onOpenDoc={openDoc} />
            <DashboardQuickTools siteUrl={siteUrl} onNavigate={go} />
            <DashboardGettingStarted />
          </aside>
        </div>

        <AiSystemsHealthPanel />
      </div>
    </div>
  )
}
