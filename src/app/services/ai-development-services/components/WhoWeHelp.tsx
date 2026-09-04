"use client";

import React from "react";
import Link from "next/link";
import { Building, Settings, Code, Blocks, Building2, ArrowRight } from "lucide-react";

export const WhoWeHelp = ({ simple = false }: { simple?: boolean }) => {
  const items = [
    {
      title: "Consulting Firms",
      desc: "Extend your AI delivery capabilities with an experienced offshore engineering team.",
      subdesc: "Use Softree behind the scenes or alongside your consultants to build and deliver AI solutions for your clients.",
      cta: "Explore Consulting Partnerships",
      href: "/contact",
      icon: Building,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
    {
      title: "System Integrators",
      desc: "Add Agentic AI expertise to your existing client engagements.",
      subdesc: "Build AI agents, copilots, RAG solutions, intelligent workflows, and enterprise integrations without expanding your internal engineering team.",
      cta: "Explore SI Partnerships",
      href: "/contact",
      icon: Settings,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
    {
      title: "Technology & Product Companies",
      desc: "Accelerate AI product development with dedicated engineering capacity.",
      subdesc: "Add AI capabilities to existing products or build new AI-native applications with a team aligned to your roadmap.",
      cta: "Explore Product Engineering",
      href: "/contact",
      icon: Code,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
    {
      title: "ERP & Microsoft Partners",
      desc: "Add AI agents, copilots, and intelligent automation to your existing Microsoft and ERP solutions.",
      subdesc: "Extend the value of your technology stack with practical enterprise AI.",
      cta: "Explore Microsoft AI",
      href: "/contact",
      icon: Blocks,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
    {
      title: "Enterprises",
      desc: "Build and scale AI-powered applications with a dedicated engineering partner.",
      subdesc: "From individual use cases to enterprise-wide AI capabilities, Softree provides the engineering capacity to move from idea to production.",
      cta: "Explore Enterprise AI",
      href: "/contact",
      icon: Building2,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="flex flex-col justify-between h-full w-full lg:max-w-[620px] mx-auto lg:mx-0 px-2 sm:px-4 lg:px-2 pt-0">
      {!simple && (
        <div className="mb-3.5">
          {/* Eyebrow */}
          <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-3.5 py-1 rounded-full border border-white/60 mb-2 inline-block self-start">
            <span className="text-[11px] font-bold text-[#FF6B2C] tracking-widest uppercase">
              WHO WE HELP
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-xl sm:text-2xl lg:text-[27px] font-extrabold text-slate-900 leading-[1.2] mb-1.5 tracking-tight pr-2">
            AI ENGINEERING FOR COMPANIES THAT NEED TO <span className="text-[#FF6B2C]">MOVE FASTER</span>
          </h2>

          {/* Subtitle */}
          <h3 className="text-[14.5px] sm:text-[15.5px] font-bold text-slate-800 mb-1 leading-snug">
            Extend Your AI Capabilities Without Building Another Team
          </h3>

          {/* Description */}
          <p className="text-slate-500 text-[13px] sm:text-[13.5px] leading-relaxed max-w-xl">
            AI adoption is moving quickly. Building the engineering capability to support it takes time. Softree provides the AI architecture, engineering, development, data, cloud, integration, and QA expertise you need to deliver AI solutions faster.
          </p>
        </div>
      )}

      {/* 5 Content List */}
      <div className="flex flex-col divide-y divide-slate-100">
        {items.map((item, i) => (
          <div
            key={i}
            className="py-2.5 first:pt-1.5 last:pb-1 group transition-colors"
          >
            <div className="flex items-start gap-3.5">
              <div className={`shrink-0 w-8.5 h-8.5 rounded-lg ${item.bg} border border-orange-100 flex items-center justify-center group-hover:scale-105 group-hover:bg-[#FF6B2C] group-hover:text-white transition-all duration-300 mt-0.5`}>
                <item.icon className={`w-4.5 h-4.5 ${item.color} group-hover:text-white transition-colors`} />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                  <h4 className="text-[15.5px] sm:text-[16.5px] font-bold text-slate-900 group-hover:text-[#FF6B2C] transition-colors leading-tight">
                    {item.title}
                  </h4>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 text-[12.5px] font-bold text-[#FF6B2C] hover:text-[#D4480A] transition-colors group/btn shrink-0"
                  >
                    <span>{item.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
                <p className="text-[13px] sm:text-[13.5px] font-semibold text-slate-700 leading-snug mt-0.5">
                  {item.desc}
                </p>
                <p className="text-[12px] sm:text-[12.5px] text-slate-500 leading-snug mt-0.5">
                  {item.subdesc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
