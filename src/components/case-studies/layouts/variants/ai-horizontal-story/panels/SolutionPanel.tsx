"use client"

import { STORY_TOKENS } from "../tokens"
import { AIOperationsDashboard } from "../visuals/AIOperationsDashboard"

type Props = {
  tasksAutomated?: number
  summary?: string
  isActive?: boolean
}

export function SolutionPanel({ tasksAutomated, summary, isActive }: Props) {
  return (
    <article
      data-story-panel
      className="story-panel flex h-full shrink-0 flex-col overflow-hidden rounded-[32px] p-10 md:p-12"
      style={{
        width: "var(--story-panel-width)",
        background: STORY_TOKENS.bg,
        border: "1px solid rgba(109, 93, 246, 0.06)",
      }}
    >
      <header>
        <span className="text-sm font-bold tracking-[0.2em] text-[#94A3B8]">03</span>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0B1020] md:text-4xl">
          The Solution
        </h2>
        <p className="mt-3 max-w-xl text-[#64748B]">
          {summary ||
            "A unified operations command center where autonomous agents, live KPIs, and audit-ready workflows run on a single governed platform."}
        </p>
      </header>
      <div className="relative mt-8 min-h-0 flex-1">
        <AIOperationsDashboard tasksAutomated={tasksAutomated} isActive={isActive} />
      </div>
    </article>
  )
}
