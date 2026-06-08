"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import SectionHeader from "@/components/homepage-light/SectionHeader";
import { SERVICES_HUB, type ServicesHubItem } from "@/data/services-hub";
import { DUR, EASE_T } from "@/lib/motion";

const SURFACE = "#F3F0EE";
const ACCENT = "#FF5812";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function StickyServiceCard({
  s,
  index,
  total,
}: {
  s: ServicesHubItem;
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
    [0, 0.5, 1],
    prefersReduced ? [1, 1, 1] : [1, 0.97, isLast ? 1 : 0.92],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    prefersReduced ? [1, 1, 1] : [1, 0.92, isLast ? 1 : 0.55],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, isLast ? 0 : prefersReduced ? 0 : -16],
  );

  const overlayRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: enterProgress } = useScroll({
    target: overlayRef,
    offset: ["start 0.98", "start 0.35"],
  });
  const overlayHeight = useTransform(
    enterProgress,
    [0, 1],
    prefersReduced ? ["0%", "0%"] : ["100%", "0%"],
  );

  const stickyOffset = `${index * 14}px`;

  return (
    <div
      ref={ref}
      className="sticky w-full px-4 py-3 sm:px-6"
      style={{ top: stickyOffset }}
    >
      <motion.article
        style={{ scale, opacity, y }}
        className="relative mx-auto w-full max-w-[1280px] overflow-hidden rounded-[18px] border border-[#0a0a1a]/[0.08] bg-white shadow-[0_1px_2px_rgba(10,10,26,0.04),0_20px_50px_-28px_rgba(10,10,26,0.14)] ring-1 ring-[#FF5812]/10"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            background: `radial-gradient(70% 55% at 18% 0%, rgba(24,82,255,0.06), transparent 65%), radial-gradient(50% 40% at 88% 100%, rgba(255,88,18,0.05), transparent 60%)`,
          }}
        />

        <div className="relative z-10 mx-auto w-full px-6 md:px-10">
          <div className="h-px w-full bg-[#0a0a1a]/[0.06]" />
          <div
            ref={overlayRef}
            className="grid min-h-[78svh] grid-cols-1 items-center gap-10 py-10 md:py-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16"
          >
            <div className="flex flex-col">
              <Link
                href={s.href}
                className="group/title inline-flex items-baseline gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1852FF]"
              >
                <h2
                  className="font-semibold text-[#0a0a1a] transition-colors duration-500 group-hover/title:text-[#0a0a1a]/65"
                  style={{
                    fontSize: "clamp(48px, 7.4vw, 108px)",
                    lineHeight: 0.95,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {s.title}
                </h2>
                <span
                  className="flex items-baseline font-medium text-[#FF5812]/55"
                  style={{
                    fontSize: "clamp(16px, 1.4vw, 22px)",
                    letterSpacing: "-0.01em",
                    transform: "translateY(-0.35em)",
                  }}
                >
                  <span>{"{"}</span>
                  <span>0</span>
                  <span>{s.n.slice(1)}</span>
                  <span>{"}"}</span>
                </span>
              </Link>

              <p className="mt-6 max-w-[480px] text-[15px] leading-[1.55] text-[#0a0a1a]/62 md:text-[16px]">
                {s.description}
              </p>

              <div className="mt-auto flex flex-wrap gap-2.5 pt-14">
                {s.tags.map((t, i) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.06 }}
                    className="rounded-full border border-[#0a0a1a]/10 bg-[#F3F0EE]/60 px-4 py-1.5 text-[12px] font-medium tracking-wide text-[#0a0a1a]/65"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>

              <Link
                href={s.href}
                className="mt-8 inline-flex w-max items-center gap-2 rounded-full border border-[#0a0a1a]/12 bg-[#0a0a1a] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#0a0a1a]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a0a1a]"
              >
                Open practice page
              </Link>
            </div>

            <Link
              href={s.href}
              className="relative block w-full overflow-hidden rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF5812]"
              style={{
                aspectRatio: "4 / 3",
                maxHeight: "min(60svh, 520px)",
              }}
            >
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.08 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.2, ease: EASE }}
              >
                <Image
                  src={s.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={index < 2}
                />
              </motion.div>
              <motion.div
                style={{ height: overlayHeight }}
                className="pointer-events-none absolute inset-x-0 bottom-0 bg-[#FF5812]/85"
                aria-hidden
              />
            </Link>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function ServicesHubSticky() {
  return (
    <section
      data-section="services-sticky"
      data-theme-section="light"
      className="relative w-full border-t border-[#0a0a1a]/[0.06]"
      style={{ backgroundColor: SURFACE }}
      aria-labelledby="services-sticky-heading"
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 pb-8 pt-16 md:px-10 md:pb-10 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: DUR.section, ease: EASE_T.silk }}
        >
          <SectionHeader
            badge="Practices"
            accent={ACCENT}
            headline={
              <span
                id="services-sticky-heading"
                className="text-balance"
                style={{
                  fontSize: "clamp(40px, 7vw, 88px)",
                  lineHeight: 0.94,
                  letterSpacing: "-0.04em",
                }}
              >
                Pick your lane — scroll the stack.
              </span>
            }
            body="Each card pins and hands off to the next. Every practice links to a dedicated delivery page."
          />
        </motion.div>
      </div>

      <div className="relative">
        {SERVICES_HUB.map((s, i) => (
          <StickyServiceCard key={s.id} s={s} index={i} total={SERVICES_HUB.length} />
        ))}
      </div>

      <div className="mx-auto w-full max-w-[1280px] px-6 pb-16 md:px-10 md:pb-20">
        <div className="h-px w-full bg-[#0a0a1a]/[0.08]" />
      </div>
    </section>
  );
}
