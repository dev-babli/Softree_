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
      "We begin by understanding your business objectives, workflows, and technical environment to define clear requirements and opportunities.",
    icon: FaSearch,
  },
  {
    title: "Solution Design",
    description:
      "Our team designs a detailed solution blueprint covering architecture, integrations, and user journeys aligned with your goals.",
    icon: FaDraftingCompass,
  },
  {
    title: "Application Development",
    description:
      "Using Microsoft Power Apps, we build secure and intuitive applications optimized for performance and usability.",
    icon: FaCode,
  },
  {
    title: "Testing & Validation",
    description:
      "We conduct comprehensive testing to ensure reliability, system compatibility, and quality across all workflows.",
    icon: FaCheckCircle,
  },
  {
    title: "Ongoing Support & Optimization",
    description:
      "After deployment, we provide continuous support and enhancements to adapt your solution to evolving business needs.",
    icon: FaHandsHelping,
  },
];

export default function PowerAppsProcessSection() {
  return (
    <section className="relative bg-[#050505] py-28 overflow-visible">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none -z-20
        bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.25),transparent_60%)]"
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* 🔥 CONNECTED GLASS BACKGROUND (VISUAL ONLY) */}
        <div
          className="
            absolute inset-0
            rounded-[40px]
            bg-[#0B1220]/80
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
            bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10
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

    /* ✅ Gradient background */
    bg-gradient-to-br
    from-[#0B1220]
    via-[#0E1628]
    to-[#05080F]

    /* ✅ Rounded & clipped */
    rounded-[36px]
    
  "
        >
          {/* LEFT – TRUE STICKY */}
          <div className="lg:sticky lg:top-32 self-start">
            <div className="max-w-xl space-y-6">
              {/* Eyebrow */}
              <span
                className="inline-flex items-center px-4 py-1.5 rounded-full 
      bg-white/5 border border-white/10 text-xs tracking-wide text-white/70"
              >
                Delivery Framework
              </span>

              {/* Heading */}
              <h3 className="text-3xl lg:text-4xl font-semibold text-white leading-tight">
                Our Power Apps Development Process for Scalable Solutions
              </h3>

              {/* Divider */}
              <div className="w-14 h-px bg-gradient-to-r from-blue-400/70 to-purple-500/70" />

              {/* Description */}
              <p className="text-lg text-gray-400 leading-relaxed">
                At Softree, we follow a structured and outcome-driven approach
                to deliver secure, scalable, and enterprise-ready Power
                Apps—ensuring clarity, consistency, and long-term value
                throughout the development lifecycle.
              </p>
            </div>
          </div>

          {/* RIGHT – TIMELINE */}
          <div className="relative">
            <ul className="relative space-y-14">
              {/* Vertical dotted line */}
              <span
                className="absolute left-[28px] top-[28px] bottom-[28px]
                w-px border-l border-dashed border-white/25"
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
                          bg-[#0b0b0b]
                          border border-white/20
                          flex items-center justify-center
                          text-blue-400
                          shadow-[0_0_18px_rgba(59,130,246,0.25)]
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
