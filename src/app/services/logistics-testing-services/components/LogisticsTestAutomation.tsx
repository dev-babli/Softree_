"use client";

import React from "react";
import SqueezeCarousel, { SqueezeSlide } from "@/components/ui/carousel-squeeze";

const LOGISTICS_IMG = [
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1494412574643-ff11af0c07c9?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80",
];

const automationSlides: SqueezeSlide[] = [
  {
    id: "test-generation",
    category: "01 — TEST GENERATION",
    title: "Automated Test Generation",
    description:
      "Create reusable test scenarios for TMS, WMS, and logistics workflows.",
    image: LOGISTICS_IMG[0],
    imageAlt: "Automated Test Generation",
    action: "EXPLORE LOGISTICS TEST AUTOMATION →",
    href: "/contact",
  },
  {
    id: "functional-testing",
    category: "02 — FUNCTIONAL TESTING",
    title: "Functional Test Automation",
    description:
      "Automate dispatch, warehouse, exception, and billing workflows.",
    image: LOGISTICS_IMG[1],
    imageAlt: "Functional Test Automation",
    action: "EXPLORE LOGISTICS TEST AUTOMATION →",
    href: "/contact",
  },
  {
    id: "api-automation",
    category: "03 — API AUTOMATION",
    title: "API Test Automation",
    description:
      "Validate carrier APIs, EDI payloads, ERP connectors, and system connectivity.",
    image: LOGISTICS_IMG[2],
    imageAlt: "API Test Automation",
    action: "EXPLORE LOGISTICS TEST AUTOMATION →",
    href: "/contact",
  },
  {
    id: "ui-automation",
    category: "04 — UI AUTOMATION",
    title: "UI Test Automation",
    description:
      "Automate customer portals, dispatcher consoles, and warehouse operator screens.",
    image: LOGISTICS_IMG[3],
    imageAlt: "UI Test Automation",
    action: "EXPLORE LOGISTICS TEST AUTOMATION →",
    href: "/contact",
  },
  {
    id: "regression-testing",
    category: "05 — REGRESSION TESTING",
    title: "Regression Automation",
    description:
      "Continuously validate existing TMS/WMS functionality after releases.",
    image: "/images/logistics-testing/automation-05.webp",
    imageAlt: "Regression Automation",
    action: "EXPLORE LOGISTICS TEST AUTOMATION →",
    href: "/contact",
  },
  {
    id: "cicd-integration",
    category: "06 — CI/CD INTEGRATION",
    title: "Continuous Logistics Testing",
    description:
      "Integrate automated tests into CI/CD pipelines for safer logistics releases.",
    image: "/images/logistics-testing/automation-06.webp?v=4",
    imageAlt: "Continuous Logistics Testing",
    action: "EXPLORE LOGISTICS TEST AUTOMATION →",
    href: "/contact",
  },
  {
    id: "test-reporting",
    category: "07 — TEST REPORTING",
    title: "Automated Test Reporting",
    description:
      "Track coverage, failures, and quality metrics across logistics platforms.",
    image: LOGISTICS_IMG[6],
    imageAlt: "Automated Test Reporting",
    action: "EXPLORE LOGISTICS TEST AUTOMATION →",
    href: "/contact",
  },
];

export default function LogisticsTestAutomation() {
  return (
    <section className="w-full bg-white py-16 lg:py-24 overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center w-full mb-10 md:mb-14 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-orange-200 bg-orange-50 typo-caption text-[#FF6B00] uppercase mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
            LOGISTICS TEST AUTOMATION
          </div>
          <h2 className="typo-heading-2 text-slate-900 mb-6 max-w-none whitespace-normal">
            From Manual Testing to <br className="hidden md:block" />
            <span className="text-[#FF6B2C]">Automated Logistics Quality</span>
          </h2>
          <div className="flex flex-col items-center space-y-4 max-w-3xl mx-auto">
            <p className="typo-description text-slate-600 pt-2">
              Automate logistics application testing across TMS, WMS, APIs,
              portals, and integrations to improve coverage, speed, and
              reliability.
            </p>
          </div>
        </div>
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
            label="Logistics Test Automation Capabilities"
          />
        </div>
      </div>
    </section>
  );
}
