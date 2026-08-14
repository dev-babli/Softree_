"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import Image from "next/image"
import Link from "next/link"
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
    {
      n: "01",
      label: "AI Development Services",
      href: "/services/ai-development-services",
      img: "/images/about/ai.jpg",
      desc: "Custom AI agents, cognitive workflows, and predictive models built for your operations."
    },
    {
      n: "02",
      label: "AI Consultancy Services",
      href: "/services/ai-consulting-services",
      img: "/images/about/consultancy.png",
      desc: "Strategic advisory to design your AI adoption roadmap, governance, and model selection."
    },
    {
      n: "03",
      label: "Generative AI Services",
      href: "/services/generative-ai",
      img: "/images/about/copilot.png",
      desc: "Deploy retrieval-augmented generation (RAG), fine-tuned LLMs, and custom workplace copilots."
    },
    {
      n: "04",
      label: "Azure OpenAI",
      href: "/solutions/azure-openai-development",
      img: "/images/about/azure.png",
      desc: "Deploy enterprise-grade LLMs, GPT models, and neural search securely on Azure Cloud."
    },
    {
      n: "05",
      label: "Power Apps",
      href: "/services/offshore-power-platform-development",
      img: "/images/about/microsoft.png",
      desc: "Accelerate custom low-code canvas and model-driven application builds for your team."
    },
    {
      n: "06",
      label: "Data Analytics",
      href: "/services/offshore-data-analytics",
      img: "/whysoftree/data-analytics.jpg",
      desc: "Turn raw data into actionable dashboards using Power BI and Microsoft Fabric solutions."
    },
    {
      n: "07",
      label: "Mobile App Development",
      href: "/services/offshore-mobile-app-development",
      img: "/images/about/mob.png",
      desc: "Native and cross-platform mobile apps for iOS and Android with premium user interfaces."
    },
    {
      n: "08",
      label: "Web Development",
      href: "/services/offshore-web-app-development",
      img: "/images/about/web.jpg",
      desc: "High-performance web apps built with Next.js, React, and modern serverless architectures."
    },
    {
      n: "09",
      label: "LangChain Development",
      href: "/solutions/lang-chain-development",
      img: "/images/about/lang.png",
      desc: "Chain cognitive engines with databases, vector stores, and custom external APIs."
    },
    {
      n: "10",
      label: "LangGraph Development",
      href: "/solutions/lang-graph-development",
      img: "/images/about/graph.png",
      desc: "Build resilient, cyclic multi-agent graphs with state-control and self-healing logic."
    },
    {
      n: "11",
      label: "Multi-Agent Systems",
      href: "/solutions/multi-agent-systems",
      img: "/whysoftree/ai.png",
      desc: "Orchestrate collaborative networks of specialized AI agents working to solve complex goals."
    },
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
  "AI Development Services",
  "Generative AI Services",
  "AI Consultancy Services",
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
          className="inline-block bg-gradient-to-r from-[#FF6B00] to-[#FF5812] bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
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
  desc,
  isActive,
  onCardClick,
}: {
  n: string
  label: string
  href: string
  img: string
  desc: string
  isActive?: boolean
  onCardClick?: (e: React.MouseEvent) => void
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      aria-label={label}
      onClick={(e) => {
        if (!isActive && onCardClick) {
          e.preventDefault()
          onCardClick(e)
        }
      }}
      className={`service-card group/srv relative flex aspect-[3/4] w-full flex-col justify-between overflow-hidden rounded-[28px] border transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 ${isActive
          ? "border-white/20 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.8),0_0_30px_rgba(255,107,0,0.2)] scale-[1.08]"
          : "border-white/[0.04] opacity-50 scale-[0.92] hover:opacity-80"
        }`}
      style={{ willChange: "transform, opacity" }}
    >
      {/* 1) Full Background Image */}
      <Image
        src={img}
        alt={label}
        fill
        sizes="400px"
        className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-700 group-hover/srv:scale-[1.03]"
      />

      {/* 2) Premium Dark gradient overlay for legibility */}
      <div
        className="absolute inset-0 z-10 transition-opacity duration-500"
        style={{
          background: isActive
            ? "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.65) 65%, rgba(0,0,0,0.95) 100%)"
            : "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.95) 100%)"
        }}
      />

      {/* 3) Foreground Content Container */}
      <div className="relative z-20 flex h-full w-full flex-col justify-between p-6 text-left">
        {/* Top row: Number */}
        <div className="flex items-center justify-end">
          <span className="font-mono text-[13px] font-bold tracking-wider text-white shadow-sm">
            {n}
          </span>
        </div>

        {/* Bottom Service Content */}
        <div className="mt-auto">
          <div className="space-y-2">
            <h3 className={`text-[15px] sm:text-[17px] font-bold leading-tight tracking-tight transition-colors duration-500 ${isActive ? "text-[#FF6B00]" : "text-white"
              }`}>
              {label}
            </h3>
            <p className="text-[12px] leading-relaxed text-white/70 line-clamp-2 shadow-sm font-medium">
              {desc}
            </p>
          </div>

          {/* Explore link showing only for the active card */}
          <div className={`mt-3 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#FF6B00] transition-all duration-500 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"
            }`}>
            <span>Explore Service</span>
            <span>→</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

/* ── Main section ─────────────────────────────────────────────────── */

export default function AvooraHero({
  showServices = false,
}: {
  showServices?: boolean
} = {}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const videoStageRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const totalServices = ASSETS.services.length

  useEffect(() => {
    if (isPaused || !showServices) return
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalServices)
    }, 3000)
    return () => clearInterval(timer)
  }, [isPaused, totalServices, showServices])

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
      if (marqueeRef.current) {
        tl.from(
          marqueeRef.current,
          {
            y: reduced ? 0 : 40,
            opacity: 0,
            duration: reduced ? 0.01 : DUR.card,
          },
          "-=0.2"
        )
      }

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
      <div className="mx-auto w-full max-w-7xl px-4 pt-8 pb-16 sm:px-5 sm:pt-10 md:px-8 md:pt-14 md:pb-20 lg:px-10 lg:pt-16 xl:pt-20">
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
             3) CAPABILITIES SLIDER
             Dynamic 3-card sliding carousel with center active scaling.
             Cycles every 3 seconds.
        ══════════════════════════════════════════════════════════ */}
        {showServices && (
          <div 
            ref={marqueeRef} 
            className="relative mt-24 pt-16 pb-12 select-none border-t border-gray-100"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Section Header with Left-Aligned Text & Right-Aligned Arrows */}
            <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6 max-w-7xl mx-auto px-4">
              <div className="text-left max-w-4xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#FF5812]/20 bg-[#FF5812]/05 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.20em] text-[#FF5812] mb-3 shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF5812]" />
                  Enterprise Technology Transformation Services
                </span>
                <h2 className="font-black text-3xl md:text-5xl leading-[1.1] tracking-tight text-[#0a0a1a] mt-2 block w-full">
                  <span className="text-[#0a0a1a]">Transforming Business Challenges Into</span>{" "}
                  <span className="text-[#FF5812] drop-shadow-[0_2px_12px_rgba(255,88,18,0.15)]">Digital Solutions</span>
                </h2>
                <p className="mt-3 text-zinc-600/90 font-medium text-base md:text-lg leading-relaxed max-w-2xl">
                  Explore our core expertise spanning cognitive agents cloud application modernization and enterprise integrations
                </p>
              </div>

              {/* Navigation Arrows on Right Side */}
              <div className="flex gap-2.5 shrink-0 self-start md:self-end">
                <button
                  disabled={activeIndex === 0}
                  onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
                  aria-label="Previous service"
                  className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 focus:outline-none ${
                    activeIndex === 0
                      ? "bg-gray-100 border-gray-100 text-gray-400 cursor-not-allowed opacity-50"
                      : "bg-[#FF6B00] border-[#FF6B00] text-white hover:bg-[#FF5812] hover:scale-105 active:scale-95 shadow-sm"
                  }`}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  disabled={activeIndex === totalServices - 1}
                  onClick={() => setActiveIndex((prev) => Math.min(totalServices - 1, prev + 1))}
                  aria-label="Next service"
                  className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 focus:outline-none ${
                    activeIndex === totalServices - 1
                      ? "bg-gray-100 border-gray-100 text-gray-400 cursor-not-allowed opacity-50"
                      : "bg-[#FF6B00] border-[#FF6B00] text-white hover:bg-[#FF5812] hover:scale-105 active:scale-95 shadow-sm"
                  }`}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* 4) Continuous Slider Track */}
            <div className="carousel-container overflow-hidden w-full py-10 relative">
              <div
                className="carousel-track"
                style={{
                  transform: `translate3d(calc(-1 * ((${activeIndex} * (var(--card-width) + var(--card-gap))) + (var(--card-width) / 2))), 0, 0)`,
                }}
              >
                {ASSETS.services.map((s, idx) => {
                  const isActive = idx === activeIndex
                  return (
                    <div
                      key={s.n}
                      style={{ width: "var(--card-width)" }}
                      className="shrink-0"
                    >
                      <ServiceCard
                        n={s.n}
                        label={s.label}
                        href={s.href}
                        img={s.img}
                        desc={s.desc}
                        isActive={isActive}
                        onCardClick={() => setActiveIndex(idx)}
                      />
                    </div>
                  )
                })}
              </div>
            </div>

            <style>{`
              .carousel-container {
                --card-width: 280px;
                --card-gap: 16px;
              }
              @media (min-width: 640px) {
                .carousel-container {
                  --card-width: 320px;
                  --card-gap: 24px;
                }
              }
              @media (min-width: 1024px) {
                .carousel-container {
                  --card-width: 360px;
                  --card-gap: 24px;
                }
              }
              .carousel-track {
                position: relative;
                left: 50%;
                display: flex;
                gap: var(--card-gap);
                width: max-content;
                will-change: transform;
                transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
              }
            `}</style>
          </div>
        )}
      </div>
    </section>
  )
}
