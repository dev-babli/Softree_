"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, Zap, Database, Code2 } from "lucide-react";
import createGlobe from "cobe";
import TrustStrip from "@/components/sections/TrustStrip";

// Microsoft 4-squares icon
function MicrosoftIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M1 1h10v10H1zM13 1h10v10H13zM1 13h10v10H1zM13 13h10v10H13z" />
    </svg>
  );
}

// Brain / AI icon
function BrainAiIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04" />
      <path d="M3 13h2M19 13h2M6 8h2M16 8h2M6 18h2M16 18h2" />
    </svg>
  );
}

// Agentic AI crosshair star icon
function AgenticAiIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="8.5" stroke="#f97316" strokeWidth="1.8" />
      <path d="M12 4v3M12 17v3M4 12h3M17 12h3" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 8.5l1 2.2 2.2 1-2.2 1-1 2.2-1-2.2-2.2-1 2.2-1 1-2.2z" fill="#f97316" />
    </svg>
  );
}

// Official Microsoft Copilot logo SVG
function CopilotIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <path
        d="M34.142 7.325A4.63 4.63 0 0029.7 4H28.35a4.63 4.63 0 00-4.554 3.794L21.48 20.407l.575-1.965a4.63 4.63 0 014.444-3.33h7.853l3.294 1.282 3.175-1.283h-.926a4.63 4.63 0 01-4.443-3.325l-1.31-4.461z"
        fill="url(#copilot_radial_1)"
      />
      <path
        d="M14.33 40.656A4.63 4.63 0 0018.779 44h2.87a4.63 4.63 0 004.629-4.51l.312-12.163-.654 2.233a4.63 4.63 0 01-4.443 3.329h-7.919l-2.823-1.532-3.057 1.532h.912a4.63 4.63 0 014.447 3.344l1.279 4.423z"
        fill="url(#copilot_radial_2)"
      />
      <path
        d="M29.5 4H13.46c-4.583 0-7.332 6.057-9.165 12.113C2.123 23.29-.72 32.885 7.503 32.885h6.925a4.63 4.63 0 004.456-3.358 2078.617 2078.617 0 014.971-17.156c.843-2.843 1.544-5.284 2.621-6.805C27.08 4.714 28.086 4 29.5 4z"
        fill="url(#copilot_linear_1)"
      />
      <path
        d="M29.5 4H13.46c-4.583 0-7.332 6.057-9.165 12.113C2.123 23.29-.72 32.885 7.503 32.885h6.925a4.63 4.63 0 004.456-3.358 2078.617 2078.617 0 014.971-17.156c.843-2.843 1.544-5.284 2.621-6.805C27.08 4.714 28.086 4 29.5 4z"
        fill="url(#copilot_linear_2)"
      />
      <path
        d="M18.498 44h16.04c4.582 0 7.332-6.058 9.165-12.115 2.171-7.177 5.013-16.775-3.208-16.775h-6.926a4.63 4.63 0 00-4.455 3.358 2084.036 2084.036 0 01-4.972 17.16c-.842 2.843-1.544 5.285-2.62 6.806-.604.852-1.61 1.566-3.024 1.566z"
        fill="url(#copilot_radial_3)"
      />
      <path
        d="M18.498 44h16.04c4.582 0 7.332-6.058 9.165-12.115 2.171-7.177 5.013-16.775-3.208-16.775h-6.926a4.63 4.63 0 00-4.455 3.358 2084.036 2084.036 0 01-4.972 17.16c-.842 2.843-1.544 5.285-2.62 6.806-.604.852-1.61 1.566-3.024 1.566z"
        fill="url(#copilot_linear_3)"
      />
      <defs>
        <radialGradient id="copilot_radial_1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-10.96051 -13.38922 12.59013 -10.30637 38.005 20.514)">
          <stop offset=".096" stopColor="#00AEFF" />
          <stop offset=".773" stopColor="#2253CE" />
          <stop offset="1" stopColor="#0736C4" />
        </radialGradient>
        <radialGradient id="copilot_radial_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(51.84 -28.201 27.85) scale(15.9912 15.5119)">
          <stop stopColor="#FFB657" />
          <stop offset=".634" stopColor="#FF5F3D" />
          <stop offset=".923" stopColor="#C02B3C" />
        </radialGradient>
        <radialGradient id="copilot_radial_3" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(109.274 16.301 20.802) scale(38.3873 45.9867)">
          <stop offset=".066" stopColor="#8C48FF" />
          <stop offset=".5" stopColor="#F2598A" />
          <stop offset=".896" stopColor="#FFB152" />
        </radialGradient>
        <linearGradient id="copilot_linear_1" x1="12.5" y1="7.5" x2="14.788" y2="33.975" gradientUnits="userSpaceOnUse">
          <stop offset=".156" stopColor="#0D91E1" />
          <stop offset=".487" stopColor="#52B471" />
          <stop offset=".652" stopColor="#98BD42" />
          <stop offset=".937" stopColor="#FFC800" />
        </linearGradient>
        <linearGradient id="copilot_linear_2" x1="14.5" y1="4" x2="15.75" y2="32.885" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3DCBFF" />
          <stop offset=".247" stopColor="#0588F7" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="copilot_linear_3" x1="42.586" y1="13.346" x2="42.569" y2="21.215" gradientUnits="userSpaceOnUse">
          <stop offset=".058" stopColor="#F8ADFA" />
          <stop offset=".708" stopColor="#A86EDD" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// RAG Database + Search icon
function RagIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <ellipse cx="10" cy="5" rx="7" ry="2.5" />
      <path d="M3 5v8c0 1.38 3.13 2.5 7 2.5 1 0 1.95-.08 2.8-.23" />
      <path d="M3 9c0 1.38 3.13 2.5 7 2.5 1.1 0 2.14-.09 3.06-.26" />
      <circle cx="17.5" cy="16.5" r="3.5" />
      <path d="M20 19l2.5 2.5" />
    </svg>
  );
}

// Microsoft official 4-colors logo
function MicrosoftColorIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <rect x="2" y="2" width="9.2" height="9.2" fill="#F25022" />
      <rect x="12.8" y="2" width="9.2" height="9.2" fill="#7FBA00" />
      <rect x="2" y="12.8" width="9.2" height="9.2" fill="#00A4EF" />
      <rect x="12.8" y="12.8" width="9.2" height="9.2" fill="#FFB900" />
    </svg>
  );
}

// AWS official logo
function AwsIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fill="#ffffff" d="M8.2 11.2c0-.7-.3-1.1-1-1.1-.5 0-.9.3-1.1.7l-.9-.5C5.7 9.5 6.4 9 7.4 9c1.4 0 2 .8 2 2v3.7c0 .4.1.7.1.9H8.3c0-.2-.1-.5-.1-.7-.4.5-1 .8-1.7.8-1.2 0-2-.8-2-1.9 0-1.3.9-1.9 2.4-2l1.3-.1v-.5zm0 1.2l-1.1.1c-.8.1-1.3.4-1.3 1.1 0 .6.4 1 1.1 1 .8 0 1.3-.5 1.3-1.2v-1zM11.6 9.2h1.3l.8 3.5.9-3.5h1.3l.9 3.5.8-3.5h1.3l-1.4 5.4h-1.3l-.9-3.5-.9 3.5h-1.3L11.6 9.2zM21.5 10.7l-1 .4c-.2-.4-.6-.7-1.1-.7-.6 0-1 .4-1 .8 0 .6.4.8 1.4 1.1 1.4.4 2 1 2 2 0 1.3-1.1 2.2-2.5 2.2-1.3 0-2.2-.7-2.4-1.8l1.1-.4c.2.6.6 1 1.3 1 .7 0 1.2-.4 1.2-1 0-.6-.4-.8-1.3-1.1-1.5-.4-2.1-1.1-2.1-2 0-1.2 1-2.1 2.3-2.1 1.1 0 1.8.5 2.1 1.6z" />
      <path fill="#FF9900" d="M19.8 18.5c-3.1 2.2-7.5 2.9-11.4 1.6-.6-.2-.7-.9-.2-1.2 3.6-2 8.3-1.6 11.2.3.4.3.4.9.4.9z" />
      <path fill="#FF9900" d="M20.6 17.2c-.3-.4-1.8-.2-2.7 0-.3.1-.3-.2-.1-.4 1.3-.9 2.7-.4 2.8-.2.2.3 0 1.7-.8 2.6-.2.2-.4.1-.3-.1.4-.7.9-1.5 1.1-1.9z" />
    </svg>
  );
}

export default function ContactHero() {
  const [activePractice, setActivePractice] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize COBE 3D WebGL Globe
  useEffect(() => {
    let phi = 0;
    let globe: { destroy: () => void } | null = null;
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
      const size = 440;

      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: size * dpr,
        height: size * dpr,
        phi: 0,
        theta: 0.22,
        dark: 1,
        diffuse: 1.35,
        mapSamples: 22000,
        mapBrightness: 7.5,
        baseColor: [0.08, 0.11, 0.18],
        markerColor: [1.0, 0.48, 0.14],
        glowColor: [1.0, 0.42, 0.14],
        markers: [],
        onRender: (state) => {
          phi += 0.0055;
          state.phi = phi;
        },
      });
      if (canvas) canvas.style.opacity = "1";
    } catch (err) {
      console.warn("WebGL globe initialization skipped or not supported:", err);
    }

    return () => {
      if (globe) {
        globe.destroy();
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleScrollTo = (targetId: string, serviceKey?: string) => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    if (serviceKey) {
      const select = document.querySelector('select[name="service"]') as HTMLSelectElement | null;
      if (select) {
        select.value = serviceKey;
        select.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-black text-white pt-24 pb-16 md:pt-28 md:pb-20 lg:pt-28 lg:pb-20"
      onMouseMove={handleMouseMove}
    >
      {/* ── AMBIENT GLOW / CURSOR SPOTLIGHT ── */}
      <div
        className="pointer-events-none absolute -inset-px opacity-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(249, 115, 22, 0.08), transparent 70%)`,
        }}
      />

      {/* ── BACKGROUND FAINT GRID ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── SOFT AMBIENT RADIAL BLOOM AROUND THE HUB ── */}
      <div className="pointer-events-none absolute right-[4%] top-1/2 -translate-y-1/2 w-[680px] h-[680px] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.12)_0%,rgba(14,165,233,0.04)_40%,transparent_70%)] blur-3xl" />

      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* ══════════════════════════════════════════════
              LEFT COLUMN: HEADLINE, DESCRIPTION, CTAS, TRUST
             ══════════════════════════════════════════════ */}
          <div className="lg:col-span-6 xl:col-span-6 z-10">
            {/* Top Eyebrow Badge: LET'S TALK */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group relative inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#f97316]/35 bg-gradient-to-r from-[#f97316]/15 via-white/[0.04] to-transparent backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_0_24px_rgba(249,115,22,0.2)] hover:border-[#f97316]/60 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_0_32px_rgba(249,115,22,0.35)] transition-all duration-300 mb-6 cursor-default select-none"
            >
              <span className="relative flex h-2 w-2 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f97316] opacity-80" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f97316] shadow-[0_0_10px_#f97316,0_0_4px_#fb923c]" />
              </span>
              <span className="font-mono text-xs font-bold tracking-[0.24em] text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-100 to-[#fb923c] uppercase">
                LET&apos;S TALK
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="text-2xl sm:text-3xl lg:text-[40px] xl:text-[44px] font-bold text-white tracking-[-0.035em] leading-[1.14] mb-5"
            >
              You have a technology<br />
              <span className="text-[#f97316] drop-shadow-[0_0_24px_rgba(249,115,22,0.45)]">
                challenge.
              </span><br />
              Softree brings the offshore<br />
              engineering capability to solve it.
            </motion.h1>

            {/* Subtitle / Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg lg:text-[17.5px] text-slate-300 font-normal leading-relaxed max-w-xl mb-8"
            >
              Whether it&apos;s AI, automation, data, Microsoft technologies or modern applications — tell us what you&apos;re building. We&apos;ll take it from there.
            </motion.p>

            {/* AI & Engineering Capabilities Badges */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col gap-3 max-w-xl"
            >
              {/* Row 1: Agentic AI, AI Agents, Copilots, RAG */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/15 bg-white/[0.04] text-white text-xs sm:text-[13px] font-semibold tracking-wide hover:border-white/30 hover:bg-white/[0.08] transition-all cursor-default select-none shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
                  <AgenticAiIcon className="w-4 h-4 text-[#f97316] shrink-0" />
                  <span>Agentic AI</span>
                </div>

                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/15 bg-white/[0.04] text-white text-xs sm:text-[13px] font-semibold tracking-wide hover:border-white/30 hover:bg-white/[0.08] transition-all cursor-default select-none shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
                  <Bot className="w-4 h-4 text-[#f97316] shrink-0" />
                  <span>AI Agents</span>
                </div>

                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/15 bg-white/[0.04] text-white text-xs sm:text-[13px] font-semibold tracking-wide hover:border-white/30 hover:bg-white/[0.08] transition-all cursor-default select-none shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
                  <CopilotIcon className="w-4 h-4 shrink-0" />
                  <span>Copilots</span>
                </div>

                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/15 bg-white/[0.04] text-white text-xs sm:text-[13px] font-semibold tracking-wide hover:border-white/30 hover:bg-white/[0.08] transition-all cursor-default select-none shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
                  <RagIcon className="w-4 h-4 text-[#f97316] shrink-0" />
                  <span>RAG</span>
                </div>
              </div>

              {/* Row 2: Intelligent Automation, Microsoft AI, AWS AI */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/15 bg-white/[0.04] text-white text-xs sm:text-[13px] font-semibold tracking-wide hover:border-white/30 hover:bg-white/[0.08] transition-all cursor-default select-none shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
                  <Zap className="w-4 h-4 text-[#f97316] fill-[#f97316] shrink-0" />
                  <span>Intelligent Automation</span>
                </div>

                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/15 bg-white/[0.04] text-white text-xs sm:text-[13px] font-semibold tracking-wide hover:border-white/30 hover:bg-white/[0.08] transition-all cursor-default select-none shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
                  <MicrosoftColorIcon className="w-4 h-4 shrink-0" />
                  <span>Microsoft AI</span>
                </div>

                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/15 bg-white/[0.04] text-white text-xs sm:text-[13px] font-semibold tracking-wide hover:border-white/30 hover:bg-white/[0.08] transition-all cursor-default select-none shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
                  <AwsIcon className="w-4 h-4 shrink-0" />
                  <span>AWS AI</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ══════════════════════════════════════════════
              RIGHT COLUMN: INTERACTIVE ARCHITECTURE GRAPHIC
             ══════════════════════════════════════════════ */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-center lg:items-end relative">

            {/* Graphic Container with Globe + Hub + Default Glowing Spokes */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.25 }}
              className="relative w-full max-w-[580px] h-[520px] flex items-center justify-center select-none scale-[0.82] sm:scale-95 md:scale-100 origin-center"
            >
              {/* ── 3D CYBER-GLOBE BACKDROP (ROTATING DOTTED SPHERE) ── */}
              <div
                className="absolute flex items-center justify-center pointer-events-none rounded-full overflow-hidden"
                style={{
                  width: "430px",
                  height: "430px",
                  left: "calc(50% - 215px)",
                  top: "calc(50% - 215px)",
                  border: "1.5px solid rgba(249, 115, 22, 0.45)",
                  boxShadow: "0 0 65px rgba(249, 115, 22, 0.28), inset 0 0 50px rgba(249, 115, 22, 0.12)",
                  background: "radial-gradient(circle at 45% 45%, rgba(16, 22, 38, 0.95) 0%, rgba(6, 8, 14, 0.98) 85%)",
                }}
              >
                {/* 1. Rotating 3D WebGL Canvas Layer (Active Continents & Global Delivery Nodes) */}
                <canvas
                  ref={canvasRef}
                  width={880}
                  height={880}
                  style={{
                    width: "430px",
                    height: "430px",
                    maxWidth: "100%",
                    aspectRatio: "1/1",
                  }}
                  className="absolute inset-0 pointer-events-none opacity-90 transition-opacity duration-500"
                />

                {/* 2. 3D Spherical Wireframe Gyroscope Framing */}
                <svg viewBox="0 0 430 430" className="absolute inset-0 w-full h-full pointer-events-none" fill="none">
                  {/* Tilted Equator and Latitudes */}
                  <ellipse cx="215" cy="215" rx="210" ry="68" stroke="rgba(249, 115, 22, 0.3)" strokeWidth="1" strokeDasharray="3 3" />
                  <ellipse cx="215" cy="215" rx="205" ry="136" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.8" strokeDasharray="4 4" />
                  <ellipse cx="215" cy="215" rx="195" ry="190" stroke="rgba(249, 115, 22, 0.18)" strokeWidth="0.8" />
                  
                  {/* Longitude Meridians */}
                  <ellipse cx="215" cy="215" rx="68" ry="210" stroke="rgba(249, 115, 22, 0.25)" strokeWidth="1" strokeDasharray="3 3" />
                  <ellipse cx="215" cy="215" rx="136" ry="210" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.8" strokeDasharray="4 4" />

                  {/* Atmospheric Glow Rim */}
                  <circle cx="215" cy="215" r="213" stroke="rgba(249, 115, 22, 0.2)" strokeWidth="1" />
                </svg>
              </div>

              {/* ── SVG LAYER: DEFAULT GLOWING SPOKES & CONTINENTAL ARCS ── */}
              <svg
                viewBox="0 0 580 520"
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                fill="none"
              >
                <defs>
                  {/* Glow Filters for each spoke */}
                  <filter id="glow-amber" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <filter id="glow-blue" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <filter id="glow-teal" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <filter id="glow-purple" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Ambient Continental Trajectory Arcs spanning the globe */}
                <g opacity="0.35">
                  <path d="M 90 400 Q 220 320 390 390" stroke="rgba(249,115,22,0.4)" strokeWidth="1" strokeDasharray="3 4" />
                  <path d="M 130 140 Q 280 80 450 150" stroke="rgba(249,115,22,0.4)" strokeWidth="1" strokeDasharray="3 4" />
                  <path d="M 100 260 Q 290 220 480 270" stroke="rgba(14,165,233,0.35)" strokeWidth="0.8" />
                  <ellipse cx="290" cy="260" rx="245" ry="175" stroke="rgba(249,115,22,0.14)" strokeDasharray="2 4" />
                </g>

                {/* ══════════════════════════════════════════════════════════
                    DEFAULT ACTIVE SPOKE LINES (PERFECTLY MEASURED TO CARDS)
                   ══════════════════════════════════════════════════════════ */}

                {/* 1. TOP SPOKE (AI - Amber/Orange) */}
                <line
                  x1="290"
                  y1="200"
                  x2="290"
                  y2="88"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  strokeOpacity="0.95"
                  filter="url(#glow-amber)"
                />
                <circle cx="290" cy="200" r="2.5" fill="#f59e0b" />
                <circle cx="290" cy="88" r="2" fill="#f59e0b" />
                <circle r="2.5" fill="#ffffff" filter="url(#glow-amber)">
                  <animateMotion dur="2.1s" repeatCount="indefinite" path="M 290 200 L 290 88" />
                </circle>

                {/* 2. LEFT SPOKE (POWER PLATFORM - Sky Blue) */}
                <line
                  x1="230"
                  y1="260"
                  x2="197"
                  y2="260"
                  stroke="#0284c7"
                  strokeWidth="2"
                  strokeOpacity="0.95"
                  filter="url(#glow-blue)"
                />
                <circle cx="230" cy="260" r="2.5" fill="#0284c7" />
                <circle cx="197" cy="260" r="2" fill="#0284c7" />
                <circle r="2.5" fill="#ffffff" filter="url(#glow-blue)">
                  <animateMotion dur="2.3s" repeatCount="indefinite" path="M 230 260 L 197 260" />
                </circle>

                {/* 3. RIGHT SPOKE (DATA & AI - Teal/Cyan) */}
                <line
                  x1="350"
                  y1="260"
                  x2="383"
                  y2="260"
                  stroke="#14b8a6"
                  strokeWidth="2"
                  strokeOpacity="0.95"
                  filter="url(#glow-teal)"
                />
                <circle cx="350" cy="260" r="2.5" fill="#14b8a6" />
                <circle cx="383" cy="260" r="2" fill="#14b8a6" />
                <circle r="2.5" fill="#ffffff" filter="url(#glow-teal)">
                  <animateMotion dur="2.2s" repeatCount="indefinite" path="M 350 260 L 383 260" />
                </circle>

                {/* 4. BOTTOM SPOKE (APPLICATION MODERNISATION - Violet/Purple) */}
                <line
                  x1="290"
                  y1="320"
                  x2="290"
                  y2="420"
                  stroke="#a855f7"
                  strokeWidth="2"
                  strokeOpacity="0.95"
                  filter="url(#glow-purple)"
                />
                <circle cx="290" cy="320" r="2.5" fill="#a855f7" />
                <circle cx="290" cy="420" r="2" fill="#a855f7" />
                <circle r="2.5" fill="#ffffff" filter="url(#glow-purple)">
                  <animateMotion dur="2.4s" repeatCount="indefinite" path="M 290 320 L 290 420" />
                </circle>
              </svg>

              {/* ── CENTER HUB: SOFTREE ENGINEERING PARTNER ── */}
              <div
                className="absolute z-20 flex flex-col items-center justify-center text-center rounded-full transition-all duration-500 cursor-pointer hover:scale-105"
                style={{
                  width: "120px",
                  height: "120px",
                  left: "calc(50% - 60px)",
                  top: "calc(50% - 60px)",
                  background: "radial-gradient(circle, rgba(16, 20, 32, 0.96) 0%, rgba(8, 10, 16, 0.98) 100%)",
                  border: "2px solid #f97316",
                  boxShadow: "0 0 35px rgba(249, 115, 22, 0.42), inset 0 0 18px rgba(249, 115, 22, 0.18)",
                }}
                onClick={() => handleScrollTo("schedule")}
              >
                {/* Pulsing ring */}
                <div className="absolute -inset-2 rounded-full border border-orange-500/25 animate-pulse pointer-events-none" />

                <span className="text-[15px] font-black tracking-[0.14em] text-white leading-none mb-1">
                  SOFTREE
                </span>
                <span className="text-[9px] font-bold tracking-[0.22em] text-white/80 uppercase leading-none mt-1">
                  ENGINEERING
                </span>
                <span className="text-[8.5px] font-medium tracking-[0.26em] text-white/60 uppercase leading-none mt-1">
                  PARTNER
                </span>
              </div>

              {/* ── 1. TOP PRACTICE NODE: AI (DEFAULT ACTIVE GLOW) ── */}
              <div
                onMouseEnter={() => setActivePractice("ai")}
                onMouseLeave={() => setActivePractice(null)}
                onClick={() => handleScrollTo("contact-form", "ai")}
                className="absolute z-20 transition-all duration-300 cursor-pointer group hover:-translate-y-1"
                style={{
                  top: "12px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "250px",
                }}
              >
                <div
                  className="flex flex-col items-center px-3.5 py-2.5 rounded-2xl backdrop-blur-md transition-all duration-300"
                  style={{
                    background: "rgba(14, 18, 28, 0.94)",
                    border: "1px solid rgba(245, 158, 11, 0.65)",
                    boxShadow: activePractice === "ai"
                      ? "0 0 32px rgba(245, 158, 11, 0.35), inset 0 0 14px rgba(245, 158, 11, 0.1)"
                      : "0 0 22px rgba(245, 158, 11, 0.18), inset 0 0 10px rgba(245, 158, 11, 0.05)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-lg bg-amber-500/15 text-amber-400 shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(245,158,11,0.25)]">
                      <BrainAiIcon className="w-4 h-4" />
                    </div>
                    <span className="text-[12px] font-bold tracking-wider text-white uppercase">
                      AI
                    </span>
                  </div>
                  <ul className="flex flex-wrap items-center justify-center gap-1.5">
                    <li className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-amber-500/35 bg-amber-500/10 text-[10.5px] font-medium text-amber-100/90 tracking-tight whitespace-nowrap shadow-[0_0_8px_rgba(245,158,11,0.12)]">
                      Agentic AI
                    </li>
                    <li className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-amber-500/35 bg-amber-500/10 text-[10.5px] font-medium text-amber-100/90 tracking-tight whitespace-nowrap shadow-[0_0_8px_rgba(245,158,11,0.12)]">
                      Generative AI
                    </li>
                    <li className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-amber-500/35 bg-amber-500/10 text-[10.5px] font-medium text-amber-100/90 tracking-tight whitespace-nowrap shadow-[0_0_8px_rgba(245,158,11,0.12)]">
                      Automation
                    </li>
                  </ul>
                </div>
              </div>

              {/* ── 2. LEFT PRACTICE NODE: POWER PLATFORM (DEFAULT ACTIVE GLOW) ── */}
              <div
                onMouseEnter={() => setActivePractice("power-platform")}
                onMouseLeave={() => setActivePractice(null)}
                onClick={() => handleScrollTo("contact-form", "power-platform")}
                className="absolute z-20 transition-all duration-300 cursor-pointer group hover:-translate-x-1"
                style={{
                  left: "2px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "195px",
                }}
              >
                <div
                  className="flex flex-col px-3.5 py-2.5 rounded-2xl backdrop-blur-md transition-all duration-300"
                  style={{
                    background: "rgba(14, 18, 28, 0.94)",
                    border: "1px solid rgba(2, 132, 199, 0.65)",
                    boxShadow: activePractice === "power-platform"
                      ? "0 0 32px rgba(2, 132, 199, 0.35), inset 0 0 14px rgba(2, 132, 199, 0.1)"
                      : "0 0 22px rgba(2, 132, 199, 0.18), inset 0 0 10px rgba(2, 132, 199, 0.05)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-lg bg-sky-500/15 text-sky-400 shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(2,132,199,0.25)]">
                      <MicrosoftIcon className="w-4 h-4" />
                    </div>
                    <span className="text-[11.5px] font-bold tracking-wider text-white uppercase leading-snug">
                      POWER PLATFORM
                    </span>
                  </div>
                  <ul className="flex flex-wrap gap-1.5">
                    <li className="inline-flex items-center px-2 py-0.5 rounded-full border border-sky-500/35 bg-sky-500/10 text-[10.5px] font-medium text-sky-100/90 tracking-tight whitespace-nowrap shadow-[0_0_8px_rgba(2,132,199,0.12)]">
                      Power Apps
                    </li>
                    <li className="inline-flex items-center px-2 py-0.5 rounded-full border border-sky-500/35 bg-sky-500/10 text-[10.5px] font-medium text-sky-100/90 tracking-tight whitespace-nowrap shadow-[0_0_8px_rgba(2,132,199,0.12)]">
                      Power BI
                    </li>
                    <li className="inline-flex items-center px-2 py-0.5 rounded-full border border-sky-500/35 bg-sky-500/10 text-[10.5px] font-medium text-sky-100/90 tracking-tight whitespace-nowrap shadow-[0_0_8px_rgba(2,132,199,0.12)]">
                      Power Automate
                    </li>
                    <li className="inline-flex items-center px-2 py-0.5 rounded-full border border-sky-500/35 bg-sky-500/10 text-[10.5px] font-medium text-sky-100/90 tracking-tight whitespace-nowrap shadow-[0_0_8px_rgba(2,132,199,0.12)]">
                      SharePoint
                    </li>
                  </ul>
                </div>
              </div>

              {/* ── 3. RIGHT PRACTICE NODE: DATA & AI (DEFAULT ACTIVE GLOW) ── */}
              <div
                onMouseEnter={() => setActivePractice("data-ai")}
                onMouseLeave={() => setActivePractice(null)}
                onClick={() => handleScrollTo("contact-form", "ai")}
                className="absolute z-20 transition-all duration-300 cursor-pointer group hover:translate-x-1"
                style={{
                  right: "2px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "195px",
                }}
              >
                <div
                  className="flex flex-col px-3.5 py-2.5 rounded-2xl backdrop-blur-md transition-all duration-300"
                  style={{
                    background: "rgba(14, 18, 28, 0.94)",
                    border: "1px solid rgba(20, 184, 166, 0.65)",
                    boxShadow: activePractice === "data-ai"
                      ? "0 0 32px rgba(20, 184, 166, 0.35), inset 0 0 14px rgba(20, 184, 166, 0.1)"
                      : "0 0 22px rgba(20, 184, 166, 0.18), inset 0 0 10px rgba(245, 158, 11, 0.05)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-lg bg-teal-500/15 text-teal-400 shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(20,184,166,0.25)]">
                      <Database className="w-4 h-4" />
                    </div>
                    <span className="text-[11.5px] font-bold tracking-wider text-white uppercase leading-snug">
                      DATA & AI
                    </span>
                  </div>
                  <ul className="flex flex-wrap gap-1.5">
                    <li className="inline-flex items-center px-2 py-0.5 rounded-full border border-teal-500/35 bg-teal-500/10 text-[10.5px] font-medium text-teal-100/90 tracking-tight whitespace-nowrap shadow-[0_0_8px_rgba(20,184,166,0.12)]">
                      Azure AI
                    </li>
                    <li className="inline-flex items-center px-2 py-0.5 rounded-full border border-teal-500/35 bg-teal-500/10 text-[10.5px] font-medium text-teal-100/90 tracking-tight whitespace-nowrap shadow-[0_0_8px_rgba(20,184,166,0.12)]">
                      Analytics
                    </li>
                    <li className="inline-flex items-center px-2 py-0.5 rounded-full border border-teal-500/35 bg-teal-500/10 text-[10.5px] font-medium text-teal-100/90 tracking-tight whitespace-nowrap shadow-[0_0_8px_rgba(20,184,166,0.12)]">
                      Microsoft Fabric
                    </li>
                    <li className="inline-flex items-center px-2 py-0.5 rounded-full border border-teal-500/35 bg-teal-500/10 text-[10.5px] font-medium text-teal-100/90 tracking-tight whitespace-nowrap shadow-[0_0_8px_rgba(20,184,166,0.12)]">
                      Data Engineering
                    </li>
                  </ul>
                </div>
              </div>

              {/* ── 4. BOTTOM PRACTICE NODE: APPLICATION MODERNISATION (DEFAULT ACTIVE GLOW) ── */}
              <div
                onMouseEnter={() => setActivePractice("modernisation")}
                onMouseLeave={() => setActivePractice(null)}
                onClick={() => handleScrollTo("contact-form", "other")}
                className="absolute z-20 transition-all duration-300 cursor-pointer group hover:translate-y-1"
                style={{
                  bottom: "12px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "280px",
                }}
              >
                <div
                  className="flex flex-col items-center px-3.5 py-2.5 rounded-2xl backdrop-blur-md transition-all duration-300"
                  style={{
                    background: "rgba(14, 18, 28, 0.94)",
                    border: "1px solid rgba(168, 85, 247, 0.65)",
                    boxShadow: activePractice === "modernisation"
                      ? "0 0 32px rgba(168, 85, 247, 0.35), inset 0 0 14px rgba(168, 85, 247, 0.1)"
                      : "0 0 22px rgba(168, 85, 247, 0.18), inset 0 0 10px rgba(168, 85, 247, 0.05)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-lg bg-purple-500/15 text-purple-400 shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(168,85,247,0.25)]">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-bold tracking-wider text-white uppercase leading-snug">
                      APPLICATION MODERNISATION
                    </span>
                  </div>
                  <ul className="flex flex-wrap items-center justify-center gap-1.5">
                    <li className="inline-flex items-center px-2 py-0.5 rounded-full border border-purple-500/35 bg-purple-500/10 text-[10.5px] font-medium text-purple-100/90 tracking-tight whitespace-nowrap shadow-[0_0_8px_rgba(168,85,247,0.12)]">
                      Modern Apps
                    </li>
                    <li className="inline-flex items-center px-2 py-0.5 rounded-full border border-purple-500/35 bg-purple-500/10 text-[10.5px] font-medium text-purple-100/90 tracking-tight whitespace-nowrap shadow-[0_0_8px_rgba(168,85,247,0.12)]">
                      Cloud & DevOps
                    </li>
                    <li className="inline-flex items-center px-2 py-0.5 rounded-full border border-purple-500/35 bg-purple-500/10 text-[10.5px] font-medium text-purple-100/90 tracking-tight whitespace-nowrap shadow-[0_0_8px_rgba(168,85,247,0.12)]">
                      APIs & Integration
                    </li>
                    <li className="inline-flex items-center px-2 py-0.5 rounded-full border border-purple-500/35 bg-purple-500/10 text-[10.5px] font-medium text-purple-100/90 tracking-tight whitespace-nowrap shadow-[0_0_8px_rgba(168,85,247,0.12)]">
                      Legacy Modernisation
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* ── TRUST STRIP ── */}
        <div className="mt-16 sm:mt-20 w-full z-10 relative">
          <TrustStrip theme="dark" />
        </div>
      </div>
    </section>
  );
}
