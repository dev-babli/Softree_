"use client";

import React from "react";
import { Building, Settings, Code, Blocks, Building2 } from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";
import dynamic from 'next/dynamic';

const NetworkGlobe = dynamic(() => import('@/app/services/ai-development-services/components/NetworkGlobe'), { ssr: true });

export const TableauToPowerBiServices = ({ simple = false }: { simple?: boolean }) => {
  const items = [
    {
      title: "Businesses & Product Teams",
      desc: "Modernize your business intelligence landscape, eliminate Tableau licensing overhead, and standardize on Power BI.",
      subdesc: "Audit Tableau workbooks, define migration priorities, translate calculations to DAX, build robust semantic models, and train business users.",
      icon: Building,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
    {
      title: "Data & Analytics Teams",
      desc: "Convert Tableau workbooks, calculation logic, and data extracts into reusable Power BI VertiPaq semantic models.",
      subdesc: "Get specialized offshore engineering support for LOD conversion, DAX optimization, dataset modeling, report redesign, and row-level security mapping.",
      icon: Settings,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
    {
      title: "Consulting Firms",
      desc: "Expand your BI migration engagements with specialized offshore Tableau-to-Power BI conversion and DAX refactoring expertise.",
      subdesc: "Add offshore engineering capacity for report conversion, DAX scripting, data validation, and deployment while retaining full client ownership.",
      icon: Code,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
    {
      title: "System Integrators",
      desc: "Add dedicated offshore Power BI migration engineering capacity to large-scale data and cloud modernization projects.",
      subdesc: "Support end-to-end Tableau migration across data extract conversion, DirectQuery setup, semantic model publishing, and tenant deployment.",
      icon: Blocks,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
    {
      title: "Microsoft Partners",
      desc: "Accelerate client migrations from Tableau to Microsoft 365, Azure, and Fabric with dedicated offshore BI engineers.",
      subdesc: "Extend your delivery team with offshore engineers skilled in converting Tableau dashboards, DAX logic, Purview governance, and Power BI Service administration.",
      icon: Building2,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
  ];

  return (
    <section className="bg-white pt-8 md:pt-12 pb-8 md:pb-12 text-slate-900 scroll-mt-24">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 lg:gap-x-16 gap-y-8 lg:gap-y-10 items-stretch">

          {/* Top Area */}
          {!simple && (
            <div className="lg:col-span-12 flex flex-col">
              <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-3.5 py-1 rounded-full border border-white/60 mb-4 inline-block self-start">
                <span className="typo-caption text-[#FF6B2C] uppercase tracking-wider">
                  WHO WE HELP & WHERE WE OPERATE
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-4 items-start">
                <h2 className="typo-heading-2 text-slate-900 pr-4 leading-tight">
                  Offshore Tableau to Power BI Migration for <br className="hidden lg:block" /><span className="text-[#FF6B2C]">Data Teams & Partners</span>
                </h2>

                <p className="typo-description text-slate-500 w-full pt-1.5 leading-relaxed">
                  We help technology leaders, analytics teams, consulting firms, and Microsoft partners transition from Tableau to Power BI with structured offshore audit, DAX calculation refactoring, semantic model building, visual conversion, and production rollout support.
                </p>
              </div>
            </div>
          )}

          {/* Bottom Row */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full w-full">
            <div className="flex flex-col divide-y divide-slate-100">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="py-3.5 first:pt-1.5 last:pb-1 group transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className={`shrink-0 w-10 h-10 rounded-lg ${item.bg} border border-orange-100 flex items-center justify-center group-hover:scale-105 group-hover:bg-[#FF6B2C] group-hover:text-white transition-all duration-300 mt-0.5`}>
                      <item.icon className={`w-5 h-5 ${item.color} group-hover:text-white transition-colors`} />
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <h4 className="typo-heading-4 text-slate-900 group-hover:text-[#FF6B2C] transition-colors">
                        {item.title}
                      </h4>
                      <p className="typo-body font-semibold text-slate-700 mt-1 leading-snug">
                        {item.desc}
                      </p>
                      <p className="typo-body-sm text-slate-500 mt-1 leading-relaxed">
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
                Ready to migrate your Tableau reports to Power BI?
              </p>
              <FlowButton
                href="/contact"
                text="Explore Migration Services"
                variant="orange-filled"
                className="shrink-0"
              />
            </div>
          </div>

          <div className="lg:col-span-6 w-full flex justify-center lg:justify-end items-stretch">
            <NetworkGlobe
              heading="Where our clients are"
              tagline="Global Reach. Local Understanding."
              subheading="Trusted by businesses across 13+ countries, we deliver technology solutions that help organizations build, scale, and transform digitally."
              storesLabel="13+ countries served"
              caption="Trusted by businesses across 13+ countries, we deliver technology solutions that help organizations build, scale, and transform digitally."
            />
          </div>

        </div>
      </div>
    </section>
  );
};
