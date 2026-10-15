"use client";

import React, { useId } from "react";
import Image from "next/image";

/**
 * MicrosoftCloudCardVisual
 * High-tech animated cloud infrastructure visual matching the exact 3D volumetric design:
 *  - Volumetric glowing plasma/glass cloud with internal particle constellation & orbital rings
 *  - Luminous fiber-optic waterfall descending into central energy socket
 *  - 4 3D-isometric connected infrastructure nodes:
 *      1. Server Stack (Top-Left)
 *      2. Microsoft Logo Glass Prism (Bottom-Left)
 *      3. Cylindrical Database Platter Stack (Top-Right)
 *      4. Analytics Dashboard with illuminated orange/amber bars (Bottom-Right)
 *  - Multi-stream live data animation: continuous cyan flowing dashes + traveling orange & cyan photon data packets
 *  - Zero external dependencies, pure hardware-accelerated SVG + CSS keyframes
 */
export function MicrosoftCloudCardVisual({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "_");

  // Coordinate paths matching the 464x345 illustration geometry:
  // Central emitter socket: (232, 205)
  // Server stack: (65, 195)
  // Microsoft prism: (125, 265)
  // Database: (398, 195)
  // Analytics dashboard: (345, 260)
  const pathServer = "M 232 205 C 170 205, 110 185, 65 195";
  const pathMicrosoft = "M 232 210 C 185 230, 145 250, 125 265";
  const pathDatabase = "M 232 205 C 295 205, 355 185, 398 195";
  const pathAnalytics = "M 232 210 C 280 230, 320 250, 345 260";

  return (
    <div
      className={`relative w-full h-full min-h-0 overflow-hidden select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* 1. Base High-Fidelity Volumetric 3D Render */}
      <Image
        src="/whysoftree/microsoft-cloud-infrastructure.webp"
        alt="Microsoft Cloud Infrastructure"
        fill
        priority
        className="object-cover object-top"
      />

      {/* Smooth bottom gradient fade into card body */}
      <div
        className="absolute inset-x-0 bottom-0 h-14 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, #03060f 0%, rgba(3, 6, 15, 0) 100%)",
        }}
      />

      {/* 2. Hardware-Accelerated Animated SVG Energy Overlay */}
      <svg
        viewBox="0 0 464 345"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen"
      >
        <defs>
          {/* Glow Filters */}
          <filter id={`cyanGlow_${id}`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id={`orangeGlow_${id}`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id={`softCore_${id}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" />
          </filter>

          <radialGradient id={`coreGlowGrad_${id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#00f0ff" stopOpacity="0.7" />
            <stop offset="70%" stopColor="#0284c7" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        <style>{`
          @keyframes streamDash {
            from { stroke-dashoffset: 48; }
            to { stroke-dashoffset: 0; }
          }
          @keyframes streamOrangePulse {
            0% { stroke-dashoffset: 120; opacity: 0.25; }
            50% { opacity: 1; }
            100% { stroke-dashoffset: 0; opacity: 0.25; }
          }
          @keyframes cloudBreathing {
            0%, 100% { transform: scale(0.96); opacity: 0.7; }
            50% { transform: scale(1.12); opacity: 1; }
          }
          @keyframes waterfallFlow {
            0% { stroke-dashoffset: 32; opacity: 0.4; }
            50% { opacity: 0.95; }
            100% { stroke-dashoffset: 0; opacity: 0.4; }
          }
          @keyframes ledPulse {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 1; }
          }
          @keyframes nodeRipple {
            0% { r: 3; opacity: 0.9; }
            100% { r: 10; opacity: 0; }
          }
          @keyframes ambientSparkle {
            0%, 100% { opacity: 0.2; transform: scale(0.7); }
            50% { opacity: 0.95; transform: scale(1.3); }
          }

          .cloud-stream-cyan {
            stroke-dasharray: 6 14;
            animation: streamDash 1.2s linear infinite;
          }
          .cloud-stream-orange {
            stroke-dasharray: 8 90;
            animation: streamOrangePulse 2.4s ease-in-out infinite;
          }
          .cloud-core-flare {
            transform-origin: 232px 145px;
            animation: cloudBreathing 4s ease-in-out infinite;
          }
          .waterfall-strand {
            stroke-dasharray: 4 8;
            animation: waterfallFlow 1s linear infinite;
          }
          .node-led-cyan { animation: ledPulse 1.6s ease-in-out infinite; }
          .node-led-green { animation: ledPulse 1.3s ease-in-out infinite 0.4s; }
          .node-led-amber { animation: ledPulse 2s ease-in-out infinite 0.8s; }
          .touchdown-ring { animation: nodeRipple 2.2s ease-out infinite; }
          .sparkle-1 { animation: ambientSparkle 2.6s ease-in-out infinite; }
          .sparkle-2 { animation: ambientSparkle 3.2s ease-in-out infinite 0.9s; }
          .sparkle-3 { animation: ambientSparkle 2.9s ease-in-out infinite 1.5s; }

          @media (prefers-reduced-motion: reduce) {
            .cloud-stream-cyan,
            .cloud-stream-orange,
            .cloud-core-flare,
            .waterfall-strand,
            .node-led-cyan,
            .node-led-green,
            .node-led-amber,
            .touchdown-ring,
            .sparkle-1,
            .sparkle-2,
            .sparkle-3 {
              animation: none !important;
            }
          }
        `}</style>

        {/* ================= 1. CLOUD VOLUMETRIC GLOW & CORE BREATHING ================= */}
        <g className="cloud-core-flare">
          {/* Large soft ambient bloom over cloud center */}
          <circle
            cx="232"
            cy="135"
            r="45"
            fill={`url(#coreGlowGrad_${id})`}
            filter={`url(#softCore_${id})`}
            opacity="0.75"
          />
          {/* Intense focal energy star at base of cloud */}
          <circle
            cx="232"
            cy="148"
            r="12"
            fill="#ffffff"
            filter={`url(#cyanGlow_${id})`}
            opacity="0.85"
          />
          <ellipse
            cx="232"
            cy="148"
            rx="24"
            ry="6"
            fill="#00f0ff"
            opacity="0.9"
            filter={`url(#cyanGlow_${id})`}
          />
        </g>

        {/* ================= 2. DESCENDING FIBER-OPTIC WATERFALL BEAMS ================= */}
        <g opacity="0.85">
          {/* Flowing vertical strands from cloud base (148) to socket (205) */}
          <line x1="222" y1="150" x2="226" y2="204" stroke="#00f0ff" strokeWidth="1.2" className="waterfall-strand" />
          <line x1="227" y1="148" x2="229" y2="205" stroke="#ffffff" strokeWidth="1.5" className="waterfall-strand" style={{ animationDelay: "0.2s" }} />
          <line x1="232" y1="147" x2="232" y2="206" stroke="#ffffff" strokeWidth="2" className="waterfall-strand" style={{ animationDelay: "0.5s" }} />
          <line x1="237" y1="148" x2="235" y2="205" stroke="#ffffff" strokeWidth="1.5" className="waterfall-strand" style={{ animationDelay: "0.3s" }} />
          <line x1="242" y1="150" x2="238" y2="204" stroke="#00f0ff" strokeWidth="1.2" className="waterfall-strand" style={{ animationDelay: "0.7s" }} />

          {/* Golden/Orange live data threads in waterfall */}
          <line x1="225" y1="152" x2="227" y2="204" stroke="#FF5812" strokeWidth="1.4" className="waterfall-strand" style={{ animationDelay: "0.4s" }} filter={`url(#orangeGlow_${id})`} />
          <line x1="239" y1="152" x2="237" y2="204" stroke="#FF5812" strokeWidth="1.4" className="waterfall-strand" style={{ animationDelay: "0.8s" }} filter={`url(#orangeGlow_${id})`} />
        </g>

        {/* Central Hub Socket Pulse */}
        <circle cx="232" cy="205" r="8" fill="#00f0ff" opacity="0.4" filter={`url(#cyanGlow_${id})`} />
        <ellipse cx="232" cy="205" rx="14" ry="5.5" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.9" />

        {/* ================= 3. FOUR ANIMATED DATA CONDUITS ================= */}

        {/* Conduit 1: to Server Stack (Top-Left) */}
        <g>
          {/* Cyan Stream */}
          <path
            d={pathServer}
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.2"
            className="cloud-stream-cyan"
            filter={`url(#cyanGlow_${id})`}
          />
          {/* Orange Live Data Stream */}
          <path
            d={pathServer}
            fill="none"
            stroke="#FF5812"
            strokeWidth="2.5"
            className="cloud-stream-orange"
            filter={`url(#orangeGlow_${id})`}
          />
          {/* Smooth Traveling Cyan Photon */}
          <circle r="3.2" fill="#ffffff" filter={`url(#cyanGlow_${id})`}>
            <animateMotion dur="2.2s" repeatCount="indefinite" path={pathServer} />
          </circle>
          {/* Smooth Traveling Orange Packet */}
          <circle r="2.5" fill="#FF5812" filter={`url(#orangeGlow_${id})`}>
            <animateMotion dur="3.4s" begin="1.1s" repeatCount="indefinite" path={pathServer} />
          </circle>
        </g>

        {/* Conduit 2: to Microsoft Logo Prism (Bottom-Left) */}
        <g>
          <path
            d={pathMicrosoft}
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.4"
            className="cloud-stream-cyan"
            filter={`url(#cyanGlow_${id})`}
          />
          <path
            d={pathMicrosoft}
            fill="none"
            stroke="#FF5812"
            strokeWidth="2.8"
            className="cloud-stream-orange"
            filter={`url(#orangeGlow_${id})`}
            style={{ animationDelay: "0.7s" }}
          />
          <circle r="3.4" fill="#ffffff" filter={`url(#cyanGlow_${id})`}>
            <animateMotion dur="2.5s" repeatCount="indefinite" path={pathMicrosoft} />
          </circle>
          <circle r="2.6" fill="#FF5812" filter={`url(#orangeGlow_${id})`}>
            <animateMotion dur="3.7s" begin="1.6s" repeatCount="indefinite" path={pathMicrosoft} />
          </circle>
        </g>

        {/* Conduit 3: to Database (Top-Right) */}
        <g>
          <path
            d={pathDatabase}
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.2"
            className="cloud-stream-cyan"
            filter={`url(#cyanGlow_${id})`}
            style={{ animationDelay: "0.4s" }}
          />
          <path
            d={pathDatabase}
            fill="none"
            stroke="#FF5812"
            strokeWidth="2.5"
            className="cloud-stream-orange"
            filter={`url(#orangeGlow_${id})`}
            style={{ animationDelay: "1.3s" }}
          />
          <circle r="3.2" fill="#ffffff" filter={`url(#cyanGlow_${id})`}>
            <animateMotion dur="2.3s" begin="0.3s" repeatCount="indefinite" path={pathDatabase} />
          </circle>
          <circle r="2.5" fill="#FF5812" filter={`url(#orangeGlow_${id})`}>
            <animateMotion dur="3.5s" begin="2.0s" repeatCount="indefinite" path={pathDatabase} />
          </circle>
        </g>

        {/* Conduit 4: to Analytics Dashboard (Bottom-Right) */}
        <g>
          <path
            d={pathAnalytics}
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.4"
            className="cloud-stream-cyan"
            filter={`url(#cyanGlow_${id})`}
            style={{ animationDelay: "0.6s" }}
          />
          <path
            d={pathAnalytics}
            fill="none"
            stroke="#FF5812"
            strokeWidth="2.8"
            className="cloud-stream-orange"
            filter={`url(#orangeGlow_${id})`}
            style={{ animationDelay: "1.9s" }}
          />
          <circle r="3.4" fill="#ffffff" filter={`url(#cyanGlow_${id})`}>
            <animateMotion dur="2.6s" begin="0.5s" repeatCount="indefinite" path={pathAnalytics} />
          </circle>
          <circle r="2.6" fill="#FF5812" filter={`url(#orangeGlow_${id})`}>
            <animateMotion dur="3.8s" begin="2.3s" repeatCount="indefinite" path={pathAnalytics} />
          </circle>
        </g>

        {/* ================= 4. NODE TOUCHDOWN RIPPLES & GLOWS ================= */}
        {/* Node 1: Server Stack */}
        <circle cx="65" cy="195" r="4" fill="none" stroke="#00f0ff" strokeWidth="1.2" className="touchdown-ring" />
        <circle cx="58" cy="162" r="1.3" fill="#00f0ff" className="node-led-cyan" filter={`url(#cyanGlow_${id})`} />
        <circle cx="68" cy="162" r="1.3" fill="#22c55e" className="node-led-green" />

        {/* Node 2: Microsoft Prism */}
        <circle cx="125" cy="265" r="4.5" fill="none" stroke="#00f0ff" strokeWidth="1.2" className="touchdown-ring" style={{ animationDelay: "0.8s" }} />
        {/* Subtle glass prism glint */}
        <line x1="110" y1="245" x2="135" y2="258" stroke="#ffffff" strokeWidth="1" opacity="0.6" />

        {/* Node 3: Database Stack */}
        <circle cx="398" cy="195" r="4" fill="none" stroke="#00f0ff" strokeWidth="1.2" className="touchdown-ring" style={{ animationDelay: "0.4s" }} />
        <ellipse cx="398" cy="155" rx="10" ry="3.5" fill="#00f0ff" opacity="0.4" filter={`url(#cyanGlow_${id})`} />
        <circle cx="395" cy="170" r="1.3" fill="#00f0ff" className="node-led-cyan" />

        {/* Node 4: Analytics Dashboard */}
        <circle cx="345" cy="260" r="4.5" fill="none" stroke="#FF5812" strokeWidth="1.2" className="touchdown-ring" style={{ animationDelay: "1.2s" }} />
        <circle cx="355" cy="216" r="1.6" fill="#ffffff" filter={`url(#orangeGlow_${id})`} opacity="0.9" />

        {/* ================= 5. AMBIENT PARTICLES & TWINKLES ================= */}
        <circle cx="165" cy="110" r="1.5" fill="#ffffff" className="sparkle-1" />
        <circle cx="205" cy="95" r="1.8" fill="#00f0ff" className="sparkle-2" filter={`url(#cyanGlow_${id})`} />
        <circle cx="260" cy="105" r="1.6" fill="#ffffff" className="sparkle-3" />
        <circle cx="295" cy="125" r="1.4" fill="#38bdf8" className="sparkle-1" />
        <circle cx="180" cy="160" r="1.3" fill="#00f0ff" className="sparkle-2" />
        <circle cx="285" cy="165" r="1.3" fill="#FF5812" className="sparkle-3" filter={`url(#orangeGlow_${id})`} />
      </svg>
    </div>
  );
}

export default MicrosoftCloudCardVisual;
