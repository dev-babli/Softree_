"use client";

import { useState } from "react";
import {
  BarChart3,
  LineChart,
  Layers,
  Brain,
  Target,
  ShieldCheck,
} from "lucide-react";

const tabs = [
  {
    id: 1,
    title: "Real-Time Data Visualization",
    icon: BarChart3,
    description:
      "Monitor KPIs, track trends, and respond instantly with real-time Power BI dashboards that keep your business agile and informed.",
  },
  {
    id: 2,
    title: "Automated Reporting & Analytics",
    icon: LineChart,
    description:
      "Eliminate manual reporting with automated analytics workflows that deliver accurate, always up-to-date insights.",
  },
  {
    id: 3,
    title: "Seamless Data Integration",
    icon: Layers,
    description:
      "Unify cloud, on-prem, and third-party data sources into a single Power BI ecosystem for a complete business view.",
  },
  {
    id: 4,
    title: "Advanced AI & Predictive Insights",
    icon: Brain,
    description:
      "Leverage AI-powered forecasting, anomaly detection, and predictive analytics directly inside Power BI dashboards.",
  },
  {
    id: 5,
    title: "Improved Decision-Making",
    icon: Target,
    description:
      "Turn complex datasets into intuitive visuals that empower leadership teams to make faster, confident decisions.",
  },
  {
    id: 6,
    title: "Enhanced Data Security & Compliance",
    icon: ShieldCheck,
    description:
      "Protect sensitive business data with enterprise-grade security, role-based access, and regulatory compliance.",
  },
];

export default function PowerBIServicesSection() {
  const [activeTab, setActiveTab] = useState(4);
  const active = tabs.find((t) => t.id === activeTab)!;

  return (
    <section
      id="plan-pricing"
      className="relative overflow-hidden bg-[#05070C] py-36"
    >
      {/* ===== Ambient Gradients ===== */}
      <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 bg-cyan-500/20 blur-[160px]" />
      <div className="absolute bottom-0 -right-40 h-[420px] w-[420px] bg-indigo-600/25 blur-[160px]" />
      <div className="absolute top-1/3 -left-40 h-[420px] w-[420px] bg-purple-600/20 blur-[160px]" />

      <div className="relative container mx-auto px-4">
        {/* ===== Header ===== */}
        <div className="text-center mb-20">
          <h2 className="text-3xl lg:text-4xl font-semibold text-white">
            How Power BI Services Can Help You Digitalize Your Business
          </h2>
          <p className="mt-5 text-gray-400 max-w-3xl mx-auto">
            Transform raw data into intelligent insights with enterprise-grade
            Power BI solutions designed for scalability, security, and impact.
          </p>
        </div>

        {/* ===== MAIN GRID (Equal Height) ===== */}
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-14 items-stretch">
          {/* ================= LEFT: TABS ================= */}
          <div className="relative h-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7">
            {/* Subtle panel glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/6 via-transparent to-transparent pointer-events-none" />

            <div className="relative grid grid-cols-2 gap-6 h-full">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = tab.id === activeTab;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`group relative p-6 rounded-2xl border text-left transition-all duration-300
    ${
      isActive
        ? `
          border-white/10
          border-l-[3px] border-l-cyan-400
          bg-gradient-to-br from-cyan-500/12 to-transparent
          shadow-[0_0_0_1px_rgba(34,211,238,0.35),0_12px_32px_rgba(0,0,0,0.4)]
        `
        : `
          border-white/10
          bg-white/5
          hover:bg-white/8
          hover:-translate-y-[2px]
        `
    }
  `}
                  >
                    {isActive && (
                      <>
                        <span className="absolute left-3 top-4 bottom-4 w-[2px] rounded-full bg-gradient-to-b from-cyan-300 to-indigo-500 opacity-80" />
                        <span className="absolute left-3 top-4 bottom-4 w-[6px] bg-cyan-400/20 blur-md rounded-full" />
                      </>
                    )}

                    {/* Icon Container */}
                    <div
                      className={`mb-4 w-11 h-11 flex items-center justify-center rounded-xl transition-colors
              ${
                isActive
                  ? "bg-cyan-500/25 text-cyan-300"
                  : "bg-white/10 text-gray-400 group-hover:text-cyan-300"
              }
            `}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Title */}
                    <span
                      className={`text-sm font-medium leading-snug block
              ${isActive ? "text-cyan-100" : "text-gray-300"}
            `}
                    >
                      {tab.title}
                    </span>

                    {/* Active underline (micro detail) */}
                    {isActive && (
                      <span className="mt-3 block h-px w-8 bg-cyan-400/60 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="relative h-full rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-12 flex items-center overflow-hidden">
            {/* Thick Right Accent */}
            <div className="absolute top-4 bottom-4 right-0 w-[8px] rounded-l-xl bg-gradient-to-b from-cyan-400 via-indigo-500 to-cyan-400 opacity-90" />
            <div className="absolute top-4 bottom-4 right-0 w-[14px] bg-cyan-400/20 blur-xl pointer-events-none" />

            {/* Soft side glow */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-cyan-500/10 to-transparent pointer-events-none" />

            <div className="relative grid lg:grid-cols-[auto_1fr] gap-14 items-center">
              {/* ICON ZONE */}
              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-2xl bg-cyan-500/25 blur-xl opacity-60" />

                <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 flex items-center justify-center border border-white/10">
                  <active.icon className="w-12 h-12 text-cyan-300" />
                </div>
              </div>

              {/* CONTENT */}
              <div className="max-w-2xl">
                <span className="inline-block mb-4 text-xs tracking-widest uppercase text-cyan-300/80">
                  Power BI Capability
                </span>

                <h3 className="relative text-3xl lg:text-4xl font-semibold leading-tight tracking-tight mb-6">
                  <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
                    {active.title}
                  </span>
                  <span className="absolute -bottom-3 left-0 h-[2px] w-14 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full" />
                </h3>

                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  {active.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
