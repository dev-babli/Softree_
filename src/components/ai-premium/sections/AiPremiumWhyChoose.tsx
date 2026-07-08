"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, MapPin, Pause, Play, Star } from "lucide-react"

import { AiReveal } from "../primitives/AiReveal"
import { clientReviews, whyChooseItems } from "../data/agentic-ai-content"

export function AiPremiumWhyChoose() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % clientReviews.length)
    }, 6000)
    return () => clearInterval(id)
  }, [paused])

  const review = clientReviews[index]

  return (
    <section className="bg-white py-24 md:py-32" aria-labelledby="ai-why-heading">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <AiReveal>
              <span className="ai-pill ai-pill--light mb-6">Why Softree</span>
              <h2 id="ai-why-heading" className="ai-h2 text-[var(--ai-ink)]">
                A partner built for
                <br />
                <em>enterprise AI delivery</em>
              </h2>
              <p className="mt-5 max-w-lg text-[16px] leading-[1.7] text-[var(--ai-muted)]">
                Offshore velocity with onshore accountability — the combination agencies and
                enterprises rely on when agent programs cannot afford to stall.
              </p>
            </AiReveal>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2" data-stagger>
              {whyChooseItems.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.title} className="ai-card p-5" data-anim>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#1852ff]/10 text-[#1852ff]">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h3 className="text-[15px] font-semibold text-[var(--ai-navy)]">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--ai-muted)]">{item.desc}</p>
                  </li>
                )
              })}
            </ul>
          </div>

          <AiReveal className="ai-card flex flex-col p-8 md:p-10" delay={0.08}>
            <div className="mb-6 flex items-center justify-between gap-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ai-muted)]">
                Client reviews
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label={paused ? "Resume autoplay" : "Pause autoplay"}
                  className="ai-icon-btn ai-icon-btn--light"
                  onClick={() => setPaused((p) => !p)}
                >
                  {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                </button>
                <button
                  type="button"
                  aria-label="Previous review"
                  className="ai-icon-btn ai-icon-btn--light"
                  onClick={() =>
                    setIndex((prev) => (prev - 1 + clientReviews.length) % clientReviews.length)
                  }
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next review"
                  className="ai-icon-btn ai-icon-btn--light"
                  onClick={() => setIndex((prev) => (prev + 1) % clientReviews.length)}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-1" aria-label={`${review.rating} out of 5 stars`}>
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-[#ff5812] text-[#ff5812]" aria-hidden />
              ))}
            </div>

            <blockquote className="mt-5 flex-1 text-[17px] leading-[1.7] text-[var(--ai-slate)]">
              &ldquo;{review.comment}&rdquo;
            </blockquote>

            <footer className="mt-8 border-t border-[var(--ai-line)] pt-6">
              <p className="font-semibold text-[var(--ai-navy)]">{review.name}</p>
              <p className="text-sm text-[var(--ai-muted)]">{review.company}</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-[var(--ai-muted)]">
                <MapPin className="h-3 w-3" aria-hidden />
                {review.location}
              </p>
            </footer>

            <div className="mt-6 flex justify-center gap-2">
              {clientReviews.map((r, i) => (
                <button
                  key={r.name}
                  type="button"
                  aria-label={`Show review from ${r.name}`}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-8 bg-[var(--ai-blue)]" : "w-2 bg-[var(--ai-line)]"
                  }`}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          </AiReveal>
        </div>
      </div>
    </section>
  )
}
