"use client"

import Image from "next/image"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { prefersReducedMotion } from "@/lib/motion"
import { stackShowcaseCards } from "../data"
import { KoreHairline, KoreMonoLabel } from "../primitives/SoftreeAgenticPrimitives"
import { KORE } from "../primitives/softree-ui-tokens"

gsap.registerPlugin(ScrollTrigger)

export function AgenticAiPlatform() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([])

  useGSAP(
    () => {
      if (!sectionRef.current || !pinRef.current || !cardsRef.current || prefersReducedMotion()) return

      const cards = gsap.utils.toArray<HTMLElement>(".k-platform-card", cardsRef.current)
      if (!cards.length) return

      const labels = labelRefs.current.filter(Boolean) as HTMLSpanElement[]
      const mm = gsap.matchMedia()

      mm.add("(min-width: 768px)", () => {
        gsap.set(cards, { autoAlpha: 0, y: 40, scale: 0.96 })
        gsap.set(cards[0], { autoAlpha: 1, y: 0, scale: 1 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=220%",
            pin: pinRef.current,
            scrub: 0.65,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressRef.current) {
                progressRef.current.style.width = `${self.progress * 100}%`
              }
              const idx = Math.min(cards.length - 1, Math.floor(self.progress * cards.length))
              labels.forEach((label, i) => {
                label.style.color = i === idx ? KORE.accent : `${KORE.ink}66`
              })
            },
          },
        })

        const segment = 1 / Math.max(cards.length - 1, 1)
        cards.forEach((card, i) => {
          if (i === 0) return
          const t = segment * (i - 0.5)
          tl.to(cards[i - 1], { autoAlpha: 0, y: -32, scale: 0.94, ease: "none", duration: segment }, t).to(
            card,
            { autoAlpha: 1, y: 0, scale: 1, ease: "none", duration: segment },
            t,
          )
        })
      })

      return () => mm.revert()
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className="relative w-full bg-white" aria-labelledby="platform-heading">
      <div ref={pinRef} className="mx-auto max-w-[1400px] px-6 py-20 md:py-24 lg:px-12 lg:py-28">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <KoreMonoLabel>Agentic AI platform</KoreMonoLabel>
            <h2
              id="platform-heading"
              className="mt-4 text-[clamp(32px,5vw,52px)] font-medium leading-[1.05] tracking-[-0.03em]"
              style={{ color: KORE.ink }}
            >
              Intelligence that works{" "}
              <span className="italic" style={{ color: KORE.accent }}>
                for
              </span>{" "}
              your operators
            </h2>
          </div>
          <p className="max-w-lg text-base leading-relaxed lg:pb-1" style={{ color: `${KORE.ink}88` }}>
            Copilots, builders, and observability — implemented on the Microsoft stack with Softree delivery discipline.
          </p>
        </div>

        <KoreHairline className="mb-10" />

        {/* Mobile: static stack */}
        <div className="flex flex-col gap-8 md:hidden">
          {stackShowcaseCards.map((item, i) => (
            <article key={item.id} className="overflow-hidden rounded-2xl border" style={{ borderColor: KORE.hairline }}>
              <div className="relative aspect-[4/3]">
                <Image src={item.img} alt={item.title} fill className="object-cover object-top" sizes="100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e0c] via-transparent to-transparent" />
                <div className="absolute bottom-0 p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">0{i + 1}</p>
                  <h3 className="mt-1 text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-white/75">{item.desc}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Desktop: pinned crossfade */}
        <div className="hidden gap-10 md:grid lg:grid-cols-[1fr_0.42fr]">
          <div
            ref={cardsRef}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl border bg-[#0c0e0c]"
            style={{ borderColor: KORE.hairline }}
          >
            {stackShowcaseCards.map((item, i) => (
              <div key={item.id} className="k-platform-card absolute inset-0">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 900px) 100vw, 700px"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e0c] via-[#0c0e0c]/25 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                  <span className="mb-3 inline-flex rounded-full border border-white/20 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-white/60">
                    Capability 0{i + 1}
                  </span>
                  <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">{item.title}</h3>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/75 md:text-base">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-center">
            {stackShowcaseCards.map((item, index) => (
              <span
                key={item.id}
                ref={(el) => {
                  labelRefs.current[index] = el
                }}
                className="border-b py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors last:border-b-0"
                style={{
                  borderColor: KORE.hairline,
                  color: index === 0 ? KORE.accent : `${KORE.ink}66`,
                }}
              >
                0{index + 1} · {item.title}
              </span>
            ))}
            <div className="mt-6 h-1 overflow-hidden rounded-full bg-[#121417]/8">
              <div
                ref={progressRef}
                className="h-full w-0 rounded-full"
                style={{ backgroundColor: KORE.accent }}
              />
            </div>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: `${KORE.ink}55` }}>
              Scroll to explore capabilities
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
