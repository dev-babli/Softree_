"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Globe, Layers, Quote, Star, Users } from "lucide-react";

const METRICS = [
  { value: "300+", label: "Projects Delivered", Icon: Layers },
  { value: "98%", label: "Client Retention", Icon: Users },
  { value: "15+", label: "Countries Served", Icon: Globe },
  { value: "4.9/5", label: "Client Rating", Icon: Star },
] as const;

const SLIDES = [
  { quote: "They became an extension of our team.", name: "Michael Chen", role: "Co-founder, Finova" },
  { quote: "Craft and clarity in every sprint.", name: "Sarah Okonkwo", role: "VP Product, Northline" },
  { quote: "Our metrics moved within the first month.", name: "James Whitfield", role: "CEO, Meridian" },
  { quote: "They think like product owners.", name: "Elena Rossi", role: "Head of Design, Arclight" },
] as const;

export function AvooraBento() {
  const [idx, setIdx] = useState(0);
  const prev = useCallback(() => setIdx((i) => (i + 3) % 4), []);
  const next = useCallback(() => setIdx((i) => (i + 1) % 4), []);
  const t = SLIDES[idx];

  useEffect(() => {
    const id = window.setInterval(next, 8000);
    return () => window.clearInterval(id);
  }, [next]);

  return (
    <div className="grid grid-cols-[248px_1fr] gap-[14px]">
      {/* 2×2 white metric cards */}
      <div className="grid grid-cols-2 gap-[10px]">
        {METRICS.map(({ value, label, Icon }) => (
          <div
            key={label}
            className="flex flex-col gap-[10px] rounded-[14px] border border-[#111]/[0.04] bg-white p-[14px]"
          >
            <Icon className="h-[14px] w-[14px] text-[#8A84FF]" strokeWidth={1.5} />
            <span className="text-[22px] font-semibold tabular-nums tracking-[-0.03em] text-[#111]">
              {value}
            </span>
            <span className="text-[9px] leading-snug text-[#111]/42">{label}</span>
          </div>
        ))}
      </div>

      {/* Testimonial */}
      <div className="flex min-h-[248px] flex-col justify-between rounded-[18px] border border-[#111]/[0.05] bg-white/90 p-[22px] shadow-[0_10px_40px_-24px_rgba(0,0,0,0.1)] backdrop-blur-sm">
        <Quote className="h-[22px] w-[22px] text-[#8A84FF]" strokeWidth={1.25} />
        <p className="mt-[14px] max-w-[24ch] text-[17px] font-medium leading-[1.35] tracking-[-0.02em] text-[#111]">
          {t.quote}
        </p>
        <div className="mt-[18px] flex items-end justify-between">
          <div className="flex items-center gap-[10px]">
            <div className="relative h-[32px] w-[32px] overflow-hidden rounded-full">
              <Image
                src="/showcase/avoora-crop-avatar.png"
                alt=""
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>
            <div>
              <p className="text-[10px] font-medium text-[#111]">{t.name}</p>
              <p className="text-[9px] text-[#111]/40">{t.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-[6px]">
            <div className="mr-[4px] flex gap-[4px]">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => setIdx(i)}
                  className={`rounded-full ${i === idx ? "h-[5px] w-[14px] bg-[#8A84FF]" : "h-[5px] w-[5px] bg-[#111]/12"}`}
                />
              ))}
            </div>
            <button type="button" onClick={prev} aria-label="Previous" className="flex h-[28px] w-[28px] items-center justify-center rounded-full border border-[#111]/[0.07] bg-white">
              <ChevronLeft className="h-[13px] w-[13px] text-[#111]/45" />
            </button>
            <button type="button" onClick={next} aria-label="Next" className="flex h-[28px] w-[28px] items-center justify-center rounded-full border border-[#111]/[0.07] bg-white">
              <ChevronRight className="h-[13px] w-[13px] text-[#111]/45" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
