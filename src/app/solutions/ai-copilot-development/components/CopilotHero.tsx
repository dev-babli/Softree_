"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, Workflow, Network, ShieldCheck, Cpu } from "lucide-react";
import { CopilotIllustration } from "./CopilotIllustration";

const features = [
  {
    icon: <MessageSquare className="w-5 h-5 text-[#FF6B00]" />,
    title: "Conversational Experiences",
  },
  {
    icon: <Workflow className="w-5 h-5 text-[#FF6B00]" />,
    title: "Workflow Automation",
  },
  {
    icon: <Network className="w-5 h-5 text-[#FF6B00]" />,
    title: "Enterprise Integration",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-[#FF6B00]" />,
    title: "Secure by Design",
  },
  {
    icon: <Cpu className="w-5 h-5 text-[#FF6B00]" />,
    title: "Scalable Architecture",
  },
];

export function CopilotHero() {
  return (
    <section className="relative min-h-[95vh] w-full bg-gradient-to-b from-zinc-50 via-white to-zinc-50 overflow-hidden font-sans pt-32 pb-12 lg:pt-40 lg:pb-24 flex flex-col lg:justify-center">


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

          {/* Left Content (45%) */}
          <motion.div
            className="w-full lg:w-[45%] flex flex-col items-center lg:items-start text-center lg:text-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-2xl md:rounded-full bg-white border border-[#FF6B00]/30 shadow-[0_0_15px_rgba(255,107,0,0.1)] mb-6 md:mb-8 max-w-full">
              <div className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse flex-shrink-0" />
              <span className="text-[9px] sm:text-[10px] md:text-[11px] font-bold tracking-[0.1em] sm:tracking-widest text-gray-800 uppercase leading-snug break-words">
                CUSTOM AI COPILOTS • MICROSOFT AI • ENTERPRISE READY
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
              Enterprise AI <br />
              <span className="text-[#FF6B00]">
                Copilot
              </span>{" "}
              Development
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg text-gray-600 mb-8 md:mb-10 max-w-2xl leading-relaxed">
              Build secure, intelligent AI copilots that empower employees, automate business processes, enhance customer experiences, and seamlessly integrate with Microsoft 365, Dynamics 365, SharePoint, Power Platform, and enterprise applications.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full justify-center lg:justify-start">
              <Link 
                href="/contact"
                className="cursor-pointer inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#FF6B00] text-white border-2 border-[#FF6B00] rounded-xl font-semibold whitespace-nowrap shadow-[0_8px_20px_rgba(255,107,0,0.3)] hover:shadow-[0_8px_25px_rgba(255,107,0,0.4)] hover:bg-white hover:text-[#FF6B00] hover:-translate-y-0.5 transition-all duration-300"
              >
                Talk to Our AI Experts
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>


          </motion.div>

          {/* Right Illustration (55%) */}
          <motion.div
            className="w-full lg:w-[55%] flex items-center justify-center relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="w-full max-w-[85%] xl:max-w-[80%] mx-auto">
              <CopilotIllustration />
            </div>
          </motion.div>

        </div>

        {/* Feature Strip */}
        <motion.div
          className="mt-16 md:mt-24 w-full bg-white rounded-[24px] md:rounded-3xl border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.04)] py-6 md:py-4 px-4 md:px-8 relative z-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex flex-wrap justify-center gap-y-8 gap-x-4 lg:gap-0 lg:grid lg:grid-cols-5 lg:divide-x lg:divide-orange-100">
            {features.map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center text-center px-2 lg:px-4 w-[45%] sm:w-[30%] lg:w-auto">
                <div className="w-9 h-9 rounded-2xl bg-orange-50 flex items-center justify-center mb-2 lg:mb-3">
                  {feature.icon}
                </div>
                <h4 className="text-[13px] md:text-sm font-bold text-gray-900 leading-tight">{feature.title}</h4>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
