"use client";

import { useRef, type MouseEvent as ReactMouseEvent } from "react";
import Link from "next/link";
import {
    motion,
    useInView,
    useMotionValue,
    useMotionTemplate,
    useSpring,
    useTransform,
    type Variants,
} from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, EASE_T, DUR, STAGGER } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ════════════════════════════════════════════════════════════════════
 *  Core Engineering Services — visual upgrade pass.
 *
 *  Visual additions over the previous version:
 *    1. Per-service colour identity (orange/amber/blue/violet) — each
 *       card has its own accent painting the medallion, eyebrow rule,
 *       partner blockquote, CTA underline, and bottom watermark numeral.
 *    2. Glass medallion in the top-right corner — soft tinted glow,
 *       frosted-glass disc, gradient hairline border, then the mark.
 *       Reads as a real product-page detail, not a tiny clip-art.
 *    3. Bottom-right outlined watermark numeral (`01/02/03/04`) — adds
 *       editorial rhythm to the grid (Linear /changelog signature).
 *    4. Subtle vertical gradient inside each card — pure white at top,
 *       1% accent tint at bottom. Cards are no longer flat-identical.
 *
 *  Everything else (motion, typography, hover behaviour, hrefs) stays
 *  identical to the previous version.
 * ════════════════════════════════════════════════════════════════════ */

/* ── Per-service accent palette ─────────────────────────────────
 *  Within the design tokens (FF6B00 + FF5812 + 1852FF) we extend
 *  to a 4-colour set by adding a violet sibling for AI. All four
 *  are used at low opacity for backgrounds and full opacity for
 *  hover-state strokes / numerals / underlines. */
const ACCENT = {
    orange: { ink: "#FF6B00", soft: "rgba(255,107,0,0.10)", glow: "rgba(255,107,0,0.18)" },
    amber: { ink: "#FF8A1F", soft: "rgba(255,138,31,0.10)", glow: "rgba(255,138,31,0.18)" },
    blue: { ink: "#1852FF", soft: "rgba(24,82,255,0.10)", glow: "rgba(24,82,255,0.18)" },
    violet: { ink: "#7C5CFF", soft: "rgba(124,92,255,0.10)", glow: "rgba(124,92,255,0.18)" },
} as const;

type AccentKey = keyof typeof ACCENT;

/* ── Corner marks (gradient SVGs) ────────────────────────────── */

function GradientDef({ id, color }: { id: string; color: string }) {
    return (
        <defs>
            <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity="1" />
                <stop offset="100%" stopColor={color} stopOpacity="0.4" />
            </linearGradient>
        </defs>
    );
}

function MarkGrid({ color }: { color: string }) {
    return (
        <svg viewBox="0 0 96 96" fill="none" className="h-full w-full" aria-hidden>
            <GradientDef id="mark-grid" color={color} />
            <rect x="8" y="8" width="36" height="36" rx="6" stroke="url(#mark-grid)" strokeWidth="1.4" />
            <rect x="52" y="8" width="36" height="36" rx="6" stroke="url(#mark-grid)" strokeWidth="1.0" opacity="0.7" />
            <rect x="8" y="52" width="36" height="36" rx="6" stroke="url(#mark-grid)" strokeWidth="1.0" opacity="0.7" />
            <rect x="52" y="52" width="36" height="36" rx="6" fill={color} />
            <circle cx="86" cy="14" r="2.5" fill={color} />
        </svg>
    );
}

function MarkBars({ color }: { color: string }) {
    return (
        <svg viewBox="0 0 96 96" fill="none" className="h-full w-full" aria-hidden>
            <GradientDef id="mark-bars" color={color} />
            <rect x="10" y="60" width="14" height="28" rx="2" fill="url(#mark-bars)" opacity="0.40" />
            <rect x="32" y="46" width="14" height="42" rx="2" fill="url(#mark-bars)" opacity="0.60" />
            <rect x="54" y="30" width="14" height="58" rx="2" fill="url(#mark-bars)" opacity="0.85" />
            <rect x="76" y="14" width="14" height="74" rx="2" fill={color} />
            <path
                d="M14 56 L36 42 L60 26 L82 12"
                stroke={color}
                strokeWidth="1.4"
                strokeLinecap="round"
            />
            <circle cx="14" cy="56" r="2" fill={color} />
            <circle cx="82" cy="12" r="2.5" fill={color} />
        </svg>
    );
}

function MarkOrbit({ color }: { color: string }) {
    return (
        <svg viewBox="0 0 96 96" fill="none" className="h-full w-full" aria-hidden>
            <GradientDef id="mark-orbit" color={color} />
            <circle cx="48" cy="48" r="32" stroke="url(#mark-orbit)" strokeWidth="1.4" />
            <ellipse cx="48" cy="48" rx="32" ry="12" stroke="url(#mark-orbit)" strokeWidth="0.9" opacity="0.7" />
            <ellipse cx="48" cy="48" rx="12" ry="32" stroke="url(#mark-orbit)" strokeWidth="0.9" opacity="0.7" />
            <path
                d="M16 48 a 32 12 0 0 1 64 0"
                stroke={color}
                strokeWidth="1.4"
                strokeLinecap="round"
            />
            <circle cx="48" cy="48" r="3.5" fill={color} />
            <circle cx="80" cy="48" r="3" fill={color} />
            <circle cx="78" cy="48" r="6" fill={color} opacity="0.18" />
        </svg>
    );
}

function MarkWindow({ color }: { color: string }) {
    return (
        <svg viewBox="0 0 96 96" fill="none" className="h-full w-full" aria-hidden>
            <GradientDef id="mark-window" color={color} />
            <rect x="6" y="14" width="68" height="50" rx="6" stroke="url(#mark-window)" strokeWidth="1.0" opacity="0.7" />
            <circle cx="14" cy="22" r="1.5" fill={color} />
            <circle cx="20" cy="22" r="1.5" fill={color} />
            <circle cx="26" cy="22" r="1.5" fill={color} />
            <rect x="22" y="32" width="68" height="58" rx="6" stroke="url(#mark-window)" strokeWidth="1.4" fill="white" />
            <circle cx="30" cy="40" r="1.5" fill={color} />
            <circle cx="36" cy="40" r="1.5" fill={color} />
            <circle cx="42" cy="40" r="1.5" fill={color} />
            <rect x="30" y="50" width="36" height="2" rx="1" fill={color} opacity="0.45" />
            <rect x="30" y="56" width="48" height="2" rx="1" fill={color} opacity="0.30" />
            <rect x="30" y="62" width="24" height="2" rx="1" fill={color} opacity="0.45" />
        </svg>
    );
}

/* ── Service data ────────────────────────────────────────────── */

type Mark = "grid" | "bars" | "orbit" | "window";

const services: Array<{
    index: string;
    category: string;
    title: string;
    desc: string;
    tech: string[];
    partner: string;
    href: string;
    mark: Mark;
    accent: AccentKey;
}> = [
        {
            index: "01",
            category: "Power Platform",
            title: "Business Applications Delivery Support",
            desc: "Helping partners execute Power Platform and Dynamics implementations.",
            tech: ["Power Apps", "Power Automate", "Dataverse"],
            partner: "We operate as your extended Power Platform engineering team.",
            href: "/services/business-applications/power-platform",
            mark: "grid",
            accent: "orange",
        },
        {
            index: "02",
            category: "Data & BI",
            title: "Data & Analytics Execution",
            desc: "Building scalable data solutions and BI environments for partners.",
            tech: ["Power BI", "Microsoft Fabric", "Databricks", "Snowflake"],
            partner: "We bring reliable data engineering and up-to-date analytics expertise.",
            href: "/services/data-analytics/power-bi",
            mark: "bars",
            accent: "blue",
        },
        {
            index: "03",
            category: "Intelligent AI",
            title: "AI & Intelligent Automation",
            desc: "Integrating AI solutions to improve business processes and experiences.",
            tech: ["Azure AI Foundry", "Copilot Integration", "AI Agents", "RAG Workflows"],
            partner: "Operate with confidence using our AI integration expertise.",
            href: "/services/ai-intelligence/agentic-ai",
            mark: "orbit",
            accent: "violet",
        },
        {
            index: "04",
            category: "Workspace",
            title: "Digital Workspace & App Engineering",
            desc: "Enhancing and extending your Microsoft 365 collaboration environments.",
            tech: ["SharePoint Online", "Microsoft 365", "Web Applications", "Mobile Applications"],
            partner: "Securely deliver and support modern workspace solutions.",
            href: "/services/digital-workspace/sharepoint",
            mark: "window",
            accent: "amber",
        },
    ];

const MARK = { grid: MarkGrid, bars: MarkBars, orbit: MarkOrbit, window: MarkWindow } as const;

/* ── Variants ────────────────────────────────────────────────── */

const cardContainer: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: STAGGER.tight, delayChildren: 0.05 },
    },
};

/* Alternating reveal directions for the 2×2 grid:
 *   • cards 0 & 3 (top-left + bottom-right) → fade up from y
 *   • cards 1 & 2 (top-right + bottom-left) → fade in from x (one each)
 * Creates a more dynamic, less repetitive scroll entry. */
const REVEAL_VARIANT_BY_INDEX: Variants[] = [
    {
        hidden: { opacity: 0, y: 24, x: 0 },
        visible: { opacity: 1, y: 0, x: 0 },
    },
    {
        hidden: { opacity: 0, x: 28, y: 0 },
        visible: { opacity: 1, x: 0, y: 0 },
    },
    {
        hidden: { opacity: 0, x: -28, y: 0 },
        visible: { opacity: 1, x: 0, y: 0 },
    },
    {
        hidden: { opacity: 0, y: 24, x: 0 },
        visible: { opacity: 1, y: 0, x: 0 },
    },
];

const fadeUpInner: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
};

/* ── WordReveal ─────────────────────────────────────────────── */
function WordReveal({
    text,
    delay = 0,
    className = "",
}: {
    text: string;
    delay?: number;
    className?: string;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-12%" });
    const words = text.split(" ");
    return (
        <span ref={ref} className={`inline-flex flex-wrap gap-x-[0.28em] ${className}`}>
            {words.map((w, i) => (
                <span key={i} className="inline-flex overflow-hidden">
                    <motion.span
                        className="inline-block"
                        initial={{ y: "100%", opacity: 0 }}
                        animate={inView ? { y: 0, opacity: 1 } : {}}
                        transition={{ duration: 0.65, delay: delay + i * 0.05, ease: EASE_T.silk }}
                    >
                        {w}
                    </motion.span>
                </span>
            ))}
        </span>
    );
}

/* ── Service card ─────────────────────────────────────────── */

function ServiceCard({
    service,
    cardIndex,
}: {
    service: (typeof services)[number];
    cardIndex: number;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const inView = useInView(cardRef, { once: true, margin: "-12%" });
    const Mark = MARK[service.mark];
    const accent = ACCENT[service.accent];

    const { index, category, title, desc, tech, partner, href } = service;

    /* Cursor-following spotlight motion values (per-card).
     *
     * Anchored off-screen at (-9999, -9999) so no spotlight paints until
     * the user enters the card. The composed `radial-gradient` template
     * subscribes to those motion values — only the gradient repaints, no
     * React re-renders. */
    const mouseX = useMotionValue(-9999);
    const mouseY = useMotionValue(-9999);
    const spotBg = useMotionTemplate`radial-gradient(360px circle at ${mouseX}px ${mouseY}px, ${accent.glow}, transparent 70%)`;

    /* Magnetic 3D tilt — Apple keynote / Linear product card signature.
     *
     *  rawX/rawY hold cursor position normalized to (-0.5 .. +0.5) inside
     *  the card. They feed two transforms:
     *    • rotateX = -rawY * MAX_TILT  (cursor up → card tilts up)
     *    • rotateY =  rawX * MAX_TILT  (cursor right → card tilts right)
     *
     *  Spring-smoothed so it doesn't lag the cursor or snap. Reset to 0
     *  on leave so the card returns to flat smoothly. */
    const MAX_TILT = 5;
    const rawTiltX = useMotionValue(0);
    const rawTiltY = useMotionValue(0);
    const tiltSpringConfig = { stiffness: 220, damping: 24, mass: 0.4 };
    const tiltX = useSpring(rawTiltX, tiltSpringConfig);
    const tiltY = useSpring(rawTiltY, tiltSpringConfig);
    const rotateX = useTransform(tiltY, (v) => -v * MAX_TILT);
    const rotateY = useTransform(tiltX, (v) => v * MAX_TILT);
    const cardTransform = useMotionTemplate`perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    const handleMove = (e: ReactMouseEvent<HTMLDivElement>) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;
        const lx = e.clientX - rect.left;
        const ly = e.clientY - rect.top;
        mouseX.set(lx);
        mouseY.set(ly);
        // Normalized −0.5..+0.5
        rawTiltX.set(lx / rect.width - 0.5);
        rawTiltY.set(ly / rect.height - 0.5);
    };
    const handleLeave = () => {
        mouseX.set(-9999);
        mouseY.set(-9999);
        rawTiltX.set(0);
        rawTiltY.set(0);
    };

    /* Pick alternating reveal direction by card position in the grid. */
    const revealVariant = REVEAL_VARIANT_BY_INDEX[cardIndex] ?? REVEAL_VARIANT_BY_INDEX[0];

    return (
        <motion.article
            ref={cardRef}
            variants={revealVariant}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{
                duration: 0.7,
                delay: cardIndex * 0.08,
                ease: EASE_T.silk,
            }}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={
                {
                    ["--card-accent" as string]: accent.ink,
                    ["--card-soft" as string]: accent.soft,
                    ["--card-glow" as string]: accent.glow,
                    transform: cardTransform,
                    transformStyle: "preserve-3d",
                } as React.CSSProperties
            }
            className="group relative flex flex-col overflow-hidden rounded-[22px] border border-[#0a0a1a]/8 bg-white p-6 md:p-7 lg:p-8 shadow-[0_1px_2px_rgba(10,10,26,0.04),0_8px_28px_-12px_rgba(10,10,26,0.10)] transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-[var(--card-accent)]/25 hover:shadow-[0_22px_50px_-22px_rgba(10,10,26,0.20)]"
        >
            {/* ─ Layer A — vertical surface gradient (kept from prior) ─ */}
            <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-0"
                style={{
                    background:
                        "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 60%, var(--card-soft) 100%)",
                }}
            />

            {/* ─ Layer B — accent corner gradient on hover ─ */}
            <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-0 opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
                style={{
                    background:
                        "linear-gradient(135deg, var(--card-soft) 0%, transparent 55%)",
                }}
            />

            {/* ─ Layer B' — Cursor-following spotlight (NEW) ──────────────
             *
             *  Soft 360px radial of the card's accent glow that follows
             *  the cursor. Paints only on hover (parent fades it in/out).
             *  Sits behind the watermark and content. `mix-blend-multiply`
             *  is what keeps it gentle — additive blending would blow out. */}
            <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-0 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
                style={{
                    background: spotBg,
                    mixBlendMode: "multiply",
                    willChange: "background, opacity",
                }}
            />

            {/* ─ Layer C — Watermark numeral (NEW: slides in on hover) ─
             *
             *  Idle: positioned at -bottom-3 -right-1.
             *  Hover: translates to bottom-1 right-3 + slight scale-in,
             *         opacity steps up. Adds life without distracting. */}
            <span
                aria-hidden
                className="pointer-events-none absolute -bottom-3 -right-1 select-none text-[140px] md:text-[160px] lg:text-[180px] font-bold leading-none tabular-nums text-transparent transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:opacity-100 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:scale-[1.03]"
                style={{
                    opacity: 0.55,
                    WebkitTextStroke: "1px var(--card-soft)",
                    letterSpacing: "-0.04em",
                }}
            >
                {index}
            </span>

            {/* ─ Layer D — Glass medallion + mark (kept from prior) ─ */}
            <div className="pointer-events-none absolute right-5 top-5 z-10 md:right-7 md:top-7">
                <span
                    aria-hidden
                    className="absolute -inset-4 rounded-full opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: "var(--card-glow)" }}
                />
                <div
                    className="relative grid h-[64px] w-[64px] place-items-center rounded-full border border-[#0a0a1a]/10 bg-white/80 backdrop-blur-md md:h-[76px] md:w-[76px]"
                    style={{
                        boxShadow:
                            "0 1px 2px rgba(10,10,26,0.06), 0 8px 18px -10px rgba(10,10,26,0.18), inset 0 1px 0 rgba(255,255,255,0.7)",
                    }}
                >
                    <div
                        className="h-9 w-9 transition-colors duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] md:h-11 md:w-11"
                        style={{ color: accent.ink }}
                    >
                        <Mark color={accent.ink} />
                    </div>
                </div>
            </div>

            {/* ─ Layer E — Border Beam (NEW: SVG comet trail) ──────────
             *
             *  Single bright "comet" runs along the rounded border on hover.
             *  Implemented with SVG `<rect>` + stroke-dash trick:
             *    • `pathLength="100"` normalizes the perimeter to 100 units
             *    • `strokeDasharray="14 86"` paints 14% visible / 86% gap
             *    • Animating `stroke-dashoffset: 0 → -100` walks the comet
             *      around the rect once per 3s
             *  Two layers: a wider blurred halo (drama) + a tight bright
             *  core (precision). Together they read as a real glowing
             *  trail, not a CSS gradient.
             *
             *  Animation paused at idle, runs only while hovering. */}
            <svg
                aria-hidden
                className="pointer-events-none absolute inset-0 z-[1] h-full w-full opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
                style={{ overflow: "visible" }}
            >
                {/* Halo trail */}
                <rect
                    x="0.5"
                    y="0.5"
                    width="calc(100% - 1px)"
                    height="calc(100% - 1px)"
                    rx="21.5"
                    fill="none"
                    stroke={accent.ink}
                    strokeOpacity="0.35"
                    strokeWidth="6"
                    strokeLinecap="round"
                    pathLength="100"
                    strokeDasharray="10 90"
                    className="spp-beam"
                    style={{ filter: "blur(4px)" }}
                />
                {/* Core comet */}
                <rect
                    x="0.5"
                    y="0.5"
                    width="calc(100% - 1px)"
                    height="calc(100% - 1px)"
                    rx="21.5"
                    fill="none"
                    stroke={accent.ink}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    pathLength="100"
                    strokeDasharray="14 86"
                    className="spp-beam"
                />
            </svg>

            <style>{`
                @keyframes spp-beam-trace {
                    to { stroke-dashoffset: -100; }
                }
                .spp-beam {
                    animation: spp-beam-trace 3s linear infinite;
                    animation-play-state: paused;
                }
                .group:hover .spp-beam {
                    animation-play-state: running;
                }
                @media (prefers-reduced-motion: reduce) {
                    .spp-beam { animation: none !important; }
                }
            `}</style>

            {/* ── Card content (z-20 above all layers) ── */}

            {/* Masthead — index • rule • category */}
            <motion.div
                variants={fadeUpInner}
                transition={{ duration: 0.5, ease: EASE_T.silk }}
                className="relative z-20 mb-5 flex items-baseline gap-3 pr-24 md:pr-28"
            >
                <span
                    className="tabular-nums text-[12px] font-semibold transition-colors duration-500"
                    style={{ color: "var(--card-accent)" }}
                >
                    {index}
                </span>
                <span
                    className="block h-px w-7 transition-colors duration-500"
                    style={{ backgroundColor: "rgba(10,10,26,0.18)" }}
                />
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#0a0a1a]/55">
                    {category}
                </span>
            </motion.div>

            {/* Title */}
            <motion.h3
                variants={fadeUpInner}
                transition={{ duration: 0.6, ease: EASE_T.silk }}
                className="relative z-20 text-[20px] md:text-[22px] lg:text-[24px] font-semibold leading-[1.18] tracking-[-0.018em] text-[#0a0a1a] max-w-[22ch] pr-24 md:pr-28"
            >
                <WordReveal text={title} delay={cardIndex * 0.05} />
            </motion.h3>

            {/* Description */}
            <motion.p
                variants={fadeUpInner}
                transition={{ duration: 0.55, ease: EASE_T.silk }}
                className="relative z-20 mt-3 text-[14.5px] leading-[1.55] text-[#0a0a1a]/65 max-w-[44ch]"
            >
                {desc}
            </motion.p>

            {/* Tech chips */}
            <motion.div
                variants={fadeUpInner}
                transition={{ duration: 0.5, ease: EASE_T.silk }}
                className="relative z-20 mt-5 flex flex-wrap items-center gap-1.5"
            >
                {tech.map((t, i) => (
                    <span
                        key={t}
                        className="inline-flex items-center gap-1.5 rounded-full border bg-white px-2.5 py-[5px] text-[10.5px] font-medium uppercase tracking-[0.10em] text-[#0a0a1a]/70 transition-[border-color,color] duration-300 group-hover:text-[#0a0a1a]/85"
                        style={{
                            borderColor: "rgba(10,10,26,0.10)",
                            backgroundColor: "rgba(255,255,255,0.85)",
                        }}
                    >
                        {i === 0 && (
                            <span
                                aria-hidden
                                className="block h-1.5 w-1.5 rounded-full"
                                style={{ backgroundColor: accent.ink }}
                            />
                        )}
                        {t}
                    </span>
                ))}
            </motion.div>

            {/* Hairline divider */}
            <motion.div
                variants={fadeUpInner}
                transition={{ duration: 0.5, ease: EASE_T.silk }}
                className="relative z-20 mt-5 h-px w-full bg-[#0a0a1a]/8"
            />

            {/* Partner blockquote */}
            <motion.p
                variants={fadeUpInner}
                transition={{ duration: 0.55, ease: EASE_T.silk }}
                className="relative z-20 mt-5 pl-4 text-[13.5px] leading-[1.55] text-[#0a0a1a]/75 transition-colors duration-500 group-hover:text-[#0a0a1a]/90"
            >
                <span
                    aria-hidden
                    className="absolute left-0 top-0 block h-full w-[2px] origin-top scale-y-90 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-y-100"
                    style={{ backgroundColor: "var(--card-accent)" }}
                />
                {partner}
            </motion.p>

            {/* CTA */}
            <motion.div
                variants={fadeUpInner}
                transition={{ duration: 0.55, ease: EASE_T.silk }}
                className="relative z-20 mt-auto pt-5"
            >
                <Link
                    href={href}
                    aria-label={`Explore ${category} solution`}
                    className="group/btn relative inline-flex items-center gap-2 text-[13px] font-semibold tracking-[-0.005em] text-[#0a0a1a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    style={{
                        ["--tw-ring-color" as string]: "var(--card-accent)",
                    }}
                >
                    <span className="relative">
                        Explore solution
                        <span
                            aria-hidden
                            className="absolute -bottom-0.5 left-0 block h-[1.5px] w-0 transition-[width] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/btn:w-full"
                            style={{ backgroundColor: "var(--card-accent)" }}
                        />
                    </span>
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden
                        className="transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/btn:translate-x-0.5"
                    >
                        <path d="M3 7h8M7.5 3l3.5 4-3.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
            </motion.div>
        </motion.article>
    );
}

/* ── Main section ───────────────────────────────────────────── */

export default function CoreEngineeringServices() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const headingInView = useInView(headingRef, { once: true, margin: "-15%" });

    useGSAP(
        () => {
            if (!sectionRef.current) return;
            const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (reduced) return;

            const line = sectionRef.current.querySelector(".decor-line");
            if (!line) return;

            gsap.fromTo(
                line,
                { scaleX: 0, transformOrigin: "left center" },
                {
                    scaleX: 1,
                    duration: DUR.section,
                    ease: EASE.silk,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        },
        { scope: sectionRef }
    );

    const credentials = [
        { label: "Verticals", value: "4 service practices" },
        { label: "Teams", value: "Senior + certified" },
        { label: "Scope", value: "Enterprise-grade" },
    ];

    return (
        <section
            ref={sectionRef}
            data-section="support-partners"
            data-theme-section="light"
            className="relative w-full overflow-hidden bg-white py-20 md:py-24 lg:py-32"
        >
            {/* Atmosphere — single warm gradient anchored top-right (kept). */}
            <span
                aria-hidden
                className="pointer-events-none absolute -top-40 -right-32 z-0 h-[640px] w-[640px] rounded-full"
                style={{
                    background:
                        "radial-gradient(closest-side, rgba(255,107,0,0.10), rgba(255,107,0,0) 70%)",
                    filter: "blur(40px)",
                }}
            />

            {/* Vercel-style blueprint grid */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, rgba(10,10,26,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,10,26,0.045) 1px, transparent 1px)",
                    backgroundSize: "64px 64px",
                    maskImage:
                        "radial-gradient(ellipse 70% 55% at 50% 45%, black 30%, transparent 100%)",
                    WebkitMaskImage:
                        "radial-gradient(ellipse 70% 55% at 50% 45%, black 30%, transparent 100%)",
                }}
            />

            <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-12">
                {/* ── Section header ── */}
                <div ref={headingRef} className="relative mb-14 md:mb-18 max-w-[820px]">
                    <span
                        aria-hidden
                        className="decor-line absolute -left-12 top-3 hidden h-px w-10 bg-gradient-to-r from-[#FF6B00] to-transparent lg:block"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={headingInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, ease: EASE_T.silk }}
                        className="mb-6 flex items-baseline gap-3 text-[12px] font-medium"
                    >
                        <span className="tabular-nums text-[#0a0a1a]/35">§ 01</span>
                        <span className="h-px w-8 bg-[#0a0a1a]/15" />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FF6B00]">
                            Core Capabilities
                        </span>
                    </motion.div>

                    <h2 className="text-[clamp(34px,5vw,64px)] font-semibold leading-[0.98] tracking-[-0.03em] text-[#0a0a1a]">
                        <WordReveal text="Core Engineering Services" delay={0.1} />
                    </h2>

                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={headingInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.35, ease: EASE_T.silk }}
                        className="mt-6 max-w-[640px] text-[16px] md:text-[17px] leading-[1.55] text-[#0a0a1a]/65"
                    >
                        Four verticals, one delivery standard. Enterprise-grade engineering across Microsoft platforms and modern web stacks — scoped, scaled, and shipped by senior teams.
                    </motion.p>

                    <motion.dl
                        initial={{ opacity: 0, y: 12 }}
                        animate={headingInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.5, ease: EASE_T.silk }}
                        className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-[700px]"
                    >
                        {credentials.map((c) => (
                            <div key={c.label} className="flex items-baseline gap-3">
                                <dt className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0a0a1a]/40">
                                    {c.label}
                                </dt>
                                <dd className="text-[13px] font-medium text-[#0a0a1a]/85 leading-tight">
                                    {c.value}
                                </dd>
                            </div>
                        ))}
                    </motion.dl>
                </div>

                {/* ── 2×2 service grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
                    {services.map((service, idx) => (
                        <ServiceCard key={service.index} service={service} cardIndex={idx} />
                    ))}
                </div>

                {/* ── Closing band ── */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.6, ease: EASE_T.silk }}
                    className="mt-12 md:mt-16 flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8 border-t border-[#0a0a1a]/8 pt-7 md:pt-8"
                >
                    <p className="max-w-[520px] text-[14px] leading-[1.55] text-[#0a0a1a]/65">
                        Looking for something more specific? Browse the full delivery catalogue across infrastructure, AI, and digital workplace.
                    </p>
                    <Link
                        href="/services"
                        className="group/closer relative inline-flex items-center gap-2 self-start text-[13px] font-semibold text-[#0a0a1a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white md:self-auto"
                    >
                        <span className="relative">
                            See all services
                            <span
                                aria-hidden
                                className="absolute -bottom-0.5 left-0 block h-[1.5px] w-0 bg-[#FF6B00] transition-[width] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/closer:w-full"
                            />
                        </span>
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            aria-hidden
                            className="transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/closer:translate-x-0.5"
                        >
                            <path d="M3 7h8M7.5 3l3.5 4-3.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
