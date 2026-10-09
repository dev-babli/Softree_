"use client";

import React from "react";
import { Search, ClipboardCheck, MapPin, RefreshCw, Zap } from "lucide-react";

export default function AdfToFabricMethodology() {
  const steps = [
    {
      step: "01",
      title: "Discover",
      desc: "Understand your existing Azure Data Factory pipelines, Synapse workloads, data stores, and business goals.",
      icon: Search,
    },
    {
      step: "02",
      title: "Assess",
      desc: "Analyze workload complexity, pipeline dependencies, SSIS compatibility, and potential migration risks.",
      icon: ClipboardCheck,
    },
    {
      step: "03",
      title: "Design",
      desc: "Define the target Microsoft Fabric architecture, OneLake lakehouse organization, and Git CI/CD strategy.",
      icon: MapPin,
    },
    {
      step: "04",
      title: "Migrate & Validate",
      desc: "Move pipelines and data workloads in controlled phases, validating data parity and performance.",
      icon: RefreshCw,
    },
    {
      step: "05",
      title: "Optimize",
      desc: "Tune PySpark compute, optimize DirectLake Power BI models, and establish automated Purview governance.",
      icon: Zap,
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#FAFAFC] text-slate-900 border-b border-slate-200/60">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-[#FF6B00] text-xs font-semibold tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
            MIGRATION METHODOLOGY
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            From Legacy Pipelines to a <span className="text-[#FF6B00]">Production-Ready Fabric</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Our migration approach combines technical assessment, workload modernization, controlled migration, validation, and post-migration optimization.
          </p>
        </div>

        {/* 5-Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:border-orange-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
              >
                <div className="text-xs font-mono font-extrabold text-[#FF6B00] tracking-widest mb-3">
                  STEP {item.step}
                </div>

                <div>
                  <div className="w-10 h-10 rounded-2xl bg-orange-50 text-[#FF6B00] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-400">
                  Phase {idx + 1} Execution
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
