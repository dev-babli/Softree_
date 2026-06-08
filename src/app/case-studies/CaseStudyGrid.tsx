"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { ArrowUpRight, TrendingUp, Lock, X, Download, Mail, CheckCircle2, Sparkles } from "lucide-react"
import Image from "next/image"
import { SpotlightCard } from "@/components/qc/shared/SpotlightCard"

// ── Count-up hook: animates a number from 0 to target when inView ──
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
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [inView, target, duration])

  return count
}

// ── ProofStat: single animated stat cell ──
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
        {animated}{stat.suffix}
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
  /** Path to a real project screenshot, e.g. "/images/case-study/web/shopping.png" */
  image?: string
  /** Industry tag shown in the snapshot row */
  industry?: string
  /** Outcome metrics shown visibly on the card */
  metrics?: { label: string; value: string }[]
  /** Extra blurred metrics shown in the gate modal only */
  teaserMetrics?: { label: string; value: string; isBlurred?: boolean }[]
  locked?: boolean
}

interface CaseStudyGridProps {
  items: CaseStudyItem[]
  sectionTitle: string
  sectionSubtitle: string
  accentColor?: string
  /** Pass the distinct category labels to show as filter tabs. Auto-derived if omitted. */
  filterLabels?: string[]
}

// ── Aggregate proof stats derived from items ──
function deriveAggregateStats(items: CaseStudyItem[]) {
  const totalProjects = items.length
  // Count unique industries
  const industries = new Set(items.map(i => i.industry).filter(Boolean)).size
  // Count total metric data points
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
  const getInitialUnlockedStudies = () => {
    if (typeof window === "undefined") {
      return new Set<string>()
    }

    const saved = localStorage.getItem("unlockedCaseStudies")
    if (!saved) {
      return new Set<string>()
    }

    try {
      return new Set<string>(JSON.parse(saved))
    } catch {
      return new Set<string>()
    }
  }

  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const proofBarRef = useRef<HTMLDivElement>(null)
  const isProofInView = useInView(proofBarRef, { once: true, margin: "-60px" })

  const [unlockedStudies, setUnlockedStudies] = useState<Set<string>>(getInitialUnlockedStudies)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedStudy, setSelectedStudy] = useState<CaseStudyItem | null>(null)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [activeFilter, setActiveFilter] = useState("All")
  const [stickyVisible, setStickyVisible] = useState(false)

  // Derive filter labels from items
  const allFilters = ["All", ...(filterLabels ?? Array.from(new Set(items.map(i => i.category))))]
  const { totalProjects, industries, dataPoints } = deriveAggregateStats(items)

  // Sticky proof bar: show after scrolling past section header
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, "change", () => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    setStickyVisible(rect.top < -120 && rect.bottom > 200)
  })

  const handleUnlockClick = (study: CaseStudyItem) => {
    if (unlockedStudies.has(study.title)) {
      // Already unlocked, open case study directly
      window.location.assign(study.href)
    } else {
      // Show unlock modal
      setSelectedStudy(study)
      setModalOpen(true)
    }
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !selectedStudy) return

    setIsSubmitting(true)

    // Real API call — captures lead server-side
    try {
      await fetch("/api/case-study-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          studyTitle: selectedStudy.title,
          studyCategory: selectedStudy.category,
          studyHref: selectedStudy.href,
        }),
      })
    } catch {
      // Non-fatal — still unlock locally
    }

    const newUnlocked = new Set(unlockedStudies)
    newUnlocked.add(selectedStudy.title)
    setUnlockedStudies(newUnlocked)
    localStorage.setItem('unlockedCaseStudies', JSON.stringify([...newUnlocked]))

    setIsSubmitting(false)
    setIsSuccess(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedStudy(null)
    setEmail("")
    setIsSuccess(false)
  }

  const filteredItems = activeFilter === "All"
    ? items
    : items.filter(i => i.category === activeFilter)

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#F8F9FC] py-20 md:py-28"
    >
      {/* ═══════ STICKY PROOF BAR ═══════ */}
      <AnimatePresence>
        {stickyVisible && (
          <motion.div
            initial={{ opacity: 0, y: -48 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -48 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between gap-4 border-b border-[#0a0a1a]/8 bg-white/90 px-6 py-3 backdrop-blur-xl shadow-sm"
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
              <div className="hidden h-3 w-px bg-[#0a0a1a]/10 sm:block" />
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="text-[11px] text-[#0a0a1a]/50">Softree Technology</span>
              </div>
            </div>
            <div className="hidden items-center gap-1 text-[11px] font-semibold sm:flex" style={{ color: accentColor }}>
              {activeFilter !== "All" && (
                <span className="mr-1 rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ backgroundColor: accentColor }}>
                  {activeFilter}
                </span>
              )}
              <span>{filteredItems.length} shown</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">

        {/* ═══════ SECTION HEADER ═══════ */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#1852FF]/20 bg-[#eef4ff] px-4 py-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: accentColor }} />
            <span className="text-sm font-medium" style={{ color: accentColor }}>Case Studies</span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-[#0a0a1a] md:text-4xl lg:text-5xl">
            {sectionTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-base text-[#0a0a1a]/60">
            {sectionSubtitle}
          </p>
        </motion.div>

        {/* ═══════ FILTER TABS ═══════ */}
        <motion.div
          className="mb-10 flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        >
          {allFilters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-4 py-1.5 text-[12px] font-semibold tracking-wide transition-all duration-200 ${activeFilter === filter
                ? "border-transparent text-white shadow-md"
                : "border-[#0a0a1a]/10 bg-white text-[#0a0a1a]/60 hover:border-[#0a0a1a]/20 hover:text-[#0a0a1a]"
                }`}
              style={activeFilter === filter ? { backgroundColor: accentColor } : {}}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* ═══════ AGGREGATE PROOF BAR (inline, fires count-up) ═══════ */}
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

        {/* ═══════ GRID ═══════ */}
        <div ref={containerRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, i) => {
              const isUnlocked = unlockedStudies.has(item.title) || !item.locked

              return (
                <motion.div
                  key={item.title}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                >
                  <button
                    onClick={() => handleUnlockClick(item)}
                    className="group block h-full w-full text-left"
                  >
                    <SpotlightCard
                      color={`${accentColor}73`}
                      intensity={0.5}
                      radius={280}
                      className="h-full overflow-hidden rounded-2xl border border-[#0a0a1a]/5 bg-white shadow-[0_8px_28px_-12px_rgba(10,10,26,0.12)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:shadow-[0_24px_50px_-14px_rgba(24,82,255,0.2)]"
                    >
                      {/* — Real screenshot thumbnail — */}
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
                            style={{ background: `linear-gradient(135deg, ${accentColor}22, ${accentColor}08)` }}
                          >
                            <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: accentColor }}>
                              {item.category}
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />

                        {/* Category badge */}
                        <div className="absolute left-4 top-4 flex gap-2">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                            {item.category}
                          </span>
                          {item.locked && !isUnlocked && (
                            <span className="inline-flex items-center gap-1 rounded-full border border-white/25 bg-orange-500/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                              <Lock className="h-3 w-3" />
                              Premium
                            </span>
                          )}
                        </div>

                        {/* View / Unlock pill */}
                        <div className="absolute bottom-4 right-4">
                          <span className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-medium backdrop-blur-md transition-all ${isUnlocked ? 'border-white/20 bg-white/10 text-white/80' : 'border-orange-400/50 bg-orange-500/30 text-orange-100'}`}>
                            {isUnlocked ? (
                              <><ArrowUpRight className="h-3 w-3" /> Case Study</>
                            ) : (
                              <><Lock className="h-3 w-3" /> Unlock</>
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col p-6">

                        {/* — Snapshot row: Industry + category — */}
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

                        <p className="mb-4 flex-1 text-sm leading-relaxed text-[#0a0a1a]/55 line-clamp-3">
                          {item.description}
                        </p>

                        {/* — Visible outcome metrics — */}
                        {item.metrics && item.metrics.length > 0 && (
                          <div className="mb-4 flex flex-wrap gap-2">
                            {item.metrics.map((m) => (
                              <div
                                key={m.label}
                                className="flex items-center gap-1.5 rounded-lg bg-[#f0f4ff] px-2.5 py-1.5"
                              >
                                <TrendingUp className="h-3 w-3" style={{ color: accentColor }} />
                                <span className="text-[11px] font-black" style={{ color: accentColor }}>{m.value}</span>
                                <span className="text-[10px] text-[#0a0a1a]/40">{m.label}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Locked gate nudge */}
                        {item.locked && !isUnlocked && (
                          <div className="mb-3 flex items-start gap-2 rounded-lg border border-orange-200 bg-orange-50 p-3">
                            <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange-500" />
                            <p className="text-[11px] font-medium leading-relaxed text-orange-800">
                              Enter your email to unlock the full ROI breakdown with complete metrics and implementation details.
                            </p>
                          </div>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-between border-t border-[#0a0a1a]/5 pt-4">
                          <div className="flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1852FF]/10">
                              <span className="text-[10px] font-bold text-[#1852FF]">ST</span>
                            </div>
                            <span className="text-xs text-[#0a0a1a]/50">Softree Technology</span>
                          </div>
                          <span className={`inline-flex items-center gap-1 text-xs font-semibold transition-transform duration-300 group-hover:translate-x-0.5 ${isUnlocked ? 'text-[#1852FF]' : 'text-orange-600'}`}>
                            {isUnlocked ? 'View Case Study' : 'Unlock Case Study'}
                            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                          </span>
                        </div>
                      </div>
                    </SpotlightCard>
                  </button>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* ═══════ ROI UNLOCK MODAL ═══════ */}
      <AnimatePresence>
        {modalOpen && selectedStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>

              {/* Header gradient */}
              <div className="relative h-32 bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700 overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyem0tNiA2aC00djJoNHYtMnptMC02di00aC00djRoNHptLTYgNmgtNHYyaDR2LTJ6bTAtNnYtNGgtNHY0aDR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    <Lock className="h-3 w-3" />
                    Premium Content
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {!isSuccess ? (
                  <>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Unlock the Full Case Study
                    </h3>
                    <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                      Get the complete <strong>{selectedStudy.title}</strong> case study with full metrics, implementation details, and ROI analysis.
                    </p>

                    {/* Teaser metrics preview */}
                    <div className="mb-6 rounded-xl bg-gradient-to-r from-orange-50 to-violet-50 border border-orange-100 p-4">
                      <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-3">Inside this report:</p>
                      <div className="space-y-2">
                        {selectedStudy.teaserMetrics?.map((m, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                            <span className="text-sm text-gray-700 blur-[3px] select-none">{m.value} {m.label}</span>
                          </div>
                        )) || (
                            <>
                              <div className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                                <span className="text-sm text-gray-700 blur-[3px] select-none">47% Cost Reduction</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                                <span className="text-sm text-gray-700 blur-[3px] select-none">$2.3M Annual Savings</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                                <span className="text-sm text-gray-700 blur-[3px] select-none">89% Efficiency Gain</span>
                              </div>
                            </>
                          )}
                      </div>
                    </div>

                    <form onSubmit={handleEmailSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Work Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="email"
                            required
                            placeholder="you@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all text-sm"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 text-white font-semibold text-sm shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Unlocking...
                          </>
                        ) : (
                          <>
                            <Download className="h-4 w-4" />
                            Unlock & View Case Study
                          </>
                        )}
                      </button>
                    </form>

                    <p className="mt-4 text-[11px] text-gray-400 text-center">
                      We&apos;ll send you access details by email. No spam, unsubscribe anytime.
                    </p>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Unlocked! 🎉</h3>
                    <p className="text-sm text-gray-600 mb-6">
                      Check your inbox for confirmation. This case study is now unlocked on this device.
                    </p>
                    <a
                      href={selectedStudy.href}
                      onClick={closeModal}
                      className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 text-white font-semibold text-sm shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      <Download className="h-4 w-4" />
                      Open Case Study
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
