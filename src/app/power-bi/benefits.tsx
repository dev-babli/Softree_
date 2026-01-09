"use client";
import React from "react";

const features = [
  {
    title: "Strategic Data Insights",
    description:
      "Softree transforms your raw data into clear, actionable insights that empower smarter decisions across your organization.",
    icon: "📊",
  },
  {
    title: "Trusted Data Governance",
    description:
      "We implement governance frameworks and access controls to ensure your data is secure, compliant, and trustworthy at every level.",
    icon: "🛡️",
  },
  {
    title: "Optimized Analytics Performance",
    description:
      "Softree ensures your dashboards and reports run efficiently, delivering fast, reliable insights for your teams.",
    icon: "⚡",
  },
  {
    title: "Scalable BI Architecture",
    description:
      "We design robust Power BI solutions that scale with your business, integrating multiple data sources seamlessly.",
    icon: "🏗️",
  },
  {
    title: "Continuous Innovation",
    description:
      "Through monitoring, optimization, and enhancements, Softree keeps your analytics ecosystem evolving as your business grows.",
    icon: "🔄",
  },
];

export default function SoftreePowerBISection() {
  return (
    <section className="py-16 px-4 bg-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left large gradient box with thick partial gradient border */}
        <div className="relative bg-gradient-to-br from-gray-900 via-[#0d1f4a] to-black text-white rounded-xl p-10 flex flex-col justify-center shadow-lg overflow-hidden">
          {/* Thick left gradient border */}
          <div className="absolute left-0 top-0 h-full w-3 bg-gradient-to-b from-gray-500 via-gray-400 to-gray-600 rounded-l-xl"></div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">
            Elevate Your Business with Softree
            <span className="text-green-500">.</span>
          </h2>
          <p className="text-gray-300 mb-6 leading-relaxed relative z-10">
            Softree’s Power BI consulting services help you unlock the full
            potential of your data. From designing scalable dashboards to
            implementing intelligent analytics, we deliver solutions that drive
            efficiency, growth, and measurable ROI.
          </p>
          <a
            href="/contact/"
            className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-md transition relative z-10"
          >
            Connect with Softree
            <span className="ml-2">→</span>
          </a>
        </div>

        {/* Right column with cards */}
        <div className="grid grid-cols-1 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex gap-4 items-start bg-gray-900 p-5 rounded-xl shadow hover:shadow-lg transition relative overflow-hidden"
            >
              {/* Thick left gradient border */}
              <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-gray-500 via-gray-400 to-gray-600 rounded-l-xl"></div>

              {/* Icon with soft orange background */}
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-orange-100 text-orange-500 text-2xl relative z-10">
                {feature.icon}
              </div>

              {/* Card content */}
              <div className="relative z-10">
                <h3 className="text-lg font-semibold mb-1 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
