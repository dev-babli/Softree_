"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import createGlobe, { type COBEOptions } from "cobe";
import { useEffect, useRef, useState } from "react";

interface OffshoreTestimonialsGlobeProps {
  variant?: "dark" | "light";
}

/* Softree HQ — Cuttack, Odisha, India */
const HQ: [number, number] = [20.4625, 85.8828];

/**
 * Curated global delivery footprint.
 * Coordinates are [lat, lng]. Spread is intentional — every continent except
 * Antarctica is represented so the rotation always shows life on screen.
 */
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

/* HQ pulses on a slow heartbeat; satellite markers stay steady. */
function buildMarkers(pulse: number) {
  const hqSize = 0.115 + Math.sin(pulse) * 0.02;
  return [
    { location: HQ, size: hqSize },
    ...DELIVERY_MARKERS.map((coords) => ({
      location: coords,
      size: 0.052,
    })),
  ];
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

  // Set mounted on client so the post-mount transition fires (Emil's pattern:
  // CSS-transition over keyframes for interruptibility / no jump).
  useEffect(() => {
    const id = window.requestAnimationFrame(() => setMounted(true));
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
          // Ambient drift unless user is dragging or reduced-motion is set.
          if (pointerInteractingRef.current === null && !reduceMotion) {
            phiRef.current += 0.0022;
          }
          pulseRef.current += 0.04;
          state.phi = phiRef.current + pointerDeltaRef.current;
          state.width = width;
          state.height = width;
          state.markers = buildMarkers(pulseRef.current);
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

  const isDark = variant === "dark";
  const accent = isDark ? "#ff7a2f" : "#1852FF";
  const accentSoft = isDark ? "rgba(255,122,47,0.22)" : "rgba(24,82,255,0.22)";
  const cool = isDark ? "rgba(86,128,255,0.18)" : "rgba(24,82,255,0.10)";

  return (
    <section
      aria-label="Global delivery footprint"
      className={`relative w-full overflow-hidden ${isDark ? "bg-[#070708]" : "bg-[#F5F6FA]"
        }`}
    >
      {/* Top horizon — subtle gradient seam to whatever sits above. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32"
        style={{
          background: isDark
            ? "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)"
            : "linear-gradient(to bottom, rgba(245,246,250,1), transparent)",
        }}
      />

      {/* Bottom horizon */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          background: isDark
            ? "linear-gradient(to top, rgba(0,0,0,0.7), transparent)"
            : "linear-gradient(to top, rgba(245,246,250,1), transparent)",
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
        className="relative mx-auto flex w-full max-w-[1400px] items-center justify-center px-4 py-24 sm:py-32 lg:py-40"
      >
        <motion.div
          style={{
            scale,
            filter: blurFilter,
            willChange: "transform, filter, opacity",
            opacity: mounted ? 1 : 0,
            transition: "opacity 700ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
          className="relative w-full"
        >
          {/* Vertical float — Jakub-style gentle life. Skipped under reduced motion. */}
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
              style={{ width: "clamp(320px, 78vw, 1180px)" }}
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

              {/* Three hairline concentric rings — Stripe-style mapping cue */}
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-[2.5%] rounded-full border ${isDark
                    ? "border-white/[0.07]"
                    : "border-[#0a0a1a]/[0.07]"
                  }`}
              />
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-[12%] rounded-full border ${isDark
                    ? "border-white/[0.05]"
                    : "border-[#0a0a1a]/[0.05]"
                  }`}
              />
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-[24%] rounded-full border ${isDark
                    ? "border-white/[0.04]"
                    : "border-[#0a0a1a]/[0.04]"
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
              </div>

              {/* Top-edge specular highlight — subtle "lit from above" feel */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{
                  background: isDark
                    ? "radial-gradient(60% 30% at 50% 8%, rgba(255,255,255,0.08), transparent 70%)"
                    : "radial-gradient(60% 30% at 50% 8%, rgba(255,255,255,0.45), transparent 70%)",
                  mixBlendMode: "screen",
                }}
              />
            </div>
          </motion.div>
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
