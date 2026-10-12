/* eslint-disable softree-design/no-untokenized-design-literals */
"use client";

import React, { type CSSProperties } from "react";

export type FluidFieldBackgroundProps = {
  mode?: "dark" | "light";
  hue?: number;
  saturation?: number;
  brightness?: number;
  className?: string;
  style?: CSSProperties;
};

export function FluidFieldBackground({
  className = "",
  style,
}: FluidFieldBackgroundProps) {
  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-[#050508] pointer-events-none select-none ${className}`}
      style={style}
      aria-hidden="true"
    >
      {/* Ambient Animated Fluid Gradient Orbs with GPU compositing */}
      <div
        className="absolute -top-[25%] -left-[20%] w-[120%] h-[120%] rounded-full opacity-60 filter blur-[60px] animate-[pulse_8s_ease-in-out_infinite] bg-[radial-gradient(circle_at_30%_30%,#FF5812_0%,#E31E24_45%,transparent_75%)] transform-gpu will-change-transform"
      />
      <div
        className="absolute -bottom-[20%] -right-[15%] w-[100%] h-[100%] rounded-full opacity-45 filter blur-[50px] animate-[pulse_10s_ease-in-out_infinite_reverse] bg-[radial-gradient(circle_at_70%_70%,#FF7A30_0%,#B8181D_50%,transparent_70%)] transform-gpu will-change-transform"
      />
      <div
        className="absolute top-[35%] left-[20%] w-[60%] h-[60%] rounded-full opacity-35 filter blur-[40px] bg-[radial-gradient(circle,#FF4500_0%,transparent_70%)] transform-gpu"
      />
      {/* Blueprint Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.14] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 12px)",
        }}
      />
      {/* SVG Grain/Noise Overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
export default FluidFieldBackground;
