"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ParallaxGalleryCard from "@/components/infinity-scroll-animation/ParallaxGalleryCard";
import SectionHeader from "@/components/homepage-light/SectionHeader";
import TrustedByMarquee from "@/components/homepage-light/TrustedByMarquee";
import { DUR, EASE_T } from "@/lib/motion";

const SURFACE = "#F3F0EE";
const GALLERY_MIN_H =
  "min-h-[300px] sm:min-h-[380px] md:min-h-[440px] lg:min-h-[500px]";

export default function ServicesHubIntro() {
  return (
    <section
      role="banner"
      data-section="services-intro"
      className="relative w-full overflow-x-clip pt-4"
      style={{ backgroundColor: SURFACE }}
      aria-labelledby="services-hero-heading"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-32 top-0 h-[480px] w-[480px] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(closest-side, rgba(24,82,255,0.08), transparent 72%)",
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
            badge="Services"
            accent="#FF5812"
            as="h1"
            headline={
              <span id="services-hero-heading">
                Twelve practices.
                <br />
                One delivery standard.
              </span>
            }
            body="Microsoft, data, AI, and modern product engineering — scroll the gallery, then stack into the practice that matches your roadmap."
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
              href="/case-studies"
              className="inline-flex items-center gap-2 rounded-full border border-[#0a0a1a]/14 bg-white/60 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0a0a1a] backdrop-blur-sm transition hover:border-[#FF5812]/30 hover:text-[#FF5812] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a0a1a]/30"
            >
              Case studies
            </Link>
          </div>
        </motion.div>

        <motion.div
          className={`mt-10 w-full md:mt-14 ${GALLERY_MIN_H}`}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.cinematic, ease: EASE_T.silk, delay: 0.12 }}
        >
          <ParallaxGalleryCard className="h-full min-h-0 rounded-2xl shadow-[0_20px_60px_-28px_rgba(10,10,26,0.22)]" />
        </motion.div>

        <div className="mt-10 border-t border-[#0a0a1a]/[0.08] pt-8 md:mt-12">
          <TrustedByMarquee />
        </div>
      </div>
    </section>
  );
}
