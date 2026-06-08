"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  ArrowUpRight,
  Box,
  ChevronLeft,
  ChevronRight,
  Code2,
  Compass,
  PenLine,
  TrendingUp,
} from "lucide-react";

const SERVICES = [
  { num: "01", title: "Strategy", desc: "Positioning and roadmaps.", Icon: Compass },
  { num: "02", title: "Design", desc: "Editorial systems and UI.", Icon: PenLine },
  { num: "03", title: "Development", desc: "Production-grade web products.", Icon: Code2 },
  { num: "04", title: "Growth", desc: "Experimentation and analytics.", Icon: TrendingUp },
  { num: "05", title: "Product", desc: "Discovery through launch.", Icon: Box },
] as const;

export function AvooraServices() {
  const [active, setActive] = useState(2);
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "center", containScroll: "trimSnaps" });

  const onSelect = useCallback(() => {
    if (emblaApi) setActive(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.scrollTo(2, false);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const progress = ((active + 1) / SERVICES.length) * 100;

  return (
    <section className="pb-[44px] pt-[48px]">
      <div className="grid grid-cols-[1fr_1fr] gap-[16px]">
        <div>
          <p className="flex items-center gap-[7px] text-[8px] font-medium uppercase tracking-[0.22em] text-[#8A84FF]">
            <span className="h-[4px] w-[4px] rounded-full bg-[#8A84FF]" />
            What we do
          </p>
          <h2 className="mt-[12px] max-w-[14ch] text-[26px] font-semibold leading-[1.08] tracking-[-0.04em] text-[#111]">
            End-to-end solutions for digital products
          </h2>
        </div>
        <div className="flex flex-col items-end justify-end text-right">
          <p className="max-w-[34ch] text-[10px] leading-[1.6] text-[#111]/45">
            From first principles to shipped software — one senior team across strategy, design,
            engineering, and growth.
          </p>
          <a href="#services" className="mt-[10px] inline-flex items-center gap-[5px] text-[8px] font-semibold uppercase tracking-[0.18em] text-[#111]/42">
            Explore all services
            <ArrowUpRight className="h-[10px] w-[10px]" />
          </a>
        </div>
      </div>

      <div className="relative mt-[28px]">
        <button type="button" onClick={() => emblaApi?.scrollPrev()} aria-label="Previous" className="absolute -left-[6px] top-1/2 z-10 flex h-[32px] w-[32px] -translate-y-1/2 items-center justify-center rounded-full border border-[#111]/[0.06] bg-white/95 shadow-sm">
          <ChevronLeft className="h-[13px] w-[13px] text-[#111]/40" />
        </button>
        <button type="button" onClick={() => emblaApi?.scrollNext()} aria-label="Next" className="absolute -right-[6px] top-1/2 z-10 flex h-[32px] w-[32px] -translate-y-1/2 items-center justify-center rounded-full border border-[#111]/[0.06] bg-white/95 shadow-sm">
          <ChevronRight className="h-[13px] w-[13px] text-[#111]/40" />
        </button>

        <div ref={emblaRef} className="overflow-hidden px-[18px] pb-[10px] pt-[8px]">
          <div className="flex gap-[10px]">
            {SERVICES.map(({ num, title, desc, Icon }, i) => {
              const on = i === active;
              return (
                <div key={num} className="min-w-0 shrink-0 basis-[118px]">
                  <article
                    className={`relative flex h-[248px] flex-col justify-between rounded-[16px] p-[14px] transition-all duration-500 ${
                      on
                        ? "z-10 scale-[1.06] border border-[#111]/[0.04] bg-white shadow-[0_16px_48px_-20px_rgba(138,132,255,0.5)]"
                        : "scale-100 border border-transparent bg-white/55"
                    }`}
                  >
                    {on && (
                      <div aria-hidden className="absolute -bottom-[10px] left-1/2 h-[16px] w-[70%] -translate-x-1/2 rounded-full bg-[#8A84FF]/25 blur-xl" />
                    )}
                    <div>
                      <span className="text-[9px] tabular-nums text-[#111]/25">{num}</span>
                      <Icon className={`mt-[12px] h-[14px] w-[14px] ${on ? "text-[#8A84FF]" : "text-[#111]/28"}`} strokeWidth={1.5} />
                      <h3 className="mt-[8px] text-[13px] font-semibold tracking-[-0.02em] text-[#111]">{title}</h3>
                      {on && <p className="mt-[6px] text-[9px] leading-[1.55] text-[#111]/42">{desc}</p>}
                    </div>
                    {on && (
                      <button type="button" aria-label={`More on ${title}`} className="flex h-[26px] w-[26px] items-center justify-center rounded-full border border-[#111]/[0.07] bg-white">
                        <ArrowUpRight className="h-[10px] w-[10px]" />
                      </button>
                    )}
                  </article>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-[6px] h-px w-[200px] overflow-hidden rounded-full bg-[#111]/[0.08]">
          <div className="h-full bg-[#8A84FF] transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </section>
  );
}
