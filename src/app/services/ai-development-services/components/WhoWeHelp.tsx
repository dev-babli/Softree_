"use client";

import React from "react";
import { Building, Settings, Code, Blocks, Building2 } from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";

export const WhoWeHelp = ({ simple = false }: { simple?: boolean }) => {
  const items = [
    {
      title: "Consulting Firms",
      desc: "Deliver AI projects for clients without building a full in-house AI team.",
      subdesc: "Use Softree as a white-label engineering partner or alongside your consultants to build AI agents, connect business systems, and automate client workflows.",
      icon: Building,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
    {
      title: "System Integrators",
      desc: "Bring AI development into existing client transformation projects.",
      subdesc: "Add engineering support for agent development, API connections, business-system integrations, and workflow automation.",
      icon: Settings,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
    {
      title: "Technology & Product Companies",
      desc: "Add AI features to your products with focused engineering support.",
      subdesc: "Build intelligent assistants, knowledge search, and automated workflows that work with your product data and application stack.",
      icon: Code,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
    {
      title: "ERP & Microsoft Partners",
      desc: "Extend Microsoft and ERP solutions with AI assistants and automated workflows.",
      subdesc: "Connect AI capabilities with Microsoft 365, Azure AI, Power Platform, and the business applications your clients already use.",
      icon: Blocks,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
    {
      title: "Businesses & Enterprise Teams",
      desc: "Apply AI to specific workflows across departments, data, and business applications.",
      subdesc: "Start with a defined business use case, then develop and integrate the solution with the systems your teams already use.",
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
