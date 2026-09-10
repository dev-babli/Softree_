"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FlowButton } from "@/components/ui/flow-button";

/* =========================================================
 * 1. FAN CARD STACK COMPONENT (Isolated for this section)
 * ========================================================= */
function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

type FanCardStackItem = {
  id: string | number;
  title: string;
  description?: string;
  [key: string]: any;
};

type FanCardStackProps<T extends FanCardStackItem> = {
  items: T[];
  initialIndex?: number;
  maxVisible?: number;
  cardWidth?: number;
  cardHeight?: number;
  overlap?: number;
  spreadDeg?: number;
  perspectivePx?: number;
  depthPx?: number;
  tiltXDeg?: number;
  activeLiftPx?: number;
  activeScale?: number;
  inactiveScale?: number;
  springStiffness?: number;
  springDamping?: number;
  loop?: boolean;
  autoAdvance?: boolean;
  intervalMs?: number;
  pauseOnHover?: boolean;
  showDots?: boolean;
  className?: string;
  onChangeIndex?: (index: number, item: T) => void;
  renderCard?: (item: T, state: { active: boolean }) => React.ReactNode;
};

function wrapIndex(n: number, len: number) {
  if (len <= 0) return 0;
  return ((n % len) + len) % len;
}

function signedOffset(i: number, active: number, len: number, loop: boolean) {
  const raw = i - active;
  if (!loop || len <= 1) return raw;
  const alt = raw > 0 ? raw - len : raw + len;
  return Math.abs(alt) < Math.abs(raw) ? alt : raw;
}

function FanCardStack<T extends FanCardStackItem>({
  items,
  initialIndex = 0,
  maxVisible = 7,
  cardWidth = 520,
  cardHeight = 320,
  overlap = 0.48,
  spreadDeg = 48,
  perspectivePx = 1100,
  depthPx = 140,
  tiltXDeg = 12,
  activeLiftPx = 22,
  activeScale = 1.03,
  inactiveScale = 0.94,
  springStiffness = 280,
  springDamping = 28,
  loop = true,
  autoAdvance = false,
  intervalMs = 2800,
  pauseOnHover = true,
  showDots = true,
  className,
  onChangeIndex,
  renderCard,
}: FanCardStackProps<T>) {
  const reduceMotion = useReducedMotion();
  const len = items.length;

  const [active, setActive] = React.useState(() => wrapIndex(initialIndex, len));
  const [hovering, setHovering] = React.useState(false);

  React.useEffect(() => {
    setActive((a) => wrapIndex(a, len));
  }, [len]);

  React.useEffect(() => {
    if (!len) return;
    onChangeIndex?.(active, items[active]!);
  }, [active]);

  const maxOffset = Math.max(0, Math.floor(maxVisible / 2));
  const cardSpacing = Math.max(10, Math.round(cardWidth * (1 - overlap)));
  const stepDeg = maxOffset > 0 ? spreadDeg / maxOffset : 0;

  const canGoPrev = loop || active > 0;
  const canGoNext = loop || active < len - 1;

  const prev = React.useCallback(() => {
    if (!len || !canGoPrev) return;
    setActive((a) => wrapIndex(a - 1, len));
  }, [canGoPrev, len]);

  const next = React.useCallback(() => {
    if (!len || !canGoNext) return;
    setActive((a) => wrapIndex(a + 1, len));
  }, [canGoNext, len]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  React.useEffect(() => {
    if (!autoAdvance || reduceMotion || !len || (pauseOnHover && hovering)) return;
    const id = window.setInterval(() => {
      if (loop || active < len - 1) next();
    }, Math.max(700, intervalMs));
    return () => window.clearInterval(id);
  }, [autoAdvance, intervalMs, hovering, pauseOnHover, reduceMotion, len, loop, active, next]);

  if (!len) return null;

  return (
    <div
      className={cn("w-full", className)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div
        className="relative w-full focus:outline-none"
        style={{ height: Math.max(380, cardHeight + 80) }}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <div
          className="absolute inset-0 flex items-end justify-center"
          style={{ perspective: `${perspectivePx}px` }}
        >
          <AnimatePresence initial={false}>
            {items.map((item, i) => {
              const off = signedOffset(i, active, len, loop);
              const abs = Math.abs(off);
              const visible = abs <= maxOffset;

              if (!visible) return null;

              const rotateZ = off * stepDeg;
              const x = off * cardSpacing;
              const y = abs * 10;
              const z = -abs * depthPx;

              const isActive = off === 0;
              const scale = isActive ? activeScale : inactiveScale;
              const lift = isActive ? -activeLiftPx : 0;
              const rotateX = isActive ? 0 : tiltXDeg;
              const zIndex = 100 - abs;

              const dragProps = isActive
                ? {
                    drag: "x" as const,
                    dragConstraints: { left: 0, right: 0 },
                    dragElastic: 0.18,
                    onDragEnd: (_e: any, info: { offset: { x: number }; velocity: { x: number } }) => {
                      if (reduceMotion) return;
                      const travel = info.offset.x;
                      const v = info.velocity.x;
                      const threshold = Math.min(160, cardWidth * 0.22);
                      if (travel > threshold || v > 650) prev();
                      else if (travel < -threshold || v < -650) next();
                    },
                  }
                : {};

              return (
                <motion.div
                  key={item.id}
                  className={cn(
                    "absolute bottom-0 rounded-2xl overflow-hidden shadow-xl",
                    "will-change-transform select-none",
                    isActive ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"
                  )}
                  style={{
                    width: cardWidth,
                    height: cardHeight,
                    zIndex,
                    transformStyle: "preserve-3d",
                  }}
                  initial={reduceMotion ? false : { opacity: 0, y: y + 40, x, rotateZ, rotateX, scale }}
                  animate={{ opacity: 1, x, y: y + lift, rotateZ, rotateX, scale }}
                  transition={{ type: "spring", stiffness: springStiffness, damping: springDamping }}
                  onClick={() => setActive(i)}
                  {...dragProps}
                >
                  <div
                    className="h-full w-full"
                    style={{ transform: `translateZ(${z}px)`, transformStyle: "preserve-3d" }}
                  >
                    {renderCard ? (
                      renderCard(item, { active: isActive })
                    ) : (
                      <DefaultFanCard item={item} active={isActive} />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {showDots && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            {items.map((it, idx) => (
              <button
                key={it.id}
                onClick={() => setActive(idx)}
                className={cn(
                  "h-2 w-2 rounded-full transition",
                  idx === active ? "bg-[#FF5812]" : "bg-[#0a0a1a]/20 hover:bg-[#0a0a1a]/40"
                )}
                aria-label={`Go to ${it.title}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DefaultFanCard({ item }: { item: FanCardStackItem; active: boolean }) {
  return (
    <div className="relative h-full w-full">
      {/* image */}
      <div className="absolute inset-0">
        {item.imageSrc ? (
          <img
            src={item.imageSrc}
            alt={item.title}
            className="h-full w-full object-cover"
            draggable={false}
            loading="eager"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary text-sm text-muted-foreground">
            No image
          </div>
        )}
      </div>

      {/* subtle gradient overlay at bottom for text readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* content */}
      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-8">
        <div className="truncate text-lg font-bold text-white">
          {item.title}
        </div>
        {item.description ? (
          <div className="mt-2 flex flex-col gap-1 text-[13px] leading-snug text-white/90">
            {item.description.split("? ").map((part: string, idx: number, arr: any[]) => (
              <span key={idx} className={idx === 0 ? "font-semibold" : "text-white/70"}>
                {part}{idx < arr.length - 1 ? "?" : ""}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* =========================================================
 * 2. WHO DO WE SERVE SECTION
 * ========================================================= */
const CARDS = [
  {
    id: "01",
    title: "01 — CEOs & Business Leaders",
    description: "Looking to grow your technology capabilities without growing your overhead? Scale delivery with an experienced offshore engineering partner.",
    imageSrc: "https://cdn.21st.dev/assets/mirror/1c/1c40e9d2fc325643f20991f6c4361c803b8d0ad690ad1e7529c7377151a282eb.jpg",
  },
  {
    id: "02",
    title: "02 — CTOs & Technology Leaders",
    description: "Need additional engineering capacity or specialized expertise? Extend your team with Microsoft-certified engineers, AI specialists, and cloud capabilities.",
    imageSrc: "https://cdn.21st.dev/assets/mirror/ba/baa07e4ac6f0a4420a74083de7959083153be3dbfa7732dc26378fb69c1bf2eb.jpg",
  },
  {
    id: "03",
    title: "03 — Microsoft Partners & Consultancies",
    description: "Need a trusted delivery partner behind your client engagements? Use Softree as your offshore, white-label engineering team.",
    imageSrc: "https://cdn.21st.dev/assets/mirror/80/80e27ca27a44306f03e4708cb8a7d622e480996fdb40955ecbe735109c62ca69.jpg",
  },
  {
    id: "04",
    title: "04 — Digital Agencies",
    description: "Have more client work than your team can deliver? Expand your delivery capacity without expanding your internal team.",
    imageSrc: "https://cdn.21st.dev/assets/mirror/5c/5c9f812d112ce28b3524a9bc44bc65ad85da3958f45492845ba060af904cb189.jpg",
  },
  {
    id: "05",
    title: "05 — Product & SaaS Companies",
    description: "Need to build faster or extend your product engineering team? Add flexible offshore engineering capability.",
    imageSrc: "https://cdn.21st.dev/assets/mirror/37/37ea3835df0f51289154b990eb4d61b95b3ad63d4bf71cd79554cc56f2f134a8.jpg",
  },
];

export default function WhoDoWeServeSection() {
  return (
    <section className="relative w-full bg-[#F3F0EE] pt-12 pb-12 md:pt-16 md:pb-16 border-t border-[#0a0a1a]/[0.06] overflow-hidden">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
        
        {/* Section Header */}
        <div className="mb-10 md:mb-16 flex flex-col items-center text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FF5812]/20 bg-[#FF5812]/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#FF5812]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5812]"></span>
            WHO DO WE SERVE
          </span>
          <h2 className="text-balance text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[#0a0a1a]">
            Who Do We Serve?
          </h2>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-[#0a0a1a]/70 font-medium">
            We help businesses, technology teams, and service providers extend their capabilities with offshore engineering, Agentic AI, and Microsoft expertise.
          </p>
        </div>

        {/* Card Stack Content */}
        <div className="mx-auto max-w-4xl w-full">
          <FanCardStack 
            items={CARDS} 
            autoAdvance={true}
            intervalMs={4000}
            cardWidth={520}
            cardHeight={360}
          />
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 md:mt-16 flex flex-col items-center text-center border-t border-[#0a0a1a]/[0.06] pt-10 md:pt-12">
          <h3 className="text-lg md:text-xl font-semibold tracking-tight text-[#0a0a1a] max-w-4xl">
            Whatever you&apos;re building, modernizing, or scaling, we&apos;re ready to work alongside you.
          </h3>
          <FlowButton href="/contact" text="Explore Who We Serve" className="mt-8" />
        </div>

      </div>
    </section>
  );
}
