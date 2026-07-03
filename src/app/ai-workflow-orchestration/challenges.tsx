"use client";

import React from "react";
import {
  Ban,
  Puzzle,
  Gauge,
  ShieldAlert,
  ClipboardCheck,
  Eye,
  type LucideIcon,
} from "lucide-react";

interface ChallengeItem {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const CHALLENGES: ChallengeItem[] = [
  {
    id: "01",
    icon: Ban,
    title: "Manual Business Processes",
    description: "Reduce repetitive, labor-intensive tasks that slow down daily operations.",
  },
  {
    id: "02",
    icon: Puzzle,
    title: "Fragmented Applications",
    description: "Connect disconnected business systems and databases through seamless integrations.",
  },
  {
    id: "03",
    icon: Gauge,
    title: "Slow Decision Making",
    description: "Enable intelligent, AI-driven recommendations and instant operational actions.",
  },
  {
    id: "04",
    icon: ShieldAlert,
    title: "Human Errors",
    description: "Minimize data entry mistakes and compliance slips caused by manual processing.",
  },
  {
    id: "05",
    icon: ClipboardCheck,
    title: "Inefficient Approvals",
    description: "Automate complex, multi-level human-in-the-loop approval workflows.",
  },
  {
    id: "06",
    icon: Eye,
    title: "Limited Process Visibility",
    description: "Gain real-time end-to-end monitoring, metrics, and analytics across all runs.",
  },
];

export default function BusinessChallenges() {
  return (
    <section className="relative w-full overflow-hidden bg-white px-6 py-24 text-neutral-800 sm:px-10 lg:px-16 border-t border-neutral-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .ws-display { font-family: 'Space Grotesk', sans-serif; }
        .ws-body { font-family: 'Inter', sans-serif; }
        .ws-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      {/* ambient glow blobs */}
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-[#F0A83C]/5 blur-[120px]" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-[#E8747C]/5 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* header */}
        <div className="mb-16 max-w-2xl">
          <p className="ws-mono mb-3 text-xs uppercase tracking-[0.3em] text-[#F0A83C]">
            Operational Friction
          </p>
          <h2 className="ws-display text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
            <span className="text-[#F0A83C]">Business Challenges</span> We Solve
          </h2>
          <p className="ws-body mt-4 text-base leading-relaxed text-neutral-500">
            Automating the friction points that drain productivity and delay growth in enterprise operations.
          </p>
        </div>

        {/* Advanced Typography Grid */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {CHALLENGES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative pl-6 pr-4 py-5 border-l-2 border-neutral-100 hover:border-[#F0A83C] hover:bg-neutral-50/50 rounded-r-xl transition-all duration-300 cursor-pointer"
              >
                {/* ID and Indicator Row */}
                <div className="flex items-center gap-3">
                  <span className="ws-mono text-[10px] font-semibold tracking-wider text-neutral-400">
                    CHALLENGE {item.id}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-200 group-hover:bg-[#F0A83C] transition-colors duration-300" />
                </div>

                {/* Title & Icon */}
                <div className="mt-3 flex items-center gap-2.5">
                  <Icon size={18} className="text-[#F0A83C] shrink-0" strokeWidth={1.75} />
                  <h3 className="ws-display text-lg font-semibold text-neutral-800 group-hover:text-neutral-900 transition-colors duration-200">
                    {item.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="ws-body mt-2.5 text-sm leading-relaxed text-neutral-500">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
