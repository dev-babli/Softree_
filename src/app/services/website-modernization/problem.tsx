"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { AlertTriangle, Gauge, Layout, Smartphone, ShieldOff, Zap } from "lucide-react"
import { DUR, EASE_T, STAGGER } from "@/lib/motion"

const SIGNS = [
  {
    icon: Gauge,
    title: "Slow load & poor Core Web Vitals",
    body: "LCP above 2.5s costs conversions — Google and buyers both penalise slow sites.",
  },
  {
    icon: Layout,
    title: "Outdated layout & weak hierarchy",
    body: "Visitors cannot find your primary action within 6 seconds of landing.",
  },
  {
    icon: Smartphone,
    title: "Broken mobile experience",
    body: "Tap targets, font sizes, and layouts that fail on phones — where most B2B research starts.",
  },
  {
    icon: ShieldOff,
    title: "Thin trust & social proof",
    body: "No named testimonials, case metrics, or certifications near your main CTA.",
  },
  {
    icon: AlertTriangle,
    title: "Generic positioning",
    body: "Your copy sounds like every competitor — no clear why-us in the first screen.",
  },
  {
    icon: Zap,
    title: "Legacy stack holding you back",
    body: "WordPress plugins, page builders, or unmaintained React — hard to ship CRO wins.",
  },
] as const

export default function ModernizationProblem() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      ref={ref}
      aria-labelledby="wm-problem-heading"
      className="bg-[#F3F0EE] py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5812]">
            The problem
          </p>
          <h2
            id="wm-problem-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl"
          >
            Six signs your website needs modernisation
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-600">
            A cosmetic refresh will not fix these. You need a conversion architecture
            backed by data — that is what the AI blueprint diagnoses first.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SIGNS.map((sign, i) => (
            <motion.li
              key={sign.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: DUR.card,
                delay: i * STAGGER.default,
                ease: EASE_T.out,
              }}
              className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm"
            >
              <sign.icon className="h-5 w-5 text-[#FF5812]" aria-hidden />
              <h3 className="mt-4 text-lg font-semibold text-zinc-900">{sign.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{sign.body}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
