"use client"

import { useEffect, useMemo, useRef } from "react"
import { initK2SplitAndStagger, refreshK2ScrollVisibility } from "./k2ScrollReveal"
import { applySoftreeSectionHtml } from "./koreHtmlCopy"
import { KORE_AI_SECTIONS } from "./referenceContent"
import "./kore-get-started-fix.css"

function mountGetStartedInteractions(sectionNode: HTMLElement) {
  initK2SplitAndStagger(sectionNode)
  refreshK2ScrollVisibility(sectionNode)

  const revealTarget = sectionNode.querySelector<HTMLElement>(".k2-container-prefooter")
  if (!revealTarget) return () => {}

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return
      revealTarget.classList.add("on")
      observer.disconnect()
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
  )

  observer.observe(revealTarget)
  refreshK2ScrollVisibility(sectionNode)

  return () => observer.disconnect()
}

export function KoreGetStartedSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const section = useMemo(() => {
    const raw = KORE_AI_SECTIONS.find((item) => item.name === "KoreGetStartedSection")
    if (!raw) return null
    return { ...raw, html: applySoftreeSectionHtml("KoreGetStartedSection", raw.html) }
  }, [])

  useEffect(() => {
    const sectionNode = sectionRef.current
    if (!sectionNode) return

    let unbind = mountGetStartedInteractions(sectionNode)

    const onIntroComplete = () => {
      unbind()
      unbind = mountGetStartedInteractions(sectionNode)
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
      id="get-started"
      className="k2-section k2-section-prefooter"
      dangerouslySetInnerHTML={{ __html: section.html }}
    />
  )
}
