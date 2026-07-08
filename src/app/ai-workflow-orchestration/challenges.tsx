"use client";

import React, { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  Ban,
  Puzzle,
  Gauge,
  ShieldAlert,
  ClipboardCheck,
  Eye,
  type LucideIcon,
} from "lucide-react";
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

interface ChallengeItem {
  id: string;
  icon: LucideIcon;
  title: string;
  challengeText: string;
  solutionText: string;
  frictionMetric: string;
}

const CHALLENGES: ChallengeItem[] = [
  {
    id: "01",
    icon: Ban,
    title: "Manual Business Processes",
    challengeText: "Reduce repetitive, labor-intensive tasks that slow down daily operations.",
    solutionText: "Autonomous agent execution handles data entry, formatting, and standard validations instantly.",
    frictionMetric: "high friction",
  },
  {
    id: "02",
    icon: Puzzle,
    title: "Fragmented Applications",
    challengeText: "Connect disconnected business systems and databases through seamless integrations.",
    solutionText: "Secure API-first orchestrator syncs data across CRM, ERP, SharePoint, and legacy systems.",
    frictionMetric: "data silos",
  },
  {
    id: "03",
    icon: Gauge,
    title: "Slow Decision Making",
    challengeText: "Enable intelligent, AI-driven recommendations and instant operational actions.",
    solutionText: "Real-time LLM reasoning suggests paths, draft responses, and flags exceptions for rapid review.",
    frictionMetric: "delayed SLA",
  },
  {
    id: "04",
    icon: ShieldAlert,
    title: "Human Errors",
    challengeText: "Minimize data entry mistakes and compliance slips caused by manual processing.",
    solutionText: "Automated parsing and validation checks run on every execution to ensure absolute compliance.",
    frictionMetric: "error prone",
  },
  {
    id: "05",
    icon: ClipboardCheck,
    title: "Inefficient Approvals",
    challengeText: "Automate complex, multi-level human-in-the-loop approval workflows.",
    solutionText: "Pauses runs automatically for human approval, sends instant alerts, and resumes once verified.",
    frictionMetric: "idle time",
  },
  {
    id: "06",
    icon: Eye,
    title: "Limited Process Visibility",
    challengeText: "Gain real-time end-to-end monitoring, metrics, and analytics across all runs.",
    solutionText: "Comprehensive trace logs provide auditable visibility and performance charts for every execution.",
    frictionMetric: "black box",
  },
];

const tokens: CSSProperties = {
  ["--bg-base" as string]: "#FFFFFF",
  ["--bg-surface" as string]: "#FFFFFF",
  ["--border" as string]: "rgba(10, 10, 10, 0.06)",
  ["--text-primary" as string]: "#1F2937",
  ["--text-secondary" as string]: "#4B5563",
  ["--accent-amber" as string]: "#F0A83C",
  ["--accent-teal" as string]: "#3ED9B8",
};

function useInView<T extends HTMLElement>(threshold = 0.1) {
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

export default function BusinessChallenges() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

  return (
    <section
      style={tokens}
      className={`${display.variable} ${mono.variable} ${body.variable} relative w-full overflow-hidden bg-[var(--bg-base)] px-6 py-24 text-neutral-800 sm:px-10 lg:px-16 border-t border-neutral-100`}
    >
      {/* ambient glow blobs */}
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-[var(--accent-amber)]/5 blur-[120px]" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-[var(--accent-teal)]/5 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* header */}
        <div className="mb-16 max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-neutral-50 px-3 py-1.5 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-amber)] animate-pulse" />
            <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[var(--text-secondary)]">
              Operational Friction — Status: Diagnosed
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.1] tracking-tight text-neutral-900 sm:text-5xl">
            Business <span className="text-[var(--accent-amber)]">Challenges</span> We Solve
          </h2>
          <p className="font-[family-name:var(--font-body)] mt-4 text-base leading-relaxed text-neutral-500">
            Automating the friction points that drain productivity and delay growth in enterprise operations.
          </p>
        </div>

        {/* Dynamic Interactive Grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CHALLENGES.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(24px)",
                  transitionDelay: inView ? `${index * 80}ms` : "0ms",
                }}
                className="group relative p-[1px] rounded-3xl bg-neutral-100/70 hover:bg-gradient-to-br hover:from-[var(--accent-amber)] hover:to-[var(--accent-teal)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(240,168,60,0.12)] cursor-pointer motion-reduce:transition-none"
              >
                <div className="relative h-[240px] bg-white p-6 sm:p-7 rounded-[calc(1.75rem-1px)] overflow-hidden flex flex-col justify-between">
                  {/* Background Grid Backdrop for tech texture */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-[0.015] group-hover:opacity-[0.03] transition-opacity duration-700"
                    style={{
                      backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
                      backgroundSize: "16px 16px",
                    }}
                  />

                  {/* Ambient Glows behind cards */}
                  <div className="absolute -right-12 -top-12 w-24 h-24 rounded-full bg-[var(--accent-amber)]/5 group-hover:bg-[var(--accent-teal)]/10 blur-2xl transition-colors duration-700 pointer-events-none" />

                  {/* Large Watermark ID */}
                  <span className="absolute top-4 right-6 font-[family-name:var(--font-mono)] text-5xl font-black tracking-tight text-neutral-100/60 select-none group-hover:text-[var(--accent-teal)]/10 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    {item.id}
                  </span>

                  {/* Inner Content Area */}
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    {/* Top Section: Category / Tag */}
                    <div className="flex items-center gap-2">
                      <span className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-wider text-neutral-400 group-hover:text-[var(--accent-teal)] transition-colors duration-500">
                        Challenge {item.id}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-neutral-200 group-hover:bg-[var(--accent-teal)] transition-colors duration-500" />
                      <span className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-wider text-neutral-400/80 group-hover:hidden">
                        {item.frictionMetric}
                      </span>
                      <span className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-wider text-[var(--accent-teal)] font-semibold hidden group-hover:inline animate-pulse">
                        Resolved
                      </span>
                    </div>

                    {/* Mid Section: Icon & Title */}
                    <div className="mt-4 flex items-center gap-3">
                      {/* Animated Icon Enclosure */}
                      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-neutral-100 bg-neutral-50/50 group-hover:border-[var(--accent-teal)]/20 group-hover:bg-[var(--accent-teal)]/5 transition-all duration-500">
                        <Icon
                          className="text-[var(--accent-amber)] group-hover:text-[var(--accent-teal)] transition-colors duration-500 shrink-0"
                          size={20}
                          strokeWidth={1.5}
                        />
                      </div>
                      <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-neutral-800 group-hover:text-neutral-900 transition-colors duration-300">
                        {item.title}
                      </h3>
                    </div>

                    {/* Bottom Section: Double State Description (Challenge vs Solution) */}
                    <div className="relative mt-5 h-24 overflow-hidden">
                      {/* Default State: Challenge */}
                      <p className="absolute inset-0 font-[family-name:var(--font-body)] text-[14px] leading-relaxed text-neutral-500 group-hover:opacity-0 group-hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                        {item.challengeText}
                      </p>

                      {/* Hover State: Solution */}
                      <p className="absolute inset-0 font-[family-name:var(--font-body)] text-[14px] leading-relaxed text-neutral-600 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                        <span className="font-semibold text-[var(--accent-teal)] block mb-1 text-xs tracking-wider uppercase font-[family-name:var(--font-mono)]">
                          Softree Solution:
                        </span>
                        {item.solutionText}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
