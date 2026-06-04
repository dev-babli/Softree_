"use client";

import { useRef, type ReactNode } from "react";
import { useInView } from "framer-motion";
import {
  HOME_INTRO_SURFACE,
  useClarityCardParallax,
} from "@/components/sections/ClarityControlSection";
import { VIEWPORT } from "@/lib/motion";

export function VariantFrame({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: string;
  title: string;
  children: (ctx: { inView: boolean }) => ReactNode;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, VIEWPORT.default);
  useClarityCardParallax(sectionRef);

  return (
    <section
      ref={sectionRef}
      id={id}
      data-variant={id}
      className="relative w-full overflow-x-clip"
      style={{ backgroundColor: HOME_INTRO_SURFACE }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(10,10,26,0.04) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 h-[480px] w-[480px] rounded-full opacity-40"
        style={{
          background: "radial-gradient(closest-side, rgba(255,88,18,0.08), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-12 lg:py-40">
        <div className="mb-14 flex items-center gap-4 md:mb-20">
          <span className="tabular-nums text-[11px] font-medium text-[#0a0a1a]/30">{index}</span>
          <span className="h-px flex-1 max-w-[120px] bg-[#0a0a1a]/10" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF5812]">
            {title}
          </span>
        </div>
        {children({ inView })}
      </div>
    </section>
  );
}
