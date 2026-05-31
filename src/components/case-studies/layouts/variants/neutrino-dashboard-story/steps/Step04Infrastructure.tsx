"use client"

import {
  BarChart3,
  Bot,
  CheckCircle2,
  LayoutDashboard,
  Server,
  Settings,
  Wrench,
  Zap,
} from "lucide-react"
import { CodeEditorPanel } from "../components/CodeEditorPanel"
import { StatCard } from "../components/StatCard"
import { DashboardMiniSidebar, DashboardShell, SplitPane, WidgetCard } from "../DashboardShell"
import { DASHBOARD_TOKENS } from "../tokens"

const INFRA_CODE = `# neutrino-infra.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: neutrino-prod

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: agent-orchestrator
spec:
  replicas: 12
  template:
    spec:
      containers:
        - name: orchestrator
          image: neutrino/agent-orchestrator:2.4.1
          resources:
            requests:
              cpu: "500m"
              memory: "1Gi"
            limits:
              cpu: "2"
              memory: "4Gi"`

const REGIONS = [
  { name: "us-east-1", nodes: 24, latency: "12ms" },
  { name: "eu-west-1", nodes: 18, latency: "18ms" },
  { name: "ap-southeast-1", nodes: 12, latency: "24ms" },
  { name: "us-west-2", nodes: 16, latency: "15ms" },
]

const PIPELINE = [
  { step: "Build", status: "done" as const },
  { step: "Test", status: "done" as const },
  { step: "Staging", status: "done" as const },
  { step: "Canary", status: "active" as const },
  { step: "Production", status: "pending" as const },
]

const MINI_NAV = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard className="h-4 w-4" /> },
  { id: "agents", label: "Agents", icon: <Bot className="h-4 w-4" /> },
  { id: "workflows", label: "Workflows", icon: <Zap className="h-4 w-4" /> },
  { id: "tools", label: "Tools", icon: <Wrench className="h-4 w-4" /> },
  { id: "analytics", label: "Analytics", icon: <BarChart3 className="h-4 w-4" /> },
  { id: "settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
]

export function Step04Infrastructure() {
  return (
    <DashboardShell
      tabs={[
        { id: "infra", label: "infra.yaml", active: true, type: "yaml" },
        { id: "docker", label: "docker-compose.yml", type: "yaml" },
      ]}
    >
      <SplitPane
        left={<CodeEditorPanel code={INFRA_CODE} filename="infra.yaml" />}
        right={
          <div className="flex h-full min-h-0 overflow-hidden">
            <DashboardMiniSidebar items={MINI_NAV} activeId="settings" />
            <div className="flex min-h-0 flex-1 flex-col overflow-auto p-3">
              <div
                className="flex items-center gap-2 rounded-2xl border px-3 py-2"
                style={{
                  borderColor: DASHBOARD_TOKENS.liveGreen + "40",
                  background: DASHBOARD_TOKENS.liveGreenMuted,
                }}
              >
                <CheckCircle2 className="h-4 w-4" style={{ color: DASHBOARD_TOKENS.liveGreen }} />
                <span className="text-[11px] font-bold" style={{ color: DASHBOARD_TOKENS.liveGreen }}>
                  All systems operational
                </span>
                <span className="ml-auto text-[9px]" style={{ color: DASHBOARD_TOKENS.textLight }}>
                  Last checked: 30s ago
                </span>
              </div>

              <div className="mt-2.5 grid grid-cols-2 gap-2 lg:grid-cols-4">
                <StatCard label="CPU Usage" value="34%" change="-12%" />
                <StatCard label="Memory" value="62%" change="+3%" changePositive={false} />
                <StatCard label="Latency P99" value="48ms" change="-22%" />
                <StatCard label="Uptime" value="99.99%" change="+0.01%" />
              </div>

              <div className="mt-2.5 grid flex-1 grid-cols-1 gap-2 lg:grid-cols-2">
                <WidgetCard title="Cluster Regions">
                  <ul className="mt-2 space-y-1.5">
                    {REGIONS.map((region) => (
                      <li
                        key={region.name}
                        className="flex items-center gap-2.5 rounded-xl border px-2.5 py-2"
                        style={{ borderColor: DASHBOARD_TOKENS.border }}
                      >
                        <Server className="h-3.5 w-3.5" style={{ color: DASHBOARD_TOKENS.textLight }} />
                        <div className="flex-1">
                          <p className="text-[11px] font-semibold" style={{ color: DASHBOARD_TOKENS.navy }}>
                            {region.name}
                          </p>
                          <p className="text-[9px]" style={{ color: DASHBOARD_TOKENS.textLight }}>
                            {region.nodes} nodes · {region.latency}
                          </p>
                        </div>
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ background: DASHBOARD_TOKENS.liveGreen }}
                        />
                      </li>
                    ))}
                  </ul>
                </WidgetCard>

                <WidgetCard title="Deployment Pipeline">
                  <ol className="mt-2 space-y-2">
                    {PIPELINE.map((stage, i) => (
                      <li key={stage.step} className="flex items-center gap-2.5">
                        <div
                          className="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold"
                          style={
                            stage.status === "done"
                              ? { background: DASHBOARD_TOKENS.liveGreen, color: "#fff" }
                              : stage.status === "active"
                                ? { background: DASHBOARD_TOKENS.primary, color: "#fff" }
                                : {
                                    border: `1.5px solid ${DASHBOARD_TOKENS.border}`,
                                    color: DASHBOARD_TOKENS.textLight,
                                  }
                          }
                        >
                          {i + 1}
                        </div>
                        <span className="text-[11px] font-medium" style={{ color: DASHBOARD_TOKENS.navy }}>
                          {stage.step}
                        </span>
                        {stage.status === "active" && (
                          <span
                            className="ml-auto animate-pulse text-[9px] font-bold uppercase"
                            style={{ color: DASHBOARD_TOKENS.primary }}
                          >
                            Deploying…
                          </span>
                        )}
                      </li>
                    ))}
                  </ol>
                </WidgetCard>
              </div>
            </div>
          </div>
        }
      />
    </DashboardShell>
  )
}
