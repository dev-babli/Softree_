"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { TrendingUp, Sparkles } from "lucide-react"
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
  const [stickyVisible, setStickyVisible] = useState(false)

  const allFilters = ["All", ...(filterLabels ?? Array.from(new Set(items.map((i) => i.category))))]
  const totalProjects = items.length

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

  const filteredItems =
    activeFilter === "All" ? items : items.filter((i) => i.category === activeFilter)

  return (
    <section ref={sectionRef} className="w-full bg-[#F8F9FC] pt-10 pb-20 md:pt-14 md:pb-28">
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

      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FF5812]/20 bg-[#FFF4EE] px-4 py-2">
            <div className="h-2 w-2 rounded-full bg-[#FF5812]" />
            <span className="text-sm font-medium text-[#FF5812]">
              Case Studies
            </span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-[#0a0a1a] md:text-4xl lg:text-5xl">
            {sectionTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-base text-[#0a0a1a]/60">{sectionSubtitle}</p>
        </motion.div>

        {/* Filters if categories exist */}
        {allFilters.length > 1 && (
          <motion.div
            className="mb-6 flex flex-wrap gap-2"
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
                    ? "border-transparent bg-[#FF5812] text-white shadow-md"
                    : "border-[#0a0a1a]/10 bg-white text-[#0a0a1a]/60 hover:border-[#0a0a1a]/20 hover:text-[#0a0a1a]"
                }`}
              >
                {filter}
              </button>
            ))}
          </motion.div>
        )}

        {/* Only show the number of projects without card, in brand orange */}
        <motion.div
          className="mb-10 flex items-baseline gap-2"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
        >
          <span className="text-3xl font-black text-[#FF5812] sm:text-4xl">
            {activeFilter === "All" ? `${totalProjects}+` : filteredItems.length}
          </span>
          <span className="text-sm font-bold uppercase tracking-wider text-[#FF5812]">
            Projects delivered
          </span>
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
