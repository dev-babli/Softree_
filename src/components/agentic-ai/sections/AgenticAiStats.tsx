"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useSpring, useTransform } from "framer-motion"

import { EASE_T, prefersReducedMotion } from "@/lib/motion"
import { AgenticSection } from "../primitives/AgenticSection"
import { proofStats } from "../data"

function StatCell({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const numeric = parseInt(value.replace(/\D/g, ""), 10) || 0
  const suffix = value.replace(/[0-9]/g, "")
  const reduced = prefersReducedMotion()
  const startValue = reduced ? numeric : Math.max(1, Math.round(numeric * 0.72))
  const spring = useSpring(startValue, { stiffness: 95, damping: 22, restDelta: 0.5 })
  const display = useTransform(spring, (v) => Math.round(v))
  const [shown, setShown] = useState(reduced ? numeric : startValue)

  useEffect(() => {
    const unsub = display.on("change", setShown)
    return unsub
  }, [display])

  useEffect(() => {
    if (!inView || reduced) return
    const t = setTimeout(() => spring.set(numeric), delay * 1000)
    return () => clearTimeout(t)
  }, [inView, spring, numeric, delay, reduced])

  const displayValue = reduced ? numeric : inView ? shown : numeric

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE_T.silk }}
      className="border-t border-[#0a0a1a]/10 py-10 sm:border-t-0 sm:border-l sm:py-0 sm:pl-8 first:sm:border-l-0 first:sm:pl-0"
    >
      <p
        className="font-bold tabular-nums tracking-tighter text-[#0a0a1a]"
        style={{ fontSize: "clamp(48px, 8vw, 88px)", lineHeight: 0.95 }}
      >
        {displayValue}
        {suffix}
      </p>
      <p className="mt-3 text-sm font-medium text-[#0a0a1a]/60">{label}</p>
    </motion.div>
  )
}

export function AgenticAiStats() {
  return (
    <AgenticSection badge="Proof in numbers" headline="Delivery metrics that compound" variant="white">
      <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
        {proofStats.map((stat, i) => (
          <StatCell key={stat.label} value={stat.value} label={stat.label} delay={i * 0.06} />
        ))}
      </div>
    </AgenticSection>
  )
}
