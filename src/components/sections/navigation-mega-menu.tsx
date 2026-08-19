/* eslint-disable softree-design/no-untokenized-design-literals */
"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  ChevronRight, 
  Headset, 
  Bot
} from "lucide-react";
import {
  NAV_RAIL_GRAINIENT,
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
  group?: string;
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
  "AI & Automation": {
    eyebrow: "AI & Automation",
    blurb: "Enterprise-grade AI solutions, agents, copilots and autonomous workflow automation.",
    cta: "View all AI services",
    href: "/ai",
  },
  Services: {
    eyebrow: "Services",
    blurb: "End-to-end services to modernize, automate and transform your business.",
    cta: "View all services",
    href: "/services",
  },
  "Case Studies": {
    eyebrow: "Case Studies",
    blurb: "Real-world engineering stories and impact across industries.",
    cta: "All case studies",
    href: "/case-studies",
  },
  Blog: {
    eyebrow: "Blog",
    blurb: "Practical notes on AI engineering, cloud platforms, and delivery.",
    cta: "All articles",
    href: "/blog",
  },
  Products: {
    eyebrow: "Products",
    blurb: "SaaS products and platforms built to automate complex operations at scale.",
    cta: "View all products",
    href: "/webanalyser",
  },
};

const FALLBACK_GRADIENTS: Record<string, string> = {
  Services: "linear-gradient(135deg, #FF8B57 0%, #FF5812 50%, #B03C17 100%)",
  "Case Studies": "linear-gradient(135deg, #C8E0FF 0%, #1852FF 50%, #002DB3 100%)",
  Blog: "linear-gradient(135deg, #D4C6FF 0%, #8B5CF6 50%, #5B21B6 100%)",
  Products: "linear-gradient(135deg, #CCFBF1 0%, #0D9488 50%, #115E59 100%)",
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

  // Active Category state
  const [activeIdx, setActiveIdx] = useState(0);

  // Reset activeIdx to 0 when groups change
  useEffect(() => {
    setActiveIdx(0);
  }, [groups]);

  // Safely get the active category
  const activeGroup = useMemo(() => {
    if (groups.length === 0) return null;
    return groups[activeIdx] ?? groups[0] ?? null;
  }, [groups, activeIdx]);

  const ActiveGroupIcon = activeGroup?.icon ?? Bot;

  // Group links dynamically if 'group' property exists
  const groupedLinks = useMemo(() => {
    if (!activeGroup) return null;
    const hasGroup = activeGroup.links.some((link) => link.group);
    if (!hasGroup) return null;

    const map: Record<string, MegaMenuLink[]> = {};
    activeGroup.links.forEach((link) => {
      const gName = link.group || "Other Services";
      if (!map[gName]) {
        map[gName] = [];
      }
      map[gName].push(link);
    });
    return map;
  }, [activeGroup]);

  return (
    <div
      data-nav-mega="tabbed-v3"
      className="mx-auto flex w-full max-w-[1200px] overflow-hidden rounded-[24px] border border-black/[0.08] bg-white shadow-[0_32px_80px_-20px_rgba(10,10,26,0.28)]"
    >
      {/* Left rail — stretches full height */}
      <div className="relative hidden w-[260px] shrink-0 overflow-hidden md:block">
        {/* Render each gradient as a layer and fade between them smoothly to prevent WebGL context compilation lag */}
        {Object.entries(FALLBACK_GRADIENTS).map(([key, grad]) => (
          <div
            key={key}
            className="absolute inset-0 transition-opacity duration-300 ease-out"
            style={{
              background: grad,
              opacity: label === key ? 1 : 0,
            }}
          />
        ))}
        {!FALLBACK_GRADIENTS[label] && (
          <div
            className="absolute inset-0"
            style={{
              background: FALLBACK_GRADIENTS.Services,
            }}
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06)_0%,rgba(0,0,0,0.42)_100%)]" />
        <div className="relative z-10 flex h-full min-h-[460px] flex-col justify-between p-6 text-white">
          <div>
            {meta && (
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                {meta.eyebrow}
              </span>
            )}
            <p className="text-xl font-bold tracking-tight leading-snug">
              {meta ? meta.blurb : label}
            </p>
          </div>

        </div>
      </div>

      {/* Main Area: Top dynamic panels + Bottom cards */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-row min-w-0">
          
          {/* Middle Column — Categories list */}
          <div className="w-[280px] shrink-0 border-r border-black/[0.06] p-4 flex flex-col gap-1.5 bg-[#FAFAF9]">
            {groups.map((group, idx) => {
              const GroupIcon = group.icon ?? Bot;
              const isActive = idx === activeIdx;

              return (
                <button
                  key={group.title}
                  type="button"
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={() => setActiveIdx(idx)}
                  className={`w-full text-left flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-150 group relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812]/40 ${
                    isActive
                      ? "bg-[#FFF1EB] text-[#FF5812]"
                      : "text-[#0a0a1a]/70 hover:bg-black/[0.03] hover:text-[#0a0a1a]"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <GroupIcon 
                      size={18} 
                      className={`shrink-0 transition-colors duration-150 ${
                        isActive ? "text-[#FF5812]" : "text-[#0a0a1a]/40 group-hover:text-[#0a0a1a]/60"
                      }`} 
                    />
                    <span className="text-[13px] font-semibold tracking-tight truncate">
                      {group.title}
                    </span>
                  </div>
                  <ChevronRight 
                    size={14} 
                    className={`shrink-0 transition-all duration-150 ${
                      isActive 
                        ? "text-[#FF5812] opacity-100 translate-x-0" 
                        : "text-[#0a0a1a]/20 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
                    }`} 
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column — Subservices dynamically switching */}
          <div className="flex-1 bg-white p-6 md:p-8 flex flex-col">
            <AnimatePresence mode="wait">
              {activeGroup && (
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="flex-1 flex flex-col justify-start"
                >
                  {/* Category Header */}
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="bg-[#FFF1EB] p-2 rounded-xl text-[#FF5812] inline-flex">
                        <ActiveGroupIcon size={24} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-[17px] font-bold text-[#0a0a1a] tracking-tight">
                          {activeGroup.title}
                        </h3>
                        {activeGroup.description && (
                          <p className="text-[12px] text-[#0a0a1a]/55 leading-relaxed mt-0.5 max-w-[560px]">
                            {activeGroup.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Subservices Grid or Groups */}
                    {groupedLinks ? (
                      <div className={`grid mt-6 border-t border-black/[0.04] pt-5 ${
                        Object.keys(groupedLinks).length === 2 ? "grid-cols-2 gap-8" : "grid-cols-3 gap-6"
                      }`}>
                        {Object.entries(groupedLinks).map(([groupName, groupLinks]) => (
                          <div key={groupName} className="flex flex-col gap-3">
                            <h4 className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0a0a1a]/45 border-b border-black/[0.04] pb-1.5 mb-1">
                              {groupName}
                            </h4>
                            <div className="flex flex-col gap-3.5">
                              {groupLinks.map((link) => {
                                const LinkIcon = link.icon ?? Bot;
                                return (
                                  <Link
                                    key={link.label}
                                    href={link.url}
                                    onClick={onClose}
                                    className="group flex items-start gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812]/40"
                                  >
                                    <div className="bg-black/[0.03] text-[#0a0a1a]/30 group-hover:bg-[#FFF1EB] group-hover:text-[#FF5812] transition-colors p-1.5 rounded-lg mt-0.5 shrink-0">
                                      <LinkIcon size={12} />
                                    </div>
                                    <div className="min-w-0">
                                      <span className="text-[12.5px] font-semibold text-[#0a0a1a] group-hover:text-[#FF5812] transition-colors block leading-tight">
                                        {link.label}
                                      </span>
                                      {link.description && (
                                        <span className="text-[10.5px] text-[#0a0a1a]/45 leading-normal block mt-1 line-clamp-2 group-hover:text-[#0a0a1a]/65 transition-colors">
                                          {link.description}
                                        </span>
                                      )}
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-x-8 gap-y-4.5 mt-6 border-t border-black/[0.04] pt-5">
                        {activeGroup.links.map((link) => {
                          const LinkIcon = link.icon ?? Bot;
                          return (
                            <Link
                              key={link.label}
                              href={link.url}
                              onClick={onClose}
                              className="group flex items-start gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812]/40"
                            >
                              <div className="bg-black/[0.03] text-[#0a0a1a]/30 group-hover:bg-[#FFF1EB] group-hover:text-[#FF5812] transition-colors p-2 rounded-lg mt-0.5 shrink-0">
                                <LinkIcon size={14} />
                              </div>
                              <div className="min-w-0">
                                <span className="text-[13px] font-semibold text-[#0a0a1a] group-hover:text-[#FF5812] transition-colors block leading-tight">
                                  {link.label}
                                </span>
                                {link.description && (
                                  <span className="text-[11px] text-[#0a0a1a]/45 leading-normal block mt-1 line-clamp-1 group-hover:text-[#0a0a1a]/60 transition-colors">
                                    {link.description}
                                  </span>
                                )}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>


                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <div className="border-t border-black/[0.06] bg-[#FAFAF9]">
          <Link
            href="/contact"
            onClick={onClose}
            className="flex items-center justify-center gap-3.5 p-4 hover:bg-black/[0.01] transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FF5812]/40 w-full"
          >
            <div className="bg-black/[0.04] p-2.5 rounded-xl text-[#0a0a1a]/70 group-hover:bg-[#FFF1EB] group-hover:text-[#FF5812] transition-colors shrink-0">
              <Headset size={18} />
            </div>
            <div className="min-w-0 flex items-center gap-2">
              <p className="text-[12px] text-[#0a0a1a]/55">
                Not sure which service is right for you?
              </p>
              <p className="text-[13px] font-semibold text-[#FF5812] group-hover:underline flex items-center gap-0.5">
                Talk to our experts <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
