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
    title: "Enterprise Needs Assessment",
    description:
      "We collaborate with your C-suite and engineering leadership to evaluate your current architecture, data maturity, and operational bottlenecks. We identify high-impact AI use cases and establish strict security parameters.",
    icon: FaSearch,
  },
  {
    title: "Secure Architecture & PoC",
    description:
      "Our architects design resilient, isolated AI environments using private cloud infrastructure (Azure, AWS, or GCP). We build targeted Proof of Concepts (PoCs) to validate model accuracy, latency, and compliance before heavy investment.",
    icon: FaLayerGroup,
  },
  {
    title: "Production Engineering & Integration",
    description:
      "We build production-grade MLOps pipelines and secure RAG systems. Our teams write the 'glue code' needed to connect autonomous agents safely to your legacy ERP, CRM, and bespoke operational databases.",
    icon: FaBrain,
  },
  {
    title: "Red-Teaming & Security Audits",
    description:
      "Before any model hits production, we subject it to rigorous adversarial testing (red-teaming). We validate RBAC protocols, prompt injection defenses, and ensure zero data leakage for SOC2/GDPR compliance.",
    icon: FaShieldAlt,
  },
  {
    title: "Global Rollout & Monitoring",
    description:
      "We deploy models using canary releases and blue-green deployments to ensure zero downtime. Post-launch, we provide continuous observability to monitor model drift, hallucination rates, and API latency.",
    icon: FaSyncAlt,
  },
];

export default function EnterpriseAIDeliveryProcess() {
  return (
    <section className="relative py-12 md:py-16 lg:py-20 overflow-visible">
      {/* Background glow */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-foreground to-transparent z-10 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none -z-20
        bg-linear-to-r from-black via-[#4c1c02] to-black"
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* 🔥 CONNECTED GLASS BACKGROUND (VISUAL ONLY) */}
        <div
          className="
            absolute inset-0
            rounded-[40px]
            bg-linear-to-r from-black via-[#4c1c02] to-black
            backdrop-blur-xl
            border border-white/10
            -z-10
          "
        >
          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-black/80 z-10" />
        </div>

        {/* Soft inner glow */}
        <div
          className="
            absolute inset-0
            rounded-[40px]
            bg-linear-to-br from-orange-500/10 via-transparent to-amber-500/10
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
            bg-linear-to-r from-black via-[#4c1c02] to-black
            backdrop-blur-2xl
            border border-white/10
            rounded-[36px]
            shadow-[0_40px_120px_rgba(0,0,0,0.6)]
          "
        >
          <div className="absolute inset-0 bg-linear-to-br from-black/60 via-black/20 to-black/60 z-20 pointer-events-none" />
          
          {/* ================= LEFT – TRUE STICKY ================= */}
          <div className="lg:sticky lg:top-32 self-start">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-xl space-y-6"
            >
              <div className="absolute top-0 right-0 w-125 h-125 bg-linear-to-r from-orange-500/20 to-amber-500/20 blur-[100px] rounded-full pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-0 w-150 h-150 bg-linear-to-r from-orange-600/10 to-amber-600/10 blur-[120px] rounded-full pointer-events-none transform -translate-x-1/3 translate-y-1/3" />
              
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
                Our <span className="bg-linear-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">Enterprise AI</span> Delivery Process
              </h3>

              {/* Divider (neutral) */}
              <div className="w-14 h-px bg-white/30" />

              {/* Description */}
              <p className="text-lg text-gray-400 leading-relaxed">
                Taking AI from a local prototype to a secure, global enterprise deployment requires a fundamentally different engineering approach. Our delivery framework is built around security, data privacy, and zero-downtime integration with your legacy systems.
              </p>
            </motion.div>
          </div>

          {/* ================= RIGHT – TIMELINE ================= */}
          <div className="relative">
            <ul className="relative space-y-14">
              <div className="absolute left-7 top-7 bottom-7 w-px bg-white/10 hidden md:block" />
              
              {/* Animated fill line */}
              <motion.span
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="
                  absolute left-7 top-7
                  w-px bg-linear-to-b from-orange-500 to-transparent z-0
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
                    <div className="relative shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-black border border-white/10 flex items-center justify-center z-10 group-hover:border-orange-500/50 transition-colors duration-500">
                      <Icon size={22} className="text-gray-400 group-hover:text-orange-400 transition-colors duration-300" />
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
