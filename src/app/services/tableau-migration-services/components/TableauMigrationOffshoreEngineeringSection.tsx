"use client";

import React, { useState } from "react";
import { ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";
import PhotoStackGallery, { StackPhoto } from "@/app/services/microsoft-fabric-development-services/components/PhotoStackGallery";
import { FlowButton } from "@/components/ui/flow-button";

const TABLEAU_PHOTOS: StackPhoto[] = [
  {
    id: "01",
    title: "Workbook Migration",
    caption: "Transition Tableau workbooks, views, calculated fields, filters, and reporting logic while maintaining critical analytics requirements.",
    location: "Scope 01 • Tableau Workbooks",
    category: "[ TABLEAU WORKBOOKS ]",
    status: "● TABLEAU MIGRATION",
    specs: [
      { label: "WORKLOAD", value: "Tableau Workbooks" },
      { label: "TARGET", value: "Tableau Cloud / Modern BI" },
      { label: "CODE", value: "Workbook Migration" }
    ]
  },
  {
    id: "02",
    title: "Dashboard Modernization",
    caption: "Migrate business-critical Tableau dashboards and validate visualizations, filters, calculations, and reporting functionality.",
    location: "Scope 02 • Dashboards",
    category: "[ DASHBOARDS ]",
    status: "● ANALYTICS MIGRATION",
    specs: [
      { label: "WORKLOAD", value: "Tableau Dashboards" },
      { label: "TARGET", value: "Modern Analytics" },
      { label: "CODE", value: "Dashboard Migration" }
    ]
  },
  {
    id: "03",
    title: "Data Source Migration",
    caption: "Move Tableau data sources, extracts, connections, and refresh configurations while maintaining reliable data access.",
    location: "Scope 03 • Data Sources",
    category: "[ DATA SOURCES ]",
    status: "● DATA MIGRATION",
    specs: [
      { label: "WORKLOAD", value: "Tableau Data Sources" },
      { label: "TARGET", value: "Modern Data Platform" },
      { label: "CODE", value: "Data Connectivity" }
    ]
  },
  {
    id: "04",
    title: "Access & Permission Migration",
    caption: "Map users, groups, roles, projects, and permissions to preserve secure access across the migrated environment.",
    location: "Scope 04 • Security",
    category: "[ SECURITY ]",
    status: "● TABLEAU GOVERNANCE",
    specs: [
      { label: "WORKLOAD", value: "Users & Permissions" },
      { label: "TARGET", value: "Secure Analytics" },
      { label: "CODE", value: "Access Migration" }
    ]
  },
  {
    id: "05",
    title: "Integration Modernization",
    caption: "Reconnect databases, APIs, authentication services, embedded analytics, and downstream applications within the target environment.",
    location: "Scope 05 • Integrations",
    category: "[ INTEGRATIONS ]",
    status: "● PLATFORM CONNECTIVITY",
    specs: [
      { label: "WORKLOAD", value: "Tableau Integrations" },
      { label: "TARGET", value: "Connected Analytics" },
      { label: "CODE", value: "Integration Migration" }
    ]
  },
  {
    id: "06",
    title: "Migration Validation",
    caption: "Verify data accuracy, dashboard behavior, refreshes, permissions, connectivity, and performance before production cutover.",
    location: "Scope 06 • Validation",
    category: "[ VALIDATION ]",
    status: "● MIGRATION VALIDATION",
    specs: [
      { label: "WORKLOAD", value: "Migrated Tableau Environment" },
      { label: "TARGET", value: "Production Analytics" },
      { label: "CODE", value: "Validation & Optimization" }
    ]
  }
];

const ROLES = [
  {
    id: "01",
    domain: "MIGRATION SCOPE",
    title: "TABLEAU WORKBOOK MIGRATION",
    description: "Migrate workbooks, views, and reporting logic while preserving critical business requirements.",
  },
  {
    id: "02",
    domain: "MIGRATION SCOPE",
    title: "DASHBOARD & REPORT MIGRATION",
    description: "Transition dashboards and reports while validating functionality, visualizations, and continuity.",
  },
  {
    id: "03",
    domain: "MIGRATION SCOPE",
    title: "DATA SOURCES & EXTRACTS",
    description: "Migrate data sources, connections, and refresh configurations to the target environment.",
  },
  {
    id: "04",
    domain: "MIGRATION SCOPE",
    title: "USERS, ROLES & PERMISSIONS",
    description: "Map users, groups, and permissions to maintain secure access throughout the migration.",
  },
  {
    id: "05",
    domain: "MIGRATION SCOPE",
    title: "INTEGRATIONS & CONNECTIVITY",
    description: "Reconnect databases, APIs, embedded analytics, and external dependencies to the new platform.",
  },
  {
    id: "06",
    domain: "MIGRATION SCOPE",
    title: "MIGRATION VALIDATION & OPTIMIZATION",
    description: "Validate data, security, and performance before cutover to ensure a smooth transition.",
  },
];

export function TableauMigrationOffshoreEngineeringSection() {
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
                Migrate Your Tableau Environment{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B2C] via-[#ea580c] to-[#c2410c]">
                  with Minimal Disruption
                </span>
              </h2>
              <p className="typo-description text-slate-600 max-w-1.95xl pt-0.5">
                We manage end-to-end Tableau migrations—transitioning workbooks, dashboards, and data to Tableau Cloud or modern BI platforms with controlled execution.
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
              photos={TABLEAU_PHOTOS}
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
                    A comprehensive migration approach ensuring a smooth transition to Tableau Cloud or modern analytics platforms.
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

export default TableauMigrationOffshoreEngineeringSection;
