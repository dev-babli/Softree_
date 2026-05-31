"use client";

/* ─────────────────────────────────────────────────────────────────────
 *  Careers Intro — Light editorial split
 *  ──────────────
 *  Pulls the visual recipe from `LightAboutMerged`:
 *    • Two-column split, badge + headline + accented body
 *    • 4-up animated stat row separated by light dividers
 *    • Optional duo of pillar cards (mission/vision style)
 *
 *  All content is driven by props so editors in Sanity can customize
 *  every word without redeploying.
 * ───────────────────────────────────────────────────────────────────── */

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { CareersPillar, CareersStat } from "./types";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function AnimatedNumber({ raw }: { raw?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [hasAnimated, setHasAnimated] = useState(false);

    // Parse the digits out of strings like "200+" or "$2k" or "98%".
    const match = (raw ?? "").match(/(-?\d+(?:\.\d+)?)/);
    const numeric = match ? Number(match[1]) : null;

    const spring = useSpring(numeric != null ? Math.round(numeric * 0.6) : 0, {
        stiffness: 50,
        damping: 20,
    });
    const display = useTransform(spring, (current) =>
        Number.isFinite(current) ? Math.round(current) : 0,
    );
    const [val, setVal] = useState(0);

    useEffect(() => {
        return display.on("change", (v) => setVal(v));
    }, [display]);

    useEffect(() => {
        if (numeric != null && isInView && !hasAnimated) {
            spring.set(numeric);
            setHasAnimated(true);
        }
    }, [numeric, isInView, hasAnimated, spring]);

    if (numeric == null) return <span ref={ref}>{raw}</span>;

    // Reconstruct using the formatted number + non-digit suffix/prefix.
    const prefix = (raw ?? "").slice(0, match?.index ?? 0);
    const suffix = (raw ?? "").slice((match?.index ?? 0) + (match?.[1].length ?? 0));

    return (
        <span ref={ref} className="tabular-nums">
            {prefix}
            {val}
            {suffix}
        </span>
    );
}

export interface CareersIntroLightProps {
    badge?: string;
    heading?: string;
    highlight?: string;
    body?: string;
    stats?: CareersStat[];
    pillars?: CareersPillar[];
}

const DEFAULT_STATS: CareersStat[] = [
    { value: "200+", label: "Engineers across India" },
    { value: "50+", label: "Microsoft-certified specialists" },
    { value: "98%", label: "Offer acceptance rate" },
    { value: "4.9★", label: "Glassdoor rating" },
];

const DEFAULT_PILLARS: CareersPillar[] = [
    {
        label: "Mission",
        headline: "Engineer software the team is proud to ship.",
        body: "We pick problems that matter, scope them tightly, and ship in weeks. Engineers own outcomes from kickoff to handoff — no spec relays, no token roles.",
    },
    {
        label: "Vision",
        headline: "A senior bench, distributed by design.",
        body: "We invest in mastery over headcount. Microsoft certifications, conference budgets, and structured mentorship are part of the job — not a perk.",
    },
];

export default function CareersIntroLight({
    badge = "Why Softree",
    heading = "A team of senior engineers shipping enterprise software.",
    highlight = "200+ enterprise projects delivered. 50+ Microsoft-certified engineers. One culture built around mastery, not management.",
    body = "We hire people who care about the craft. Engineers who can architect, write tests, talk to clients, and ship production software end-to-end. No layered management, no busywork — just clear goals, weekly demos, and senior peers who push you to ship better code than you did last month.",
    stats,
    pillars,
}: CareersIntroLightProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    const resolvedStats = stats && stats.length ? stats : DEFAULT_STATS;
    const resolvedPillars = pillars && pillars.length ? pillars : DEFAULT_PILLARS;

    return (
        <section
            ref={containerRef}
            id="why-softree"
            className="w-full bg-[#F8F9FC] py-16 sm:py-20 md:py-24 lg:py-28"
        >
            <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
                {/* ── Headline split ────────────────────────────────────── */}
                <div className="mb-12 grid grid-cols-1 gap-8 sm:mb-16 sm:gap-12 lg:grid-cols-2 lg:gap-20">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, ease: EASE }}
                    >
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#1852FF]/20 bg-[#eef4ff] px-4 py-2">
                            <div className="h-2 w-2 rounded-full bg-[#1852FF]" />
                            <span className="text-sm font-medium text-[#1852FF]">{badge}</span>
                        </div>
                        <h2 className="text-[clamp(1.75rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#0a0a1a]">
                            {heading}
                        </h2>
                    </motion.div>

                    <motion.div
                        className="flex flex-col justify-center lg:border-l lg:border-[#0a0a1a]/10 lg:pl-16"
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
                    >
                        <p className="mb-5 text-xl font-semibold leading-[1.25] text-[#1852FF] sm:mb-6 sm:text-2xl md:text-[28px]">
                            {highlight}
                        </p>
                        <p className="text-[15px] leading-relaxed text-[#0a0a1a]/70 sm:text-base">
                            {body}
                        </p>
                    </motion.div>
                </div>

                {/* ── Stats row ─────────────────────────────────────────── */}
                <motion.div
                    className="border-t border-[#0a0a1a]/10 pt-10 sm:pt-12"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4 lg:gap-0">
                        {resolvedStats.map((stat, index) => (
                            <motion.div
                                key={`${stat.value ?? ""}-${index}`}
                                className={`relative ${index < resolvedStats.length - 1 ? "lg:border-r lg:border-[#0a0a1a]/10" : ""}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: index * 0.12 }}
                            >
                                <div className="lg:p-0 lg:px-8">
                                    <div className="mb-2 text-[clamp(1.875rem,4.5vw,3rem)] font-bold tabular-nums text-[#0a0a1a]">
                                        <AnimatedNumber raw={stat.value} />
                                    </div>
                                    <p className="text-[13px] leading-snug text-[#0a0a1a]/60 sm:text-sm">{stat.label}</p>
                                    <motion.div
                                        className="mt-3 h-0.5 w-full origin-left bg-[#1852FF]"
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* ── Mission / Vision pillars ──────────────────────────── */}
                <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 sm:gap-6 md:grid-cols-2">
                    {resolvedPillars.map((pillar, index) => (
                        <motion.div
                            key={`${pillar.label}-${index}`}
                            className="relative overflow-hidden rounded-3xl border border-[#0a0a1a]/8 bg-white p-6 shadow-[0_12px_40px_-16px_rgba(10,10,26,0.12)] transition-shadow hover:shadow-[0_24px_60px_-16px_rgba(10,10,26,0.22)] sm:p-8 md:p-10"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7, delay: index * 0.15, ease: EASE }}
                        >
                            {/* Editorial accent corner */}
                            <div
                                aria-hidden
                                className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-30 blur-[80px]"
                                style={{
                                    background:
                                        index % 2 === 0
                                            ? "radial-gradient(circle, rgba(245,185,71,0.7), transparent 70%)"
                                            : "radial-gradient(circle, rgba(24,82,255,0.5), transparent 70%)",
                                }}
                            />
                            <div className="relative">
                                <span className="inline-flex items-center gap-2 rounded-full border border-[#0a0a1a]/12 bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0a0a1a]/70">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#F5B947]" />
                                    {pillar.label}
                                </span>
                                <h3 className="mt-5 text-[22px] font-bold leading-[1.1] tracking-[-0.02em] text-[#0a0a1a] sm:text-2xl md:text-[32px]">
                                    {pillar.headline}
                                </h3>
                                <p className="mt-4 max-w-[460px] text-[14px] leading-relaxed text-[#0a0a1a]/70 sm:text-[15px]">
                                    {pillar.body}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
