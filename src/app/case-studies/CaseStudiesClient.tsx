"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ArrowUpRight, TrendingUp } from "lucide-react"

/* ─────────────────────────────────────────────────────────────────────
   RAW FORM — Brutalist Design System
   High-contrast, typographic drama, atmospheric depth
───────────────────────────────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const CATEGORY_LABELS: Record<string, string> = {
    ai: "AI & ML",
    "power-platform": "Power Platform",
    sharepoint: "SharePoint",
    web: "Web Dev",
    mobile: "Mobile",
    "data-analytics": "Data & BI",
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

export default function CaseStudiesClient({ caseStudies }: { caseStudies: CaseStudy[] }) {
    const heroRef = useRef<HTMLDivElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)
    const isGridInView = useInView(gridRef, { once: true, margin: "-80px" })
    const [activeFilter, setActiveFilter] = useState("All")

    const categories = ["All", ...Array.from(new Set(caseStudies.map((cs) => cs.category)))]
    const filteredStudies =
        activeFilter === "All" ? caseStudies : caseStudies.filter((cs) => cs.category === activeFilter)

    return (
        <div
            className="min-h-screen font-sans selection:bg-[#DB4A2B] selection:text-white"
            style={{ background: "#E4E2DD" }}
        >
            {/* Custom scrollbar styles */}
            <style>{`
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #E4E2DD; }
        ::-webkit-scrollbar-thumb { background: #DB4A2B; border-radius: 0; }
        ::selection { background: #DB4A2B; color: white; }
      `}</style>

            {/* ═══════ NAVIGATION ═══════ */}
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5"
                style={{ mixBlendMode: "difference" }}
            >
                <Link href="/" className="text-white text-2xl font-bold uppercase tracking-[-0.02em]" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                    Softree
                </Link>
                <div className="hidden md:flex items-center gap-8">
                    {["Services", "Case Studies", "About", "Blog"].map((item) => (
                        <Link
                            key={item}
                            href={`/${item.toLowerCase().replace(" ", "-")}`}
                            className="text-white text-[14px] font-medium tracking-[0.1em] uppercase hover:opacity-60 transition-opacity duration-300"
                        >
                            {item}
                        </Link>
                    ))}
                </div>
                <Link
                    href="/contact"
                    className="text-white text-[14px] font-medium tracking-[0.1em] uppercase hover:opacity-60 transition-opacity duration-300"
                >
                    Contact
                </Link>
            </motion.nav>

            {/* ═══════ HERO — Full viewport typographic drama ═══════ */}
            <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden px-6 md:px-12 pt-24">
                {/* Animated gradient blobs */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <motion.div
                        animate={{ opacity: [0.6, 0.9, 0.6], x: [0, 30, 0], y: [0, -20, 0] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full"
                        style={{ background: "#DB4A2B", filter: "blur(140px)", mixBlendMode: "multiply", opacity: 0.7 }}
                    />
                    <motion.div
                        animate={{ opacity: [0.5, 0.8, 0.5], x: [0, -20, 0], y: [0, 30, 0] }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                        className="absolute -bottom-[10%] -right-[15%] w-[50vw] h-[50vw] rounded-full"
                        style={{ background: "#F8A348", filter: "blur(140px)", mixBlendMode: "multiply", opacity: 0.6 }}
                    />
                    <motion.div
                        animate={{ opacity: [0.4, 0.7, 0.4] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 5 }}
                        className="absolute top-[30%] right-[20%] w-[35vw] h-[35vw] rounded-full"
                        style={{ background: "#FF89A9", filter: "blur(160px)", mixBlendMode: "multiply", opacity: 0.4 }}
                    />
                </div>

                {/* Headline */}
                <div className="relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
                        className="uppercase text-[#1E1E1E]"
                        style={{
                            fontFamily: "'Clash Display', sans-serif",
                            fontSize: "clamp(48px, 18vw, 280px)",
                            fontWeight: 700,
                            lineHeight: 0.75,
                            letterSpacing: "-0.05em",
                        }}
                    >
                        <span className="block">Case</span>
                        <span className="block" style={{ paddingLeft: "15vw" }}>Studies</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
                        className="mt-12 md:mt-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
                    >
                        <p className="max-w-[400px] text-[#1E1E1E]/70 text-[18px] md:text-[20px] leading-[1.5]">
                            Real projects. Measurable outcomes. Enterprise solutions engineered and shipped at scale.
                        </p>

                        <div className="flex items-center gap-4">
                            <Link
                                href="/contact"
                                className="group relative inline-flex items-center overflow-hidden bg-[#1E1E1E] text-[#E4E2DD] px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] transition-colors duration-300 hover:text-[#DB4A2B]"
                            >
                                <span className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                                <span className="relative z-10">Start a Project</span>
                            </Link>
                            <Link
                                href="#work"
                                className="inline-flex items-center gap-2 text-[#DB4A2B] text-[14px] font-medium tracking-[0.05em] hover:opacity-70 transition-opacity"
                            >
                                View Work
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Stats strip */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
                    className="relative z-10 mt-16 md:mt-24 flex flex-wrap gap-12 md:gap-20 border-t border-[#1E1E1E]/15 pt-8"
                >
                    {[
                        { value: "200+", label: "Projects Delivered" },
                        { value: "98%", label: "Client Retention" },
                        { value: "15+", label: "Countries Served" },
                        { value: "10+", label: "Years Experience" },
                    ].map((stat) => (
                        <div key={stat.label} className="flex flex-col gap-1">
                            <span className="text-[32px] md:text-[40px] font-bold text-[#1E1E1E] tracking-[-0.03em]" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                                {stat.value}
                            </span>
                            <span className="text-[11px] uppercase tracking-[0.2em] text-[#1E1E1E]/50 font-medium">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </section>

            {/* ═══════ CATEGORY DIVIDER ═══════ */}
            <section className="relative py-32 px-6 md:px-12 overflow-hidden">
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{ background: "radial-gradient(ellipse at center, rgba(248,163,72,0.2), transparent 70%)" }}
                />
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="relative uppercase text-[#1E1E1E] opacity-90"
                    style={{
                        fontFamily: "'Clash Display', sans-serif",
                        fontSize: "clamp(36px, 12vw, 180px)",
                        fontWeight: 700,
                        lineHeight: 0.85,
                        letterSpacing: "-0.05em",
                    }}
                >
                    Selected Work
                </motion.h2>
            </section>

            {/* ═══════ FILTER TABS ═══════ */}
            <section id="work" className="px-6 md:px-12 pb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="flex flex-wrap gap-3"
                >
                    {categories.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 ${activeFilter === filter
                                ? "bg-[#1E1E1E] text-[#E4E2DD]"
                                : "bg-transparent border border-[#1E1E1E]/20 text-[#1E1E1E]/70 hover:border-[#1E1E1E]/50 hover:text-[#1E1E1E]"
                                }`}
                        >
                            {filter === "All" ? "All" : CATEGORY_LABELS[filter] || filter}
                        </button>
                    ))}
                </motion.div>
            </section>

            {/* ═══════ CASE STUDY GRID ═══════ */}
            <section ref={gridRef} className="px-6 md:px-12 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-16">
                    <AnimatePresence mode="popLayout">
                        {filteredStudies.map((study, i) => (
                            <motion.div
                                key={study._id}
                                layout
                                initial={{ opacity: 0, y: 50 }}
                                animate={isGridInView ? { opacity: 1, y: 0 } : {}}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
                            >
                                <Link href={`/case-studies/${study.slug?.current}`} className="group block">
                                    {/* Image */}
                                    <div className="relative aspect-[3/4] overflow-hidden bg-[#D9D6D0] mb-5">
                                        {study.mainImage?.asset?.url ? (
                                            <Image
                                                src={study.mainImage.asset.url}
                                                alt={study.mainImage.alt || study.title}
                                                fill
                                                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                                                sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span
                                                    className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1E1E1E]/30"
                                                >
                                                    {CATEGORY_LABELS[study.category] || study.category}
                                                </span>
                                            </div>
                                        )}
                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-[#1E1E1E]/0 group-hover:bg-[#1E1E1E]/10 transition-colors duration-500" />
                                    </div>

                                    {/* Metadata */}
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <h3
                                                className="text-[14px] font-bold uppercase tracking-[0.15em] text-[#1E1E1E] group-hover:text-[#FF89A9] transition-colors duration-300 mb-2"
                                            >
                                                {study.title}
                                            </h3>
                                            <p className="text-[13px] text-[#444444] leading-[1.5] line-clamp-2">
                                                {study.excerpt}
                                            </p>

                                            {/* Metrics */}
                                            {study.metrics && study.metrics.length > 0 && (
                                                <div className="mt-3 flex flex-wrap gap-3">
                                                    {study.metrics.slice(0, 2).map((m) => (
                                                        <div key={m.label} className="flex items-center gap-1.5">
                                                            <TrendingUp className="h-3 w-3 text-[#DB4A2B]" />
                                                            <span className="text-[11px] font-bold text-[#DB4A2B]">{m.value}</span>
                                                            <span className="text-[10px] text-[#1E1E1E]/40 uppercase tracking-wider">{m.label}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Arrow */}
                                        <div className="w-8 h-8 rounded-full border border-[#1E1E1E]/20 grid place-items-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:border-[#DB4A2B]">
                                            <ArrowUpRight className="h-3.5 w-3.5 text-[#DB4A2B]" />
                                        </div>
                                    </div>

                                    {/* Category + Industry tags */}
                                    <div className="mt-3 flex items-center gap-2">
                                        <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#1E1E1E]/40">
                                            {CATEGORY_LABELS[study.category] || study.category}
                                        </span>
                                        {study.industry && (
                                            <>
                                                <span className="w-1 h-1 rounded-full bg-[#1E1E1E]/20" />
                                                <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#1E1E1E]/40">
                                                    {study.industry}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Empty state */}
                {filteredStudies.length === 0 && (
                    <div className="py-32 text-center">
                        <p className="text-[18px] text-[#1E1E1E]/40">No case studies in this category yet.</p>
                    </div>
                )}
            </section>

            {/* ═══════ CAMPAIGN BLOCK / CTA ═══════ */}
            <section className="relative px-6 md:px-12 py-32" style={{ background: "#D9D6D0" }}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left: Headline */}
                    <div className="lg:col-span-8">
                        <motion.h2
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: EASE }}
                            className="uppercase text-[#1E1E1E]"
                            style={{
                                fontFamily: "'Clash Display', sans-serif",
                                fontSize: "clamp(32px, 6vw, 96px)",
                                fontWeight: 700,
                                lineHeight: 0.9,
                                letterSpacing: "-0.05em",
                            }}
                        >
                            Ready to build something extraordinary?
                        </motion.h2>
                    </div>

                    {/* Right: Links */}
                    <div className="lg:col-span-4 flex flex-col justify-end gap-6">
                        <div className="border-t border-[#1E1E1E]/20 pt-6">
                            <Link
                                href="/contact"
                                className="group flex items-center justify-between py-3 text-[14px] font-medium text-[#1E1E1E] hover:text-[#DB4A2B] transition-colors"
                            >
                                <span>Start a conversation</span>
                                <div className="w-8 h-8 rounded-full border border-[#1E1E1E]/20 grid place-items-center group-hover:border-[#DB4A2B] transition-colors">
                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                </div>
                            </Link>
                        </div>
                        <div className="border-t border-[#1E1E1E]/20 pt-6">
                            <Link
                                href="/services"
                                className="group flex items-center justify-between py-3 text-[14px] font-medium text-[#1E1E1E] hover:text-[#DB4A2B] transition-colors"
                            >
                                <span>Explore our services</span>
                                <div className="w-8 h-8 rounded-full border border-[#1E1E1E]/20 grid place-items-center group-hover:border-[#DB4A2B] transition-colors">
                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                </div>
                            </Link>
                        </div>
                        <div className="border-t border-[#1E1E1E]/20 pt-6">
                            <Link
                                href="/blog"
                                className="group flex items-center justify-between py-3 text-[14px] font-medium text-[#1E1E1E] hover:text-[#DB4A2B] transition-colors"
                            >
                                <span>Read our insights</span>
                                <div className="w-8 h-8 rounded-full border border-[#1E1E1E]/20 grid place-items-center group-hover:border-[#DB4A2B] transition-colors">
                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════ FOOTER ═══════ */}
            <footer className="relative overflow-hidden px-6 md:px-12 py-20" style={{ background: "#1E1E1E" }}>
                {/* Background year */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute bottom-0 right-0 text-white/[0.1] select-none"
                    style={{
                        fontFamily: "'Clash Display', sans-serif",
                        fontSize: "clamp(80px, 10vw, 200px)",
                        fontWeight: 700,
                        lineHeight: 1,
                    }}
                >
                    2026
                </div>

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="flex flex-col gap-6">
                        <span
                            className="text-[#E4E2DD] text-3xl font-bold uppercase tracking-[-0.02em]"
                            style={{ fontFamily: "'Clash Display', sans-serif" }}
                        >
                            Softree
                        </span>
                        <div className="flex items-center gap-3">
                            {["LinkedIn", "X", "Instagram"].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="text-[#E4E2DD]/50 text-[12px] font-medium uppercase tracking-[0.1em] hover:text-[#E4E2DD] transition-colors"
                                >
                                    {social}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col gap-3">
                        <span className="text-[#E4E2DD]/40 text-[11px] uppercase tracking-[0.2em] font-medium mb-2">Services</span>
                        {["AI & Automation", "Web Development", "Power Platform", "Data Analytics", "Mobile Apps"].map((link) => (
                            <a key={link} href="/services" className="text-[#E4E2DD]/70 text-[14px] hover:text-[#E4E2DD] transition-colors">
                                {link}
                            </a>
                        ))}
                    </div>

                    <div className="flex flex-col gap-3">
                        <span className="text-[#E4E2DD]/40 text-[11px] uppercase tracking-[0.2em] font-medium mb-2">Company</span>
                        {["About Us", "Case Studies", "Blog", "Careers", "Contact"].map((link) => (
                            <a key={link} href={`/${link.toLowerCase().replace(" ", "-")}`} className="text-[#E4E2DD]/70 text-[14px] hover:text-[#E4E2DD] transition-colors">
                                {link}
                            </a>
                        ))}
                    </div>

                    <div className="flex flex-col gap-3">
                        <span className="text-[#E4E2DD]/40 text-[11px] uppercase tracking-[0.2em] font-medium mb-2">Locations</span>
                        <p className="text-[#E4E2DD]/70 text-[14px]">San Francisco, CA</p>
                        <p className="text-[#E4E2DD]/70 text-[14px]">Cuttack, India</p>
                        <p className="text-[#E4E2DD]/70 text-[14px]">Bengaluru, India</p>
                    </div>
                </div>

                {/* Bottom */}
                <div className="relative z-10 mt-16 pt-8 border-t border-[#E4E2DD]/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <span className="text-[#E4E2DD]/40 text-[12px]">
                        © {new Date().getFullYear()} Softree Technology. All rights reserved.
                    </span>
                    <div className="flex items-center gap-6">
                        <Link href="/privacy-policy" className="text-[#E4E2DD]/40 text-[12px] hover:text-[#E4E2DD]/70 transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-[#E4E2DD]/40 text-[12px] hover:text-[#E4E2DD]/70 transition-colors">
                            Terms of Use
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}
