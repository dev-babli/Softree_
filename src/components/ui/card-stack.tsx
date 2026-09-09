"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type CardStackItem = {
  id: string | number;
  title?: string;
  description?: string;
  [key: string]: any;
};

interface CardStackProps {
  items: CardStackItem[];
  offset?: number;
  scaleFactor?: number;
  autoAdvance?: boolean;
  intervalMs?: number;
  showDots?: boolean;
  cardWidth?: number | string;
  cardHeight?: number | string;
  renderCard?: (
    item: CardStackItem,
    state: { active: boolean; index: number }
  ) => React.ReactNode;
}

export const CardStack = ({
  items,
  offset = 10,
  scaleFactor = 0.06,
  autoAdvance = false,
  intervalMs = 4000,
  showDots = true,
  cardWidth = 480,
  cardHeight = 360,
  renderCard,
}: CardStackProps) => {
  const [cards, setCards] = useState<CardStackItem[]>(items);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setCards(items);
    setActiveIndex(0);
  }, [items]);

  useEffect(() => {
    if (!autoAdvance || cards.length <= 1) return;
    const interval = setInterval(() => {
      setCards((prev) => {
        const next = [...prev];
        const first = next.shift();
        if (first) next.push(first);
        return next;
      });
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [autoAdvance, intervalMs, cards.length, items.length]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div
        className="relative flex items-center justify-center"
        style={{
          width: typeof cardWidth === "number" ? `${cardWidth}px` : cardWidth,
          maxWidth: "100%",
          height: typeof cardHeight === "number" ? `${cardHeight}px` : cardHeight,
        }}
      >
        <AnimatePresence mode="popLayout">
          {cards.slice(0, 3).map((card, index) => {
            const isTop = index === 0;
            return (
              <motion.div
                key={card.id}
                className="absolute inset-0 cursor-pointer"
                style={{
                  transformOrigin: "top center",
                }}
                animate={{
                  top: index * -offset,
                  scale: 1 - index * scaleFactor,
                  zIndex: cards.length - index,
                }}
                exit={{
                  opacity: 0,
                  y: 40,
                  transition: { duration: 0.3 },
                }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                onClick={() => {
                  setCards((prev) => {
                    const next = [...prev];
                    const first = next.shift();
                    if (first) next.push(first);
                    return next;
                  });
                  setActiveIndex((prev) => (prev + 1) % items.length);
                }}
              >
                {renderCard ? (
                  renderCard(card, { active: isTop, index })
                ) : (
                  <div className="h-full w-full bg-white rounded-2xl p-6 border border-zinc-200 shadow-md">
                    <h4 className="text-xl font-bold">{card.title}</h4>
                    <p className="text-sm text-zinc-500 mt-2">{card.description}</p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {showDots && (
        <div className="flex items-center gap-2 mt-6">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to card ${i + 1}`}
              onClick={() => {
                setActiveIndex(i);
                // Rotate array so i-th original card is at front
                const target = items[i];
                const currentIndex = cards.findIndex((c) => c.id === target.id);
                if (currentIndex !== -1) {
                  setCards((prev) => {
                    const rot = [...prev];
                    for (let step = 0; step < currentIndex; step++) {
                      const item = rot.shift();
                      if (item) rot.push(item);
                    }
                    return rot;
                  });
                }
              }}
              className={`h-2 rounded-full transition-all duration-300 ${activeIndex === i ? "w-7 bg-[#FF6B2C]" : "w-2 bg-zinc-300"
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
