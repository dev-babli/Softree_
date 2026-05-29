"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import createGlobe, { type COBEOptions } from "cobe";
import { useEffect, useRef, useState, useMemo } from "react";
import { COUNTRIES_SERVED } from "@/lib/constants";

interface Review {
  name: string;
  company: string;
  rating: number;
  location: string;
  tag: string;
  country: string;
  coords: [number, number];
  comment: string;
}

const REVIEWS: Review[] = [
  {
    name: "Natasha Adams",
    company: "Wicked Point LLC",
    rating: 5,
    location: "Virginia, USA",
    tag: "Virginia",
    country: "United States",
    coords: [37.5407, -77.436],
    comment:
      "We had a very positive experience working with Softree Technology. The developers were responsive and delivery was on time. We appreciate the attention they gave our project and their great communication. The final product was exactly what we wanted and we look forward to working with Softree in the future.",
  },
  {
    name: "Arkady Fedorovtsjev",
    company: "ECG Group",
    rating: 5,
    location: "Netherlands",
    tag: "Netherlands",
    country: "Netherlands",
    coords: [52.3676, 4.9041],
    comment:
      "Overall, we are satisfied with our collaboration in the past and your last action and response to our reported issue, really makes a difference.",
  },
  {
    name: "Darrell Trimble",
    company: "SP Marketplace",
    rating: 5,
    location: "California, USA",
    tag: "California",
    country: "United States",
    coords: [37.7749, -122.4194],
    comment:
      "SOFTREE staff worked with us to learn our installation automation technology and built exactly what we needed.",
  },
  {
    name: "Asif Mohamed",
    company: "Adiva Information Technology LLC",
    rating: 5,
    location: "UAE",
    tag: "UAE",
    country: "UAE",
    coords: [24.4539, 54.3773],
    comment:
      "A trusted technology solutions provider with strong expertise in security, compliance, and enterprise delivery.",
  },
  {
    name: "Rahi Radhakrishnan",
    company: "Nuvento",
    rating: 5,
    location: "Texas, USA",
    tag: "Texas",
    country: "United States",
    coords: [31.9686, -99.9018],
    comment:
      "Softree demonstrated strong expertise in PowerApps development and delivered the project with excellent communication, responsiveness, and coordination throughout the engagement.",
  },
];

/* Softree HQ — Cuttack, Odisha, India */
const HQ: [number, number] = [20.4625, 85.8828];

const DELIVERY_MARKERS: Array<[number, number]> = [
  // North America
  [37.7749, -122.4194], // San Francisco
  [40.7128, -74.0060], // New York
  [37.5407, -77.436], // Richmond
  [41.8781, -87.6298], // Chicago
  [47.6062, -122.3321], // Seattle
  [29.7604, -95.3698], // Houston
  [33.749, -84.388], // Atlanta
  [43.6532, -79.3832], // Toronto
  [49.2827, -123.1207], // Vancouver
  [19.4326, -99.1332], // Mexico City
  // South America
  [-23.5505, -46.6333], // São Paulo
  [-34.6037, -58.3816], // Buenos Aires
  [4.711, -74.0721], // Bogotá
  // Europe
  [51.5074, -0.1278], // London
  [52.3676, 4.9041], // Amsterdam
  [48.8566, 2.3522], // Paris
  [52.52, 13.405], // Berlin
  [50.1109, 8.6821], // Frankfurt
  [40.4168, -3.7038], // Madrid
  [41.9028, 12.4964], // Rome
  [55.6761, 12.5683], // Copenhagen
  [59.3293, 18.0686], // Stockholm
  [47.3769, 8.5417], // Zurich
  [53.3498, -6.2603], // Dublin
  // Middle East / Africa
  [25.2048, 55.2708], // Dubai
  [24.7136, 46.6753], // Riyadh
  [-26.2041, 28.0473], // Johannesburg
  [-1.2921, 36.8219], // Nairobi
  [30.0444, 31.2357], // Cairo
  // Asia
  [12.9716, 77.5946], // Bangalore
  [19.076, 72.8777], // Mumbai
  [28.6139, 77.209], // Delhi
  [1.3521, 103.8198], // Singapore
  [22.3193, 114.1694], // Hong Kong
  [35.6762, 139.6503], // Tokyo
  [37.5665, 126.978], // Seoul
  [13.7563, 100.5018], // Bangkok
  [3.139, 101.6869], // Kuala Lumpur
  // Oceania
  [-33.8688, 151.2093], // Sydney
  [-37.8136, 144.9631], // Melbourne
  [-36.8485, 174.7633], // Auckland
];

const getGlobeConfig = (
  variant: "dark" | "light"
): Omit<COBEOptions, "width" | "height" | "onRender"> => ({
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.22,
  dark: variant === "dark" ? 1 : 0,
  diffuse: 1.25,
  mapSamples: 18000,
  mapBrightness: variant === "dark" ? 6.0 : 4.4,
  baseColor:
    variant === "dark" ? [0.13, 0.13, 0.16] : [0.95, 0.95, 0.97],
  markerColor:
    variant === "dark"
      ? [1, 0.58, 0.26]
      : [24 / 255, 82 / 255, 255 / 255],
  glowColor:
    variant === "dark" ? [1.0, 0.62, 0.34] : [0.09, 0.32, 1.0],
  markers: [],
});

/* HQ pulses on a slow heartbeat; active marker pulses; rest stay steady. */
function buildMarkers(pulse: number, activeIdx: number) {
  const hqSize = 0.115 + Math.sin(pulse) * 0.02;
  return [
    { location: HQ, size: hqSize },
    ...REVIEWS.map((r, i) => {
      const isActive = i === activeIdx;
      return {
        location: r.coords,
        size: isActive ? 0.095 + Math.sin(pulse * 1.5) * 0.02 : 0.052,
      };
    }),
    ...DELIVERY_MARKERS.map((coords) => ({
      location: coords,
      size: 0.045,
    })),
  ];
}

function StarRow({ count = 5 }: { count?: number }) {
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

interface OffshoreTestimonialsGlobeProps {
  variant?: "dark" | "light";
}

export default function OffshoreTestimonialsGlobe({
  variant = "dark",
}: OffshoreTestimonialsGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const phiRef = useRef(0);
  const pulseRef = useRef(0);
  const pointerInteractingRef = useRef<number | null>(null);
  const pointerDeltaRef = useRef(0);
  const reduceMotion = useReducedMotion();
  const [, setCanvasSize] = useState(600);
  const [mounted, setMounted] = useState(false);

  // Active state for quote column
  const [active, setActiveState] = useState(0);
  const activeRef = useRef(0);
  const targetPhiRef = useRef(0);

  const setActive = (i: number) => {
    setActiveState(i);
    activeRef.current = i;
    const review = REVIEWS[i];
    const lng = review.coords[1];
    const targetPhi = 1.15 - (lng * Math.PI) / 180;
    targetPhiRef.current = targetPhi;
  };

  /* Scroll-driven entrance — Apple-style cinematic reveal. */
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "end start"],
  });
  const rawScale = useTransform(scrollYProgress, [0, 0.45, 1], [0.94, 1, 1]);
  const rawBlur = useTransform(
    scrollYProgress,
    [0, 0.35, 1],
    [6, 0, 0]
  );
  const scale = useSpring(rawScale, { stiffness: 120, damping: 28, mass: 0.6 });
  const blur = useSpring(rawBlur, { stiffness: 120, damping: 28, mass: 0.6 });
  const blurFilter = useTransform(blur, (v) => `blur(${v}px)`);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setMounted(true));
    // Initialize cobe rotation to focus on Virginia on load
    const initLng = REVIEWS[0].coords[1];
    targetPhiRef.current = 1.15 - (initLng * Math.PI) / 180;
    phiRef.current = targetPhiRef.current;
    return () => window.cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !wrapRef.current) return;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;

    const probe = document.createElement("canvas");
    const hasWebgl =
      !!probe.getContext("webgl") ||
      !!probe.getContext("experimental-webgl") ||
      !!probe.getContext("webgl2");
    if (!hasWebgl) return;

    const dpr = window.devicePixelRatio || 1;
    const computeSize = () => {
      const w =
        wrap.clientWidth ||
        wrap.getBoundingClientRect().width ||
        600;
      return Math.min(w, 1400) * dpr;
    };
    let width = computeSize();
    setCanvasSize(width / dpr);

    let globe: { destroy: () => void } | null = null;
    try {
      globe = createGlobe(canvas, {
        ...getGlobeConfig(variant),
        width,
        height: width,
        onRender: (state) => {
          // Smooth rotation transition towards active target phi
          const ease = 0.04;
          phiRef.current += (targetPhiRef.current - phiRef.current) * ease;

          // Gentle ambient drift over time unless dragging
          if (pointerInteractingRef.current === null && !reduceMotion) {
            targetPhiRef.current += 0.0018;
          }

          pulseRef.current += 0.04;
          state.phi = phiRef.current + pointerDeltaRef.current;
          state.width = width;
          state.height = width;
          state.markers = buildMarkers(pulseRef.current, activeRef.current);
        },
      });
    } catch {
      return;
    }

    const ro = new ResizeObserver(() => {
      width = computeSize();
      setCanvasSize(width / dpr);
    });
    ro.observe(wrap);
    const onResize = () => {
      width = computeSize();
      setCanvasSize(width / dpr);
    };
    window.addEventListener("resize", onResize);

    const onPointerDown = (e: PointerEvent) => {
      pointerInteractingRef.current =
        e.clientX - pointerDeltaRef.current * 100;
      if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
    };
    const onPointerUp = () => {
      pointerInteractingRef.current = null;
      if (canvasRef.current) canvasRef.current.style.cursor = "grab";
    };
    const onPointerMove = (e: PointerEvent) => {
      if (pointerInteractingRef.current !== null) {
        pointerDeltaRef.current =
          (e.clientX - pointerInteractingRef.current) / 100;
      }
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointermove", onPointerMove);

    return () => {
      globe?.destroy();
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerdown", onPointerDown);
    };
  }, [reduceMotion, variant]);

  const activeReview = useMemo(() => REVIEWS[active], [active]);
  const isDark = variant === "dark";
  const accentColor = isDark ? "#ff7a2f" : "#1852FF";
  const accentBg = isDark ? "rgba(255,122,47,0.12)" : "rgba(24,82,255,0.1)";
  const accentBorder = isDark ? "rgba(255,122,47,0.25)" : "rgba(24,82,255,0.25)";
  const accentSoft = isDark ? "rgba(255,122,47,0.22)" : "rgba(24,82,255,0.22)";
  const cool = isDark ? "rgba(86,128,255,0.18)" : "rgba(24,82,255,0.10)";

  return (
    <section
      aria-labelledby="offshore-heading"
      className={`relative w-full overflow-hidden py-20 sm:py-24 ${
        isDark ? "bg-[#0a0a0a] text-white" : "bg-[#F8F9FC] text-[#0a0a1a]"
      }`}
    >
      {/* Top horizon — subtle gradient seam to whatever sits above. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32"
        style={{
          background: isDark
            ? "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)"
            : "linear-gradient(to bottom, rgba(248,249,252,1), transparent)",
        }}
      />

      {/* Bottom horizon */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          background: isDark
            ? "linear-gradient(to top, rgba(0,0,0,0.7), transparent)"
            : "linear-gradient(to top, rgba(248,249,252,1), transparent)",
        }}
      />

      {/* Twin ambient blooms — warm + cool, gives the scene color depth. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: isDark
            ? `radial-gradient(50% 40% at 28% 38%, ${accentSoft}, transparent 65%), radial-gradient(45% 38% at 78% 70%, ${cool}, transparent 70%)`
            : `radial-gradient(55% 45% at 30% 35%, ${cool}, transparent 65%), radial-gradient(45% 38% at 78% 75%, rgba(10,10,26,0.04), transparent 70%)`,
        }}
      />

      {/* Atmospheric noise — barely there, gives the black its "film" feel. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Cinematic vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: isDark
            ? "radial-gradient(120% 90% at 50% 50%, transparent 50%, rgba(0,0,0,0.55) 100%)"
            : "radial-gradient(120% 90% at 50% 50%, transparent 60%, rgba(10,10,26,0.08) 100%)",
        }}
      />

      <div
        ref={stageRef}
        className="relative mx-auto flex w-full max-w-[1400px] flex-col items-center justify-center px-6"
      >
        <motion.header
          style={{
            scale,
            filter: blurFilter,
            willChange: "transform, filter, opacity",
            opacity: mounted ? 1 : 0,
            transition: "opacity 700ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
          className="mx-auto max-w-[44rem] text-center"
        >
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-semibold tracking-widest uppercase border"
            style={{ background: accentBg, color: accentColor, borderColor: accentBorder }}
          >
            Offshore Testimonials
          </span>
          <h2
            id="offshore-heading"
            className={`mt-4 text-[2.5rem] font-medium leading-[1.05] tracking-[-0.025em] ${
              isDark ? "text-white" : "text-[#0a0a1a]"
            } sm:text-[3rem] lg:text-[3.5rem]`}
          >
            Trusted by growing businesses across the globe
          </h2>
          <p
            className={`mx-auto mt-5 max-w-[36rem] text-[15px] leading-relaxed ${
              isDark ? "text-white/55" : "text-[#0a0a1a]/55"
            }`}
          >
            We collaborate with businesses worldwide to build scalable, modern, and impactful technology experiences.
          </p>
        </motion.header>

        {/* Stage */}
        <div className="relative mt-12 grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
          {/* Globe column */}
          <motion.div
            className="relative w-full"
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [0, -7, 0],
                  }
            }
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: 7.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
          >
            <div
              className="relative mx-auto aspect-square select-none"
              style={{ width: "clamp(320px, 45vw, 680px)" }}
            >
              {/* Outer breathing halo — atmosphere */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-[-4%] rounded-full"
                style={{
                  background: isDark
                    ? `radial-gradient(circle, ${accentSoft} 0%, transparent 62%)`
                    : `radial-gradient(circle, ${cool} 0%, transparent 64%)`,
                  filter: "blur(40px)",
                }}
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: [0.6, 0.9, 0.6],
                        scale: [0.985, 1.015, 0.985],
                      }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : {
                        duration: 6.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
              />

              {/* Inner glow — sits just outside the globe rim */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-[6%] rounded-full"
                style={{
                  background: isDark
                    ? `radial-gradient(circle, rgba(255,122,47,0.18) 0%, transparent 70%)`
                    : `radial-gradient(circle, rgba(24,82,255,0.18) 0%, transparent 72%)`,
                  filter: "blur(60px)",
                }}
              />

              {/* Three hairline concentric rings */}
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-[2.5%] rounded-full border ${
                  isDark ? "border-white/[0.07]" : "border-[#0a0a1a]/[0.07]"
                }`}
              />
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-[12%] rounded-full border ${
                  isDark ? "border-white/[0.05]" : "border-[#0a0a1a]/[0.05]"
                }`}
              />
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-[24%] rounded-full border ${
                  isDark ? "border-white/[0.04]" : "border-[#0a0a1a]/[0.04]"
                }`}
              />

              {/* The globe canvas */}
              <div ref={wrapRef} className="absolute inset-0">
                <canvas
                  ref={canvasRef}
                  className="relative h-full w-full"
                  style={{
                    cursor: "grab",
                    contain: "layout paint size",
                    touchAction: "pan-y",
                    willChange: "transform",
                  }}
                  aria-label="Globe showing Softree global delivery footprint"
                />

                {/* HQ label */}
                <div
                  className={`pointer-events-none absolute bottom-3 left-3 flex items-center gap-2 rounded-full px-3 py-1.5 backdrop-blur-sm ${
                    isDark
                      ? "bg-white/5 border border-white/10"
                      : "bg-white border border-[#0a0a1a]/10 shadow-lg"
                  }`}
                >
                  <span
                    className="block h-1.5 w-1.5 rounded-full"
                    style={{
                      background: accentColor,
                      boxShadow: `0 0 12px 2px ${accentColor}aa`,
                    }}
                  />
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${
                      isDark ? "text-white/70" : "text-[#0a0a1a]/70"
                    }`}
                  >
                    HQ · Cuttack, INDIA
                  </span>
                </div>
              </div>
            </div>

            {/* City selector chips */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {REVIEWS.map((r, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={r.name}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    className="group relative inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                    style={{
                      borderColor: isActive ? accentBorder : isDark ? "rgba(255,255,255,0.1)" : "rgba(10,10,26,0.1)",
                      background: isActive ? accentBg : isDark ? "rgba(255,255,255,0.05)" : "#fff",
                      color: isActive ? accentColor : isDark ? "rgba(255,255,255,0.6)" : "rgba(10,10,26,0.6)",
                    }}
                  >
                    <span
                      className="block h-1.5 w-1.5 rounded-full transition-all"
                      style={{
                        background: isActive ? accentColor : isDark ? "rgba(255,255,255,0.3)" : "rgba(10,10,26,0.3)",
                        boxShadow: isActive ? `0 0 10px 2px ${accentColor}99` : "none",
                      }}
                    />
                    {r.tag}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Quote column */}
          <div className="relative order-2">
            <div
              className={`relative rounded-[32px] p-8 sm:p-10 overflow-hidden ${
                isDark
                  ? "bg-white/5 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
                  : "bg-white border border-[#0a0a1a]/10 shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
              }`}
            >
              {/* Accent stripe */}
              <span
                className="absolute left-0 top-8 h-12 w-1 rounded-r-full"
                style={{ background: accentColor }}
                aria-hidden
              />
              {/* Big quote mark */}
              <span
                aria-hidden
                className="absolute right-6 top-2 select-none font-serif text-[7rem] leading-none"
                style={{ color: accentColor, opacity: 0.12 }}
              >
                &ldquo;
              </span>

              <AnimatePresence mode="wait">
                <motion.figure
                  key={activeReview.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ type: "spring", duration: 0.5, bounce: 0 }}
                  className="relative"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase"
                      style={{ color: isDark ? "rgba(255,255,255,0.5)" : "rgba(10,10,26,0.5)" }}
                    >
                      <svg viewBox="0 0 10 10" className="h-2 w-2" style={{ fill: accentColor }} aria-hidden>
                        <circle cx="5" cy="5" r="2.5" />
                      </svg>
                      {activeReview.location}
                    </span>
                    <StarRow count={activeReview.rating} />
                  </div>

                  <blockquote
                    className="relative mt-6 text-lg sm:text-xl font-medium leading-relaxed"
                    style={{ color: isDark ? "rgba(255,255,255,0.9)" : "rgba(10,10,26,0.9)" }}
                  >
                    &ldquo;{activeReview.comment}&rdquo;
                  </blockquote>

                  <figcaption
                    className="mt-8 flex items-center justify-between gap-6 border-t pt-6"
                    style={{ borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(10,10,26,0.1)" }}
                  >
                    <div>
                      <p
                        className="text-base font-semibold leading-tight"
                        style={{ color: isDark ? "#fff" : "#0a0a1a" }}
                      >
                        {activeReview.name}
                      </p>
                      <p
                        className="mt-1 text-sm leading-tight"
                        style={{ color: isDark ? "rgba(255,255,255,0.6)" : "rgba(10,10,26,0.6)" }}
                      >
                        {activeReview.company}
                      </p>
                    </div>
                    <span
                      className="shrink-0 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest"
                      style={{ background: accentBg, border: `1px solid ${accentBorder}`, color: accentColor }}
                    >
                      <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" style={{ fill: accentColor }} aria-hidden>
                        <path d="M5 8.5L2.5 6l1-1L5 6.5 8.5 3l1 1z" />
                      </svg>
                      Verified
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Footer stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 1.02, 0.73, 1] }}
          className="mt-16 grid w-full grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {[
            { value: COUNTRIES_SERVED, label: "Countries served" },
            { value: "100%", label: "On-time delivery" },
            { value: "8h", label: "Timezone overlap" },
            { value: "4.9", label: "Avg client rating" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl px-5 py-6 text-center transition-colors"
              style={{
                background: isDark ? "rgba(255,255,255,0.05)" : "#fff",
                border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(10,10,26,0.1)",
              }}
            >
              <p
                className="text-3xl sm:text-4xl font-bold tabular-nums"
                style={{ color: isDark ? "#fff" : "#0a0a1a", fontVariantNumeric: "tabular-nums" }}
              >
                {s.value}
              </p>
              <p
                className="mt-2 text-[11px] font-semibold uppercase tracking-widest"
                style={{ color: isDark ? "rgba(255,255,255,0.5)" : "rgba(10,10,26,0.5)" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          :global(canvas) {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
