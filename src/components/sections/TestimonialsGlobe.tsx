"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import WorldMap from "@/components/ui/world-map";
import { COUNTRIES_SERVED_SPELL } from "@/lib/constants";

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
    border: 1.5px solid #F5B947;
    animation: ping-ring 1.6s var(--legacy-ease-0_0_0_2_1) infinite;
    pointer-events: none;
  }
  @keyframes ambient-pulse {
    0%, 100% { opacity: 0.45; }
    50% { opacity: 0.75; }
  }
  .ambient-glow { animation: ambient-pulse 6s ease-in-out infinite; }
  @media (prefers-reduced-motion: reduce) {
    .float-a, .float-b, .float-c, .ambient-glow { animation: none !important; }
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
  location: string;
  /** Real-world coordinates — used to compute % position over the map */
  lat: number;
  lng: number;
  /** Avatar diameter in px */
  size: number;
  /** Float animation delay in seconds */
  delay: number;
};

/** Beautiful gradient options for client initials avatar placeholders */
const GRADIENTS = [
  "from-[#FF7A2F] to-[#F5B947]", // Warm orange/yellow
  "from-[#1852FF] to-[#00D4FF]", // Electric blue
  "from-[#8E2DE2] to-[#4A00E0]", // Violet
  "from-[#11998E] to-[#38EF7D]", // Emerald
  "from-[#FF512F] to-[#DD2476]", // Sunset pink/red
  "from-[#4776E6] to-[#8E54E9]", // Royal purple
  "from-[#00B4DB] to-[#0083B0]"  // Teal
];

const getGradient = (id: number) => {
  return GRADIENTS[id % GRADIENTS.length];
};

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

const MapPinIcon = ({ className = "w-5 h-5 text-white", style }: { className?: string; style?: React.CSSProperties }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
        clipRule="evenodd"
      />
    </svg>
  );
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

// Set src to empty string so it automatically falls back to beautiful gradient initials,
// but keep the field so the user can easily add client pictures in the future.
const AVATARS: Avatar[] = [
  {
    id: 1,
    src: "",
    name: "Arkady Fedorovtsjev",
    role: "ECG Group",
    quote: "Overall, we are satisfied with our collaboration in the past and your last action and response to our reported issue, really makes a difference.",
    location: "Netherlands",
    lat: 52.3676,   // Netherlands
    lng: 4.9041,
    size: 38,
    delay: 0.3,
  },
  {
    id: 2,
    src: "",
    name: "Darrell Trimble",
    role: "SP Marketplace",
    quote: "SOFTREE staff worked with us to learn our installation automation technology and built exactly what we needed.",
    location: "California, USA",
    lat: 37.7749,   // California, USA
    lng: -122.4194,
    size: 38,
    delay: 0.6,
  },
  {
    id: 3,
    src: "",
    name: "Asif Mohamed",
    role: "Adiva Information Technology LLC",
    quote: "A trusted technology solutions provider with strong expertise in security, compliance, and enterprise delivery.",
    location: "UAE",
    lat: 24.4539,   // UAE
    lng: 54.3773,
    size: 38,
    delay: 0.9,
  },
  {
    id: 4,
    src: "",
    name: "Rahi Radhakrishnan",
    role: "Nuvento",
    quote: "Softree demonstrated strong expertise in PowerApps development and delivered the project with excellent communication, responsiveness, and coordination throughout the engagement.",
    location: "Texas, USA",
    lat: 31.9686,   // Texas, USA
    lng: -99.9018,
    size: 38,
    delay: 1.2,
  },
];

const CENTER: Avatar = {
  id: 0,
  src: "",
  name: "Natasha Adams",
  role: "Wicked Point LLC",
  quote:
    "We had a very positive experience working with Softree Technology. The developers were responsive and delivery was on time. We appreciate the attention they gave our project and their great communication. The final product was exactly what we wanted and we look forward to working with Softree in the future.",
  location: "Virginia, USA",
  lat: 37.5407,   // Virginia, USA
  lng: -77.436,
  size: 46,
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
        <div className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2.5 -translate-x-1/2 whitespace-nowrap opacity-0 translate-y-1 transition-all duration-[220ms] ease-[var(--legacy-ease-0_32_0_72_0_1)] group-hover:opacity-100 group-hover:translate-y-0">
          <div className="rounded-md border border-white/[0.08] bg-[var(--legacy-141414)] px-2.5 py-1.5 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.6)] backdrop-blur-sm">
            <p className="text-[10.5px] font-medium leading-tight text-white tracking-[-0.005em]">{avatar.name}</p>
            <p className="mt-0.5 text-[9.5px] leading-tight text-neutral-500">{avatar.role} · {avatar.location}</p>
          </div>
        </div>

        {/* Active pulsing ring */}
        {active && <span className="active-ring absolute inset-0 rounded-full" />}

        {/* Location tag under the map pin circle */}
        <span className={`absolute top-[calc(100%+6px)] left-1/2 -translate-x-1/2 text-[9px] font-semibold tracking-wide bg-[#0A0A0A]/70 backdrop-blur-[2px] px-2 py-0.5 rounded-full whitespace-nowrap shadow-sm border border-white/[0.05] pointer-events-none transition-all duration-200
          ${active ? "text-[#F5B947] border-[#F5B947]/30 scale-[1.05]" : "text-neutral-400 group-hover:text-white"}`}
        >
          {avatar.location}
        </span>

        {/* Avatar content */}
        <div
          className={`overflow-hidden rounded-full ring-2 transition-all duration-[280ms] ease-[var(--legacy-ease-0_32_0_72_0_1)]
            group-hover:scale-[1.18] group-hover:ring-[var(--legacy-f5b947)] group-hover:shadow-[0_6px_24px_-4px_rgba(245,185,71,0.5)]
            shadow-[0_3px_14px_-2px_rgba(0,0,0,0.6)]
            ${active
              ? "ring-[var(--legacy-f5b947)] scale-[1.1] shadow-[0_6px_24px_-4px_rgba(245,185,71,0.5)]"
              : "ring-white/30"}`}
          style={{ width: avatar.size, height: avatar.size }}
        >
          {avatar.src ? (
            <Image
              src={avatar.src}
              alt={avatar.name}
              width={avatar.size * 2}
              height={avatar.size * 2}
              className="h-full w-full object-cover"
              unoptimized
            />
          ) : (
            <div className={`h-full w-full bg-gradient-to-br ${getGradient(avatar.id)} flex items-center justify-center text-white select-none`}>
              <MapPinIcon
                className={`w-5.5 h-5.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] transition-transform duration-300 group-hover:scale-110 ${active ? "animate-bounce" : ""}`}
                style={{ animationDuration: "2s" }}
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

type TestimonialsGlobeProps = {
  variant?: "light" | "dark";
};

export default function TestimonialsGlobe({ variant = "light" }: TestimonialsGlobeProps) {
  const [active, setActive] = useState<Avatar>(CENTER);
  const centerPos = toPercent(CENTER.lat, CENTER.lng);
  const isDark = variant === "dark";

  // Theme tokens — keep all conditionals in one place
  const t = {
    bg: isDark ? "bg-[var(--legacy-0a0a0a)]" : "bg-[var(--legacy-fafaf8)]",
    bgSolid: isDark ? "#0A0A0A" : "#FAFAF8",
    text: isDark ? "text-white" : "text-neutral-950",
    textMuted: isDark ? "text-neutral-500" : "text-neutral-500",
    textBody: isDark ? "text-neutral-300" : "text-neutral-700",
    hairline: isDark ? "bg-white/[0.08]" : "bg-neutral-900/[0.08]",
    surfaceRing: isDark ? "ring-white/[0.08]" : "ring-neutral-900/[0.06]",
  };

  return (
    <section className={`relative w-full overflow-hidden py-24 sm:py-32 ${t.bg}`}>
      <style>{floatStyles}</style>

      {/* Cinematic radial vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: isDark
            ? `radial-gradient(ellipse 80% 60% at 50% 40%, rgba(245,185,71,0.06), transparent 60%)`
            : `radial-gradient(ellipse 80% 60% at 50% 40%, rgba(245,185,71,0.05), transparent 60%)`,
        }}
      />

      {/* Subtle grain texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative mx-auto max-w-[1240px] px-6">

        {/* ── Header — editorial centered ── */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.21, 1.02, 0.73, 1] }}
        >
          <div className="inline-flex items-center gap-2.5">
            <span className="h-px w-8 bg-[var(--legacy-f5b947)]" />
            <span className={`text-[10.5px] font-medium uppercase tracking-[0.24em] ${isDark ? "text-[var(--legacy-f5b947)]" : "text-amber-700"}`}>
              Voices from the network
            </span>
            <span className="h-px w-8 bg-[var(--legacy-f5b947)]" />
          </div>
          <h2 className={`mt-6 text-[2rem] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-[2.75rem] lg:text-[3.25rem] ${t.text}`}>
            Built with teams in <span className="font-serif italic font-normal text-[var(--legacy-f5b947)]">{COUNTRIES_SERVED_SPELL}</span> countries
          </h2>
          <p className={`mx-auto mt-5 max-w-md text-[0.9375rem] leading-[1.7] ${t.textBody}`}>
          We collaborate with businesses worldwide to build scalable, modern, and impactful technology experiences.
          </p>
        </motion.div>

        {/* ── Map — full-bleed, no card chrome ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.21, 1.02, 0.73, 1] }}
          className="relative mt-16"
        >
          {/* Ambient amber glow behind map */}
          <div
            aria-hidden
            className="ambient-glow pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[60%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
            style={{ background: "radial-gradient(circle, rgba(245,185,71,0.15), transparent 70%)" }}
          />

          {/* Map container — minimal frame */}
          <div className="relative mx-auto max-w-[1100px]">
            {/* Corner ticks — architectural detail */}
            <CornerTick className="absolute -left-2 -top-2" />
            <CornerTick className="absolute -right-2 -top-2 rotate-90" />
            <CornerTick className="absolute -left-2 -bottom-2 -rotate-90" />
            <CornerTick className="absolute -right-2 -bottom-2 rotate-180" />

            <div className="relative overflow-hidden">
              {/* Edge gradient fades */}
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32" style={{ background: `linear-gradient(to right, ${t.bgSolid}, transparent)` }} />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32" style={{ background: `linear-gradient(to left, ${t.bgSolid}, transparent)` }} />
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20" style={{ background: `linear-gradient(to bottom, ${t.bgSolid}, transparent)` }} />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20" style={{ background: `linear-gradient(to top, ${t.bgSolid}, transparent)` }} />

              {/* Map */}
              <WorldMap dots={[]} variant={variant} />

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
                  {/* Warm glow */}
                  <div className="absolute inset-[-12px] rounded-full blur-2xl transition-all duration-500 group-hover:inset-[-18px]"
                    style={{ background: "radial-gradient(circle, rgba(245,185,71,0.35), transparent 70%)" }} />

                  {active.id === CENTER.id && <span className="active-ring absolute inset-0 rounded-full" />}

                  {/* Tooltip */}
                  <div className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-3 -translate-x-1/2 whitespace-nowrap opacity-0 translate-y-1 transition-all duration-[220ms] ease-[var(--legacy-ease-0_32_0_72_0_1)] group-hover:opacity-100 group-hover:translate-y-0">
                    <div className="rounded-md border border-white/[0.08] bg-[var(--legacy-141414)] px-3 py-2 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.6)]">
                      <p className="text-[11px] font-medium leading-tight text-white tracking-[-0.005em]">{CENTER.name}</p>
                      <p className="mt-0.5 text-[10px] leading-tight text-neutral-500">{CENTER.role} · {CENTER.location}</p>
                    </div>
                  </div>

                  {/* Location tag under the center map pin */}
                  <span className={`absolute top-[calc(100%+6px)] left-1/2 -translate-x-1/2 text-[9px] font-semibold tracking-wide bg-[#0A0A0A]/70 backdrop-blur-[2px] px-2 py-0.5 rounded-full whitespace-nowrap shadow-sm border border-white/[0.05] pointer-events-none transition-all duration-200
                    ${active.id === CENTER.id ? "text-[#F5B947] border-[#F5B947]/30 scale-[1.05]" : "text-neutral-400 group-hover:text-white"}`}
                  >
                    {CENTER.location}
                  </span>

                  <div
                    className={`relative overflow-hidden rounded-full ring-[2.5px] shadow-[0_8px_28px_-6px_rgba(0,0,0,0.55)]
                      transition-all duration-[280ms] ease-[var(--legacy-ease-0_32_0_72_0_1)]
                      group-hover:scale-[1.08] group-hover:ring-[var(--legacy-f5b947)]
                      ${active.id === CENTER.id ? "ring-[var(--legacy-f5b947)] scale-[1.04]" : "ring-white/40"}`}
                    style={{ width: CENTER.size, height: CENTER.size }}
                  >
                    {CENTER.src ? (
                      <Image src={CENTER.src} alt={CENTER.name} width={CENTER.size * 2} height={CENTER.size * 2} className="h-full w-full object-cover" unoptimized />
                    ) : (
                      <div className={`h-full w-full bg-gradient-to-br ${getGradient(CENTER.id)} flex items-center justify-center text-white select-none`}>
                        <MapPinIcon
                          className={`w-9 h-9 drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)] ${active.id === CENTER.id ? "animate-bounce" : ""}`}
                          style={{ animationDuration: "2.5s" }}
                        />
                      </div>
                    )}
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

        {/* ── Editorial testimonial — quote left, meta right ── */}
        <div className="mx-auto mt-16 max-w-[1000px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={active.id}
              initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -6, filter: "blur(3px)" }}
              transition={{ duration: 0.4, ease: [0.21, 1.02, 0.73, 1] }}
              className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_auto] md:items-center md:gap-16"
            >
              {/* Large editorial quote */}
              <div className="relative">
                <span className="absolute -left-1 -top-6 font-serif text-[5rem] leading-none text-[var(--legacy-f5b947)]/40 select-none" aria-hidden>&ldquo;</span>
                <blockquote className={`relative font-serif text-[1.5rem] font-normal italic leading-[1.4] tracking-[-0.015em] sm:text-[1.875rem] sm:leading-[1.35] ${t.text}`}>
                  {active.quote}
                </blockquote>
              </div>

              {/* Author meta */}
              <figcaption className="flex items-center gap-4 md:flex-col md:items-start md:gap-3 md:border-l md:border-white/[0.08] md:pl-8">
                <div
                  className="relative overflow-hidden rounded-full ring-2 ring-white/20 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.6)]"
                  style={{ width: 56, height: 56 }}
                >
                  {active.src ? (
                    <Image src={active.src} alt={active.name} width={112} height={112} className="h-full w-full object-cover" unoptimized />
                  ) : (
                    <div className={`h-full w-full bg-gradient-to-br ${getGradient(active.id)} flex items-center justify-center text-white font-bold select-none text-[14px] tracking-wide`}>
                      {getInitials(active.name)}
                    </div>
                  )}
                </div>
                <div className="md:mt-1">
                  <p className={`text-[14px] font-semibold leading-tight tracking-[-0.01em] ${t.text}`}>{active.name}</p>
                  <p className={`mt-1 text-[12px] leading-tight ${t.textMuted}`}>{active.role} · {active.location}</p>
                  <div className="mt-2.5"><StarRating /></div>
                </div>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {/* ── Hairline divider ── */}
        <div className={`mx-auto mt-16 h-px max-w-[1000px] ${t.hairline}`} />

        {/* ── Stats row — tabular, editorial ── */}
        <motion.div
          className="mx-auto mt-10 grid max-w-[1000px] grid-cols-3 gap-px"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 1.02, 0.73, 1] }}
        >
          {STATS.map((stat, i) => (
            <div
              key={i}
              className={`flex flex-col items-center justify-center px-4 py-2 text-center ${i > 0 ? (isDark ? "border-l border-white/[0.08]" : "border-l border-neutral-900/[0.08]") : ""}`}
            >
              <p
                className={`font-serif text-[2.25rem] font-normal leading-none tracking-[-0.04em] tabular-nums sm:text-[3rem] ${t.text}`}
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {stat.value}
              </p>
              <p className={`mt-3 text-[10.5px] font-medium uppercase tracking-[0.18em] ${t.textMuted}`}>
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

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
