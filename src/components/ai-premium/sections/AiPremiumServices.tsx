"use client"

import { AiReveal } from "../primitives/AiReveal"
import { aiServices } from "../data/agentic-ai-content"

export function AiPremiumServices() {
  return (
    <section className="bg-white py-24 md:py-32" aria-labelledby="ai-services-heading">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <AiReveal className="max-w-3xl">
          <span className="ai-pill ai-pill--light mb-6">Services</span>
          <h2 id="ai-services-heading" className="ai-h2 text-[var(--ai-ink)]">
            AI services <span className="ai-brace">&amp;</span> solutions
          </h2>
          <p className="mt-5 max-w-2xl text-[16px] leading-[1.7] text-[var(--ai-muted)]">
            Strategy through infrastructure — one offshore team that ships across the full agentic
            AI lifecycle.
          </p>
        </AiReveal>

        <hr className="ai-rule mt-10" />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3" data-stagger>
          {aiServices.map((block) => (
            <article key={block.id} className="ai-card flex flex-col p-6">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--ai-blue)]">
                {block.id}
              </span>
              <h3 className="mt-2 text-lg font-semibold tracking-tight text-[var(--ai-ink)]">
                {block.title}
              </h3>
              <ul className="mt-4 flex flex-1 flex-col gap-2 border-t border-[var(--ai-line)] pt-4">
                {block.points.map((point) => (
                  <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-[var(--ai-muted)]">
                    <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-[1px] bg-[var(--ai-blue)]" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
