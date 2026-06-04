"use client";

import { useRef, type ReactNode } from "react";
import { useInView } from "framer-motion";
import { useClarityCardParallax } from "@/components/sections/ClarityControlSection";
import { VIEWPORT } from "@/lib/motion";

export function ConceptFrame({
  id,
  roman,
  title,
  thesis,
  children,
}: {
  id: string;
  roman: string;
  title: string;
  thesis: string;
  children: (ctx: { inView: boolean }) => ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, VIEWPORT.default);
  useClarityCardParallax(ref);

  return (
    <section
      ref={ref}
      id={id}
      className="relative min-h-[100dvh] w-full overflow-x-clip border-b border-[#0a0a1a]/10 bg-[#F3F0EE]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(10,10,26,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,10,26,0.04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div className="relative mx-auto max-w-[1500px] px-6 py-20 md:py-28 lg:px-10 lg:py-36">
        <header className="mb-16 md:mb-24 lg:mb-28">
          <div className="flex flex-wrap items-start gap-6 md:gap-10">
            <span className="font-mono text-[clamp(48px,10vw,120px)] font-medium leading-none tracking-[-0.06em] text-[#0a0a1a]/[0.07]">
              {roman}
            </span>
            <div className="max-w-[640px] pt-2 md:pt-6">
              <h2 className="text-[13px] font-semibold uppercase tracking-[0.24em] text-[#FF5812]">
                {title}
              </h2>
              <p className="mt-4 text-pretty text-[15px] leading-[1.7] text-[#0a0a1a]/55 md:text-[16px]">
                {thesis}
              </p>
            </div>
          </div>
        </header>
        {children({ inView })}
      </div>
    </section>
  );
}
