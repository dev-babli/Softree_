"use client";

import React from "react";
import { Workflow, Layers, Cpu, Database, Server, Sparkles, Shield, Plug } from "lucide-react";

export default function AdfToFabricScope() {
  const scopeItems = [
    {
      title: "ADF Pipelines & Copy Activities",
      desc: "Convert legacy Copy activities, lookup loops, web activities, parameters, and triggers to Fabric Data Factory.",
      icon: Workflow,
    },
    {
      title: "SSIS Packages & Integration Runtime",
      desc: "Migrate on-premises and cloud SSIS packages into native Fabric Data Pipelines and PySpark notebook transformations.",
      icon: Layers,
    },
    {
      title: "Spark Workloads & Notebooks",
      desc: "Refactor PySpark, Scala, and Databricks scripts to run on high-speed Fabric Synapse Spark compute clusters.",
      icon: Cpu,
    },
    {
      title: "ADLS Gen2 Data Lakes",
      desc: "Consolidate scattered ADLS Gen2 containers into OneLake shortcuts and open Delta Parquet format tables.",
      icon: Database,
    },
    {
      title: "Synapse & SQL Data Warehousing",
      desc: "Migrate dedicated SQL pools, serverless SQL, views, and stored procedures into Fabric Lakehouses and Data Warehouses.",
      icon: Server,
    },
    {
      title: "Semantic Models & Power BI",
      desc: "Transition legacy import and DirectQuery datasets to DirectLake mode for sub-second report performance.",
      icon: Sparkles,
    },
    {
      title: "Security & Purview Governance",
      desc: "Enforce RBAC permissions, row/column-level security, and Microsoft Purview automated sensitivity labels.",
      icon: Shield,
    },
    {
      title: "Data Integrations & Downstream APIs",
      desc: "Ensure seamless connectivity with external ERPs, CRMs, APIs, and downstream business reporting tools.",
      icon: Plug,
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white text-slate-900 border-b border-slate-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-[#FF6B00] text-xs font-semibold tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
            MIGRATION SCOPE
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            Migrate Your Workloads with <span className="text-[#FF6B00]">Minimal Disruption</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Softree handles full end-to-end migration across all ADF pipeline activities, data stores, code scripts, and reporting assets.
          </p>
        </div>

        {/* 8 Scope Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {scopeItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-orange-300 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-orange-100 text-[#FF6B00] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-5.5 h-5.5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#FF6B00] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
