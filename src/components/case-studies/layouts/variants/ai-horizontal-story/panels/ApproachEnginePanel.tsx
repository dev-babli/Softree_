"use client"

import { STORY_TOKENS } from "../tokens"
import { AIArchitectureLayers, type ArchitectureLayer } from "../visuals/AIArchitectureLayers"

type Props = {
  layers?: ArchitectureLayer[]
  summary?: string
}

export function ApproachEnginePanel({ layers, summary }: Props) {
  return (
    <article
      data-story-panel
      className="story-panel flex h-full shrink-0 flex-col overflow-hidden rounded-[32px] p-10 md:p-12"
      style={{
        width: "var(--story-panel-width)",
        background: STORY_TOKENS.navyDeep,
        color: STORY_TOKENS.textOnDark,
      }}
    >
      <header>
        <span className="text-sm font-bold tracking-[0.2em] text-[#A78BFA]">02</span>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
          Our Approach
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
          {summary ||
            "We designed a layered AI engine — agents on top, intelligence in the middle, automation and governed data underneath — so Neutrino could scale automation without sacrificing control."}
        </p>
      </header>
      <div className="mt-6 flex-1">
        <AIArchitectureLayers layers={layers} />
      </div>
    </article>
  )
}
