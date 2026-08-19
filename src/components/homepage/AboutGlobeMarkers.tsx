"use client";

import React from "react";
import {
  Calendar,
  Code2,
  Cpu,
  Globe2,
  LayoutGrid,
  Users,
} from "lucide-react";
import { Globe } from "./globe";
import type { COBEOptions } from "cobe";

const GLOBE_CONFIG: COBEOptions = {
  width: 900,
  height: 900,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0.15,
  theta: 0.22,
  dark: 1,
  diffuse: 1.15,
  mapSamples: 22000,
  mapBrightness: 8,
  baseColor: [1, 0.34, 0.07],
  markerColor: [1, 1, 1],
  glowColor: [1, 0.34, 0.07],
  markers: [
    { location: [20.5937, 78.9629], size: 0.04 },
    { location: [51.5074, -0.1278], size: 0.03 },
    { location: [40.7128, -74.006], size: 0.03 },
    { location: [1.3521, 103.8198], size: 0.03 },
  ],
};

const LIGHT_GLOBE_CONFIG: COBEOptions = {
  width: 900,
  height: 900,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0.15,
  theta: 0.22,
  dark: 0,
  diffuse: 1.2,
  mapSamples: 22000,
  mapBrightness: 1.5,
  baseColor: [0.8, 0.8, 0.82],
  markerColor: [1, 0.34, 0.07],
  glowColor: [1, 1, 1],
  markers: [
    { location: [20.5937, 78.9629], size: 0.04 },
    { location: [51.5074, -0.1278], size: 0.03 },
    { location: [40.7128, -74.006], size: 0.03 },
    { location: [1.3521, 103.8198], size: 0.03 },
  ],
};

type Marker = {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  color: string;
  cardClass: string;
  width: string;
  lx: number;
  ly: number;
  ax: number;
  ay: number;
  orangeFlow?: boolean;
  mirrorGradient?: boolean;
};

const MARKERS: Marker[] = [
  {
    id: "founded",
    title: "2013",
    subtitle: "Founded",
    icon: Calendar,
    color: "#FF5812",
    cardClass: "left-1/2 top-0 -translate-x-1/2",
    width: "w-[min(30%,8.25rem)]",
    lx: 50,
    ly: 9,
    ax: 50,
    ay: 22,
  },
  {
    id: "experience",
    title: "13+",
    subtitle: "Years engineering experience",
    icon: Users,
    color: "#FF5812",
    orangeFlow: true,
    cardClass: "left-0 top-[9%]",
    width: "w-[min(36%,10.25rem)]",
    lx: 18,
    ly: 18,
    ax: 28,
    ay: 33,
  },
  {
    id: "ai",
    title: "AI & Automation",
    icon: Cpu,
    color: "#FF5812",
    cardClass: "right-0 top-[9%]",
    width: "w-[min(34%,9.75rem)]",
    lx: 82,
    ly: 18,
    ax: 72,
    ay: 33,
    mirrorGradient: true,
  },
  {
    id: "modern",
    title: "Modern Engineering",
    icon: Code2,
    color: "#FF5812",
    cardClass: "bottom-[13%] left-0",
    width: "w-[min(36%,10.25rem)]",
    lx: 18,
    ly: 80,
    ax: 28,
    ay: 67,
  },
  {
    id: "microsoft",
    title: "Microsoft & Data",
    icon: LayoutGrid,
    color: "#FF5812",
    orangeFlow: true,
    cardClass: "bottom-[13%] right-0",
    width: "w-[min(34%,9.75rem)]",
    lx: 82,
    ly: 80,
    ax: 72,
    ay: 67,
    mirrorGradient: true,
  },
  {
    id: "delivery",
    title: "Global Delivery",
    subtitle: "Offshore engineering teams across the globe",
    icon: Globe2,
    color: "#FF5812",
    cardClass: "bottom-0 left-1/2 -translate-x-1/2",
    width: "w-[min(46%,13rem)]",
    lx: 50,
    ly: 91,
    ax: 50,
    ay: 78,
    mirrorGradient: true,
  },
];

function getMarkerColor(id: string, isLight: boolean, defaultColor: string) {
  if (!isLight) return defaultColor;
  switch (id) {
    case "founded":
    case "delivery":
      return "#FF5812";
    case "ai":
      return "#7C3AED";
    case "modern":
      return "#0D9488";
    default:
      return "#1852FF";
  }
}

function MarkerCard({ marker, isLight }: { marker: Marker; isLight: boolean }) {
  const Icon = marker.icon;
  const titleClass = marker.orangeFlow
    ? "about-orange-flow bg-[linear-gradient(90deg,#E64C00,#FF5812,#FF8A4A,#FF5812,#E64C00)] bg-[length:200%_100%] bg-clip-text text-transparent"
    : "";
  
  const mColor = getMarkerColor(marker.id, isLight, marker.color);

  const gradientClass = isLight
    ? "bg-white/95 border-zinc-200/80 shadow-[0_8px_30px_rgba(10,10,26,0.06)] hover:border-[#FF5812]/40 hover:shadow-[0_16px_30px_-10px_rgba(255,88,18,0.12)]"
    : marker.mirrorGradient
    ? "bg-gradient-to-bl from-[#FF5812]/15 via-[#0A0A0A]/90 to-[#0A0A0A]/95 hover:from-[#FF5812]/20 hover:via-[#0E0E0E]/95 hover:to-[#0E0E0E]/98 border-[#FF5812]/20 hover:border-[#FF5812]/45 hover:shadow-[0_20px_35px_-12px_rgba(255,88,18,0.24)]"
    : "bg-gradient-to-br from-[#FF5812]/15 via-[#0A0A0A]/90 to-[#0A0A0A]/95 hover:from-[#FF5812]/20 hover:via-[#0E0E0E]/95 hover:to-[#0E0E0E]/98 border-[#FF5812]/20 hover:border-[#FF5812]/45 hover:shadow-[0_20px_35px_-12px_rgba(255,88,18,0.24)]";

  return (
    <div
      className={`absolute z-20 flex items-start gap-2.5 rounded-xl border ${gradientClass} px-3 py-2 sm:px-3 sm:py-2.5 backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.03] ${marker.width} ${marker.cardClass}`}
    >
      <span
        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg shadow-sm border ${isLight ? "border-zinc-200 bg-orange-50/50" : "border-white/10"} ${marker.orangeFlow && !isLight ? "about-orange-icon" : ""}`}
        style={{ 
          backgroundColor: isLight ? `${mColor}08` : `${mColor}12`, 
          color: mColor 
        }}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0 pt-px">
        <span
          className={`block text-[11.5px] sm:text-[12px] font-bold leading-snug tracking-tight ${marker.orangeFlow && !isLight ? titleClass : ""}`}
          style={marker.orangeFlow && !isLight ? undefined : { color: mColor }}
        >
          {marker.title}
        </span>
        {marker.subtitle && (
          <span className={`mt-0.5 block text-[9.5px] sm:text-[10px] leading-snug ${isLight ? "text-zinc-500 font-medium" : "text-white/60"}`}>
            {marker.subtitle}
          </span>
        )}
      </span>
    </div>
  );
}

function GlobeSphere({ isLight }: { isLight: boolean }) {
  return (
    <div className="absolute left-1/2 top-1/2 w-[58%] -translate-x-1/2 -translate-y-1/2 xl:w-[62%]">
      <div className="relative aspect-square">
        <div
          aria-hidden
          className="absolute -inset-[18%] rounded-full border border-black/[0.04]"
        />
        <div
          aria-hidden
          className={`absolute -inset-[9%] rounded-full border ${isLight ? "border-zinc-200/50" : "border-[#FF5812]/10"}`}
        />
        <div className={`absolute inset-0 overflow-hidden rounded-full ${isLight ? "bg-gradient-to-br from-white to-zinc-50 shadow-[inset_0_8px_28px_rgba(255,88,18,0.06),0_24px_48px_-20px_rgba(10,10,26,0.1)] border border-zinc-200/50" : "bg-gradient-to-br from-[#0F0F0F] to-[#020202] shadow-[inset_0_8px_28px_rgba(255,88,18,0.12),0_24px_48px_-20px_rgba(0,0,0,0.45)] border border-[#FF5812]/15"}`}>
          <div
            aria-hidden
            className={`absolute inset-[8%] rounded-full ${isLight ? "opacity-[0.08]" : "opacity-40"}`}
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, transparent 66%, #FF5812 67%), radial-gradient(#0a0a1a 1px, transparent 1.2px)",
              backgroundSize: "100% 100%, 7px 7px",
            }}
          />
          <Globe config={isLight ? LIGHT_GLOBE_CONFIG : GLOBE_CONFIG} className="!max-w-none" />
        </div>
      </div>
    </div>
  );
}

export default function AboutGlobeMarkers({ variant = "dark" }: { variant?: "light" | "dark" }) {
  const isLight = variant === "light";

  return (
    <div className="w-full">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-ring {
          0% { transform: translate(-50%, -50%) scale(0.65); opacity: 0.9; }
          100% { transform: translate(-50%, -50%) scale(1.8); opacity: 0; }
        }
        .dot-pulse {
          animation: pulse-ring 2.2s cubic-bezier(0.215, 0.610, 0.355, 1) infinite;
        }
      `}} />
      <div className="relative ml-auto hidden aspect-square w-full max-w-[520px] overflow-visible lg:block xl:max-w-[580px]">
        <GlobeSphere isLight={isLight} />

        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          fill="none"
          aria-hidden
        >
          {MARKERS.map((marker) => {
            const mColor = getMarkerColor(marker.id, isLight, marker.color);
            return (
              <line
                key={marker.id}
                x1={marker.lx}
                y1={marker.ly}
                x2={marker.ax}
                y2={marker.ay}
                stroke={mColor}
                strokeWidth="0.28"
                strokeDasharray="1.35 1.1"
                strokeLinecap="round"
              />
            );
          })}
        </svg>

        {MARKERS.map((marker) => {
          const mColor = getMarkerColor(marker.id, isLight, marker.color);
          return (
            <React.Fragment key={`${marker.id}-dots`}>
              {/* Pulsing ring behind the dot */}
              <span
                className="dot-pulse absolute z-0 h-4 w-4 rounded-full opacity-60"
                style={{
                  left: `${marker.ax}%`,
                  top: `${marker.ay}%`,
                  backgroundColor: mColor,
                }}
              />
              {/* The main solid dot */}
              <span
                className="absolute z-10 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full ring-[3px] ring-white shadow-sm"
                style={{
                  left: `${marker.ax}%`,
                  top: `${marker.ay}%`,
                  backgroundColor: mColor,
                }}
              />
            </React.Fragment>
          );
        })}

        {MARKERS.map((marker) => (
          <MarkerCard key={marker.id} marker={marker} isLight={isLight} />
        ))}
      </div>

      <div className="lg:hidden">
        <div className="relative mx-auto aspect-square w-[78%] max-w-[320px] sm:max-w-[360px]">
          <div
            aria-hidden
            className="absolute -inset-[14%] rounded-full border border-black/[0.04]"
          />
          <div className={`absolute inset-0 overflow-hidden rounded-full ${isLight ? "bg-gradient-to-br from-white to-zinc-50 shadow-[inset_0_8px_24px_rgba(255,88,18,0.06),0_16px_36px_-18px_rgba(10,10,26,0.15)] border border-zinc-200/50" : "bg-gradient-to-br from-[#0F0F0F] to-[#020202] shadow-[inset_0_8px_24px_rgba(255,88,18,0.12),0_16px_36px_-18px_rgba(0,0,0,0.35)] border border-[#FF5812]/15"}`}>
            <Globe config={isLight ? LIGHT_GLOBE_CONFIG : GLOBE_CONFIG} className="!max-w-none" />
          </div>
        </div>
        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {MARKERS.map((marker) => {
            const Icon = marker.icon;
            const titleClass = marker.orangeFlow
              ? "about-orange-flow bg-[linear-gradient(90deg,#E64C00,#FF5812,#FF8A4A,#FF5812,#E64C00)] bg-[length:200%_100%] bg-clip-text text-transparent"
              : "";
            
            const mColor = getMarkerColor(marker.id, isLight, marker.color);

            const mobileGradientClass = isLight
              ? "bg-white border-zinc-200/80 shadow-[0_4px_16px_rgba(10,10,26,0.05)] hover:border-[#FF5812]/40"
              : marker.mirrorGradient
              ? "bg-gradient-to-bl from-[#FF5812]/15 via-[#0A0A0A]/90 to-[#0A0A0A]/95 hover:from-[#FF5812]/20 hover:via-[#0E0E0E]/95 hover:to-[#0E0E0E]/98"
              : "bg-gradient-to-br from-[#FF5812]/15 via-[#0A0A0A]/90 to-[#0A0A0A]/95 hover:from-[#FF5812]/20 hover:via-[#0E0E0E]/95 hover:to-[#0E0E0E]/98";

            return (
              <li
                key={marker.id}
                className={`flex items-start gap-2.5 rounded-xl border ${isLight ? "border-zinc-200/85" : "border-[#FF5812]/20"} ${mobileGradientClass} px-3 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.2)] transition-all duration-200 hover:shadow-[0_12px_28px_rgba(255,88,18,0.18)]`}
              >
                <span
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg shadow-sm border ${isLight ? "border-zinc-200 bg-orange-50/50" : "border-white/10"} ${marker.orangeFlow && !isLight ? "about-orange-icon" : ""}`}
                  style={{
                    backgroundColor: isLight ? `${mColor}08` : `${mColor}12`,
                    color: mColor,
                  }}
                >
                  <Icon size={14} />
                </span>
                <span className="min-w-0">
                  <span
                    className={`block text-[11.5px] font-bold leading-snug tracking-tight whitespace-normal break-words ${marker.orangeFlow && !isLight ? titleClass : ""}`}
                    style={marker.orangeFlow && !isLight ? undefined : { color: mColor }}
                  >
                    {marker.title}
                  </span>
                  {marker.subtitle && (
                    <span className={`mt-0.5 block text-[9.5px] leading-snug whitespace-normal break-words ${isLight ? "text-zinc-500 font-medium" : "text-white/60"}`}>
                      {marker.subtitle}
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

