"use client";

/**
 * OffshoreTestimonialsGlobe
 * ----------------------------------------------------------------
 * A premium, editorial testimonials section showcasing Softree's
 * offshore engagements. A live, interactive 3D cobe globe renders
 * arcs from Softree HQ to each client's city. Selecting a marker
 * (or auto-cycling) reveals an editorial quote card.
 *
 * Design notes (applies skills: high-end-visual-design, design-taste,
 * design-motion-principles, ui-typography, renaissance-architecture):
 *  - Two-column layout (globe left, quote card right) matching homepage rhythm
 *  - Palette: bone-black background, brand orange accent (#ff7a2f),
 *    neutral text ramp. Surfaces use bg-white/5 + border-white/10.
 *  - Bold sans hierarchy to match the rest of the homepage; the only
 *    serif used is the decorative oversized quote-mark glyph.
 *  - Motion respects reduced-motion; springs over linear easing for
 *    quote transitions. Globe rotates slowly, not aggressively.
 *  - Real client data only (no avatars/photos to fake).
 * ---------------------------------------------------------------- */

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import createGlobe, { type COBEOptions } from "cobe";
import { useEffect, useMemo, useRef, useState } from "react";

interface OffshoreTestimonialsGlobeProps {
  variant?: "dark" | "light";
}

/* ── Real client testimonials (provided by Softree) ────────────── */
type Review = {
  name: string;
  company: string;
  rating: number;
  comment: string;
  location: string;
  /** [lat, lng] in degrees */
  coords: [number, number];
  /** Short city/region tag shown on the marker */
  tag: string;
};

const REVIEWS: Review[] = [
  {
    name: "Natasha Adams",
    company: "Wicked Point LLC",
    rating: 5,
    location: "Virginia, USA",
    tag: "Virginia",
    coords: [37.5407, -77.436],
    comment:
      "We had a very positive experience working with Softree Technology. The developers were responsive and delivery was on time. We appreciate the attention they gave our project and their great communication. The final product was exactly what we wanted and we look forward to working with Softree in the future.",
  },
  {
    name: "Arkady Fedorovtsjev",
    company: "ECG Group",
    rating: 5,
    location: "Netherlands",
    tag: "Amsterdam",
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
    coords: [37.7749, -122.4194],
    comment:
      "SOFTREE staff worked with us to learn our installation automation technology and built exactly what we needed.",
  },
];

/* Softree HQ (Bengaluru, India) — origin for all arcs */
const HQ: { name: string; coords: [number, number] } = {
  name: "Softree HQ — Bengaluru",
  coords: [12.9716, 77.5946],
};

/* ── Globe configuration (cobe) ────────────────────────────────── */
const getGlobeConfig = (variant: "dark" | "light"): Omit<COBEOptions, "width" | "height" | "onRender"> => ({
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.25,
  dark: variant === "dark" ? 1 : 0,
  diffuse: 1.15,
  mapSamples: 16000,
  mapBrightness: variant === "dark" ? 5.2 : 4.5,
  baseColor: variant === "dark" ? [0.18, 0.18, 0.2] : [0.95, 0.95, 0.97],
  markerColor: variant === "dark" ? [255 / 255, 122 / 255, 47 / 255] : [24 / 255, 82 / 255, 255 / 255], // orange vs blue
  glowColor: variant === "dark" ? [1.0, 0.55, 0.25] : [0.09, 0.32, 1.0],
  markers: [], // populated per-frame
});

/* ── Helper: format coords for cobe markers (expects [lat, lng]) ─ */
function buildMarkers(activeIndex: number) {
  return [
    { location: HQ.coords, size: 0.08 },
    ...REVIEWS.map((r, i) => ({
      location: r.coords,
      size: i === activeIndex ? 0.11 : 0.055,
    })),
  ];
}

/* ── Star rating ───────────────────────────────────────────────── */
function StarRow({ count = 5 }: { count?: number }) {
  return (
    <span
      className="inline-flex items-center gap-[3px]"
      aria-label={`${count} out of 5 stars`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 12 12"
          className="h-[11px] w-[11px] fill-[#ff7a2f]"
          aria-hidden
        >
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

  /* keep latest active in a ref so the render loop reads fresh data */
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  /* Aim the globe toward the active marker's longitude */
  useEffect(() => {
    const lng = REVIEWS[active].coords[1];
    // cobe phi: rotate so the longitude faces the camera
    targetPhiRef.current = -(lng * Math.PI) / 180;
  }, [active]);

  /* Auto-rotate through reviews */
  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setActive((p) => (p + 1) % REVIEWS.length);
    }, 6200);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  /* Initialize cobe globe */
  useEffect(() => {
    if (!canvasRef.current || !wrapRef.current) return;

    const wrap = wrapRef.current;
    const dpr = window.devicePixelRatio || 1;
    // Render at the full container width, capped at 1280 logical px.
    // Fallback to 600 if the wrapper hasn't laid out yet so cobe gets a real
    // non-zero size on first frame (otherwise the globe stays invisible).
    const computeSize = () => {
      const w = wrap.clientWidth || wrap.getBoundingClientRect().width || 600;
      return Math.min(w, 1280) * dpr;
    };

    let width = computeSize();

    const globe = createGlobe(canvasRef.current, {
      ...getGlobeConfig(variant),
      width,
      height: width,
      onRender: (state) => {
        // Smooth ease toward targetPhi + slow ambient spin
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

    // Use ResizeObserver on the wrapper so the canvas gets a correct size
    // even when the section mounts off-screen / inside hidden containers.
    const ro = new ResizeObserver(() => {
      width = computeSize();
    });
    ro.observe(wrap);
    const onResize = () => {
      width = computeSize();
    };
    window.addEventListener("resize", onResize);

    /* Drag-to-rotate (desktop + touch) */
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
        const delta = e.clientX - pointerInteractingRef.current;
        pointerDeltaRef.current = delta / 100;
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

  const activeReview = useMemo(() => REVIEWS[active], [active]);

  return (
    <section
      aria-labelledby="offshore-heading"
      className={`relative w-full overflow-hidden py-20 sm:py-24 ${variant === "dark" ? "bg-[#0a0a0a] text-white" : "bg-[#F8F9FC] text-[#0a0a1a]"}`}
    >
      {/* Cinematic ambient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: variant === "dark"
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
        {/* ── Eyebrow + Heading ───────────────────────────────── */}
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.21, 1.02, 0.73, 1] }}
          className="max-w-3xl"
        >
          <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-semibold tracking-widest uppercase border ${variant === "dark" ? "bg-[#ff7a2f]/10 text-[#ff7a2f] border-[#ff7a2f]/20" : "bg-[#1852FF]/10 text-[#1852FF] border-[#1852FF]/20"}`}>
            Offshore Testimonials
          </span>
          <h2
            id="offshore-heading"
            className={`mt-4 text-4xl font-bold ${variant === "dark" ? "text-white" : "text-[#0a0a1a]"}`}
          >
            Trusted across three continents
          </h2>
          <p className={`mt-4 text-base leading-relaxed ${variant === "dark" ? "text-white/70" : "text-[#0a0a1a]/70"}`}>
            From Virginia to Amsterdam to the Bay Area — real teams, real
            ship-dates, written in their own words.
          </p>
        </motion.header>

        {/* ── Stage: globe (left) + quote (right) ─────────────── */}
        <div className="relative mt-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
          {/* Globe column — sits flush with the quote card, perfectly centered vertically */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, ease: [0.21, 1.02, 0.73, 1] }}
            className="relative order-1 flex w-full flex-col items-center justify-center"
          >
            {/* Container for rings + globe — rings centered, globe offset */}
            <div className="relative aspect-square w-full max-w-[680px] select-none">
              {/* Concentric guide rings — stay centered (no offset) */}
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-[12%] rounded-full border ${variant === "dark" ? "border-white/[0.04]" : "border-[#0a0a1a]/[0.04]"}`}
              />
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-[22%] rounded-full border ${variant === "dark" ? "border-white/[0.06]" : "border-[#0a0a1a]/[0.06]"}`}
              />

              {/* Globe wrapper — this moves up and right */}
              <div
                ref={wrapRef}
                className="absolute inset-0 lg:-translate-y-32 lg:translate-x-32"
              >
                {/* Warm orange glow behind globe */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-[6%] rounded-full blur-[90px]"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,122,47,0.22), transparent 70%)",
                  }}
                />
                <canvas
                  ref={canvasRef}
                  className="relative h-full w-full"
                  style={{
                    cursor: "grab",
                    contain: "layout paint size",
                    touchAction: "pan-y",
                  }}
                  aria-label="Interactive globe showing Softree client locations"
                />

                {/* Origin label (HQ) */}
                <div className={`pointer-events-none absolute bottom-3 left-3 flex items-center gap-2 rounded-full px-3 py-1.5 backdrop-blur-sm ${variant === "dark" ? "bg-white/5 border border-white/10" : "bg-white border border-[#0a0a1a]/10 shadow-lg"}`}>
                  <span className={`block h-1.5 w-1.5 rounded-full ${variant === "dark" ? "bg-[#ff7a2f] shadow-[0_0_12px_2px_rgba(255,122,47,0.7)]" : "bg-[#1852FF] shadow-[0_0_12px_2px_rgba(24,82,255,0.5)]"}`} />
                  <span className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${variant === "dark" ? "text-white/70" : "text-[#0a0a1a]/70"}`}>
                    HQ · Bengaluru, IN
                  </span>
                </div>
              </div>
            </div>

            {/* City selector chips — anchored below the globe */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {REVIEWS.map((r, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={r.name}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    className={`group relative inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${isActive
                      ? variant === "dark" ? "border-[#ff7a2f]/40 bg-[#ff7a2f]/10 text-[#ff7a2f]" : "border-[#1852FF]/40 bg-[#1852FF]/10 text-[#1852FF]"
                      : variant === "dark" ? "border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:border-white/20 hover:text-white" : "border-[#0a0a1a]/10 bg-white text-[#0a0a1a]/60 hover:bg-[#1852FF]/5 hover:border-[#1852FF]/20 hover:text-[#0a0a1a]"
                      }`}
                  >
                    <span
                      className={`block h-1.5 w-1.5 rounded-full transition-all ${isActive
                        ? variant === "dark" ? "bg-[#ff7a2f] shadow-[0_0_10px_2px_rgba(255,122,47,0.6)]" : "bg-[#1852FF] shadow-[0_0_10px_2px_rgba(24,82,255,0.5)]"
                        : variant === "dark" ? "bg-white/30 group-hover:bg-white/70" : "bg-[#0a0a1a]/30 group-hover:bg-[#1852FF]"
                        }`}
                    />
                    {r.tag}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Quote column — card matching homepage language */}
          <div className="relative order-2">
            <div className={`relative rounded-[32px] p-8 sm:p-10 overflow-hidden ${variant === "dark" ? "bg-white/5 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.35)]" : "bg-white border border-[#0a0a1a]/10 shadow-[0_20px_50px_rgba(0,0,0,0.1)]"}`}>
              {/* Accent stripe */}
              <span className={`absolute left-0 top-8 h-12 w-1 rounded-r-full ${variant === "dark" ? "bg-[#ff7a2f]" : "bg-[#1852FF]"}`} aria-hidden />
              {/* Big quote mark */}
              <span
                aria-hidden
                className={`absolute right-6 top-2 select-none font-serif text-[7rem] leading-none ${variant === "dark" ? "text-[#ff7a2f]/15" : "text-[#1852FF]/10"}`}
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
                    <span className={`inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase ${variant === "dark" ? "text-white/50" : "text-[#0a0a1a]/50"}`}>
                      <svg viewBox="0 0 10 10" className={`h-2 w-2 ${variant === "dark" ? "fill-[#ff7a2f]" : "fill-[#1852FF]"}`} aria-hidden>
                        <circle cx="5" cy="5" r="2.5" />
                      </svg>
                      {activeReview.location}
                    </span>
                    <StarRow count={activeReview.rating} />
                  </div>

                  <blockquote className={`relative mt-6 text-lg sm:text-xl font-medium leading-relaxed ${variant === "dark" ? "text-white/90" : "text-[#0a0a1a]/90"}`}>
                    &ldquo;{activeReview.comment}&rdquo;
                  </blockquote>

                  <figcaption className={`mt-8 flex items-center justify-between gap-6 border-t pt-6 ${variant === "dark" ? "border-white/10" : "border-[#0a0a1a]/10"}`}>
                    <div>
                      <p className={`text-base font-semibold leading-tight ${variant === "dark" ? "text-white" : "text-[#0a0a1a]"}`}>
                        {activeReview.name}
                      </p>
                      <p className={`mt-1 text-sm leading-tight ${variant === "dark" ? "text-white/60" : "text-[#0a0a1a]/60"}`}>
                        {activeReview.company}
                      </p>
                    </div>
                    <span className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest ${variant === "dark" ? "bg-[#ff7a2f]/10 border border-[#ff7a2f]/20 text-[#ff7a2f]" : "bg-[#1852FF]/10 border border-[#1852FF]/20 text-[#1852FF]"}`}>
                      <svg viewBox="0 0 12 12" className={`h-2.5 w-2.5 ${variant === "dark" ? "fill-[#ff7a2f]" : "fill-[#1852FF]"}`} aria-hidden>
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

        {/* ── Footer stats — matching homepage card language ───── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 1.02, 0.73, 1] }}
          className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {[
            { value: "15+", label: "Countries served" },
            { value: "100%", label: "On-time delivery" },
            { value: "8h", label: "Timezone overlap" },
            { value: "4.9", label: "Avg client rating" },
          ].map((s) => (
            <div
              key={s.label}
              className={`rounded-2xl px-5 py-6 text-center transition-colors ${variant === "dark" ? "bg-white/5 border border-white/10 hover:bg-white/[0.07] hover:border-white/20" : "bg-white border border-[#0a0a1a]/10 hover:border-[#1852FF]/30"}`}
            >
              <p
                className={`text-3xl sm:text-4xl font-bold tabular-nums ${variant === "dark" ? "text-white" : "text-[#0a0a1a]"}`}
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {s.value}
              </p>
              <p className={`mt-2 text-[11px] font-semibold uppercase tracking-widest ${variant === "dark" ? "text-white/50" : "text-[#0a0a1a]/50"}`}>
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
