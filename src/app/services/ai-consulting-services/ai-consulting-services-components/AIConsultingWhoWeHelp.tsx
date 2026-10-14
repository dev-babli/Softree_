"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Building, Settings, Code, Blocks, Building2, Database, Workflow } from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";

const NetworkGlobe = dynamic(
  () => import("@/app/services/ai-development-services/components/NetworkGlobe"),
  { ssr: true }
);

interface WhoWeHelpItem {
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bg: string;
}

const ITEMS: WhoWeHelpItem[] = [
  {
    title: "Consulting Firms",
    desc: "Extend your AI consulting services with offshore specialists who support AI strategy, use-case planning, solution design, and implementation.",
    icon: Building,
    color: "text-[#FF6B2C]",
    bg: "bg-orange-50",
  },
  {
    title: "System Integrators",
    desc: "Add AI expertise to client projects with support for solution architecture, AI agents, RAG, workflow automation, and system integration.",
    icon: Settings,
    color: "text-[#FF6B2C]",
    bg: "bg-orange-50",
  },
  {
    title: "Technology & Product Companies",
    desc: "Explore AI opportunities for your products and extend delivery capacity for AI agents, intelligent workflows, and AI-powered product features.",
    icon: Code,
    color: "text-[#FF6B2C]",
    bg: "bg-orange-50",
  },
  {
    title: "Microsoft & ERP Partners",
    desc: "Identify opportunities to integrate Azure AI, Microsoft Copilot Studio, Power Platform, and AI capabilities into existing business applications.",
    icon: Blocks,
    color: "text-[#FF6B2C]",
    bg: "bg-orange-50",
  },
  {
    title: "Businesses & Growing Teams",
    desc: "Assess AI readiness, prioritize practical use cases, and plan AI solutions around your business processes, data, and existing systems.",
    icon: Building2,
    color: "text-[#FF6B2C]",
    bg: "bg-orange-50",
  },
  {
    title: "Data & Analytics Teams",
    desc: "Identify AI opportunities across your data environment, assess data readiness, and plan AI solutions that support business insights, knowledge retrieval, and data-driven decision-making.",
    icon: Database,
    color: "text-[#FF6B2C]",
    bg: "bg-orange-50",
  },
  {
    title: "Operations & Process Improvement Teams",
    desc: "Explore AI consulting opportunities to streamline business processes, automate repetitive tasks, and integrate AI capabilities into existing workflows based on your operational needs.",
    icon: Workflow,
    color: "text-[#FF6B2C]",
    bg: "bg-orange-50",
  },
];

export default function AIConsultingWhoWeHelp() {
  return (
    <section id="partnership" className="bg-white pt-8 md:pt-12 pb-8 md:pb-12 text-slate-900 scroll-mt-24">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 lg:gap-x-16 gap-y-8 lg:gap-y-10 items-start">

          {/* Top Area: Eyebrow, then Heading & Intro side-by-side */}
          <div className="lg:col-span-12 flex flex-col">
            <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-3.5 py-1 rounded-full border border-white/60 mb-4 inline-block self-start">
              <span className="typo-caption text-[#FF6B2C] uppercase">
                WHO WE HELP &amp; WHERE WE OPERATE
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-4 items-start">
              <h2 className="typo-heading-2 text-slate-900 pr-4">
                AI Consulting Services for <span className="text-[#FF6B2C]">Businesses & Technology Partners Worldwide</span>
              </h2>

              <p className="typo-description text-slate-500 w-full pt-1.5">
                We help consulting firms, technology companies, agencies, system integrators, and Microsoft partners identify AI opportunities and deliver practical solutions with experienced offshore AI consulting and engineering support.
              </p>
            </div>
          </div>

          {/* Bottom Row: Who We Help Items (Left) and Globe (Right) */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full w-full lg:max-w-[660px] mx-auto lg:mx-0 px-2 sm:px-4 lg:px-2 pt-0">
            {/* 5 Content List */}
            <div className="flex flex-col divide-y divide-slate-100">
              {ITEMS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="py-3 first:pt-1.5 last:pb-1 group transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`shrink-0 w-10 h-10 rounded-lg ${item.bg} border border-orange-100 flex items-center justify-center group-hover:scale-105 group-hover:bg-[#FF6B2C] group-hover:text-white transition-all duration-300 mt-0.5`}
                      >
                        <Icon className={`w-5 h-5 ${item.color} group-hover:text-white transition-colors`} />
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <h3 className="typo-heading-4 text-slate-900 group-hover:text-[#FF6B2C] transition-colors">
                          {item.title}
                        </h3>
                        <p className="typo-body-sm text-slate-500 mt-1">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Single Section-Level CTA Below */}
            <div className="pt-4 mt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
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

          <div className="lg:col-span-6 w-full flex justify-center lg:justify-end items-stretch h-full">
            <NetworkGlobe
              heading="Where our clients are"
              tagline="Global Reach. Local Understanding."
              storesLabel="13+ countries served"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
