"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BentoCoverImage } from "./BentoCoverImage";
import { BENTO_VIEWPORT, captionStagger, panelReveal, previewSwap } from "./bento.motion";
import { ArrowRight } from "lucide-react";

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
        "relative min-h-[34rem] md:min-h-[32rem] lg:min-h-[34rem] overflow-hidden rounded-xl border bg-[#111111]",
        isBlue ? "border-[#d7dce9]" : "border-[#EAEAEA] shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
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
            className="absolute inset-0 flex flex-col items-stretch overflow-hidden bg-[#0d0d0f]"
            {...swap}
            style={{ willChange: "opacity" }}
          >
            {/* Top Row — Full Cover Image (No Text) */}
            <div 
              className="w-full flex-1 relative min-h-[220px] overflow-hidden z-10 border-b border-zinc-800"
              style={{
                backgroundImage: "linear-gradient(135deg, #0d0d0f 0%, #050507 100%)",
              }}
            >
              {/* Glowing gradient ambient background layer behind the image */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none transition-all duration-500"
                style={{
                  background: isBlue
                    ? "radial-gradient(circle at center, rgba(15,92,192,0.35), transparent 70%)"
                    : "radial-gradient(circle at center, rgba(255,88,18,0.25), transparent 70%)"
                }}
              />
              {/* Blurred under-layer for aesthetic depth */}
              <div className="absolute inset-0 z-0 opacity-35 blur-3xl scale-110 overflow-hidden select-none pointer-events-none">
                <BentoCoverImage
                  src={item.image}
                  alt=""
                  sizes="10px"
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Main Full-Cover Image */}
              <div className="absolute inset-0 z-10 w-full h-full flex items-center justify-center">
                <BentoCoverImage
                  src={item.image}
                  alt={item.title}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain md:object-cover object-center md:object-top w-full h-full"
                  priority
                />
              </div>
            </div>

            {/* Bottom Row — Text & Gradient Background */}
            <div 
              className="w-full p-5 md:p-6 lg:p-7 flex flex-col justify-center relative z-20"
              style={{
                backgroundImage: "linear-gradient(135deg, #121215 0%, #08080a 100%)",
              }}
            >
              {/* Subtle background glow matching the category accent */}
              <div 
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  background: isBlue
                    ? "radial-gradient(circle at 10% 10%, rgba(15,92,192,0.4), transparent 50%)"
                    : "radial-gradient(circle at 10% 10%, rgba(255,88,18,0.3), transparent 50%)"
                }}
              />

              <motion.div
                className="flex flex-col justify-center relative z-10"
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
                    className="mt-4 max-w-2xl text-balance font-serif text-xl md:text-2xl lg:text-[1.85rem] font-bold leading-[1.25] tracking-[-0.025em] text-white"
                  >
                    {item.title}
                  </motion.h3>
                  {item.excerpt ? (
                    <motion.p
                      variants={caption}
                      className="mt-3.5 max-w-xl text-pretty text-xs md:text-sm leading-relaxed text-white/70 line-clamp-3 md:line-clamp-4"
                    >
                      {item.excerpt}
                    </motion.p>
                  ) : null}
                </div>
                
                {item.href ? (
                  <motion.div variants={caption} className="mt-4 md:mt-5">
                    <Link
                      href={item.href}
                      className={cn(
                        "group inline-flex items-center gap-1.5 transition-[transform,background-color,border-color] duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                        ctaClass,
                      )}
                    >
                      <span>{item.ctaLabel ?? (isBlue ? "Read article" : "Open case study")}</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                  </motion.div>
                ) : null}
              </motion.div>
            </div>
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
