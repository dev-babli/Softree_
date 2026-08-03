"use client";

import { motion } from "framer-motion";

export const HeroVideoCard = () => {
  return (
    <div className="relative w-full max-w-7xl aspect-[16/9] lg:aspect-[16/9]">
      {/* Main Video Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{
          scale: 1.02,
          boxShadow: "0 0 40px rgba(255, 107, 0, 0.3)",
          borderColor: "rgba(255, 107, 0, 0.8)"
        }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          scale: { duration: 0.4, ease: "easeOut" },
          boxShadow: { duration: 0.4, ease: "easeOut" }
        }}
        className="relative w-full h-full rounded-[32px] overflow-hidden shadow-2xl shadow-[#FF5812]/10 border border-[#FF6B00]/40 bg-slate-900 z-10 transition-colors duration-300"
      >
        <video
          src="/hero-video/herobg-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
};
