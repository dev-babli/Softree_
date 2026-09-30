"use client";

import React from "react";
import Link from "next/link";
import {
  MessageSquareCode,
  Sliders,
  Database,
  RefreshCw,
  AlertTriangle,
  Workflow,
  ArrowRight,
} from "lucide-react";
import CoverageGlobe from "./CoverageGlobe";

export default function HealthcareTestingCoverage() {
  const items = [
    {
      title: "AI Response Testing",
      desc: "Evaluate relevance, consistency, and expected behavior.",
      icon: MessageSquareCode,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "Prompt Testing",
      desc: "Test prompts, instructions, inputs, and edge cases.",
      icon: Sliders,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "RAG Testing",
      desc: "Validate retrieval, grounding, document relevance, and generated answers.",
      icon: Database,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "AI Regression Testing",
      desc: "Identify changes in AI behavior across application releases.",
      icon: RefreshCw,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "Edge-Case Testing",
      desc: "Test ambiguous, incomplete, unexpected, and invalid inputs.",
      icon: AlertTriangle,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "AI Integration Testing",
      desc: "Validate interactions between AI models, APIs, databases, tools, and applications.",
      icon: Workflow,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
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
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-200 bg-orange-50 typo-caption text-[#FF6B00] uppercase mb-3 text-xs font-semibold">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse"></div>
                  HOW AI CHANGES TESTING
                </div>

                {/* Heading */}
                <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-slate-900 tracking-tight leading-[1.2] mb-3">
                  AI Is Changing Healthcare Software —{" "}
                  <span className="text-[#FF6B00]">
                    Testing Needs to Change With It
                  </span>
                </h2>

                {/* Description */}
                <p className="typo-description text-slate-600 mb-4 text-sm sm:text-base leading-relaxed">
                  Traditional testing validates whether software behaves according
                  to predefined rules. AI applications introduce another layer:
                  testing how systems interpret inputs, retrieve information,
                  generate responses, and behave across different scenarios.
                </p>
              </div>

              {/* Items List */}
              <div className="flex flex-col justify-between flex-1 mt-2">
                {items.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-2.5 sm:gap-3 py-2 sm:py-2.5 ${
                      i !== items.length - 1 ? "border-b border-slate-100" : ""
                    }`}
                  >
                    <div
                      className={`shrink-0 w-7 h-7 rounded-lg ${item.bg} flex items-center justify-center mt-0.5 border border-orange-200/50 shadow-xs`}
                    >
                      <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
                    </div>
                    <div className="flex flex-col pt-0">
                      <h3 className="typo-heading-4 text-slate-900 mb-0.5 text-sm sm:text-[15px] font-bold">
                        {item.title}
                      </h3>
                      <p className="typo-body-sm text-slate-600 text-xs sm:text-[13px] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="typo-body text-slate-700 text-center sm:text-left text-xs sm:text-sm">
                  Ready to ensure the reliability and security of your healthcare AI applications?
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white typo-button shadow-md shadow-orange-500/20 transition-all duration-200 shrink-0 group"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-4.5 h-4.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>

            </div>
          </div>

          {/* Right Column: Globe */}
          <div className="lg:col-span-6 w-full flex flex-col h-full mt-8 lg:mt-0">
            <div className="w-full h-full max-w-[550px] lg:max-w-none flex flex-col mx-auto lg:ml-auto">
              <CoverageGlobe
                heading="Global Reach. Assured Quality."
                tagline="Healthcare Testing Centers of Excellence"
                subheading="Trusted by healthcare organizations worldwide to ensure application reliability, compliance, and interoperability."
                storesLabel="Global delivery hubs"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
