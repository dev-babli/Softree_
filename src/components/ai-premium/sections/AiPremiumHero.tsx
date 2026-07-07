"use client"

import Link from "next/link"
import { getInitials } from "@/lib/text";
import { useCallback, useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ArrowUpRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react"

import CalendlyPopupButton from "@/components/calendly/CalendlyPopupButton"
import { DUR, EASE_T, prefersReducedMotion } from "@/lib/motion"

import { agenticHero, heroTestimonials } from "../data/agentic-ai-content"

const ROTATE_MS = 6000
const TICK_MS = 100

export function AiPremiumHero() {
  const { pill, headline, headlineAccent, subhead, announcement, cards, stats } = agenticHero
  const [idx, setIdx] = useState(0)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const heroRef = useRef<HTMLElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      if (copyRef.current) {
        const targets = copyRef.current.querySelectorAll(".ai-hero-enter")
        gsap.from(targets, {
          y: 48,
          opacity: 0,
          duration: 0.85,
          stagger: 0.07,
          ease: "power3.out",
          delay: 0.12,
        })
      }

      if (panelRef.current) {
        const panelItems = panelRef.current.querySelectorAll(".ai-hero-panel-enter")
        gsap.from(panelItems, {
          x: 56,
          opacity: 0,
          duration: 0.72,
          stagger: 0.09,
          ease: "power3.out",
          delay: 0.28,
        })
      }
    },
    { scope: heroRef },
  )

  const goTo = useCallback((i: number) => {
    setIdx(i)
    setProgress(0)
  }, [])

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setIdx((current) => (current + 1) % heroTestimonials.length)
          return 0
        }
        return p + (TICK_MS / ROTATE_MS) * 100
      })
    }, TICK_MS)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const testimonial = heroTestimonials[idx]

  return (
    <section
      ref={heroRef}
      className="relative min-h-[94dvh] overflow-hidden bg-[var(--ai-navy-deep)] text-white"
      aria-labelledby="ai-premium-hero-heading"
    >
      <div className="ai-grid-glow" aria-hidden />
      <div className="ai-dots right-[6%] top-[10%] h-64 w-64" aria-hidden />
      <div className="ai-side-rail" aria-hidden>
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1400px] gap-12 px-6 pb-20 pt-28 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:px-12 lg:pb-24 lg:pt-32">
        <div ref={copyRef} className="flex flex-col justify-center">
          <span className="ai-hero-enter ai-pill mb-7 w-fit">{pill}</span>

          <h1 id="ai-premium-hero-heading" className="ai-hero-enter ai-display text-white">
            {headline}
            <br />
            <span className="ai-brace">{"{ "}</span>
            <em className="text-[#9db1ff]">{headlineAccent.replace(/\.$/, "")}</em>
            <span className="ai-brace">{" }"}</span>
          </h1>

          <p className="ai-hero-enter mt-7 max-w-xl text-pretty text-[17px] leading-[1.7] text-white/70 md:text-lg">
            {subhead}
          </p>

          <div className="ai-hero-enter ai-cta-cluster mt-9 w-fit">
            <CalendlyPopupButton
              label="Talk to an expert"
              className="ai-btn ai-btn--solid group"
            />
            <Link href="/case-studies/ai" className="ai-btn ai-btn--outline group">
              View AI case studies
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </Link>
          </div>

          <dl className="ai-hero-enter mt-14 grid grid-cols-3 gap-6 border-t border-white/12 pt-8">
            {stats.map((item) => (
              <div key={item.label}>
                <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  {item.label}
                </dt>
                <dd className="mt-1.5 text-2xl font-semibold tracking-tight md:text-3xl">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div ref={panelRef} className="flex flex-col gap-4 lg:pt-4">
          <article className="ai-hero-panel-enter ai-card ai-card--dark p-6">
            <span className="ai-badge ai-badge--on-dark">{announcement.badge}</span>
            <h2 className="mt-4 text-xl font-semibold tracking-tight">{announcement.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/62">{announcement.body}</p>
            <Link href={announcement.href} className="ai-link mt-5 inline-flex items-center gap-2">
              Explore programs
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </article>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {cards.map((card) => (
              <article key={card.id} className="ai-hero-panel-enter ai-card ai-card--dark p-5">
                <h3 className="text-sm font-semibold">{card.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/55">{card.body}</p>
              </article>
            ))}
          </div>

          <div className="ai-hero-panel-enter ai-card ai-card--dark relative overflow-hidden p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">
                Client proof
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  className="ai-icon-btn"
                  onClick={() => goTo((idx - 1 + heroTestimonials.length) % heroTestimonials.length)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  className="ai-icon-btn"
                  onClick={() => goTo((idx + 1) % heroTestimonials.length)}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mb-4 h-px overflow-hidden bg-white/10">
              <div
                className="h-full bg-[var(--ai-accent)]"
                style={{ width: `${progress}%`, transition: `width ${TICK_MS}ms linear` }}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: DUR.panel, ease: EASE_T.silk }}
              >
                <p className="text-sm leading-relaxed text-white/85">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[4px] bg-white/10 font-mono text-xs font-bold">
                    {getInitials(testimonial.name)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-white/55">
                      {testimonial.role} · {testimonial.company}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1 text-[11px] text-white/40">
                      <MapPin className="h-3 w-3" aria-hidden />
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="ai-scroll-cue" aria-hidden>
        <span>Explore the platform</span>
        <div className="ai-scroll-arrows" />
      </div>
    </section>
  )
}
