"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WEB_DEV_VISUALS } from "./web-dev-visuals";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const PHRASES = [
  "Ship faster.",
  "Scale safely.",
  "Integrate cleanly.",
  "Demo weekly.",
] as const;

const ACCENTS = ["#FF5812", "#1852FF", "#FF6B00", "#FF5812"] as const;

export default function WebDevKineticHeadlines() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<(HTMLHeadingElement | null)[]>([]);
  const mosaicRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!rootRef.current || !pinRef.current || prefersReducedMotion()) {
        linesRef.current.forEach((el, i) => {
          if (el) el.style.opacity = i === 0 ? "1" : "0";
        });
        return;
      }

      const lines = linesRef.current.filter(Boolean) as HTMLHeadingElement[];
      gsap.set(lines, { opacity: 0, y: 72, filter: "blur(8px)" });
      gsap.set(lines[0], { opacity: 1, y: 0, filter: "blur(0px)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: `+=${PHRASES.length * 50}%`,
          pin: pinRef.current,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      lines.forEach((line, i) => {
        if (i === 0) return;
        const prev = lines[i - 1];
        tl.to(
          prev,
          { opacity: 0, y: -48, filter: "blur(6px)", ease: "none", duration: 1 },
          i,
        ).fromTo(
          line,
          { opacity: 0, y: 72, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", ease: "none", duration: 1 },
          i,
        );
      });

      if (mosaicRef.current) {
        gsap.to(mosaicRef.current, {
          x: -120,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: `+=${PHRASES.length * 50}%`,
            scrub: 0.65,
          },
        });
      }
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      data-section="web-dev-kinetic"
      className="relative overflow-hidden bg-[#0a0a0a]"
      aria-label="Delivery principles"
    >
      <div ref={pinRef} className="relative flex h-[100svh] items-center justify-center">
        <div
          ref={mosaicRef}
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 flex items-center gap-4 opacity-20"
        >
          {WEB_DEV_VISUALS.mosaic.map((src) => (
            <div
              key={src}
              className="relative h-[220px] w-[180px] shrink-0 overflow-hidden rounded-2xl"
            >
              <Image src={src} alt="" fill className="object-cover" sizes="180px" />
            </div>
          ))}
        </div>

        <div className="relative mx-auto h-[min(36vh,240px)] w-full max-w-[1400px] px-4 sm:px-6 lg:px-12">
          {PHRASES.map((line, i) => (
            <h2
              key={line}
              ref={(el) => {
                linesRef.current[i] = el;
              }}
              className="absolute left-4 right-4 top-1/2 -translate-y-1/2 text-center font-semibold leading-[0.88] tracking-[-0.05em] sm:left-6 sm:right-6 lg:left-12 lg:right-12"
              style={{
                fontSize: "clamp(2.75rem, 9vw, 7rem)",
                color: ACCENTS[i],
              }}
            >
              {line}
            </h2>
          ))}
        </div>
      </div>
    </section>
  );
}
