"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// ELITE HERO SECTION
// Awwwards-tier design system: Ethereal Glass aesthetic + Industrial precision
// ─────────────────────────────────────────────────────────────────────────────

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function EliteHero() {
  const prefersReducedMotion = useReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  // Subtle ambient mouse tracking for gradient orbs
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReducedMotion]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 20,
      filter: prefersReducedMotion ? "blur(0px)" : "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: prefersReducedMotion ? 0.2 : 0.7,
        ease: EASE_OUT_EXPO,
      },
    },
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] w-full overflow-hidden bg-[var(--legacy-050505)]"
    >
      {/* ─── AMBIENT BACKDROP ─── */}
      {/* Mesh gradient orbs - subtle, slow movement */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[80vw] h-[80vw] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)",
            left: `${mousePosition.x * 10}%`,
            top: `${mousePosition.y * 10}%`,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            x: prefersReducedMotion ? 0 : [0, 30, 0],
            y: prefersReducedMotion ? 0 : [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute w-[60vw] h-[60vw] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)",
            right: `${(1 - mousePosition.x) * 15}%`,
            bottom: `${(1 - mousePosition.y) * 15}%`,
            transform: "translate(50%, 50%)",
          }}
          animate={{
            x: prefersReducedMotion ? 0 : [0, -20, 0],
            y: prefersReducedMotion ? 0 : [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute w-[40vw] h-[40vw] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)",
            left: "60%",
            top: "60%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: prefersReducedMotion ? 1 : [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ─── CONTENT CONTAINER ─── */}
      <div className="relative z-10 flex flex-col justify-center min-h-[100dvh] px-6 md:px-12 lg:px-20 py-20">
        <motion.div
          className="max-w-5xl mx-auto w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Top accent line */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 mb-12"
          >
            <span className="w-12 h-[1px] bg-gradient-to-r from-indigo-500 to-transparent" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-medium">
              Since 2013
            </span>
          </motion.div>

          {/* Main headline - Massive, industrial typography */}
          <motion.div variants={itemVariants} className="mb-6">
            <h1 className="text-white font-semibold tracking-[-0.04em] leading-[0.9] text-[clamp(48px,10vw,140px)]">
              Build.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                Ship.
              </span>{" "}
              Scale.
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.div variants={itemVariants} className="mb-8">
            <p className="text-white/60 text-[clamp(16px,2vw,24px)] font-normal leading-relaxed max-w-xl tracking-[-0.01em]">
              Your offshore engineering partner for Power Platform, Data, AI & modern applications.
            </p>
          </motion.div>

          {/* CTAs - Double bezel button architecture */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mb-16">
            {/* Primary CTA - White button with nested icon */}
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3"
            >
              <span className="relative inline-flex items-center gap-3 bg-white text-[var(--legacy-050505)] px-7 py-4 rounded-full font-semibold text-[15px] tracking-[-0.01em] transition-all duration-300 ease-[var(--legacy-ease-0_16_1_0_3_1)] hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)]">
                Partner With Us
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--legacy-050505)]/10 transition-transform duration-300 ease-[var(--legacy-ease-0_16_1_0_3_1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
            </Link>

            {/* Secondary CTA - Ghost button */}
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 px-6 py-4 rounded-full text-white/70 font-medium text-[15px] tracking-[-0.01em] transition-all duration-300 ease-[var(--legacy-ease-0_16_1_0_3_1)] hover:text-white hover:bg-white/5 active:scale-[0.98]"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 transition-colors duration-300 group-hover:bg-white/10">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </span>
              Schedule a call
            </Link>
          </motion.div>

          {/* Trust indicators - Doppelrand cards */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
              {[
                {
                  icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  ),
                  label: "White-Label Ready",
                  desc: "Your brand, our expertise"
                },
                {
                  icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  ),
                  label: "NDA Protected",
                  desc: "Enterprise-grade security"
                },
                {
                  icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M23 6l-9.5 9.5-5-5L1 18" />
                      <path d="M17 6h6v6" />
                    </svg>
                  ),
                  label: "Scale On-Demand",
                  desc: "Flexible team sizing"
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="relative p-1 rounded-2xl bg-white/[0.03] backdrop-blur-sm"
                >
                  <div className="relative flex items-center gap-4 p-4 rounded-xl bg-[var(--legacy-0a0a0a)]/80 border border-white/[0.06]">
                    <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/[0.03] text-white/60">
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-white/90 text-sm font-medium tracking-[-0.01em]">{item.label}</p>
                      <p className="text-white/40 text-xs mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bottom stats */}
          <motion.div variants={itemVariants} className="mt-16 pt-8 border-t border-white/[0.06]">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold text-lg tracking-tight">140+</span>
                <span className="text-white/40">Enterprises</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold text-lg tracking-tight">50+</span>
                <span className="text-white/40">Engineers</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold text-lg tracking-tight">12</span>
                <span className="text-white/40">Years</span>
              </div>
              <div className="ml-auto flex items-center gap-3 text-white/30 text-xs tracking-wide">
                <span>Offshore</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>Global</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>Reliable</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-white/60"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
