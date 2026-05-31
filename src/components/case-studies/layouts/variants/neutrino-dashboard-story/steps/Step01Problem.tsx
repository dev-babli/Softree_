"use client"

import {
  BarChart3,
  Bot,
  Clock,
  LayoutDashboard,
  Settings,
  Wrench,
  XCircle,
  Zap,
} from "lucide-react"
import { CodeEditorPanel } from "../components/CodeEditorPanel"
import { StatCard } from "../components/StatCard"
import { DashboardMiniSidebar, DashboardShell, SplitPane, WidgetCard } from "../DashboardShell"
import { DASHBOARD_TOKENS } from "../tokens"

const PROBLEM_CODE = `# Enterprise Automation Audit — Q3 2024

## Critical Findings

- 847 manual workflows across 12 departments
- Average ticket resolution: **4.2 days** (SLA: 24h)
- Error rate in reconciliation: **12.8%**
- Data silos: 23 disconnected systems

## Bottleneck Analysis

1. Invoice matching — 2,400 hrs/month manual
2. Approval chains — 6+ email handoffs per request
3. Report generation — 72h lag on consolidated KPIs
4. Agent deployment — 0 autonomous workflows

> "We had automation tools, but no operating system
> to orchestrate them at enterprise scale."
> — VP Operations, Neutrino AI`

const ERROR_LOGS = [
  { level: "ERROR", msg: "Workflow timeout: invoice-match-batch-4821", time: "14:32:01" },
  { level: "WARN", msg: "Manual override required — approval chain stalled", time: "14:28:44" },
  { level: "ERROR", msg: "CRM sync failed — duplicate record detected", time: "14:15:22" },
  { level: "WARN", msg: "Report SLA breach — consolidated KPIs delayed 68h", time: "13:58:09" },
]

const MINI_NAV = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard className="h-4 w-4" /> },
  { id: "agents", label: "Agents", icon: <Bot className="h-4 w-4" /> },
  { id: "workflows", label: "Workflows", icon: <Zap className="h-4 w-4" /> },
  { id: "tools", label: "Tools", icon: <Wrench className="h-4 w-4" /> },
  { id: "analytics", label: "Analytics", icon: <BarChart3 className="h-4 w-4" /> },
  { id: "settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
]

export function Step01Problem() {
  return (
    <DashboardShell
      tabs={[
        { id: "problem", label: "problem.md", active: true, type: "md" },
        { id: "analysis", label: "analysis.ts", type: "ts" },
      ]}
      showLive={false}
    >
      <SplitPane
        left={<CodeEditorPanel code={PROBLEM_CODE} filename="problem.md" />}
        right={
          <div className="flex h-full min-h-0 overflow-hidden">
            <DashboardMiniSidebar items={MINI_NAV} activeId="overview" />
            <div className="flex min-h-0 flex-1 flex-col overflow-auto p-3">
              <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
                <StatCard label="Avg Resolution" value="4.2 days" change="+340%" changePositive={false} />
                <StatCard label="Error Rate" value="12.8%" change="+8.2%" changePositive={false} />
                <StatCard label="Manual Hours" value="2.4K/mo" change="+15%" changePositive={false} />
                <StatCard label="System Uptime" value="94.2%" change="-2.1%" changePositive={false} />
              </div>

              <div className="mt-2.5 grid flex-1 grid-cols-1 gap-2 lg:grid-cols-2">
                <WidgetCard title="Error Logs">
                  <ul className="mt-2 space-y-1.5 font-mono text-[9px]">
                    {ERROR_LOGS.map((log) => (
                      <li
                        key={log.time}
                        className="flex items-start gap-2 rounded-lg px-2 py-1.5"
                        style={{ background: DASHBOARD_TOKENS.warningRedMuted }}
                      >
                        <XCircle className="mt-0.5 h-3 w-3 shrink-0" style={{ color: DASHBOARD_TOKENS.warningRed }} />
                        <span className="font-bold" style={{ color: DASHBOARD_TOKENS.warningRed }}>
                          {log.level}
                        </span>
                        <span className="min-w-0 flex-1 truncate" style={{ color: DASHBOARD_TOKENS.textMuted }}>
                          {log.msg}
                        </span>
                        <span style={{ color: DASHBOARD_TOKENS.textLight }}>{log.time}</span>
                      </li>
                    ))}
                  </ul>
                </WidgetCard>

                <WidgetCard title="Manual Workflow Bottlenecks">
                  <div className="relative mt-3 flex h-36 items-center justify-center">
                    <svg width="200" height="120" viewBox="0 0 200 120" aria-hidden>
                      {[
                        [40, 55], [80, 28], [120, 62], [160, 35], [100, 90],
                      ].map(([x, y], i, arr) => (
                        <g key={i}>
                          {i < arr.length - 1 && (
                            <line
                              x1={x + 14}
                              y1={y}
                              x2={arr[i + 1][0] - 14}
                              y2={arr[i + 1][1]}
                              stroke={DASHBOARD_TOKENS.warningRed}
                              strokeWidth="1"
                              strokeDasharray="4 3"
                              opacity="0.45"
                            />
                          )}
                          <rect
                            x={x - 14}
                            y={y - 14}
                            width="28"
                            height="28"
                            rx="3"
                            fill={DASHBOARD_TOKENS.warningRed}
                            opacity={0.35 + i * 0.12}
                          />
                          <path
                            d={`M${x} ${y - 4} L${x + 4} ${y + 3} H${x - 4} Z`}
                            fill="#fff"
                            opacity="0.85"
                          />
                        </g>
                      ))}
                    </svg>
                  </div>
                  <div
                    className="mt-2 flex items-center gap-1.5 text-[9px]"
                    style={{ color: DASHBOARD_TOKENS.textMuted }}
                  >
                    <Clock className="h-3 w-3" />
                    Each handoff adds 6–18 hours of delay
                  </div>
                </WidgetCard>
              </div>
            </div>
          </div>
        }
      />
    </DashboardShell>
  )
}
