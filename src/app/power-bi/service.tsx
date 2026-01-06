"use client";

import React from "react";
import {
  HiOutlineDesktopComputer,
  HiOutlineUserGroup,
  HiOutlineChartBar,
  HiOutlineSupport,
} from "react-icons/hi";

const serviceItems = [
  {
    title: "Data Strategy & Roadmap",
    description:
      "Define a clear data strategy for your organization. Identify key metrics, create actionable dashboards, and align BI initiatives with your business goals.",
    icon: HiOutlineChartBar,
  },
  {
    title: "Custom Power BI Development",
    description:
      "Build tailored dashboards and reports that fit your business processes. From data modeling to visualization, we deliver end-to-end Power BI solutions.",
    icon: HiOutlineDesktopComputer,
  },
  {
    title: "Team Extension",
    description:
      "Scale your internal BI team with our certified Power BI experts. Flexible resources that integrate seamlessly with your projects and timelines.",
    icon: HiOutlineUserGroup,
  },
  {
    title: "Ongoing Support & Training",
    description:
      "Enhance adoption and ROI with hands-on support, performance tuning, and customized training sessions for your team.",
    icon: HiOutlineSupport,
  },
];

export default function ServiceBigCards() {
  return (
    <section className="bg-black py-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center px-4 mb-16">
        <h2 className="text-5xl md:text-5xl font-extrabold text-white mb-6">
          Advanced Power BI Solutions for Modern Businesses
        </h2>
        <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
          Transform your data into actionable insights with our end-to-end Power
          BI services — from intelligent dashboards and predictive analytics to
          scalable team augmentation and tailored BI strategies.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 px-4">
        {serviceItems.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <div
              key={idx}
              className="flex flex-row items-center rounded-3xl shadow-2xl min-h-[400px] p-10"
              style={{
                background:
                  "linear-gradient(135deg, #000000 0%, #4b4b4b 50%, #1e1e20ff 100%)",
                borderTop: "4px solid rgba(255,255,255,0.4)",
                borderLeft: "4px solid rgba(255,255,255,0.4)",
                borderRight: "4px solid rgba(255,255,255,0.4)",
                borderBottom: "none",
              }}
            >
              {/* Icon */}
              <div className="w-28 h-28 md:w-32 md:h-32 flex-shrink-0 mr-8 text-white">
                <IconComponent className="w-full h-full" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-lg md:text-xl">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
