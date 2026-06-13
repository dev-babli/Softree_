"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { motion, useInView, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { ArrowUpRight, TrendingUp, Sparkles } from "lucide-react"
import Image from "next/image"
import { SpotlightCard } from "@/components/qc/shared/SpotlightCard"

function useCountUp(target: number, inView: boolean, duration = 1200) {
  const [count, setCount] = useState(0)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    if (!inView) return
    startRef.current = null
    const step = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp
      const elapsed = timestamp - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [inView, target, duration])

  return count
}

function ProofStat({
  stat,
  inView,
  accentColor,
}: {
  stat: { label: string; value: number; suffix: string }
  inView: boolean
  accentColor: string
}) {
  const animated = useCountUp(stat.value, inView)
  return (
    <div className="rounded-2xl border border-[#0a0a1a]/5 bg-white p-4 text-center shadow-sm">
      <div className="mb-1 text-[28px] font-black leading-none tracking-tight" style={{ color: accentColor }}>
        {animated}
        {stat.suffix}
      </div>
      <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#0a0a1a]/40">
        {stat.label}
      </div>
    </div>
  )
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export type CaseStudyItem = {
  title: string
  description: string
  href: string
  category: string
  image?: string
  industry?: string
  metrics?: { label: string; value: string }[]
}

interface CaseStudyGridProps {
  items: CaseStudyItem[]
  sectionTitle: string
  sectionSubtitle: string
  accentColor?: string
  filterLabels?: string[]
}

function deriveAggregateStats(items: CaseStudyItem[]) {
  const totalProjects = items.length
  const industries = new Set(items.map((i) => i.industry).filter(Boolean)).size
  const dataPoints = items.reduce((acc, i) => acc + (i.metrics?.length ?? 0), 0)
  return { totalProjects, industries, dataPoints }
}

export default function CaseStudyGrid({
  items,
  sectionTitle,
  sectionSubtitle,
  accentColor = "#1852FF",
  filterLabels,
}: CaseStudyGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const proofBarRef = useRef<HTMLDivElement>(null)
  const isProofInView = useInView(proofBarRef, { once: true, margin: "-60px" })

  const [activeFilter, setActiveFilter] = useState("All")
  const [stickyVisible, setStickyVisible] = useState(false)

  const allFilters = ["All", ...(filterLabels ?? Array.from(new Set(items.map((i) => i.category))))]
  const { totalProjects, industries, dataPoints } = deriveAggregateStats(items)

  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, "change", () => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const nextVisible = rect.top < -120 && rect.bottom > 200
    setStickyVisible((prev) => (prev === nextVisible ? prev : nextVisible))
  })

  const filteredItems =
    activeFilter === "All" ? items : items.filter((i) => i.category === activeFilter)

  return (
    <section ref={sectionRef} className="w-full bg-[#F8F9FC] py-20 md:py-28">
      <AnimatePresence>
        {stickyVisible && (
          <motion.div
            initial={{ opacity: 0, y: -48 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -48 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between gap-4 border-b border-[#0a0a1a]/8 bg-white/90 px-6 py-3 shadow-sm backdrop-blur-xl"
          >
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5" style={{ color: accentColor }} />
                <span className="text-[11px] font-bold text-[#0a0a1a]">{totalProjects}</span>
                <span className="text-[11px] text-[#0a0a1a]/50">projects</span>
              </div>
              <div className="hidden h-3 w-px bg-[#0a0a1a]/10 sm:block" />
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#0a0a1a]">{industries}+</span>
                <span className="text-[11px] text-[#0a0a1a]/50">industries</span>
              </div>
              <div className="hidden h-3 w-px bg-[#0a0a1a]/10 sm:block" />
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#0a0a1a]">{dataPoints}</span>
                <span className="text-[11px] text-[#0a0a1a]/50">measured outcomes</span>
              </div>
            </div>
            <div
              className="hidden items-center gap-1 text-[11px] font-semibold sm:flex"
              style={{ color: accentColor }}
            >
              {activeFilter !== "All" && (
                <span
                  className="mr-1 rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
                  style={{ backgroundColor: accentColor }}
                >
                  {activeFilter}
                </span>
              )}
              <span>{filteredItems.length} shown</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#1852FF]/20 bg-[#eef4ff] px-4 py-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: accentColor }} />
            <span className="text-sm font-medium" style={{ color: accentColor }}>
              Case Studies
            </span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-[#0a0a1a] md:text-4xl lg:text-5xl">
            {sectionTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-base text-[#0a0a1a]/60">{sectionSubtitle}</p>
        </motion.div>

        <motion.div
          className="mb-10 flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        >
          {allFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-4 py-1.5 text-[12px] font-semibold tracking-wide transition-all duration-200 ${
                activeFilter === filter
                  ? "border-transparent text-white shadow-md"
                  : "border-[#0a0a1a]/10 bg-white text-[#0a0a1a]/60 hover:border-[#0a0a1a]/20 hover:text-[#0a0a1a]"
              }`}
              style={activeFilter === filter ? { backgroundColor: accentColor } : {}}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        <motion.div
          ref={proofBarRef}
          className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
        >
          {[
            { label: "Projects delivered", value: totalProjects, suffix: "+" },
            { label: "Industries served", value: industries, suffix: "+" },
            { label: "Measured outcomes", value: dataPoints, suffix: "" },
            { label: "Client satisfaction", value: 4, suffix: ".9 / 5" },
          ].map((stat) => (
            <ProofStat key={stat.label} stat={stat} inView={isProofInView} accentColor={accentColor} />
          ))}
        </motion.div>

        <div ref={containerRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, i) => (
              <motion.div
                key={item.href}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
              >
                <Link href={item.href} className="group block h-full">
                  <SpotlightCard
                    color={`${accentColor}73`}
                    intensity={0.5}
                    radius={280}
                    className="h-full overflow-hidden rounded-2xl border border-[#0a0a1a]/5 bg-white shadow-[0_8px_28px_-12px_rgba(10,10,26,0.12)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:shadow-[0_24px_50px_-14px_rgba(24,82,255,0.2)]"
                  >
                    <div className="relative h-48 overflow-hidden bg-[#e8ecf4]">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div
                          className="absolute inset-0 flex items-center justify-center"
                          style={{
                            background: `linear-gradient(135deg, ${accentColor}22, ${accentColor}08)`,
                          }}
                        >
                          <span
                            className="text-[11px] font-semibold uppercase tracking-wider"
                            style={{ color: accentColor }}
                          >
                            {item.category}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />

                      <div className="absolute left-4 top-4 flex gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                          {item.category}
                        </span>
                      </div>

                      <div className="absolute bottom-4 right-4">
                        <span className="flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-medium text-white/80 backdrop-blur-md">
                          <ArrowUpRight className="h-3 w-3" />
                          Case Study
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      {item.industry && (
                        <div className="mb-3 flex flex-wrap items-center gap-1.5">
                          <span className="rounded-md bg-[#f4f6fb] px-2 py-0.5 text-[10px] font-medium text-[#0a0a1a]/50">
                            {item.industry}
                          </span>
                          <span className="text-[#0a0a1a]/20">·</span>
                          <span className="rounded-md bg-[#f4f6fb] px-2 py-0.5 text-[10px] font-medium text-[#0a0a1a]/50">
                            Softree Technology
                          </span>
                        </div>
                      )}

                      <h3 className="mb-3 text-lg font-bold leading-snug tracking-[-0.01em] text-[#0a0a1a] transition-colors duration-300 group-hover:text-[#1852FF]">
                        {item.title}
                      </h3>

                      <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-[#0a0a1a]/55">
                        {item.description}
                      </p>

                      {item.metrics && item.metrics.length > 0 && (
                        <div className="mb-4 flex flex-wrap gap-2">
                          {item.metrics.map((m) => (
                            <div
                              key={m.label}
                              className="flex items-center gap-1.5 rounded-lg bg-[#f0f4ff] px-2.5 py-1.5"
                            >
                              <TrendingUp className="h-3 w-3" style={{ color: accentColor }} />
                              <span className="text-[11px] font-black" style={{ color: accentColor }}>
                                {m.value}
                              </span>
                              <span className="text-[10px] text-[#0a0a1a]/40">{m.label}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="mt-auto flex items-center justify-between border-t border-[#0a0a1a]/5 pt-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1852FF]/10">
                            <span className="text-[10px] font-bold text-[#1852FF]">ST</span>
                          </div>
                          <span className="text-xs text-[#0a0a1a]/50">Softree Technology</span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1852FF] transition-transform duration-300 group-hover:translate-x-0.5">
                          View Case Study
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                        </span>
                      </div>
                    </div>
                  </SpotlightCard>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
