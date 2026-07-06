"use client"

import { useState } from "react"

import { GenSection } from "../primitives/GenSection"
import { genServices } from "../data"

export function GenAiServices() {
  const [active, setActive] = useState(1)
  const current = genServices.find((s) => s.id === active) ?? genServices[0]

  return (
    <GenSection
      id="services"
      badge="Services"
      headline={
        <>
          End-to-end Generative AI
          <br />
          <span className="text-[#FF5812]">built for enterprise scale</span>
        </>
      }
      body="From strategy and model design to deployment and optimization, we help organizations unlock real business value with secure, scalable generative AI."
    >
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
        <ul className="flex flex-col gap-2 lg:col-span-5">
          {genServices.map((service) => {
            const isActive = service.id === active
            return (
              <li key={service.id}>
                <button
                  type="button"
                  onClick={() => setActive(service.id)}
                  className={`flex min-h-11 w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
                    isActive
                      ? "border-[#FF5812]/35 bg-[#FF5812]/5 text-[#0a0a1a]"
                      : "border-[#0a0a1a]/08 bg-white text-[#0a0a1a]/70 hover:border-[#FF5812]/20"
                  }`}
                >
                  <span className="font-mono text-[10px] font-semibold tracking-[0.14em] text-[#FF5812]">
                    {String(service.id).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 text-sm font-semibold leading-snug">{service.title}</span>
                </button>
              </li>
            )
          })}
        </ul>

        <div className="min-w-0 rounded-2xl border border-[#0a0a1a]/08 bg-[#f8f4ec] p-6 md:p-8 lg:col-span-7">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FF5812]">
            Service {String(current.id).padStart(2, "0")}
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[#0a0a1a]">{current.title}</h3>
          <p className="mt-3 text-base leading-relaxed text-[#0a0a1a]/65">{current.desc}</p>
          <ul className="mt-6 space-y-3">
            {current.points.map((point) => (
              <li key={point} className="flex gap-3 text-sm leading-relaxed text-[#0a0a1a]/80">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF5812]" aria-hidden />
                <span className="min-w-0">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </GenSection>
  )
}
