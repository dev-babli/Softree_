"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function AvooraCta() {
  return (
    <section className="pb-[48px] pt-[8px]">
      <div
        className="grid grid-cols-[auto_1fr_auto] items-center gap-[12px] rounded-[18px] px-[16px] py-[16px]"
        style={{
          background:
            "linear-gradient(100deg, rgba(138,132,255,0.14) 0%, rgba(255,255,255,0.96) 42%, rgba(255,255,255,0.98) 58%, rgba(255,211,180,0.16) 100%)",
          border: "1px solid rgba(17,17,17,0.04)",
        }}
      >
        {/* Exact pearl crop from mockup */}
        <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-full border border-[#111]/[0.05] bg-[#F8F8F6]">
          <Image
            src="/showcase/avoora-crop-pearl.png"
            alt=""
            width={102}
            height={102}
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>

        <p className="text-center text-[14px] font-medium leading-[1.35] tracking-[-0.02em] text-[#111]">
          Let&apos;s create something extraordinary together.
        </p>

        <a href="#contact" className="inline-flex shrink-0 items-center gap-[8px]">
          <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#111]/58">
            Start a project
          </span>
          <span className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#111] text-white">
            <ArrowUpRight className="h-[11px] w-[11px]" strokeWidth={2} />
          </span>
        </a>
      </div>
    </section>
  );
}
