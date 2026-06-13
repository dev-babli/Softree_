"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CONTACT_OFFICE_CLOCKS } from "@/data/contact-page";

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

  @media (prefers-reduced-motion: reduce) {
    .blob-1, .blob-2, .blob-3, .scroll-hint {
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

function formatOfficeTime(timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());
}

export default function ContactHero() {
  const [times, setTimes] = useState<Record<string, string>>({});

  useEffect(() => {
    const tick = () => {
      const next: Record<string, string> = {};
      for (const office of CONTACT_OFFICE_CLOCKS) {
        next[office.city] = formatOfficeTime(office.tz);
      }
      setTimes(next);
    };
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#FAFAF8] pb-10 pt-24 sm:pb-14 sm:pt-32">
      <style>{heroStyles}</style>

      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="blob-1 absolute -right-[15%] -top-[20%] h-[700px] w-[700px] rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(245,185,71,0.55), rgba(245,185,71,0.1) 50%, transparent 70%)",
          }}
        />
        <div
          className="blob-2 absolute -left-[10%] top-[20%] h-[600px] w-[600px] rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, rgba(252,165,124,0.4), rgba(252,165,124,0.1) 50%, transparent 70%)",
          }}
        />
        <div
          className="blob-3 absolute -bottom-[20%] left-[30%] h-[500px] w-[500px] rounded-full blur-[110px]"
          style={{
            background:
              "radial-gradient(circle, rgba(255,205,180,0.45), rgba(255,205,180,0.1) 50%, transparent 70%)",
          }}
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:32px_32px]"
      />

      <div className="relative mx-auto max-w-[1400px] px-6">
        <CornerTick className="absolute left-6 top-0" />
        <CornerTick className="absolute right-6 top-0 rotate-90" />

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.21, 1.02, 0.73, 1] }}
          className="relative mt-12 text-[clamp(4.5rem,18vw,16rem)] font-semibold leading-[0.86] tracking-[-0.06em] text-neutral-950 sm:mt-16"
        >
          <span className="block">Contact</span>
          <span className="-mt-2 block font-serif italic font-normal text-[#1a1a1a]/85 sm:-mt-4">
            us<span className="text-[#F5B947]">.</span>
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.21, 1.02, 0.73, 1] }}
          className="mt-12 flex w-full flex-col items-start justify-between gap-8 border-t border-neutral-900/10 pt-6 sm:mt-16 sm:flex-row sm:items-end"
        >
          <div className="flex max-w-[560px] flex-col items-start gap-5">
            <p className="text-[15px] leading-[1.65] text-neutral-600 sm:text-[16px]">
              Tell us what you&rsquo;re building. We read every message personally
              — and reply within one business day.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="#schedule"
                className="inline-flex h-11 items-center justify-center rounded-full bg-neutral-950 px-6 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#ff5812]"
              >
                Book a call
              </Link>
              <Link
                href="#schedule"
                className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-300 px-6 text-[12px] font-semibold uppercase tracking-[0.14em] text-neutral-800 transition hover:border-neutral-950"
              >
                Send a message
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10.5px] font-medium uppercase tracking-[0.24em] text-neutral-400">
            <span className="scroll-hint inline-block">↓</span>
            <span>Scroll to connect</span>
          </div>
        </motion.div>

        {/* Live office clocks */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75, ease: [0.21, 1.02, 0.73, 1] }}
          className="mt-10 grid gap-3 sm:grid-cols-3"
        >
          {CONTACT_OFFICE_CLOCKS.map((office) => (
            <div
              key={office.city}
              className="rounded-xl border border-neutral-200/80 bg-white/60 px-4 py-3 backdrop-blur-sm"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                {office.city}
              </p>
              <p className="mt-1 font-mono text-[22px] font-medium tabular-nums tracking-tight text-neutral-900">
                {times[office.city] ?? "—"}
              </p>
              <p className="mt-0.5 text-[11px] text-neutral-400">{office.label} now</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
