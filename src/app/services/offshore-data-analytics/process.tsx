"use client";

import {
  FaSearch,
  FaDatabase,
  FaProjectDiagram,
  FaChartLine,
  FaCloudUploadAlt,
} from "react-icons/fa";

const processSteps = [
  {
    title: "Discovery & Data Assessment",
    description:
      "We analyze your business goals, data sources, and reporting needs to identify key metrics, data gaps, and opportunities for actionable insights.",
    icon: FaSearch,
  },
  {
    title: "Data Integration & Preparation",
    description:
      "We connect to multiple data sources such as Excel, SQL Server, and APIs, then clean and transform the data using Power Query for consistency and accuracy.",
    icon: FaDatabase,
  },
  {
    title: "Data Modeling",
    description:
      "We design efficient data models by creating relationships, schemas, and calculated columns to ensure scalable and high-performance reporting.",
    icon: FaProjectDiagram,
  },
  {
    title: "Analytics & Visualization",
    description:
      "We build interactive reports and dashboards using DAX, charts, KPIs, filters, and slicers to enable deep data analysis and better decision-making.",
    icon: FaChartLine,
  },
  {
    title: "Deployment & Continuous Optimization",
    description:
      "We publish reports to Power BI Service, configure data refresh, manage access, and continuously optimize dashboards based on evolving business needs.",
    icon: FaCloudUploadAlt,
  },
];

export default function PowerBIProcessSection() {
  return (
    <section className="relative py-12 overflow-visible">
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* 🔥 CONNECTED GLASS BACKGROUND (VISUAL ONLY) */}
        <div
          className="
            absolute inset-0
            rounded-[40px]                     
            border border-white/10
            -z-10
          "
        />

        {/* Soft inner glow */}
        <div
          className="
            absolute inset-0
            rounded-[40px]
            bg-gradient-to-br from-orange-500/10 via-transparent to-amber-500/10
            pointer-events-none
            -z-10
          "
        />

        <div
          className="
    relative
    grid grid-cols-1 lg:grid-cols-2
    gap-16 lg:gap-24
    px-8 py-14 lg:px-14 lg:py-20

    /* ✅ Charcoal glass background with brand copper glow */
     bg-gradient-to-r from-black via-[#4c1c02] to-black
    backdrop-blur-2xl
    border border-white/10
    rounded-[36px]
   
  "
        >
          {/* ================= LEFT – TRUE STICKY ================= */}
          <div className="lg:sticky lg:top-32 self-start">
            <div className="max-w-xl space-y-6">
              {/* Eyebrow */}
              <span
                className="
          inline-flex items-center px-4 py-1.5 rounded-full
          bg-white/5 border border-white/15
          text-xs tracking-wide text-gray-300
        "
              >
                Delivery Framework
              </span>

              {/* Heading */}
              <h3 className="text-3xl lg:text-4xl font-semibold text-white leading-tight">
                Our Power BI Development Process for Scalable Solutions
              </h3>

              {/* Divider (neutral) */}
              <div className="w-14 h-px bg-white/30" />

              {/* Description */}
              <p className="text-lg text-gray-400 leading-relaxed">
                At Softree, we follow a structured approach to Power BI
                development—from data integration and transformation to
                modeling, visualization, and deployment—ensuring accurate
                insights and consistent decision-making across the organization.
              </p>
            </div>
          </div>

          {/* ================= RIGHT – TIMELINE ================= */}
          <div className="relative">
            <ul className="relative space-y-14">
              {/* Vertical dotted line */}
              <span
                className="
          absolute left-[28px] top-[28px] bottom-[28px]
          w-px border-l border-dashed border-white/25
        "
              />

              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <li key={index} className="relative flex gap-6 items-start">
                    {/* Icon */}
                    <div className="relative z-10 flex-shrink-0">
                      <div
                        className="
                  w-14 h-14 rounded-full
                  bg-[#141414]
                  border border-white/20
                  flex items-center justify-center
                  text-gray-200
                  shadow-[0_0_22px_rgba(255,255,255,0.12)]
                "
                      >
                        <Icon size={22} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="pt-1">
                      <h4 className="text-xl font-semibold text-white mb-2">
                        {step.title}
                      </h4>
                      <p className="text-gray-400 leading-relaxed max-w-md">
                        {step.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
