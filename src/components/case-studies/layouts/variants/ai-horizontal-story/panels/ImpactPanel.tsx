"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"
import type { Highlight, Testimonial } from "../../../types"
import { STORY_TOKENS } from "../tokens"
import { GlowingPlanet } from "../visuals/GlowingPlanet"

type Props = {
  metrics: Highlight[]
  testimonial?: Testimonial
  isActive?: boolean
}

function MetricCard({
  metric,
  index,
  animate,
}: {
  metric: Highlight
  index: number
  animate?: boolean
}) {
  const valueRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const el = valueRef.current
      if (!el || !animate) return
      const raw = metric.value.replace(/[^0-9.]/g, "")
      const num = parseFloat(raw)
      if (Number.isNaN(num)) return
      const prefix = metric.value.match(/^[^0-9]*/)?.[0] ?? ""
      const suffix = metric.value.match(/[^0-9.]*$/)?.[0] ?? ""
      const obj = { val: 0 }
      gsap.to(obj, {
        val: num,
        duration: 1.6,
        delay: index * 0.1,
        ease: "power2.out",
        onUpdate: () => {
          const formatted = metric.value.includes(".")
            ? obj.val.toFixed(1)
            : String(Math.round(obj.val))
          el.textContent = `${prefix}${formatted}${suffix.replace(/^[0-9.]+/, "")}`
        },
      })
    },
    { scope: valueRef, dependencies: [metric.value, index, animate] },
  )

  return (
    <div className="rounded-[24px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <p className="text-3xl font-bold text-white">
        <span ref={valueRef}>{metric.value}</span>
      </p>
      <p className="mt-2 text-sm text-slate-400">{metric.label}</p>
      <svg viewBox="0 0 120 32" className="mt-4 h-8 w-full opacity-60" aria-hidden>
        <path
          d={`M0,24 Q30,${18 - index * 2} 60,${14 + index} T120,${8 + index * 2}`}
          fill="none"
          stroke={STORY_TOKENS.primary}
          strokeWidth="2"
        />
      </svg>
    </div>
  )
}

export function ImpactPanel({ metrics, testimonial, isActive }: Props) {
  const displayMetrics =
    metrics.length >= 4
      ? metrics.slice(0, 4)
      : [
          { value: "65%", label: "Faster decision cycles" },
          { value: "3.8x", label: "Throughput on core workflows" },
          { value: "$6.2M+", label: "Annualized efficiency gains" },
          { value: "99.9%", label: "Platform availability" },
        ]

  return (
    <article
      data-story-panel
      className="story-panel relative flex h-full shrink-0 flex-col overflow-hidden rounded-[32px] p-10 md:p-12"
      style={{
        width: "var(--story-panel-width)",
        background: STORY_TOKENS.navyDeep,
      }}
    >
      <GlowingPlanet />
      <header className="relative z-10">
        <span className="text-sm font-bold tracking-[0.2em] text-[#A78BFA]">04</span>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
          The Impact
        </h2>
      </header>
      <div className="relative z-10 mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {displayMetrics.map((m, i) => (
          <MetricCard key={m.label} metric={m} index={i} animate={isActive} />
        ))}
      </div>
      {testimonial?.quote && (
        <blockquote className="relative z-10 mt-10 max-w-2xl rounded-[24px] border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <p className="text-lg leading-relaxed text-slate-200">&ldquo;{testimonial.quote}&rdquo;</p>
          <footer className="mt-6">
            <p className="font-semibold text-white">
              {testimonial.name || "David Chen"}
            </p>
            <p className="text-sm text-slate-400">
              {[testimonial.role, testimonial.company].filter(Boolean).join(" · ") ||
                "CTO · Neutrino AI"}
            </p>
          </footer>
        </blockquote>
      )}
    </article>
  )
}
