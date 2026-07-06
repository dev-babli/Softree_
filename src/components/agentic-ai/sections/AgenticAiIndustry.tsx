"use client"



import { useState } from "react"

import { Check } from "lucide-react"



import { AgenticSection } from "../primitives/AgenticSection"

import { industryTabs, type IndustryTabId } from "../data"



export function AgenticAiIndustry() {

  const [active, setActive] = useState<IndustryTabId>("banking")

  const tab = industryTabs.find((t) => t.id === active) ?? industryTabs[0]



  return (

    <AgenticSection

      variant="cream"

      badge="Industry programs"

      headline="Purpose-built agentic AI for your vertical"

      body="Vertical patterns, guardrails, and integrations tuned to how your sector actually operates."

    >

      <div className="mb-8 flex flex-wrap gap-2">

        {industryTabs.map((t) => (

          <button

            key={t.id}

            type="button"

            onClick={() => setActive(t.id)}

            className={`inline-flex min-h-11 items-center rounded-full border px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.1em] transition-all ${

              active === t.id

                ? "border-[#0a0a1a] bg-[#0a0a1a] text-white"

                : "border-[var(--legacy-eaeaea)] bg-white text-[var(--legacy-555)] hover:border-[#0a0a1a]/20"

            }`}

          >

            {t.label}

          </button>

        ))}

      </div>



      <div className="grid gap-8 rounded-2xl border border-[var(--legacy-111)]/[0.08] bg-white p-8 md:grid-cols-[1.1fr_0.9fr] md:p-10">

        <div>

          <h3 className="text-2xl font-bold tracking-[-0.03em] text-[#0a0a1a] md:text-3xl">{tab.headline}</h3>

          <p className="mt-4 text-base leading-relaxed text-[#0a0a1a]/65">{tab.body}</p>

          <div className="mt-6 flex flex-wrap gap-2">

            {tab.logos.map((logo) => (

              <span

                key={logo}

                className="rounded-full border border-[var(--legacy-eaeaea)] bg-[#F8F9FC] px-3 py-1.5 text-[11px] font-medium text-[#0a0a1a]/70"

              >

                {logo}

              </span>

            ))}

          </div>

        </div>

        <ul className="space-y-3 self-end">

          {tab.outcomes.map((outcome) => (

            <li

              key={outcome}

              className="flex items-center gap-3 rounded-xl border border-[var(--legacy-eaeaea)] bg-[#F8F9FC] px-4 py-3 text-sm font-medium text-[#0a0a1a]"

            >

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FF5812]/10 text-[#FF5812]">

                <Check className="h-4 w-4" aria-hidden />

              </span>

              {outcome}

            </li>

          ))}

        </ul>

      </div>

    </AgenticSection>

  )

}

