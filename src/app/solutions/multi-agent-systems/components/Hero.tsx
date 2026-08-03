"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HERO_DATA } from "../data/heroData";

export const Hero: React.FC = () => {
  const { label, heading, paragraph, ctaButtons, features, capabilities } =
    HERO_DATA;

  const robotRef = useRef<HTMLDivElement>(null);
  const eyeX = useSpring(0, { stiffness: 150, damping: 18 });
  const eyeY = useSpring(0, { stiffness: 150, damping: 18 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!robotRef.current) return;
      const rect = robotRef.current.getBoundingClientRect();
      const robotCenterX = rect.left + rect.width / 2;
      const robotCenterY = rect.top + rect.height / 3;
      const deltaX = e.clientX - robotCenterX;
      const deltaY = e.clientY - robotCenterY;
      const distance = Math.hypot(deltaX, deltaY);
      const angle = Math.atan2(deltaY, deltaX);
      const maxDistance = 5;
      const moveDist = Math.min(distance / 25, maxDistance);
      eyeX.set(Math.cos(angle) * moveDist);
      eyeY.set(Math.sin(angle) * moveDist);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [eyeX, eyeY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] as const },
    },
  };

  return (
    <section className="relative flex w-full min-h-[90vh] items-center overflow-hidden bg-transparent pb-12 pt-20 font-sans text-base text-[#0A0F3C] lg:min-h-screen lg:pb-16 lg:pt-28">
      <div className="pointer-events-none absolute right-0 top-1/2 h-[750px] w-[750px] -translate-y-1/2 opacity-30">
        <svg viewBox="0 0 700 700" fill="none" className="h-full w-full">
          <circle
            cx="500"
            cy="350"
            r="300"
            stroke="#FF5812"
            strokeWidth="1"
            strokeDasharray="4 8"
            opacity="0.25"
          />
          <circle cx="500" cy="350" r="420" stroke="#FF5812" strokeWidth="1" opacity="0.15" />
          <circle
            cx="500"
            cy="350"
            r="540"
            stroke="#FF5812"
            strokeWidth="1"
            strokeDasharray="6 12"
            opacity="0.1"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Copy */}
          <motion.div
            className="flex flex-col items-center text-center lg:col-span-6 lg:items-start lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-orange-100 bg-orange-50 px-2.5 py-1"
            >
              <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-600" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
                {label}
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mb-6 w-full break-words text-3xl font-extrabold leading-[1.15] tracking-tight text-[#0A0F3C] sm:text-4xl sm:leading-[1.1] lg:text-5xl xl:text-[3.25rem]"
            >
              {heading.prefix}
              <span className="relative text-[#FF5812]"> {heading.highlight}</span>
              {heading.suffix}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mb-8 max-w-md text-sm font-normal leading-relaxed text-slate-600 lg:text-base"
            >
              {paragraph}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mb-10 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row"
            >
              <Link
                href={ctaButtons.primary.href}
                className="group relative inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-[#0A0F3C] transition-all duration-300 hover:bg-gray-50 sm:w-auto"
              >
                <span>{ctaButtons.primary.text}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex w-full flex-col gap-5 border-t border-gray-100 pt-6 md:flex-row md:gap-4"
            >
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="flex flex-1 flex-col gap-1.5">
                    <div className="flex items-start gap-2">
                      <Icon
                        className="mt-[1px] h-5 w-5 shrink-0 text-[#FF6B00]"
                        strokeWidth={1.5}
                      />
                      <h4 className="text-[12.5px] font-semibold leading-[1.25] text-[#0A0F3C] whitespace-pre-line">
                        {feature.title.replace(" ", "\n")}
                      </h4>
                    </div>
                    <p className="pr-2 text-[11px] leading-relaxed text-gray-500">
                      {feature.subtitle}
                    </p>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Multi-agent orchestration loop */}
          <div className="relative mt-6 flex items-center justify-center lg:col-span-6 lg:mt-0">
            <div className="relative flex h-[320px] w-[320px] items-center justify-center sm:h-[440px] sm:w-[440px] lg:h-[480px] lg:w-[480px]">
              <motion.div
                className="pointer-events-none absolute h-52 w-52 rounded-full bg-gradient-to-tr from-[#FF6B00]/30 via-[#FF5812]/15 to-transparent blur-3xl sm:h-72 sm:w-72"
                animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.85, 0.5] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Orbit ring = the multi-agent loop */}
              <div className="pointer-events-none absolute inset-6 rounded-full border-4 border-[#FF6B00] shadow-[0_0_20px_rgba(255,107,0,0.2)] sm:inset-8" />

              {/* Capability cards loop */}
              {capabilities.map((card) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.id}
                    className="pointer-events-none absolute inset-6 rounded-full sm:inset-8"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                  >
                    <div
                      className="pointer-events-auto absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                      style={{
                        left: `${50 + 50 * Math.cos((card.angle * Math.PI) / 180)}%`,
                        top: `${50 + 50 * Math.sin((card.angle * Math.PI) / 180)}%`,
                      }}
                    >
                      <div className="absolute z-10 h-3 w-3 rounded-full border-2 border-white bg-[#FF6B00] shadow-sm ring-2 ring-orange-200" />
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                        className="z-20"
                      >
                        <motion.div
                          whileHover={{
                            y: -5,
                            scale: 1.07,
                            boxShadow:
                              "0 18px 28px -6px rgba(255, 107, 0, 0.25), 0 8px 12px -4px rgba(0, 0, 0, 0.08)",
                          }}
                          className="group flex w-[100px] cursor-pointer flex-col items-center rounded-2xl border border-gray-100/90 bg-white/95 p-2.5 text-center shadow-md shadow-gray-200/70 backdrop-blur-xl transition-all duration-300 sm:w-[125px] sm:p-3"
                        >
                          <div className="mb-1 flex h-8 w-8 items-center justify-center rounded-xl bg-orange-50 transition-colors group-hover:bg-orange-100 sm:h-9 sm:w-9">
                            <Icon className="h-4 w-4 text-[#FF5812] sm:h-[18px] sm:w-[18px]" />
                          </div>
                          <h3 className="mb-0.5 text-[11px] font-bold leading-tight text-[#0A0F3C] sm:text-xs">
                            {card.title}
                          </h3>
                          <p className="text-[8.5px] font-medium leading-snug text-gray-500 sm:text-[10px]">
                            {card.subtitle}
                          </p>
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Center: multi-agent cluster (not a single bot) */}
              <div
                ref={robotRef}
                className="pointer-events-none relative z-30 flex flex-col items-center justify-center"
              >
                <motion.div
                  className="relative h-40 w-44 sm:h-52 sm:w-56 lg:h-56 lg:w-60"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <svg
                    viewBox="0 0 240 220"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-full drop-shadow-xl"
                  >
                    <defs>
                      <linearGradient id="masBody" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="100%" stopColor="#E2E6EE" />
                      </linearGradient>
                      <linearGradient id="masVisor" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#0B0F2A" />
                        <stop offset="100%" stopColor="#1A2044" />
                      </linearGradient>
                      <radialGradient id="masEye" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#FF8800" />
                        <stop offset="100%" stopColor="#FF5812" />
                      </radialGradient>
                    </defs>

                    {/* Coordination loop between agents */}
                    <ellipse
                      cx="120"
                      cy="118"
                      rx="78"
                      ry="42"
                      fill="none"
                      stroke="#FF5812"
                      strokeWidth="2"
                      strokeDasharray="5 6"
                      opacity="0.45"
                    />
                    <path
                      d="M55 100 C70 70 170 70 185 100"
                      stroke="#FF6B00"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.35"
                    />

                    {/* Agent A (left) */}
                    <g transform="translate(18, 70)">
                      <rect width="64" height="52" rx="16" fill="url(#masBody)" stroke="#E0E5ED" strokeWidth="2" />
                      <rect x="8" y="10" width="48" height="28" rx="12" fill="url(#masVisor)" />
                      <motion.g style={{ x: eyeX, y: eyeY }}>
                        <circle cx="22" cy="24" r="5" fill="url(#masEye)" />
                        <circle cx="42" cy="24" r="5" fill="url(#masEye)" />
                      </motion.g>
                    </g>

                    {/* Agent B (top / supervisor) */}
                    <g transform="translate(88, 18)">
                      <rect width="64" height="52" rx="16" fill="url(#masBody)" stroke="#E0E5ED" strokeWidth="2" />
                      <rect x="8" y="10" width="48" height="28" rx="12" fill="url(#masVisor)" />
                      <motion.g style={{ x: eyeX, y: eyeY }}>
                        <circle cx="22" cy="24" r="5" fill="url(#masEye)" />
                        <circle cx="42" cy="24" r="5" fill="url(#masEye)" />
                      </motion.g>
                      <rect x="18" y="44" width="28" height="14" rx="5" fill="#FF5812" />
                      <text
                        x="32"
                        y="54"
                        fill="#fff"
                        fontSize="8"
                        fontWeight="800"
                        textAnchor="middle"
                        fontFamily="sans-serif"
                      >
                        ORCH
                      </text>
                    </g>

                    {/* Agent C (right) */}
                    <g transform="translate(158, 70)">
                      <rect width="64" height="52" rx="16" fill="url(#masBody)" stroke="#E0E5ED" strokeWidth="2" />
                      <rect x="8" y="10" width="48" height="28" rx="12" fill="url(#masVisor)" />
                      <motion.g style={{ x: eyeX, y: eyeY }}>
                        <circle cx="22" cy="24" r="5" fill="url(#masEye)" />
                        <circle cx="42" cy="24" r="5" fill="url(#masEye)" />
                      </motion.g>
                    </g>

                    {/* Shared context hub */}
                    <circle cx="120" cy="118" r="16" fill="#FF5812" />
                    <circle cx="120" cy="118" r="16" fill="none" stroke="#fff" strokeWidth="2" opacity="0.5" />
                    <text
                      x="120"
                      y="122"
                      fill="#fff"
                      fontSize="8"
                      fontWeight="800"
                      textAnchor="middle"
                      fontFamily="sans-serif"
                    >
                      LOOP
                    </text>

                    {/* Pedestal */}
                    <ellipse cx="120" cy="195" rx="70" ry="12" fill="#DDE2EC" />
                    <ellipse cx="120" cy="192" rx="70" ry="11" fill="#FFFFFF" />
                    <ellipse
                      cx="120"
                      cy="192"
                      rx="62"
                      ry="8"
                      fill="none"
                      stroke="#FF5812"
                      strokeWidth="2"
                      opacity="0.85"
                    />
                  </svg>
                </motion.div>

                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF5812]">
                  Multi-agent loop
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
