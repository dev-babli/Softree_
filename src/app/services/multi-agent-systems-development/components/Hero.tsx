'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Script from 'next/script';
import { HERO_DATA } from '../data/heroData';
import TrustStrip from '@/components/sections/TrustStrip';
import { typography } from '@/lib/typography';

const CLIENT_LOGOS = [
  { name: "GO ERP", src: "/images/logo/goerp1.webp" },
  { name: "Nuvento", src: "/images/logo/nuvento.webp" },
  { name: "Snapon", src: "/images/logo/snapon.webp" },
  { name: "Jonians", src: "/images/logo/jonians.webp" },
  { name: "Export Control Group", src: "/images/logo/ecg.webp" },
  { name: "SP Marketplace", src: "/images/logo/1.webp" },
  { name: "Bosch", src: "/images/logo/bosch.webp" },
  { name: "Emscale", src: "/images/logo/emscale_logo.webp" },
  { name: "Link Innovation", src: "/images/logo/link-innovation.webp" },
  { name: "Intellectt", src: "/images/logo/Intellectt_logo.webp" },
];

export const Hero: React.FC = () => {
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
    <section className="relative w-full bg-[#050909] overflow-hidden flex flex-col pt-24 lg:pt-28">
      <Script
        src="https://unpkg.com/@splinetool/viewer@1.9.59/build/spline-viewer.js"
        type="module"
        strategy="afterInteractive"
      />

      <style>{`
        /* ── Hero Embedded Logo Marquee ── */
        .hero-logo-wrap {
          overflow: hidden;
          width: 100%;
          position: relative;
          padding: 0.5rem 0;
        }
        .hero-logo-wrap::before,
        .hero-logo-wrap::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 80px;
          z-index: 2;
          pointer-events: none;
        }
        .hero-logo-wrap::before {
          left: 0;
          background: linear-gradient(90deg, #050909, transparent);
        }
        .hero-logo-wrap::after {
          right: 0;
          background: linear-gradient(-90deg, #050909, transparent);
        }
        
        .hero-logo-track {
          display: flex;
          gap: 14px;
          width: max-content;
          animation: heroScrollLeft 28s linear infinite;
        }
        .hero-logo-track:hover {
          animation-play-state: paused;
        }
        @keyframes heroScrollLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ── Logo Card ── */
        .hero-logo-card {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 150px;
          width: max-content;
          padding: 0 1.25rem;
          height: 72px;
          border-radius: 14px;
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
          transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s, background-color 0.3s;
        }
        .hero-logo-card:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.18);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.6);
        }

        .hero-logo-card img {
          height: 38px;
          width: auto;
          object-fit: contain;
          position: relative;
          z-index: 2;
          opacity: 0.85;
          transition: opacity 0.3s, transform 0.3s;
        }
        .hero-logo-card:hover img {
          opacity: 1;
          transform: scale(1.05);
        }
      `}</style>

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
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#FF6B00]/40 bg-[#FF6B00]/10 mb-4 backdrop-blur-sm"
            >
              <div className="w-2 h-2 rounded-full bg-[#FF6B00] shadow-[0_0_10px_2px_rgba(255,107,0,0.6)]" />
              <span className={`${typography.caption.default} font-bold text-[#FF6B00] uppercase`}>
                {label}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className={`${typography.title} font-extrabold text-white mb-5 tracking-tight leading-[1.08] text-balance`}
            >
              Build Multi-Agent AI Systems That <br />
              <span className="text-[#FF6B00]">Think, Collaborate, and Act</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className={`${typography.description.default} text-[#A0AAB5] max-w-xl mb-6 leading-relaxed`}
            >
              {paragraph}
            </motion.p>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: 3D UI (Bleeds to the right edge) */}
        <div className="w-full lg:w-1/2 flex flex-col items-start justify-center relative mt-4 lg:mt-0 lg:-translate-x-16">
          <div className="w-full h-[360px] sm:h-[440px] lg:h-[480px] relative pointer-events-none transform lg:scale-[0.85] lg:origin-top">
            <div className="pointer-events-auto absolute inset-0 overflow-hidden">
              {isMounted &&
                React.createElement('spline-viewer', {
                  url: 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode',
                  style: { width: '100%', height: '100%' },
                })}
              {/* Overlay to cover the Spline watermark and block clicks/hovers */}
              <div className="absolute bottom-2 right-2 w-[150px] h-[50px] bg-[#050909] z-[100] pointer-events-auto rounded-md" />
            </div>
          </div>
        </div>

      </div>

      {/* TrustStrip at the bottom */}
      <div className="w-full relative z-10 -mt-8 lg:-mt-16">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <TrustStrip theme="dark" />
        </div>
      </div>

      {/* Integrated Compact Logo Marquee immediately below TrustStrip */}
      <div className="w-full pb-10 pt-4 relative z-10">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="relative bg-black/80 rounded-2xl md:rounded-3xl border border-white/10 px-4 sm:px-6 py-5 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md">
            
            {/* Heading with divider lines */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <p className="shrink-0 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-white/90">
                TRUSTED BY PARTNERS &amp; CLIENTS
              </p>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>

            {/* Compact infinite scrolling logos */}
            <div className="hero-logo-wrap">
              <div className="hero-logo-track">
                {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, index) => (
                  <div key={index} className="hero-logo-card">
                    {logo.src ? (
                      <img src={logo.src} alt={logo.name} loading="lazy" />
                    ) : (
                      <span className="text-white text-xs font-bold leading-snug">{logo.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
