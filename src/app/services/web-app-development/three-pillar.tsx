"use client";

import React from "react";
import {
  Rocket,
  Briefcase,
  ShieldCheck,
} from "lucide-react";

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

/* ===================== COMPONENT ===================== */
export default function ThreePillarsOfExcellence() {
  return (
    <section className="relative bg-black py-36 overflow-hidden">
      {/* ===== SOFT BACKGROUND GLOW ===== */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(45,212,191,0.14),transparent_50%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.10),transparent_55%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* ===== CARD ===== */}
        <div className="relative rounded-2xl border border-slate-800 bg-gradient-to-br from-[#0B0F1A] via-[#020617] to-black px-14 py-20">

          {/* INNER GLOW */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.08),transparent_40%)]" />

       {/* ===== HEADER ===== */}
<div className="relative flex flex-col items-center text-center gap-6 mb-14">

  {/* TOP */}
  <span className="inline-block text-xs tracking-[0.35em] uppercase text-teal-400">
    Softree Web Development Framework
  </span>

  <h2 className="text-4xl sm:text-5xl font-light text-white leading-[1.05]">
    Our Web Development
    <br />
    <span className="font-normal">Delivery Pillars</span>
  </h2>

  {/* BOTTOM */}
  <p className="max-w-2xl text-base text-slate-400 leading-relaxed">
    At Softree, web development is about building secure, scalable,
    and business-driven digital experiences. Our delivery pillars
    ensure every web solution is reliable, future-ready, and aligned
    with real-world business goals.
  </p>

  {/* OPTIONAL ACCENT */}
  <div className="mt-2 h-px w-24 bg-gradient-to-r from-transparent via-teal-400 to-transparent" />
</div>

          {/* ===== PILLARS ===== */}
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
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-400/10">
          <Icon className="h-5 w-5 text-teal-400" />
        </div>

        <h3 className="text-base font-medium text-white">
          {title}
        </h3>
      </div>

      {/* POINTS */}
      <ul className="space-y-6 text-sm text-slate-400">
        {points.map((point, index) => (
          <li key={index} className="flex gap-4">
            <span className="text-teal-400 font-semibold">
              {index + 1}.
            </span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
