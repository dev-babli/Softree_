"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { Database, FileText, Mail, MessageSquare } from "lucide-react"
import { useRef } from "react"
import { DASHBOARD_TOKENS } from "../tokens"

const INPUTS = [
  { id: "slack", label: "Slack", icon: MessageSquare, y: 12 },
  { id: "email", label: "Email", icon: Mail, y: 28 },
  { id: "crm", label: "CRM", icon: Database, y: 44 },
  { id: "files", label: "Files", icon: FileText, y: 60 },
  { id: "db", label: "Database", icon: Database, y: 76 },
]

const AGENTS = [
  { id: "research", label: "Research", y: 14 },
  { id: "support", label: "Support", y: 30 },
  { id: "sales", label: "Sales", y: 46 },
  { id: "analytics", label: "Analytics", y: 62 },
  { id: "finance", label: "Finance", y: 78 },
]

function curvedPath(x1: number, y1: number, x2: number, y2: number) {
  const cx = (x1 + x2) / 2
  return `M ${x1} ${y1} C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`
}

export function AgentFlowDiagram() {
  const rootRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.to(".flow-line", {
        strokeDashoffset: 0,
        duration: 2,
        ease: "none",
        repeat: -1,
      })
      gsap.to(".router-pulse", {
        scale: 1.15,
        opacity: 0.4,
        duration: 1.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
      })
      gsap.to(".wave-bar", {
        scaleY: "random(0.3, 1)",
        duration: 0.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.08, from: "random" },
        transformOrigin: "bottom center",
      })
    },
    { scope: rootRef },
  )

  return (
    <div ref={rootRef} className="relative h-full min-h-[200px] w-full">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={DASHBOARD_TOKENS.primary} stopOpacity="0.2" />
            <stop offset="50%" stopColor={DASHBOARD_TOKENS.primary} stopOpacity="0.7" />
            <stop offset="100%" stopColor={DASHBOARD_TOKENS.primaryLight} stopOpacity="0.4" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {INPUTS.map((input) => (
          <path
            key={`in-${input.id}`}
            className="flow-line"
            d={curvedPath(14, input.y, 38, 50)}
            fill="none"
            stroke="url(#flowGrad)"
            strokeWidth="0.6"
            strokeDasharray="3 2"
            strokeDashoffset="5"
            filter="url(#glow)"
          />
        ))}
        {AGENTS.map((agent) => (
          <path
            key={`out-${agent.id}`}
            className="flow-line"
            d={curvedPath(62, 50, 76, agent.y)}
            fill="none"
            stroke="url(#flowGrad)"
            strokeWidth="0.6"
            strokeDasharray="3 2"
            strokeDashoffset="5"
            filter="url(#glow)"
          />
        ))}
        <path
          className="flow-line"
          d={curvedPath(80, 50, 92, 50)}
          fill="none"
          stroke={DASHBOARD_TOKENS.primary}
          strokeWidth="0.8"
          strokeDasharray="2 2"
          strokeDashoffset="4"
          filter="url(#glow)"
        />
      </svg>

      <div className="relative grid h-full grid-cols-[1fr_auto_1fr_auto] items-center gap-1 px-1">
        {/* Input nodes */}
        <div className="flex flex-col gap-1.5">
          {INPUTS.map((input) => {
            const Icon = input.icon
            return (
              <div
                key={input.id}
                className="flex items-center gap-1.5 rounded-xl border bg-white px-2 py-1.5"
                style={{
                  borderColor: DASHBOARD_TOKENS.border,
                  boxShadow: DASHBOARD_TOKENS.widgetShadow,
                }}
              >
                <div
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md"
                  style={{ background: DASHBOARD_TOKENS.surfaceMuted }}
                >
                  <Icon className="h-3 w-3" style={{ color: DASHBOARD_TOKENS.textMuted }} />
                </div>
                <span className="text-[9px] font-semibold" style={{ color: DASHBOARD_TOKENS.navy }}>
                  {input.label}
                </span>
              </div>
            )
          })}
        </div>

        {/* AI Router */}
        <div className="relative flex flex-col items-center px-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="router-pulse absolute rounded-full"
              style={{
                width: 56 + i * 14,
                height: 56 + i * 14,
                border: `1px solid ${DASHBOARD_TOKENS.primaryBorder}`,
                opacity: 0.25 - i * 0.06,
              }}
            />
          ))}
          <div
            className="relative z-10 flex h-14 w-14 flex-col items-center justify-center rounded-full text-center"
            style={{
              background: `linear-gradient(145deg, ${DASHBOARD_TOKENS.primary}, ${DASHBOARD_TOKENS.primaryLight})`,
              boxShadow: `0 8px 24px ${DASHBOARD_TOKENS.primaryGlow}`,
            }}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" aria-hidden>
              <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.9" />
              <circle cx="12" cy="4" r="1.5" fill="currentColor" opacity="0.6" />
              <circle cx="20" cy="12" r="1.5" fill="currentColor" opacity="0.6" />
              <circle cx="12" cy="20" r="1.5" fill="currentColor" opacity="0.6" />
              <circle cx="4" cy="12" r="1.5" fill="currentColor" opacity="0.6" />
            </svg>
            <span className="mt-0.5 text-[7px] font-bold uppercase tracking-wider text-white">Router</span>
          </div>
        </div>

        {/* Agent nodes */}
        <div className="flex flex-col gap-1.5">
          {AGENTS.map((agent) => (
            <div
              key={agent.id}
              className="rounded-xl border px-2.5 py-1 text-[9px] font-semibold"
              style={{
                borderColor: DASHBOARD_TOKENS.primaryBorder,
                background: DASHBOARD_TOKENS.primaryMuted,
                color: DASHBOARD_TOKENS.navy,
              }}
            >
              {agent.label}
            </div>
          ))}
        </div>

        {/* Response Engine */}
        <div className="flex flex-col items-center gap-1.5 pl-1">
          <div
            className="rounded-2xl border bg-white px-3 py-2.5 text-center"
            style={{
              borderColor: DASHBOARD_TOKENS.border,
              boxShadow: DASHBOARD_TOKENS.cardShadow,
            }}
          >
            <p className="text-[9px] font-bold" style={{ color: DASHBOARD_TOKENS.navy }}>
              Response
            </p>
            <p className="text-[9px] font-bold" style={{ color: DASHBOARD_TOKENS.navy }}>
              Engine
            </p>
            <p
              className="mt-1 text-[7px] font-semibold uppercase tracking-wider"
              style={{ color: DASHBOARD_TOKENS.primary }}
            >
              Processing…
            </p>
          </div>
          <div className="flex h-5 items-end gap-0.5">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="wave-bar inline-block w-1 rounded-full"
                style={{
                  height: 12 + (i % 3) * 4,
                  background: DASHBOARD_TOKENS.primary,
                  opacity: 0.5 + (i % 4) * 0.12,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
