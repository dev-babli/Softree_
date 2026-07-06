"use client"

import { AiReveal } from "../primitives/AiReveal"
import { techStackTools } from "../data/agentic-ai-content"

export function AiPremiumTechStack() {
  return (
    <section className="bg-[var(--ai-paper)] py-24 md:py-32" aria-labelledby="ai-tech-heading">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <AiReveal className="max-w-3xl">
          <span className="ai-pill ai-pill--light mb-6">Technology ecosystem</span>
          <h2 id="ai-tech-heading" className="ai-h2 text-[var(--ai-ink)]">
            Architected to be <em>AI-native</em>
          </h2>
          <p className="mt-5 max-w-2xl text-[16px] leading-[1.7] text-[var(--ai-muted)]">
            Orchestration, reasoning, memory, and governance — the full toolchain behind production
            agents, not slide-deck logos.
          </p>
        </AiReveal>

        <hr className="ai-rule mt-10" />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4" data-stagger>
          {techStackTools.map((tool) => {
            const Icon = tool.icon
            return (
              <article key={tool.title} className="ai-card p-6">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[4px] bg-[var(--ai-ink)] text-white">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="text-[16px] font-semibold tracking-tight text-[var(--ai-ink)]">
                  {tool.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {tool.tags.map((tag) => (
                    <span key={tag} className="ai-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
