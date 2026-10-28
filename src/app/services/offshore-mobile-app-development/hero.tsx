"use client";

import React from "react";
import { ImageStreamHero, type StreamImage } from "@/components/ui/image-stream-hero";
import TrustStrip from "@/components/sections/TrustStrip";
import { typography } from "@/lib/typography";

const MOBILE_APP_IMAGES: StreamImage[] = [
  {
    src: "https://images.pexels.com/photos/36768423/pexels-photo-36768423.jpeg?auto=compress&dpr=1&h=750&w=1260",
    alt: "Smartphone displaying a modern mobile app interface",
  },
  {
    src: "https://images.pexels.com/photos/5253002/pexels-photo-5253002.jpeg?auto=compress&dpr=1&h=750&w=1260",
    alt: "Smartphone screen showing mobile application icons",
  },
  {
    src: "https://images.pexels.com/photos/16052344/pexels-photo-16052344/free-photo-of-photo-of-a-hand-holding-a-phone-with-a-delivery-app-on-screen.jpeg?auto=compress&dpr=1&h=750&w=1260",
    alt: "Mobile phone displaying a delivery app interface",
  },
  {
    src: "https://images.unsplash.com/photo-1712002641088-9d2d7c7e4d4b?auto=format&fit=crop&w=1260&q=80",
    alt: "Smartphone displaying a modern mobile application interface",
  },
  {
    src: "https://images.pexels.com/photos/6804422/pexels-photo-6804422.jpeg?auto=compress&dpr=1&h=750&w=1260",
    alt: "Smartphone displaying a photo gallery application",
  },
];

export default function MobileAppHero() {
  return (
    <ImageStreamHero
      images={MOBILE_APP_IMAGES}
      cards={9}
      speed={18}
      axis={56}
      className="relative min-h-[700px] sm:min-h-[760px] md:min-h-[840px] lg:min-h-[900px] w-full bg-black text-white flex flex-col justify-between overflow-hidden pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-10"
    >
      {/* Soft gradient restricted to text area so corridor images remain 100% crisp and clear */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[38%] bg-gradient-to-b from-black via-black/85 to-transparent z-[1]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 sm:h-36 bg-gradient-to-t from-black via-black/80 to-transparent z-[1]" />

      {/* Top Text Block - positioned higher up clear of the images */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center flex flex-col items-center justify-center w-full">
        {/* Eyebrow badge */}
        <div className="mb-2.5 sm:mb-3 inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 sm:px-3.5 sm:py-1.5 shadow-[0_0_20px_rgba(255,107,44,0.15)] backdrop-blur-md">
          <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF6B2C] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#FF6B2C]" />
          </span>
          <span className="text-[10px] sm:text-xs font-bold text-[#FF6B2C] uppercase font-mono tracking-wider">
            OFFSHORE MOBILE APP DEVELOPMENT
          </span>
        </div>

        {/* Headline - tailored font-size to prevent collision with corridor */}
        <h1 className="text-balance text-white leading-[1.18] sm:leading-[1.12] text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight max-w-3xl">
          Scale Your Mobile App with An{" "}
          <span className="bg-gradient-to-r from-orange-500 via-[#FF6B2C] to-amber-400 bg-clip-text text-transparent">
            Experienced Offshore Development Team
          </span>
        </h1>

        {/* Subtext */}
        <p className="mt-2.5 sm:mt-3 max-w-xl text-balance text-zinc-300 text-xs sm:text-sm md:text-base leading-relaxed font-normal px-2">
          Build and scale custom iOS, Android, and cross-platform apps with our dedicated offshore engineering team using Flutter and React Native.
        </p>
      </div>

      {/* Bottom TrustStrip Block - positioned comfortably lower */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 w-full mt-8 sm:mt-12 md:mt-16">
        <TrustStrip theme="dark" className="!mt-0" />
      </div>
    </ImageStreamHero>
  );
}



