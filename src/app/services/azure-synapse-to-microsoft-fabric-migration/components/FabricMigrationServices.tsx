"use client";

import React from "react";
import { Building, Settings, Code, Blocks, Building2 } from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";

import dynamic from 'next/dynamic';

const NetworkGlobe = dynamic(() => import('@/app/services/ai-development-services/components/NetworkGlobe'), { ssr: true });

export const FabricMigrationServices = ({ simple = false }: { simple?: boolean }) => {
  const items = [
    {
      title: "Enterprises",
      desc: "Modernize your Azure Synapse environment with a structured Microsoft Fabric migration approach.",
      subdesc: "Assess Synapse workloads, plan the migration path, refactor compatible workloads, validate data and performance, and prepare Fabric for production use.",
      icon: Building,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
    {
      title: "Data & Analytics Teams",
      desc: "Move Synapse data, pipelines, notebooks, and analytics workloads toward a unified Microsoft Fabric platform.",
      subdesc: "Get engineering support for workload assessment, Spark and pipeline migration, OneLake integration, data validation, and post-migration optimization.",
      icon: Settings,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
    {
      title: "Consulting Firms",
      desc: "Extend your data modernization engagements with specialized Synapse-to-Fabric migration expertise.",
      subdesc: "Add engineering capacity for assessment, migration planning, workload refactoring, validation, and Fabric implementation while retaining ownership of the client engagement.",
      icon: Code,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
    {
      title: "System Integrators",
      desc: "Add Microsoft Fabric migration engineering capacity to your existing modernization projects.",
      subdesc: "Support Synapse workload migration across Spark, notebooks, pipelines, data access, integrations, security, validation, and production cutover.",
      icon: Blocks,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
    {
      title: "Microsoft Partners",
      desc: "Accelerate Azure Synapse to Microsoft Fabric migration projects with dedicated offshore engineering support.",
      subdesc: "Extend your delivery team with engineers supporting Fabric migration assessment, workload conversion, OneLake integration, Power BI alignment, testing, and optimization.",
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
                  Azure Synapse to Microsoft Fabric Migration for <br className="hidden lg:block" /><span className="text-[#FF6B2C]">Data Teams & Partners</span>
                </h2>

                <p className="typo-description text-slate-500 w-full pt-1.5">
                  We help organizations, technology teams, consulting firms, and Microsoft partners modernize Azure Synapse workloads and transition to Microsoft Fabric with structured migration planning, workload assessment, refactoring, validation, and production cutover support.
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
                Ready to modernize your Azure Synapse environment?
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
