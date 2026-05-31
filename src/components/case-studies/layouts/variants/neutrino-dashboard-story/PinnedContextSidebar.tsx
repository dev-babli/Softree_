"use client"

import {
  ArrowUpRight,
  Building2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Factory,
  Users,
} from "lucide-react"
import { DASHBOARD_TOKENS } from "./tokens"

type Metadata = {
  client: string
  industry: string
  duration: string
  team: string
}

type Props = {
  title: string
  description: string
  metadata: Metadata
  activeStep: number
  stepCount: number
  githubUrl?: string
  onPrev: () => void
  onNext: () => void
}

export function PinnedContextSidebar({
  title,
  description,
  metadata,
  activeStep,
  stepCount,
  githubUrl,
  onPrev,
  onNext,
}: Props) {
  return (
    <aside
      className="flex shrink-0 flex-col px-6 py-8 lg:sticky lg:top-24 lg:self-start lg:px-8 lg:py-10"
      style={{
        width: DASHBOARD_TOKENS.sidebarWidth,
        background: "transparent",
      }}
    >
      <div className="flex items-center gap-2">
        <div
          className="flex h-7 w-7 items-center justify-center rounded-lg"
          style={{ background: DASHBOARD_TOKENS.primaryMuted }}
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
            <circle cx="8" cy="8" r="3" fill={DASHBOARD_TOKENS.primary} />
            <circle cx="8" cy="2" r="1.2" fill={DASHBOARD_TOKENS.primary} opacity="0.5" />
            <circle cx="14" cy="8" r="1.2" fill={DASHBOARD_TOKENS.primary} opacity="0.5" />
            <circle cx="8" cy="14" r="1.2" fill={DASHBOARD_TOKENS.primary} opacity="0.5" />
            <circle cx="2" cy="8" r="1.2" fill={DASHBOARD_TOKENS.primary} opacity="0.5" />
          </svg>
        </div>
        <p
          className="text-[10px] font-bold uppercase tracking-[0.24em]"
          style={{ color: DASHBOARD_TOKENS.navy }}
        >
          Neutrino AI
        </p>
      </div>

      <p
        className="mt-8 text-[10px] font-bold uppercase tracking-[0.22em]"
        style={{ color: DASHBOARD_TOKENS.primary }}
      >
        Case Study
      </p>
      <h1
        className="mt-2.5 text-[1.55rem] font-bold leading-[1.12] tracking-tight lg:text-[1.65rem]"
        style={{ color: DASHBOARD_TOKENS.navy }}
      >
        {title}
      </h1>
      <p className="mt-3.5 text-[13px] leading-[1.65]" style={{ color: DASHBOARD_TOKENS.textMuted }}>
        {description}
      </p>

      <ul className="mt-7 space-y-3.5">
        {[
          { icon: Building2, label: "Client", value: metadata.client },
          { icon: Factory, label: "Industry", value: metadata.industry },
          { icon: Clock, label: "Duration", value: metadata.duration },
          { icon: Users, label: "Team", value: metadata.team },
        ].map((row) => (
          <li key={row.label} className="flex items-start gap-3">
            <div
              className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
              style={{ background: DASHBOARD_TOKENS.primaryMuted }}
            >
              <row.icon className="h-3.5 w-3.5" style={{ color: DASHBOARD_TOKENS.primary }} aria-hidden />
            </div>
            <div>
              <p
                className="text-[9px] font-bold uppercase tracking-[0.14em]"
                style={{ color: DASHBOARD_TOKENS.textLight }}
              >
                {row.label}
              </p>
              <p className="text-[13px] font-semibold" style={{ color: DASHBOARD_TOKENS.navy }}>
                {row.value}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[13px] font-semibold text-white transition-[transform,opacity] duration-[160ms] hover:opacity-90 active:scale-[0.97] motion-reduce:transform-none"
          style={{ background: DASHBOARD_TOKENS.navy }}
        >
          View on GitHub
          <ArrowUpRight className="h-4 w-4" />
        </a>
      )}

      <div className="mt-auto flex items-center gap-3 pt-8">
        <button
          type="button"
          onClick={onPrev}
          disabled={activeStep <= 0}
          className="flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-[transform,border-color] duration-[160ms] hover:border-[var(--nd-primary)] active:scale-[0.97] disabled:opacity-35 motion-reduce:transform-none"
          style={{ borderColor: DASHBOARD_TOKENS.border, ["--nd-primary" as string]: DASHBOARD_TOKENS.primary }}
          aria-label="Previous step"
        >
          <ChevronLeft className="h-4 w-4" style={{ color: DASHBOARD_TOKENS.navy }} />
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={activeStep >= stepCount - 1}
          className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-[transform,opacity] duration-[160ms] hover:opacity-90 active:scale-[0.97] disabled:opacity-35 motion-reduce:transform-none"
          style={{ background: DASHBOARD_TOKENS.primary }}
          aria-label="Next step"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </aside>
  )
}
