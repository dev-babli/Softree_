"use client"

import { AgenticSection } from "../primitives/AgenticSection"
import { AgenticAccordion } from "../primitives/AgenticAccordion"
import { frameworkSteps } from "../data"

export function AgenticAiFramework() {
  const items = frameworkSteps.map((step) => ({
    id: step.step,
    number: `(${step.step})`,
    title: step.title,
    description: step.body,
  }))

  return (
    <AgenticSection
      badge="Delivery framework"
      accent="#FF5812"
      headline="From vision to governed autonomy"
      body="Enterprise program discipline, adapted for Microsoft estates and offshore delivery at Softree speed."
    >
      <div className="mb-10 flex flex-col md:flex-row md:items-center">
        <h3 className="text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-[-0.04em] text-[var(--legacy-111)] leading-none">
          How we deliver agent programs
        </h3>
        <div className="my-6 h-px w-full bg-[var(--legacy-eaeaea)] md:mx-8 md:my-0 md:h-10 md:w-px" />
        <div className="flex items-center gap-2.5">
          <div className="h-1.5 w-1.5 bg-[var(--legacy-ff4500)]" />
          <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--legacy-555)]">
            Framework
          </span>
        </div>
      </div>
      <AgenticAccordion items={items} defaultId="01" />
    </AgenticSection>
  )
}
