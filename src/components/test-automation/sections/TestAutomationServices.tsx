"use client"

import { useState } from "react"

import { automationServices } from "../data"
import { TestAutomationSection } from "../primitives/TestAutomationSection"

export function TestAutomationServices() {
  const [active, setActive] = useState("web")
  const current = automationServices.find((service) => service.id === active) ?? automationServices[0]
  const focusTab = (nextIndex: number) => {
    const next = automationServices[nextIndex]
    if (!next) return
    setActive(next.id)
    requestAnimationFrame(() => {
      document.getElementById(`automation-tab-${next.id}`)?.focus()
    })
  }

  return (
    <TestAutomationSection
      id="services"
      badge="Automation coverage"
      headline={
        <>
          Quality automation across
          <br />
          <span className="text-[#FF5812]">every release surface</span>
        </>
      }
      body="Softree builds maintainable automation suites across web, mobile, API, AI-assisted regression, and delivery pipelines."
    >
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
        <ul className="flex flex-col gap-2 lg:col-span-5" role="tablist" aria-label="Automation service surfaces" aria-orientation="vertical">
          {automationServices.map((service, index) => {
            const isActive = service.id === active
            return (
              <li key={service.id}>
                <button
                  type="button"
                  id={`automation-tab-${service.id}`}
                  role="tab"
                  onClick={() => setActive(service.id)}
                  onKeyDown={(event) => {
                    if (event.key !== "ArrowDown" && event.key !== "ArrowRight" && event.key !== "ArrowUp" && event.key !== "ArrowLeft" && event.key !== "Home" && event.key !== "End") {
                      return
                    }
                    event.preventDefault()
                    if (event.key === "Home") return focusTab(0)
                    if (event.key === "End") return focusTab(automationServices.length - 1)
                    const direction = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1
                    focusTab((index + direction + automationServices.length) % automationServices.length)
                  }}
                  aria-selected={isActive}
                  aria-controls={isActive ? `automation-panel-${service.id}` : undefined}
                  tabIndex={isActive ? 0 : -1}
                  className={`flex min-h-11 w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812]/50 focus-visible:ring-offset-2 ${
                    isActive
                      ? "border-[#FF5812]/35 bg-[#FF5812]/5 text-[#0a0a1a]"
                      : "border-[#0a0a1a]/08 bg-white text-[#0a0a1a]/70 hover:border-[#FF5812]/20"
                  }`}
                >
                  <span className="font-mono text-[10px] font-semibold tracking-[0.14em] text-[#FF5812]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 text-sm font-semibold leading-snug">{service.title}</span>
                </button>
              </li>
            )
          })}
        </ul>

        <div
          id={`automation-panel-${current.id}`}
          role="tabpanel"
          aria-labelledby={`automation-tab-${current.id}`}
          className="min-w-0 rounded-2xl border border-[#0a0a1a]/08 bg-[#f8f4ec] p-6 md:p-8 lg:col-span-7"
        >
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FF5812]">
            {current.label}
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[#0a0a1a]">{current.title}</h3>
          <p className="mt-3 text-base leading-relaxed text-[#0a0a1a]/65">{current.description}</p>
          <div className="mt-7">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0a0a1a]/45">
              {current.categoryLabel}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {current.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-[#0a0a1a]/10 bg-white px-3 py-2 text-sm font-medium text-[#0a0a1a]/75"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </TestAutomationSection>
  )
}
