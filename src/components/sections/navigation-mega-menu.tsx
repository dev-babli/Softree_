"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowUpRight } from "lucide-react";
import {
  NAV_RAIL_GRAINIENT,
  getNavColumnAccent,
} from "./navigation-grainient.presets";

const Grainient = dynamic(
  () => import("@/components/homepage-light/Grainient"),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-[#F3F0EE]" aria-hidden />
    ),
  },
);

export type MegaMenuLink = {
  label: string;
  url: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  description?: string;
};

export type MegaMenuGroup = {
  title: string;
  url?: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  description?: string;
  links: MegaMenuLink[];
};

type MegaMenuMeta = {
  eyebrow: string;
  blurb: string;
  cta?: string;
  href?: string;
};

const MEGA_META: Record<string, MegaMenuMeta> = {
  Services: {
    eyebrow: "Capabilities",
    blurb: "Microsoft, data, AI, and product engineering — one delivery standard.",
    cta: "All services",
    href: "/services",
  },
  "Case Studies": {
    eyebrow: "Proof",
    blurb: "Customer stories organized by solution area.",
    cta: "All case studies",
    href: "/case-studies",
  },
  Blog: {
    eyebrow: "Insights",
    blurb: "Practical notes on platforms, AI, and software delivery.",
    cta: "All articles",
    href: "/blog",
  },
  Products: {
    eyebrow: "Solutions",
    blurb: "Production-ready products built to accelerate your operations.",
  },
};

const GRID_COLS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

export function MegaMenuPanel({
  label,
  groups,
  onClose,
}: {
  label: string;
  groups: MegaMenuGroup[];
  onClose: () => void;
}) {
  const meta = MEGA_META[label];
  const railPreset = NAV_RAIL_GRAINIENT[label] ?? NAV_RAIL_GRAINIENT.Services;
  const columnCount = Math.min(groups.length, 4);

  return (
    <div
      data-nav-mega="rail-v2"
      className="mx-auto flex w-full max-w-[1080px] overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_32px_80px_-20px_rgba(10,10,26,0.28)]"
    >
      {/* Left rail — single Grainient */}
      <div className="relative hidden w-[220px] shrink-0 overflow-hidden sm:block">
        <div className="absolute inset-0">
          <Grainient {...railPreset} className="h-full w-full" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06)_0%,rgba(0,0,0,0.42)_100%)]" />
        <div className="relative z-10 flex h-full min-h-[280px] flex-col justify-between p-5 text-white">
          <div>
            {meta && (
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                {meta.eyebrow}
              </span>
            )}
            <p className="text-lg font-semibold tracking-[-0.02em]">
              {label}
            </p>
            {meta && (
              <p className="mt-2 text-[12px] leading-relaxed text-white/72">
                {meta.blurb}
              </p>
            )}
          </div>
          {meta && meta.href && meta.cta && (
            <Link
              href={meta.href}
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-white/90 transition-colors duration-100 hover:text-white"
            >
              {meta.cta}
              <ArrowUpRight size={14} />
            </Link>
          )}
        </div>
      </div>

      {/* Link grid */}
      <div className="min-w-0 flex-1 bg-[#FAFAF9]">
        {/* Mobile-only header */}
        <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-3.5 sm:hidden">
          <span className="text-sm font-semibold text-[#0a0a1a]">{label}</span>
          {meta && meta.href && meta.cta && (
            <Link
              href={meta.href}
              onClick={onClose}
              className="text-[12px] font-medium text-[#1852FF]"
            >
              {meta.cta}
            </Link>
          )}
        </div>

        {(() => {
          const cols: MegaMenuGroup[][] = [];
          const maxCols = 4;
          for (let i = 0; i < groups.length; i++) {
            const colIdx = i % maxCols;
            if (!cols[colIdx]) {
              cols[colIdx] = [];
            }
            cols[colIdx].push(groups[i]);
          }

          return (
            <div className={`grid gap-0 p-4 sm:p-5 ${GRID_COLS[cols.length] ?? "grid-cols-4"}`}>
              {cols.map((columnGroups, colIdx) => {
                const accent = getNavColumnAccent(colIdx);
                const isLast = colIdx === cols.length - 1;

                return (
                  <div
                    key={colIdx}
                    className={`flex flex-col gap-6 px-3 py-1 ${!isLast ? "border-r border-black/[0.05]" : ""}`}
                  >
                    {columnGroups.map((group, groupIdx) => {
                      const GroupIcon = group.icon;
                      return (
                        <div key={`${group.title}-${groupIdx}`} className="w-full">
                          <div className="mb-3">
                            {group.url ? (
                              <Link
                                href={group.url}
                                onClick={onClose}
                                className="group/col-link -mx-2.5 block rounded-xl p-2.5 transition-colors duration-150 hover:bg-black/[0.03]"
                              >
                                <div className="mb-1.5 flex items-center gap-2">
                                  {GroupIcon ? (
                                    <GroupIcon
                                      size={16}
                                      className="shrink-0 text-[#0a0a1a]/30 transition-colors duration-100 group-hover/col-link:text-[#FF5812]"
                                    />
                                  ) : (
                                    <span
                                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                                      style={{ backgroundColor: accent }}
                                    />
                                  )}
                                  <span
                                    className="text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-100 group-hover/col-link:text-[#FF5812]"
                                    style={{ color: accent }}
                                  >
                                    {group.title}
                                  </span>
                                </div>
                                {group.description && (
                                  <p className="text-[11px] leading-snug text-[#0a0a1a]/45 line-clamp-2 transition-colors duration-100 group-hover/col-link:text-[#0a0a1a]/60">
                                    {group.description}
                                  </p>
                                )}
                              </Link>
                            ) : (
                              <>
                                <div className="mb-1.5 flex items-center gap-2">
                                  {GroupIcon ? (
                                    <GroupIcon
                                      size={16}
                                      className="shrink-0 text-[#0a0a1a]/30"
                                    />
                                  ) : (
                                    <span
                                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                                      style={{ backgroundColor: accent }}
                                    />
                                  )}
                                  <span
                                    className="text-[10px] font-bold uppercase tracking-[0.2em]"
                                    style={{ color: accent }}
                                  >
                                    {group.title}
                                  </span>
                                </div>
                                {group.description && (
                                  <p className="text-[11px] leading-snug text-[#0a0a1a]/45 line-clamp-2">
                                    {group.description}
                                  </p>
                                )}
                              </>
                            )}
                          </div>

                          {group.links && group.links.length > 0 && (
                            <ul className="space-y-0.5">
                              {group.links.map((link) => {
                                const Icon = link.icon;
                                return (
                                  <li key={`${link.url}-${link.label}`}>
                                    <Link
                                      href={link.url}
                                      onClick={onClose}
                                      className="group flex items-start gap-2.5 rounded-lg px-2 py-2 transition-colors duration-100 hover:bg-white"
                                    >
                                      {Icon && (
                                        <Icon
                                          size={15}
                                          className="mt-0.5 shrink-0 text-[#0a0a1a]/30 transition-colors duration-100 group-hover:text-[#FF5812]"
                                        />
                                      )}
                                      <span className="min-w-0">
                                        <span className="flex items-center gap-1">
                                          <span className="text-[13px] font-medium leading-snug text-[#0a0a1a]">
                                            {link.label}
                                          </span>
                                          <ArrowUpRight
                                            size={11}
                                            className="shrink-0 opacity-0 transition-all duration-100 group-hover:translate-x-px group-hover:-translate-y-px group-hover:opacity-100"
                                            style={{ color: accent }}
                                          />
                                        </span>
                                        {link.description && (
                                          <span className="mt-0.5 block text-[11px] leading-snug text-[#0a0a1a]/40 line-clamp-2">
                                            {link.description}
                                          </span>
                                        )}
                                      </span>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        })()}

        <div className="flex items-center justify-between border-t border-black/[0.05] px-5 py-2.5">
          <p className="text-[11px] text-[#0a0a1a]/45">
            <Link
              href="/book-meeting"
              onClick={onClose}
              className="font-medium text-[#0a0a1a]/70 hover:text-[#FF5812]"
            >
              Book a discovery call
            </Link>
          </p>
          <Link
            href="/contact"
            onClick={onClose}
            className="text-[11px] font-medium text-[#0a0a1a]/55 hover:text-[#0a0a1a]"
          >
            Get a quote →
          </Link>
        </div>
      </div>
    </div>
  );
}
