"use client"

import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  BarChart3,
  FileSearch,
  LayoutTemplate,
  ScanSearch,
  Hammer,
} from "lucide-react"
import { trackModernizationEvent } from "./analytics"

gsap.registerPlugin(ScrollTrigger)

const STAGES = [
  {
    id: "scan",
    step: "01",
    title: "Website scan",
    subtitle: "Surface-level health check",
    body: "AI reads your homepage and flags UX, CRO, SEO, and performance issues with severity scores.",
    icon: ScanSearch,
  },
  {
    id: "crawl",
    step: "02",
    title: "Trust & content crawl",
    subtitle: "Positioning audit",
    body: "Deep pass on messaging, proof density, E-E-A-T signals, and whether your story matches buyer intent.",
    icon: FileSearch,
  },
  {
    id: "competitors",
    step: "03",
    title: "Competitor gap analysis",
    subtitle: "See where you lose",
    body: "Side-by-side comparison on trust, CTAs, content depth, and clarity versus category peers.",
    icon: BarChart3,
  },
  {
    id: "wireframe",
    step: "04",
    title: "Wireframe blueprint",
    subtitle: "What modern could look like",
    body: "Annotated layout blocks for hero, proof, services, and CTA — a starting point for redesign, not final design.",
    icon: LayoutTemplate,
  },
  {
    id: "build",
    step: "05",
    title: "Build with Softree",
    subtitle: "From blueprint to live site",
    body: "Next.js, headless CMS, CRO, and performance — delivered by an ISO-certified offshore engineering team.",
    icon: Hammer,
  },
] as const

export default function ModernizationPipeline() {
  const rootRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const progressRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const trackedRef = useRef<Set<number>>(new Set())
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!trackedRef.current.has(activeIndex)) {
      trackedRef.current.add(activeIndex)
      trackModernizationEvent("pipeline_stage_view", {
        stage: STAGES[activeIndex].id,
        index: activeIndex,
      })
    }
  }, [activeIndex])

  useGSAP(
    () => {
      if (!rootRef.current || !pinRef.current || reducedMotion) return

      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]
      if (!cards.length) return

      gsap.set(cards, { opacity: 0, y: 40, scale: 0.96 })
      gsap.set(cards[0], { opacity: 1, y: 0, scale: 1 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: `+=${STAGES.length * 80}%`,
          pin: pinRef.current,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              STAGES.length - 1,
              Math.floor(self.progress * STAGES.length),
            )
            setActiveIndex(idx)
          },
        },
      })

      if (progressRef.current) {
        tl.to(progressRef.current, { scaleX: 1, ease: "none" }, 0)
      }

      cards.forEach((card, i) => {
        if (i === 0) return
        const t = i / STAGES.length
        tl.to(
          cards[i - 1],
          { opacity: 0, y: -24, scale: 0.96, duration: 0.2, ease: "power2.in" },
          t,
        ).to(
          card,
          { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: "power2.out" },
          t + 0.05,
        )
      })

      return () => ScrollTrigger.getAll().forEach((t) => t.kill())
    },
    { scope: rootRef, dependencies: [reducedMotion] },
  )

  const stage = STAGES[activeIndex]
  const StageIcon = stage.icon

  return (
    <section
      ref={rootRef}
      aria-labelledby="wm-pipeline-heading"
      className="relative bg-[#050508] text-white"
    >
      <div
        ref={pinRef}
        className="flex h-[100svh] flex-col justify-center overflow-hidden py-16"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(255,88,18,0.12),transparent)]"
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5812]">
              AI pipeline
            </p>
            <h2
              id="wm-pipeline-heading"
              className="mt-3 text-3xl font-bold tracking-tight md:text-4xl"
            >
              From outdated URL to modernisation blueprint
            </h2>
          </div>

          <div
            className="mt-4 h-1 w-full max-w-md origin-left rounded-full bg-zinc-800"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={STAGES.length}
            aria-valuenow={activeIndex + 1}
            aria-label="Pipeline progress"
          >
            <div
              ref={progressRef}
              className="h-full w-full origin-left rounded-full bg-[#FF5812]"
              style={{ transform: `scaleX(${(activeIndex + 1) / STAGES.length})` }}
            />
          </div>

          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[240px_1fr]">
            <nav aria-label="Pipeline stages" className="hidden lg:block">
              <ol className="space-y-2">
                {STAGES.map((s, i) => (
                  <li key={s.id}>
                    <span
                      className={`block rounded-xl px-4 py-3 text-left transition ${
                        activeIndex === i
                          ? "bg-[#FF5812]/15 ring-1 ring-[#FF5812]/40"
                          : "text-zinc-600"
                      }`}
                      aria-current={activeIndex === i ? "step" : undefined}
                    >
                      <span className="text-xs font-mono text-[#FF5812]">{s.step}</span>
                      <span className="mt-1 block text-sm font-semibold">{s.title}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="relative min-h-[280px]">
              {reducedMotion ? (
                <article className="rounded-2xl border border-white/10 bg-zinc-900/60 p-8">
                  <StageCardContent stage={stage} Icon={StageIcon} />
                </article>
              ) : (
                STAGES.map((s, i) => (
                  <div
                    key={s.id}
                    ref={(el) => {
                      cardRefs.current[i] = el
                    }}
                    className="absolute inset-0 rounded-2xl border border-white/10 bg-zinc-900/60 p-8 backdrop-blur-sm"
                    aria-hidden={activeIndex !== i}
                  >
                    <StageCardContent stage={s} Icon={s.icon} />
                  </div>
                ))
              )}
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-zinc-500 lg:text-left">
            Stage {activeIndex + 1} of {STAGES.length} — scroll to advance
          </p>
        </div>
      </div>
    </section>
  )
}

function StageCardContent({
  stage,
  Icon,
}: {
  stage: (typeof STAGES)[number]
  Icon: (typeof STAGES)[number]["icon"]
}) {
  return (
    <div className="flex items-start gap-5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FF5812]/15">
        <Icon className="h-6 w-6 text-[#FF5812]" aria-hidden />
      </div>
      <div>
        <p className="text-xs font-mono text-[#FF5812]">Stage {stage.step}</p>
        <h3 className="mt-1 text-2xl font-bold">{stage.title}</h3>
        <p className="text-sm text-zinc-500">{stage.subtitle}</p>
        <p className="mt-4 text-base leading-relaxed text-zinc-300">{stage.body}</p>
      </div>
    </div>
  )
}
