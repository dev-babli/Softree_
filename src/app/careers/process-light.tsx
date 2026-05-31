"use client";

/* ─────────────────────────────────────────────────────────────────────
 *  Careers Process — Light timeline
 *  ──────────────
 *  Vertical timeline of expandable cards. Visual recipe matches the
 *  About + Contact pages: cream surface, white cards, neutral type,
 *  amber + blue accents for the active step.
 * ───────────────────────────────────────────────────────────────────── */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Check } from "lucide-react";
import type { CareersProcessStep } from "./types";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const ACCENT = "#F5B947";
const ACCENT_INK = "#7c4a03";

const DEFAULT_STEPS: CareersProcessStep[] = [
    {
        number: "01",
        title: "Apply",
        subtitle: "Submit your application",
        duration: "Day 1",
        description:
            "Drop your résumé and a short note on why this role fits. Five minutes is all it takes — we read every application.",
        details: ["Online application form", "Résumé & portfolio upload", "Cover note (optional)"],
    },
    {
        number: "02",
        title: "Recruiter call",
        subtitle: "Quick intro chat",
        duration: "Day 2–3",
        description:
            "A 20-minute conversation with our hiring team to align on your background, what you’re looking for, and what we offer.",
        details: ["20-min video call", "Culture & values fit", "Comp expectations"],
    },
    {
        number: "03",
        title: "Technical round",
        subtitle: "Skills assessment",
        duration: "Day 5–7",
        description:
            "A focused technical interview or short take-home. We keep it practical — no trick questions, just real problems we’ve faced.",
        details: ["Role-specific assessment", "Live problem solving", "Portfolio review"],
    },
    {
        number: "04",
        title: "Team round",
        subtitle: "Meet the team",
        duration: "Day 8–10",
        description:
            "Meet your future manager and teammates. We discuss the role, growth path, and the projects you’d own day-to-day.",
        details: ["Meet hiring manager", "Role deep-dive", "Q&A with the team"],
    },
    {
        number: "05",
        title: "Offer",
        subtitle: "Welcome aboard",
        duration: "Day 11–12",
        description:
            "Detailed offer within 48 hours of the final round. Onboarding starts as soon as you’re ready.",
        details: ["Offer within 48 hrs", "Negotiation welcome", "Fast onboarding"],
    },
];

export interface CareersProcessLightProps {
    heading?: string;
    subheading?: string;
    steps?: CareersProcessStep[];
}

export default function CareersProcessLight({
    heading = "How we hire.",
    subheading = "No black holes, no ghosting. Most candidates hear back within 48 hours and the full loop wraps in under two weeks.",
    steps,
}: CareersProcessLightProps) {
    const resolvedSteps = steps && steps.length ? steps : DEFAULT_STEPS;
    const [active, setActive] = useState<number | null>(0);

    return (
        <section className="relative w-full overflow-hidden bg-[#F8F9FC] py-16 sm:py-20 md:py-24 lg:py-28">
            <div
                aria-hidden
                className="pointer-events-none absolute -top-32 left-[-10%] h-[420px] w-[420px] rounded-full opacity-30 blur-[120px]"
                style={{
                    background:
                        "radial-gradient(circle, rgba(245,185,71,0.45), transparent 70%)",
                }}
            />

            <div className="relative mx-auto max-w-[960px] px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="mb-14 text-center"
                >
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-900/10 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-700">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
                        Hiring Process
                    </span>
                    <h2 className="mx-auto max-w-[720px] text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-neutral-950">
                        {heading.replace(/\.+$/, "")}
                        <span className="text-[#F5B947]">.</span>
                    </h2>
                    <p className="mx-auto mt-5 max-w-[560px] text-[15px] leading-[1.65] text-neutral-600">
                        {subheading}
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* The vertical rail */}
                    <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-neutral-900/10 sm:left-[23px]" />

                    <ul className="space-y-3">
                        {resolvedSteps.map((step, index) => {
                            const isOpen = active === index;
                            const isPast = active !== null && index < active;
                            return (
                                <li key={`${step.title}-${index}`} className="relative">
                                    <motion.div
                                        initial={{ opacity: 0, x: -16 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.5, delay: index * 0.05, ease: EASE }}
                                        className="flex items-stretch gap-4 sm:gap-5"
                                    >
                                        {/* Marker */}
                                        <div className="relative z-10 flex flex-shrink-0 flex-col items-center pt-3">
                                            <button
                                                onClick={() => setActive(isOpen ? null : index)}
                                                type="button"
                                                aria-expanded={isOpen}
                                                aria-label={`Toggle step ${step.number} ${step.title}`}
                                                className={`grid h-10 w-10 place-items-center rounded-full border-2 transition-all sm:h-12 sm:w-12 ${isOpen || isPast
                                                    ? "border-[#F5B947] bg-[#F5B947] text-[#1a1a1a]"
                                                    : "border-neutral-900/15 bg-white text-neutral-500 hover:border-neutral-900/35"
                                                    }`}
                                            >
                                                {isPast ? (
                                                    <Check className="h-4 w-4" strokeWidth={3} />
                                                ) : (
                                                    <span className="text-[12px] font-bold tabular-nums sm:text-[13px]">
                                                        {step.number}
                                                    </span>
                                                )}
                                            </button>
                                        </div>

                                        {/* Card */}
                                        <button
                                            type="button"
                                            onClick={() => setActive(isOpen ? null : index)}
                                            className={`group flex flex-1 flex-col rounded-3xl border bg-white p-5 text-left shadow-[0_8px_28px_-18px_rgba(10,10,26,0.18)] transition-all sm:p-6 ${isOpen
                                                ? "border-[#F5B947]/60 shadow-[0_18px_50px_-22px_rgba(245,185,71,0.45)]"
                                                : "border-neutral-900/10 hover:-translate-y-px hover:border-neutral-900/25"
                                                }`}
                                        >
                                            <div className="flex flex-wrap items-start justify-between gap-3">
                                                <div className="flex-1">
                                                    <h3 className="text-[18px] font-semibold leading-tight tracking-[-0.01em] text-neutral-950 sm:text-[20px]">
                                                        {step.title}
                                                    </h3>
                                                    {step.subtitle ? (
                                                        <p className="mt-1 text-[13px] text-neutral-500">{step.subtitle}</p>
                                                    ) : null}
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    {step.duration ? (
                                                        <span className="rounded-full border border-neutral-900/10 bg-neutral-50 px-2.5 py-0.5 text-[11px] font-medium tabular-nums text-neutral-600">
                                                            {step.duration}
                                                        </span>
                                                    ) : null}
                                                    <span className="grid h-7 w-7 place-items-center rounded-full border border-neutral-900/12 bg-white text-neutral-700">
                                                        {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                                                    </span>
                                                </div>
                                            </div>

                                            <AnimatePresence initial={false}>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.35, ease: EASE }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="mt-5 border-t border-neutral-900/8 pt-5">
                                                            {step.description ? (
                                                                <p className="text-[14px] leading-[1.7] text-neutral-700">
                                                                    {step.description}
                                                                </p>
                                                            ) : null}
                                                            {step.details && step.details.length > 0 ? (
                                                                <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                                                                    {step.details.map((detail) => (
                                                                        <li
                                                                            key={detail}
                                                                            className="flex items-start gap-2 text-[13px] text-neutral-600"
                                                                        >
                                                                            <span
                                                                                aria-hidden
                                                                                className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                                                                                style={{ background: ACCENT }}
                                                                            />
                                                                            {detail}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            ) : null}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </button>
                                    </motion.div>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Footnote / CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="mt-12 flex flex-col items-start justify-between gap-4 rounded-3xl border border-neutral-900/10 bg-white p-6 text-left sm:flex-row sm:items-center sm:p-7"
                >
                    <div>
                        <p className="text-[15px] font-semibold text-neutral-900">
                            Average time from apply to offer:{" "}
                            <span style={{ color: ACCENT_INK }}>under 12 days</span>.
                        </p>
                        <p className="mt-1 text-[13px] text-neutral-500">
                            We respect your time. Every step has a clear next-action and timeline.
                        </p>
                    </div>
                    <a
                        href="#open-roles"
                        className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-all hover:-translate-y-px"
                    >
                        View open roles <span aria-hidden>→</span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
