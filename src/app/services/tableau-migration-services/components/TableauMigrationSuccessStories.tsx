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
        TABLEAU MIGRATION SUCCESS STORIES
      </div>
      <span className={`${typography.heading.h2} text-slate-900 leading-tight text-left`}>
        Successful Tableau Migrations Built for <span className="text-orange-600">Modern Analytics</span>
      </span>
    </div>
  ) as any,

  description:
    "See how organizations transition from complex or legacy Tableau environments to modern analytics platforms while protecting critical reporting, improving data accessibility, and creating a stronger foundation for future growth.",

  items: [
    {
      id: "azure-data-platform-migration-fabric",
      title: "Azure Data Platform Migration to Microsoft Fabric",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}>
            Modernize Azure data platforms with Microsoft Fabric, OneLake, and Power BI to create a unified, governed, and scalable analytics foundation.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "Unified", label: "Analytics Platform" },
              { value: "Reduced", label: "Data Complexity" },
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
      id: "tableau-server-to-cloud",
      title: "Tableau Server to Tableau Cloud Migration",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}>
            An enterprise organization modernized its Tableau environment by migrating from Tableau Server to Tableau Cloud with improved governance, connectivity, and validation.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "Controlled", label: "Migration & Validation" },
              { value: "Improved", label: "Cloud Readiness" },
            ].map((result, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs">
                <span className="text-[#FF6B2C] font-mono font-bold tracking-tight shrink-0 min-w-[65px]">
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
      bgComponent: <AnimatedGradient config={{ preset: "Lava" }} />,
    },
    {
      id: "metadata-driven-data-ingestion-fabric",
      title: "Metadata-Driven Data Ingestion with Microsoft Fabric",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}>
            A U.S. based SaaS company replaced dataset-specific ETL pipelines with a reusable Microsoft Fabric ingestion framework for hundreds of tables.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "Reusable", label: "Ingestion Framework" },
              { value: "Reduced", label: "Pipeline Maintenance" },
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
      id: "ai-healthcare-operations",
      title: "AI-Powered Healthcare Operations Knowledge Assistant",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}>
            Healthcare knowledge assistant reduces document search time by up to 35% while improving access to approved operational procedures.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "35%", label: "Reduced Search Time" },
              { value: "Faster", label: "Information Access" },
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
    },
    {
      id: "hr-analytics-employee-experience-platform",
      title: "HR Analytics & Employee Experience Platform",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}>
            A leading health network modernized its HR analytics by unifying data silos to deliver improved employee retention insights and reporting.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "Unified", label: "HR Analytics" },
              { value: "Better", label: "Retention Insights" },
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
      href: "/case-studies/hr-analytics-employee-experience-platform",
      bgComponent: (
        <AnimatedGradient
          config={{
            preset: "custom",
            color1: "#111111",
            color2: "#EA3C12",
            color3: "#0a0f1d",
            rotation: 45,
            proportion: 50,
            scale: 0.5,
            speed: 25,
            distortion: 3,
            swirl: 40,
            swirlIterations: 4,
            softness: 80,
            offset: -100,
            shape: "Checks",
            shapeSize: 35
          }}
        />
      ),
    }
  ],
};

export function TableauMigrationSuccessStories() {
  return (
    <div className="relative bg-white flex flex-col items-center -mt-4 md:-mt-8 -mb-8 md:-mb-12">
      <div className="w-full">
        <Gallery4
          {...caseStudyData}
          action={
            <FlowButton
              href="/case-studies"
              text="View Tableau Migration Success Stories"
              variant="orange-filled"
              className="py-3 px-6 text-xs sm:text-sm font-bold shadow-md"
            />
          }
        />
      </div>
    </div>
  );
}

export default TableauMigrationSuccessStories;
