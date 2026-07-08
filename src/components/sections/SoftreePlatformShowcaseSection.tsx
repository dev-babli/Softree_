"use client";

/**
 * About Us platform section — three Clarity glass pillars + editorial footer.
 * Pillar cards live in `AboutUsGlassPillars` (shared with homepage bento).
 */

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { AboutUsGlassPillars } from "@/components/sections/about-us/AboutUsGlassPillars";
import SectionHeader from "@/components/homepage-light/SectionHeader";
import { HOME_INTRO_SURFACE } from "@/components/sections/ClarityControlSection";
import { DUR, EASE_T, VIEWPORT } from "@/lib/motion";

const ACCENT = "#FF5812";
const BLUE = "#1852FF";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function SoftreePlatformShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, VIEWPORT.default);

  return (
    <section
      ref={sectionRef}
      data-section="about-us-platform"
      data-theme-section="light"
      aria-labelledby="about-us-platform-heading"
      className="relative w-full overflow-x-clip overflow-y-visible py-20 md:py-24 lg:py-32"
      style={{ backgroundColor: HOME_INTRO_SURFACE }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 z-0 h-[520px] w-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,88,18,0.08), rgba(255,88,18,0) 72%)",
          filter: "blur(36px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="mb-12 grid grid-cols-1 gap-8 md:mb-14 lg:grid-cols-12 lg:gap-16">
          <motion.div
            className="lg:col-span-7"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            transition={{ duration: DUR.panel, ease: EASE_T.silk }}
          >
            <SectionHeader
              badge="About us"
              accent={ACCENT}
              headline={
                <span id="about-us-platform-heading">
                  A global offshore partner that ships under your brand.
                </span>
              }
            />
          </motion.div>
          <motion.p
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            transition={{ duration: DUR.panel, delay: 0.06, ease: EASE_T.silk }}
            className="max-w-[440px] self-end text-pretty text-[15px] font-medium leading-[1.65] text-[#0a0a1a]/70 md:text-[16px] lg:col-span-4 lg:col-start-9"
          >
            Softree gives agencies, consultancies, and product companies senior engineering
            from India — white-label ready, Microsoft-capable, and accountable to your clients.
          </motion.p>
        </div>

        <AboutUsGlassPillars />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT.default}
          variants={fadeUp}
          transition={{ duration: DUR.section, ease: EASE_T.silk }}
          className="mt-14 flex flex-col gap-8 border-t border-[#0a0a1a]/10 pt-12 md:mt-16 md:flex-row md:items-end md:justify-between lg:mt-20"
        >
          <div className="max-w-[56ch]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0a0a1a]/40">
              Who we are
            </p>
            <p className="mt-3 text-balance text-[1.35rem] font-semibold leading-[1.22] tracking-[-0.03em] text-[#0a0a1a] md:text-[1.55rem]">
              Meet{" "}
              <span style={{ color: BLUE }}>{`{`}</span>
              <span className="italic">Softree</span>
              <span style={{ color: BLUE }}>{`}`}</span>
              <span className="text-[#0a0a1a]/65">
                {" "}
                — an engineering partner for offshore, white-label, and enterprise delivery.
              </span>
            </p>
            <blockquote className="mt-6 border-l-2 border-[#FF5812]/40 pl-5 text-[15px] font-medium leading-[1.55] text-[#0a0a1a]/75 md:text-[16px]">
              “They operate as our offshore bench — white-label ready, senior-led, and
              accountable to our clients.”
            </blockquote>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#FF5812] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#e84f0f]"
            >
              Partner with us
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 rounded-full border border-[#0a0a1a]/14 bg-white px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0a0a1a] transition hover:border-[#FF5812]/25 hover:text-[#FF5812]"
            >
              Case studies
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
