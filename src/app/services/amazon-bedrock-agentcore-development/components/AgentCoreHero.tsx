"use client";

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { FlowButton } from '@/components/ui/flow-button';

export default function AgentCoreHero() {
  const shouldReduceMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative w-full min-h-[100svh] bg-[#030303] overflow-hidden flex flex-col justify-center pt-28 pb-16 lg:pt-0 lg:pb-0">

      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle radial orange glow behind the visual */}
        <div className="absolute top-1/2 left-[75%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#FF5812]/[0.07] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/[0.01] rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center h-full max-w-[1400px]">

        {/* LEFT CONTENT */}
        <div className="flex flex-col items-start text-left pt-8 lg:pt-0 order-2 lg:order-1 z-20">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="typo-caption text-white/70 uppercase tracking-[0.15em] mb-6 flex items-center gap-3 font-semibold">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#FF5812]">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" />
                <path d="M12 2C12 2 16 7.5 16 12C16 16.5 12 22 12 22M12 2C12 2 8 7.5 8 12C8 16.5 12 22 12 22" stroke="currentColor" strokeWidth="2.5" />
                <path d="M2 12H22" stroke="currentColor" strokeWidth="2.5" />
              </svg>
              AMAZON BEDROCK AGENTCORE DEVELOPMENT
            </p>
          </motion.div>

          <motion.h1
            className="typo-title text-white mb-6 lg:mb-8 text-balance font-bold leading-[1.05] tracking-tight"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Your Offshore <br className="hidden sm:block" />
            <span className="text-[#FF5812]">Agentic AI</span> <br className="hidden sm:block" />
            Engineering Partner
          </motion.h1>

          <motion.p
            className="typo-description text-white/75 mb-10 max-w-lg lg:max-w-xl text-pretty leading-relaxed"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Build, deploy, and scale production-ready AI agents with a dedicated offshore engineering team.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <FlowButton href="/contact" text="Talk to Our AI Team" variant="orange-filled" className="typo-button-lg px-8 py-4 lg:py-5 min-w-[220px] rounded-full shadow-[0_0_20px_rgba(255,88,18,0.25)] hover:shadow-[0_0_35px_rgba(255,88,18,0.45)] transition-shadow duration-300" />
          </motion.div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="relative flex items-center justify-center min-h-[450px] sm:min-h-[550px] lg:min-h-[750px] order-1 lg:order-2 w-full z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[600px] h-full flex flex-col items-center justify-center"
          >

            {/* Background technical arcs */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
              <div className="w-[120%] h-[120%] rounded-full border-[1px] border-dashed border-[#FF5812]/30" style={{ transform: "rotateX(60deg) rotateY(10deg)" }} />
              <div className="absolute w-[100%] h-[100%] rounded-full border-[1px] border-[#FF5812]/10" style={{ transform: "rotateX(60deg) rotateY(10deg)" }} />
            </div>

            {/* Particles field */}
            {isMounted && !shouldReduceMotion && (
              <div className="absolute inset-[-20%] z-0 pointer-events-none" aria-hidden="true">
                {[...Array(24)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: Math.random() * 2 + 1 + 'px',
                      height: Math.random() * 2 + 1 + 'px',
                      backgroundColor: Math.random() > 0.7 ? '#ffffff' : '#FF5812',
                      top: Math.random() * 100 + '%',
                      left: Math.random() * 100 + '%',
                      boxShadow: `0 0 ${Math.random() * 6 + 2}px ${Math.random() > 0.7 ? '#ffffff' : '#FF5812'}`
                    }}
                    animate={{
                      y: [0, Math.random() * -30 - 10, 0],
                      opacity: [0, 0.6, 0],
                    }}
                    transition={{
                      duration: Math.random() * 5 + 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: Math.random() * 4
                    }}
                  />
                ))}
              </div>
            )}

            {/* 3D Base Platforms */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-32 perspective-[1000px] z-0">
              {/* Outer Base Layer */}
              <div className="w-[280px] sm:w-[380px] h-[280px] sm:h-[380px] rounded-[40px] border border-[#FF5812]/20 bg-[#0a0a0a]/80 shadow-[0_0_40px_rgba(255,88,18,0.1)]" style={{ transform: "rotateX(65deg) rotateZ(45deg)" }}>
                <div className="absolute inset-0 rounded-[40px] border-[2px] border-b-[#FF5812]/60 border-r-[#FF5812]/60 border-t-transparent border-l-transparent" />
              </div>
              {/* Inner Base Layer */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[220px] sm:w-[300px] h-[220px] sm:h-[300px] rounded-[30px] border border-[#FF5812]/40 bg-[#0f0f0f] shadow-[0_0_50px_rgba(255,88,18,0.2)]" style={{ transform: "rotateX(65deg) rotateZ(45deg)" }}>
                <div className="absolute inset-0 rounded-[30px] border-[3px] border-b-[#FF5812] border-r-[#FF5812] border-t-transparent border-l-transparent opacity-80" />
              </div>
            </div>

            {/* Central Device (The Core) */}
            <motion.div
              className="relative z-10 w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] bg-gradient-to-b from-[#141416] to-[#070708] rounded-3xl sm:rounded-[32px] border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.8),_0_0_30px_rgba(255,88,18,0.15)] flex items-center justify-center overflow-hidden mb-16"
              animate={shouldReduceMotion ? {} : {
                boxShadow: [
                  "0 20px 50px rgba(0,0,0,0.8), 0 0 25px rgba(255,88,18,0.15)",
                  "0 20px 50px rgba(0,0,0,0.8), 0 0 45px rgba(255,88,18,0.35)",
                  "0 20px 50px rgba(0,0,0,0.8), 0 0 25px rgba(255,88,18,0.15)"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Device Inner Glow / Edge Highlight */}
              <div className="absolute inset-0 rounded-3xl sm:rounded-[32px] border-[2px] border-[#FF5812]/20 pointer-events-none" />

              {/* BOTTOM TO TOP CONTINUOUS ORANGE LIGHT SCANNER */}
              {!shouldReduceMotion && (
                <motion.div
                  className="absolute inset-x-0 h-[150px] pointer-events-none z-20"
                  style={{
                    background: "linear-gradient(to top, transparent 0%, rgba(255,88,18,0.1) 40%, rgba(255,88,18,0.6) 80%, rgba(255,255,255,0.8) 95%, transparent 100%)",
                    filter: "blur(4px)"
                  }}
                  animate={{ top: ['120%', '-50%'] }}
                  transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
                />
              )}

              {/* Secondary subtle light sweep for extra complexity */}
              {!shouldReduceMotion && (
                <motion.div
                  className="absolute inset-x-0 h-[80px] pointer-events-none z-20 opacity-50"
                  style={{
                    background: "linear-gradient(to top, transparent, rgba(255,88,18,0.8), transparent)",
                    filter: "blur(8px)"
                  }}
                  animate={{ top: ['140%', '-40%'] }}
                  transition={{ duration: 7, ease: "easeInOut", repeat: Infinity, delay: 0.5 }}
                />
              )}

              {/* Amazon Bedrock Logo */}
              <div className="relative z-10 w-[110px] h-[110px] sm:w-[150px] sm:h-[150px] rounded-full overflow-hidden flex items-center justify-center bg-black/40 backdrop-blur-sm border border-white/10">
                <Image
                  src="/assets/amazon-bedrock-logo.png"
                  alt="Amazon Bedrock AgentCore Logo"
                  fill
                  className="object-cover opacity-90"
                  priority
                />
              </div>
            </motion.div>

            {/* FLOATING FOUNDATION MODEL BADGES */}
            <div className="absolute inset-0 pointer-events-none z-20">

              {/* Claude Badge */}
              <motion.div
                className="absolute top-[10%] left-[10%] sm:left-[15%] flex flex-col items-center justify-center gap-1.5 bg-[#1a1a1c] border border-white/10 rounded-2xl p-2.5 sm:p-3 shadow-xl backdrop-blur-md"
                animate={shouldReduceMotion ? {} : { y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0 }}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#FFD2A8] rounded-lg flex items-center justify-center text-black font-bold text-sm sm:text-base">
                  AI
                </div>
                <span className="text-white/80 text-[10px] sm:text-xs font-medium">Claude</span>
              </motion.div>

              {/* Meta Llama Badge */}
              <motion.div
                className="absolute top-[5%] right-[5%] sm:right-[10%] flex flex-col items-center justify-center gap-1.5 bg-[#1a1a1c] border border-white/10 rounded-2xl p-2.5 sm:p-3 shadow-xl backdrop-blur-md"
                animate={shouldReduceMotion ? {} : { y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center text-blue-600 font-bold text-lg sm:text-xl">
                  ∞
                </div>
                <span className="text-white/80 text-[10px] sm:text-xs font-medium">Llama</span>
              </motion.div>

              {/* Amazon Titan Badge */}
              <motion.div
                className="absolute top-[45%] left-[2%] sm:left-[5%] flex flex-col items-center justify-center gap-1.5 bg-[#1a1a1c] border border-white/10 rounded-2xl p-2.5 sm:p-3 shadow-xl backdrop-blur-md"
                animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center text-black font-bold text-sm sm:text-base">
                  AI
                </div>
                <span className="text-white/80 text-[10px] sm:text-xs font-medium">Titan</span>
              </motion.div>

              {/* Mistral Badge */}
              <motion.div
                className="absolute top-[40%] right-[2%] sm:right-[5%] flex flex-col items-center justify-center gap-1.5 bg-[#1a1a1c] border border-white/10 rounded-2xl p-2.5 sm:p-3 shadow-xl backdrop-blur-md"
                animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center text-orange-500 font-bold text-lg sm:text-xl font-serif">
                  M
                </div>
                <span className="text-white/80 text-[10px] sm:text-xs font-medium">Mistral</span>
              </motion.div>

            </div>

          </motion.div>
        </div>
      </div>

    </section>
  );
}
