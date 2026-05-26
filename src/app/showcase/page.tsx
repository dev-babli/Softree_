"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { COUNTRIES_SERVED_NUMBER } from "@/lib/constants";

/* ─────────────────────────────────────────────────────────────────────
   DESIGN SYSTEM — Editorial Luxury · Light Theme
   Warm cream canvas, cinematic video stage, organic motion
───────────────────────────────────────────────────────────────────── */

const VIDEO_ASSETS = {
  mp4: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba%2F69d2095642a31660d0b048ee_Video%202_mp4.mp4",
  webm: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba%2F69d2095642a31660d0b048ee_Video%202_webm.webm",
  poster: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba%2F69d2095642a31660d0b048ee_Video%202_poster.0000000.jpg",
};

const AVATARS = [
  "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69c3757217df10d7688f6d44_Hero%20Client%201.webp",
  "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69c3757217df10d7688f6d46_Hero%20Client%202.webp",
  "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69c3757217df10d7688f6d4a_Hero%20Client%203.webp",
  "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69c3757217df10d7688f6d4d_Hero%20Client%204.webp",
  "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69c3757217df10d7688f6d49_Hero%20Client%205.webp",
];

const CYCLING_WORDS = ["Agentic AI", "Power Platform", "Web Applications", "Data Analytics", "Cloud Native"];

function CyclingWord() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % CYCLING_WORDS.length), 3000);
    return () => clearInterval(id);
  }, []);
  const word = CYCLING_WORDS[idx];
  return (
    <span className="relative inline-block align-baseline overflow-hidden" style={{ minWidth: "clamp(180px, 20vw, 340px)" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={word}
          className="inline-block italic font-light text-white/80"
          initial={{ opacity: 0, y: "100%", filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: "-100%", filter: "blur(8px)" }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const SERVICES = [
  { num: "01", label: "AI & Automation", desc: "Agentic systems" },
  { num: "02", label: "Web Development", desc: "Cloud-native apps" },
  { num: "03", label: "Microsoft Suite", desc: "Power Platform · SPFx" },
  { num: "04", label: "Data Analytics", desc: "BI · Insights" },
];

const EASE = [0.32, 0.72, 0, 1] as const;

export default function ChannelCard() {
  return (
    <div
      className="fixed inset-0 w-screen h-screen overflow-hidden font-sans"
      style={{
        background: "radial-gradient(ellipse 90% 80% at 50% 0%, #FDFBF7 0%, #F5F1EA 50%, #EDE7DC 100%)",
      }}
    >
      {/* Subtle paper-grain overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1] mix-blend-multiply opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ═══════════════════════════════════════════════════════════
           MAIN FRAME — vertical flex
      ═══════════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full h-full flex flex-col px-3 sm:px-4 lg:px-5 py-3 sm:py-4 lg:py-5">

        {/* ── HEADER ROW: Logo · Nav · CTA ── */}
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="relative z-30 flex items-center justify-between pb-3 sm:pb-4 lg:pb-5"
        >
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[10px] bg-[#0A0908] grid place-items-center shadow-[0_4px_12px_-4px_rgba(10,9,8,0.4)]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 17L11 11L5 5M13 17L19 11L13 5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-[#1a1816] text-[14px] font-semibold tracking-[-0.02em]">Softree</span>
            <span className="hidden sm:inline-block ml-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[#1a1816]/40">Studio</span>
          </div>

          {/* Center nav — glass pill */}
          <nav className="hidden md:flex items-center gap-0.5 rounded-full border border-[#1a1816]/8 bg-white/60 backdrop-blur-xl px-1.5 py-1.5 shadow-[0_2px_12px_-4px_rgba(10,9,8,0.08)]">
            {["Services", "Work", "About", "Insights"].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className="px-3.5 py-1.5 rounded-full text-[12px] font-medium text-[#1a1816]/70 hover:text-[#1a1816] hover:bg-[#1a1816]/5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Right CTA */}
          <a
            href="/contact"
            className="group/lt inline-flex items-center gap-2.5 rounded-full bg-[#0A0908] pl-4 pr-1.5 py-1.5 hover:bg-[#1a1816] active:scale-[0.97] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-[0_4px_14px_-4px_rgba(10,9,8,0.35)]"
          >
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-white">Let&rsquo;s Talk</span>
            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#FF6B00] grid place-items-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/lt:translate-x-0.5 group-hover/lt:-translate-y-px">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </span>
          </a>
        </motion.header>

        {/* ═══════════════════════════════════════════════════════════
             VIDEO STAGE — full-bleed card with overlays
        ═══════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: EASE }}
          className="relative flex-1 overflow-hidden rounded-[20px] sm:rounded-[28px] lg:rounded-[32px] bg-[#0a0908] shadow-[0_20px_60px_-20px_rgba(10,9,8,0.45),0_8px_24px_-8px_rgba(10,9,8,0.25)] ring-1 ring-[#1a1816]/8"
        >
          {/* Background video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={VIDEO_ASSETS.poster}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={VIDEO_ASSETS.mp4} type="video/mp4" />
            <source src={VIDEO_ASSETS.webm} type="video/webm" />
          </video>

          {/* Cinematic gradient overlays */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,9,8,0.55) 0%, rgba(10,9,8,0.15) 28%, rgba(10,9,8,0.25) 60%, rgba(10,9,8,0.78) 100%)",
            }}
          />
          <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 65% at 50% 45%, transparent 0%, rgba(10,9,8,0.35) 100%)" }} />

          {/* ── STAGE CONTENT GRID ── */}
          <div className="relative z-10 h-full flex flex-col justify-between p-5 sm:p-7 md:p-10 lg:p-12">

            {/* TOP ROW: Avatar stack · Eyebrow tag */}
            <div className="flex items-start justify-between gap-4">
              {/* Avatar stack */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
                className="flex items-center gap-3"
              >
                <div className="flex -space-x-2.5">
                  {AVATARS.map((src, i) => (
                    <span
                      key={i}
                      className="block h-9 w-9 sm:h-10 sm:w-10 overflow-hidden rounded-full border-2 border-white/90 ring-1 ring-black/10 bg-white/20"
                      style={{ zIndex: AVATARS.length - i }}
                    >
                      <img src={src} alt="" className="h-full w-full object-cover" />
                    </span>
                  ))}
                </div>
                <div className="hidden sm:flex flex-col gap-0.5">
                  <span className="text-[11px] font-semibold text-white">200+ Clients</span>
                  <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-white/55">Trusted Globally</span>
                </div>
              </motion.div>

              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 backdrop-blur-md px-3.5 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse" />
                  <span className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.2em] text-white/85">Available for Projects</span>
                </span>
              </motion.div>
            </div>

            {/* CENTER: Massive headline + sub + CTAs */}
            <div className="flex flex-col items-center justify-center text-center -mt-4 sm:-mt-6 lg:-mt-8">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.55, ease: EASE }}
                className="max-w-[1100px] font-medium text-white"
                style={{
                  fontSize: "clamp(30px, 6.2vw, 84px)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.045em",
                  textShadow: "0 2px 30px rgba(0,0,0,0.25)",
                }}
              >
                We craft digital
                <br />
                solutions with <CyclingWord />
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
                className="mt-4 sm:mt-6 text-center text-white/65 text-[12px] sm:text-[14px] lg:text-[15px] max-w-[540px] leading-[1.65] font-light"
              >
                Enterprise AI, cloud-native applications, and Microsoft platforms — scoped, engineered, and shipped at scale.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
                className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-3"
              >
                <a
                  href="/contact"
                  className="group/cta inline-flex items-center gap-3 rounded-full bg-white pl-6 pr-2 py-2 hover:bg-[#FFF8EE] active:scale-[0.97] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-[0_8px_24px_-8px_rgba(255,255,255,0.5)]"
                >
                  <span className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0A0908]">Start a Project</span>
                  <span className="w-7 h-7 rounded-full bg-[#0A0908] grid place-items-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-px">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </span>
                </a>
                <a
                  href="/work"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 backdrop-blur-md px-5 py-3 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-white hover:bg-white/15 hover:border-white/30 active:scale-[0.97] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="6 4 20 12 6 20 6 4" />
                  </svg>
                  Watch Reel
                </a>
              </motion.div>
            </div>

            {/* BOTTOM ROW: Studio info · Stats · Socials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.05, ease: EASE }}
              className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4"
            >
              {/* Studio block */}
              <div className="flex flex-col gap-1 text-white">
                <span className="text-[10px] uppercase tracking-[0.22em] text-white/45">Softree®</span>
                <span className="text-[13px] sm:text-[14px] font-medium tracking-[-0.01em]">10+ years engineering excellence</span>
              </div>

              {/* Stats divider */}
              <div className="hidden md:flex items-end gap-7">
                {[
                  { val: "200+", label: "Projects" },
                  { val: COUNTRIES_SERVED_NUMBER.toString(), label: "Countries" },
                  { val: "98%", label: "Retention" },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col items-start">
                    <span className="text-[18px] sm:text-[20px] font-semibold text-white tracking-[-0.02em] tabular-nums">{s.val}</span>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/45">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Socials */}
              <div className="flex items-center gap-2">
                {[
                  // LinkedIn
                  <svg key="li" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" /></svg>,
                  // X
                  <svg key="x" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
                  // Instagram
                  <svg key="ig" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" /></svg>,
                ].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label="social"
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/8 backdrop-blur-md text-white/85 hover:text-white hover:border-white/30 hover:bg-white/15 active:scale-[0.93] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                  >
                    {Icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════
             BOTTOM SERVICE STRIP — light bento
        ═══════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
          className="relative grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5 pt-3 sm:pt-4 lg:pt-5"
        >
          {SERVICES.map((svc, i) => (
            <a
              key={svc.num}
              href="/services"
              className="group/svc relative overflow-hidden rounded-2xl border border-[#1a1816]/8 bg-white/60 backdrop-blur-sm px-4 py-3 sm:px-5 sm:py-4 hover:bg-white hover:border-[#1a1816]/15 hover:shadow-[0_8px_24px_-12px_rgba(10,9,8,0.18)] active:scale-[0.98] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              {/* Top: num + arrow */}
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <span className="text-[9px] sm:text-[10px] font-medium text-[#1a1816]/35 tracking-[0.18em]">({svc.num})</span>
                <span className="w-5 h-5 rounded-full bg-[#1a1816]/5 grid place-items-center opacity-0 -translate-x-1 group-hover/svc:opacity-100 group-hover/svc:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#1a1816" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </span>
              </div>
              {/* Label + desc */}
              <div className="flex flex-col gap-0.5">
                <span className="text-[12px] sm:text-[13px] font-semibold text-[#1a1816] tracking-[-0.01em]">{svc.label}</span>
                <span className="text-[10px] sm:text-[11px] font-medium text-[#1a1816]/45">{svc.desc}</span>
              </div>
              {/* Hover accent line */}
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF6B00] origin-left scale-x-0 group-hover/svc:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]" />
            </a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
