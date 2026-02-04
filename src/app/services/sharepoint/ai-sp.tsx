"use client";

import { Check, X } from "lucide-react";

export default function AIDrivenSharePointMigration() {
  const rows = [
    {
      feature: "Content Discovery & Assessment",
      traditional:
        "Manual content review with limited visibility into dependencies",
      ai: "AI automatically discovers, analyzes, and maps content relationships and dependencies",
    },
    {
      feature: "Data Quality & Classification",
      traditional: "Manual tagging and basic validation rules",
      ai: "AI-driven classification, duplicate detection, and intelligent metadata enrichment",
    },
    {
      feature: "User & Usage Insights",
      traditional:
        "Relies on stakeholder interviews and historical access logs",
      ai: "AI continuously analyzes user behavior to prioritize active and critical content",
    },
    {
      feature: "Migration Accuracy & Risk",
      traditional: "Higher risk of data loss, misconfiguration, and rework",
      ai: "Predictive analysis minimizes risk and ensures higher migration accuracy",
    },
    {
      feature: "Time & Cost Optimization",
      traditional: "Longer timelines with higher operational costs",
      ai: "Automation significantly reduces migration time, effort, and overall cost",
    },
  ];

  return (
    <section className=" py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="mb-3 max-w-4xl px-4">
          {/* Eyebrow */}
          <span
            className="
      inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full
      text-xs font-semibold tracking-wider uppercase
      bg-blue-50 text-blue-600 border border-blue-100
    "
          >
            Intelligent Migration Comparison
          </span>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight tracking-tight">
            Why AI-Driven SharePoint Migration
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
              Outperforms Traditional Approaches
            </span>
          </h2>

          {/* Description */}
          <p className="mt-6 text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl">
            Traditional SharePoint migration relies heavily on manual processes,
            increasing risk, time, and cost. AI-driven migration introduces
            intelligent automation, deep insights, and predictive analysis to
            deliver faster, safer, and more accurate migration outcomes.
          </p>
        </div>

        {/* Table Card */}
        <div className="relative rounded-3xl border border-white/10 bg-[#070707] shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
          <div className="overflow-x-auto relative">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-8 py-6 text-left text-sm font-semibold text-white bg-white/[0.02]">
                    Feature
                  </th>
                  <th className="px-8 py-6 text-left text-sm font-semibold text-gray-300 bg-white/[0.04]">
                    Traditional Migration
                  </th>
                  <th className="px-8 py-6 text-left text-sm font-semibold text-white bg-white/[0.07]">
                    AI-Driven Migration
                  </th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row, index) => (
                  <tr
                    key={index}
                    className="group border-t border-white/10
                    transition-colors duration-200 hover:bg-white/[0.025]"
                  >
                    {/* Feature */}
                    <td className="px-8 py-6 text-white font-medium bg-white/[0.02]">
                      {row.feature}
                    </td>

                    {/* Traditional */}
                    <td className="px-8 py-6 text-gray-400 bg-white/[0.04]">
                      <div className="flex items-start gap-3">
                        <X className="w-4 h-4 text-gray-500 mt-1 shrink-0" />
                        <span>{row.traditional}</span>
                      </div>
                    </td>

                    {/* AI */}
                    <td className="px-8 py-6 text-gray-200 bg-white/[0.07]">
                      <div className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-blue-400 mt-1 shrink-0" />
                        <span>{row.ai}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
