"use client";

/* ════════════════════════════════════════════════════════════════════
 *  CinematicHero
 *  ─────────────────────────────────────────────────────────────────
 *  A constraint-driven hero animation in the spirit of Revolut's
 *  cinematic compression sections.
 *
 *  Architectural philosophy (per the design-motion-principles +
 *  gsap-scrolltrigger + gsap-react skills + the user's analysis):
 *
 *    1. Static on load. Nothing animates until a real user scroll.
 *    2. Constraints animate, not components. The fullscreen scene
 *       compresses inward (scale + inset + radius), the same image
 *       stays continuous, and the resulting card emerges as if the
 *       environment "organized itself" into UI.
 *    3. Single ease everywhere via CustomEase('rev', '0.35, 0, 0, 1').
 *       This is critical — gsap.to(..., { ease: "cubic-bezier(...)" })
 *       silently falls back to a default in some builds; only a real
 *       eased curve gives the Revolut feel.
 *    4. Autonomous play, NOT scrub. ScrollTrigger pins, plays the
 *       timeline once, then unpins shortly after — no scroll-fighting.
 *    5. Reverse on scroll-up so the section feels symmetric.
 *    6. prefers-reduced-motion: skip the timeline, show end state.
 *
 *  Animation choreography (~1.6s burst, REV ease throughout):
 *
 *    0.00 → 0.45s   Hero text fade-out (slight upward drift)
 *    0.10 → 0.95s   Cinematic surface compression (scale 1.05 → 0.78,
 *                   anchored at center bottom — perimeter-inward)
 *    0.20 → 1.10s   Plate emergence (inset 0 → 6vw 5vh, radius 0 → 28px)
 *    0.40 → 1.10s   Card content sharpening (opacity ramp)
 *    0.50 → 1.20s   Salary headline lift (y75 + scale .75 + opacity 0
 *                   → 0/1/1, single coordinated transform)
 *    0.70 → 1.30s   Side cards slide outward (xPercent ±110)
 *    1.20 → 1.55s   Final shadow + settle
 *
 *  This file owns ONLY its own JSX/CSS/animation. It does not touch
 *  TransferredSoftreeHero or any other section.
 * ════════════════════════════════════════════════════════════════════ */

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase, useGSAP);

/* The exact Revolut ease, registered once. */
if (!CustomEase.get("rev")) {
    CustomEase.create("rev", "0.35, 0, 0, 1");
}

/* ───── Assets (reuse the existing hero pack) ───── */
const ASSET_BG = "/hero/hero_BG.webp";
const ASSET_SUBJECT = "/hero/hero_subject_wide.webp";
const ASSET_REF = "/hero/reference.webp";
const ASSET_LEFT = "/whysoftree/modern.png";
const ASSET_RIGHT = "/whysoftree/ai.png";

/* Subject placement controls (kept identical to existing hero). */
const SUBJECT_LEFT = "-3%";
const SUBJECT_BOTTOM = "0%";
const SUBJECT_WIDTH = "104vw";
const SUBJECT_HEIGHT = "115%";

export function CinematicHero() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            if (!containerRef.current) return;
            const root = containerRef.current;
            const q = gsap.utils.selector(root);

            /* ── Reduced motion branch ──────────────────────────────────────
             * If the user prefers reduced motion, skip the cinematic burst
             * entirely and snap directly to the resolved card state. */
            const mm = gsap.matchMedia();

            mm.add(
                {
                    /* Full motion: any user, any device, motion enabled. */
                    full: "(prefers-reduced-motion: no-preference)",
                    /* Reduced motion: fall through to the simple snap branch. */
                    reduced: "(prefers-reduced-motion: reduce)",
                },
                (ctx) => {
                    const isReduced = !!ctx.conditions?.reduced;

                    if (isReduced) {
                        /* Show the resolved state directly — no animation. */
                        gsap.set(q(".scene-bg"), { scale: 0.78 });
                        gsap.set(q(".plate"), {
                            top: "5vh",
                            right: "6vw",
                            bottom: "5vh",
                            left: "6vw",
                            borderRadius: 28,
                        });
                        gsap.set(q(".hero-cluster"), { autoAlpha: 0 });
                        gsap.set(q(".card-content, .card-frame"), { opacity: 1 });
                        gsap.set(q(".salary-cluster"), { opacity: 1, y: 0, scale: 1 });
                        gsap.set(q(".side-card.left"), {
                            xPercent: -110,
                            opacity: 1,
                            scale: 1,
                        });
                        gsap.set(q(".side-card.right"), {
                            xPercent: 110,
                            opacity: 1,
                            scale: 1,
                        });
                        return;
                    }

                    /* ── Initial state (matches CSS, made explicit for safety) ── */
                    gsap.set(q(".scene-bg"), {
                        scale: 1.05,
                        transformOrigin: "50% 100%",
                    });
                    gsap.set(q(".plate"), {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        borderRadius: 0,
                    });
                    gsap.set(q(".hero-cluster"), { autoAlpha: 1 });
                    gsap.set(q(".card-content, .card-frame"), { opacity: 0 });
                    gsap.set(q(".salary-cluster"), { opacity: 0, y: 75, scale: 0.75 });
                    gsap.set(q(".side-card.left"), {
                        xPercent: 0,
                        opacity: 0,
                        scale: 0.93,
                    });
                    gsap.set(q(".side-card.right"), {
                        xPercent: 0,
                        opacity: 0,
                        scale: 0.93,
                    });

                    /* ── The burst timeline (paused, fired by ScrollTrigger) ──
                     * Single REV ease everywhere. Total duration ~1.55s. */
                    const tl = gsap.timeline({
                        paused: true,
                        defaults: { ease: "rev", force3D: true },
                    });

                    /* Hero text out — slight upward drift. */
                    tl.to(
                        q(".hero-cluster"),
                        { autoAlpha: 0, y: -18, duration: 0.45 },
                        0,
                    );

                    /* Cinematic surface compression — perimeter-inward. */
                    tl.to(
                        q(".scene-bg"),
                        { scale: 0.78, duration: 0.85 },
                        0.1,
                    );

                    /* Plate emergence — the constraint animation that makes the
                     * fullscreen scene "containerize" into a card. This is the
                     * core of the cinematic feel. */
                    tl.to(
                        q(".plate"),
                        {
                            top: "5vh",
                            right: "6vw",
                            bottom: "5vh",
                            left: "6vw",
                            borderRadius: 28,
                            duration: 0.9,
                        },
                        0.2,
                    );

                    /* Card content sharpens beneath the plate. */
                    tl.to(
                        q(".card-content"),
                        { opacity: 1, duration: 0.7 },
                        0.4,
                    );
                    tl.to(
                        q(".card-frame"),
                        { opacity: 1, duration: 0.55 },
                        0.5,
                    );

                    /* Salary headline — single coordinated transform per Revolut. */
                    tl.to(
                        q(".salary-cluster"),
                        { opacity: 1, y: 0, scale: 1, duration: 0.7 },
                        0.5,
                    );

                    /* Side cards — secondary choreography, both fire together. */
                    tl.to(
                        q(".side-card.left"),
                        { xPercent: -110, opacity: 1, scale: 1, duration: 0.6 },
                        0.7,
                    );
                    tl.to(
                        q(".side-card.right"),
                        { xPercent: 110, opacity: 1, scale: 1, duration: 0.6 },
                        0.7,
                    );

                    /* Plate shadow lift — the final "this is now a card" cue. */
                    tl.fromTo(
                        q(".plate"),
                        { boxShadow: "0 0 0 rgba(0,0,0,0)" },
                        {
                            boxShadow:
                                "0 30px 80px rgba(15, 25, 40, 0.18), 0 12px 28px rgba(15, 25, 40, 0.10)",
                            duration: 0.5,
                        },
                        1.05,
                    );

                    /* ── Pin trigger ───────────────────────────────────────────
                     * Guarded against on-load auto-fire: ScrollTrigger can call
                     * onEnter synchronously when the trigger element is at its
                     * start position (true for any hero at scroll 0). We track
                     * a real user scroll and refuse to play until it happens. */
                    let userHasScrolled = false;
                    const markScrolled = () => {
                        if (window.scrollY > 0) {
                            userHasScrolled = true;
                            window.removeEventListener("scroll", markScrolled);
                        }
                    };
                    window.addEventListener("scroll", markScrolled, { passive: true });

                    ScrollTrigger.create({
                        trigger: root,
                        start: "top+=4 top",
                        /* Tight pin window: just enough room for the burst to play
                         * out before the section unpins. Long pins make users feel
                         * they have to scroll forever. */
                        end: "+=70%",
                        pin: true,
                        pinSpacing: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                        onEnter: () => {
                            if (userHasScrolled) tl.play();
                        },
                        /* Coming back into the pinned region from below: play
                         * the timeline backward so the entire collapse smoothly
                         * undoes itself. */
                        onEnterBack: () => {
                            if (userHasScrolled) tl.reverse();
                        },
                        /* Fully past the start, scrolled back up off-screen:
                         * hard-rewind so the next downscroll plays a clean burst. */
                        onLeaveBack: () => tl.pause(0),
                    });
                },
            );

            /* useGSAP cleanup automatically reverts mm + ScrollTriggers. */
        },
        { scope: containerRef },
    );

    return (
        <section
            ref={containerRef}
            className="cinematic-hero relative h-screen w-full shrink-0 bg-[#fafaf9] overflow-hidden"
            aria-label="Hero section"
        >
            <div className="stage absolute inset-0">
                {/* ─────────────── Layer 1: Cinematic surface ───────────────
         * The fullscreen scene that compresses inward.
         * Anchored at center-bottom for the "drop into carousel" feel.
         * ─────────────────────────────────────────────────────────── */}
                <div
                    className="scene-bg absolute inset-0 z-0 bg-[#1a2a3a] will-change-transform"
                    style={{ transformOrigin: "50% 100%" }}
                >
                    <Image
                        src={ASSET_BG}
                        alt=""
                        fill
                        priority
                        className="object-cover"
                        style={{ objectPosition: "20% 100%" }}
                    />
                    <div
                        className="absolute pointer-events-none"
                        style={{
                            left: SUBJECT_LEFT,
                            bottom: SUBJECT_BOTTOM,
                            width: SUBJECT_WIDTH,
                            height: SUBJECT_HEIGHT,
                        }}
                    >
                        <Image
                            src={ASSET_SUBJECT}
                            alt="Softree expert"
                            fill
                            priority
                            className="object-contain object-bottom"
                            draggable={false}
                        />
                    </div>
                    {/* Subtle bottom vignette for typographic legibility. */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/45 via-black/15 to-transparent pointer-events-none" />
                </div>

                {/* ─────────────── Layer 2: White plate ─────────────────────
         * The constraint that animates from full-bleed to inset card.
         * inset 0 + radius 0 → inset 5vh 6vw + radius 28px.
         * This is the "container emerging" effect.
         * ─────────────────────────────────────────────────────────── */}
                <div
                    className="plate absolute z-10 bg-[#fafaf9] pointer-events-none"
                    style={{ willChange: "top, right, bottom, left, border-radius" }}
                >
                    {/* Same scene reproduced inside the plate. Continuity = the
           * "same object transforming" illusion. The plate clips it
           * via overflow:hidden once the inset closes in. */}
                    <div className="card-frame absolute inset-0 overflow-hidden bg-[#1a2a3a]">
                        <Image
                            src={ASSET_REF}
                            alt=""
                            fill
                            priority
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                    </div>

                    {/* Card content — the resolved UI inside the plate. */}
                    <div className="card-content absolute inset-x-0 bottom-0 p-6 sm:p-8 md:p-10 z-[2]">
                        <p className="text-orange-400 text-[10px] sm:text-[11px] font-bold tracking-[0.22em] uppercase">
                            Microsoft &amp; Data
                        </p>
                        <p className="text-white text-lg sm:text-xl font-semibold leading-tight mt-2 max-w-md">
                            Cloud, analytics and enterprise solutions that empower business.
                        </p>
                        <Link
                            href="/services/offshore-power-platform-development"
                            className="mt-4 inline-flex items-center gap-1.5 bg-white text-zinc-900 text-xs font-semibold px-4 py-2 rounded-full transition-colors hover:bg-white/90"
                        >
                            Explore Microsoft solutions <span aria-hidden>→</span>
                        </Link>
                    </div>
                </div>

                {/* ─────────────── Layer 3: Hero text cluster ───────────────
         * Visible from page load. Fades out during the burst.
         * ─────────────────────────────────────────────────────────── */}
                <div
                    className="hero-cluster absolute inset-0 z-20 flex flex-col justify-center pl-[7vw] pr-[4vw] pointer-events-none"
                    style={{ willChange: "transform, opacity" }}
                >
                    <div className="max-w-[640px] text-left pointer-events-auto">
                        <div className="mb-6 flex items-center gap-2">
                            <svg
                                className="w-4 h-4"
                                style={{ color: "#FF7A2F" }}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                aria-hidden
                            >
                                <circle cx="12" cy="12" r="10" />
                                <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                            </svg>
                            <span className="text-[10px] uppercase tracking-[0.22em] text-white/60 font-semibold">
                                Global Delivery. Local Commitment.
                            </span>
                        </div>
                        <h1 className="text-white text-[clamp(36px,4.5vw,72px)] font-semibold leading-[1.05] tracking-[-0.03em]">
                            Your Offshore Engineering Partner
                            <span style={{ color: "#FF7A2F" }}>.</span>
                        </h1>
                        <p className="mt-6 text-white/72 text-[clamp(15px,1.3vw,20px)] font-normal leading-relaxed max-w-[520px]">
                            Scalable teams. Microsoft experts. AI-powered solutions.
                            Delivered for global impact.
                        </p>
                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 rounded-full px-8 h-14 text-white font-semibold text-base transition-transform duration-300 ease-out hover:scale-[1.03]"
                                style={{
                                    background:
                                        "linear-gradient(135deg, rgba(255, 122, 47, 0.95) 0%, rgba(200, 80, 20, 0.85) 100%)",
                                    border: "1px solid rgba(255, 255, 255, 0.25)",
                                    boxShadow:
                                        "0 14px 40px rgba(255,122,47,0.35), 0 4px 16px rgba(0,0,0,0.3), inset 0 1px 4px rgba(255,255,255,0.4)",
                                }}
                            >
                                Partner With Us
                                <svg
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden
                                >
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ─────────────── Layer 4: Resolved-state typography ────────
         * The "Three pillars. One team." plate that lifts in late.
         * Sits above the plate, below the side-card layer.
         * ─────────────────────────────────────────────────────────── */}
                <div
                    className="salary-cluster absolute inset-x-0 top-[clamp(56px,8vh,96px)] z-[25] flex flex-col items-center pointer-events-none"
                    style={{ willChange: "transform, opacity" }}
                >
                    <div className="max-w-2xl text-center px-6">
                        <h2 className="text-zinc-900 text-[clamp(32px,3.6vw,56px)] font-black leading-[1.05] tracking-[-0.02em]">
                            Three pillars. One team.
                        </h2>
                        <p className="mt-3 text-zinc-500 text-[clamp(13px,1.05vw,17px)]">
                            Websites. AI Agents. Microsoft Solutions.
                        </p>
                    </div>
                </div>

                {/* ─────────────── Layer 5: Side cards ──────────────────────
         * Resolve last. Slide out from center to flank the plate.
         * Positioned absolutely centered then translated by xPercent. */}
                <div className="absolute inset-0 z-[28] pointer-events-none flex items-center justify-center">
                    <div
                        className="side-card left absolute w-[clamp(220px,20vw,340px)] aspect-[0.8] rounded-2xl overflow-hidden"
                        style={{
                            willChange: "transform, opacity",
                            boxShadow:
                                "0 25px 50px rgba(0,0,0,0.30), 0 10px 20px rgba(0,0,0,0.18)",
                            border: "1.5px solid rgba(255,255,255,0.22)",
                        }}
                    >
                        <Image
                            src={ASSET_LEFT}
                            alt="Modern engineering"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 inset-x-0 p-5 flex flex-col">
                            <p className="text-orange-400 text-[10px] font-bold tracking-[0.2em] uppercase">
                                Modern Engineering
                            </p>
                            <p className="text-white text-base font-bold leading-tight mt-1.5">
                                Modern applications built for scale &amp; performance
                            </p>
                            <Link
                                href="/services/offshore-web-app-development"
                                className="mt-3 self-start inline-flex items-center gap-1.5 bg-white text-zinc-900 text-xs font-semibold px-4 py-2 rounded-full pointer-events-auto"
                            >
                                Explore engineering <span aria-hidden>→</span>
                            </Link>
                        </div>
                    </div>

                    <div
                        className="side-card right absolute w-[clamp(220px,20vw,340px)] aspect-[0.8] rounded-2xl overflow-hidden"
                        style={{
                            willChange: "transform, opacity",
                            boxShadow:
                                "0 25px 50px rgba(0,0,0,0.30), 0 10px 20px rgba(0,0,0,0.18)",
                            border: "1.5px solid rgba(255,255,255,0.22)",
                        }}
                    >
                        <Image
                            src={ASSET_RIGHT}
                            alt="AI &amp; Automation"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 inset-x-0 p-5 flex flex-col">
                            <p className="text-orange-400 text-[10px] font-bold tracking-[0.2em] uppercase">
                                AI &amp; Automation
                            </p>
                            <p className="text-white text-base font-bold leading-tight mt-1.5">
                                AI systems that streamline operations
                            </p>
                            <Link
                                href="/services/offshore-ai-development"
                                className="mt-3 self-start inline-flex items-center gap-1.5 bg-white text-zinc-900 text-xs font-semibold px-4 py-2 rounded-full pointer-events-auto"
                            >
                                Explore AI solutions <span aria-hidden>→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CinematicHero;
