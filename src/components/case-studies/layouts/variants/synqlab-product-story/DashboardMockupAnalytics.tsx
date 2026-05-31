"use client"

import { SYNQLAB_TOKENS as T } from "./tokens"

const BARS = [
  { label: "Jan", h: 45 },
  { label: "Feb", h: 58 },
  { label: "Mar", h: 52 },
  { label: "Apr", h: 72 },
  { label: "May", h: 65 },
  { label: "Jun", h: 88 },
  { label: "Jul", h: 78 },
  { label: "Aug", h: 95 },
] as const

const DONUT_SEGMENTS = [
  { pct: 38, color: T.accent, label: "US" },
  { pct: 24, color: "#818CF8", label: "UK" },
  { pct: 18, color: "#A5B4FC", label: "DE" },
  { pct: 12, color: "#C7D2FE", label: "FR" },
  { pct: 8, color: "#E0E7FF", label: "Other" },
] as const

const TABLE_ROWS = [
  { page: "/dashboard", views: "12,482", bounce: "24%", trend: "+12%" },
  { page: "/analytics", views: "8,934", bounce: "18%", trend: "+8%" },
  { page: "/reports", views: "6,721", bounce: "31%", trend: "+22%" },
  { page: "/settings", views: "3,892", bounce: "42%", trend: "-3%" },
] as const

function DonutChart() {
  let cumulative = 0
  const segments = DONUT_SEGMENTS.map((seg) => {
    const start = cumulative
    cumulative += seg.pct
    return { ...seg, start, end: cumulative }
  })

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
      {segments.map((seg) => {
        const startAngle = (seg.start / 100) * 360 - 90
        const endAngle = (seg.end / 100) * 360 - 90
        const startRad = (startAngle * Math.PI) / 180
        const endRad = (endAngle * Math.PI) / 180
        const largeArc = seg.pct > 50 ? 1 : 0
        const x1 = 50 + 40 * Math.cos(startRad)
        const y1 = 50 + 40 * Math.sin(startRad)
        const x2 = 50 + 40 * Math.cos(endRad)
        const y2 = 50 + 40 * Math.sin(endRad)
        return (
          <path
            key={seg.label}
            d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
            fill={seg.color}
          />
        )
      })}
      <circle cx="50" cy="50" r="24" fill="white" />
    </svg>
  )
}

type Props = {
  className?: string
}

export function DashboardMockupAnalytics({ className = "" }: Props) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-slate-200/80 bg-white ${className}`}
      style={{ boxShadow: T.mockupShadow }}
    >
      <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/90 px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
        <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
        <span className="h-2 w-2 rounded-full bg-[#28C840]" />
        <span className="ml-2 text-[10px] font-semibold text-slate-600">Analytics Dashboard</span>
      </div>

      <div className="grid gap-4 p-4 sm:p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-100 bg-slate-50/40 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Revenue Overview
            </p>
            <p className="mt-1 text-lg font-bold text-slate-900">$284.5K</p>
            <p className="text-[10px] font-medium" style={{ color: T.accent }}>
              +18.4% vs last month
            </p>
            <div className="mt-4 flex h-24 items-end gap-1.5">
              {BARS.map((bar, i) => (
                <div key={bar.label} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className="w-full rounded-sm"
                    style={{
                      height: `${bar.h}%`,
                      background: i === BARS.length - 1 ? T.accent : `${T.accent}55`,
                    }}
                  />
                  <span className="text-[7px] text-slate-400">{bar.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50/40 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Users by Country
            </p>
            <div className="mt-3 flex items-center gap-4">
              <div className="h-24 w-24 shrink-0">
                <DonutChart />
              </div>
              <div className="min-w-0 flex-1 space-y-1.5">
                {DONUT_SEGMENTS.map((seg) => (
                  <div key={seg.label} className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5">
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ background: seg.color }}
                      />
                      <span className="text-[9px] text-slate-600">{seg.label}</span>
                    </span>
                    <span className="text-[9px] font-semibold text-slate-700">{seg.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-white p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Top Performing Pages
          </p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[280px] text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  {["Page", "Views", "Bounce", "Trend"].map((col) => (
                    <th
                      key={col}
                      className="pb-2 pr-3 text-[8px] font-semibold uppercase tracking-wider text-slate-400"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map((row) => (
                  <tr key={row.page} className="border-b border-slate-50 last:border-0">
                    <td className="py-2 pr-3 text-[10px] font-medium text-slate-800">{row.page}</td>
                    <td className="py-2 pr-3 text-[10px] text-slate-600">{row.views}</td>
                    <td className="py-2 pr-3 text-[10px] text-slate-600">{row.bounce}</td>
                    <td
                      className="py-2 text-[10px] font-semibold"
                      style={{ color: row.trend.startsWith("+") ? T.accent : "#EF4444" }}
                    >
                      {row.trend}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
