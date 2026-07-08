"use client"

import { AiReveal } from "../primitives/AiReveal"
import { processSteps } from "../data/agentic-ai-content"

export function AiPremiumProcess() {
  return (
    <section className="bg-[var(--ai-cream)] py-24 md:py-32" aria-labelledby="ai-process-heading">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <AiReveal className="mx-auto max-w-3xl text-center">
          <span className="ai-pill ai-pill--light mb-6">How we work</span>
          <h2 id="ai-process-heading" className="ai-h2 text-[var(--ai-ink)]">
            From discovery to <em>production agents</em>
          </h2>
          <p className="mt-5 text-[16px] leading-[1.7] text-[var(--ai-muted)]">
            A proven five-step delivery model — designed for enterprises that need agents in
            production, not perpetual pilots.
          </p>
        </AiReveal>

        <ol className="relative mt-16 grid gap-6 md:grid-cols-5" data-stagger>
          <div
            className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-[var(--ai-line)] md:block"
            aria-hidden
          />
          {processSteps.map((step) => (
            <li key={step.step} className="relative" data-anim>
              <div className="ai-process-node">{step.step}</div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-[var(--ai-navy)]">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ai-muted)]">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
