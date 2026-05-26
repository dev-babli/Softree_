"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

interface Logo {
  name: string;
  src: string;
  accent: string;
}

const PARTNERS: Logo[] = [
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
];

const marqueeStyles = `
  @keyframes marquee-left {
    0% { transform: translate3d(0, 0, 0); }
    100% { transform: translate3d(-50%, 0, 0); }
  }
  @keyframes marquee-right {
    0% { transform: translate3d(-50%, 0, 0); }
    100% { transform: translate3d(0, 0, 0); }
  }
  .animate-marquee-left {
    display: flex;
    width: max-content;
    animation: marquee-left 45s linear infinite;
  }
  .animate-marquee-right {
    display: flex;
    width: max-content;
    animation: marquee-right 45s linear infinite;
  }
  .marquee-container:hover .animate-marquee-left,
  .marquee-container:hover .animate-marquee-right {
    animation-play-state: paused;
  }
  .logo-card-glow {
    filter: blur(28px);
    opacity: 0.08;
    transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .group:hover .logo-card-glow {
    opacity: 0.22;
  }
  .partner-logo-card {
    transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .partner-logo-card:hover {
    border-color: var(--partner-accent) !important;
    box-shadow: 0 20px 40px -8px var(--partner-accent-shadow) !important;
  }
`;

function PartnerLogo({ partner }: { partner: Logo }) {
  const [error, setError] = useState(false);

  return (
    <div 
      className="partner-logo-card group relative flex h-[88px] w-[220px] shrink-0 items-center justify-center rounded-xl border bg-white/95 px-6 py-4 backdrop-blur-md hover:-translate-y-1.5"
      style={{ 
        "--partner-accent": partner.accent,
        "--partner-accent-border": `${partner.accent}30`,
        "--partner-accent-shadow": `${partner.accent}20`,
        borderColor: "var(--partner-accent-border)"
      } as React.CSSProperties}
    >
      {/* Colorful ambient glow shadow - always active, intensifies on hover */}
      <div 
        className="logo-card-glow pointer-events-none absolute inset-0 rounded-xl"
        style={{
          background: `radial-gradient(circle, ${partner.accent} 0%, transparent 70%)`
        }}
      />

      {error ? (
        <div className="flex items-center gap-2.5 select-none relative z-10">
          <span 
            className="h-2.5 w-2.5 rounded-full animate-pulse" 
            style={{ backgroundColor: partner.accent }} 
          />
          <span className="font-mono text-xs font-semibold tracking-tight text-neutral-800">
            {partner.name}
          </span>
        </div>
      ) : (
        <Image
          src={partner.src}
          alt={`${partner.name} Brand Logo`}
          width={160}
          height={48}
          className="max-h-[44px] w-auto object-contain transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108 relative z-10"
          onError={() => setError(true)}
          unoptimized
        />
      )}
    </div>
  );
}

export default function AboutClientLogos() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Triple partners for seamless looping inside double marquees
  const doubledLeft = [...PARTNERS, ...PARTNERS];
  const doubledRight = [...PARTNERS, ...PARTNERS].reverse();

  return (
    <section
      ref={ref}
      id="coengineered-logos"
      className="relative w-full overflow-hidden bg-[#FAFAF9] py-24 md:py-32"
    >
      <style>{marqueeStyles}</style>

      {/* Modern subtle dot grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(20,20,19,0.04) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Top clean hairline edge */}
      <div className="absolute left-0 right-0 top-0 h-px bg-neutral-900/[0.06]" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
        
        {/* ── Editorial Header ── */}
        <motion.div
          className="mx-auto max-w-3xl text-center mb-20"
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2.5 rounded-full border border-neutral-900/[0.06] bg-white px-3.5 py-1 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-500">
              Co-Engineered Networks
            </span>
          </div>

          <h2 className="mt-6 text-[1.875rem] font-semibold leading-tight tracking-[-0.035em] text-[#141413] sm:text-[2.5rem] lg:text-[2.85rem]">
            Engineered alongside technology leaders.
          </h2>
          
          <p className="mx-auto mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-neutral-500 sm:text-[1rem]">
            From strategic technical consultancy to shipping enterprise-grade code, our experts build directly inside world-class engineering ecosystems.
          </p>
        </motion.div>

        {/* ── Double Lane Intersecting Marquees ── */}
        <motion.div
          className="marquee-container relative flex flex-col gap-6 py-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          {/* Glass edge gradients for luxurious fade out */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-20 w-20 sm:w-44 bg-gradient-to-r from-[#FAFAF9] via-[#FAFAF9]/80 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-20 w-20 sm:w-44 bg-gradient-to-l from-[#FAFAF9] via-[#FAFAF9]/80 to-transparent" />

          {/* Lane 1: Scrolling Left */}
          <div className="relative flex w-full overflow-hidden">
            <div className="animate-marquee-left gap-6 pr-6">
              {doubledLeft.map((partner, index) => (
                <PartnerLogo key={`left-${partner.name}-${index}`} partner={partner} />
              ))}
            </div>
          </div>

          {/* Lane 2: Scrolling Right */}
          <div className="relative flex w-full overflow-hidden">
            <div className="animate-marquee-right gap-6 pr-6">
              {doubledRight.map((partner, index) => (
                <PartnerLogo key={`right-${partner.name}-${index}`} partner={partner} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Architectural Dividers & Stats ── */}
        <div className="relative mt-24 max-w-5xl mx-auto">
          {/* Decorative Corner Ticks */}
          <CornerTick className="absolute -left-1 -top-1" />
          <CornerTick className="absolute -right-1 -top-1 rotate-90" />
          <CornerTick className="absolute -left-1 -bottom-1 -rotate-90" />
          <CornerTick className="absolute -right-1 -bottom-1 rotate-180" />

          {/* Border grid box */}
          <motion.div
            className="grid grid-cols-1 divide-y divide-neutral-900/[0.06] border border-neutral-900/[0.06] bg-[#FCFCFB]/40 backdrop-blur-sm sm:grid-cols-3 sm:divide-x sm:divide-y-0 rounded-xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.01)]"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {[
              { value: "200+", label: "Enterprise Deployments", desc: "Production-ready solutions shipped worldwide", gradient: "from-blue-500 via-indigo-500 to-purple-500" },
              { value: "98%", label: "Client Retention", desc: "Long-term co-engineering partnerships", gradient: "from-cyan-500 via-blue-500 to-indigo-500" },
              { value: "50+", label: "Partner Certifications", desc: "Gold status across Microsoft & AI platforms", gradient: "from-indigo-500 via-purple-500 to-pink-500" },
            ].map((stat, i) => (
              <div 
                key={stat.label} 
                className="group relative flex flex-col justify-center px-8 py-10 text-center transition-all duration-500 hover:bg-[#FCFCFB]"
              >
                {/* Micro accent highlight bar on stat cards */}
                <div 
                  className="absolute inset-x-0 bottom-0 h-0.5 scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" 
                  style={{
                    background: i === 0 ? "linear-gradient(to right, #3b82f6, #6366f1)" : i === 1 ? "linear-gradient(to right, #06b6d4, #3b82f6)" : "linear-gradient(to right, #6366f1, #ec4899)"
                  }}
                />
                
                {/* Beautiful text gradient for numbers */}
                <span className={`font-serif text-[3.25rem] font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${stat.gradient} transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] sm:text-[3.75rem]`}>
                  {stat.value}
                </span>
                
                <span className="mt-2 text-[10px] font-bold uppercase tracking-[0.24em] text-neutral-400">
                  {stat.label}
                </span>

                <span className="mt-2 text-xs text-neutral-400 font-normal leading-relaxed opacity-0 max-h-0 translate-y-2 overflow-hidden transition-all duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:max-h-12 group-hover:translate-y-0">
                  {stat.desc}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

      </div>

      {/* Bottom clean hairline edge */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-neutral-900/[0.06]" />
    </section>
  );
}

function CornerTick({ className = "" }: { className?: string }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden
      className={`pointer-events-none z-10 ${className}`}
    >
      <path d="M0 0 H10 M0 0 V10" stroke="#E5E5E4" strokeWidth="1.2" />
    </svg>
  );
}
