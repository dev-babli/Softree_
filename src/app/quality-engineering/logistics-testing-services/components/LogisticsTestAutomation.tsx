"use client";

import React from "react";
import SqueezeCarousel, { SqueezeSlide } from "@/components/ui/carousel-squeeze";

const LOGISTICS_IMG = [
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1580674292601-523e16ce6f9a?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1508614589041-8f5b5b03dfdf?auto=format&fit=crop&w=1200&q=80",
];

const automationSlides: SqueezeSlide[] = [
  {
    id: "discovery",
    category: "01 — LOGISTICS REQUIREMENTS & DISCOVERY",
    title: "Logistics Requirements & Discovery",
    shortTitle: "Requirements & Discovery",
    description:
      "Understand transportation, warehouse, shipment, inventory, integration, and business workflows to identify critical testing requirements.",
    image: LOGISTICS_IMG[0],
    imageAlt: "Logistics Requirements & Discovery",
    bullets: [
      "TMS & WMS workflows",
      "Shipment and inventory processes",
      "Business rules and exceptions",
      "APIs, EDI, and integration points",
    ],
    action: "EXPLORE LOGISTICS TESTING SERVICES →",
    href: "/contact",
  },
  {
    id: "test-strategy",
    category: "02 — LOGISTICS TEST STRATEGY",
    title: "Logistics Test Strategy & Planning",
    shortTitle: "Test Strategy",
    description:
      "Define a risk-based testing strategy covering functional, integration, automation, performance, security, and regression requirements.",
    image: LOGISTICS_IMG[1],
    imageAlt: "Logistics Test Strategy & Planning",
    bullets: [
      "Test planning and coverage",
      "Risk and priority analysis",
      "Test environments and data",
      "Functional and non-functional testing",
    ],
    action: "EXPLORE LOGISTICS TESTING SERVICES →",
    href: "/contact",
  },
  {
    id: "functional-integration",
    category: "03 — FUNCTIONAL & INTEGRATION TESTING",
    title: "Functional & Integration Validation",
    shortTitle: "Functional & Integration",
    description:
      "Validate logistics workflows across TMS, WMS, carrier systems, ERP platforms, APIs, EDI transactions, and connected applications.",
    image: LOGISTICS_IMG[2],
    imageAlt: "Functional & Integration Validation",
    bullets: [
      "TMS & WMS functional testing",
      "API and EDI validation",
      "System integration testing",
      "End-to-end logistics workflows",
    ],
    action: "EXPLORE LOGISTICS TESTING SERVICES →",
    href: "/contact",
  },
  {
    id: "test-automation",
    category: "04 — LOGISTICS TEST AUTOMATION",
    title: "Logistics Test Automation",
    shortTitle: "Test Automation",
    description:
      "Automate critical logistics workflows to improve regression coverage, accelerate releases, and continuously validate application functionality.",
    image: LOGISTICS_IMG[3],
    imageAlt: "Logistics Test Automation",
    bullets: [
      "Functional test automation",
      "API test automation",
      "UI test automation",
      "Automated regression testing",
    ],
    action: "EXPLORE LOGISTICS TESTING SERVICES →",
    href: "/contact",
  },
  {
    id: "data-validation",
    category: "05 — LOGISTICS DATA & REPORTING VALIDATION",
    title: "Logistics Data & Reporting Validation",
    shortTitle: "Data & Reporting",
    description:
      "Validate supply chain analytics, shipment tracking data, and inventory reporting for accuracy across all logistics platforms.",
    image: LOGISTICS_IMG[4],
    imageAlt: "Logistics Data & Reporting Validation",
    bullets: [
      "Inventory data accuracy",
      "Shipment tracking validation",
      "Logistics analytics testing",
      "Reporting dashboard validation",
    ],
    action: "EXPLORE LOGISTICS TESTING SERVICES →",
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
            OUR APPROACH
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 max-w-4xl mx-auto leading-tight">
            We Turn Logistics Testing Into a <br className="hidden md:block" />
            <span className="text-[#FF6B2C]">Continuous Quality Engineering Process</span>
          </h2>
          <div className="flex flex-col items-center space-y-4 max-w-3xl mx-auto">
            <p className="text-lg md:text-[1.1rem] leading-relaxed text-slate-500 pt-2">
              Softree combines functional testing, test automation,
              integration validation, security, performance testing,
              and continuous quality engineering to improve the
              reliability of logistics applications across their lifecycle.
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
