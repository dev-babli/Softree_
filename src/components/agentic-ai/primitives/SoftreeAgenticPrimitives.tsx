"use client"

import type { ReactNode } from "react"
import { KORE } from "./softree-ui-tokens"

export function KoreMonoLabel({ children }: { children: ReactNode }) {
  return (
    <p
      className="text-[10px] font-semibold uppercase tracking-[0.22em] sm:text-[11px]"
      style={{ color: KORE.accent, fontFamily: KORE.mono }}
    >
      {children}
    </p>
  )
}

export function KoreBrace({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`font-medium italic ${className}`} style={{ color: KORE.accent }}>
      {"{"} {children} {"}"}
    </span>
  )
}

export function KoreHairline({ className = "" }: { className?: string }) {
  return <div className={`h-px w-full ${className}`} style={{ backgroundColor: KORE.hairline }} />
}

export function KoreCornerBracket({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative border border-[#121417]/15 px-6 py-5 md:px-8 md:py-6"
      style={{ borderStyle: "solid" }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t"
        style={{ borderColor: KORE.accent }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b border-r"
        style={{ borderColor: KORE.accent }}
      />
      {children}
    </div>
  )
}

export function KoreProgressRail({ progress }: { progress: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          className="h-1 w-1 rounded-full transition-colors duration-300"
          style={{
            backgroundColor: i / 12 <= progress ? KORE.accent : "rgba(255,255,255,0.2)",
          }}
        />
      ))}
    </div>
  )
}
