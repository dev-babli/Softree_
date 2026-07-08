"use client"

import { useState } from "react"
import { trackModernizationEvent } from "./analytics"

const TABS = [
  { id: "problems", label: "Problems" },
  { id: "trust", label: "Trust" },
  { id: "competitors", label: "Competitors" },
  { id: "wireframe", label: "Wireframe" },
] as const

type TabId = (typeof TABS)[number]["id"]

const DEMO_CONTENT: Record<TabId, { title: string; items: string[] }> = {
  problems: {
    title: "Top issues (sample — demo data only)",
    items: [
      "Critical: No clear primary CTA above the fold",
      "High: LCP estimated 4.2s on mobile",
      "High: H1 does not match paid-search intent",
      "Medium: Missing FAQ schema for service queries",
      "Medium: Case studies buried three clicks deep",
    ],
  },
  trust: {
    title: "Trust & positioning gaps (sample)",
    items: [
      "Proof density: 2/10 — no named client logos on homepage",
      "Messaging: feature-led; competitors lead with outcomes",
      "Security: no ISO or compliance badges visible",
      "About: generic offshore copy — no founder or team story",
    ],
  },
  competitors: {
    title: "Competitive matrix (sample — partial preview)",
    items: [
      "Value prop clarity: You 5/10 · Peer A 8/10 · Peer B 7/10",
      "Trust signals: You 4/10 · Peer A 9/10 · Peer B 7/10",
      "CTA strength: You 5/10 · Peer A 8/10 · Peer B 6/10",
      "Full matrix unlocks with your URL in the live analyser below.",
    ],
  },
  wireframe: {
    title: "Wireframe blueprint (sample layout blocks)",
    items: [
      "Hero: outcome headline + dual CTA (blueprint / book call)",
      "Proof strip: 4 client logos + one quantified case metric",
      "Services: 3 cards with benefit-led copy",
      "Process: 4-step timeline",
      "Final CTA: strategy call with trust badges adjacent",
    ],
  },
}

export default function SampleBlueprint() {
  const [active, setActive] = useState<TabId>("problems")

  function selectTab(id: TabId) {
    setActive(id)
    trackModernizationEvent("blueprint_tab_view", { tab: id })
  }

  return (
    <section
      aria-labelledby="wm-sample-heading"
      className="bg-white py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5812]">
            Sample deliverable
          </p>
          <h2
            id="wm-sample-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl"
          >
            See what your blueprint includes
          </h2>
          <p className="mt-4 text-base text-zinc-600">
            This is labelled demo data. Your live report is generated from the URL
            you submit in the analyser below.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-zinc-200 shadow-lg">
          <div
            role="tablist"
            aria-label="Blueprint sections"
            className="flex flex-wrap border-b border-zinc-200 bg-zinc-50"
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`wm-tab-${tab.id}`}
                aria-selected={active === tab.id}
                aria-controls={`wm-panel-${tab.id}`}
                onClick={() => selectTab(tab.id)}
                className={`min-h-11 flex-1 px-4 py-3 text-sm font-semibold transition sm:flex-none sm:px-6 ${
                  active === tab.id
                    ? "border-b-2 border-[#FF5812] bg-white text-zinc-900"
                    : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {TABS.map((tab) => (
            <div
              key={tab.id}
              role="tabpanel"
              id={`wm-panel-${tab.id}`}
              aria-labelledby={`wm-tab-${tab.id}`}
              hidden={active !== tab.id}
              className="p-6 md:p-8"
            >
              <h3 className="text-lg font-semibold text-zinc-900">
                {DEMO_CONTENT[tab.id].title}
              </h3>
              <ul className="mt-4 space-y-3">
                {DEMO_CONTENT[tab.id].items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-relaxed text-zinc-700"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF5812]" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
