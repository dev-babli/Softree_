import React, { memo } from "react";

/**
 * ModernEngineeringHeroCardVisual
 * 
 * Highly optimized, GPU-accelerated architectural bars visual.
 * - Pure static constants (zero client state / zero re-renders)
 * - CSS transform & opacity hardware acceleration (will-change: transform)
 * - Static drop-shadow filter replaces costly runtime filter animation
 * - Zero JS bundle overhead (pure CSS keyframes)
 */

const NUM_BARS = 13;

// Pre-computed heights so no runtime Math.pow calculations occur on render
const BAR_HEIGHTS = [
  95.0, 83.2, 72.1, 61.8, 52.6, 44.8, 40.0, 44.8, 52.6, 61.8, 72.1, 83.2, 95.0,
];

const BAR_DELAYS = [
  "0s", "0.14s", "0.28s", "0.42s", "0.56s", "0.7s", "0.84s", "0.7s", "0.56s", "0.42s", "0.28s", "0.14s", "0s",
];

const CardGradientBars = memo(function CardGradientBars() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <style>{`
        @keyframes pulsePowerBarFast {
          0% {
            transform: scaleY(0.75) translateZ(0);
            opacity: 0.8;
          }
          50% {
            transform: scaleY(1.08) translateZ(0);
            opacity: 1;
          }
          100% {
            transform: scaleY(0.85) translateZ(0);
            opacity: 0.85;
          }
        }
      `}</style>
      <div
        className="flex h-full items-end w-full"
        style={{
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          contain: "paint layout",
        }}
      >
        {BAR_HEIGHTS.map((height, index) => (
          <div
            key={index}
            className="relative"
            style={{
              flex: "1 0 calc(100% / 13)",
              maxWidth: "calc(100% / 13)",
              height: `${height}%`,
              transformOrigin: "bottom",
              animation: "pulsePowerBarFast 2.8s ease-in-out infinite alternate",
              animationDelay: BAR_DELAYS[index],
              boxSizing: "border-box",
              padding: "0 1px",
              willChange: "transform, opacity",
            }}
          >
            <div
              className="w-full h-full relative"
              style={{
                background:
                  "linear-gradient(to top, rgba(235, 20, 5, 0.98) 0%, rgba(255, 112, 8, 0.90) 35%, rgba(255, 184, 46, 0.65) 68%, rgba(255, 215, 120, 0.28) 85%, transparent 100%)",
                borderLeft: "1px solid rgba(255, 112, 8, 0.4)",
                borderRight: "1px solid rgba(0, 0, 0, 0.5)",
                boxShadow: "inset 0 0 12px rgba(255, 70, 0, 0.4)",
              }}
            >
              {/* Luminous glowing cap line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFC04D] to-transparent shadow-[0_0_12px_rgba(255,184,46,0.95)] opacity-95" />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#070d18] via-[#070d18]/70 to-transparent pointer-events-none z-[2]" />
    </div>
  );
});

export default function ModernEngineeringHeroCardVisual() {
  return (
    <div
      className="relative w-full h-full bg-[#070d18] overflow-hidden select-none"
      style={{
        contain: "paint layout",
        transform: "translateZ(0)",
      }}
    >
      {/* Background Deep Canvas */}
      <div className="absolute inset-0 bg-[#070d18]" />

      {/* Pulsing Animated Gradient Bars in Glowing Orange Shade */}
      <CardGradientBars />

      {/* Ambient Breathing Glow Orb matching globe colors */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 rounded-full bg-[#FF5812]/30 blur-[48px]" />
      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 h-36 w-56 rounded-full bg-[#E51E06]/20 blur-[40px]" />

      {/* Center vignette */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,rgba(7,13,24,0.35)_0%,transparent_100%)]" />
    </div>
  );
}
