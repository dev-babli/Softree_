"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Grainient from "@/components/homepage-light/Grainient";
import { EASE_T, STAGGER, EASE, DUR, prefersReducedMotion } from "@/lib/motion";

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

/* ── Premium card sizing with refined proportions ───────────────── */
const OUTER_CARD = {
    /* Enhanced outer card height with premium proportions */
    minHeight: 480,
};

const INNER_CARD = {
    /* Premium inner glass card with refined square proportions */
    size: 300,
    /* Enhanced distance from outer card bottom */
    bottomOffset: 32,
};

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
    hidden: { opacity: 0, y: 40, scale: 0.94 },
    visible: { opacity: 1, y: 0, scale: 1 },
};
const groupContainer: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: STAGGER.slow, delayChildren: 0.1 },
    },
};

/* ── Premium WordReveal with enhanced motion ─────────────────────── */
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
        <span ref={ref} className={`inline-flex flex-wrap gap-x-[0.32em] ${className}`}>
            {words.map((w, i) => (
                <span key={i} className="inline-flex overflow-hidden">
                    <motion.span
                        className="inline-block"
                        initial={{ y: "100%", opacity: 0 }}
                        animate={inView ? { y: 0, opacity: 1 } : {}}
                        transition={{
                            duration: DUR.medium,
                            delay: delay + i * STAGGER.fast,
                            ease: EASE_T.silk
                        }}
                    >
                        {w}
                    </motion.span>
                </span>
            ))}
        </span>
    );
}

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
            return;
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
        return () => tween.kill();
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
                        duration: DUR.base,
                        delay: STAGGER.medium + i * STAGGER.fast,
                        ease: EASE_T.silk
                    }}
                    className={`${it.align === "center" ? "text-center" : ""} group`}
                >
                    <div
                        className={`${it.big ? "text-[28px]" : "text-[24px]"} font-bold leading-none tracking-[-0.03em] text-white tabular-nums transition-all duration-300 group-hover:scale-105`}
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
    /* Enhanced coordinates with refined positioning */
    const cx = 120;
    const cy = 120;
    const radius = 80;
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
        <div className="relative h-[280px] w-full">
            <svg viewBox="0 0 240 240" className="absolute inset-0 h-full w-full" aria-hidden>
                {/* Enhanced outer guide ring with premium styling */}
                <circle
                    cx={cx}
                    cy={cy}
                    r={radius}
                    fill="none"
                    stroke="white"
                    strokeOpacity="0.20"
                    strokeWidth="1.2"
                    strokeDasharray="3 5"
                />

                {/* Enhanced connection lines with premium animations */}
                {nodes.map((n, i) => (
                    <motion.line
                        key={i}
                        x1={cx}
                        y1={cy}
                        x2={n.x}
                        y2={n.y}
                        stroke="white"
                        strokeOpacity="0.35"
                        strokeWidth="1"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true, margin: "-5%" }}
                        transition={{
                            duration: DUR.medium,
                            delay: STAGGER.slow + i * STAGGER.fast,
                            ease: EASE_T.silk
                        }}
                    />
                ))}

                {/* Enhanced travelling pulses with premium effects */}
                {nodes.map((n, i) => {
                    const path = `M ${cx} ${cy} L ${n.x} ${n.y}`;
                    return (
                        <circle key={`p-${i}`} r="2.5" fill="#7CD2FF" filter="drop-shadow(0 0 6px #7CD2FF)">
                            <animateMotion dur="3.5s" begin={`${i * 0.6}s`} repeatCount="indefinite" path={path} />
                            <animate
                                attributeName="opacity"
                                values="0;1;1;0"
                                keyTimes="0;0.1;0.9;1"
                                dur="3.5s"
                                begin={`${i * 0.6}s`}
                                repeatCount="indefinite"
                            />
                        </circle>
                    );
                })}
            </svg>

            {/* Enhanced central cube with premium glass effects */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                    className="relative grid h-[64px] w-[64px] place-items-center rounded-[14px]"
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
                    animate={{ y: [-2, 2, -2], rotate: [-3, 3, -3] }}
                    transition={{
                        duration: DUR.slow,
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
                        left: `${(n.x / 240) * 100}%`,
                        top: `${(n.y / 240) * 100}%`,
                        transform: "translate(-50%, -50%)",
                    }}
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    viewport={{ once: true, margin: "-5%" }}
                    transition={{
                        duration: DUR.base,
                        delay: STAGGER.slow + i * STAGGER.fast,
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
                className="grid h-[48px] w-[48px] place-items-center rounded-full transition-all duration-400 group-hover:scale-110 group-hover:shadow-xl"
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
    return (
        <div className="relative h-[260px] w-full">
            {/* Top-left & top-right capability tiles */}
            <div className="absolute left-2 top-2">
                <CapabilityTile label="Data" icon="data" />
            </div>
            <div className="absolute right-2 top-2">
                <CapabilityTile label="Reasoning" icon="reasoning" />
            </div>

            {/* Bottom-left & bottom-right tiles */}
            <div className="absolute left-2 bottom-2">
                <CapabilityTile label="Automation" icon="cog" />
            </div>
            <div className="absolute right-2 bottom-2">
                <CapabilityTile label="Actions" icon="bolt" />
            </div>

            {/* Centred stacked glass platforms */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <GlassPodium />
            </div>

            {/* Connecting trace lines from centre to the 4 tiles */}
            <svg viewBox="0 0 240 240" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
                {[
                    "M 120 120 L 50 50",
                    "M 120 120 L 190 50",
                    "M 120 120 L 50 190",
                    "M 120 120 L 190 190",
                ].map((d, i) => (
                    <motion.path
                        key={i}
                        d={d}
                        stroke="white"
                        strokeOpacity="0.15"
                        strokeWidth="0.6"
                        strokeDasharray="2 4"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true, margin: "-5%" }}
                        transition={{ duration: 0.8, delay: 0.5 + i * 0.08, ease: EASE_T.silk }}
                    />
                ))}
            </svg>
        </div>
    );
}

/* Stacked glass podium — 3 layered steps with a sparkle on top */
function GlassPodium() {
    return (
        <div className="relative" style={{ width: 110, height: 100 }}>
            {/* Bottom (largest) plate */}
            <div
                className="absolute left-1/2 -translate-x-1/2 rounded-[10px]"
                style={{
                    bottom: 0,
                    width: 110,
                    height: 18,
                    background:
                        "linear-gradient(180deg, rgba(255,255,255,0.32) 0%, rgba(140,180,120,0.18) 100%)",
                    border: "1px solid rgba(255,255,255,0.30)",
                    boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.50), 0 6px 14px -6px rgba(40,80,30,0.45)",
                }}
            />
            {/* Middle plate */}
            <div
                className="absolute left-1/2 -translate-x-1/2 rounded-[10px]"
                style={{
                    bottom: 14,
                    width: 88,
                    height: 18,
                    background:
                        "linear-gradient(180deg, rgba(255,255,255,0.36) 0%, rgba(140,180,120,0.22) 100%)",
                    border: "1px solid rgba(255,255,255,0.35)",
                    boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.55), 0 6px 14px -6px rgba(40,80,30,0.50)",
                }}
            />
            {/* Top plate (with sparkle) */}
            <motion.div
                className="absolute left-1/2 -translate-x-1/2 grid place-items-center rounded-[12px]"
                style={{
                    bottom: 28,
                    width: 64,
                    height: 56,
                    background:
                        "linear-gradient(160deg, rgba(255,255,255,0.55) 0%, rgba(180,220,150,0.30) 50%, rgba(80,140,80,0.45) 100%)",
                    border: "1px solid rgba(255,255,255,0.45)",
                    boxShadow:
                        "inset 0 2px 4px rgba(255,255,255,0.65), inset 0 -2px 6px rgba(0,0,0,0.25), 0 10px 20px -8px rgba(40,80,30,0.55), 0 0 24px rgba(180,220,150,0.45)",
                }}
                animate={{ y: [-1, 1, -1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <SparkleGlyph />
            </motion.div>
        </div>
    );
}

/* 4-pointed sparkle glyph (the AI mark) */
function SparkleGlyph() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
                d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"
                fill="white"
                fillOpacity="0.95"
                style={{ filter: "drop-shadow(0 0 6px rgba(255,255,255,0.85))" }}
            />
        </svg>
    );
}

/* Glass capability tile with icon + label (Data / Reasoning / etc.) */
function CapabilityTile({ label, icon }: { label: string; icon: string }) {
    return (
        <div className="flex flex-col items-center gap-1.5">
            <div
                className="grid h-[44px] w-[44px] place-items-center rounded-[10px]"
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
 *  Scene: AWS cloud at top centre, two glass orbs at bottom
 *  containing Azure (A) and GCP (G) logos.
 * ════════════════════════════════════════════════════════════════ */

function Card3Scene() {
    return (
        <div className="relative h-[260px] w-full">
            {/* Concentric guide rings */}
            <svg viewBox="0 0 240 240" className="absolute inset-0 h-full w-full" aria-hidden>
                {[60, 90].map((r, i) => (
                    <motion.circle
                        key={i}
                        cx="120"
                        cy="120"
                        r={r}
                        fill="none"
                        stroke="white"
                        strokeOpacity="0.15"
                        strokeWidth="0.7"
                        strokeDasharray="2 4"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ once: true, margin: "-5%" }}
                        transition={{ duration: 0.8, delay: 0.4 + i * 0.1, ease: EASE_T.silk }}
                    />
                ))}
            </svg>

            {/* Top centre — AWS cloud */}
            <motion.div
                className="absolute left-1/2 -translate-x-1/2"
                style={{ top: "20%" }}
                animate={{ y: [-2, 2, -2] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
                <AwsCloud />
            </motion.div>

            {/* Bottom-left — Azure orb */}
            <motion.div
                className="absolute"
                style={{ left: "12%", bottom: "12%" }}
                animate={{ y: [-1, 1, -1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            >
                <CloudOrb logo="azure" />
            </motion.div>

            {/* Bottom-right — GCP orb */}
            <motion.div
                className="absolute"
                style={{ right: "12%", bottom: "12%" }}
                animate={{ y: [-1, 1, -1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            >
                <CloudOrb logo="gcp" />
            </motion.div>

            {/* Tiny twinkles around the scene */}
            <svg viewBox="0 0 240 240" className="absolute inset-0 h-full w-full pointer-events-none" aria-hidden>
                {[
                    [40, 80], [200, 70], [60, 180], [180, 170], [120, 50], [120, 195],
                ].map(([x, y], i) => (
                    <motion.circle
                        key={i}
                        cx={x}
                        cy={y}
                        r="1.4"
                        fill="white"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                    />
                ))}
            </svg>
        </div>
    );
}

function AwsCloud() {
    return (
        <div className="relative grid place-items-center" style={{ width: 110, height: 78 }}>
            {/* Cloud silhouette */}
            <svg viewBox="0 0 110 70" className="absolute inset-0 h-full w-full">
                <defs>
                    <linearGradient id="cloud-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(255,232,200,0.85)" />
                        <stop offset="60%" stopColor="rgba(220,170,120,0.55)" />
                        <stop offset="100%" stopColor="rgba(140,80,40,0.55)" />
                    </linearGradient>
                </defs>
                <path
                    d="M28 55 C 14 55 8 44 14 36 C 12 22 30 14 40 22 C 46 14 64 14 70 24 C 88 18 96 38 86 48 C 96 56 88 65 78 60 C 70 70 38 70 28 55 Z"
                    fill="url(#cloud-grad)"
                    stroke="rgba(255,255,255,0.55)"
                    strokeWidth="1"
                    style={{ filter: "drop-shadow(0 6px 14px rgba(140,80,40,0.50))" }}
                />
            </svg>
            {/* AWS wordmark over the cloud */}
            <div className="relative z-10 mt-1 text-[12px] font-bold tracking-tight text-white" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.45)" }}>
                aws
            </div>
        </div>
    );
}

/* Glass orb with Azure A or GCP G logo inside */
function CloudOrb({ logo }: { logo: "azure" | "gcp" }) {
    return (
        <div
            className="grid h-[58px] w-[58px] place-items-center rounded-full"
            style={{
                background:
                    "radial-gradient(circle at 30% 28%, rgba(255,240,220,0.75) 0%, rgba(220,170,120,0.45) 35%, rgba(120,70,30,0.65) 100%)",
                boxShadow: [
                    "inset 4px 4px 10px rgba(255,255,255,0.45)",
                    "inset -4px -4px 10px rgba(0,0,0,0.30)",
                    "0 0 22px rgba(255,200,140,0.55)",
                    "0 8px 16px -4px rgba(120,70,30,0.50)",
                ].join(", "),
            }}
        >
            {logo === "azure" ? (
                <span className="text-[20px] font-bold leading-none text-white" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.45)" }}>
                    A
                </span>
            ) : (
                <span className="text-[20px] font-bold leading-none text-white" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.45)" }}>
                    G
                </span>
            )}
        </div>
    );
}

/* ════════════════════════════════════════════════════════════════
 *  Per-card visual containers — header + KPI strip + scene
 * ════════════════════════════════════════════════════════════════ */

function Card1Visual() {
    return (
        <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/30 bg-gradient-to-br from-white/[0.18] via-white/[0.10] to-white/[0.04] p-4 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.30),0_18px_44px_-18px_rgba(0,0,0,0.45)]">
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
            <div className="mt-3">
                <KpiStrip
                    items={[
                        { value: <CountUp to={128} duration={1.6} />, label: "Projects" },
                        { value: <CountUp to={97} suffix="%" duration={1.6} />, label: "Success" },
                        { value: <CountUp to={18} duration={1.6} />, label: "Teams" },
                    ]}
                />
            </div>
            <div className="mt-1 flex-1">
                <Card1Scene />
            </div>
        </div>
    );
}

function Card2Visual() {
    return (
        <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-black/30 via-black/55 to-black/70 p-4 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_18px_44px_-18px_rgba(0,0,0,0.55)]">
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
            <div className="mt-3">
                <div className="flex items-baseline gap-2">
                    <span
                        className="text-[34px] font-semibold leading-none tracking-[-0.04em] text-white tabular-nums"
                        style={{ textShadow: "0 1px 2px rgba(0,0,0,0.30)" }}
                    >
                        <CountUp to={97.8} decimals={1} suffix="%" duration={1.8} />
                    </span>
                    <span className="text-[10.5px] text-white/70">Workflow Accuracy</span>
                </div>
                {/* Mini sparkline next to the big number */}
                <div className="mt-1.5 h-[18px]">
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
            <div className="mt-1 flex-1">
                <Card2Scene />
            </div>
        </div>
    );
}

function Card3Visual() {
    return (
        <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/30 bg-gradient-to-br from-white/[0.20] via-white/[0.13] to-white/[0.06] p-4 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_18px_44px_-18px_rgba(0,0,0,0.45)]">
            <CardHeader
                accent="#FFB07A"
                label="Infrastructure"
                icon={
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M2 7c0-1.5 1.2-2.5 2.5-2.5C5 3 6.5 2 8 3c1.5 1 2 3 0 4H3.5C2.5 7 2 7.5 2 7z" fill="currentColor" />
                    </svg>
                }
            />
            <div className="mt-3">
                <KpiStrip
                    items={[
                        { value: <CountUp to={24} duration={1.6} />, label: "Regions" },
                        { value: <CountUp to={99.99} decimals={2} suffix="%" duration={1.8} />, label: "Uptime" },
                        { value: <CountUp to={156} duration={1.6} />, label: "Services" },
                    ]}
                />
            </div>
            <div className="mt-1 flex-1">
                <Card3Scene />
            </div>
        </div>
    );
}

/* ── Section data ─────────────────────────────────────────── */
const COLUMNS: ReadonlyArray<{
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

/* ════════════════════════════════════════════════════════════════
 *  Main section
 * ════════════════════════════════════════════════════════════════ */
export default function ClarityControlSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const inView = useInView(sectionRef, { once: true, margin: "-15%" });

    /* Enhanced scroll-driven parallax with premium motion */
    useGSAP(
        () => {
            if (!sectionRef.current) return;
            const reduced = prefersReducedMotion();
            if (reduced) return;
            const cards = sectionRef.current.querySelectorAll<HTMLElement>(".cc-card-backdrop");
            cards.forEach((el) => {
                gsap.fromTo(
                    el,
                    { yPercent: -6 },
                    {
                        yPercent: 6,
                        ease: "none",
                        scrollTrigger: {
                            trigger: el,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 0.8,
                        },
                    }
                );
            });
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            data-section="clarity-control"
            data-theme-section="light"
            className="relative w-full overflow-hidden bg-[#F3F0EE] py-24 md:py-28 lg:py-32"
        >
            <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
                {/* Premium top row with enhanced typography */}
                <div className="mb-16 grid grid-cols-1 gap-8 md:mb-20 lg:grid-cols-12 lg:gap-16">
                    <h2 className="lg:col-span-7 text-[clamp(40px,5.5vw,72px)] font-semibold leading-[0.95] tracking-[-0.04em] text-[#0a0a1a]">
                        <WordReveal text="Clarity and control for every part of your business." />
                    </h2>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                            duration: DUR.medium,
                            delay: STAGGER.medium,
                            ease: EASE_T.silk
                        }}
                        className="lg:col-span-4 lg:col-start-9 max-w-[440px] self-end text-[15px] md:text-[16px] leading-[1.6] text-[#0a0a1a]/60 font-medium"
                    >
                        Get a clear, structured view of your IT services — from project delivery to system performance and growth opportunities.
                    </motion.p>
                </div>

                {/* Enhanced 3-column intro row with premium styling */}
                <motion.div
                    variants={groupContainer}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="mb-8 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 lg:gap-10"
                >
                    {COLUMNS.map((c) => (
                        <motion.div
                            key={c.n}
                            variants={fadeUp}
                            transition={{
                                duration: DUR.base,
                                ease: EASE_T.silk
                            }}
                            className="flex flex-col group cursor-pointer"
                        >
                            <span className="text-[11px] font-medium tabular-nums text-[#0a0a1a]/60 tracking-[0.05em] uppercase transition-colors duration-300 group-hover:text-[#FF5812]">
                                [ {c.n} ]
                            </span>
                            <h3 className="mt-4 text-[16px] md:text-[17px] font-semibold leading-[1.3] tracking-[-0.01em] text-[#0a0a1a] transition-colors duration-300 group-hover:text-[#FF5812]">
                                {c.title}
                            </h3>
                            <p className="mt-4 text-[14px] md:text-[14.5px] leading-[1.6] text-[#0a0a1a]/70">
                                {c.body}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Premium 3 full-bleed scene cards with enhanced interactions */}
                <motion.div
                    variants={groupContainer}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6 lg:gap-8"
                >
                    {COLUMNS.map((c) => (
                        <motion.article
                            key={c.n}
                            variants={cardScaleIn}
                            transition={{
                                duration: DUR.slow,
                                ease: EASE_T.silk
                            }}
                            style={{ minHeight: `${OUTER_CARD.minHeight}px` }}
                            className="group relative overflow-hidden rounded-3xl transition-all duration-700 hover:shadow-2xl hover:shadow-[#FF5812]/20 cursor-pointer"
                            whileHover={{
                                y: -8,
                                scale: 1.02,
                                transition: { duration: DUR.medium, ease: EASE_T.silk }
                            }}
                        >
                            {/* Enhanced Grainient bokeh with premium effects */}
                            <div
                                aria-hidden
                                className="cc-card-backdrop absolute inset-[-12%] transition-all duration-[1500ms] group-hover:scale-[1.06] group-hover:rotate-1"
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
                                    blendSoftness={0.10}
                                    rotationAmount={420}
                                    noiseScale={1.8}
                                    grainAmount={0.06}
                                    grainScale={2.4}
                                    grainAnimated
                                    contrast={1.20}
                                    gamma={0.95}
                                    saturation={1.00}
                                />
                            </div>

                            {/* Enhanced soft scrim with premium gradient */}
                            <div
                                aria-hidden
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                                style={{
                                    background:
                                        "linear-gradient(180deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.0) 50%, rgba(0,0,0,0.25) 100%)",
                                }}
                            />

                            {/* Premium inner glass card with enhanced positioning */}
                            <div
                                className="absolute inset-x-0 flex justify-center transition-transform duration-700 group-hover:scale-105"
                                style={{ bottom: `${INNER_CARD.bottomOffset}px` }}
                            >
                                <div
                                    style={{
                                        width: `${INNER_CARD.size}px`,
                                        height: `${INNER_CARD.size}px`,
                                    }}
                                >
                                    <c.Visual />
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
