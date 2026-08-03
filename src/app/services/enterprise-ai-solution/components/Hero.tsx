'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useSpring } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Box, TrendingUp, Cpu } from 'lucide-react';
import { HERO_DATA } from '../data/heroData';

export const Hero: React.FC = () => {
  const { label, heading, paragraph, ctaButtons, features, capabilities } =
    HERO_DATA;

  // Reference for robot container to calculate relative cursor offset
  const robotRef = useRef<HTMLDivElement>(null);

  // Smooth springs for eye movement (X and Y offsets)
  const eyeX = useSpring(0, { stiffness: 150, damping: 18 });
  const eyeY = useSpring(0, { stiffness: 150, damping: 18 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!robotRef.current) return;

      const rect = robotRef.current.getBoundingClientRect();
      // Center coordinates of the robot visor
      const robotCenterX = rect.left + rect.width / 2;
      const robotCenterY = rect.top + rect.height / 3;

      const deltaX = e.clientX - robotCenterX;
      const deltaY = e.clientY - robotCenterY;

      const distance = Math.hypot(deltaX, deltaY);
      const angle = Math.atan2(deltaY, deltaX);

      // Max eye pupil shift distance inside visor screen (max 6px)
      const maxDistance = 6;
      const moveDist = Math.min(distance / 25, maxDistance);

      const targetX = Math.cos(angle) * moveDist;
      const targetY = Math.sin(angle) * moveDist;

      eyeX.set(targetX);
      eyeY.set(targetY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [eyeX, eyeY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
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
    <section className="relative w-full min-h-screen bg-transparent font-sans text-base text-[#0A0F3C] overflow-hidden flex items-center pt-20 pb-12 lg:pt-28 lg:pb-16">
      {/* Background concentric subtle arcs */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[750px] h-[750px] pointer-events-none opacity-30">
        <svg viewBox="0 0 700 700" fill="none" className="w-full h-full">
          <circle cx="500" cy="350" r="300" stroke="#FF5812" strokeWidth="1" strokeDasharray="4 8" opacity="0.25" />
          <circle cx="500" cy="350" r="420" stroke="#FF5812" strokeWidth="1" opacity="0.15" />
          <circle cx="500" cy="350" r="540" stroke="#FF5812" strokeWidth="1" strokeDasharray="6 12" opacity="0.1" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* LEFT COLUMN */}
          <motion.div
            className="lg:col-span-6 flex flex-col items-center text-center lg:items-start lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Small Label Pill Tag */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-100 mb-6"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-orange-600 shrink-0" />
              <span className="text-[10px] font-bold tracking-wider text-orange-600 uppercase">
                {label}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] leading-[1.15] sm:leading-[1.1] font-extrabold tracking-tight text-[#0A0F3C] mb-6 whitespace-pre-line break-words w-full"
            >
              {heading.prefix}
              <span className="text-[#FF5812] relative">
                {' '}{heading.highlight}
              </span>
              {heading.suffix}
            </motion.h1>

            {/* Paragraph */}
            <motion.p
              variants={itemVariants}
              className="text-sm lg:text-base text-slate-600 font-normal leading-relaxed max-w-md mb-8"
            >
              {paragraph}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10"
            >
              <Link
                href={ctaButtons.primary.href}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl border border-gray-200 bg-white text-[#0A0F3C] font-semibold text-sm hover:bg-gray-50 transition-all duration-300"
              >
                <span>{ctaButtons.primary.text}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              {ctaButtons.secondary && ctaButtons.secondary.text && (
                <Link
                  href={ctaButtons.secondary.href}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-white text-[#0A0F3C] border border-gray-200/80 font-semibold text-base hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  {ctaButtons.secondary.text}
                </Link>
              )}
            </motion.div>

            {/* Features */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col md:flex-row w-full pt-6 border-t border-gray-100 gap-5 md:gap-4"
            >
              {/* Item 1 */}
              <div className="flex flex-col gap-1.5 flex-1">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#FF6B00] shrink-0 mt-[1px]" strokeWidth={1.5} />
                  <h4 className="text-[12.5px] font-semibold text-[#0A0F3C] leading-[1.25]">White-Label<br/>Friendly</h4>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed pr-2">Trusted partner for tech agencies.</p>
              </div>

              {/* Item 2 */}
              <div className="flex flex-col gap-1.5 flex-1">
                <div className="flex items-start gap-2">
                  <Box className="w-5 h-5 text-[#FF6B00] shrink-0 mt-[1px]" strokeWidth={1.5} />
                  <h4 className="text-[12.5px] font-semibold text-[#0A0F3C] leading-[1.25]">Dedicated<br/>Offshore Teams</h4>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed pr-2">Scale engineering on demand.</p>
              </div>

              {/* Item 3 */}
              <div className="flex flex-col gap-1.5 flex-1">
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-5 h-5 text-[#FF6B00] shrink-0 mt-[1px]" strokeWidth={1.5} />
                  <h4 className="text-[12.5px] font-semibold text-[#0A0F3C] leading-[1.25]">Microsoft AI<br/>Expertise</h4>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed pr-2">Azure, OpenAI & Power Platform.</p>
              </div>

              {/* Item 4 */}
              <div className="flex flex-col gap-1.5 flex-1">
                <div className="flex items-start gap-2">
                  <Cpu className="w-5 h-5 text-[#FF6B00] shrink-0 mt-[1px]" strokeWidth={1.5} />
                  <h4 className="text-[12.5px] font-semibold text-[#0A0F3C] leading-[1.25]">Enterprise-Ready<br/>Delivery</h4>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed pr-2">Secure, production-grade solutions.</p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Robot + Orbiting Cards (Generous Coverage) */}
          <div className="lg:col-span-6 flex items-center justify-center relative mt-6 lg:mt-0">
            <div className="relative w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] lg:w-[480px] lg:h-[480px] flex items-center justify-center">

              {/* Light Orange Glow behind Robot */}
              <motion.div
                className="absolute w-52 h-52 sm:w-72 sm:h-72 rounded-full bg-gradient-to-tr from-[#FF6B00]/30 via-[#FF5812]/15 to-transparent blur-3xl pointer-events-none"
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.5, 0.85, 0.5],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Orbit Ring */}
              <div className="absolute inset-6 sm:inset-8 lg:inset-8 rounded-full border-4 border-[#FF6B00] shadow-[0_0_20px_rgba(255,107,0,0.2)] pointer-events-none" />

              {/* Orbiting Capability Cards */}
              {capabilities.map((card, index) => {
                const Icon = card.icon;

                return (
                  <motion.div
                    key={card.id}
                    className="absolute inset-6 sm:inset-8 lg:inset-8 rounded-full pointer-events-none"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 25,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    {/* Position card at its angle on the orbit circumference */}
                    <div
                      className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-auto"
                      style={{
                        left: `${50 + 50 * Math.cos((card.angle * Math.PI) / 180)}%`,
                        top: `${50 + 50 * Math.sin((card.angle * Math.PI) / 180)}%`,
                      }}
                    >
                      {/* Orange Dot Bead on Orbit */}
                      <div className="absolute w-3 h-3 rounded-full bg-[#FF6B00] border-2 border-white shadow-sm ring-2 ring-orange-200 z-10" />

                      {/* Counter-rotate card by -360 deg so it stays 100% straight upright */}
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{
                          duration: 25,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        className="z-20"
                      >
                        {/* Vertical Card */}
                        <motion.div
                          whileHover={{
                            y: -5,
                            scale: 1.07,
                            boxShadow:
                              '0 18px 28px -6px rgba(255, 107, 0, 0.25), 0 8px 12px -4px rgba(0, 0, 0, 0.08)',
                          }}
                          className="cursor-pointer bg-white/95 backdrop-blur-xl border border-gray-100/90 rounded-2xl p-2.5 sm:p-3 shadow-md shadow-gray-200/70 transition-all duration-300 w-[100px] sm:w-[125px] flex flex-col items-center text-center group"
                        >
                          {/* Centered Orange Icon */}
                          <div className="w-7.5 h-7.5 sm:w-9 sm:h-9 rounded-xl bg-orange-50 flex items-center justify-center mb-1 group-hover:bg-orange-100 transition-colors">
                            <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#FF5812]" />
                          </div>

                          {/* Title */}
                          <h3 className="text-[11px] sm:text-xs font-bold text-[#0A0F3C] leading-tight mb-0.5">
                            {card.title}
                          </h3>

                          {/* Subtitle */}
                          <p className="text-[8.5px] sm:text-[10px] text-gray-500 font-medium leading-snug">
                            {card.subtitle}
                          </p>
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Center Robot & Pedestal Platform */}
              <div
                ref={robotRef}
                className="relative z-30 flex flex-col items-center justify-center pointer-events-none"
              >
                
                {/* Floating Robot */}
                <motion.div
                  className="w-36 h-40 sm:w-48 sm:h-52 lg:w-52 lg:h-56 relative"
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <svg
                    viewBox="0 0 240 260"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full filter drop-shadow-xl"
                  >
                    <defs>
                      <linearGradient id="bodyGrad" x1="40" y1="40" x2="200" y2="220" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="60%" stopColor="#F2F4F8" />
                        <stop offset="100%" stopColor="#E2E6EE" />
                      </linearGradient>
                      <linearGradient id="visorGrad" x1="75" y1="70" x2="165" y2="130" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#0B0F2A" />
                        <stop offset="100%" stopColor="#1A2044" />
                      </linearGradient>
                      <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#FF8800" />
                        <stop offset="50%" stopColor="#FF5812" />
                        <stop offset="100%" stopColor="#CC3300" />
                      </radialGradient>
                      <linearGradient id="pedestalTop" x1="20" y1="210" x2="220" y2="210" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="100%" stopColor="#E8ECF2" />
                      </linearGradient>
                    </defs>

                    {/* Pedestal Base */}
                    <ellipse cx="120" cy="235" rx="85" ry="16" fill="#DDE2EC" />
                    <ellipse cx="120" cy="232" rx="85" ry="15" fill="url(#pedestalTop)" />
                    <ellipse cx="120" cy="232" rx="78" ry="12" fill="none" stroke="#FF6B00" strokeWidth="2.5" opacity="0.85" />

                    {/* Pedestal Top */}
                    <ellipse cx="120" cy="216" rx="68" ry="14" fill="#CFD6E2" />
                    <ellipse cx="120" cy="213" rx="68" ry="13" fill="#FFFFFF" />
                    <ellipse cx="120" cy="213" rx="62" ry="10" fill="none" stroke="#FF5812" strokeWidth="2" opacity="0.9" />

                    {/* Pedestal Glow */}
                    <ellipse cx="120" cy="213" rx="55" ry="7" fill="#FF6B00" opacity="0.35" className="blur-xs" />

                    {/* Antenna */}
                    <path d="M120 42 L120 22" stroke="#CAD1DC" strokeWidth="4" strokeLinecap="round" />
                    <circle cx="120" cy="18" r="8" fill="#FF5812" />
                    <circle cx="118" cy="16" r="3" fill="#FFFFFF" />

                    {/* Robot Head */}
                    <rect x="56" y="38" width="128" height="100" rx="36" fill="url(#bodyGrad)" stroke="#E0E5ED" strokeWidth="2" />

                    {/* Visor Screen */}
                    <rect x="70" y="55" width="100" height="66" rx="24" fill="url(#visorGrad)" />

                    {/* Visor Reflection Accent */}
                    <path d="M78 63 Q120 57 162 63" stroke="#FFFFFF" strokeWidth="2" opacity="0.25" strokeLinecap="round" />

                    {/* Dynamic Cursor Tracking Eyes with Parallax Highlights */}
                    <g>
                      {/* Orange Iris Spheres */}
                      <motion.g style={{ x: eyeX, y: eyeY }}>
                        <circle cx="98" cy="88" r="11" fill="url(#eyeGlow)" />
                        <circle cx="142" cy="88" r="11" fill="url(#eyeGlow)" />
                      </motion.g>

                      {/* White Pupil Highlights (Moving with extra parallax offset inside the orange iris) */}
                      <motion.g
                        style={{
                          x: useSpring(eyeX, { stiffness: 180, damping: 15 }),
                          y: useSpring(eyeY, { stiffness: 180, damping: 15 }),
                        }}
                      >
                        <motion.circle
                          cx="101"
                          cy="85"
                          r="3.5"
                          fill="#FFFFFF"
                          style={{
                            x: useSpring(eyeX, { stiffness: 220, damping: 14 }),
                            y: useSpring(eyeY, { stiffness: 220, damping: 14 }),
                          }}
                        />
                        <motion.circle
                          cx="145"
                          cy="85"
                          r="3.5"
                          fill="#FFFFFF"
                          style={{
                            x: useSpring(eyeX, { stiffness: 220, damping: 14 }),
                            y: useSpring(eyeY, { stiffness: 220, damping: 14 }),
                          }}
                        />
                      </motion.g>
                    </g>

                    {/* Robot Arms */}
                    <rect x="42" y="132" width="20" height="42" rx="10" fill="url(#bodyGrad)" stroke="#D8DFE8" strokeWidth="1.5" />
                    <rect x="178" y="132" width="20" height="42" rx="10" fill="url(#bodyGrad)" stroke="#D8DFE8" strokeWidth="1.5" />

                    {/* Robot Body */}
                    <path
                      d="M62 142 C62 130 80 128 120 128 C160 128 178 130 178 142 L172 195 C172 205 158 210 120 210 C82 210 68 205 68 195 Z"
                      fill="url(#bodyGrad)"
                      stroke="#D8DFE8"
                      strokeWidth="1.5"
                    />

                    {/* AI Square Emblem on Chest */}
                    <rect x="100" y="152" width="40" height="34" rx="10" fill="#FF5812" />
                    <text x="120" y="174" fill="#FFFFFF" fontSize="17" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">
                      AI
                    </text>
                  </svg>
                </motion.div>

                {/* Pedestal Shadow */}
                <motion.div
                  className="w-34 h-3.5 bg-gradient-to-r from-transparent via-orange-900/20 to-transparent rounded-[100%] mt-1 blur-xs"
                  animate={{
                    scaleX: [1, 1.12, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
