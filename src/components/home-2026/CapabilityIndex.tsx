"use client";

/**
 * CapabilityIndex — services as an engineer's index. Story-spec §4.
 * - 9 rows, each mapped to a VERIFIED route under src/app/services/.
 * - Hover (pointer:fine): char-shuffle label + cursor-following preview
 *   window (fixed 280×180, overflow-hidden mask, inner image counter-
 *   translates — transform-only, NO animated clip-path).
 * - No scroll animation on rows (instant render). Mobile: plain rows ≥48px.
 * - Thumbnails: verified OG images in public/og/pages/services--*.png.
 */
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

import Reveal from "./lib/Reveal";
import { useCharShuffle } from "./lib/useCharShuffle";
import { prefersReducedMotion } from "@/lib/motion";

type Row = {
  index: string;
  label: string;
  stat: string;
  href: string;
  thumb: string;
};

// Routes verified against src/app/services/*/page.tsx (2026-07-04).
const ROWS: Row[] = [
  { index: "01", label: "OFFSHORE AI DEVELOPMENT", stat: "Copilots + agents in production", href: "/services/offshore-ai-development", thumb: "/og/pages/services--offshore-ai-development.png" },
  { index: "02", label: "GENERATIVE AI SYSTEMS", stat: "RAG, LLM pipelines, evals", href: "/services/generative-ai", thumb: "/og/pages/services--offshore-generative-ai-development.png" },
  { index: "03", label: "WEB & PRODUCT ENGINEERING", stat: "Next.js / .NET, end-to-end", href: "/services/offshore-web-app-development", thumb: "/og/pages/services--offshore-web-app-development.png" },
  { index: "04", label: "MOBILE APP DEVELOPMENT", stat: "iOS · Android · cross-platform", href: "/services/offshore-mobile-app-development", thumb: "/og/pages/services--offshore-mobile-app-development.png" },
  { index: "05", label: "DATA & ANALYTICS", stat: "Power BI to decision systems", href: "/services/offshore-data-analytics", thumb: "/og/pages/services--offshore-data-analytics.png" },
  { index: "06", label: "POWER PLATFORM", stat: "Apps + automation at scale", href: "/services/offshore-power-platform-development", thumb: "/og/pages/services--offshore-power-platform-development.png" },
  { index: "07", label: "SHAREPOINT & M365", stat: "Intranets, SPFx, governance", href: "/services/offshore-sharepoint-development", thumb: "/og/pages/services--offshore-sharepoint-development.png" },
  { index: "08", label: "MICROSOFT FABRIC", stat: "Lakehouse + enterprise BI", href: "/services/offshore-microsoft-fabric", thumb: "/og/pages/services--offshore-microsoft-fabric.png" },
  { index: "09", label: "LEGACY MODERNIZATION", stat: "Old stack → shipping stack", href: "/services/legacy-application-modernization", thumb: "/og/pages/services--legacy-application-modernization.png" },
];

const TECH_LINE = "TS / NEXT / REACT NATIVE / .NET / AZURE / PYTHON / POWER PLATFORM / FABRIC";

function IndexRow({ row, onHover, onLeave }: { row: Row; onHover: (r: Row) => void; onLeave: () => void }) {
  const { display, shuffle, reset } = useCharShuffle(row.label);
  return (
    <li className="hairline-b">
      <Link
        href={row.href}
        className="group flex min-h-12 items-baseline gap-4 py-5 text-white transition-colors duration-200 hover:text-[#ff7a2f] focus-visible:text-[#ff7a2f] focus-visible:outline-none sm:gap-8"
        onMouseEnter={() => {
          shuffle();
          onHover(row);
        }}
        onMouseLeave={() => {
          reset();
          onLeave();
        }}
        onFocus={() => onHover(row)}
        onBlur={onLeave}
      >
        <span className="font-mono-meta text-white/35">{row.index}</span>
        <span
          className="flex-1 font-normal"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", lineHeight: 1.15 }}
        >
          {display}
        </span>
        <span className="font-mono-meta hidden text-white/35 group-hover:text-white/55 md:inline">
          {row.stat}
        </span>
        <span aria-hidden className="font-mono-meta text-white/35 group-hover:text-[#ff7a2f]">
          →
        </span>
      </Link>
    </li>
  );
}

export default function CapabilityIndex() {
  const scope = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState<Row | null>(null);
  const finePointer = useRef(false);

  useGSAP(
    () => {
      finePointer.current =
        typeof window !== "undefined" &&
        window.matchMedia("(pointer: fine)").matches &&
        !prefersReducedMotion();
      if (!finePointer.current) return;

      const el = previewRef.current;
      if (!el) return;
      const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
      const innerXTo = gsap.quickTo(el.firstElementChild, "x", { duration: 0.9, ease: "power3" });

      const onMove = (e: MouseEvent) => {
        xTo(e.clientX + 24);
        yTo(e.clientY - 90);
        innerXTo((e.clientX % 60) - 30); // subtle counter-translate parallax
      };
      window.addEventListener("mousemove", onMove, { passive: true });
      return () => window.removeEventListener("mousemove", onMove);
    },
    { scope },
  );

  return (
    <section ref={scope} id="capabilities" aria-labelledby="capabilities-heading" className="px-6 py-28 sm:px-10 lg:px-24">
      <Reveal as="h2" className="font-mono-meta text-white/55">
        <span id="capabilities-heading">Nine ways teams use us. One standard.</span>
      </Reveal>

      <ul className="hairline-t mt-10 list-none">
        {ROWS.map((row) => (
          <IndexRow key={row.index} row={row} onHover={setPreview} onLeave={() => setPreview(null)} />
        ))}
      </ul>

      <p className="font-mono-meta mt-8 text-white/35">{TECH_LINE}</p>

      {/* Cursor-following preview — fixed mask, transform-only, desktop pointer:fine */}
      <div
        ref={previewRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-30 hidden h-[180px] w-[280px] overflow-hidden opacity-0 transition-opacity duration-200 lg:block"
        style={{ opacity: preview && finePointer.current ? 1 : 0 }}
      >
        {preview ? (
          <Image
            src={preview.thumb}
            alt=""
            width={340}
            height={340}
            className="h-full w-full scale-110 object-cover"
            sizes="280px"
          />
        ) : null}
      </div>
    </section>
  );
}
