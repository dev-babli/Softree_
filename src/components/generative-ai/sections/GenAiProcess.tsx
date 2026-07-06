"use client"

import { GenSection } from "../primitives/GenSection"
import { genProcess } from "../data"

export function GenAiProcess() {
  return (
    <GenSection
      id="process"
      badge="How we work"
      headline="From concept to intelligent automation"
      body="We design, build, and deploy enterprise-grade generative AI systems that transform workflows and unlock new digital capabilities."
    >
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {genProcess.map((step) => (
          <li
            key={step.step}
            className="min-w-0 rounded-2xl border border-[#0a0a1a]/08 bg-[#f8f4ec] p-6"
          >
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF5812]">
              Step {step.step}
            </span>
            <h3 className="mt-3 text-lg font-semibold tracking-tight text-[#0a0a1a]">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#0a0a1a]/65">{step.body}</p>
          </li>
        ))}
      </ol>
    </GenSection>
  )
}
