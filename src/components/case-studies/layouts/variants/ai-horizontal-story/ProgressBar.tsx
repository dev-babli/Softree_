"use client"

import { PROGRESS_NODES, STORY_TOKENS } from "./tokens"

type Props = {
  activeIndex: number
  panelCount: number
  onSelect?: (panelIndex: number) => void
}

export function ProgressBar({ activeIndex, panelCount, onSelect }: Props) {
  const nodeIndex = Math.min(activeIndex + 1, PROGRESS_NODES.length - 1)

  return (
    <div
      className="absolute inset-x-0 bottom-0 z-20 px-6 pb-6 pt-4 md:px-10"
      style={{
        background: "linear-gradient(to top, rgba(252,252,254,0.95) 60%, transparent)",
      }}
    >
      <p className="mb-4 text-center text-xs text-[#94A3B8] md:text-sm">
        Scroll horizontally to explore the full story
      </p>
      <div className="relative mx-auto max-w-3xl">
        <div
          className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full"
          style={{ background: "rgba(109, 93, 246, 0.15)" }}
        />
        <div
          className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full transition-all duration-300"
          style={{
            width: `${(nodeIndex / (PROGRESS_NODES.length - 1)) * 100}%`,
            background: STORY_TOKENS.primary,
          }}
        />
        <div className="relative flex justify-between">
          {PROGRESS_NODES.map((node, i) => {
            const isActive = i === nodeIndex
            const panelTarget = i === 0 ? 0 : Math.min(i - 1, panelCount - 1)
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => onSelect?.(panelTarget)}
                className="group flex flex-col items-center gap-1"
                aria-current={isActive ? "step" : undefined}
                aria-label={
                  "subtitle" in node && node.subtitle
                    ? `${node.label} ${node.subtitle}`
                    : node.label
                }
              >
                <span
                  className="flex h-3 w-3 rounded-full border-2 transition-all"
                  style={{
                    borderColor: isActive ? STORY_TOKENS.primary : "#CBD5E1",
                    background: isActive ? STORY_TOKENS.primary : "#fff",
                    boxShadow: isActive ? `0 0 12px ${STORY_TOKENS.primary}` : "none",
                  }}
                />
                <span
                  className="text-[10px] font-semibold uppercase tracking-wider transition-colors"
                  style={{ color: isActive ? STORY_TOKENS.primary : "#94A3B8" }}
                >
                  {node.label}
                </span>
                {"subtitle" in node && node.subtitle && (
                  <span className="hidden text-[9px] text-[#CBD5E1] sm:block">
                    {node.subtitle}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
