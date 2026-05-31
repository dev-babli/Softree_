"use client"

import {
  Building2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Factory,
  Users,
} from "lucide-react"
import { STORY_TOKENS } from "./tokens"

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
  activeIndex: number
  panelCount: number
  onPrev: () => void
  onNext: () => void
}

export function PinnedSidebar({
  title,
  description,
  metadata,
  activeIndex,
  panelCount,
  onPrev,
  onNext,
}: Props) {
  const progress = panelCount <= 1 ? 100 : (activeIndex / (panelCount - 1)) * 100

  return (
    <aside
      className="flex h-full shrink-0 flex-col px-6 py-8 lg:px-8 lg:py-10"
      style={{
        width: STORY_TOKENS.sidebarWidth,
        background: STORY_TOKENS.bg,
      }}
    >
      <div className="flex items-center gap-2">
        <div
          className="flex h-7 w-7 items-center justify-center rounded-lg"
          style={{ background: STORY_TOKENS.primaryMuted }}
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
            <circle cx="8" cy="8" r="3" fill={STORY_TOKENS.primary} />
            <circle cx="8" cy="2" r="1.2" fill={STORY_TOKENS.primary} opacity="0.5" />
            <circle cx="14" cy="8" r="1.2" fill={STORY_TOKENS.primary} opacity="0.5" />
            <circle cx="8" cy="14" r="1.2" fill={STORY_TOKENS.primary} opacity="0.5" />
            <circle cx="2" cy="8" r="1.2" fill={STORY_TOKENS.primary} opacity="0.5" />
          </svg>
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: STORY_TOKENS.navy }}>
          Neutrino AI
        </p>
      </div>

      <p
        className="mt-8 text-[10px] font-bold uppercase tracking-[0.22em]"
        style={{ color: STORY_TOKENS.primary }}
      >
        Case Study
      </p>
      <h1
        className="mt-2.5 text-[1.55rem] font-bold leading-[1.12] tracking-tight lg:text-[1.65rem]"
        style={{ color: STORY_TOKENS.navy }}
      >
        {title}
      </h1>
      <p className="mt-3.5 text-[13px] leading-[1.65]" style={{ color: STORY_TOKENS.textMuted }}>
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
              style={{ background: STORY_TOKENS.primaryMuted }}
            >
              <row.icon className="h-3.5 w-3.5" style={{ color: STORY_TOKENS.primary }} aria-hidden />
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#94A3B8]">
                {row.label}
              </p>
              <p className="text-[13px] font-semibold" style={{ color: STORY_TOKENS.navy }}>
                {row.value}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center gap-3 pt-8">
        <button
          type="button"
          onClick={onPrev}
          disabled={activeIndex <= 0}
          className="flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-[transform,border-color] duration-[160ms] hover:border-indigo-500 active:scale-[0.97] disabled:opacity-35 motion-reduce:transform-none"
          style={{ borderColor: "rgba(148, 163, 184, 0.25)" }}
          aria-label="Previous panel"
        >
          <ChevronLeft className="h-4 w-4" style={{ color: STORY_TOKENS.navy }} />
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={activeIndex >= panelCount - 1}
          className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-[transform,opacity] duration-[160ms] hover:opacity-90 active:scale-[0.97] disabled:opacity-35 motion-reduce:transform-none"
          style={{ background: STORY_TOKENS.primary }}
          aria-label="Next panel"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <div className="ml-1 flex-1">
          <div className="h-1 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%`, background: STORY_TOKENS.primary }}
            />
          </div>
          <p className="mt-1.5 text-[10px] tabular-nums" style={{ color: STORY_TOKENS.textMuted }}>
            {String(activeIndex + 1).padStart(2, "0")} / {String(panelCount).padStart(2, "0")}
          </p>
        </div>
      </div>
    </aside>
  )
}
