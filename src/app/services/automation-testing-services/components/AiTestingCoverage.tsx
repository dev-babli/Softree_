"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Bot,
  Wrench,
  Repeat,
  TrendingUp,
  Bug,
  ArrowRight,
} from "lucide-react";
import CoverageGlobe from "@/app/industries/healthcare-software-testing-services/components/CoverageGlobe";

export default function AiTestingCoverage() {
  const items = [
    {
      title: "01 — AI-Powered Test Generation",
      desc: "Generate test scenarios and cases from requirements, user flows, application behavior, and existing test data.",
      icon: Sparkles,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "02 — Intelligent Test Automation",
      desc: "Use AI to identify test priorities, optimize execution, and automate repetitive testing workflows across applications.",
      icon: Bot,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "03 — Self-Healing Test Automation",
      desc: "Automatically adapt automated tests to common UI and application changes, reducing test maintenance and improving test stability.",
      icon: Wrench,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "04 — AI Regression Testing",
      desc: "Identify high-risk areas and prioritize regression tests to validate critical functionality after application changes.",
      icon: Repeat,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "05 — Intelligent Test Optimization",
      desc: "Analyze test results, historical defects, and application changes to improve test coverage and reduce unnecessary test execution.",
      icon: TrendingUp,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "06 — AI-Assisted Defect Detection",
      desc: "Analyze test results, logs, application behavior, and patterns to help teams identify potential defects and investigate failures faster.",
      icon: Bug,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    }
  ];

  return (
    <div className="bg-white pt-2 md:pt-6 pb-6 md:pb-16 text-slate-900">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-[2cm]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

          {/* Left Column */}
          <div className="lg:col-span-6 flex flex-col h-full lg:pr-4">
            <div className="flex flex-col justify-between h-full w-full lg:max-w-[660px] mx-auto lg:mx-0 px-4 lg:px-2 pt-0">

              <div className="mb-4">
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-200 bg-orange-50 typo-caption text-[#FF6B00] uppercase mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
                  HOW AI IS CHANGING TESTING
                </div>

                {/* Heading */}
                <h2 className="typo-heading-3 sm:typo-heading-2 text-slate-900 leading-[1.2] mb-3">
                  AI Is Transforming Software Testing Automation Needs to Evolve With It
                </h2>

                {/* Description */}
                {/* <p className="typo-description text-slate-600 mb-4">
                  AI is changing how software is developed, tested, and released. Modern AI-powered testing can analyze application behavior, generate test scenarios, identify defects, optimize test coverage, and reduce maintenance across the software testing lifecycle.
                </p> */}
              </div>

              {/* Items List */}
              <div className="flex flex-col justify-between flex-1 mt-2">
                {items.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-2.5 sm:gap-3 py-1.5 sm:py-2 ${i !== items.length - 1 ? "border-b border-slate-100" : ""
                      }`}
                  >
                    <div className={`shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full ${item.bg} flex items-center justify-center mt-0.5 border border-orange-200/50`}>
                      <item.icon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${item.color}`} />
                    </div>
                    <div className="flex flex-col pt-0">
                      <h3 className="typo-heading-4 text-slate-900 mb-0.5">
                        {item.title}
                      </h3>
                      <p className="typo-body-sm text-slate-600">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex flex-col xl:flex-row items-center justify-between gap-3">
                <p className="typo-body text-slate-700 text-center xl:text-left">
                  Ready to accelerate your software testing with AI-powered automation?
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white typo-button shadow-md shadow-orange-500/20 transition-all duration-200 shrink-0 group text-sm sm:text-base text-center"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-4.5 h-4.5 transition-transform duration-200 group-hover:translate-x-1 shrink-0 hidden sm:block" />
                </Link>
              </div>

            </div>
          </div>

          {/* Right Column: Globe */}
          <div className="lg:col-span-6 w-full flex flex-col h-full mt-8 lg:mt-0">
            <div className="w-full h-full max-w-[550px] lg:max-w-none flex flex-col mx-auto lg:ml-auto">
              <CoverageGlobe
                heading="Global Reach. Assured Quality."
                tagline="AUTOMATION TESTING CENTERS OF EXCELLENCE"
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
