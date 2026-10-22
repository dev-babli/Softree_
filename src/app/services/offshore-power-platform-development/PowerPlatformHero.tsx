"use client";

import React, { useState } from "react";
import TrustStrip from "@/components/sections/TrustStrip";
import { typography } from "@/lib/typography";

const GradientBars: React.FC = () => {
  const [numBars] = useState(15);

  const calculateHeight = (index: number, total: number) => {
    const position = index / (total - 1);
    const maxHeight = 96;
    const minHeight = 26;
    const center = 0.5;
    const distanceFromCenter = Math.abs(position - center);
    const heightPercentage = Math.pow(distanceFromCenter * 2, 1.35);
    return minHeight + (maxHeight - minHeight) * heightPercentage;
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <style>{`
        @keyframes pulsePowerBar {
          0% {
            transform: scaleY(0.72);
            opacity: 0.72;
            filter: brightness(0.95);
          }
          50% {
            transform: scaleY(1.15);
            opacity: 1;
            filter: brightness(1.35) drop-shadow(0 0 20px rgba(255, 107, 44, 0.8));
          }
          100% {
            transform: scaleY(0.85);
            opacity: 0.82;
            filter: brightness(1.05);
          }
        }
      `}</style>
      <div
        className="flex h-full items-end"
        style={{
          width: "100%",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        {Array.from({ length: numBars }).map((_, index) => {
          const height = calculateHeight(index, numBars);
          return (
            <div
              key={index}
              className="relative"
              style={{
                flex: "1 0 calc(100% / 15)",
                maxWidth: "calc(100% / 15)",
                height: `${height}%`,
                transformOrigin: "bottom",
                animation: "pulsePowerBar 2.8s ease-in-out infinite alternate",
                animationDelay: `${index * 0.14}s`,
                boxSizing: "border-box",
                padding: "0 1.5px",
              }}
            >
              <div
                className="w-full h-full relative"
                style={{
                  background:
                    "linear-gradient(to top, rgba(255, 55, 0, 0.98) 0%, rgba(255, 107, 44, 0.88) 35%, rgba(255, 140, 50, 0.55) 65%, rgba(255, 180, 80, 0.18) 85%, transparent 100%)",
                  borderLeft: "1px solid rgba(255, 107, 44, 0.28)",
                  borderRight: "1px solid rgba(0, 0, 0, 0.4)",
                  boxShadow: "inset 0 0 14px rgba(255, 90, 0, 0.25)",
                }}
              >
                {/* Luminous glowing cap line moving with the bar's animated apex */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFA760] to-transparent shadow-[0_0_12px_rgba(255,167,96,0.95)] opacity-90" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Dark gradient fade over bottom of bars so TrustStrip sits on deep dark background exactly like WovenLightHero */}
      <div className="absolute bottom-0 left-0 right-0 h-64 sm:h-80 md:h-96 bg-gradient-to-t from-[#060403] via-[#060403]/90 to-transparent pointer-events-none z-[2]" />
    </div>
  );
};

export default function PowerPlatformHero() {
  return (
    <section className="relative w-full min-h-screen bg-[#060403] text-white overflow-hidden flex flex-col justify-between pt-24 sm:pt-28 pb-8 font-sans">
      {/* Background Deep Canvas */}
      <div className="absolute inset-0 bg-[#060403]"></div>

      {/* Pulsing Animated Gradient Bars in Glowing Orange Shade */}
      <GradientBars />

      {/* Ambient Breathing Glow Orb */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[#FF5812]/15 blur-[130px]" />

      {/* Soft Center Vignette behind text to guarantee perfect readability while leaving bars blazing */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_65%_55%_at_50%_45%,rgba(6,4,3,0.72)_0%,rgba(6,4,3,0.25)_60%,transparent_100%)]" />

      {/* Main Content Container */}
      <div className="relative z-10 text-center w-full max-w-5xl mx-auto px-6 sm:px-8 flex-none lg:flex-1 flex flex-col items-center justify-center my-auto pt-6 pb-16">
        {/* Orange Eyebrow Pill */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FF6B2C]/40 bg-[#FF6B2C]/10 px-4 py-1.5 shadow-[0_0_24px_rgba(255,107,44,0.3)] backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF6B2C] opacity-80" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF6B2C]" />
          </span>
          <span className={`${typography.caption.default} font-bold text-[#FF6B2C] uppercase tracking-wider`}>
            Microsoft Power Platform Services
          </span>
        </div>

        {/* Heading: One part white, one part orange */}
        <h1 className={`${typography.heading.h1} w-full text-center leading-[1.1] tracking-tight mb-6 px-4`}>
          <span className="block font-extrabold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            Offshore Power Platform
          </span>
          <span className="block font-extrabold text-[#FF6B2C] drop-shadow-[0_0_35px_rgba(255,107,44,0.5)] mt-1 sm:mt-2">
            Engineering &amp; Development Services
          </span>
        </h1>

        {/* Description Paragraph */}
        <p className={`${typography.description.default} max-w-3xl text-zinc-200 px-4 text-center leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]`}>
          Build and scale Microsoft Power Platform solutions with Power Apps, Power Automate, Power BI, Power Pages, Dataverse and Copilot Studio. Softree provides offshore development and white-label delivery for businesses, agencies and technology partners that need flexible Power Platform engineering capacity.
        </p>
      </div>

      {/* ======================================================== */}
      {/* BOTTOM TRUST STRIP */}
      {/* ======================================================== */}
      <div className="relative z-20 w-full shrink-0 -mt-10 sm:-mt-12 lg:-mt-16">
        <TrustStrip theme="dark" />
      </div>
    </section>
  );
}

export { PowerPlatformHero };
