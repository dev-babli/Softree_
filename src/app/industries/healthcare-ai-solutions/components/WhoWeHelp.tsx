"use client";

import React from "react";
import Link from "next/link";
import {
  MessageSquare,
  Brain,
  ClipboardCheck,
  CircleDollarSign,
  Workflow,
  BarChart3,
  ArrowRight,
} from "lucide-react";

export const WhoWeHelp = ({ simple = false }: { simple?: boolean }) => {
  const items = [
    {
      title: "Patient Engagement & Support",
      desc: "Deliver better patient experiences with AI-powered virtual assistants, conversational interfaces, intelligent search, self-service solutions, and personalized patient communication.",
      icon: MessageSquare,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "Clinical Knowledge & Operations",
      desc: "Improve clinical and operational efficiency with RAG-powered knowledge systems, intelligent information retrieval, documentation assistance, and AI-driven workflow intelligence.",
      icon: Brain,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "Prior Authorization",
      desc: "Accelerate prior authorization with AI-powered document extraction, classification, validation, summarization, and intelligent workflow orchestration.",
      icon: ClipboardCheck,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "Revenue Cycle Management",
      desc: "Optimize revenue cycle operations through intelligent claims processing, document analysis, billing support, workflow automation, and AI-driven operational intelligence.",
      icon: CircleDollarSign,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "Healthcare Administration",
      desc: "Reduce administrative workload by automating repetitive processes such as document handling, scheduling support, data processing, and internal service operations.",
      icon: Workflow,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "Healthcare Data & Decision Intelligence",
      desc: "Turn complex healthcare data into actionable insights with AI and advanced analytics that identify trends, improve visibility, and support faster, data-driven operational decisions.",
      icon: BarChart3,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="flex flex-col justify-between h-full w-full lg:max-w-[600px] mx-auto lg:mx-0 px-4 lg:px-2 pt-0">
      {!simple && (
        <div className="mb-2">
          {/* Heading */}
          <h2 className="text-2xl md:text-3xl lg:text-[24px] xl:text-[26px] font-extrabold text-slate-900 leading-[1.15] mb-1.5 tracking-tight pr-4">
            AI-POWERED HEALTHCARE CAPABILITIES
          </h2>

          {/* Description */}
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-3">
            Discover how Artificial Intelligence transforms patient care, streamlines healthcare operations, and empowers medical professionals.
          </p>
        </div>
      )}

      {/* Healthcare Use Cases List */}
      <div className="flex flex-col justify-between flex-1">
        {items.map((item, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 py-2 sm:py-2.5 ${
              i !== items.length - 1 ? "border-b border-slate-100" : ""
            }`}
          >
            <div className={`shrink-0 w-8 h-8 rounded-full ${item.bg} flex items-center justify-center mt-0.5 border border-orange-200/40`}>
              <item.icon className={`w-4 h-4 ${item.color}`} />
            </div>
            <div className="flex flex-col pt-0">
              <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 leading-tight mb-0.5">
                {item.title}
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Single Section-Level CTA */}
      <div className="pt-4 mt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs sm:text-sm text-slate-600 font-medium text-center sm:text-left">
          Ready to deploy customized AI across your healthcare workflows?
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white text-xs sm:text-sm font-semibold shadow-md shadow-orange-500/20 transition-all duration-200 shrink-0 group"
        >
          <span>Contact Us</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};
