"use client";

/* ─────────────────────────────────────────────────────────────────────
 *  Careers Hero — Light editorial hero
 *  ──────────────
 *  Mirrors the design language used by `ContactHero` (display headline
 *  with italic serif accent, corner ticks, soft amber gradient mesh)
 *  and the `AvooraHero` capability marquee (continuous infinite-scroll
 *  rail of imagery). Below the headline we render a dual-row marquee
 *  of office gallery photographs from `/public/Gallery/*`.
 *
 *  Keeps motion respectful of `prefers-reduced-motion` and gates GSAP
 *  to client-only renders.
 * ───────────────────────────────────────────────────────────────────── */

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { CareersImage } from "./types";
import { DEFAULT_GALLERY } from "./types";

const heroStyles = `
  @keyframes blob-1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(8%, -6%) scale(1.1); }
    66% { transform: translate(-6%, 4%) scale(0.95); }
  }
  @keyframes blob-2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(-7%, 5%) scale(1.05); }
    66% { transform: translate(5%, -4%) scale(1.1); }
  }
  @keyframes blob-3 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(-4%, -5%) scale(1.08); }
  }
  .careers-blob-1 { animation: blob-1 22s ease-in-out infinite; }
  .careers-blob-2 { animation: blob-2 28s ease-in-out infinite; }
  .careers-blob-3 { animation: blob-3 18s ease-in-out infinite; }

  @keyframes careers-marquee-left {
    0% { transform: translate3d(0, 0, 0); }
    100% { transform: translate3d(-50%, 0, 0); }
  }
  @keyframes careers-marquee-right {
    0% { transform: translate3d(-50%, 0, 0); }
    100% { transform: translate3d(0, 0, 0); }
  }
  .careers-marquee-track {
    display: flex;
    width: max-content;
    will-change: transform;
  }
  .careers-marquee-track.left { animation: careers-marquee-left 55s linear infinite; }
  .careers-marquee-track.right { animation: careers-marquee-right 65s linear infinite; }
  .careers-marquee-rail:hover .careers-marquee-track { animation-play-state: paused; }

  @media (prefers-reduced-motion: reduce) {
    .careers-blob-1, .careers-blob-2, .careers-blob-3,
    .careers-marquee-track { animation: none !important; }
  }
`;

function CornerTick({ className = "" }: { className?: string }) {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden
            className={`pointer-events-none ${className}`}
        >
            <path d="M0 0 H14 M0 0 V14" stroke="#F5B947" strokeWidth="1" />
        </svg>
    );
}

interface CyclingRoleProps {
    roles: string[];
}

function CyclingRole({ roles }: CyclingRoleProps) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (roles.length < 2) return;
        const id = setInterval(() => {
            setIndex((i) => (i + 1) % roles.length);
        }, 2400);
        return () => clearInterval(id);
    }, [roles.length]);

    const word = roles[index] ?? roles[0] ?? "";

    return (
        <span className="relative inline-block whitespace-nowrap align-baseline">
            <AnimatePresence mode="wait">
                <motion.span
                    key={word}
                    className="inline-block bg-gradient-to-r from-[#1a1a1a] to-[#1a1a1a]/70 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: "0.4em", filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: "-0.4em", filter: "blur(8px)" }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
                >
                    {word}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}

interface MarqueeRailProps {
    images: CareersImage[];
    direction?: "left" | "right";
}

function MarqueeRail({ images, direction = "left" }: MarqueeRailProps) {
    // Triple the array so the loop never visibly seams.
    const looped = [...images, ...images];

    return (
        <div className="careers-marquee-rail relative w-full overflow-hidden">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-20 md:w-28"
                style={{
                    background:
                        "linear-gradient(90deg, #FAFAF8 0%, rgba(250,250,248,0.8) 35%, transparent 100%)",
                }}
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-20 md:w-28"
                style={{
                    background:
                        "linear-gradient(270deg, #FAFAF8 0%, rgba(250,250,248,0.8) 35%, transparent 100%)",
                }}
            />

            <div
                className={`careers-marquee-track ${direction === "left" ? "left" : "right"} gap-2.5 pr-2.5 sm:gap-4 sm:pr-4 md:gap-5 md:pr-5`}
            >
                {looped.map((img, i) => (
                    <a
                        key={`${direction}-${i}`}
                        href="#culture"
                        className="relative block h-[160px] w-[120px] flex-shrink-0 overflow-hidden rounded-2xl border border-neutral-900/10 bg-neutral-100 shadow-[0_8px_28px_-12px_rgba(10,10,26,0.2)] transition-transform duration-500 hover:-translate-y-1 sm:h-[220px] sm:w-[170px] md:h-[280px] md:w-[220px] lg:h-[340px] lg:w-[260px]"
                        aria-label={img.alt || "Life at Softree"}
                    >
                        {img.url ? (
                            <Image
                                src={img.url}
                                alt={img.alt || ""}
                                fill
                                sizes="(min-width: 1024px) 260px, (min-width: 768px) 220px, (min-width: 640px) 170px, 120px"
                                className="object-cover transition-transform duration-700 ease-out hover:scale-[1.05]"
                            />
                        ) : null}
                        {img.caption ? (
                            <span className="absolute bottom-3 left-3 right-3 z-10 rounded-md bg-black/55 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                                {img.caption}
                            </span>
                        ) : null}
                        <span
                            aria-hidden
                            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent"
                        />
                    </a>
                ))}
            </div>
        </div>
    );
}

export interface CareersHeroLightProps {
    eyebrow?: string;
    headline?: string;
    headlineItalic?: string;
    subline?: string;
    cyclingRoles?: string[];
    gallery?: CareersImage[];
}

export default function CareersHeroLight({
    eyebrow = "Now hiring across Bengaluru, Cuttack & Remote",
    headline = "Build careers",
    headlineItalic = "worth telling.",
    subline = "Senior engineers, real ownership, fixed-scope client work that ships in weeks not quarters. Find the role that fits how you build best.",
    cyclingRoles = [
        "AI Engineer",
        "Power BI Developer",
        "Power Apps Developer",
        "QA Automation Engineer",
        "Full-stack Developer",
    ],
    gallery,
}: CareersHeroLightProps) {
    const images =
        gallery && gallery.length >= 3 ? gallery : DEFAULT_GALLERY;

    // Split gallery roughly in half for the two rails.
    const half = Math.ceil(images.length / 2);
    const top = images.slice(0, half);
    const bottom = images.slice(half).concat(images.slice(0, half));

    return (
        <section className="relative w-full overflow-hidden bg-[#FAFAF8] pb-14 pt-16 sm:pb-20 sm:pt-24 md:pb-24 md:pt-28">
            <style>{heroStyles}</style>

            {/* ── Gradient mesh background ── */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                    className="careers-blob-1 absolute -right-[15%] -top-[20%] h-[700px] w-[700px] rounded-full blur-[120px]"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(245,185,71,0.55), rgba(245,185,71,0.1) 50%, transparent 70%)",
                    }}
                />
                <div
                    className="careers-blob-2 absolute -left-[10%] top-[20%] h-[600px] w-[600px] rounded-full blur-[140px]"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(252,165,124,0.4), rgba(252,165,124,0.1) 50%, transparent 70%)",
                    }}
                />
                <div
                    className="careers-blob-3 absolute -bottom-[20%] left-[30%] h-[500px] w-[500px] rounded-full blur-[110px]"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(255,205,180,0.45), rgba(255,205,180,0.1) 50%, transparent 70%)",
                    }}
                />
            </div>

            {/* ── Grain texture ── */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Subtle dot grid */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:32px_32px]"
            />

            {/* Top fade-to-cream */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-[#FAFAF8] to-transparent"
            />

            <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6">
                <CornerTick className="absolute left-4 top-0 sm:left-6" />
                <CornerTick className="absolute right-4 top-0 rotate-90 sm:right-6" />

                {/* Eyebrow */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-8 mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-neutral-900/10 bg-white/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-700 backdrop-blur-sm sm:mt-12 sm:mb-8 sm:text-[11px] sm:tracking-[0.22em]"
                >
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#F5B947]" />
                    <span className="truncate">{eyebrow}</span>
                </motion.div>

                {/* MASSIVE display headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                        duration: 1,
                        delay: 0.15,
                        ease: [0.21, 1.02, 0.73, 1],
                    }}
                    className="break-words text-[clamp(2.75rem,11vw,9.5rem)] font-semibold leading-[0.9] tracking-[-0.05em] text-neutral-950 sm:leading-[0.86] sm:tracking-[-0.06em]"
                    style={{ fontFeatureSettings: '"ss01"' }}
                >
                    <span className="block">{headline}</span>
                    <span className="-mt-1 block font-serif italic font-normal text-[#1a1a1a]/85 sm:-mt-3 md:-mt-4">
                        {headlineItalic.replace(/\.+$/, "")}
                        <span className="text-[#F5B947]">.</span>
                    </span>
                </motion.h1>

                {/* Subline + role cycler */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.7,
                        delay: 0.45,
                        ease: [0.21, 1.02, 0.73, 1],
                    }}
                    className="mt-8 flex flex-col items-start justify-between gap-6 border-t border-neutral-900/[0.1] pt-6 sm:mt-12 md:flex-row md:items-end md:gap-8"
                >
                    <div className="w-full max-w-[640px] space-y-3">
                        <p className="text-[14px] leading-[1.65] text-neutral-600 sm:text-[15px] md:text-[16px]">
                            {subline}
                        </p>
                        <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-neutral-500 sm:text-[13px] sm:tracking-[0.18em]">
                            We&rsquo;re hiring{" "}
                            <span className="text-neutral-900">
                                <CyclingRole roles={cyclingRoles} />
                            </span>
                        </p>
                    </div>

                    <div className="flex w-full flex-wrap items-center gap-2.5 sm:gap-3 md:w-auto">
                        <a
                            href="#open-roles"
                            className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#1a1a1a] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_8px_24px_-8px_rgba(26,26,26,0.4)] transition-all hover:-translate-y-px hover:bg-[#0a0a0a] sm:flex-none sm:px-5 sm:text-[12px] sm:tracking-[0.18em]"
                        >
                            Browse open roles <span aria-hidden>→</span>
                        </a>
                        <a
                            href="#talent-pool"
                            className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-neutral-900/15 bg-white/60 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-800 backdrop-blur-sm transition-all hover:-translate-y-px hover:border-neutral-900/30 sm:flex-none sm:px-5 sm:text-[12px] sm:tracking-[0.18em]"
                        >
                            Join talent pool
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* ── Marquee gallery rails ── */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative mt-12 flex flex-col gap-2.5 sm:mt-16 sm:gap-3 md:mt-20 md:gap-4"
            >
                <MarqueeRail images={top} direction="left" />
                <MarqueeRail images={bottom} direction="right" />
            </motion.div>
        </section>
    );
}
