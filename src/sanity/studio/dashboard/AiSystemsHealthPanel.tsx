'use client'

import { CheckmarkCircleIcon, CloseCircleIcon, SparklesIcon, WarningOutlineIcon } from '@sanity/icons'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'sanity/router'

import { studioApiUrl, studioFetchInit } from '@/sanity/lib/studioFetch'
import type { AiSystemCheck, AiSystemsAuditResult } from '@/sanity/lib/aiSystemsAudit'

function StatusIcon({ status }: { status: AiSystemCheck['status'] }) {
  if (status === 'pass') {
    return <CheckmarkCircleIcon style={{ width: 16, height: 16, color: '#22c55e' }} />
  }
  if (status === 'warn') {
    return <WarningOutlineIcon style={{ width: 16, height: 16, color: '#f59e0b' }} />
  }
  return <CloseCircleIcon style={{ width: 16, height: 16, color: '#ef4444' }} />
}

export function AiSystemsHealthPanel() {
  const router = useRouter()
  const [audit, setAudit] = useState<AiSystemsAuditResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(studioApiUrl('/api/studio/ai-systems-audit'), studioFetchInit())
      const json = (await res.json()) as AiSystemsAuditResult & { error?: string }
      if (!json.ok) throw new Error(json.error || 'Audit failed')
      setAudit(json)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load AI audit')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const go = (path?: string) => {
    if (path) router.navigateUrl({ path })
  }

  return (
    <section className="softree-dash__panel softree-dash__ai-health">
      <div className="softree-dash__panel-head">
        <h2 className="softree-dash__panel-title">
          <SparklesIcon style={{ width: 18, height: 18, marginRight: 8, verticalAlign: 'text-bottom' }} />
          AI systems health
        </h2>
        <button type="button" className="softree-dash__panel-action" onClick={() => void load()}>
          {loading ? 'Checking…' : 'Re-run audit'}
        </button>
      </div>

      {error ? (
        <div className="softree-dash__banner softree-dash__banner--error" role="alert">
          {error}
        </div>
      ) : null}

      {audit ? (
        <>
          <div className="softree-dash__ai-score">
            <span className="softree-dash__ai-score-value">{audit.score}%</span>
            <span className="softree-dash__ai-score-label">{audit.summary}</span>
          </div>
          <ul className="softree-dash__ai-checks">
            {audit.checks.map((check) => (
              <li key={check.id} className={`softree-dash__ai-check softree-dash__ai-check--${check.status}`}>
                <StatusIcon status={check.status} />
                <div className="softree-dash__ai-check-body">
                  <strong>{check.name}</strong>
                  <span>{check.message}</span>
                  {check.fixPath && check.fixLabel ? (
                    <button
                      type="button"
                      className="softree-dash__ai-fix"
                      onClick={() => go(check.fixPath)}
                    >
                      {check.fixLabel}
                    </button>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="softree-dash__panel-action"
            onClick={() => go('/studio/content-agent')}
          >
            Open Content Agent →
          </button>
        </>
      ) : loading ? (
        <div className="softree-dash__empty">Auditing AI pipeline, brand voice, layouts, and content gaps…</div>
      ) : null}
    </section>
  )
}
