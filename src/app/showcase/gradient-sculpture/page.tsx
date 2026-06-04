"use client";

import Link from "next/link";
import GradientSculpture from "@/components/showcase/GradientSculpture";

/** Gradient sculpture showcase — optimized reference art frame */
export default function GradientSculptureShowcasePage() {
  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#0a0a0a]">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-between px-6 py-4 lg:px-12">
        <Link
          href="/showcase"
          className="pointer-events-auto text-[12px] font-medium text-[#0a0a1a]/40 transition-colors hover:text-[#0a0a1a]"
        >
          ← Showcase
        </Link>
        <Link
          href="/"
          className="pointer-events-auto text-[12px] font-medium text-[#0a0a1a]/40 transition-colors hover:text-[#0a0a1a]"
        >
          Homepage
        </Link>
      </div>

      <main className="mx-auto flex min-h-screen max-w-[1200px] flex-col justify-center px-6 py-24 lg:px-10">
        <header className="mb-10 max-w-xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#5F48FF]/70">
            Component showcase
          </p>
          <h1 className="mt-3 text-[clamp(28px,4vw,44px)] font-medium leading-[1.08] tracking-[-0.03em] text-[#0a0a0a]">
            Gradient sculpture
          </h1>
          <p className="mt-4 text-[15px] leading-[1.65] text-[#0a0a0a]/55">
            Reference sculpture art delivered through next/image (AVIF/WebP) with CSS-only
            parallax — no WebGL, no animation loops, no heavy bundles.
          </p>
        </header>

        <GradientSculpture />

        <section className="mt-12 grid gap-6 border-t border-[#0a0a0a]/8 pt-10 sm:grid-cols-2">
          <div>
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[#0a0a0a]/45">
              Palette
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {["#5F48FF", "#8D7CFF", "#B7A9FF", "#F1EFFF", "#FFC48A", "#FFDCC0", "#FFF2E7"].map(
                (hex) => (
                  <li
                    key={hex}
                    className="flex items-center gap-2 rounded-full border border-[#0a0a0a]/8 bg-white/60 px-3 py-1.5 text-[11px] font-medium tabular-nums text-[#0a0a0a]/70"
                  >
                    <span
                      className="h-3.5 w-3.5 rounded-full ring-1 ring-[#0a0a0a]/10"
                      style={{ backgroundColor: hex }}
                    />
                    {hex}
                  </li>
                ),
              )}
            </ul>
          </div>
          <div>
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[#0a0a0a]/45">
              Techniques
            </h2>
            <ul className="mt-4 space-y-2 text-[14px] leading-[1.6] text-[#0a0a0a]/55">
              <li>next/image with responsive sizes + priority LCP</li>
              <li>GPU composited translate3d parallax</li>
              <li>Static SVG grain overlay</li>
              <li>prefers-reduced-motion safe</li>
              <li>Zero Three.js / transmission shader cost</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
