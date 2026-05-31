"use client"

import { PAYFLOW_TOKENS as T } from "./tokens"

const MICROSERVICES = ["Payment", "User", "Transaction", "Notification"] as const
const DATA_LAYER = ["PostgreSQL", "Redis", "S3"] as const
const MONITORING = ["Grafana", "Prometheus", "ELK Stack", "Sentry"] as const

function ArrowDown() {
  return (
    <div className="flex justify-center py-1" aria-hidden>
      <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
        <path d="M6 0v12M6 12l-4-4M6 12l4-4" stroke={T.label} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  )
}

function Box({
  title,
  subtitle,
  className = "",
  accent,
}: {
  title: string
  subtitle?: string
  className?: string
  accent?: string
}) {
  return (
    <div
      className={`rounded-lg border px-3 py-2 text-center ${className}`}
      style={{
        borderColor: accent ? `${accent}40` : T.border,
        background: accent ? `${accent}08` : T.white,
      }}
    >
      <p className="text-[10px] font-semibold" style={{ color: T.heading }}>
        {title}
      </p>
      {subtitle ? (
        <p className="mt-0.5 text-[8px]" style={{ color: T.label }}>
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}

function LayerLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.14em]" style={{ color: T.label }}>
      {children}
    </p>
  )
}

export function ArchitectureDiagram() {
  return (
    <div
      className="overflow-x-auto rounded-xl border p-5 md:p-6"
      style={{ borderColor: T.border, background: T.white, boxShadow: T.cardShadow }}
    >
      <h3 className="text-sm font-bold" style={{ color: T.heading }}>
        High-Level Architecture
      </h3>

      <div className="mt-5 min-w-[280px]">
        {/* Client Apps */}
        <LayerLabel>Client Apps</LayerLabel>
        <div className="grid grid-cols-3 gap-2">
          <Box title="Web App" subtitle="React" />
          <Box title="Mobile App" subtitle="iOS / Android" />
          <Box title="Partner API" subtitle="REST / GraphQL" />
        </div>

        <ArrowDown />

        {/* API Gateway */}
        <Box title="API Gateway" subtitle="Rate limiting, Auth, Routing" accent={T.accent} className="mx-auto max-w-xs" />

        <ArrowDown />

        {/* Microservices */}
        <LayerLabel>Microservices Layer</LayerLabel>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {MICROSERVICES.map((svc) => (
            <Box key={svc} title={svc} subtitle="Service" accent={T.accentLight} />
          ))}
        </div>

        <ArrowDown />

        {/* Data Layer */}
        <LayerLabel>Data Layer</LayerLabel>
        <div className="grid grid-cols-3 gap-2">
          {DATA_LAYER.map((db) => (
            <Box key={db} title={db} accent={T.purple} />
          ))}
        </div>

        <ArrowDown />

        {/* Infrastructure */}
        <LayerLabel>Infrastructure</LayerLabel>
        <div className="grid grid-cols-2 gap-2">
          <Box title="AWS Cloud" subtitle="EC2, ECS, Lambda" accent="#FF9900" />
          <Box title="Cloudflare CDN" subtitle="Edge caching" accent="#F38020" />
        </div>

        {/* Monitoring footer */}
        <div
          className="mt-5 rounded-lg border px-4 py-3"
          style={{ borderColor: T.border, background: T.cardBg }}
        >
          <p className="text-[9px] font-bold uppercase tracking-[0.14em]" style={{ color: T.label }}>
            Monitoring & Observability
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            {MONITORING.map((tool) => (
              <div key={tool} className="flex items-center gap-1.5">
                <div
                  className="flex h-6 w-6 items-center justify-center rounded text-[7px] font-bold text-white"
                  style={{
                    background:
                      tool === "Grafana"
                        ? "#F46800"
                        : tool === "Prometheus"
                          ? "#E6522C"
                          : tool === "ELK Stack"
                            ? "#005571"
                            : "#362D59",
                  }}
                >
                  {tool.charAt(0)}
                </div>
                <span className="text-[10px] font-medium" style={{ color: T.body }}>
                  {tool}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
