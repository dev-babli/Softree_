"use client";

import Image from "next/image";
import { useState } from "react";
import { PARTNER_LOGOS } from "./partners";

const CSS = `
  @keyframes hi-v-ticker {
    0% { transform: translate3d(0, 0, 0); }
    100% { transform: translate3d(0, -50%, 0); }
  }
  .hi-v-track {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    animation: hi-v-ticker 38s linear infinite;
  }
  .hi-v-root:hover .hi-v-track { animation-play-state: paused; }
  @media (prefers-reduced-motion: reduce) {
    .hi-v-track { animation: none !important; }
  }
`;

export function LogoTickerVertical() {
  const loop = [...PARTNER_LOGOS, ...PARTNER_LOGOS];
  return (
    <div className="hi-v-root relative hidden h-[min(520px,70vh)] w-[88px] shrink-0 overflow-hidden rounded-full border border-[#0a0a1a]/8 bg-white/40 lg:block">
      <style>{CSS}</style>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-[#F3F0EE] to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-[#F3F0EE] to-transparent"
      />
      <div className="hi-v-track py-4">
        {loop.map((p, i) => (
          <VerticalChip key={`${p.name}-${i}`} name={p.name} src={p.src} />
        ))}
      </div>
    </div>
  );
}

function VerticalChip({ name, src }: { name: string; src: string }) {
  const [err, setErr] = useState(false);
  return (
    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#0a0a1a]/6 bg-white shadow-sm">
      {!err ? (
        <Image
          src={src}
          alt=""
          width={40}
          height={40}
          className="max-h-7 max-w-12 object-contain opacity-75"
          onError={() => setErr(true)}
          unoptimized
        />
      ) : (
        <span className="text-[8px] font-bold text-[#0a0a1a]/40">{name.slice(0, 2)}</span>
      )}
    </div>
  );
}
