"use client";

import React from "react";
import { motion } from "framer-motion";

export type MarqueeItem =
  | { id: string; type: "spacer" }
  | {
      id: string;
      type: "banner";
      bgImage: string;
      title?: string;
      subtitle?: string;
    };

export const MARQUEE_DATA: MarqueeItem[] = [
  { id: "s1", type: "spacer" },
  { id: "s2", type: "spacer" },
  {
    id: "b1",
    type: "banner",
    bgImage:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800",
    title: "Transforming Business Operations",
    subtitle: "AutoFlow is a product that enables automation of business processes.",
  },
  { id: "s3", type: "spacer" },
  { id: "s4", type: "spacer" },
  {
    id: "b2",
    type: "banner",
    bgImage:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=800",
  },
  { id: "s5", type: "spacer" },
  { id: "s6", type: "spacer" },
  {
    id: "b3",
    type: "banner",
    bgImage:
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800",
    title: "Unlock the future of education",
  },
  { id: "s7", type: "spacer" },
];

export default function MarqueeCarousel() {
  // Duplicate the array to create the endless illusion
  const doubledItems = [...MARQUEE_DATA, ...MARQUEE_DATA];

  return (
    <div className="w-full bg-black py-12 text-white overflow-hidden flex flex-col items-center justify-center font-sans">
      
      {/* Header Section */}
      <div className="w-full max-w-6xl px-6 mb-8 flex justify-between items-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-100">
          Phenomenon is Waiting for <span className="text-orange-500">Your Message</span>
        </h2>
        {/* Decorative Asterisk */}
        <span className="text-orange-500 text-3xl font-serif animate-spin-slow">★</span>
      </div>

      {/* Marquee Wrapper Container */}
      <div className="relative w-full overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-20 before:bg-gradient-to-r before:from-black before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-20 after:bg-gradient-to-l after:from-black after:to-transparent">
        
        {/* Framer Motion Track */}
        <motion.div
          className="flex gap-4 w-max px-4"
          animate={{ x: [0, "-50%"] }}
          transition={{
            ease: "linear",
            duration: 25, // Adjust speed here (higher = slower)
            repeat: Infinity,
          }}
        >
          {doubledItems.map((item, index) => {
            if (item.type === "spacer") {
              return (
                <div
                  key={`spacer-${item.id}-${index}`}
                  className="w-36 h-48 md:w-44 md:h-56 bg-neutral-900/60 rounded-2xl border border-neutral-800/40 backdrop-blur-sm shrink-0 shadow-inner"
                />
              );
            }

            return (
              <div
                key={`banner-${item.id}-${index}`}
                className="w-64 h-48 md:w-80 md:h-56 rounded-2xl overflow-hidden shrink-0 relative border border-neutral-700/50 group shadow-lg"
                style={{
                  backgroundImage: `url(${item.bgImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end">
                  {item.title ? (
                    <h3 className="text-lg font-bold tracking-wide uppercase text-white drop-shadow">
                      {item.title}
                    </h3>
                  ) : null}
                  {item.subtitle ? (
                    <p className="text-xs text-neutral-300 line-clamp-2 mt-1">
                      {item.subtitle}
                    </p>
                  ) : null}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}