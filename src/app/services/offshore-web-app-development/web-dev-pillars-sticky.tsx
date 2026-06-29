"use client";

import { useRef } from "react";
import { Rocket, Briefcase, ShieldCheck } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import SectionHeader from "@/components/homepage-light/SectionHeader";
import { DUR, EASE_T } from "@/lib/motion";

const ACCENT = "#FF5812" as const;

const PILLARS = [
  {
    title: "Scalable web application delivery",
    icon: Rocket,
    points: [
      "End-to-end development of scalable, high-performance web applications using modern frameworks",
      "Automated CI/CD pipelines ensure faster releases, stability, and consistent quality",
      "Modular architecture enables long-term scalability and adaptability",
    ],
  },
  {
    title: "Business-driven development decisions",
    icon: Briefcase,
    points: [
      "Technical decisions aligned with business goals, user needs, and ROI",
      "Continuous requirement validation through stakeholder collaboration",
      "Technology selection based on performance, security, and maintainability",
    ],
  },
  {
    title: "Secure & disciplined delivery governance",
    icon: ShieldCheck,
    points: [
      "Strong governance keeps timelines, scope, and budgets under control",
      "Security best practices embedded across frontend, backend, and infrastructure",
      "Transparent communication and disciplined delivery execution",
    ],
  },
] as const;

function StickyPillarCard({
  pillar,
  index,
  total,
}: {
  pillar: (typeof PILLARS)[number];
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const isLast = index === total - 1;
  const scale = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    prefersReduced ? [1, 1, 1] : [1, 0.98, isLast ? 1 : 0.94],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    prefersReduced ? [1, 1, 1] : [1, 0.95, isLast ? 1 : 0.5],
  );

  const Icon = pillar.icon;
  const stickyTop = `${index * 16}px`;

  return (
    <div
      ref={ref}
      className="sticky w-full px-4 py-2 sm:px-6"
      style={{ top: stickyTop }}
    >
      <motion.article
        style={{ scale, opacity }}
        className="mx-auto max-w-[1280px] overflow-hidden rounded-[18px] border border-[#0a0a1a]/[0.08] bg-white p-8 shadow-[0_20px_50px_-28px_rgba(10,10,26,0.14)] md:p-12"
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div>
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#FF5812]/10">
              <Icon className="h-7 w-7 text-[#FF5812]" aria-hidden />
            </div>
            <h3
              className="font-semibold text-[#0a0a1a]"
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
              }}
            >
              {pillar.title}
            </h3>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0a0a1a]/40">
              Pillar {String(index + 1).padStart(2, "0")}
            </p>
          </div>
          <ul className="space-y-4 text-sm text-[#0a0a1a]/65 md:text-[15px]">
            {pillar.points.map((point, i) => (
              <li key={i} className="flex gap-3">
                <span className="font-semibold text-[#FF5812]">{i + 1}.</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.article>
    </div>
  );
}

export default function WebDevPillarsSticky() {
  return (
    <section
      data-section="web-dev-pillars-sticky"
      className="relative border-t border-[#0a0a1a]/[0.06] bg-[#F8F9FC] pb-8"
    >
      <div className="mx-auto max-w-[1400px] px-4 pb-10 pt-16 sm:px-6 md:pt-20 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: DUR.section, ease: EASE_T.silk }}
        >
          <SectionHeader
            badge="Delivery pillars"
            accent={ACCENT}
            headline="Three pillars — scroll the stack."
            body="Each card pins and hands off to the next, the same scrollytelling rhythm used on premium agency templates — adapted for enterprise web delivery."
          />
        </motion.div>
      </div>

      <div className="relative pb-12">
        {PILLARS.map((pillar, i) => (
          <StickyPillarCard
            key={pillar.title}
            pillar={pillar}
            index={i}
            total={PILLARS.length}
          />
        ))}
      </div>
    </section>
  );
}
