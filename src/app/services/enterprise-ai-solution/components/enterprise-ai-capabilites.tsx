"use client";
 
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  Bot,
  BrainCircuit,
  CloudCog,
  Lock,
  RefreshCw,
  Scale,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
 
type Capability = {
  id: number;
  label: string;
  shortDescription: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconTone: string;
  image: string;
  features: { title: string; text: string; icon: LucideIcon }[];
  stats: { value: string; label: string }[];
};
 
const capabilities: Capability[] = [
  {
    id: 1,
    label: "AI Strategy & Consulting",
    shortDescription:
      "Turn AI ambition into prioritized use cases, readiness plans, and measurable enterprise roadmaps.",
    title: "Enterprise AI Strategy & Consulting",
    description:
      "Most enterprises struggle not with model access, but with deciding where AI creates durable value. We assess business outcomes, data readiness, risk, and change impact—so investment goes to production-ready opportunities, not isolated experiments.",
    icon: BrainCircuit,
    iconTone: "bg-violet-50 text-violet-600",
    image: "/images/challenges/ai-platform.png",
    features: [
      {
        title: "Outcome-Led Use Case Discovery",
        text: "Prioritize workflows by value, feasibility, data readiness, and risk—not hype.",
        icon: BrainCircuit,
      },
      {
        title: "Enterprise Readiness Assessment",
        text: "Evaluate data quality, identity, security posture, and operating model gaps.",
        icon: Scale,
      },
      {
        title: "Pilot-to-Scale Roadmap",
        text: "Define KPIs, owners, architecture checkpoints, and phased rollout plans.",
        icon: BarChart3,
      },
    ],
    stats: [
      { value: "3×", label: "Faster Prioritization" },
      { value: "ROI", label: "KPI-Led Decisions" },
      { value: "Clear", label: "Adoption Path" },
      { value: "Board", label: "Ready Roadmaps" },
    ],
  },
  {
    id: 2,
    label: "Enterprise AI Architecture",
    shortDescription:
      "Design secure, cloud-native AI platforms that scale across teams, data, and systems.",
    title: "Enterprise AI Platform Architecture",
    description:
      "Enterprise AI succeeds when models, retrieval, identities, applications, and observability share one governed foundation. We design architectures that avoid AI silos and support reliable multi-team production—aligned to Azure Well-Architected principles.",
    icon: CloudCog,
    iconTone: "bg-emerald-50 text-emerald-600",
    image: "/images/challenges/enterprise-ai.png",
    features: [
      {
        title: "Model & Orchestration Layer",
        text: "Compose LLMs, tools, agents, and workflows with clear boundaries.",
        icon: CloudCog,
      },
      {
        title: "Data & Knowledge Architecture",
        text: "Ground answers in governed enterprise sources with retrieval patterns.",
        icon: Lock,
      },
      {
        title: "Identity-Aware Integration",
        text: "Connect ERP, CRM, M365, and APIs under least-privilege access.",
        icon: BarChart3,
      },
    ],
    stats: [
      { value: "Zero", label: "AI Tool Silos" },
      { value: "Secure", label: "By Design" },
      { value: "Scale", label: "Multi-Team Ready" },
      { value: "Cloud", label: "Native Patterns" },
    ],
  },
  {
    id: 3,
    label: "Intelligent Automation",
    shortDescription:
      "Deploy governed AI agents and copilots that automate work across enterprise systems.",
    title: "AI Agents & Intelligent Automation",
    description:
      "Modern Enterprise AI Solutions combine copilots, deterministic workflows, and human approvals. We build agents that act inside business processes—with policy checks, fallbacks, and audit trails—so automation improves speed without losing control.",
    icon: Bot,
    iconTone: "bg-fuchsia-50 text-fuchsia-600",
    image: "/images/challenges/workflow-automation.png",
    features: [
      {
        title: "Task-Oriented AI Agents",
        text: "Automate multi-step work across documents, tickets, and systems.",
        icon: Bot,
      },
      {
        title: "Workflow & Document Intelligence",
        text: "Extract, validate, route, and complete high-volume operations.",
        icon: RefreshCw,
      },
      {
        title: "Human-in-the-Loop Controls",
        text: "Require approvals for high-impact actions with full audit history.",
        icon: ShieldCheck,
      },
    ],
    stats: [
      { value: "55%", label: "Less Manual Work" },
      { value: "2×", label: "Faster Cycle Time" },
      { value: "Audit", label: "Ready Actions" },
      { value: "Safe", label: "Agent Autonomy" },
    ],
  },
  {
    id: 4,
    label: "Secure AI & Governance",
    shortDescription:
      "Embed responsible AI, security, compliance, and lifecycle governance by design.",
    title: "Secure AI & Enterprise Governance",
    description:
      "Trust, traceability, and transparency are non-negotiable for production AI. We implement governance across data access, model behavior, agent authority, evaluations, and incident response—so enterprises can scale AI without amplifying risk.",
    icon: ShieldCheck,
    iconTone: "bg-amber-50 text-amber-600",
    image: "/images/challenges/ai-automation.png",
    features: [
      {
        title: "Responsible AI Controls",
        text: "Safety filters, groundedness checks, and accountable ownership.",
        icon: Scale,
      },
      {
        title: "Permission-Aware Data Access",
        text: "Preserve identity, classification, and least-privilege retrieval.",
        icon: Lock,
      },
      {
        title: "Compliance & Audit Trails",
        text: "Track decisions, sources, and agent actions for regulatory readiness.",
        icon: ShieldCheck,
      },
    ],
    stats: [
      { value: "0", label: "Data Breaches" },
      { value: "RAI", label: "By Design" },
      { value: "100%", label: "Encrypted Paths" },
      { value: "Full", label: "Action Traceability" },
    ],
  },
  {
    id: 5,
    label: "Microsoft AI Ecosystem",
    shortDescription:
      "Extend Azure AI, Copilot, Fabric, Power Platform, and Dynamics into one solution.",
    title: "Microsoft Enterprise AI Solutions",
    description:
      "The highest ROI comes when AI runs inside the Microsoft stack teams already trust. Softree connects Azure AI Foundry, Copilot Studio, Microsoft Fabric, Power Platform, and Dynamics 365 so intelligence shows up in everyday workflows—not another disconnected tool.",
    icon: BarChart3,
    iconTone: "bg-sky-50 text-sky-600",
    image: "/images/challenges/document-processing.png",
    features: [
      {
        title: "Azure AI Foundry & OpenAI",
        text: "Production model hosting, evaluation, and secure deployment patterns.",
        icon: CloudCog,
      },
      {
        title: "Copilot Studio & M365",
        text: "Custom agents and copilots inside Teams and Microsoft 365.",
        icon: Bot,
      },
      {
        title: "Fabric & Power Platform",
        text: "Unify data, apps, and automation across Dynamics and line-of-business systems.",
        icon: RefreshCw,
      },
    ],
    stats: [
      { value: "M365", label: "Native Integration" },
      { value: "Azure", label: "AI Ready" },
      { value: "Fast", label: "Enterprise Adoption" },
      { value: "ROI", label: "On Existing Stack" },
    ],
  },
  {
    id: 6,
    label: "Continuous Optimization",
    shortDescription:
      "Monitor quality, cost, safety, and adoption—then improve AI in production.",
    title: "Production AI Optimization",
    description:
      "Enterprise AI Solutions degrade without ongoing evaluation. We instrument quality, safety, latency, retrieval, tool use, adoption, and cost—then use telemetry and CI/CD eval gates to keep models accurate, grounded, and economically efficient as data and workflows evolve.",
    icon: RefreshCw,
    iconTone: "bg-rose-50 text-rose-600",
    image: "/images/challenges/ai-analytics.png",
    features: [
      {
        title: "Quality & Safety Observability",
        text: "Track groundedness, relevance, failures, drift, and policy violations.",
        icon: BarChart3,
      },
      {
        title: "Evaluation & CI/CD Gates",
        text: "Automate regression tests before prompts, models, or agents ship.",
        icon: ShieldCheck,
      },
      {
        title: "Cost & Performance Tuning",
        text: "Optimize retrieval, caching, model choice, and workflow design.",
        icon: RefreshCw,
      },
    ],
    stats: [
      { value: "99%", label: "Quality Targets" },
      { value: "24/7", label: "Live Monitoring" },
      { value: "30%", label: "Lower AI Cost" },
      { value: "CI/CD", label: "Eval Gates" },
    ],
  },
];
 
type RopePoints = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  width: number;
  height: number;
};
 
function buildRopePath({ x1, y1, x2, y2 }: RopePoints) {
  const dx = Math.max(x2 - x1, 40);
  const c1x = x1 + dx * 0.45;
  const c2x = x2 - dx * 0.45;
  return `M ${x1} ${y1} C ${c1x} ${y1}, ${c2x} ${y2}, ${x2} ${y2}`;
}
 
export default function EnterpriseAICapabilities() {
  const [activeId, setActiveId] = useState(1);
  const [rope, setRope] = useState<RopePoints | null>(null);
  const [ropeKey, setRopeKey] = useState(0);
 
  const layoutRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<number, HTMLButtonElement | null>>({});
 
  const active =
    capabilities.find((capability) => capability.id === activeId) ??
    capabilities[0];
 
  const updateRope = useCallback(() => {
    const layout = layoutRef.current;
    const activeEl = itemRefs.current[activeId];
    const detail = detailRef.current;
 
    if (!layout || !activeEl || !detail) {
      setRope(null);
      return;
    }
 
    if (window.matchMedia("(max-width: 1023px)").matches) {
      setRope(null);
      return;
    }
 
    const layoutBox = layout.getBoundingClientRect();
    const activeBox = activeEl.getBoundingClientRect();
    const detailBox = detail.getBoundingClientRect();
 
    const x1 = activeBox.right - layoutBox.left;
    const y1 = activeBox.top + activeBox.height / 2 - layoutBox.top;
    const x2 = detailBox.left - layoutBox.left;
    const y2 = detailBox.top + detailBox.height / 2 - layoutBox.top;
 
    if (x2 - x1 < 24) {
      setRope(null);
      return;
    }
 
    setRope({
      width: layoutBox.width,
      height: layoutBox.height,
      x1,
      y1,
      x2,
      y2,
    });
  }, [activeId]);
 
  useLayoutEffect(() => {
    updateRope();
    setRopeKey((key) => key + 1);
  }, [updateRope, activeId]);
 
  useEffect(() => {
    const handle = () => updateRope();
    window.addEventListener("resize", handle);
 
    const observer = new ResizeObserver(handle);
    if (layoutRef.current) observer.observe(layoutRef.current);
    if (listRef.current) observer.observe(listRef.current);
    if (detailRef.current) observer.observe(detailRef.current);
 
    return () => {
      window.removeEventListener("resize", handle);
      observer.disconnect();
    };
  }, [updateRope]);
 
  const ropePath = rope ? buildRopePath(rope) : "";
 
  return (
    <section className="overflow-hidden bg-[#FAFBFC] py-20 md:py-24">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center md:mb-12">
          <div className="mb-4 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-[#FF5812]" />
              <span className="badge-label text-[#FF5812]">Core Capabilities</span>
            </div>
          </div>
          <h2 className="section-h2 !text-[32px] !font-bold !leading-[1.15] text-[#0F172A] sm:!text-[36px] md:!text-[40px]">
            Enterprise AI{" "}
            <span className="text-[#FF5812]">Engineering Capabilities</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-[15px] leading-[1.65] text-[#64748B] md:text-[16px]">
            Leverage our end-to-end AI engineering expertise to design, build,
            deploy, and optimize secure, scalable, and business-driven AI
            solutions that accelerate innovation and deliver measurable
            enterprise outcomes.
          </p>
        </div>
 
        <div
          ref={layoutRef}
          className="relative grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[1.05fr_1.95fr] lg:gap-8 xl:gap-10"
        >
          {rope && (
            <svg
              className="pointer-events-none absolute inset-0 z-20 hidden lg:block"
              width={rope.width}
              height={rope.height}
              viewBox={`0 0 ${rope.width} ${rope.height}`}
              fill="none"
              aria-hidden="true"
            >
              <motion.path
                key={ropeKey}
                d={ropePath}
                stroke="#FF5812"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeDasharray="6 6"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.circle
                key={`dot-start-${ropeKey}`}
                cx={rope.x1}
                cy={rope.y1}
                r="3"
                fill="#FF5812"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.25, delay: 0.05 }}
              />
              <motion.circle
                key={`dot-end-${ropeKey}`}
                cx={rope.x2}
                cy={rope.y2}
                r="3"
                fill="#FF5812"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.25, delay: 0.35 }}
              />
            </svg>
          )}
 
          <div ref={listRef} className="relative z-10 flex flex-col gap-3">
            {capabilities.map((capability) => {
              const Icon = capability.icon;
              const isActive = capability.id === activeId;
 
              return (
                <button
                  key={capability.id}
                  type="button"
                  ref={(el) => {
                    itemRefs.current[capability.id] = el;
                  }}
                  onClick={() => setActiveId(capability.id)}
                  onMouseEnter={() => setActiveId(capability.id)}
                  className={`relative w-full rounded-[12px] border px-4 py-3.5 text-left transition-all duration-300 lg:flex-1 ${
                    isActive
                      ? "border-[#FF5812] bg-[#FFF8F3] shadow-[0_6px_20px_rgba(255,88,18,0.10)]"
                      : "border-[#E5E7EB] bg-white hover:border-orange-200 hover:bg-[#FFFAF7]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-[9px] ${capability.iconTone}`}
                    >
                      <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[15px] font-bold leading-snug text-[#0F172A]">
                        {capability.label}
                      </span>
                      <span className="mt-1 block text-[12px] leading-[1.45] text-[#64748B] line-clamp-2">
                        {capability.shortDescription}
                      </span>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
 
          <div
            ref={detailRef}
            className="relative z-10 flex min-h-[480px] flex-col overflow-hidden rounded-[20px] border border-[#FF5812] bg-white shadow-[0_14px_36px_rgba(15,23,42,0.06)] lg:h-full lg:min-h-0"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-full min-h-0 flex-col"
              >
                <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-2">
                  <div className="relative min-h-[220px] overflow-hidden bg-[#111827] md:min-h-full">
                    <Image
                      src={active.image}
                      alt={`${active.title} illustration`}
                      fill
                      sizes="(min-width: 1024px) 28vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a]/50 via-transparent to-transparent" />
                  </div>
 
                  <div className="flex flex-col justify-center px-5 py-5 sm:px-6 sm:py-6 lg:px-7 xl:px-8">
                    <div className="mb-2.5 flex items-center gap-2.5">
                      <span className="text-[15px] font-semibold tabular-nums text-[#FF5812]">
                        {String(active.id).padStart(2, "0")}
                      </span>
                      <span className="h-px w-7 bg-[#FF5812]" />
                    </div>
 
                    <h3 className="text-[22px] font-bold leading-tight tracking-[-0.02em] text-[#0F172A] sm:text-[26px] lg:text-[28px]">
                      {active.title}
                    </h3>
                    <p className="mt-2.5 max-w-xl text-[13px] leading-[1.6] text-[#64748B] sm:text-[14px]">
                      {active.description}
                    </p>
 
                    <div className="mt-5 space-y-3.5">
                      {active.features.map((feature) => {
                        const FeatureIcon = feature.icon;
                        return (
                          <div key={feature.title} className="flex gap-3">
                            <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#F8FAFC] text-[#FF5812] ring-1 ring-[#E2E8F0]">
                              <FeatureIcon
                                className="h-3.5 w-3.5"
                                strokeWidth={1.75}
                              />
                            </span>
                            <div className="min-w-0">
                              <p className="text-[14px] font-bold leading-snug text-[#0F172A]">
                                {feature.title}
                              </p>
                              <p className="mt-0.5 text-[12.5px] leading-[1.45] text-[#64748B]">
                                {feature.text}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
 
                <div className="mt-auto grid grid-cols-2 border-t border-[#E8E8E8] bg-[#FAFAFA] sm:grid-cols-4">
                  {active.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="border-[#E8E8E8] px-4 py-5 text-center sm:border-r sm:px-5 sm:py-6 sm:last:border-r-0 lg:px-6"
                    >
                      <p className="text-[20px] font-bold tabular-nums text-[#FF5812] sm:text-[22px] lg:text-[24px]">
                        {stat.value}
                      </p>
                      <p className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.08em] text-[#64748B] sm:text-[11px]">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
 
 