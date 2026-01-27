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
    <section
      className="
        relative w-full overflow-hidden
        bg-gradient-to-b from-black via-[#020d1a] to-black
        py-28
      "
    >
      {/* RIGHT EDGE FADE */}
      <div
        className="
          absolute inset-y-0 right-0 w-40
          bg-gradient-to-l from-black to-transparent
          pointer-events-none
        "
      />

      {/* CONTENT WRAPPER */}
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 md:px-14 lg:px-20">
        {/* GLASS CARD */}
        <div
          className="
            relative rounded-3xl
            bg-gradient-to-br from-white/[0.12] via-[#1f1f1f]/85 to-black
            backdrop-blur-2xl
            border border-white/10
            shadow-[0_30px_120px_rgba(0,0,0,0.75)]
            px-14 py-20
          "
        >
          {/* INNER GLASS STROKE */}
          <div
            className="
              absolute inset-0 rounded-3xl pointer-events-none
              shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]
            "
          />

          {/* ===== HEADER ===== */}
          <div className="relative flex flex-col items-center text-center gap-6 mb-16">
            <span className="text-xs tracking-[0.35em] uppercase text-teal-400">
              Softree Web Development Framework
            </span>

            <h2 className="text-4xl sm:text-5xl font-light text-white leading-[1.05]">
              Our Web Development
              <br />
              <span className="font-normal">Delivery Pillars</span>
            </h2>

            <p className="max-w-2xl text-base text-slate-400 leading-relaxed">
              At Softree, web development is about building secure, scalable,
              and business-driven digital experiences. Our delivery pillars
              ensure every web solution is reliable, future-ready, and aligned
              with real-world business goals.
            </p>

            <div className="mt-2 h-px w-24 bg-[#141414]" />
          </div>

          {/* ===== PILLARS GRID ===== */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-14">
            {pillars.map((pillar, index) => (
              <Pillar
                key={index}
                title={pillar.title}
                points={pillar.points}
                icon={pillar.icon}
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
      className={`relative px-4 md:px-6 transition-all duration-300 hover:-translate-y-1 ${
        bordered ? "md:border-l md:border-slate-800/60 md:pl-10" : ""
      }`}
    >
      {/* ICON + TITLE */}
      <div className="flex items-center gap-4 mb-8">
        <div
          className="
            flex h-14 w-14 items-center justify-center rounded-lg
            bg-white/10 border border-white/10 backdrop-blur-md
          "
        >
          <Icon className="h-8 w-8 text-teal-100" />
        </div>

        <h3 className="text-base font-medium text-white">{title}</h3>
      </div>

      {/* POINTS */}
      <ul className="space-y-6 text-sm text-slate-200">
        {points.map((point, index) => (
          <li key={index} className="flex gap-4">
            <span className="text-teal-300 font-semibold">{index + 1}.</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
