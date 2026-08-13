"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export const PARTNER_LOGOS = [
  { name: "GO ERP", src: "/images/logo/goerp1.jpg", accent: "#3b82f6" },
  { name: "Nuvento", src: "/images/logo/nuvento.jpg", accent: "#06b6d4" },
  { name: "Kwiz", src: "/images/logo/kwiz.png", accent: "#8b5cf6" },
  { name: "Jonians", src: "/images/logo/jonians.jpg", accent: "#10b981" },
  { name: "Export Control", src: "/images/logo/ecg.png", accent: "#ef4444" },
  { name: "SP Marketplace", src: "/images/logo/sp-marketplace.png", accent: "#f59e0b" },
  { name: "Bosch", src: "/images/logo/bosch.png", accent: "#ef4444" },
  { name: "Emscale", src: "/images/logo/emscale_logo.png", accent: "#22c55e" },
  { name: "Link Innovation", src: "/images/logo/link-innovation.png", accent: "#0ea5e9" },
  { name: "Intellectt", src: "/images/logo/Intellectt_logo.png", accent: "#a855f7" },
] as const;

export type Logo = (typeof PARTNER_LOGOS)[number];

const PARTNERS: Logo[] = [...PARTNER_LOGOS];

// Simple, clean styles for logo hover states
const logoCardStyles = `
  .partner-logo-card {
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .partner-logo-card:hover {
    transform: translateY(-4px);
    border-color: rgba(0, 0, 0, 0.15) !important;
    box-shadow: 0 12px 24px -10px rgba(0, 0, 0, 0.08) !important;
  }
`;

export function PartnerLogo({
  partner,
}: {
  partner: Logo;
}) {
  const [error, setError] = useState(false);

  return (
    <div
      className="partner-logo-card group relative flex h-[88px] w-[220px] shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-gradient-to-b from-zinc-950 via-[#1b0900] to-black px-6 py-4 shadow-lg shadow-orange-950/5 transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-500/50 hover:shadow-[0_8px_25px_-5px_rgba(249,115,22,0.2)]"
    >
      {error ? (
        <span className="text-xs font-semibold tracking-tight text-zinc-400">
          {partner.name}
        </span>
      ) : (
        <Image
          src={partner.src}
          alt={`${partner.name} Brand Logo`}
          width={150}
          height={44}
          className="relative z-10 max-h-[44px] w-auto object-contain opacity-[0.9] transition-all duration-300 group-hover:scale-105 group-hover:opacity-100"
          onError={() => setError(true)}
          unoptimized
        />
      )}
    </div>
  );
}

const STATS_DATA = [
  {
    value: "200+",
    label: "Enterprise Deployments",
    desc: "Production-ready solutions shipped worldwide",
  },
  {
    value: "98%",
    label: "Client Retention",
    desc: "Long-term co-engineering partnerships",
  },
  {
    value: "50+",
    label: "Partner Certifications",
    desc: "Gold status across Microsoft & AI platforms",
  },
] as const;

export function AboutClientStatsGrid({
  inView = true,
  dark = false,
}: {
  inView?: boolean;
  dark?: boolean;
}) {
  return (
    <div className="relative mx-auto max-w-5xl">
      <motion.div
        className={
          dark
            ? "grid grid-cols-1 divide-y divide-neutral-800 border border-neutral-800 bg-neutral-950/40 overflow-hidden rounded-xl backdrop-blur-sm sm:grid-cols-3 sm:divide-x sm:divide-y-0"
            : "grid grid-cols-1 divide-y divide-neutral-200 border border-neutral-200/60 bg-white/60 overflow-hidden rounded-xl backdrop-blur-sm sm:grid-cols-3 sm:divide-x sm:divide-y-0"
        }
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {STATS_DATA.map((stat, i) => (
          <div
            key={stat.label}
            className={`group relative flex flex-col justify-center px-8 py-10 text-center transition-all duration-500 ${
              dark ? "hover:bg-neutral-900/40" : "hover:bg-neutral-50/50"
            }`}
          >
            <span
              className={`font-serif text-[3.25rem] font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${
                i === 0
                  ? "from-blue-500 via-indigo-500 to-purple-500"
                  : i === 1
                    ? "from-cyan-500 via-blue-500 to-indigo-500"
                    : "from-indigo-500 via-purple-500 to-pink-500"
              } transition-transform duration-500 group-hover:scale-[1.04] sm:text-[3.75rem]`}
            >
              {stat.value}
            </span>

            <span className={`mt-2 text-[10px] font-bold uppercase tracking-[0.24em] ${
              dark ? "text-neutral-400" : "text-neutral-500"
            }`}>
              {stat.label}
            </span>

            <span className={`mt-2 text-xs font-normal leading-relaxed ${
              dark ? "text-neutral-500" : "text-neutral-500"
            }`}>
              {stat.desc}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function AboutClientLogos({
  marqueeOnly = false,
}: {
  marqueeOnly?: boolean;
} = {}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      ref={ref}
      id="coengineered-logos"
      className="relative w-full overflow-hidden py-10 md:py-14 bg-white text-neutral-950 border-y border-neutral-200/60"
    >
      <style>{logoCardStyles}</style>

      {/* Clean, light dot grid background pattern matching the design theme */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.6]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(15, 23, 42, 0.03) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        
        {/* Centered headline section with section header */}
        <motion.div
          className="mx-auto max-w-4xl text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-5 flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5812]" />
            <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-zinc-400/90 uppercase">
              Our Partnerships
            </span>
          </div>
          <h2 className="text-[#0a0a1a] tracking-tight mb-4 flex flex-col items-center">
            <span className="font-black text-3xl md:text-5xl leading-[1.1] max-w-none block w-full">
              <span className="text-[#0a0a1a]">Trusted by</span>{" "}
              <span className="text-[#FF5812] drop-shadow-[0_2px_12px_rgba(255,88,18,0.15)]">Enterprises Worldwide</span>
            </span>
          </h2>
          <p className="text-zinc-600/90 font-medium text-base md:text-lg leading-relaxed max-w-2xl mx-auto mt-1">
            We have built our business hand in hand with enterprises where the engineering challenges are the hardest and today hundreds of enterprises trust Softree to drive value from automation and AI
          </p>
        </motion.div>

        {/* Infinite scrolling marquee of company logos passing from left to right */}
        <div className="relative w-full overflow-hidden mb-16 py-4">
          {/* Gradient Masks */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent" />

          {/* Scrolling Track */}
          <div className="flex gap-6 overflow-hidden select-none">
            <motion.div
              className="flex gap-6 shrink-0"
              animate={{
                x: ["-33.333%", "0%"],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear",
                },
              }}
            >
              {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, index) => (
                <PartnerLogo key={`${partner.name}-${index}`} partner={partner} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Centered button: MORE CUSTOMER STORIES */}
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/contact"
            prefetch={false}
            className="inline-flex items-center justify-center rounded-full bg-[#111111] text-white px-8 py-3.5 text-xs font-semibold uppercase tracking-widest hover:bg-neutral-900 transition-colors shadow-[0_8px_20px_-6px_rgba(0,0,0,0.15)] active:scale-[0.98]"
          >
            Contact Us &nbsp;→
          </Link>
        </motion.div>

        {/* Stats Grid - Kept clean below if not in marqueeOnly mode */}
        {!marqueeOnly && (
          <div className="relative mx-auto mt-10 max-w-5xl border-t border-neutral-200/60 pt-10">
            <AboutClientStatsGrid inView={isInView} dark={false} />
          </div>
        )}

      </div>
    </section>
  );
}
