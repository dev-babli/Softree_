"use client"

import { useEffect, useMemo, useRef } from "react"
import { initK2SplitAndStagger } from "./k2ScrollReveal"
import { initLightThemeSection } from "./lightThemeReveal"
import { applySoftreeSectionHtml } from "./koreHtmlCopy"
import { KORE_AI_SECTIONS } from "./referenceContent"

export function KorePillarsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const html = useMemo(() => {
    const section = KORE_AI_SECTIONS.find((item) => item.name === "KorePillarsSection")
    return applySoftreeSectionHtml("KorePillarsSection", section?.html ?? "")
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
