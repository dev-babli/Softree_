"use client"

import { useEffect, useMemo, useRef } from "react"
import { initK2SplitAndStagger, refreshK2ScrollVisibility } from "./k2ScrollReveal"
import { applySoftreeSectionHtml } from "./softreeAgenticHtmlCopy"
import { SOFTREE_AGENTIC_SECTIONS } from "./referenceContent"
import "./softree-get-started-fix.css"

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

export function SoftreeAgenticGetStartedSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const section = useMemo(() => {
    const raw = SOFTREE_AGENTIC_SECTIONS.find((item) => item.name === "SoftreeAgenticGetStartedSection")
    if (!raw) return null
    return { ...raw, html: applySoftreeSectionHtml("SoftreeAgenticGetStartedSection", raw.html) }
  }, [])

  useEffect(() => {
    const sectionNode = sectionRef.current
    if (!sectionNode) return

    let unbind = mountGetStartedInteractions(sectionNode)

    const onIntroComplete = () => {
      unbind()
      unbind = mountGetStartedInteractions(sectionNode)
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
      id="get-started"
      className="k2-section k2-section-prefooter"
      dangerouslySetInnerHTML={{ __html: section.html }}
    />
  )
}
