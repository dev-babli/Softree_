"use client"

import { useEffect, useMemo, useRef } from "react"
import { KORE_AI_SECTIONS } from "./referenceContent"

export function KoreGetStartedSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const section = useMemo(
    () => KORE_AI_SECTIONS.find((item) => item.name === "KoreGetStartedSection"),
    [],
  )

  useEffect(() => {
    const sectionNode = sectionRef.current
    const revealTarget = sectionNode?.querySelector<HTMLElement>(".k2-container-prefooter")
    if (!revealTarget) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          revealTarget.classList.add("on")
          observer.disconnect()
        }
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0.1 },
    )

    observer.observe(revealTarget)
    if (revealTarget.getBoundingClientRect().top < window.innerHeight) revealTarget.classList.add("on")

    return () => observer.disconnect()
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
