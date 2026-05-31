"use client"

import { STORY_TOKENS } from "../tokens"

export type ArchitectureLayer = {
  title: string
  description: string
}

const DEFAULT_LAYERS: ArchitectureLayer[] = [
  {
    title: "AI Agents",
    description: "Autonomous agents orchestrate workflows, approvals, and cross-system handoffs in natural language.",
  },
  {
    title: "Intelligence Engine",
    description: "Unified reasoning layer that routes context, policies, and model selection across every automation.",
  },
  {
    title: "Automation Layer",
    description: "Event-driven pipelines connect ERP, CRM, data lakes, and plant systems with governed triggers.",
  },
  {
    title: "Data Foundation",
    description: "Vector store, lineage, and quality gates ensure every decision is traceable and audit-ready.",
  },
]

const FOOTER_PILLS = ["Learn", "Adapt", "Automate", "Optimize"] as const

type Props = {
  layers?: ArchitectureLayer[]
}

export function AIArchitectureLayers({ layers = DEFAULT_LAYERS }: Props) {
  return (
    <div className="flex h-full flex-col justify-between gap-8">
      <div className="relative flex flex-1 flex-col justify-center gap-3 py-4">
        {layers.map((layer, i) => (
          <div
            key={layer.title}
            className="relative rounded-[24px] border border-white/10 px-8 py-6 backdrop-blur-md transition-transform"
            style={{
              background: `linear-gradient(135deg, rgba(109,93,246,${0.08 + i * 0.04}) 0%, rgba(255,255,255,0.04) 100%)`,
              marginLeft: i * 12,
              marginRight: (layers.length - 1 - i) * 12,
              boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A78BFA]">
              Layer {layers.length - i}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-white">{layer.title}</h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-400">{layer.description}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-6 border-t border-white/10 pt-6">
        {FOOTER_PILLS.map((label) => (
          <div key={label} className="flex items-center gap-2 text-sm text-slate-400">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={{ background: STORY_TOKENS.primaryMuted, color: STORY_TOKENS.primary }}
            >
              <span className="text-[10px] font-bold">{label[0]}</span>
            </span>
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}
