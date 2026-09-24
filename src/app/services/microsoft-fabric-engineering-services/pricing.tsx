"use client";

import {
  Clock,
  Users,
  Headset,
  CheckCircle2,
  ArrowRight,
  Database,
  ShieldCheck,
} from "lucide-react";

export default function HireFabricPricing() {
  return (
    <section id="plan-pricing" className="relative py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* ================= HEADING ================= */}
        <h2 className="mb-10 text-center text-4xl font-semibold text-gray-900">
          Hire <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">Microsoft Fabric Experts</span> for Unified Data & AI Solutions
        </h2>

        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
          {/* ================= LEFT HIGHLIGHTS ================= */}
          <div className="h-full flex flex-col gap-5">
            {[
              { icon: Clock, title: "Flexible Engagement Models" },
              { icon: Users, title: "Certified Fabric Specialists" },
              { icon: Headset, title: "End-to-End Data Platform Support" },
            ].map((item, i) => (
              <div
                key={i}
                className="
                  group relative overflow-hidden
                  flex flex-1 items-center gap-4
                  rounded-2xl
                  bg-gradient-to-br from-white via-white to-orange-50/50
                  border border-gray-200
                  p-6
                  shadow-[0_4px_14px_rgba(0,0,0,0.05)]
                  hover:shadow-[0_10px_28px_rgba(0,0,0,0.10)]
                  hover:-translate-y-1
                  transition-all duration-300
                "
              >
                <span className="absolute inset-x-0 bottom-0 h-[3px] rounded-b-2xl bg-gradient-to-r from-black via-[#4c1c02] to-black opacity-80" />

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600 transition group-hover:bg-orange-600 group-hover:text-white">
                  <item.icon className="h-5 w-5" />
                </div>

                <h3 className="text-sm font-medium tracking-tight text-gray-900">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>

          {/* ================= PRICING CARDS ================= */}
          <div className="grid grid-cols-1 gap-7 md:grid-cols-3 lg:col-span-3">
            {[
              {
                title: "Hourly Fabric Consultation",
                features: [
                  "Pay only for actual Fabric engineering or advisory hours",
                  "Ideal for Lakehouse setup, data modeling & optimization",
                  "Transparent tracking and reporting",
                ],
              },
              {
                title: "Dedicated Fabric Engineer",
                highlight: true,
                features: [
                  "Full-time Microsoft Fabric expert for your data platform",
                  "Fixed monthly pricing with predictable delivery",
                  "Best for continuous data integration & analytics scaling",
                ],
              },
              {
                title: "Fixed-Scope Fabric Project",
                features: [
                  "Defined scope, timelines, and deliverables",
                  "Upfront pricing with no hidden costs",
                  "Ideal for data migration, pipelines & AI solutions",
                ],
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`relative rounded-3xl p-8 transition-all duration-300 ${
                  plan.highlight
                    ? `
                      bg-gradient-to-r from-black via-[#4c1c02] to-black
                      text-white
                      shadow-[0_18px_50px_rgba(249,115,22,0.4)]
                      scale-[1.03]
                    `
                    : `
                      bg-white
                      border border-gray-200
                      shadow-sm
                      hover:shadow-md
                    `
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-1 text-[11px] font-semibold text-orange-700 shadow-md">
                    MOST POPULAR
                  </span>
                )}

                <h3
                  className={`mb-6 text-lg font-semibold ${
                    plan.highlight ? "text-white" : "text-gray-900"
                  }`}
                >
                  {plan.title}
                </h3>

                <ul className="space-y-3">
                  {plan.features.map((f, idx) => (
                    <li
                      key={idx}
                      className={`flex gap-3 text-sm ${
                        plan.highlight ? "text-white/90" : "text-gray-600"
                      }`}
                    >
                      <CheckCircle2
                        className={`h-4 w-4 shrink-0 ${
                          plan.highlight ? "text-white" : "text-orange-600"
                        }`}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ================= CTA ================= */}
        <div className="mt-14 text-center">
          <a
            href="/contact"
            className="
              inline-flex items-center gap-3
              rounded-full
           
              bg-gradient-to-r from-orange-600 to-amber-500
              px-10 py-4
              text-sm font-semibold
              text-white
              shadow-md
              hover:shadow-lg
              hover:scale-105
              transition
            "
          >
            Discuss Your Fabric Project
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
