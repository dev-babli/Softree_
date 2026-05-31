"use client"

import {
  BarChart3,
  Bot,
  LayoutDashboard,
  Settings,
  Wrench,
  Zap,
} from "lucide-react"
import type { Highlight, Testimonial } from "../../../types"
import { CodeEditorPanel } from "../components/CodeEditorPanel"
import { StatCard } from "../components/StatCard"
import { DashboardMiniSidebar, DashboardShell, SplitPane, WidgetCard } from "../DashboardShell"
import { DASHBOARD_TOKENS } from "../tokens"

type Props = {
  metrics?: Highlight[]
  testimonial?: Testimonial
}

const DEFAULT_METRICS: Highlight[] = [
  { value: "65%", label: "Reduction in manual work" },
  { value: "3.8x", label: "Faster workflow throughput" },
  { value: "$6.2M", label: "Annualized savings" },
  { value: "99.9%", label: "Platform uptime" },
]

const METRICS_JSON = `{
  "period": "Q4 2024 — Q1 2025",
  "metrics": {
    "manualWorkReduction": "65%",
    "throughputMultiplier": "3.8x",
    "annualizedSavings": "$6.2M",
    "platformUptime": "99.9%",
    "activeAgents": 847,
    "totalRequests": "1.42B"
  },
  "departments": ["Finance", "Operations", "Sales", "Support"],
  "status": "production"
}`

const MINI_NAV = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard className="h-4 w-4" /> },
  { id: "agents", label: "Agents", icon: <Bot className="h-4 w-4" /> },
  { id: "workflows", label: "Workflows", icon: <Zap className="h-4 w-4" /> },
  { id: "tools", label: "Tools", icon: <Wrench className="h-4 w-4" /> },
  { id: "analytics", label: "Analytics", icon: <BarChart3 className="h-4 w-4" /> },
  { id: "settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
]

export function Step05Impact({ metrics = DEFAULT_METRICS, testimonial }: Props) {
  const barData = [
    { label: "Manual Tasks", after: 35 },
    { label: "Resolution Time", after: 26 },
    { label: "Error Rate", after: 18 },
    { label: "Cost per Workflow", after: 42 },
  ]

  return (
    <DashboardShell
      tabs={[
        { id: "metrics", label: "metrics.json", active: true, type: "json" },
        { id: "report", label: "report.pdf", type: "md" },
      ]}
    >
      <SplitPane
        leftWidth="36%"
        left={<CodeEditorPanel code={METRICS_JSON} filename="metrics.json" />}
        right={
          <div className="flex h-full min-h-0 overflow-hidden">
            <DashboardMiniSidebar items={MINI_NAV} activeId="analytics" />
            <div className="flex min-h-0 flex-1 flex-col overflow-auto p-3">
              <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
                {metrics.slice(0, 4).map((m, i) => (
                  <StatCard
                    key={m.label}
                    label={m.label}
                    value={m.value}
                    change={["+65%", "+280%", "+$6.2M", "+0.9%"][i] || "+12%"}
                  />
                ))}
              </div>

              <div className="mt-2.5 grid flex-1 grid-cols-1 gap-2 lg:grid-cols-2">
                <WidgetCard title="Production Impact">
                  <div className="mt-3 space-y-3">
                    {barData.map((item) => (
                      <div key={item.label}>
                        <div className="mb-1 flex justify-between text-[10px]">
                          <span style={{ color: DASHBOARD_TOKENS.navy }}>{item.label}</span>
                          <span className="font-bold" style={{ color: DASHBOARD_TOKENS.liveGreen }}>
                            -{100 - item.after}%
                          </span>
                        </div>
                        <div className="relative h-2.5 overflow-hidden rounded-full" style={{ background: "#E8ECF4" }}>
                          <div
                            className="absolute inset-y-0 left-0 rounded-full"
                            style={{
                              width: `${item.after}%`,
                              background: `linear-gradient(90deg, ${DASHBOARD_TOKENS.primary}, ${DASHBOARD_TOKENS.primaryLight})`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </WidgetCard>

                <div className="flex flex-col gap-2">
                  {testimonial?.quote && (
                    <div
                      className="rounded-2xl border p-4"
                      style={{
                        borderColor: DASHBOARD_TOKENS.primaryBorder,
                        background: DASHBOARD_TOKENS.primaryMuted,
                      }}
                    >
                      <p className="text-[13px] italic leading-relaxed" style={{ color: DASHBOARD_TOKENS.navy }}>
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                      <p className="mt-2.5 text-[11px] font-bold" style={{ color: DASHBOARD_TOKENS.navy }}>
                        {testimonial.name}
                        {testimonial.role ? ` — ${testimonial.role}` : ""}
                      </p>
                    </div>
                  )}

                  <WidgetCard title="Executive Summary">
                    <p className="mt-2 text-[11px] leading-relaxed" style={{ color: DASHBOARD_TOKENS.textMuted }}>
                      Neutrino AI deployed a governed agent operating system across four departments,
                      replacing 847 manual workflows with autonomous agents. The platform now processes
                      1.42B requests with 99.97% success rate, delivering $6.2M in annualized efficiency
                      gains while maintaining full audit compliance.
                    </p>
                  </WidgetCard>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </DashboardShell>
  )
}
