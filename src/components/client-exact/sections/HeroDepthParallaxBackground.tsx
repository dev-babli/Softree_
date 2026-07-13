"use client";

import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import CityDepthParallax, { HERO_DEPTH_ASPECT } from "@/components/hero/CityDepthParallax";
import { HeroCanvasErrorBoundary } from "@/components/hero/HeroCanvasErrorBoundary";

const COLOR_SRC = "/images/hero/base1.png";
const DEPTH_SRC = "/images/hero/depth1.png";

/** Matches the white studio backdrop in base1.png */
const HERO_BG = "#f5f5f5";

const FALLBACK_IMAGE_CLASS =
  "object-cover object-[center_38%] origin-center scale-[1.08]";

function StaticFallback() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ backgroundColor: HERO_BG }} aria-hidden>
      <Image
        src={COLOR_SRC}
        alt=""
        fill
        priority
        sizes="100vw"
        className={FALLBACK_IMAGE_CLASS}
        aria-hidden
      />
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ backgroundColor: HERO_BG }} aria-hidden>
      <Image
        src={COLOR_SRC}
        alt=""
        fill
        priority
        sizes="100vw"
        className={`${FALLBACK_IMAGE_CLASS} opacity-40 blur-sm`}
        aria-hidden
      />
    </div>
  );
}

function MountedDepthParallax() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <LoadingFallback />;

  return (
    <CityDepthParallax
      colorSrc={COLOR_SRC}
      depthSrc={DEPTH_SRC}
      strength={0.042}
      aspectRatio={HERO_DEPTH_ASPECT}
      fit="contain"
      zoom={1.18}
      lift={0.015}
      className="cx-hero-depth-parallax pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

/**
 * Shader depth-map parallax for the client hero background.
 * Preserves existing hero content — background layer only.
 */
export function HeroDepthParallaxBackground() {
  return (
    <div
      className="cx-hero-depth-root pointer-events-none absolute inset-0 overflow-hidden"
      style={{ backgroundColor: HERO_BG }}
      aria-hidden
    >
      <HeroCanvasErrorBoundary fallback={<StaticFallback />}>
        <Suspense fallback={<LoadingFallback />}>
          <MountedDepthParallax />
        </Suspense>
      </HeroCanvasErrorBoundary>
      <div className="cx-hero-cinema-atmosphere pointer-events-none absolute inset-0" aria-hidden />
    </div>
  );
}
