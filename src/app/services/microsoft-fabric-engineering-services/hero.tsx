"use client";
import React, { useEffect } from 'react';
import TrustStrip from "@/components/sections/TrustStrip";

const HeroSection = () => {
  useEffect(() => {
    // Calculate path lengths for accurate animations
    document.querySelectorAll('.animation-line').forEach(path => {
      // @ts-ignore
      const len = path.getTotalLength();
      // @ts-ignore
      path.style.setProperty('--path-length', `${len}px`);
      // @ts-ignore
      path.style.strokeDasharray = `${len}px`;
    });
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes patternScroll {
            0% { transform: translate(-5%, -5%); }
            100% { transform: translate(5%, 5%); }
          }
          
          .animate-fadeIn {
            animation: fadeIn 1s ease-out forwards;
          }
          
          .animate-patternScroll {
            animation: patternScroll 20s linear infinite;
          }
          
          .gradient-text {
            background: linear-gradient(270deg, #f97316, #ea580c, #f59e0b, #f97316);
            background-size: 600% 600%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradient 15s ease infinite;
          }
          
          @keyframes drawLine {
            0% {
              stroke-dashoffset: var(--path-length, 0);
            }
            100% {
              stroke-dashoffset: 0;
            }
          }
          
          .animation-line {
            fill: none;
            stroke: white;
            stroke-width: 2;
            stroke-dasharray: var(--path-length, 0);
            stroke-dashoffset: var(--path-length, 0);
            animation: drawLine 3s ease-in-out infinite;
          }
          
          /* Pulse animation for the button */
          @keyframes pulse {
            0% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.3); }
            50% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.5); }
            100% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.3); }
          }
          
          .pulse-animation {
            animation: pulse 2s infinite;
          }

          @keyframes dotPulse {
            0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 8px rgba(249,115,22,0.8); }
            50% { opacity: 0.5; transform: scale(0.8); box-shadow: 0 0 2px rgba(249,115,22,0.4); }
          }
          .eyebrow-dot {
            animation: dotPulse 2s ease-in-out infinite;
          }
        `}
      </style>
      
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white font-sans overflow-hidden relative">
        {/* Background Patterns */}
        <div className="pattern absolute w-[200%] h-[200%] bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.1)_10px,rgba(255,255,255,0.1)_20px)] animate-patternScroll pointer-events-none" style={{ top: '-50%', left: '-50%', zIndex: 0 }}></div>
        <div className="pattern absolute w-[200%] h-[200%] bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.1)_10px,rgba(255,255,255,0.1)_20px)] animate-patternScroll pointer-events-none" style={{ top: '50%', left: '50%', zIndex: 0 }}></div>

        {/* Dynamic Lines */}
        <div className="line-group absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none opacity-60">
          <svg className="line-wrapper absolute w-full h-full" viewBox="0 0 177 159" preserveAspectRatio="none">
            <path 
              id="main-line" 
              className="animation-line" 
              d="M176 1L53.5359 1C52.4313 1 51.5359 1.89543 51.5359 3L51.5359 56C51.5359 57.1046 50.6405 58 49.5359 58L0 58"
            />
          </svg>
          
          <svg className="line-wrapper absolute w-full h-full" viewBox="0 0 176 59" preserveAspectRatio="none">
            <path 
              className="animation-line" 
              d="M0 1L122.464 1C123.569 1 124.464 1.89543 124.464 3L124.464 56C124.464 57.1046 125.36 58 126.464 58L176 58"
            />
          </svg>
        </div>

        {/* Container */}
        <div className="container text-center z-10 relative p-10 pt-32 animate-fadeIn flex-grow flex flex-col justify-center items-center pointer-events-auto">
          <div className="inline-flex items-center gap-2 bg-[#f97316]/10 border border-[#f97316]/25 text-[#f97316] text-xs font-semibold tracking-[0.1em] uppercase px-4 py-1.5 rounded-full mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[#f97316] eyebrow-dot" />
            Microsoft Fabric Offshore Technology Partner
          </div>
          <h1 className="text-6xl leading-tight m-0 relative z-20 drop-shadow-[0_0_8px_rgba(0,0,0,1)] [text-shadow:0_4px_12px_rgba(0,0,0,1),0_0_24px_rgba(0,0,0,1)]">
            Build, Extend & Deliver Microsoft Fabric Solutions<br />
            <span className="gradient-text inline-block relative z-10 [text-shadow:none]">With a White-Label Engineering Partner</span>
          </h1>
          <p className="mt-8 text-lg max-w-3xl mx-auto text-gray-300 leading-relaxed relative z-20">
            Extend your data engineering and analytics capabilities with an offshore Microsoft Fabric team that designs, builds, and maintains solutions—from OneLake architecture to Power BI and AI-ready data platforms.
          </p>
          <div className="w-full relative z-20 mt-4">
            <TrustStrip theme="dark" />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
