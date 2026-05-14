"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger, useGSAP)

/* ──────────────────────────── Assets ──────────────────────────── */
const ASSET_BG = "/hero/hero_BG.png"
const ASSET_SUBJECT = "/hero/hero_subject_wide.png"
const ASSET_REF = "/hero/reference.png"

/* Uniform card size */
const CARD_SIZE = "w-[clamp(240px,22vw,380px)] aspect-[0.8]"

/* ────────────────── Hero Subject Alignment Controls ──────────────────
 * Tweak these four values to position and size the VR subject image.
 *   - SUBJECT_LEFT   : horizontal offset (negative = nudge left)
 *   - SUBJECT_BOTTOM : vertical offset from bottom (higher % = subject higher)
 *   - SUBJECT_WIDTH  : container width (>100% = overflow horizontally)
 *   - SUBJECT_HEIGHT : container height (>100% = zoom-in effect)
 * ──────────────────────────────────────────────────────────────────── */
const SUBJECT_LEFT = "-3%"
const SUBJECT_BOTTOM = "0%"
const SUBJECT_WIDTH = "104vw"
const SUBJECT_HEIGHT = "1115%"

export function TransferredSoftreeHero() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current) return
      const q = gsap.utils.selector(containerRef)

      /* ── 0. Entrance animations (on load, NOT scroll) ── */
      /* Keep blur only here — these run ONCE, not per-frame during scrub */
      gsap.fromTo(
        q(".hero-title"),
        { opacity: 0, y: 60, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 1.6, ease: "expo.out", force3D: true }
      )
      gsap.fromTo(
        q(".hero-p"),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.4, ease: "expo.out", delay: 0.2, force3D: true }
      )
      gsap.fromTo(
        q(".hero-btn"),
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "expo.out", delay: 0.35, force3D: true }
      )

      /* ── Revolut's exact easing curve: cubic-bezier(0.35, 0, 0, 1) ── */
      const revolutEase = "cubic-bezier(0.35, 0, 0, 1)"

      /* ── 1. Scrub-linked timeline — animation follows scroll position exactly ── */
      const tl = gsap.timeline({
        defaults: { ease: "none", force3D: true },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top+=1 top",
          end: "+=60%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      tl.addLabel("burst", 0)

      /* ── Mask expansion (rectangular, GPU-only transform: scale)              ──
       * The .mask-expander div is sized to the card frame (inset:0 of mask-wrapper)
       * and has bg-[#fafaf9]. Scaling it from 0 → large value expands a rectangle
       * outward from the card's center, filling the viewport. Pure GPU compositing,
       * zero paint cost — this is what kills the jitter from boxShadow. */
      tl.fromTo(q(".mask-expander"),
        { scale: 0 },
        { scale: 14, duration: 1, ease: revolutEase },
        "burst"
      )

      /* ── Card internals fade in ── */
      tl.to(q(".card-inner-bg"), { opacity: 1, duration: 0.6 }, "burst")
      tl.to(q(".card-ui"), { opacity: 1, duration: 0.5 }, "burst+=0.1")

      /* ── Frame + center card scale down ── */
      /* gsap-performance: only transform + opacity, all force3D via will-change CSS */
      tl.fromTo(q(".mask-wrapper"),
        { scale: 1.2 },
        { scale: 1.0, duration: 1, ease: revolutEase },
        "burst"
      )
      tl.fromTo(q(".center-card"),
        { scale: 1.2 },
        { scale: 1.0, duration: 1, ease: revolutEase },
        "burst"
      )

      /* ── Hero text dissolve (GPU-only: opacity + y + scale) ── */
      /* gsap-performance: NO filter:blur — it causes repaint per frame */
      /* All use fromTo so they properly reverse when scrubbing back */
      tl.fromTo(q(".hero-title"),
        { opacity: 1, y: 0, scale: 1 },
        { opacity: 0, y: -30, scale: 0.97, duration: 0.5, ease: revolutEase },
        "burst"
      )
      tl.fromTo(q(".hero-p"),
        { opacity: 1, y: 0 },
        { opacity: 0, y: -20, duration: 0.4, ease: revolutEase },
        "burst+=0.02"
      )
      tl.fromTo(q(".hero-btn"),
        { opacity: 1, y: 0, scale: 1 },
        { opacity: 0, y: -15, scale: 0.96, duration: 0.35, ease: revolutEase },
        "burst+=0.04"
      )
      tl.fromTo(q(".hero-text-cluster"),
        { autoAlpha: 1, pointerEvents: "auto" },
        { autoAlpha: 0, pointerEvents: "none", duration: 0.01 },
        "burst+=0.55"
      )

      /* ── Salary text reveal ── */
      tl.fromTo(q(".salary-text-cluster"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: revolutEase },
        "burst+=0.25"
      )

      /* ── Side cards slide out ── */
      tl.fromTo(q(".left-card"),
        { xPercent: 0, opacity: 0, scale: 0.93 },
        { xPercent: -110, opacity: 1, scale: 1.0, duration: 0.7, ease: revolutEase },
        "burst+=0.15"
      )
      tl.fromTo(q(".right-card"),
        { xPercent: 0, opacity: 0, scale: 0.93 },
        { xPercent: 110, opacity: 1, scale: 1.0, duration: 0.7, ease: revolutEase },
        "burst+=0.15"
      )
    },
    { scope: containerRef }  // gsap-react: scope limits selectors to this component
  )

  return (
    <section ref={containerRef} className="relative h-screen w-full shrink-0 bg-[#fafaf9]">
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
              <svg className="w-4 h-4" style={{ color: "#FF7A2F" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
              </svg>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-semibold">Global Delivery. Local Commitment.</span>
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
              Scalable teams. Microsoft experts. AI-powered solutions. Delivered for global impact.
            </p>

            {/* CTAs — hyper-glass effect */}
            <style dangerouslySetInnerHTML={{
              __html: `
              @keyframes hero-glare {
                0% { left: -100%; }
                15% { left: 200%; }
                100% { left: 200%; }
              }
              .hero-glass-primary::before {
                content: "";
                position: absolute;
                inset: 0;
                border-radius: inherit;
                background: linear-gradient(135deg, rgba(255, 180, 120, 0.5) 0%, transparent 40%, transparent 60%, rgba(255, 255, 255, 0.2) 100%);
                mix-blend-mode: screen;
                pointer-events: none;
              }
              .hero-glass-primary::after {
                content: "";
                position: absolute;
                top: 0; left: -100%;
                width: 50%; height: 100%;
                background: linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.25) 50%, transparent 100%);
                transform: skewX(-20deg);
                animation: hero-glare 5s infinite ease-in-out;
                pointer-events: none;
              }
              .hero-glass-primary:hover {
                transform: scale(1.05) !important;
                box-shadow:
                  0 20px 50px 0 rgba(255, 122, 47, 0.5),
                  0 8px 24px 0 rgba(0, 0, 0, 0.3),
                  inset 0 1px 4px 0 rgba(255, 255, 255, 0.5),
                  inset 0 -1px 3px 0 rgba(0, 0, 0, 0.15) !important;
              }
              .hero-glass-secondary::before {
                content: "";
                position: absolute;
                inset: 0;
                border-radius: inherit;
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, transparent 50%, rgba(255, 255, 255, 0.08) 100%);
                mix-blend-mode: screen;
                pointer-events: none;
              }
              .hero-glass-secondary::after {
                content: "";
                position: absolute;
                top: 0; left: -100%;
                width: 50%; height: 100%;
                background: linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%);
                transform: skewX(-20deg);
                animation: hero-glare 6s infinite ease-in-out;
                animation-delay: 1.5s;
                pointer-events: none;
              }
              .hero-glass-secondary:hover {
                transform: scale(1.05) !important;
                border-color: rgba(255, 255, 255, 0.3) !important;
                background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.65) 100%) !important;
              }
            `}} />
            <div className="hero-btn mt-8 flex flex-wrap items-center gap-4 relative z-10" style={{ willChange: "transform, opacity" }}>
              {/* PRIMARY — hyper-glass orange pill */}
              <Link
                href="/contact"
                className="hero-glass-primary inline-flex items-center gap-2 transition-all duration-300 ease-out active:scale-95"
                style={{
                  background: "linear-gradient(135deg, rgba(255, 122, 47, 0.95) 0%, rgba(200, 80, 20, 0.85) 100%)",
                  backdropFilter: "blur(28px) saturate(180%)",
                  WebkitBackdropFilter: "blur(28px) saturate(180%)",
                  border: "1px solid rgba(255, 255, 255, 0.25)",
                  borderTopColor: "rgba(255, 200, 160, 0.6)",
                  borderLeftColor: "rgba(255, 255, 255, 0.35)",
                  boxShadow: "0 14px 40px 0 rgba(255,122,47,0.35), 0 4px 16px 0 rgba(0,0,0,0.3), inset 0 1px 4px 0 rgba(255,255,255,0.4), inset 0 -1px 3px 0 rgba(0,0,0,0.15)",
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
                <svg className="ml-1 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>

              {/* SECONDARY — dark glass pill */}
              <Link
                href="/contact"
                className="hero-glass-secondary inline-flex items-center gap-2 transition-all duration-300 ease-out active:scale-95"
                style={{
                  background: "linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.55) 100%)",
                  backdropFilter: "blur(40px) saturate(200%)",
                  WebkitBackdropFilter: "blur(40px) saturate(200%)",
                  boxShadow: "inset 0 1px 2px rgba(255,255,255,0.2), inset 0 -1px 3px rgba(0,0,0,0.3), 0 8px 32px rgba(0,0,0,0.3)",
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "9999px",
                  border: "1px solid rgba(255, 255, 255, 0.18)",
                  height: "56px",
                  padding: "0 32px",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "rgba(255, 255, 255, 0.9)",
                }}
              >
                Schedule a Call
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
              background: "linear-gradient(135deg, rgba(30,40,60,0.9) 0%, rgba(20,30,50,0.95) 100%)",
              border: "1.5px solid rgba(255,255,255,0.2)",
              borderTopColor: "rgba(255,255,255,0.4)",
              boxShadow: "0 25px 50px rgba(0,0,0,0.3), 0 10px 20px rgba(0,0,0,0.2)",
              willChange: "transform, opacity",
            }}
          >
            <Image src="/whysoftree/web dev.webp" alt="Offshore Delivery" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-5 flex flex-col">
              <p className="text-indigo-400 text-[10px] font-bold tracking-[0.2em] uppercase">Offshore Delivery</p>
              <p className="text-white text-base font-bold leading-tight mt-1.5">Engineering teams that scale fast</p>
              <Link href="/services/digital-workspace/web-app-development" className="mt-3 self-start inline-flex items-center gap-1.5 bg-white text-zinc-900 text-xs font-semibold px-4 py-2 rounded-full transition-all hover:bg-white/90 pointer-events-auto shadow-sm">
                Build with us <span className="text-[10px]">→</span>
              </Link>
            </div>
          </div>

          {/* Right Card — AI AUTOMATION */}
          <div
            className={`right-card absolute ${CARD_SIZE} rounded-2xl overflow-hidden scale-[0.9] opacity-0 z-[2]`}
            style={{
              background: "linear-gradient(135deg, rgba(30,40,60,0.9) 0%, rgba(20,30,50,0.95) 100%)",
              border: "1.5px solid rgba(255,255,255,0.2)",
              borderTopColor: "rgba(255,255,255,0.4)",
              boxShadow: "0 25px 50px rgba(0,0,0,0.3), 0 10px 20px rgba(0,0,0,0.2)",
              willChange: "transform, opacity",
            }}
          >
            <Image src="/whysoftree/ai.webp" alt="AI Automation" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-5 flex flex-col">
              <p className="text-indigo-400 text-[10px] font-bold tracking-[0.2em] uppercase">AI Automation</p>
              <p className="text-white text-base font-bold leading-tight mt-1.5">AI agents that work around the clock</p>
              <Link href="/services/ai-intelligence/agentic-ai" className="mt-3 self-start inline-flex items-center gap-1.5 bg-white text-zinc-900 text-xs font-semibold px-4 py-2 rounded-full transition-all hover:bg-white/90 pointer-events-auto shadow-sm">
                See AI solutions <span className="text-[10px]">→</span>
              </Link>
            </div>
          </div>

          {/* Center Card (The Frame!) */}
          <div
            className={`center-card relative ${CARD_SIZE} origin-bottom z-[3]`}
            style={{ willChange: "transform" }}
          >

            {/* Card inner — reference.png */}
            <div className="card-inner-bg absolute inset-0 rounded-xl overflow-hidden bg-[#1a2a3a] opacity-0" style={{ willChange: "opacity" }}>
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
              style={{ border: "4px solid white", boxShadow: "0 25px 50px rgba(0,0,0,0.18), 0 10px 20px rgba(0,0,0,0.1)" }}
            />

            {/* Card UI */}
            <div className="card-ui absolute inset-x-0 bottom-0 z-[4] opacity-0 pointer-events-none" style={{ willChange: "opacity" }}>
              <div className="bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-b-xl p-5 flex flex-col">
                <p className="text-indigo-400 text-[10px] font-bold tracking-[0.2em] uppercase">Microsoft & AI</p>
                <p className="text-white text-base font-bold leading-tight mt-1.5">Enterprise solutions for modern business</p>
                <Link href="/services/business-applications" className="mt-3 self-start inline-flex items-center gap-1.5 bg-white text-zinc-900 text-xs font-semibold px-4 py-2 rounded-full transition-all hover:bg-white/90 pointer-events-auto shadow-sm">
                  Explore services <span className="text-[10px]">→</span>
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default TransferredSoftreeHero

