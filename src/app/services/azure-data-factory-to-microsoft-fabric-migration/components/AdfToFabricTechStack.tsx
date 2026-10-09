"use client";

import React, { useState } from "react";
import { ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";
import PhotoStackGallery, { StackPhoto } from "@/app/services/microsoft-fabric-development-services/components/PhotoStackGallery";
import { FlowButton } from "@/components/ui/flow-button";

const RAG_PHOTOS: StackPhoto[] = [
  {
    id: "01",
    title: "Pipeline Orchestration Migration",
    caption: "Seamlessly lift and shift or refactor your Azure Data Factory control flows and orchestration logic into Microsoft Fabric Data Factory.",
    location: "Scope 01 • Pipeline Migration",
    category: "[ PIPELINE MIGRATION ]",
    status: "● FABRIC DATA FACTORY",
    specs: [
      { label: "WORKLOAD", value: "ADF Pipelines" },
      { label: "TARGET", value: "Fabric Data Factory" },
      { label: "ORCHESTRATION", value: "Native Fabric Triggers" }
    ]
  },
  {
    id: "02",
    title: "SSIS Package Modernization",
    caption: "Modernize legacy SQL Server Integration Services (SSIS) packages by running them natively in Fabric or refactoring to Dataflows Gen2.",
    location: "Scope 02 • SSIS Workloads",
    category: "[ SSIS LIFT & SHIFT ]",
    status: "● FABRIC DATA ENGINEERING",
    specs: [
      { label: "WORKLOAD", value: "Legacy SSIS Packages" },
      { label: "TARGET", value: "Fabric Integration Runtime" },
      { label: "STRATEGY", value: "Lift & Shift / Refactor" }
    ]
  },
  {
    id: "03",
    title: "Data Flows & Wrangling",
    caption: "Transition ADF Mapping Data Flows and Power Query processes into high-performance Fabric Dataflows Gen2 leveraging Spark compute.",
    location: "Scope 03 • Data Transformations",
    category: "[ DATA FLOWS & WRANGLING ]",
    status: "● FABRIC DATAFLOWS GEN2",
    specs: [
      { label: "WORKLOAD", value: "Mapping Data Flows" },
      { label: "TARGET", value: "Dataflows Gen2" },
      { label: "COMPUTE", value: "Fabric Spark Engine" }
    ]
  },
  {
    id: "04",
    title: "Storage Modernization to OneLake",
    caption: "Seamlessly transition your underlying Azure Data Lake Storage (ADLS Gen2) architecture into Microsoft OneLake's unified data hub.",
    location: "Scope 04 • Storage Modernization",
    category: "[ STORAGE MODERNIZATION ]",
    status: "● MICROSOFT ONELAKE",
    specs: [
      { label: "WORKLOAD", value: "ADLS Gen2 Storage" },
      { label: "TARGET", value: "OneLake Workspaces" },
      { label: "FEATURE", value: "Unified Data Mesh" }
    ]
  },
  {
    id: "05",
    title: "Unified Analytics & Reporting",
    caption: "Connect your newly migrated Fabric Data Factory pipelines directly to Power BI DirectLake semantic models for instant enterprise reporting.",
    location: "Scope 05 • Analytics Integration",
    category: "[ ANALYTICS INTEGRATION ]",
    status: "● FABRIC POWER BI",
    specs: [
      { label: "WORKLOAD", value: "Reporting & Dashboards" },
      { label: "TARGET", value: "Fabric Semantic Models" },
      { label: "PERFORMANCE", value: "Direct Lake Mode" }
    ]
  },
  {
    id: "06",
    title: "Security & Governance Alignment",
    caption: "Integrate your existing Azure RBAC, networking rules, and Purview data catalog policies into Fabric's unified workspace governance model.",
    location: "Scope 06 • Security & Governance",
    category: "[ SECURITY & GOVERNANCE ]",
    status: "● FABRIC SECURITY",
    specs: [
      { label: "WORKLOAD", value: "ADF Linked Services" },
      { label: "TARGET", value: "Fabric Connections" },
      { label: "GOVERNANCE", value: "Microsoft Purview" }
    ]
  }
];

const ROLES = [
  {
    id: "01",
    domain: "MIGRATION SCOPE",
    title: "PIPELINE MIGRATION",
    description: "Migrate ADF pipelines, orchestration logic, and triggers to Microsoft Fabric Data Factory.",
  },
  {
    id: "02",
    domain: "MIGRATION SCOPE",
    title: "SSIS LIFT & SHIFT",
    description: "Modernize legacy SSIS packages using Fabric Integration Runtimes or refactoring.",
  },
  {
    id: "03",
    domain: "MIGRATION SCOPE",
    title: "DATA FLOWS & WRANGLING",
    description: "Transition Mapping Data Flows and Power Query to high-performance Dataflows Gen2.",
  },
  {
    id: "04",
    domain: "MIGRATION SCOPE",
    title: "STORAGE MODERNIZATION",
    description: "Move from siloed ADLS Gen2 storage accounts into the unified Microsoft OneLake.",
  },
  {
    id: "05",
    domain: "MIGRATION SCOPE",
    title: "ANALYTICS INTEGRATION",
    description: "Connect migrated workflows directly to Power BI DirectLake semantic models.",
  },
  {
    id: "06",
    domain: "MIGRATION SCOPE",
    title: "SECURITY & GOVERNANCE",
    description: "Align Azure RBAC and Purview policies with Fabric's unified workspace security.",
  },
];

export default function AdfToFabricTechStack() {
  const [activeRole, setActiveRole] = useState(0);

  return (
    <section className="bg-white pt-8 md:pt-12 pb-8 lg:pb-12 text-slate-900 relative overflow-hidden">
      {/* Subtle ambient backdrop lighting */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-orange-500/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 lg:gap-x-16 gap-y-6 lg:gap-y-8 items-center">

          {/* Left Content Side - Typography-Led, Non-Card Editorial Layout */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-5 text-left">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/80 px-4 py-1.5 rounded-full border border-white/80 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#FF6B2C] animate-pulse" />
              <span className="typo-caption text-[#FF6B2C]">
                MIGRATION SCOPE
              </span>
            </div>

            {/* Headline - Title Case, NOT all uppercase */}
            <div className="space-y-1.5">
              <h2 className="typo-heading-2 text-slate-900">
                Migrate Your Azure Data Factory Pipelines{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B2C] via-[#ea580c] to-[#c2410c]">
                  with Minimal Disruption
                </span>
              </h2>
              <p className="typo-description text-slate-600 max-w-1.95xl pt-0.5">
                We execute structured Azure Data Factory to Microsoft Fabric migrations, carefully transitioning your pipelines, SSIS packages, data flows, and ADLS storage into a modern, unified Fabric environment.
              </p>
            </div>

            {/* 6 Roles - Pure Editorial Swiss Layout with ALL LEFT BORDERS IN ORANGE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5 pt-1">
              {ROLES.map((role, idx) => {
                const isActive = activeRole === idx;
                return (
                  <div
                    key={role.id}
                    onClick={() => setActiveRole(idx)}
                    onMouseEnter={() => setActiveRole(idx)}
                    className={`group cursor-pointer text-left transition-all duration-200 relative pl-3.5 py-1 border-l-2 border-[#FF6B2C] ${isActive ? "bg-orange-500/[0.06] rounded-r-md" : "hover:bg-orange-500/[0.02]"
                      }`}
                  >
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className={`text-[11px] font-mono font-bold transition-colors ${isActive ? "text-[#FF6B2C]" : "text-slate-500 group-hover:text-[#FF6B2C]"
                          }`}
                      >
                        {role.id}
                      </span>
                      <span className="typo-caption-meta text-slate-400">
                        {role.domain}
                      </span>
                      {isActive && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FF6B2C] animate-ping" />
                      )}
                    </div>
                    <h4
                      className={`typo-heading-4 transition-colors leading-snug ${isActive ? "text-[#FF6B2C]" : "text-slate-900 group-hover:text-[#FF6B2C]"
                        }`}
                    >
                      {role.title}
                    </h4>
                    <p className="typo-body-sm text-slate-500 mt-0.5 line-clamp-2">
                      {role.description}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Side - Synchronized Interactive Photo Stack */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end self-end">
            <PhotoStackGallery
              photos={RAG_PHOTOS}
              selectedIndex={activeRole}
              onSelectIndex={(idx: number) => setActiveRole(idx)}
            />
          </div>

          {/* Bottom Row: Extension Highlight Ribbon (Left) & CTA Button (Right) */}
          <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-x-12 lg:gap-x-16 items-center pt-4 border-t border-slate-100">
            <div className="lg:col-span-7 flex flex-col gap-2">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-orange-50 text-[#FF6B2C] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="typo-body-sm font-semibold text-slate-900 leading-snug">
                    A comprehensive migration approach ensuring a smooth transition to Microsoft Fabric.
                  </p>
                  <div className="flex items-center gap-3 mt-1 flex-wrap typo-caption-meta text-slate-500 font-medium">
                    <span className="inline-flex items-center gap-1.5 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B2C]" /> Zero Data Loss
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="inline-flex items-center gap-1.5 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B2C]" /> Minimal Downtime
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="inline-flex items-center gap-1.5 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B2C]" /> Performance Optimized
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-start lg:justify-end">
              <FlowButton
                href="/contact"
                text="Plan Your Migration"
                variant="orange-filled"
                className="shadow-lg shadow-orange-500/20"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
