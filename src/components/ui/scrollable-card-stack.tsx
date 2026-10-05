"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { Sparkles, ArrowRight } from "lucide-react";

export interface CardItem {
  avatar?: string;
  handle?: string;
  href?: string;
  id: string;
  image?: string;
  name: string;
  tag?: string;
  description?: string;
  howSoftreeHelps?: string;
  highlights?: string[];
  ctaText?: string;
}

export interface ScrollableCardStackProps {
  autoPlay?: boolean;
  autoPlayInterval?: number;
  cardHeight?: number;
  cardWidth?: number;
  className?: string;
  items: CardItem[];
  perspective?: number;
  transitionDuration?: number;
}

export const ScrollableCardStack: React.FC<ScrollableCardStackProps> = ({
  items,
  autoPlay = true,
  autoPlayInterval = 3800,
  cardWidth = 1180,
  className,
}) => {
  const [cards, setCards] = useState<CardItem[]>(items);

  // Sync if items array changes
  useEffect(() => {
    setCards(items);
  }, [items]);

  // Seamless auto-play rotation
  useEffect(() => {
    if (!autoPlay || cards.length <= 1) return;

    const interval = setInterval(() => {
      setCards((prevCards: CardItem[]) => {
        const newArray = [...prevCards];
        const first = newArray.shift();
        if (first) {
          newArray.push(first);
        }
        return newArray;
      });
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, cards.length]);

  const activeOriginalIndex = items.findIndex((it) => it.id === cards[0]?.id);

  const handleSelectCard = useCallback((targetId: string) => {
    setCards((prev) => {
      const idx = prev.findIndex((c) => c.id === targetId);
      if (idx <= 0) return prev;
      const copy = [...prev];
      const removed = copy.splice(0, idx);
      return [...copy, ...removed];
    });
  }, []);

  return (
    <div className={cn("relative mx-auto w-full flex flex-col items-center", className)}>
      {/* Top Header Controls: Active Card Counter + Progress Dots */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-6 px-2 sm:px-4">
        <div className="flex items-center gap-2">
          {items.map((item, idx) => {
            const isCurrent = idx === activeOriginalIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectCard(item.id)}
                aria-label={`Go to slide ${idx + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500 cursor-pointer",
                  isCurrent
                    ? "w-8 bg-[#FF5812] shadow-[0_0_12px_rgba(255,88,18,0.6)]"
                    : "w-2.5 bg-zinc-300 dark:bg-white/20 hover:bg-zinc-400 dark:hover:bg-white/40"
                )}
              />
            );
          })}
        </div>

        <span className="text-xs font-mono font-bold text-zinc-500 dark:text-zinc-400 tracking-wider">
          0{Math.max(1, activeOriginalIndex + 1)} / 0{items.length}
        </span>
      </div>

      {/* 3D Stack Container */}
      <div
        className="relative w-full max-w-6xl h-[460px] sm:h-[420px] md:h-[390px] flex justify-center"
        style={{ perspective: "1000px" }}
      >
        {cards.map((item, index) => {
          const isTop = index === 0;
          const isVisible = index < 3;

          // Only render visible layers for performance
          if (!isVisible && index !== cards.length - 1) return null;

          return (
            <motion.div
              key={item.id}
              layout
              initial={false}
              animate={{
                top: index * -15,
                scale: 1 - index * 0.045,
                zIndex: cards.length - index,
                opacity: index === 0 ? 1 : index === 1 ? 0.75 : index === 2 ? 0.4 : 0,
              }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1], // Smooth Apple-style spring-ease
              }}
              style={{
                transformOrigin: "top center",
                maxWidth: `${cardWidth}px`,
                width: "100%",
              }}
              className={cn(
                "absolute left-0 right-0 mx-auto overflow-hidden rounded-2xl sm:rounded-3xl border select-none transition-colors duration-300",
                "bg-gradient-to-br from-[#12131D] via-[#0E0F17] to-[#08080E] text-white shadow-2xl",
                "p-5 sm:p-6 md:p-7 lg:p-8 flex flex-col justify-between",
                "h-[440px] sm:h-[400px] md:h-[370px]",
                isTop
                  ? "border-[#FF5812]/50 shadow-[0_25px_60px_rgba(255,88,18,0.18)] pointer-events-auto"
                  : "border-white/10 pointer-events-none"
              )}
            >
              {/* Subtle background ambient layer */}
              {item.image && (
                <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                  <img
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover opacity-15 filter grayscale"
                    loading="lazy"
                    src={item.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08080E] via-[#0E0F18]/90 to-[#141522]/95" />
                  <div className="absolute -top-12 -right-12 h-56 w-56 rounded-full bg-[#FF5812]/15 blur-3xl pointer-events-none" />
                </div>
              )}

              {/* Top Bar: Tag pill + Index badge */}
              <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2.5 sm:pb-3">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#FF5812] backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF5812] shadow-[0_0_8px_#FF5812]" />
                  <span className="truncate max-w-[220px] sm:max-w-none">{item.tag || item.handle || "LANGCHAIN CAPABILITY"}</span>
                </div>

                <span className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-0.5 text-[10px] sm:text-xs font-mono font-semibold text-white/70">
                  {item.handle || `SERVICE 0${(items.findIndex((it) => it.id === item.id) + 1)}`}
                </span>
              </div>

              {/* Main Card Content */}
              <div className="my-auto py-1 flex flex-col justify-center gap-2 sm:gap-3">
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[1.65rem] font-extrabold tracking-tight text-white leading-tight">
                    {item.name}
                  </h3>

                  {item.description && (
                    <p className="mt-1 text-xs sm:text-sm leading-relaxed text-zinc-300 max-w-4xl font-normal line-clamp-3 sm:line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Highlights Grid */}
                {item.highlights && item.highlights.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-0.5">
                    {item.highlights.map((highlight, hIdx) => (
                      <div
                        key={hIdx}
                        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] p-2 sm:p-2.5 text-[11px] sm:text-xs font-medium text-white/90 backdrop-blur-sm shadow-sm"
                      >
                        <Sparkles className="h-3.5 w-3.5 text-[#FF5812] shrink-0" />
                        <span className="leading-snug truncate sm:whitespace-normal">{highlight}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Row: Orange CTA Button + Status */}
              <div className="pt-2 sm:pt-2.5 border-t border-white/10 flex items-center justify-between gap-4">
                <a
                  href={item.href || "#"}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#FF5812] to-[#FF7A00] px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-[#FF5812]/25 hover:brightness-110 hover:scale-[1.02] transition-all"
                >
                  <span>{item.ctaText || "Explore Capability"}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>

                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-zinc-400 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="hidden sm:inline">Auto-cycling solutions</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollableCardStack;
