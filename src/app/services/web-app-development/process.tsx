"use client";

import { Clock, Users, Headset, CheckCircle2, ArrowRight } from "lucide-react";

export default function HireNextJsPricing() {
  return (
    <section
      id="plan-pricing"
      className="relative overflow-hidden bg-black py-12"
    >
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <h2 className="mb-24 text-center text-4xl lg:text-5xl font-light text-white">
          Hire <span className="text-cyan-400">Next.js Developers</span> for
          Scalable & High-Performance Applications
        </h2>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Left Highlights */}
          <div className="flex flex-col gap-6">
            {[
              {
                icon: Clock,
                title: "Flexible Engagement",
              },
              {
                icon: Users,
                title: "Senior Next.js Experts",
              },
              {
                icon: Headset,
                title: "Dedicated Support",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 backdrop-blur-xl transition hover:border-cyan-400/40"
              >
                <item.icon className="h-8 w-8 text-cyan-100" />
                <h3 className="text-white font-medium">{item.title}</h3>
              </div>
            ))}
          </div>

          {/* Pricing Cards */}
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
                className={`relative rounded-3xl p-10 backdrop-blur-xl transition-all duration-300
    ${
      plan.highlight
        ? `
          border border-white/30
          bg-gradient-to-br from-white/[0.12] via-white/[0.06] to-black/40
          shadow-[0_30px_80px_-30px_rgba(255,255,255,0.35)]
        `
        : `
          border border-white/10
          bg-gradient-to-br from-white/[0.08] to-white/[0.02]
          hover:border-white/20
        `
    }
  `}
              >
                {/* Badge */}
                {plan.highlight && (
                  <span
                    className="
        absolute -top-4 left-1/2 -translate-x-1/2
        rounded-full
        bg-white
        px-4 py-1
        text-xs font-semibold text-black
        shadow-md
      "
                  >
                    RECOMMENDED
                  </span>
                )}

                {/* Title */}
                <h3 className="mb-8 text-xl font-medium text-white">
                  {plan.title}
                </h3>

                {/* Features */}
                <ul className="space-y-4">
                  {plan.features.map((f, idx) => (
                    <li
                      key={idx}
                      className="flex gap-3 text-gray-300 leading-relaxed"
                    >
                      <CheckCircle2 className="h-5 w-5 text-white/80 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <a
            href="#contact-us"
            className="group inline-flex items-center gap-3 rounded-full bg-cyan-100 px-10 py-4 text-sm font-semibold text-black transition hover:bg-cyan-300"
          >
            Get a Free Consultation
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
