"use client";

import React from "react";
import {
  ChartBarIcon,
  MegaphoneIcon,
  Cog6ToothIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";

const dashboardItems = [
  {
    title: "Finance",
    description:
      "Track revenues, expenses, and financial KPIs in real-time. Our Power BI finance dashboard gives CFOs and finance teams actionable insights to optimize cash flow, budget, and profitability.",
    image: "/images/power-bi/1.png",
    icon: <ChartBarIcon className="w-16 h-16 text-orange-500" />,
  },
  {
    title: "Marketing",
    description:
      "Measure campaign performance, customer engagement, and ROI. The marketing Power BI dashboard enables teams to analyze traffic, leads, conversions, and optimize marketing spend effectively.",
    image: "/images/power-bi/2.png",
    icon: <MegaphoneIcon className="w-16 h-16 text-orange-500" />,
  },
  {
    title: "Operations",
    description:
      "Monitor supply chain, production efficiency, and operational KPIs. Our operations dashboard helps managers track performance, identify bottlenecks, and improve overall operational efficiency.",
    image: "/images/power-bi/3.png",
    icon: <Cog6ToothIcon className="w-16 h-16 text-orange-500" />,
  },
  {
    title: "Customer Support",
    description:
      "Gain insights into ticket volumes, resolution times, and customer satisfaction. The customer support dashboard empowers teams to improve response times and deliver exceptional service.",
    image: "/images/power-bi/4.png",
    icon: (
      <ChatBubbleBottomCenterTextIcon className="w-16 h-16 text-orange-500" />
    ),
  },
];

export default function PowerBICards() {
  return (
    <section className="bg-black py-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center px-4 mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Power BI Dashboards for Every Business Function
        </h2>
        <p className="text-gray-400 text-lg md:text-xl">
          Explore our specialized dashboards designed to help you make
          data-driven decisions across Finance, Marketing, Operations, and
          Customer Support.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-[84%] mx-auto grid md:grid-cols-2 gap-12 px-4">
        {dashboardItems.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl min-h-[400px] md:min-h-[500px] w-full"
          >
            {/* Image */}
            <div className="md:w-1/2 flex-shrink-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content with gradient + gradient border */}
            <div
              className="md:w-1/2 p-10 flex flex-col justify-center rounded-r-2xl relative"
              style={{
                background: "linear-gradient(135deg, #1f1f1f 0%, #2a2a2a 100%)",
                border: "6px solid", // thickness of border
                borderImage:
                  "linear-gradient(to bottom right, rgba(255,255,255,0.8), rgba(255,255,255,0.2)) 1",
              }}
            >
              {/* Icon Left */}
              <div className="flex items-center gap-6 mb-6">
                {item.icon}
                <h3 className="text-3xl md:text-4xl font-bold text-white">
                  {item.title}
                </h3>
              </div>

              <p className="text-gray-300 text-lg md:text-xl">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
