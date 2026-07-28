"use client";

import { useState, useEffect } from "react";
import { developmentProcessData } from '../data/developmentProcess';

const TABS = developmentProcessData.tabs;
const techData = developmentProcessData.capabilities;

const CARD_COLORS = [
  { bg: "bg-[#F3F0FF]", icon: "text-[#7C5CFC]" },
  { bg: "bg-[#ECFDF5]", icon: "text-[#10B981]" },
  { bg: "bg-[#FFF4E8]", icon: "text-[#FF5812]" },
  { bg: "bg-[#EFF6FF]", icon: "text-[#2563EB]" },
  { bg: "bg-[#FEF3F2]", icon: "text-[#E11D48]" },
  { bg: "bg-[#F5F3FF]", icon: "text-[#8B5CF6]" },
];

export default function DevelopmentProcess() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>(TABS[0]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const idx = TABS.indexOf(prev);
        return TABS[(idx + 1) % TABS.length];
      });
    }, 2500);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section 
      className="px-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float-breathing {
          0%, 100% { transform: translateY(0); box-shadow: 0 4px 15px rgba(0,0,0,0.02), 0 0 10px rgba(255,88,18,0.02); }
          50% { transform: translateY(-3px); box-shadow: 0 4px 15px rgba(0,0,0,0.02), 0 0 25px rgba(255,88,18,0.08); }
        }
        .process-card {
          animation: float-breathing 3s ease-in-out infinite;
          background: radial-gradient(circle at center, rgba(255,88,18,0.02) 0%, #ffffff 80%);
          transition: border-color 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease;
        }
        .process-card:hover {
          animation-play-state: paused;
          transform: translateY(-8px) scale(1.01) !important;
          box-shadow: 0 10px 30px rgba(0,0,0,0.06), 0 0 35px rgba(255,88,18,0.15) !important;
          border-color: rgba(255,88,18,0.5) !important;
          cursor: pointer;
        }
        .process-icon-container {
          transition: transform 0.4s ease, filter 0.4s ease;
        }
        .process-card:hover .process-icon-container {
          transform: scale(1.05);
          filter: brightness(1.05);
        }
        .process-icon {
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .process-card:hover .process-icon {
          transform: rotate(8deg) scale(1.1);
        }
      `}} />
      <div className="max-w-7xl mx-auto">
        {/* ================= HEADER ================= */}
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-[#FF5812]/20"></div>
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5812]"></span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF5812]">
                {developmentProcessData.badge}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5812]"></span>
            </div>
            <div className="w-8 h-[1px] bg-[#FF5812]/20"></div>
          </div>

          <h2 className="text-[clamp(32px,4.5vw,56px)] font-semibold leading-[0.9] tracking-[-0.04em] text-[#0A0A1A]">
            {developmentProcessData.heading.prefix}
            <span className="text-[#FF5812]">
              {developmentProcessData.heading.highlight}
            </span>
            {developmentProcessData.heading.suffix}
          </h2>

          <p className="mx-auto mt-6 max-w-[600px] text-base leading-relaxed text-[#0a0a1a]/70">
            {developmentProcessData.subheading}
          </p>
        </div>

        {/* ================= TABS ================= */}
        <div className="mb-10 flex justify-center">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 border-b border-gray-200">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-3 text-sm font-medium transition-colors duration-300 ${
                  activeTab === tab
                    ? "text-[#FF5812]"
                    : "text-zinc-700 hover:text-[#FF5812]"
                }`}
              >
                {tab}

                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-[#FF5812]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ================= TECH CARDS ================= */}
        <div
          className="relative rounded-[32px] border border-[#FF5812]/40 bg-gradient-to-br from-white via-[#FFF9F5] to-white px-4 sm:px-10 py-12 shadow-[0_0_40px_rgba(255,88,18,0.1)]"
        >
          {/* ambient glow */}
          <div className="pointer-events-none absolute inset-0 flex justify-center overflow-hidden rounded-[32px]">
            <div className="h-40 w-full max-w-[520px] rounded-full bg-[#FF5812]/5 blur-[100px]" />
          </div>

          <div
            key={activeTab}
            className="
      relative z-10
      grid gap-8
      grid-cols-2
      sm:grid-cols-3
      lg:grid-cols-6
    "
          >
            {techData[activeTab].map((tech, index) => {
              const Icon = tech.icon;
              const theme = CARD_COLORS[index % CARD_COLORS.length];

              return (
                <div
                  key={tech.name}
                  className="
            process-card
            relative
            flex flex-col items-center justify-center
            rounded-[20px]
            border border-zinc-200
            p-7
          "
                >
                  {/* icon container */}
                  <div
                    className={`
            mb-4
            flex h-12 w-12 items-center justify-center
            rounded-xl
            ${theme.bg}
            process-icon-container
          `}
                  >
                    <Icon className={`h-6 w-6 ${theme.icon} process-icon`} />
                  </div>

                  {/* name */}
                  <span className="text-center text-sm font-semibold text-[#0A0A1A] tracking-wide transition-colors duration-400">
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
