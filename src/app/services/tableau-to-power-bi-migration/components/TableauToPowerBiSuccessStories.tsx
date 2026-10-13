"use client";

import React from "react";
import { Gallery4, Gallery4Props } from "@/components/blocks/gallery4";
import { FlowButton } from "@/components/ui/flow-button";
import AnimatedGradient from "@/components/ui/animated-gradient";
import { typography } from "@/lib/typography";

const caseStudyData: Gallery4Props = {
  title: (
    <div className="flex flex-col items-start">
      <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 ${typography.caption.default} text-[#FF6B00] uppercase mb-4 w-fit`}>
        <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
        POWER BI MIGRATION CASE STUDIES
      </div>
      <h2 className={`${typography.heading.h2} text-slate-900 leading-tight text-left`}>
        Tableau to Power BI <span className="text-orange-600">Migration in Action</span>
      </h2>
    </div>
  ) as any,

  description:
    "Explore real-world offshore migration case studies detailing how our dedicated engineering teams convert complex Tableau workbooks to Power BI, translate LOD calculations into DAX, enforce Row-Level Security, and lower reporting costs by up to 52%.",

  items: [
    {
      id: "tableau-server-to-power-bi-fabric",
      title: "Offshore Tableau Server to Power BI & Fabric Modernization",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}>
            Softree's offshore engineering team migrated 250+ Tableau Server workbooks into unified Power BI Service semantic models with Direct Lake architecture.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "52%", label: "Annual Licensing Cost Reduction" },
              { value: "< 1.8s", label: "Average Query Latency" },
            ].map((result, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs">
                <span className="text-[#FF6B2C] font-mono font-bold tracking-tight shrink-0 min-w-[55px]">
                  {result.value}
                </span>
                <span className={`text-white/80 ${typography.caption.meta} uppercase tracking-wider`}>
                  {result.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
      href: "/case-studies/tableau-server-to-tableau-cloud-migration",
      bgComponent: (
        <AnimatedGradient
          config={{
            preset: "custom",
            color1: "#050505",
            color2: "#FF6B00",
            color3: "#1a0b04",
            rotation: -50,
            proportion: 1,
            scale: 0.01,
            speed: 30,
            distortion: 0,
            swirl: 50,
            swirlIterations: 16,
            softness: 47,
            offset: -299,
            shape: "Checks",
            shapeSize: 45
          }}
        />
      ),
    },
    {
      id: "automated-dax-lod-refactoring",
      title: "Automated DAX & LOD Calculation Refactoring at Scale",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}>
            Our offshore BI team translated 400+ complex Tableau Level of Detail (LOD) expressions (FIXED, INCLUDE, EXCLUDE) into optimized DAX measures and calculation groups.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "100%", label: "Financial Metric Precision" },
              { value: "400+", label: "LOD Expressions Converted" },
            ].map((result, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs">
                <span className="text-[#FF6B2C] font-mono font-bold tracking-tight shrink-0 min-w-[55px]">
                  {result.value}
                </span>
                <span className={`text-white/80 ${typography.caption.meta} uppercase tracking-wider`}>
                  {result.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
      href: "/case-studies/metadata-driven-data-ingestion-microsoft-fabric",
      bgComponent: <AnimatedGradient config={{ preset: "Lava" }} />,
    },
    {
      id: "tableau-user-filter-rls-purview",
      title: "Tableau User Filter to Power BI Dynamic RLS & Purview Integration",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}>
            Our offshore delivery team re-engineered Tableau user filters into dynamic Power BI Row-Level Security (RLS) integrated with Microsoft Entra ID and Purview.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "8,000+", label: "Entra ID Users Provisioned" },
              { value: "100%", label: "Data Governance & Compliance" },
            ].map((result, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs">
                <span className="text-[#FF6B2C] font-mono font-bold tracking-tight shrink-0 min-w-[55px]">
                  {result.value}
                </span>
                <span className={`text-white/80 ${typography.caption.meta} uppercase tracking-wider`}>
                  {result.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
      href: "/case-studies/azure-data-platform-migration-microsoft-fabric",
      bgComponent: (
        <AnimatedGradient
          config={{
            preset: "custom",
            color1: "#FF7300",
            color2: "#000000",
            color3: "#000000",
            rotation: 0,
            proportion: 63,
            scale: 0.75,
            speed: 30,
            distortion: 5,
            swirl: 61,
            swirlIterations: 5,
            softness: 100,
            offset: -168,
            shape: "Checks",
            shapeSize: 28
          }}
        />
      ),
    },
    {
      id: "tableau-embedded-power-bi-embedded",
      title: "Tableau Server Embedded Views to Power BI Embedded Migration",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}>
            Replaced legacy Tableau Server embedded views with Power BI Embedded REST APIs, cutting report latency by 65% and saving $180K annually.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "$180K/yr", label: "Hosting & License Savings" },
              { value: "65%", label: "Faster Embedded Loading" },
            ].map((result, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs">
                <span className="text-[#FF6B2C] font-mono font-bold tracking-tight shrink-0 min-w-[55px]">
                  {result.value}
                </span>
                <span className={`text-white/80 ${typography.caption.meta} uppercase tracking-wider`}>
                  {result.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
      href: "/case-studies/ai-powered-healthcare-operations-knowledge-assistant",
      bgComponent: (
        <AnimatedGradient
          config={{
            preset: "custom",
            color1: "#050505",
            color2: "#FF4500",
            color3: "#050505",
            rotation: 0,
            proportion: 33,
            scale: 0.48,
            speed: 39,
            distortion: 4,
            swirl: 65,
            swirlIterations: 5,
            softness: 100,
            offset: -235,
            shape: "Edge",
            shapeSize: 48
          }}
        />
      ),
    }
  ],
};

export function TableauToPowerBiSuccessStories() {
  return (
    <div className="relative bg-white flex flex-col items-center -mt-4 md:-mt-8 -mb-8 md:-mb-12">
      <div className="w-full">
        <Gallery4
          {...caseStudyData}
          cardHeightClassName="h-[460px] md:h-[520px]"
          action={
            <FlowButton
              href="/case-studies"
              text="Explore Power BI Migration Case Studies"
              variant="orange-filled"
              className="py-3 px-6 text-xs sm:text-sm font-bold shadow-md"
            />
          }
        />
      </div>
    </div>
  );
}

export default TableauToPowerBiSuccessStories;
