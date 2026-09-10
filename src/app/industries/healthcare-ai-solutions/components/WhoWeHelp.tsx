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
    <div className="flex flex-col justify-between h-full w-full lg:max-w-[660px] mx-auto lg:mx-0 px-4 lg:px-2 pt-0">
      {!simple && (
        <div className="mb-4">
          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-extrabold font-['Plus_Jakarta_Sans',sans-serif] text-slate-900 leading-[1.2] mb-3 tracking-tight">
            AI-POWERED HEALTHCARE CAPABILITIES
          </h2>

          {/* Description */}
          <p className="text-slate-600 text-[16px] sm:text-[17px] leading-relaxed mb-4">
            Discover how Artificial Intelligence transforms patient care, streamlines healthcare operations, and empowers medical professionals.
          </p>
        </div>
      )}

      {/* Healthcare Use Cases List */}
      <div className="flex flex-col justify-between flex-1">
        {items.map((item, i) => (
          <div
            key={i}
            className={`flex items-start gap-4 py-2.5 sm:py-3 ${
              i !== items.length - 1 ? "border-b border-slate-100" : ""
            }`}
          >
            <div className={`shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full ${item.bg} flex items-center justify-center mt-0.5 border border-orange-200/50`}>
              <item.icon className={`w-5 h-5 sm:w-5.5 sm:h-5.5 ${item.color}`} />
            </div>
            <div className="flex flex-col pt-0">
              <h3 className="text-[18px] sm:text-[19.5px] font-bold text-slate-900 leading-snug mb-1">
                {item.title}
              </h3>
              <p className="text-[15px] sm:text-[16px] text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Single Section-Level CTA */}
      <div className="pt-4 mt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[15px] sm:text-[16px] text-slate-700 font-medium text-center sm:text-left">
          Ready to deploy customized AI across your healthcare workflows?
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white text-[15px] sm:text-[16px] font-semibold shadow-md shadow-orange-500/20 transition-all duration-200 shrink-0 group"
        >
          <span>Contact Us</span>
          <ArrowRight className="w-4.5 h-4.5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};
