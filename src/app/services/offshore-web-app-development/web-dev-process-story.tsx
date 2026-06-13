"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/components/homepage-light/SectionHeader";
import { WEB_DEV_PROCESS, WEB_DEV_VISUALS } from "./web-dev-visuals";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#FF5812" as const;

export default function WebDevProcessStory() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!rootRef.current || !pinRef.current || prefersReducedMotion()) return;

      const stepEls = stepsRef.current?.querySelectorAll(".process-step");
      const imageEls = imagesRef.current?.querySelectorAll(".process-image");
      if (!stepEls?.length || !imageEls?.length) return;

      gsap.set(stepEls, { opacity: 0.2 });
      gsap.set(stepEls[0], { opacity: 1 });
      gsap.set(imageEls, { opacity: 0 });
      gsap.set(imageEls[0], { opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: `+=${WEB_DEV_PROCESS.length * 50}%`,
          pin: pinRef.current,
          scrub: 0.55,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      for (let i = 1; i < stepEls.length; i++) {
        tl.to(stepEls[i - 1], { opacity: 0.2, ease: "none", duration: 1 }, i)
          .to(stepEls[i], { opacity: 1, ease: "none", duration: 1 }, i)
          .to(imageEls[i - 1], { opacity: 0, ease: "none", duration: 1 }, i)
          .to(imageEls[i], { opacity: 1, ease: "none", duration: 1 }, i);
      }
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      data-section="web-dev-process"
      className="relative bg-[#F3F0EE]"
    >
      <div
        ref={pinRef}
        className="mx-auto grid min-h-[100svh] max-w-[1400px] grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-12 lg:py-20"
      >
        <div>
          <SectionHeader
            badge="How we deliver"
            accent={ACCENT}
            headline={
              <>
                Four phases.
                <span className="block text-[#FF5812]">One scroll story.</span>
              </>
            }
            body="Discover, design, build, launch — each phase lights up as you move through the narrative."
          />

          <div ref={stepsRef} className="mt-10 space-y-6">
            {WEB_DEV_PROCESS.map((step) => (
              <article
                key={step.step}
                className="process-step border-l-2 border-[#FF5812]/20 pl-5"
              >
                <p className="text-[11px] font-semibold tracking-[0.2em] text-[#FF5812]">
                  {step.step}
                </p>
                <h3 className="mt-1 text-xl font-semibold tracking-[-0.02em] text-[#0a0a1a]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#0a0a1a]/62">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div
          ref={imagesRef}
          className="relative aspect-[4/5] overflow-hidden rounded-[24px] border border-[#0a0a1a]/[0.08] shadow-[0_30px_80px_-40px_rgba(10,10,26,0.25)] lg:aspect-[3/4]"
        >
          {WEB_DEV_VISUALS.process.map((src, i) => (
            <div
              key={src}
              className="process-image absolute inset-0"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="480px" />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/35 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
