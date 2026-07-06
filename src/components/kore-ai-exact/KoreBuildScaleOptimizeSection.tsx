"use client"

import { useEffect, useMemo, useRef } from "react"
import { installKoreTabs } from "./koreTabs"
import { KORE_AI_SECTIONS } from "./referenceContent"

export function KoreBuildScaleOptimizeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const section = useMemo(
    () => KORE_AI_SECTIONS.find((item) => item.name === "KoreBuildScaleOptimizeSection"),
    [],
  )

  useEffect(() => {
    const sectionNode = sectionRef.current
    if (!sectionNode) return

    return installKoreTabs(sectionNode)
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
