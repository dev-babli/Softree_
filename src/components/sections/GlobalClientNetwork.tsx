"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeader from "@/components/homepage-light/SectionHeader";
import { DUR, EASE_T, prefersReducedMotion } from "@/lib/motion";

const SECTION_SURFACE = "#F3F0EE";
const ACCENT_ORANGE = "#FF5812";
const ACCENT_BLUE = "#1852FF";

const VW = 1100;
const VH = 520;
const HEX_R = 4.5;

function StatIcon({ type, className }: { type: "chart" | "cart" | "bag"; className?: string }) {
  if (type === "chart") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    );
  }
  if (type === "cart") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

type City = {
  id: string;
  name: string;
  city: string;
  country: string;
  lat: number;
  lon: number;
  accent: "orange" | "blue" | "green" | "violet";
  region: "Americas" | "Europe" | "Asia Pacific" | "Middle East";
};

/** Verified HQ / delivery hubs — city + country shown in roster (not on-map cards). */
const CITIES: City[] = [
  { id: "hallman", name: "Hallman Industries", city: "Houston", country: "USA", lat: 29.7604, lon: -95.3698, accent: "orange", region: "Americas" },
  { id: "nuvento", name: "Nuvento", city: "Seattle", country: "USA", lat: 47.6062, lon: -122.3321, accent: "blue", region: "Americas" },
  { id: "intellectt", name: "Intellectt", city: "Miami", country: "USA", lat: 25.7617, lon: -80.1918, accent: "violet", region: "Americas" },
  { id: "autorepair", name: "Auto Repair Pro", city: "Los Angeles", country: "USA", lat: 34.0522, lon: -118.2437, accent: "green", region: "Americas" },
  { id: "bosch", name: "Bosch", city: "Stuttgart", country: "Germany", lat: 48.7758, lon: 9.1829, accent: "violet", region: "Europe" },
  { id: "emscale", name: "Emscale", city: "London", country: "UK", lat: 51.5074, lon: -0.1278, accent: "green", region: "Europe" },
  { id: "link", name: "Link Innovation", city: "Hyderabad", country: "India", lat: 17.385, lon: 78.4867, accent: "blue", region: "Asia Pacific" },
  { id: "kwiz", name: "Kwiz", city: "Bengaluru", country: "India", lat: 12.9716, lon: 77.5946, accent: "violet", region: "Asia Pacific" },
  { id: "goerp", name: "GO ERP", city: "Singapore", country: "Singapore", lat: 1.3521, lon: 103.8198, accent: "blue", region: "Asia Pacific" },
  { id: "sp", name: "SP Marketplace", city: "Melbourne", country: "Australia", lat: -37.8136, lon: 144.9631, accent: "orange", region: "Asia Pacific" },
  { id: "jonians", name: "Jonians", city: "Dubai", country: "UAE", lat: 25.2048, lon: 55.2708, accent: "orange", region: "Middle East" },
];

const REGION_ORDER: City["region"][] = ["Americas", "Europe", "Asia Pacific", "Middle East"];

const CONTINENT_RECTS = [
  { lonMin: -125, lonMax: -60, latMin: 25, latMax: 50 },
  { lonMin: -168, lonMax: -55, latMin: 50, latMax: 72 },
  { lonMin: -116, lonMax: -86, latMin: 15, latMax: 25 },
  { lonMin: -90, lonMax: -77, latMin: 7, latMax: 15 },
  { lonMin: -85, lonMax: -60, latMin: 10, latMax: 28 },
  { lonMin: -74, lonMax: -10, latMin: 60, latMax: 83 },
  { lonMin: -82, lonMax: -35, latMin: -56, latMax: 13 },
  { lonMin: -10, lonMax: 10, latMin: 36, latMax: 51 },
  { lonMin: 10, lonMax: 35, latMin: 40, latMax: 70 },
  { lonMin: 5, lonMax: 32, latMin: 55, latMax: 71 },
  { lonMin: -11, lonMax: 2, latMin: 50, latMax: 61 },
  { lonMin: 7, lonMax: 19, latMin: 36, latMax: 47 },
  { lonMin: -17, lonMax: 51, latMin: -35, latMax: 38 },
  { lonMin: 43, lonMax: 51, latMin: -26, latMax: -12 },
  { lonMin: 34, lonMax: 60, latMin: 12, latMax: 35 },
  { lonMin: 68, lonMax: 90, latMin: 8, latMax: 33 },
  { lonMin: 35, lonMax: 170, latMin: 45, latMax: 78 },
  { lonMin: 90, lonMax: 130, latMin: 18, latMax: 45 },
  { lonMin: 128, lonMax: 146, latMin: 30, latMax: 46 },
  { lonMin: 95, lonMax: 110, latMin: 8, latMax: 23 },
  { lonMin: 95, lonMax: 141, latMin: -11, latMax: 6 },
  { lonMin: 116, lonMax: 127, latMin: 5, latMax: 20 },
  { lonMin: 112, lonMax: 154, latMin: -39, latMax: -10 },
  { lonMin: 144, lonMax: 149, latMin: -44, latMax: -40 },
  { lonMin: 165, lonMax: 179, latMin: -48, latMax: -34 },
];

function lonLatFromXY(x: number, y: number, width: number, height: number) {
  const lon = (x / width) * 360 - 180;
  const lat = 90 - (y / height) * 180;
  return { lon, lat };
}

function withinAnyContinent(lon: number, lat: number) {
  return CONTINENT_RECTS.some((r) => lon >= r.lonMin && lon <= r.lonMax && lat >= r.latMin && lat <= r.latMax);
}

type HexCell = { x: number; y: number };

function buildHexGrid(width: number, height: number, r: number): HexCell[] {
  const dx = 1.5 * r;
  const dy = Math.sqrt(3) * r;
  const cells: HexCell[] = [];
  for (let q = 0, x = r; x < width + r; q++, x = r + q * dx) {
    const yStart = r + (q % 2 ? dy / 2 : 0);
    for (let y = yStart; y < height + r; y += dy) {
      cells.push({ x, y });
    }
  }
  return cells;
}

function hexPolygonPoints(cx: number, cy: number, r: number) {
  const a = Math.PI / 3;
  const start = Math.PI / 6;
  return Array.from({ length: 6 }, (_, i) => {
    const px = cx + r * Math.cos(start + a * i);
    const py = cy + r * Math.sin(start + a * i);
    return `${px},${py}`;
  }).join(" ");
}

function formatNumber(n: number) {
  return new Intl.NumberFormat("en-US").format(n);
}

function project(lon: number, lat: number) {
  return {
    x: ((lon + 180) / 360) * VW,
    y: ((90 - lat) / 180) * VH,
  };
}

function accentColor(accent: City["accent"]) {
  switch (accent) {
    case "orange":
      return ACCENT_ORANGE;
    case "green":
      return "#22C55E";
    case "violet":
      return "#A855F7";
    case "blue":
    default:
      return "#3B82F6";
  }
}

type TopologyTransform = { scale?: [number, number]; translate?: [number, number] };
type TopologyLike = { transform?: TopologyTransform; arcs: number[][][]; objects?: Record<string, unknown> };
type GeometryLike = { type: string; arcs?: unknown; geometries?: unknown[] };

function decodeArcs(topologyUnknown: unknown): number[][][] {
  const topology = topologyUnknown as TopologyLike;
  const t = topology.transform ?? {};
  const scale: [number, number] = (t.scale as [number, number]) ?? [1, 1];
  const translate: [number, number] = (t.translate as [number, number]) ?? [0, 0];
  return (topology.arcs || []).map((arc) => {
    let x = 0;
    let y = 0;
    return arc.map(([dx, dy]) => {
      x += dx;
      y += dy;
      return [x * scale[0] + translate[0], y * scale[1] + translate[1]];
    });
  });
}

function stitchRing(idxs: number[], arcs: number[][][]): number[][] {
  const out: number[][] = [];
  idxs.forEach((idx, i) => {
    const forward = idx >= 0;
    const arc = forward ? arcs[idx] : [...arcs[~idx]].reverse();
    if (i === 0) out.push(...arc);
    else out.push(...arc.slice(1));
  });
  return out;
}

function collectPolygons(geomUnknown: unknown, arcs: number[][][]): number[][][][] {
  const polys: number[][][][] = [];
  if (!geomUnknown) return polys;
  const geom = geomUnknown as GeometryLike;
  if (geom.type === "Polygon") {
    const ringsIdxs: number[][] = (geom.arcs as number[][]) || [];
    polys.push(ringsIdxs.map((ring) => stitchRing(ring, arcs)) as number[][][]);
  } else if (geom.type === "MultiPolygon") {
    const polysIdxs: number[][][] = (geom.arcs as number[][][]) || [];
    polysIdxs.forEach((p) => {
      polys.push(p.map((ring) => stitchRing(ring, arcs)) as number[][][]);
    });
  } else if (geom.type === "GeometryCollection") {
    (geom.geometries || []).forEach((g) => {
      collectPolygons(g, arcs).forEach((p) => polys.push(p));
    });
  }
  return polys;
}

const KPI_STRIP = [
  { label: "Client retention", v: 98, suffix: "%", c: "#8B5CF6", icon: "chart" as const },
  { label: "Partner certs", v: 50, suffix: "+", c: ACCENT_BLUE, icon: "cart" as const },
  { label: "Projects delivered", v: 178, suffix: "+", c: ACCENT_ORANGE, icon: "bag" as const },
] as const;

function PartnerRegionsGrid({
  activeId,
  onHover,
}: {
  activeId: string | null;
  onHover: (id: string | null) => void;
}) {
  return (
    <div className="mt-10 border-t border-[#0a0a1a]/10 pt-10 md:mt-12 md:pt-12">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0a0a1a]/42">
            Partner locations
          </p>
          <p className="mt-1 text-[14px] text-[#0a0a1a]/58">
            Tap or hover a hub — the map pin highlights. City and country are always shown.
          </p>
        </div>
        <Link
          href="/case-studies"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-[#0a0a1a]/10 bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0a0a1a] transition duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-[#FF5812]/25 hover:text-[#FF5812]"
        >
          View case studies
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {REGION_ORDER.map((region) => {
          const group = CITIES.filter((c) => c.region === region);
          if (!group.length) return null;
          return (
            <div
              key={region}
              className="rounded-[1.25rem] bg-white/40 p-1.5 ring-1 ring-[#0a0a1a]/[0.06] shadow-[0_12px_40px_-32px_rgba(10,10,26,0.18)]"
            >
              <div className="rounded-[1rem] border border-[#0a0a1a]/[0.04] bg-white px-3 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#0a0a1a]/38">
                  {region}
                </p>
                <ul className="mt-3 space-y-2">
                  {group.map((c) => {
                    const col = accentColor(c.accent);
                    const active = activeId === c.id;
                    return (
                      <li key={c.id}>
                        <button
                          type="button"
                          onMouseEnter={() => onHover(c.id)}
                          onMouseLeave={() => onHover(null)}
                          onFocus={() => onHover(c.id)}
                          onBlur={() => onHover(null)}
                          onClick={() => onHover(active ? null : c.id)}
                          className={`flex w-full items-start gap-2.5 rounded-[11px] border px-2.5 py-2 text-left transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                            active
                              ? "border-[#FF5812]/30 bg-[#FFF8F5] shadow-[0_6px_20px_-12px_rgba(255,88,18,0.35)]"
                              : "border-transparent hover:border-[#0a0a1a]/8 hover:bg-[#F3F0EE]/80"
                          }`}
                        >
                          <span
                            className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                            style={{
                              backgroundColor: col,
                              boxShadow: active ? `0 0 0 4px ${col}28` : undefined,
                            }}
                          />
                          <span className="min-w-0">
                            <span className="block text-[12px] font-semibold leading-snug text-[#0a0a1a]">
                              {c.name}
                            </span>
                            <span className="mt-0.5 block text-[11px] leading-snug text-[#0a0a1a]/55">
                              {c.city}
                              <span className="text-[#0a0a1a]/35"> · </span>
                              {c.country}
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatsRail() {
  return (
    <div className="flex h-full flex-col justify-between gap-6 rounded-[1.5rem] bg-white/50 p-1.5 ring-1 ring-[#0a0a1a]/[0.06]">
      <div className="rounded-[1.15rem] border border-[#0a0a1a]/[0.04] bg-white px-5 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0a0a1a]/42">
          Active hubs
        </p>
        <p className="mt-2 text-[3.25rem] font-semibold leading-none tracking-[-0.05em] text-[#0a0a1a] tabular-nums">
          {CITIES.length}
          <span className="text-[1.5rem] text-[#FF5812]">+</span>
        </p>
        <p className="mt-2 text-[13px] leading-snug text-[#0a0a1a]/55">
          Enterprise partnerships across four regions
        </p>
      </div>
      <ul className="space-y-2.5 px-1 pb-1">
        {KPI_STRIP.map((k) => (
          <li
            key={k.label}
            className="flex items-center gap-3 rounded-[14px] border border-[#0a0a1a]/[0.05] bg-white px-3 py-2.5"
          >
            <span
              className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] text-white"
              style={{ backgroundColor: k.c }}
            >
              <StatIcon type={k.icon} className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#0a0a1a]/40">
                {k.label}
              </p>
              <p className="text-[15px] font-semibold tabular-nums text-[#0a0a1a]">
                {formatNumber(k.v)}
                {k.suffix}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function GlobalClientNetwork() {
  const reduced = useReducedMotion() || prefersReducedMotion();
  const [polygons, setPolygons] = useState<number[][][][] | null>(null);
  const [activeClientId, setActiveClientId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");
        if (!res.ok) return;
        const topoUnknown = await res.json();
        const arcs = decodeArcs(topoUnknown);
        const objects = (topoUnknown as { objects?: Record<string, unknown> }).objects ?? {};
        const landObj = objects.land ?? objects.countries ?? null;
        const polys = collectPolygons(landObj, arcs);
        if (mounted) setPolygons(polys);
      } catch {
        /* approx land grid still renders */
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const cells = useMemo(() => buildHexGrid(VW, VH, HEX_R), []);

  const approxCells = useMemo(() => {
    return cells.filter(({ x, y }) => {
      const { lon, lat } = lonLatFromXY(x, y, VW, VH);
      return withinAnyContinent(lon, lat);
    });
  }, [cells]);

  const processedPolys = useMemo(() => {
    if (!polygons) return [];
    return polygons
      .map((poly) => {
        const outer = poly[0] as [number, number][];
        if (!outer?.length) return null;
        let minLon = Infinity;
        let maxLon = -Infinity;
        let minLat = Infinity;
        let maxLat = -Infinity;
        for (const [ptLon, ptLat] of outer) {
          if (ptLon < minLon) minLon = ptLon;
          if (ptLon > maxLon) maxLon = ptLon;
          if (ptLat < minLat) minLat = ptLat;
          if (ptLat > maxLat) maxLat = ptLat;
        }
        if (maxLat < -60) return null;
        return { bbox: { minLon, maxLon, minLat, maxLat }, outer, holes: poly.slice(1) as [number, number][][] };
      })
      .filter(Boolean) as Array<{
        bbox: { minLon: number; maxLon: number; minLat: number; maxLat: number };
        outer: [number, number][];
        holes: [number, number][][];
      }>;
  }, [polygons]);

  const worldCells = useMemo(() => {
    if (!processedPolys.length) return approxCells;
    return cells.filter(({ x, y }) => {
      const { lon, lat } = lonLatFromXY(x, y, VW, VH);
      for (const p of processedPolys) {
        if (lon < p.bbox.minLon || lon > p.bbox.maxLon || lat < p.bbox.minLat || lat > p.bbox.maxLat) continue;
        let inside = false;
        const outer = p.outer;
        for (let i = 0, j = outer.length - 1; i < outer.length; j = i++) {
          const xi = outer[i][0];
          const yi = outer[i][1];
          const xj = outer[j][0];
          const yj = outer[j][1];
          const intersect = yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
          if (intersect) inside = !inside;
        }
        if (!inside) continue;
        let insideHole = false;
        for (const hole of p.holes) {
          let inHole = false;
          for (let i = 0, j = hole.length - 1; i < hole.length; j = i++) {
            const xi = hole[i][0];
            const yi = hole[i][1];
            const xj = hole[j][0];
            const yj = hole[j][1];
            const intersect = yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
            if (intersect) inHole = !inHole;
          }
          if (inHole) {
            insideHole = true;
            break;
          }
        }
        if (!insideHole) return true;
      }
      return false;
    });
  }, [processedPolys, cells, approxCells]);

  const cityPins = useMemo(
    () =>
      CITIES.map((c) => ({
        ...c,
        xy: project(c.lon, c.lat),
        color: accentColor(c.accent),
      })),
    []
  );

  const tintedHexes = useMemo(() => {
    const R = 72;
    const result: Array<{ x: number; y: number; color: string; opacity: number }> = [];
    for (const { x, y } of worldCells) {
      let best: { color: string; d: number } | null = null;
      for (const pin of cityPins) {
        const d = Math.hypot(x - pin.xy.x, y - pin.xy.y);
        if (d <= R && (!best || d < best.d)) best = { color: pin.color, d };
      }
      if (best) {
        const t = Math.max(0, 1 - best.d / R);
        result.push({ x, y, color: best.color, opacity: 0.12 + 0.38 * t * t });
      }
    }
    return result;
  }, [worldCells, cityPins]);

  return (
    <section
      data-section="global-client-network"
      data-theme-section="light"
      aria-labelledby="global-client-network-heading"
      className="relative overflow-hidden py-20 md:py-24 lg:py-32"
      style={{ backgroundColor: SECTION_SURFACE }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-20 z-0 h-[480px] w-[480px] rounded-full"
        style={{
          background: "radial-gradient(closest-side, rgba(255,88,18,0.07), rgba(255,88,18,0) 72%)",
          filter: "blur(32px)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(10,10,26,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,10,26,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-12">
        {/* Editorial header — full width */}
        <motion.div
          className="mb-10 grid grid-cols-1 gap-8 lg:mb-14 lg:grid-cols-12 lg:gap-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: DUR.section, ease: EASE_T.silk }}
        >
          <div className="lg:col-span-7">
            <SectionHeader
              badge="Global network"
              accent={ACCENT_ORANGE}
              headline={<span id="global-client-network-heading">Global impact</span>}
              body="Verified partner hubs across the Americas, Europe, Asia Pacific, and the Middle East — with delivery teams anchored in the right city, not a generic region label."
            />
          </div>
        </motion.div>

        {/* Map + stats rail (editorial split) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          <motion.div
            className="lg:col-span-8 xl:col-span-9"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DUR.section, delay: 0.06, ease: EASE_T.silk }}
          >
            <div className="rounded-[2rem] bg-white/45 p-2 shadow-[0_28px_72px_-36px_rgba(10,10,26,0.16)] ring-1 ring-[#0a0a1a]/[0.06]">
              <div
                className="relative overflow-hidden rounded-[calc(2rem-0.5rem)] bg-[#E8ECF2] shadow-[inset_0_1px_1px_rgba(255,255,255,0.85)]"
                style={{ aspectRatio: `${VW} / ${VH}` }}
              >
                <svg
                  viewBox={`0 0 ${VW} ${VH}`}
                  className="h-full w-full"
                  preserveAspectRatio="xMidYMid meet"
                  role="img"
                  aria-label="World map showing Softree partner locations"
                >
                  <g fill="white" stroke="#CBD5E1" strokeOpacity={0.45} strokeWidth={0.55}>
                    {worldCells.map(({ x, y }, i) => (
                      <polygon key={`l-${i}`} points={hexPolygonPoints(x, y, HEX_R)} />
                    ))}
                  </g>
                  <g>
                    {tintedHexes.map((h, i) => (
                      <polygon
                        key={`t-${i}`}
                        points={hexPolygonPoints(h.x, h.y, HEX_R)}
                        fill={h.color}
                        opacity={h.opacity}
                      />
                    ))}
                  </g>
                  <g>
                    {cityPins.map((pin) => {
                      const active = activeClientId === pin.id;
                      const r = active ? 7 : 5;
                      return (
                        <g
                          key={pin.id}
                          transform={`translate(${pin.xy.x} ${pin.xy.y})`}
                          opacity={activeClientId && !active ? 0.3 : 1}
                        >
                          <circle r={r + 5} fill={pin.color} opacity={active ? 0.24 : 0.1} />
                          <circle r={r} fill={pin.color} stroke="white" strokeWidth={2} />
                          {active && !reduced && (
                            <circle r={r + 8} fill="none" stroke={pin.color} strokeWidth={1.25} opacity={0.55}>
                              <animate attributeName="r" values={`${r + 5};${r + 14};${r + 5}`} dur="2s" repeatCount="indefinite" />
                              <animate attributeName="opacity" values="0.55;0;0.55" dur="2s" repeatCount="indefinite" />
                            </circle>
                          )}
                        </g>
                      );
                    })}
                  </g>
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-4 xl:col-span-3"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DUR.section, delay: 0.12, ease: EASE_T.silk }}
          >
            <StatsRail />
          </motion.div>
        </div>

        {/* Partner grid — full width below map (no sidebar cram) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: DUR.panel, delay: 0.08, ease: EASE_T.silk }}
        >
          <PartnerRegionsGrid activeId={activeClientId} onHover={setActiveClientId} />
        </motion.div>
      </div>
    </section>
  );
}
