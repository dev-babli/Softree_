"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Calendar, TrendingUp, Layers } from "lucide-react"
import { SpotlightCard } from "@/components/qc/shared/SpotlightCard"

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const CATEGORY_LABELS: Record<string, string> = {
    ai: "AI & Machine Learning",
    "power-platform": "Power Platform",
    sharepoint: "SharePoint",
    web: "Web Development",
    mobile: "Mobile Development",
    "data-analytics": "Data Analytics",
}

const CATEGORY_COLORS: Record<string, string> = {
    ai: "#8B5CF6",
    "power-platform": "#3B82F6",
    sharepoint: "#10B981",
    web: "#F59E0B",
    mobile: "#EC4899",
    "data-analytics": "#06B6D4",
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

export default function CaseStudiesGrid({ caseStudies }: { caseStudies: CaseStudy[] }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(containerRef, { once: true, margin: "-100px" })
    const [activeFilter, setActiveFilter] = useState("All")

    const categories = ["All", ...Array.from(new Set(caseStudies.map((cs) => cs.category)))]

    const filteredStudies =
        activeFilter === "All"
            ? caseStudies
            : caseStudies.filter((cs) => cs.category === activeFilter)

    return (
        <section ref={containerRef} className="w-full bg-[#F8F9FC] py-20 md:py-28">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
                {/* Section Header */}
                <motion.div
                    className="mb-10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: EASE }}
                >
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#1852FF]/20 bg-[#eef4ff] px-4 py-2">
                        <Layers className="h-4 w-4 text-[#1852FF]" />
                        <span className="text-sm font-medium text-[#1852FF]">All Case Studies</span>
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight text-[#0a0a1a] md:text-4xl lg:text-5xl">
                        Projects that deliver{" "}
                        <span className="text-[#1852FF]">results</span>
                    </h2>
                    <p className="mt-4 max-w-2xl text-base text-[#0a0a1a]/60">
                        From AI automation to enterprise platforms — each case study includes the challenge, approach, and measurable outcomes.
                    </p>
                </motion.div>

                {/* Filter Tabs */}
                <motion.div
                    className="mb-10 flex flex-wrap gap-2"
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                >
                    {categories.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`rounded-full border px-4 py-1.5 text-[12px] font-semibold tracking-wide transition-all duration-200 ${activeFilter === filter
                                    ? "border-transparent bg-[#1852FF] text-white shadow-md"
                                    : "border-[#0a0a1a]/10 bg-white text-[#0a0a1a]/60 hover:border-[#0a0a1a]/20 hover:text-[#0a0a1a]"
                                }`}
                        >
                            {filter === "All" ? "All" : CATEGORY_LABELS[filter] || filter}
                        </button>
                    ))}
                </motion.div>

                {/* Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <AnimatePresence mode="popLayout">
                        {filteredStudies.map((study, i) => {
                            const accentColor = CATEGORY_COLORS[study.category] || "#1852FF"

                            return (
                                <motion.div
                                    key={study._id}
                                    layout
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                                >
                                    <Link
                                        href={`/case-studies/${study.slug?.current}`}
                                        className="group block h-full"
                                    >
                                        <SpotlightCard
                                            color={`${accentColor}73`}
                                            intensity={0.5}
                                            radius={280}
                                            className="h-full overflow-hidden rounded-2xl border border-[#0a0a1a]/5 bg-white shadow-[0_8px_28px_-12px_rgba(10,10,26,0.12)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:shadow-[0_24px_50px_-14px_rgba(24,82,255,0.2)]"
                                        >
                                            {/* Image */}
                                            <div className="relative h-48 overflow-hidden bg-[#e8ecf4]">
                                                {study.mainImage?.asset?.url ? (
                                                    <Image
                                                        src={study.mainImage.asset.url}
                                                        alt={study.mainImage.alt || study.title}
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
                                                            {CATEGORY_LABELS[study.category] || study.category}
                                                        </span>
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />

                                                {/* Category badge */}
                                                <div className="absolute left-4 top-4">
                                                    <span
                                                        className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md"
                                                    >
                                                        {CATEGORY_LABELS[study.category] || study.category}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex flex-1 flex-col p-6">
                                                {/* Industry + Client */}
                                                {(study.industry || study.client) && (
                                                    <div className="mb-3 flex flex-wrap items-center gap-1.5">
                                                        {study.industry && (
                                                            <span className="rounded-md bg-[#f4f6fb] px-2 py-0.5 text-[10px] font-medium text-[#0a0a1a]/50">
                                                                {study.industry}
                                                            </span>
                                                        )}
                                                        {study.client && (
                                                            <>
                                                                <span className="text-[#0a0a1a]/20">·</span>
                                                                <span className="rounded-md bg-[#f4f6fb] px-2 py-0.5 text-[10px] font-medium text-[#0a0a1a]/50">
                                                                    {study.client}
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>
                                                )}

                                                <h3 className="mb-3 text-lg font-bold leading-snug tracking-[-0.01em] text-[#0a0a1a] transition-colors duration-300 group-hover:text-[#1852FF]">
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

                                                {/* Technologies */}
                                                {study.technologies && study.technologies.length > 0 && (
                                                    <div className="mb-4 flex flex-wrap gap-1">
                                                        {study.technologies.slice(0, 4).map((tech) => (
                                                            <span
                                                                key={tech}
                                                                className="rounded-md border border-[#0a0a1a]/5 bg-[#f8f9fc] px-2 py-0.5 text-[10px] font-medium text-[#0a0a1a]/50"
                                                            >
                                                                {tech}
                                                            </span>
                                                        ))}
                                                        {study.technologies.length > 4 && (
                                                            <span className="rounded-md border border-[#0a0a1a]/5 bg-[#f8f9fc] px-2 py-0.5 text-[10px] font-medium text-[#0a0a1a]/40">
                                                                +{study.technologies.length - 4}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Footer */}
                                                <div className="flex items-center justify-between border-t border-[#0a0a1a]/5 pt-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1852FF]/10">
                                                            <span className="text-[10px] font-bold text-[#1852FF]">ST</span>
                                                        </div>
                                                        <span className="flex items-center gap-1 text-xs text-[#0a0a1a]/50">
                                                            <Calendar className="h-3 w-3" />
                                                            {study.publishedAt
                                                                ? new Date(study.publishedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                                                                : "Recent"}
                                                        </span>
                                                    </div>
                                                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1852FF] transition-transform duration-300 group-hover:translate-x-0.5">
                                                        Read case study
                                                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                                                    </span>
                                                </div>
                                            </div>
                                        </SpotlightCard>
                                    </Link>
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </div>

                {/* Empty state */}
                {filteredStudies.length === 0 && (
                    <div className="py-20 text-center">
                        <p className="text-lg text-[#0a0a1a]/40">No case studies found in this category yet.</p>
                        <p className="mt-2 text-sm text-[#0a0a1a]/30">Check back soon or explore other categories.</p>
                    </div>
                )}
            </div>
        </section>
    )
}
