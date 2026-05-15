"use client"

import { motion, useScroll, useSpring } from "framer-motion"
import { TransferredSoftreeHero } from "@/components/homepage/TransferredSoftreeHero"
import { useEffect, useState } from "react"

// Eager imports for smooth scrolling (like /light page)
import LightCreativeImpact from "@/components/homepage-light/LightCreativeImpact"
import FeaturesShowcase from "@/components/features/FeaturesShowcase"
import { ServicesStackedSlides } from "@/components/homepage/ServicesStackedSlides"
import LightEngagementModels from "@/components/homepage-light/LightEngagementModels"
import AvooraHero from "@/components/homepage-light/AvooraHero"
import LightServicesStickyList from "@/components/homepage-light/LightServicesStickyList"
import LightIndustriesCarousel from "@/components/homepage-light/LightIndustriesCarousel"
import SoftreeProjectShowcase from "@/components/homepage/SoftreeProjectShowcase"
import LightHorizontalCodePath from "@/components/homepage-light/LightHorizontalCodePath"
import LightAIAgents from "@/components/homepage-light/LightAIAgents"
import SoftreeClientStories from "@/components/homepage/SoftreeClientStories"
import { SoftreeBlogSection } from "@/components/homepage/SoftreeBlogSection"
import LightFAQExact from "@/components/homepage-light/LightFAQExact"
import LightContactSection from "@/components/homepage-light/LightContactSection"
import { TogetherFooter } from "@/components/homepage/TogetherFooter"
import TrustedByStrip from "@/components/homepage/TrustedByStrip"
import MobileStickyCTA from "@/components/homepage/MobileStickyCTA"

/* ─────────────────────────────────────────────────────────────────────
 *  Homepage  ·  Cinematic flow, production-ready
 *
 *  Chrome (page-level):
 *    • Skip-to-content link  — accessibility
 *    • <main> landmark        — accessibility / SEO
 *    • Scroll progress bar    — fixed top, springs with scroll
 *    • Back-to-top button     — appears after 1200px scroll
 *
 *  Section loading:
 *    • Hero is eager (above the fold).
 *    • Every other section is `next/dynamic` + `DeferUntilInView`
 *      so we only fetch + mount when within ~320px of the viewport.
 *    • `placeholderClassName` MUST match each section's actual root
 *      background to avoid layout-shift / colour FOUC.
 * ───────────────────────────────────────────────────────────────────── */

/* ── Skip-to-content (visually hidden until focus) ─────────────────── */
function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[#0a0a1a] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#1852FF]/40"
    >
      Skip to content
    </a>
  )
}

/* ── Page-level scroll progress bar ────────────────────────────────── */
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    mass: 0.8,
  })
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left will-change-transform"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, #1852FF 0%, #6E9CFF 50%, #1852FF 100%)",
        boxShadow: "0 0 12px rgba(24,82,255,0.45)",
      }}
    />
  )
}

/* ── Back-to-top, appears after 1200px ────────────────────────────── */
function BackToTopButton() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    let rafId: number | null = null
    let lastScrollY = 0
    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        lastScrollY = window.scrollY
        setShow(lastScrollY > 1200)
        rafId = null
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])
  return (
    <motion.button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group fixed bottom-6 right-6 z-[55] flex h-12 w-12 items-center justify-center rounded-full bg-[#0a0a1a] text-white shadow-[0_18px_50px_-12px_rgba(10,10,26,0.5),0_0_0_1px_rgba(255,255,255,0.04)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#1852FF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1852FF]/50 sm:bottom-8 sm:right-8 will-change-transform"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={
        show
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 20, scale: 0.9, pointerEvents: "none" }
      }
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        className="transition-transform duration-300 group-hover:-translate-y-0.5"
      >
        <path
          d="M7 11V3M7 3L3 7M7 3L11 7"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  )
}

/* ── Section wrapper for consistent spacing ────────────────────────── */
function SectionWrapper({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={`w-full ${className}`}>{children}</div>
}


/* ── Page composition ──────────────────────────────────────────────── */

function HomepageContent() {
  return (
    <>
      <SkipToContent />
      <ScrollProgressBar />

      <main
        id="main-content"
        className="relative flex min-h-screen w-full flex-col items-stretch justify-start bg-[#f6f6f6]"
        style={{ overflowX: "clip" }}
      >
        <div className="relative mt-0 flex w-full flex-col items-stretch justify-start">
          {/* 01 — HERO */}
          <TransferredSoftreeHero />

          {/* 01a — TRUSTED BY STRIP */}
          <SectionWrapper>
            <TrustedByStrip />
          </SectionWrapper>

          {/* 02 — WHY SOFTREE */}
          <SectionWrapper>
            <LightCreativeImpact />
          </SectionWrapper>

          {/* 03 — SERVICES SHOWCASE */}
          <SectionWrapper>
            <FeaturesShowcase />
          </SectionWrapper>

          {/* 04 — SERVICES STACKED SLIDES */}
          <SectionWrapper>
            <ServicesStackedSlides />
          </SectionWrapper>

          {/* 06B — ENGAGEMENT MODELS */}
          <SectionWrapper>
            <LightEngagementModels />
          </SectionWrapper>

          {/* 07 — CTA (Avoora hero) */}
          <SectionWrapper>
            <AvooraHero />
          </SectionWrapper>

          {/* 09 — SERVICES STICKY LIST */}
          <SectionWrapper>
            <LightServicesStickyList />
          </SectionWrapper>

          {/* 10 — INDUSTRIES CAROUSEL */}
          <SectionWrapper>
            <LightIndustriesCarousel />
          </SectionWrapper>

          {/* 11 — OUR WORK */}
          <SectionWrapper>
            <SoftreeProjectShowcase />
          </SectionWrapper>

          {/* 12 — HORIZONTAL CODE PATH */}
          <SectionWrapper>
            <LightHorizontalCodePath />
          </SectionWrapper>

          {/* 13 — AI AGENTS SHOWCASE */}
          <SectionWrapper>
            <LightAIAgents />
          </SectionWrapper>

          {/* 14 - CLIENT STORIES */}
          <SectionWrapper>
            <SoftreeClientStories />
          </SectionWrapper>

          {/* 15 — INSIGHTS / BLOG */}
          <SectionWrapper>
            <SoftreeBlogSection />
          </SectionWrapper>

          {/* 16 — FAQ */}
          <SectionWrapper>
            <LightFAQExact />
          </SectionWrapper>

          {/* 17 — CONTACT */}
          <SectionWrapper>
            <LightContactSection />
          </SectionWrapper>

          {/* 18 — FOOTER */}
          <SectionWrapper>
            <TogetherFooter />
          </SectionWrapper>
        </div>
      </main>

      <BackToTopButton />
      <MobileStickyCTA />
    </>
  )
}

export default function Homepage() {
  return <HomepageContent />
}
