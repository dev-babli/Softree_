"use client"



import { AgenticSection } from "../primitives/AgenticSection"

import { processSteps } from "../data"



export function AgenticAiProcess() {

  return (

    <AgenticSection

      variant="cream"

      badge="How we work"

      headline="From discovery to production agents"

      body="A proven five-step delivery model for enterprises that need agents in production, not perpetual pilots."

    >

      <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">

        {processSteps.map((step) => (

          <li

            key={step.step}

            className="rounded-2xl border border-[var(--legacy-111)]/[0.08] bg-white p-6 shadow-[0_20px_50px_-28px_rgba(17,17,17,0.1)]"

          >

            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF5812]">

              Step {step.step}

            </span>

            <h3 className="mt-3 text-lg font-semibold tracking-tight text-[#0a0a1a]">{step.title}</h3>

            <p className="mt-2 text-sm leading-relaxed text-[#0a0a1a]/65">{step.body}</p>

          </li>

        ))}

      </ol>

    </AgenticSection>

  )

}

