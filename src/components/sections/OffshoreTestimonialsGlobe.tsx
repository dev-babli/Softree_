"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import createGlobe, { type COBEOptions } from "cobe";
import { useEffect, useMemo, useRef, useState } from "react";
import { COUNTRIES_SERVED } from "@/lib/constants";

interface OffshoreTestimonialsGlobeProps {
  variant?: "dark" | "light";
}

type Review = {
  name: string;
  company: string;
  rating: number;
  comment: string;
  location: string;
  coords: [number, number];
  tag: string;
  country: string;
};

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
];

/* Softree HQ — Cuttack, Odisha, India */
const HQ = {
  name: "Softree HQ — Cuttack, INDIA",
  coords: [20.4625, 85.8828] as [number, number],
};


const getGlobeConfig = (variant: "dark" | "light"): Omit<COBEOptions, "width" | "height" | "onRender"> => ({
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.25,
  dark: variant === "dark" ? 1 : 0,
  diffuse: 1.15,
  mapSamples: 16000,
  mapBrightness: variant === "dark" ? 5.7 : 4.5,
  baseColor: variant === "dark" ? [0.14, 0.14, 0.17] : [0.95, 0.95, 0.97],
  markerColor: variant === "dark" ? [1, 0.58, 0.26] : [24 / 255, 82 / 255, 255 / 255],
  glowColor: variant === "dark" ? [1.0, 0.62, 0.34] : [0.09, 0.32, 1.0],
  markers: [],
});

function buildMarkers(activeIndex: number) {
  return [
    { location: HQ.coords, size: 0.1 },
    ...REVIEWS.map((r, i) => ({
      location: r.coords,
      size: i === activeIndex ? 0.12 : 0.065,
    })),
  ];
}

function projectToCanvas(
  lat: number,
  lng: number,
  phi: number,
  canvasSize: number
): { x: number; y: number; visible: boolean } {
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180;

  const x = Math.cos(latRad) * Math.cos(lngRad);
  const y = Math.sin(latRad);
  const z = Math.cos(latRad) * Math.sin(lngRad);

  const cosP = Math.cos(-phi);
  const sinP = Math.sin(-phi);
  const rx = x * cosP - z * sinP;
  const rz = x * sinP + z * cosP;

  const screenX = (rx * 0.5 + 0.5) * canvasSize;
  const screenY = (-y * 0.5 + 0.5) * canvasSize;

  return { x: screenX, y: screenY, visible: rz > 0.06 };
}

function getPointerPlacement(
  projection: { x: number; y: number },
  canvasSize: number
): { left: string; top: string; xClass: string; yClass: string } {
  const xPercent = (projection.x / canvasSize) * 100;
  const yPercent = (projection.y / canvasSize) * 100;

  const xClass = xPercent > 78 ? "-translate-x-full" : xPercent < 22 ? "translate-x-0" : "-translate-x-1/2";
  const yClass = yPercent < 18 ? "translate-y-1" : "-translate-y-1/2";

  return {
    left: `${xPercent}%`,
    top: `${yPercent}%`,
    xClass,
    yClass,
  };
}

function StarRow({ count = 5 }: { count?: number }) {
  return (
    <span className="inline-flex items-center gap-[3px]" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 12 12" className="h-[11px] w-[11px] fill-[var(--legacy-ff7a2f)]" aria-hidden>
          <path d="M6 1l1.39 2.81L10.5 4.3l-2.25 2.19.53 3.1L6 8.07 3.22 9.59l.53-3.1L1.5 4.3l3.11-.49z" />
        </svg>
      ))}
    </span>
  );
}

export default function OffshoreTestimonialsGlobe({ variant = "dark" }: OffshoreTestimonialsGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const phiRef = useRef(0);
  const targetPhiRef = useRef(0);
  const pointerInteractingRef = useRef<number | null>(null);
  const pointerDeltaRef = useRef(0);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const reduceMotion = useReducedMotion();
  const [, setCanvasSize] = useState(600);
  const [autoRotatePaused, setAutoRotatePaused] = useState(false);
  const [canvasSizePx, setCanvasSizePx] = useState(600);
  const [phiForLabels, setPhiForLabels] = useState(0);

  useEffect(() => { activeRef.current = active; }, [active]);

  useEffect(() => {
    const lng = REVIEWS[active].coords[1];
    targetPhiRef.current = -(lng * Math.PI) / 180;
  }, [active]);

  useEffect(() => {
    if (reduceMotion || autoRotatePaused) return;
    const id = window.setInterval(() => {
      setActive((p) => (p + 1) % REVIEWS.length);
    }, 6200);
    return () => window.clearInterval(id);
  }, [reduceMotion, autoRotatePaused]);

  useEffect(() => {
    if (!canvasRef.current || !wrapRef.current) return;
    const wrap = wrapRef.current;
    const dpr = window.devicePixelRatio || 1;
    const computeSize = () => {
      const w = wrap.clientWidth || wrap.getBoundingClientRect().width || 600;
      return Math.min(w, 1280) * dpr;
    };
    let width = computeSize();
    setCanvasSize(width / dpr);
    setCanvasSizePx(width / dpr);

    const globe = createGlobe(canvasRef.current, {
      ...getGlobeConfig(variant),
      width,
      height: width,
      onRender: (state) => {
        const ease = 0.04;
        phiRef.current += (targetPhiRef.current - phiRef.current) * ease;
        const ambient = reduceMotion ? 0 : 0.0018;
        targetPhiRef.current += ambient;
        state.phi = phiRef.current + pointerDeltaRef.current;
        state.width = width;
        state.height = width;
        state.markers = buildMarkers(activeRef.current);
      },
    });

    const ro = new ResizeObserver(() => {
      width = computeSize();
      setCanvasSize(width / dpr);
      setCanvasSizePx(width / dpr);
    });
    ro.observe(wrap);
    const onResize = () => {
      width = computeSize();
      setCanvasSize(width / dpr);
      setCanvasSizePx(width / dpr);
    };
    window.addEventListener("resize", onResize);

    const onPointerDown = (e: PointerEvent) => {
      pointerInteractingRef.current = e.clientX - pointerDeltaRef.current * 100;
      if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
    };
    const onPointerUp = () => {
      pointerInteractingRef.current = null;
      if (canvasRef.current) canvasRef.current.style.cursor = "grab";
    };
    const onPointerMove = (e: PointerEvent) => {
      if (pointerInteractingRef.current !== null) {
        pointerDeltaRef.current = (e.clientX - pointerInteractingRef.current) / 100;
      }
    };

    const c = canvasRef.current;
    c.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointermove", onPointerMove);

    return () => {
      globe.destroy();
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointermove", onPointerMove);
      c.removeEventListener("pointerdown", onPointerDown);
    };
  }, [reduceMotion, variant]);

  useEffect(() => {
    let raf = 0;
    let lastTs = 0;
    const tick = (ts: number) => {
      if (ts - lastTs > 80) {
        setPhiForLabels(phiRef.current + pointerDeltaRef.current);
        lastTs = ts;
      }
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, []);

  const activeReview = useMemo(() => REVIEWS[active], [active]);

  const accentColor = variant === "dark" ? "#ff7a2f" : "#1852FF";
  const accentBg    = variant === "dark" ? "rgba(255,122,47,0.12)" : "rgba(24,82,255,0.1)";
  const accentBorder = variant === "dark" ? "rgba(255,122,47,0.25)" : "rgba(24,82,255,0.25)";
  const activeCountryProjection = projectToCanvas(
    activeReview.coords[0],
    activeReview.coords[1],
    phiForLabels,
    canvasSizePx
  );
  const hqProjection = projectToCanvas(HQ.coords[0], HQ.coords[1], phiForLabels, canvasSizePx);
  const activePointerPlacement = getPointerPlacement(activeCountryProjection, canvasSizePx);
  const hqPointerPlacement = getPointerPlacement(hqProjection, canvasSizePx);

  return (
    <section
      aria-labelledby="offshore-heading"
      className={`relative w-full overflow-hidden py-20 sm:py-24 ${
        variant === "dark" ? "bg-[var(--legacy-0a0a0a)] text-white" : "bg-[#F8F9FC] text-[#0a0a1a]"
      }`}
    >
      {/* Ambient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            variant === "dark"
              ? "radial-gradient(ellipse 70% 55% at 30% 45%, rgba(255,122,47,0.07), transparent 60%)"
              : "radial-gradient(ellipse 70% 55% at 30% 45%, rgba(24,82,255,0.07), transparent 60%)",
        }}
      />
      {/* Grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Eyebrow + heading */}
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.21, 1.02, 0.73, 1] }}
          className="max-w-3xl"
        >
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-semibold tracking-widest uppercase border"
            style={{ background: accentBg, color: accentColor, borderColor: accentBorder }}
          >
            Offshore Testimonials
          </span>
          <h2
            id="offshore-heading"
            className={`mt-4 text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-balance ${variant === "dark" ? "text-white" : "text-[#0a0a1a]"}`}
          >
            Trusted across three continents
          </h2>
          <p className={`mt-4 text-base leading-relaxed ${variant === "dark" ? "text-white/70" : "text-[#0a0a1a]/70"}`}>
            From Virginia to Amsterdam to the Bay Area — real teams, real ship-dates, written in their own words.
          </p>
        </motion.header>

        {/* Stage */}
        <div
          className="relative mt-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16"
          onMouseEnter={() => setAutoRotatePaused(true)}
          onMouseLeave={() => setAutoRotatePaused(false)}
        >

          {/* Globe column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, ease: [0.21, 1.02, 0.73, 1] }}
            className="relative order-1 flex w-full flex-col items-center justify-center"
          >
            <div className="relative aspect-square w-full max-w-[680px] select-none">
              {/* Guide rings */}
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-[12%] rounded-full border ${
                  variant === "dark" ? "border-white/[0.04]" : "border-[#0a0a1a]/[0.04]"
                }`}
              />
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-[22%] rounded-full border ${
                  variant === "dark" ? "border-white/[0.06]" : "border-[#0a0a1a]/[0.06]"
                }`}
              />

              {/* Globe wrapper */}
              <div
                ref={wrapRef}
                className="absolute inset-0 rounded-[32px] border border-white/10 bg-white/[0.02] lg:-translate-y-32 lg:translate-x-32"
              >
                {/* Warm glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-[6%] rounded-full blur-[90px]"
                  style={{ background: "radial-gradient(circle, rgba(255,122,47,0.22), transparent 70%)" }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[32px]"
                  style={{
                    background:
                      variant === "dark"
                        ? "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.08), transparent 52%)"
                        : "radial-gradient(circle at 32% 28%, rgba(24,82,255,0.08), transparent 52%)",
                  }}
                />

                <canvas
                  ref={canvasRef}
                  className="relative h-full w-full"
                  style={{ cursor: "grab", contain: "layout paint size", touchAction: "pan-y" }}
                  aria-label="Interactive globe showing Softree client locations"
                />

                {activeCountryProjection.visible && (
                  <div
                    className={`pointer-events-none absolute z-20 ${activePointerPlacement.xClass} ${activePointerPlacement.yClass}`}
                    style={{
                      left: activePointerPlacement.left,
                      top: activePointerPlacement.top,
                    }}
                  >
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] backdrop-blur-sm"
                      style={{
                        color: accentColor,
                        borderColor: accentBorder,
                        background: variant === "dark" ? "rgba(7, 7, 10, 0.7)" : "rgba(255, 255, 255, 0.92)",
                        boxShadow: `0 8px 22px -12px ${accentColor}99`,
                      }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: accentColor, boxShadow: `0 0 10px 2px ${accentColor}99` }}
                      />
                      {activeReview.country}
                    </span>
                  </div>
                )}

                {hqProjection.visible && (
                  <div
                    className={`pointer-events-none absolute z-20 ${hqPointerPlacement.xClass} ${hqPointerPlacement.yClass}`}
                    style={{
                      left: hqPointerPlacement.left,
                      top: hqPointerPlacement.top,
                    }}
                  >
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] backdrop-blur-sm ${
                        variant === "dark"
                          ? "bg-[rgba(7,7,10,0.72)] border-white/15 text-white/80"
                          : "bg-white/90 border-[#0a0a1a]/10 text-[#0a0a1a]/70"
                      }`}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: accentColor, boxShadow: `0 0 10px 2px ${accentColor}99` }}
                      />
                      India · HQ
                    </span>
                  </div>
                )}
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
                    onFocus={() => setAutoRotatePaused(true)}
                    onBlur={() => setAutoRotatePaused(false)}
                    aria-label={`Show testimonial from ${r.location}`}
                    className="group relative inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-[var(--legacy-ease-0_32_0_72_0_1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98]"
                    style={{
                      borderColor: isActive ? accentBorder : variant === "dark" ? "rgba(255,255,255,0.1)" : "rgba(10,10,26,0.1)",
                      background:  isActive ? accentBg    : variant === "dark" ? "rgba(255,255,255,0.05)" : "#fff",
                      color:       isActive ? accentColor : variant === "dark" ? "rgba(255,255,255,0.6)"  : "rgba(10,10,26,0.6)",
                      boxShadow:   isActive ? `0 0 0 1px ${accentBorder}` : "none",
                    }}
                  >
                    <span
                      className="block h-1.5 w-1.5 rounded-full transition-all"
                      style={{
                        background:  isActive ? accentColor : variant === "dark" ? "rgba(255,255,255,0.3)" : "rgba(10,10,26,0.3)",
                        boxShadow:   isActive ? `0 0 10px 2px ${accentColor}99` : "none",
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
                variant === "dark"
                  ? "bg-white/5 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
                  : "bg-white border border-[#0a0a1a]/10 shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
              }`}
              onMouseEnter={() => setAutoRotatePaused(true)}
              onMouseLeave={() => setAutoRotatePaused(false)}
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
                  transition={reduceMotion ? { duration: 0 } : { type: "spring", duration: 0.5, bounce: 0 }}
                  className="relative"
                  aria-live="polite"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2">
                      <span
                        className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase"
                        style={{ color: variant === "dark" ? "rgba(255,255,255,0.5)" : "rgba(10,10,26,0.5)" }}
                      >
                        <svg viewBox="0 0 10 10" className="h-2 w-2" style={{ fill: accentColor }} aria-hidden>
                          <circle cx="5" cy="5" r="2.5" />
                        </svg>
                        {activeReview.location}
                      </span>
                      <span
                        className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]"
                        style={{
                          color: accentColor,
                          border: `1px solid ${accentBorder}`,
                          background: accentBg,
                        }}
                      >
                        {activeReview.country}
                      </span>
                    </div>
                    <StarRow count={activeReview.rating} />
                  </div>

                  <blockquote
                    className="relative mt-6 text-lg sm:text-xl font-medium leading-relaxed text-pretty"
                    style={{ color: variant === "dark" ? "rgba(255,255,255,0.9)" : "rgba(10,10,26,0.9)" }}
                  >
                    &ldquo;{activeReview.comment}&rdquo;
                  </blockquote>

                  <figcaption
                    className="mt-8 flex items-center justify-between gap-6 border-t pt-6"
                    style={{ borderColor: variant === "dark" ? "rgba(255,255,255,0.1)" : "rgba(10,10,26,0.1)" }}
                  >
                    <div>
                      <p
                        className="text-base font-semibold leading-tight"
                        style={{ color: variant === "dark" ? "#fff" : "#0a0a1a" }}
                      >
                        {activeReview.name}
                      </p>
                      <p
                        className="mt-1 text-sm leading-tight"
                        style={{ color: variant === "dark" ? "rgba(255,255,255,0.6)" : "rgba(10,10,26,0.6)" }}
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
          className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {[
            { value: COUNTRIES_SERVED,  label: "Countries served" },
            { value: "100%", label: "On-time delivery" },
            { value: "8h",   label: "Timezone overlap" },
            { value: "4.9",  label: "Avg client rating" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl px-5 py-6 text-center transition-colors"
              style={{
                background: variant === "dark" ? "rgba(255,255,255,0.05)" : "#fff",
                border: variant === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(10,10,26,0.1)",
              }}
            >
              <p
                className="text-3xl sm:text-4xl font-bold tabular-nums"
                style={{ color: variant === "dark" ? "#fff" : "#0a0a1a", fontVariantNumeric: "tabular-nums" }}
              >
                {s.value}
              </p>
              <p
                className="mt-2 text-[11px] font-semibold uppercase tracking-widest"
                style={{ color: variant === "dark" ? "rgba(255,255,255,0.5)" : "rgba(10,10,26,0.5)" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}