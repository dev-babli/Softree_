"use client";

import React from "react";
import { Building, Settings, Code, Blocks, Building2 } from "lucide-react";

export const WhoWeHelp = ({ simple = false }: { simple?: boolean }) => {
  const items = [
    {
      title: "Consulting Firms",
      desc: "Extend your AI delivery capabilities with an experienced offshore engineering team.",
      icon: Building,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      title: "System Integrators",
      desc: "Add Agentic AI expertise to your existing client engagements and technology solutions.",
      icon: Settings,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      title: "Technology & Product Companies",
      desc: "Accelerate AI product development with dedicated offshore engineering capacity.",
      icon: Code,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      title: "ERP & Microsoft Partners",
      desc: "Add AI agents, copilots, and intelligent automation to your existing solutions.",
      icon: Blocks,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      title: "Enterprises",
      desc: "Build and scale AI-powered applications with a dedicated engineering partner.",
      icon: Building2,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="flex flex-col justify-start h-full w-full lg:max-w-[600px] mx-auto lg:mx-0 px-4 lg:px-2 pt-0">
      {!simple && (
        <>
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[10px] font-bold tracking-widest text-[#FF6B00] uppercase mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
            WHO WE HELP
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-[28px] xl:text-[32px] font-extrabold text-slate-900 leading-[1.15] mb-3 tracking-tight pr-4">
            AI ENGINEERING FOR COMPANIES THAT NEED TO <span className="text-[#FF6B00]">MOVE FASTER</span>
          </h2>

          {/* Description */}
          <p className="text-slate-500 text-sm lg:text-base leading-relaxed mb-5">
            Whether you need to expand your AI delivery capabilities, build a dedicated engineering team, or deliver AI solutions under your own brand, Softree provides the expertise and capacity to help you scale.
          </p>
        </>
      )}

      {/* 5 Content List */}
      <div className="flex flex-col">
        {items.map((item, i) => (
          <div
            key={i}
            className={`flex items-start gap-4 py-4 ${
              i !== items.length - 1 ? "border-b border-slate-200" : ""
            }`}
          >
            <div className={`shrink-0 w-10 h-10 rounded-full ${item.bg} flex items-center justify-center`}>
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <div className="flex flex-col pt-0.5">
              <h3 className="text-[15px] md:text-base font-bold text-slate-900 mb-1">
                {item.title}
              </h3>
              <p className="text-[13px] md:text-sm text-slate-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
