"use client"

import { AiReveal } from "../primitives/AiReveal"
import { industryFocusPills } from "../data/agentic-ai-content"

export function AiPremiumIndustryPills() {
  return (
    <section className="border-t border-[var(--ai-line)] bg-white py-20 md:py-24" aria-labelledby="ai-industry-pills-heading">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <AiReveal className="mx-auto max-w-3xl text-center">
          <span className="ai-pill ai-pill--light mb-6">Industries we focus on</span>
          <h2 id="ai-industry-pills-heading" className="ai-h2 text-[var(--ai-ink)]">
            Specialized agentic AI for regulated
            <br className="hidden md:block" /> and complex industries
          </h2>
          <p className="mt-5 text-[16px] leading-[1.7] text-[var(--ai-muted)]">
            Deep vertical knowledge accelerates your agent program — patterns, guardrails, and
            integrations tuned to how your sector actually operates.
          </p>
        </AiReveal>

        <div className="mt-12 flex flex-wrap justify-center gap-3" data-stagger>
          {industryFocusPills.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="ai-industry-pill group"
                data-anim
              >
                <span className="ai-industry-pill__icon" aria-hidden>
                  <Icon className="h-4 w-4 text-[#1852ff]" />
                </span>
                <span className="text-sm font-medium text-[var(--ai-navy)]">{item.title}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
