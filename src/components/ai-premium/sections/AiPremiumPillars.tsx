"use client"

import { platformPillars } from "../data/agentic-ai-content"
import { AiReveal } from "../primitives/AiReveal"

export function AiPremiumPillars() {
  return (
    <section
      className="relative overflow-hidden bg-[var(--ai-ink)] py-24 text-white md:py-32"
      aria-labelledby="ai-pillars-heading"
    >
      <div className="ai-dots right-[4%] top-[8%] h-72 w-72" aria-hidden />
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">
        <AiReveal className="max-w-3xl">
          <span className="ai-pill mb-6">What our platform changes</span>
          <h2 id="ai-pillars-heading" className="ai-h2 text-white">
            What <span className="ai-brace">{"{ "}</span>
            <em>Agentic AI</em>
            <span className="ai-brace">{" }"}</span> changes
            <br />
            for your enterprise
          </h2>
        </AiReveal>

        <hr className="ai-rule ai-rule--dark mt-10" />

        <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2 xl:grid-cols-3" data-stagger>
          {platformPillars.map((pillar) => (
            <article key={pillar.title} className="border-l border-white/12 pl-6">
              <h3 className="font-mono text-[15px] font-semibold tracking-tight">
                <span className="ai-brace">{"{ "}</span>
                {pillar.title}
                <span className="ai-brace">{" }"}</span>
              </h3>
              <p className="mt-3 text-sm leading-[1.7] text-white/58">{pillar.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
