"use client";
import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DUR, STAGGER, prefersReducedMotion } from "@/lib/motion";
import { SectionHeader } from "@/components/homepage-light/SectionHeader";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────────
 * Certifications & Recognitions
 *
 * Task 4.7 (homepage-about-design-language):
 *   - Outer surface restricted to `#FFFFFF` (Design_Tokens canvas, Req 1.1).
 *   - Section_Rhythm vertical padding `py-20 md:py-24 lg:py-28` and inner
 *     gutter `px-6 lg:px-12` inside a centered `max-w-[1400px]` container
 *     (Req 1.4).
 *   - Heading block replaced with the shared `SectionHeader` (badge →
 *     headline → body) using accent `#1852FF` (Req 1.3, 1.7).
 *   - Cards rendered as small white tiles with hairline border
 *     `border-[#0a0a1a]/10` and soft shadow on hover.
 *   - All animations consume Motion_System tokens (`EASE.silk` / `EASE.out`,
 *     `DUR.*`, `STAGGER.default`) from `src/lib/motion.ts`; reduced-motion is
 *     honored via the shared `prefersReducedMotion` helper (Req 1.6, 4.1,
 *     10.1).
 *   - Every visible text string, image asset, and link `href` is preserved
 *     (Req 3.2, 3.6).
 * ───────────────────────────────────────────────────────────────── */

const certifications = [
  {
    src: "https://www.softreetechnology.com/wp-content/uploads/2024/12/STPI.webp",
    alt: "STPI",
  },
  {
    src: "https://www.softreetechnology.com/wp-content/uploads/2024/12/startupindia.webp",
    alt: "Startup India",
  },
  {
    src: "https://www.softreetechnology.com/wp-content/uploads/2024/12/MCPD.webp",
    alt: "MCPD",
  },
  {
    src: "https://www.softreetechnology.com/wp-content/uploads/2024/12/MCTS.webp",
    alt: "MCTS",
  },
  {
    src: "https://www.softreetechnology.com/wp-content/uploads/2024/12/ISO-9001-2015.webp",
    alt: "ISO 9001",
  },
  {
    src: "https://www.softreetechnology.com/wp-content/uploads/2024/12/ISO-27001-2022.webp",
    alt: "ISO 27001",
  },
];

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 24,
        duration: DUR.section,
        ease: EASE.silk,
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
      });

      const cards = gridRef.current?.children;
      if (cards) {
        gsap.from(Array.from(cards), {
          opacity: 0,
          y: 20,
          duration: DUR.card,
          stagger: STAGGER.default,
          ease: EASE.out,
          scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-section="certifications"
      className="relative w-full overflow-hidden bg-[#FFFFFF] py-20 md:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* Section header — badge → headline → body */}
        <div ref={headingRef} className="mb-12 md:mb-16">
          <SectionHeader
            badge="Accreditations"
            accent="#1852FF"
            headline="Certifications & Recognitions"
            body="Trusted standards that reinforce our focus on security, compliance, and operational excellence."
          />
        </div>

        {/* Light tile grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-6 md:gap-6"
        >
          {certifications.map((item) => (
            <div
              key={item.alt}
              className="
                group relative flex h-[180px] items-center justify-center
                rounded-2xl border border-[#0a0a1a]/10 bg-white
                transition-[transform,box-shadow,border-color]
                duration-300 ease-out
                hover:-translate-y-0.5
                hover:border-[#0a0a1a]/15
                hover:shadow-[0_8px_28px_-12px_rgba(10,10,26,0.12)]
              "
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={220}
                height={220}
                className="
                  relative z-10 max-w-[160px] object-contain
                  opacity-80 transition-opacity duration-300 ease-out
                  group-hover:opacity-100
                "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
