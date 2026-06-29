"use client";

import React from "react";
import { Rocket, Briefcase, ShieldCheck } from "lucide-react";
import SectionHeader from "@/components/homepage-light/SectionHeader";

const ACCENT = "#FF5812" as const;

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
      data-section="web-dev-pillars"
      className="relative overflow-hidden py-16 md:py-20"
    >
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <SectionHeader
            badge="Delivery pillars"
            accent={ACCENT}
            headline="Our web development delivery pillars"
            body="We build secure, scalable, and business-driven digital solutions. These pillars ensure every web application is reliable, future-ready, and aligned with real-world goals."
            className="mx-auto items-center [&_p]:mx-auto"
          />
        </div>

        <div className="rounded-3xl border border-[#0a0a1a]/[0.06] bg-white p-8 shadow-[0_24px_60px_-40px_rgba(10,10,26,0.12)] md:p-12">
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
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  bordered?: boolean;
}) {
  return (
    <div
      className={`
        relative transition-all duration-300 hover:-translate-y-2
        ${bordered ? "md:border-l md:border-[#0a0a1a]/10 md:pl-10" : ""}
      `}
    >
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#FF5812]/10">
        <Icon className="h-7 w-7 text-[#FF5812]" />
      </div>

      <h3 className="mb-6 text-lg font-semibold text-[#0a0a1a]">{title}</h3>

      <ul className="space-y-4 text-sm text-[#0a0a1a]/65">
        {points.map((point, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="font-semibold text-[#FF5812]">{index + 1}.</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
