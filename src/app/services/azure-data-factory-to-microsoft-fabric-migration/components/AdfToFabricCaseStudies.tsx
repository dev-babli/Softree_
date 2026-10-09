"use client";

import React from "react";
import { Gallery4, Gallery4Props } from "@/components/blocks/gallery4";
import { FlowButton } from "@/components/ui/flow-button";
import AnimatedGradient from "@/components/ui/animated-gradient";
import { typography } from "@/lib/typography";

const caseStudyData: Gallery4Props = {
  title: (
    <div className="flex flex-col items-start">
      <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-3.5 py-1 rounded-full border border-white/60 mb-4 inline-block">
        <span className="typo-caption text-[#FF6B2C] uppercase">
          FABRIC MIGRATION CASE STUDIES
        </span>
      </div>
      <span className={`${typography.heading.h2} text-slate-900 leading-tight text-left`}>
        Microsoft Fabric <span className="text-orange-600">Migration Success Stories</span>
      </span>
    </div>
  ) as any,

  description:
    "Explore how our offshore data engineering teams help digital agencies, consultancies, and technology leaders migrate legacy Azure Data Factory workloads to a unified Microsoft Fabric environment, accelerating pipelines and unifying storage.",

  items: [
    {
      id: "enterprise-data-warehouse",
      title: "Large-Scale Data Warehouse Migration to Microsoft Fabric",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}>
            We provided dedicated offshore engineers to help a technology consultancy migrate their client's fragmented data warehouse to Microsoft Fabric, consolidating ETL pipelines.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "40%", label: "Faster Data Refresh" },
              { value: "30%", label: "Lower Infrastructure Cost" },
            ].map((result, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs">
                <span className="text-[#FF6B2C] font-mono font-bold tracking-tight shrink-0 min-w-[36px]">
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
      id: "legacy-etl-modernization",
      title: "Modernizing Legacy ETL Pipelines with OneLake",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}>
            Our offshore data team automated the conversion of 500+ legacy Azure Data Factory pipelines into native Fabric pipelines for a Microsoft Partner.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "500+", label: "Pipelines Converted" },
              { value: "60%", label: "Faster Migration Time" },
            ].map((result, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs">
                <span className="text-[#FF6B2C] font-mono font-bold tracking-tight shrink-0 min-w-[36px]">
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
      id: "global-retailer-analytics",
      title: "Retail Analytics Modernized with Microsoft Fabric",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}>
            Acting as an extended engineering team, we re-engineered data pipelines using Spark compute and DirectLake Power BI to deliver near real-time retail insights.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "Real-time", label: "Inventory Reporting" },
              { value: "Unified", label: "Business Intelligence" },
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
      href: "/case-studies/customer-data-analytics-platform",
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
      id: "financial-services-governance",
      title: "Data Governance & Compliance with Microsoft Purview",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}>
            Working behind the scenes for a digital agency, we integrated Microsoft Purview with Fabric to automate data lineage and enforce RBAC compliance.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "100%", label: "Compliance Adherence" },
              { value: "Automated", label: "Data Lineage Tracking" },
            ].map((result, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs">
                <span className="text-[#FF6B2C] font-mono font-bold tracking-tight shrink-0 min-w-[36px]">
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
      href: "/case-studies/emergency-department-performance-analytics-platform",
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

export default function AdfToFabricCaseStudies() {
  return (
    <div className="relative bg-transparent flex flex-col items-center py-8 md:py-12 border-b border-slate-100">
      <div className="w-full">
        <Gallery4
          {...caseStudyData}
          action={
            <FlowButton
              href="/case-studies"
              text="Explore Migration Case Studies"
              variant="orange-filled"
              className="py-3 px-6 text-xs sm:text-sm font-bold shadow-md"
            />
          }
        />
      </div>
    </div>
  );
}
