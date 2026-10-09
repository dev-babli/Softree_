"use client";

import React from "react";
import { ArrowRight, CheckCircle2, Search, BarChart2, MapPin, RefreshCw, ShieldCheck, Zap } from "lucide-react";

export default function SynapseToFabricStrategy() {
  const steps = [
    { num: "01", title: "Discover", desc: "Environment audit" },
    { num: "02", title: "Assess", desc: "Workload analysis" },
    { num: "03", title: "Plan", desc: "Fabric architecture" },
    { num: "04", title: "Migrate", desc: "Pipeline & Code move" },
    { num: "05", title: "Validate", desc: "Parity testing" },
    { num: "06", title: "Optimize", desc: "DirectLake tuning" },
  ];

  const supportingCards = [
    { title: "Current-State Assessment", desc: "Full inventory of Synapse SQL pools, ADF pipelines, and ADLS storage structures.", icon: Search },
    { title: "Target Fabric Architecture", desc: "Blueprint for OneLake workspaces, lakehouses, warehouses, and Purview governance.", icon: MapPin },
    { title: "Workload Prioritization", desc: "Categorize low-risk pilot workloads vs mission-critical business data streams.", icon: BarChart2 },
    { title: "Migration Waves", desc: "Phased migration execution plan to prevent operational downtime.", icon: RefreshCw },
    { title: "Testing Strategy", desc: "Automated row-count, schema, and cell-level parity validation scripts.", icon: ShieldCheck },
    { title: "Cutover Planning", desc: "Parallel run execution, fallback procedures, and seamless production cutover.", icon: Zap },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white text-slate-900 border-b border-slate-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-[#FF6B00] text-xs font-semibold tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
            MIGRATION STRATEGY
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            A Structured Path from <span className="text-[#FF6B00]">Synapse to Fabric</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Every Synapse environment has different workloads and dependencies. Softree creates a migration roadmap based on your existing architecture, business requirements, and Fabric adoption goals.
          </p>
        </div>

        {/* Horizontal Process Flow Strip */}
        <div className="mb-14 bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl text-white">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {steps.map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center p-3">
                <span className="text-xs font-mono text-[#FF6B00] font-bold mb-1">{step.num}</span>
                <h3 className="text-base font-bold text-white mb-0.5">{step.title}</h3>
                <p className="text-xs text-slate-400">{step.desc}</p>
                {idx !== steps.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 text-slate-600">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 6 Supporting Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportingCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-orange-300 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-2xl bg-orange-100 text-[#FF6B00] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{card.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{card.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
