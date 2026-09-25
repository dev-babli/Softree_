"use client";

import React from "react";
import { motion } from "framer-motion";
import ParticleSphere from "./components/ParticleSphere";
import TrustStrip from "@/components/sections/TrustStrip";

// --- Exact Capability SVG Icons (High Clarity & Definition) ---
const AgenticAiIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="softree-agentic-flow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF8A00" />
        <stop offset="100%" stopColor="#FF3E00" />
      </linearGradient>
    </defs>
    {/* Autonomous execution loop */}
    <path
      d="M12 3a9 9 0 1 1-6.36 2.64"
      stroke="url(#softree-agentic-flow)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path d="M5.5 2v3.8h3.8" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

    {/* Satellite capability nodes (Tools, Memory, Perception) */}
    <circle cx="20.5" cy="9.5" r="1.8" fill="#FFA34D" />
    <circle cx="14" cy="20.8" r="1.8" fill="#FFA34D" />
    <circle cx="4.5" cy="15.5" r="1.8" fill="#FFA34D" />

    {/* Central Autonomous Core Spark */}
    <path
      d="M12 6.5L13.6 10.4L17.5 12L13.6 13.6L12 17.5L10.4 13.6L6.5 12L10.4 10.4L12 6.5Z"
      fill="url(#softree-agentic-flow)"
    />
    <circle cx="12" cy="12" r="1.6" fill="#FFFFFF" />
  </svg>
);

const AiAgentsIcon = () => (
  <svg viewBox="0 0 20 20" className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="2.8" r="1.5" fill="#FF6B00" />
    <path d="M10 4.3v2" stroke="#FF6B00" strokeWidth="1.8" strokeLinecap="round" />
    <rect x="3" y="6.3" width="14" height="10.4" rx="3.2" fill="#FF6B00" fillOpacity="0.28" stroke="#FF6B00" strokeWidth="1.8" />
    <rect x="5.8" y="9.4" width="8.4" height="3.2" rx="1.6" fill="#FFA34D" />
    <circle cx="8" cy="11" r="1" fill="#FFFFFF" />
    <circle cx="12" cy="11" r="1" fill="#FFFFFF" />
    <path d="M1.8 10.5h1.2M17 10.5h1.2" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CopilotsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17.533 1.829A2.528 2.528 0 0015.11 0h-.737a2.531 2.531 0 00-2.484 2.087l-1.263 6.937.314-1.08a2.528 2.528 0 012.424-1.833h4.284l1.797.706 1.731-.706h-.505a2.528 2.528 0 01-2.423-1.829l-.715-2.453z"
      fill="url(#softree-copilot-0)"
      transform="translate(0 1)"
    />
    <path
      d="M6.726 20.16A2.528 2.528 0 009.152 22h1.566c1.37 0 2.49-1.1 2.525-2.48l.17-6.69-.357 1.228a2.528 2.528 0 01-2.423 1.83h-4.32l-1.54-.842-1.667.843h.497c1.124 0 2.113.75 2.426 1.84l.697 2.432z"
      fill="url(#softree-copilot-1)"
      transform="translate(0 1)"
    />
    <path
      d="M15 0H6.252c-2.5 0-4 3.331-5 6.662-1.184 3.947-2.734 9.225 1.75 9.225H6.78c1.13 0 2.12-.753 2.43-1.847.657-2.317 1.809-6.359 2.713-9.436.46-1.563.842-2.906 1.43-3.742A1.97 1.97 0 0115 0"
      fill="url(#softree-copilot-2)"
      transform="translate(0 1)"
    />
    <path
      d="M9 22h8.749c2.5 0 4-3.332 5-6.663 1.184-3.948 2.734-9.227-1.75-9.227H17.22c-1.129 0-2.12.754-2.43 1.848a1149.2 1149.2 0 01-2.713 9.437c-.46 1.564-.842 2.907-1.43 3.743A1.97 1.97 0 019 22"
      fill="url(#softree-copilot-4)"
      transform="translate(0 1)"
    />
    <defs>
      <radialGradient
        id="softree-copilot-0"
        cx="85.44%"
        cy="100.653%"
        fx="85.44%"
        fy="100.653%"
        gradientTransform="scale(-.8553 -1) rotate(50.927 2.041 -1.946)"
        r="105.116%"
      >
        <stop offset="9.6%" stopColor="#00AEFF" />
        <stop offset="77.3%" stopColor="#2253CE" />
        <stop offset="100%" stopColor="#0736C4" />
      </radialGradient>
      <radialGradient
        id="softree-copilot-1"
        cx="18.143%"
        cy="32.928%"
        fx="18.143%"
        fy="32.928%"
        gradientTransform="scale(.8897 1) rotate(52.069 .193 .352)"
        r="95.612%"
      >
        <stop offset="0%" stopColor="#FFB657" />
        <stop offset="63.4%" stopColor="#FF5F3D" />
        <stop offset="92.3%" stopColor="#C02B3C" />
      </radialGradient>
      <linearGradient id="softree-copilot-2" x1="39.465%" y1="12.117%" x2="46.884%" y2="103.774%">
        <stop offset="15.6%" stopColor="#0D91E1" />
        <stop offset="48.7%" stopColor="#52B471" />
        <stop offset="65.2%" stopColor="#98BD42" />
        <stop offset="93.7%" stopColor="#FFC800" />
      </linearGradient>
      <radialGradient
        id="softree-copilot-4"
        cx="82.987%"
        cy="-9.792%"
        fx="82.987%"
        fy="-9.792%"
        gradientTransform="scale(-1 -.9441) rotate(-70.872 .142 1.17)"
        r="140.622%"
      >
        <stop offset="6.6%" stopColor="#8C48FF" />
        <stop offset="50%" stopColor="#F2598A" />
        <stop offset="89.6%" stopColor="#FFB152" />
      </radialGradient>
    </defs>
  </svg>
);

const RagIcon = () => (
  <svg viewBox="0 0 20 20" className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="8" cy="5" rx="5.5" ry="2" fill="#FF6B00" fillOpacity="0.3" stroke="#FF6B00" strokeWidth="1.6" />
    <path d="M2.5 5v3.5c0 1.1 2.5 2 5.5 2s5.5-.9 5.5-2V5" stroke="#FF6B00" strokeWidth="1.6" />
    <path d="M2.5 8.5v3.5c0 1.1 2.5 2 5.5 2 1.2 0 2.4-.2 3.3-.5" stroke="#FF6B00" strokeWidth="1.6" />
    <circle cx="13.5" cy="13.5" r="3" fill="#18181B" stroke="#FFA34D" strokeWidth="1.8" />
    <path d="M15.8 15.8L18 18" stroke="#FFA34D" strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="13.5" cy="13.5" r="1.2" fill="#FF6B00" />
  </svg>
);

const IntelligentAutomationIcon = () => (
  <svg viewBox="0 0 20 20" className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.5 2L4 11h5.5l-1.5 7 8-9.5h-5.5l1-6.5z"
      fill="#FF6B00"
      stroke="#FFA34D"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </svg>
);

const MicrosoftAiIcon = () => (
  <svg viewBox="0 0 20 20" className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="7.2" height="7.2" rx="0.8" fill="#F25022" />
    <rect x="10.8" y="2" width="7.2" height="7.2" rx="0.8" fill="#7FBA00" />
    <rect x="2" y="10.8" width="7.2" height="7.2" rx="0.8" fill="#00A4EF" />
    <rect x="10.8" y="10.8" width="7.2" height="7.2" rx="0.8" fill="#FFB900" />
  </svg>
);

const AwsAiIcon = () => (
  <svg viewBox="0 0 24 16" className="w-[20px] h-[14px] shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.2 4.2h1.6l2 7.2H6.3l-.4-1.6H3.7l-.4 1.6H1.8l2.4-7.2zm1.4 4.4L4.9 5.8 4.2 8.6h1.4z" fill="#FFFFFF" />
    <path d="M8.2 4.2h1.5l1 4.5 1.1-4.5h1.3l1.1 4.5 1-4.5h1.5l-1.7 7.2h-1.5l-1.1-4.4-1.1 4.4H9.9L8.2 4.2z" fill="#FFFFFF" />
    <path d="M19.8 6.4c-.4-.4-1-.7-1.7-.7-.8 0-1.3.4-1.3.9 0 .5.4.8 1.2 1 1.4.4 2.2 1 2.2 2.2 0 1.2-1 2-2.4 2-1 0-1.8-.4-2.4-1l.9-1.1c.4.4.9.7 1.5.7.7 0 1.1-.3 1.1-.8 0-.5-.4-.8-1.2-1-1.4-.4-2.2-1-2.2-2.1 0-1.2 1-2 2.4-2 .8 0 1.6.3 2.1.8l-.8 1.1z" fill="#FFFFFF" />
    <path d="M21 13.2c-4.2 2.2-10 2.2-14.5-.2-.3-.2-.5-.1-.6.2-.1.3.1.6.3.7 4.9 2.5 11.2 2.5 15.7 0 .3-.2.3-.5.1-.7-.2-.2-.6-.2-.9 0z" fill="#FF9900" />
    <path d="M22.5 12l-2.6 2.1c-.2.2-.6.1-.7-.2-.1-.2 0-.5.2-.7l1.7-1.3-2.1-.4c-.3-.1-.5-.4-.4-.7.1-.3.4-.5.7-.4l3.1.6c.3.1.4.4.3.7z" fill="#FF9900" />
  </svg>
);

const capabilities = [
  { title: "Agentic AI", icon: AgenticAiIcon },
  { title: "AI Agents", icon: AiAgentsIcon },
  { title: "Copilots", icon: CopilotsIcon },
  { title: "RAG", icon: RagIcon },
  { title: "Intelligent Automation", icon: IntelligentAutomationIcon },
  { title: "Microsoft AI", icon: MicrosoftAiIcon },
  { title: "AWS AI", icon: AwsAiIcon },
];

export const WovenLightHero = () => {
  return (
    <section className="relative w-full min-h-screen bg-[#050505] text-white overflow-hidden flex flex-col justify-between pt-24 sm:pt-28 lg:pt-32 pb-8">
      {/* 3D Interactive Particle Sphere Background - FULL SCREEN */}
      <div className="absolute inset-0 w-full h-full pointer-events-auto z-0">
        <ParticleSphere />
      </div>

      {/* Ambient background vignette to guarantee text legibility */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(5,5,5,0.7)_65%,#050505_100%)] z-[1]" />

      {/* ======================================================== */}
      {/* LEFT-RIGHT TEXT CONTENT OVER FULL GLOBE BACKGROUND       */}
      {/* ======================================================== */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex-1 flex items-center my-auto py-8 lg:py-16 pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          
          {/* LEFT: Eyebrow + Main Title */}
          <div className="lg:col-span-7 flex flex-col items-start text-left pointer-events-auto">
            {/* Eyebrow Pill */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 sm:px-5 py-2 typo-caption text-[#FF6B00] backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(255,107,0,0.15)]"
            >
              <span className="h-2 w-2 rounded-full bg-[#FF6B00] shadow-[0_0_8px_#FF6B00] animate-pulse" />
              <span className="tracking-wider uppercase font-semibold">BUILD AI. SCALE FASTER.</span>
            </motion.div>

            {/* Main Title (Left) */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="leading-[1.08] tracking-tight flex flex-col items-start text-left select-none max-w-2xl"
            >
              <span className="text-white text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
                Your Offshore{" "}
                <span className="text-[#FF6B00] drop-shadow-[0_0_35px_rgba(255,107,0,0.45)] inline-block">
                  Agentic AI
                </span>
              </span>
              <span className="text-white text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] mt-1 sm:mt-2">
                Engineering Partner
              </span>
            </motion.h1>
          </div>

          {/* RIGHT: Description + Capability Pills */}
          <div className="lg:col-span-5 flex flex-col items-start text-left justify-center lg:pl-4 space-y-6 pointer-events-auto">
            {/* Description (Right) */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-slate-200 typo-body-lg sm:text-lg lg:text-xl font-normal leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]"
            >
              Build, deploy, and scale AI agents with a dedicated offshore engineering team — under your brand or as an extension of your team.
            </motion.p>

            {/* Capability Pill Badges (Right) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center justify-start gap-2 sm:gap-2.5"
            >
              {capabilities.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="group inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4.5 py-1.5 sm:py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 hover:border-[#FF6B00]/70 backdrop-blur-md typo-caption-meta text-white shadow-sm hover:shadow-[0_0_15px_rgba(255,107,0,0.35)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 select-none cursor-default"
                  >
                    <Icon />
                    <span className="tracking-wide text-white/90 group-hover:text-white font-medium text-xs sm:text-sm">
                      {item.title}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </div>

        </div>
      </div>

      {/* ======================================================== */}
      {/* BOTTOM TRUST STRIP */}
      {/* ======================================================== */}
      <div className="relative z-20 w-full shrink-0 pt-4">
        <TrustStrip theme="dark" />
      </div>
    </section>
  );
};

export default WovenLightHero;
