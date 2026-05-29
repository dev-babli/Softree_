"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "@/components/homepage-light/SectionHeader";
import { DUR, EASE_T, REVEAL, VIEWPORT } from "@/lib/motion";

/**
 * Tech Stack section.
 *
 * Restyled to the About design language (Task 4.5):
 *   • Outer surface → `#F3F0EE` (warm break, mirroring `AboutTeamSection`)
 *   • Logos render on a single white card (`rounded-[28px]`) with hairline
 *     border (`border-[#0a0a1a]/10`) and the soft About card shadow
 *   • Heading replaced with shared `SectionHeader`, accent `#FF6B00`
 *   • Marquee uses white edge-fade gradients (per Requirement 4.6) and a
 *     `data-marquee-track` attribute so the global reduced-motion override
 *     can pause it
 *   • All entrance motion uses Motion_System tokens from `@/lib/motion`
 *
 * Visible content (text strings, image assets, link `href`, CTA destination)
 * is preserved unchanged per Requirement 3.2.
 */

const techStack = [
  // Languages
  { name: "Python", img: "https://cdn.simpleicons.org/python" },

  { name: "C#", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },

  // Backend / Frameworks
  { name: "Node.js", img: "https://cdn.simpleicons.org/nodedotjs" },
  { name: ".NET", img: "https://cdn.simpleicons.org/dotnet" },

  { name: "Django", img: "https://cdn.simpleicons.org/django" },
  { name: "GraphQL", img: "https://cdn.simpleicons.org/graphql" },

  // Frontend
  { name: "React", img: "https://cdn.simpleicons.org/react" },
  { name: "Next.js", img: "https://cdn.simpleicons.org/nextdotjs" },
  { name: "Vue.js", img: "https://cdn.simpleicons.org/vuedotjs" },

  // Mobile
  { name: "React Native", img: "https://cdn.simpleicons.org/react" },

  // Microsoft Ecosystem
  {
    name: "SharePoint",
    img: "/images/sharepoint.webp",
  },
  { name: "Power Apps", img: "/images/power-apps.webp" },
  { name: "Power Automate", img: "/images/power-auto.webp" },
];

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, VIEWPORT.default);

  return (
    <section
      ref={sectionRef}
      data-section="tech-stack"
      className="relative w-full overflow-hidden bg-[#F3F0EE] py-20 md:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* Header — badge → headline → body, per Requirement 1.7 */}
        <motion.div
          data-reveal
          initial={REVEAL.up.initial}
          animate={isInView ? REVEAL.up.animate : REVEAL.up.initial}
          transition={{ duration: DUR.section, ease: EASE_T.silk }}
          className="mb-12 md:mb-16"
        >
          <SectionHeader
            badge="Tech Stack"
            accent="#FF6B00"
            headline={
              <>
                From MVPs to Enterprise Solutions
                <span className="block text-[#FF6B00]">Softree Builds It All</span>
              </>
            }
            body="At Softree, we combine modern frontend frameworks, robust backend systems, cloud-native architecture, DevOps automation, and AI innovation to deliver scalable solutions — from fast MVP launches to secure, enterprise-grade platforms."
          />
        </motion.div>

        {/* Single white card containing the marquee + CTA */}
        <motion.div
          data-reveal
          initial={REVEAL.up.initial}
          animate={isInView ? REVEAL.up.animate : REVEAL.up.initial}
          transition={{ duration: DUR.section, ease: EASE_T.silk, delay: 0.1 }}
          className="
            relative overflow-hidden
            rounded-[28px]
            border border-[#0a0a1a]/10
            bg-white
            shadow-[0_8px_28px_-12px_rgba(10,10,26,0.12)]
            px-4 sm:px-6 md:px-10 lg:px-14
            py-12 md:py-16
          "
        >
          {/* Marquee */}
          <div className="relative overflow-hidden">
            {/* White edge fades — Requirement 4.6 */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-20 md:w-24"
              style={{ background: "linear-gradient(90deg, #fff 0%, transparent 100%)" }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-20 md:w-24"
              style={{ background: "linear-gradient(270deg, #fff 0%, transparent 100%)" }}
            />

            <style>{`
              @media (prefers-reduced-motion: no-preference) {
                .tech-marquee { animation: techScroll 36s linear infinite; }
                .tech-marquee:hover { animation-play-state: paused; }
                @keyframes techScroll {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
              }
              @media (prefers-reduced-motion: reduce) {
                .tech-marquee {
                  animation: none !important;
                  transform: none !important;
                }
              }
            `}</style>

            <div
              data-marquee-track
              className="tech-marquee flex w-max gap-6 md:gap-8"
            >
              {[...techStack, ...techStack].map((tech, i) => (
                <div
                  key={i}
                  className="
                    flex h-[120px] min-w-[140px] md:min-w-[160px]
                    flex-col items-center justify-center gap-3
                    rounded-2xl
                    border border-[#0a0a1a]/10
                    bg-white
                    shadow-[0_4px_14px_-8px_rgba(10,10,26,0.08)]
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:shadow-[0_8px_28px_-12px_rgba(10,10,26,0.16)]
                  "
                >
                  <img
                    src={tech.img}
                    alt={tech.name}
                    className="h-12 w-12 object-contain"
                  />
                  <span className="text-sm font-medium text-[#0a0a1a]">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA — orange-fill primary, preserves /services/mvp destination */}
          <div className="mt-12 text-center md:mt-16">
            <a
              href="/services/mvp"
              className="
                group inline-flex items-center justify-center gap-2
                rounded-full
                bg-[#FF6B00]
                px-8 py-3.5
                text-sm font-semibold text-white
                shadow-lg
                transition-all duration-300
                hover:bg-[var(--legacy-e66000)] hover:scale-[1.02]
                active:scale-[0.97]
              "
            >
              Explore all Technologies
              <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
