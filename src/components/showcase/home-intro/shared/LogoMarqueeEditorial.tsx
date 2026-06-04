"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { EASE_T } from "@/lib/motion";
import { PARTNER_LOGOS, type PartnerLogo } from "./partners";
import { HOME_INTRO } from "./copy";

const CSS = `
  @keyframes hi-left {
    0% { transform: translate3d(0,0,0); }
    100% { transform: translate3d(-50%,0,0); }
  }
  @keyframes hi-right {
    0% { transform: translate3d(-50%,0,0); }
    100% { transform: translate3d(0,0,0); }
  }
  .hi-track-left {
    display: flex;
    width: max-content;
    animation: hi-left 46s linear infinite;
  }
  .hi-track-right {
    display: flex;
    width: max-content;
    animation: hi-right 52s linear infinite;
  }
  .hi-marquee:hover .hi-track-left,
  .hi-marquee:hover .hi-track-right { animation-play-state: paused; }
  @media (prefers-reduced-motion: reduce) {
    .hi-track-left, .hi-track-right { animation: none !important; }
  }
`;

function PartnerTile({ partner }: { partner: PartnerLogo }) {
  const [error, setError] = useState(false);
  return (
    <div
      className="group relative flex h-[88px] w-[220px] shrink-0 items-center justify-center rounded-xl border bg-white/95 px-6 py-4 backdrop-blur-md transition-[transform,border-color,box-shadow] duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1"
      style={
        {
          borderColor: `${partner.accent}28`,
          ["--partner-accent" as string]: partner.accent,
        } as React.CSSProperties
      }
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl opacity-[0.07] blur-2xl transition-opacity duration-[450ms] group-hover:opacity-[0.2]"
        style={{ background: `radial-gradient(circle, ${partner.accent}, transparent 70%)` }}
      />
      {error ? (
        <span className="relative z-10 text-xs font-semibold tracking-tight text-[#0a0a1a]/70">
          {partner.name}
        </span>
      ) : (
        <Image
          src={partner.src}
          alt=""
          width={160}
          height={48}
          className="relative z-10 max-h-[44px] w-auto object-contain opacity-[0.9] transition-[opacity,transform] duration-[450ms] group-hover:scale-[1.03] group-hover:opacity-100"
          onError={() => setError(true)}
          unoptimized
        />
      )}
    </div>
  );
}

export function LogoMarqueeEditorial({
  showIntro = true,
  bleed = true,
  theme = "light",
}: {
  showIntro?: boolean;
  bleed?: boolean;
  theme?: "light" | "dark";
}) {
  const fade = theme === "dark" ? "#0a0a1a" : "#F3F0EE";
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-6%" });
  const left = [...PARTNER_LOGOS, ...PARTNER_LOGOS];
  const right = [...PARTNER_LOGOS].reverse().concat([...PARTNER_LOGOS].reverse());

  return (
    <div
      ref={ref}
      className={`hi-marquee relative ${bleed ? "-mx-6 lg:-mx-12" : ""}`}
    >
      <style>{CSS}</style>
      {showIntro && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_T.silk }}
          className="mb-10 px-6 lg:mb-12 lg:px-12"
        >
          <span
            className="inline-flex items-center gap-2 rounded-full border border-[#0a0a1a]/8 bg-white/80 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0a0a1a]/55 shadow-[0_2px_8px_rgba(10,10,26,0.03)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5812]" />
            {HOME_INTRO.marquee.badge}
          </span>
          <p className="mt-5 max-w-[520px] text-pretty text-[clamp(20px,2.8vw,28px)] font-semibold leading-[1.15] tracking-[-0.03em] text-[#0a0a1a]">
            {HOME_INTRO.marquee.headline}
          </p>
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.65, delay: 0.08, ease: EASE_T.silk }}
        className="relative flex flex-col gap-5 py-2"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 sm:w-32 lg:w-40"
          style={{ background: `linear-gradient(to right, ${fade}, transparent)` }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 sm:w-32 lg:w-40"
          style={{ background: `linear-gradient(to left, ${fade}, transparent)` }}
        />
        <div className="overflow-hidden">
          <div className="hi-track-left gap-5 pr-5">
            {left.map((p, i) => (
              <PartnerTile key={`l-${p.name}-${i}`} partner={p} />
            ))}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="hi-track-right gap-5 pr-5">
            {right.map((p, i) => (
              <PartnerTile key={`r-${p.name}-${i}`} partner={p} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
