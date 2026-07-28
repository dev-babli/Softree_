"use client";

import { CheckCircle2 } from "lucide-react";
import { SectionLabel } from "./ui/SectionLabel";
import { motion } from "framer-motion";

const flows = [
  {
    challenge: "Fragmented Customer Service Operations",
    solution: "Grounded Service Copilot",
    outcome: "Consistent, Scalable Service",
    metric: "Permission-aware answers with citations and human escalation",
  },
  {
    challenge: "Document-Heavy Back-Office Processes",
    solution: "Document Intelligence Workflow",
    outcome: "Faster, Controlled Processing",
    metric: "Content extracted, validated, routed, and reviewed by exception",
  },
  {
    challenge: "Enterprise Knowledge Silos",
    solution: "Permission-Aware RAG Assistant",
    outcome: "Trusted Knowledge Access",
    metric: "Relevant answers grounded in authorized, cited enterprise sources",
  },
  {
    challenge: "Manual Cross-System Coordination",
    solution: "Governed AI Workflow Agent",
    outcome: "Orchestrated Enterprise Operations",
    metric: "Policy-checked actions across ERP, CRM, and Microsoft 365",
  },
];

const HorizontalConduit = ({ text, delay = 0 }: { text: string; delay?: number }) => (
  <div className="relative hidden min-w-[150px] flex-col items-center justify-center px-5 lg:flex">
    <motion.span
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay }}
      className="badge-label mb-2 whitespace-nowrap text-[#FF5812]"
    >
      {text}
    </motion.span>
    <div className="relative h-2 w-full overflow-hidden rounded-full border border-orange-200/60 bg-orange-50 shadow-[0_0_12px_rgba(255,107,44,0.22)]">
      <motion.div
        animate={{ x: ["-100%", "400%"] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear", delay }}
        className="absolute inset-y-0 w-1/3 rounded-full bg-gradient-to-r from-transparent via-[#FF5812] to-transparent shadow-[0_0_15px_#FF5812]"
      />
    </div>
  </div>
);

const VerticalConduit = ({ text, delay = 0 }: { text: string; delay?: number }) => (
  <div className="flex lg:hidden flex-col items-center justify-center py-6 w-full">
    <motion.span
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay }}
      className="badge-label mb-3 whitespace-nowrap text-[#FF5812]"
    >
      {text}
    </motion.span>
    <div className="w-2 h-16 rounded-full bg-orange-200/40 relative overflow-hidden border border-orange-200/50 shadow-[0_0_12px_rgba(255,107,44,0.3)]">
      <motion.div
        animate={{ y: ["-100%", "400%"] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear", delay }}
        className="absolute inset-x-0 h-1/3 rounded-full bg-gradient-to-b from-transparent via-[#FF5812] to-transparent shadow-[0_0_15px_#FF5812]"
      />
    </div>
  </div>
);

export function HowAIHelps() {
  return (
    <section id="how-ai-helps" className="overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50 py-24">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <SectionLabel>Enterprise AI Solutions</SectionLabel>
          <h2 className="section-h2 text-[#0a0a1a]">
            Business Challenge <span className="mx-1 text-slate-300">→</span>{" "}
            Enterprise AI Solution{" "}
            <span className="mx-1 text-slate-300">→</span>{" "}
            <span className="text-gradient-orange">Measurable Outcome</span>
          </h2>
          <p className="body-prose mx-auto mt-4 max-w-2xl">
            See how governed data, secure AI architecture, and controlled agent
            actions transform complex workflows into production-ready outcomes.
          </p>
        </div>

        <div className="space-y-8 rounded-[28px] border border-slate-200 bg-white/85 p-5 shadow-[0_20px_55px_rgba(15,23,42,0.10)] backdrop-blur-sm sm:p-8 lg:space-y-4">
          {flows.map((flow, i) => (
            <div key={flow.challenge} className="group relative">
              <div className="flex flex-col items-stretch lg:flex-row lg:items-center w-full">
                <div className="flex h-[128px] flex-1 flex-col justify-center rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-[0_6px_18px_rgba(15,23,42,0.08)] transition-all group-hover:border-orange-300 group-hover:shadow-md">
                  <span className="badge-label text-[#0a0a1a]/50">
                    Problem
                  </span>
                  <p className="mt-2 text-lg font-semibold leading-tight text-[#0a0a1a]">
                    {flow.challenge}
                  </p>
                </div>

                <HorizontalConduit text="Governed Data Context" delay={i * 0.2} />
                <VerticalConduit text="Governed Data Context" delay={i * 0.2} />

                <div className="relative z-10 flex h-[128px] flex-1 flex-col justify-center rounded-2xl bg-gradient-to-br from-[#FF7A00] to-[#F2580A] p-5 text-center text-white shadow-lg shadow-orange-500/20 transition-transform group-hover:scale-[1.02]">
                  <span className="badge-label text-orange-100">
                    Enterprise AI Solution
                  </span>
                  <p className="mt-2 text-xl font-semibold leading-tight text-white">{flow.solution}</p>
                </div>

                <HorizontalConduit text="Policy-Controlled Action" delay={i * 0.2 + 0.3} />
                <VerticalConduit text="Policy-Controlled Action" delay={i * 0.2 + 0.3} />

                <div className="flex h-[128px] flex-1 flex-col justify-center rounded-2xl bg-[#12314b] p-5 text-white shadow-[0_8px_20px_rgba(18,49,75,0.20)]">
                  <span className="badge-label text-white/70">
                    Measurable Outcome
                  </span>
                  <p className="mt-1.5 text-lg font-semibold leading-tight text-white">{flow.outcome}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-white/90" />
                    <span className="text-xs leading-tight text-white/80">{flow.metric}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <p className="pt-3 text-center text-[11px] leading-relaxed text-[#0a0a1a]/40">
            Solution patterns reflect published enterprise AI guidance from Microsoft,
            IBM, and McKinsey. Outcomes vary by workflow, data quality, governance,
            and user adoption.
          </p>
        </div>
      </div>
    </section>
  );
}
