"use client"

import { SpotlightCard } from "@/components/qc/shared/SpotlightCard"
import { AgenticSection } from "../primitives/AgenticSection"
import { techStackTools } from "../data"

export function AgenticAiTechStack() {
  return (
    <AgenticSection
      variant="cream"
      badge="Technology ecosystem"
      accent="#FF5812"
      headline={
        <>
          Architected to be <span className="text-[#FF5812]">AI-native</span>
        </>
      }
      body="Orchestration, reasoning, memory, and governance: the full toolchain behind production agents."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {techStackTools.map((tool) => {
          const Icon = tool.icon
          return (
            <SpotlightCard
              key={tool.title}
              color="rgba(255, 88, 18, 0.28)"
              className="rounded-2xl border border-[var(--legacy-111)]/[0.08] bg-white p-6"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#0a0a1a] text-white">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="text-[15px] font-semibold text-[#0a0a1a]">{tool.title}</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-[var(--legacy-eaeaea)] bg-[#F8F9FC] px-2 py-0.5 text-[10px] font-medium text-[#0a0a1a]/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          )
        })}
      </div>
    </AgenticSection>
  )
}
