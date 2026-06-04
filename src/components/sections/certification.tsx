"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/components/homepage-light/SectionHeader";
import CertificationLogo from "@/components/homepage-light/CertificationLogo";
import { CERTIFICATION_LOGOS } from "@/lib/certifications";
import { DUR, EASE, STAGGER, prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const SURFACE = "#F3F0EE";
const ACCENT_BLUE = "#1852FF";

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

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
      data-theme-section="light"
      aria-labelledby="certifications-heading"
      className="relative w-full overflow-hidden border-t border-[#0a0a1a]/[0.06] py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: SURFACE }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(40% 45% at 50% 0%, rgba(24,82,255,0.05), transparent 70%)`,
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-12">
        <div
          ref={headingRef}
          className="mx-auto mb-10 max-w-2xl text-center md:mb-14"
        >
          <SectionHeader
            badge="Accreditations"
            accent={ACCENT_BLUE}
            headline={
              <span id="certifications-heading" className="text-balance">
                Certifications & Recognitions
              </span>
            }
            body="Trusted standards that reinforce our focus on security, compliance, and operational excellence."
            className="!items-center [&_p]:mx-auto"
          />
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-6 md:gap-6"
        >
          {CERTIFICATION_LOGOS.map((item) => (
            <div
              key={item.alt}
              className="
                group relative flex h-[160px] items-center justify-center
                rounded-2xl border border-[#0a0a1a]/10 bg-white
                transition-[transform,box-shadow,border-color]
                duration-300 ease-out
                hover:-translate-y-0.5
                hover:border-[#0a0a1a]/15
                hover:shadow-[0_8px_28px_-12px_rgba(10,10,26,0.12)]
              "
            >
              <CertificationLogo
                item={item}
                className="
                  relative z-10 max-w-[140px] object-contain sm:max-w-[160px]
                  opacity-85 transition-opacity duration-300 ease-out
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
