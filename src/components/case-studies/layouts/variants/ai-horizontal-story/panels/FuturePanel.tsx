"use client"

import Link from "next/link"
import { STORY_TOKENS } from "../tokens"

type Props = {
  headline?: string
  subtext?: string
  buttonText?: string
  buttonHref?: string
}

export function FuturePanel({
  headline = "Ready for the next chapter of AI automation?",
  subtext = "Partner with Softree to extend Neutrino-style intelligence across your enterprise — from pilot to production in weeks, not years.",
  buttonText = "Schedule a Consultation",
  buttonHref = "/contact",
}: Props) {
  return (
    <article
      data-story-panel
      className="story-panel flex h-full shrink-0 flex-col items-center justify-center overflow-hidden rounded-[32px] p-10 text-center md:p-12"
      style={{
        width: "var(--story-panel-width)",
        background: `linear-gradient(135deg, ${STORY_TOKENS.bg} 0%, ${STORY_TOKENS.primaryMuted} 100%)`,
        border: `1px solid rgba(109, 93, 246, 0.15)`,
      }}
    >
      <span className="text-sm font-bold tracking-[0.2em] text-[#6D5DF6]">05</span>
      <h2 className="mt-4 max-w-xl text-3xl font-bold tracking-tight text-[#0B1020] md:text-4xl">
        The Future
      </h2>
      <p className="mt-4 max-w-md text-[#64748B]">{headline}</p>
      <p className="mt-2 max-w-lg text-sm text-[#94A3B8]">{subtext}</p>
      <Link
        href={buttonHref}
        className="mt-10 inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        style={{ background: STORY_TOKENS.primary }}
      >
        {buttonText}
      </Link>
    </article>
  )
}
