"use client";

import React from "react";
import { motion } from "framer-motion";

export function CopilotVideoShowcase() {

  return (
    <section className="relative w-full py-10 lg:py-16 bg-gradient-to-b from-zinc-50 via-white to-zinc-50 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Animated Container */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative group w-full aspect-video rounded-2xl md:rounded-[32px] overflow-hidden border border-[#FF6B00]/20 shadow-[0_10px_30px_rgba(0,0,0,0.05),0_0_20px_rgba(255,107,0,0.1)] md:shadow-[0_20px_40px_rgba(0,0,0,0.08),0_0_40px_rgba(255,107,0,0.15)] bg-black"
        >
          {/* Video */}
          <video
            src="/copilot-video/copilotpagebg-video.mp4"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />

          {/* Dark Overlay for Readability */}
          <div className="absolute inset-0 bg-black/30 transition-opacity duration-500 group-hover:bg-black/25 pointer-events-none" />





        </motion.div>
      </div>
    </section>
  );
}
