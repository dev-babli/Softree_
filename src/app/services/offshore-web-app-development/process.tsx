"use client";

import { Clock, Users, Headset, CheckCircle2, ArrowRight } from "lucide-react";

export default function HireNextJsPricing() {
  return (
    <section
      id="plan-pricing"
      className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 py-16"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* ================= HEADING ================= */}
        <h2 className="mb-14 text-center text-4xl lg:text-4xl font-semibold text-gray-900">
          Hire{" "}
          <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
            Next.js Developers
          </span>{" "}
          for Scalable & High-Performance Applications
        </h2>

        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* ================= LEFT HIGHLIGHTS ================= */}
          <div className="flex flex-col gap-6">
            {[
              { icon: Clock, title: "Flexible Engagement" },
              { icon: Users, title: "Senior Next.js Experts" },
              { icon: Headset, title: "Dedicated Support" },
            ].map((item, i) => (
              <div
                key={i}
                className="
        group relative overflow-hidden

        flex items-center gap-5
        rounded-2xl

        bg-gradient-to-br from-white via-white to-orange-50
        border border-gray-200

        p-6

        shadow-[0_6px_18px_rgba(0,0,0,0.05)]
        hover:shadow-[0_14px_40px_rgba(0,0,0,0.10)]

        hover:-translate-y-1
        transition-all duration-300
      "
              >
                {/* ===== Bottom rounded gradient accent ===== */}
                <span
                  className="
          absolute inset-x-0 bottom-0
          h-[4px]
          rounded-b-2xl
          bg-gradient-to-r
          from-orange-600
          via-amber-500
          to-orange-600
          opacity-70
          group-hover:opacity-100
          transition
        "
                />

                {/* ===== Icon container ===== */}
                <div
                  className="
          relative
          h-11 w-11
          flex items-center justify-center
          rounded-xl

          bg-orange-50
          text-orange-600

          group-hover:bg-orange-600
          group-hover:text-white

          transition
        "
                >
                  <item.icon className="h-5 w-5" />
                </div>

                {/* ===== Text ===== */}
                <h3 className="text-gray-900 font-medium tracking-tight">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>

          {/* ================= PRICING CARDS ================= */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Hourly Engagement",
                features: [
                  "Pay only for actual development hours",
                  "Ideal for audits, fixes, and feature enhancements",
                  "Full transparency with real-time reporting",
                ],
              },
              {
                title: "Monthly Dedicated Developer",
                highlight: true,
                features: [
                  "Dedicated Next.js engineer working exclusively on your project",
                  "Fixed monthly cost with predictable delivery",
                  "Best choice for startups & growing products",
                ],
              },
              {
                title: "Fixed-Scope Project",
                features: [
                  "Clearly defined scope, timeline, and deliverables",
                  "Zero budget surprises with upfront pricing",
                  "Perfect for MVPs and enterprise launches",
                ],
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`
                  relative rounded-3xl p-10
                  transition-all duration-300

                  ${
                    plan.highlight
                      ? `
                      bg-gradient-to-r from-black via-[#4c1c02] to-black
                        text-white
                        border-transparent
                        shadow-[0_25px_70px_rgba(249,115,22,0.45)]
                        scale-[1.06]
                      `
                      : `
                        bg-white
                        border border-gray-200
                        shadow-sm
                        hover:shadow-lg
                      `
                  }
                `}
              >
                {/* ===== BADGE ===== */}
                {plan.highlight && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-white text-orange-700 px-4 py-1 text-xs font-semibold shadow-md">
                    RECOMMENDED
                  </span>
                )}

                {/* ===== TITLE ===== */}
                <h3
                  className={`mb-8 text-xl font-semibold ${
                    plan.highlight ? "text-white" : "text-gray-900"
                  }`}
                >
                  {plan.title}
                </h3>

                {/* ===== FEATURES ===== */}
                <ul className="space-y-4">
                  {plan.features.map((f, idx) => (
                    <li
                      key={idx}
                      className={`flex gap-3 leading-relaxed ${
                        plan.highlight ? "text-white/90" : "text-gray-600"
                      }`}
                    >
                      <CheckCircle2
                        className={`h-5 w-5 shrink-0 ${
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
        <div className="mt-8 text-center">
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
            Get a Free Consultation
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
