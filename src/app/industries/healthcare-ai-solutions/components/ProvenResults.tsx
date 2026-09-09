"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, Compass, CheckCircle2 } from "lucide-react";
import SectionBadge from "./SectionBadge";

const provenResults = [
  {
    category: "AGENTIC AI",
    title: "Custom AI Agent Development",
    challenge: "Businesses struggle with complex, multi-step workflows that traditional automation tools cannot handle, causing high labor costs and slower response times.",
    solution: "Build autonomous, multi-agent orchestrations with human-in-the-loop validation designed to handle complex decision-making processes.",
    outcome: "Fully automated operational pipelines that run 24/7 with zero-latency handoffs and complete governance trails.",
    metric: "75%",
    metricLabel: "Automation Rate",
    link: ""
  },
  {
    category: "MODEL ENGINEERING",
    title: "Generative AI & RAG Engineering",
    challenge: "Static document storage leads to information silos, making it difficult for employees or support systems to retrieve accurate enterprise knowledge.",
    solution: "Develop secure Retrieval-Augmented Generation (RAG) systems and fine-tuned LLMs connected directly to your proprietary enterprise databases.",
    outcome: "Real-time semantic search and contextual chat systems that answer complex compliance, product, or policy queries in seconds.",
    metric: "99%",
    metricLabel: "Query Accuracy",
    link: ""
  },
  {
    category: "COPILOT STUDIO",
    title: "Custom Copilot Studio Solutions",
    challenge: "Off-the-shelf Microsoft Copilots are powerful but lack custom integrations to execute actions directly inside legacy CRM, ERP, or internal databases.",
    solution: "Extend Copilot Studio capability using custom Power Platform connectors, secure APIs, and custom agentic actions.",
    outcome: "A unified conversational copilot that can read data, trigger Power Automate workflows, and perform transactions securely.",
    metric: "4-6 WKS",
    metricLabel: "Deployment Time",
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
            AI Development Services Built for <span className="text-[#FF5812]">Enterprise Certainty</span>
          </h2>
          <p className="text-[16px] lg:text-[17px] text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
            We engineer production-ready AI applications—from autonomous agents to custom copilots—that integrate securely with your systems and optimize core operations.
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
                ctaText: "text-blue-600 hover:text-blue-700",
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
                ctaText: "text-[#FF5812] hover:text-[#E64C00]",
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
                ctaText: "text-purple-600 hover:text-purple-700",
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
                        <h4 className={`text-[9px] font-bold tracking-wider uppercase mb-0.5 ${theme.textAccent}`}>Our Solution</h4>
                        <p className="text-[12px] text-slate-700 leading-relaxed font-medium">{result.solution}</p>
                      </div>
                    </div>

                    {/* Outcome */}
                    <div className={`flex items-start gap-2.5 p-2 px-2.5 rounded-r-xl rounded-l-sm border border-l-[3px] ${theme.blockBg} ${theme.blockBorder} ${theme.leftBorder} transition-colors duration-200`}>
                      <span className={`p-1 rounded-md ${theme.iconBg} ${theme.iconText} border ${theme.iconBorder} shrink-0 mt-0.5`}>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                      <div>
                        <h4 className={`text-[9px] font-bold tracking-wider uppercase mb-0.5 ${theme.textAccent}`}>Outcome</h4>
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
