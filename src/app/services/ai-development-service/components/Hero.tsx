"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ThreeDSpaceGlobe from "../../../about-us/ThreeDSpaceGlobe";
import { heroData } from "../data/hero";

interface StarType {
  id: number;
  top: string;
  left: string;
  size: string;
  color: string;
  animation: string;
  delay: string;
}

export default function Hero() {
  const [stars, setStars] = useState<StarType[]>([]);
  const { badge, title, description, ctas } = heroData;

  // Dynamically format title parts for best visual balance with the globe layout
  const blackTextStr = title.blackText || "";
  const isForAtEnd = blackTextStr.toLowerCase().endsWith("for");
  const mainTitle = isForAtEnd ? blackTextStr.slice(0, -3).trim() : blackTextStr;
  const subTitle = isForAtEnd ? `for ${title.orangeText}` : title.orangeText;

  // Generate random twinkling stars for the background on the client side with color-matching glows
  useEffect(() => {
    const generatedStars = Array.from({ length: 60 }).map((_, i) => {
      const colors = ["bg-white", "bg-blue-300", "bg-orange-300"];
      const starColor = colors[Math.random() > 0.85 ? (Math.random() > 0.5 ? 1 : 2) : 0];
      return {
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() > 0.85 ? "h-[2px] w-[2px]" : "h-[1px] w-[1px]",
        color: starColor,
        animation: i % 3 === 0 ? "star-glow-fast" : i % 3 === 1 ? "star-glow-medium" : "star-glow-slow",
        delay: `${Math.random() * 6}s`,
      };
    });
    setStars(generatedStars);
  }, []);

  return (
    <section className="relative min-h-[108vh] lg:min-h-[112vh] w-full flex flex-col items-center justify-center overflow-hidden bg-[#020205] pt-28 pb-36 select-none font-sans text-white">
      {/* CSS Animations for Gradients, Stars & Meteors */}
      <style>{`
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes orangeGlow {
          0%, 100% {
            box-shadow: 0 4px 10px rgba(255, 88, 18, 0.25), 0 0 6px rgba(255, 88, 18, 0.1);
          }
          50% {
            box-shadow: 0 4px 18px rgba(255, 88, 18, 0.45), 0 0 12px rgba(255, 88, 18, 0.2);
          }
        }
        @keyframes starGlow {
          0%, 100% {
            opacity: 0.05;
            transform: scale(0.7);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.3);
          }
        }
        @keyframes meteorFlow {
          0% {
            top: -10%;
            left: 80%;
            width: 0px;
            opacity: 0;
          }
          1% {
            opacity: 0.75;
            width: 80px;
          }
          8% {
            top: 60%;
            left: 20%;
            width: 160px;
            opacity: 0;
          }
          100% {
            top: 60%;
            left: 20%;
            width: 0px;
            opacity: 0;
          }
        }
        @keyframes verticalNebula {
          0% {
            top: -25%;
            opacity: 0;
          }
          8% {
            opacity: 0.05;
          }
          50% {
            opacity: 0.12;
          }
          92% {
            opacity: 0.05;
          }
          100% {
            top: 115%;
            opacity: 0;
          }
        }
        .star-glow-fast {
          animation: starGlow 3.5s infinite ease-in-out;
        }
        .star-glow-medium {
          animation: starGlow 5.5s infinite ease-in-out;
        }
        .star-glow-slow {
          animation: starGlow 7.5s infinite ease-in-out;
        }
        .animate-gradient-flow {
          background-size: 200% auto;
          animation: gradientFlow 5s linear infinite;
        }
        .animate-orange-button {
          background-size: 200% auto;
          animation: gradientFlow 5s linear infinite, orangeGlow 3s infinite ease-in-out;
        }
        .meteor-trail {
          position: absolute;
          height: 1.5px;
          background: linear-gradient(90deg, rgba(255, 88, 18, 0.8) 0%, rgba(255, 255, 255, 0.35) 40%, transparent 100%);
          transform: rotate(-35deg);
          transform-origin: left center;
          filter: drop-shadow(0 0 5px rgba(255, 88, 18, 0.55));
          pointer-events: none;
          animation: meteorFlow 9s infinite ease-in-out;
        }
        .vertical-nebula-sweep {
          position: absolute;
          left: 0;
          width: 100%;
          height: 30vh;
          background: linear-gradient(180deg, transparent 0%, rgba(255, 88, 18, 0.06) 50%, transparent 100%);
          filter: blur(50px);
          pointer-events: none;
          animation: verticalNebula 16s infinite linear;
        }
      `}</style>

      {/* ── STARRY BACKGROUND (WITH GLOW UP/OFF TWINKLE) ── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className={`absolute rounded-full ${star.color} ${star.size} ${star.animation}`}
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.delay,
              boxShadow: star.color === "bg-white" 
                ? "0 0 3px rgba(255, 255, 255, 0.4)" 
                : star.color === "bg-blue-300"
                  ? "0 0 3px rgba(147, 197, 253, 0.4)"
                  : "0 0 3px rgba(253, 186, 116, 0.4)"
            }}
          />
        ))}
      </div>

      {/* ── GIANT BACKGROUND 3D SPACE GLOBE ── */}
      <div className="absolute inset-0 z-[1] w-full h-full overflow-hidden pointer-events-none">
        <ThreeDSpaceGlobe className="w-full h-full" />
      </div>

      {/* ── FULL-SCREEN CENTRALIZED RADIAL GLOW MASK ── */}
      <div 
        className="absolute inset-0 z-[2] w-full h-full pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(2, 2, 5, 0.76) 0%, rgba(2, 2, 5, 0.45) 45%, rgba(2, 2, 5, 0) 70%)"
        }}
      />

      {/* ── VOLUMETRIC LIGHT & METEOR TRAILS ── */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        <div className="vertical-nebula-sweep" />
        <div className="meteor-trail" style={{ top: "-10%", left: "75%", animationDelay: "0s", animationDuration: "8s" }} />
        <div className="meteor-trail" style={{ top: "-5%", left: "90%", animationDelay: "3s", animationDuration: "10s" }} />
        <div className="meteor-trail" style={{ top: "-15%", left: "60%", animationDelay: "5.5s", animationDuration: "9s" }} />
      </div>

      {/* ── CENTERED HERO CONTENT OVERLAY ── */}
      <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center text-center">
        {/* Badge with Green Dot */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4.5 py-2 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981] animate-pulse" />
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-white/95">
            {badge}
          </span>
        </motion.div>

        {/* Giant Centered Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-extrabold tracking-tighter leading-[1.08] max-w-4xl drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5812] via-[#FF2A00] to-[#FF7A00] animate-gradient-flow">
            {mainTitle}
          </span>
          <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-bold tracking-tighter text-zinc-100 leading-[1.1] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {subTitle}
          </span>
        </motion.h1>

        {/* Subtext Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 sm:mt-5 max-w-2xl text-sm sm:text-base md:text-lg text-zinc-200 font-medium leading-snug drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]"
        >
          {description}
        </motion.p>

        {/* High-Contrast Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          {/* Orange/Red Animated Primary Button with Pulsating Glow */}
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#FF5812] via-[#FF2A00] to-[#FF7A00] animate-orange-button px-8 py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 w-full sm:w-auto"
          >
            <span>{ctas.primary}</span>
            <svg 
              className="h-4 w-4 text-white transition-transform duration-355 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>

          {/* White Secondary Button */}
          <Link
            href="#capabilities"
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-black hover:bg-zinc-100 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 w-full sm:w-auto shadow-lg"
          >
            <span>Explore Capabilities</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
