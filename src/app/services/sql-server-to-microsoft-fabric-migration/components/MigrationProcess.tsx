"use client";

import React, { useState } from "react";
import SqueezeCarousel, { SqueezeSlide } from "@/components/ui/carousel-squeeze";

const migrationSlides: SqueezeSlide[] = [
  {
    id: "discovery",
    category: "STAGE 01 — CURRENT-STATE DISCOVERY",
    title: "SQL Server Discovery",
    shortTitle: "SQL Server Discovery",
    description: "Understand your existing SQL Server environment, databases, workloads, integrations, dependencies, and business requirements.",
    image: "/images/ai-development-services/core-capabilities/ai-strategy.webp",
    imageAlt: "SQL Server Discovery",
    bulletTitle: "Integration Scope",
    bullets: [
      "Database & workload discovery",
      "Application & system dependencies",
      "Data and integration assessment"
    ],
    action: "Contact Us",
    href: "/contact",
  },
  {
    id: "assessment",
    category: "STAGE 02 — MIGRATION ASSESSMENT",
    title: "Migration Assessment",
    shortTitle: "Migration Assessment",
    description: "Evaluate workload complexity, migration readiness, compatibility considerations, risks, and modernization opportunities.",
    image: "/images/ai-development-services/core-capabilities/enterprise-ai-architecture.webp",
    imageAlt: "Migration Assessment",
    bulletTitle: "Assessment Scope",
    bullets: [
      "Workload compatibility",
      "Migration complexity & risks",
      "Modernization opportunities"
    ],
    action: "Contact Us",
    href: "/contact",
  },
  {
    id: "architecture",
    category: "STAGE 03 — FABRIC ARCHITECTURE",
    title: "Target Fabric Architecture",
    shortTitle: "Target Fabric Architecture",
    description: "Define the target Microsoft Fabric architecture based on your SQL Server workloads, data requirements, analytics goals, and business priorities.",
    image: "/images/ai-development-services/core-capabilities/intelligent-automation.webp",
    imageAlt: "Target Fabric Architecture",
    bulletTitle: "Architecture Scope",
    bullets: [
      "Fabric workload mapping",
      "Data architecture design",
      "Security & governance planning"
    ],
    action: "Contact Us",
    href: "/contact",
  },
  {
    id: "planning",
    category: "STAGE 04 — MIGRATION PLANNING",
    title: "Migration Roadmap",
    shortTitle: "Migration Roadmap",
    description: "Prioritize workloads and organize the migration into controlled phases designed to reduce disruption and manage migration risks.",
    image: "/images/ai-development-services/core-capabilities/secure-ai-governance.webp",
    imageAlt: "Migration Roadmap",
    bulletTitle: "Planning Scope",
    bullets: [
      "Workload prioritization",
      "Migration waves & sequencing",
      "Cutover planning"
    ],
    action: "Contact Us",
    href: "/contact",
  },
  {
    id: "migration",
    category: "STAGE 05 — MIGRATION & VALIDATION",
    title: "Controlled Migration",
    shortTitle: "Controlled Migration",
    description: "Migrate prioritized SQL Server workloads to Microsoft Fabric and validate data, functionality, integrations, and analytical results throughout the process.",
    image: "/images/ai-development-services/core-capabilities/microsoft-ai-ecosystem.webp",
    imageAlt: "Controlled Migration",
    bulletTitle: "Migration Scope",
    bullets: [
      "Data & workload migration",
      "Data accuracy & completeness",
      "Functional & integration validation"
    ],
    action: "Contact Us",
    href: "/contact",
  },
  {
    id: "optimization",
    category: "STAGE 06 — OPTIMIZATION",
    title: "Fabric Optimization",
    shortTitle: "Fabric Optimization",
    description: "Optimize the migrated environment for performance, scalability, governance, and ongoing business and analytics requirements.",
    image: "/images/ai-development-services/core-capabilities/continuous-optimization.webp",
    imageAlt: "Fabric Optimization",
    bulletTitle: "Optimization Scope",
    bullets: [
      "Performance optimization",
      "Workload tuning",
      "Ongoing governance & improvement"
    ],
    action: "Contact Us",
    href: "/contact",
  },
];

export default function MigrationProcess() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="w-full bg-white pt-8 md:pt-14 pb-8 md:pb-14 overflow-hidden">
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-[2cm]">
        {/* Header */}
        <div className="flex flex-col items-center w-full mb-8 md:mb-12 text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-orange-200 bg-orange-50 typo-caption text-[#FF6B00] uppercase mb-4 text-xs font-semibold">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse" />
            MIGRATION STRATEGY & ROADMAP
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-[1.2] mb-3 text-center max-w-3xl">
            A Structured Path from SQL Server{" "}
            <span className="text-[#FF6B2C]">to Microsoft Fabric</span>
          </h2>

          {/* Subheading */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-3xl mx-auto text-center">
            Softree follows a structured migration approach to assess SQL Server workloads, define the right Fabric architecture, migrate in controlled phases, and validate the environment for production.
          </p>
        </div>

        {/* Squeeze Carousel - 6 Stage Deep Dive */}
        <div className="w-full">
          <SqueezeCarousel
            slides={migrationSlides}
            defaultIndex={activeStep}
            onIndexChange={(newIdx) => setActiveStep(newIdx)}
            openOnHover={true}
            height="clamp(460px, 42vw, 540px)"
            radius={20}
            duration={700}
            accent="#FF6B2C"
            accentForeground="#FFFFFF"
            autoplay={true}
            interval={6500}
            hoverGrow={true}
            controls={true}
            label="Migration Process"
          />
        </div>
      </div>
    </section>
  );
}
