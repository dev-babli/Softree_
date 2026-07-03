"use client";

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
} from "react";
import {
  Zap,
  Cpu,
  GitBranch,
  Plug,
  UserCheck,
  Rocket,
  type LucideProps,
} from "lucide-react";

interface Step {
  id: string;
  icon: ComponentType<LucideProps>;
  title: string;
  description: string;
  color: string;
  conditional?: boolean;
}

const STEPS: Step[] = [
  {
    id: "01",
    icon: Zap,
    title: "Trigger Event",
    description:
      "A webhook, schedule, form submission, or API call starts the workflow.",
    color: "#F0A83C",
  },
  {
    id: "02",
    icon: Cpu,
    title: "AI Processing",
    description:
      "The request is read, classified, and enriched by the relevant AI model or agent.",
    color: "#F2C14E",
  },
  {
    id: "03",
    icon: GitBranch,
    title: "Business Logic",
    description:
      "Your rules decide the path: what happens next, and under what conditions.",
    color: "#4FD1C5",
  },
  {
    id: "04",
    icon: Plug,
    title: "System Integration",
    description:
      "Data is written to or pulled from CRM, ERP, HRMS, or any connected platform.",
    color: "#6FA8FF",
  },
  {
    id: "05",
    icon: UserCheck,
    title: "Human Approval",
    description:
      "A person reviews and approves the step before it proceeds, only when the rule requires it.",
    color: "#9B8CF2",
    conditional: true,
  },
  {
    id: "06",
    icon: Rocket,
    title: "Automated Action",
    description:
      "The workflow completes the task and logs the result for monitoring.",
    color: "#E8747C",
  },
];

function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

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

function NodeRing({
  color,
  active,
  children,
}: {
  color: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-12 w-12 flex-none sm:h-14 sm:w-14">
      <div
        className="ws-spin absolute inset-[-3px] rounded-full transition-opacity duration-500"
        style={{
          opacity: active ? 1 : 0.25,
          background: `conic-gradient(from 0deg, ${color}, transparent 35%, ${color}aa 55%, transparent 85%, ${color})`,
        }}
      />
      <div
        className="absolute inset-[2.5px] flex items-center justify-center rounded-full bg-[#0A0B0D] transition-all duration-500 border border-neutral-900/60"
        style={{
          boxShadow: active
            ? `0 0 18px ${hexToRgba(color, 0.35)}, 0 0 40px ${hexToRgba(
                color,
                0.15
              )}`
            : "none",
          color: active ? color : "#5B6272",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function StepCard({
  step,
  index,
  isLast,
  approvalRequired,
  onToggleApproval,
}: {
  step: Step;
  index: number;
  isLast: boolean;
  approvalRequired: boolean;
  onToggleApproval: () => void;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const Icon = step.icon;
  const skipped = Boolean(step.conditional) && !approvalRequired;
  const active = !skipped;

  return (
    <div
      ref={ref}
      className="relative flex gap-5 sm:gap-8"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(24px) scale(0.98)",
        transition: "opacity 600ms ease-out, transform 600ms ease-out",
        transitionDelay: inView ? `${index * 100}ms` : "0ms",
      }}
    >
      <div className="relative flex flex-col items-center">
        <NodeRing color={step.color} active={active}>
          <Icon size={18} strokeWidth={1.75} />
        </NodeRing>
        {!isLast && (
          <div className="relative mt-1 w-px flex-1 overflow-hidden" style={{ minHeight: "72px" }}>
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(${step.color}66, ${STEPS[index + 1].color}66)`,
              }}
            />
            <div
              className="ws-flow absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full blur-[2px]"
              style={{
                background: step.color,
                boxShadow: `0 0 8px ${step.color}, 0 0 16px ${step.color}`,
                animationDelay: `${index * 0.5}s`,
              }}
            />
          </div>
        )}
      </div>

      <div
        className={`flex-1 rounded-lg border p-5 backdrop-blur-sm transition-all duration-500 sm:p-6 ${
          isLast ? "" : "mb-8 sm:mb-10"
        }`}
        style={{
          borderColor: active ? hexToRgba(step.color, 0.35) : "rgba(255, 255, 255, 0.06)",
          background: "#0A0B0D",
          backgroundImage: active ? `radial-gradient(${step.color}12 1px, transparent 1px)` : "none",
          backgroundSize: "14px 14px",
          boxShadow: active
            ? `0 0 24px ${hexToRgba(step.color, 0.15)}`
            : "none",
        }}
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="ws-mono text-xs tracking-widest text-neutral-500">
            STEP {step.id}
          </span>
          {step.conditional && (
            <span
              className="ws-mono rounded-full border px-2 py-0.5 text-[10px] tracking-wide transition-colors duration-300"
              style={{
                borderColor: skipped ? "rgba(255, 255, 255, 0.06)" : hexToRgba(step.color, 0.35),
                color: skipped ? "#5B6272" : step.color,
                backgroundColor: skipped ? "transparent" : `${step.color}12`,
              }}
            >
              {skipped ? "SKIPPED THIS RUN" : "CONDITIONAL"}
            </span>
          )}
        </div>

        <div className="mt-2 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3
              className="ws-display text-lg font-semibold leading-snug sm:text-xl"
              style={{
                color: active ? "#FFFFFF" : "#C7CBD4",
              }}
            >
              {step.title}
              {step.conditional && (
                <span className="ws-body text-sm font-normal text-neutral-500">
                  {" "}
                  (if needed)
                </span>
              )}
            </h3>
            <p
              className="ws-body mt-1.5 max-w-md text-sm leading-relaxed transition-colors duration-300"
              style={{ color: active ? "#9AA1B0" : "#5B6272" }}
            >
              {step.description}
            </p>
          </div>

          {step.conditional && (
            <button
              type="button"
              role="switch"
              aria-checked={approvalRequired}
              onClick={onToggleApproval}
              className="ws-mono flex flex-none items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] transition-all duration-300 cursor-pointer"
              style={{
                borderColor: approvalRequired
                  ? hexToRgba(step.color, 0.45)
                  : "rgba(255, 255, 255, 0.06)",
                color: approvalRequired ? step.color : "#5B6272",
                boxShadow: approvalRequired
                  ? `0 0 10px ${hexToRgba(step.color, 0.15)}`
                  : "none",
              }}
            >
              <span
                className="relative h-4 w-7 flex-none rounded-full transition-colors duration-300"
                style={{
                  backgroundColor: approvalRequired ? step.color : "rgba(255,255,255,0.08)",
                }}
              >
                <span
                  className="absolute top-0.5 h-3 w-3 rounded-full bg-white transition-all duration-300 shadow-sm"
                  style={{ left: approvalRequired ? "14px" : "2px" }}
                />
              </span>
              {approvalRequired ? "Required" : "Not required"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const [approvalRequired, setApprovalRequired] = useState(true);

  return (
    <section className="relative w-full overflow-hidden bg-white px-6 py-24 text-neutral-800 sm:px-10 lg:px-16 border-t border-neutral-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .ws-display { font-family: 'Space Grotesk', sans-serif; }
        .ws-body { font-family: 'Inter', sans-serif; }
        .ws-mono { font-family: 'JetBrains Mono', monospace; }

        @keyframes ws-spin { to { transform: rotate(360deg); } }
        .ws-spin { animation: ws-spin 5s linear infinite; }

        @keyframes ws-flow {
          0% { top: -10%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .ws-flow { animation: ws-flow 2.8s ease-in-out infinite; }

        @keyframes ws-sparkle {
          0%, 100% { opacity: 0; transform: scale(0.4); }
          50% { opacity: 0.8; transform: scale(1); }
        }
        .ws-sparkle { animation: ws-sparkle 4s ease-in-out infinite; }

        @keyframes ws-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.08); }
        }
        .ws-drift { animation: ws-drift 14s ease-in-out infinite; }
        .ws-drift-slow { animation: ws-drift 20s ease-in-out infinite reverse; }

        @media (prefers-reduced-motion: reduce) {
          .ws-spin, .ws-flow, .ws-sparkle, .ws-drift, .ws-drift-slow { animation: none; }
        }
      `}</style>

      {/* ambient glow blobs */}
      <div
        className="ws-drift pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #F0A83C, transparent 70%)" }}
      />
      <div
        className="ws-drift-slow pointer-events-none absolute -bottom-40 -right-24 h-[28rem] w-[28rem] rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #9B8CF2, transparent 70%)" }}
      />
      <Sparkles />

      <div className="relative mx-auto max-w-3xl">
        <div className="mb-16">
          <p className="ws-mono mb-3 text-xs uppercase tracking-[0.3em] text-[#F0A83C]">
            How It Works
          </p>
          <h2 className="ws-display text-3xl font-semibold leading-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            <span className="text-[#F0A83C]">From trigger to done</span>, in six steps.
          </h2>
          <p className="ws-body mt-4 max-w-xl text-base leading-relaxed text-neutral-500">
            Step 5 only runs when your rules call for it. Toggle it to watch
            the path change in real time.
          </p>
        </div>

        <div>
          {STEPS.map((step, index) => (
            <StepCard
              key={step.id}
              step={step}
              index={index}
              isLast={index === STEPS.length - 1}
              approvalRequired={approvalRequired}
              onToggleApproval={() => setApprovalRequired((v) => !v)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}