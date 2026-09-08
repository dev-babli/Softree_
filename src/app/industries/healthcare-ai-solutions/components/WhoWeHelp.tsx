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
      cta: "Explore Patient AI Solutions",
      href: "/contact",
      icon: MessageSquare,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "Clinical Knowledge & Operations",
      desc: "Improve clinical and operational efficiency with RAG-powered knowledge systems, intelligent information retrieval, documentation assistance, and AI-driven workflow intelligence.",
      cta: "Explore Clinical AI Solutions",
      href: "/contact",
      icon: Brain,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "Prior Authorization",
      desc: "Accelerate prior authorization with AI-powered document extraction, classification, validation, summarization, and intelligent workflow orchestration.",
      cta: "Explore Prior Authorization",
      href: "/contact",
      icon: ClipboardCheck,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "Revenue Cycle Management",
      desc: "Optimize revenue cycle operations through intelligent claims processing, document analysis, billing support, workflow automation, and AI-driven operational intelligence.",
      cta: "Explore RCM Solutions",
      href: "/contact",
      icon: CircleDollarSign,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "Healthcare Administration",
      desc: "Reduce administrative workload by automating repetitive processes such as document handling, scheduling support, data processing, and internal service operations.",
      cta: "Automate Healthcare Operations",
      href: "/contact",
      icon: Workflow,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "Healthcare Data & Decision Intelligence",
      desc: "Turn complex healthcare data into actionable insights with AI and advanced analytics that identify trends, improve visibility, and support faster, data-driven operational decisions.",
      cta: "Explore Healthcare Data Intelligence",
      href: "/contact",
      icon: BarChart3,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="flex flex-col justify-between h-full w-full lg:max-w-[600px] mx-auto lg:mx-0 px-4 lg:px-2 pt-0">
      {!simple && (
        <div className="mb-1">
          {/* Heading */}
          <h2 className="text-2xl md:text-3xl lg:text-[24px] xl:text-[26px] font-extrabold text-slate-900 leading-[1.15] mb-1.5 tracking-tight pr-4">
            HEALTHCARE AI <span className="text-[#FF6B00]">USE CASES</span>
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
            <div className={`shrink-0 w-8 h-8 rounded-full ${item.bg} flex items-center justify-center mt-0.5`}>
              <item.icon className={`w-4 h-4 ${item.color}`} />
            </div>
            <div className="flex flex-col pt-0">
              <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 leading-tight mb-0.5">
                {item.title}
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-500 leading-normal mb-1.5">
                {item.desc}
              </p>
              <Link
                href={item.href}
                className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-[#FF6B00] hover:text-[#e05e00] group/cta w-fit transition-all"
              >
                <span>{item.cta}</span>
                <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover/cta:translate-x-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
