"use client";

/* ============================================================================
 * Engineering Solutions Built for Impact
 * ──────────────────────────────────────────────────────────────────────────
 * A 12-column marketing block on a soft off-white surface:
 *
 *   ┌──────────────── HEADING ────────────────┬─── 4 STAT CARDS ────┐
 *   │                                         │                     │
 *   ├─── DARK ENGINEERING PLATFORM CARD ──────┼─── AI SYSTEMS ──────┤
 *   │  (spans 2 rows, isometric illustration) ├──── DATA + CLOUD ───┤
 *   │                                         ├──── DIGITAL PROD. ──┤
 *   ├─────── TRUSTED-BY LOGO STRIP ───────────┴─── CONSULTATION CTA ┘
 *
 * All illustrations are inline SVG defined in ./illustrations.tsx so the
 * section is portable and pixel-stable across builds.
 * ========================================================================= */

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/homepage-light/SectionHeader";
import { DUR, EASE_T, VIEWPORT } from "@/lib/motion";

import LogoLoopTechStack from "@/components/sections/engineering-solutions/LogoLoopTechStack";
import {
    EngineeringPlatformIllustration,
    AICubeIllustration,
    DataAnalyticsIllustration,
    CloudInfraIllustration,
    DigitalProductsIllustration,
} from "./illustrations";

/* ─────────────────────────────  TOKENS  ──────────────────────────────────── */

const SURFACE_BG = "#F3F0EE";
const ACCENT_ORANGE = "#FF5812";
const ACCENT_BLUE = "#1852FF";
const CARD_RING = "ring-1 ring-[#0a0a1a]/[0.06]";
const CARD_SHADOW =
    "shadow-[0_1px_2px_rgba(10,10,26,0.04),0_10px_28px_-14px_rgba(10,10,26,0.08)]";
const CARD_RADIUS = "rounded-[18px]";
const CARD_BASE = `relative overflow-hidden ${CARD_RADIUS} bg-white ${CARD_RING} ${CARD_SHADOW}`;
const EASE_SILK = EASE_T.silk;

const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0 },
};

/* ─────────────────────────────  ICONS  ──────────────────────────────────── */

function FolderIcon({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
            <path
                d="M4 7 a2 2 0 0 1 2 -2 h4 l2 2 h6 a2 2 0 0 1 2 2 v8 a2 2 0 0 1 -2 2 H6 a2 2 0 0 1 -2 -2 z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function UsersIcon({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
            <g
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="9" cy="9" r="3" />
                <circle cx="17" cy="10" r="2.4" />
                <path d="M3 19 c 0 -3 3 -5 6 -5 s 6 2 6 5" />
                <path d="M15 19 c 0 -2 2 -4 4 -4 s 2 1 2 1" />
            </g>
        </svg>
    );
}

function ShieldIcon({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
            <path
                d="M12 3 l8 3 v6 c 0 5 -4 8 -8 9 c -4 -1 -8 -4 -8 -9 V 6 z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function GlobeIcon({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
            <g fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="12" r="9" />
                <ellipse cx="12" cy="12" rx="4" ry="9" />
                <line x1="3" y1="12" x2="21" y2="12" />
            </g>
        </svg>
    );
}

function CodeBracketsIcon({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
            <g
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polyline points="8 7 3 12 8 17" />
                <polyline points="16 7 21 12 16 17" />
                <line x1="14" y1="5" x2="10" y2="19" />
            </g>
        </svg>
    );
}

function BrainIcon({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
            <g fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12 h18 M12 3 c 3 4 3 14 0 18 M12 3 c -3 4 -3 14 0 18" />
            </g>
        </svg>
    );
}

function ChartIcon({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
            <g
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            >
                <line x1="4" y1="20" x2="20" y2="20" />
                <line x1="7" y1="20" x2="7" y2="14" />
                <line x1="12" y1="20" x2="12" y2="9" />
                <line x1="17" y1="20" x2="17" y2="11" />
            </g>
        </svg>
    );
}

function CloudIcon({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
            <path
                d="M7 18 a4 4 0 0 1 0 -8 a5 5 0 0 1 10 0 a3 3 0 0 1 0 6 a 3 3 0 0 1 -1.5 2 z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function GridIcon({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
            <g fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3" y="3" width="8" height="8" rx="1.5" />
                <rect x="13" y="3" width="8" height="8" rx="1.5" />
                <rect x="3" y="13" width="8" height="8" rx="1.5" />
                <rect x="13" y="13" width="8" height="8" rx="1.5" />
            </g>
        </svg>
    );
}

function CogIcon({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
            <g fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2 v3 M12 19 v3 M2 12 h3 M19 12 h3 M5 5 l2 2 M17 17 l2 2 M5 19 l2 -2 M17 7 l2 -2" />
            </g>
        </svg>
    );
}

function ScaleIcon({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
            <g
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polyline points="4 14 4 4 14 4" />
                <polyline points="20 10 20 20 10 20" />
                <line x1="4" y1="4" x2="11" y2="11" />
                <line x1="20" y1="20" x2="13" y2="13" />
            </g>
        </svg>
    );
}

function LayersIcon({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
            <g
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
            >
                <polygon points="12 3 21 8 12 13 3 8" />
                <polyline points="3 13 12 18 21 13" />
                <polyline points="3 17 12 22 21 17" />
            </g>
        </svg>
    );
}

function BoltIcon({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
            <polygon
                points="13 2 4 14 11 14 9 22 20 10 13 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
            />
        </svg>
    );
}

/* ─────────────────────────────  ATOMS  ──────────────────────────────────── */

/** Stat card (top-right row × 4).
 *  Sizing tuned for the 4-up layout: tight horizontal padding + responsive
 *  type so the value never line-wraps and the label clamps to ≤2 lines. */
function StatCard({
    icon,
    iconColor,
    iconBg,
    value,
    label,
    delay = 0,
}: {
    icon: React.ReactNode;
    iconColor: string;
    iconBg: string;
    value: string;
    label: string;
    delay?: number;
}) {
    return (
        <motion.div
            variants={fadeUp}
            transition={{ duration: DUR.panel, delay, ease: EASE_SILK }}
            className={`${CARD_BASE} flex h-full flex-col px-3 py-3 transition-transform duration-300 hover:-translate-y-0.5 sm:px-3.5 sm:py-3.5`}
        >
            <div
                className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-[9px]"
                style={{ background: iconBg, color: iconColor }}
            >
                {icon}
            </div>
            <div className="text-[1.35rem] font-semibold leading-none tracking-[-0.04em] text-[#0a0a1a] sm:text-[1.5rem]">
                {value}
            </div>
            <div className="mt-1.5 text-[13px] font-medium leading-snug text-[#0a0a1a]/58">
                {label}
            </div>
        </motion.div>
    );
}

/** Pill/chip used in capability cards */
function Chip({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center rounded-full border border-[#0a0a1a]/[0.08] bg-[#F3F0EE]/60 px-2.5 py-0.5 text-[11px] font-medium text-[#0a0a1a]/68">
            {children}
        </span>
    );
}

/** "View Capabilities →" link with animated arrow */
function ViewCapabilitiesLink({ color }: { color: string }) {
    return (
        <a
            href="#"
            className="group inline-flex items-center gap-1.5 text-[13px] font-semibold"
            style={{ color }}
        >
            View Capabilities
            <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2.4}
            />
        </a>
    );
}

/** Capability card (right column).
 *
 *  Layout modes:
 *   - "right" : default 1fr / 42% split, illustration right-aligned
 *   - "wide"  : 38% / 1fr split, illustration takes more space (AI card)
 *   - "block" : single column, illustration becomes a bottom band
 *
 *  The card is `h-full` so a parent grid (e.g. md:grid-cols-2) can
 *  equalize sibling card heights without ragged baselines. */
function CapabilityCard({
    iconBg,
    iconColor,
    icon,
    title,
    description,
    chips,
    illustration,
    illustrationLayout = "right",
    className = "",
    delay = 0,
}: {
    iconBg: string;
    iconColor: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    chips: string[];
    illustration: React.ReactNode;
    illustrationLayout?: "right" | "block" | "wide";
    className?: string;
    delay?: number;
}) {
    return (
        <motion.div
            variants={fadeUp}
            transition={{ duration: DUR.panel, delay, ease: EASE_SILK }}
            className={`${CARD_BASE} ${className} h-full transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 motion-reduce:hover:translate-y-0`}
        >
            <div
                className={
                    illustrationLayout === "right"
                        ? "grid h-full grid-cols-1 gap-3 p-4 sm:grid-cols-[minmax(0,1fr)_34%] sm:items-center sm:gap-4 sm:p-4 lg:p-[18px]"
                        : illustrationLayout === "wide"
                            ? "grid h-full grid-cols-1 gap-3 p-4 sm:grid-cols-[minmax(0,44%)_minmax(0,1fr)] sm:items-center sm:gap-4 sm:p-4 lg:p-[18px]"
                            : "flex h-full flex-col p-4 sm:p-4 lg:p-[18px]"
                }
            >
                {/* Text column */}
                <div className="flex min-w-0 flex-col justify-center">
                    <div className="mb-2.5 flex items-center gap-2.5">
                        <div
                            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px]"
                            style={{ background: iconBg, color: iconColor }}
                        >
                            {icon}
                        </div>
                        <h3 className="text-balance text-[1.05rem] font-semibold leading-[1.2] tracking-[-0.025em] text-[#0a0a1a] sm:text-[1.125rem]">
                            {title}
                        </h3>
                    </div>

                    <p className="mb-3 max-w-[42ch] text-pretty text-[0.875rem] leading-[1.58] text-[#0a0a1a]/62 sm:text-[0.9375rem]">
                        {description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                        {chips.map((c) => (
                            <Chip key={c}>{c}</Chip>
                        ))}
                    </div>
                </div>

                {/* Illustration column / band — illustrations are responsive
                 *  via `w-full` on the inner SVG container, capped by the
                 *  per-illustration max-width set at the call site. */}
                <div
                    className={
                        illustrationLayout === "right"
                            ? "flex min-h-0 min-w-0 max-h-[132px] items-center justify-center sm:max-h-[148px] sm:justify-end"
                            : illustrationLayout === "wide"
                                ? "flex min-h-0 min-w-0 max-h-[140px] items-center justify-center sm:max-h-[156px]"
                                : "mt-3 flex min-w-0 max-h-[140px] items-center justify-center"
                    }
                >
                    <div className="h-full w-full [&_svg]:mx-auto [&_svg]:h-full [&_svg]:max-h-full [&_svg]:w-auto [&_svg]:max-w-full">
                        {illustration}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

/* ─────────────────────────────  SECTION  ────────────────────────────────── */

export default function EngineeringSolutionsSection() {
    const reduce = useReducedMotion();

    const viewportProps = reduce
        ? { initial: "show", animate: "show" as const }
        : {
            initial: "hidden" as const,
            whileInView: "show" as const,
            viewport: VIEWPORT.default,
        };

    return (
        <section
            data-section="engineering-solutions"
            data-theme-section="light"
            aria-labelledby="engineering-solutions-heading"
            className="relative w-full overflow-hidden py-20 md:py-24 lg:py-28"
            style={{ background: SURFACE_BG }}
        >
            <span
                aria-hidden
                className="pointer-events-none absolute -right-24 top-0 z-0 h-[520px] w-[520px] rounded-full"
                style={{
                    background:
                        "radial-gradient(closest-side, rgba(24,82,255,0.07), rgba(24,82,255,0) 72%)",
                    filter: "blur(36px)",
                }}
            />

            <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-12">
                {/* ───── Top row: heading + 4 stat cards ───── */}
                <motion.div
                    variants={{
                        hidden: {},
                        show: { transition: { staggerChildren: 0.06 } },
                    }}
                    {...viewportProps}
                    className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8"
                >
                    <motion.div variants={fadeUp} transition={{ duration: DUR.section, ease: EASE_SILK }} className="lg:col-span-5">
                        <SectionHeader
                            badge="Capabilities"
                            accent={ACCENT_ORANGE}
                            headline={
                                <span id="engineering-solutions-heading">
                                    Engineering solutions built for impact
                                </span>
                            }
                            body="From intelligent applications to cloud platforms — scalable, secure, and aligned with how enterprise teams actually ship."
                            className="gap-4 [&_h2]:!text-[clamp(1.625rem,2.6vw,2.35rem)] [&_h2]:!leading-[1.08] [&_h2]:!tracking-[-0.035em] [&_p]:!max-w-[46ch] [&_p]:!text-[15px] [&_p]:!leading-[1.6]"
                        />
                    </motion.div>

                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3 lg:col-span-7 lg:items-end">
                        <StatCard
                            icon={<FolderIcon className="h-[18px] w-[18px]" />}
                            iconColor={ACCENT_BLUE}
                            iconBg="rgba(24,82,255,0.1)"
                            value="250+"
                            label="Projects Delivered"
                            delay={0.05}
                        />
                        <StatCard
                            icon={<UsersIcon className="h-[18px] w-[18px]" />}
                            iconColor={ACCENT_ORANGE}
                            iconBg="rgba(255,88,18,0.1)"
                            value="98%"
                            label="Client Satisfaction"
                            delay={0.12}
                        />
                        <StatCard
                            icon={<ShieldIcon className="h-[18px] w-[18px]" />}
                            iconColor={ACCENT_BLUE}
                            iconBg="rgba(24,82,255,0.1)"
                            value="12+"
                            label="Years of Experience"
                            delay={0.19}
                        />
                        <StatCard
                            icon={<GlobeIcon className="h-[18px] w-[18px]" />}
                            iconColor={ACCENT_ORANGE}
                            iconBg="rgba(255,88,18,0.1)"
                            value="24/7"
                            label="Support Available"
                            delay={0.26}
                        />
                    </div>
                </motion.div>

                {/* ───── Main showcase grid ─────
                 *  `lg:items-stretch` so the dark Engineering Platform card
                 *  on the left and the right column equalize their heights.
                 *  Mobile stacks vertically (1 col), tablet keeps stacked,
                 *  desktop splits 5/7. */}
                <motion.div
                    variants={{
                        hidden: {},
                        show: { transition: { staggerChildren: 0.08 } },
                    }}
                    {...viewportProps}
                    className="mt-8 grid grid-cols-1 gap-3 lg:mt-10 lg:grid-cols-12 lg:items-stretch lg:gap-4"
                >
                    {/* ─── DARK ENGINEERING PLATFORM CARD ─── */}
                    <motion.div
                        variants={fadeUp}
                        transition={{ duration: DUR.section, ease: EASE_SILK }}
                        className="relative overflow-hidden rounded-[20px] lg:col-span-5"
                        style={{
                            background:
                                "radial-gradient(120% 100% at 0% 0%, #1a1a2e 0%, #12121f 48%, #0a0a1a 100%)",
                            boxShadow:
                                "inset 0 1px 0 rgba(255,255,255,0.06), 0 24px 56px -28px rgba(10,10,26,0.5)",
                        }}
                    >
                        {/* subtle orbital lines */}
                        <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
                            <svg
                                viewBox="0 0 520 720"
                                preserveAspectRatio="none"
                                className="h-full w-full"
                                aria-hidden="true"
                            >
                                <g
                                    fill="none"
                                    stroke="rgba(255,88,18,0.35)"
                                    strokeWidth="1"
                                >
                                    <ellipse cx="260" cy="500" rx="380" ry="80" />
                                    <ellipse cx="260" cy="500" rx="290" ry="55" />
                                    <ellipse cx="260" cy="500" rx="200" ry="35" />
                                </g>
                            </svg>
                        </div>

                        <div className="relative flex h-full flex-col p-4 sm:p-5">
                            {/* header */}
                            <div className="flex flex-wrap items-center gap-2">
                                <div
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-[9px] text-white"
                                    style={{
                                        backgroundColor: ACCENT_BLUE,
                                        boxShadow: "0 4px 14px rgba(24,82,255,0.4)",
                                    }}
                                >
                                    <CodeBracketsIcon className="h-4 w-4" />
                                </div>
                                <h3 className="text-[1.0625rem] font-semibold leading-tight tracking-[-0.02em] text-white sm:text-[1.125rem]">
                                    Engineering Platform
                                </h3>
                                <span
                                    className="inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] ring-1"
                                    style={{
                                        backgroundColor: "rgba(255,88,18,0.18)",
                                        color: "#FFD4C0",
                                        borderColor: "rgba(255,88,18,0.35)",
                                    }}
                                >
                                    Core
                                </span>
                            </div>

                            <p className="mt-2 max-w-[36ch] text-pretty text-[0.875rem] leading-[1.58] text-white/72 sm:text-[0.9375rem]">
                                Our engineering foundation powers everything we build — secure,
                                scalable, and efficient.
                            </p>

                            <div className="mt-3">
                                <Link
                                    href="/services/offshore-power-platform-development"
                                    className="group inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1.5 text-[13px] font-semibold text-white ring-1 ring-white/10 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white/[0.10] hover:ring-white/20"
                                >
                                    Explore platform
                                    <ArrowRight
                                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                                        strokeWidth={2.4}
                                    />
                                </Link>
                            </div>

                            {/* Illustration — `min-h` keeps the SVG visible
                             *  even when the dark card's flex column has
                             *  little leftover space (otherwise `flex-1`
                             *  can collapse to 0 px). */}
                            <div className="my-1 flex min-h-[120px] flex-1 items-center justify-center sm:min-h-[140px]">
                                <EngineeringPlatformIllustration className="mx-auto h-full w-full max-w-[260px] sm:max-w-[280px]" />
                            </div>

                            {/* Pillars */}
                            <div className="mt-0 grid grid-cols-2 gap-x-2.5 gap-y-3 border-t border-white/[0.08] pt-3.5 sm:grid-cols-4">
                                <Pillar
                                    icon={<ShieldIcon className="h-3.5 w-3.5" />}
                                    title="Security First"
                                    desc="Enterprise-grade protection"
                                />
                                <Pillar
                                    icon={<ScaleIcon className="h-3.5 w-3.5" />}
                                    title="Scalable by Design"
                                    desc="Built to grow with your business"
                                />
                                <Pillar
                                    icon={<LayersIcon className="h-3.5 w-3.5" />}
                                    title="Modern Stack"
                                    desc="Latest technologies and best practices"
                                />
                                <Pillar
                                    icon={<BoltIcon className="h-3.5 w-3.5" />}
                                    title="Performance Optimized"
                                    desc="Speed, reliability, and efficiency"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* ─── RIGHT COLUMN — capability cards ───
                     *  Flex column instead of grid so each card sizes to its
                     *  content while the column itself can fill the dark
                     *  card's height (`lg:items-stretch` on the parent). */}
                    <div className="flex min-w-0 flex-col gap-3 lg:col-span-7">
                        {/* AI & Intelligent Systems — full width.
                         * Brief calls for "visual occupies 60% of the card",
                         * so this card overrides the default split with a
                         * 38% text / 62% illustration grid. */}
                        <CapabilityCard
                            iconBg="rgba(24,82,255,0.1)"
                            iconColor={ACCENT_BLUE}
                            icon={<BrainIcon className="h-5 w-5" />}
                            title="AI & Intelligent Systems"
                            description="Build intelligent applications that learn, adapt, and create real business value."
                            chips={[
                                "Machine Learning",
                                "NLP",
                                "Computer Vision",
                                "Generative AI",
                            ]}
                            illustration={
                                <AICubeIllustration className="mx-auto w-full max-w-[280px] sm:max-w-[300px]" />
                            }
                            illustrationLayout="wide"
                            delay={0.05}
                        />

                        {/* Data + Cloud — split row.
                         *  Sub-grid uses `auto-rows-fr` so both cards stretch
                         *  to the same height regardless of content length. */}
                        <div className="grid grid-cols-1 gap-3 md:auto-rows-fr md:grid-cols-2">
                            <CapabilityCard
                                iconBg="rgba(45,212,191,0.14)"
                                iconColor="#14B8A6"
                                icon={<ChartIcon className="h-5 w-5" />}
                                title="Data & Analytics"
                                description="Transform your data into actionable insights with modern data engineering and analytics."
                                chips={["Data Engineering", "BI & Analytics", "Data Platforms"]}
                                illustration={
                                    <DataAnalyticsIllustration className="mx-auto w-full max-w-[150px] sm:max-w-[165px]" />
                                }
                                delay={0.12}
                            />
                            <CapabilityCard
                                iconBg="rgba(255,88,18,0.1)"
                                iconColor={ACCENT_ORANGE}
                                icon={<CloudIcon className="h-5 w-5" />}
                                title="Cloud & Infrastructure"
                                description="Scalable, secure, and cost-optimized cloud solutions built for performance."
                                chips={["AWS", "Azure", "GCP", "DevOps"]}
                                illustration={
                                    <CloudInfraIllustration className="mx-auto w-full max-w-[150px] sm:max-w-[165px]" />
                                }
                                delay={0.18}
                            />
                        </div>

                        {/* Digital Products — full width.
                         *  ViewBox is 520x320, so cap larger to avoid the
                         *  illustration being severely letter-boxed. */}
                        <CapabilityCard
                            iconBg="rgba(139,92,246,0.14)"
                            iconColor="#8B5CF6"
                            icon={<GridIcon className="h-5 w-5" />}
                            title="Digital Products & Platforms"
                            description="End-to-end product engineering for web, mobile, and enterprise platforms."
                            chips={[
                                "Web Applications",
                                "Mobile Apps",
                                "SaaS Platforms",
                                "Enterprise Solutions",
                            ]}
                            illustration={
                                <DigitalProductsIllustration className="mx-auto w-full max-w-[260px] sm:max-w-[280px]" />
                            }
                            illustrationLayout="wide"
                            delay={0.24}
                        />
                    </div>
                </motion.div>

                {/* ───── Trusted-by + CTA strip ───── */}
                <motion.div
                    variants={{
                        hidden: {},
                        show: { transition: { staggerChildren: 0.05 } },
                    }}
                    {...viewportProps}
                    className="mt-10 grid grid-cols-1 gap-5 border-t border-[#0a0a1a]/10 pt-10 lg:grid-cols-12 lg:gap-8"
                >
                    <motion.div
                        variants={fadeUp}
                        transition={{ duration: DUR.panel, ease: EASE_SILK }}
                        className="lg:col-span-8"
                    >
                        <div className="mb-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0a0a1a]/42">
                            Technology stack
                        </div>
                        <LogoLoopTechStack
                            fadeOutColor={SURFACE_BG}
                            ariaLabel="Technologies we build with"
                        />
                    </motion.div>

                    <motion.div
                        variants={fadeUp}
                        transition={{ duration: DUR.panel, delay: 0.08, ease: EASE_SILK }}
                        className={`${CARD_BASE} flex flex-col justify-center px-4 py-4 sm:px-5 sm:py-5 lg:col-span-4`}
                    >
                        <p className="text-[15px] font-medium leading-snug text-[#0a0a1a]">
                            Let&apos;s build something amazing together.
                        </p>
                        <Link
                            href="/contact"
                            className="group mt-2.5 inline-flex items-center gap-1.5 text-[14px] font-semibold transition-colors duration-300 hover:text-[#e84f0f]"
                            style={{ color: ACCENT_ORANGE }}
                        >
                            Schedule a consultation
                            <ArrowRight
                                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                                strokeWidth={2.4}
                            />
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

/* ─── Pillar (dark card footer) ─── */
function Pillar({
    icon,
    title,
    desc,
}: {
    icon: React.ReactNode;
    title: string;
    desc: string;
}) {
    return (
        <div className="flex flex-col gap-1">
            <div className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-white/[0.06] text-white/85 ring-1 ring-white/[0.08]">
                {icon}
            </div>
            <div className="text-[12px] font-semibold leading-snug tracking-[-0.01em] text-white">
                {title}
            </div>
            <div className="text-[11px] leading-[1.45] text-white/58">{desc}</div>
        </div>
    );
}
