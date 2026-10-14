"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, Compass, CheckCircle2 } from "lucide-react";
import SectionBadge from "@/app/services/ai-development-services/components/SectionBadge";

const provenResults = [
  {
    category: "AI STRATEGY",
    title: "AI Strategy & Advisory",
    challenge: "Organizations may struggle to identify the right AI opportunities, prioritize competing initiatives, and connect AI investments with clear business objectives.",
    solution: "We assess business processes, identify potential AI use cases, evaluate implementation feasibility, and develop a phased AI roadmap aligned with organizational priorities.",
    outcome: "A prioritized AI roadmap outlining potential use cases, dependencies, implementation stages, and business measures for evaluating progress.",
    metric: "10+",
    metricLabel: "ROI-Mapped Use Cases",
    link: ""
  },
  {
    category: "ASSESSMENTS",
    title: "AI Readiness Assessment",
    challenge: "Data quality issues, legacy infrastructure, security requirements, and disconnected systems can create obstacles to successful AI implementation.",
    solution: "We review relevant data sources, technology infrastructure, security considerations, existing processes, and integration requirements to identify readiness gaps.",
    outcome: "A practical readiness assessment that highlights technical and operational gaps, implementation dependencies, and recommended next steps.",
    metric: "100%",
    metricLabel: "Data & Tech Audit",
    link: ""
  },
  {
    category: "MICROSOFT STACK",
    title: "Microsoft AI Consulting",
    challenge: "Organizations need to understand how Microsoft AI technologies can work with existing systems, data, security policies, and business applications.",
    solution: "We assess suitable Microsoft AI capabilities, including Azure AI, Azure OpenAI, Microsoft Copilot Studio, and Power Platform, based on your use cases and current technology environment.",
    outcome: "A solution approach covering technology selection, integration requirements, implementation priorities, and opportunities to use existing Microsoft capabilities effectively.",
    metric: "3.5x",
    metricLabel: "Licensing Value ROI",
    link: ""
  }
];

export default function ProvenResults() {
  return (
    <section className="relative w-full py-12 md:py-16 lg:py-20 overflow-hidden font-sans bg-white">
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <SectionBadge text="OUR SERVICES" variant="line" />
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold text-[#111827] mt-4 mb-4 tracking-tight leading-tight">
            AI Consulting Services for <span className="text-[#FF5812]">Strategy, Assessment & Implementation</span>
          </h2>
          <p className="text-[16px] lg:text-[17px] text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
            Our AI consulting services help you identify valuable AI opportunities, assess your technical requirements, and plan practical solutions that align with your business goals and existing technology.
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

            const themes = [
              {
                // Blue Theme
                cardHover: "hover:border-blue-500/25",
                textAccent: "text-blue-600",
                blockBg: "bg-blue-50/20",
                blockBorder: "border-blue-100/50",
                leftBorder: "border-l-blue-500",
                iconBg: "bg-blue-50",
                iconBorder: "border-blue-100",
                iconText: "text-blue-600",
              },
              {
                // Orange Theme
                cardHover: "hover:border-[#FF5812]/25",
                textAccent: "text-[#FF5812]",
                blockBg: "bg-orange-50/20",
                blockBorder: "border-orange-100/50",
                leftBorder: "border-l-[#FF5812]",
                iconBg: "bg-orange-50",
                iconBorder: "border-orange-100",
                iconText: "text-[#FF5812]",
              },
              {
                // Purple Theme
                cardHover: "hover:border-purple-500/25",
                textAccent: "text-purple-600",
                blockBg: "bg-purple-50/20",
                blockBorder: "border-purple-100/50",
                leftBorder: "border-l-purple-500",
                iconBg: "bg-purple-50",
                iconBorder: "border-purple-100",
                iconText: "text-purple-600",
              }
            ];

            const theme = themes[idx] || themes[0];

            return (
              <div
                key={idx}
                className={`flex flex-row items-stretch gap-3 sm:gap-4 bg-slate-50/40 border border-slate-200/50 p-4 sm:p-5 rounded-[1.75rem] sm:rounded-[2rem] shadow-sm ${theme.cardHover} transition-all duration-300`}
              >
                {/* Left Content Block */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1">
                      {result.category}
                    </span>
                    <h3 className="text-[16px] font-bold text-slate-900 mb-3 leading-tight">
                      {result.title}
                    </h3>

                    {/* Challenge */}
                    <div className={`flex items-start gap-2.5 p-2 px-2.5 rounded-r-xl rounded-l-sm border border-l-[3px] ${theme.blockBg} ${theme.blockBorder} ${theme.leftBorder} mb-2 transition-colors duration-200`}>
                      <span className={`p-1 rounded-md ${theme.iconBg} ${theme.iconText} border ${theme.iconBorder} shrink-0 mt-0.5`}>
                        <AlertCircle className="w-3.5 h-3.5" />
                      </span>
                      <div>
                        <h4 className={`text-[9px] font-bold tracking-wider uppercase mb-0.5 ${theme.textAccent}`}>Business Challenge</h4>
                        <p className="text-[12px] text-slate-700 leading-relaxed font-medium">{result.challenge}</p>
                      </div>
                    </div>

                    {/* Solution */}
                    <div className={`flex items-start gap-2.5 p-2 px-2.5 rounded-r-xl rounded-l-sm border border-l-[3px] ${theme.blockBg} ${theme.blockBorder} ${theme.leftBorder} mb-2 transition-colors duration-200`}>
                      <span className={`p-1 rounded-md ${theme.iconBg} ${theme.iconText} border ${theme.iconBorder} shrink-0 mt-0.5`}>
                        <Compass className="w-3.5 h-3.5" />
                      </span>
                      <div>
                        <h4 className={`text-[9px] font-bold tracking-wider uppercase mb-0.5 ${theme.textAccent}`}>Our Approach</h4>
                        <p className="text-[12px] text-slate-700 leading-relaxed font-medium">{result.solution}</p>
                      </div>
                    </div>

                    {/* Outcome */}
                    <div className={`flex items-start gap-2.5 p-2 px-2.5 rounded-r-xl rounded-l-sm border border-l-[3px] ${theme.blockBg} ${theme.blockBorder} ${theme.leftBorder} transition-colors duration-200`}>
                      <span className={`p-1 rounded-md ${theme.iconBg} ${theme.iconText} border ${theme.iconBorder} shrink-0 mt-0.5`}>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                      <div>
                        <h4 className={`text-[9px] font-bold tracking-wider uppercase mb-0.5 ${theme.textAccent}`}>Expected Outcome</h4>
                        <p className="text-[12px] text-slate-700 leading-relaxed font-medium">{result.outcome}</p>
                      </div>
                    </div>
                  </div>
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
