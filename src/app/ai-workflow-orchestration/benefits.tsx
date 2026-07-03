"use client";

/**
 * Benefits.tsx
 * ------------------------------------------------------------------
 * Design concept: "Resolution Report" (Light Mode Redesign)
 *
 * Pairs with BusinessChallenges.tsx — that section diagnoses problems
 * (amber → teal on interaction); this one reads out the resolved
 * state. Two panels, two idioms for the same idea:
 *
 *   Business Benefits  → a hand-drawn checklist: each ring draws
 *                         itself closed on scroll, like a box being
 *                         ticked off in real time.
 *   Technical Benefits → a terminal boot log: lines print in one by
 *                         one, each closing with an [ OK ], cursor
 *                         blinking once the scan completes.
 * ------------------------------------------------------------------
 */

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Space_Grotesk, IBM_Plex_Mono, Inter } from "next/font/google";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});
const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

/* ------------------------------------------------------------------ */
/* Tokens                                                              */
/* ------------------------------------------------------------------ */

const tokens: CSSProperties = {
  ["--bg-base" as string]: "#FFFFFF",
  ["--bg-surface" as string]: "#FFFFFF",
  ["--bg-terminal" as string]: "#0A0B0D", // High-tech dark terminal
  ["--border" as string]: "rgba(10, 10, 10, 0.06)",
  ["--border-terminal" as string]: "rgba(255, 255, 255, 0.08)",
  ["--text-primary" as string]: "#1F2937",
  ["--text-secondary" as string]: "#4B5563",
  ["--accent-amber" as string]: "#F0A83C",
  ["--accent-teal" as string]: "#3ED9B8",
};

/* ------------------------------------------------------------------ */
/* Data                                                                 */
/* ------------------------------------------------------------------ */

const businessBenefits = [
  "Reduce operational costs",
  "Accelerate business processes",
  "Increase employee productivity",
  "Improve customer satisfaction",
  "Eliminate repetitive work",
  "Faster approvals",
];

const technicalBenefits = [
  "Secure enterprise integrations",
  "Scalable cloud architecture",
  "API-first design",
  "Real-time monitoring",
  "Modular workflows",
  "Easy maintenance",
];

/* ------------------------------------------------------------------ */
/* useInView hook                                                       */
/* ------------------------------------------------------------------ */

function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ------------------------------------------------------------------ */
/* Check ring — draws itself closed, then ticks, when scrolled into view */
/* ------------------------------------------------------------------ */

function CheckRing({ revealed, delay }: { revealed: boolean; delay: number }) {
  const circumference = 2 * Math.PI * 8;
  return (
    <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
      <svg viewBox="0 0 20 20" className="h-6 w-6 -rotate-90">
        <circle cx="10" cy="10" r="8" fill="none" stroke="rgba(10,10,10,0.08)" strokeWidth="1.5" />
        <circle
          cx="10"
          cy="10"
          r="8"
          fill="none"
          stroke="var(--accent-teal)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={revealed ? 0 : circumference}
          className="transition-[stroke-dashoffset] duration-700 ease-out motion-reduce:transition-none"
          style={{ transitionDelay: `${delay}ms` }}
        />
      </svg>
      <svg
        viewBox="0 0 20 20"
        className="absolute h-3 w-3 transition-opacity duration-300 motion-reduce:transition-none"
        style={{ opacity: revealed ? 1 : 0, transitionDelay: `${delay + 550}ms` }}
      >
        <path
          d="M5 10 L8.5 13.5 L15 6"
          fill="none"
          stroke="var(--accent-teal)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Business Benefits panel                                             */
/* ------------------------------------------------------------------ */

function BusinessPanel() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-7 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--text-primary)]">
          Business Benefits
        </h3>
        <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">
          Outcomes
        </span>
      </div>
      <ul className="flex flex-col">
        {businessBenefits.map((item, i) => (
          <li
            key={item}
            className="flex items-center gap-3.5 border-b border-[var(--border)] py-3.5 last:border-none"
          >
            <CheckRing revealed={inView} delay={i * 90} />
            <span className="font-[family-name:var(--font-body)] text-[15px] font-medium text-[var(--text-primary)]">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Technical Benefits panel — terminal boot log                        */
/* ------------------------------------------------------------------ */

function TechnicalPanel() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const lineDelay = 140;
  const cursorDelay = technicalBenefits.length * lineDelay + 250;

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl border border-[var(--border-terminal)] bg-[var(--bg-terminal)] shadow-md"
    >
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-[var(--border-terminal)] px-5 py-3.5 bg-black/45">
        <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]" />
        <span className="ml-2 font-[family-name:var(--font-mono)] text-[11px] tracking-wide text-neutral-400">
          technical_benefits.log
        </span>
      </div>

      {/* log body */}
      <div className="px-6 py-6 sm:px-7">
        <div className="flex flex-col gap-3">
          {technicalBenefits.map((item, i) => (
            <div
              key={item}
              className="flex items-baseline gap-2.5 font-[family-name:var(--font-mono)] text-[13px] transition-all duration-500 ease-out motion-reduce:transition-none"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateX(0)" : "translateX(-8px)",
                transitionDelay: `${i * lineDelay}ms`,
              }}
            >
              <span className="text-[var(--accent-amber)] font-bold">{">"}</span>
              <span className="text-neutral-300 font-medium">{item}</span>
              <span className="ml-auto shrink-0 tracking-widest text-[var(--accent-teal)] font-bold">
                [ OK ]
              </span>
            </div>
          ))}
        </div>

        <div
          className="mt-4 flex items-center gap-2 transition-opacity duration-300 motion-reduce:transition-none"
          style={{ opacity: inView ? 1 : 0, transitionDelay: `${cursorDelay}ms` }}
        >
          <span className="font-[family-name:var(--font-mono)] text-[13px] text-neutral-500">
            scan complete
          </span>
          <span className="h-3.5 w-[7px] animate-pulse bg-[var(--accent-teal)]" />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

export default function Benefits() {
  return (
    <section
      style={tokens}
      className={`${display.variable} ${mono.variable} ${body.variable} bg-[var(--bg-base)] px-6 py-24 sm:px-10 lg:px-16 border-t border-neutral-100`}
    >
      <div className="mx-auto max-w-6xl">
        {/* header */}
        <div className="mb-14 max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-neutral-50 px-3 py-1.5 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-teal)]" />
            <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[var(--text-secondary)]">
              Resolution report — status: optimal
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.1] tracking-tight text-neutral-900 sm:text-5xl">
            Operational <span className="text-[#F0A83C]">Benefits</span>
          </h2>
          <p className="mt-4 font-[family-name:var(--font-body)] text-base leading-relaxed text-neutral-500">
            What changes once the friction is gone — for the business, and for the systems
            running underneath it.
          </p>
        </div>

        {/* panels */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <BusinessPanel />
          <TechnicalPanel />
        </div>
      </div>
    </section>
  );
}