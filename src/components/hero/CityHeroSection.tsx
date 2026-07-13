"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import CityDepthParallax, { HERO_DEPTH_ASPECT } from "./CityDepthParallax";
import { HeroCanvasErrorBoundary } from "./HeroCanvasErrorBoundary";

const COLOR_SRC = "/images/hero/base1.png";
const DEPTH_SRC = "/images/hero/depth1.png";

/** Matches the white studio backdrop in base1.png */
const HERO_BG = "#f5f5f5";

function StaticHeroImage({ className }: { className?: string }) {
  return (
    <div className={`relative w-full overflow-hidden ${className ?? ""}`} style={{ backgroundColor: HERO_BG, aspectRatio: `${HERO_DEPTH_ASPECT}` }}>
      <Image
        src={COLOR_SRC}
        alt="City skyline"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_38%] scale-[1.08]"
      />
    </div>
  );
}

function ParallaxLoadingFallback() {
  return (
    <div className="relative w-full overflow-hidden" style={{ backgroundColor: HERO_BG, aspectRatio: `${HERO_DEPTH_ASPECT}` }}>
      <Image
        src={COLOR_SRC}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_38%] scale-[1.08] opacity-40 blur-sm"
        aria-hidden
      />
    </div>
  );
}

function MountedParallax() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <ParallaxLoadingFallback />;

  return (
    <CityDepthParallax
      colorSrc={COLOR_SRC}
      depthSrc={DEPTH_SRC}
      strength={0.042}
      aspectRatio={HERO_DEPTH_ASPECT}
      fit="contain"
      zoom={1.18}
      lift={0.015}
      className="w-full"
    />
  );
}

export default function CityHeroSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: HERO_BG }}>
      <HeroCanvasErrorBoundary fallback={<StaticHeroImage />}>
        <Suspense fallback={<ParallaxLoadingFallback />}>
          <MountedParallax />
        </Suspense>
      </HeroCanvasErrorBoundary>

      <div className="pointer-events-none absolute inset-0 flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-24">
        <div className="max-w-xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]">
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            Build GCC and digital capability in India
          </h1>
          <p className="mt-4 max-w-md text-base text-white/90 sm:text-lg">
            Enterprise GCC setup, digital services, and business advisory — led by 24+ years of leadership.
          </p>
          <Link
            href="#contact"
            className="pointer-events-auto mt-8 inline-flex items-center rounded-full bg-[#ff6044] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#e8553c]"
          >
            Book a free intro
          </Link>
        </div>
      </div>
    </section>
  );
}
