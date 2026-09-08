"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import * as THREE from 'three';
import Link from 'next/link';
import { Shield, Users, Cpu, Sparkles, Calendar, ArrowUpRight } from 'lucide-react';

const trustItems = [
  { icon: Shield, title: 'WHITE-LABEL', subtitle: 'Trusted agency partner.' },
  { icon: Users, title: 'OFFSHORE TEAMS', subtitle: 'Scale on demand.' },
  { icon: Cpu, title: 'MICROSOFT AI', subtitle: 'Azure & OpenAI partners.' },
  { icon: Sparkles, title: 'ENTERPRISE AI', subtitle: 'Secure, production-grade.' },
  { icon: Calendar, title: 'SINCE 2013', subtitle: '13+ years of excellence.' },
];

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
  { title: 'Agentic AI', icon: AgenticAiIcon },
  { title: 'AI Agents', icon: AiAgentsIcon },
  { title: 'Copilots', icon: CopilotsIcon },
  { title: 'RAG', icon: RagIcon },
  { title: 'Intelligent Automation', icon: IntelligentAutomationIcon },
  { title: 'Microsoft AI', icon: MicrosoftAiIcon },
  { title: 'AWS AI', icon: AwsAiIcon },
];

// --- Main Hero Component ---
export const WovenLightHero = () => {
  const textControls = useAnimation();

  useEffect(() => {
    // Add a more elegant font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    textControls.start(i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.035 + 0.3,
        duration: 0.7,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }));

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, [textControls]);

  const headline = "Offshore Agentic AI Engineering Partner";

  return (
    <div className="relative flex w-full flex-col overflow-hidden bg-black pt-20 lg:pt-24 pb-0">
      
      {/* Main Split Content: Left (Text) and Right (The Wave) */}
      <div className="relative z-10 flex items-start w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 pt-2 sm:pt-4 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 w-full items-center">
          
          {/* LEFT: The Text */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-start text-left z-10">
            {/* Eyebrow Pill */}
            <motion.div
              custom={0}
              initial={{ opacity: 0, y: 15 }}
              animate={textControls}
              className="mb-3.5 sm:mb-4 inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/40 bg-[#FF6B00]/10 px-4.5 sm:px-5 py-2 text-xs sm:text-[13px] font-semibold text-[#FF6B00] backdrop-blur-md shadow-[0_0_15px_rgba(255,107,0,0.15)] w-fit"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span className="h-2 w-2 rounded-full bg-[#FF6B00] shadow-[0_0_8px_#FF6B00] animate-pulse" />
              <span>Build AI. Scale Faster.</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[58px] xl:text-[66px] font-bold text-white tracking-tight leading-[1.08]"
              style={{
                fontFamily: "'Playfair Display', serif",
                textShadow: '0 0 35px rgba(255, 107, 0, 0.25)',
              }}
            >
              Offshore{" "}
              <span className="text-[#FF6B00] drop-shadow-[0_0_25px_rgba(255,107,0,0.4)]">
                Agentic AI
              </span>
              <br />
              Engineering Partner
            </motion.h1>

            {/* Subtitle Description */}
            <motion.p
              custom={4}
              initial={{ opacity: 0, y: 20 }}
              animate={textControls}
              className="mt-4 sm:mt-5 text-base sm:text-lg lg:text-[19px] xl:text-xl text-slate-300 dark:text-slate-400 leading-relaxed font-normal max-w-xl"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Build and scale AI agents with a dedicated offshore engineering team.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Link href="/contact" className="w-full sm:w-auto">
                <button
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-[#FF6B00] hover:bg-[#E05E00] px-8 py-3.5 sm:py-4 font-semibold text-white text-[15px] sm:text-base transition-all shadow-lg shadow-[#FF6B00]/30 hover:scale-[1.02] active:scale-[0.98] group"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <span>Build Your AI Team</span>
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
                </button>
              </Link>
             
            </motion.div>

            {/* Capabilities Pill Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2 sm:gap-2.5 max-w-2xl"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {capabilities.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="group inline-flex items-center gap-2.5 px-4 sm:px-4.5 py-2 sm:py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 hover:border-[#FF6B00]/70 backdrop-blur-md text-[12.5px] sm:text-[13.5px] font-medium text-white shadow-sm hover:shadow-[0_0_15px_rgba(255,107,0,0.35)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 select-none cursor-default"
                  >
                    <Icon />
                    <span className="tracking-wide text-white/90 group-hover:text-white">{item.title}</span>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* RIGHT: The Wave (Matches height, centered, never cut off) */}
          <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center relative w-full h-[420px] sm:h-[450px] lg:h-[480px] py-0">
            {/* Ambient orange glow behind the wave for atmospheric contrast */}
            <div className="pointer-events-none absolute w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[#FF6B00]/15 blur-[90px] -z-10" />
            <div className="w-full h-full relative flex items-center justify-center">
              <WovenCanvas />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Trust Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="w-full z-20 bg-black/40 backdrop-blur-md py-4 sm:py-5 shrink-0 mt-4 sm:mt-6"
      >
        <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5">
            {trustItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#FF6B00]">
                    <Icon className="h-5 w-5 text-[#FF6B00]" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-bold text-white tracking-wide">{item.title}</span>
                    <span className="text-xs text-[#A1A1AA] mt-0.5">{item.subtitle}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- Three.js Canvas Component ---
const WovenCanvas = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    const scene = new THREE.Scene();

    // 1. Initial dimensions
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;
    const aspect = width / height;

    // 2. Camera setup with FOV 55 for comfortable framing
    const camera = new THREE.PerspectiveCamera(55, aspect, 0.1, 1000);

    // 3. Renderer with antialiasing and transparency
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    // 4. Ultra-smooth high-definition radial glow particle texture
    const createGlowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.18, 'rgba(255, 220, 130, 0.98)');
      gradient.addColorStop(0.38, 'rgba(255, 135, 25, 0.85)');
      gradient.addColorStop(0.65, 'rgba(255, 80, 0, 0.35)');
      gradient.addColorStop(0.88, 'rgba(210, 45, 0, 0.08)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const glowTexture = createGlowTexture();

    // 5. Main Woven Silk Torus Knot Wave
    // Geometry: radius 1.20, tube 0.38 -> Outer radius 1.58 (leaves ample padding on top & bottom)
    const particleCount = 48000;
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    const geometry = new THREE.BufferGeometry();
    const torusKnot = new THREE.TorusKnotGeometry(1.20, 0.38, 280, 52);

    for (let i = 0; i < particleCount; i++) {
      const vertexIndex = i % torusKnot.attributes.position.count;
      const x = torusKnot.attributes.position.getX(vertexIndex);
      const y = torusKnot.attributes.position.getY(vertexIndex);
      const z = torusKnot.attributes.position.getZ(vertexIndex);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      velocities[i * 3] = 0;
      velocities[i * 3 + 1] = 0;
      velocities[i * 3 + 2] = 0;

      // Color variation: luminous gold highlights + rich Softree amber-orange
      const color = new THREE.Color();
      const rand = Math.random();
      if (rand < 0.2) {
        // High-luster golden shimmer
        color.setHSL(0.11, 0.95, 0.85);
      } else if (rand < 0.65) {
        // Vibrant Softree orange
        color.setHSL(0.065 + Math.random() * 0.03, 0.98, 0.62);
      } else {
        // Deep warm amber
        color.setHSL(0.045 + Math.random() * 0.02, 0.95, 0.54);
      }

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.035,
      map: glowTexture || undefined,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.98,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);

    // 6. Ambient Floating Particle Halo (Tightly contained within safe radius)
    const ambientCount = 1000;
    const ambientPositions = new Float32Array(ambientCount * 3);
    const ambientBasePositions = new Float32Array(ambientCount * 3);
    const ambientColors = new Float32Array(ambientCount * 3);
    const ambientSpeeds = new Float32Array(ambientCount);
    const ambientPhases = new Float32Array(ambientCount);

    for (let i = 0; i < ambientCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      // Kept snugly around the knot (max radius 1.75)
      const r = 1.20 + Math.pow(Math.random(), 1.6) * 0.55;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.88;
      const z = r * Math.cos(phi);

      ambientPositions[i * 3] = x;
      ambientPositions[i * 3 + 1] = y;
      ambientPositions[i * 3 + 2] = z;

      ambientBasePositions[i * 3] = x;
      ambientBasePositions[i * 3 + 1] = y;
      ambientBasePositions[i * 3 + 2] = z;

      // Soft brightness falloff near edges to guarantee zero clipping
      const falloff = Math.max(0.15, 1 - Math.max(0, (r - 1.45) / 0.45));
      const isOrange = Math.random() > 0.3;
      if (isOrange) {
        ambientColors[i * 3] = 1.0 * falloff;
        ambientColors[i * 3 + 1] = (0.45 + Math.random() * 0.25) * falloff;
        ambientColors[i * 3 + 2] = 0.05 * falloff;
      } else {
        ambientColors[i * 3] = 0.98 * falloff;
        ambientColors[i * 3 + 1] = 0.92 * falloff;
        ambientColors[i * 3 + 2] = 0.82 * falloff;
      }

      ambientSpeeds[i] = 0.25 + Math.random() * 0.5;
      ambientPhases[i] = Math.random() * Math.PI * 2;
    }

    const ambientGeometry = new THREE.BufferGeometry();
    ambientGeometry.setAttribute('position', new THREE.BufferAttribute(ambientPositions, 3));
    ambientGeometry.setAttribute('color', new THREE.BufferAttribute(ambientColors, 3));

    const ambientMaterial = new THREE.PointsMaterial({
      size: 0.035,
      map: glowTexture || undefined,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });

    const ambientPoints = new THREE.Points(ambientGeometry, ambientMaterial);

    // 7. Group & Centering
    const waveGroup = new THREE.Group();
    waveGroup.position.set(0, 0, 0); // Perfectly centered in canvas
    waveGroup.add(points);
    waveGroup.add(ambientPoints);
    scene.add(waveGroup);

    // 8. Dynamic Camera Distance Calculator (Guarantees generous padding on all 4 sides)
    const updateSize = (w: number, h: number) => {
      if (w <= 0 || h <= 0) return;
      const currentAspect = w / h;
      camera.aspect = currentAspect;

      const halfFovRad = (camera.fov * Math.PI) / 360;
      const tanHalfFov = Math.tan(halfFovRad);

      // Safe radius: 2.40 brings camera closer to make the wave visibly bigger with comfortable breathing room
      const safeRadius = 2.40;
      const distFromHeight = safeRadius / tanHalfFov;
      const distFromWidth = safeRadius / (tanHalfFov * currentAspect);

      camera.position.z = Math.max(distFromHeight, distFromWidth, 4.4);
      camera.position.x = 0;
      camera.position.y = 0;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h, true);
    };

    updateSize(width, height);

    // ResizeObserver for rock-solid responsive sizing
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          updateSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    // 9. Interactive mouse physics (Bounded & Clamped)
    const targetMouse = { x: 0, y: 0 };
    const smoothedMouse = { x: 0, y: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const isInside = (
        event.clientX >= rect.left - 50 &&
        event.clientX <= rect.right + 50 &&
        event.clientY >= rect.top - 50 &&
        event.clientY <= rect.bottom + 50
      );

      if (isInside) {
        const rawX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const rawY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        targetMouse.x = Math.max(-1, Math.min(1, rawX));
        targetMouse.y = Math.max(-1, Math.min(1, rawY));
      } else {
        targetMouse.x = 0;
        targetMouse.y = 0;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 10. High-performance Animation Loop (Zero per-frame allocations)
    const clock = new THREE.Clock();
    const posArr = positions;
    const origArr = originalPositions;
    const velArr = velocities;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      smoothedMouse.x += (targetMouse.x - smoothedMouse.x) * 0.045;
      smoothedMouse.y += (targetMouse.y - smoothedMouse.y) * 0.045;

      const mouseWorldX = smoothedMouse.x * 2.0;
      const mouseWorldY = smoothedMouse.y * 2.0;
      const mouseWorldZ = 0;

      // Wave particles physics with zero garbage collection allocations
      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3;
        const iy = ix + 1;
        const iz = ix + 2;

        const cx = posArr[ix];
        const cy = posArr[iy];
        const cz = posArr[iz];

        const waveDisplacement = Math.sin(elapsedTime * 1.6 + ix * 0.008) * 0.012;
        const ox = origArr[ix];
        const oy = origArr[iy] + waveDisplacement;
        const oz = origArr[iz];

        let vx = velArr[ix];
        let vy = velArr[iy];
        let vz = velArr[iz];

        // Mouse displacement calculation using scalar math
        const dx = cx - mouseWorldX;
        const dy = cy - mouseWorldY;
        const dz = cz - mouseWorldZ;
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < 2.56 && distSq > 0.0001) { // dist < 1.6
          const dist = Math.sqrt(distSq);
          const force = (1.6 - dist) * 0.012;
          const invDist = 1 / dist;
          vx += dx * invDist * force;
          vy += dy * invDist * force;
          vz += dz * invDist * force;
        }

        // Return force
        vx += (ox - cx) * 0.0015;
        vy += (oy - cy) * 0.0015;
        vz += (oz - cz) * 0.0015;

        // Damping
        vx *= 0.96;
        vy *= 0.96;
        vz *= 0.96;

        posArr[ix] = cx + vx;
        posArr[iy] = cy + vy;
        posArr[iz] = cz + vz;

        velArr[ix] = vx;
        velArr[iy] = vy;
        velArr[iz] = vz;
      }
      geometry.attributes.position.needsUpdate = true;

      // Smooth wave rotations
      points.rotation.y = elapsedTime * 0.055;
      points.rotation.x = Math.sin(elapsedTime * 0.025) * 0.08;
      points.rotation.z = Math.cos(elapsedTime * 0.02) * 0.05;

      // Ambient dots drifting
      const ambPos = ambientGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < ambientCount; i++) {
        const i3 = i * 3;
        const speed = ambientSpeeds[i];
        const phase = ambientPhases[i];

        ambPos[i3] = ambientBasePositions[i3] + Math.sin(elapsedTime * speed + phase) * 0.12 + smoothedMouse.x * 0.12;
        ambPos[i3 + 1] = ambientBasePositions[i3 + 1] + Math.cos(elapsedTime * speed * 0.75 + phase) * 0.12 + smoothedMouse.y * 0.12;
        ambPos[i3 + 2] = ambientBasePositions[i3 + 2] + Math.sin(elapsedTime * 0.45 + phase) * 0.1;
      }
      ambientGeometry.attributes.position.needsUpdate = true;

      ambientPoints.rotation.y = -elapsedTime * 0.02;
      ambientPoints.rotation.x = Math.cos(elapsedTime * 0.015) * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      glowTexture?.dispose();
      geometry.dispose();
      material.dispose();
      ambientGeometry.dispose();
      ambientMaterial.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full relative flex items-center justify-center" />;
};
