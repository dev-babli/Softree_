/* eslint-disable softree-design/no-untokenized-design-literals */
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import {
  NAV_RAIL_GRAINIENT,
  getNavColumnAccent,
  type NavGrainientPreset,
} from "./navigation-grainient.presets";
import {
  MEGA_META,
  SERVICES_MEGA_FOOTER,
  type MegaMenuGroup,
  type MegaMenuLink,
} from "./navigation-mega-menu.data";

export type { MegaMenuGroup, MegaMenuLink };

function NavRailBackground({ preset }: { preset: NavGrainientPreset }) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(165deg, ${preset.color1} 0%, ${preset.color2} 48%, ${preset.color3} 100%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.35) 0, transparent 42%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.2) 0, transparent 38%)",
        }}
      />
    </div>
  );
}

const SCROLLBAR_CLASS =
  "overflow-y-auto [scrollbar-width:thin] [scrollbar-color:rgba(10,10,26,0.18)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black/12 hover:[&::-webkit-scrollbar-thumb]:bg-black/22";

function groupKey(group: MegaMenuGroup | undefined) {
  if (!group) return "";
  return group.id ?? group.title;
}

function groupHref(group: MegaMenuGroup): string {
  return group.url || group.links[0]?.url || "/services";
}

function ServicesMegaLayout({
  groups,
  onClose,
}: {
  groups: MegaMenuGroup[];
  onClose: () => void;
}) {
  const meta = MEGA_META.Services;
  const railPreset = NAV_RAIL_GRAINIENT.Services;
  const [activeId, setActiveId] = useState(groupKey(groups[0]));

  useEffect(() => {
    setActiveId(groupKey(groups[0]));
  }, [groups]);

  const activeGroup = useMemo(
    () => groups.find((group) => groupKey(group) === activeId) ?? groups[0],
    [groups, activeId],
  );

  const ActiveIcon = activeGroup?.icon;
  const viewAllHref = activeGroup ? groupHref(activeGroup) : "/services";

  return (
    <div
      data-nav-mega="services-interactive"
      className="mx-auto flex max-h-[min(85vh,740px)] w-full max-w-[1240px] flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-[0_28px_70px_-24px_rgba(10,10,26,0.28)]"
    >
      <div className="flex min-h-0 flex-1">
        <aside className="relative hidden w-[232px] shrink-0 overflow-hidden lg:block">
          <NavRailBackground preset={railPreset} />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.38)_100%)]" />
          <div className="relative z-10 flex h-full min-h-[480px] flex-col justify-between px-7 py-8 text-white">
            <div>
              <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                {meta.eyebrow}
              </span>
              <p className="text-[21px] font-semibold leading-[1.35] tracking-[-0.03em]">
                {meta.blurb}
              </p>
            </div>
            {meta.href && meta.cta && (
              <Link
                href={meta.href}
                onClick={onClose}
                className="inline-flex min-h-11 w-fit items-center gap-1.5 text-[13px] font-semibold text-white/90 transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                {meta.cta}
                <ArrowUpRight size={14} />
              </Link>
            )}
          </div>
        </aside>

        <nav
          aria-label="Service categories"
          className="flex w-[252px] shrink-0 flex-col border-r border-black/[0.06] bg-white px-3 py-6"
        >
          <ul className="flex flex-col gap-1">
            {groups.map((group) => {
              const Icon = group.icon;
              const isActive = groupKey(group) === groupKey(activeGroup);
              return (
                <li key={groupKey(group)}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveId(groupKey(group))}
                    onFocus={() => setActiveId(groupKey(group))}
                    onClick={() => setActiveId(groupKey(group))}
                    className={`flex min-h-12 w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812]/40 ${
                      isActive
                        ? "bg-[rgba(255,88,18,0.08)] text-[#FF5812]"
                        : "text-[#0a0a1a]/75 hover:bg-[#F3F0EE] hover:text-[#0a0a1a]"
                    }`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    {Icon ? (
                      <Icon
                        size={17}
                        className={`shrink-0 ${isActive ? "text-[#FF5812]" : "text-[#0a0a1a]/35"}`}
                      />
                    ) : (
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${isActive ? "bg-[#FF5812]" : "bg-[#0a0a1a]/25"}`}
                      />
                    )}
                    <span className="min-w-0 flex-1 text-[13px] font-medium leading-snug">
                      {group.title}
                    </span>
                    <ChevronRight
                      size={14}
                      className={`shrink-0 ${isActive ? "text-[#FF5812]" : "text-[#0a0a1a]/20"}`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <section className="relative flex min-h-0 min-w-0 flex-1 flex-col bg-white">
          <AnimatePresence mode="wait" initial={false}>
            {activeGroup && (
              <motion.div
                key={groupKey(activeGroup)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                className="flex min-h-0 flex-1 flex-col"
              >
                <header className="shrink-0 px-8 pb-1 pt-7">
                  <div className="flex items-start gap-4">
                    {ActiveIcon && (
                      <ActiveIcon
                        size={28}
                        className="mt-0.5 shrink-0 text-[#FF5812]"
                      />
                    )}
                    <div className="min-w-0">
                      <h3 className="text-[22px] font-semibold tracking-[-0.03em] text-[#0a0a1a]">
                        {activeGroup.title}
                      </h3>
                      {activeGroup.description && (
                        <p className="mt-1.5 max-w-lg text-[13px] leading-relaxed text-[#0a0a1a]/50">
                          {activeGroup.description}
                        </p>
                      )}
                    </div>
                  </div>
                </header>

                <div className={`min-h-0 flex-1 px-8 py-5 ${SCROLLBAR_CLASS}`}>
                  <div className="grid grid-cols-1 gap-x-10 gap-y-6 pb-4 sm:grid-cols-2">
                    {activeGroup.links.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={`${link.url}-${link.label}`}
                          href={link.url}
                          onClick={onClose}
                          className="group flex items-start gap-3.5 rounded-xl py-1 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812]/40"
                        >
                          {Icon && (
                            <Icon
                              size={18}
                              className="mt-0.5 shrink-0 text-[#FF5812]"
                            />
                          )}
                          <span className="min-w-0">
                            <span className="flex items-center gap-1.5">
                              <span className="text-[14px] font-semibold leading-snug text-[#0a0a1a]">
                                {link.label}
                              </span>
                              <ArrowUpRight
                                size={12}
                                className="shrink-0 text-[#FF5812] opacity-0 transition-all duration-150 group-hover:translate-x-px group-hover:-translate-y-px group-hover:opacity-100"
                              />
                            </span>
                            {link.description && (
                              <span className="mt-1 block max-w-[260px] text-[12.5px] leading-relaxed text-[#0a0a1a]/45">
                                {link.description}
                              </span>
                            )}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="shrink-0 px-8 pb-6 pt-1 text-center">
                  <Link
                    href={viewAllHref}
                    onClick={onClose}
                    className="inline-flex min-h-11 items-center gap-1.5 text-[13px] font-semibold text-[#FF5812] transition-colors duration-150 hover:text-[#E64C00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812]/40"
                  >
                    View all {activeGroup.title} services
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>

      <footer className="grid shrink-0 grid-cols-1 gap-6 border-t border-black/[0.06] bg-white px-7 py-5 sm:grid-cols-3 sm:gap-10 sm:px-8">
        {SERVICES_MEGA_FOOTER.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.cta} className="flex items-start gap-3.5">
              <Icon size={18} className="mt-0.5 shrink-0 text-[#FF5812]" />
              <div className="min-w-0">
                <p className="text-[13px] leading-snug text-[#0a0a1a]/70">
                  {item.title}
                </p>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="mt-1.5 inline-flex min-h-8 items-center gap-1 text-[13px] font-semibold text-[#FF5812] transition-colors duration-150 hover:text-[#E64C00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812]/40"
                >
                  {item.cta}
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          );
        })}
      </footer>
    </div>
  );
}

function CompactMegaLayout({
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

  return (
    <div
      data-nav-mega="rail-v2"
      className="mx-auto flex max-h-[85vh] w-full max-w-[1200px] overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_32px_80px_-20px_rgba(10,10,26,0.28)]"
    >
      <div className="relative hidden w-[220px] shrink-0 overflow-hidden sm:block">
        <NavRailBackground preset={railPreset} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06)_0%,rgba(0,0,0,0.42)_100%)]" />
        <div className="relative z-10 flex h-full min-h-[280px] flex-col justify-between p-5 text-white">
          <div>
            {meta && (
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                {meta.eyebrow}
              </span>
            )}
            <p className="text-lg font-semibold tracking-[-0.02em]">{label}</p>
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
              className="inline-flex min-h-11 items-center gap-1.5 text-[12px] font-semibold text-white/90 transition-colors duration-100 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              {meta.cta}
              <ArrowUpRight size={14} />
            </Link>
          )}
        </div>
      </div>

      <div className={`min-h-0 min-w-0 flex-1 bg-[#FAFAF9] p-5 ${SCROLLBAR_CLASS}`}>
        <div className="grid grid-cols-1 gap-8 pb-6 sm:grid-cols-2">
          {groups.map((group, groupIdx) => {
            const GroupIcon = group.icon;
            const accent = getNavColumnAccent(groupIdx);
            return (
              <div key={groupKey(group) || group.title} className="min-w-0">
                <div className="mb-3 flex items-center gap-2">
                  {GroupIcon ? (
                    <GroupIcon size={16} className="shrink-0 text-[#FF5812]" />
                  ) : (
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: accent }}
                    />
                  )}
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF5812]">
                    {group.title}
                  </span>
                </div>
                <ul className="space-y-1">
                  {group.links.map((link) => {
                    const Icon = link.icon;
                    return (
                      <li key={`${link.url}-${link.label}`}>
                        <Link
                          href={link.url}
                          onClick={onClose}
                          className="group flex min-h-11 items-start gap-2.5 rounded-lg px-2 py-2 transition-colors duration-100 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812]/40"
                        >
                          {Icon && (
                            <Icon
                              size={15}
                              className="mt-0.5 shrink-0 text-[#0a0a1a]/30 transition-colors duration-100 group-hover:text-[#FF5812]"
                            />
                          )}
                          <span className="min-w-0">
                            <span className="text-[13px] font-medium leading-snug text-[#0a0a1a]">
                              {link.label}
                            </span>
                            {link.description && (
                              <span className="mt-0.5 block line-clamp-2 text-[11px] leading-snug text-[#0a0a1a]/40">
                                {link.description}
                              </span>
                            )}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function MegaMenuPanel({
  label,
  groups,
  onClose,
}: {
  label: string;
  groups: MegaMenuGroup[];
  onClose: () => void;
}) {
  if (label === "Services" && groups.length > 1) {
    return <ServicesMegaLayout groups={groups} onClose={onClose} />;
  }

  return (
    <CompactMegaLayout label={label} groups={groups} onClose={onClose} />
  );
}
