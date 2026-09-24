"use client";

import React from "react";
import SqueezeCarousel, { SqueezeSlide } from "@/components/ui/carousel-squeeze";

const automationSlides: SqueezeSlide[] = [
  {
    id: "test-generation",
    category: "01 — TEST GENERATION",
    title: "Automated Test Generation",
    description: "Create reusable test scenarios for healthcare workflows and application requirements.",
    image: "/images/ai-healthcare-images/health-1.png",
    imageAlt: "Automated Test Generation",
    action: "EXPLORE HEALTHCARE TEST AUTOMATION →",
    href: "/contact"
  },
  {
    id: "functional-testing",
    category: "02 — FUNCTIONAL TESTING",
    title: "Functional Test Automation",
    description: "Automate healthcare workflows and critical application functionality.",
    image: "/images/ai-healthcare-images/health-2.png",
    imageAlt: "Functional Test Automation",
    action: "EXPLORE HEALTHCARE TEST AUTOMATION →",
    href: "/contact"
  },
  {
    id: "api-automation",
    category: "03 — API AUTOMATION",
    title: "API Test Automation",
    description: "Validate healthcare APIs, integrations, data exchange, and system connectivity.",
    image: "/images/ai-healthcare-images/health-3.png",
    imageAlt: "API Test Automation",
    action: "EXPLORE HEALTHCARE TEST AUTOMATION →",
    href: "/contact"
  },
  {
    id: "ui-automation",
    category: "04 — UI AUTOMATION",
    title: "UI Test Automation",
    description: "Automate patient portals, healthcare applications, and end-to-end user workflows.",
    image: "/images/ai-healthcare-images/health-4.png",
    imageAlt: "UI Test Automation",
    action: "EXPLORE HEALTHCARE TEST AUTOMATION →",
    href: "/contact"
  },
  {
    id: "regression-testing",
    category: "05 — REGRESSION TESTING",
    title: "Regression Automation",
    description: "Continuously validate existing functionality after application updates and releases.",
    image: "/images/ai-healthcare-images/health-5.png",
    imageAlt: "Regression Automation",
    action: "EXPLORE HEALTHCARE TEST AUTOMATION →",
    href: "/contact"
  },
  {
    id: "cicd-integration",
    category: "06 — CI/CD INTEGRATION",
    title: "Continuous Healthcare Testing",
    description: "Integrate automated tests into CI/CD pipelines for faster and safer releases.",
    image: "/images/ai-healthcare-images/health-6.png",
    imageAlt: "Continuous Healthcare Testing",
    action: "EXPLORE HEALTHCARE TEST AUTOMATION →",
    href: "/contact"
  },
  {
    id: "test-reporting",
    category: "07 — TEST REPORTING",
    title: "Automated Test Reporting",
    description: "Track test results, coverage, failures, and quality metrics with automated reporting.",
    image: "/images/ai-healthcare-images/health-7.png",
    imageAlt: "Automated Test Reporting",
    action: "EXPLORE HEALTHCARE TEST AUTOMATION →",
    href: "/contact"
  }
];

export default function HealthcareTestAutomation() {
  return (
    <section className="w-full bg-white pt-10 md:pt-16 pb-6 md:pb-10 overflow-hidden">
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-[2cm]">
        {/* Header */}
        <div className="flex flex-col items-center w-full mb-10 md:mb-14 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-orange-200 bg-orange-50 typo-caption text-[#FF6B00] uppercase mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
            HEALTHCARE TEST AUTOMATION
          </div>
          
          <h2 className="typo-heading-2 text-slate-900 mb-6 max-w-none whitespace-normal">
            From Manual Testing to <br className="hidden md:block" />
            <span className="text-[#FF6B2C]">Automated Healthcare Quality</span>
          </h2>
          
          <div className="flex flex-col items-center space-y-4 max-w-3xl mx-auto">
            <p className="typo-description text-slate-600 pt-2">
              Automate healthcare application testing across critical workflows, APIs, user interfaces, and integrations to improve coverage, speed, and reliability.
            </p>
          </div>
        </div>

        {/* Squeeze Carousel - 7 Slides */}
        <div className="w-full">
          <SqueezeCarousel
            slides={automationSlides}
            height="clamp(480px, 44vw, 560px)"
            radius={20}
            duration={700}
            accent="#FF6B2C"
            accentForeground="#FFFFFF"
            autoplay={true}
            interval={6000}
            hoverGrow={true}
            controls={true}
            label="Healthcare Test Automation Capabilities"
          />
        </div>
      </div>
    </section>
  );
}
