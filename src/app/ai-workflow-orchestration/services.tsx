"use client";

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
} from "react";
import {
  Workflow,
  Bot,
  Plug,
  ScanSearch,
  UserCheck,
  Zap,
  Activity,
  RefreshCw,
  ChevronDown,
  type LucideProps,
} from "lucide-react";

type Stage = "automate" | "integrate" | "oversee" | "improve";

interface ServiceNode {
  id: string;
  icon: ComponentType<LucideProps>;
  title: string;
  description: string;
  stage: Stage;
  metric: string;
  details: string[];
}

interface StageMeta {
  key: Stage;
  label: string;
  color: string;
}

const STAGES: StageMeta[] = [
  { key: "automate", label: "Automate", color: "#F0A83C" },
  { key: "integrate", label: "Integrate", color: "#4FD1C5" },
  { key: "oversee", label: "Oversee", color: "#E8747C" },
  { key: "improve", label: "Improve", color: "#9B8CF2" },
];

const stageColor = (stage: Stage): string =>
  STAGES.find((s) => s.key === stage)?.color ?? "#F0A83C";

const SERVICES: ServiceNode[] = [
  {
    id: "01",
    icon: Workflow,
    title: "AI Process Automation",
    description:
      "Automate repetitive business operations using intelligent workflows.",
    stage: "automate",
    metric: "62% less manual handling",
    details: [
      "Maps existing manual steps before automating them",
      "Handles exceptions with configurable fallback rules",
      "Runs on a schedule, a trigger, or on demand",
    ],
  },
  {
    id: "02",
    icon: Bot,
    title: "AI Agent Orchestration",
    description:
      "Coordinate multiple AI agents to perform specialized tasks collaboratively.",
    stage: "automate",
    metric: "Up to 12 agents per run",
    details: [
      "Assigns sub-tasks to the agent best suited for each",
      "Shares context and intermediate results between agents",
      "Escalates to a human when agents disagree",
    ],
  },
  {
    id: "03",
    icon: Plug,
    title: "Enterprise Workflow Integration",
    description:
      "Connect CRM, ERP, HRMS, SharePoint, Microsoft 365, and third-party platforms.",
    stage: "integrate",
    metric: "40+ prebuilt connectors",
    details: [
      "Syncs records both directions in near real time",
      "Prebuilt adapters for CRM, ERP, HRMS, and Microsoft 365",
      "Custom connectors for internal or legacy systems",
    ],
  },
  {
    id: "04",
    icon: ScanSearch,
    title: "Intelligent Document Processing",
    description:
      "Extract, classify, validate, and process documents automatically.",
    stage: "integrate",
    metric: "99.1% field accuracy",
    details: [
      "Classifies incoming documents by type automatically",
      "Validates extracted fields against business rules",
      "Routes exceptions to a reviewer with the field flagged",
    ],
  },
  {
    id: "05",
    icon: UserCheck,
    title: "Human-in-the-Loop Workflows",
    description:
      "Include manual approvals wherever business decisions require human oversight.",
    stage: "oversee",
    metric: "Approvals in under 1 min",
    details: [
      "Inserts approval checkpoints at any workflow step",
      "Routes requests to the right approver automatically",
      "Keeps a full audit trail of every decision made",
    ],
  },
  {
    id: "06",
    icon: Zap,
    title: "Event-Driven Automation",
    description:
      "Trigger workflows based on business events, notifications, or API responses.",
    stage: "oversee",
    metric: "Sub-second trigger latency",
    details: [
      "Listens for events from webhooks, queues, or APIs",
      "Chains multiple workflows off a single event",
      "Retries automatically on downstream failure",
    ],
  },
  {
    id: "07",
    icon: Activity,
    title: "Workflow Monitoring",
    description: "Track workflow performance with dashboards and analytics.",
    stage: "improve",
    metric: "Live dashboards, 24/7",
    details: [
      "Surfaces bottlenecks by step, team, or system",
      "Alerts on failed runs before they pile up",
      "Exports run history for audits and reporting",
    ],
  },
  {
    id: "08",
    icon: RefreshCw,
    title: "Continuous Optimization",
    description: "Improve workflows using AI insights and operational data.",
    stage: "improve",
    metric: "Reviewed every 30 days",
    details: [
      "Flags steps that consistently run slow or fail",
      "Recommends rule or routing changes from real usage",
      "Rolls out changes gradually and tracks the impact",
    ],
  },
];

function useInView<T extends HTMLElement>(threshold = 0.2) {
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

function useLiveCounter(start: number, min: number, max: number) {
  const [value, setValue] = useState(start);

  useEffect(() => {
    const id = setInterval(() => {
      setValue((prev) => {
        const next = prev + Math.floor(Math.random() * 5) + 1;
        return next > max ? min : next;
      });
    }, 1800);
    return () => clearInterval(id);
  }, [min, max]);

  return value;
}

function ServiceCard({
  service,
  index,
  isActive,
  isDimmed,
  onToggle,
}: {
  service: ServiceNode;
  index: number;
  isActive: boolean;
  isDimmed: boolean;
  onToggle: (id: string) => void;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const Icon = service.icon;
  const color = stageColor(service.stage);
  const panelId = `ws-panel-${service.id}`;

  return (
    <div
      ref={ref}
      className={`group relative flex flex-col bg-[#0A0B0D] p-6 border border-neutral-900/60 transition-all duration-500 ease-out sm:min-h-[220px] ${
        isDimmed ? "opacity-35" : "opacity-100"
      }`}
      style={{
        opacity: inView ? (isDimmed ? 0.35 : 1) : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transitionDelay: inView ? `${index * 60}ms` : "0ms",
        backgroundImage: isDimmed ? "none" : `radial-gradient(${color}12 1px, transparent 1px)`,
        backgroundSize: "14px 14px",
      }}
    >
      <span
        className="pointer-events-none absolute right-3 top-3 h-2 w-2 border-r border-t border-neutral-800 transition-colors duration-300"
        style={{ borderColor: isActive ? color : undefined }}
      />

      <button
        type="button"
        onClick={() => onToggle(service.id)}
        aria-expanded={isActive}
        aria-controls={panelId}
        className="flex flex-1 flex-col text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F0A83C]/60 cursor-pointer"
      >
        <div className="flex items-start justify-between">
          <span className="ws-mono text-xs tracking-widest text-neutral-500">
            NODE · {service.id}
          </span>
          <span className="relative flex h-1.5 w-1.5">
            <span
              className="ws-dot h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: color }}
            />
          </span>
        </div>

        <div
          className="mt-4 flex h-10 w-10 items-center justify-center rounded-sm border border-neutral-800 bg-[#14161B] transition-colors duration-300"
          style={{ color }}
        >
          <Icon size={18} strokeWidth={1.75} />
        </div>

        <div className="mt-4">
          <h3 className="ws-display text-base font-semibold leading-snug text-white sm:text-lg">
            {service.title}
          </h3>
          <p className="ws-body mt-2 text-sm leading-relaxed text-neutral-400">
            {service.description}
          </p>
        </div>

        <div className="mt-4 flex items-center gap-2 text-neutral-500">
          <span className="ws-mono text-[11px] tracking-wide text-neutral-300 font-medium">
            {service.metric}
          </span>
          <ChevronDown
            size={14}
            className="ml-auto transition-transform duration-300 text-neutral-500"
            style={{ transform: isActive ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </div>
      </button>

      <div
        id={panelId}
        className="grid overflow-hidden transition-all duration-300 ease-out"
        style={{
          gridTemplateRows: isActive ? "1fr" : "0fr",
          opacity: isActive ? 1 : 0,
          marginTop: isActive ? "16px" : "0px",
        }}
      >
        <div className="min-h-0">
          <ul className="ws-mono space-y-2 border-t border-neutral-800 pt-4 text-[11px] leading-relaxed text-neutral-400">
            {service.details.map((line) => (
              <li key={line} className="flex gap-2">
                <span style={{ color }}>›</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function WorkflowOrchestrationServices() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeStage, setActiveStage] = useState<Stage | null>(null);
  const runsToday = useLiveCounter(1248, 1200, 9999);

  const toggle = (id: string) =>
    setActiveId((prev) => (prev === id ? null : id));

  const stageCounts = useMemo(() => {
    const counts: Record<Stage, number> = {
      automate: 0,
      integrate: 0,
      oversee: 0,
      improve: 0,
    };
    SERVICES.forEach((s) => {
      counts[s.stage] += 1;
    });
    return counts;
  }, []);

  return (
    <section className="min-h-screen w-full bg-white text-neutral-800 px-6 py-20 sm:px-10 lg:px-16">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .ws-display { font-family: 'Space Grotesk', sans-serif; }
        .ws-body { font-family: 'Inter', sans-serif; }
        .ws-mono { font-family: 'JetBrains Mono', monospace; }
        @keyframes ws-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(240,168,60,0.45); }
          50% { opacity: 0.55; box-shadow: 0 0 0 4px rgba(240,168,60,0); }
        }
        .ws-dot { animation: ws-pulse 2.4s ease-in-out infinite; }
        @keyframes ws-sweep {
          0% { transform: translateX(-10%); }
          100% { transform: translateX(110%); }
        }
        .ws-sweep { animation: ws-sweep 3.6s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .ws-dot, .ws-sweep { animation: none; }
        }
      `}</style>

      <div className="mx-auto max-w-6xl">
        {/* Status bar */}
        <div className="ws-mono mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs tracking-wide text-neutral-500">
          <span className="inline-flex items-center gap-2 rounded-sm border border-neutral-200 bg-white px-2.5 py-1 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F0A83C] ws-dot" />
            SYSTEM STATUS: ORCHESTRATING
          </span>
          <span className="text-neutral-300">/</span>
          <span>
            RUNS TODAY:{" "}
            <span className="text-neutral-900 font-semibold">{runsToday.toLocaleString()}</span>
          </span>
        </div>

        {/* Header */}
        <div className="mb-10 max-w-3xl border-l-2 border-[#F0A83C] pl-5 sm:pl-6">
          <p className="ws-mono mb-3 text-xs uppercase tracking-[0.2em] text-[#F0A83C]">
            Our AI Workflow Orchestration Services
          </p>
          <h2 className="ws-display text-3xl font-semibold leading-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            Every process, agent, and approval,
            <span className="text-neutral-400"> wired into one system.</span>
          </h2>
          <p className="ws-body mt-5 text-base leading-relaxed text-neutral-500 sm:text-lg">
            Eight connected modules that plan, run, watch, and improve your
            operations. Select a stage to trace it through the pipeline, or
            open a node for detail.
          </p>
        </div>

        {/* Stage filter */}
        <div
          className="ws-mono mb-6 flex flex-wrap items-center gap-2 text-xs"
          role="group"
          aria-label="Filter by pipeline stage"
        >
          <button
            type="button"
            onClick={() => setActiveStage(null)}
            className="rounded-sm border px-3 py-1.5 transition-colors duration-200 cursor-pointer"
            style={{
              borderColor: activeStage === null ? "#F0A83C" : "rgba(10,10,10,0.08)",
              color: activeStage === null ? "#0a0a0a" : "#71717a",
              backgroundColor: activeStage === null ? "rgba(240,168,60,0.04)" : "transparent",
            }}
          >
            All · {SERVICES.length}
          </button>
          {STAGES.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() =>
                setActiveStage((prev) => (prev === s.key ? null : s.key))
              }
              className="rounded-sm border px-3 py-1.5 transition-colors duration-200 cursor-pointer"
              style={{
                borderColor: activeStage === s.key ? s.color : "rgba(10,10,10,0.08)",
                color: activeStage === s.key ? "#0a0a0a" : "#71717a",
                backgroundColor: activeStage === s.key ? `${s.color}08` : "transparent",
              }}
            >
              <span
                className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle"
                style={{ backgroundColor: s.color }}
              />
              {s.label} · {stageCounts[s.key]}
            </button>
          ))}
        </div>

        {/* Circuit grid */}
        <div className="relative overflow-hidden rounded-md border border-neutral-200">
          <span className="ws-sweep pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-transparent via-[#F0A83C]/10 to-transparent" />
          <div className="grid grid-cols-1 gap-px bg-neutral-200 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                isActive={activeId === service.id}
                isDimmed={
                  activeStage !== null && service.stage !== activeStage
                }
                onToggle={toggle}
              />
            ))}
          </div>
        </div>

        {/* Footer trace */}
        <div className="ws-mono mt-8 flex items-center gap-3 text-xs text-neutral-400">
          <span className="h-px flex-1 bg-neutral-200" />
          <span>END OF PIPELINE</span>
          <span className="h-px flex-1 bg-neutral-200" />
        </div>
      </div>
    </section>
  );
}