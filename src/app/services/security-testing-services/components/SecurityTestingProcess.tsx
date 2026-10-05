"use client";

import React, { useState } from "react";
import SqueezeCarousel, { SqueezeSlide } from "@/components/ui/carousel-squeeze";
import AnimatedGradient from "@/components/ui/animated-gradient";
import { typography } from "@/lib/typography";
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
    category: "STAGE 01 — SECURITY DISCOVERY",
    title: "Security Discovery",
    shortTitle: "Security Discovery",
    description:
      "Understand your application architecture, technology stack, integrations, data flows, and security requirements.",
    background: <AnimatedGradient config={{ preset: "Prism", color1: "#050505", color2: "#FF6B2C", color3: "#FF9F21" }} />,
    bullets: [
      "Architecture & Data Flow Analysis",
      "Technology Stack Assessment",
      "Security Requirements Mapping",
    ],
    action: "Contact Us",
    href: "/contact",
  },
  {
    id: "plan",
    category: "STAGE 02 — SECURITY STRATEGY & PLANNING",
    title: "Security Strategy & Planning",
    shortTitle: "Strategy & Planning",
    description:
      "Define testing scope, security objectives, risk areas, testing priorities, and validation requirements.",
    background: <AnimatedGradient config={{ preset: "Lava", color1: "#FF9F21", color2: "#FF6B2C", color3: "#000000" }} />,
    bullets: [
      "Define Testing Scope",
      "Identify Risk Areas",
      "Establish Security Objectives",
    ],
    action: "Contact Us",
    href: "/contact",
  },
  {
    id: "framework",
    category: "STAGE 03 — SECURITY TEST FRAMEWORK",
    title: "Security Test Framework",
    shortTitle: "Test Framework",
    description:
      "Build structured security testing frameworks and reusable test cases aligned with your application and technology environment.",
    background: <AnimatedGradient config={{ preset: "Plasma", color1: "#FF6B2C", color2: "#000000", color3: "#000000" }} />,
    bullets: [
      "Structured Security Testing",
      "Reusable Test Cases",
      "Environment Alignment",
    ],
    action: "Contact Us",
    href: "/contact",
  },
  {
    id: "validate",
    category: "STAGE 04 — SECURITY VALIDATION",
    title: "Security Validation",
    shortTitle: "Security Validation",
    description:
      "Execute security tests across applications, APIs, mobile platforms, integrations, and critical workflows.",
    background: <AnimatedGradient config={{ preset: "Pulse", color1: "#FF9F21", color2: "#000000", color3: "#000000" }} />,
    bullets: [
      "Application Security Testing",
      "API & Mobile Testing",
      "Critical Workflow Validation",
    ],
    action: "Contact Us",
    href: "/contact",
  },
  {
    id: "analyze",
    category: "STAGE 05 — VULNERABILITY ANALYSIS",
    title: "Vulnerability Analysis & Security Optimization",
    shortTitle: "Vulnerability Analysis",
    description:
      "Analyze security test results, vulnerabilities, application behavior, and coverage to identify security risks and continuously improve your testing strategy.",
    background: <AnimatedGradient config={{ preset: "Vortex", color1: "#000000", color2: "#FF6B2C", color3: "#000000" }} />,
    bullets: [
      "Automated Security Testing",
      "Vulnerability Analysis",
      "Security Regression Testing",
      "Security Test Coverage",
    ],
    action: "Contact Us",
    href: "/contact",
  },
  {
    id: "improve",
    category: "STAGE 06 — CONTINUOUS SECURITY IMPROVEMENT",
    title: "Continuous Security Improvement",
    shortTitle: "Continuous Improvement",
    description:
      "Integrate security testing into ongoing development and CI/CD processes to support continuous security validation.",
    background: <AnimatedGradient config={{ preset: "Mist", color1: "#050505", color2: "#FF6B2C", color3: "#050505" }} />,
    bullets: [
      "CI/CD Security Integration",
      "Continuous Validation",
      "DevSecOps Implementation",
    ],
    action: "Contact Us",
    href: "/contact",
  },
];

export default function SecurityTestingProcess() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="w-full bg-white pt-8 md:pt-14 pb-8 md:pb-14 overflow-hidden">
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-[2cm]">
        {/* Header */}
        <div className="flex flex-col items-center w-full mb-8 md:mb-12 text-center">
          {/* Eyebrow */}
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-orange-200 bg-orange-50 ${typography.caption.default} text-[#FF6B00] uppercase mb-4 text-xs font-semibold`}>
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse" />
            OUR APPROACH
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-[1.2] mb-3 text-center max-w-3xl">
            We Turn Security Testing Into a{" "}
            <span className="text-[#FF6B2C]">Continuous Quality & Security Process</span>
          </h2>

          {/* Subheading */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-3xl mx-auto text-center">
            Softree combines security testing, vulnerability assessment, application testing, DevSecOps integration, regression testing, and continuous improvement to create a scalable approach to software security.
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
