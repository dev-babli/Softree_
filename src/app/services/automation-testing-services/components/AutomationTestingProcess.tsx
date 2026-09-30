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
    category: "STAGE 01 — AUTOMATION DISCOVERY",
    title: "Automation Discovery",
    shortTitle: "Automation Discovery",
    description:
      "Analyze your application, existing test processes, technology stack, and automation opportunities to define a practical test automation strategy.",
    image: "/images/ai-development-services/core-capabilities/ai-strategy.png",
    imageAlt: "Automation Discovery",
    bullets: [
      "Application & workflow analysis",
      "Automation feasibility assessment",
      "Existing test suite evaluation",
    ],
    action: "Contact Us",
    href: "/contact",
  },
  {
    id: "plan",
    category: "STAGE 02 — TEST STRATEGY & PLANNING",
    title: "Test Strategy & Planning",
    shortTitle: "Test Strategy & Planning",
    description:
      "Define automation scope, testing priorities, frameworks, environments, data requirements, and execution strategies aligned with your software delivery goals.",
    image: "/images/ai-development-services/core-capabilities/enterprise-ai-architecture.png",
    imageAlt: "Test Strategy & Planning",
    bullets: [
      "Test automation roadmap",
      "Framework & tool selection",
      "Test environment planning",
    ],
    action: "Contact Us",
    href: "/contact",
  },
  {
    id: "automate",
    category: "STAGE 03 — AUTOMATION FRAMEWORK",
    title: "Automation Framework Development",
    shortTitle: "Automation Framework",
    description:
      "Design and build scalable, reusable automation frameworks for web, mobile, API, regression, and end-to-end testing.",
    image: "/images/ai-development-services/core-capabilities/intelligent-automation.png",
    imageAlt: "Automation Framework Development",
    bullets: [
      "Web & UI automation",
      "Mobile test automation",
      "API automation",
    ],
    action: "Contact Us",
    href: "/contact",
  },
  {
    id: "validate",
    category: "STAGE 04 — QUALITY VALIDATION",
    title: "Automated Quality Validation",
    shortTitle: "Quality Validation",
    description:
      "Execute automated functional, regression, API, integration, performance, and end-to-end tests to validate application quality across releases.",
    image: "/images/ai-development-services/core-capabilities/secure-ai-governance.png",
    imageAlt: "Automated Quality Validation",
    bullets: [
      "Functional & regression testing",
      "API & integration testing",
      "End-to-end validation",
    ],
    action: "Contact Us",
    href: "/contact",
  },
  {
    id: "analyze",
    category: "STAGE 05 — DEFECT ANALYTICS",
    title: "Defect Analysis & Test Optimization",
    shortTitle: "Defect Analytics",
    description:
      "Analyze automated test results, failures, defects, and coverage to identify quality risks and continuously optimize your automation suite.",
    image: "/images/ai-development-services/core-capabilities/microsoft-ai-ecosystem.png",
    imageAlt: "Defect Analysis & Test Optimization",
    bullets: [
      "Automated test reporting",
      "Failure & defect analysis",
      "Test coverage optimization",
    ],
    action: "Contact Us",
    href: "/contact",
  },
  {
    id: "improve",
    category: "STAGE 06 — CONTINUOUS IMPROVEMENT",
    title: "Continuous Test Automation",
    shortTitle: "Continuous Improvement",
    description:
      "Integrate automation into CI/CD workflows and continuously maintain, optimize, and expand test coverage as your application evolves.",
    image: "/images/ai-development-services/core-capabilities/continuous-optimization.png",
    imageAlt: "Continuous Test Automation",
    bullets: [
      "CI/CD test integration",
      "Continuous regression testing",
      "Automation maintenance",
    ],
    action: "Contact Us",
    href: "/contact",
  },
];

export default function AutomationTestingProcess() {
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
            We Turn Test Automation Into a{" "}
            <span className="text-[#FF6B2C]">Continuous Quality Engineering Process</span>
          </h2>

          {/* Subheading */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-3xl mx-auto text-center">
            Softree combines test automation, quality engineering, CI/CD integration, regression testing, and continuous improvement to create a scalable approach to software quality.
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
            label="Automation Testing Process"
          />
        </div>
      </div>
    </section>
  );
}
