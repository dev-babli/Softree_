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
import { SYNQLAB_TOKENS as T } from "./tokens"

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

const CHANNELS = [
  { name: "Organic Search", pct: 42, color: T.accent },
  { name: "Direct", pct: 28, color: "#818CF8" },
  { name: "Referral", pct: 18, color: "#A5B4FC" },
  { name: "Social", pct: 12, color: "#C7D2FE" },
] as const

function LineChart() {
  const points = "4,52 28,38 52,44 76,22 100,28 124,14 148,20 172,8 196,12 220,4"
  return (
    <svg viewBox="0 0 224 56" className="h-full w-full" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="synqlabLineFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={T.accent} stopOpacity="0.25" />
          <stop offset="100%" stopColor={T.accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline fill="url(#synqlabLineFill)" points={`0,56 ${points} 224,56`} stroke="none" />
      <polyline
        fill="none"
        stroke={T.accent}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  )
}

type Props = {
  className?: string
  brandName?: string
}

export function DashboardMockupHero({ className = "", brandName = "DataCore" }: Props) {
  return (
    <div className={`relative ${className}`}>
      <div
        className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white"
        style={{ boxShadow: T.mockupShadow }}
      >
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/90 px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
          <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
          <span className="h-2 w-2 rounded-full bg-[#28C840]" />
          <div className="ml-2 flex flex-1 max-w-[220px] items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5">
            <Search className="h-3 w-3 text-slate-400" />
            <span className="text-[10px] text-slate-400">Search analytics...</span>
          </div>
          <Bell className="ml-auto h-3.5 w-3.5 text-slate-400" aria-hidden />
        </div>

        <div className="flex min-h-[300px] sm:min-h-[360px]">
          <aside className="hidden w-14 shrink-0 flex-col items-center gap-2.5 border-r border-slate-100 bg-slate-50/60 py-4 sm:flex">
            <div
              className="mb-1 flex h-8 w-8 items-center justify-center rounded-lg text-[10px] font-bold text-white"
              style={{ background: T.accent }}
            >
              {brandName.charAt(0)}
            </div>
            {SIDEBAR.map(({ icon: Icon, active }, i) => (
              <div
                key={i}
                className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                  active ? "text-white" : "text-slate-400"
                }`}
                style={active ? { background: T.accent } : undefined}
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={active ? 2.25 : 1.75} />
              </div>
            ))}
          </aside>

          <div className="min-w-0 flex-1 p-3 sm:p-5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Dashboard
                </p>
                <h3 className="mt-0.5 text-sm font-bold text-slate-900 sm:text-base">
                  Analytics Overview
                </h3>
              </div>
              <span
                className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-medium"
                style={{ background: T.accentMuted, color: T.accent }}
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                Live
              </span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
              {KPIS.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-slate-100 p-2.5 sm:p-3"
                  style={{ background: T.accentMuted }}
                >
                  <p className="truncate text-[8px] text-slate-500 sm:text-[9px]">{item.label}</p>
                  <p className="mt-0.5 text-xs font-bold text-slate-900 sm:text-sm">{item.value}</p>
                  <p
                    className="mt-0.5 flex items-center gap-0.5 text-[8px] font-semibold sm:text-[9px]"
                    style={{ color: T.accent }}
                  >
                    <TrendingUp className="h-2.5 w-2.5" />
                    {item.delta}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3 sm:p-4">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[9px] font-semibold text-slate-600 sm:text-[10px]">
                  Sessions Over Time
                </p>
                <div className="flex gap-2 text-[8px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: T.accent }} />
                    Sessions
                  </span>
                </div>
              </div>
              <div className="h-20 sm:h-24">
                <LineChart />
              </div>
            </div>

            <div className="mt-3">
              <p className="mb-2 text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                Top Channels
              </p>
              <div className="space-y-1.5">
                {CHANNELS.map((ch) => (
                  <div key={ch.name} className="flex items-center gap-2">
                    <span className="w-20 shrink-0 truncate text-[9px] text-slate-600">{ch.name}</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${ch.pct}%`, background: ch.color }}
                      />
                    </div>
                    <span className="w-7 text-right text-[8px] font-semibold text-slate-500">
                      {ch.pct}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
