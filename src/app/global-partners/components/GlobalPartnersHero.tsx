"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TrustStrip from "@/components/sections/TrustStrip";
import { OrbitalHeroSection, Planet } from "@/components/ui/orbital-hero-section";

const ORANGE_PLANETS: Planet[] = [
  { name: "Mercury", a: 0.38710, e: 0.20563, i: 7.005, node: 48.331, peri: 29.125, M0: 174.796, color: "#FFA26B", size: 2.8, glow: 1.3 },
  { name: "Venus",   a: 0.72333, e: 0.00677, i: 3.395, node: 76.680, peri: 54.853, M0: 50.115,  color: "#FF8438", size: 3.6, glow: 1.4 },
  { name: "Earth",   a: 1.00000, e: 0.01671, i: 0.000, node: 348.739, peri: 114.208, M0: 357.517, color: "#FF5812", size: 4.0, glow: 1.5 },
  { name: "Mars",    a: 1.52371, e: 0.09339, i: 1.850, node: 49.558, peri: 286.483, M0: 19.373, color: "#FF4200", size: 3.2, glow: 1.3 },
  { name: "Jupiter", a: 5.20290, e: 0.04839, i: 1.303, node: 100.464, peri: 273.867, M0: 20.020, color: "#FF731A", size: 5.6, glow: 1.4 },
  { name: "Saturn",  a: 9.53700, e: 0.05386, i: 2.485, node: 113.665, peri: 339.392, M0: 317.020, color: "#FFB074", size: 5.0, glow: 1.3 },
];

/** True while the viewport is narrow. Drives responsive orbital focal point. */
function useNarrow(query = "(max-width: 767px)") {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    const sync = () => setNarrow(m.matches);
    sync();
    m.addEventListener("change", sync);
    return () => m.removeEventListener("change", sync);
  }, [query]);
  return narrow;
}

export const GlobalPartnersHero: React.FC = () => {
  const narrow = useNarrow();

  return (
    <section className="relative w-full overflow-hidden bg-black font-sans text-white">
      <OrbitalHeroSection
        planets={ORANGE_PLANETS}
        focus={[0.5, narrow ? 0.48 : 0.43]}
        scrim={narrow ? "top" : "sides"}
        scrimStrength={0.92}
        viewRadius={narrow ? 2.2 : 3.4}
        lead={0}
        driftSpeed={1.05}
        trailYears={1.85}
        glow={narrow ? 0.7 : 1.25}
        sunColor="#FF5812"
        className="pt-28 pb-4 sm:pt-32 sm:pb-6 lg:min-h-[85svh] lg:pt-36 lg:pb-6 flex flex-col justify-between"
      >
        <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-6 sm:px-8 lg:px-12">
          {/* Main Content Area */}
          <div className="flex flex-1 flex-col justify-center pt-2 pb-10 lg:pt-6 lg:pb-14">
            {/* Three-Zone Layout: Left Title (cols 1-4), Middle Open Orbit Zone (cols 5-8), Right Description (cols 9-12) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 lg:gap-x-8 xl:gap-x-12 items-center">
              {/* Left Column - Eyebrow & 4-Line Heading (cols 1-4) */}
              <div className="flex flex-col lg:col-span-4 xl:col-span-4 max-w-[420px] z-20">
                {/* Top Badge with Live Beacon Animation */}
                <motion.div
                  initial={{ opacity: 0, y: 14, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.03 }}
                  className="inline-flex items-center gap-2.5 self-start rounded-full bg-[#FF5812] px-3.5 py-1.5 shadow-[0_4px_24px_-4px_rgba(255,88,18,0.55)] cursor-default mb-4 sm:mb-6"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                  </span>
                  <span className="typo-caption font-bold text-white tracking-wide uppercase">
                    GLOBAL TECHNOLOGY PARTNERSHIPS
                  </span>
                </motion.div>

                {/* 4-Line Structured Heading - All in Orange */}
                <h1 className="typo-heading-3 sm:typo-heading-2 text-[#FF5812] leading-[1.12] font-extrabold">
                  <motion.span
                    initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="block whitespace-nowrap drop-shadow-[0_0_25px_rgba(255,88,18,0.45)]"
                  >
                    Your Global
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.6, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
                    className="block whitespace-nowrap drop-shadow-[0_0_25px_rgba(255,88,18,0.45)]"
                  >
                    Technology Partner for
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.6, delay: 0.20, ease: [0.16, 1, 0.3, 1] }}
                    className="block whitespace-nowrap drop-shadow-[0_0_25px_rgba(255,88,18,0.45)] mt-1"
                  >
                    AI, Microsoft, Data &amp;
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.6, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
                    className="block whitespace-nowrap drop-shadow-[0_0_25px_rgba(255,88,18,0.45)]"
                  >
                    Software Engineering
                  </motion.span>
                </h1>
              </div>

              {/* Middle Spacer - Open Central Orbit Corridor (cols 5-8) where the solar system animates unobstructed */}
              <div
                className="h-36 sm:h-52 lg:h-80 xl:h-[360px] lg:col-span-4 xl:col-span-4 flex items-center justify-center pointer-events-none"
                aria-hidden="true"
              />

              {/* Right Column - Description (cols 9-12) */}
              <div className="flex flex-col justify-center lg:col-span-4 xl:col-span-4 lg:col-start-9 xl:col-start-9 max-w-[420px] ml-auto z-20">
                <motion.div
                  initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.65, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-4 max-w-lg lg:max-w-none"
                >
                  <p className="typo-description-sm text-zinc-300 leading-relaxed">
                    Softree partners with technology companies, Microsoft partners, digital agencies, SaaS providers, and businesses worldwide to accelerate AI development, Microsoft technology adoption, data engineering, and software development.
                  </p>
                  <p className="typo-description-sm text-zinc-400 leading-relaxed">
                    Extend your technical capabilities, scale engineering capacity, and deliver innovative digital products with a reliable technology partner.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Trust Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
            className="w-full mt-auto [&>div]:!mt-0 [&>div]:!gap-4 sm:[&>div]:!gap-6"
          >
            <TrustStrip theme="dark" />
          </motion.div>
        </div>

        {/* Subtle bottom glowing orange accent line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.8 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF5812]/50 to-transparent"
        />
      </OrbitalHeroSection>
    </section>
  );
};

export default GlobalPartnersHero;
