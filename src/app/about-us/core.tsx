"use client";

import React from "react";

const capabilities = [
  {
    title: "Microsoft Business Applications",
    description:
      "Secure, integrated systems that improve operational efficiency and business visibility.",
    tech: [
      "Power Apps",
      "Power Automate",
      "Dataverse",
      "Dynamics 365",
      "SharePoint Online",
    ],
  },
  {
    title: "Data & Analytics Engineering",
    description:
      "Scalable reporting ecosystems and modern data platforms for strategic decision-making.",
    tech: [
      "Microsoft Fabric",
      "Power BI",
      "Databricks",
      "Snowflake",
      "Enterprise Data Warehousing",
    ],
  },
  {
    title: "AI & Intelligent Automation",
    description:
      "Practical AI-driven automation solutions focused on measurable business outcomes.",
    tech: [
      "Azure AI",
      "Copilot Integration",
      "AI Agents",
      "RAG Workflows",
      "Process Automation",
    ],
  },
  {
    title: "Modern Application Engineering",
    description:
      "High-performance, cloud-native applications aligned with enterprise standards.",
    tech: [
      "React",
      "Next.js",
      "Node.js",
      ".NET",
      "REST & GraphQL APIs",
      "React Native",
    ],
  },
];

export default function CoreCapabilities() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900">
            Our Core Capabilities
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Delivering enterprise-grade solutions across Microsoft platforms,
            AI automation, analytics engineering, and modern applications.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {capabilities.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-500 hover:-translate-y-2 flex flex-col"
            >
              {/* Title */}
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-slate-600 text-sm mb-6 flex-grow">
                {item.description}
              </p>

              {/* Tech Pills */}
              <div className="flex flex-wrap gap-2">
                {item.tech.map((techItem, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white"
                  >
                    {techItem}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}