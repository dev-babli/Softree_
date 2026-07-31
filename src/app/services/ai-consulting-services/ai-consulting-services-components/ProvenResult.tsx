"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AlertCircle, Compass, CheckCircle2, ArrowRight } from "lucide-react";
import SectionBadge from "../../ai-development-services/components/SectionBadge";

const provenResults = [
  {
    category: "PROCESS AUTOMATION",
    title: "HR Process Re-engineering",
    challenge: "HR departments were burdened with manual, repetitive onboarding, leaving operations, and answering daily policy FAQs, creating massive delays.",
    solution: "Mapped enterprise workflows to implement automated routines and low-latency custom conversational AI agents on Power Platform.",
    outcome: "Streamlined onboarding cycles and automated routing of internal employee requests, saving administrative hours.",
    metric: "75%",
    metricLabel: "Workload Reduction",
    link: "https://www.softreetechnology.com/case-studies/how-an-enterprise-organization-automated-hr-operations-using-ai"
  },
  {
    category: "AI STRATEGY",
    title: "AI Readiness & Roadmap",
    challenge: "A financial client wanted to adopt generative AI but lacked data governance, compliance guidelines, and a clear ROI map to justify the cost.",
    solution: "Conducted security audits, evaluated data infrastructure, and designed a phased Copilot and Azure AI implementation plan.",
    outcome: "10-usecase roadmap mapped to clear business value, accelerating secure internal approval timelines.",
    metric: "4 WKS",
    metricLabel: "Strategic Roadmap",
    link: "https://www.softreetechnology.com/case-studies/ai-competitive-gap-report-businesses-outperform-competitors"
  },
  {
    category: "HEALTHCARE CONSULTING",
    title: "Clinical Workflow Optimization",
    challenge: "Clinical staff spent excessive time on manual patient scheduling and data entry, leading to doctor fatigue and triage scheduling errors.",
    solution: "Designed a secure digital blueprint integrating AI agents with Power Platform to automate scheduling and triage workflows.",
    outcome: "Lowered administrative work for nurses and improved general patient intake scheduling cycles.",
    metric: "58%",
    metricLabel: "Overhead Reduction",
    link: "https://www.softreetechnology.com/case-studies/ai-powered-healthcare-operations-platform"
  }
];

export default function ProvenResults() {
  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden font-sans bg-white">
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <SectionBadge text="PROVEN VALUE" variant="line" />
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold text-[#111827] mt-4 mb-4 tracking-tight leading-tight">
            Consulting Metrics That <span className="text-[#FF5812]">Prove the Value</span>
          </h2>
          <p className="text-[16px] lg:text-[17px] text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
            We measure success by the tangible business outcomes we deliver. Here are the core efficiency, strategy, and scale metrics achieved by our clients.
          </p>
        </motion.div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-10">
          {provenResults.map((result, idx) => {
            const gradientBg = idx === 0 
              ? "from-blue-600 to-blue-500" 
              : idx === 1 
                ? "from-[#FF6B00] via-[#FF5812] to-[#E64C00]" 
                : "from-purple-600 to-purple-500";
            return (
              <div 
                key={idx} 
                className="flex flex-row items-stretch gap-4 sm:gap-6 bg-slate-50/40 border border-slate-200/50 p-5 sm:p-6 rounded-[2rem] sm:rounded-[2.5rem] shadow-sm hover:border-[#FF5812]/10 transition-all duration-300"
              >
                {/* Left Content Block */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-2">
                      {result.category}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mb-6 leading-tight">
                      {result.title}
                    </h3>

                    {/* Challenge */}
                    <div className="flex items-start gap-2.5 mb-4">
                      <span className="p-1 rounded-lg bg-orange-50 text-orange-500 border border-orange-100 shrink-0 mt-0.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                      </span>
                      <div>
                        <h4 className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-0.5">Business Challenge</h4>
                        <p className="text-[12.5px] text-slate-600 leading-relaxed">{result.challenge}</p>
                      </div>
                    </div>

                    {/* Solution */}
                    <div className="flex items-start gap-2.5 mb-4">
                      <span className="p-1 rounded-lg bg-blue-50 text-blue-500 border border-blue-100 shrink-0 mt-0.5">
                        <Compass className="w-3.5 h-3.5" />
                      </span>
                      <div>
                        <h4 className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-0.5">Our Solution</h4>
                        <p className="text-[12.5px] text-slate-600 leading-relaxed">{result.solution}</p>
                      </div>
                    </div>

                    {/* Outcome */}
                    <div className="flex items-start gap-2.5">
                      <span className="p-1 rounded-lg bg-green-50 text-green-500 border border-green-100 shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                      <div>
                        <h4 className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-0.5">Outcome</h4>
                        <p className="text-[12.5px] text-slate-600 leading-relaxed">{result.outcome}</p>
                      </div>
                    </div>
                  </div>

                  <Link 
                    href={result.link} 
                    className="inline-flex items-center gap-1 text-[12px] font-bold text-[#FF5812] hover:underline mt-6"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Right Vertical Metric Pill Card */}
                <div className={`w-[85px] sm:w-[95px] shrink-0 rounded-[1.25rem] bg-gradient-to-b ${gradientBg} border border-white/10 overflow-hidden relative shadow-md flex flex-col justify-end p-4 text-white`}>
                  {/* Subtle Grid overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:0.75rem_0.75rem] pointer-events-none" />
                  {/* Highlight Glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_60%)] pointer-events-none" />

                  <div className="relative z-10">
                    <div className="text-2xl sm:text-3xl font-black tracking-tight leading-none mb-1">
                      {result.metric}
                    </div>
                    <div className="text-[8px] sm:text-[9px] font-bold opacity-90 leading-tight uppercase">
                      {result.metricLabel}
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
