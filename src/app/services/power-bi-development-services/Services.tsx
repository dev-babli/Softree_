"use client";

import React from "react";
import { Briefcase, Workflow, Monitor, Blocks, Building2 } from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";
import { typography } from "@/lib/typography";

import dynamic from 'next/dynamic';

const NetworkGlobe = dynamic(() => import('@/app/services/ai-development-services/components/NetworkGlobe'), { ssr: true });

export const FabricServices = ({ simple = false }: { simple?: boolean }) => {
  const items = [
    {
      title: "Consulting Firms",
      desc: "Extend your Power BI delivery capabilities with an experienced offshore engineering team.",
      subdesc: "Build and deliver Power BI dashboards, reports, data models, DAX solutions, and analytics platforms for your client engagements.",
      icon: Briefcase,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
    {
      title: "System Integrators",
      desc: "Add specialized Power BI expertise to your existing client engagements.",
      subdesc: "Extend your delivery team with Power BI engineers supporting data integration, modeling, dashboard development, migration, optimization, and deployment.",
      icon: Workflow,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
    {
      title: "Technology & Product Companies",
      desc: "Accelerate analytics and product development with dedicated Power BI engineering capacity.",
      subdesc: "Build data-driven dashboards, embedded analytics, semantic models, and business intelligence capabilities aligned with your product roadmap.",
      icon: Monitor,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
    {
      title: "ERP & Microsoft Partners",
      desc: "Extend ERP and Microsoft solutions with modern Power BI analytics capabilities.",
      subdesc: "Connect Power BI with Microsoft, ERP, business applications, and enterprise data sources to deliver unified reporting and actionable business insights.",
      icon: Blocks,
      color: "text-[#FF6B2C]",
      bg: "bg-orange-50",
    },
    {
      title: "Enterprises",
      desc: "Build, modernize, and scale your enterprise analytics with Power BI.",
      subdesc: "From data integration and semantic modeling to governance, performance optimization, Microsoft Fabric, and ongoing support, Softree provides the engineering capacity to move analytics from requirements to production.",
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
                <span className={`${typography.caption.default} text-[#FF6B2C] uppercase`}>
                  WHO WE HELP & WHERE WE OPERATE
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-4 items-start">
                <h2 className={`${typography.heading.h2} text-slate-900 pr-4`}>
                  Power BI Engineering Services for Teams <span className="text-[#FF6B2C]">That Need to Move Faster</span>
                </h2>

                <p className={`${typography.description.default} text-slate-500 w-full pt-1.5`}>
                  We help consulting firms, system integrators, technology companies, Microsoft partners, and enterprises design, build, and scale Power BI solutions—from data integration and semantic modeling to dashboards, reporting, and Microsoft Fabric.
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
                      <h4 className={`${typography.heading.h4} text-slate-900 group-hover:text-[#FF6B2C] transition-colors`}>
                        {item.title}
                      </h4>
                      <p className={`${typography.body.lg} font-semibold text-slate-700 mt-1`}>
                        {item.desc}
                      </p>
                      <p className={`${typography.body.sm} text-slate-500 mt-1`}>
                        {item.subdesc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Single Section-Level CTA Below */}
            <div className="pt-4 mt-auto border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className={`${typography.body.default} text-slate-700 text-center sm:text-left`}>
                Ready to scale your Power BI engineering capabilities?
              </p>
              <FlowButton
                href="/contact"
                text="Explore Partnerships"
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
