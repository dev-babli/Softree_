"use client"

import { useEffect, useMemo, useRef } from "react"
import { bindK2Radar } from "./k2Radar"
import { initK2SplitAndStagger, refreshK2ScrollVisibility } from "./k2ScrollReveal"
import { installSoftreeAgenticTabs } from "./softreeAgenticTabs"
import { applySoftreeSectionHtml } from "./softreeAgenticHtmlCopy"
import { SOFTREE_AGENTIC_SECTIONS } from "./referenceContent"
import "./softree-build-scale-fix.css"

function mountBuildScaleInteractions(sectionNode: HTMLElement) {
  const unbindTabs = installSoftreeAgenticTabs(sectionNode)
  initK2SplitAndStagger(sectionNode)
  refreshK2ScrollVisibility(sectionNode)
  const unbindRadar = bindK2Radar(sectionNode)

  return () => {
    unbindTabs()
    unbindRadar()
  }
}

export function SoftreeAgenticBuildScaleOptimizeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const section = useMemo(() => {
    const raw = SOFTREE_AGENTIC_SECTIONS.find((item) => item.name === "SoftreeAgenticBuildScaleOptimizeSection")
    if (!raw) return null
    return { ...raw, html: applySoftreeSectionHtml("SoftreeAgenticBuildScaleOptimizeSection", raw.html) }
  }, [])

  useEffect(() => {
    const sectionNode = sectionRef.current
    if (!sectionNode) return

    let unbind = mountBuildScaleInteractions(sectionNode)

    const onIntroComplete = () => {
      unbind()
      unbind = mountBuildScaleInteractions(sectionNode)
    }

    window.addEventListener("softree-agentic-intro-complete", onIntroComplete)

    return () => {
      window.removeEventListener("softree-agentic-intro-complete", onIntroComplete)
      unbind()
    }
  }, [])

  if (!section) return null

  return (
    <section
      ref={sectionRef}
      id="build-scale-optimize"
      className="k2-section"
      dangerouslySetInnerHTML={{ __html: section.html }}
    />
  )
}
