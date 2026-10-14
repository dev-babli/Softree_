"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Building, Settings, Code, Blocks, Building2 } from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";

const NetworkGlobe = dynamic(
  () => import("@/app/services/ai-development-services/components/NetworkGlobe"),
  { ssr: true }
);

import Link from "next/link";

interface WhoWeHelpItem {
  title: string;
  desc: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bg: string;
}

const ITEMS: WhoWeHelpItem[] = [
  {
    title: "Consulting Firms",
    desc: (
      <>
        Extend your{" "}

        AI consulting services
        {" "}
        with offshore engineers who help design, develop, and integrate custom AI copilots for your clients.
      </>
    ),
    icon: Building,
    color: "text-[#FF6B2C]",
    bg: "bg-orange-50",
  },
  {
    title: "System Integrators",
    desc: "Add AI copilot expertise to client projects with support for Microsoft Copilot Studio, knowledge integration, workflow automation, and business application connectivity.",
    icon: Settings,
    color: "text-[#FF6B2C]",
    bg: "bg-orange-50",
  },
  {
    title: "Technology & Product Companies",
    desc: "Enhance your products with custom AI copilots that connect users to relevant information, assist with tasks, and improve digital experiences.",
    icon: Code,
    color: "text-[#FF6B2C]",
    bg: "bg-orange-50",
  },
  {
    title: "Microsoft & ERP Partners",
    desc: "Expand your solutions with AI copilots, Azure AI, Microsoft Copilot Studio, and integrations for supported business applications.",
    icon: Blocks,
    color: "text-[#FF6B2C]",
    bg: "bg-orange-50",
  },
  {
    title: "Businesses & Growing Teams",
    desc: "Explore AI copilot opportunities to improve knowledge access, streamline workflows, and connect AI capabilities with your existing systems.",
    icon: Building2,
    color: "text-[#FF6B2C]",
    bg: "bg-orange-50",
  },
  {
    title: "Customer Support & Service Teams",
    desc: "Build custom AI copilots that help support teams find product information, retrieve approved knowledge, draft responses, and assist agents across service workflows.",
    icon: Blocks,
    color: "text-[#FF6B2C]",
    bg: "bg-orange-50",
  },

];

export default function CopilotWhoWeHelp() {
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
                AI Copilot Development for <span className="text-[#FF6B2C]">Businesses & Technology Partners</span>
              </h2>

              <p className="typo-description text-slate-500 w-full pt-1.5">
                We help consulting firms, technology companies, agencies, Microsoft partners, and businesses develop and integrate custom AI copilots with experienced offshore AI engineers.
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

export { CopilotWhoWeHelp };
