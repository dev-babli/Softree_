"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ParallaxGalleryCard from "@/components/infinity-scroll-animation/ParallaxGalleryCard";
import SectionHeader from "@/components/homepage-light/SectionHeader";
import TrustedByMarquee from "@/components/homepage-light/TrustedByMarquee";
import { WEB_DEV_GALLERY } from "@/data/web-dev-page";
import { DUR, EASE_T } from "@/lib/motion";

const SURFACE = "#F3F0EE";
const GALLERY_MIN_H =
  "min-h-[300px] sm:min-h-[380px] md:min-h-[440px] lg:min-h-[500px]";

export default function WebDevIntro() {
  return (
    <section
      role="banner"
      data-section="web-dev-intro"
      className="relative w-full overflow-x-clip"
      style={{ backgroundColor: SURFACE }}
      aria-labelledby="web-dev-hero-heading"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-32 top-0 h-[480px] w-[480px] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,88,18,0.1), transparent 72%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-10 sm:px-6 md:pb-14 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.section, ease: EASE_T.silk }}
        >
          <SectionHeader
            badge="Web development"
            accent="#FF5812"
            as="h1"
            headline={
              <span id="web-dev-hero-heading">
                Enterprise web apps.
                <br />
                One delivery standard.
              </span>
            }
            body="Next.js, React, and cloud-native backends — scroll the gallery, then stack through the lanes we ship for product teams."
            className="max-w-3xl"
          />

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#FF5812] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#e84f0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5812] active:scale-[0.98]"
            >
              Start a project
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
            <Link
              href="/case-studies/web"
              className="inline-flex items-center gap-2 rounded-full border border-[#0a0a1a]/14 bg-white/60 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0a0a1a] backdrop-blur-sm transition hover:border-[#FF5812]/30 hover:text-[#FF5812]"
            >
              Web case studies
            </Link>
          </div>
        </motion.div>

        <motion.div
          className={`mt-10 w-full md:mt-14 ${GALLERY_MIN_H}`}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.cinematic, ease: EASE_T.silk, delay: 0.12 }}
        >
          <ParallaxGalleryCard
            slides={WEB_DEV_GALLERY}
            eyebrow="Web delivery gallery"
            className="h-full min-h-0 rounded-2xl shadow-[0_20px_60px_-28px_rgba(10,10,26,0.22)]"
          />
        </motion.div>

        <div className="mt-10 border-t border-[#0a0a1a]/[0.08] pt-8 md:mt-12">
          <TrustedByMarquee />
        </div>
      </div>
    </section>
  );
}
