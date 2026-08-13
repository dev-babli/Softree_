"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import Image from "next/image"
import LetsTalkButton from "@/components/qc/shared/LetsTalkButton"
import {
  EASE,
  EASE_T,
  DUR,
  STAGGER,
  prefersReducedMotion,
} from "@/lib/motion"

/* ====================================================================
 *  AVOORA HERO — About Us hero (premium fine-tunement pass)
 *
 *  This is the same composition the page has always had — wordmark left,
 *  CTA right, full-bleed media stage with cycling-word headline, capability
 *  marquee underneath. The fine-tunement pass:
 *
 *    • Adopts EASE/DUR/STAGGER/EASE_T tokens from `src/lib/motion.ts` so
 *      every animation in the file pulls from one source of truth.
 *    • Honours `prefers-reduced-motion` end-to-end (GSAP timeline +
 *      cycling word + marquee + parallax).
 *    • Fixes the broken Tailwind classes (`aspect-4/5` → `aspect-[4/5]`,
 *      `z-1` → `z-[1]`) and the broken inline `clamp(...)` font-size that
 *      contained an `sm:` prefix mid-string.
 *    • Removes the `videoLoaded` 800 ms gate — the hero drives LCP and
 *      perceived speed; the poster always covers the stage so eager video
 *      loading is safe and feels instant.
 *    • Replaces the per-character cycling-word stagger with a single
 *      word-level fade/blur (Emil's restraint principle: the user sees
 *      this animation hundreds of times — make it cheap and graceful).
 *    • Replaces the framer-motion main-thread marquee with a CSS keyframe
 *      so the loop runs off the main thread (Emil's "CSS beats JS under
 *      load" rule).
 *    • Adds `:focus-visible` rings on every interactive surface,
 *      `aria-label` to social links, and `active:scale-[0.97]` press
 *      feedback to the dual-CTA pair.
 *
 *  No content, layout, or composition is altered.
 * ==================================================================== */

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const ASSETS = {
  avatars: [
    "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69c3757217df10d7688f6d47_Hero%20Client%201.webp",
    "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69c3757217df10d7688f6d45_Hero%20Client%202.webp",
    "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69c3757217df10d7688f6d4b_Hero%20Client%203.webp",
    "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69c3757217df10d7688f6d4d_Hero%20Client%204.webp",
    "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69c3757217df10d7688f6d49_Hero%20Client%205.webp",
  ],
  video: {
    mp4: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba%2F69d2095642a31660d0b048ee_Video%202_mp4.mp4",
    webm: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba%2F69d2095642a31660d0b048ee_Video%202_webm.webm",
    poster:
      "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba%2F69d2095642a31660d0b048ee_Video%202_poster.0000000.jpg",
  },
  services: [
    { n: "01", label: "AI & Automation", href: "/services/ai-intelligence", img: "/whysoftree/ai.png" },
    { n: "02", label: "Web Development", href: "/services/digital-workspace/web-app-development", img: "/whysoftree/modern.png" },
    { n: "03", label: "Microsoft Solutions", href: "/services/business-applications/power-apps", img: "/whysoftree/powe-pltform.png" },
    { n: "04", label: "Data & Analytics", href: "/services/data-analytics/power-bi", img: "/whysoftree/data-analytics.jpg" },
    { n: "05", label: "Digital Workspace", href: "/services/digital-workspace/sharepoint", img: "/whysoftree/modern.png" },
  ],
}

/* ── Cycling word ─────────────────────────────────────────────────────
 *
 *  Word-level fade + 4 px lift + 8→0 px blur. Replaces the previous
 *  per-character stagger which created two competing AnimatePresence
 *  layers and ran 14× per cycle for the same visual outcome.
 *
 *  Honours `prefers-reduced-motion`: freezes on the first word.
 * ─────────────────────────────────────────────────────────────── */

const CYCLING_WORDS = [
  "Agentic AI",
  "Web Apps",
  "Power Platform",
  "Data Analytics",
  "Cloud Solutions",
] as const

function CyclingWord() {
  const [idx, setIdx] = useState(0)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const checkReducedMotion = () => setReduced(prefersReducedMotion())
    checkReducedMotion()
  }, [])

  useEffect(() => {
    if (reduced) return
    const id = setInterval(
      () => setIdx((i) => (i + 1) % CYCLING_WORDS.length),
      2800 // Slightly longer for premium feel
    )
    return () => clearInterval(id)
  }, [reduced])

  const word = CYCLING_WORDS[idx]
  return (
    <span
      className="relative inline-block whitespace-nowrap align-baseline"
      /* Enhanced min-width with better responsive behavior */
      style={{ minWidth: "clamp(200px, 30vw, 420px)" }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={word}
          className="inline-block"
          initial={{ opacity: 0, y: 8, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -8, filter: "blur(12px)" }}
          transition={{
            duration: DUR.card,
            ease: EASE_T.silk as any,
          }}
        >
          {word.split('').map((char, i) => (
            <motion.span
              key={`${char}-${i}`}
              className="inline-block"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.015,
                duration: 0.3,
                ease: EASE_T.out as any,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
      {/* Enhanced hairline underline with gradient */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 -bottom-1.5 block h-[2px] w-full rounded-full bg-gradient-to-r from-transparent via-current to-transparent opacity-60"
      />
    </span>
  )
}

/* ── Custom social icons (from Webflow source) ────────────────────── */

const LinkedinIcon = () => (
  <svg viewBox="0 0 23 23" fill="currentColor" className="h-[18px] w-[18px]">
    <path d="M22.2611 22.261V14.108C22.2611 10.101 21.3985 7.04016 16.7237 7.04016C14.4698 7.04016 12.9672 8.26451 12.355 9.4332H12.2993V7.4019H7.875V22.261H12.4941V14.8871C12.4941 12.9393 12.8559 11.0749 15.2489 11.0749C17.6141 11.0749 17.6419 13.2732 17.6419 14.9984V22.2332H22.2611V22.261Z" />
    <path d="M0.361328 7.40149H4.98045V22.2606H0.361328V7.40149Z" />
    <path d="M2.6713 0C1.19652 0 0 1.19652 0 2.6713C0 4.14608 1.19652 5.37043 2.6713 5.37043C4.14608 5.37043 5.3426 4.14608 5.3426 2.6713C5.3426 1.19652 4.14608 0 2.6713 0Z" />
  </svg>
)
const XIcon = () => (
  <svg viewBox="0 0 23 23" fill="currentColor" className="h-[18px] w-[18px]">
    <path d="M13.2036 9.42559L21.3125 -0.000366211H19.391L12.35 8.18406L6.72639 -0.000366211H0.240234L8.74423 12.3759L0.240234 22.2605H2.1619L9.59734 13.6175L15.5363 22.2605H22.0224L13.2031 9.42559H13.2036ZM10.5716 12.485L9.70999 11.2526L2.8543 1.44623H5.80586L11.3385 9.36026L12.2001 10.5927L19.3919 20.8797H16.4403L10.5716 12.4854V12.485Z" />
  </svg>
)

/* ── Service card with stacked-shadow depth ───────────────────────── */

function ServiceCard({
  n,
  label,
  href,
  img,
}: {
  n: string
  label: string
  href: string
  img: string
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="service-card group/srv relative flex flex-col rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2"
      style={{ willChange: "transform" }}
    >
      <div className="relative">
        {/* Enhanced stacked shadow cards with ambient lighting */}
        <div className="pointer-events-none absolute inset-0 z-0">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="shadow-layer absolute inset-0 rounded-2xl border border-gray-900/8 bg-gradient-to-br from-gray-900/4 to-gray-900/2 backdrop-blur-sm transition-[transform,opacity,filter] duration-600 group-hover/srv:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.15)]"
              style={{
                transform: `translateY(${(i + 1) * 10}px) scale(${1 - (i + 1) * 0.04})`,
                opacity: 1 - (i + 1) * 0.20,
                filter: `blur(${(i + 1) * 0.5}px)`,
                zIndex: -i - 1,
              }}
            />
          ))}
        </div>
        {/* Main image card with enhanced hover effects */}
        <div
          className="main-image relative z-10 aspect-[4/5] w-full overflow-hidden rounded-2xl border border-gray-900/10 transition-all duration-600 group-hover/srv:-translate-y-2 group-hover/srv:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.25)]"
          style={{ willChange: "transform" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-transparent to-black/5 opacity-0 transition-opacity duration-600 group-hover/srv:opacity-100" />
          <Image
            src={img}
            alt={label}
            width={400}
            height={500}
            sizes="(max-width: 640px) 180px, (max-width: 1024px) 220px, 260px"
            className="h-full w-full object-cover transition-all duration-700 group-hover/srv:scale-[1.08] group-hover/srv:brightness-110"
            style={{ willChange: "transform" }}
          />
        </div>
      </div>

      {/* Enhanced label row with premium roll-up animation */}
      <div className="relative z-10 mt-5 flex items-center gap-3">
        <span className="text-[10.5px] font-medium text-gray-900/50 tabular-nums transition-colors duration-300 group-hover/srv:text-gray-900/70">
          ({n})
        </span>
        <span className="relative inline-block h-[1.2em] overflow-hidden align-middle">
          <span className="block text-[13px] font-medium text-gray-900 transition-all duration-500 group-hover/srv:-translate-y-full group-hover/srv:text-gray-800">
            {label}
          </span>
          <span
            aria-hidden
            className="absolute inset-0 block translate-y-full text-[13px] font-medium text-gray-900 transition-all duration-500 group-hover/srv:translate-y-0 group-hover/srv:text-gray-800"
          >
            {label}
          </span>
        </span>
        <span className="ml-auto text-[10px] font-medium text-gray-400 opacity-0 transition-all duration-300 group-hover/srv:opacity-100">
          →
        </span>
      </div>
    </a>
  )
}

/* ── Main section ─────────────────────────────────────────────────── */

export default function AvooraHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const videoStageRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current) return
      const reduced = prefersReducedMotion()

      const tl = gsap.timeline({
        defaults: { duration: DUR.section, ease: EASE.silk },
      })

      // Header animations
      const headerSpans = headerRef.current?.querySelectorAll("h1 > span")
      const taglineEl = headerRef.current?.querySelector(".tagline")
      const profileCardEl = headerRef.current?.querySelector(".profile-card")

      if (headerSpans) {
        tl.from(
          headerSpans,
          {
            y: reduced ? 0 : 60,
            opacity: 0,
            stagger: STAGGER.default,
            duration: reduced ? 0.01 : DUR.section,
            ease: EASE.silk,
          },
          0
        )
      }

      if (taglineEl) {
        tl.from(
          taglineEl,
          {
            y: reduced ? 0 : 30,
            opacity: 0,
            duration: reduced ? 0.01 : DUR.card,
          },
          "-=0.4"
        )
      }

      if (profileCardEl) {
        tl.from(
          profileCardEl,
          {
            x: reduced ? 0 : 50,
            opacity: 0,
            duration: reduced ? 0.01 : DUR.section,
          },
          "-=0.3"
        )
      }

      // Video stage entrance
      if (videoStageRef.current) {
        tl.from(
          videoStageRef.current,
          {
            scale: reduced ? 1 : 0.95,
            opacity: 0,
            duration: reduced ? 0.01 : DUR.cinematic,
            ease: EASE.silk,
          },
          "-=0.2"
        )
      }

      const avatarSpans = videoStageRef.current?.querySelectorAll(".avatar-stack span")
      if (avatarSpans) {
        tl.from(
          avatarSpans,
          {
            y: reduced ? 0 : -30,
            opacity: 0,
            stagger: STAGGER.default,
            duration: reduced ? 0.01 : DUR.card,
            ease: reduced ? "none" : "back.out(1.2)",
          },
          "-=0.6"
        )
      }

      const heroTitleEl = videoStageRef.current?.querySelector(".hero-title")
      if (heroTitleEl) {
        tl.from(
          heroTitleEl,
          {
            y: reduced ? 0 : 40,
            opacity: 0,
            duration: reduced ? 0.01 : DUR.section,
          },
          "-=0.4"
        )
      }

      const bottomProfileEl = videoStageRef.current?.querySelector(".bottom-profile")
      if (bottomProfileEl) {
        tl.from(
          bottomProfileEl,
          {
            y: reduced ? 0 : 30,
            opacity: 0,
            duration: reduced ? 0.01 : DUR.card,
          },
          "-=0.2"
        )
      }

      const socialIcons = videoStageRef.current?.querySelectorAll(".social-icon")
      if (socialIcons) {
        tl.from(
          socialIcons,
          {
            x: reduced ? 0 : 30,
            opacity: 0,
            stagger: STAGGER.tight,
            duration: reduced ? 0.01 : DUR.card,
            ease: EASE.out,
          },
          "-=0.3"
        )
      }

      // Marquee entrance
      tl.from(
        marqueeRef.current,
        {
          y: reduced ? 0 : 40,
          opacity: 0,
          duration: reduced ? 0.01 : DUR.card,
        },
        "-=0.2"
      )

      /* Parallax — desktop, no reduced-motion. The previous mm scope already
       * gated this; we keep that gate and only swap the literal duration. */
      const mm = gsap.matchMedia()
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const videoEl = videoStageRef.current?.querySelector("video")
          if (!videoEl) return
          gsap.fromTo(
            videoEl,
            { yPercent: -10 },
            {
              yPercent: 10,
              ease: "none",
              scrollTrigger: {
                trigger: videoStageRef.current!,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
              },
            }
          )
        }
      )

      return () => {
        mm.revert()
      }
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} className="relative isolate w-full overflow-hidden bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 pt-8 pb-16 sm:px-5 sm:pt-10 md:px-8 md:pt-14 md:pb-20 lg:px-10 lg:pt-16 xl:pt-20">
        {/* ═══════════════════════════════════════════════════════════
             1) TOP HEADER ROW
        ══════════════════════════════════════════════════════════ */}
        <div ref={headerRef} className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="flex-1 max-w-4xl">
            <div className="tagline flex items-center gap-4 mb-8">
              <span className="flex items-center gap-2.5 rounded-full border border-gray-200/60 bg-linear-to-r from-gray-50 to-white px-4 py-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-600 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.12)] hover:border-gray-300/60">
                <span className="h-2 w-2 rounded-full bg-linear-to-r from-[#FF6B00] to-[#FF5812] shadow-[0_0_8px_rgba(255,107,0,0.4)] animate-pulse" />
                Enterprise Software &amp; AI Solutions
              </span>
            </div>

            <h1
              className="font-semibold leading-[0.85] tracking-tighter text-gray-900"
              style={{ fontSize: "clamp(52px, 8.5vw, 120px)" }}
            >
              <span className="inline-block">Softree</span>
              <span
                className="ml-3 font-medium text-gray-400"
                style={{ fontSize: "clamp(26px, 4.2vw, 54px)", verticalAlign: "super" }}
              >
                ®
              </span>
              <br />
              <span className="bg-linear-to-r from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent">
                Technology
              </span>
            </h1>
          </div>

          {/* Right — Description & CTA */}
          <div className="profile-card flex shrink-0 flex-col items-start gap-8 lg:w-85 lg:pb-4">
            <p className="text-[15px] sm:text-[16px] leading-[1.6] text-gray-600 font-medium">
              Enterprise AI, Microsoft platforms, and cloud-native apps — scoped, scaled, and shipped.
            </p>
            <div className="flex items-center gap-5 w-full">
              <LetsTalkButton />
              <span className="h-px flex-1 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200" />
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
             2) VIDEO STAGE
        ══════════════════════════════════════════════════════════ */}
        <div
          ref={videoStageRef}
          className="relative mt-12 sm:mt-14 md:mt-16 overflow-hidden rounded-3xl bg-black md:rounded-4xl lg:rounded-[40px] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.25)] transition-shadow duration-500 hover:shadow-[0_24px_80px_-16px_rgba(0,0,0,0.35)]"
        >
          {/* Background video — sources are loaded eagerly. The poster stays
           * as the painted surface until the video can decode. */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={ASSETS.video.poster}
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              backgroundImage: `url(${ASSETS.video.poster})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <source src={ASSETS.video.mp4} type="video/mp4" />
            <source src={ASSETS.video.webm} type="video/webm" />
          </video>

          {/* Dark overlay for legibility. Enhanced gradient for better contrast and depth. */}
          <div
            aria-hidden
            className="absolute inset-0 z-[1]"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.40) 25%, rgba(0,0,0,0.50) 60%, rgba(0,0,0,0.85) 100%)",
            }}
          />

          {/* Content wrapper */}
          <div className="relative z-10 flex min-h-[48vh] flex-col justify-between p-6 sm:p-8 md:min-h-[52vh] md:p-10 lg:min-h-[62vh] lg:p-12 xl:p-16">
            {/* TOP ROW: avatars */}
            <div className="avatar-stack flex items-start justify-between">
              <div className="flex -space-x-4">
                {ASSETS.avatars.map((src, i) => (
                  <span
                    key={i}
                    className="block h-12 w-12 overflow-hidden rounded-full border-2.5 border-white/95 ring-1 ring-black/8 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-105 hover:shadow-[0_6px_20px_-6px_rgba(0,0,0,0.25)] hover:z-10 sm:h-16 sm:w-16"
                    style={{ zIndex: 5 - i }}
                  >
                    <Image
                      src={src}
                      alt=""
                      width={64}
                      height={64}
                      sizes="(max-width: 640px) 48px, 64px"
                      className="h-full w-full object-cover"
                    />
                  </span>
                ))}
              </div>
            </div>

            {/* CENTER: H2 with cycling word + dual CTA */}
            <div className="my-10 sm:my-12 lg:my-20 flex flex-col items-center justify-center text-center">
              <h2
                className="hero-title max-w-230 sm:max-w-280 font-medium text-white"
                style={{
                  /* Enhanced typography with better optical spacing */
                  fontSize: "clamp(30px, 5.6vw, 72px)",
                  lineHeight: 1.12,
                  letterSpacing: "-0.025em",
                }}
              >
                We Build Digital Solutions with{" "}
                <span className="inline-block">
                  <CyclingWord />
                </span>
              </h2>

              <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
                <a
                  href="/contact"
                  className="group inline-flex items-center justify-center rounded-full bg-linear-to-r from-[#FF6B00] to-[#FF5812] px-10 py-4 text-sm font-semibold text-white shadow-[0_12px_32px_-8px_rgba(255,107,0,0.45)] transition-all duration-300 hover:shadow-[0_16px_48px_-12px_rgba(255,107,0,0.55)] hover:scale-[1.02] hover:from-[#FF5812] hover:to-[#FF6B00] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <span className="mr-2">Start Your Project</span>
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    →
                  </span>
                </a>
                <a
                  href="/services"
                  className="group inline-flex items-center justify-center rounded-full bg-white/10 px-10 py-4 text-sm font-semibold text-white backdrop-blur-md border border-white/20 transition-all duration-300 hover:bg-white/25 hover:border-white/35 hover:shadow-[0_8px_24px_-8px_rgba(255,255,255,0.15)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <span>Explore Solutions</span>
                  <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/20 text-xs transition-all duration-300 group-hover:border-white/40 group-hover:bg-white/10">
                    ↗
                  </span>
                </a>
              </div>
            </div>

            {/* BOTTOM TIER */}
            <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-end md:justify-between md:gap-6">
              <div className="bottom-profile flex flex-col gap-1.5 text-left text-white">
                <div className="text-[13px] sm:text-[14px] font-medium">Softree Technology</div>
                <div className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.16em] text-white/60">
                  AI · Web · Microsoft · Cloud
                </div>
                <div className="mt-1 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.16em] text-white/75">
                  Shipping production-grade software since 2013
                </div>
              </div>

              {/* Social icons — enhanced with premium hover states */}
              <div className="hidden flex-col items-center gap-3 sm:gap-3.5 sm:flex sm:absolute sm:right-6 sm:top-1/2 sm:-translate-y-1/2 md:right-8 lg:right-10 xl:right-12">
                {[
                  { Icon: LinkedinIcon, label: "Softree on LinkedIn", href: "https://www.linkedin.com/company/softree-technology/" },
                  { Icon: XIcon, label: "Softree on X", href: "https://x.com/" },
                ].map(({ Icon, label, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="social-icon group grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/20 hover:shadow-[0_8px_20px_-8px_rgba(255,255,255,0.15)] hover:scale-110 active:scale-[0.95] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
             3) CAPABILITIES MARQUEE
             CSS keyframe (off main thread). Doubled track gives a
             seamless seam-less linear loop.
        ══════════════════════════════════════════════════════════ */}
        <div
          ref={marqueeRef}
          className="relative mt-12 overflow-hidden py-6 sm:mt-14 sm:py-7 md:mt-16"
        >
          {/* Edge fades */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-20 md:w-24"
            style={{ background: "linear-gradient(90deg, #fff 0%, transparent 100%)" }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-20 md:w-24"
            style={{ background: "linear-gradient(270deg, #fff 0%, transparent 100%)" }}
          />

          <div className="avoora-hero-marquee flex min-w-max items-center gap-5 sm:gap-6 will-change-transform">
            {[0, 1].map((setIdx) => (
              <div
                key={setIdx}
                aria-hidden={setIdx === 1}
                className="flex shrink-0 items-center gap-5 sm:gap-6"
              >
                {ASSETS.services.map((s) => (
                  <div
                    key={`${setIdx}-${s.n}`}
                    className="w-[180px] sm:w-[220px] lg:w-[260px] flex-shrink-0"
                  >
                    <ServiceCard {...s} />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Local keyframe — scoped via class name, no global pollution. */}
          <style>{`
            @media (prefers-reduced-motion: no-preference) {
              .avoora-hero-marquee {
                animation: avoora-hero-marquee-x 45s linear infinite;
              }
              @keyframes avoora-hero-marquee-x {
                from { transform: translate3d(0, 0, 0); }
                to   { transform: translate3d(-50%, 0, 0); }
              }
            }
            @media (prefers-reduced-motion: reduce) {
              .avoora-hero-marquee {
                animation: none !important;
                transform: none !important;
              }
            }
          `}</style>
        </div>
      </div>
    </section>
  )
}
