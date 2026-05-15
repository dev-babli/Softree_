"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import WorldMap from "@/components/ui/world-map";

const floatStyles = `
  @keyframes float-a { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-7px)} }
  @keyframes float-b { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-5px)} }
  @keyframes float-c { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-9px)} }
  .float-a { animation: float-a 4.2s ease-in-out infinite; }
  .float-b { animation: float-b 5.4s ease-in-out infinite; }
  .float-c { animation: float-c 3.8s ease-in-out infinite; }
  @keyframes ping-ring {
    0% { transform: scale(1); opacity: 0.6; }
    100% { transform: scale(2.2); opacity: 0; }
  }
  .active-ring::before {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 9999px;
    border: 2px solid #6366f1;
    animation: ping-ring 1.6s cubic-bezier(0,0,0.2,1) infinite;
    pointer-events: none;
  }
  @media (prefers-reduced-motion: reduce) {
    .float-a, .float-b, .float-c { animation: none !important; }
    .active-ring::before { animation: none !important; }
  }
`;
const FLOAT_CLASSES = ["float-a", "float-b", "float-c"];

const STATS = [
  { value: "97%", label: "Client satisfaction" },
  { value: "120+", label: "Projects delivered" },
  { value: "4.9", label: "Average rating" },
];

type Avatar = {
  id: number;
  src: string;
  name: string;
  role: string;
  quote: string;
  /** Real-world coordinates — used to compute % position over the map */
  lat: number;
  lng: number;
  /** Avatar diameter in px */
  size: number;
  /** Float animation delay in seconds */
  delay: number;
};

/**
 * Convert lat/lng → percentage position that matches WorldMap's
 * internal projection: x = (lng+180)*(800/360), y = (90-lat)*(400/180)
 * expressed as % of the 800×400 viewBox.
 */
function toPercent(lat: number, lng: number) {
  const xPx = (lng + 180) * (800 / 360);
  const yPx = (90 - lat) * (400 / 180);
  return { left: `${(xPx / 800) * 100}%`, top: `${(yPx / 400) * 100}%` };
}

const AVATARS: Avatar[] = [
  {
    id: 1,
    src: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Daniel Kim",
    role: "CTO, NorthStack",
    quote: "Softree shipped our platform 2x faster than the previous vendor.",
    lat: 45.4215,   // Ottawa, Canada
    lng: -75.6972,
    size: 52,
    delay: 0.2,
  },
  {
    id: 2,
    src: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Sara Lindqvist",
    role: "Head of Product, Lumen",
    quote: "The team’s design sense is unmatched — clean, fast, on-brand.",
    lat: 59.3293,   // Stockholm
    lng: 18.0686,
    size: 48,
    delay: 0.6,
  },
  {
    id: 3,
    src: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Aiko Tanaka",
    role: "Founder, Hinode",
    quote: "Best engineering partner we’ve worked with in Asia.",
    lat: 35.6762,   // Tokyo
    lng: 139.6503,
    size: 44,
    delay: 1.1,
  },
  {
    id: 4,
    src: "https://randomuser.me/api/portraits/men/75.jpg",
    name: "Marco Rossi",
    role: "VP Engineering, Vela",
    quote: "From discovery to launch in six weeks. Remarkable.",
    lat: 41.9028,   // Rome
    lng: 12.4964,
    size: 48,
    delay: 0.9,
  },
  {
    id: 5,
    src: "https://randomuser.me/api/portraits/men/46.jpg",
    name: "Rahul Verma",
    role: "CEO, Pixelboard",
    quote: "They cut our infra costs by 40% in the first quarter.",
    lat: 28.6139,   // New Delhi
    lng: 77.2090,
    size: 44,
    delay: 1.4,
  },
  {
    id: 6,
    src: "https://randomuser.me/api/portraits/women/26.jpg",
    name: "Emma Carter",
    role: "Director, Northwind",
    quote: "Polished, responsive, and proactive — every single sprint.",
    lat: -33.8688,  // Sydney
    lng: 151.2093,
    size: 48,
    delay: 0.4,
  },
  {
    id: 7,
    src: "https://randomuser.me/api/portraits/men/55.jpg",
    name: "Carlos Mendez",
    role: "CTO, Vitalia",
    quote: "Softree’s team moved with the urgency of a co-founder.",
    lat: -23.5505,  // São Paulo
    lng: -46.6333,
    size: 44,
    delay: 1.8,
  },
];

const CENTER: Avatar = {
  id: 0,
  src: "https://randomuser.me/api/portraits/women/65.jpg",
  name: "Olivia Bennett",
  role: "Chief Design Officer, Arcadia",
  quote:
    "Working with Softree felt like adding a senior product team overnight — strategic, fast, and obsessed with craft.",
  lat: 51.5074,   // London — centre of the map visually
  lng: -0.1278,
  size: 76,
  delay: 0,
};

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 12 12" className="h-3 w-3 fill-amber-400">
          <path d="M6 1l1.39 2.81L10.5 4.3l-2.25 2.19.53 3.1L6 8.07 3.22 9.59l.53-3.1L1.5 4.3l3.11-.49z" />
        </svg>
      ))}
    </span>
  );
}

function AvatarPin({ avatar, active, onActivate, floatClass }: {
  avatar: Avatar; active: boolean; onActivate: () => void; floatClass: string;
}) {
  const pos = toPercent(avatar.lat, avatar.lng);
  return (
    <motion.div
      className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 ${floatClass}`}
      style={{ left: pos.left, top: pos.top, cursor: "pointer" }}
      initial={{ opacity: 0, scale: 0.3, filter: "blur(4px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.55, delay: avatar.delay * 0.18, ease: [0.21, 1.02, 0.73, 1] }}
      onMouseEnter={onActivate}
      onClick={onActivate}
    >
      <div
        role="button"
        tabIndex={0}
        onFocus={onActivate}
        onKeyDown={(e) => e.key === "Enter" && onActivate()}
        className="group relative select-none focus:outline-none"
        aria-pressed={active}
      >
        {/* Tooltip */}
        <div className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2.5 -translate-x-1/2 whitespace-nowrap opacity-0 translate-y-1 transition-all duration-[220ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:opacity-100 group-hover:translate-y-0">
          <div className="rounded-lg bg-neutral-950 px-3 py-1.5 shadow-[0_8px_24px_-4px_rgba(15,23,42,0.35)]">
            <p className="text-[11px] font-semibold leading-tight text-white tracking-[-0.01em]">{avatar.name}</p>
            <p className="mt-0.5 text-[10px] leading-tight text-neutral-400">{avatar.role}</p>
          </div>
          <div className="mx-auto mt-0.5 h-[6px] w-[6px] rotate-45 bg-neutral-950" style={{ marginTop: '-3px' }} />
        </div>

        {/* Active pulsing ring */}
        {active && <span className="active-ring absolute inset-0 rounded-full" />}

        {/* Avatar image */}
        <div
          className={`overflow-hidden rounded-full ring-[2.5px] transition-all duration-[220ms] ease-[cubic-bezier(0.32,0.72,0,1)]
            group-hover:scale-[1.22] group-hover:ring-indigo-400 group-hover:shadow-[0_6px_20px_-4px_rgba(99,102,241,0.55)]
            shadow-[0_3px_12px_-2px_rgba(15,23,42,0.35)]
            ${active
              ? "ring-indigo-500 scale-[1.12] shadow-[0_6px_20px_-4px_rgba(99,102,241,0.5)]"
              : "ring-white/90"}`}
          style={{ width: avatar.size, height: avatar.size }}
        >
          <Image
            src={avatar.src}
            alt={avatar.name}
            width={avatar.size * 2}
            height={avatar.size * 2}
            className="h-full w-full object-cover"
            unoptimized
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsGlobe() {
  const [active, setActive] = useState<Avatar>(CENTER);
  const centerPos = toPercent(CENTER.lat, CENTER.lng);

  return (
    <section className="relative w-full overflow-hidden bg-[#FAFAF8] py-20 sm:py-28">
      <style>{floatStyles}</style>

      {/* Subtle background texture dot */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* ── Header ── */}
        <motion.div
          className="mx-auto max-w-lg text-center"
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.21, 1.02, 0.73, 1] }}
        >
          {/* Eyebrow pill */}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-indigo-600">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
            Client Testimonials
          </span>
          <h2 className="mt-4 text-[1.875rem] font-semibold leading-[1.15] tracking-[-0.03em] text-neutral-950 sm:text-[2.25rem]">
            Trusted across the globe
          </h2>
          <p className="mt-3 text-[0.9375rem] leading-[1.65] text-neutral-500">
            From early-stage startups to enterprise teams&mdash;hear what leaders say about building with Softree.
          </p>
        </motion.div>

        {/* ── Map card — double-bezel architecture ── */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 1.02, 0.73, 1] }}
          className="mt-10"
        >
          {/* Outer shell */}
          <div className="mx-auto max-w-[1100px] rounded-[1.75rem] bg-white/60 p-1.5 ring-1 ring-neutral-950/[0.07] shadow-[0_2px_40px_-8px_rgba(15,23,42,0.12)]">
            {/* Inner core */}
            <div className="relative overflow-hidden rounded-[calc(1.75rem-6px)] bg-white ring-1 ring-neutral-950/[0.04] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">

              {/* Edge gradient fades */}
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-14 bg-gradient-to-b from-white to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-14 bg-gradient-to-t from-white to-transparent" />

              {/* Map */}
              <WorldMap dots={[]} />

              {/* Center featured avatar */}
              <div
                className="float-c absolute z-20 -translate-x-1/2 -translate-y-1/2"
                style={{ left: centerPos.left, top: centerPos.top }}
              >
                <div
                  role="button"
                  tabIndex={0}
                  onMouseEnter={() => setActive(CENTER)}
                  onFocus={() => setActive(CENTER)}
                  onClick={() => setActive(CENTER)}
                  onKeyDown={(e) => e.key === "Enter" && setActive(CENTER)}
                  className="group relative cursor-pointer select-none focus:outline-none"
                  aria-pressed={active.id === CENTER.id}
                >
                  {/* Soft glow behind center avatar */}
                  <div className="absolute inset-[-8px] rounded-full bg-indigo-400/15 blur-2xl transition-all duration-500 group-hover:bg-indigo-400/30 group-hover:inset-[-12px]" />

                  {/* Active pulse ring */}
                  {active.id === CENTER.id && <span className="active-ring absolute inset-0 rounded-full" />}

                  {/* Tooltip */}
                  <div className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-3 -translate-x-1/2 whitespace-nowrap opacity-0 translate-y-1 transition-all duration-[220ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:opacity-100 group-hover:translate-y-0">
                    <div className="rounded-lg bg-neutral-950 px-3 py-1.5 shadow-[0_8px_24px_-4px_rgba(15,23,42,0.35)]">
                      <p className="text-[11px] font-semibold leading-tight text-white tracking-[-0.01em]">{CENTER.name}</p>
                      <p className="mt-0.5 text-[10px] leading-tight text-neutral-400">{CENTER.role}</p>
                    </div>
                    <div className="mx-auto h-[6px] w-[6px] rotate-45 bg-neutral-950" style={{ marginTop: '-3px' }} />
                  </div>

                  {/* Image */}
                  <div
                    className={`relative overflow-hidden rounded-full ring-[3px] shadow-[0_8px_28px_-6px_rgba(15,23,42,0.4)]
                      transition-all duration-[220ms] ease-[cubic-bezier(0.32,0.72,0,1)]
                      group-hover:scale-110 group-hover:ring-indigo-400 group-hover:shadow-[0_12px_32px_-6px_rgba(99,102,241,0.55)]
                      ${active.id === CENTER.id ? "ring-indigo-500 scale-[1.06] shadow-[0_12px_32px_-6px_rgba(99,102,241,0.5)]" : "ring-white"}`}
                    style={{ width: CENTER.size, height: CENTER.size }}
                  >
                    <Image src={CENTER.src} alt={CENTER.name} width={CENTER.size * 2} height={CENTER.size * 2} className="h-full w-full object-cover" unoptimized />
                  </div>
                </div>
              </div>

              {/* Surrounding avatars */}
              {AVATARS.map((avatar, i) => (
                <AvatarPin
                  key={avatar.id}
                  avatar={avatar}
                  active={active.id === avatar.id}
                  onActivate={() => setActive(avatar)}
                  floatClass={FLOAT_CLASSES[i % FLOAT_CLASSES.length]}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Testimonial card ── */}
        <div className="mt-7 sm:mt-8">
          <AnimatePresence mode="wait">
            <motion.figure
              key={active.id}
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -5, filter: "blur(2px)" }}
              transition={{ duration: 0.32, ease: [0.21, 1.02, 0.73, 1] }}
              className="mx-auto max-w-[740px]"
            >
              {/* Outer shell — double-bezel for the card too */}
              <div className="rounded-[1.25rem] bg-white/70 p-[1.5px] ring-1 ring-neutral-950/[0.07] shadow-[0_4px_32px_-8px_rgba(15,23,42,0.1)]">
                <div className="rounded-[calc(1.25rem-1.5px)] bg-white px-7 py-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] text-center">
                  <StarRating />
                  <blockquote className="mt-3 text-[1.0625rem] font-[450] leading-[1.65] tracking-[-0.01em] text-neutral-800">
                    &ldquo;{active.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 flex items-center justify-center gap-3">
                    <div className="relative overflow-hidden rounded-full ring-2 ring-white shadow-[0_2px_8px_-2px_rgba(15,23,42,0.25)]" style={{ width: 36, height: 36 }}>
                      <Image src={active.src} alt={active.name} width={72} height={72} className="h-full w-full object-cover" unoptimized />
                    </div>
                    <div className="text-left">
                      <p className="text-[13px] font-semibold leading-tight tracking-[-0.01em] text-neutral-900">{active.name}</p>
                      <p className="mt-0.5 text-[12px] leading-tight text-neutral-400">{active.role}</p>
                    </div>
                  </figcaption>
                </div>
              </div>
            </motion.figure>
          </AnimatePresence>
        </div>

        {/* ── Stats row ── */}
        <motion.div
          className="mt-10 flex items-center justify-center gap-8 sm:gap-14"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.21, 1.02, 0.73, 1] }}
        >
          {STATS.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-[1.625rem] font-semibold leading-none tracking-[-0.04em] text-neutral-950">{stat.value}</p>
              <p className="mt-1 text-[11.5px] font-medium tracking-[0.02em] text-neutral-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
