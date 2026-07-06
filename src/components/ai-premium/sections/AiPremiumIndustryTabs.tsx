"use client"

import { industryTabs, type IndustryTabId } from "../data/agentic-ai-content"
import { AiReveal } from "../primitives/AiReveal"
import { KoreTabPanel } from "@/components/kore/primitives/kore-tab-panel"
import { KoreTabStrip } from "@/components/kore/primitives/kore-tab-strip"
import { Check } from "lucide-react"
import { useState } from "react"

export function AiPremiumIndustryTabs() {
  const [active, setActive] = useState<IndustryTabId>("banking")
  const tab = industryTabs.find((t) => t.id === active) ?? industryTabs[0]

  return (
    <section className="relative bg-white py-24 md:py-32" aria-labelledby="ai-industry-heading">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <AiReveal className="max-w-2xl">
          <span className="ai-pill ai-pill--light mb-6">Industry programs</span>
          <h2 id="ai-industry-heading" className="ai-h2 text-[var(--ai-ink)]">
            Purpose-built agentic AI
            <br />
            for <em>your</em> vertical
          </h2>
        </AiReveal>

        <hr className="ai-rule mt-10" />

        <div className="mt-10 flex flex-col gap-8 lg:mt-14">
          <KoreTabStrip
            idBase="ai-industry"
            ariaLabel="Industry use cases"
            tabs={industryTabs.map((t) => ({ id: t.id, label: t.label }))}
            active={active}
            onActivate={setActive}
            className="tabs-menu"
            renderTab={(t) => t.label}
          />

          {industryTabs.map((panel) => (
            <KoreTabPanel key={panel.id} idBase="ai-industry" tabId={panel.id} active={active === panel.id}>
              <div className="grid gap-10 rounded-[1.5rem] border border-[var(--ai-line)] bg-[var(--ai-cream)]/50 p-8 md:grid-cols-[1.1fr_0.9fr] md:p-12">
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-[var(--ai-navy)] md:text-3xl">
                    {panel.headline}
                  </h3>
                  <p className="mt-4 max-w-xl text-[16px] leading-[1.65] text-[var(--ai-muted)]">
                    {panel.body}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2" aria-label="Related technologies">
                    {panel.logos.map((logo) => (
                      <span key={logo} className="ai-logo-chip">
                        {logo}
                      </span>
                    ))}
                  </div>
                </div>
                <ul className="space-y-3 self-end">
                  {panel.outcomes.map((outcome) => (
                    <li
                      key={outcome}
                      className="flex items-center gap-3 rounded-xl border border-[var(--ai-line)] bg-white px-4 py-3 text-sm font-medium text-[var(--ai-navy)]"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1852ff]/10 text-[#1852ff]">
                        <Check className="h-4 w-4" aria-hidden />
                      </span>
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            </KoreTabPanel>
          ))}
        </div>

        <div className="mt-8 overflow-hidden rounded-xl border border-[var(--ai-line)] bg-white py-4" aria-hidden>
          <div className="ai-logo-marquee flex gap-3">
            {[...tab.logos, ...tab.logos].map((logo, i) => (
              <span key={`${logo}-${i}`} className="ai-logo-chip ai-logo-chip--marquee shrink-0">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
