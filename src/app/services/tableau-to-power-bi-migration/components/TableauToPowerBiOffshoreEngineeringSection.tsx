"use client";

import React, { useState } from "react";
import { ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";
import PhotoStackGallery, { StackPhoto } from "@/app/services/microsoft-fabric-development-services/components/PhotoStackGallery";
import { FlowButton } from "@/components/ui/flow-button";

const RAG_PHOTOS: StackPhoto[] = [
  {
    id: "01",
    title: "Tableau Dashboard & Report Conversion",
    caption: "Rebuild Tableau Server and Cloud workbooks into interactive Power BI reports with native drill-throughs, bookmarks, and mobile layouts.",
    location: "Scope 01 • Dashboards & Reports",
    category: "[ DASHBOARDS & REPORTS ]",
    status: "● POWER BI REPORTS",
    specs: [
      { label: "WORKLOAD", value: "Tableau Workbooks" },
      { label: "TARGET", value: "Power BI Desktop / Service" },
      { label: "FORMATTING", value: "Custom Layouts" }
    ]
  },
  {
    id: "02",
    title: "DAX & LOD Calculation Translation",
    caption: "Convert Tableau calculated fields, table calculations, and Level of Detail (LOD) expressions into clean, optimized DAX measures.",
    location: "Scope 02 • DAX & Calculations",
    category: "[ DAX & CALCULATIONS ]",
    status: "● DAX MEASURES",
    specs: [
      { label: "WORKLOAD", value: "Tableau Calculations" },
      { label: "TARGET", value: "DAX Measures" },
      { label: "OPTIMIZATION", value: "VertiPaq Engine" }
    ]
  },
  {
    id: "03",
    title: "Semantic Model Architecture",
    caption: "Consolidate redundant Tableau data extracts into reusable star-schema Power BI semantic models for high-speed reporting.",
    location: "Scope 03 • Semantic Models",
    category: "[ SEMANTIC MODELS ]",
    status: "● POWER BI DATASETS",
    specs: [
      { label: "WORKLOAD", value: "Tableau Extracts (.hyper)" },
      { label: "TARGET", value: "Power BI Semantic Models" },
      { label: "SCHEMA", value: "Star Schema Design" }
    ]
  },
  {
    id: "04",
    title: "Row-Level Security (RLS) Mapping",
    caption: "Translate Tableau user filters and entitlement security models into Power BI Row-Level Security (RLS) integrated with Entra ID.",
    location: "Scope 04 • Security & Roles",
    category: "[ SECURITY & ROLES ]",
    status: "● POWER BI RLS",
    specs: [
      { label: "WORKLOAD", value: "Tableau User Filters" },
      { label: "TARGET", value: "Power BI RLS / OLS" },
      { label: "AUTH", value: "Microsoft Entra ID" }
    ]
  },
  {
    id: "05",
    title: "Data Gateway & Refresh Setup",
    caption: "Configure Power Query (M) transformations, On-Premises Data Gateways, and scheduled or incremental data refresh policies.",
    location: "Scope 05 • Data Integration",
    category: "[ DATA INTEGRATION ]",
    status: "● DATA GATEWAYS",
    specs: [
      { label: "WORKLOAD", value: "Data Sources" },
      { label: "TARGET", value: "On-Prem Gateway & Cloud" },
      { label: "REFRESH", value: "Incremental & Scheduled" }
    ]
  },
  {
    id: "06",
    title: "Tenant Deployment & Governance",
    caption: "Publish reports to Power BI Service or Fabric workspaces, manage workspace permissions, and integrate with Microsoft Purview.",
    location: "Scope 06 • Governance",
    category: "[ GOVERNANCE ]",
    status: "● POWER BI SERVICE",
    specs: [
      { label: "WORKLOAD", value: "Tableau Server Admin" },
      { label: "TARGET", value: "Power BI Service / Fabric" },
      { label: "GOVERNANCE", value: "Microsoft Purview" }
    ]
  }
];

const ROLES = [
  {
    id: "01",
    domain: "MIGRATION SCOPE",
    title: "DASHBOARDS & REPORTS",
    description: "Rebuild Tableau workbooks and dashboards into interactive Power BI reports with rich UX.",
  },
  {
    id: "02",
    domain: "MIGRATION SCOPE",
    title: "DAX & LOD TRANSLATION",
    description: "Translate complex Tableau calculated fields and FIXED/INCLUDE/EXCLUDE LOD expressions to DAX.",
  },
  {
    id: "03",
    domain: "MIGRATION SCOPE",
    title: "SEMANTIC MODELING",
    description: "Consolidate data sources into star-schema Power BI semantic models optimized for VertiPaq.",
  },
  {
    id: "04",
    domain: "MIGRATION SCOPE",
    title: "SECURITY & ROLES",
    description: "Map Tableau user filters and group security rules into Power BI RLS and Entra ID security.",
  },
  {
    id: "05",
    domain: "MIGRATION SCOPE",
    title: "DATA INTEGRATION",
    description: "Setup Power Query transformations, On-Premises Data Gateways, and automated refresh schedules.",
  },
  {
    id: "06",
    domain: "MIGRATION SCOPE",
    title: "TENANT GOVERNANCE",
    description: "Publish to Power BI Service / Fabric workspaces, configure governance, and train business users.",
  },
];

export function TableauToPowerBiOffshoreEngineeringSection() {
  const [activeRole, setActiveRole] = useState(0);

  return (
    <section className="bg-white pt-8 md:pt-12 pb-8 lg:pb-12 text-slate-900 relative overflow-hidden">
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-orange-500/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 lg:gap-x-16 gap-y-6 lg:gap-y-8 items-center">

          {/* Left Content Side */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-5 text-left">

            <div className="inline-flex items-center gap-2 shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/80 px-4 py-1.5 rounded-full border border-white/80 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#FF6B2C] animate-pulse" />
              <span className="typo-caption text-[#FF6B2C]">
                MIGRATION SCOPE
              </span>
            </div>

            <div className="space-y-1.5">
              <h2 className="typo-heading-2 text-slate-900">
                Migrate Your Tableau Assets{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B2C] via-[#ea580c] to-[#c2410c]">
                  with Absolute Metric Precision
                </span>
              </h2>
              <p className="typo-description text-slate-600 max-w-1.95xl pt-0.5">
                We execute structured Tableau to Power BI migrations, carefully translating calculations, re-architecting semantic models, replicating dashboard layouts, and enforcing security policies.
              </p>
            </div>

            {/* 6 Roles */}
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

          {/* Right Side - Photo Stack */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end self-end">
            <PhotoStackGallery
              photos={RAG_PHOTOS}
              selectedIndex={activeRole}
              onSelectIndex={(idx: number) => setActiveRole(idx)}
            />
          </div>

          {/* Bottom Row */}
          <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-x-12 lg:gap-x-16 items-center pt-4 border-t border-slate-100">
            <div className="lg:col-span-7 flex flex-col gap-2">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-orange-50 text-[#FF6B2C] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="typo-body-sm font-semibold text-slate-900 leading-snug">
                    A comprehensive BI migration approach ensuring a smooth transition to Power BI.
                  </p>
                  <div className="flex items-center gap-3 mt-1 flex-wrap typo-caption-meta text-slate-500 font-medium">
                    <span className="inline-flex items-center gap-1.5 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B2C]" /> Exact Metric Accuracy
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="inline-flex items-center gap-1.5 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B2C]" /> DAX Optimization
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="inline-flex items-center gap-1.5 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B2C]" /> Zero Downtime Cutover
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

export default TableauToPowerBiOffshoreEngineeringSection;
