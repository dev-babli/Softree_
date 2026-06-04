"use client";

import Image from "next/image";
import { useState } from "react";
import Grainient from "@/components/homepage-light/Grainient";
import { getTestimonialGrainientPreset } from "./testimonial-grainient.presets";
import type { TestimonialSlide } from "./testimonial-slider.types";

export function TestimonialBrandPanel({
  slide,
  theme = "light",
}: {
  slide: TestimonialSlide;
  theme?: "light" | "dark";
}) {
  const [logoFailed, setLogoFailed] = useState(false);
  const companyLabel = slide.company ?? slide.logoAlt ?? "Client";
  const showLogo = Boolean(slide.logo) && !logoFailed;
  const isLight = theme === "light";
  const grainient = getTestimonialGrainientPreset(slide.id, isLight ? "light" : "dark");

  return (
    <div
      className={
        isLight
          ? "relative h-full min-h-[200px] w-full overflow-hidden rounded-xl border border-zinc-200/80 bg-[#FAFAF9] md:min-h-full md:rounded-2xl"
          : "absolute inset-0 bg-[#0a0a0a]"
      }
    >
      <Grainient
        className="absolute inset-0"
        color1={grainient.color1}
        color2={grainient.color2}
        color3={grainient.color3}
        timeSpeed={grainient.timeSpeed}
        warpStrength={grainient.warpStrength}
        grainAmount={grainient.grainAmount}
        grainAnimated={!isLight}
        contrast={grainient.contrast}
        saturation={grainient.saturation}
        zoom={grainient.zoom}
        warpFrequency={isLight ? 3.4 : 4.2}
        warpSpeed={isLight ? 0.75 : 1.05}
        blendSoftness={isLight ? 0.14 : 0.1}
      />

      {isLight ? (
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.5)_0%,transparent_65%)]"
          aria-hidden
        />
      ) : (
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 72% 58% at 50% 48%, transparent 42%, rgba(0,0,0,0.28) 100%)",
          }}
        />
      )}

      <div className="absolute inset-0 z-[2] flex items-center justify-center p-6 md:p-8">
        {showLogo ? (
          <div
            className={
              isLight
                ? "flex max-w-[85%] items-center justify-center rounded-xl bg-white/80 px-6 py-5 shadow-[0_8px_30px_-8px_rgba(15,23,42,0.12)] ring-1 ring-zinc-200/60 backdrop-blur-sm"
                : ""
            }
          >
            <Image
              src={slide.logo!}
              alt={slide.logoAlt ?? companyLabel}
              width={200}
              height={64}
              unoptimized
              className={
                isLight
                  ? "h-9 w-auto max-w-[160px] object-contain md:h-11 md:max-w-[190px]"
                  : "h-11 w-auto max-w-[200px] object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)] md:h-14 md:max-w-[220px]"
              }
              onError={() => setLogoFailed(true)}
            />
          </div>
        ) : (
          <p
            className={
              isLight
                ? "text-center text-base font-semibold tracking-tight text-zinc-800"
                : "text-center text-lg font-semibold tracking-tight text-white drop-shadow-md md:text-xl"
            }
          >
            {companyLabel}
          </p>
        )}
      </div>
    </div>
  );
}
