"use client";

import { useState } from "react";
import SqueezeCarousel, { type SqueezeSlide } from "@/components/ui/carousel-squeeze";
import {
  Compass,
  FileSpreadsheet,
  Cpu,
  ShieldCheck,
  BarChart3,
  TrendingUp,
} from "lucide-react";
import { typography } from "@/lib/typography";

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
      "Maintain, optimize, and expand automated testing across releases.",
  },
];

const automationSlides: SqueezeSlide[] = [
  {
    id: "discovery",
    category: "STAGE 01 — SYSTEM DISCOVERY",
    title: "Application & Quality Discovery",
    shortTitle: "System Discovery",
    description:
      "Analyze your application architecture, user journeys, workflows, integrations, existing testing assets, and quality goals to establish a clear automation baseline.",
    image: "/images/ai-development-services/core-capabilities/ai-strategy.webp",
    imageAlt: "System Discovery & QA Architecture Assessment",
    bullets: [
      "Application architecture analysis",
      "User journey & workflow mapping",
      "Automation feasibility assessment",
    ],
    action: "Contact Us",
    href: "/contact",
  },
  {
    id: "strategy",
    category: "STAGE 02 — QA & TEST PLANNING",
    title: "Automation Strategy & Planning",
    shortTitle: "QA & Test Planning",
    description:
      "Define your automation roadmap, selecting the right tools, frameworks, environments, test data management, and test coverage priorities for your team.",
    image: "/images/ai-development-services/core-capabilities/enterprise-ai-architecture.webp",
    imageAlt: "Automation Strategy & Test Planning",
    bullets: [
      "Framework & tool selection",
      "Test scope & coverage planning",
      "Test data & environment setup",
    ],
    action: "Contact Us",
    href: "/contact",
  },
  {
    id: "design",
    category: "STAGE 03 — TEST AUTOMATION",
    title: "Framework Setup & Test Automation",
    shortTitle: "Test Automation",
    description:
      "Design, build, and maintain scalable automated test suites across web, mobile, APIs, and microservices using modern testing frameworks.",
    image: "/images/ai-development-services/core-capabilities/intelligent-automation.webp",
    imageAlt: "Framework Setup & Test Automation",
    bullets: [
      "Custom test framework design",
      "UI & API script development",
      "Cross-browser & mobile coverage",
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
    image: "/images/ai-development-services/core-capabilities/secure-ai-governance.webp",
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
    image: "/images/ai-development-services/core-capabilities/microsoft-ai-ecosystem.webp",
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
    image: "/images/ai-development-services/core-capabilities/continuous-optimization.webp",
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
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-orange-200 bg-orange-50 ${typography.caption.default} text-[#FF6B00] uppercase mb-4`}>
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse" />
            OUR APPROACH
          </div>

          {/* Heading */}
          <h2 className={`${typography.heading.h2} text-slate-900 tracking-tight leading-[1.2] mb-3 text-center max-w-3xl`}>
            We Turn Test Automation Into a{" "}
            <span className="text-[#FF6B2C]">Continuous Quality Engineering Process</span>
          </h2>

          {/* Subheading */}
          <p className={`${typography.description.default} text-slate-600 leading-relaxed font-normal max-w-3xl mx-auto text-center`}>
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
