"use client";

import React from "react";
import { Layers, Database, Sparkles, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SynapseToFabricWhy() {
  const cards = [
    {
      title: "Unified Analytics",
      desc: "Bring data engineering, warehousing, real-time analytics, and business intelligence together into a single unified SaaS experience.",
      icon: Layers,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
      border: "border-orange-100",
    },
    {
      title: "Simplified Data Management",
      desc: "Reduce complexity across fragmented data workloads and eliminate unnecessary data duplication using Microsoft OneLake.",
      icon: Database,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
      border: "border-orange-100",
    },
    {
      title: "DirectLake Power BI Integration",
      desc: "Connect enterprise data directly with Microsoft Power BI in DirectLake mode for sub-second query performance without data import.",
      icon: Sparkles,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
      border: "border-orange-100",
    },
    {
      title: "Scalable & Future-Ready",
      desc: "Build a modern analytics platform powered by open Delta Parquet format that seamlessly evolves with your enterprise AI workloads.",
      icon: TrendingUp,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
      border: "border-orange-100",
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white text-slate-900 border-b border-slate-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-[#FF6B00] text-xs font-semibold tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
            WHY MICROSOFT FABRIC MIGRATION?
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            Move from a Disconnected Stack to a{" "}
            <span className="text-[#FF6B00]">Unified Platform</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Microsoft Fabric unifies data engineering, data warehousing, data science, real-time analytics, and business intelligence into one SaaS ecosystem.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className={`p-6 sm:p-8 rounded-3xl bg-slate-50/70 border ${card.border} hover:border-orange-300 hover:bg-white hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 flex flex-col justify-between group`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${card.bg} border border-orange-200/60 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${card.color}`} />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#FF6B00] transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center gap-2 text-xs font-semibold text-[#FF6B00] group-hover:translate-x-1 transition-transform">
                  <span>Explore Fabric Capabilities</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
