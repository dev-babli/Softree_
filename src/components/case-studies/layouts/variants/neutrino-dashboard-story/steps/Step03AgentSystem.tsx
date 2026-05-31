"use client"

import {
  BarChart3,
  Bot,
  LayoutDashboard,
  Settings,
  Wrench,
  Zap,
} from "lucide-react"
import { AgentFlowDiagram } from "../components/AgentFlowDiagram"
import { ARCHITECTURE_CODE, CodeEditorPanel } from "../components/CodeEditorPanel"
import { LiveFeed } from "../components/LiveFeed"
import { StatCard } from "../components/StatCard"
import { VectorSearchViz } from "../components/VectorSearchViz"
import { WorkflowStepper } from "../components/WorkflowStepper"
import { DashboardMiniSidebar, DashboardShell, SplitPane } from "../DashboardShell"
import { DASHBOARD_TOKENS } from "../tokens"

const MINI_NAV = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard className="h-4 w-4" /> },
  { id: "agents", label: "Agents", icon: <Bot className="h-4 w-4" /> },
  { id: "workflows", label: "Workflows", icon: <Zap className="h-4 w-4" /> },
  { id: "tools", label: "Tools", icon: <Wrench className="h-4 w-4" /> },
  { id: "analytics", label: "Analytics", icon: <BarChart3 className="h-4 w-4" /> },
  { id: "settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
]

export function Step03AgentSystem() {
  return (
    <DashboardShell
      tabs={[
        { id: "arch", label: "architecture.ts", active: true, type: "ts" },
        { id: "agent", label: "agent.py", type: "py" },
        { id: "workflow", label: "workflow.yaml", type: "yaml" },
        { id: "query", label: "query.sql", type: "sql" },
      ]}
    >
      <SplitPane
        left={<CodeEditorPanel code={ARCHITECTURE_CODE} filename="architecture.ts" />}
        right={
          <div className="flex h-full min-h-0 flex-col overflow-hidden">
            <div className="flex min-h-0 flex-1 overflow-hidden">
              <DashboardMiniSidebar items={MINI_NAV} activeId="overview" />
              <div className="flex min-h-0 flex-1 flex-col overflow-hidden p-3">
                <div className="grid shrink-0 grid-cols-2 gap-2 lg:grid-cols-4">
                  <StatCard label="Total Requests" value="1.42B" change="+12.4%" />
                  <StatCard label="Active Agents" value="847" change="+8.7%" />
                  <StatCard label="Avg Response" value="220ms" change="-18.6%" changePositive={false} sparkColor={DASHBOARD_TOKENS.liveGreen} />
                  <StatCard label="Success Rate" value="99.97%" change="+0.3%" />
                </div>

                <div
                  className="mt-2.5 flex min-h-[180px] flex-1 flex-col rounded-2xl border p-3"
                  style={{
                    borderColor: DASHBOARD_TOKENS.border,
                    background: DASHBOARD_TOKENS.surfaceMuted,
                  }}
                >
                  <p
                    className="mb-2 shrink-0 text-[9px] font-bold uppercase tracking-[0.14em]"
                    style={{ color: DASHBOARD_TOKENS.textLight }}
                  >
                    AI Agent Network
                  </p>
                  <div className="min-h-0 flex-1">
                    <AgentFlowDiagram />
                  </div>
                </div>

                <div className="mt-2.5 grid shrink-0 grid-cols-1 gap-2 lg:grid-cols-3">
                  <LiveFeed />
                  <VectorSearchViz />
                  <WorkflowStepper />
                </div>
              </div>
            </div>
          </div>
        }
      />
    </DashboardShell>
  )
}
