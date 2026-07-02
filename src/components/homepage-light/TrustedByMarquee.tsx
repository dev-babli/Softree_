"use client";

import React from "react";

import Image from "next/image";

const logos = [
  { name: "Microsoft", src: "/images/logo/microsoft.png" },
  { name: "Google", src: "/images/logo/google.png" },
  { name: "GO ERP", src: "/images/logo/goerp1.jpg" },
  { name: "Nuvento", src: "/images/logo/nuvento.jpg" },
  { name: "Kwiz", src: "/images/logo/kwiz.png" },
  { name: "Jonians", src: "/images/logo/jonians.jpg" },
  { name: "Export Control", src: "/images/logo/ecg.png" },
  { name: "SP Marketplace", src: "/images/logo/sp-marketplace.png" },
  { name: "Bosch", src: "/images/logo/bosch.png" },
  { name: "Emscale", src: "/images/logo/emscale_logo.png" },
  { name: "Link Innovation", src: "/images/logo/link-innovation.png" },
  { name: "Intellectt", src: "/images/logo/Intellectt_logo.png" },
  { name: "Deloitte", src: "/images/logo/deloitte.png" },
  { name: "Bayer", src: "/images/logo/bayer.svg" },
];

export function TrustedByMarquee() {
  const doubled = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="w-full bg-[var(--legacy-f6f6f6)] py-10 sm:py-14 md:py-16 overflow-hidden">
      {/* Tag row */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 px-4">
        <div className="h-px flex-1 max-w-[120px] bg-black/10" />
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="inline-flex items-center rounded-full bg-[var(--legacy-eaeaea)] px-3 py-1 sm:px-4 sm:py-1.5">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[var(--legacy-111)]">Trusted by</span>
          </span>
          <span className="inline-flex items-center rounded-full bg-[#FF5812] px-3 py-1 sm:px-4 sm:py-1.5">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white">Industry Giants</span>
          </span>
        </div>
        <div className="h-px flex-1 max-w-[120px] bg-black/10" />
      </div>

      {/* Marquee */}
      <div className="relative w-full overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-24 bg-linear-to-r from-[var(--legacy-f6f6f6)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-24 bg-linear-to-l from-[var(--legacy-f6f6f6)] to-transparent" />

        <div className="flex w-max animate-marquee items-center gap-10 sm:gap-14 md:gap-16">
          {doubled.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex h-7 sm:h-8 md:h-9 w-auto shrink-0 items-center justify-center opacity-60 grayscale transition-all duration-500 hover:scale-110 hover:opacity-100 hover:grayscale-0"
            >
              <Image
                src={logo.src}
                alt={`${logo.name} logo`}
                width={140}
                height={48}
                className="h-full w-auto object-contain"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustedByMarquee;
