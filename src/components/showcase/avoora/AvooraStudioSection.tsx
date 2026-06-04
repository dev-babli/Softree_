"use client";

import Image from "next/image";
import { Instrument_Serif } from "next/font/google";
import { ArrowUpRight } from "lucide-react";
import { AvooraCanvas, CANVAS } from "./AvooraCanvas";
import { BrandLogos } from "./BrandLogos";
import { AvooraBento } from "./AvooraBento";
import { AvooraServices } from "./AvooraServices";
import { AvooraCta } from "./AvooraCta";

const serif = Instrument_Serif({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400"],
  display: "swap",
});

/** Pixel-faithful Avoora clone — 682px design canvas, mockup crops for 3D visuals */
export default function AvooraStudioSection() {
  return (
    <AvooraCanvas>
      <div style={{ paddingLeft: CANVAS.px, paddingRight: CANVAS.px }}>
        {/* ── Header ── */}
        <header className="pt-[22px]">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-bold tracking-[0.05em] text-[#111111]">
              AVOORA
              <sup className="ml-[2px] text-[7px] font-normal opacity-35">®</sup>
            </span>
            <button
              type="button"
              aria-label="Menu"
              className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#111]/[0.07] bg-white"
            >
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden>
                <path d="M1 1.5H13M1 6.5H13" stroke="#111" strokeOpacity="0.55" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="mt-[26px] border-b border-[#111]/[0.06] pb-[22px]">
            <p className="mb-[18px] text-center text-[8px] font-medium uppercase tracking-[0.26em] text-[#111]/30">
              Trusted by innovative companies
            </p>
            <BrandLogos />
          </div>
        </header>

        {/* ── Hero ── */}
        <section className="grid grid-cols-[252px_1fr] gap-[8px] pb-[52px] pt-[34px]">
          <div>
            <p className="flex items-center gap-[7px] text-[8px] font-medium uppercase tracking-[0.22em] text-[#8A84FF]">
              <span className="h-[4px] w-[4px] rounded-full bg-[#8A84FF]" />
              Digital studio
            </p>
            <h1 className="mt-[18px] text-[34px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#111111]">
              We create digital experiences that move businesses{" "}
              <span className={`font-normal text-[#8A84FF] ${serif.className}`}>forward.</span>
            </h1>
            <p className="mt-[16px] text-[11px] leading-[1.65] text-[#111]/48">
              We partner with ambitious brands and startups to design, build and scale digital
              products that make a real impact.
            </p>
            <a href="#contact" className="group mt-[22px] inline-flex items-center gap-[12px]">
              <span className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-[#111]/[0.07] bg-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)]">
                <ArrowUpRight className="h-[14px] w-[14px] text-[#111]" strokeWidth={1.75} />
              </span>
              <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#111]/52">
                Let&apos;s build together
              </span>
            </a>
          </div>

          {/* Exact sculpture crop from your mockup PNG */}
          <div className="relative -mr-[10px] flex items-start justify-end">
            <Image
              src="/showcase/avoora-crop-hero.png"
              alt=""
              width={336}
              height={330}
              priority
              className="h-auto w-[336px] max-w-none select-none"
              draggable={false}
            />
          </div>
        </section>
      </div>

      {/* ── Grey band: stats + testimonial ── */}
      <div className="bg-[#F8F8F6] px-[40px] py-[44px]">
        <AvooraBento />
      </div>

      <div style={{ paddingLeft: CANVAS.px, paddingRight: CANVAS.px }}>
        <AvooraServices />
        <AvooraCta />
      </div>
    </AvooraCanvas>
  );
}
