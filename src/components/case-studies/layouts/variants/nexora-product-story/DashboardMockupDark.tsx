"use client"

import {
  BarChart3,
  Bell,
  LayoutDashboard,
  Search,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react"
import { NEXORA_TOKENS as T } from "./tokens"

const SIDEBAR = [
  { icon: LayoutDashboard, active: true },
  { icon: BarChart3, active: false },
  { icon: Users, active: false },
  { icon: Settings, active: false },
] as const

const KPIS = [
  { label: "Total Users", value: "24.8K", delta: "+12.4%" },
  { label: "Revenue", value: "$142K", delta: "+8.2%" },
  { label: "Sessions", value: "89.2K", delta: "+18.6%" },
] as const

/** Smooth line chart path for hero mockup */
function LineChart() {
  const points = "4,52 28,38 52,44 76,22 100,28 124,14 148,20 172,8 196,12 220,4"
  return (
    <svg viewBox="0 0 224 56" className="h-full w-full" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="nexoraLineFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={T.accent} stopOpacity="0.35" />
          <stop offset="100%" stopColor={T.accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        fill="url(#nexoraLineFill)"
        points={`0,56 ${points} 224,56`}
        stroke="none"
      />
      <polyline
        fill="none"
        stroke={T.accent}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
      {[4, 28, 52, 76, 100, 124, 148, 172, 196, 220].map((x, i) => {
        const ys = [52, 38, 44, 22, 28, 14, 20, 8, 12, 4]
        return (
          <circle
            key={i}
            cx={x}
            cy={ys[i]}
            r={i === 9 ? 4 : 2.5}
            fill={i === 9 ? T.accent : "#1e293b"}
            stroke={T.accent}
            strokeWidth={i === 9 ? 2 : 0}
          />
        )
      })}
    </svg>
  )
}

type Props = {
  className?: string
  compact?: boolean
  title?: string
}

export function DashboardMockupDark({
  className = "",
  compact = false,
  title = "Analytics Overview",
}: Props) {
  return (
    <div className={`relative ${className}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 rounded-2xl opacity-50 blur-3xl"
        style={{ background: `radial-gradient(circle, ${T.accent}44 0%, transparent 70%)` }}
      />
      <div
        className="relative overflow-hidden rounded-xl ring-1 ring-white/10"
        style={{ background: "#111827", boxShadow: T.mockupShadow }}
      >
        <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#0a0f1a] px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
          <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
          <span className="h-2 w-2 rounded-full bg-[#28C840]" />
          <div className="ml-2 flex flex-1 items-center gap-2 rounded-md bg-white/[0.06] px-3 py-1.5 max-w-[200px]">
            <Search className="h-3 w-3 text-white/30" />
            <span className="text-[10px] text-white/25">Search...</span>
          </div>
          <Bell className="ml-auto h-3.5 w-3.5 text-white/30" aria-hidden />
        </div>

        <div className={`flex ${compact ? "min-h-[200px]" : "min-h-[280px] sm:min-h-[340px]"}`}>
          <aside className="hidden w-12 shrink-0 flex-col items-center gap-2.5 border-r border-white/[0.06] bg-[#0c1220] py-4 sm:flex">
            <div
              className="mb-1 flex h-7 w-7 items-center justify-center rounded-lg text-[10px] font-bold text-white"
              style={{ background: T.accent }}
            >
              N
            </div>
            {SIDEBAR.map(({ icon: Icon, active }, i) => (
              <div
                key={i}
                className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                  active ? "text-white" : "text-white/35"
                }`}
                style={active ? { background: `${T.accent}33` } : undefined}
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={active ? 2.25 : 1.75} />
              </div>
            ))}
          </aside>

          <div className="min-w-0 flex-1 p-3 sm:p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/40">
                  Dashboard
                </p>
                <h3 className="mt-0.5 text-sm font-semibold text-white">{title}</h3>
              </div>
              <span
                className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-medium text-emerald-300"
                style={{ background: "rgba(16,185,129,0.12)" }}
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Live
              </span>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              {KPIS.map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-2 sm:p-2.5"
                >
                  <p className="truncate text-[8px] text-white/45 sm:text-[9px]">{item.label}</p>
                  <p className="mt-0.5 text-xs font-bold text-white sm:text-sm">{item.value}</p>
                  <p className="mt-0.5 flex items-center gap-0.5 text-[8px] font-medium sm:text-[9px]" style={{ color: T.accent }}>
                    <TrendingUp className="h-2.5 w-2.5" />
                    {item.delta}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5 sm:p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[9px] font-medium text-white/50">Sessions Over Time</p>
                <div className="flex gap-2 text-[8px] text-white/35">
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: T.accent }} />
                    Sessions
                  </span>
                </div>
              </div>
              <div className={compact ? "h-14" : "h-20 sm:h-24"}>
                <LineChart />
              </div>
            </div>

            {!compact ? (
              <div className="mt-2.5 space-y-1">
                {["North America · +24%", "EMEA · +18%", "APAC · +31%"].map((row, i) => (
                  <div
                    key={row}
                    className="flex items-center justify-between rounded-md bg-white/[0.02] px-2 py-1"
                  >
                    <span className="truncate text-[9px] text-white/55">{row}</span>
                    <span className="text-[8px] font-semibold" style={{ color: i === 2 ? T.accent : "#34D399" }}>
                      Active
                    </span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
