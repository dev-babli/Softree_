"use client";

import React, { useEffect, useRef, useState } from 'react';
import { cn } from "@/lib/utils";
import { FlowButton } from "@/components/ui/flow-button";
import TrustStrip from "@/components/sections/TrustStrip";

const randomColors = (count: number) => {
  return new Array(count)
    .fill(0)
    .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
};

interface TubesBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  enableClickInteraction?: boolean;
}

export function TubesBackground({
  children,
  className,
  enableClickInteraction = true
}: TubesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const tubesRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;
    let cleanup: (() => void) | undefined;

    const initTubes = async () => {
      if (!canvasRef.current) return;

      try {
        // We use the specific build from the CDN as it contains the exact effect requested
        // Using native dynamic import which works in modern browsers
        // Hide from Webpack using Function constructor
        const module = await (new Function(`return import('https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js')`))();
        const TubesCursor = module.default;

        if (!mounted) return;

        const app = TubesCursor(canvasRef.current, {
          tubes: {
            colors: ["#f967fb", "#53bc28", "#6958d5"],
            lights: {
              intensity: 200,
              colors: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"]
            }
          }
        });

        tubesRef.current = app;
        setIsLoaded(true);

        const handleResize = () => {
          // The library might handle it, but typically we ensure canvas matches container
        };

        window.addEventListener('resize', handleResize);

        cleanup = () => {
          window.removeEventListener('resize', handleResize);
          if (app && typeof app.destroy === 'function') {
            app.destroy();
          }
        };

      } catch (error) {
        console.error("Failed to load TubesCursor:", error);
      }
    };

    initTubes();

    return () => {
      mounted = false;
      if (cleanup) cleanup();
    };
  }, []);

  const handleClick = () => {
    if (!enableClickInteraction || !tubesRef.current) return;

    const colors = randomColors(3);
    const lightsColors = randomColors(4);

    if (tubesRef.current.tubes && typeof tubesRef.current.tubes.setColors === 'function') {
      tubesRef.current.tubes.setColors(colors);
      tubesRef.current.tubes.setLightsColors(lightsColors);
    }
  };

  return (
    <div
      className={cn("relative w-full h-full min-h-[400px] overflow-hidden bg-background", className)}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{ touchAction: 'none' }}
      />

      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full pointer-events-none">
        {children}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <div className="w-full min-h-screen font-sans relative bg-black">
      <TubesBackground className="bg-black">
        <div className="flex flex-col w-full min-h-screen z-10 pt-24 md:pt-28 lg:pt-32 pb-6 sm:pb-10 px-4 sm:px-6">
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 md:space-y-5 pointer-events-auto cursor-default max-w-5xl mx-auto w-full pb-10">
            <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-1.5 md:py-2 rounded-full border border-[#ea580c]/30 bg-[#ea580c]/10 backdrop-blur-md">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#ea580c] shadow-[0_0_8px_2px_rgba(234,88,12,0.6)] animate-pulse"></div>
              <span className="text-xs md:text-sm font-bold tracking-[0.15em] md:tracking-[0.2em] text-[#ea580c] uppercase">
                Healthcare Testing Services
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white drop-shadow-[0_0_20px_rgba(0,0,0,1)] select-none leading-tight">
              Your Offshore Healthcare <br className="hidden md:block" />
              <span className="text-[#ea580c] md:whitespace-nowrap">Software Testing & QA Partner</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto drop-shadow-lg font-medium text-balance px-2 sm:px-0">
              Ensure the quality, security, performance, and reliability of healthcare applications with an offshore testing team experienced in healthcare software, test automation, interoperability, compliance, and digital health platforms.
            </p>
            <div className="pt-2 md:pt-4">
              <FlowButton
                href="/contact"
                text="Talk to Our Healthcare Testing Team"
                variant="orange-filled"
                className="shadow-lg shadow-[#ea580c]/30"
              />
            </div>
          </div>

          {/* Bottom Trust Bar */}
          <div className="w-full z-20 pointer-events-auto shrink-0 mt-auto">
            <TrustStrip theme="dark" />
          </div>

        </div>
      </TubesBackground>
    </div>
  );
}
