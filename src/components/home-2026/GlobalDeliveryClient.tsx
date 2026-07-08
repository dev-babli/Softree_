"use client";

/**
 * GlobalDeliveryClient — the interactive map leaf. Story-spec §7.
 * Hairline lat/long grid + markers (deviation from "world line-map": no
 * verifiable map component API existed; the coordinate grid keeps the
 * brutalist "mapped honestly" intent — documented in build report).
 * - Marker stagger fade on enter (once). Hover tooltip. Map drifts ≤8px
 *   toward cursor (transform, pointer:fine).
 * - Clocks: ticking HH:MM after mount (SSR shows static UTC offsets).
 */
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

import { EASE_T, REVEAL, VIEWPORT, prefersReducedMotion } from "@/lib/motion";
import { motion } from "framer-motion";

type Marker = {
  id: string;
  label: string;
  detail: string; // TODO(verify): replace with real office names/headcounts
  coords: string;
  utcOffset: number;
  x: number; // % position on the grid
  y: number;
};

const MARKERS: Marker[] = [
  { id: "hub", label: "DELIVERY HUB", detail: "ENGINEERING · 140+", coords: "24°51'N 67°00'E", utcOffset: 5, x: 66, y: 46 },
  { id: "emea", label: "EMEA CLIENTS", detail: "ENTERPRISE · BANKING", coords: "51°30'N 0°07'W", utcOffset: 0, x: 46, y: 28 },
  { id: "amer", label: "AMERICAS CLIENTS", detail: "SAAS · HEALTHCARE", coords: "40°42'N 74°00'W", utcOffset: -5, x: 24, y: 34 },
  { id: "apac", label: "APAC CLIENTS", detail: "MANUFACTURING", coords: "1°17'N 103°51'E", utcOffset: 8, x: 82, y: 58 },
];

function useClock(utcOffset: number): string | null {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const utcMs = now.getTime() + now.getTimezoneOffset() * 60_000;
      const local = new Date(utcMs + utcOffset * 3_600_000);
      setTime(
        `${String(local.getHours()).padStart(2, "0")}:${String(local.getMinutes()).padStart(2, "0")}`,
      );
    };
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, [utcOffset]);
  return time;
}

function MarkerDot({ m }: { m: Marker }) {
  const time = useClock(m.utcOffset);
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className="absolute"
      style={{ left: `${m.x}%`, top: `${m.y}%` }}
      initial={REVEAL.fade.initial}
      whileInView={REVEAL.fade.animate}
      viewport={VIEWPORT.default}
      transition={{ duration: 0.4, ease: EASE_T.out }}
    >
      <button
        type="button"
        className="group relative flex min-h-11 min-w-11 items-center justify-center focus-visible:outline-none"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={`${m.label}, ${m.coords}`}
      >
        <span
          aria-hidden
          className={`block h-2 w-2 rounded-full transition-colors duration-200 ${m.id === "hub" ? "bg-[#ff7a2f]" : "bg-white/55 group-hover:bg-white"}`}
        />
      </button>
      <div
        role="tooltip"
        className={`font-mono-meta hairline pointer-events-none absolute left-1/2 top-full z-10 mt-1 w-max -translate-x-1/2 bg-[#141414] px-3 py-2 text-white/75 transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}
      >
        <div>{m.label}</div>
        <div className="text-white/45">{m.detail}</div>
        <div className="text-white/45">
          {m.coords} · <span suppressHydrationWarning>{time ?? `UTC${m.utcOffset >= 0 ? "+" : ""}${m.utcOffset}`}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function GlobalDeliveryClient() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = scope.current;
      if (!el) return;
      if (prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;

      const xTo = gsap.quickTo(el.querySelector("[data-map]"), "x", { duration: 0.8, ease: "power3" });
      const yTo = gsap.quickTo(el.querySelector("[data-map]"), "y", { duration: 0.8, ease: "power3" });
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        xTo(((e.clientX - r.left) / r.width - 0.5) * 16); // ≤ 8px each way
        yTo(((e.clientY - r.top) / r.height - 0.5) * 16);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };
      el.addEventListener("mousemove", onMove, { passive: true });
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope },
  );

  return (
    <div ref={scope} className="hairline relative mt-12 aspect-[16/8] w-full overflow-hidden bg-[#0d0d0d] sm:aspect-[16/6]">
      <div data-map className="absolute inset-0">
        {/* Coordinate grid — brutalist metadata texture */}
        <div aria-hidden className="absolute inset-0">
          {[20, 40, 60, 80].map((p) => (
            <div key={`v${p}`} className="absolute top-0 h-full w-px bg-white/[0.06]" style={{ left: `${p}%` }} />
          ))}
          {[25, 50, 75].map((p) => (
            <div key={`h${p}`} className="absolute left-0 h-px w-full bg-white/[0.06]" style={{ top: `${p}%` }} />
          ))}
        </div>
        {MARKERS.map((m) => (
          <MarkerDot key={m.id} m={m} />
        ))}
      </div>
    </div>
  );
}
