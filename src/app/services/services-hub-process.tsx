"use client";

import SectionHeader from "@/components/homepage-light/SectionHeader";
import { motion, useReducedMotion } from "framer-motion";
import { DUR, EASE_T, REVEAL, VIEWPORT } from "@/lib/motion";

const STEPS = [
  {
    id: "01",
    title: "Discovery & planning",
    desc: "We align on goals, users, and scope — then define a clear delivery roadmap.",
  },
  {
    id: "02",
    title: "UX & interface design",
    desc: "Wireframes and polished UI that balance usability with your brand.",
  },
  {
    id: "03",
    title: "Engineering & development",
    desc: "Scalable, secure builds with modern stacks and continuous integration.",
  },
  {
    id: "04",
    title: "Testing & QA",
    desc: "Rigorous validation across devices, performance, and security.",
  },
  {
    id: "05",
    title: "Launch & improvement",
    desc: "Confident releases with ongoing support and iteration.",
  },
] as const;

export default function ServicesHubProcess() {
  const reduced = useReducedMotion();

  return (
    <section
      data-section="delivery-process"
      className="relative w-full bg-[#FFFFFF] py-16 md:py-24 lg:py-28"
      aria-labelledby="services-process-heading"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <SectionHeader
          badge="How we work"
          accent="#FF5812"
          headline={
            <span id="services-process-heading">
              Delivery built for clarity at every step.
            </span>
          }
          body="Fixed scope, weekly demos, and direct access to the engineers on your project — from first workshop to production."
          className="mb-12 md:mb-16"
        />

        <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {STEPS.map((step, idx) => (
            <motion.li
              key={step.id}
              className="relative flex flex-col border-t border-[#0a0a1a]/10 pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6 lg:first:border-l-0 lg:first:pl-0"
              initial={reduced ? false : REVEAL.up.initial}
              whileInView={reduced ? undefined : REVEAL.up.animate}
              viewport={VIEWPORT.default}
              transition={{
                duration: DUR.card,
                ease: EASE_T.out,
                delay: reduced ? 0 : idx * 0.06,
              }}
            >
              <span
                className="text-[11px] font-bold tabular-nums tracking-[0.12em] text-[#FF5812]"
                aria-hidden
              >
                {step.id}
              </span>
              <h3 className="mt-3 text-base font-semibold leading-snug text-[#0a0a1a]">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#0a0a1a]/60">
                {step.desc}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
