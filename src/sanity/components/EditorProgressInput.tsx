"use client"

import React, { useMemo } from "react"
import type { ObjectInputProps } from "sanity"

type CaseStudyDocShape = {
  title?: string
  slug?: { current?: string }
  client?: string
  excerpt?: string
  mainImage?: { asset?: { _ref?: string } }
  mainImageUrl?: string
  challengeContent?: unknown[]
  approachContent?: unknown[]
  outcomeContent?: unknown[]
  body?: unknown[]
}

export default function EditorProgressInput(props: ObjectInputProps) {
  // Access full document via context
  // @ts-expect-error -- documented pattern in Sanity input components
  const doc = props?.context?.document as CaseStudyDocShape | undefined

  const { percent, missing } = useMemo(() => {
    const d = doc || {}
    const checks: Array<{ label: string; pass: boolean }> = [
      { label: "title", pass: !!d.title },
      { label: "slug", pass: !!d.slug?.current },
      { label: "client", pass: !!d.client },
      { label: "excerpt", pass: !!d.excerpt },
      {
        label: "image",
        pass: !!(d.mainImage?.asset?._ref || d.mainImageUrl),
      },
      {
        label: "story",
        pass:
          (d.challengeContent?.length ?? 0) > 0 ||
          (d.approachContent?.length ?? 0) > 0 ||
          (d.outcomeContent?.length ?? 0) > 0 ||
          (d.body?.length ?? 0) > 0,
      },
    ]
    const passed = checks.filter((c) => c.pass).length
    const total = checks.length
    const pct = Math.round((passed / total) * 100)
    return { percent: pct, missing: checks.filter((c) => !c.pass).map((c) => c.label) }
  }, [doc])

  return (
    <div style={{ padding: 16, border: "1px solid #eee", borderRadius: 8, background: "#fafafa" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <strong>Publish readiness</strong>
        <span style={{ fontFamily: "monospace" }}>{percent}%</span>
      </div>
      <div style={{ height: 8, background: "#eaeaea", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ height: 8, width: `${percent}%`, background: percent >= 80 ? "#16a34a" : "#f59e0b" }} />
      </div>
      {missing.length > 0 ? (
        <div style={{ marginTop: 10, color: "#6b7280", fontSize: 12 }}>
          Missing: {missing.join(", ")}
        </div>
      ) : (
        <div style={{ marginTop: 10, color: "#16a34a", fontSize: 12 }}>Looks good!</div>
      )}
    </div>
  )
}
