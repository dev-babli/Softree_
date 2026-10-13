"use client";

import React from "react";
import { Building, Settings, Code, Blocks, Building2 } from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";

import dynamic from 'next/dynamic';

const NetworkGlobe = dynamic(() => import('@/app/services/ai-development-services/components/NetworkGlobe'), { ssr: true });

export const AIAgentsServices = ({ simple = false }: { simple?: boolean }) => {
  const items = [
    {
      title: "Enterprises",
      desc: "Automate business processes with AI agents built around your workflows, enterprise knowledge, and existing applications.",
      subdesc: "Identify suitable use cases and integrate AI capabilities with business systems, data sources, and operational processes.",
      icon: Building,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
    {
      title: "AI & Data Teams",
      desc: "Extend your technical capabilities with AI agent architecture, LLM integration, RAG, and workflow orchestration expertise.",
      subdesc: "Get engineering support to connect models, enterprise data, APIs, and business applications into practical AI solutions.",
      icon: Settings,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
    {
      title: "Consulting Firms",
      desc: "Expand your AI consulting and delivery capabilities with specialized AI agent development support.",
      subdesc: "Use Softree as an engineering partner for client projects involving custom agents, knowledge retrieval, workflow automation, and enterprise integrations.",
      icon: Code,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
    {
      title: "System Integrators",
      desc: "Add AI agent development to your enterprise modernization and integration projects.",
      subdesc: "Extend your delivery capacity with engineers supporting agent architecture, API connectivity, data integration, testing, and deployment.",
      icon: Blocks,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
    {
      title: "Microsoft & Technology Partners",
      desc: "Build AI-powered solutions that complement your existing Microsoft and enterprise technology services.",
      subdesc: "Access offshore engineering support for AI agents, Azure AI, Copilot integrations, Power Platform workflows, and connected business applications.",
      icon: Building2,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
  ];

  return (
    <section className="bg-white pt-8 md:pt-12 pb-8 md:pb-12 text-slate-900 scroll-mt-24">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 lg:gap-x-16 gap-y-8 lg:gap-y-10 items-stretch">

          {/* Top Area: Eyebrow, then Heading & Intro side-by-side */}
          {!simple && (
            <div className="lg:col-span-12 flex flex-col">
              <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-3.5 py-1 rounded-full border border-white/60 mb-4 inline-block self-start">
                <span className="typo-caption text-[#FF6B2C] uppercase">
                  WHO WE HELP & WHERE WE OPERATE
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-4 items-start">
                <h2 className="typo-heading-2 text-slate-900 pr-4">
                  AI Agent Development for <br className="hidden lg:block" /><span className="text-[#FF6B2C]">Businesses & Technology Partners</span>
                </h2>

                <p className="typo-description text-slate-500 w-full pt-1.5">
                  We help enterprises, consulting firms, system integrators, and technology companies build custom AI agents, connect business systems, and automate complex workflows with dedicated offshore AI engineering support.
                </p>
              </div>
            </div>
          )}

          {/* Bottom Row: Who We Help Items (Left) and Globe (Right) */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full w-full">
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
                Ready to build and scale your AI agent solutions?
              </p>
              <FlowButton
                href="/contact"
                text="EXPLORE AI AGENT DEVELOPMENT"
                variant="orange-filled"
                className="shrink-0"
              />
            </div>
          </div>

          <div className="lg:col-span-6 w-full flex justify-center lg:justify-end items-stretch">
            <NetworkGlobe
              heading="Where Our Clients Are"
              tagline="GLOBAL REACH. LOCAL UNDERSTANDING."
              subheading="We work with businesses and technology partners across 13+ countries, providing offshore engineering support to build, integrate, and scale AI solutions for diverse business needs."
              storesLabel="13+ countries served"
              caption="We work with businesses and technology partners across 13+ countries, providing offshore engineering support to build, integrate, and scale AI solutions for diverse business needs."
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default AIAgentsServices;
