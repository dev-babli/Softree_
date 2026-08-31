"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { BentoWireframe } from "@/components/bento-layout";
import type { CaseStudyMock } from "@/components/bento-layout";
import SectionHeader from "@/components/homepage-light/SectionHeader";
import { homepageShowcaseStories } from "@/data/homepage-showcase-content";
import { HOMEPAGE_FALLBACK_CASE_STUDIES } from "@/data/homepage-case-studies-fallback";
import { DUR, EASE_T, VIEWPORT } from "@/lib/motion";

const SURFACE = "#F3F0EE";
const ACCENT_ORANGE = "#FF5812";

type Props = {
  caseStudies?: CaseStudyMock[];
};

export default function HomepageCaseStudiesSection({
  caseStudies = HOMEPAGE_FALLBACK_CASE_STUDIES,
}: Props) {
  const items =
    caseStudies.length > 0 ? caseStudies : HOMEPAGE_FALLBACK_CASE_STUDIES;

  return (
    <section
      data-section="case-studies"
      data-theme-section="light"
      aria-labelledby="homepage-case-studies-heading"
      className="relative border-t border-[#0a0a1a]/[0.06] py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: SURFACE }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(42% 48% at 12% 0%, rgba(255,88,18,0.06), transparent 65%)`,
        }}
      />

      <div className="relative mx-auto w-full max-w-[1280px] px-6 lg:px-12">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ ...VIEWPORT.default, amount: 0.12 }}
          transition={{ duration: DUR.section, ease: EASE_T.silk }}
        >
          <SectionHeader
            badge="Selected works"
            accent={ACCENT_ORANGE}
            headline={
              <span id="homepage-case-studies-heading" className="text-balance">
                Proven solutions that ship
              </span>
            }
            body="Real deliveries across Agentic AI services, Data Analytics, Microsoft cloud platforms, Web, and Mobile — browse the index or open a story."
            className="!items-center [&_p]:mx-auto"
          />
        </motion.div>

        <motion.div
          className="mt-8 flex justify-center"
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ ...VIEWPORT.default, amount: 0.12 }}
          transition={{ duration: DUR.card, ease: EASE_T.silk, delay: 0.06 }}
        >
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1852FF] transition-colors hover:text-[#0a0a1a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1852FF] focus-visible:ring-offset-2"
          >
            View all case studies
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </motion.div>

        <motion.div
          className="mt-10 md:mt-12"
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ ...VIEWPORT.default, amount: 0.08 }}
          transition={{ duration: DUR.section, ease: EASE_T.silk, delay: 0.1 }}
        >
          <BentoWireframe
            variant="homepage-light"
            hideIndexHeader
            stories={homepageShowcaseStories}
            caseStudies={items}
            viewAllHref="/case-studies"
          />
        </motion.div>
      </div>
    </section>
  );
}
