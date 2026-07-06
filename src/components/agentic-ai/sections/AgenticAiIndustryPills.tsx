"use client"

import { AgenticSection } from "../primitives/AgenticSection"
import { industryFocusPills } from "../data"

export function AgenticAiIndustryPills() {
  return (
    <AgenticSection
      badge="Industries we focus on"
      accent="#FF5812"
      headline="Specialized agentic AI for regulated and complex industries"
      body="Deep vertical knowledge accelerates your agent program across 19 sectors."
    >
      <div className="flex flex-wrap justify-center gap-3">
        {industryFocusPills.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.title}
              className="group flex items-center gap-2.5 rounded-xl border border-[var(--legacy-111)]/[0.08] bg-white px-4 py-3 shadow-[0_1px_0_rgba(10,10,26,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FF5812]/25 hover:shadow-[0_12px_32px_-20px_rgba(10,10,26,0.15)]"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF5812]/8 text-[#FF5812] transition-colors group-hover:bg-[#FF5812]/14">
                <Icon className="h-4 w-4" aria-hidden />
              </span>
              <span className="text-sm font-medium text-[#0a0a1a]">{item.title}</span>
            </div>
          )
        })}
      </div>
    </AgenticSection>
  )
}
