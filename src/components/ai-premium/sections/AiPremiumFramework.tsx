"use client"

import { AiReveal } from "../primitives/AiReveal"
import { frameworkSteps } from "../data/agentic-ai-content"

export function AiPremiumFramework() {
  return (
    <section
      className="relative overflow-hidden bg-[var(--ai-navy-deep)] py-24 text-white md:py-32"
      aria-labelledby="ai-framework-heading"
    >
      <div className="ai-grid-glow opacity-50" aria-hidden />
      <div className="ai-dots left-[3%] bottom-[6%] h-64 w-64" aria-hidden />
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">
        <AiReveal className="max-w-2xl">
          <span className="ai-pill mb-6">Delivery framework</span>
          <h2 id="ai-framework-heading" className="ai-h2 text-white">
            From vision to <em className="text-[#9db1ff]">governed autonomy</em>
          </h2>
          <p className="mt-5 text-[16px] leading-[1.7] text-white/60">
            Enterprise program discipline — adapted for Microsoft estates and offshore delivery at
            Softree speed.
          </p>
        </AiReveal>

        <hr className="ai-rule ai-rule--dark mt-10" />

        <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5" data-stagger>
          {frameworkSteps.map((step) => (
            <li key={step.step} className="border-l border-white/12 pl-5">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--ai-accent)]">
                {step.step}
              </span>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-2 text-sm leading-[1.7] text-white/55">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
