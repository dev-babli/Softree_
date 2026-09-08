"use client";

import React from "react";
import GatewayFlow from "@/components/ui/gateway-flow";
import { ArrowRight, Activity, Shield, Users, Cpu, Sparkles, Calendar } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FlowButton } from "@/components/ui/flow-button";

const heroFeatures = [
  {
    title: "WHITE-LABEL",
    description: "Trusted agency partner.",
    icon: Shield,
  },
  {
    title: "OFFSHORE TEAMS",
    description: "Scale on demand.",
    icon: Users,
  },
  {
    title: "MICROSOFT AI",
    description: "Azure & OpenAI partners.",
    icon: Cpu,
  },
  {
    title: "ENTERPRISE AI",
    description: "Secure, production-grade.",
    icon: Sparkles,
  },
  {
    title: "SINCE 2013",
    description: "13+ years of excellence.",
    icon: Calendar,
  },
];

export default function GatewayFlowHero() {
  return (
    <section className="relative w-full min-h-[100svh] py-12 md:py-20 overflow-hidden bg-black flex flex-col justify-center pt-[90px] md:pt-[70px]">
      {/* Background Effect: Orange filtered GatewayFlow */}
      <GatewayFlow 
        className="absolute inset-0 w-full h-full z-0 opacity-80 pointer-events-none" 
        density={1.5}
        speed={1.2}
        style={{ filter: 'sepia(1) saturate(8) hue-rotate(-15deg)' }}
      />

      {/* Overlay Content */}
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-[2cm] flex flex-col items-center justify-center text-center">
       
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 sm:mb-8 max-w-full"
        >
          <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF6B2C] shrink-0" />
          <span className="text-[11px] sm:text-xs md:text-sm font-bold tracking-wider sm:tracking-widest text-[#FF6B2C] uppercase truncate">
            OFFSHORE AI HEALTHCARE ENGINEERING SERVICES
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-6xl font-extrabold text-white tracking-tight leading-[1.15] max-w-6xl mb-4 sm:mb-6 font-['Plus_Jakarta_Sans',sans-serif]"
        >
          <span className="block">Build Smarter Healthcare With&nbsp;an</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500 mt-1">
            Offshore AI Engineering Team
          </span>
        </motion.h1>

        {/* Subheading & Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mb-8 sm:mb-12 space-y-3 sm:space-y-4"
        >
          <p className="text-base sm:text-lg md:text-xl text-white font-medium leading-relaxed">
            Design, develop, and scale secure AI solutions for healthcare with dedicated offshore AI engineers, data specialists, and automation experts.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-center justify-center w-full sm:w-auto"
        >
          <FlowButton
            href="/contact"
            text="Build Your Offshore AI Team"
            variant="orange-filled"
            className="w-full sm:w-auto text-sm sm:text-base py-4 px-8"
          />
         
          <FlowButton
            href="/contact"
            text="Talk to an AI Expert"
            variant="white"
            className="w-full sm:w-auto text-sm sm:text-base py-4 px-8"
          />
        </motion.div>

        {/* 5 Key Highlights / Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="w-full max-w-7xl mx-auto mt-12 sm:mt-16 flex flex-wrap items-center justify-center lg:justify-between gap-6 lg:gap-4 text-left"
        >
          {heroFeatures.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group flex items-center gap-3.5 shrink-0 transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#FF6B2C] flex items-center justify-center shrink-0 bg-transparent text-[#FF6B2C] transition-all duration-300 group-hover:border-orange-400 group-hover:shadow-[0_0_15px_rgba(255,107,44,0.25)]">
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-white font-bold text-xs sm:text-[13px] md:text-sm tracking-wider uppercase leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-white/60 text-[11px] sm:text-xs leading-normal mt-0.5 whitespace-nowrap">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}