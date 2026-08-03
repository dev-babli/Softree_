"use client"

import { Star } from "lucide-react"

import { SpotlightCard } from "@/components/qc/shared/SpotlightCard"

import { GenSection } from "../primitives/GenSection"
import { genWhy, heroTestimonials } from "../data"

export function GenAiWhy() {
  return (
    <GenSection
      id="why"
      variant="cream"
      badge="Why Softree"
      headline="A delivery partner enterprises trust"
      body="Agile engineering, leadership access, and flexible engagement models, proven since 2013."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {genWhy.map((item) => (
          <SpotlightCard
            key={item.title}
            color="rgba(255, 88, 18, 0.3)"
            className="min-w-0 rounded-2xl border border-[#0a0a1a]/08 bg-white p-6"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF5812]/10 text-sm font-bold text-[#FF5812]">
              {item.title.charAt(0)}
            </div>
            <h3 className="text-base font-semibold text-[#0a0a1a]">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#0a0a1a]/65">{item.body}</p>
          </SpotlightCard>
        ))}
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {heroTestimonials.map((review) => (
          <blockquote
            key={review.name}
            className="min-w-0 rounded-2xl border border-[#0a0a1a]/08 bg-white p-6"
          >
            <div className="mb-3 flex gap-0.5" aria-label="5 star rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-[#FF5812] text-[#FF5812]" aria-hidden />
              ))}
            </div>
            <p className="text-sm leading-relaxed text-[#0a0a1a]/75">&ldquo;{review.text}&rdquo;</p>
            <footer className="mt-4">
              <p className="text-sm font-semibold text-[#0a0a1a]">{review.name}</p>
              <p className="text-xs text-[#0a0a1a]/55">
                {review.role} · {review.company}
              </p>
            </footer>
          </blockquote>
        ))}
      </div>
    </GenSection>
  )
}
