"use client";

import React, { useState } from "react";
import { ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";
import PhotoStackGallery from "../microsoft-fabric-engineering-services/components/PhotoStackGallery";
import { FlowButton } from "@/components/ui/flow-button";

const ROLES = [
  {
    id: "01",
    domain: "ARCHITECTURE & STRATEGY",
    title: "Power BI Solution Architects",
    description: "Define Power BI architecture, analytics strategy, semantic model design, and implementation roadmaps.",
  },
  {
    id: "02",
    domain: "POWER BI DEVELOPMENT",
    title: "Power BI Developers",
    description: "Build interactive dashboards, reports, DAX measures, semantic models, and self-service BI solutions.",
  },
  {
    id: "03",
    domain: "DATA & MODELING",
    title: "Power BI Data Engineers",
    description: "Prepare and transform data, build reliable pipelines, and create scalable foundations for analytics.",
  },
  {
    id: "04",
    domain: "ANALYTICS & BI",
    title: "Power BI Analytics Engineers",
    description: "Build advanced Power BI analytics, KPI reporting, and decision-support models for actionable insights.",
  },
  {
    id: "05",
    domain: "INTEGRATION & MODERNIZATION",
    title: "Power BI Integration Engineers",
    description: "Connect Power BI with enterprise systems, supporting reporting modernization and platform integration.",
  },
  {
    id: "06",
    domain: "DEPLOYMENT & OPTIMIZATION",
    title: "Power BI Deployment Specialists",
    description: "Support workspace management, role-based security, performance optimization, and ongoing production.",
  },
];

const POWER_BI_PHOTOS = [
  {
    id: "01",
    title: "Power BI Solution Architects",
    caption: "Define Power BI architecture, analytics strategy, semantic model design, and implementation roadmaps.",
    location: "Role 01 • Architecture & Strategy",
    category: "[ ARCHITECTURE & STRATEGY ]",
    status: "● SPECIALIZED TALENT",
    specs: [
      { label: "FOCUS", value: "Power BI Architecture" },
      { label: "DESIGN", value: "Semantic Model Design" },
      { label: "GOVERNANCE", value: "Security & Roadmaps" }
    ]
  },
  {
    id: "02",
    title: "Power BI Developers",
    caption: "Build interactive dashboards, reports, DAX measures, semantic models, and self-service BI solutions.",
    location: "Role 02 • Power BI Development",
    category: "[ POWER BI DEVELOPMENT ]",
    status: "● SPECIALIZED TALENT",
    specs: [
      { label: "REPORTS", value: "Interactive Dashboards" },
      { label: "CALCS", value: "Advanced DAX Measures" },
      { label: "BI", value: "Self-Service Solutions" }
    ]
  },
  {
    id: "03",
    title: "Power BI Data Engineers",
    caption: "Prepare and transform data, build reliable pipelines, and create scalable foundations for analytics.",
    location: "Role 03 • Data & Modeling",
    category: "[ DATA & MODELING ]",
    status: "● SPECIALIZED TALENT",
    specs: [
      { label: "PIPELINES", value: "Data Transformation" },
      { label: "DATA", value: "Reliable Pipelines" },
      { label: "FOUNDATION", value: "Scalable Analytics" }
    ]
  },
  {
    id: "04",
    title: "Power BI Analytics Engineers",
    caption: "Build advanced Power BI analytics, KPI reporting, and decision-support models for actionable insights.",
    location: "Role 04 • Analytics & BI",
    category: "[ ANALYTICS & BI ]",
    status: "● SPECIALIZED TALENT",
    specs: [
      { label: "ANALYTICS", value: "Advanced Power BI" },
      { label: "REPORTING", value: "KPIs & Decision Support" },
      { label: "INSIGHTS", value: "Actionable Insights" }
    ]
  },
  {
    id: "05",
    title: "Power BI Integration Engineers",
    caption: "Connect Power BI with enterprise systems, supporting reporting modernization and platform integration.",
    location: "Role 05 • Integration & Modernization",
    category: "[ INTEGRATION & MODERNIZATION ]",
    status: "● SPECIALIZED TALENT",
    specs: [
      { label: "CONNECT", value: "Enterprise Systems" },
      { label: "MIGRATE", value: "Reporting Modernization" },
      { label: "ENTERPRISE", value: "Platform Integration" }
    ]
  },
  {
    id: "06",
    title: "Power BI Deployment Specialists",
    caption: "Support workspace management, role-based security, performance optimization, and ongoing production.",
    location: "Role 06 • Deployment & Optimization",
    category: "[ DEPLOYMENT & OPTIMIZATION ]",
    status: "● SPECIALIZED TALENT",
    specs: [
      { label: "DEPLOY", value: "Workspace Management" },
      { label: "SECURITY", value: "Role-Based Access" },
      { label: "SUPPORT", value: "Performance Optimization" }
    ]
  }
];

export default function OffshoreEngineeringSection() {
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
                OFFSHORE MICROSOFT POWER BI TEAMS
              </span>
            </div>

            {/* Headline - Title Case, NOT all uppercase */}
            <div className="space-y-1.5">
              <h2 className="typo-heading-2 text-slate-900">
                Dedicated Power BI{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B2C] via-[#ea580c] to-[#c2410c]">
                  Engineering Team
                </span>
              </h2>
              <div className="flex items-center gap-2.5 pt-0.5">
                <div className="h-4 w-1 rounded-full bg-[#FF6B2C]" />
                <h3 className="typo-heading-4 text-slate-800">
                  Extend Your Team With Specialized Power BI Engineering Talent
                </h3>
              </div>
              <p className="typo-description text-slate-600 max-w-1.95xl pt-0.5">
                Build a dedicated offshore Power BI engineering team aligned with your business goals—from dashboard development and data modeling to integration, optimization, deployment, and ongoing support.
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
                    <p className="typo-body-sm text-slate-500 mt-0.5 pr-2">
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
              photos={POWER_BI_PHOTOS}
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
                    A focused offshore Microsoft Power BI engineering team that works as an extension of yours.
                  </p>
                  <div className="flex items-center gap-3 mt-1 flex-wrap typo-caption-meta text-slate-500 font-medium">
                    <span className="inline-flex items-center gap-1.5 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B2C]" /> Direct Slack & Git Sync
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="inline-flex items-center gap-1.5 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B2C]" /> US & EU Timezone Aligned
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="inline-flex items-center gap-1.5 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B2C]" /> Enterprise IP Protection
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-start lg:justify-end">
              <FlowButton
                href="/contact"
                text="Build Your Power BI Team"
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
