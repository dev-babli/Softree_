"use client";

import React from "react";
import TrustStrip from "@/components/sections/TrustStrip";
import { typography } from "@/lib/typography";

export function SpfxHero() {
  return (
    <div className="relative w-full flex min-h-[92vh] lg:min-h-screen flex-col items-center justify-between overflow-hidden bg-black text-[calc(var(--size)*0.022)] text-white pt-20 sm:pt-24 lg:pt-28 pb-0 [--factor:min(1000px,100vh)] [--size:min(var(--factor),100vw)]">
      {/* Background Ambient Glow Container */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden z-0">
        <div className="bg absolute h-full w-full max-w-[46em]">
          {/* Dual Horizon Spheres creating the curved upper and below globe arcs with orange shine animation */}
          <div className="shadow-bgt absolute size-full translate-[0_-70%] scale-[1.2] rounded-[100em]" />
          <div className="shadow-bgb absolute size-full translate-[0_70%] scale-[1.2] rounded-[100em]" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center my-auto pt-4 sm:pt-6">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/35 bg-orange-500/10 mb-5 sm:mb-6 backdrop-blur-md shadow-sm">
          <div className="w-2 h-2 rounded-full bg-[#FF6B2C] animate-pulse shadow-[0_0_10px_rgba(255,107,44,0.9)]" />
          <span className={`${typography.caption.default} text-[#FF6B2C] font-semibold tracking-wider uppercase`}>
            SHAREPOINT FRAMEWORK (SPFX) DEVELOPMENT
          </span>
        </div>

        {/* Heading */}
        <h1 className={`${typography.heading.h1} text-center font-bold tracking-tight text-white max-w-5xl leading-[1.14]`}>
          Build Modern SharePoint <br className="hidden sm:inline" />
          <span className="text-[#FF5812] bg-gradient-to-r from-[#FF5812] via-[#FF7A30] to-[#FFA048] bg-clip-text text-transparent inline-block">
            Experiences with SPFx
          </span>
        </h1>

        {/* Description */}
        <p className={`${typography.description.default} mt-6 sm:mt-8 max-w-2xl sm:max-w-3xl text-center text-zinc-300 leading-relaxed font-normal`}>
          Our dedicated SPFx development team builds customized SharePoint solutions using React, TypeScript, Fluent UI, and Microsoft 365. We create modern web parts, extensions, applications, and integrations that improve SharePoint functionality, user experience, and business workflows.
        </p>
      </div>

      {/* Trust Strip */}
      <div className="relative z-20 mt-auto pt-6 sm:pt-8 pb-2 px-4 max-w-7xl mx-auto w-full">
        <TrustStrip theme="dark" className="!mt-0 !mb-0" />
      </div>

      <style>{`
        .shadow-bgt {
          box-shadow: 
            inset 0 0 4.5em 3em rgba(255, 88, 18, 0.28),
            inset 0 0 2em 0.5em rgba(255, 120, 44, 0.35),
            0 0 0.15em 0.1em rgba(255, 200, 140, 0.5),
            0 0 1.2em 0.4em rgba(255, 88, 18, 0.45),
            0 0 3em 1em rgba(255, 88, 18, 0.25);
          animation: onloadbgt 1.2s ease-in-out forwards, pulse-globe-t 6s ease-in-out 1.2s infinite alternate;
        }

        .shadow-bgb {
          box-shadow: 
            inset 0 0 4.5em 3em rgba(255, 88, 18, 0.28),
            inset 0 0 2em 0.5em rgba(255, 120, 44, 0.35),
            0 0 0.15em 0.1em rgba(255, 200, 140, 0.5),
            0 0 1.2em 0.4em rgba(255, 88, 18, 0.45),
            0 0 3em 1em rgba(255, 88, 18, 0.25);
          animation: onloadbgb 1.2s ease-in-out forwards, pulse-globe-b 6s ease-in-out 1.2s infinite alternate;
        }

        @keyframes onloadbgt {
          0% { transform: translateY(-70%) scale(1.2); opacity: 0.3; }
          100% { transform: translateY(-64%) scale(1.2); opacity: 0.7; }
        }

        @keyframes onloadbgb {
          0% { transform: translateY(70%) scale(1.2); opacity: 0.3; }
          100% { transform: translateY(64%) scale(1.2); opacity: 0.7; }
        }

        @keyframes pulse-globe-t {
          0% {
            transform: translateY(-64%) scale(1.2);
            opacity: 0.7;
            filter: brightness(1) drop-shadow(0 0 14px rgba(255, 88, 18, 0.35));
          }
          50% {
            transform: translateY(-62.5%) scale(1.22);
            opacity: 0.95;
            filter: brightness(1.35) drop-shadow(0 0 32px rgba(255, 107, 44, 0.8)) drop-shadow(0 0 60px rgba(255, 88, 18, 0.45));
          }
          100% {
            transform: translateY(-64%) scale(1.2);
            opacity: 0.75;
            filter: brightness(1.05) drop-shadow(0 0 18px rgba(255, 88, 18, 0.4));
          }
        }

        @keyframes pulse-globe-b {
          0% {
            transform: translateY(64%) scale(1.2);
            opacity: 0.7;
            filter: brightness(1) drop-shadow(0 0 14px rgba(255, 88, 18, 0.35));
          }
          50% {
            transform: translateY(62.5%) scale(1.22);
            opacity: 0.95;
            filter: brightness(1.35) drop-shadow(0 0 32px rgba(255, 107, 44, 0.8)) drop-shadow(0 0 60px rgba(255, 88, 18, 0.45));
          }
          100% {
            transform: translateY(64%) scale(1.2);
            opacity: 0.75;
            filter: brightness(1.05) drop-shadow(0 0 18px rgba(255, 88, 18, 0.4));
          }
        }
      `}</style>
    </div>
  );
}

export default SpfxHero;
