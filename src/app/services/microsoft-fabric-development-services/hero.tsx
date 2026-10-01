"use client";
import React from 'react';
import TrustStrip from "@/components/sections/TrustStrip";

const HeroSection = () => {
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
          
          .animate-fadeIn {
            animation: fadeIn 1s ease-out forwards;
          }
          
          .gradient-text {
            background: linear-gradient(270deg, #f97316, #ea580c, #f59e0b, #f97316);
            background-size: 600% 600%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradient 15s ease infinite;
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
        {/* Full Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-60"
        >
          <source src="/hero-video/hero-background.mp4" type="video/mp4" />
        </video>

        {/* Ambient Dark Gradient / Vignette Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90 z-0 pointer-events-none" />

        {/* Container */}
        <div className="container text-center z-10 relative p-10 pt-32 animate-fadeIn flex-grow flex flex-col justify-center items-center pointer-events-auto">
          <div className="inline-flex items-center gap-2 bg-[#f97316]/10 border border-[#f97316]/25 text-[#f97316] typo-caption px-4 py-1.5 rounded-full mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[#f97316] eyebrow-dot" />
            Microsoft Fabric Offshore Technology Partner
          </div>
          <h1 className="typo-heading-1 m-0 relative z-20 drop-shadow-[0_0_8px_rgba(0,0,0,1)] [text-shadow:0_4px_12px_rgba(0,0,0,1),0_0_24px_rgba(0,0,0,1)]">
            Build, Extend & Deliver Microsoft Fabric Solutions<br />
            <span className="gradient-text inline-block relative z-10 [text-shadow:none]">With a White-Label Engineering Partner</span>
          </h1>
          <p className="mt-8 typo-description max-w-3xl mx-auto text-gray-300 relative z-20">
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
