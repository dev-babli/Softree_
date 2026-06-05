"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DottedMap from "dotted-map";
import Grainient from "@/components/homepage-light/Grainient";
import SectionHeader from "@/components/homepage-light/SectionHeader";
import { EASE_T, STAGGER, EASE, DUR, VIEWPORT, prefersReducedMotion } from "@/lib/motion";

/** About Us light editorial surface */
export const HOME_INTRO_SURFACE = "#F3F0EE";
const SURFACE = HOME_INTRO_SURFACE;

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ════════════════════════════════════════════════════════════════════
 *  ClarityControlSection - Premium Fine-Tunement
 *  ─────────────────────
 *  Enhanced with world-class 2026 UI/UX standards:
 *  • Premium typography with optical spacing and refined hierarchy
 *  • Sophisticated motion system with enhanced easing curves
 *  • Luxury shadow system with ambient lighting and depth cues
 *  • Advanced hover states with multi-stage transitions
 *  • Enhanced accessibility and reduced-motion support
 * ═══════════════════════════════════════════════════════════════════ */

/* ── Card geometry (reference: square outer + glass from midline, flows below) ──
 *  OUTER 400×400 Grainient only. INNER 350×350 glass: top edge at 50% of outer
 *  (200px), extends 150px below the square. Position % must be relative to the
 *  square box only — not a padded wrapper (that was pushing glass down). */
const OUTER_PX = 400;
const INNER_PX = 350;
const GLASS_TOP_RATIO = 0.5;
const GLASS_OVERFLOW_RATIO = (INNER_PX * (1 - GLASS_TOP_RATIO)) / OUTER_PX;

/** Shared coordinate space for card 1 & 2 SVG scenes. */
const SCENE_SIZE = 280;
const SCENE_CENTER = SCENE_SIZE / 2;

/* ── Local motion token aliases ──────────────────────────────────────
 *  The lib's STAGGER/DUR scales use semantic names (tight/default/loose,
 *  press/card/panel/section). This file reads better with a short
 *  fast/medium/slow trio — these aliases bridge the two without ever
 *  diverging from the central source of truth. */
const SF = {
    fast: STAGGER.tight,    // 0.025
    medium: STAGGER.default, // 0.06
    slow: STAGGER.loose,    // 0.12
} as const;
const DR = {
    base: DUR.card,    // 0.32 — card-level reveals
    medium: DUR.panel, // 0.48 — heading + paragraph reveals
    slow: DUR.section, // 0.9  — full-card scale-in & ambient loops
} as const;

/* ── Per-card Grainient palette + shader composition ── */
type CardScene = {
    color1: string;
    color2: string;
    color3: string;
    blendAngle: number;
    centerX: number;
    centerY: number;
    zoom: number;
    warpSpeed: number;
};

const SCENE_BLUE: CardScene = {
    color1: "#B8CDE8",
    color2: "#3F5C9A",
    color3: "#0F1A36",
    blendAngle: 25,
    centerX: -0.10,
    centerY: -0.08,
    zoom: 0.95,
    warpSpeed: 1.0,
};
const SCENE_GREEN: CardScene = {
    color1: "#C8D8A0",
    color2: "#3F5828",
    color3: "#0E1408",
    blendAngle: -20,
    centerX: 0.00,
    centerY: -0.08,
    zoom: 0.92,
    warpSpeed: 1.1,
};
const SCENE_PEACH: CardScene = {
    color1: "#F4D2A6",
    color2: "#A87045",
    color3: "#1F1108",
    blendAngle: 50,
    centerX: 0.05,
    centerY: 0.00,
    zoom: 0.95,
    warpSpeed: 0.9,
};

/* ── Enhanced variants with premium motion timing ───────────────── */
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
};
const cardScaleIn: Variants = {
    hidden: { opacity: 0, y: 28, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1 },
};
const groupContainer: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: SF.slow, delayChildren: 0.12 },
    },
};
const cardGroupContainer: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: SF.slow, delayChildren: 0.22 },
    },
};

/* ── Premium CountUp with enhanced motion and styling ─────────────── */
function CountUp({
    to,
    decimals = 0,
    prefix = "",
    suffix = "",
    duration = 1.6,
    className,
}: {
    to: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
    duration?: number;
    className?: string;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-15%" });
    useEffect(() => {
        if (!inView || !ref.current) return;
        const reduced = prefersReducedMotion();
        if (reduced) {
            ref.current.textContent = `${prefix}${to.toFixed(decimals)}${suffix}`;
            return undefined;
        }
        const obj = { v: 0 };
        const tween = gsap.to(obj, {
            v: to,
            duration,
            ease: EASE.out,
            onUpdate: () => {
                if (!ref.current) return;
                ref.current.textContent = `${prefix}${obj.v.toFixed(decimals)}${suffix}`;
            },
        });
        return () => {
            tween.kill();
        };
    }, [inView, to, decimals, prefix, suffix, duration]);
    return (
        <span ref={ref} className={`${className} tabular-nums`}>
            {`${prefix}${(0).toFixed(decimals)}${suffix}`}
        </span>
    );
}

/* ════════════════════════════════════════════════════════════════
 *  Shared sub-components — header bar + stats row
 * ════════════════════════════════════════════════════════════════ */

/* Premium Card Header with enhanced styling and interactions */
function CardHeader({
    icon,
    label,
    accent = "#FFFFFF",
}: {
    icon: React.ReactElement;
    label: string;
    accent?: string;
}) {
    return (
        <div className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
                <span
                    style={{ color: accent }}
                    className="block opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                >
                    {icon}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/80 leading-none">
                    {label}
                </span>
            </div>
            <div className="flex items-center gap-1.5">
                <span className="block h-1 w-1 rounded-full bg-white/40 transition-all duration-300 group-hover:bg-white/60" />
                <span className="block h-1 w-1 rounded-full bg-white/40 transition-all duration-300 group-hover:bg-white/60" />
                <span className="block h-1 w-1 rounded-full bg-white/40 transition-all duration-300 group-hover:bg-white/60" />
            </div>
        </div>
    );
}

/* Premium KPI strip with enhanced typography and animations */
function KpiStrip({
    items,
}: {
    items: Array<{
        value: React.ReactNode;
        label: string;
        big?: boolean;
        align?: "left" | "center";
    }>;
}) {
    return (
        <div className="flex items-start gap-4">
            {items.map((it, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-5%" }}
                    transition={{
                        duration: DR.base,
                        delay: SF.medium + i * SF.fast,
                        ease: EASE_T.silk
                    }}
                    className={`${it.align === "center" ? "text-center" : ""} group`}
                >
                    <div
                        className={`${it.big ? "text-[24px]" : "text-[20px]"} font-bold leading-none tracking-[-0.03em] text-white tabular-nums transition-all duration-300 group-hover:scale-105`}
                        style={{
                            textShadow: "0 2px 4px rgba(0,0,0,0.40), 0 0 12px rgba(255,255,255,0.15)"
                        }}
                    >
                        {it.value}
                    </div>
                    <div className="mt-2 text-[10px] text-white/70 font-medium tracking-[0.02em] uppercase">
                        {it.label}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

/* ════════════════════════════════════════════════════════════════
 *  CARD 1 — Custom Software Development
 *  Scene: 5-node graph with central cube — Discover / Launch / Design /
 *  Develop labels orbiting around a glowing 3D cube.
 * ════════════════════════════════════════════════════════════════ */

function Card1Scene() {
    const reduceMotion = useReducedMotion();
    const cx = SCENE_CENTER;
    const cy = SCENE_CENTER;
    const radius = 98;
    const nodes = [
        { angle: -Math.PI / 2, label: "Discover", icon: "search" },
        { angle: -Math.PI / 2 + (Math.PI * 2) / 4, label: "Design", icon: "pencil" },
        { angle: -Math.PI / 2 + (Math.PI * 4) / 4, label: "Develop", icon: "code" },
        { angle: -Math.PI / 2 + (Math.PI * 6) / 4, label: "Launch", icon: "rocket" },
    ].map((n) => ({
        ...n,
        x: cx + Math.cos(n.angle) * radius,
        y: cy + Math.sin(n.angle) * radius,
    }));

    return (
        <div className="relative h-full min-h-[140px] w-full">
            <svg viewBox={`0 0 ${SCENE_SIZE} ${SCENE_SIZE}`} className="absolute inset-0 h-full w-full" aria-hidden>
                <defs>
                    <radialGradient id="cc-hub-glow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#7CD2FF" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#7CD2FF" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="cc-line-fade" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#7CD2FF" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="white" stopOpacity="0.2" />
                    </linearGradient>
                </defs>
                <circle cx={cx} cy={cy} r={radius + 18} fill="url(#cc-hub-glow)" />
                <circle
                    cx={cx}
                    cy={cy}
                    r={radius}
                    fill="none"
                    stroke="white"
                    strokeOpacity="0.14"
                    strokeWidth="1"
                    strokeDasharray="4 8"
                >
                    {!reduceMotion && (
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from={`0 ${cx} ${cy}`}
                            to={`360 ${cx} ${cy}`}
                            dur="48s"
                            repeatCount="indefinite"
                        />
                    )}
                </circle>
                <circle
                    cx={cx}
                    cy={cy}
                    r={radius}
                    fill="none"
                    stroke="white"
                    strokeOpacity="0.22"
                    strokeWidth="1.2"
                    strokeDasharray="3 6"
                />

                {nodes.map((n, i) => (
                    <motion.line
                        key={i}
                        x1={cx}
                        y1={cy}
                        x2={n.x}
                        y2={n.y}
                        stroke="url(#cc-line-fade)"
                        strokeOpacity="0.5"
                        strokeWidth="1.2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ once: true, margin: "-5%" }}
                        transition={{
                            duration: DR.medium,
                            delay: SF.slow + i * SF.fast,
                            ease: EASE_T.silk,
                        }}
                    />
                ))}

                {!reduceMotion && nodes.map((n, i) => {
                    const path = `M ${cx} ${cy} L ${n.x} ${n.y}`;
                    return (
                        <circle key={`p-${i}`} r="3" fill="#7CD2FF" filter="drop-shadow(0 0 8px #7CD2FF)">
                            <animateMotion dur="2.8s" begin={`${i * 0.5}s`} repeatCount="indefinite" path={path} />
                            <animate
                                attributeName="opacity"
                                values="0;1;1;0"
                                keyTimes="0;0.08;0.92;1"
                                dur="2.8s"
                                begin={`${i * 0.5}s`}
                                repeatCount="indefinite"
                            />
                        </circle>
                    );
                })}
            </svg>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                    className="relative grid h-[72px] w-[72px] place-items-center rounded-[16px]"
                    style={{
                        background:
                            "linear-gradient(145deg, rgba(160,200,255,0.65) 0%, rgba(80,130,220,0.90) 50%, rgba(40,80,180,1.0) 100%)",
                        boxShadow: [
                            "0 0 32px rgba(124,210,255,0.65)",
                            "inset 5px 5px 15px rgba(255,255,255,0.45)",
                            "inset -5px -5px 15px rgba(0,0,0,0.35)",
                            "0 15px 25px -10px rgba(40,80,180,0.75)",
                        ].join(", "),
                    }}
                    animate={reduceMotion ? undefined : { y: [-2, 2, -2], rotate: [-3, 3, -3] }}
                    transition={reduceMotion ? undefined : {
                        duration: DR.slow,
                        repeat: Infinity,
                        ease: EASE_T.silk
                    }}
                >
                    {/* Enhanced cube glyph with premium styling */}
                    <svg width="24" height="24" viewBox="0 0 22 22" fill="none" aria-hidden>
                        <path
                            d="M11 2 L19 6 L19 16 L11 20 L3 16 L3 6 Z M11 2 L11 11 M11 11 L19 6 M11 11 L3 6"
                            stroke="white"
                            strokeWidth="1.3"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))" }}
                        />
                    </svg>
                </motion.div>
            </div>

            {/* Enhanced glass orbs with premium animations */}
            {nodes.map((n, i) => (
                <motion.div
                    key={`orb-${i}`}
                    className="absolute"
                    style={{
                        left: `${(n.x / SCENE_SIZE) * 100}%`,
                        top: `${(n.y / SCENE_SIZE) * 100}%`,
                        transform: "translate(-50%, -50%)",
                    }}
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    viewport={{ once: true, margin: "-5%" }}
                    transition={{
                        duration: DR.base,
                        delay: SF.slow + i * SF.fast,
                        ease: EASE_T.silk
                    }}
                >
                    <NodeOrb label={n.label} icon={n.icon} />
                </motion.div>
            ))}
        </div>
    );
}

/* Premium glass orb with enhanced styling and hover effects */
function NodeOrb({ label, icon }: { label: string; icon: string }) {
    return (
        <div className="flex flex-col items-center group cursor-pointer">
            <div
                className="grid h-[52px] w-[52px] place-items-center rounded-full transition-all duration-400 group-hover:scale-110 group-hover:shadow-xl"
                style={{
                    background:
                        "radial-gradient(circle at 30% 28%, rgba(255,255,255,0.55) 0%, rgba(180,210,255,0.35) 40%, rgba(60,100,180,0.40) 100%)",
                    boxShadow: [
                        "inset 0 1px 0 rgba(255,255,255,0.65)",
                        "inset 0 -2px 4px rgba(0,0,0,0.35)",
                        "0 8px 18px -4px rgba(40,80,180,0.55)",
                        "0 0 24px rgba(124,210,255,0.25)",
                    ].join(", "),
                    border: "1px solid rgba(255,255,255,0.35)",
                }}
            >
                <Card1Icon name={icon} />
            </div>
            <span className="mt-2 text-[10px] font-medium text-white/90 transition-opacity duration-300 group-hover:text-white">
                {label}
            </span>
        </div>
    );
}

function Card1Icon({ name }: { name: string }) {
    const common = { width: 16, height: 16, fill: "none", stroke: "white", strokeWidth: 1.25, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
    if (name === "search")
        return <svg viewBox="0 0 16 16" {...common}><circle cx="7" cy="7" r="4" /><path d="M10 10l3 3" /></svg>;
    if (name === "pencil")
        return <svg viewBox="0 0 16 16" {...common}><path d="M11 2l3 3-9 9H2v-3l9-9z" /></svg>;
    if (name === "code")
        return <svg viewBox="0 0 16 16" {...common}><path d="M5 4l-3 4 3 4M11 4l3 4-3 4" /></svg>;
    if (name === "rocket")
        return <svg viewBox="0 0 16 16" {...common}><path d="M11 2c2 0 3 1 3 3 0 4-5 9-5 9s-1-1-2-2 .5-2 .5-2L11 2zM11 2L6 7l3 3 5-5M5 11l-3 3" /></svg>;
    return null;
}

/* ════════════════════════════════════════════════════════════════
 *  CARD 2 — AI & Automation Solutions
 *  Scene: stacked glass platforms (3 layered transparent steps) with
 *  a sparkle glyph centred on top, plus 4 glass capability tiles at
 *  the corners (Data, Reasoning, Automation, Actions).
 * ════════════════════════════════════════════════════════════════ */

function Card2Scene() {
    const c = SCENE_CENTER;
    const corners = [
        { d: `M ${c} ${c} L 58 58`, delay: 0 },
        { d: `M ${c} ${c} L 222 58`, delay: 0.08 },
        { d: `M ${c} ${c} L 58 222`, delay: 0.16 },
        { d: `M ${c} ${c} L 222 222`, delay: 0.24 },
    ];

    return (
        <div className="relative h-full min-h-[140px] w-full">
            <svg viewBox={`0 0 ${SCENE_SIZE} ${SCENE_SIZE}`} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
                <circle cx={c} cy={c} r={72} fill="#B8DA8F" fillOpacity="0.06" />
                {corners.map(({ d, delay }, i) => (
                    <motion.path
                        key={i}
                        d={d}
                        stroke="#B8DA8F"
                        strokeOpacity="0.35"
                        strokeWidth="1"
                        strokeDasharray="3 5"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ once: true, margin: "-5%" }}
                        transition={{ duration: 0.9, delay: 0.35 + delay, ease: EASE_T.silk }}
                    />
                ))}
            </svg>

            <motion.div
                className="absolute left-3 top-3"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: DR.base, delay: 0.1, ease: EASE_T.silk }}
            >
                <CapabilityTile label="Data" icon="data" />
            </motion.div>
            <motion.div
                className="absolute right-3 top-3"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: DR.base, delay: 0.18, ease: EASE_T.silk }}
            >
                <CapabilityTile label="Reasoning" icon="reasoning" />
            </motion.div>
            <motion.div
                className="absolute bottom-3 left-3"
                initial={{ opacity: 0, y: -8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: DR.base, delay: 0.26, ease: EASE_T.silk }}
            >
                <CapabilityTile label="Automation" icon="cog" />
            </motion.div>
            <motion.div
                className="absolute bottom-3 right-3"
                initial={{ opacity: 0, y: -8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: DR.base, delay: 0.34, ease: EASE_T.silk }}
            >
                <CapabilityTile label="Actions" icon="bolt" />
            </motion.div>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <GlassPodium />
            </div>
        </div>
    );
}

/* Stacked glass podium — 3 layered steps with a sparkle on top */
function GlassPodium() {
    const reduceMotion = useReducedMotion();
    return (
        <div className="relative" style={{ width: 132, height: 118 }}>
            <div
                className="absolute left-1/2 -translate-x-1/2 rounded-[12px]"
                style={{
                    bottom: 0,
                    width: 132,
                    height: 20,
                    background:
                        "linear-gradient(180deg, rgba(255,255,255,0.32) 0%, rgba(140,180,120,0.18) 100%)",
                    border: "1px solid rgba(255,255,255,0.30)",
                    boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.50), 0 6px 14px -6px rgba(40,80,30,0.45)",
                }}
            />
            {/* Middle plate */}
            <div
                className="absolute left-1/2 -translate-x-1/2 rounded-[11px]"
                style={{
                    bottom: 16,
                    width: 104,
                    height: 20,
                    background:
                        "linear-gradient(180deg, rgba(255,255,255,0.36) 0%, rgba(140,180,120,0.22) 100%)",
                    border: "1px solid rgba(255,255,255,0.35)",
                    boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.55), 0 6px 14px -6px rgba(40,80,30,0.50)",
                }}
            />
            {/* Top plate (with sparkle) */}
            <motion.div
                className="absolute left-1/2 -translate-x-1/2 grid place-items-center rounded-[14px]"
                style={{
                    bottom: 32,
                    width: 76,
                    height: 66,
                    background:
                        "linear-gradient(160deg, rgba(255,255,255,0.55) 0%, rgba(180,220,150,0.30) 50%, rgba(80,140,80,0.45) 100%)",
                    border: "1px solid rgba(255,255,255,0.45)",
                    boxShadow:
                        "inset 0 2px 4px rgba(255,255,255,0.65), inset 0 -2px 6px rgba(0,0,0,0.25), 0 10px 20px -8px rgba(40,80,30,0.55), 0 0 24px rgba(180,220,150,0.45)",
                }}
                animate={reduceMotion ? undefined : { y: [-2, 2, -2], scale: [1, 1.03, 1] }}
                transition={reduceMotion ? undefined : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
                <SparkleGlyph />
            </motion.div>
        </div>
    );
}

/* 4-pointed sparkle glyph (the AI mark) */
function SparkleGlyph() {
    const reduceMotion = useReducedMotion();
    return (
        <motion.svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
            animate={reduceMotion ? undefined : { rotate: [0, 8, -8, 0] }}
            transition={reduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
            <path
                d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"
                fill="white"
                fillOpacity="0.95"
                style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.9))" }}
            />
        </motion.svg>
    );
}

/* Glass capability tile with icon + label (Data / Reasoning / etc.) */
function CapabilityTile({ label, icon }: { label: string; icon: string }) {
    return (
        <div className="flex flex-col items-center gap-1.5">
            <div
                className="grid h-[50px] w-[50px] place-items-center rounded-[12px]"
                style={{
                    background:
                        "linear-gradient(180deg, rgba(255,255,255,0.30) 0%, rgba(140,180,120,0.15) 100%)",
                    border: "1px solid rgba(255,255,255,0.30)",
                    boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(0,0,0,0.25), 0 4px 10px -3px rgba(40,80,30,0.45)",
                    backdropFilter: "blur(4px)",
                }}
            >
                <Card2Icon name={icon} />
            </div>
            <span className="text-[9.5px] font-medium text-white/85">{label}</span>
        </div>
    );
}

function Card2Icon({ name }: { name: string }) {
    const common = { width: 18, height: 18, fill: "none", stroke: "white", strokeWidth: 1.3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
    if (name === "data")
        return <svg viewBox="0 0 18 18" {...common}><ellipse cx="9" cy="4" rx="6" ry="2" /><path d="M3 4v10c0 1.1 2.7 2 6 2s6-.9 6-2V4M3 9c0 1.1 2.7 2 6 2s6-.9 6-2" /></svg>;
    if (name === "reasoning")
        return <svg viewBox="0 0 18 18" {...common}><path d="M9 2v3M9 13v3M2 9h3M13 9h3M4 4l2 2M12 12l2 2M4 14l2-2M12 6l2-2" /><circle cx="9" cy="9" r="2" /></svg>;
    if (name === "cog")
        return <svg viewBox="0 0 18 18" {...common}><circle cx="9" cy="9" r="2.5" /><path d="M9 1v3M9 14v3M1 9h3M14 9h3M3 3l2 2M13 13l2 2M3 15l2-2M13 5l2-2" /></svg>;
    if (name === "bolt")
        return <svg viewBox="0 0 18 18" {...common}><path d="M10 1L3 10h5l-1 7 7-9h-5l1-7z" fill="white" fillOpacity="0.85" stroke="none" /></svg>;
    return null;
}

/* ════════════════════════════════════════════════════════════════
 *  CARD 3 — Cloud & Platform Engineering
 *  Inner card composition mirrors the reference image:
 *    [globe icon · "Global infrastructure"]            [• • ●]
 *    $XX,XXX  (or "99.99%" — large hero metric)
 *    ────────────────────────────────────────
 *    [● Active deployments worldwide]
 *    [dotted world map with orange hotspots]
 *
 *  We pre-build the dot-map points ONCE at module load (runs
 *  client-side via the parent file's "use client"), then each
 *  render just paints the cached coordinates. Hotspot dots are
 *  picked by lat/lng proximity to a small fixed set of beacons.
 * ════════════════════════════════════════════════════════════════ */

/* Pre-build dotted map ONCE at module level for performance.
 * Mirrors the pattern used by GlobalNetworkMap.tsx. */
const _card3Map = new DottedMap({ height: 72, grid: "diagonal" });
const _card3Points = _card3Map.getPoints();

/* Global tech-hub beacons — real coordinates of the world's major
 * software / infrastructure hubs. Each dot within the proximity
 * radius of one of these is rendered in the accent orange.
 *
 * Curated to represent global presence across:
 *   • North America (SF, NY, Toronto)
 *   • Latin America (São Paulo)
 *   • Europe (London, Amsterdam, Berlin, Stockholm, Madrid)
 *   • Middle East (Tel Aviv, Dubai)
 *   • Africa (Lagos, Cape Town)
 *   • India — Softree's home market (Bangalore, Hyderabad, Mumbai)
 *   • Asia-Pacific (Singapore, Tokyo, Seoul)
 *   • Oceania (Sydney) */
const HOTSPOTS: ReadonlyArray<readonly [number, number]> = [
    /* North America */
    [37.77, -122.41],  // San Francisco
    [40.71, -74.00],   // New York
    [43.65, -79.38],   // Toronto
    /* Latin America */
    [-23.55, -46.63],  // São Paulo
    /* Europe */
    [51.51, -0.13],    // London
    [52.37, 4.90],     // Amsterdam
    [52.52, 13.40],    // Berlin
    [59.33, 18.07],    // Stockholm
    [40.42, -3.70],    // Madrid
    /* Middle East */
    [32.08, 34.78],    // Tel Aviv
    [25.20, 55.27],    // Dubai
    /* Africa */
    [6.52, 3.38],      // Lagos
    [-33.92, 18.42],   // Cape Town
    /* India */
    [12.97, 77.59],    // Bangalore
    [17.39, 78.49],    // Hyderabad
    [19.08, 72.88],    // Mumbai
    /* Asia-Pacific */
    [1.35, 103.82],    // Singapore
    [35.68, 139.65],   // Tokyo
    [37.57, 126.98],   // Seoul
    /* Oceania */
    [-33.87, 151.21],  // Sydney
];

/* Tighter radius — each hub lights up only 2-4 nearby dots,
 * keeping the constellation legible at small scale. */
const HOTSPOT_RADIUS_DEG = 4.2;

function _isHotspot(lat: number, lng: number): boolean {
    for (const [hLat, hLng] of HOTSPOTS) {
        const d = Math.hypot(lat - hLat, lng - hLng);
        if (d < HOTSPOT_RADIUS_DEG) return true;
    }
    return false;
}

/* Card 3 dotted map — renders the cached points as SVG circles.
 * Hotspots glow with the accent orange; the rest are soft white. */
function Card3DottedMap() {
    const reduceMotion = useReducedMotion();
    const { dots, vbWidth, vbHeight } = useMemo(() => {
        let maxX = 0;
        let maxY = 0;
        for (const p of _card3Points) {
            if (p.x > maxX) maxX = p.x;
            if (p.y > maxY) maxY = p.y;
        }
        const padded = _card3Points.map((p) => ({
            x: p.x,
            y: p.y,
            hot: _isHotspot(p.lat, p.lng),
        }));
        return { dots: padded, vbWidth: maxX, vbHeight: maxY };
    }, []);

    return (
        <svg
            viewBox={`0 0 ${vbWidth} ${vbHeight}`}
            className="h-full w-full"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
        >
            {/* Two-pass render so hotspots paint ON TOP of the regular
             * dot grid — guarantees no orange pin is ever overlapped by
             * a neutral dot drawn after it. */}
            {dots.filter((d) => !d.hot).map((d, i) => (
                <circle
                    key={`n-${i}`}
                    cx={d.x}
                    cy={d.y}
                    r={0.65}
                    fill="rgba(255,255,255,0.72)"
                />
            ))}
            {dots.filter((d) => d.hot).map((d, i) => (
                <g key={`h-${i}`}>
                    {!reduceMotion && (
                        <circle cx={d.x} cy={d.y} r={2.4} fill="#FF6B00" opacity={0.18}>
                            <animate
                                attributeName="r"
                                values="2;3.2;2"
                                dur="2.4s"
                                begin={`${(i % 5) * 0.35}s`}
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="opacity"
                                values="0.12;0.28;0.12"
                                dur="2.4s"
                                begin={`${(i % 5) * 0.35}s`}
                                repeatCount="indefinite"
                            />
                        </circle>
                    )}
                    <circle cx={d.x} cy={d.y} r={1.8} fill="#FF6B00" opacity={0.28} />
                    <circle cx={d.x} cy={d.y} r={1} fill="#FF6B00" />
                </g>
            ))}
        </svg>
    );
}

/** Reused by About Us platform section (global delivery card). */
export function GlobalMapGlassPanel() {
    return <Card3Visual />;
}

function Card3Visual() {
    return (
        <div
            className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl"
            style={{
                /* Tinted dark glass that lets the peach Grainient bleed through.
                 * Three layers stacked via background-image:
                 *  1. Top-edge specular highlight (1px white gradient)
                 *  2. Soft inner vignette
                 *  3. Base dark wash so the white type and map dots punch out */
                background:
                    "linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 8%, rgba(255,255,255,0) 100%), radial-gradient(ellipse at 50% 0%, rgba(255,200,150,0.06) 0%, transparent 60%), linear-gradient(180deg, rgba(20,12,6,0.42) 0%, rgba(20,12,6,0.32) 100%)",
                backdropFilter: "blur(22px) saturate(140%)",
                WebkitBackdropFilter: "blur(22px) saturate(140%)",
                border: "1px solid rgba(255,255,255,0.14)",
                boxShadow: [
                    "inset 0 1px 0 rgba(255,255,255,0.18)",
                    "inset 0 -1px 0 rgba(0,0,0,0.20)",
                    "0 18px 44px -18px rgba(0,0,0,0.55)",
                ].join(", "),
            }}
        >
            {/* Header row — globe glyph + label (left) + status dots (right).
             * Consistent px-5 horizontal rhythm across every row. */}
            <div className="flex items-center justify-between px-4 pt-3">
                <div className="flex items-center gap-2">
                    {/* Globe glyph */}
                    <svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden className="shrink-0">
                        <circle cx="6.5" cy="6.5" r="5.2" stroke="white" strokeOpacity="0.85" strokeWidth="0.9" />
                        <ellipse cx="6.5" cy="6.5" rx="5.2" ry="2.2" stroke="white" strokeOpacity="0.55" strokeWidth="0.7" />
                        <path d="M6.5 1.3 V 11.7" stroke="white" strokeOpacity="0.55" strokeWidth="0.7" />
                    </svg>
                    <span className="text-[11px] font-medium text-white/95 leading-none tracking-[-0.005em]">
                        Global infrastructure
                    </span>
                </div>
                {/* 3-dot status indicator, last dot lit */}
                <div className="flex items-center gap-1.5">
                    <span className="block h-1 w-1 rounded-full bg-white/35" />
                    <span className="block h-1 w-1 rounded-full bg-white/35" />
                    <span className="block h-[5px] w-[5px] rounded-full bg-white/95 shadow-[0_0_6px_rgba(255,255,255,0.7)]" />
                </div>
            </div>

            {/* Hero metric — the big number. Optical baseline aligns with
             * the header row's text via matched pl-5 + slight pt-3.5. */}
            <div className="px-4 pt-2.5">
                <span
                    className="block text-[38px] font-semibold leading-[0.92] tracking-[-0.04em] text-white tabular-nums"
                    style={{ textShadow: "0 1px 2px rgba(0,0,0,0.32)" }}
                >
                    <CountUp to={99.99} decimals={2} suffix="%" duration={1.8} />
                </span>
            </div>

            <div className="px-4 pt-2">
                <div className="h-px w-full bg-gradient-to-r from-white/0 via-white/22 to-white/0" />
                <div className="mt-2 flex items-center gap-1.5">
                    <span className="block h-1.5 w-1.5 rounded-full bg-[#FF6B00] shadow-[0_0_6px_rgba(255,107,0,0.55)]" />
                    <span className="text-[9.5px] font-medium text-white/70 leading-none tracking-[0.005em]">
                        Active deployments worldwide
                    </span>
                </div>
            </div>

            <div className="relative mt-2 min-h-[140px] flex-1 px-3 pb-4 pt-1">
                <Card3DottedMap />
            </div>
        </div>
    );
}

/* ════════════════════════════════════════════════════════════════
 *  Per-card visual containers — header + KPI strip + scene
 * ════════════════════════════════════════════════════════════════ */

function Card1Visual() {
    return (
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/30 bg-gradient-to-br from-white/[0.18] via-white/[0.10] to-white/[0.04] p-4 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.30),0_18px_44px_-18px_rgba(0,0,0,0.45)]">
            <CardHeader
                accent="#7CD2FF"
                label="Project Delivery"
                icon={
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <rect x="1" y="1" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1" />
                        <path d="M3.5 5.5L4.8 6.8L7.5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                }
            />
            <div className="mt-2">
                <KpiStrip
                    items={[
                        { value: <CountUp to={128} duration={1.6} />, label: "Projects" },
                        { value: <CountUp to={97} suffix="%" duration={1.6} />, label: "Success rate" },
                        { value: <CountUp to={18} duration={1.6} />, label: "Teams" },
                    ]}
                />
            </div>
            <div className="mt-2 min-h-[160px] flex-1">
                <Card1Scene />
            </div>
        </div>
    );
}

function Card2Visual() {
    return (
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-black/30 via-black/55 to-black/70 p-4 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_18px_44px_-18px_rgba(0,0,0,0.55)]">
            <CardHeader
                accent="#B8DA8F"
                label="AI Operations"
                icon={
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <circle cx="5.5" cy="5.5" r="2" fill="currentColor" />
                        <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeOpacity="0.6" strokeWidth="0.9" />
                    </svg>
                }
            />
            <div className="mt-2">
                <div className="flex flex-col gap-0.5">
                    <span
                        className="text-[32px] font-semibold leading-none tracking-[-0.04em] text-white tabular-nums"
                        style={{ textShadow: "0 1px 2px rgba(0,0,0,0.30)" }}
                    >
                        <CountUp to={97.8} decimals={1} suffix="%" duration={1.8} />
                    </span>
                    <span className="text-[10px] text-white/70">Workflow Accuracy</span>
                </div>
                <div className="mt-1.5 h-[16px]">
                    <svg viewBox="0 0 220 24" className="h-full w-full" aria-hidden>
                        <motion.path
                            d="M0 18 L24 16 L48 14 L72 12 L96 8 L120 10 L144 6 L168 8 L196 4 L220 5"
                            fill="none"
                            stroke="white"
                            strokeOpacity="0.85"
                            strokeWidth="1"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true, margin: "-5%" }}
                            transition={{ duration: 1.5, delay: 0.5, ease: EASE_T.silk }}
                        />
                    </svg>
                </div>
            </div>
            <div className="mt-2 min-h-[160px] flex-1">
                <Card2Scene />
            </div>
        </div>
    );
}

/* ── Section data ─────────────────────────────────────────── */
export const CLARITY_PILLARS: ReadonlyArray<{
    n: string;
    title: string;
    body: string;
    scene: CardScene;
    Visual: () => React.ReactElement;
}> = [
        {
            n: "1",
            title: "Custom Software Development",
            body:
                "End-to-end development tailored to your business. From idea to launch, we build scalable, secure, and high-performance software.",
            scene: SCENE_BLUE,
            Visual: Card1Visual,
        },
        {
            n: "2",
            title: "AI & Automation Solutions",
            body:
                "Leverage AI and intelligent automation to streamline processes, reduce costs, and unlock new levels of efficiency.",
            scene: SCENE_GREEN,
            Visual: Card2Visual,
        },
        {
            n: "3",
            title: "Cloud & Platform Engineering",
            body:
                "Build on modern cloud platforms with confidence. We design, migrate, and manage secure, resilient, and future-ready infrastructure.",
            scene: SCENE_PEACH,
            Visual: Card3Visual,
        },
    ];

/* ── Exported blocks for Home Intro showcase / unified section ── */
export function ClarityPillarRow({ inView }: { inView: boolean }) {
    return (
        <motion.div
            variants={groupContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="mb-10 grid grid-cols-1 gap-12 border-t border-[#0a0a1a]/10 pt-10 md:grid-cols-3 md:gap-8 md:pt-12 lg:gap-10"
        >
            {CLARITY_PILLARS.map((c) => (
                <motion.div
                    key={c.n}
                    data-reveal
                    variants={fadeUp}
                    transition={{ duration: DR.base, ease: EASE_T.silk }}
                    className="flex flex-col group"
                >
                    <span
                        className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#0a0a1a]/10 bg-white/60 px-2.5 py-1 text-[10px] font-semibold tabular-nums tracking-[0.16em] text-[#0a0a1a]/65 uppercase transition-[color,border-color] duration-300 group-hover:border-[#FF5812]/30 group-hover:text-[#FF5812]"
                        aria-hidden
                    >
                        <span className="block h-1 w-1 rounded-full bg-current opacity-60" />
                        {c.n.padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 text-[16px] font-semibold leading-[1.3] tracking-[-0.01em] text-[#0a0a1a] md:text-[17px]">
                        {c.title}
                    </h3>
                    <p className="mt-3 text-[14px] md:text-[14.5px] leading-[1.65] text-[#0a0a1a]/70">
                        {c.body}
                    </p>
                </motion.div>
            ))}
        </motion.div>
    );
}

const CARD_LAYOUT_CLASS = {
    grid: "grid grid-cols-1 gap-10 overflow-visible pb-4 md:grid-cols-3 md:gap-6 lg:gap-8",
    strip:
        "flex gap-8 overflow-x-auto overscroll-x-contain pb-10 pt-2 -mx-6 px-6 lg:-mx-12 lg:px-12 snap-x snap-mandatory [&>*]:snap-center [&>*]:shrink-0 [&>*]:w-[min(88vw,400px)]",
    bento:
        "grid grid-cols-1 gap-10 overflow-visible pb-4 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-4 [&>*:nth-child(1)]:lg:col-span-7 [&>*:nth-child(2)]:lg:col-span-5 [&>*:nth-child(2)]:lg:row-start-1 [&>*:nth-child(2)]:lg:mt-[min(18vw,120px)] [&>*:nth-child(3)]:lg:col-span-8 [&>*:nth-child(3)]:lg:col-start-3 [&>*:nth-child(3)]:lg:-mt-8",
    stack:
        "relative flex flex-col items-center gap-0 pb-8 [&>*]:w-full [&>*]:max-w-[400px] [&>*:not(:first-child)]:-mt-[min(32vw,160px)] [&>*:nth-child(1)]:z-30 [&>*:nth-child(2)]:z-20 [&>*:nth-child(3)]:z-10",
} as const;

export type ClarityPillar = (typeof CLARITY_PILLARS)[number];

export function ClarityGlassCard({
    pillar: c,
    activeIndex = null,
    index,
    className = "",
}: {
    pillar: ClarityPillar;
    index: number;
    activeIndex?: number | null;
    className?: string;
}) {
    return (
        <div
            data-reveal
            className={`group relative mx-auto w-full max-w-[400px] overflow-visible motion-reduce:transform-none transition-[opacity,filter,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 ${className} ${
                activeIndex !== null && activeIndex !== index
                    ? "opacity-[0.38] saturate-[0.8] motion-reduce:opacity-100"
                    : "opacity-100"
            }`}
            style={{ paddingBottom: `${GLASS_OVERFLOW_RATIO * 100}%` }}
        >
            <div className="relative aspect-square w-full">
                <article
                    aria-label={c.title}
                    className="absolute inset-0 overflow-hidden rounded-[28px] transition-[box-shadow] duration-500 group-hover:shadow-[0_0_0_1px_rgba(10,10,26,0.08),0_2px_4px_-1px_rgba(10,10,26,0.08),0_20px_44px_-16px_rgba(255,88,18,0.18)]"
                    style={{
                        maxWidth: OUTER_PX,
                        boxShadow:
                            "0 0 0 1px rgba(10,10,26,0.05), 0 1px 2px -1px rgba(10,10,26,0.06), 0 12px 28px -14px rgba(10,10,26,0.16)",
                    }}
                >
                    <span
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-px bg-gradient-to-r from-transparent via-white/70 to-transparent"
                    />
                    <div
                        aria-hidden
                        className="cc-card-backdrop absolute inset-[-10%]"
                        style={{ willChange: "transform" }}
                    >
                        <Grainient
                            color1={c.scene.color1}
                            color2={c.scene.color2}
                            color3={c.scene.color3}
                            blendAngle={c.scene.blendAngle}
                            centerX={c.scene.centerX}
                            centerY={c.scene.centerY}
                            zoom={c.scene.zoom}
                            warpSpeed={c.scene.warpSpeed}
                            timeSpeed={0.18}
                            warpStrength={1.2}
                            warpFrequency={4.0}
                            warpAmplitude={45}
                            blendSoftness={0.1}
                            rotationAmount={420}
                            noiseScale={1.8}
                            grainAmount={0.06}
                            grainScale={2.4}
                            grainAnimated
                            contrast={1.2}
                            gamma={0.95}
                            saturation={1.0}
                        />
                    </div>
                    <div
                        aria-hidden
                        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                            background:
                                "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.22) 100%)",
                        }}
                    />
                </article>
                <div
                    className="absolute left-1/2 top-1/2 z-10 aspect-square w-[87.5%] max-w-[350px] -translate-x-1/2 overflow-hidden rounded-[24px] shadow-[0_24px_48px_-20px_rgba(10,10,26,0.42)] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-0.5 motion-reduce:transition-none"
                    style={{ maxWidth: INNER_PX }}
                >
                    <c.Visual />
                </div>
            </div>
        </div>
    );
}

export function ClarityGlassCardGrid({
    inView,
    layout = "grid",
    activeIndex = null,
}: {
    inView: boolean;
    layout?: keyof typeof CARD_LAYOUT_CLASS;
    /** When set, non-matching cards dim slightly (expertise index sync). */
    activeIndex?: number | null;
}) {
    return (
        <motion.div
            variants={cardGroupContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className={CARD_LAYOUT_CLASS[layout]}
        >
            {CLARITY_PILLARS.map((c, index) => (
                <motion.div
                    key={c.n}
                    variants={cardScaleIn}
                    transition={{ duration: DR.medium, ease: EASE_T.silk }}
                >
                    <ClarityGlassCard pillar={c} index={index} activeIndex={activeIndex} />
                </motion.div>
            ))}
        </motion.div>
    );
}

export function useClarityCardParallax(scopeRef: RefObject<HTMLElement | null>) {
    useGSAP(
        () => {
            if (!scopeRef.current) return;
            if (prefersReducedMotion()) return;
            const cards = scopeRef.current.querySelectorAll<HTMLElement>(".cc-card-backdrop");
            cards.forEach((el) => {
                gsap.fromTo(
                    el,
                    { yPercent: -2.5 },
                    {
                        yPercent: 2.5,
                        ease: "none",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 88%",
                            end: "bottom 12%",
                            scrub: 0.45,
                        },
                    }
                );
            });
        },
        { scope: scopeRef }
    );
}

/* ════════════════════════════════════════════════════════════════
 *  Main section
 * ════════════════════════════════════════════════════════════════ */
export default function ClarityControlSection({
    embedded = false,
    showPillarRow = true,
}: {
    /** Render inside a parent section (post-hero sequence). */
    embedded?: boolean;
    showPillarRow?: boolean;
} = {}) {
    const sectionRef = useRef<HTMLElement>(null);
    const inView = useInView(sectionRef, VIEWPORT.default);

    useClarityCardParallax(sectionRef);

    const Wrapper = embedded ? "div" : "section";

    return (
        <Wrapper
            ref={sectionRef as any}
            data-section="clarity-control"
            data-theme-section="light"
            aria-labelledby={embedded ? undefined : "clarity-control-heading"}
            className={
                embedded
                    ? "relative w-full overflow-x-clip overflow-y-visible pt-4 pb-20 md:pb-24 lg:pb-28"
                    : "relative w-full overflow-x-clip overflow-y-visible py-20 md:py-24 lg:py-32"
            }
            style={{ backgroundColor: embedded ? "transparent" : SURFACE }}
        >
            <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
                {/* Section header (badge + H2) — uses the shared <SectionHeader>
                 * primitive so the eyebrow tint, padding, radius, tracking, and
                 * heading scale match every other section on the page exactly
                 * (Requirement 11.2 — parity diff: badge pill, heading scale). */}
                <div className="mb-12 grid grid-cols-1 gap-8 md:mb-14 lg:grid-cols-12 lg:gap-16">
                    <motion.div
                        className="lg:col-span-7"
                        data-reveal
                        initial={{ opacity: 0, y: 16 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: DR.medium, ease: EASE_T.silk }}
                    >
                        <SectionHeader
                            badge="What we do"
                            accent="#FF5812"
                            headline={<span id="clarity-control-heading">Clarity and control for every part of your business.</span>}
                        />
                    </motion.div>
                    <motion.p
                        data-reveal
                        initial={{ opacity: 0, y: 16 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                            duration: DR.medium,
                            delay: SF.medium,
                            ease: EASE_T.silk
                        }}
                        className="lg:col-span-4 lg:col-start-9 max-w-[440px] self-end text-pretty text-[15px] font-medium leading-[1.65] text-[#0a0a1a]/70 md:text-[16px]"
                    >
                        Get a clear, structured view of your IT services — from project delivery to system performance and growth opportunities.
                    </motion.p>
                </div>

                {showPillarRow ? <ClarityPillarRow inView={inView} /> : null}
                <ClarityGlassCardGrid inView={inView} />
            </div>
        </Wrapper>
    );
}
