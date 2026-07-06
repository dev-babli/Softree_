"use client";

/**
 * Hero2026 — the claim. Story-spec §1.
 * - SSR-visible headline (LCP registers on first paint, always).
 * - SplitText takeover runs in useLayoutEffect AFTER document.fonts.ready
 *   (raced against a 2.5s timeout — if fonts are late, entrance is skipped).
 * - Broken 3-row grid; "ship" is the knocked-out stroke word.
 * - Velocity effects (headline skewX ≤ 3°, ember drift) are IO-gated:
 *   zero work when the hero is offscreen. Scroll-delta fallback is used
 *   instead of reaching into the site's Lenis instance.
 * - Reduced motion: single 250ms opacity fade, no split/skew/drift.
 */
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Link from "next/link";
import { useRef } from "react";

import { DUR, EASE, prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(SplitText);

const FONTS_TIMEOUT_MS = 2500;

export default function Hero2026() {
  const scope = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      const headline = headlineRef.current;
      if (!root || !headline) return;

      if (prefersReducedMotion()) {
        // Reduced motion: opacity-only ≤ 300ms on the secondary elements.
        gsap.from("[data-hero-fade]", { opacity: 0, duration: 0.25, ease: EASE.out });
        return;
      }

      let cancelled = false;
      let split: SplitText | null = null;

      // Race fonts.ready against a hard timeout — the headline must never
      // be hidden while we wait (it is SSR-visible until this resolves).
      const timeout = new Promise<"timeout">((res) => setTimeout(() => res("timeout"), FONTS_TIMEOUT_MS));
      Promise.race([document.fonts.ready.then(() => "fonts" as const), timeout]).then((winner) => {
        if (cancelled || winner === "timeout") return; // fonts late → skip entrance entirely

        split = new SplitText(headline, { type: "lines", linesClass: "hero-line" });
        for (const line of split.lines) {
          const mask = document.createElement("div");
          mask.style.overflow = "hidden";
          line.parentNode?.insertBefore(mask, line);
          mask.appendChild(line);
        }

        const tl = gsap.timeline({ defaults: { ease: EASE.silk } });
        tl.from(split.lines, { yPercent: 100, duration: 1.1, stagger: 0.09 })
          .from("[data-hero-fade]", { opacity: 0, y: 12, duration: 0.5, stagger: 0.08, ease: EASE.out }, "-=0.55");
      });

      // ── Velocity effects: scroll-delta fallback, gated to hero visibility ──
      let heroVisible = true;
      let lastY = window.scrollY;
      let rafId: number | null = null;

      const skewTo = gsap.quickTo(headline, "skewX", { duration: 0.5, ease: "power3" });
      const emberEl = root.querySelector("[data-ember]");
      const emberX = emberEl
        ? gsap.quickTo(emberEl, "x", { duration: 0.8, ease: "power3" })
        : () => undefined;

      const loop = () => {
        if (!heroVisible) {
          rafId = null;
          return;
        }
        const y = window.scrollY;
        const v = y - lastY; // px per frame
        lastY = y;
        const clamped = Math.max(-3, Math.min(3, v * 0.06));
        skewTo(clamped);
        emberX(clamped * -8);
        rafId = requestAnimationFrame(loop);
      };

      const io = new IntersectionObserver(([entry]) => {
        heroVisible = entry.isIntersecting;
        if (heroVisible && rafId === null) {
          lastY = window.scrollY;
          rafId = requestAnimationFrame(loop);
        } else if (!heroVisible) {
          skewTo(0);
          emberX(0);
        }
      });
      io.observe(root);

      return () => {
        cancelled = true;
        io.disconnect();
        if (rafId !== null) cancelAnimationFrame(rafId);
        split?.revert();
      };
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      id="hero"
      aria-labelledby="hero-headline"
      className="ember-grain relative flex min-h-screen flex-col justify-center overflow-hidden px-6 sm:px-10 lg:px-24"
    >
      {/* Ambient ember — pure CSS, IO-gated drift */}
      <div data-ember className="ember-glow" style={{ ["--ember-x" as string]: "78%", ["--ember-y" as string]: "82%" }} />

      {/* Hairline frame */}
      <div aria-hidden className="hairline pointer-events-none absolute inset-4 sm:inset-6" />

      <p data-hero-fade className="font-mono-meta mb-8 text-white/55">
        SOFTREE TECHNOLOGY — ENGINEERING, HONESTLY
      </p>

      <h1
        id="hero-headline"
        ref={headlineRef}
        className="max-w-[14ch] font-semibold text-white"
        style={{
          fontSize: "clamp(3rem, 10vw, 9.5rem)",
          lineHeight: 0.95,
          letterSpacing: "-0.03em",
        }}
      >
        {/* Broken 3-row grid: rows offset; "ship" knocked out in stroke */}
        <span className="block">We build the</span>
        <span className="block pl-[8vw]">
          offshore teams that <span className="text-stroke">ship</span>
        </span>
        <span className="block pl-[3vw]">
          real AI<span className="text-[--softree-accent,#ff7a2f]">.</span>
        </span>
      </h1>

      <p data-hero-fade className="mt-8 max-w-[52ch] text-[1.0625rem] leading-[1.65] text-white/55">
        Senior engineering pods in 2 weeks, run from our delivery hub — with applied-AI products
        like Avoora as proof we ship, not slideware.
      </p>

      <div data-hero-fade className="mt-10">
        <Link
          href="/contact"
          className="font-mono-meta inline-flex min-h-11 items-center gap-2 text-white/75 transition-colors duration-200 hover:text-[#ff7a2f] focus-visible:text-[#ff7a2f] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#ff7a2f]"
        >
          <span aria-hidden>→</span> START A CONVERSATION
        </Link>
      </div>

      <div
        data-hero-fade
        className="font-mono-meta absolute bottom-8 left-6 right-6 flex flex-wrap gap-x-6 gap-y-2 text-white/35 sm:left-10 sm:right-10 lg:left-24 lg:right-24"
      >
        <span>OFFSHORE ENGINEERING</span>
        <span aria-hidden>/</span>
        <span>APPLIED AI</span>
        <span aria-hidden>/</span>
        <span>140+ ENGINEERS</span>
        <span aria-hidden>/</span>
        {/* TODO(verify): confirm hub coordinates before ship (brief follow-up #3) */}
        <span>24°51'N 67°00'E</span>
      </div>
    </section>
  );
}
