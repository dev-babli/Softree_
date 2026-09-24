"use client";

import React from "react";
import GatewayFlow from "@/components/ui/gateway-flow";
import { Activity } from "lucide-react";

import { motion } from "framer-motion";
import TrustStrip from "@/components/sections/TrustStrip";

export default function Hero() {
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
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-[2cm] flex flex-col items-center justify-center text-center flex-1 py-10 sm:py-16 mt-4 sm:mt-8">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 sm:mb-8 max-w-full"
        >
          <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF6B2C] shrink-0" />
          <span className="typo-caption text-[#FF6B2C] truncate">
            AMAZON NOVA 2 SONIC DEVELOPMENT
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="typo-title text-white tracking-tight leading-[1.15] max-w-6xl mb-4 sm:mb-6"
        >
          <span className="block">Build Real-Time Voice AI</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500 mt-1">
            With Your Offshore Team
          </span>
        </motion.h1>

        {/* Subtitle description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl flex flex-col items-center space-y-4"
        >
          <p className="typo-description text-white">
            Build production-ready voice AI agents using Amazon Nova 2 Sonic, Amazon Bedrock and your offshore engineering team.
          </p>

        </motion.div>

      </div>
      {/* Trust Strip anchored to bottom */}
      <div className="relative w-full z-20 pb-8 sm:pb-10 mt-auto">
        <TrustStrip theme="dark" />
      </div>
    </section>
  );
}
