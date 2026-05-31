"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"
import { STORY_TOKENS } from "../tokens"

const AGENTS = [
  { name: "Invoice Reconciliation", status: "Running", load: 82 },
  { name: "Quality Anomaly Scan", status: "Idle", load: 12 },
  { name: "Supplier Risk Monitor", status: "Running", load: 64 },
  { name: "Forecast Refresh", status: "Queued", load: 0 },
]

type Props = {
  tasksAutomated?: number
  isActive?: boolean
}

export function AIOperationsDashboard({ tasksAutomated = 24846, isActive }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const chartRef = useRef<SVGPathElement>(null)
  const playedRef = useRef(false)

  useGSAP(
    () => {
      if (!isActive || playedRef.current) return
      playedRef.current = true

      if (counterRef.current) {
        const obj = { val: 0 }
        gsap.to(obj, {
          val: tasksAutomated,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = Math.round(obj.val).toLocaleString()
            }
          },
        })
      }
      if (chartRef.current) {
        const len = chartRef.current.getTotalLength()
        gsap.set(chartRef.current, { strokeDasharray: len, strokeDashoffset: len })
        gsap.to(chartRef.current, {
          strokeDashoffset: 0,
          duration: 1.8,
          ease: "power2.inOut",
        })
      }
    },
    { scope: rootRef, dependencies: [tasksAutomated, isActive] },
  )

  return (
    <div
      ref={rootRef}
      className="relative flex h-full flex-col overflow-hidden border bg-white"
      style={{
        borderRadius: STORY_TOKENS.radius,
        borderColor: "rgba(148, 163, 184, 0.25)",
        boxShadow: "0 24px 64px rgba(11, 16, 32, 0.07), 0 8px 24px rgba(11, 16, 32, 0.04)",
      }}
    >
      <div
        className="flex items-center justify-between border-b px-6 py-3"
        style={{ borderColor: "rgba(148, 163, 184, 0.25)", background: "#F8F9FC" }}
      >
        <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#94A3B8]">
          Operations Command
        </p>
        <span
          className="rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white"
          style={{ background: STORY_TOKENS.primary }}
        >
          Live System
        </span>
      </div>
      <div className="border-b border-slate-100 px-8 py-5">
        <div className="mt-4 flex flex-wrap items-end gap-8">
          <div>
            <p className="text-sm text-[#64748B]">Tasks Automated</p>
            <p className="text-4xl font-bold tracking-tight text-[#0B1020]">
              <span ref={counterRef}>0</span>
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Avg. cycle time", value: "4.2h" },
              { label: "Accuracy", value: "99.4%" },
              { label: "Active agents", value: "18" },
            ].map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-2xl px-4 py-3"
                style={{ background: STORY_TOKENS.primaryMuted }}
              >
                <p className="text-[10px] font-medium uppercase tracking-wider text-[#64748B]">
                  {kpi.label}
                </p>
                <p className="mt-1 text-lg font-semibold text-[#0B1020]">{kpi.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-6 p-8">
        <div className="rounded-2xl border border-slate-100 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
            Throughput (7d)
          </p>
          <svg viewBox="0 0 280 100" className="mt-4 h-24 w-full" aria-hidden>
            <path
              ref={chartRef}
              d="M0,80 Q40,70 80,55 T160,40 T240,25 T280,15"
              fill="none"
              stroke={STORY_TOKENS.primary}
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
            AI Agent Activity
          </p>
          <ul className="mt-4 space-y-3">
            {AGENTS.map((agent) => (
              <li
                key={agent.name}
                className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-[#0B1020]">{agent.name}</p>
                  <p className="text-xs text-[#94A3B8]">{agent.status}</p>
                </div>
                <div className="h-2 w-16 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${agent.load}%`,
                      background: STORY_TOKENS.primary,
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 opacity-60"
        style={{
          background: `radial-gradient(ellipse 80% 100% at 50% 100%, ${STORY_TOKENS.primaryMuted}, transparent)`,
        }}
      />
    </div>
  )
}
