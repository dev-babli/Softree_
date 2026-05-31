"use client"

import {
  Activity,
  BarChart3,
  Calendar,
  CreditCard,
  Globe,
  LayoutDashboard,
  Settings,
  Shield,
  Users,
} from "lucide-react"
import { PAYFLOW_TOKENS as T } from "./tokens"

const SIDEBAR_ICONS = [LayoutDashboard, CreditCard, BarChart3, Users, Shield, Settings] as const

const KPI_DATA = [
  {
    label: "Transactions Today",
    value: "2.84M",
    change: "+2.5%",
    positive: true,
    sparkColor: T.accent,
    spark: "M0,20 L8,18 L16,14 L24,16 L32,10 L40,12 L48,6",
  },
  {
    label: "Success Rate",
    value: "98.7%",
    change: "+1.2%",
    positive: true,
    sparkColor: T.green,
    spark: "M0,18 L8,16 L16,14 L24,12 L32,10 L40,8 L48,4",
  },
  {
    label: "Revenue Today",
    value: "$1.42M",
    change: "+8.6%",
    positive: true,
    sparkColor: T.accent,
    spark: "M0,22 L12,20 L20,14 L28,16 L36,8 L48,4",
  },
  {
    label: "Chargeback Rate",
    value: "0.38%",
    change: "-0.12%",
    positive: true,
    sparkColor: T.purple,
    spark: "M0,8 L10,10 L20,12 L30,14 L40,16 L48,18",
  },
] as const

const BAR_HEIGHTS = [42, 58, 48, 72, 65, 80, 55, 68, 74, 60, 85, 70]

const DONUT_SEGMENTS = [
  { label: "United States", pct: 38, color: T.accent },
  { label: "United Kingdom", pct: 22, color: T.accentLight },
  { label: "India", pct: 18, color: T.purple },
  { label: "Germany", pct: 12, color: "#93C5FD" },
  { label: "Others", pct: 10, color: "#CBD5E1" },
] as const

function Sparkline({ path, color }: { path: string; color: string }) {
  return (
    <svg viewBox="0 0 48 24" className="h-6 w-full" aria-hidden>
      <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DonutChart() {
  let cumulative = 0
  const segments = DONUT_SEGMENTS.map((seg) => {
    const start = cumulative
    cumulative += seg.pct
    return { ...seg, start, end: cumulative }
  })

  return (
    <svg viewBox="0 0 100 100" className="h-28 w-28 shrink-0" aria-hidden>
      {segments.map((seg) => {
        const startAngle = (seg.start / 100) * 360 - 90
        const endAngle = (seg.end / 100) * 360 - 90
        const startRad = (startAngle * Math.PI) / 180
        const endRad = (endAngle * Math.PI) / 180
        const largeArc = seg.pct > 50 ? 1 : 0
        const x1 = 50 + 38 * Math.cos(startRad)
        const y1 = 50 + 38 * Math.sin(startRad)
        const x2 = 50 + 38 * Math.cos(endRad)
        const y2 = 50 + 38 * Math.sin(endRad)
        return (
          <path
            key={seg.label}
            d={`M 50 50 L ${x1} ${y1} A 38 38 0 ${largeArc} 1 ${x2} ${y2} Z`}
            fill={seg.color}
          />
        )
      })}
      <circle cx="50" cy="50" r="24" fill="white" />
      <text x="50" y="48" textAnchor="middle" className="fill-slate-800 text-[9px] font-bold">
        2.84M
      </text>
      <text x="50" y="58" textAnchor="middle" className="fill-slate-400 text-[6px]">
        Total
      </text>
    </svg>
  )
}

export function CommandCenterMockup() {
  return (
    <div
      className="overflow-hidden rounded-2xl border bg-white ring-1 ring-slate-900/[0.04]"
      style={{ borderColor: T.border, boxShadow: T.mockupShadow }}
    >
      <div className="flex">
        {/* Sidebar */}
        <div
          className="flex w-11 shrink-0 flex-col items-center gap-3 border-r py-4"
          style={{ borderColor: T.border, background: T.cardBg }}
        >
          {SIDEBAR_ICONS.map((Icon, i) => (
            <div
              key={i}
              className="flex h-7 w-7 items-center justify-center rounded-md"
              style={{
                background: i === 0 ? T.accentMuted : "transparent",
                color: i === 0 ? T.accent : T.label,
              }}
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={2} />
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="min-w-0 flex-1 p-4 md:p-5">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-40"
                  style={{ background: T.green }}
                />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: T.green }} />
              </span>
              <span className="text-xs font-semibold" style={{ color: T.heading }}>
                Command Center
              </span>
              <span className="text-xs" style={{ color: T.label }}>
                • Live
              </span>
            </div>
            <div
              className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium"
              style={{ borderColor: T.border, color: T.body }}
            >
              <Calendar className="h-3 w-3" />
              Today, 24 May
            </div>
          </div>

          {/* KPI row */}
          <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
            {KPI_DATA.map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-lg border p-2.5"
                style={{ borderColor: T.border, background: T.white }}
              >
                <p className="text-[9px] font-medium" style={{ color: T.label }}>
                  {kpi.label}
                </p>
                <div className="mt-1 flex items-end justify-between gap-1">
                  <span className="text-sm font-bold" style={{ color: T.heading }}>
                    {kpi.value}
                  </span>
                  <span
                    className="text-[9px] font-semibold"
                    style={{ color: kpi.positive ? T.green : T.red }}
                  >
                    {kpi.change}
                  </span>
                </div>
                <div className="mt-1.5">
                  <Sparkline path={kpi.spark} color={kpi.sparkColor} />
                </div>
              </div>
            ))}
          </div>

          {/* Charts row */}
          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-5">
            {/* Bar chart */}
            <div
              className="rounded-lg border p-3 md:col-span-3"
              style={{ borderColor: T.border, background: T.white }}
            >
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold" style={{ color: T.heading }}>
                  Transaction Volume
                </p>
                <div className="flex items-center gap-2 text-[8px]" style={{ color: T.label }}>
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: T.accent }} />
                    Volume
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: T.red }} />
                    Failed
                  </span>
                </div>
              </div>
              <div className="mt-3 flex h-20 items-end gap-1">
                {BAR_HEIGHTS.map((h, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-0.5">
                    <div
                      className="w-full rounded-sm"
                      style={{ height: `${h}%`, background: i % 5 === 0 ? T.red : T.accent, opacity: i % 5 === 0 ? 0.7 : 1 }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Donut chart */}
            <div
              className="rounded-lg border p-3 md:col-span-2"
              style={{ borderColor: T.border, background: T.white }}
            >
              <p className="text-[10px] font-semibold" style={{ color: T.heading }}>
                Top Countries
              </p>
              <div className="mt-2 flex items-center gap-3">
                <DonutChart />
                <div className="min-w-0 flex-1 space-y-1">
                  {DONUT_SEGMENTS.map((seg) => (
                    <div key={seg.label} className="flex items-center justify-between gap-1 text-[8px]">
                      <span className="flex items-center gap-1 truncate" style={{ color: T.body }}>
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: seg.color }} />
                        {seg.label}
                      </span>
                      <span className="font-semibold" style={{ color: T.heading }}>
                        {seg.pct}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Status bar */}
          <div
            className="mt-3 grid grid-cols-2 gap-2 rounded-lg border p-2.5 md:grid-cols-4"
            style={{ borderColor: T.border, background: T.cardBg }}
          >
            {[
              { icon: Activity, label: "API Status", value: "Operational", color: T.green },
              { icon: Shield, label: "Server Health", value: "All systems normal", color: T.green },
              { icon: Shield, label: "Risk Alerts", value: "No issues detected", color: T.green },
              { icon: Globe, label: "Pending Settlements", value: "$320,450.00", color: T.accent },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="flex items-start gap-1.5">
                <Icon className="mt-0.5 h-3 w-3 shrink-0" style={{ color }} strokeWidth={2} />
                <div className="min-w-0">
                  <p className="text-[8px] font-medium" style={{ color: T.label }}>
                    {label}
                  </p>
                  <p className="truncate text-[9px] font-semibold" style={{ color: T.heading }}>
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
