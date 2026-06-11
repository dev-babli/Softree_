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
import {useEffect, useMemo, useState} from 'react'
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

function StatRow({
  label,
  published,
  total,
  needsWork,
}: {
  label: string
  published: number
  total: number
  needsWork: number
}) {
  const pct = total > 0 ? Math.round((published / total) * 100) : 0

  return (
    <div className="softree-dash__stat-row">
      <div className="softree-dash__stat-top">
        <span className="softree-dash__stat-name">{label}</span>
        <span className="softree-dash__stat-nums">
          {published}/{total} live · {needsWork} need work
        </span>
      </div>
      <div className="softree-dash__stat-bar">
        <div className="softree-dash__stat-bar-fill" style={{width: `${pct}%`}} />
      </div>
    </div>
  )
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

  useEffect(() => {
    let cancelled = false
    client
      .fetch<DashboardData>(DASHBOARD_QUERY)
      .then((result) => {
        if (!cancelled) setData(result)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [client])

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
            <div className="softree-dash__health">
              <div className="softree-dash__health-label">Publish readiness</div>
              <div className="softree-dash__health-value">{loading ? '—' : `${readiness}%`}</div>
              <div className="softree-dash__health-bar">
                <div
                  className="softree-dash__health-bar-fill"
                  style={{width: loading ? '0%' : `${readiness}%`}}
                />
              </div>
            </div>
          </div>
        </header>

        {/* Layer 2 + 3 — Bento command center */}
        <div className="softree-dash__bento">
          {/* Attention queue — primary focus */}
          <section className="softree-dash__panel softree-dash__queue">
            <div className="softree-dash__panel-head">
              <h2 className="softree-dash__panel-title">Needs your attention</h2>
              {!loading && attentionCount > 0 ? (
                <button
                  type="button"
                  className="softree-dash__panel-action"
                  onClick={() =>
                    go('/studio/structure/caseStudies;caseStudiesMenu;caseStudiesNeedsWork')
                  }
                >
                  View all ({attentionCount})
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
                Everything looks publish-ready. Create something new or review recent edits below.
              </div>
            ) : (
              attentionQueue.map((item) => (
                <QueueItem key={item._id} item={item} onOpen={openDoc} />
              ))
            )}
          </section>

          {/* Content stats */}
          <section className="softree-dash__panel">
            <div className="softree-dash__panel-head">
              <h2 className="softree-dash__panel-title">Content overview</h2>
            </div>
            {loading ? (
              <div className="softree-dash__empty">Loading stats…</div>
            ) : (
              <>
                <StatRow
                  label="Case studies"
                  published={data?.caseStudies.published ?? 0}
                  total={data?.caseStudies.total ?? 0}
                  needsWork={data?.caseStudies.needsWork ?? 0}
                />
                <StatRow
                  label="Blog posts"
                  published={data?.posts.published ?? 0}
                  total={data?.posts.total ?? 0}
                  needsWork={data?.posts.needsWork ?? 0}
                />
                <StatRow
                  label="Marketing pages"
                  published={data?.marketing.published ?? 0}
                  total={data?.marketing.total ?? 0}
                  needsWork={data?.marketing.drafts ?? 0}
                />
              </>
            )}
          </section>

          {/* Recent activity */}
          <section className="softree-dash__panel">
            <div className="softree-dash__panel-head">
              <h2 className="softree-dash__panel-title">Recent activity</h2>
            </div>
            {loading ? (
              <div className="softree-dash__empty">Loading activity…</div>
            ) : !data?.recentActivity?.length ? (
              <div className="softree-dash__empty">No recent edits yet.</div>
            ) : (
              data.recentActivity.map((item) => (
                <div
                  key={item._id}
                  className="softree-dash__activity-item"
                  role="button"
                  tabIndex={0}
                  onClick={() => openDoc(item._id, item._type)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      openDoc(item._id, item._type)
                    }
                  }}
                >
                  <span className="softree-dash__activity-dot" />
                  <span className="softree-dash__activity-title">
                    {item.client || item.title || 'Untitled'} · {typeLabel(item._type)}
                  </span>
                  <span className="softree-dash__activity-time">
                    {formatRelativeTime(item._updatedAt)}
                  </span>
                </div>
              ))
            )}
          </section>
        </div>

        {/* Quick actions */}
        <section>
          <div className="softree-dash__panel-head" style={{padding: '0 0 0.75rem', border: 'none'}}>
            <h2 className="softree-dash__panel-title">Quick actions</h2>
          </div>
          <div className="softree-dash__actions">
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
              onClick={() => go('/studio/intent/create/template=post-article;type=post/')}
            >
              <span className="softree-dash__action-label">New blog post</span>
              <span className="softree-dash__action-hint">Article with SEO fields</span>
            </button>
            <button
              type="button"
              className="softree-dash__action"
              onClick={() =>
                go('/studio/structure/caseStudies;caseStudiesMenu;caseStudiesNeedsWork')
              }
            >
              <SparklesIcon style={{width: 16, height: 16, color: '#ff9f5a'}} />
              <span className="softree-dash__action-label">Fix incomplete content</span>
              <span className="softree-dash__action-hint">
                {attentionCount > 0 ? `${attentionCount} waiting` : 'Queue is clear'}
              </span>
            </button>
            <button
              type="button"
              className="softree-dash__action"
              onClick={() => go('/studio/structure/siteSettings;siteSettingsMenu;globalSettings')}
            >
              <CogIcon style={{width: 16, height: 16, color: '#64748b'}} />
              <span className="softree-dash__action-label">Site settings</span>
              <span className="softree-dash__action-hint">Nav, SEO, homepage slider</span>
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

        {/* Editorial guide */}
        <section className="softree-dash__panel">
          <div className="softree-dash__panel-head">
            <h2 className="softree-dash__panel-title">How to publish a case study</h2>
          </div>
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
              Use the <strong>Live preview</strong> pane, then set status to Published in{' '}
              <strong>Publish &amp; SEO</strong>.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
