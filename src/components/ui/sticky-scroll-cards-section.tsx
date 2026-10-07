"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

// --- Data for the feature cards ---
export interface StickyFeatureItem {
  title: string;
  description: string;
  imageUrl: string;
  bgColor?: string;
  textColor?: string;
  badge?: string;
  category?: string;
  tags?: string[];
}

const DEFAULT_FEATURES: StickyFeatureItem[] = [
  {
    title: "Connect Files Locally",
    description:
      "Hyperlink indexes and tracks your local files and folders in real time. Every update is searchable immediately. Integrations with Google Drive and OneDrive coming soon.",
    imageUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    bgColor: "bg-[#121217] border border-white/10",
    textColor: "text-zinc-300",
    badge: "Real-time Indexing",
  },
  {
    title: "Trace Every AI Answer",
    description:
      "Every answer includes clickable citations, instantly revealing the original source alongside full context. Trust AI answer by verifying insights directly.",
    imageUrl:
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop",
    bgColor: "bg-[#181822] border border-blue-500/20",
    textColor: "text-zinc-300",
    badge: "Source Citations",
  },
  {
    title: "Focus Searches Precisely",
    description:
      "Target specific projects or documents effortlessly using @folder and @document. Seamlessly switch context within your workflow for pinpoint accuracy.",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    bgColor: "bg-[#1c1822] border border-purple-500/20",
    textColor: "text-zinc-300",
    badge: "Context Switching",
  },
  {
    title: "Search Text Within Images",
    description:
      "Hyperlink transforms text from images into searchable insights. Your visual references—screenshots, photos, and visual notes—become fully accessible.",
    imageUrl:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
    bgColor: "bg-[#201815] border border-orange-500/20",
    textColor: "text-zinc-300",
    badge: "Visual Search OCR",
  },
];

// --- Custom Hook for Scroll Animation ---
const useScrollAnimation = (): [React.RefObject<HTMLHeadingElement | HTMLParagraphElement | null>, boolean] => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLHeadingElement | HTMLParagraphElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
};

// --- Header Component ---
interface AnimatedHeaderProps {
  badge?: string;
  headline?: string;
  subtitle?: string;
}

const AnimatedHeader = ({
  badge = "Capabilities & Architecture",
  headline = "Uncover Insights, Expose Nothing",
  subtitle = "We aim to make on-device AI friction-free and enterprise production-ready.",
}: AnimatedHeaderProps) => {
  const [headerRef, headerInView] = useScrollAnimation();
  const [pRef, pInView] = useScrollAnimation();

  return (
    <div className="text-center max-w-3xl mx-auto mb-16 px-4">
      {badge && (
        <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-blue-500/10 text-blue-400 border border-blue-400/20">
          {badge}
        </span>
      )}
      <h2
        ref={headerRef as React.RefObject<HTMLHeadingElement>}
        className={`text-3xl md:text-5xl font-bold tracking-tight text-white transition-all duration-700 ease-out ${
          headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {headline}
      </h2>
      <p
        ref={pRef as React.RefObject<HTMLParagraphElement>}
        className={`text-base md:text-lg text-zinc-400 mt-4 leading-relaxed transition-all duration-700 ease-out delay-200 ${
          pInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {subtitle}
      </p>
    </div>
  );
};

export interface StickyFeatureSectionProps {
  badge?: string;
  headline?: string;
  subtitle?: string;
  items?: StickyFeatureItem[];
  topOffset?: number;
}

export function StickyFeatureSection({
  badge,
  headline,
  subtitle,
  items = DEFAULT_FEATURES,
  topOffset = 140,
}: StickyFeatureSectionProps) {
  return (
    <section className="relative w-full bg-[#0a0a0f] py-20 md:py-32 font-sans overflow-hidden">
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 transform-gpu blur-3xl opacity-30"
      >
        <div className="aspect-[1155/678] w-[50rem] bg-gradient-to-tr from-blue-600 to-orange-500" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedHeader badge={badge} headline={headline} subtitle={subtitle} />

        {/* Sticky stacked cards container */}
        <div className="w-full space-y-12 md:space-y-16">
          {items.map((feature, index) => {
            // Incremental sticky offset for cascading stacked effect
            const cardTop = topOffset + index * 20;

            return (
              <div
                key={index}
                className={`sticky rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-xl transition-all duration-500 ${
                  feature.bgColor || "bg-[#121217] border border-white/10"
                }`}
                style={{
                  top: `${cardTop}px`,
                  zIndex: index + 1,
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12">
                  {/* Text Column */}
                  <div className="flex flex-col justify-center space-y-4">
                    {feature.badge && (
                      <span className="self-start px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-white/10 text-white/90 border border-white/15">
                        {feature.badge}
                      </span>
                    )}
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                      {feature.title}
                    </h3>
                    <p className={`text-sm md:text-base leading-relaxed ${feature.textColor || "text-zinc-300"}`}>
                      {feature.description}
                    </p>
                    {feature.tags && feature.tags.length > 0 && (
                      <div className="pt-4 flex flex-wrap gap-2">
                        {feature.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Image Column */}
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-xl">
                    <img
                      src={feature.imageUrl}
                      alt={feature.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src =
                          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default StickyFeatureSection;
