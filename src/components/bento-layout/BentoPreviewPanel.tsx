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
            className="absolute inset-0 overflow-hidden bg-[#111111]"
            {...swap}
            style={{ willChange: "opacity" }}
          >
            {/* Layer 1 — Blurred background of the same image to create a rich colored halo/context */}
            <div className="absolute inset-0 z-0 opacity-20 blur-2xl scale-110 overflow-hidden select-none pointer-events-none">
              <BentoCoverImage
                src={item.image}
                alt=""
                sizes="10px"
                className="object-cover w-full h-full"
              />
            </div>

            {/* Layer 2 — Floating full-bleed image (no left-right space, no cropping) */}
            <div className="absolute inset-x-0 top-0 bottom-48 z-10 overflow-hidden flex items-start">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto object-top"
              />
            </div>

            {/* Layer 3 — Dark gradient overlay at the bottom for readability */}
            <div 
              className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#111111] via-[#111111]/92 to-transparent z-20 pointer-events-none" 
              aria-hidden 
            />

            {/* Layer 4 — Text content overlay */}
            <motion.div
              className="absolute inset-x-0 bottom-0 p-6 md:p-8 z-30 flex flex-col justify-end"
              style={{ minHeight: "12rem" }}
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
              <div>
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
                  className="mt-3 max-w-2xl text-balance font-serif text-xl leading-[1.2] tracking-[-0.025em] text-white md:text-2xl lg:text-[1.85rem]"
                >
                  {item.title}
                </motion.h3>
                {item.excerpt ? (
                  <motion.p
                    variants={caption}
                    className="mt-2.5 max-w-xl text-pretty text-xs leading-relaxed text-white/75 md:text-sm line-clamp-2"
                  >
                    {item.excerpt}
                  </motion.p>
                ) : null}
              </div>
              {item.href ? (
                <motion.div variants={caption} className="mt-4">
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
