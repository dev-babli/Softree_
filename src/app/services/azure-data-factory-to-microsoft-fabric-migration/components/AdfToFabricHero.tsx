"use client";
import React from 'react';
import TrustStrip from "@/components/sections/TrustStrip";
import { BarsWave } from "@/components/ui/barswave";
import { motion } from "framer-motion";

const AdfToFabricHero = () => {
  return (
    <>
      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          .gradient-text {
            background: linear-gradient(270deg, #FF5812, #FF8A50, #f59e0b, #FF5812);
            background-size: 600% 600%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradient 12s ease infinite;
          }

          @keyframes dotPulse {
            0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 10px rgba(255,88,18,0.9); }
            50% { opacity: 0.5; transform: scale(0.8); box-shadow: 0 0 3px rgba(255,88,18,0.4); }
          }
          .eyebrow-dot {
            animation: dotPulse 2s ease-in-out infinite;
          }
        `}
      </style>
      
      <div className="min-h-screen flex flex-col justify-between items-center bg-[#060403] text-white font-sans overflow-hidden relative">
        {/* Animated Red-Orange Bars Wave Background - Reduced Height */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-85">
          <BarsWave
            barCount={16}
            minHeight={8}
            maxHeight={45}
            variant="gradient"
            animationDuration={2.6}
            className="w-full h-full"
          />
        </div>

        {/* Ambient Red-Orange Radial Glow behind text */}
        <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[480px] w-[700px] rounded-full bg-gradient-to-r from-[#DC2626]/15 via-[#FF5812]/20 to-[#FFA066]/15 blur-[140px] z-[1]" />

        {/* Top & Bottom Vignette Overlays for Maximum Contrast & Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060403] via-transparent to-[#060403]/70 z-[2] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060403]/60 via-transparent to-[#060403]/60 z-[2] pointer-events-none" />

        {/* Hero Content Container (Positioned from top below navbar) */}
        <div className="container max-w-6xl text-center z-10 relative px-6 pt-28 sm:pt-32 pb-4 flex-1 flex flex-col justify-start items-center pointer-events-auto">
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 bg-[#FF5812]/10 border border-[#FF5812]/35 text-[#FF5812] typo-caption px-4 py-1.5 rounded-full mb-5 shadow-[0_0_20px_-4px_rgba(255,88,18,0.3)] backdrop-blur-sm"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF5812] eyebrow-dot" />
            AZURE DATA FACTORY TO MICROSOFT FABRIC MIGRATION
          </motion.div>

          {/* Heading - 3 Lines, Reduced Font Size & Compact Width */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="typo-heading-2 max-w-4xl mx-auto m-0 relative z-20 text-white font-extrabold tracking-tight leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
          >
            <span className="block">Migrate Azure Data Factory To</span>
            <span className="block">Microsoft Fabric,</span>
            <span className="gradient-text inline-block relative z-10 [text-shadow:none] mt-1">
              With Offshore Data Engineers
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 typo-description max-w-3xl mx-auto text-zinc-300 relative z-20 leading-relaxed"
          >
            Seamlessly modernize legacy Azure Data Factory (ADF) pipelines, SSIS packages, ADLS Gen2 data lakes, and Synapse workloads into unified Microsoft Fabric Data Factory, OneLake, and Spark Lakehouses.
          </motion.p>
        </div>

        {/* Trust Strip - Stuck Directly to Bottom Border */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3 }}
          className="w-full relative z-20 pb-0 px-4 sm:px-6 mt-auto max-w-7xl mx-auto [&>div]:!mt-0 [&>div]:!gap-3 sm:[&>div]:!gap-4"
        >
          <TrustStrip theme="dark" />
        </motion.div>

        {/* Subtle Bottom Glow Accent Line */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF5812]/50 to-transparent z-10" />
      </div>
    </>
  );
};

export default AdfToFabricHero;
