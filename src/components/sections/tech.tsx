"use client";

/**
 * Homepage tech stack — light editorial band after Industries.
 * Reuses LogoLoopTechStack (same colored icons as Engineering Solutions).
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeader from "@/components/homepage-light/SectionHeader";
import LogoLoopTechStack from "@/components/sections/engineering-solutions/LogoLoopTechStack";
import { DUR, EASE_T, REVEAL, VIEWPORT } from "@/lib/motion";

const SURFACE = "#F3F0EE";
const ACCENT_BLUE = "#1852FF";

export default function TechStack() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { ...VIEWPORT.default, amount: 0.2 });

  return (
    <section
      ref={ref}
      data-section="tech-stack"
      data-theme-section="light"
      aria-labelledby="tech-stack-heading"
      className="relative overflow-hidden border-t border-[#0a0a1a]/[0.06] py-16 md:py-20"
      style={{ backgroundColor: SURFACE }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(42% 50% at 50% 0%, rgba(24,82,255,0.05), transparent 70%)`,
        }}
      />

      <div className="relative mx-auto w-full max-w-[1280px] px-6 lg:px-12">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={REVEAL.up.initial}
          animate={inView ? REVEAL.up.animate : REVEAL.up.initial}
          transition={{ duration: DUR.section, ease: EASE_T.silk }}
        >
          <SectionHeader
            badge="Technology stack"
            accent={ACCENT_BLUE}
            headline={
              <span id="tech-stack-heading" className="text-balance">
                From MVP launches to enterprise platforms
              </span>
            }
            body="Modern frontends, Microsoft Power Platform, and cloud-native backends — one bench, full stack."
            className="!items-center [&_p]:mx-auto"
          />
        </motion.div>

        <motion.div
          className="mx-auto mt-10 max-w-4xl md:mt-12"
          initial={REVEAL.fade.initial}
          animate={inView ? REVEAL.fade.animate : REVEAL.fade.initial}
          transition={{ duration: DUR.card, ease: EASE_T.silk, delay: 0.1 }}
        >
          <LogoLoopTechStack
            fadeOutColor={SURFACE}
            logoHeight={38}
            gap={36}
            speed={75}
            ariaLabel="Technologies Softree builds with"
          />
        </motion.div>

        <motion.div
          className="mt-8 flex justify-center md:mt-10"
          initial={REVEAL.fade.initial}
          animate={inView ? REVEAL.fade.animate : REVEAL.fade.initial}
          transition={{ duration: DUR.card, ease: EASE_T.silk, delay: 0.18 }}
        >
          <Link
            href="/services/mvp"
            className="group inline-flex items-center gap-2 text-[13px] font-semibold text-[#0a0a1a]/70 transition-colors hover:text-[#1852FF]"
          >
            Explore all technologies
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
