"use client";

import React from "react";
import GatewayFlow from "@/components/ui/gateway-flow";
import { Activity } from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";
import { motion } from "framer-motion";
import TrustStrip from "@/components/sections/TrustStrip";

export default function HealthcareTestingHero() {
  return (
    <section className="relative w-full min-h-[100svh] overflow-hidden bg-black flex flex-col pt-[90px] md:pt-[70px]">
      {/* Background Effect: Orange filtered GatewayFlow */}
      <GatewayFlow
        className="absolute inset-0 w-full h-full z-0 opacity-80 pointer-events-none"
        density={1.5}
        speed={1.2}
        style={{ filter: 'sepia(1) saturate(8) hue-rotate(-15deg)' }}
      />

      {/* Overlay Content */}
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-[2cm] flex-1 flex flex-col items-center justify-center text-center pb-12 sm:pb-16">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center mt-4 gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 sm:mb-8 max-w-full"
        >
          <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF6B2C] shrink-0" />
          <span className="typo-caption text-[#FF6B2C] truncate">
            Healthcare Testing Services
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="typo-title text-white tracking-tight leading-[1.15] max-w-6xl mb-4 sm:mb-6"
        >
          <span className="block">Your Offshore Healthcare</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500 mt-1">
            Software Testing & QA Partner
          </span>
        </motion.h1>

        {/* Subtitle description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl flex flex-col items-center space-y-4"
        >
          <p className="typo-description text-white mb-0">
            Ensure the quality, security, performance, and reliability of healthcare applications with an offshore testing team experienced in healthcare software, test automation, interoperability, compliance, and digital health platforms.
          </p>
          {/* <div className="pt-4 sm:pt-6">
            <FlowButton
              href="/contact"
              text="Talk to Our Healthcare Testing Team"
              variant="orange-filled"
              className="typo-button-lg py-4 px-8 shadow-[0_0_20px_rgba(255,107,44,0.3)] hover:shadow-[0_0_30px_rgba(255,107,44,0.5)] transform hover:-translate-y-1"
            />
          </div> */}
        </motion.div>

      </div>
      {/* Trust Strip anchored to bottom */}
      <div className="relative w-full z-20 pb-4 sm:pb-6 mt-2">
        <TrustStrip theme="dark" />
      </div>
    </section>
  );
}
