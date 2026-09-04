"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** About Us / light editorial DNA */
const ACCENT = "#FF5812";
const SURFACE_LIGHT = "#fafaf9";
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

/** Mask burst anchor — aligned to subject torso (wash expands over the figure) */
const MASK_ANCHOR = {
  left: "54%",
  bottom: "6%",
  width: "min(48vw, 480px)",
  height: "min(58vh, 540px)",
} as const;

export function TransferredSoftreeHero() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const q = gsap.utils.selector(containerRef);
      const reduced = prefersReducedMotion();
      const cinematicEase = EASE.drawer;

      const mm = gsap.matchMedia();

      // Desktop/Wide screens: Run the full cinematic pinning scroll animation
      mm.add("(min-width: 1024px)", () => {
        /* ── Deterministic initial state (scroll timeline owns the full lifecycle) ── */
        gsap.set(q(".mask-expander"), { scale: 0, transformOrigin: "50% 88%" });
        gsap.set(q(".card-inner-bg"), { opacity: 0 });
        gsap.set(q(".card-ui"), { opacity: 0 });
        gsap.set(q(".mask-wrapper"), { scale: 1.08 });
        gsap.set(q(".center-card"), { scale: 1.08 });
        gsap.set(q(".hero-title"), { opacity: 1, y: 0, scale: 1 });
        gsap.set(q(".hero-sub"), { opacity: 1, y: 0 });
        gsap.set(q(".hero-btn"), { opacity: 1, y: 0, scale: 1 });
        gsap.set(q(".hero-text-cluster"), { autoAlpha: 1, pointerEvents: "auto" });
        gsap.set(q(".hero-scrim"), { opacity: 1 });
        gsap.set(q(".salary-text-cluster"), { autoAlpha: 0, y: 20, pointerEvents: "none" });
        gsap.set(q(".left-card"), { xPercent: 0, opacity: 0, scale: 0.94, visibility: "hidden" });
        gsap.set(q(".right-card"), { xPercent: 0, opacity: 0, scale: 0.94, visibility: "hidden" });

        if (reduced) {
          gsap.set(q(".mask-expander"), { scale: 16 });
          gsap.set(q(".card-inner-bg"), { opacity: 1 });
          gsap.set(q(".card-ui"), { opacity: 1 });
          gsap.set(q(".center-card"), { scale: 1 });
          gsap.set(q(".left-card"), { xPercent: -108, opacity: 1, scale: 1, visibility: "visible" });
          gsap.set(q(".right-card"), { xPercent: 108, opacity: 1, scale: 1, visibility: "visible" });
          gsap.set(q(".hero-text-cluster"), { autoAlpha: 0, pointerEvents: "none" });
          gsap.set(q(".hero-scrim"), { opacity: 0 });
          gsap.set(q(".salary-text-cluster"), { autoAlpha: 1, y: 0, pointerEvents: "auto" });
          return;
        }

        /* One scrub timeline ── every tween is fromTo so scroll-back mirrors forward */
        const tl = gsap.timeline({
          defaults: { ease: "none", force3D: true },
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=55%",
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 0.55,
            invalidateOnRefresh: true,
          },
        });

        const T = 1;

        /* Phase A — cream wash rises over the subject (mask layer above figure) */
        tl.fromTo(
          q(".mask-expander"),
          { scale: 0 },
          { scale: 16, duration: T, ease: cinematicEase },
          0,
        );
        tl.fromTo(
          q(".hero-scrim"),
          { opacity: 1 },
          { opacity: 0, duration: T * 0.55, ease: cinematicEase },
          0.08,
        );
        tl.fromTo(
          q(".mask-wrapper"),
          { scale: 1.08 },
          { scale: 1, duration: T * 0.45, ease: cinematicEase },
          0,
        );
        tl.fromTo(
          q(".center-card"),
          { scale: 1.08 },
          { scale: 1, duration: T * 0.45, ease: cinematicEase },
          0,
        );
        tl.fromTo(q(".card-inner-bg"), { opacity: 0 }, { opacity: 1, duration: T * 0.5, ease: cinematicEase }, 0.12);
        tl.fromTo(q(".card-ui"), { opacity: 0 }, { opacity: 1, duration: T * 0.45, ease: cinematicEase }, 0.18);

        /* Phase B — hero copy exits before pillar copy enters (clean scroll-back) */
        tl.fromTo(
          q(".hero-title"),
          { opacity: 1, y: 0, scale: 1 },
          { opacity: 0, y: -22, scale: 0.98, duration: T * 0.32, ease: cinematicEase },
          0.14,
        );
        tl.fromTo(
          q(".hero-sub"),
          { opacity: 1, y: 0 },
          { opacity: 0, y: -14, duration: T * 0.28, ease: cinematicEase },
          0.17,
        );
        tl.fromTo(
          q(".hero-btn"),
          { opacity: 1, y: 0, scale: 1 },
          { opacity: 0, y: -10, scale: 0.98, duration: T * 0.24, ease: cinematicEase },
          0.19,
        );
        tl.fromTo(
          q(".hero-text-cluster"),
          { autoAlpha: 1, pointerEvents: "auto" },
          { autoAlpha: 0, pointerEvents: "none", duration: T * 0.12, ease: cinematicEase },
          0.36,
        );

        /* Phase C — pillar headline (after hero is mostly gone on reverse) */
        tl.fromTo(
          q(".salary-text-cluster"),
          { autoAlpha: 0, y: 20, pointerEvents: "none" },
          { autoAlpha: 1, y: 0, pointerEvents: "auto", duration: T * 0.38, ease: cinematicEase },
          0.4,
        );

        /* Phase D — side cards peel out */
        tl.fromTo(
          q(".left-card"),
          { xPercent: 0, opacity: 0, scale: 0.94, visibility: "hidden" },
          { xPercent: -108, opacity: 1, scale: 1, visibility: "visible", duration: T * 0.55, ease: cinematicEase },
          0.48,
        );
        tl.fromTo(
          q(".right-card"),
          { xPercent: 0, opacity: 0, scale: 0.94, visibility: "hidden" },
          { xPercent: 108, opacity: 1, scale: 1, visibility: "visible", duration: T * 0.55, ease: cinematicEase },
          0.48,
        );
      });

      // Mobile/Tablet/Small screens (< 1024px): Standard responsive hero layout, turn off animations
      mm.add("(max-width: 1023px)", () => {
        gsap.set(q(".mask-expander"), { scale: 0 }); // Hide cream wash to keep dark office background
        gsap.set(q(".mask-wrapper"), { scale: 1 });
        gsap.set(q(".hero-title"), { opacity: 1, y: 0, scale: 1 });
        gsap.set(q(".hero-sub"), { opacity: 1, y: 0 });
        gsap.set(q(".hero-btn"), { opacity: 1, y: 0, scale: 1 });
        gsap.set(q(".hero-text-cluster"), { autoAlpha: 1, pointerEvents: "auto" });
        gsap.set(q(".hero-scrim"), { opacity: 0.45 });

        // Ensure cards have no animation or left-over translations/scales on mobile and tablet
        gsap.set(q(".left-card, .right-card, .center-card"), {
          xPercent: 0,
          yPercent: 0,
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          visibility: "visible",
          clearProps: "all"
        });
        gsap.set(q(".card-inner-bg"), {
          opacity: 1,
          clearProps: "opacity"
        });
        gsap.set(q(".card-ui"), {
          opacity: 1,
          clearProps: "opacity"
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      data-section="hero"
      data-theme-section="dark"
      aria-label="Hero"
      className="relative h-auto lg:min-h-[100dvh] w-full shrink-0 bg-[#1a2a3a] lg:bg-[#fafaf9] flex flex-col"
    >
      <div className="relative lg:sticky lg:top-0 h-auto lg:h-[100dvh] w-full overflow-visible lg:overflow-hidden flex flex-col items-center">
        {/* ================= 1. BACKGROUND ================= */}
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
            className="hero-scrim pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a1628]/42 via-[#0a1628]/08 to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a1628]/45 via-transparent to-transparent"
            aria-hidden
          />
          <div
            className="global-subject pointer-events-none absolute hidden lg:block"
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

        {/* ================= 2. MASK (above subject — covers figure on scroll) ================= */}
        <div className="hero-mask-layer absolute inset-0 z-[8] pointer-events-none overflow-hidden hidden lg:block">
          <div
            className="mask-wrapper absolute -translate-x-1/2"
            style={{
              left: MASK_ANCHOR.left,
              bottom: MASK_ANCHOR.bottom,
              width: MASK_ANCHOR.width,
              height: MASK_ANCHOR.height,
              willChange: "transform",
            }}
          >
            <div
              className="mask-expander absolute inset-0 pointer-events-none rounded-[40%_40%_36%_36%]"
              style={{
                backgroundColor: SURFACE_LIGHT,
                transformOrigin: "50% 88%",
                willChange: "transform",
                transform: "scale(0)",
              }}
            />
          </div>
        </div>

        {/* ================= 3. HERO TEXT ================= */}
        <div className="hero-text-cluster relative lg:absolute lg:inset-0 z-20 flex flex-col justify-center pt-[12vh] pb-[6vh] lg:pt-[14vh] lg:pb-[22vh] px-6 lg:pl-[clamp(1.25rem,7vw,6rem)] lg:pr-[clamp(1.25rem,4vw,3rem)] pointer-events-none w-full">
          <div className="max-w-[34rem] text-left pointer-events-auto">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 backdrop-blur-sm">
              <svg
                className="h-3.5 w-3.5 shrink-0"
                style={{ color: ACCENT }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
              </svg>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75">
                Global Delivery. Local Commitment.
              </span>
            </div>

            <h1
              className="hero-title text-balance text-white text-[clamp(2.25rem,4.5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]"
              style={{ willChange: "transform, opacity" }}
            >
              Your Offshore Engineering Partner
              <span style={{ color: ACCENT }}>.</span>
            </h1>

            <p className="hero-sub mt-6 max-w-[32rem] text-pretty text-[clamp(0.9375rem,1.3vw,1.25rem)] font-normal leading-[1.65] text-white/75">
              Scalable teams. Microsoft experts. AI-powered solutions. Delivered
              for global impact.
            </p>

            {/* CTAs — hyper-glass effect */}
            <style
              dangerouslySetInnerHTML={{
                __html: `
              @keyframes hero-glare {
                0% { left: -100%; }
                15% { left: 200%; }
                100% { left: 200%; }
              }
              @media (prefers-reduced-motion: reduce) {
                .hero-glass-primary::after,
                .hero-glass-secondary::after { animation: none !important; }
                .hero-glass-primary:hover,
                .hero-glass-secondary:hover { transform: none !important; }
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
                background: linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.14) 50%, transparent 100%);
                transform: skewX(-20deg);
                animation: hero-glare 8s infinite ease-in-out;
                pointer-events: none;
              }
              .hero-glass-primary {
                transition: transform 220ms cubic-bezier(0.32, 0.72, 0, 1), box-shadow 220ms cubic-bezier(0.32, 0.72, 0, 1);
              }
              .hero-glass-primary:hover {
                transform: scale(1.03);
                box-shadow:
                  0 20px 50px 0 rgba(255, 88, 18, 0.45),
                  0 8px 24px 0 rgba(0, 0, 0, 0.28),
                  inset 0 1px 4px 0 rgba(255, 255, 255, 0.5),
                  inset 0 -1px 3px 0 rgba(0, 0, 0, 0.15);
              }
              .hero-glass-primary:focus-visible {
                outline: 2px solid rgba(255, 255, 255, 0.85);
                outline-offset: 3px;
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

              /* Pillar cards responsiveness & height-aware containment */
              .hero-pillar-card {
                width: 100%;
                max-width: 320px;
                aspect-ratio: 0.8;
              }

              @media (min-width: 1024px) {
                .hero-pillar-card {
                  /* Full-sized agency cards, gracefully bounded by viewport height */
                  width: clamp(260px, min(22vw, 44vh), 370px);
                  max-width: none;
                  aspect-ratio: 0.8;
                }
              }

              @media (min-width: 1024px) and (max-height: 640px) {
                .hero-pillar-card {
                  width: clamp(220px, min(21vw, 40vh), 290px);
                }
              }

              /* Pillar text cluster padding and sizing — balanced spacing to cards */
              .salary-text-cluster-wrapper {
                padding-top: clamp(4.5rem, 10.5vh, 7rem);
              }

              @media (min-width: 1024px) and (max-height: 640px) {
                .salary-text-cluster-wrapper {
                  padding-top: clamp(3.75rem, 8vh, 4.5rem);
                }
              }

              .pillar-headline {
                font-size: clamp(2rem, 3.4vw, 3.75rem);
                line-height: 1.08;
                letter-spacing: -0.03em;
              }

              @media (min-width: 1024px) and (max-height: 640px) {
                .pillar-headline {
                  font-size: clamp(1.65rem, 2.4vw, 2.5rem);
                  line-height: 1.1;
                }
              }

              .pillar-subhead {
                font-size: clamp(0.875rem, 1.05vw, 1.125rem);
                line-height: 1.6;
                margin-top: 0.875rem;
              }

              @media (min-width: 1024px) and (max-height: 640px) {
                .pillar-subhead {
                  font-size: clamp(0.8rem, 0.9vw, 0.95rem);
                  line-height: 1.45;
                  margin-top: 0.5rem;
                }
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
                className="hero-glass-primary inline-flex items-center gap-2 active:scale-[0.97] motion-reduce:transition-none"
                style={{
                  background:
                    `linear-gradient(135deg, ${ACCENT} 0%, rgba(200, 72, 16, 0.9) 100%)`,
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

        {/* ================= 4. PILLAR TEXT (light surface) ================= */}
        <div
          className="salary-text-cluster salary-text-cluster-wrapper absolute inset-0 z-20 flex flex-col items-center pointer-events-none invisible opacity-0 hidden lg:flex"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="max-w-2xl px-6 text-center pointer-events-auto">
            <h2 className="pillar-headline text-balance font-semibold text-[#0a0a1a]">
              Three pillars. <span style={{ color: ACCENT }}>One engineering team.</span>
            </h2>
            <p className="pillar-subhead mx-auto text-pretty text-[#0a0a1a]/65">
              From Microsoft solutions to intelligent AI systems and modern engineering, we help businesses{" "}
              <strong className="font-bold text-[#0a0a1a]">build, automate, modernize, and scale.</strong>
            </p>
          </div>
        </div>

        {/* ================= 5. VISUAL CLUSTER (cards & frame) ================= */}
        <div className="relative lg:absolute lg:inset-x-0 lg:bottom-0 z-30 flex flex-col lg:flex-row items-center lg:items-end justify-center gap-6 lg:gap-0 px-6 pb-16 lg:pb-0 w-full pointer-events-none">
          {/* Mobile / Tablet Pillar Heading (Visible < 1024px) */}
          <div className="lg:hidden w-full max-w-xl text-center px-2 pt-8 pb-4 pointer-events-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-white">
              Three pillars. <span style={{ color: ACCENT }}>One engineering team.</span>
            </h2>
            <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-white/70">
              From Microsoft solutions to intelligent AI systems and modern engineering, we help businesses{" "}
              <strong className="font-semibold text-white">build, automate, modernize, and scale.</strong>
            </p>
          </div>

          {/* Left Card — MICROSOFT & DATA */}
          <div
            className="left-card hero-pillar-card relative lg:absolute rounded-2xl overflow-hidden z-[2] order-1 lg:order-none pointer-events-auto"
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
              alt="Microsoft & Data"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-5 flex flex-col">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>
                Microsoft & Data
              </p>
              <p className="mt-1.5 text-base font-semibold leading-snug text-white">
                Cloud, analytics, and enterprise solutions that empower business
              </p>
              <Link
                href="/services/offshore-power-platform-development"
                className="mt-3 inline-flex items-center gap-1.5 self-start rounded-full bg-white px-4 py-2 text-xs font-semibold text-zinc-900 shadow-sm transition-[transform,background-color] duration-200 ease-out hover:bg-white/90 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white pointer-events-auto"
              >
                Explore Microsoft solutions <span className="text-[10px]">→</span>
              </Link>
            </div>
          </div>

          {/* Center Card (The Frame!) — AI & AUTOMATION */}
          <div
            className="center-card hero-pillar-card relative origin-bottom z-[3] rounded-2xl order-2 lg:order-none pointer-events-auto"
            style={{ willChange: "transform" }}
          >
            {/* Card inner — reference.png */}
            <div
              className="card-inner-bg absolute inset-0 rounded-2xl overflow-hidden bg-[#1a2a3a] opacity-100 lg:opacity-0"
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
              className="frame-border absolute inset-0 z-[4] rounded-2xl pointer-events-none"
              style={{
                border: "4px solid white",
                boxShadow:
                  "0 25px 50px rgba(0,0,0,0.18), 0 10px 20px rgba(0,0,0,0.1)",
              }}
            />

            {/* Card UI */}
            <div
              className="card-ui absolute inset-x-0 bottom-0 z-[4] opacity-100 lg:opacity-0 pointer-events-none"
              style={{ willChange: "opacity" }}
            >
              <div className="bg-gradient-to-t from-black/70 via-black/15 to-transparent rounded-b-2xl p-5 flex flex-col">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>
                  AI & Automation
                </p>
                <p className="mt-1.5 text-base font-semibold leading-snug text-white">
                  AI systems that streamline operations
                </p>
                <Link
                  href="/services/ai-development-services"
                  className="mt-3 inline-flex items-center gap-1.5 self-start rounded-full bg-white px-4 py-2 text-xs font-semibold text-zinc-900 shadow-sm transition-[transform,background-color] duration-200 ease-out hover:bg-white/90 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white pointer-events-auto"
                >
                  Explore AI solutions <span className="text-[10px]">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Card — MODERN ENGINEERING */}
          <div
            className="right-card hero-pillar-card relative lg:absolute rounded-2xl overflow-hidden z-[2] order-3 lg:order-none pointer-events-auto"
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
              alt="Modern Engineering"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-5 flex flex-col">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>
                Modern Engineering
              </p>
              <p className="mt-1.5 text-base font-semibold leading-snug text-white">
                Modern applications built for scale and performance
              </p>
              <Link
                href="/services/offshore-web-app-development"
                className="mt-3 inline-flex items-center gap-1.5 self-start rounded-full bg-white px-4 py-2 text-xs font-semibold text-zinc-900 shadow-sm transition-[transform,background-color] duration-200 ease-out hover:bg-white/90 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white pointer-events-auto"
              >
                Explore engineering <span className="text-[10px]">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TransferredSoftreeHero;
