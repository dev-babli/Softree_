"use client"

import { useEffect, useState } from "react"

import CaseStudyDraftPreview from "@/components/case-studies/preview/CaseStudyDraftPreview"
import type { SanityCaseStudyDoc } from "@/components/case-studies/layouts/mapCaseStudyData"
import { CLASSIC_LAYOUT_VALUE } from "@/sanity/lib/layoutPreview"

type PreviewState = {
  study: SanityCaseStudyDoc
  layout: string
}

export default function CaseStudyPreviewPage() {
  const [state, setState] = useState<PreviewState | null>(null)

  useEffect(() => {
    window.parent.postMessage({ type: "CASE_STUDY_PREVIEW_READY" }, "*")

    const onMessage = (event: MessageEvent) => {
      if (event.data?.type !== "CASE_STUDY_PREVIEW_UPDATE") return
      const study = event.data.study as SanityCaseStudyDoc
      const layout = (event.data.layout as string) || CLASSIC_LAYOUT_VALUE
      setState({ study, layout })
    }

    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [])

  if (!state) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          color: "#6b7694",
          fontFamily: "system-ui, sans-serif",
          fontSize: 14,
        }}
      >
        Waiting for draft content from Studio…
      </div>
    )
  }

  return <CaseStudyDraftPreview study={state.study} layout={state.layout} />
}
