"use client";

import { motion } from "framer-motion";
import { industriesData } from "../data/industries";

export default function IndustriesWeServe() {
  const items = industriesData.items;

  // Split items into 3 rows for structured desktop layout (matching the mockup)
  // Row 1: 7 items, Row 2: 8 items, Row 3: 4 items
  const row1 = items.slice(0, 7);
  const row2 = items.slice(7, 15);
  const row3 = items.slice(15, 19);

  // Framer Motion Variants for Staggered Entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
      },
    },
  } as const;

  const pillVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 90,
        damping: 14,
      },
    },
  } as const;


  return (
    <section className="relative py-20 bg-gradient-to-b from-zinc-50 via-white to-zinc-50 overflow-hidden">
      
      {/* Premium Ambient Background Blobs */}
      <div className="absolute top-1/4 -left-36 w-[500px] h-[500px] bg-[#FF5812]/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 -right-36 w-[500px] h-[500px] bg-fuchsia-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Top badge */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-8 h-[1px] bg-[#FF5812]/20"></div>
          <div className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5812]"></span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF5812]">
              {industriesData.badge}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5812]"></span>
          </div>
          <div className="w-8 h-[1px] bg-[#FF5812]/20"></div>
        </div>

        {/* Heading */}
        <h2 className="text-center text-3xl md:text-5xl font-semibold leading-tight text-zinc-900">
          {industriesData.heading.prefix}
          <span className="text-[#FF5812]">
            {industriesData.heading.highlight}
          </span>
          {industriesData.heading.suffix}
        </h2>

        {/* Description */}
        <p className="mt-6 text-center text-zinc-600 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
          {industriesData.subheading}
        </p>

        {/* Industry Pills Container */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 flex flex-col gap-4 items-center justify-center w-full"
        >
          {/* Row 1 */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-6xl w-full">
            {row1.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={`row1-${index}`}
                  variants={pillVariants}
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="group flex items-center gap-3 rounded-full border border-zinc-200/80 bg-white px-5 py-3 shadow-sm hover:shadow-[0_8px_24px_rgba(255,88,18,0.08)] hover:border-[#FF5812]/50 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF5812]/10 border border-[#FF5812]/20 group-hover:bg-[#FF5812] group-hover:border-[#FF5812] transition-all duration-300">
                    <Icon size={18} className="text-[#FF5812] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-sm md:text-[15px] font-medium text-zinc-800 group-hover:text-[#FF5812] transition-colors duration-300">
                    {item.title}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Row 2 */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-6xl w-full">
            {row2.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={`row2-${index}`}
                  variants={pillVariants}
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="group flex items-center gap-3 rounded-full border border-zinc-200/80 bg-white px-5 py-3 shadow-sm hover:shadow-[0_8px_24px_rgba(255,88,18,0.08)] hover:border-[#FF5812]/50 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF5812]/10 border border-[#FF5812]/20 group-hover:bg-[#FF5812] group-hover:border-[#FF5812] transition-all duration-300">
                    <Icon size={18} className="text-[#FF5812] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-sm md:text-[15px] font-medium text-zinc-800 group-hover:text-[#FF5812] transition-colors duration-300">
                    {item.title}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Row 3 */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-6xl w-full">
            {row3.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={`row3-${index}`}
                  variants={pillVariants}
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="group flex items-center gap-3 rounded-full border border-zinc-200/80 bg-white px-5 py-3 shadow-sm hover:shadow-[0_8px_24px_rgba(255,88,18,0.08)] hover:border-[#FF5812]/50 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF5812]/10 border border-[#FF5812]/20 group-hover:bg-[#FF5812] group-hover:border-[#FF5812] transition-all duration-300">
                    <Icon size={18} className="text-[#FF5812] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-sm md:text-[15px] font-medium text-zinc-800 group-hover:text-[#FF5812] transition-colors duration-300">
                    {item.title}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
