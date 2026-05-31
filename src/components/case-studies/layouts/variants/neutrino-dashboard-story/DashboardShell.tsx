"use client"

import {
  FileCode2,
  FileJson2,
  FileText,
  Maximize2,
  Moon,
  Settings,
  Share2,
} from "lucide-react"
import type { ReactNode } from "react"
import { DASHBOARD_TOKENS } from "./tokens"

type Tab = {
  id: string
  label: string
  active?: boolean
  type?: "ts" | "py" | "yaml" | "sql" | "md" | "json"
}

type Props = {
  tabs: Tab[]
  children: ReactNode
  showLive?: boolean
}

function TabIcon({ type }: { type?: Tab["type"] }) {
  const cls = "h-3.5 w-3.5 shrink-0"
  switch (type) {
    case "py":
      return <FileCode2 className={cls} style={{ color: "#3776AB" }} />
    case "yaml":
      return <FileText className={cls} style={{ color: "#CB171E" }} />
    case "sql":
      return <FileCode2 className={cls} style={{ color: "#336791" }} />
    case "json":
      return <FileJson2 className={cls} style={{ color: DASHBOARD_TOKENS.orange }} />
    case "md":
      return <FileText className={cls} style={{ color: DASHBOARD_TOKENS.textMuted }} />
    default:
      return <FileCode2 className={cls} style={{ color: DASHBOARD_TOKENS.primary }} />
  }
}

export function DashboardShell({ tabs, children, showLive = true }: Props) {
  return (
    <div
      className="flex min-h-0 flex-1 flex-col overflow-hidden bg-white"
      style={{
        borderRadius: DASHBOARD_TOKENS.radius,
        boxShadow: DASHBOARD_TOKENS.dashboardShadow,
        border: `1px solid ${DASHBOARD_TOKENS.border}`,
      }}
    >
      <div
        className="flex shrink-0 items-center justify-between border-b px-3 py-2.5"
        style={{ borderColor: DASHBOARD_TOKENS.border, background: DASHBOARD_TOKENS.surfaceMuted }}
      >
        <div className="mr-3 hidden shrink-0 items-center gap-1.5 sm:flex" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className="flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition-colors"
              style={
                tab.active
                  ? {
                      background: DASHBOARD_TOKENS.white,
                      color: DASHBOARD_TOKENS.navy,
                      boxShadow: DASHBOARD_TOKENS.widgetShadow,
                    }
                  : { color: DASHBOARD_TOKENS.textLight }
              }
            >
              <TabIcon type={tab.type} />
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-2 pl-3">
          {showLive && (
            <div className="hidden items-center gap-2.5 sm:flex">
              <span
                className="rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white"
                style={{ background: DASHBOARD_TOKENS.primary }}
              >
                Live System
              </span>
              <span className="flex items-center gap-1.5 text-[10px]" style={{ color: DASHBOARD_TOKENS.textMuted }}>
                <span className="relative flex h-2 w-2">
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                    style={{ background: DASHBOARD_TOKENS.liveGreen }}
                  />
                  <span
                    className="relative inline-flex h-2 w-2 rounded-full"
                    style={{ background: DASHBOARD_TOKENS.liveGreen }}
                  />
                </span>
                All Systems Operational
              </span>
            </div>
          )}
          {[Share2, Moon, Settings, Maximize2].map((Icon, i) => (
            <button
              key={i}
              type="button"
              className="flex h-7 w-7 items-center justify-center rounded-lg transition-colors hover:bg-white"
              style={{ color: DASHBOARD_TOKENS.textLight }}
              aria-label={["Share", "Theme", "Settings", "Fullscreen"][i]}
            >
              <Icon className="h-3.5 w-3.5" />
            </button>
          ))}
        </div>
      </div>
      <div className="flex min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  )
}

export function SplitPane({
  left,
  right,
  leftWidth = "38%",
}: {
  left: ReactNode
  right: ReactNode
  leftWidth?: string
}) {
  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      <div
        className="min-h-0 shrink-0 overflow-hidden border-r"
        style={{ width: leftWidth, borderColor: DASHBOARD_TOKENS.border }}
      >
        {left}
      </div>
      <div className="min-h-0 min-w-0 flex-1 overflow-hidden">{right}</div>
    </div>
  )
}

export function DashboardMiniSidebar({
  items,
  activeId,
}: {
  items: { id: string; label: string; icon: ReactNode }[]
  activeId: string
}) {
  return (
    <div
      className="flex shrink-0 flex-col items-center gap-1 border-r py-3"
      style={{
        width: DASHBOARD_TOKENS.miniSidebarWidth,
        borderColor: DASHBOARD_TOKENS.border,
        background: DASHBOARD_TOKENS.surfaceMuted,
      }}
    >
      {items.map((item) => {
        const isActive = activeId === item.id
        return (
          <button
            key={item.id}
            type="button"
            title={item.label}
            className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors"
            style={
              isActive
                ? {
                    background: DASHBOARD_TOKENS.primaryMuted,
                    color: DASHBOARD_TOKENS.primary,
                    boxShadow: `inset 0 0 0 1px ${DASHBOARD_TOKENS.primaryBorder}`,
                  }
                : { color: DASHBOARD_TOKENS.textLight }
            }
            aria-label={item.label}
          >
            {item.icon}
          </button>
        )
      })}
    </div>
  )
}

export function WidgetCard({
  title,
  children,
  className = "",
}: {
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-2xl border bg-white p-3 ${className}`}
      style={{
        borderColor: DASHBOARD_TOKENS.border,
        boxShadow: DASHBOARD_TOKENS.widgetShadow,
      }}
    >
      <p
        className="text-[9px] font-bold uppercase tracking-[0.14em]"
        style={{ color: DASHBOARD_TOKENS.textLight }}
      >
        {title}
      </p>
      {children}
    </div>
  )
}
