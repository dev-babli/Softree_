"use client";

import React from "react";
import Link from "next/link";
import {
  AppWindow,
  Warehouse,
  ArrowRightLeft,
  MonitorSmartphone,
  BarChart3,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import CoverageGlobe from "@/app/industries/healthcare-software-testing-services/components/CoverageGlobe";

export default function LogisticsTestingCoverage() {
  const items = [
    {
      title: "01 — TMS & Transportation Platforms",
      desc: "Functional, usability, performance, routing, rating, and dispatch workflow validation.",
      icon: AppWindow,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "02 — WMS & Warehouse Systems",
      desc: "Validate receiving, putaway, picking, packing, inventory accuracy, and labor workflows.",
      icon: Warehouse,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "03 — EDI, APIs & Integrations",
      desc: "Test EDI 214/856/210, carrier APIs, ERP connectors, and third-party data exchange.",
      icon: ArrowRightLeft,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "04 — Visibility & Customer Portals",
      desc: "Test track-and-trace, ETAs, exception alerts, carrier portals, and mobile apps.",
      icon: MonitorSmartphone,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "05 — Supply Chain Data & Analytics",
      desc: "Validate shipment data, dashboards, control-tower reports, and analytics pipelines.",
      icon: BarChart3,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "06 — Security & Compliance",
      desc: "Test access controls, API security, data privacy, and vulnerability coverage.",
      icon: ShieldCheck,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div id="what-we-test" className="bg-white py-16 lg:py-24 text-slate-900 overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col h-full lg:pr-4">
            <div className="flex flex-col justify-between h-full w-full lg:max-w-[660px] mx-auto lg:mx-0 px-4 lg:px-2 pt-0">
              <div className="mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-200 bg-orange-50 typo-caption text-[#FF6B00] uppercase mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
                  WHAT WE TEST
                </div>
                <h2 className="typo-heading-3 sm:typo-heading-2 text-slate-900 leading-[1.2] mb-3">
                  Testing Across the Modern Logistics Technology Stack
                </h2>
                <p className="typo-description text-slate-600 mb-4">
                  Test logistics applications, warehouse platforms, integrations,
                  and data systems for quality, security, performance, and
                  reliability.
                </p>
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
                  Ready to ensure the reliability of your logistics applications?
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

          <div className="lg:col-span-6 w-full flex flex-col h-full mt-8 lg:mt-0">
            <div className="w-full h-full max-w-[550px] lg:max-w-none flex flex-col mx-auto lg:ml-auto">
              <CoverageGlobe
                heading="Global Reach. Assured Quality."
                tagline="Logistics Testing Centers of Excellence"
                subheading="Trusted by 3PLs, shippers, and technology partners worldwide to ensure TMS, WMS, and supply chain reliability."
                storesLabel="Global delivery hubs"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
