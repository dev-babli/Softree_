"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { SERVICES_HUB_TICKER } from "@/data/services-hub";
import { prefersReducedMotion } from "@/lib/motion";

const ACCENT = "#FF5812";

export default function ServicesHubHero() {
  const [tickerIndex, setTickerIndex] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (reduced) return;
    const interval = setInterval(() => {
      setTickerIndex((i) => (i + 1) % SERVICES_HUB_TICKER.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [reduced]);

  const tickerWord = SERVICES_HUB_TICKER[tickerIndex];

  return (
    <section
      role="banner"
      aria-labelledby="services-hero-heading"
      className="relative flex min-h-[min(92vh,880px)] flex-col justify-center overflow-hidden bg-[#0a0a0a] pt-[100px] pb-16 md:pb-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:52px_52px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[20%] left-1/2 h-[500px] w-[min(800px,90vw)] -translate-x-1/2 rounded-full opacity-40"
        style={{
          background: `radial-gradient(ellipse, color-mix(in srgb, ${ACCENT} 12%, transparent) 0%, transparent 65%)`,
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <span
          className="mb-6 inline-flex w-max items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em]"
          style={{
            color: ACCENT,
            borderColor: "color-mix(in srgb, #FF5812 20%, transparent)",
            backgroundColor: "color-mix(in srgb, #FF5812 8%, transparent)",
          }}
        >
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: ACCENT }}
          />
          Our services
        </span>

        <h1
          id="services-hero-heading"
          className="max-w-[14ch] text-[#fafaf9] font-semibold leading-[0.9] tracking-[-0.04em]"
          style={{ fontSize: "clamp(40px, 7vw, 96px)" }}
        >
          Enterprise software,
          <br />
          <span style={{ color: ACCENT }}>{tickerWord}</span>
          <span className="text-white/45">, delivered.</span>
        </h1>

        <p className="mt-6 max-w-[540px] text-base leading-relaxed text-white/55">
          From Microsoft 365 and Power Platform to AI agents and modern web —
          we design, build, and ship systems your teams rely on every day.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#FF5812] px-7 py-3.5 text-sm font-semibold text-white transition-[transform,background-color] duration-200 hover:bg-[#FF6B00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5812] active:scale-[0.98]"
          >
            Talk to our team
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white/80 backdrop-blur-md transition-[transform,border-color,color] duration-200 hover:border-white/35 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40 active:scale-[0.98]"
          >
            View case studies
          </Link>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-4">
          {[
            { value: "12", label: "Service practices" },
            { value: "50+", label: "Delivered projects" },
            { value: "M365", label: "Certified stack" },
            { value: "AI-first", label: "Engineering" },
          ].map((stat) => (
            <li
              key={stat.label}
              className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 backdrop-blur-sm"
            >
              <p
                className="text-[#fafaf9] font-semibold tabular-nums leading-none"
                style={{ fontSize: "clamp(20px, 2.5vw, 26px)" }}
              >
                {stat.value}
              </p>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/40">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#F3F0EE]"
      />
    </section>
  );
}
