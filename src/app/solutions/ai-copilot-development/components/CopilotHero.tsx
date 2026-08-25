"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, Workflow, Network, ShieldCheck, Cpu } from "lucide-react";

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
    <section className="relative min-h-[90vh] lg:min-h-screen w-full overflow-hidden font-sans flex flex-col justify-between pt-32 pb-12 lg:pt-40 lg:pb-16 bg-slate-950">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          src="/copilot-video/copilotpagebg-video.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        {/* Futuristic Glass & Dark Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/60 to-slate-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_50%,rgba(255,107,0,0.15),transparent_60%)]" />
        {/* Subtle grid overlay to enhance the high-tech terminal/grid vibe */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10 flex-grow flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* Left Content (65%) */}
          <div className="w-full lg:w-[65%] flex flex-col items-start text-left">

            {/* Eyebrow - Clear White Label */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.02)] mb-8"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-white uppercase">
                OFFSHORE COPILOT DEVELOPMENT SERVICES SINCE 2013
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.05] mb-8 w-full"
            >
              Your Offshore AI Delivery Partner <br />
              for <span className="bg-gradient-to-r from-[#FF6B00] via-[#FF8C33] to-[#FFA800] bg-clip-text text-transparent">
                Copilot
              </span>{" "}
              Development
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-slate-300 mb-12 max-w-2xl leading-relaxed font-normal"
            >
              Extend your delivery capacity with Softree's AI engineering team for custom AI copilots, AI agents, Microsoft Copilot Studio, Azure AI, and enterprise integrations.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto"
            >
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FF6B00] text-white border border-[#FF6B00] rounded-xl font-bold whitespace-nowrap shadow-[0_0_30px_rgba(255,107,0,0.3)] hover:bg-white hover:text-[#FF6B00] hover:border-white transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-[1.03]"
              >
                Talk to Our AI Experts
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>

          {/* Right Side (30%) - Empty space to let background video breathe */}
          <div className="hidden lg:block lg:w-[30%]" />

        </div>
      </div>

      {/* Feature Strip */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10 mt-12 lg:mt-20">
        <motion.div
          className="w-full bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.4)] py-6 px-6 md:px-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-6 gap-x-4 md:gap-0 md:divide-x md:divide-white/10 items-center">
            {features.map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center text-center px-2 md:px-4">
                <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                  {feature.icon}
                </div>
                <h4 className="text-xs sm:text-[13px] font-semibold text-white/95 leading-tight tracking-wide">{feature.title}</h4>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
