"use client"

import { useEffect, useMemo, useRef } from "react"
import { revealLightThemeSections } from "./lightThemeReveal"
import { KORE_AI_SECTIONS } from "./referenceContent"

export function KorePillarsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const html = useMemo(() => {
    const section = KORE_AI_SECTIONS.find((item) => item.name === "KorePillarsSection")
    return section?.html ?? ""
  }, [])

  useEffect(() => {
    if (sectionRef.current) revealLightThemeSections(sectionRef.current)
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
