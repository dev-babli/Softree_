"use client"

import { SpotlightCard } from "@/components/qc/shared/SpotlightCard"
import { AgenticSection } from "../primitives/AgenticSection"
import { platformPillars } from "../data"

export function AgenticAiPillars() {
  return (
    <AgenticSection
      variant="cream"
      badge="Platform pillars"
      headline={<>Everything you need to run agents in production, not just pilot them.</>}
      body="Enterprise-grade platform thinking on the Microsoft stack your teams already trust, with Softree offshore delivery velocity."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {platformPillars.map((pillar) => (
          <SpotlightCard
            key={pillar.title}
            color="rgba(255, 88, 18, 0.3)"
            className="rounded-2xl border border-[var(--legacy-111)]/[0.08] bg-white p-6 shadow-[0_20px_50px_-28px_rgba(17,17,17,0.12)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            <h3 className="text-[17px] font-semibold tracking-tight text-[#0a0a1a]">{pillar.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#0a0a1a]/65">{pillar.body}</p>
          </SpotlightCard>
        ))}
      </div>
    </AgenticSection>
  )
}
