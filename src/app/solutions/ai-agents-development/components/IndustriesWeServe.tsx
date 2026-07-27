"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { industriesData } from "../data/industries";

export default function IndustriesWeServe() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative overflow-hidden">
      <div className="relative z-10 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* ================= EXPERTISE HEADER ================= */}
          <div className="text-center mb-12 max-w-4xl mx-auto px-4">
            <div className="flex items-center justify-center gap-3 mb-4">
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

            <h2 className="text-[clamp(32px,4.5vw,56px)] font-semibold leading-[0.9] tracking-[-0.04em] text-[#0A0A1A]">
              {industriesData.heading.prefix}
              <span className="text-[#FF5812]">
                {industriesData.heading.highlight}
              </span>
              {industriesData.heading.suffix}
            </h2>

            <p className="mt-6 text-base leading-relaxed text-[#0a0a1a]/70 max-w-3xl mx-auto">
              {industriesData.subheading}
            </p>
          </div>
        </motion.div>

        {/* Timeline container */}
        <div ref={containerRef} className="relative py-10">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 top-0 bottom-[110px] md:bottom-[100px] w-[2px] bg-zinc-200/80">
            {/* Growing orange line */}
            <motion.div
              style={{ height: lineHeight }}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#FF5812] to-amber-400 origin-top shadow-[0_0_10px_rgba(255,88,18,0.5)]"
            />
          </div>

          {/* Timeline Items */}
          <div className="flex flex-col gap-12">
            {industriesData.items.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  className={`relative flex w-full items-center ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-row pl-8 md:pl-0`}
                >
                  {/* Dot */}
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-orange-600 to-amber-500 rounded-full border-4 border-white z-10 shadow-md hover:scale-125 transition-transform duration-300"></div>

                  {/* Card */}
                  <div
                    className={`w-full md:w-1/2 ${
                      isLeft ? "md:pr-12 md:text-right" : "md:pl-12"
                    }`}
                  >
                    <div
                      className={`bg-white/90 backdrop-blur-md border-2 border-[#FF5812]/30 rounded-2xl p-6 shadow-xl hover:-translate-y-1 transition-all duration-300 hover:bg-orange-50 hover:border-[#FF5812]/50 hover:shadow-[0_15px_30px_rgba(249,115,22,0.15)] flex gap-4 items-start ${
                        isLeft ? "md:flex-row-reverse" : "flex-row"
                      }`}
                    >
                      {/* Icon Wrapper */}
                      <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20 text-orange-600 shadow-inner">
                        <Icon className="w-5 h-5" />
                      </div>

                      {/* Content Text */}
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-semibold leading-snug text-zinc-900 tracking-tight">
                          {item.industry}
                        </h3>
                        <p className="text-base leading-relaxed text-[#0a0a1a]/70 mt-1.5">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Spacer Column */}
                  <div className="hidden md:block w-1/2"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

