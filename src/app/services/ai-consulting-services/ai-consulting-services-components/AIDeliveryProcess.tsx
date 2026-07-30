"use client";

import { motion } from "framer-motion";
import {
  FaSearch,
  FaLayerGroup,
  FaBrain,
  FaShieldAlt,
  FaSyncAlt,
} from "react-icons/fa";

const processSteps = [
  {
    title: "AI Strategy & Discovery",
    description:
      "We collaborate with stakeholders to understand your business goals, operational challenges, existing technology landscape, and AI opportunities. This phase establishes a clear roadmap aligned with your digital transformation objectives.",
    icon: FaSearch,
  },
  {
    title: "Solution Architecture & Roadmap",
    description:
      "Our architects design a secure and scalable AI solution using Microsoft technologies such as Azure AI, Copilot Studio, Power Platform, and Microsoft Fabric. We define integrations, governance, implementation phases, and expected business outcomes.",
    icon: FaLayerGroup,
  },
  {
    title: "AI Development & Integration",
    description:
      "Our offshore engineering teams build custom AI solutions, enterprise copilots, intelligent automation, and AI-powered applications. We integrate seamlessly with Microsoft 365, Dynamics 365, SharePoint, Dataverse, ERP, CRM, and third-party business systems.",
    icon: FaBrain,
  },
  {
    title: "Testing, Security & Deployment",
    description:
      "Every solution undergoes comprehensive functional, security, performance, and user acceptance testing. We ensure compliance, governance, scalability, and a smooth production deployment following Microsoft best practices.",
    icon: FaShieldAlt,
  },
  {
    title: "Continuous Optimization & Support",
    description:
      "AI is an ongoing journey. After deployment, we continuously monitor performance, optimize AI models, introduce new capabilities, and provide dedicated offshore support to maximize long-term business value and return on investment.",
    icon: FaSyncAlt,
  },
];

export default function AIDeliveryProcess() {
  return (
    <section className="relative py-12 md:py-16 lg:py-20 overflow-visible">
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
    shadow-[0_40px_120px_rgba(0,0,0,0.6)]
  "
        >
          {/* ================= LEFT – TRUE STICKY ================= */}
          <div className="lg:sticky lg:top-32 self-start">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-xl space-y-6"
            >
              {/* Eyebrow */}
              <span
                className="
          inline-flex items-center px-4 py-1.5 rounded-full
          bg-white/5 border border-white/15
          text-xs tracking-wide text-gray-300 uppercase
        "
              >
                OUR DELIVERY FRAMEWORK
              </span>

              {/* Heading */}
              <h3 className="text-3xl lg:text-4xl font-semibold text-white leading-tight">
                Our <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">AI Consulting</span> Delivery Process
              </h3>

              {/* Divider (neutral) */}
              <div className="w-14 h-px bg-white/30" />

              {/* Description */}
              <p className="text-lg text-gray-400 leading-relaxed">
                At Softree, we follow a proven, business-first delivery framework to help enterprises successfully adopt AI. From strategy and solution architecture to development, deployment, and ongoing optimization, our Microsoft AI experts deliver secure, scalable, and outcome-driven AI solutions that create measurable business value.
              </p>
            </motion.div>
          </div>

          {/* ================= RIGHT – TIMELINE ================= */}
          <div className="relative">
            <ul className="relative space-y-14">
              {/* Vertical dotted line base */}
              <span
                className="
          absolute left-[28px] top-[28px] bottom-[28px]
          w-px border-l border-dashed border-white/25
        "
              />
              
              {/* Animated fill line */}
              <motion.span
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="
                  absolute left-[28px] top-[28px]
                  w-px border-l border-solid border-orange-500 z-0
                "
              />

              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.li 
                    key={index} 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="relative flex gap-6 items-start group cursor-default"
                  >
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
                  transition-all duration-300 ease-out
                  group-hover:scale-110 group-hover:border-orange-500/50
                  group-hover:text-orange-400 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]
                  group-hover:bg-orange-500/10
                "
                      >
                        <Icon size={22} className="transition-colors duration-300" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="pt-1 transition-transform duration-300 group-hover:translate-x-2">
                      <h4 className="text-xl font-semibold text-white mb-2 transition-colors duration-300 group-hover:text-orange-400">
                        {step.title}
                      </h4>
                      <p className="text-gray-400 leading-relaxed max-w-md">
                        {step.description}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
