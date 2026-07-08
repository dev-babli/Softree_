"use client"

import { GenSection } from "../primitives/GenSection"
import { genFramework } from "../data"

export function GenAiFramework() {
  return (
    <GenSection
      id="framework"
      variant="cream"
      badge="Framework"
      headline="A structured path to production-ready Generative AI"
      body="Move from experimentation to scalable, secure deployments. We align business priorities, model capabilities, and engineering rigor for measurable outcomes."
    >
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {genFramework.map((step) => (
          <li
            key={step.step}
            className="min-w-0 rounded-2xl border border-[#0a0a1a]/08 bg-white p-6 shadow-[0_20px_50px_-28px_rgba(17,17,17,0.1)]"
          >
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF5812]">
              {step.step}
            </span>
            <h3 className="mt-3 text-lg font-semibold tracking-tight text-[#0a0a1a]">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#0a0a1a]/65">{step.body}</p>
          </li>
        ))}
      </ol>
    </GenSection>
  )
}
