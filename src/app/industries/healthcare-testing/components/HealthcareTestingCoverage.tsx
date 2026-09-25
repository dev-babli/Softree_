"use client";

import React from "react";
import Link from "next/link";
import {
  AppWindow,
  Activity,
  ArrowRightLeft,
  MonitorSmartphone,
  BarChart3,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import CoverageGlobe from "./CoverageGlobe";

export default function HealthcareTestingCoverage() {
  const items = [
    {
      title: "01 — Healthcare Applications",
      desc: "Functional, usability, performance, workflow, and data validation.",
      icon: AppWindow,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "02 — EHR & EMR Systems",
      desc: "Validate patient data, clinical workflows, integrations, and data integrity.",
      icon: Activity,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "03 — Healthcare APIs & Integrations",
      desc: "Test APIs, interoperability, data exchange, and third-party integrations.",
      icon: ArrowRightLeft,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "04 — Telehealth & Digital Health",
      desc: "Test telemedicine, patient portals, mobile apps, scheduling, and secure communication.",
      icon: MonitorSmartphone,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "05 — Healthcare Data & Analytics",
      desc: "Validate healthcare data, reports, dashboards, pipelines, and analytics.",
      icon: BarChart3,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "06 — Healthcare Security & Compliance",
      desc: "Test data privacy, access controls, vulnerabilities, security, and compliance requirements.",
      icon: ShieldCheck,
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
                  WHAT WE TEST
                </div>

                {/* Heading */}
                <h2 className="typo-heading-3 sm:typo-heading-2 text-slate-900 leading-[1.2] mb-3">
                  Testing Across the Modern Healthcare Technology Stack
                </h2>

                {/* Description */}
                <p className="typo-description text-slate-600 mb-4">
                  Test healthcare applications, platforms, integrations, and data systems for quality, security, performance, and reliability.
                </p>
              </div>

              {/* Items List */}
              <div className="flex flex-col justify-between flex-1 mt-2">
                {items.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-2.5 sm:gap-3 py-1.5 sm:py-2 ${
                      i !== items.length - 1 ? "border-b border-slate-100" : ""
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
              <div className="pt-4 mt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="typo-body text-slate-700 text-center sm:text-left">
                  Ready to ensure the reliability and security of your healthcare applications?
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
