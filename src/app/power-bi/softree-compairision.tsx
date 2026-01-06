"use client";

import React from "react";

export default function PowerBIComparisonRow() {
  const criteria = [
    "Technical Expertise",
    "Implementation Speed",
    "System Scalability",
    "User Experience & Customization",
    "Tool Optimization",
    "Seamless Migration",
    "Ongoing Support & Training",
  ];

  const inHousePoints = [
    "Team experience may be limited to internal projects",
    "Implementation can be slower due to resource constraints",
    "Scalability may struggle with complex or growing data needs",
    "Dashboards often basic, with limited interactivity",
    "Advanced features of tools may not be fully utilized",
    "Migration of existing systems may pose risks",
    "Support is typically reactive and ad-hoc",
  ];

  const consultantPoints = [
    "Access to specialized experts with cross-industry experience",
    "Faster deployment with proven frameworks and accelerators",
    "Scalable architecture built for long-term performance",
    "Interactive, user-focused dashboards for maximum impact",
    "Full utilization of advanced features including DAX and Power Query",
    "Seamless migration from legacy systems with full data integrity",
    "Proactive support, training, and upskilling for your team",
  ];

  const Icon = ({ color = "#63605fff" }: { color?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
    >
      <rect y="0.644531" width="24" height="24" rx="12" fill="white" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.098 8.03616L9.93797 14.9462L8.03797 12.9162C7.68797 12.5862 7.13797 12.5662 6.73797 12.8462C6.34797 13.1362 6.23797 13.6462 6.47797 14.0562L8.72797 17.7162C8.94797 18.0562 9.32797 18.2662 9.75797 18.2662C10.168 18.2662 10.558 18.0562 10.778 17.7162C11.138 17.2462 18.008 9.05616 18.008 9.05616C18.908 8.13616 17.818 7.32616 17.098 8.02616V8.03616Z"
        fill={color}
      />
    </svg>
  );

  const List = ({ items }: { items: string[] }) => (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="flex-shrink-0">
            <Icon />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <section className="w-full bg-black text-white py-12 px-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-30">
        <h2 className="text-3xl md:text-5xl font-bold">
          Comparing In-House Teams and Power BI Consultants — Choose the Right
          Approach
          <span className="text-orange-500 text-[35px]">.</span>
        </h2>
        <p className="text-gray-400 text-lg mt-2">
          Explore the differences in expertise, speed, and scalability to make
          the most of your analytics investment.
        </p>
      </div>

      <div
        className="max-w-7xl mx-auto rounded-2xl p-8 relative border-b-4 border-white border-opacity-40"
        style={{
          background: "linear-gradient(180deg, #484646ff 0%, #191616c1 100%)",
        }}
      >
        <div className="flex flex-col md:flex-row items-end">
          {/* Criteria */}
          <div
            className="flex-1 p-6 min-h-[500px] z-10 border border-white border-opacity-20"
            style={{
              background:
                "linear-gradient(135deg, #423c3cff 0%, #767373ff 100%)",
            }}
          >
            <h3 className="font-semibold text-lg mb-4 text-gray-300">
              Evaluation Criteria
            </h3>
            <List items={criteria} />
          </div>

          {/* In-House */}
          <div
            className="flex-1 p-6 min-h-[550px] z-20 border-t border-b border-white border-opacity-20 border-l"
            style={{
              background:
                "linear-gradient(135deg, #26201eff 0%, #81786cff 100%)",
            }}
          >
            <h3 className="font-semibold text-lg mb-4 text-gray-300">
              Internal Team
            </h3>
            <List items={inHousePoints} />
          </div>

          {/* Power BI Consultant */}
          <div
            className="flex-1 p-6 min-h-[650px] z-30 rounded-r-2xl border border-white border-opacity-20 border-l"
            style={{
              background:
                "linear-gradient(135deg, #1e1c1bff 0%, #dcd6cdff 100%)",
            }}
          >
            <h3 className="font-semibold text-lg mb-4 text-white">
              Expert Power BI Consultant
            </h3>
            <List items={consultantPoints} />
          </div>
        </div>
      </div>
    </section>
  );
}
