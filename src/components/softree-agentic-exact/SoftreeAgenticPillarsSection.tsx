"use client"

import { useEffect, useMemo, useRef } from "react"
import { initK2SplitAndStagger } from "./k2ScrollReveal"
import { initLightThemeSection } from "./lightThemeReveal"
import { applySoftreeSectionHtml } from "./softreeAgenticHtmlCopy"
import { SOFTREE_AGENTIC_SECTIONS } from "./referenceContent"

export function SoftreeAgenticPillarsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const html = useMemo(() => {
    const section = SOFTREE_AGENTIC_SECTIONS.find((item) => item.name === "SoftreeAgenticPillarsSection")
    return applySoftreeSectionHtml("SoftreeAgenticPillarsSection", section?.html ?? "")
  }, [])

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    initK2SplitAndStagger(root)
    initLightThemeSection(root)
  }, [html])

  if (!html) return null

  return (
    <section
      ref={sectionRef}
      id="pillars"
      className="k2-section"
      data-theme="light"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
