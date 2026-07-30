"use client";

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate, useInView } from 'framer-motion';
import { technologyStackData } from '../data/technologyStack';

export interface TechnologyStackCategory {
  title?: string;
  id?: string;
  label?: string;
  badgeClass?: string;
  iconClass?: string;
  items: {
    name: string;
    icon: React.ComponentType<any>;
  }[];
}

export interface TechnologyStackProps {
  badge?: string;
  renderEyebrow?: React.ReactNode;
  headingPrefix?: string;
  headingHighlight?: string;
  headingSuffix?: string;
  description?: string;
  categories?: TechnologyStackCategory[];
}

export default function TechnologyStack({
  badge,
  renderEyebrow,
  headingPrefix,
  headingHighlight,
  headingSuffix,
  description,
  categories,
}: TechnologyStackProps = {}) {
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const finalBadge = badge || technologyStackData.badge;
  const finalHeadingPrefix = headingPrefix !== undefined ? headingPrefix : technologyStackData.heading.prefix;
  const finalHeadingHighlight = headingHighlight !== undefined ? headingHighlight : technologyStackData.heading.highlight;
  const finalHeadingSuffix = headingSuffix !== undefined ? headingSuffix : technologyStackData.heading.suffix;
  const finalDescription = description !== undefined ? description : technologyStackData.subheading;
  const finalCategories = categories || (technologyStackData.categories as any);

  return (
    <section 
      ref={sectionRef} 
      className="relative overflow-hidden py-16"
      onMouseMove={handleMouseMove}
    >
      {/* CSS Keyframes for sweeps */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes glass-sweep {
          0% { transform: translateX(-150%) skewX(-15deg); }
          15%, 100% { transform: translateX(250%) skewX(-15deg); }
        }
        .glass-reflection {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent);
          animation: glass-sweep 12s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          pointer-events: none;
          z-index: 20;
        }
      `}} />

      {/* Background glow & Mouse Spotlight */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(255,88,18,0.08),transparent_65%)]" />
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,88,18,0.04), transparent 80%)`,
        }}
      />


      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto mb-10 px-4">
          {renderEyebrow ? (
            <div className="mb-4 flex justify-center">{renderEyebrow}</div>
          ) : (
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-[#FF5812]/20"></div>
              <div className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5812]"></span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF5812]">
                  {finalBadge}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5812]"></span>
              </div>
              <div className="w-8 h-[1px] bg-[#FF5812]/20"></div>
            </div>
          )}

          <h2 className="text-[clamp(32px,4.5vw,56px)] font-semibold leading-[0.9] tracking-[-0.04em] text-[#0A0A1A]">
            {finalHeadingPrefix}
            <span className="text-[#FF5812]">
              {finalHeadingHighlight}
            </span>
            {finalHeadingSuffix}
          </h2>

          <p className="mt-6 text-base leading-relaxed text-[#0a0a1a]/70 max-w-3xl mx-auto">
            {finalDescription}
          </p>
        </div>

        {/* Marquee Carousel */}
        <div 
          className="relative w-full overflow-hidden flex -mx-6 px-6 lg:mx-0 lg:px-0"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div 
            className="flex w-max gap-6 md:gap-8 animate-marquee py-4"
            style={{ animationPlayState: isHovered ? 'paused' : 'running' }}
          >
            {[...finalCategories, ...finalCategories].map((stack: any, idx) => {
              const categoryTitle = stack.title || stack.label || stack.id || "";
              const categoryBadgeClass = stack.badgeClass || "bg-orange-500/10 text-orange-400 border-orange-500/20";
              const categoryIconClass = stack.iconClass || "bg-orange-500/10 text-orange-400";
              return (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.8, delay: (idx % 6) * 0.1, ease: "easeOut" }}
                  key={idx}
                  className="w-[300px] md:w-[350px] shrink-0 relative group h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,88,18,0.15)] hover:scale-[1.01]"
                >
                  {/* Border Sweep Wrapper */}
                  <div className="absolute inset-0 rounded-[28px] overflow-hidden z-0">
                    <div className="absolute inset-[-100%] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_75%,rgba(255,88,18,0.3)_100%)]"></div>
                  </div>

                  <div className="relative m-[1px] h-[calc(100%-2px)] rounded-[27px] bg-gradient-to-br from-[#18181B] via-[#2B160D] to-[#18181B] p-7 border border-white/5 backdrop-blur-xl group-hover:border-orange-500/30 transition-all duration-300 overflow-hidden z-10 flex flex-col">
                    {/* Glass Reflection */}
                    <div className="glass-reflection"></div>

                    {/* Inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none rounded-[27px]"></div>
                    {/* Ambient Orange Reflection */}
                    <div className="absolute -inset-x-10 -bottom-10 h-32 bg-orange-500/10 blur-[50px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Card title */}
                    <div className="mb-8 relative z-10">
                      <span
                        className={`
                          inline-flex items-center
                          px-5 py-2
                          rounded-full
                          text-sm font-semibold
                          border
                          ${categoryBadgeClass}
                          transition-all duration-300
                        `}
                      >
                        {categoryTitle}
                      </span>
                    </div>

                    {/* Items */}
                    <ul className="space-y-4">
                      {stack.items.map((item: any, i: number) => {
                        const Icon = item.icon;
                        return (
                          <li
                            key={i}
                            className="flex items-center gap-4 group/item relative z-10 p-2 -mx-2 rounded-lg transition-all duration-500 hover:bg-orange-500/5"
                          >
                            {/* Accent Left Border */}
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3/4 bg-orange-500 rounded-r-md transition-all duration-500 opacity-0 scale-y-0 group-hover/item:opacity-100 group-hover/item:scale-y-100" />

                            <div
                              className={`flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-500 ${categoryIconClass} group-hover/item:scale-110 group-hover/item:rotate-6`}
                            >
                              <Icon size={20} className="transition-transform duration-500" />
                            </div>
                            <span className="font-medium transition-colors duration-300 text-gray-300 group-hover/item:text-white">
                              {item.name}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
