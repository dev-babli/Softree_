"use client";

import React, { useMemo, useState, type ComponentType } from "react";
import {
  Search,
  PenTool,
  Code2,
  FlaskConical,
  Rocket,
  TrendingUp,
  ChevronRight,
  type LucideProps,
} from "lucide-react";

interface Phase {
  id: string;
  icon: ComponentType<LucideProps>;
  title: string;
  description: string;
  color: string;
}

const PHASES: Phase[] = [
  {
    id: "01",
    icon: Search,
    title: "Discovery",
    description:
      "Understand existing business processes and automation opportunities.",
    color: "#F0A83C",
  },
  {
    id: "02",
    icon: PenTool,
    title: "Solution Design",
    description: "Design AI workflows and integration architecture.",
    color: "#F2C14E",
  },
  {
    id: "03",
    icon: Code2,
    title: "Development",
    description: "Build orchestration pipelines and AI integrations.",
    color: "#4FD1C5",
  },
  {
    id: "04",
    icon: FlaskConical,
    title: "Testing",
    description: "Validate workflows, business rules, and AI responses.",
    color: "#6FA8FF",
  },
  {
    id: "05",
    icon: Rocket,
    title: "Deployment",
    description: "Launch workflows with enterprise-grade security.",
    color: "#9B8CF2",
  },
  {
    id: "06",
    icon: TrendingUp,
    title: "Optimization",
    description:
      "Continuously monitor, analyze, and improve workflow performance.",
    color: "#E8747C",
  },
];

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function Sparkles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => {
        const left = (Math.sin(i * 11.4) * 0.5 + 0.5) * 100;
        const top = (Math.cos(i * 6.1) * 0.5 + 0.5) * 100;
        const delay = (i % 6) * 0.6;
        const size = 2 + (i % 3);
        return { left, top, delay, size, key: i };
      }),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.key}
          className="ws-sparkle absolute rounded-full bg-neutral-300 opacity-20"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function PhaseCard({
  phase,
  index,
  isActive,
  isLast,
  onSelect,
}: {
  phase: Phase;
  index: number;
  isActive: boolean;
  isLast: boolean;
  onSelect: () => void;
}) {
  const Icon = phase.icon;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={isActive}
        className="group relative flex h-full w-full flex-col overflow-hidden rounded-lg border p-5 text-left backdrop-blur-sm transition-all duration-400 hover:-translate-y-1 cursor-pointer"
        style={{
          borderColor: isActive ? hexToRgba(phase.color, 0.35) : "rgba(255, 255, 255, 0.06)",
          background: "#0A0B0D",
          backgroundImage: `radial-gradient(${phase.color}12 1px, transparent 1px)`,
          backgroundSize: "14px 14px",
          boxShadow: isActive
            ? `0 0 24px ${hexToRgba(phase.color, 0.15)}`
            : "none",
        }}
      >
        <span
          className="ws-display pointer-events-none absolute -right-1 -top-3 select-none text-6xl font-bold transition-opacity duration-400"
          style={{
            color: phase.color,
            opacity: isActive ? 0.08 : 0.03,
          }}
        >
          {phase.id}
        </span>

        <div
          className="relative flex h-9 w-9 flex-none items-center justify-center rounded-md border transition-all duration-400"
          style={{
            borderColor: isActive ? hexToRgba(phase.color, 0.35) : "rgba(255, 255, 255, 0.08)",
            backgroundColor: isActive ? hexToRgba(phase.color, 0.1) : "rgba(255, 255, 255, 0.02)",
            color: isActive ? phase.color : "#6B7280",
          }}
        >
          <Icon size={16} strokeWidth={1.75} />
        </div>

        <div className="relative mt-4">
          <span className="ws-mono text-[10px] tracking-widest text-neutral-500">
            PHASE {phase.id}
          </span>
          <h3
            className="ws-display mt-1 text-base font-semibold leading-snug transition-colors duration-300 sm:text-lg"
            style={{ color: isActive ? "#FFFFFF" : "#C7CBD4" }}
          >
            {phase.title}
          </h3>
          <p
            className="ws-body mt-2 text-sm leading-relaxed transition-colors duration-300"
            style={{ color: isActive ? "#9AA1B0" : "#5B6272" }}
          >
            {phase.description}
          </p>
        </div>
      </button>

      {!isLast && (
        <div
          className="pointer-events-none absolute right-[-17px] top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white lg:flex"
        >
          <ChevronRight size={13} className="text-neutral-400" />
        </div>
      )}
    </div>
  );
}

export default function OurDeliveryProcess() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePhase = PHASES[activeIndex];
  const progressPct = ((activeIndex + 1) / PHASES.length) * 100;

  return (
    <section className="relative w-full overflow-hidden bg-white px-6 py-24 text-neutral-800 sm:px-10 lg:px-16 border-t border-neutral-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .ws-display { font-family: 'Space Grotesk', sans-serif; }
        .ws-body { font-family: 'Inter', sans-serif; }
        .ws-mono { font-family: 'JetBrains Mono', monospace; }

        @keyframes ws-sparkle {
          0%, 100% { opacity: 0; transform: scale(0.4); }
          50% { opacity: 0.7; transform: scale(1); }
        }
        .ws-sparkle { animation: ws-sparkle 4.2s ease-in-out infinite; }

        @keyframes ws-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-25px, 25px) scale(1.08); }
        }
        .ws-drift { animation: ws-drift 16s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .ws-sparkle, .ws-drift { animation: none; }
        }
      `}</style>

      <div
        className="ws-drift pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #4FD1C5, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-20 h-[26rem] w-[26rem] rounded-full opacity-[0.1] blur-3xl"
        style={{ background: "radial-gradient(circle, #E8747C, transparent 70%)" }}
      />
      <Sparkles />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <p className="ws-mono mb-3 text-xs uppercase tracking-[0.3em] text-[#F0A83C]">
            Our Delivery Process
          </p>
          <h2 className="ws-display text-3xl font-semibold leading-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            <span className="text-[#F0A83C]">Six phases</span>, one predictable rollout.
          </h2>
          <p className="ws-body mt-4 text-base leading-relaxed text-neutral-500">
            Select a phase to see what it covers.
          </p>
        </div>

        {/* progress tracker */}
        <div className="mb-10">
          <div className="ws-mono mb-2 flex items-center justify-between text-xs text-neutral-400">
            <span style={{ color: activePhase.color }}>
              PHASE {activePhase.id} — {activePhase.title.toUpperCase()}
            </span>
            <span>{activeIndex + 1} / {PHASES.length}</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-neutral-100">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${progressPct}%`,
                background: "#F0A83C",
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-3">
          {PHASES.map((phase, index) => (
            <PhaseCard
              key={phase.id}
              phase={phase}
              index={index}
              isActive={index === activeIndex}
              isLast={index === PHASES.length - 1}
              onSelect={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}