"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  FileText,
  Headphones,
  Layers,
  ShoppingCart,
  Users,
  Workflow,
} from "lucide-react";

const mappings = [
  {
    id: 1,
    label: "Customer Support",
    icon: Headphones,
    challenge: "High response times and inconsistent support quality across channels.",
    solution: "Deploy intelligent AI agents that resolve tickets 24/7 with context-aware responses.",
    solutionName: "Autonomous Support Agents",
    readiness: "Ready to deploy on Microsoft Azure & Power Platform",
    image: "/images/enterprise-ai-solution/images/challenges/customer-support.png",
  },
  {
    id: 2,
    label: "Document Processing",
    icon: FileText,
    challenge: "Manual extraction from invoices, contracts, and forms slows critical operations.",
    solution: "Use Document AI to read, classify, validate, and route information automatically.",
    solutionName: "Intelligent Document Processing",
    readiness: "Connects securely to SharePoint, Teams, and enterprise systems",
    image: "/images/enterprise-ai-solution/images/challenges/document-processing.png",
  },
  {
    id: 3,
    label: "Knowledge Management",
    icon: Layers,
    challenge: "Important information is scattered across documents, emails, and legacy platforms.",
    solution: "Create a unified enterprise search experience with instant, cited AI answers.",
    solutionName: "Enterprise Knowledge Graph",
    readiness: "Grounded responses with permissions and source-level citations",
    image: "/images/enterprise-ai-solution/images/challenges/knowledge-management.png",
  },
  {
    id: 4,
    label: "Workflow Automation",
    icon: Workflow,
    challenge: "Multi-step approvals and manual handoffs create delays across departments.",
    solution: "Orchestrate decisions, approvals, and system actions with autonomous workflow agents.",
    solutionName: "Agentic Workflow Automation",
    readiness: "Integrates with your existing APIs and business applications",
    image: "/images/enterprise-ai-solution/images/challenges/workflow-automation.png",
  },
  {
    id: 5,
    label: "Employee Productivity",
    icon: Users,
    challenge: "Teams lose valuable time to repetitive updates, data entry, and information searches.",
    solution: "Embed secure AI copilots into daily tools to complete routine work automatically.",
    solutionName: "Enterprise AI Copilot",
    readiness: "Available across Microsoft 365, Teams, and custom applications",
    image: "/images/enterprise-ai-solution/images/challenges/employee-productivity.png",
  },
  {
    id: 6,
    label: "Sales Automation",
    icon: ShoppingCart,
    challenge: "Manual lead research and follow-ups limit selling time and pipeline visibility.",
    solution: "Use sales agents to enrich leads, prepare outreach, and keep CRM records current.",
    solutionName: "Revenue Intelligence Agent",
    readiness: "Works with Dynamics 365, Salesforce, and connected CRM platforms",
    image: "/images/enterprise-ai-solution/images/challenges/ai-analytics.png",
  },
];

export function SolutionMapper() {
  const [activeId, setActiveId] = useState(1);
  const activeMapping = mappings.find((mapping) => mapping.id === activeId) ?? mappings[0];
  const ActiveIcon = activeMapping.icon;

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-zinc-50 via-white to-zinc-50 py-24">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[30px] border border-orange-100 bg-linear-to-b from-zinc-50 via-white to-zinc-50 px-5 py-10 text-[#0a0a1a] shadow-[0_24px_65px_rgba(15,23,42,0.10)] sm:px-8 lg:px-10">
          <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-[#FF5812]/[0.07] blur-[100px]" />
          <div className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-orange-300/[0.08] blur-[110px]" />

          <div className="relative z-10 mb-10 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200/50 bg-orange-50/50 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF5812]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF5812] animate-pulse" />
              Business Challenges
            </div>
            <h2 className="section-h2 text-[#0a0a1a]">
              The Challenge{" "}
              <span className="bg-linear-to-r from-[#FF5812] to-[#FF7A2F] bg-clip-text text-transparent font-bold">
                We Solve
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#0a0a1a]/70">
              Addressing critical enterprise AI challenges that affect
              performance, scalability, governance, and growth.
            </p>
          </div>

          <div className="relative z-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr_1fr] lg:items-stretch">
            <div className="relative min-h-[390px] pl-6">
              <div className="absolute bottom-2 left-1 top-2 w-1 rounded-full bg-slate-200" />
              <motion.div
                className="absolute left-1 top-2 w-1 rounded-full bg-linear-to-b from-[#FF5812] to-[#FF9A3D]"
                animate={{ height: `${(activeId / mappings.length) * 100}%` }}
                transition={{ type: "spring", stiffness: 170, damping: 24 }}
              />

              <div className="flex h-full flex-col justify-between gap-2">
                {mappings.map((mapping) => {
                  const Icon = mapping.icon;
                  const isActive = activeId === mapping.id;

                  return (
                    <motion.button
                      key={mapping.id}
                      type="button"
                      onClick={() => setActiveId(mapping.id)}
                      onMouseEnter={() => setActiveId(mapping.id)}
                      whileHover={{ x: 4 }}
                      className="group flex min-h-14 items-center gap-3 rounded-xl px-2 text-left"
                    >
                      <span
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all ${
                          isActive
                            ? "border-[#FF5812] bg-[#FF5812] text-white shadow-[0_0_20px_rgba(255,88,18,0.55)]"
                            : "border-slate-200 bg-white text-slate-400 shadow-sm group-hover:border-[#FF5812]/45 group-hover:text-[#FF5812]"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span>
                        <span
                          className={`block text-sm font-semibold transition-colors ${
                            isActive
                              ? "text-[#0a0a1a]"
                              : "text-[#0a0a1a]/48 group-hover:text-[#0a0a1a]/75"
                          }`}
                        >
                          {mapping.label}
                        </span>
                        <span className="mt-1 block text-[10px] text-[#0a0a1a]/35">
                          {mapping.solutionName}
                        </span>
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.article
                key={`detail-${activeMapping.id}`}
                initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="relative min-h-[390px] overflow-hidden rounded-2xl border-2 border-[#FF5812] bg-white/90 p-6 shadow-[0_16px_38px_rgba(255,88,18,0.10)] sm:p-8"
              >
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-[#FF5812]/35 bg-linear-to-br from-orange-50 to-[#FF5812]/20" />
                <div className="relative z-10">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#FF5812]/15 text-[#FF8A50]">
                      <ActiveIcon className="h-5 w-5" />
                    </span>
                    <span className="badge-label text-[#FF5812]">Challenge Focus</span>
                  </div>
                  <h3 className="text-2xl font-semibold leading-tight tracking-[-0.03em] text-[#0a0a1a] sm:text-3xl">
                    {activeMapping.label}
                  </h3>
                  <p className="mt-5 text-sm leading-relaxed text-[#0a0a1a]/62">
                    {activeMapping.challenge}
                  </p>

                  <div className="mt-8 space-y-4">
                    {[
                      activeMapping.solutionName,
                      activeMapping.readiness,
                      "Designed for secure enterprise scale",
                    ].map((point) => (
                      <div key={point} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#FF6B00]" />
                        <span className="text-xs leading-relaxed text-[#0a0a1a]/65">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`visual-${activeMapping.id}`}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.45 }}
                className="relative min-h-[390px] overflow-hidden rounded-2xl border border-[#FF5812]/20 bg-linear-to-br from-[#171326] via-[#10101d] to-[#24110d]"
              >
                <motion.div
                  animate={{ scale: [1, 1.035, 1] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeMapping.image}
                    alt={`${activeMapping.label} enterprise AI illustration`}
                    fill
                    sizes="(min-width: 1024px) 28vw, 100vw"
                    className="object-cover"
                    priority={activeMapping.id === 1}
                  />
                </motion.div>
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-black/10" />
                <div className="absolute inset-0 bg-[#FF5812]/[0.04] mix-blend-color" />

                <div className="absolute inset-x-5 bottom-5 rounded-xl border border-white/15 bg-black/55 p-4 backdrop-blur-md">
                  <p className="badge-label text-[#FF8A50]">Recommended AI Solution</p>
                  <p className="mt-2 text-base font-semibold text-white">
                    {activeMapping.solutionName}
                  </p>
                  <p className="mt-2 text-[11px] leading-relaxed text-white/45">
                    {activeMapping.solution}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
