"use client"

import { useRef, useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { TrendingUp, Sparkles, Search, X, ShieldCheck, Layers, SlidersHorizontal } from "lucide-react"
import Image from "next/image"
import { FlowButton } from "@/components/ui/flow-button"

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export type CaseStudyItem = {
  title: string
  description: string
  href: string
  category: string
  image?: string
  industry?: string
  metrics?: { label: string; value: string }[]
  technologies?: string[]
}

interface CaseStudyGridProps {
  items: CaseStudyItem[]
  sectionTitle: string
  sectionSubtitle: string
  accentColor?: string
  filterLabels?: string[]
}

function renderAdvancedTitle(title: string) {
  const trimmed = title.trim()
  const words = trimmed.split(/\s+/)
  if (words.length <= 1) return trimmed

  const lastWord = words.pop()
  const mainPart = words.join(" ")

  return (
    <>
      <span>{mainPart} </span>
      <span className="bg-gradient-to-r from-[#FF5812] via-[#FF6A26] to-[#E54807] bg-clip-text text-transparent">
        {lastWord}{lastWord?.endsWith(".") ? "" : "."}
      </span>
    </>
  )
}

export default function CaseStudyGrid({
  items,
  sectionTitle,
  sectionSubtitle,
  accentColor = "#FF5812",
  filterLabels,
}: CaseStudyGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const [activeFilter, setActiveFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [stickyVisible, setStickyVisible] = useState(false)

  const allFilters = ["All", ...(filterLabels ?? Array.from(new Set(items.map((i) => i.category))))]
  const totalProjects = items.length

  // Extract top popular technologies dynamically
  const popularTechs = useMemo(() => {
    const counts: Record<string, number> = {}
    items.forEach((item) => {
      (item.technologies || []).forEach((t) => {
        counts[t] = (counts[t] || 0) + 1
      })
    })
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([tech]) => tech)
  }, [items])

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const nextVisible = rect.top < -120 && rect.bottom > 200
      setStickyVisible(nextVisible)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesFilter = activeFilter === "All" || item.category === activeFilter
      if (!matchesFilter) return false
      if (!searchQuery.trim()) return true
      const q = searchQuery.toLowerCase().trim()
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.industry && item.industry.toLowerCase().includes(q)) ||
        (item.technologies && item.technologies.some((t) => t.toLowerCase().includes(q)))
      )
    })
  }, [items, activeFilter, searchQuery])

  return (
    <section ref={sectionRef} className="relative w-full bg-[#F8F9FC] pt-10 pb-20 md:pt-14 md:pb-28 overflow-hidden">
      {/* Ambient architectural lighting & grid backdrop */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[360px] bg-gradient-to-b from-[#FF5812]/[0.05] via-[#FF5812]/[0.015] to-transparent rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#0a0a1a_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.02]" />
      </div>

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
                <Sparkles className="h-3.5 w-3.5 text-[#FF5812]" />
                <span className="text-[11px] font-bold text-[#FF5812]">{totalProjects}+</span>
                <span className="text-[11px] text-[#0a0a1a]/50">projects delivered</span>
              </div>
            </div>
            <div className="hidden items-center gap-1 text-[11px] font-semibold text-[#FF5812] sm:flex">
              {activeFilter !== "All" && (
                <span className="mr-1 rounded-full bg-[#FF5812] px-2 py-0.5 text-[10px] font-bold text-white">
                  {activeFilter}
                </span>
              )}
              <span>{filteredItems.length} shown</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* ADVANCED HEADER SECTION */}
        <div className="mb-12 lg:mb-16">
          {/* Eyebrow with Hardware Double-Bezel Architecture */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-5 flex flex-wrap items-center gap-3"
          >
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#FF5812]/20 bg-white/95 px-3.5 py-1.5 shadow-[0_2px_12px_rgba(255,88,18,0.06)] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF5812] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF5812]" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0a0a1a]">
                Case Studies
              </span>
              <span className="h-3 w-px bg-[#0a0a1a]/15" />
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#FF5812]">
                Enterprise Impact
              </span>
            </div>

            <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[#0a0a1a]/6 bg-white/70 px-3 py-1 text-[11px] font-medium text-[#0a0a1a]/60 backdrop-blur-xs">
              <Sparkles className="h-3 w-3 text-[#FF5812]" />
              <span>Production Deployments</span>
            </div>
          </motion.div>

          {/* Asymmetrical 2-Column Split */}
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 lg:items-end">
            {/* Left: Monumental Typography & Number of Projects */}
            <motion.div
              className="lg:col-span-7 xl:col-span-8"
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
            >
              <h2 className="text-3xl font-black tracking-[-0.035em] text-[#0a0a1a] sm:text-4xl md:text-5xl lg:text-[54px] lg:leading-[1.08]">
                {renderAdvancedTitle(sectionTitle)}
              </h2>

              <p className="mt-4 max-w-2xl text-[15px] sm:text-base lg:text-[17px] leading-relaxed text-[#0a0a1a]/65 font-normal">
                {sectionSubtitle}
              </p>

              {/* Number of Projects Display: Advanced, in brand orange, without card */}
              <div className="mt-8 flex flex-wrap items-center gap-6 sm:gap-8">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight bg-gradient-to-br from-[#FF5812] via-[#FF6A26] to-[#E54807] bg-clip-text text-transparent">
                    {activeFilter === "All" && !searchQuery.trim() ? `${totalProjects}+` : filteredItems.length}
                  </span>
                  <div className="flex flex-col justify-center">
                    <span className="text-xs sm:text-[13px] font-black uppercase tracking-[0.16em] text-[#0a0a1a]">
                      Projects Delivered
                    </span>
                    <span className="text-[11px] font-medium text-[#0a0a1a]/50 flex items-center gap-1.5 mt-0.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" />
                      100% Verified Outcomes
                    </span>
                  </div>
                </div>

                <div className="hidden sm:block h-10 w-px bg-[#0a0a1a]/10" />

                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#0a0a1a]/8 bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-[#0a0a1a]/70 shadow-xs">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#FF5812]" />
                    Production Ready
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#0a0a1a]/8 bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-[#0a0a1a]/70 shadow-xs">
                    <Layers className="h-3.5 w-3.5 text-[#FF5812]" />
                    Full-Lifecycle SLA
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right: Advanced Command Deck & Intelligent Filter Matrix */}
            <motion.div
              className="lg:col-span-5 xl:col-span-4"
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            >
              <div className="relative rounded-[26px] p-2 bg-gradient-to-b from-white via-white/80 to-white/50 border border-[#0a0a1a]/8 shadow-[0_20px_50px_-16px_rgba(10,10,26,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] backdrop-blur-xl">
                <div className="rounded-[20px] bg-gradient-to-b from-white/95 to-[#FAFBFD]/90 p-4 sm:p-5 border border-white/80">
                  {/* Telemetry Header */}
                  <div className="flex items-center justify-between border-b border-[#0a0a1a]/6 pb-3 mb-3.5">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#0a0a1a] text-white shadow-xs">
                        <SlidersHorizontal className="h-3.5 w-3.5 text-[#FF5812]" />
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-[0.16em] text-[#0a0a1a]">
                        Search by Technologies
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 rounded-full border border-[#FF5812]/20 bg-[#FFF5F0] px-2.5 py-0.5 text-[10.5px] font-bold text-[#FF5812]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#FF5812] animate-pulse" />
                      <span>{filteredItems.length} of {totalProjects} Stories</span>
                    </div>
                  </div>

                  {/* Instant Search Bar */}
                  <div className="relative mb-3.5 group">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#0a0a1a]/40 group-focus-within:text-[#FF5812] transition-colors" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search stack, keyword, or impact..."
                      className="w-full rounded-xl border border-[#0a0a1a]/10 bg-[#F8F9FC] py-2.5 pl-9.5 pr-14 text-xs sm:text-[13px] text-[#0a0a1a] placeholder:text-[#0a0a1a]/40 focus:border-[#FF5812] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5812]/15 transition-all"
                    />
                    {searchQuery ? (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#0a0a1a]/40 hover:text-[#0a0a1a] cursor-pointer"
                        aria-label="Clear search"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    ) : (
                      <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-[#0a0a1a]/10 bg-white px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#0a0a1a]/40 shadow-2xs">
                        Find
                      </span>
                    )}
                  </div>

                  {/* Quick Tech Stack Filter Tags */}
                  {popularTechs.length > 0 && (
                    <div className="mt-3.5 border-t border-[#0a0a1a]/6 pt-3">
                      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#0a0a1a]/45 block mb-1.5">
                        Popular Technologies
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {popularTechs.map((tech) => {
                          const isSelected = searchQuery.toLowerCase() === tech.toLowerCase()
                          return (
                            <button
                              key={tech}
                              type="button"
                              onClick={() => setSearchQuery(isSelected ? "" : tech)}
                              className={`inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-[10.5px] font-medium transition-all cursor-pointer ${isSelected
                                ? "bg-[#FF5812] text-white font-semibold shadow-xs"
                                : "bg-[#0a0a1a]/4 text-[#0a0a1a]/60 hover:bg-[#FF5812]/10 hover:text-[#FF5812]"
                                }`}
                            >
                              <span>{tech}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Empty Search State */}
        {filteredItems.length === 0 && (
          <div className="my-16 rounded-2xl border border-dashed border-[#0a0a1a]/15 bg-white p-12 text-center">
            <p className="text-base font-semibold text-[#0a0a1a]">
              No case studies found matching &ldquo;{searchQuery}&rdquo;
            </p>
            <p className="mt-1 text-sm text-[#0a0a1a]/50">
              Try searching with another keyword or technology name.
            </p>
            <button
              onClick={() => {
                setSearchQuery("")
                setActiveFilter("All")
              }}
              className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#FF5812] px-4 py-2 text-xs font-bold text-white shadow-sm hover:opacity-95 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

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
                  <div
                    className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#0a0a1a]/8 bg-white shadow-[0_4px_20px_-4px_rgba(10,10,26,0.06)] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:border-[#0a0a1a]/15 hover:shadow-[0_16px_36px_-8px_rgba(10,10,26,0.12)]"
                  >
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#fafafc]">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div
                          className="absolute inset-0 flex items-center justify-center bg-[#FFF4EE]"
                        >
                          <span
                            className="text-[11px] font-semibold uppercase tracking-wider text-[#FF5812]"
                          >
                            {item.category}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      {item.industry && (
                        <div className="mb-2 flex flex-wrap items-center gap-1.5">
                          <span className="rounded-md bg-[#f4f6fb] px-2 py-0.5 text-[10px] font-medium text-[#0a0a1a]/50">
                            {item.industry}
                          </span>
                          <span className="text-[#0a0a1a]/20">·</span>
                          <span className="rounded-md bg-[#f4f6fb] px-2 py-0.5 text-[10px] font-medium text-[#0a0a1a]/50">
                            Softree Technology
                          </span>
                        </div>
                      )}

                      {item.technologies && item.technologies.length > 0 && (
                        <div className="mb-3 flex flex-wrap items-center gap-1.5">
                          {item.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="rounded-md border border-[#0a0a1a]/10 bg-[#f4f6fb] px-2 py-0.5 text-[10px] font-medium text-[#0a0a1a]/60"
                            >
                              {tech}
                            </span>
                          ))}
                          {item.technologies.length > 3 && (
                            <span className="text-[10px] text-[#0a0a1a]/40">
                              +{item.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      <h3 className="mb-3 text-lg font-bold leading-snug tracking-[-0.01em] text-[#0a0a1a] transition-colors duration-300 group-hover:text-[#FF5812]">
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
                              className="flex items-center gap-1.5 rounded-lg bg-[#FFF4EE] px-2.5 py-1.5"
                            >
                              <TrendingUp className="h-3 w-3 text-[#FF5812]" />
                              <span className="text-[11px] font-black text-[#FF5812]">
                                {m.value}
                              </span>
                              <span className="text-[10px] text-[#0a0a1a]/40">{m.label}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="mt-auto flex items-center justify-between border-t border-[#0a0a1a]/5 pt-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FF5812]/10">
                            <span className="text-[10px] font-bold text-[#FF5812]">ST</span>
                          </div>
                          <span className="text-xs text-[#0a0a1a]/50">Softree Technology</span>
                        </div>
                        <FlowButton
                          as="div"
                          text="View Case Study"
                          variant="orange-filled"
                          className="w-fit px-6 py-2 text-xs font-semibold shadow-sm"
                        />
                      </div>
                    </div>

                    {/* Thick partial bottom border accent */}
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-[4px] rounded-t-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-full z-30 bg-[#FF5812]"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
