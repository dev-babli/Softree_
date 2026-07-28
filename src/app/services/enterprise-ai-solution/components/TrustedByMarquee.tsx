"use client";

import Image from "next/image";

const logos = [
  { name: "GO ERP", src: "/images/enterprise-ai-solution/images/logo/goerp1.jpg", scale: 1.55 },
  { name: "Nuvento", src: "/images/enterprise-ai-solution/images/logo/nuvento.jpg", scale: 1.15 },
  { name: "Kwiz", src: "/images/enterprise-ai-solution/images/logo/kwiz.png", scale: 0.9 },
  { name: "Jonians", src: "/images/enterprise-ai-solution/images/logo/jonians.jpg", scale: 1.7 },
  { name: "Export Control", src: "/images/enterprise-ai-solution/images/logo/ecg.png", scale: 1.4 },
  { name: "SP Marketplace", src: "/images/enterprise-ai-solution/images/logo/sp-marketplace.png", scale: 1.05 },
  { name: "Bosch", src: "/images/enterprise-ai-solution/images/logo/bosch.png", scale: 0.9 },
  { name: "Emscale", src: "/images/enterprise-ai-solution/images/logo/emscale_logo.png", scale: 0.82 },
  { name: "Link Innovation", src: "/images/enterprise-ai-solution/images/logo/link-innovation.png", scale: 1 },
  { name: "Intellectt", src: "/images/enterprise-ai-solution/images/logo/Intellectt_logo.png", scale: 1.35 },
];

function BrandLogo({ logo }: { logo: (typeof logos)[number] }) {
  return (
    <Image
      src={logo.src}
      alt={`${logo.name} logo`}
      width={140}
      height={48}
      className="h-9 w-[130px] object-contain brightness-90 contrast-125 sm:h-10 sm:w-[145px]"
      style={{ transform: `scale(${logo.scale})` }}
      unoptimized
    />
  );
}

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

        <div className="flex w-max animate-marquee items-center gap-5 sm:gap-7 md:gap-8">
          {doubled.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex h-12 w-[150px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white/50 opacity-90 grayscale transition-all duration-500 hover:scale-105 hover:opacity-100 hover:grayscale-0 sm:h-14 sm:w-[170px]"
            >
              <BrandLogo logo={logo} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustedByMarquee;
