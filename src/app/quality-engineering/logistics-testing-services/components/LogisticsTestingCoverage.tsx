"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  BarChart3,
  Search,
  Workflow,
  Database,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import CoverageGlobe from "@/app/industries/healthcare-software-testing-services/components/CoverageGlobe";
import { FlowButton } from "@/components/ui/flow-button";

export default function LogisticsTestingCoverage() {
  const items = [
    {
      title: "01 — AI-Powered Test Generation",
      desc: "Use AI-assisted techniques to identify test scenarios and generate coverage for complex logistics workflows, business rules, integrations, and edge cases.",
      icon: Sparkles,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "02 — Intelligent Logistics Test Coverage",
      desc: "Analyze logistics workflows, shipment scenarios, inventory processes, and integration paths to identify coverage gaps across TMS, WMS, and connected systems.",
      icon: BarChart3,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "03 — Predictive Defect Detection",
      desc: "Use intelligent analysis to identify potential defects, recurring failure patterns, data issues, and high-risk areas before they impact logistics operations.",
      icon: Search,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "04 — Autonomous Workflow Testing",
      desc: "Validate complex logistics workflows across transportation, warehouse operations, APIs, EDI exchanges, and connected platforms with automated end-to-end testing.",
      icon: Workflow,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "05 — Logistics Data & Integration Validation",
      desc: "Continuously validate shipment data, inventory information, carrier messages, EDI transactions, APIs, and system integrations for accuracy and consistency.",
      icon: Database,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "06 — Continuous Logistics Quality",
      desc: "Continuously evaluate logistics applications as workflows, integrations, business rules, and operational requirements evolve across the software lifecycle.",
      icon: RefreshCw,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div id="what-we-test" className="bg-white pt-8 lg:pt-12 pb-16 lg:pb-24 text-slate-900 overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col h-full lg:pr-4">
            <div className="flex flex-col justify-between h-full w-full lg:max-w-[660px] mx-auto lg:mx-0 px-4 lg:px-2 pt-0">
              <div className="mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-200 bg-orange-50 typo-caption text-[#FF6B00] uppercase mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
                  HOW AI IS CHANGING LOGISTICS TESTING
                </div>
                <h2 className="typo-heading-3 sm:typo-heading-2 text-slate-900 leading-[1.2] mb-3">
                  AI Is Transforming Logistics.<br />
                  Testing Needs to Evolve With It.
                </h2>
                {/* <p className="typo-description text-slate-600 mb-4">
                  AI-powered testing helps logistics teams validate complex
                  workflows, detect defects earlier, optimize test coverage,
                  and continuously assess TMS, WMS, warehouse automation,
                  APIs, and supply chain applications.
                </p> */}
              </div>

              <div className="flex flex-col justify-between flex-1 mt-2">
                {items.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-2.5 sm:gap-3 py-1.5 sm:py-2 ${i !== items.length - 1 ? "border-b border-slate-100" : ""
                      }`}
                  >
                    <div
                      className={`shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full ${item.bg} flex items-center justify-center mt-0.5 border border-orange-200/50`}
                    >
                      <item.icon
                        className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${item.color}`}
                      />
                    </div>
                    <div className="flex flex-col pt-0">
                      <h3 className="typo-heading-4 text-slate-900 mb-0.5">
                        {item.title}
                      </h3>
                      <p className="typo-body-sm text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="typo-body text-slate-700 text-center sm:text-left">
                  Ready to improve the quality of your logistics applications?
                </p>
                <div className="shrink-0">
                  <FlowButton
                    href="/contact"
                    text="Contact Us"
                    variant="orange-filled"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 w-full flex flex-col h-full mt-8 lg:mt-0">
            <div className="w-full h-full max-w-[550px] lg:max-w-none flex flex-col mx-auto lg:ml-auto">
              <CoverageGlobe
                heading="Global Reach. Assured Quality."
                tagline="Logistics Testing Centers of Excellence"
                subheading="Trusted by organizations worldwide to ensure application reliability, performance, and software quality."
                storesLabel="Global delivery hubs"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
