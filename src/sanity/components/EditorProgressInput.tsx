"use client"

import { useMemo } from "react"
import { caseStudyHasStoryContent, type CaseStudyCompletenessDoc } from '../lib/caseStudyCompleteness'
import type {ObjectInputProps} from "sanity"

type CaseStudyDocShape = CaseStudyCompletenessDoc & {
  title?: string
  slug?: {current?: string}
  client?: string
  headerTitle?: string
  excerpt?: string
  mainImage?: {asset?: {_ref?: string}}
  mainImageUrl?: string
}

export default function EditorProgressInput(props: ObjectInputProps) {
  // @ts-expect-error -- documented pattern in Sanity input components
  const doc = props?.context?.document as CaseStudyDocShape | undefined

  const {percent, checks} = useMemo(() => {
    const d = doc || {}
    const items: Array<{label: string; pass: boolean}> = [
      {label: "Title", pass: !!d.title},
      {label: "Slug", pass: !!d.slug?.current},
      {label: "Client", pass: !!d.client},
      {label: "Header title", pass: !!d.headerTitle},
      {label: "Excerpt", pass: !!d.excerpt},
      {
        label: "Cover",
        pass: !!(d.mainImage?.asset?._ref || d.mainImageUrl),
      },
      {
        label: "Story",
        pass: caseStudyHasStoryContent(d),
      },
    ]
    const passed = items.filter((c) => c.pass).length
    const pct = Math.round((passed / items.length) * 100)
    return {percent: pct, checks: items}
  }, [doc])

  const barColor = percent >= 85 ? "#16a34a" : percent >= 50 ? "#ff7a2f" : "#d97706"
  const missing = checks.filter((c) => !c.pass)

  return (
    <div className="softree-readiness">
      <div className="softree-readiness__head">
        <span className="softree-readiness__title">Publish readiness</span>
        <span className="softree-readiness__pct" style={{color: barColor}}>
          {percent}%
        </span>
      </div>
      <div className="softree-readiness__bar">
        <div
          className="softree-readiness__bar-fill"
          style={{width: `${percent}%`, background: barColor}}
        />
      </div>
      <div className="softree-readiness__checks">
        {checks.map((check) => (
          <span
            key={check.label}
            className={`softree-readiness__check ${check.pass ? "is-done" : "is-missing"}`}
          >
            {check.label}
          </span>
        ))}
      </div>
      {missing.length > 0 ? (
        <p className="softree-readiness__hint">
          Next: {missing.map((m) => m.label.toLowerCase()).join(", ")}
        </p>
      ) : (
        <p className="softree-readiness__hint is-ready">Ready to publish</p>
      )}
    </div>
  )
}
