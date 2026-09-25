"use client";

import React from "react";
import { Building, Settings, Code, Blocks, Building2 } from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";

export const WhoWeHelp = ({ simple = false }: { simple?: boolean }) => {
  const items = [
    {
      title: "Consulting Firms",
      desc: "Extend your AI delivery capabilities with an experienced offshore engineering team.",
      subdesc: "Use Softree behind the scenes or alongside your consultants to build and deliver Agentic AI, AI agents, automation, and connected AI solutions for your clients.",
      icon: Building,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
    {
      title: "System Integrators",
      desc: "Add Agentic AI expertise to your existing client engagements.",
      subdesc: "Extend your delivery team with AI engineers supporting architecture, agent development, integrations, automation, and production delivery.",
      icon: Settings,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
    {
      title: "Technology & Product Companies",
      desc: "Accelerate AI product development with dedicated engineering capacity.",
      subdesc: "Extend your product engineering capacity with AI specialists who can build agents, RAG solutions, intelligent workflows, and AI-powered product experiences.",
      icon: Code,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
    {
      title: "ERP & Microsoft Partners",
      desc: "Add AI agents, Copilot capabilities, RAG, and workflow automation to your existing Microsoft and business application solutions.",
      subdesc: "Extend the value of your technology stack with practical enterprise AI.",
      icon: Blocks,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
    {
      title: "Businesses & Enterprise Teams",
      desc: "Build AI solutions around real business workflows, data, and applications with an experienced engineering partner.",
      subdesc: "From individual use cases to enterprise-wide AI capabilities, Softree provides the engineering capacity to move from idea to production.",
      icon: Building2,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="flex flex-col justify-between h-full w-full lg:max-w-[660px] mx-auto lg:mx-0 px-2 sm:px-4 lg:px-2 pt-0">
      {!simple && (
        <div className="mb-4">
          {/* Eyebrow */}
          <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-3.5 py-1 rounded-full border border-white/60 mb-2 inline-block self-start">
            <span className="typo-caption text-[#FF6B2C]">
              WHO WE HELP
            </span>
          </div>

          {/* Heading */}
          <h2 className="typo-heading-3 sm:typo-heading-2 text-slate-900 mb-2 pr-2">
            AI ENGINEERING FOR TEAMS THAT NEED TO <span className="text-[#FF6B2C]">MOVE FASTER</span>
          </h2>
        </div>
      )}

      {/* 5 Content List */}
      <div className="flex flex-col divide-y divide-slate-100">
        {items.map((item, i) => (
          <div
            key={i}
            className="py-3 first:pt-1.5 last:pb-1 group transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className={`shrink-0 w-10 h-10 rounded-lg ${item.bg} border border-orange-100 flex items-center justify-center group-hover:scale-105 group-hover:bg-[#FF6B2C] group-hover:text-white transition-all duration-300 mt-0.5`}>
                <item.icon className={`w-5 h-5 ${item.color} group-hover:text-white transition-colors`} />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <h4 className="typo-heading-4 text-slate-900 group-hover:text-[#FF6B2C] transition-colors">
                  {item.title}
                </h4>
                <p className="typo-body-lg font-semibold text-slate-700 mt-1">
                  {item.desc}
                </p>
                <p className="typo-body-sm text-slate-500 mt-1">
                  {item.subdesc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Single Section-Level CTA Below */}
      <div className="pt-4 mt-auto border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="typo-body text-slate-700 text-center sm:text-left">
          Ready to scale your AI engineering capabilities?
        </p>
        <FlowButton
          href="/contact"
          text="Explore Partnerships"
          variant="orange-filled"
          className="shrink-0"
        />
      </div>
    </div>
  );
};
