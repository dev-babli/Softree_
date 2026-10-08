'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Script from 'next/script';
import { HERO_DATA } from '../data/heroData';
import TrustStrip from '@/components/sections/TrustStrip';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          url?: string;
          'events-target'?: string;
          'loading-anim-type'?: string;
          'mouse-look'?: string;
        },
        HTMLElement
      >;
    }
  }
}

export const EnterpriseRAGHero: React.FC = () => {
  const { label, paragraph } = HERO_DATA;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
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
      <Script
        src="https://unpkg.com/@splinetool/viewer@1.9.59/build/spline-viewer.js"
        type="module"
        strategy="lazyOnload"
      />
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
        <div className="w-full lg:w-1/2 flex flex-col items-start justify-center relative mt-8 lg:mt-4 lg:-translate-x-16">
          <div className="w-full h-[400px] sm:h-[500px] lg:h-[600px] relative pointer-events-none transform lg:scale-[0.85] lg:origin-top">
            <div className="pointer-events-auto absolute inset-0 overflow-hidden">
              {isMounted && (
                <spline-viewer
                  url="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  style={{ width: '100%', height: '100%' }}
                />
              )}
            </div>
          </div>
        </div>

      </div>

      {/* TrustStrip at the bottom */}
      <div className="w-full pb-12 relative z-10">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <TrustStrip theme="dark" />
        </div>
      </div>
    </section>
  );
};
