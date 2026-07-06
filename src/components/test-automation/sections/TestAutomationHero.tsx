"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

import { SectionHeader } from "@/components/homepage-light/SectionHeader"
import LetsTalkButton from "@/components/qc/shared/LetsTalkButton"
import { DUR, EASE_T, STAGGER, prefersReducedMotion, subscribePrefersReducedMotion } from "@/lib/motion"

import { testHero } from "../data"

const CYCLING = ["Playwright", "Selenium", "Cypress", "CI/CD gates"] as const
const SIGNALS = ["Risk map", "Automation suite", "CI quality gate"] as const
const DASHBOARD_ROWS = ["Checkout flow", "Permissions", "API contracts", "Visual states"] as const

export function TestAutomationHero() {
  const containerRef = useRef<HTMLElement>(null)
  const introTlRef = useRef<gsap.core.Timeline | null>(null)
  const [wordIdx, setWordIdx] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(true)

  useEffect(() => {
    const update = () => setReduceMotion(prefersReducedMotion())
    update()
    return subscribePrefersReducedMotion(update)
  }, [])

  useEffect(() => {
    if (reduceMotion) return
    const id = setInterval(() => setWordIdx((i) => (i + 1) % CYCLING.length), 2800)
    return () => clearInterval(id)
  }, [reduceMotion])

  useGSAP(
    () => {
      if (!containerRef.current || prefersReducedMotion()) return

      introTlRef.current?.kill()
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      introTlRef.current = tl
      tl.from(".test-hero-fade", {
        y: 32,
        duration: DUR.section,
        stagger: STAGGER.default,
      }).from(".test-hero-stage", { scale: 0.98, duration: DUR.cinematic }, "-=0.45")

      return () => {
        introTlRef.current?.kill()
      }
    },
    { scope: containerRef },
  )

  const { pill, headline, headlineAccent, subhead, stats } = testHero

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
          className="test-hero-fade mb-10 max-w-4xl"
        />

        <div className="test-hero-fade mb-8 flex flex-wrap items-center gap-4">
          <LetsTalkButton className="min-h-11" />
          <Link
            href="#pipeline"
            className="inline-flex min-h-11 items-center rounded-full text-sm font-medium text-[#0a0a1a]/60 underline-offset-4 transition-colors hover:text-[#FF5812] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812]/50 focus-visible:ring-offset-2"
          >
            See the quality pipeline
          </Link>
        </div>

        <div className="test-hero-stage relative mt-4 overflow-hidden rounded-3xl bg-[#0a0a1a] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.25)] md:rounded-[40px]">
          <div className="relative aspect-[16/9] min-h-[480px] w-full sm:min-h-[420px] md:min-h-[460px]">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.28) 42%, rgba(0,0,0,0.76) 100%)",
              }}
            />
            <div className="absolute inset-x-6 top-6 hidden gap-3 sm:grid md:inset-x-10 md:top-10 lg:grid-cols-[1fr_0.8fr]">
              <div className="rounded-2xl border border-white/12 bg-white/[0.08] p-4 text-white">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#FF5812]">
                  Release signal map
                </p>
                <div className="mt-4 grid gap-2">
                  {DASHBOARD_ROWS.map((row, index) => (
                    <div key={row} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-xl bg-white/[0.08] px-3 py-2">
                      <span className="truncate text-sm text-white/80">{row}</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
                        {index === 0 ? "map" : index === 1 ? "build" : index === 2 ? "gate" : "review"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden rounded-2xl border border-white/12 bg-white/[0.08] p-4 text-white md:block">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">
                  Pipeline handoff
                </p>
                <div className="mt-5 flex items-center gap-2">
                  {["Risk", "Suite", "Gate", "Signal"].map((step) => (
                    <div key={step} className="min-w-0 flex-1 rounded-xl border border-white/12 bg-[#FF5812]/15 px-3 py-4 text-center text-xs font-semibold text-white/80">
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-8 md:p-10 lg:p-12">
              <p
                className="font-semibold leading-[0.95] tracking-[-0.04em] text-white"
                style={{ fontSize: "clamp(26px, 5vw, 56px)" }}
              >
                Quality gates for{" "}
                <span className="relative inline-block min-w-[9ch] align-baseline sm:min-w-[12ch]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={CYCLING[wordIdx]}
                      className="inline-block text-[#FF5812]"
                      initial={reduceMotion ? false : { y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? undefined : { y: -12 }}
                      transition={reduceMotion ? { duration: 0 } : { duration: DUR.card, ease: EASE_T.silk }}
                    >
                      {CYCLING[wordIdx]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
                A production-minded automation layer for enterprise releases, not a fragile set of scripts.
              </p>
              <div className="mt-6 grid max-w-2xl gap-2 sm:grid-cols-3">
                {SIGNALS.map((signal, index) => (
                  <div
                    key={signal}
                    className="rounded-xl border border-white/15 bg-white/10 p-3 text-white backdrop-blur-0"
                  >
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#FF5812]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-2 text-sm font-semibold leading-tight">{signal}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="test-hero-fade mt-10 grid gap-4 sm:grid-cols-3 lg:mt-12">
          {stats.map((item) => (
            <div
              key={item.label}
              className="min-w-0 rounded-2xl border border-[var(--legacy-111)]/[0.08] bg-white p-6 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_20px_50px_-28px_rgba(17,17,17,0.12)]"
            >
              <p className="text-2xl font-bold tracking-tight text-[#0a0a1a] md:text-3xl">{item.value}</p>
              <p className="mt-2 text-sm text-[#0a0a1a]/60">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
