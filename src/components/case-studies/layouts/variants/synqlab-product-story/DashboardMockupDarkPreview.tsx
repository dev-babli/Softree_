"use client"

import { Bell, MessageSquare, Search, Settings, Ticket } from "lucide-react"
import { SYNQLAB_TOKENS as T } from "./tokens"

const SIDEBAR = [
  { icon: Ticket, active: true },
  { icon: MessageSquare, active: false },
  { icon: Settings, active: false },
] as const

const TICKETS = [
  { id: "#2847", subject: "Login issue — enterprise SSO", status: "Open", priority: "High" },
  { id: "#2846", subject: "API rate limit exceeded", status: "In Progress", priority: "Medium" },
  { id: "#2845", subject: "Dashboard export failing", status: "Resolved", priority: "Low" },
] as const

type Props = {
  className?: string
}

export function DashboardMockupDarkPreview({ className = "" }: Props) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="overflow-hidden rounded-xl ring-1 ring-white/10"
        style={{ background: "#111827", boxShadow: T.mockupShadow }}
      >
        <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#0a0f1a] px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
          <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
          <span className="h-2 w-2 rounded-full bg-[#28C840]" />
          <div className="ml-2 flex flex-1 max-w-[160px] items-center gap-2 rounded-md bg-white/[0.06] px-2.5 py-1">
            <Search className="h-3 w-3 text-white/30" />
            <span className="text-[9px] text-white/25">Search tickets...</span>
          </div>
          <Bell className="ml-auto h-3.5 w-3.5 text-white/30" aria-hidden />
        </div>

        <div className="flex min-h-[200px]">
          <aside className="hidden w-10 shrink-0 flex-col items-center gap-2 border-r border-white/[0.06] bg-[#0c1220] py-3 sm:flex">
            {SIDEBAR.map(({ icon: Icon, active }, i) => (
              <div
                key={i}
                className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                  active ? "text-white" : "text-white/35"
                }`}
                style={active ? { background: `${T.accent}44` } : undefined}
              >
                <Icon className="h-3 w-3" strokeWidth={active ? 2.25 : 1.75} />
              </div>
            ))}
          </aside>

          <div className="min-w-0 flex-1 p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[8px] font-semibold uppercase tracking-wider text-white/40">
                  Support
                </p>
                <h3 className="text-xs font-semibold text-white">Tickets</h3>
              </div>
              <span
                className="rounded-full px-2 py-0.5 text-[8px] font-medium text-white/80"
                style={{ background: `${T.accent}55` }}
              >
                24 open
              </span>
            </div>

            <div className="mt-3 space-y-1.5">
              {TICKETS.map((ticket) => (
                <div
                  key={ticket.id}
                  className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[8px] font-mono text-white/40">{ticket.id}</span>
                    <span
                      className="rounded px-1.5 py-0.5 text-[7px] font-medium"
                      style={{
                        background:
                          ticket.status === "Open"
                            ? "rgba(239,68,68,0.15)"
                            : ticket.status === "In Progress"
                              ? "rgba(99,102,241,0.2)"
                              : "rgba(16,185,129,0.15)",
                        color:
                          ticket.status === "Open"
                            ? "#FCA5A5"
                            : ticket.status === "In Progress"
                              ? "#A5B4FC"
                              : "#6EE7B7",
                      }}
                    >
                      {ticket.status}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-[9px] text-white/70">{ticket.subject}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
