"use client"

import { BarChart3, Bell, LayoutDashboard, Search, Settings, Users } from "lucide-react"
import { NEXORA_TOKENS as T } from "./tokens"

const SIDEBAR = [
  { icon: LayoutDashboard, active: true },
  { icon: BarChart3, active: false },
  { icon: Users, active: false },
  { icon: Settings, active: false },
] as const

const BARS = [38, 52, 44, 68, 58, 76, 64, 82, 70, 88] as const

function DesktopLightPanel() {
  return (
    <div
      className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg"
      style={{ boxShadow: T.cardShadow }}
    >
      <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
        <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
        <span className="h-2 w-2 rounded-full bg-[#28C840]" />
        <div className="ml-2 flex flex-1 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1 max-w-[180px]">
          <Search className="h-3 w-3 text-slate-400" />
          <span className="text-[10px] text-slate-400">Search metrics...</span>
        </div>
        <Bell className="ml-auto h-3.5 w-3.5 text-slate-400" aria-hidden />
      </div>

      <div className="flex min-h-[260px]">
        <aside className="hidden w-11 shrink-0 flex-col items-center gap-2 border-r border-slate-100 bg-slate-50 py-3 sm:flex">
          <div
            className="mb-1 flex h-6 w-6 items-center justify-center rounded-md text-[9px] font-bold text-white"
            style={{ background: T.accent }}
          >
            N
          </div>
          {SIDEBAR.map(({ icon: Icon, active }, i) => (
            <div
              key={i}
              className={`flex h-7 w-7 items-center justify-center rounded-md ${
                active ? "text-white" : "text-slate-400"
              }`}
              style={active ? { background: T.accent } : undefined}
            >
              <Icon className="h-3 w-3" strokeWidth={active ? 2.25 : 1.75} />
            </div>
          ))}
        </aside>

        <div className="min-w-0 flex-1 p-3 sm:p-4">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">Overview</p>
          <h3 className="mt-0.5 text-sm font-bold text-slate-900">Performance Dashboard</h3>

          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              { label: "Revenue", value: "$84.2K" },
              { label: "Users", value: "12.4K" },
              { label: "Growth", value: "+28%" },
            ].map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-lg border border-slate-100 p-2"
                style={{ background: T.accentMuted }}
              >
                <p className="text-[8px] text-slate-500">{kpi.label}</p>
                <p className="mt-0.5 text-xs font-bold text-slate-900">{kpi.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-lg border border-slate-100 bg-slate-50/80 p-3">
            <p className="mb-2 text-[9px] font-medium text-slate-500">Weekly activity</p>
            <div className="flex h-16 items-end gap-1">
              {BARS.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${h}%`,
                    background: i === BARS.length - 1 ? T.accent : `${T.accent}66`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MobileLightPanel() {
  return (
    <div className="w-[120px] overflow-hidden rounded-[1.25rem] border-[3px] border-slate-800 bg-slate-900 shadow-2xl sm:w-[130px]">
      <div className="mx-auto mt-1.5 h-1 w-10 rounded-full bg-slate-700" />
      <div className="bg-white p-2.5 pt-3">
        <p className="text-[8px] font-bold text-slate-900">Today</p>
        <div className="mt-2 rounded-md p-2" style={{ background: T.accentMuted }}>
          <p className="text-[7px] text-slate-500">Sessions</p>
          <p className="text-sm font-bold text-slate-900">2.4K</p>
          <p className="text-[7px] font-medium" style={{ color: T.accent }}>
            +18%
          </p>
        </div>
        <div className="mt-2 flex h-10 items-end gap-0.5">
          {[40, 65, 50, 80, 70].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{ height: `${h}%`, background: i === 4 ? T.accent : `${T.accent}55` }}
            />
          ))}
        </div>
        <div className="mt-2 space-y-1">
          {["Reports", "Alerts"].map((row) => (
            <div key={row} className="flex items-center justify-between rounded bg-slate-50 px-1.5 py-1">
              <span className="text-[7px] text-slate-600">{row}</span>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: T.accent }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

type Props = {
  className?: string
}

export function DashboardMockupLight({ className = "" }: Props) {
  return (
    <div className={`relative ${className}`}>
      <DesktopLightPanel />
      <div className="absolute -bottom-4 -right-2 z-10 sm:-right-4 sm:-bottom-6">
        <MobileLightPanel />
      </div>
    </div>
  )
}
