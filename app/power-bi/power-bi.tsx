"use client";

import React from "react";
import {
  ChartBarIcon,
  CircleStackIcon,
  PresentationChartLineIcon,
  CalculatorIcon,
  ShieldCheckIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

const services = [
  {
    title: "Power BI Strategy & Planning",
    description:
      "We define a clear Power BI strategy by understanding business objectives, KPIs, and reporting needs to ensure measurable outcomes.",
    icon: ChartBarIcon,
  },
  {
    title: "Data Integration & Modeling",
    description:
      "We connect Power BI with SQL, Excel, SharePoint, Azure, and cloud platforms, creating optimized data models for performance and scale.",
    icon: CircleStackIcon,
  },
  {
    title: "Interactive Dashboard Development",
    description:
      "We build visually engaging Power BI dashboards with drill-downs, slicers, and role-based insights for better decision-making.",
    icon: PresentationChartLineIcon,
  },
  {
    title: "Advanced Analytics & DAX",
    description:
      "Our experts develop advanced DAX calculations, KPIs, and time intelligence to uncover meaningful business trends.",
    icon: CalculatorIcon,
  },
  {
    title: "Security & Governance",
    description:
      "We implement row-level security (RLS), workspace governance, and access controls to keep your data secure and compliant.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Deployment, Training & Support",
    description:
      "We deploy Power BI Service, configure refresh schedules, and provide training and support for long-term success.",
    icon: AcademicCapIcon,
  },
];

export default function PowerBITimeline() {
  return (
    <section className="relative bg-gradient-to-b from-black via-[#0b0b0b] to-black py-28">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
          Our Power BI Services
        </h2>
        <p className="text-gray-400 text-center max-w-3xl mx-auto mb-20">
          A structured, end-to-end Power BI journey designed to transform raw
          data into actionable business intelligence.
        </p>

        {/* Timeline Wrapper with Background */}
        {/* Timeline Wrapper with Thick Border */}
        <div
          className="
  relative
  rounded-3xl
  bg-gradient-to-br from-[#0b0b0b] via-[#111111] to-black
  p-10 md:p-16
  shadow-2xl
  border-2 border-gray-700
"
        >
          {/* Timeline */}
          <div className="relative">
            {/* Vertical center line */}
            <div className="absolute left-[26px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-gray-600 via-gray-700 to-transparent" />

            <div className="flex flex-col gap-20">
              {services.map((service, idx) => (
                <div key={idx} className="flex gap-10 relative">
                  {/* Icon */}
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
                      <service.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pt-1">
                    <h3 className="text-2xl font-semibold text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed max-w-3xl">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
