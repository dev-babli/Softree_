"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BentoCoverImage } from "./BentoCoverImage";
import { BENTO_VIEWPORT, captionStagger, panelReveal, previewSwap } from "./bento.motion";

export type BentoPreviewItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  href?: string;
  excerpt?: string;
  ctaLabel?: string;
};

type BentoPreviewPanelProps = {
  item: BentoPreviewItem | null;
  reduced: boolean;
  accent?: "orange" | "blue";
  className?: string;
};

export function BentoPreviewPanel({
  item,
  reduced,
  accent = "orange",
  className,
}: BentoPreviewPanelProps) {
  const swap = previewSwap(reduced);
  const caption = captionStagger(reduced);
  const isBlue = accent === "blue";

  const badgeClass = isBlue
    ? "border-[#0f5cc0]/40 bg-[#0f5cc0]/15 text-[#7eb8ff]"
    : "border-[#FF5812]/35 bg-[#FF5812]/10 text-[#ffb899]";

  const ctaClass = isBlue
    ? "rounded-md border border-white bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-[#181818] hover:bg-[#f0f1f4]"
    : "border-b border-white/45 pb-0.5 text-sm font-medium text-white hover:border-white";

  return (
    <motion.div
      className={cn(
        "relative min-h-[22rem] overflow-hidden rounded-lg border bg-[#111111] lg:min-h-[30rem]",
        isBlue ? "border-[#EAEAEA]" : "border-[#EAEAEA] shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
        className,
      )}
      initial="hidden"
      whileInView="visible"
      viewport={BENTO_VIEWPORT}
      variants={panelReveal(reduced, 0.06)}
      style={{ willChange: reduced ? undefined : "transform" }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {item ? (
          <motion.div
            key={item.id}
            className="absolute inset-0"
            {...swap}
            style={{ willChange: "opacity" }}
          >
            <div className="relative h-full w-full">
              <BentoCoverImage
                src={item.image}
                alt={item.title}
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </div>
            <div aria-hidden className="absolute inset-0 bg-[#111111]/30" />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-[#111111]/92 via-[#111111]/30 to-transparent"
            />

            <motion.div
              className="absolute inset-x-0 bottom-0 p-6 md:p-8"
              variants={{
                visible: {
                  transition: reduced
                    ? { duration: 0 }
                    : { staggerChildren: 0.05, delayChildren: 0.08 },
                },
              }}
              initial="hidden"
              animate="visible"
            >
              <motion.span
                variants={caption}
                className={cn(
                  "inline-flex rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]",
                  badgeClass,
                )}
              >
                {item.category}
              </motion.span>
              <motion.h3
                variants={caption}
                className="mt-3 max-w-2xl text-balance font-serif text-2xl leading-[1.12] tracking-[-0.03em] text-white md:text-[2rem]"
              >
                {item.title}
              </motion.h3>
              {item.excerpt ? (
                <motion.p
                  variants={caption}
                  className="mt-2 max-w-xl text-pretty text-sm leading-relaxed text-white/75 md:text-[15px]"
                >
                  {item.excerpt}
                </motion.p>
              ) : null}
              {item.href ? (
                <motion.div variants={caption} className="mt-5">
                  <Link
                    href={item.href}
                    className={cn(
                      "inline-flex transition-[transform,background-color,border-color] duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                      ctaClass,
                    )}
                  >
                    {item.ctaLabel ?? (isBlue ? "Read article" : "Open case study")}
                  </Link>
                </motion.div>
              ) : null}
            </motion.div>
          </motion.div>
        ) : (
          <div className="flex h-full min-h-[22rem] items-center justify-center text-sm text-white/40">
            Select an item
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
