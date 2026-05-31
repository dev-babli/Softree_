"use client"

import { forwardRef, type ReactNode } from "react"
import { STORY_TOKENS } from "./tokens"

type Props = {
  children: ReactNode
  reducedMotion?: boolean
}

export const HorizontalTrack = forwardRef<HTMLDivElement, Props>(function HorizontalTrack(
  { children, reducedMotion },
  ref,
) {
  if (reducedMotion) {
    return (
      <div className="flex flex-1 flex-col gap-8 overflow-y-auto px-6 py-8 md:px-10 [&_.story-panel]:!w-full [&_.story-panel]:max-w-none">
        {children}
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className="horizontal-story-track flex h-full w-max items-stretch gap-8 pl-6 pr-10 will-change-transform md:pl-8"
      style={{ gap: STORY_TOKENS.panelGap }}
    >
      {children}
    </div>
  )
})
