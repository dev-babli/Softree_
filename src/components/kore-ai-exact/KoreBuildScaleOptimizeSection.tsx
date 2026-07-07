"use client"

import { useEffect, useMemo, useRef } from "react"
import { bindK2Radar } from "./k2Radar"
import { initK2SplitAndStagger, refreshK2ScrollVisibility } from "./k2ScrollReveal"
import { installKoreTabs } from "./koreTabs"
import { applySoftreeSectionHtml } from "./koreHtmlCopy"
import { KORE_AI_SECTIONS } from "./referenceContent"
import "./kore-build-scale-fix.css"

function mountBuildScaleInteractions(sectionNode: HTMLElement) {
  const unbindTabs = installKoreTabs(sectionNode)
  initK2SplitAndStagger(sectionNode)
  refreshK2ScrollVisibility(sectionNode)
  const unbindRadar = bindK2Radar(sectionNode)

  return () => {
    unbindTabs()
    unbindRadar()
  }
}

export function KoreBuildScaleOptimizeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const section = useMemo(() => {
    const raw = KORE_AI_SECTIONS.find((item) => item.name === "KoreBuildScaleOptimizeSection")
    if (!raw) return null
    return { ...raw, html: applySoftreeSectionHtml("KoreBuildScaleOptimizeSection", raw.html) }
  }, [])

  useEffect(() => {
    const sectionNode = sectionRef.current
    if (!sectionNode) return

    let unbind = mountBuildScaleInteractions(sectionNode)

    const onIntroComplete = () => {
      unbind()
      unbind = mountBuildScaleInteractions(sectionNode)
    }

    window.addEventListener("kore-ai-intro-complete", onIntroComplete)

    return () => {
      window.removeEventListener("kore-ai-intro-complete", onIntroComplete)
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
