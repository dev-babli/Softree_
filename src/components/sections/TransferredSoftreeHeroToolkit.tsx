"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { COUNTRIES_SERVED } from "@/lib/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import StaggeredReveal from "@/components/homepage-light/StaggeredReveal";
import AnimatedRadialCarousel from "@/components/homepage-light/AnimatedRadialCarousel";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ──────────────────────────── Assets ──────────────────────────── */
const ASSET_BG = "/hero/hero_BG.png";
const ASSET_SUBJECT = "/hero/hero_subject_wide.png";
const ASSET_REF = "/hero/reference.png";

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

/* Cinematic easings — tuned for buttery continuous motion.
 *   SMOOTH   : sine-like, for continuous movement (no start/stop feel)
 *   EXPO_OUT : luxurious decelerated arrival
 *   IMPLODE  : sharp gravity-like pull-in for collapse
 *   GENTLE   : material-style for BG/opacity crossfades
 */
const EASE_SMOOTH = "cubic-bezier(0.65, 0, 0.35, 1)";
const EASE_EXPO_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";
const EASE_IMPLODE = "cubic-bezier(0.7, 0, 0.84, 0)";
const EASE_GENTLE = "cubic-bezier(0.4, 0, 0.2, 1)";

/**
 * TransferredSoftreeHeroToolkit — CINEMATIC VERSION
 *
 * Story beats (on scroll, pinned section):
 *   1. Hero holds (BG, VR subject, "Build. Ship. Scale.", framed center card).
 *   2. Hero text dissolves upward. BG + subject crossfade to white.
 *   3. Mask expander floods light outward.
 *   4. Center card INHALES (scales up slightly) → COLLAPSES into a pulse of light.
 *   5. Radial white pulse expands outward from the card's position (portal opens).
 *   6. Carousel ring MANIFESTS from the pulse: scale 0.85→1, blur 20→0, opacity 0→1.
 *   7. Cards LIGHT UP in stagger (angle-sorted from top). First card = the hero card.
 *   8. Title "AI Scale ✦ Built to Last" reveals. Description pills fade in.
 *   9. Ring begins slow continuous rotation (120s/rev, linear).
 */
export function TransferredSoftreeHeroToolkit() {
  const containerRef = useRef<HTMLElement>(null);
  const [carouselActive, setCarouselActive] = useState(false);
  const carouselActiveRef = useRef(false);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const q = gsap.utils.selector(containerRef);

      /* ── Entrance (on mount) ── */
      gsap.fromTo(
        q(".hero-title"),
        { opacity: 0, y: 60, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: "expo.out" },
      );
      gsap.fromTo(
        q(".hero-p"),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: "expo.out", delay: 0.15 },
      );
      gsap.fromTo(
        q(".hero-btn"),
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.0,
          ease: "expo.out",
          delay: 0.3,
        },
      );

      /* ── Scroll-driven scene — scrub ties animation directly to scroll for buttery smoothness ── */
      const tl = gsap.timeline();

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top+=1 top",
        end: "+=200%" /* longer scroll distance = smoother, more gradual transitions */,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        animation: tl,
        scrub: 1.5 /* 1.5-second smooth catchup for silky interpolation */,
        onUpdate: (self) => {
          /* Use ref to avoid stale closure */
          if (self.progress > 0.55 && !carouselActiveRef.current) {
            carouselActiveRef.current = true;
            setCarouselActive(true);
          } else if (self.progress <= 0.55 && carouselActiveRef.current) {
            carouselActiveRef.current = false;
            setCarouselActive(false);
          }
        },
      });

      tl.addLabel("burst", 0);

      /* ═══════════════════════════════════════════════════════════════════
       * GPU-optimised: prefer transform/opacity over box-shadow/filter.
       * force3D promotes elements to GPU compositor layers.
       * ═══════════════════════════════════════════════════════════════════ */

      /* ── ACT 1: Hero text dissolves ── */
      tl.fromTo(
        q(".hero-title"),
        { opacity: 1, y: 0, scale: 1 },
        { opacity: 0, y: -40, force3D: true, duration: 0.7, ease: EASE_SMOOTH },
        "burst",
      );
      tl.fromTo(
        q(".hero-p"),
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -28,
          force3D: true,
          duration: 0.65,
          ease: EASE_SMOOTH,
        },
        "burst+=0.05",
      );
      tl.fromTo(
        q(".hero-btn"),
        { opacity: 1, y: 0, scale: 1 },
        {
          opacity: 0,
          y: -20,
          scale: 0.96,
          force3D: true,
          duration: 0.55,
          ease: EASE_SMOOTH,
        },
        "burst+=0.1",
      );
      tl.fromTo(
        q(".hero-stats"),
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -20,
          duration: 0.55,
          ease: EASE_SMOOTH,
          force3D: true,
        },
        "burst+=0.12",
      );

      /* ── ACT 2: World crossfade ── */
      tl.to(
        q(".global-bg"),
        { opacity: 0, duration: 1.05, ease: EASE_GENTLE },
        "burst+=0.1",
      );
      tl.to(
        q(".global-subject"),
        { opacity: 0, duration: 1.05, ease: EASE_GENTLE },
        "burst+=0.1",
      );
      tl.fromTo(
        q(".card-inner-bg"),
        { opacity: 0 },
        { opacity: 1, duration: 1.05, ease: EASE_GENTLE },
        "burst+=0.1",
      );

      /* ── ACT 3: Mask flood — circle expands from center ── */
      tl.fromTo(
        q(".mask-flood"),
        { scale: 0 },
        { scale: 3, duration: 1.1, ease: EASE_EXPO_OUT, force3D: true },
        "burst+=0.2",
      );

      /* ── ACT 4: Card INHALE → IMPLODE ── */
      tl.to(
        q(".center-card"),
        { scale: 1.08, duration: 0.45, ease: EASE_SMOOTH, force3D: true },
        "burst+=0.9",
      );
      tl.to(
        q(".center-card"),
        {
          scale: 0.15,
          opacity: 0,
          y: -30,
          duration: 0.6,
          ease: EASE_IMPLODE,
          force3D: true,
        },
        "burst+=1.3",
      );

      /* ── ACT 5: Portal pulse ── */
      tl.fromTo(
        q(".portal-pulse"),
        { opacity: 0, scale: 0.3 },
        {
          opacity: 1,
          scale: 1.6,
          duration: 0.5,
          ease: EASE_EXPO_OUT,
          force3D: true,
        },
        "burst+=1.25",
      );
      tl.to(
        q(".portal-pulse"),
        {
          opacity: 0,
          scale: 2.6,
          duration: 0.75,
          ease: EASE_SMOOTH,
          force3D: true,
        },
        "burst+=1.55",
      );

      /* ── ACT 6: Carousel manifests — reduced blur for performance ── */
      tl.fromTo(
        q(".toolkit-carousel"),
        { opacity: 0, scale: 0.86 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: EASE_EXPO_OUT,
          force3D: true,
        },
        "burst+=1.4",
      );

      /* ── ACT 7: Headline + description reveal ── */
      tl.fromTo(
        q(".toolkit-headline"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          ease: EASE_EXPO_OUT,
          force3D: true,
        },
        "burst+=1.9",
      );
      tl.fromTo(
        q(".toolkit-description"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: EASE_EXPO_OUT, force3D: true },
        "burst+=2.15",
      );
    },
    { scope: containerRef },
  );

  return (
    <>
      <section
        ref={containerRef as React.RefObject<HTMLElement>}
        className="relative h-screen w-full shrink-0 overflow-hidden"
      >
        <div className="sticky top-0 flex h-screen w-full flex-col items-center overflow-hidden bg-gradient-to-b from-black via-[#020d1a] to-black">
          {/* ═══════════════ 1. GLOBAL BG + SUBJECT ═══════════════ */}
          <div className="global-bg absolute inset-0 z-0 bg-[#1a2a3a]">
            <Image
              src={ASSET_BG}
              alt="Office background"
              fill
              priority
              className="origin-bottom object-cover"
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

          {/* Subtle dot grid on light bg — adds premium texture after mask burst */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1] opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* ═══════════════ 2. MASK FLOOD (circle expands from center — GPU-composited) ═══════════════ */}
          <div
            className="mask-flood pointer-events-none absolute z-10"
            style={{
              width: "100vmax",
              height: "100vmax",
              borderRadius: "50%",
              top: "50%",
              left: "50%",
              background: "#020d1a",
              transform: "translate(-50%, -50%) scale(0)",
              willChange: "transform",
            }}
          />

          {/* ═══════════════ 3. PORTAL PULSE (emerges from card position) ═══════════════ */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-center">
            <div className={`relative ${CARD_SIZE} origin-bottom`}>
              <div
                className="portal-pulse absolute inset-0 rounded-full opacity-0"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(108,66,245,0.4) 30%, rgba(24,82,255,0.15) 55%, transparent 75%)",
                  filter: "blur(12px)",
                }}
              />
            </div>
          </div>

          {/* ═══════════════ 4. CENTER CARD (hero frame — collapses into pulse) ═══════════════ */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[35] flex items-end justify-center">
            <div
              className={`center-card relative ${CARD_SIZE} origin-bottom`}
              style={{ willChange: "transform, opacity" }}
            >
              <div className="card-inner-bg absolute inset-0 overflow-hidden rounded-xl bg-gradient-to-b from-black via-[#020d1a] to-black opacity-0">
                <Image
                  src={ASSET_REF}
                  alt="Softree VR Expert"
                  fill
                  priority
                  className="object-cover"
                />
                {/* Subtle gradient on card for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              {/* Frame border */}
              <div
                className="pointer-events-none absolute inset-0 rounded-xl"
                style={{
                  border: "4px solid white",
                  boxShadow:
                    "0 25px 50px rgba(0,0,0,0.18), 0 10px 20px rgba(0,0,0,0.1), 0 0 80px rgba(108,66,245,0.08)",
                }}
              />
              {/* Label — fades in with the inner image so the card reads as empty frame first */}
              <div className="card-inner-bg absolute inset-x-0 bottom-0 z-[2] rounded-b-xl bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 opacity-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                  Microsoft
                </p>
                <p className="mt-1.5 text-base font-bold leading-tight text-white">
                  Enterprise solutions
                </p>
              </div>
            </div>
          </div>

          {/* ═══════════════ 5. HERO TEXT ═══════════════ */}
          <div
            className="hero-text-cluster absolute inset-0 z-[45] flex flex-col justify-center"
            style={{
              paddingLeft: "12vw",
              paddingRight: "4vw",
              paddingTop: "12vh",
              paddingBottom: "20vh",
            }}
          >
            <div className="pointer-events-auto relative z-50 w-full max-w-[520px] text-left">
              <h1 className="hero-title text-[clamp(36px,5.8vw,104px)] font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:whitespace-nowrap">
                Build. Ship. Scale.
              </h1>

              <p className="hero-p mt-6 max-w-[500px] text-[15px] font-normal leading-[1.7] text-white/75">
                Simplify your enterprise tech. Our senior engineers ship
                production-grade AI, web, and Microsoft solutions — fast.
              </p>

              <div className="hero-btn mt-8">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white px-8 py-4 text-sm font-semibold text-black shadow-[0_10px_40px_rgba(255,255,255,0.15)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(255,255,255,0.25)]"
                >
                  {/* Glow Background */}
                  <span className="absolute inset-0 bg-gradient-to-r from-white via-[#f5f5f5] to-white opacity-100 transition-all duration-500 group-hover:scale-110" />

                  {/* Animated Shine */}
                  <span className="absolute -left-[120%] top-0 h-full w-[120%] rotate-12 bg-white/40 blur-2xl transition-all duration-700 group-hover:left-[120%]" />

                  {/* Content */}
                  <span className="relative z-10 flex items-center gap-3">
                    <span className="tracking-[-0.01em]">
                      Get Started For Free
                    </span>

                    {/* Arrow Icon */}
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-all duration-500 group-hover:translate-x-1 group-hover:scale-110">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-500 group-hover:rotate-45"
                      >
                        <path d="M7 17L17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </span>
                  </span>
                </Link>
              </div>
              {/* STATS */}
              <div className="hero-stats mt-10 flex items-center gap-3">
                <div className="flex -space-x-2">
                  <span
                    className="h-8 w-8 rounded-full border-2 border-white bg-cover bg-center"
                    style={{
                      backgroundImage: "url(https://i.pravatar.cc/64?img=14)",
                    }}
                    aria-hidden
                  />

                  <span
                    className="h-8 w-8 rounded-full border-2 border-white bg-cover bg-center"
                    style={{
                      backgroundImage: "url(https://i.pravatar.cc/64?img=32)",
                    }}
                    aria-hidden
                  />

                  <span
                    className="h-8 w-8 rounded-full border-2 border-white bg-cover bg-center"
                    style={{
                      backgroundImage: "url(https://i.pravatar.cc/64?img=47)",
                    }}
                    aria-hidden
                  />
                </div>

                <div className="flex flex-col">
                  <span className="text-[26px] font-semibold leading-none tracking-[-0.02em] text-white">
                    2.3M+
                  </span>

                  <span className="mt-1 text-[11px] leading-[1.4] text-white/60">
                    Trusted by millions across {COUNTRIES_SERVED} countries
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════ 6. TOOLKIT CONTENT (reveals after burst) ═══════════════ */}
          {/* Top padding clears the fixed LightNavPro (~64-80px) on all viewports */}
          <div className="pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-start px-4 pt-24 sm:pt-28 md:pt-28 lg:pt-24">
            {/* Headline — AI Scale ✦ Built to Last */}
            <div
              className="toolkit-headline z-10 mb-3 flex w-full flex-wrap items-center justify-center gap-3 sm:gap-5 md:gap-7"
              style={{ opacity: 0 }}
            >
              <StaggeredReveal
                text="Move Fast"
                className="text-[44px] sm:text-[70px] md:text-[90px] lg:text-[110px] font-bold tracking-[-0.04em] text-white leading-none"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                className="shrink-0 text-[#6C42F5]"
              >
                <svg
                  width="90"
                  height="90"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-[40px] w-[40px] sm:h-[58px] sm:w-[58px] md:h-[76px] md:w-[76px]"
                >
                  <path
                    d="M12 0L14.2 9.8L24 12L14.2 14.2L12 24L9.8 14.2L0 12L9.8 9.8L12 0Z"
                    fill="currentColor"
                  />
                </svg>
              </motion.div>
              <StaggeredReveal
                text="Stay Enterprise"
                className="text-[44px] sm:text-[70px] md:text-[90px] lg:text-[110px] font-bold tracking-[-0.04em] text-white leading-none"
              />
            </div>

            {/* Description with pills */}
            <div
              className="toolkit-description pointer-events-auto z-10 mx-auto mb-4 max-w-3xl text-center"
              style={{ opacity: 0 }}
            >
              <p className="text-[14px] font-normal leading-[2.6] tracking-tight sm:text-[16px] md:text-[18px] text-white/80">
                An engineering team powered by{" "}
                <span className="mx-1 inline-flex -translate-y-[2px] items-center justify-center rounded-md bg-white/10 px-3 py-0.5 text-white">
                  <span className="text-[14px] font-medium tracking-tight">
                    AI Agents
                  </span>
                </span>{" "}
                &{" "}
                <span className="mx-1 inline-flex -translate-y-[2px] items-center justify-center rounded-md bg-white/10 px-3 py-0.5 text-white">
                  <span className="text-[14px] font-medium tracking-tight">
                    Microsoft
                  </span>
                </span>{" "}
                specialists, shipping{" "}
                <span className="mx-1 inline-flex -translate-y-[2px] items-center justify-center rounded-md bg-white/10 px-3 py-0.5 text-white">
                  <span className="text-[14px] font-medium tracking-tight">
                    enterprise
                  </span>
                </span>{" "}
                solutions with{" "}
                <span className="mx-1 mt-2 inline-flex -translate-y-[2px] items-center justify-center rounded-md bg-white/10 px-3 py-0.5 text-white">
                  <span className="text-[14px] font-medium tracking-tight">
                    production-grade
                  </span>
                </span>{" "}
                UX.
              </p>
            </div>

            {/* Carousel — responsive scale: 0.55 mobile / 0.65 tablet / 0.75 desktop */}
            <div
              className="toolkit-carousel pointer-events-auto flex w-full origin-top scale-[0.55] items-center justify-center sm:scale-[0.65] lg:scale-[0.75]"
              style={{ opacity: 0 }}
            >
              <AnimatedRadialCarousel active={carouselActive} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TransferredSoftreeHeroToolkit;
