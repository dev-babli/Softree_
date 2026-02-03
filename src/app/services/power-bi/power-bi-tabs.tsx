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
      "Monitor KPIs, track trends, and respond instantly with real-time dashboards that keep your business agile and informed.",
  },
  {
    id: 2,
    title: "Automated Reporting & Analytics",
    icon: LineChart,
    description:
      "Eliminate manual reporting with automated workflows that deliver accurate, always up-to-date insights.",
  },
  {
    id: 3,
    title: "Seamless Data Integration",
    icon: Layers,
    description:
      "Unify cloud, on-prem, and third-party sources into a single ecosystem for a complete business view.",
  },
  {
    id: 4,
    title: "Advanced AI & Predictive Insights",
    icon: Brain,
    description:
      "Leverage forecasting, anomaly detection, and predictive analytics directly inside dashboards.",
  },
  {
    id: 5,
    title: "Improved Decision-Making",
    icon: Target,
    description:
      "Turn complex datasets into intuitive visuals that empower faster, confident decisions.",
  },
  {
    id: 6,
    title: "Enhanced Data Security & Compliance",
    icon: ShieldCheck,
    description:
      "Protect sensitive business data with enterprise-grade security, role-based access, and compliance controls.",
  },
];

export default function PowerBIServicesSection() {
  const [activeTab, setActiveTab] = useState(4);
  const active = tabs.find((t) => t.id === activeTab)!;
  const ActiveIcon = active.icon;

  return (
    <section className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50 py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* ================= HEADER ================= */}
        <div className="relative text-center mb-24 max-w-4xl mx-auto">
          {/* subtle glow background */}
          <div className="absolute inset-0 -z-10 blur-3xl opacity-40 bg-gradient-to-r from-blue-200/40 via-cyan-200/30 to-transparent" />

          {/* Eyebrow badge */}
          <span
            className="
      inline-block
      mb-6
      px-5 py-2
      rounded-full
      bg-blue-50
      text-blue-600
      text-xs
      font-semibold
      uppercase
      tracking-[0.25em]
    "
          >
            Analytics & Intelligence
          </span>

          {/* Title */}
          <h2 className="text-4xl lg:text-5xl font-semibold text-zinc-900 leading-tight">
            How{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Power BI
            </span>{" "}
            Digitalizes Your Business
          </h2>

          {/* Description */}
          <p className="mt-6 text-zinc-600 text-lg leading-relaxed max-w-2xl mx-auto">
            Transform raw data into intelligent insights with scalable, secure,
            and enterprise-grade analytics solutions designed for smarter
            decisions and faster growth.
          </p>

          {/* Accent line */}
          <div className="mt-8 mx-auto h-[2px] w-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
        </div>

        {/* ================= MIRROR GRID ================= */}
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-0 rounded-[32px] overflow-hidden shadow-xl">
          {/* ================================================= */}
          {/* LEFT : DARK PANEL (GRAY/BLACK MIRROR) */}
          {/* ================================================= */}
          <div className="bg-gradient-to-b from-zinc-900 via-zinc-950 to-black p-7">
            <div className="grid grid-cols-2 gap-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = tab.id === activeTab;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
              p-5 rounded-xl text-left border transition-all duration-300

              ${
                isActive
                  ? `
                    bg-zinc-800
                    border-cyan-400/40
                    text-white
                    shadow-lg
                  `
                  : `
                    bg-zinc-900
                    border-zinc-800
                    text-zinc-400
                    hover:bg-zinc-800
                    hover:text-white
                  `
              }
            `}
                  >
                    <div
                      className={`
                mb-3 w-10 h-10 flex items-center justify-center rounded-lg
                ${
                  isActive
                    ? "bg-cyan-500/20 text-cyan-300"
                    : "bg-zinc-800 text-zinc-500"
                }
              `}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className="text-sm font-medium">{tab.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================================================= */}
          {/* RIGHT : WHITE CONTENT PANEL */}
          {/* ================================================= */}
          <div className="bg-white p-12 flex items-center">
            <div className="grid md:grid-cols-[auto_1fr] gap-10 items-center">
              {/* Icon */}
              <div className="w-24 h-24 rounded-2xl bg-blue-50 flex items-center justify-center">
                <active.icon className="w-12 h-12 text-blue-600" />
              </div>

              {/* Text */}
              <div>
                <span className="text-xs tracking-widest uppercase text-blue-600 font-medium">
                  Power BI Capability
                </span>

                <h3 className="mt-3 text-3xl md:text-4xl font-semibold text-zinc-900">
                  {active.title}
                </h3>

                <p className="mt-5 text-zinc-600 text-lg leading-relaxed max-w-2xl">
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
