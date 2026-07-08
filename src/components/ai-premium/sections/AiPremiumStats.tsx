"use client"



import { useRef } from "react"

import { useGSAP } from "@gsap/react"

import gsap from "gsap"

import { ScrollTrigger } from "gsap/ScrollTrigger"



import { DUR, EASE, prefersReducedMotion } from "@/lib/motion"



import { AiReveal } from "../primitives/AiReveal"

import { proofStats } from "../data/agentic-ai-content"



gsap.registerPlugin(ScrollTrigger)



function parseStatValue(value: string) {

  const numMatch = value.match(/[\d.]+/)

  if (!numMatch) return null



  const target = parseFloat(numMatch[0])

  const prefix = value.slice(0, numMatch.index ?? 0)

  const suffix = value.slice((numMatch.index ?? 0) + numMatch[0].length)



  return { target, prefix, suffix, isInteger: Number.isInteger(target) }

}



export function AiPremiumStats() {

  const sectionRef = useRef<HTMLElement>(null)



  useGSAP(

    () => {

      if (!sectionRef.current || prefersReducedMotion()) return



      const counters = gsap.utils.toArray<HTMLElement>(

        "[data-stat-value]",

        sectionRef.current,

      )



      counters.forEach((el) => {

        const raw = el.dataset.statValue

        if (!raw) return



        const parsed = parseStatValue(raw)

        if (!parsed) return



        const { target, prefix, suffix, isInteger } = parsed

        const proxy = { val: 0 }



        ScrollTrigger.create({

          trigger: el,

          start: "top 85%",

          once: true,

          onEnter: () => {

            gsap.to(proxy, {

              val: target,

              duration: DUR.section,

              ease: EASE.silk,

              onUpdate: () => {

                const n = isInteger

                  ? Math.round(proxy.val)

                  : proxy.val.toFixed(1)

                el.textContent = `${prefix}${n}${suffix}`

              },

            })

          },

        })

      })

    },

    { scope: sectionRef },

  )



  return (

    <section

      ref={sectionRef}

      className="relative overflow-hidden bg-[var(--ai-cream)] py-20 md:py-28"

      aria-label="Softree AI delivery metrics"

    >

      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">

        <AiReveal>

          <span className="ai-pill ai-pill--light mb-6">Proof in numbers</span>

        </AiReveal>

        <hr className="ai-rule" />

        <dl className="grid sm:grid-cols-2 lg:grid-cols-4">

          {proofStats.map((stat, i) => (

            <div

              key={stat.label}

              className={`py-10 sm:px-8 ${i > 0 ? "border-t border-[var(--ai-line)] sm:border-t-0 sm:border-l" : ""}`}

            >

              <dd

                className="ai-stat-huge tabular-nums text-[var(--ai-ink)]"

                data-stat-value={stat.value}

              >

                {stat.value}

              </dd>

              <dt className="mt-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ai-muted)]">

                {stat.label}

              </dt>

            </div>

          ))}

        </dl>

        <hr className="ai-rule" />

      </div>

    </section>

  )

}


