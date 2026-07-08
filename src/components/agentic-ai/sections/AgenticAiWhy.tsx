"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

import { SpotlightCard } from "@/components/qc/shared/SpotlightCard"
import { EASE_T } from "@/lib/motion"
import { AgenticSection } from "../primitives/AgenticSection"
import { clientReviews, whyChooseItems } from "../data"

export function AgenticAiWhy() {
  const [idx, setIdx] = useState(0)
  const review = clientReviews[idx]

  return (
    <AgenticSection
      variant="cream"
      badge="Why Softree"
      accent="#FF5812"
      headline="A partner built for enterprise AI delivery"
      body="Offshore velocity with onshore accountability when agent programs cannot afford to stall."
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="grid gap-4 sm:grid-cols-2">
          {whyChooseItems.map((item) => {
            const Icon = item.icon
            return (
              <SpotlightCard
                key={item.title}
                color="rgba(255, 88, 18, 0.35)"
                className="rounded-2xl border border-[var(--legacy-111)]/[0.08] bg-white p-5"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF5812]/10 text-[#FF5812]">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="text-[15px] font-semibold text-[#0a0a1a]">{item.title}</h3>
                <p className="mt-1 text-sm text-[#0a0a1a]/60">{item.desc}</p>
              </SpotlightCard>
            )
          })}
        </div>

        <SpotlightCard
          color="rgba(255, 88, 18, 0.3)"
          className="rounded-2xl border border-[var(--legacy-111)]/[0.08] bg-white p-8"
        >
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0a0a1a]/45">
                Client reviews
              </p>
              <p className="mt-2 text-4xl font-bold tracking-tight text-[#0a0a1a]">4.9</p>
              <div className="mt-1 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-[#FF5812] text-[#FF5812]" aria-hidden />
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Previous"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#0a0a1a]/10 bg-[#F8F9FC]"
                onClick={() => setIdx((i) => (i - 1 + clientReviews.length) % clientReviews.length)}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#0a0a1a]/10 bg-[#F8F9FC]"
                onClick={() => setIdx((i) => (i + 1) % clientReviews.length)}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={review.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.45, ease: EASE_T.silk }}
              className="text-[17px] leading-[1.7] text-[#0a0a1a]/80"
            >
              &ldquo;{review.comment}&rdquo;
              <footer className="mt-6 border-t border-[#0a0a1a]/10 pt-4 text-sm">
                <p className="font-semibold text-[#0a0a1a]">{review.name}</p>
                <p className="text-[#0a0a1a]/55">{review.company}</p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </SpotlightCard>
      </div>
    </AgenticSection>
  )
}
