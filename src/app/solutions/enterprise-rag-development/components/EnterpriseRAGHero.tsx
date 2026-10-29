'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HERO_DATA } from '../data/heroData';
import TrustStrip from '@/components/sections/TrustStrip';

export const EnterpriseRAGHero: React.FC = () => {
  const { label, paragraph } = HERO_DATA;
  const [isMounted, setIsMounted] = useState(false);
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Preload spline runtime & scene for instantaneous initialization
    if (typeof window !== 'undefined') {
      const existingScript = document.querySelector('script[src*="spline-viewer"]');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@splinetool/viewer@1.9.59/build/spline-viewer.js';
        script.type = 'module';
        script.async = true;
        document.head.appendChild(script);
      }
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] as const } },
  };

  return (
    <section className="relative w-full bg-[#050909] overflow-hidden flex flex-col pt-24 lg:pt-32">
      <div className="w-full flex flex-col lg:flex-row items-start">

        {/* LEFT COLUMN: Content */}
        <div className="w-full lg:w-1/2 flex justify-end">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start w-full max-w-[640px] px-4 sm:px-6 lg:px-8 text-left"
          >
            {/* Eyebrow Label */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[#FF6B00]/40 bg-[#FF6B00]/10 mb-8 backdrop-blur-sm"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] shadow-[0_0_10px_2px_rgba(255,107,0,0.6)]" />
              <span className="text-[12px] md:text-[13px] font-bold tracking-[0.15em] text-[#FF6B00] uppercase">
                {label}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-[64px] leading-[1.1] font-bold text-white mb-6 tracking-tight"
            >
              Build Smarter AI with a Secure <span className="text-[#FF6B00]">RAG Engineering </span>
              <span className="text-[#FF6B00]">Team</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-[#A0AAB5] max-w-xl mb-10 leading-relaxed"
            >
              {paragraph}
            </motion.p>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: 3D UI (Bleeds to the right edge) */}
        <div className="w-full lg:w-1/2 flex flex-col items-start justify-center relative mt-4 lg:mt-0 lg:-translate-x-16">
          <div className="w-full h-[400px] sm:h-[480px] lg:h-[520px] relative pointer-events-none transform lg:scale-[0.85] lg:origin-top">
            
            {/* Instant glowing aesthetic placeholder so there's zero empty delay */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 pointer-events-none ${
                isSplineLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              <div className="w-[320px] h-[320px] rounded-full bg-gradient-to-tr from-[#FF6B00]/20 via-[#FF6B00]/10 to-transparent blur-3xl animate-pulse" />
              <div className="w-[180px] h-[180px] rounded-full border border-[#FF6B00]/20 animate-spin [animation-duration:8s] opacity-40" />
            </div>

            <div className="pointer-events-auto absolute inset-0 overflow-hidden">
              {isMounted &&
                React.createElement('spline-viewer', {
                  url: '/scene.splinecode',
                  'loading-anim-type': 'none',
                  style: { width: '100%', height: '100%' },
                  onLoad: () => setIsSplineLoaded(true),
                })}
              {/* Overlay to cover the Spline watermark and block clicks/hovers */}
              <div className="absolute bottom-2 right-2 w-[150px] h-[50px] bg-[#050909] z-[100] pointer-events-auto rounded-md" />
            </div>
          </div>
        </div>

      </div>

      {/* TrustStrip at the bottom */}
      <div className="w-full pb-10 relative z-10 -mt-6 lg:-mt-10">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 [&>div]:!mt-0">
          <TrustStrip theme="dark" />
        </div>
      </div>
    </section>
  );
};
