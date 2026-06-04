"use client";

import Image from "next/image";
import { useState } from "react";
import { PARTNER_LOGOS } from "@/components/qc/homepage-light/AboutClientLogos";

const SURFACE = "#F3F0EE";

function LogoCard({ name, src }: { name: string; src: string }) {
  const [err, setErr] = useState(false);
  return (
    <div className="flex h-[88px] w-[200px] shrink-0 items-center justify-center rounded-2xl border border-[#0a0a1a]/[0.07] bg-white px-6 shadow-[0_2px_12px_-6px_rgba(10,10,26,0.08)] sm:w-[220px]">
      {err ? (
        <span className="text-[11px] font-semibold text-[#0a0a1a]/55">{name}</span>
      ) : (
        <Image
          src={src}
          alt=""
          width={150}
          height={44}
          className="max-h-[40px] w-auto object-contain opacity-[0.85]"
          onError={() => setErr(true)}
          unoptimized
        />
      )}
    </div>
  );
}

/** CSS marquee (AvooraHero pattern) — partner logos, not service cards. */
export function PartnerMarqueeLane() {
  const track = [...PARTNER_LOGOS, ...PARTNER_LOGOS];

  return (
    <div className="relative overflow-hidden py-8 md:py-10">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-24 md:w-32"
        style={{ background: `linear-gradient(90deg, ${SURFACE} 0%, transparent 100%)` }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-24 md:w-32"
        style={{ background: `linear-gradient(270deg, ${SURFACE} 0%, transparent 100%)` }}
      />

      <div className="post-hero-partner-marquee flex min-w-max items-center gap-5 will-change-transform sm:gap-6">
        {[0, 1].map((set) => (
          <div
            key={set}
            aria-hidden={set === 1}
            className="flex shrink-0 items-center gap-5 sm:gap-6"
          >
            {track.map((p, i) => (
              <LogoCard key={`${set}-${p.name}-${i}`} name={p.name} src={p.src} />
            ))}
          </div>
        ))}
      </div>

      <style jsx>{`
        .post-hero-partner-marquee {
          animation: post-hero-partner-marquee-x 48s linear infinite;
        }
        @keyframes post-hero-partner-marquee-x {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .post-hero-partner-marquee {
            animation: none;
            flex-wrap: wrap;
            justify-content: center;
            min-width: 0;
            gap: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}
