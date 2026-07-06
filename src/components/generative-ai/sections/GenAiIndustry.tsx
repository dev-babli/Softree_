"use client"

import { GenSection } from "../primitives/GenSection"
import { genIndustries } from "../data"

export function GenAiIndustry() {
  return (
    <GenSection
      id="industry"
      badge="Industries"
      headline="Expertise across every sector"
      body="We partner with organizations across industries to design, build, and scale intelligent digital solutions that create measurable impact."
    >
      <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#0a0a1a]/08 bg-[#0a0a1a]/08 sm:grid-cols-3 lg:grid-cols-5">
        {genIndustries.map((item) => (
          <li
            key={item}
            className="flex min-h-14 items-center justify-center bg-white px-3 py-4 text-center text-sm font-medium text-[#0a0a1a]/80 transition-colors hover:bg-[#f8f4ec] hover:text-[#FF5812]"
          >
            <span className="min-w-0">{item}</span>
          </li>
        ))}
      </ul>
    </GenSection>
  )
}
