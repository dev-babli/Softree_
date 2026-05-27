"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ArrowUpRight, TrendingUp, Calendar } from "lucide-react"
import { SectionHeader } from "@/components/homepage-light/SectionHeader"
import { EASE_T, DUR, REVEAL, VIEWPORT } from "@/lib/motion"

const CATEGORY_LABELS: Record<string, string> = {
    ai: "AI & Machine Learning",
    "power-platform": "Power Platform",
    sharepoint: "SharePoint",
    web: "Web Development",
    mobile: "Mobile Development",
    "data-analytics": "Data Analytics",
}

type CaseStudy = {
    _id: string
    title: string
    slug: { current: string }
    excerpt: string
    category: string
    industry: string
    client: string
    mainImage: { asset: { url: string }; alt: string } | null
    technologies: string[]
    metrics: { label: string; value: string }[]
    publishedAt: string
}

export default function CaseStudiesListingClient({ caseStudies }: { caseStudies: CaseStudy[] }) {
    const gridRef = useRef<HTMLDivElement>(null)
    const isGridInView = useInView(gridRef, { once: true, margin: "-80px" })
    const [activeFilter, setActiveFilter] = useState("All")

    const categories = ["All", ...Array.from(new Set(caseStudies.map((cs) => cs.category)))]
    const filteredStudies =
        activeFilter === "All" ? caseStudies : caseStudies.filter((cs) => cs.category === activeFilter)

    return (
        <>
            {/* Hero Section */}
            <section className="relative w-full overflow-hidden bg-[#F8F9FC] pb-12 pt-8 sm:pb-20 sm:pt-12">
                {/* Subtle gradient mesh */}
                <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div
                        className="absolute -right-[15%] -top-[20%] h-[600px] w-[600px] rounded-full blur-[120px]"
                        style={{ background: "radial-gradient(circle, rgba(24,82,255,0.12), transparent 70%)" }}
                    />
                    <div
                        className="absolute -left-[10%] top-[30%] h-[500px] w-[500px] rounded-full blur-[140px]"
                        style={{ background: "radial-gradient(circle, rgba(255,88,18,0.08), transparent 70%)" }}
                    />
                </div>

                <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
                    <motion.div
                        initial={REVEAL.blurUp.initial}
                        animate={REVEAL.blurUp.animate}
                        transition={{ duration: DUR.section, ease: EASE_T.silk }}
                    >
                        <SectionHeader
                            badge="Case Studies"
                            accent="#1852FF"
                            as="h1"
                            headline={
                                <>
                                    Real projects.{" "}
                                    <span className="text-[#FF5812]">Measurable</span> outcomes.
                                </>
                            }
                            body="Enterprise solutions engineered and shipped at scale. Explore how we've helped businesses transform with AI, Power Platform, and modern web development."
                        />
                    </motion.div>

                    {/* Stats strip */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: DUR.card, delay: 0.3, ease: EASE_T.silk }}
                        className="mt-12 flex flex-wrap gap-8 md:gap-16 border-t border-[#0a0a1a]/8 pt-8"
                    >
                        {[
                            { value: "200+", label: "Projects Delivered" },
                            { value: "98%", label: "Client Retention" },
                            { value: "15+", label: "Countries Served" },
                            { value: "10+", label: "Years Experience" },
                        ].map((stat) => (
                            <div key={stat.label} className="flex flex-col gap-1">
                                <span className="text-2xl md:text-3xl font-bold text-[#0a0a1a] tracking-tight">
                                    {stat.value}
                                </span>
                                <span className="text-[11px] uppercase tracking-[0.18em] text-[#0a0a1a]/45 font-medium">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Filter + Grid Section */}
            <section className="w-full bg-white py-20 md:py-28">
                <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
                    {/* Filter Tabs */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={VIEWPORT.default}
                        transition={{ duration: DUR.card, ease: EASE_T.out }}
                        className="mb-12 flex flex-wrap gap-2"
                    >
                        {categories.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`rounded-full border px-5 py-2 text-[12px] font-semibold tracking-wide transition-all duration-200 ${activeFilter === filter
                                        ? "border-[#1852FF] bg-[#1852FF] text-white shadow-md shadow-[#1852FF]/20"
                                        : "border-[#0a0a1a]/10 bg-white text-[#0a0a1a]/60 hover:border-[#0a0a1a]/25 hover:text-[#0a0a1a]"
                                    }`}
                            >
                                {filter === "All" ? "All Projects" : CATEGORY_LABELS[filter] || filter}
                            </button>
                        ))}
                    </motion.div>

                    {/* Grid */}
                    <div ref={gridRef} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <AnimatePresence mode="popLayout">
                            {filteredStudies.map((study, i) => (
                                <motion.div
                                    key={study._id}
                                    layout
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={isGridInView ? { opacity: 1, y: 0 } : {}}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.5, delay: i * 0.06, ease: EASE_T.out }}
                                >
                                    <Link
                                        href={`/case-studies/${study.slug?.current}`}
                                        className="group block h-full"
                                    >
                                        <article className="h-full overflow-hidden rounded-2xl border border-[#0a0a1a]/6 bg-white shadow-[0_4px_24px_-8px_rgba(10,10,26,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_48px_-16px_rgba(24,82,255,0.12)] hover:border-[#1852FF]/20">
                                            {/* Image */}
                                            <div className="relative aspect-[16/10] overflow-hidden bg-[#F8F9FC]">
                                                {study.mainImage?.asset?.url ? (
                                                    <Image
                                                        src={study.mainImage.asset.url}
                                                        alt={study.mainImage.alt || study.title}
                                                        fill
                                                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                                                        sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                                                    />
                                                ) : (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1852FF]/5 to-[#FF5812]/5">
                                                        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0a0a1a]/30">
                                                            {CATEGORY_LABELS[study.category] || study.category}
                                                        </span>
                                                    </div>
                                                )}
                                                {/* Category badge */}
                                                <div className="absolute left-4 top-4">
                                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#0a0a1a]/70 backdrop-blur-md shadow-sm">
                                                        {CATEGORY_LABELS[study.category] || study.category}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex flex-1 flex-col p-6">
                                                {/* Industry tag */}
                                                {study.industry && (
                                                    <div className="mb-3 flex items-center gap-2">
                                                        <span className="rounded-md bg-[#F8F9FC] px-2 py-0.5 text-[10px] font-medium text-[#0a0a1a]/50">
                                                            {study.industry}
                                                        </span>
                                                        {study.publishedAt && (
                                                            <>
                                                                <span className="text-[#0a0a1a]/15">·</span>
                                                                <span className="flex items-center gap-1 text-[10px] text-[#0a0a1a]/40">
                                                                    <Calendar className="h-3 w-3" />
                                                                    {new Date(study.publishedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>
                                                )}

                                                <h3 className="mb-3 text-lg font-bold leading-snug tracking-tight text-[#0a0a1a] transition-colors duration-300 group-hover:text-[#1852FF]">
                                                    {study.title}
                                                </h3>

                                                <p className="mb-4 flex-1 text-sm leading-relaxed text-[#0a0a1a]/55 line-clamp-3">
                                                    {study.excerpt}
                                                </p>

                                                {/* Metrics */}
                                                {study.metrics && study.metrics.length > 0 && (
                                                    <div className="mb-4 flex flex-wrap gap-2">
                                                        {study.metrics.slice(0, 3).map((m) => (
                                                            <div
                                                                key={m.label}
                                                                className="flex items-center gap-1.5 rounded-lg bg-[#1852FF]/5 px-2.5 py-1.5"
                                                            >
                                                                <TrendingUp className="h-3 w-3 text-[#1852FF]" />
                                                                <span className="text-[11px] font-bold text-[#1852FF]">{m.value}</span>
                                                                <span className="text-[10px] text-[#0a0a1a]/40">{m.label}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Footer */}
                                                <div className="flex items-center justify-between border-t border-[#0a0a1a]/5 pt-4">
                                                    {study.client && (
                                                        <span className="text-xs text-[#0a0a1a]/50">{study.client}</span>
                                                    )}
                                                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1852FF] transition-transform duration-300 group-hover:translate-x-0.5">
                                                        Read Case Study
                                                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                                                    </span>
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Empty state */}
                    {filteredStudies.length === 0 && (
                        <div className="py-24 text-center">
                            <p className="text-lg text-[#0a0a1a]/40">No case studies in this category yet.</p>
                            <button
                                onClick={() => setActiveFilter("All")}
                                className="mt-4 text-sm font-semibold text-[#1852FF] hover:underline"
                            >
                                View all case studies
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}
