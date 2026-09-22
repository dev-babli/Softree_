"use client";

import {
  FaSearch,
  FaDraftingCompass,
  FaCode,
  FaCheckCircle,
  FaHandsHelping,
} from "react-icons/fa";

const processSteps = [
  {
    title: "Discovery & Analysis",
    description:
      "We begin by understanding your business objectives, workflows, existing systems, and automation opportunities to define clear requirements and the right Power Platform approach.",
    icon: FaSearch,
  },
  {
    title: "Solution Design",
    description:
      "Our team designs the Power Platform solution architecture, data model, integrations, security approach, and user journeys aligned with your business goals.",
    icon: FaDraftingCompass,
  },
  {
    title: "Power Platform Development",
    description:
      "We develop Power Apps, Power Automate workflows, Dataverse solutions, Power BI components, Power Pages experiences, and related Power Platform solutions based on your requirements.",
    icon: FaCode,
  },
  {
    title: "Testing & Validation",
    description:
      "We validate applications, workflows, integrations, permissions, and business processes to ensure reliability, security, compatibility, and solution quality before deployment.",
    icon: FaCheckCircle,
  },
  {
    title: "Deployment, Support & Optimization",
    description:
      "We manage deployment and provide ongoing support, enhancements, optimization, and maintenance to help your Power Platform solutions evolve with changing business needs.",
    icon: FaHandsHelping,
  },
];

export default function PowerAppsProcessSection() {
  return (
    <section className="relative py-12 overflow-visible">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none -z-20
        bg-gradient-to-r from-black via-[#4c1c02] to-black"
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* 🔥 CONNECTED GLASS BACKGROUND (VISUAL ONLY) */}
        <div
          className="
            absolute inset-0
            rounded-[40px]
              bg-gradient-to-r from-black via-[#4c1c02] to-black
            backdrop-blur-xl
            border border-white/10
            -z-10
          "
        />

        {/* Soft inner glow */}
        <div
          className="
            absolute inset-0
            rounded-[40px]
            bg-gradient-to-br from-orange-500/10 via-transparent to-amber-500/10
            pointer-events-none
            -z-10
          "
        />

        <div
          className="
    relative
    grid grid-cols-1 lg:grid-cols-2
    gap-16 lg:gap-24
    px-8 py-14 lg:px-14 lg:py-20

    /* ✅ Charcoal glass background */
     bg-gradient-to-r from-black via-[#4c1c02] to-black
    backdrop-blur-2xl
    border border-white/10
    rounded-[36px]
  "
        >
          {/* ================= LEFT – TRUE STICKY ================= */}
          <div className="lg:sticky lg:top-32 self-start">
            <div className="max-w-xl space-y-6">
              {/* Eyebrow */}
              <span
                className="
          inline-flex items-center px-4 py-1.5 rounded-full
          bg-white/5 border border-white/15
          text-xs tracking-wide text-gray-300
        "
              >
                Delivery Framework
              </span>

              {/* Heading */}
              <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Our <span className="text-orange-500">Microsoft Power Platform</span> Development Process
              </h3>

              {/* Divider (neutral) */}
              <div className="w-14 h-px bg-white/30" />

              {/* Description */}
              <p className="text-lg md:text-[1.1rem] leading-relaxed text-gray-400">
                At Softree, we follow a structured and outcome-driven approach to deliver secure, scalable Microsoft Power Platform solutions. From discovery and solution design to development, integration, testing, deployment, and ongoing support, we help businesses build and evolve Power Platform solutions aligned with their goals.
              </p>
            </div>
          </div>

          {/* ================= RIGHT – TIMELINE ================= */}
          <div className="relative">
            <ul className="relative space-y-14">
              {/* Vertical dotted line */}
              <span
                className="
          absolute left-[28px] top-[28px] bottom-[28px]
          w-px border-l border-dashed border-white/25
        "
              />

              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <li key={index} className="relative flex gap-6 items-start">
                    {/* Icon */}
                    <div className="relative z-10 flex-shrink-0">
                      <div
                        className="
                  w-14 h-14 rounded-full
                  bg-[#141414]
                  border border-white/20
                  flex items-center justify-center
                  text-gray-200
                  shadow-[0_0_22px_rgba(255,255,255,0.12)]
                "
                      >
                        <Icon size={22} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="pt-1">
                      <h4 className="text-xl font-semibold text-white mb-2">
                        {step.title}
                      </h4>
                      <p className="text-gray-400 leading-relaxed max-w-md">
                        {step.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
