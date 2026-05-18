"use client";

import { motion } from "framer-motion";

const heroStyles = `
  @keyframes blob-1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(8%, -6%) scale(1.1); }
    66% { transform: translate(-6%, 4%) scale(0.95); }
  }
  @keyframes blob-2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(-7%, 5%) scale(1.05); }
    66% { transform: translate(5%, -4%) scale(1.1); }
  }
  @keyframes blob-3 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(-4%, -5%) scale(1.08); }
  }
  .blob-1 { animation: blob-1 22s ease-in-out infinite; }
  .blob-2 { animation: blob-2 28s ease-in-out infinite; }
  .blob-3 { animation: blob-3 18s ease-in-out infinite; }

  @keyframes scroll-hint {
    0%, 20% { transform: translateY(0); opacity: 0.4; }
    50% { transform: translateY(8px); opacity: 1; }
    80%, 100% { transform: translateY(0); opacity: 0.4; }
  }
  .scroll-hint { animation: scroll-hint 2.4s ease-in-out infinite; }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.85); }
  }
  .pulse-dot { animation: pulse-dot 2s ease-in-out infinite; }

  @media (prefers-reduced-motion: reduce) {
    .blob-1, .blob-2, .blob-3, .scroll-hint, .pulse-dot {
      animation: none !important;
    }
  }
`;

function CornerTick({ className = "" }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className={`pointer-events-none ${className}`}
    >
      <path d="M0 0 H14 M0 0 V14" stroke="#F5B947" strokeWidth="1" />
    </svg>
  );
}

export default function ContactHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FAFAF8] pb-12 pt-24 sm:pb-20 sm:pt-32">
      <style>{heroStyles}</style>

      {/* ── Gradient mesh background ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Amber blob — top right */}
        <div
          className="blob-1 absolute -right-[15%] -top-[20%] h-[700px] w-[700px] rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(245,185,71,0.55), rgba(245,185,71,0.1) 50%, transparent 70%)",
          }}
        />
        {/* Warm peach blob — middle left */}
        <div
          className="blob-2 absolute -left-[10%] top-[20%] h-[600px] w-[600px] rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, rgba(252,165,124,0.4), rgba(252,165,124,0.1) 50%, transparent 70%)",
          }}
        />
        {/* Soft rose blob — bottom center */}
        <div
          className="blob-3 absolute -bottom-[20%] left-[30%] h-[500px] w-[500px] rounded-full blur-[110px]"
          style={{
            background:
              "radial-gradient(circle, rgba(255,205,180,0.45), rgba(255,205,180,0.1) 50%, transparent 70%)",
          }}
        />
        {/* Faint cool accent — top center */}
        <div
          className="blob-2 absolute left-[40%] -top-[10%] h-[400px] w-[400px] rounded-full blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, rgba(196,181,253,0.25), transparent 70%)",
          }}
        />
      </div>

      {/* ── Grain texture ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Subtle dot grid for depth ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:32px_32px]"
      />

      {/* ── Top fade-to-cream so type sits cleanly ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-[#FAFAF8] to-transparent"
      />

      {/* ── Content ── */}
      <div className="relative mx-auto max-w-[1400px] px-6">
        {/* Corner ticks */}
        <CornerTick className="absolute left-6 top-0" />
        <CornerTick className="absolute right-6 top-0 rotate-90" />

        {/* Tiny eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.21, 1.02, 0.73, 1] }}
          className="flex items-center gap-2.5"
        >
          <span className="pulse-dot relative inline-block h-1.5 w-1.5 rounded-full bg-[#F5B947]" />
          <span className="text-[10.5px] font-medium uppercase tracking-[0.24em] text-neutral-500">
            Get in touch&nbsp;&nbsp;·&nbsp;&nbsp;hello@softree.com
          </span>
        </motion.div>

        {/* ── MASSIVE display headline ── */}
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: [0.21, 1.02, 0.73, 1],
          }}
          className="relative mt-12 text-[clamp(4.5rem,18vw,16rem)] font-semibold leading-[0.86] tracking-[-0.06em] text-neutral-950 sm:mt-16"
          style={{ fontFeatureSettings: '"ss01"' }}
        >
          <span className="block">Contact</span>
          <span className="-mt-2 block font-serif italic font-normal text-[#1a1a1a]/85 sm:-mt-4">
            us<span className="text-[#F5B947]">.</span>
          </span>
        </motion.h1>

        {/* ── Subline + scroll cue ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.55,
            ease: [0.21, 1.02, 0.73, 1],
          }}
          className="mt-12 flex flex-col items-start justify-between gap-8 border-t border-neutral-900/[0.1] pt-6 sm:mt-16 sm:flex-row sm:items-end"
        >
          <p className="max-w-[520px] text-[15px] leading-[1.65] text-neutral-600 sm:text-[16px]">
            Tell us what you&rsquo;re building. We read every message
            personally — and reply within&nbsp;24&nbsp;hours.
          </p>

          <div className="flex items-center gap-2 text-[10.5px] font-medium uppercase tracking-[0.24em] text-neutral-400">
            <span className="scroll-hint inline-block">↓</span>
            <span>Scroll to send a message</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
