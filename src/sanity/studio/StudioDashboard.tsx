'use client'

import {
  CaseIcon,
  CogIcon,
  DocumentTextIcon,
  EarthGlobeIcon,
  LaunchIcon,
  SparklesIcon,
  CheckmarkCircleIcon,
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
import { DashboardCharts } from './dashboard/DashboardCharts'
import { DashboardKpiStrip } from './dashboard/DashboardKpiStrip'
import { AiSystemsHealthPanel } from './dashboard/AiSystemsHealthPanel'
import type { DashboardInsights } from './dashboard/insightsTypes'

type QueuedItem = AttentionItem & {_type: 'caseStudy' | 'post'}

function healthMessage(readiness: number, attentionCount: number): string {
  if (attentionCount === 0) {
    return 'All case studies and blog posts are publish-ready. Nice work.'
  }
  if (readiness >= 80) {
    return `${attentionCount} item${attentionCount === 1 ? '' : 's'} need a quick pass before they are fully ready.`
  }
  return `${attentionCount} item${attentionCount === 1 ? '' : 's'} are missing key content — start with the attention queue.`
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
        <div className="softree-dash__queue-name">{displayName}</div>
        <div className="softree-dash__queue-meta">
          {subtitle}
          {item._updatedAt ? ` · ${formatRelativeTime(item._updatedAt)}` : ''}
        </div>
        {missing.length > 0 ? (
          <div className="softree-dash__tags">
            {missing.slice(0, 4).map((tag) => (
              <span key={tag} className="softree-dash__tag">
                {tag}
              </span>
            ))}
            {missing.length > 4 ? (
              <span className="softree-dash__tag">+{missing.length - 4}</span>
            ) : null}
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
    const timer = window.setTimeout(() => controller.abort(), refresh ? 30_000 : 8_000)

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
      .slice(0, 10)
  }, [data])

  const attentionCount =
    (data?.caseStudies.needsWork ?? 0) + (data?.posts.needsWork ?? 0)

  const openDoc = (id: string, type: string) => {
    router.navigateIntent('edit', {id, type})
  }

  const go = (path: string) => router.navigateUrl({path})

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  return (
    <div className="softree-dash">
      <div className="softree-dash__inner">
        {/* Layer 1 — Health status */}
        <header className="softree-dash__hero">
          <div className="softree-dash__hero-orbs" aria-hidden>
            <span className="softree-dash__orb softree-dash__orb--1" />
            <span className="softree-dash__orb softree-dash__orb--2" />
          </div>
          <div className="softree-dash__hero-inner">
            <div>
              <p className="softree-dash__eyebrow">Softree Studio</p>
              <h1 className="softree-dash__title">{greetingForHour()}</h1>
              <p className="softree-dash__subtitle">
                {loading
                  ? 'Loading your content health…'
                  : healthMessage(readiness, attentionCount)}
              </p>
            </div>
          </div>
        </header>

        <DashboardKpiStrip
          data={data}
          loading={loading}
          readiness={readiness}
          attentionCount={attentionCount}
          onNavigate={go}
        />

        {loadError ? (
          <div className="softree-dash__banner softree-dash__banner--error" role="alert">
            {loadError}. Try refreshing the page.
          </div>
        ) : null}

        <DashboardCharts
          data={data}
          insights={insights}
          loading={loading}
          insightsLoading={insightsLoading}
          insightsFailed={insightsFailed}
          insightsRefreshing={insightsRefreshing}
          readiness={readiness}
          attentionCount={attentionCount}
          onNavigate={go}
          onOpenDoc={openDoc}
          onRefreshInsights={refreshInsights}
        />

        <AiSystemsHealthPanel />

        <div className="softree-dash__bento">
          {/* Attention queue — primary focus */}
          <section
            id="softree-attention-queue"
            className="softree-dash__panel softree-dash__queue"
          >
            <div className="softree-dash__panel-head">
              <h2 className="softree-dash__panel-title">Needs your attention</h2>
              {!loading && attentionCount > 0 ? (
                <button
                  type="button"
                  className="softree-dash__panel-action"
                  onClick={() => go('/studio/structure/caseStudies;caseStudiesNeedsWork')}
                >
                  Open needs-work list ({attentionCount})
                </button>
              ) : null}
            </div>
            {loading ? (
              <div className="softree-dash__empty">Loading queue…</div>
            ) : attentionQueue.length === 0 ? (
              <div className="softree-dash__empty">
                <div className="softree-dash__empty-icon">
                  <CheckmarkCircleIcon style={{width: 28, height: 28, color: '#16a34a'}} />
                </div>
                Everything looks publish-ready. Use quick actions below to create something new.
              </div>
            ) : (
              attentionQueue.map((item) => (
                <QueueItem key={item._id} item={item} onOpen={openDoc} />
              ))
            )}
          </section>

          <section className="softree-dash__panel softree-dash__actions-panel">
            <div className="softree-dash__panel-head">
              <h2 className="softree-dash__panel-title">Quick actions</h2>
            </div>
            <div className="softree-dash__actions softree-dash__actions--stack">
            <button
              type="button"
              className="softree-dash__action softree-dash__action--primary"
              onClick={() =>
                go('/studio/intent/create/template=caseStudy-composer;type=caseStudy/')
              }
            >
              <span className="softree-dash__action-label">New case study</span>
              <span className="softree-dash__action-hint">Challenge → Approach → Outcome</span>
            </button>
            <button
              type="button"
              className="softree-dash__action"
              onClick={() => go('/studio/intent/create/template=post-composer;type=post/')}
            >
              <span className="softree-dash__action-label">New blog post</span>
              <span className="softree-dash__action-hint">Composer layout with AEO sections</span>
            </button>
            <button
              type="button"
              className="softree-dash__action"
              onClick={() => go('/studio/structure/siteSettings;aiContext')}
            >
              <SparklesIcon style={{width: 16, height: 16, color: '#ff9f5a'}} />
              <span className="softree-dash__action-label">AI brand voice</span>
              <span className="softree-dash__action-hint">Powers ✨ Assist + Content Agent</span>
            </button>
            <button
              type="button"
              className="softree-dash__action"
              onClick={() => go('/studio/content-agent')}
            >
              <SparklesIcon style={{width: 16, height: 16, color: '#ff9f5a'}} />
              <span className="softree-dash__action-label">Content Agent</span>
              <span className="softree-dash__action-hint">Generate or audit SEO / AEO</span>
            </button>
            <button
              type="button"
              className="softree-dash__action"
              onClick={() => go('/studio/structure/caseStudies;caseStudiesNeedsWork')}
            >
              <DocumentTextIcon style={{width: 16, height: 16, color: '#f59e0b'}} />
              <span className="softree-dash__action-label">Fix incomplete content</span>
              <span className="softree-dash__action-hint">
                {attentionCount > 0 ? `${attentionCount} waiting` : 'Queue is clear'}
              </span>
            </button>
            <button
              type="button"
              className="softree-dash__action"
              onClick={() => go('/studio/structure/siteSettings')}
            >
              <CogIcon style={{width: 16, height: 16, color: '#64748b'}} />
              <span className="softree-dash__action-label">Site settings</span>
              <span className="softree-dash__action-hint">Design tokens, SEO, homepage slider</span>
            </button>
            <button
              type="button"
              className="softree-dash__action"
              onClick={() => go('/studio/presentation')}
            >
              <EarthGlobeIcon style={{width: 16, height: 16, color: '#ff9f5a'}} />
              <span className="softree-dash__action-label">Presentation mode</span>
              <span className="softree-dash__action-hint">Edit with live site preview</span>
            </button>
            <a
              className="softree-dash__action"
              href={siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{textDecoration: 'none', color: 'inherit'}}
            >
              <LaunchIcon style={{width: 16, height: 16, color: '#64748b'}} />
              <span className="softree-dash__action-label">Open live site</span>
              <span className="softree-dash__action-hint">Preview in a new tab</span>
            </a>
            </div>
          </section>
        </div>

        {/* Editorial guide */}
        <details className="softree-dash__panel softree-dash__guide">
          <summary className="softree-dash__guide-summary">
            <span className="softree-dash__panel-title">How to publish a case study</span>
            <span className="softree-dash__guide-toggle">Show guide</span>
          </summary>
          <div className="softree-dash__guide-step">
            <span className="softree-dash__guide-num">1</span>
            <p className="softree-dash__guide-text">
              Fill the <strong>Page composer</strong> tab — stack sections (narrative, metrics,
              gallery, tech stack with logos, FAQ, contact). Live preview matches the real slug page.
            </p>
          </div>
          <div className="softree-dash__guide-step">
            <span className="softree-dash__guide-num">2</span>
            <p className="softree-dash__guide-text">
              Add client, header title, excerpt, and cover image under{' '}
              <strong>Client &amp; project</strong> and <strong>Media</strong>.
            </p>
          </div>
          <div className="softree-dash__guide-step">
            <span className="softree-dash__guide-num">3</span>
            <p className="softree-dash__guide-text">
              Use the <strong>Live preview</strong> pane, set <strong>Review status</strong> to
              Approved, then publish from <strong>Publish &amp; SEO</strong>.
            </p>
          </div>
        </details>

        <details className="softree-dash__panel softree-dash__guide">
          <summary className="softree-dash__guide-summary">
            <span className="softree-dash__panel-title">AI &amp; Content Agent</span>
            <span className="softree-dash__guide-toggle">Show guide</span>
          </summary>
          <div className="softree-dash__guide-step">
            <span className="softree-dash__guide-num">1</span>
            <p className="softree-dash__guide-text">
              Set your voice once under <strong>Site settings → AI brand voice</strong>. Every ✨
              field action and automated blog draft reads this context.
            </p>
          </div>
          <div className="softree-dash__guide-step">
            <span className="softree-dash__guide-num">2</span>
            <p className="softree-dash__guide-text">
              Open <strong>Content Agent</strong> to generate a composer blog from a topic, or run
              the <strong>Content audit</strong> tab to fix missing meta, FAQ, and alt text.
            </p>
          </div>
          <div className="softree-dash__guide-step">
            <span className="softree-dash__guide-num">3</span>
            <p className="softree-dash__guide-text">
              In any field, click ✨ and pick a Softree template (SEO title, expand bullets, FAQ,
              hero image prompt). Always review in <strong>Live preview</strong> before publish.
            </p>
          </div>
        </details>
      </div>
    </div>
  )
}
