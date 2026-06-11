"use client"

import { useEffect, useMemo, useState } from "react"

import CaseStudyDraftPreview from "@/components/case-studies/preview/CaseStudyDraftPreview"

type PreviewState = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  study: any
  layout: string
}

function allowedOrigins(): string[] {
  const origins = new Set<string>()
  if (typeof window !== "undefined") origins.add(window.location.origin)
  const site = process.env.NEXT_PUBLIC_SITE_URL
  if (site) {
    try {
      origins.add(new URL(site).origin)
    } catch {
      /* ignore invalid env */
    }
  }
  return [...origins]
}

export default function CaseStudyPreviewPage() {
  const [state, setState] = useState<PreviewState | null>(null)
  const origins = useMemo(() => allowedOrigins(), [])

  useEffect(() => {
    const targetOrigin = window.parent !== window ? document.referrer ? new URL(document.referrer).origin : "*" : "*"
    window.parent.postMessage({ type: "CASE_STUDY_PREVIEW_READY" }, targetOrigin)

    const onMessage = (event: MessageEvent) => {
      if (!origins.includes(event.origin) && event.origin !== window.location.origin) return
      if (event.data?.type !== "CASE_STUDY_PREVIEW_UPDATE") return
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const study = event.data.study as any
      const layout = (event.data.layout as string) || "standard"
      setState({ study, layout })
    }

    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [origins])

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
