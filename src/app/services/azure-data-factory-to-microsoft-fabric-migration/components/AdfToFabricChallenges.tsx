"use client";

import React from "react";
import { Network, Layers, ShieldCheck, Zap, Lock, ShieldAlert } from "lucide-react";

export default function AdfToFabricChallenges() {
  const challenges = [
    {
      title: "Complex Dependencies",
      desc: "Identify relationships between ADF pipelines, SSIS packages, data lakes, triggers, and Power BI dashboards.",
      icon: Network,
    },
    {
      title: "Legacy Workloads",
      desc: "Determine which SSIS packages and T-SQL stored procedures should be migrated, rewritten, or modernized into PySpark.",
      icon: Layers,
    },
    {
      title: "Data Validation",
      desc: "Validate migrated data outputs and analytical query results against the existing legacy environment down to cell parity.",
      icon: ShieldCheck,
    },
    {
      title: "Performance Concerns",
      desc: "Optimize data transformation workloads for Microsoft Fabric's PySpark compute and DirectLake Power BI mode.",
      icon: Zap,
    },
    {
      title: "Security & Governance",
      desc: "Establish workspace identity management, row/column level security, and Microsoft Purview catalog policies.",
      icon: Lock,
    },
    {
      title: "Business Disruption",
      desc: "Use controlled phased migration waves and parallel run validation to eliminate cutover risk and business downtime.",
      icon: ShieldAlert,
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white text-slate-900 border-b border-slate-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-[#FF6B00] text-xs font-semibold tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
            MIGRATION CHALLENGES
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            Solve the Complexity Behind <span className="text-[#FF6B00]">Data Modernization</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Softree helps enterprise teams overcome technical, architectural, and operational migration obstacles.
          </p>
        </div>

        {/* 6 Challenge Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-orange-300 hover:bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-2xl bg-orange-100 text-[#FF6B00] flex items-center justify-center mb-5">
                  <Icon className="w-5.5 h-5.5" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
