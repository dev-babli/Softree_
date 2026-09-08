"use client";

import React from "react";

interface BlackHoleHeroSectionProps {
  children?: React.ReactNode;
  focus?: [number, number];
  scrim?: string;
  scrimStrength?: number;
  distance?: number;
  elevation?: number;
  fov?: number;
  glow?: number;
  steps?: number;
  resolution?: number;
}

export function BlackHoleHeroSection({
  children,
}: BlackHoleHeroSectionProps) {
  return (
    <div className="relative w-full h-full min-h-[500px] overflow-hidden bg-black text-white">
      {/* Ambient radial glow representing the blackhole event horizon */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at 75% 50%, rgba(255, 107, 44, 0.25) 0%, rgba(255, 88, 18, 0.08) 35%, transparent 70%)"
        }}
      />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
