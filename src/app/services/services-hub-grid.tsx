"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/homepage-light/SectionHeader";
import {
  SERVICES_HUB,
  SERVICES_HUB_STATS,
  type ServicesHubItem,
} from "@/data/services-hub";

function ServiceIcon({ svc, size = 20 }: { svc: ServicesHubItem; size?: number }) {
  if (svc.LucideIcon) {
    const Icon = svc.LucideIcon;
    return <Icon size={size} strokeWidth={1.75} style={{ color: svc.accent }} />;
  }
  if (svc.imgSrc) {
    return (
      <Image
        src={svc.imgSrc}
        alt=""
        width={size}
        height={size}
        className="object-contain"
      />
    );
  }
  return null;
}

function ServiceCard({
  svc,
  active,
  onHover,
}: {
  svc: ServicesHubItem;
  active: boolean;
  onHover: (id: string | null) => void;
}) {
  return (
    <Link
      href={svc.href}
      onMouseEnter={() => onHover(svc.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(svc.id)}
      onBlur={() => onHover(null)}
      className={[
        "group relative flex min-w-0 flex-col gap-3 rounded-2xl border p-5 transition-[border-color,box-shadow,transform] duration-300",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1852FF]",
        active
          ? "border-[#0a0a1a]/12 bg-white shadow-[0_8px_32px_-20px_rgba(10,10,26,0.18)] -translate-y-0.5"
          : "border-[#0a0a1a]/[0.07] bg-white/80 hover:border-[#0a0a1a]/10",
      ].join(" ")}
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#0a0a1a]/[0.06] bg-[#F8F9FC]"
        style={active ? { borderColor: `${svc.accent}33` } : undefined}
      >
        <ServiceIcon svc={svc} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[15px] font-semibold leading-snug text-[#0a0a1a]">
            {svc.title}
          </h3>
          <ArrowUpRight
            className="h-4 w-4 shrink-0 text-[#0a0a1a]/30 transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#0a0a1a]"
            aria-hidden
          />
        </div>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#0a0a1a]/60">
          {svc.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {svc.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#0a0a1a]/[0.08] bg-[#F8F9FC] px-2.5 py-0.5 text-[10px] font-medium text-[#0a0a1a]/55"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

function DetailPanel({ svc }: { svc: ServicesHubItem }) {
  return (
    <div className="flex h-full min-h-[280px] flex-col rounded-2xl border border-[#0a0a1a]/[0.08] bg-white p-6 shadow-[0_8px_32px_-20px_rgba(10,10,26,0.12)] lg:sticky lg:top-[120px]">
      <div
        className="mb-5 inline-flex w-max items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em]"
        style={{
          color: svc.accent,
          borderColor: `color-mix(in srgb, ${svc.accent} 22%, transparent)`,
          backgroundColor: `color-mix(in srgb, ${svc.accent} 8%, transparent)`,
        }}
      >
        <span
          className="h-1 w-1 rounded-full"
          style={{ backgroundColor: svc.accent }}
          aria-hidden
        />
        {svc.tags[0]}
      </div>
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F8F9FC]">
          <ServiceIcon svc={svc} size={24} />
        </div>
        <h3 className="text-xl font-semibold leading-tight tracking-[-0.03em] text-[#0a0a1a]">
          {svc.title}
        </h3>
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-[#0a0a1a]/65">
        {svc.description}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {svc.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-lg border border-[#0a0a1a]/[0.07] px-2.5 py-1 text-xs text-[#0a0a1a]/55"
          >
            {tag}
          </span>
        ))}
      </div>
      <Link
        href={svc.href}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        style={{ color: svc.accent }}
      >
        Explore service
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </div>
  );
}

export default function ServicesHubGrid() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState(SERVICES_HUB[0].id);

  const activeId = hoveredId ?? selectedId;
  const panelSvc =
    SERVICES_HUB.find((s) => s.id === activeId) ?? SERVICES_HUB[0];

  const onHover = useCallback((id: string | null) => {
    setHoveredId(id);
    if (id) setSelectedId(id);
  }, []);

  return (
    <section
      data-section="services-catalog"
      className="relative w-full bg-[#F3F0EE] py-16 md:py-24 lg:py-28"
      aria-labelledby="services-catalog-heading"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <div className="mb-10 flex flex-col gap-10 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            badge="Capabilities"
            accent="#1852FF"
            headline={
              <span id="services-catalog-heading">
                Every practice your roadmap needs.
              </span>
            }
            body="Microsoft, data, AI, and modern product engineering — each with a dedicated team and a clear path from discovery to launch."
            className="max-w-2xl"
          />
          <ul className="flex flex-wrap gap-6 lg:gap-8">
            {SERVICES_HUB_STATS.map((s) => (
              <li key={s.label} className="text-right">
                <p className="text-2xl font-semibold tabular-nums leading-none tracking-[-0.03em] text-[#0a0a1a] md:text-3xl">
                  {s.value}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[#0a0a1a]/45">
                  {s.label}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_minmax(280px,360px)] lg:gap-10">
          <div className="grid gap-3 sm:grid-cols-2">
            {SERVICES_HUB.map((svc) => (
              <ServiceCard
                key={svc.id}
                svc={svc}
                active={activeId === svc.id}
                onHover={onHover}
              />
            ))}
          </div>
          <DetailPanel svc={panelSvc} />
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-2xl border border-[#0a0a1a]/[0.08] bg-white px-6 py-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-[#0a0a1a]">
              Ready to scope your next initiative?
            </p>
            <p className="mt-1 text-sm text-[#0a0a1a]/55">
              We respond within one business day.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#FF5812] px-6 py-3 text-sm font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-[#FF6B00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5812] active:scale-[0.98]"
          >
            Get in touch
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
