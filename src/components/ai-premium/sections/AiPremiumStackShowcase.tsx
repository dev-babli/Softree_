"use client"



import Image from "next/image"

import { useRef } from "react"

import { useGSAP } from "@gsap/react"

import gsap from "gsap"

import { ScrollTrigger } from "gsap/ScrollTrigger"



import { prefersReducedMotion } from "@/lib/motion"

import { stackShowcaseCards } from "../data/agentic-ai-content"



gsap.registerPlugin(ScrollTrigger)



export function AiPremiumStackShowcase() {

  const rootRef = useRef<HTMLElement>(null)

  const pinRef = useRef<HTMLDivElement>(null)

  const cardsRef = useRef<HTMLDivElement>(null)

  const progressRef = useRef<HTMLDivElement>(null)

  const labelRefs = useRef<(HTMLSpanElement | null)[]>([])



  useGSAP(

    () => {

      if (!rootRef.current || !pinRef.current || !cardsRef.current || prefersReducedMotion()) {

        return

      }



      const cards = gsap.utils.toArray<HTMLElement>(".ai-platform-card", cardsRef.current)

      if (cards.length === 0) return



      const labels = labelRefs.current.filter(Boolean) as HTMLSpanElement[]

      const mm = gsap.matchMedia()



      mm.add("(min-width: 768px)", () => {

        gsap.set(cards, { autoAlpha: 0, y: 40, scale: 0.96 })

        gsap.set(cards[0], { autoAlpha: 1, y: 0, scale: 1 })



        const tl = gsap.timeline({

          scrollTrigger: {

            trigger: rootRef.current,

            start: "top top",

            end: "+=220%",

            pin: pinRef.current,

            scrub: 0.65,

            anticipatePin: 1,

            invalidateOnRefresh: true,

          },

        })



        const segment = 1 / Math.max(cards.length - 1, 1)



        cards.forEach((card, i) => {

          if (i === 0) return

          const t = segment * (i - 0.5)

          tl.to(

            cards[i - 1],

            { autoAlpha: 0, y: -32, scale: 0.94, ease: "none", duration: segment },

            t,

          ).to(

            card,

            { autoAlpha: 1, y: 0, scale: 1, ease: "none", duration: segment },

            t,

          )

          if (labels[i - 1] && labels[i]) {

            tl.to(

              labels[i - 1],

              { opacity: 0.35, ease: "none", duration: segment * 0.5 },

              t,

            ).to(

              labels[i],

              { opacity: 1, ease: "none", duration: segment * 0.5 },

              t + segment * 0.5,

            )

          }

        })



        if (progressRef.current) {

          tl.to(

            progressRef.current,

            { scaleX: 1, ease: "none", transformOrigin: "left center" },

            0,

          )

        }



        return () => {

          tl.scrollTrigger?.kill()

          tl.kill()

        }

      })



      mm.add("(max-width: 767px)", () => {

        gsap.set(cards, { clearProps: "all", autoAlpha: 1, y: 0, scale: 1 })

      })



      return () => mm.revert()

    },

    { scope: rootRef },

  )



  return (

    <section

      ref={rootRef}

      className="relative bg-[var(--ai-paper)]"

      aria-labelledby="ai-stack-heading"

    >

      <div

        ref={pinRef}

        className="relative flex min-h-0 items-center overflow-hidden md:min-h-[100svh]"

      >

        <div className="mx-auto grid w-full max-w-[1400px] gap-10 px-6 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-12 lg:py-24">

          <div className="flex flex-col justify-center">

            <span className="ai-pill ai-pill--light mb-6 w-fit">Agentic AI platform</span>

            <h2 id="ai-stack-heading" className="ai-h2 text-[var(--ai-ink)]">

              Intelligence that works <em>for</em> your operators

            </h2>

            <p className="mt-5 max-w-md text-[16px] leading-[1.7] text-[var(--ai-muted)]">

              Copilots, builders, and observability — implemented on the Microsoft stack with

              Softree delivery discipline.

            </p>



            <div className="mt-10 hidden flex-col gap-3 lg:flex" aria-hidden>

              {stackShowcaseCards.map((card, i) => (

                <span

                  key={card.id}

                  ref={(el) => {

                    labelRefs.current[i] = el

                  }}

                  className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ai-ink)]"

                  style={{ opacity: i === 0 ? 1 : 0.35 }}

                >

                  {String(i + 1).padStart(2, "0")} — {card.title}

                </span>

              ))}

            </div>



            <div className="mt-8 hidden h-px w-full max-w-xs overflow-hidden bg-[var(--ai-line)] md:block">

              <div

                ref={progressRef}

                className="h-full w-full origin-left bg-[var(--ai-accent)]"

                style={{ transform: "scaleX(0)" }}

              />

            </div>

          </div>



          <div

            ref={cardsRef}

            className="ai-platform-cards relative mx-auto flex w-full max-w-[720px] flex-col gap-6 md:aspect-[16/11] md:block lg:mx-0 lg:max-w-none"

          >

            {stackShowcaseCards.map((card, index) => (

              <article

                key={card.id}

                className="ai-platform-card relative min-h-[17.5rem] overflow-hidden rounded-lg border border-[var(--ai-line)] bg-white shadow-[0_40px_80px_-40px_rgba(18,20,23,0.35)] md:absolute md:inset-0 md:min-h-0"

                style={{ zIndex: stackShowcaseCards.length - index }}

              >

                <Image

                  src={card.img}

                  alt=""

                  fill

                  className="object-cover"

                  sizes="(max-width: 720px) 100vw, 720px"

                  priority={index === 0}

                />

                <div className="absolute inset-0 bg-gradient-to-t from-[var(--ai-ink)]/90 via-[var(--ai-ink)]/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">

                  <span className="ai-badge ai-badge--on-dark mb-3 inline-flex">Capability</span>

                  <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">

                    {card.title}

                  </h3>

                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/75 md:text-base">

                    {card.desc}

                  </p>

                </div>

              </article>

            ))}

          </div>

        </div>

      </div>

    </section>

  )

}


