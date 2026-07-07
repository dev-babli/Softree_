"use client"

import Image from "next/image"
import { getInitials } from "@/lib/text";
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react"

import LetsTalkButton from "@/components/qc/shared/LetsTalkButton"
import { SectionHeader } from "@/components/homepage-light/SectionHeader"
import { SpotlightCard } from "@/components/qc/shared/SpotlightCard"
import { DUR, EASE_T, STAGGER, prefersReducedMotion } from "@/lib/motion"

import { genHero, heroTestimonials } from "../data"

const CYCLING = ["Azure OpenAI", "Copilot", "RAG systems", "Fine-tuning"] as const
const HERO_IMG = "/service_image/ai.jpg"
const ROTATE_MS = 6000

export function GenAiHero() {
  const containerRef = useRef<HTMLElement>(null)
  const [wordIdx, setWordIdx] = useState(0)
  const [reviewIdx, setReviewIdx] = useState(0)
  const [progress, setProgress] = useState(0)

  const goReview = useCallback((i: number) => {
    setReviewIdx(i)
    setProgress(0)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = setInterval(() => setWordIdx((i) => (i + 1) % CYCLING.length), 2800)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion()) {
      setProgress(100)
      return
    }

    let frame = 0
    let start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      if (elapsed >= ROTATE_MS) {
        setReviewIdx((c) => (c + 1) % heroTestimonials.length)
        return
      }
      setProgress((elapsed / ROTATE_MS) * 100)
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [reviewIdx])

  useGSAP(
    () => {
      if (!containerRef.current || prefersReducedMotion()) return

      const runIntro = () => {
        if (!containerRef.current) return
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
        tl.from(".gen-hero-fade", {
          y: 32,
          opacity: 0,
          duration: DUR.section,
          stagger: STAGGER.default,
        }).from(".gen-hero-stage", { scale: 0.98, opacity: 0, duration: DUR.cinematic }, "-=0.45")
      }

      if (document.documentElement.classList.contains("generative-ai-ready")) {
        runIntro()
        return
      }

      const onReady = () => runIntro()
      window.addEventListener("generative-ai:ready", onReady, { once: true })
      return () => window.removeEventListener("generative-ai:ready", onReady)
    },
    { scope: containerRef },
  )

  const review = heroTestimonials[reviewIdx]
  const { pill, headline, headlineAccent, subhead, stats } = genHero

  return (
    <section ref={containerRef} className="relative isolate w-full overflow-hidden bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 pb-12 pt-4 sm:px-6 md:px-8 md:pb-16 lg:px-10">
        <SectionHeader
          as="h1"
          badge={pill}
          accent="#FF5812"
          headline={
            <>
              {headline}
              <br />
              <span className="text-[#FF5812]">{headlineAccent}</span>
            </>
          }
          body={subhead}
          className="gen-hero-fade mb-10 max-w-4xl"
        />

        <div className="gen-hero-fade mb-8 flex flex-wrap items-center gap-4">
          <LetsTalkButton />
          <Link
            href="/case-studies/ai"
            className="inline-flex min-h-11 items-center text-sm font-medium text-[#0a0a1a]/60 underline-offset-4 transition-colors hover:text-[#FF5812] hover:underline"
          >
            View AI case studies
          </Link>
        </div>

        <div className="gen-hero-stage relative mt-4 overflow-hidden rounded-3xl bg-[#0a0a1a] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.25)] md:rounded-[40px]">
          <div className="relative aspect-[16/9] min-h-[280px] w-full sm:min-h-[320px] md:min-h-[420px]">
            <Image
              src={HERO_IMG}
              alt="Enterprise team building generative AI solutions"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1440px) 100vw, 1440px"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.7) 100%)",
              }}
            />
            <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-8 md:p-10 lg:p-12">
              <p
                className="font-semibold leading-[0.95] tracking-[-0.04em] text-white"
                style={{ fontSize: "clamp(26px, 5vw, 56px)" }}
              >
                Generative AI on{" "}
                <span className="relative inline-block min-w-[9ch] align-baseline sm:min-w-[12ch]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={CYCLING[wordIdx]}
                      className="inline-block text-[#FF5812]"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: DUR.card, ease: EASE_T.silk }}
                    >
                      {CYCLING[wordIdx]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
                Copilots, LLM apps, and automation with guardrails, grounding, and monitoring built in.
              </p>
            </div>
          </div>
        </div>

        <div className="gen-hero-fade mt-10 grid gap-4 sm:grid-cols-3 lg:mt-12">
          {stats.map((item) => (
            <SpotlightCard
              key={item.label}
              color="rgba(255, 88, 18, 0.35)"
              className="min-w-0 rounded-2xl border border-[var(--legacy-111)]/[0.08] bg-white p-6 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_20px_50px_-28px_rgba(17,17,17,0.12)]"
            >
              <p className="text-2xl font-bold tracking-tight text-[#0a0a1a] md:text-3xl">{item.value}</p>
              <p className="mt-2 text-sm text-[#0a0a1a]/60">{item.label}</p>
            </SpotlightCard>
          ))}
        </div>

        <SpotlightCard
          color="rgba(255, 88, 18, 0.35)"
          className="gen-hero-fade mt-6 rounded-2xl border border-[var(--legacy-111)]/[0.08] bg-[#f8f4ec] p-6 md:p-8"
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0a0a1a]/50">Client proof</p>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#0a0a1a]/10 bg-white transition-colors hover:border-[#FF5812]/30"
                onClick={() => goReview((reviewIdx - 1 + heroTestimonials.length) % heroTestimonials.length)}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#0a0a1a]/10 bg-white transition-colors hover:border-[#FF5812]/30"
                onClick={() => goReview((reviewIdx + 1) % heroTestimonials.length)}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="mb-4 h-px overflow-hidden bg-[#0a0a1a]/10">
            <div className="h-full bg-[#FF5812]" style={{ width: `${progress}%` }} />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: DUR.panel, ease: EASE_T.silk }}
            >
              <p className="text-base leading-relaxed text-[#0a0a1a]/80">&ldquo;{review.text}&rdquo;</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FF5812]/10 text-xs font-bold text-[#FF5812]">
                  {getInitials(review.name)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#0a0a1a]">{review.name}</p>
                  <p className="text-xs text-[#0a0a1a]/55">
                    {review.role} · {review.company}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 text-[11px] text-[#0a0a1a]/45">
                    <MapPin className="h-3 w-3 shrink-0" aria-hidden />
                    {review.location}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </SpotlightCard>
      </div>
    </section>
  )
}
