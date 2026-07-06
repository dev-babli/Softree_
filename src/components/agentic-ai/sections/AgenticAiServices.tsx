"use client"

import { AgenticSection } from "../primitives/AgenticSection"
import { AgenticAccordion } from "../primitives/AgenticAccordion"
import { aiServices } from "../data"

export function AgenticAiServices() {
  const items = aiServices.map((s) => ({
    id: s.id,
    number: `(${s.id})`,
    title: s.title,
    description: s.points[0] ?? "",
    bullets: s.points,
  }))

  return (
    <AgenticSection
      variant="cream"
      badge="Services"
      accent="#FF5812"
      headline="AI services & solutions"
      body="Strategy through infrastructure, one offshore team across the full agentic AI lifecycle."
    >
      <div className="mb-10 flex flex-col md:flex-row md:items-center">
        <h3 className="text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-[-0.04em] text-[var(--legacy-111)] leading-none">
          Full-stack AI capabilities
        </h3>
        <div className="my-6 h-px w-full bg-[var(--legacy-eaeaea)] md:mx-8 md:my-0 md:h-10 md:w-px" />
        <div className="flex items-center gap-2.5">
          <div className="h-1.5 w-1.5 bg-[#FF5812]" />
          <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--legacy-555)]">
            Catalog
          </span>
        </div>
      </div>
      <AgenticAccordion items={items} defaultId="01" />
    </AgenticSection>
  )
}
