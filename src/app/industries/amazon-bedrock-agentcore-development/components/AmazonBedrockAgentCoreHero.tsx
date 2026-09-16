"use client";

import React from "react";
import GatewayFlow from "@/components/ui/gateway-flow";
import { Activity } from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";
import { motion } from "framer-motion";
import TrustStrip from "@/components/sections/TrustStrip";

export default function AmazonBedrockAgentCoreHero() {
  return (
    <section className="relative w-full min-h-[100svh] overflow-hidden bg-black flex flex-col justify-center pt-[90px] md:pt-[70px] pb-10">
      {/* Background Effect: Orange filtered GatewayFlow */}
      <GatewayFlow
        className="absolute inset-0 w-full h-full z-0 opacity-80 pointer-events-none"
        density={1.5}
        speed={1.2}
        style={{ filter: 'sepia(1) saturate(8) hue-rotate(-15deg)' }}
      />

      {/* Overlay Content */}
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-[2cm] flex flex-col items-center text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md mb-6 sm:mb-8 w-full max-w-fit mx-auto"
        >
          <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF6B2C] shrink-0" />
          <span className="text-[10px] sm:text-xs md:text-sm font-bold tracking-wider sm:tracking-widest text-[#FF6B2C] uppercase text-center leading-snug break-words">
            AMAZON BEDROCK AGENTCORE DEVELOPMENT
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] xl:text-[54px] font-extrabold text-white tracking-tight leading-[1.2] sm:leading-[1.15] max-w-6xl mx-auto mb-4 sm:mb-6 font-['Plus_Jakarta_Sans',sans-serif]"
        >
          <span className="block">Build Production-Ready AI Agents</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500 mt-1 sm:mt-2">
            With Your Offshore Engineering Partner
          </span>
        </motion.h1>

        {/* Subtitle description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl flex flex-col items-center space-y-4"
        >
          <p className="text-base sm:text-lg md:text-xl text-white font-medium leading-relaxed">
            Build, deploy and operate AI agents that can reason, use tools, access enterprise data and take real business actions.
          </p>
          <div className="pt-4 sm:pt-6">
            <FlowButton
              href="/contact"
              text="BUILD YOUR AI AGENT"
              variant="orange-filled"
              className="py-4 px-8 text-sm sm:text-base font-bold shadow-[0_0_20px_rgba(255,107,44,0.3)] hover:shadow-[0_0_30px_rgba(255,107,44,0.5)] transform hover:-translate-y-1"
            />
          </div>
        </motion.div>

      </div>
      {/* Trust Strip anchored below content */}
      <div className="relative z-20 w-full px-4 sm:px-6 lg:px-[2cm] mt-4 md:mt-8">
        <TrustStrip theme="dark" />
      </div>
    </section>
  );
}
