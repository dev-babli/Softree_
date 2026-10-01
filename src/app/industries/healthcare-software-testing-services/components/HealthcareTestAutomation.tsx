"use client";

import React, { useState } from "react";
import SqueezeCarousel, { SqueezeSlide } from "@/components/ui/carousel-squeeze";
import {
  Compass,
  FileSpreadsheet,
  Cpu,
  ShieldCheck,
  BarChart3,
  TrendingUp,
} from "lucide-react";

const PROCESS_STEPS = [
  {
    step: "01",
    name: "System Discovery",
    icon: Compass,
    description:
      "Understand the application, workflows, users, integrations, and AI functionality.",
  },
  {
    step: "02",
    name: "QA & Test Planning",
    icon: FileSpreadsheet,
    description:
      "Define testing scope, scenarios, environments, test data, and coverage.",
  },
  {
    step: "03",
    name: "Test Automation",
    icon: Cpu,
    description:
      "Automate repeatable UI, API, functional, and regression scenarios.",
  },
  {
    step: "04",
    name: "Quality Validation",
    icon: ShieldCheck,
    description:
      "Test application functionality, integrations, performance, security, and AI behavior.",
  },
  {
    step: "05",
    name: "Defect Analytics",
    icon: BarChart3,
    description:
      "Identify defects, unexpected behavior, AI inconsistencies, and quality gaps.",
  },
  {
    step: "06",
    name: "Continuous Improvement",
    icon: TrendingUp,
    description:
      "Use test results to strengthen application quality and future releases.",
  },
];

const automationSlides: SqueezeSlide[] = [
  {
    id: "discover",
    category: "STAGE 01 — SYSTEM DISCOVERY",
    title: "System Discovery",
    shortTitle: "System Discovery",
    description:
      "Understand the application, workflows, users, integrations, and AI functionality.",
    image: "/images/ai-healthcare-images/health-1.webp",
    imageAlt: "Discover Healthcare Application Workflows",
    bullets: [
      "Clinical workflow & persona mapping",
      "System architecture & API discovery",
      "AI model & user expectation analysis",
    ],
    action: "Contact Us",
    href: "/contact",
  },
  {
    id: "plan",
    category: "STAGE 02 — QA & TEST PLANNING",
    title: "QA & Test Planning",
    shortTitle: "QA & Test Planning",
    description:
      "Define testing scope, scenarios, environments, test data, and coverage.",
    image: "/images/ai-healthcare-images/health-2.webp",
    imageAlt: "Plan Healthcare QA Strategy",
    bullets: [
      "Test scope & clinical acceptance criteria",
      "Synthetic HIPAA-compliant test data",
      "Coverage matrix & environment mapping",
    ],
    action: "Contact Us",
    href: "/contact",
  },
  {
    id: "automate",
    category: "STAGE 03 — TEST AUTOMATION",
    title: "Test Automation",
    shortTitle: "Test Automation",
    description:
      "Automate repeatable UI, API, functional, and regression scenarios.",
    image: "/images/ai-healthcare-images/health-3.webp",
    imageAlt: "Automate Healthcare Testing",
    bullets: [
      "End-to-end clinical workflow automation",
      "HL7 / FHIR / REST API test suites",
      "Continuous automated regression tests",
    ],
    action: "Contact Us",
    href: "/contact",
  },
  {
    id: "validate",
    category: "STAGE 04 — QUALITY VALIDATION",
    title: "Quality Validation",
    shortTitle: "Quality Validation",
    description:
      "Test application functionality, integrations, performance, security, and AI behavior.",
    image: "/images/ai-healthcare-images/health-4.webp",
    imageAlt: "Validate Healthcare Applications",
    bullets: [
      "Functional, performance & peak load checks",
      "Access control, privacy & security tests",
      "AI prompt, output & hallucination audits",
    ],
    action: "Contact Us",
    href: "/contact",
  },
  {
    id: "analyze",
    category: "STAGE 05 — DEFECT ANALYTICS",
    title: "Defect Analytics",
    shortTitle: "Defect Analytics",
    description:
      "Identify defects, unexpected behavior, AI inconsistencies, and quality gaps.",
    image: "/images/ai-healthcare-images/health-5.webp",
    imageAlt: "Analyze Test Results and Quality Metrics",
    bullets: [
      "Defect root-cause & severity analysis",
      "AI consistency & drift tracking",
      "Automated quality & coverage reporting",
    ],
    action: "Contact Us",
    href: "/contact",
  },
  {
    id: "improve",
    category: "STAGE 06 — CONTINUOUS IMPROVEMENT",
    title: "Continuous Improvement",
    shortTitle: "Continuous Improvement",
    description:
      "Use test results to strengthen application quality and future releases.",
    image: "/images/ai-healthcare-images/health-6.webp",
    imageAlt: "Improve Application Quality",
    bullets: [
      "Continuous CI/CD feedback loop",
      "Suite refinement & flaky test reduction",
      "Confidence-backed release sign-offs",
    ],
    action: "Contact Us",
    href: "/contact",
  },
];

export default function HealthcareTestAutomation() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="w-full bg-white pt-8 md:pt-14 pb-8 md:pb-14 overflow-hidden">
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-[2cm]">
        {/* Header */}
        <div className="flex flex-col items-center w-full mb-8 md:mb-12 text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-orange-200 bg-orange-50 typo-caption text-[#FF6B00] uppercase mb-4 text-xs font-semibold">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse" />
            OUR APPROACH
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-[1.2] mb-3 text-center max-w-3xl">
            We Turn Healthcare Testing Into a{" "}
            <span className="text-[#FF6B2C]">Continuous Quality Process</span>
          </h2>

          {/* Subheading */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-3xl mx-auto text-center">
            Softree combines manual testing, automation, API validation, AI
            testing, and continuous regression testing to create a structured
            approach to application quality.
          </p>
        </div>

       

        {/* Squeeze Carousel - 6 Stage Deep Dive */}
        <div className="w-full">
          <SqueezeCarousel
            slides={automationSlides}
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
            label="Healthcare Continuous Quality Process"
          />
        </div>
      </div>
    </section>
  );
}
