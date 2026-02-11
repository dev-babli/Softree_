"use client";

import React from "react";
import { Rocket, Briefcase, ShieldCheck } from "lucide-react";

/* ===================== DATA ===================== */
const pillars = [
  {
    title: "Scalable Web Application Delivery",
    icon: Rocket,
    points: [
      "End-to-end development of scalable, high-performance web applications using modern frameworks",
      "Automated CI/CD pipelines ensure faster releases, stability, and consistent quality",
      "Modular and loosely coupled architecture enables long-term scalability and adaptability",
    ],
  },
  {
    title: "Business-Driven Development Decisions",
    icon: Briefcase,
    points: [
      "Technical decisions aligned with business goals, user needs, and ROI",
      "Continuous requirement validation through stakeholder collaboration and feedback loops",
      "Technology selection based on performance, security, and long-term maintainability",
    ],
  },
  {
    title: "Secure & Disciplined Delivery Governance",
    icon: ShieldCheck,
    points: [
      "Strong governance ensures timelines, scope, and budgets remain under control",
      "Security best practices embedded across frontend, backend, and infrastructure",
      "Transparent communication, reporting, and disciplined delivery execution",
    ],
  },
];

/* ===================== SECTION ===================== */
export default function ThreePillarsOfExcellence() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50 py-10">
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        {/* ===== Header ===== */}
        <div className="text-center max-w-3xl mx-auto mb-7">
          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900">
            Our Web Development{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Delivery Pillars
            </span>
          </h2>

          <p className="mt-6 text-gray-600 leading-relaxed">
            We build secure, scalable, and business-driven digital solutions.
            These pillars ensure every web application is reliable,
            future-ready, and aligned with real-world goals.
          </p>
        </div>

        {/* ===== Container Card ===== */}
        <div
          className="
          rounded-3xl
          bg-white/80 backdrop-blur-xl
          border border-gray-200
          shadow-xl
          p-12
        "
        >
          {/* ===== Pillars Grid ===== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {pillars.map((pillar, index) => (
              <Pillar
                key={index}
                title={pillar.title}
                icon={pillar.icon}
                points={pillar.points}
                bordered={index !== 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== PILLAR ===================== */
function Pillar({
  title,
  points,
  icon: Icon,
  bordered,
}: {
  title: string;
  points: string[];
  icon: React.ElementType;
  bordered?: boolean;
}) {
  return (
    <div
      className={`
        relative transition-all duration-300 hover:-translate-y-2
        ${bordered ? "md:border-l md:border-gray-200 md:pl-10" : ""}
      `}
    >
      {/* ICON */}
      <div className="mb-6 w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center">
        <Icon className="w-7 h-7 text-blue-600" />
      </div>

      {/* TITLE */}
      <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>

      {/* POINTS */}
      <ul className="space-y-4 text-sm text-gray-600">
        {points.map((point, index) => (
          <li key={index} className="flex gap-3 items-start">
            <span className="text-blue-600 font-semibold">{index + 1}.</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
