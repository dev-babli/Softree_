"use client";

import React from "react";
import { motion } from "framer-motion";
import { MARQUEE_DATA } from "./MarqueeCarousel";

export default function PremiumMarquee() {
  // Duplicate the array to create a seamless infinite loop
  const loopData = [...MARQUEE_DATA, ...MARQUEE_DATA];

  return (
    <div className="w-full bg-[#0a0a0a] py-16 text-white overflow-hidden flex flex-col items-center justify-center font-sans select-none">
      
      {/* Header Bar */}
      <div className="w-full max-w-7xl px-8 mb-10 flex justify-between items-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-100">
          Phenomenon is Waiting for <span className="text-[#f27405]">Your Message</span>
        </h2>
        {/* The Asterisk spinning detail */}
        <span className="text-[#f27405] text-4xl animate-[spin_15s_linear_infinite] font-serif">
          ★
        </span>
      </div>

      {/* Marquee Viewport Masking Container */}
      <div className="relative w-full overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-32 before:bg-gradient-to-r before:from-[#0a0a0a] before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-32 after:bg-gradient-to-l after:from-[#0a0a0a] after:to-transparent">
        
        {/* Animated Track */}
        <motion.div
          className="flex gap-4 w-max px-4 items-center"
          animate={{ x: [0, "-50%"] }}
          transition={{
            ease: "linear",
            duration: 35, // Adjust this value to speed up or slow down
            repeat: Infinity,
          }}
        >
          {loopData.map((item, idx) => {
            // Render Dark Spacer Cards
            if (item.type === "spacer") {
              return (
                <div
                  key={`spacer-${idx}`}
                  className="w-36 h-48 md:w-40 md:h-52 bg-[#161616] rounded-2xl border border-neutral-900/60 shrink-0 transition-opacity duration-300 opacity-80"
                />
              );
            }

            // Render Vivid Wide Banner Cards
            return (
              <div
                key={`banner-${idx}`}
                className="w-[450px] h-48 md:w-[600px] md:h-52 rounded-2xl overflow-hidden shrink-0 relative border border-neutral-800 shadow-2xl"
                style={{
                  backgroundImage: `url(${item.bgImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Text overlays match Image 1 & Image 3 formats */}
                {(item.title || item.subtitle) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-center max-w-[65%]">
                    {item.title && (
                      <h3 className="text-xl md:text-2xl font-bold leading-tight tracking-wide text-white drop-shadow-md">
                        {item.title}
                      </h3>
                    )}
                    {item.subtitle && (
                      <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}