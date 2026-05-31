"use client"

import {
  BarChart3,
  Bot,
  LayoutDashboard,
  Settings,
  Wrench,
  Zap,
} from "lucide-react"
import { CodeEditorPanel } from "../components/CodeEditorPanel"
import { DashboardMiniSidebar, DashboardShell, SplitPane, WidgetCard } from "../DashboardShell"
import { DASHBOARD_TOKENS } from "../tokens"

const ARCH_TYPES_CODE = `// Platform Architecture Types
interface PlatformArchitecture {
  gateway: APIGateway
  services: Microservice[]
  dataLayer: DataLayer
  agents: AgentRegistry
}

interface APIGateway {
  protocol: "rest" | "graphql" | "websocket"
  rateLimit: number
  auth: OAuth2Config
}

interface Microservice {
  name: string
  replicas: number
  healthCheck: string
}

interface DataLayer {
  primary: "postgresql"
  cache: "redis"
  vector: "pinecone"
  events: "kafka"
}

interface AgentRegistry {
  router: "ai-router-v2"
  agents: AgentDefinition[]
  maxConcurrent: number
}`

const LAYERS = [
  {
    name: "API Gateway",
    items: ["REST / GraphQL / WebSocket", "OAuth2 + Rate Limiting", "Request Routing"],
    color: DASHBOARD_TOKENS.architectureBlue,
  },
  {
    name: "Microservices",
    items: ["Agent Orchestrator", "Workflow Engine", "Vector Search", "Audit Service"],
    color: "#6366F1",
  },
  {
    name: "Data Layer",
    items: ["PostgreSQL", "Redis Cache", "Pinecone Vectors", "Kafka Events"],
    color: "#8B5CF6",
  },
  {
    name: "Agent Layer",
    items: ["AI Router", "5 Specialized Agents", "Tool Connectors", "Response Engine"],
    color: DASHBOARD_TOKENS.primary,
  },
]

const MINI_NAV = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard className="h-4 w-4" /> },
  { id: "agents", label: "Agents", icon: <Bot className="h-4 w-4" /> },
  { id: "workflows", label: "Workflows", icon: <Zap className="h-4 w-4" /> },
  { id: "tools", label: "Tools", icon: <Wrench className="h-4 w-4" /> },
  { id: "analytics", label: "Analytics", icon: <BarChart3 className="h-4 w-4" /> },
  { id: "settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
]

export function Step02Architecture() {
  return (
    <DashboardShell
      tabs={[
        { id: "arch", label: "architecture.ts", active: true, type: "ts" },
        { id: "schema", label: "schema.sql", type: "sql" },
      ]}
    >
      <SplitPane
        left={<CodeEditorPanel code={ARCH_TYPES_CODE} filename="architecture.ts" />}
        right={
          <div className="flex h-full min-h-0 overflow-hidden">
            <DashboardMiniSidebar items={MINI_NAV} activeId="workflows" />
            <div className="flex min-h-0 flex-1 flex-col overflow-auto p-4">
              <p
                className="text-[9px] font-bold uppercase tracking-[0.14em]"
                style={{ color: DASHBOARD_TOKENS.textLight }}
              >
                Platform Architecture
              </p>
              <div className="mt-4 flex flex-1 flex-col items-center gap-2.5">
                {LAYERS.map((layer, i) => (
                  <div key={layer.name} className="relative w-full max-w-sm">
                    {i > 0 && (
                      <div
                        className="absolute -top-2.5 left-1/2 h-2.5 w-px -translate-x-1/2"
                        style={{ background: DASHBOARD_TOKENS.border }}
                      />
                    )}
                    <div
                      className="rounded-2xl border px-4 py-3"
                      style={{
                        borderColor: `${layer.color}30`,
                        background: `${layer.color}08`,
                        boxShadow: DASHBOARD_TOKENS.widgetShadow,
                      }}
                    >
                      <p className="text-[13px] font-bold" style={{ color: DASHBOARD_TOKENS.navy }}>
                        {layer.name}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {layer.items.map((item) => (
                          <span
                            key={item}
                            className="rounded-lg px-2 py-0.5 text-[9px] font-semibold"
                            style={{
                              background: `${layer.color}14`,
                              color: layer.color,
                            }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[
                  { label: "Services", value: "12" },
                  { label: "Endpoints", value: "847" },
                  { label: "Regions", value: "4" },
                ].map((stat) => (
                  <WidgetCard key={stat.label} title={stat.label}>
                    <p className="mt-1 text-xl font-bold" style={{ color: DASHBOARD_TOKENS.navy }}>
                      {stat.value}
                    </p>
                  </WidgetCard>
                ))}
              </div>
            </div>
          </div>
        }
      />
    </DashboardShell>
  )
}
