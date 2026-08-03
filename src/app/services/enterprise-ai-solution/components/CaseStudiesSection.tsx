"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Lightbulb,
  TrendingUp,
} from "lucide-react";

const caseStudies = [
  {
    id: 1,
    industry: "ENTERPRISE ARCHITECTURE",
    title: "Enterprise-first AI",
    problem:
      "AI pilots often fail when governance, integration, and scale are treated as afterthoughts.",
    solution:
      "We design every solution around enterprise architecture, controls, and production operations.",
    result: "A deployment-ready foundation that can grow securely across teams and use cases.",
    stat: "360°",
    statLabel: "Enterprise Readiness",
    gradient: "from-[#2C78FF] to-[#00C2FF]",
  },
  {
    id: 2,
    industry: "MICROSOFT ECOSYSTEM",
    title: "Microsoft AI Expertise",
    problem:
      "Disconnected AI tools add complexity and limit the value of existing Microsoft investments.",
    solution:
      "We connect Azure AI, Copilot Studio, Microsoft Fabric, and Power Platform into one solution.",
    result:
      "AI capabilities work naturally with the data, security, and tools your teams already use.",
    stat: "MS",
    statLabel: "AI Ecosystem Expertise",
    gradient: "from-[#FF8F50] to-[#FFB703]",
  },
  {
    id: 3,
    industry: "TRUST & GOVERNANCE",
    title: "Secure & Scalable Solutions",
    problem:
      "Enterprise AI must protect sensitive data while supporting reliability, auditability, and growth.",
    solution:
      "We apply identity controls, private deployment patterns, monitoring, and responsible AI guardrails.",
    result:
      "Secure AI services that can move from one workflow to organization-wide adoption.",
    stat: "24/7",
    statLabel: "Governed Operations",
    gradient: "from-[#8B5CF6] to-[#E879F9]",
  },
  {
    id: 4,
    industry: "MEASURABLE VALUE",
    title: "Business Outcome Focused",
    problem:
      "Technology-led AI programs can produce impressive demos without improving business performance.",
    solution:
      "We define target KPIs, workflow changes, and value checkpoints before development begins.",
    result:
      "Every release is connected to measurable gains in speed, cost, quality, revenue, or experience.",
    stat: "ROI",
    statLabel: "KPI-Led Delivery",
    gradient: "from-[#FF6B00] to-[#FF9F43]",
  },
  {
    id: 5,
    industry: "TAILORED ENGINEERING",
    title: "Custom AI Development",
    problem:
      "Off-the-shelf tools rarely match specialized processes, data, and competitive requirements.",
    solution:
      "We build purpose-fit agents, copilots, search, document AI, and workflow automation.",
    result:
      "A solution aligned to your systems, users, governance model, and strategic roadmap.",
    stat: "1:1",
    statLabel: "Purpose-Built AI",
    gradient: "from-[#0F766E] to-[#34D399]",
  },
  {
    id: 6,
    industry: "RESPONSIBLE AI",
    title: "Governance Built In",
    problem:
      "Unmonitored models can introduce accuracy, privacy, explainability, and compliance risks.",
    solution:
      "We embed evaluations, human oversight, access controls, audit trails, and ongoing monitoring.",
    result:
      "Teams can adopt AI with clearer accountability, stronger controls, and greater confidence.",
    stat: "RAI",
    statLabel: "Responsible by Design",
    gradient: "from-[#1E3A8A] to-[#6366F1]",
  },
  {
    id: 7,
    industry: "END-TO-END DELIVERY",
    title: "From Pilot to Production",
    problem:
      "Promising prototypes often stall before integration, adoption, security review, or scale.",
    solution:
      "Softree supports discovery, architecture, development, integration, launch, and optimization.",
    result:
      "A clear delivery path moves valuable use cases into reliable day-to-day operations.",
    stat: "E2E",
    statLabel: "Pilot to Scale",
    gradient: "from-[#BE185D] to-[#F472B6]",
  },
];

type Study = (typeof caseStudies)[number];

function DetailRow({
  icon: Icon,
  label,
  text,
  accent = false,
}: {
  icon: typeof CircleHelp;
  label: string;
  text: string;
  accent?: boolean;
}) {
  const firstWord = text.split(" ")[0];
  const remainingText = text.split(" ").slice(1).join(" ");

  return (
    <div className="flex items-start gap-2.5">
      <div
        className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full ${
          accent ? "bg-emerald-50 text-emerald-500" : "bg-orange-50 text-[#FF5812]"
        }`}
      >
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="min-w-0">
        <p
          className={`text-[9px] font-semibold uppercase tracking-[0.16em] ${
            accent ? "text-[#FF5812]" : "text-[#0a0a1a]/45"
          }`}
        >
          {label}
        </p>
        <p className="mt-1 text-[11px] leading-[1.45] text-[#0a0a1a]/75">
          {accent && <strong className="mr-1 text-[#FF5812]">{firstWord}</strong>}
          {accent ? remainingText : text}
        </p>
      </div>
    </div>
  );
}

function StatVisual({ study }: { study: Study }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className={`relative flex min-h-70 overflow-hidden rounded-2xl bg-linear-to-br ${study.gradient} p-4 text-white shadow-[0_16px_32px_rgba(15,23,42,0.16)]`}
    >
      <div className="absolute right-3 top-3 flex gap-1 opacity-60">
        <span className="h-1 w-4 rounded-full bg-white/70" />
        <span className="h-1 w-1 rounded-full bg-white/70" />
        <span className="h-1 w-1 rounded-full bg-white/70" />
      </div>

      <svg
        viewBox="0 0 160 220"
        className="absolute inset-0 h-full w-full opacity-35"
        aria-hidden="true"
      >
        <path
          d="M10 135 C45 95, 70 165, 105 105 S145 65, 155 95"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
        />
        {[20, 55, 90, 125, 150].map((cx, index) => (
          <circle
            key={cx}
            cx={cx}
            cy={[130, 112, 145, 88, 96][index]}
            r={index === 3 ? 6 : 3}
            fill="white"
          />
        ))}
      </svg>

      <div className="relative z-10 mt-auto">
        <p className="text-4xl font-bold leading-none tabular-nums">{study.stat}</p>
        <p className="mt-2 text-[11px] font-medium text-white/90">{study.statLabel}</p>
      </div>
    </motion.div>
  );
}

function StudyCard({ study }: { study: Study }) {
  return (
    <article className="grid min-w-0 grid-cols-[minmax(0,1.25fr)_minmax(110px,0.75fr)] gap-3 lg:border-r lg:border-slate-200/80 lg:pr-5 last:lg:border-r-0 last:lg:pr-0">
      <div className="flex min-w-0 flex-col">
        <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#FF5812]">
          {study.industry}
        </p>
        <h3 className="mt-2 min-h-11 text-base font-semibold leading-tight text-[#0a0a1a]">
          {study.title}
        </h3>

        <div className="mt-4 space-y-4">
          <DetailRow icon={CircleHelp} label="Why It Matters" text={study.problem} />
          <DetailRow icon={Lightbulb} label="Softree Approach" text={study.solution} />
          <DetailRow
            icon={TrendingUp}
            label="Business Value"
            text={study.result}
            accent
          />
        </div>

        <a
          href="#contact"
          className="mt-auto inline-flex w-fit items-center gap-2 rounded-full border border-orange-200 px-4 py-2 text-[10px] font-medium text-[#FF5812] transition-all hover:gap-3 hover:bg-orange-50"
        >
          Talk to AI Expert
          <ArrowRight className="h-3 w-3" />
        </a>
      </div>

      <StatVisual study={study} />
    </article>
  );
}

export default function CaseStudiesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((previous) => (previous + 1) % caseStudies.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (previous) => (previous - 1 + caseStudies.length) % caseStudies.length,
    );
  };

  const displayedStudies = Array.from(
    { length: 3 },
    (_, index) => caseStudies[(index + currentIndex) % caseStudies.length],
  );

  return (
    <section className="relative w-full overflow-hidden bg-linear-to-b from-zinc-50 via-white to-zinc-50 py-20">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[28px] border border-orange-200/70 bg-white/80 px-5 py-8 shadow-[0_18px_48px_rgba(15,23,42,0.10)] sm:px-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border border-orange-200/50"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full border border-violet-200/40"
          />

          <div className="relative z-10 mb-8 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200/50 bg-orange-50/50 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF5812]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF5812] animate-pulse" />
              Why Softree
            </div>
            <h2 className="section-h2 text-[#0a0a1a]">
              Why Enterprises{" "}
              <span className="bg-linear-to-r from-[#FF5812] to-[#FF7A2F] bg-clip-text text-transparent font-bold">
                Choose Softree
              </span>
            </h2>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative z-10 grid gap-8 lg:grid-cols-3 lg:gap-5"
            >
              {displayedStudies.map((study) => (
                <StudyCard key={study.id} study={study} />
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="relative z-10 mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous case-study arrangement"
              className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:border-[#FF5812] hover:text-[#FF5812]"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="h-2 w-2 rounded-full bg-[#FF5812]" />
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next case-study arrangement"
              className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:border-[#FF5812] hover:text-[#FF5812]"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
