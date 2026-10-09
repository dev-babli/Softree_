"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ClipboardCheck, Server, Database, Workflow, Shield, Cpu, Sparkles, Layers } from "lucide-react";

export default function SynapseToFabricAssessment() {
  const assessmentAreas = [
    { area: "Synapse Workspaces", desc: "Workspace configuration, tenant settings, and environment dependencies.", icon: Server },
    { area: "SQL Workloads", desc: "Dedicated SQL pools, serverless SQL pools, views, stored procedures, and T-SQL scripts.", icon: Database },
    { area: "Data Pipelines", desc: "Synapse and ADF pipelines, triggers, copy activities, and data flow transformations.", icon: Workflow },
    { area: "Data Storage", desc: "ADLS Gen2 hierarchical structures, Parquet lakes, and storage account mounting.", icon: Layers },
    { area: "Spark Workloads", desc: "PySpark notebooks, Spark job definitions, libraries, and compute cluster sizes.", icon: Cpu },
    { area: "Power BI Models", desc: "Reports, import datasets, DirectQuery models, and semantic model conversion to DirectLake.", icon: Sparkles },
    { area: "Security & Access", desc: "Users, RBAC roles, column/row-level security, Purview labels, and access policies.", icon: Shield },
    { area: "Dependencies", desc: "External APIs, upstream enterprise systems, and downstream business reporting tools.", icon: ClipboardCheck },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#FAFAFC] text-slate-900 border-b border-slate-200/60">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-[#FF6B00] text-xs font-semibold tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
            MIGRATION ASSESSMENT
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            Know What to Migrate, Modernize, <span className="text-[#FF6B00]">Replace, or Retire</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Before migration begins, Softree evaluates your existing Synapse & ADF environment to identify dependencies, workloads, compatibility considerations, and modernization opportunities.
          </p>
        </div>

        {/* Assessment Grid / Table Layout */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-lg p-6 sm:p-8 lg:p-10 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {assessmentAreas.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-orange-300 hover:bg-orange-50/30 transition-all duration-200"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-orange-100 text-[#FF6B00] flex items-center justify-center shrink-0">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{item.area}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
              Ready for your Synapse to Fabric Assessment?
            </h3>
            <p className="text-slate-300 text-sm">
              Get a comprehensive workload discovery and architectural migration roadmap.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#FF6B00] hover:bg-[#e05e00] text-white font-semibold text-sm shadow-lg shadow-orange-500/25 shrink-0 transition-all"
          >
            <span>Request a Migration Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
