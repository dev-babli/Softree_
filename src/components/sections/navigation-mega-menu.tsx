/* eslint-disable softree-design/no-untokenized-design-literals */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Bot, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

/* -------------------------------------------------------------------------- */
/*  Editorial Headlines for actual service groups                              */
/* -------------------------------------------------------------------------- */

const GROUP_HEADLINES: Record<string, string> = {
  "AI & Automation": "Build AI Solutions for Real Business Impact",
  "Agentic Orchestration": "Autonomous Multi-Agent Systems at Scale",
  "Testing & Quality Engineering": "Zero-Defect Quality & AI Testing",
  "Document & Process Intelligence": "Automate Document Workflows & Data Extraction",
  "Microsoft & Business Applications": "Enterprise Low-Code & Cloud Applications",
  "Data & Analytics": "Turn Enterprise Data into Actionable Insight",
  "Digital Engineering": "High-Performance Web & Mobile Products",
  "Digital Workplace": "Modern Portals & Collaboration Workspaces",
  "Migration & Modernization": "Seamless Analytics & Cloud Migration",
  "Healthcare": "Clinical AI & Digital Health Engineering",
  "Logistics & Supply Chain": "AI-Driven Global Supply Chain Engineering",
};

/* -------------------------------------------------------------------------- */
/*  Advanced Horizontal Tab Scroller Component                                */
/* -------------------------------------------------------------------------- */

function AdvancedTabScroller({
  groups,
  activeIdx,
  onSelect,
}: {
  groups: MegaMenuGroup[];
  activeIdx: number;
  onSelect: (idx: number) => void;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const dragStartX = React.useRef(0);
  const scrollStartX = React.useRef(0);
  const dragMoved = React.useRef(false);

  // Update bounds & progress
  const updateMetrics = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = Math.max(0, scrollWidth - clientWidth);
    const overflowing = maxScroll > 8;

    setIsOverflowing(overflowing);
    setCanScrollLeft(overflowing && scrollLeft > 6);
    setCanScrollRight(overflowing && scrollLeft < maxScroll - 6);
    setScrollProgress(maxScroll > 0 ? Math.min(1, Math.max(0, scrollLeft / maxScroll)) : 0);
  }, []);

  // Sync metrics on mount, resize & scroll
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateMetrics();

    const onScroll = () => updateMetrics();
    el.addEventListener("scroll", onScroll, { passive: true });

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => updateMetrics());
      ro.observe(el);
    }

    return () => {
      el.removeEventListener("scroll", onScroll);
      if (ro) ro.disconnect();
    };
  }, [updateMetrics, groups.length]);

  // Convert vertical mouse wheel into horizontal scroll when hovering
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth) return;
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (
          (e.deltaY > 0 && el.scrollLeft < maxScroll - 1) ||
          (e.deltaY < 0 && el.scrollLeft > 1)
        ) {
          e.preventDefault();
          el.scrollBy({ left: e.deltaY * 0.9, behavior: "auto" });
          updateMetrics();
        }
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [updateMetrics]);

  // Smooth scroll active tab into view when activeIdx changes
  React.useEffect(() => {
    const tabEl = tabRefs.current[activeIdx];
    if (tabEl && scrollRef.current) {
      tabEl.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeIdx]);

  const handleScrollStep = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const offset = direction === "left" ? -240 : 240;
    el.scrollBy({ left: offset, behavior: "smooth" });
  };

  // Mouse Drag to Scroll
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    setIsDragging(true);
    dragMoved.current = false;
    dragStartX.current = e.clientX;
    scrollStartX.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const diff = e.clientX - dragStartX.current;
    if (Math.abs(diff) > 4) {
      dragMoved.current = true;
    }
    scrollRef.current.scrollLeft = scrollStartX.current - diff;
    updateMetrics();
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = (activeIdx + 1) % groups.length;
      onSelect(next);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = (activeIdx - 1 + groups.length) % groups.length;
      onSelect(prev);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative mb-5 select-none"
      onKeyDown={handleKeyDown}
      role="tablist"
      aria-label="Services categories"
    >
      {/* ── Left Edge Gradient Vignette with Solid Mask Behind Chevron ──── */}
      <div
        className={`pointer-events-none absolute left-0 top-0 bottom-2.5 z-10 w-32 bg-gradient-to-r from-white from-50% via-white/85 via-75% to-transparent transition-opacity duration-200 ${
          canScrollLeft ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* ── Right Edge Gradient Vignette with Solid Mask Behind Chevron ─── */}
      <div
        className={`pointer-events-none absolute right-0 top-0 bottom-2.5 z-10 w-32 bg-gradient-to-l from-white from-50% via-white/85 via-75% to-transparent transition-opacity duration-200 ${
          canScrollRight ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* ── Left Scroll Chevron Button ────────────────────────────────────── */}
      <AnimatePresence>
        {canScrollLeft && (
          <motion.button
            key="left-chevron"
            type="button"
            initial={{ opacity: 0, scale: 0.8, x: -6 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -6 }}
            transition={{ duration: 0.15 }}
            onClick={() => handleScrollStep("left")}
            aria-label="Scroll categories left"
            className="absolute left-2 top-[18px] -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.14),0_0_0_1px_rgba(0,0,0,0.06)] text-slate-700 hover:text-white hover:bg-[#FF5812] hover:shadow-[0_4px_14px_rgba(255,88,18,0.35)] flex items-center justify-center transition-all duration-150 cursor-pointer active:scale-95"
          >
            <ChevronLeft size={16} className="stroke-[2.5] -translate-x-[0.5px]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Right Scroll Chevron Button ───────────────────────────────────── */}
      <AnimatePresence>
        {canScrollRight && (
          <motion.button
            key="right-chevron"
            type="button"
            initial={{ opacity: 0, scale: 0.8, x: 6 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 6 }}
            transition={{ duration: 0.15 }}
            onClick={() => handleScrollStep("right")}
            aria-label="Scroll categories right"
            className="absolute right-2 top-[18px] -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.14),0_0_0_1px_rgba(0,0,0,0.06)] text-slate-700 hover:text-white hover:bg-[#FF5812] hover:shadow-[0_4px_14px_rgba(255,88,18,0.35)] flex items-center justify-center transition-all duration-150 cursor-pointer active:scale-95"
          >
            <ChevronRight size={16} className="stroke-[2.5] translate-x-[0.5px]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Scrollable Track ──────────────────────────────────────────────── */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className={`flex items-center gap-1.5 overflow-x-auto py-1 pl-1 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
          isOverflowing ? "pr-24" : "pr-2"
        } ${
          isDragging ? "cursor-grabbing" : isOverflowing ? "cursor-grab" : "cursor-default"
        }`}
      >
        {groups.map((group, idx) => {
          const isActive = activeIdx === idx;
          const GroupIcon = group.icon || Bot;

          const handleTabAction = () => {
            if (dragMoved.current) return;
            onSelect(idx);
          };

          return (
            <button
              key={group.title}
              ref={(node) => {
                tabRefs.current[idx] = node;
              }}
              type="button"
              role="tab"
              aria-selected={isActive}
              onMouseEnter={handleTabAction}
              onClick={handleTabAction}
              className={`group/tab relative px-3.5 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-colors duration-150 flex items-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812]/50 ${
                isActive
                  ? "text-white"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
              }`}
            >
              {/* Active Tab Sliding Pill with Spring Motion */}
              {isActive && (
                <motion.div
                  layoutId="activeCategoryTabPill"
                  className="absolute inset-0 rounded-full bg-[#FF5812] shadow-[0_3px_12px_rgba(255,88,18,0.32)]"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              )}

              {/* Tab Content */}
              <span className="relative z-10 flex items-center gap-1.5">
                <GroupIcon
                  size={14}
                  className={`shrink-0 transition-transform duration-150 ${
                    isActive ? "scale-105 stroke-[2.2]" : "text-slate-500 group-hover/tab:text-slate-800"
                  }`}
                />
                <span className="tracking-[-0.01em]">{group.title}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Sleek Micro Progress Indicator Track ─────────────────────────── */}
      <div className="relative w-full h-[1.5px] bg-slate-100 mt-2.5 overflow-hidden rounded-full">
        {isOverflowing && (
          <motion.div
            className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-[#FF5812] via-[#FFA26B] to-[#FF5812] shadow-[0_0_6px_rgba(255,88,18,0.5)]"
            style={{
              width: "25%",
              left: `${scrollProgress * 75}%`,
            }}
            transition={{ ease: "easeOut", duration: 0.1 }}
          />
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main Component: MegaMenuPanel                                             */
/* -------------------------------------------------------------------------- */

export function MegaMenuPanel({
  label: _label,
  groups,
  onClose,
}: {
  label: string;
  groups: MegaMenuGroup[];
  onClose: () => void;
}) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (!groups || groups.length === 0) return null;

  const safeIdx = activeIdx < groups.length ? activeIdx : 0;
  const activeGroup = groups[safeIdx] || groups[0];

  // Distribute only the actual links from the active group across 2 columns
  const links = activeGroup.links || [];
  const mid = Math.ceil(links.length / 2);
  const col2Links = links.slice(0, mid);
  const col3Links = links.slice(mid);

  const headline =
    GROUP_HEADLINES[activeGroup.title] ||
    `${activeGroup.title} Solutions`;

  const bannerUrl =
    activeGroup.url ||
    (links[0] ? links[0].url : "/services");

  return (
    <motion.div
      initial={{ opacity: 0, y: -6, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.995 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto w-full max-w-[1380px] overflow-hidden rounded-[28px] border border-black/[0.08] bg-white p-4 sm:p-5 lg:p-6 shadow-[0_28px_80px_-15px_rgba(10,10,26,0.18),0_4px_20px_rgba(0,0,0,0.04)]"
    >
      {/* =================================================================== */}
      {/* Top Horizontal Tab Scroller — Sleek Agency-Grade UI                 */}
      {/* =================================================================== */}
      {groups.length > 1 && (
        <AdvancedTabScroller
          groups={groups}
          activeIdx={safeIdx}
          onSelect={setActiveIdx}
        />
      )}

      {/* =================================================================== */}
      {/* 4-Column Layout Dynamically Powered by the Active Group             */}
      {/* =================================================================== */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeGroup.title}
          initial={{ opacity: 0.75, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0.75, y: -3 }}
          transition={{ duration: 0.12, ease: "easeOut" }}
          className="flex flex-col lg:flex-row gap-5 xl:gap-6 items-stretch w-full"
        >
          {/* ================================================================= */}
          {/* Column 1: Promo / Overview Banner with Wave Mesh Vector          */}
          {/* ================================================================= */}
          <div className="relative w-full lg:w-[320px] xl:w-[350px] shrink-0 overflow-hidden rounded-2xl border border-slate-200/70 bg-gradient-to-br from-[#F8FAFC] via-[#F4F6F9] to-[#FFF9F5] p-6 xl:p-7 flex flex-col justify-between">
            {/* Subtle warm orange wavy mesh at bottom */}
            <div className="pointer-events-none absolute -bottom-4 -left-6 w-[125%] h-44 overflow-hidden opacity-55">
              <svg viewBox="0 0 500 200" fill="none" className="w-full h-full">
                <path
                  d="M-20 150 C100 80, 220 190, 480 90"
                  stroke="url(#orangeLine1)"
                  strokeWidth="1.8"
                />
                <path
                  d="M-10 165 C110 95, 240 180, 500 105"
                  stroke="url(#orangeLine2)"
                  strokeWidth="1.4"
                />
                <path
                  d="M-30 135 C90 65, 200 175, 460 75"
                  stroke="url(#orangeLine1)"
                  strokeWidth="1.0"
                />
                <path
                  d="M0 180 C130 110, 260 170, 520 120"
                  stroke="url(#orangeLine2)"
                  strokeWidth="0.8"
                />
                <path
                  d="M10 195 C140 120, 280 185, 540 135"
                  stroke="url(#orangeLine1)"
                  strokeWidth="0.6"
                />
                <defs>
                  <linearGradient id="orangeLine1" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF5812" stopOpacity="0.9" />
                    <stop offset="60%" stopColor="#FFA26B" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#FFD2B8" stopOpacity="0.05" />
                  </linearGradient>
                  <linearGradient id="orangeLine2" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF7A26" stopOpacity="0.75" />
                    <stop offset="70%" stopColor="#FF5812" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#FF5812" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Banner content */}
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <div className="mb-3">
                  <span className="text-[11px] font-bold tracking-[0.14em] text-slate-400 uppercase">
                    {activeGroup.title}
                  </span>
                </div>
                <h3 className="text-[22px] xl:text-[24px] font-extrabold leading-[1.18] tracking-tight text-[#0f172a] mb-3">
                  {headline}
                </h3>
                {activeGroup.description && (
                  <p className="text-[13px] leading-relaxed text-slate-500 font-normal">
                    {activeGroup.description}
                  </p>
                )}
              </div>
              <div className="pt-7 mt-auto">
                <Link
                  href={bannerUrl}
                  onClick={onClose}
                  className="group inline-flex items-center gap-2 rounded-full bg-[#FF5812] px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_4px_16px_rgba(255,88,18,0.32)] transition-all duration-150 hover:bg-[#e64a09] hover:shadow-[0_6px_20px_rgba(255,88,18,0.4)]"
                >
                  <span>Explore {activeGroup.title}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* Column 2: First Half of Actual Links (with orange icons)          */}
          {/* ================================================================= */}
          <div className="flex-1 min-w-[240px] flex flex-col justify-start">
            <div className="text-[11px] font-bold tracking-[0.14em] text-slate-400 uppercase mb-3 px-2">
              SERVICES &amp; SOLUTIONS
            </div>
            <div className="flex flex-col gap-1">
              {col2Links.map((link) => {
                const LinkIcon = link.icon || Bot;
                return (
                  <Link
                    key={link.label}
                    href={link.url}
                    onClick={onClose}
                    className="group flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors duration-100"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-[#FFF2EB] text-[#FF5812] flex items-center justify-center shrink-0">
                        <LinkIcon size={16} />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[13px] font-bold text-slate-900 group-hover:text-[#FF5812] transition-colors block leading-snug">
                          {link.label}
                        </span>
                        {link.description && (
                          <span className="text-[11px] text-slate-400 block leading-tight truncate">
                            {link.description}
                          </span>
                        )}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#FF5812] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ================================================================= */}
          {/* Column 3: Second Half of Actual Links                             */}
          {/* ================================================================= */}
          <div className="flex-1 min-w-[240px] flex flex-col justify-start">
            <div className="text-[11px] font-bold tracking-[0.14em] text-slate-400 uppercase mb-3 px-2">
              {col3Links.length > 0 ? "SPECIALIZATIONS & CAPABILITIES" : "OVERVIEW"}
            </div>
            <div className="flex flex-col gap-1">
              {col3Links.length > 0 ? (
                col3Links.map((link) => {
                  const LinkIcon = link.icon || Bot;
                  return (
                    <Link
                      key={link.label}
                      href={link.url}
                      onClick={onClose}
                      className="group flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors duration-100"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-[#FFF2EB] text-[#FF5812] flex items-center justify-center shrink-0">
                          <LinkIcon size={16} />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[13px] font-bold text-slate-900 group-hover:text-[#FF5812] transition-colors block leading-snug">
                            {link.label}
                          </span>
                          {link.description && (
                            <span className="text-[11px] text-slate-400 block leading-tight truncate">
                              {link.description}
                            </span>
                          )}
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#FF5812] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                    </Link>
                  );
                })
              ) : (
                <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100/80 text-[12px] text-slate-500 leading-relaxed">
                  Tailored engineering and consulting pods designed to accelerate your {activeGroup.title.toLowerCase()} initiatives with reliable delivery.
                </div>
              )}
            </div>
          </div>

          {/* ================================================================= */}
          {/* Column 4: FEATURED Image Card                                     */}
          {/* ================================================================= */}
          <div className="w-full lg:w-[280px] xl:w-[310px] shrink-0 flex flex-col">
            <div className="text-[11px] font-bold tracking-[0.14em] text-slate-400 uppercase mb-3 px-1">
              FEATURED
            </div>
            <div className="relative flex-1 min-h-[380px] rounded-2xl overflow-hidden group shadow-sm flex flex-col justify-end p-4 sm:p-5 text-white">
              {/* Background image - framed to show face & glasses in upper portion */}
              <img
                src="/images/nav/ai-featured.jpg"
                alt="Featured"
                className="absolute inset-0 w-full h-full object-cover object-[center_15%] transition-transform duration-500 ease-out group-hover:scale-105"
              />
              {/* Dark gradient overlay only covering the lower 42% */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 via-42% to-transparent pointer-events-none" />

              {/* Featured card inner content - anchored to bottom */}
              <div className="relative z-10 flex flex-col">
                <span className="text-[10.5px] font-extrabold tracking-widest text-[#FF5812] uppercase mb-1 drop-shadow">
                  {activeGroup.title.toUpperCase()}
                </span>
                <h4 className="text-[16px] xl:text-[17px] font-extrabold leading-snug text-white mb-1.5">
                  Turn Strategy into Real Results
                </h4>
                <p className="text-[11.5px] text-slate-200 leading-snug mb-3 font-normal max-w-[260px] line-clamp-2">
                  Work with our specialized engineering teams to build, scale, and deliver digital products.
                </p>
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-white hover:bg-slate-100 text-slate-900 font-bold text-[12px] py-2 px-3.5 shadow-md transition-all group/btn"
                >
                  <span>Talk to Our Team</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
