"use client";

import Image from "next/image";
import { CAPABILITY_MARQUEE, type MarqueeTile } from "./data";

function Tile({ tile }: { tile: MarqueeTile }) {
  return (
    <div className="group relative h-[200px] w-[188px] shrink-0 overflow-hidden rounded-2xl border border-[#0a0a1a]/[0.08] bg-white shadow-[0_8px_24px_-16px_rgba(10,10,26,0.12)] sm:h-[216px] sm:w-[204px]">
      <Image
        src={tile.image}
        alt=""
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        sizes="204px"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(165deg, rgba(255,255,255,0.15) 0%, rgba(10,10,26,0.55) 100%)",
        }}
      />
      <p className="absolute bottom-3.5 left-3.5 text-[13px] font-semibold tracking-tight text-white">
        {tile.label}
      </p>
    </div>
  );
}

function Strip() {
  return (
    <div className="flex shrink-0 gap-4">
      {CAPABILITY_MARQUEE.map((t) => (
        <Tile key={t.id} tile={t} />
      ))}
    </div>
  );
}

export default function ProjectMarquee() {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-[#0a0a1a]/[0.06] bg-white/80 p-3 backdrop-blur-sm"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
      }}
    >
      <div className="why-us-project-marquee flex w-max gap-4">
        <Strip />
        <div aria-hidden>
          <Strip />
        </div>
      </div>
    </div>
  );
}
