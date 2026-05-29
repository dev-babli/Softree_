"use client";

/* ════════════════════════════════════════════════════════════════════
 *  TransferredSoftreeHeroRevolut
 *  ─────────────────────────────────────────────────────────────────
 *  Snapshot of the Revolut-pattern iteration of the transferred hero,
 *  preserved here while the original `TransferredSoftreeHero.tsx`
 *  has been reverted to its GitHub-baseline state.
 *
 *  Animation behavior (single REV-ease throughout):
 *    1. Static on load. Burst plays only after a real user scroll.
 *    2. Pin + autonomous timeline (~1.6s), no scrub.
 *    3. Perimeter-inward bg shrink + plate emergence + salary lift +
 *       staggered side-card reveal.
 *    4. Smooth reverse on scroll-up via `tl.reverse()`.
 *    5. Tight pin distance (+=40%) so unpin happens right after the
 *       burst settles.
 *
 *  Identical JSX/CSS to the previous in-place version of
 *  TransferredSoftreeHero — only the file name and component name
 *  have changed so it can sit alongside the reverted original.
 * ════════════════════════════════════════════════════════════════════ */

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ──────────────────────────── Assets ──────────────────────────── */
const ASSET_BG = "/hero/hero_BG.webp";
const ASSET_SUBJECT = "/hero/hero_subject_wide.webp";
const ASSET_REF = "/hero/reference.webp";

/* Uniform card size */
const CARD_SIZE = "w-[clamp(240px,22vw,380px)] aspect-[0.8]";

/* ────────────────── Hero Subject Alignment Controls ──────────────────
 * Tweak these four values to position and size the VR subject image.
 *   - SUBJECT_LEFT   : horizontal offset (negative = nudge left)
 *   - SUBJECT_BOTTOM : vertical offset from bottom (higher % = subject higher)
 *   - SUBJECT_WIDTH  : container width (>100% = overflow horizontally)
 *   - SUBJECT_HEIGHT : container height (>100% = zoom-in effect)
 * ──────────────────────────────────────────────────────────────────── */
const SUBJECT_LEFT = "-3%";
const SUBJECT_BOTTOM = "0%";
const SUBJECT_WIDTH = "104vw";
const SUBJECT_HEIGHT = "115%";

export function TransferredSoftreeHeroRevolut() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            if (!containerRef.current) return;
            const q = gsap.utils.selector(containerRef);

            /* ─── No entrance animation ─────────────────────────────────────
             * Per Revolut: hero state is fully visible on load, NO animation
             * plays until the user scrolls. The text/CTA are naturally
             * visible from initial CSS — no fromTo, no fade-in.
             * ──────────────────────────────────────────────────────────── */

            /* ─── Revolut-pattern: pin + autonomous CSS-style animation ─────
             *
             * Behavior:
             *   1. Hero state stays static on page load (no animation playing)
             *   2. Section pins when its top hits viewport top
             *   3. ScrollTrigger's onEnter fires the timeline ONCE, autonomously
             *      (not scrub). Cinematic runtime ~1.6s.
             *   4. Pin distance long enough that the burst completes before
             *      the section unpins, even on a fast scroll.
             *
             * Single ease everywhere: cubic-bezier(0.35, 0, 0, 1).
             * ──────────────────────────────────────────────────────────────── */
            const REV = "cubic-bezier(0.35, 0, 0, 1)";

            /* The bg layer is the parent of `.global-subject` — that's the
             * navy <div> holding both the BG photo and the girl. */
            const subjectEl = q(".global-subject")[0] as HTMLElement | undefined;
            const bgLayerEl = subjectEl?.parentElement ?? null;
            if (bgLayerEl) {
                gsap.set(bgLayerEl, { transformOrigin: "50% 100%" });
            }

            /* Build the autonomous timeline (paused — fired by ScrollTrigger). */
            const tl = gsap.timeline({
                paused: true,
                defaults: { ease: REV, force3D: true },
            });

            tl.addLabel("burst", 0);

            /* Perimeter-inward bg shrink — the "subject drops into the
             * carousel" motion. Bg at scale 1 → 0.7, anchored at bottom-center
             * so the perimeter (top, sides) reveals first. Long, cinematic. */
            if (bgLayerEl) {
                tl.fromTo(
                    bgLayerEl,
                    { scale: 1 },
                    { scale: 0.7, duration: 1.1 },
                    "burst+=0.10",
                );
            }

            /* Hero text out — slight upward drift + opacity. */
            tl.fromTo(
                q(".hero-title"),
                { opacity: 1, y: 0, scale: 1 },
                { opacity: 0, y: -20, scale: 0.99, duration: 0.55 },
                "burst+=0.18",
            );
            tl.fromTo(
                q(".hero-p"),
                { opacity: 1, y: 0 },
                { opacity: 0, y: -16, duration: 0.55 },
                "burst+=0.18",
            );
            tl.fromTo(
                q(".hero-btn"),
                { opacity: 1, y: 0, scale: 1 },
                { opacity: 0, y: -14, scale: 0.98, duration: 0.55 },
                "burst+=0.18",
            );
            tl.fromTo(
                q(".hero-text-cluster"),
                { autoAlpha: 1, pointerEvents: "auto" },
                { autoAlpha: 0, pointerEvents: "none", duration: 0.01 },
                "burst+=0.78",
            );

            /* White mask plate grows from card center outward — meets the
             * perimeter-inward shrink so the bg disappears cleanly. Slow
             * and steady so the seam reveal feels deliberate. */
            tl.fromTo(
                q(".mask-expander"),
                { scale: 0 },
                { scale: 14, duration: 1.1 },
                "burst+=0.22",
            );

            /* Card content fades in continuously underneath the mask. */
            tl.fromTo(
                q(".card-inner-bg"),
                { opacity: 0 },
                { opacity: 1, duration: 0.7 },
                "burst+=0.30",
            );
            tl.fromTo(
                q(".card-ui"),
                { opacity: 0 },
                { opacity: 1, duration: 0.6 },
                "burst+=0.85",
            );

            /* Salary text — single coordinated transform: translateY + scale
             * + opacity together. Per Revolut: translateY(75) scale(0.75)
             * opacity(0) → translateY(0) scale(1) opacity(1). */
            tl.fromTo(
                q(".salary-text-cluster"),
                { opacity: 0, y: 75, scale: 0.75 },
                { opacity: 1, y: 0, scale: 1, duration: 0.7 },
                "burst+=0.65",
            );

            /* Side cards arrive AFTER the burst — secondary choreography.
             * Both fire simultaneously, well after the main reveal so the
             * carousel resolution feels staged. */
            tl.fromTo(
                q(".left-card"),
                { xPercent: 0, opacity: 0, scale: 0.93 },
                {
                    xPercent: -110,
                    opacity: 1,
                    scale: 1.0,
                    duration: 0.55,
                },
                "burst+=1.00",
            );
            tl.fromTo(
                q(".right-card"),
                { xPercent: 0, opacity: 0, scale: 0.93 },
                {
                    xPercent: 110,
                    opacity: 1,
                    scale: 1.0,
                    duration: 0.55,
                },
                "burst+=1.00",
            );

            /* ─── Pin trigger ───────────────────────────────────────────────
             * Pins the section when its top hits viewport top, then fires
             * the autonomous timeline ONCE (no scrub). Pin distance is
             * +=40% so a short continued scroll releases the pin right
             * after the burst settles — no need to scroll 4–5 times.
             *
             * Guard against on-load auto-fire:
             *   ScrollTrigger can call `onEnter` synchronously during init
             *   when the trigger element is already at/past its start
             *   position (which is the case for a hero at scrollY=0, even
             *   with `top+=N top`). We track whether a real user scroll has
             *   happened and refuse to play until then.
             * ──────────────────────────────────────────────────────────── */
            let userHasScrolled = false;
            const markScrolled = () => {
                if (window.scrollY > 0) {
                    userHasScrolled = true;
                    window.removeEventListener("scroll", markScrolled);
                }
            };
            window.addEventListener("scroll", markScrolled, { passive: true });

            ScrollTrigger.create({
                trigger: containerRef.current,
                /* Shift start a few px below viewport top so the first real
                 * scroll tick crosses it. Combined with the userHasScrolled
                 * guard, this prevents any on-load play. */
                start: "top+=4 top",
                /* Pin distance kept tight: just enough that the autonomous
                 * burst can complete before the user scrolls past `end` and
                 * the section unpins. Too long = "I have to scroll a lot to
                 * move on" — keep this short. */
                end: "+=40%",
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onEnter: () => {
                    if (userHasScrolled) tl.play();
                },
                /* Scrolling back UP into the pinned region from below: play
                 * the timeline in reverse so the burst smoothly undoes itself
                 * back to the static hero state. */
                onEnterBack: () => {
                    if (userHasScrolled) tl.reverse();
                },
                /* Scrolled all the way back past start: ensure timeline is
                 * fully rewound so the next downscroll plays a clean burst. */
                onLeaveBack: () => tl.pause(0),
            });
        },
        { scope: containerRef }, // gsap-react: scope limits selectors to this component
    );

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full shrink-0 bg-[#fafaf9]"
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center">
                {/* ================= 1. GLOBAL LAYER ================= */}
                <div className="absolute inset-0 z-0 bg-[#1a2a3a]">
                    <Image
                        src={ASSET_BG}
                        alt="Office background"
                        fill
                        priority
                        className="object-cover origin-bottom"
                        style={{ objectPosition: "20% 100%" }}
                    />
                    <div
                        className="global-subject pointer-events-none absolute block"
                        style={{
                            left: SUBJECT_LEFT,
                            bottom: SUBJECT_BOTTOM,
                            width: SUBJECT_WIDTH,
                            height: SUBJECT_HEIGHT,
                        }}
                    >
                        <Image
                            src={ASSET_SUBJECT}
                            alt="Softree VR Expert"
                            fill
                            priority
                            className="object-contain object-bottom"
                            draggable={false}
                        />
                    </div>
                </div>

                {/* ================= 2. THE EXPANDING MASK LAYER ================= */}
                {/* mask-expander is sized to the card frame (inset:0 of mask-wrapper),
         * has solid bg-[#fafaf9], starts at scale(0), and scales up rectangularly
         * to fill the viewport — pure GPU transform, no paint cost. */}
                <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-center pointer-events-none">
                    <div
                        className={`mask-wrapper absolute ${CARD_SIZE} origin-bottom z-[1]`}
                        style={{ willChange: "transform" }}
                    >
                        <div
                            className="mask-expander absolute inset-0 bg-[#fafaf9] pointer-events-none"
                            style={{
                                transformOrigin: "50% 50%",
                                willChange: "transform",
                                transform: "scale(0)",
                            }}
                        />
                    </div>
                </div>

                {/* ================= 3. HERO TEXT ================= */}
                <div className="hero-text-cluster absolute inset-0 z-20 flex flex-col justify-center pt-[16vh] pb-[22vh] pl-[7vw] pr-[4vw] pointer-events-none">
                    <div className="max-w-[600px] text-left pointer-events-auto">
                        {/* Badge */}
                        <div className="mb-6 flex items-center gap-2">
                            <svg
                                className="w-4 h-4"
                                style={{ color: "#FF7A2F" }}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                            </svg>
                            <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-semibold">
                                Global Delivery. Local Commitment.
                            </span>
                        </div>

                        {/* Headline */}
                        <h1
                            className="hero-title text-white text-[clamp(36px,4.5vw,72px)] font-semibold leading-[1.05] tracking-[-0.03em]"
                            style={{ willChange: "transform, opacity" }}
                        >
                            Your Offshore Engineering Partner
                            <span style={{ color: "#FF7A2F" }}>.</span>
                        </h1>

                        {/* Subheadline */}
                        <p className="hero-sub mt-6 text-white/70 text-[clamp(15px,1.3vw,20px)] font-normal leading-relaxed max-w-[520px]">
                            Scalable teams. Microsoft experts. AI-powered solutions. Delivered
                            for global impact.
                        </p>

                        {/* CTAs — hyper-glass effect */}
                        <style
                            dangerouslySetInnerHTML={{
                                __html: `
              @keyframes hero-glare-rev {
                0% { left: -100%; }
                15% { left: 200%; }
                100% { left: 200%; }
              }
              .hero-glass-primary-rev::before {
                content: "";
                position: absolute;
                inset: 0;
                border-radius: inherit;
                background: linear-gradient(135deg, rgba(255, 180, 120, 0.5) 0%, transparent 40%, transparent 60%, rgba(255, 255, 255, 0.2) 100%);
                mix-blend-mode: screen;
                pointer-events: none;
              }
              .hero-glass-primary-rev::after {
                content: "";
                position: absolute;
                top: 0; left: -100%;
                width: 50%; height: 100%;
                background: linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.25) 50%, transparent 100%);
                transform: skewX(-20deg);
                animation: hero-glare-rev 5s infinite ease-in-out;
                pointer-events: none;
              }
              .hero-glass-primary-rev:hover {
                transform: scale(1.05) !important;
                box-shadow:
                  0 20px 50px 0 rgba(255, 122, 47, 0.5),
                  0 8px 24px 0 rgba(0, 0, 0, 0.3),
                  inset 0 1px 4px 0 rgba(255, 255, 255, 0.5),
                  inset 0 -1px 3px 0 rgba(0, 0, 0, 0.15) !important;
              }
            `,
                            }}
                        />
                        <div
                            className="hero-btn mt-8 flex flex-wrap items-center gap-4 relative z-10"
                            style={{ willChange: "transform, opacity" }}
                        >
                            {/* PRIMARY — hyper-glass orange pill */}
                            <Link
                                href="/contact"
                                className="hero-glass-primary-rev inline-flex items-center gap-2 transition-all duration-300 ease-out active:scale-95"
                                style={{
                                    background:
                                        "linear-gradient(135deg, rgba(255, 122, 47, 0.95) 0%, rgba(200, 80, 20, 0.85) 100%)",
                                    backdropFilter: "blur(28px) saturate(180%)",
                                    WebkitBackdropFilter: "blur(28px) saturate(180%)",
                                    border: "1px solid rgba(255, 255, 255, 0.25)",
                                    borderTopColor: "rgba(255, 200, 160, 0.6)",
                                    borderLeftColor: "rgba(255, 255, 255, 0.35)",
                                    boxShadow:
                                        "0 14px 40px 0 rgba(255,122,47,0.35), 0 4px 16px 0 rgba(0,0,0,0.3), inset 0 1px 4px 0 rgba(255,255,255,0.4), inset 0 -1px 3px 0 rgba(0,0,0,0.15)",
                                    position: "relative",
                                    overflow: "hidden",
                                    borderRadius: "9999px",
                                    height: "56px",
                                    padding: "0 32px",
                                    fontSize: "16px",
                                    fontWeight: 600,
                                    color: "#fff",
                                }}
                            >
                                Partner With Us
                                <svg
                                    className="ml-1 h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ================= 4. SALARY TEXT (Fades In — DARK text on light bg) ================= */}
                <div
                    className="salary-text-cluster absolute inset-0 z-20 flex flex-col items-center pt-[15vh] pointer-events-none opacity-0"
                    style={{ willChange: "transform, opacity" }}
                >
                    <div className="max-w-2xl text-center pointer-events-auto">
                        <h2 className="text-zinc-900 text-[clamp(36px,4vw,64px)] font-black leading-none">
                            Three pillars. One team.
                        </h2>
                        <p className="text-zinc-500 text-[clamp(14px,1.1vw,18px)] mt-4 max-w-sm mx-auto">
                            Websites. AI Agents. Microsoft Solutions.
                        </p>
                    </div>
                </div>

                {/* ================= 5. VISUAL CLUSTER (The Carousel & Frame) ================= */}
                <div className="absolute inset-x-0 bottom-0 z-30 flex items-end justify-center pointer-events-none">
                    {/* Left Card — OFFSHORE DELIVERY */}
                    <div
                        className={`left-card absolute ${CARD_SIZE} rounded-2xl overflow-hidden scale-[0.9] opacity-0 z-[2]`}
                        style={{
                            background:
                                "linear-gradient(135deg, rgba(30,40,60,0.9) 0%, rgba(20,30,50,0.95) 100%)",
                            border: "1.5px solid rgba(255,255,255,0.2)",
                            borderTopColor: "rgba(255,255,255,0.4)",
                            boxShadow:
                                "0 25px 50px rgba(0,0,0,0.3), 0 10px 20px rgba(0,0,0,0.2)",
                            willChange: "transform, opacity",
                        }}
                    >
                        <Image
                            src="/whysoftree/modern.png"
                            alt="Offshore Delivery"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 inset-x-0 p-5 flex flex-col">
                            <p className="text-orange-400 text-[10px] font-bold tracking-[0.2em] uppercase">
                                Modern Engineering
                            </p>
                            <p className="text-white text-base font-bold leading-tight mt-1.5">
                                Modern applications that built for scale & performance
                            </p>
                            <Link
                                href="/services/offshore-web-app-development"
                                className="mt-3 self-start inline-flex items-center gap-1.5 bg-white text-zinc-900 text-xs font-semibold px-4 py-2 rounded-full transition-all hover:bg-white/90 pointer-events-auto shadow-sm"
                            >
                                Explore engineering <span className="text-[10px]">→</span>
                            </Link>
                        </div>
                    </div>

                    {/* Right Card — AI AUTOMATION */}
                    <div
                        className={`right-card absolute ${CARD_SIZE} rounded-2xl overflow-hidden scale-[0.9] opacity-0 z-[2]`}
                        style={{
                            background:
                                "linear-gradient(135deg, rgba(30,40,60,0.9) 0%, rgba(20,30,50,0.95) 100%)",
                            border: "1.5px solid rgba(255,255,255,0.2)",
                            borderTopColor: "rgba(255,255,255,0.4)",
                            boxShadow:
                                "0 25px 50px rgba(0,0,0,0.3), 0 10px 20px rgba(0,0,0,0.2)",
                            willChange: "transform, opacity",
                        }}
                    >
                        <Image
                            src="/whysoftree/ai.png"
                            alt="AI Automation"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 inset-x-0 p-5 flex flex-col">
                            <p className="text-orange-400 text-[10px] font-bold tracking-[0.2em] uppercase">
                                AI & Automation
                            </p>
                            <p className="text-white text-base font-bold leading-tight mt-1.5">
                                AI system that streamline operations
                            </p>
                            <Link
                                href="/services/offshore-ai-development"
                                className="mt-3 self-start inline-flex items-center gap-1.5 bg-white text-zinc-900 text-xs font-semibold px-4 py-2 rounded-full transition-all hover:bg-white/90 pointer-events-auto shadow-sm"
                            >
                                Explore AI solutions <span className="text-[10px]">→</span>
                            </Link>
                        </div>
                    </div>

                    {/* Center Card (The Frame!) */}
                    <div
                        className={`center-card relative ${CARD_SIZE} origin-bottom z-[3]`}
                        style={{ willChange: "transform" }}
                    >
                        {/* Card inner — reference.png */}
                        <div
                            className="card-inner-bg absolute inset-0 rounded-xl overflow-hidden bg-[#1a2a3a] opacity-0"
                            style={{ willChange: "opacity" }}
                        >
                            <Image
                                src={ASSET_REF}
                                alt="Softree VR Expert"
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>

                        {/* Border Frame — visible from the start */}
                        <div
                            className="frame-border absolute inset-0 z-[4] rounded-xl pointer-events-none"
                            style={{
                                border: "4px solid white",
                                boxShadow:
                                    "0 25px 50px rgba(0,0,0,0.18), 0 10px 20px rgba(0,0,0,0.1)",
                            }}
                        />

                        {/* Card UI */}
                        <div
                            className="card-ui absolute inset-x-0 bottom-0 z-[4] opacity-0 pointer-events-none"
                            style={{ willChange: "opacity" }}
                        >
                            <div className="bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-b-xl p-5 flex flex-col">
                                <p className="text-orange-400 text-[10px] font-bold tracking-[0.2em] uppercase">
                                    Microsoft & Data
                                </p>
                                <p className="text-white text-base font-bold leading-tight mt-1.5">
                                    Cloud, analytics and enterprise solutions that empower
                                    business
                                </p>
                                <Link
                                    href="/services/offshore-power-platform-development"
                                    className="mt-3 self-start inline-flex items-center gap-1.5 bg-white text-zinc-900 text-xs font-semibold px-4 py-2 rounded-full transition-all hover:bg-white/90 pointer-events-auto shadow-sm"
                                >
                                    Explore microsoft solutions{" "}
                                    <span className="text-[10px]">→</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TransferredSoftreeHeroRevolut;
