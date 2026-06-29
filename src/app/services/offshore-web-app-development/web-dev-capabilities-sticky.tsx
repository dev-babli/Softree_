"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import SectionHeader from "@/components/homepage-light/SectionHeader";
import {
  WEB_DEV_CAPABILITIES,
  WEB_DEV_VISUALS,
} from "./web-dev-visuals";
import { DUR, EASE_T } from "@/lib/motion";

const ACCENT = "#1852FF" as const;

function CapabilityCard({
  item,
  index,
  total,
}: {
  item: (typeof WEB_DEV_CAPABILITIES)[number];
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
    prefersReduced ? [1, 1, 1] : [1, 0.96, isLast ? 1 : 0.45],
  );

  const visual = WEB_DEV_VISUALS.capabilities[item.imageIndex];

  return (
    <div
      ref={ref}
      className="sticky w-full px-4 py-2 sm:px-6"
      style={{ top: `${index * 18}px` }}
    >
      <motion.article
        style={{ scale, opacity }}
        className="mx-auto grid max-w-[1280px] overflow-hidden rounded-[22px] border border-[#0a0a1a]/[0.08] bg-white shadow-[0_24px_70px_-36px_rgba(10,10,26,0.18)] lg:grid-cols-[1fr_1.05fr]"
      >
        <div className="flex flex-col justify-between p-8 md:p-12 lg:min-h-[520px]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1852FF]">
              Capability 0{index + 1}
            </p>
            <h3
              className="mt-4 font-semibold tracking-[-0.04em] text-[#0a0a1a]"
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
                lineHeight: 0.95,
              }}
            >
              {item.title}
            </h3>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#0a0a1a]/62">
              {item.description}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#0a0a1a]/10 bg-[#F8F9FC] px-3.5 py-1.5 text-[11px] font-medium text-[#0a0a1a]/60"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <Link
          href="/contact"
          className="group relative min-h-[280px] overflow-hidden lg:min-h-full"
        >
          <Image
            src={visual.src}
            alt={visual.alt}
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/50 via-transparent to-transparent" />
          <span className="absolute bottom-6 left-6 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0a0a1a] opacity-0 transition group-hover:opacity-100">
            Discuss this lane
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </span>
        </Link>
      </motion.article>
    </div>
  );
}

export default function WebDevCapabilitiesSticky() {
  return (
    <section
      data-section="web-dev-capabilities"
      className="relative border-t border-[#0a0a1a]/[0.06] bg-[#F8F9FC] pb-10"
    >
      <div className="mx-auto max-w-[1400px] px-4 pb-10 pt-16 sm:px-6 md:pt-20 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: DUR.section, ease: EASE_T.silk }}
        >
          <SectionHeader
            badge="What we build"
            accent={ACCENT}
            headline="Capabilities that stack as you scroll."
            body="Three delivery lanes — interface, platform, and launch quality — each with abstract craft and concrete engineering underneath."
          />
        </motion.div>
      </div>

      <div className="relative pb-16">
        {WEB_DEV_CAPABILITIES.map((item, i) => (
          <CapabilityCard
            key={item.title}
            item={item}
            index={i}
            total={WEB_DEV_CAPABILITIES.length}
          />
        ))}
      </div>
    </section>
  );
}
