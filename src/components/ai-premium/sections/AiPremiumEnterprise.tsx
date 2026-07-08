"use client"

import { AiReveal } from "../primitives/AiReveal"
import { enterpriseBenefits } from "../data/agentic-ai-content"

export function AiPremiumEnterprise() {
  const { eyebrow, title, intro, left, right } = enterpriseBenefits

  return (
    <section className="bg-[var(--ai-cream)] py-24 md:py-32" aria-labelledby="ai-enterprise-heading">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <AiReveal>
            <span className="ai-pill ai-pill--light mb-6">{eyebrow}</span>
            <h2 id="ai-enterprise-heading" className="ai-h2 text-[var(--ai-ink)]">
              {title}
            </h2>
            <p className="mt-6 text-[16px] leading-[1.75] text-[var(--ai-muted)]">{intro}</p>
          </AiReveal>

          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:pt-4" data-stagger>
            {[...left, ...right].map((item) => (
              <div key={item.title} className="ai-benefit-row">
                <span className="ai-benefit-dot" aria-hidden />
                <p className="text-[15px] leading-[1.7] text-[var(--ai-muted)]">
                  <strong className="font-semibold text-[var(--ai-ink)]">{item.title}</strong>
                  {" — "}
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
