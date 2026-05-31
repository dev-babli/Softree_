"use client";

/* ─────────────────────────────────────────────────────────────────────
 *  Careers Perks — Light spotlight grid
 *  ──────────────
 *  Reuses the `SpotlightCard` from the About page so hovers light up
 *  with the cursor. Cards keep neutral type with the orange accent
 *  (`#ff5812`) reused from `LightContactSection`.
 * ───────────────────────────────────────────────────────────────────── */

import { motion } from "framer-motion";
import {
    Rocket,
    MonitorSmartphone,
    Sparkles,
    GraduationCap,
    Globe,
    Heart,
    Award,
    Users,
} from "lucide-react";
import { SpotlightCard } from "@/components/qc/shared/SpotlightCard";
import type { CareersPerk } from "./types";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const ACCENT = "#ff5812";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
    rocket: Rocket,
    monitor: MonitorSmartphone,
    sparkles: Sparkles,
    graduation: GraduationCap,
    globe: Globe,
    heart: Heart,
    award: Award,
    users: Users,
};

function resolveIcon(icon?: string) {
    if (!icon) return Sparkles;
    const lower = icon.toLowerCase().trim();
    return ICON_MAP[lower] ?? Sparkles;
}

const DEFAULT_PERKS: CareersPerk[] = [
    {
        icon: "rocket",
        title: "Fast career growth",
        description:
            "Structured mentorship, clear promotion paths, and real ownership from day one. Your career compounds here.",
        stat: "3×",
        statLabel: "faster promotions",
    },
    {
        icon: "monitor",
        title: "Remote & hybrid",
        description:
            "Work from anywhere. Fully remote and hybrid setups designed around your life — not the other way.",
        stat: "100%",
        statLabel: "flexible schedules",
    },
    {
        icon: "sparkles",
        title: "AI & enterprise projects",
        description:
            "Ship AI products used by Fortune 500 clients. Work with LLMs, Power Platform, and modern stacks.",
        stat: "50+",
        statLabel: "enterprise clients",
    },
    {
        icon: "graduation",
        title: "Learning budget",
        description:
            "Microsoft, AWS, and Google certifications fully sponsored. Weekly tech talks and hands-on workshops.",
        stat: "₹1.5L",
        statLabel: "annual budget",
    },
    {
        icon: "globe",
        title: "Global client exposure",
        description:
            "Work directly with clients in the US, UK, Europe, and APAC. Build a genuinely international portfolio.",
        stat: "12+",
        statLabel: "countries served",
    },
    {
        icon: "heart",
        title: "Wellness & insurance",
        description:
            "Comprehensive medical cover for you and your family, plus dedicated mental-health support.",
        stat: "₹5L",
        statLabel: "family insurance",
    },
];

export interface CareersPerksLightProps {
    heading?: string;
    subheading?: string;
    perks?: CareersPerk[];
}

export default function CareersPerksLight({
    heading = "Where great careers actually happen.",
    subheading = "We back our people with tools, learning budgets, flexible setups, and the kind of mentorship that compounds over years.",
    perks,
}: CareersPerksLightProps) {
    const resolved = perks && perks.length ? perks : DEFAULT_PERKS;

    return (
        <section className="relative w-full overflow-hidden bg-[#FAFAF8] py-20 md:py-24 lg:py-28">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:32px_32px]"
            />

            <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="mb-14 max-w-[820px]"
                >
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-900/10 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-700">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
                        Perks & benefits
                    </span>
                    <h2 className="text-[clamp(2.25rem,5.5vw,4rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-neutral-950">
                        {heading.replace(/\.+$/, "")}
                        <span className="text-[#F5B947]">.</span>
                    </h2>
                    <p className="mt-4 max-w-[600px] text-[15px] leading-[1.65] text-neutral-600">
                        {subheading}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {resolved.map((perk, i) => {
                        const Icon = resolveIcon(perk.icon);
                        return (
                            <motion.div
                                key={`${perk.title}-${i}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
                            >
                                <SpotlightCard
                                    color="rgba(245,185,71,0.45)"
                                    intensity={0.55}
                                    radius={300}
                                    className="h-full rounded-3xl border border-neutral-900/8 bg-white p-7 shadow-[0_8px_28px_-18px_rgba(10,10,26,0.14)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-20px_rgba(245,185,71,0.35)]"
                                >
                                    <div className="relative z-20 flex h-full flex-col">
                                        <div className="grid h-12 w-12 place-items-center rounded-2xl border border-neutral-900/10 bg-[#FFF8E8]">
                                            <Icon className="h-5 w-5 text-[#7c4a03]" />
                                        </div>
                                        <h3 className="mt-5 text-[20px] font-semibold leading-tight tracking-[-0.01em] text-neutral-950">
                                            {perk.title}
                                        </h3>
                                        {perk.description ? (
                                            <p className="mt-3 text-[14px] leading-[1.65] text-neutral-600">
                                                {perk.description}
                                            </p>
                                        ) : null}
                                        {perk.stat || perk.statLabel ? (
                                            <div className="mt-auto flex items-baseline gap-2 border-t border-neutral-900/8 pt-5">
                                                <span className="text-3xl font-bold tabular-nums text-neutral-950">
                                                    {perk.stat}
                                                </span>
                                                <span className="text-[13px] text-neutral-500">
                                                    {perk.statLabel}
                                                </span>
                                            </div>
                                        ) : null}
                                    </div>
                                </SpotlightCard>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
