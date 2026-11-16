"use client";

import React, { useLayoutEffect, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FlowButton } from "@/components/ui/flow-button";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const IMAGES = [
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=80",
];

export interface StickyContentLink {
  href?: string;
  text?: string;
  label?: string;
  className?: string;
  target?: string;
  rel?: string;
}

export interface StickyContentItem {
  heading?: string | React.ReactNode;
  paragraphs?: string[];
  paragraph?: string | string[];
  list?: string[];
  listItems?: string[];
  link?: StickyContentLink;
  href?: string;
  linkText?: string;
  cta?: string;
  image?: string;
  alt?: string;
  imageAlt?: string;
  width?: number;
  height?: number;
}

const defaultItems: StickyContentItem[] = [
  {
    heading: "Designed for the everyday",
    paragraph:
      "Spaces where architecture, comfort and light work together, so the design supports how you actually live.",
    list: [
      "Open layouts with natural light",
      "Premium materials and finishes",
      "Considered, low-maintenance detailing",
    ],
    link: { href: "/contact", text: "Explore" },
    image: IMAGES[0],
  },
  {
    heading: "Placed where it counts",
    paragraph:
      "Connected to the routes and neighbourhoods that matter, close to work, transport and everyday amenities.",
    list: [
      "Near key urban corridors",
      "Strong transport links",
      "Surrounded by lifestyle hubs",
    ],
    link: { href: "/contact", text: "See locations" },
    image: IMAGES[1],
  },
  {
    heading: "Built to hold value",
    paragraph:
      "Engineered for durability and future-readiness, so the space keeps pace with a changing city.",
    list: [
      "High construction standards",
      "Future-ready infrastructure",
      "Long-term appreciation potential",
    ],
    link: { href: "/contact", text: "Investment" },
    image: IMAGES[2],
  },
  {
    heading: "Finished with care",
    paragraph:
      "From the amenities to the interiors, every layer is tuned for a calm, elevated day-to-day experience.",
    list: [
      "Considered lifestyle amenities",
      "Well-resolved interiors",
      "Community-minded shared spaces",
    ],
    link: { href: "/contact", text: "Amenities" },
    image: IMAGES[3],
  },
];

const getParagraphs = (item: StickyContentItem) => {
  if (Array.isArray(item.paragraphs)) return item.paragraphs;
  if (Array.isArray(item.paragraph)) return item.paragraph;
  return item.paragraph ? [item.paragraph] : [];
};

const getListItems = (item: StickyContentItem) => {
  if (Array.isArray(item.list)) return item.list;
  if (Array.isArray(item.listItems)) return item.listItems;
  return [];
};

const getLink = (item: StickyContentItem): StickyContentLink | null => {
  if (item.link) return item.link;
  if (item.href) {
    return {
      href: item.href,
      text: item.linkText || item.cta || "Partner with Softree",
    };
  }
  return null;
};

const renderStickyContent = (item: StickyContentItem) => {
  const paragraphs = getParagraphs(item);
  const listItems = getListItems(item);
  const link = getLink(item);

  return (
    <div className="flex w-full flex-col justify-center text-foreground max-w-xl pr-0 lg:pr-3 xl:pr-4">
      {item.heading && (
        <h3 className="text-base xs:text-lg sm:text-2xl lg:text-[1.55rem] xl:text-[1.85rem] 2xl:text-[2.1rem] font-extrabold tracking-tight text-[#0a0a1a] mb-1 sm:mb-2 lg:mb-2.5 leading-[1.2]">
          {item.heading}
        </h3>
      )}

      {paragraphs.map((paragraph, paragraphIndex) => (
        <p
          key={`paragraph-${paragraphIndex}`}
          className="text-xs sm:text-sm lg:text-[13px] xl:text-sm 2xl:text-base text-zinc-600 leading-relaxed font-normal mb-1.5 sm:mb-2.5 lg:mb-3"
        >
          {paragraph}
        </p>
      ))}

      {listItems.length > 0 && (
        <ul className="flex flex-col space-y-0.5 sm:space-y-1 lg:space-y-1.5 mb-2 sm:mb-3 lg:mb-4">
          {listItems.map((listItem, listIndex) => (
            <li
              key={`list-${listIndex}`}
              className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm lg:text-[13px] xl:text-sm 2xl:text-base text-zinc-700"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF5812] shrink-0 mt-1" />
              <span className="leading-snug">{listItem}</span>
            </li>
          ))}
        </ul>
      )}

      {link?.href && (
        <div className="mt-1 sm:mt-2 relative z-30 pointer-events-auto">
          <FlowButton
            href={link.href}
            text={link.text || link.label || "Partner with Softree"}
          />
        </div>
      )}
    </div>
  );
};

export interface StickyContentCompProps {
  items?: StickyContentItem[];
  className?: string;
  wrapperClassName?: string;
  leftClassName?: string;
  rightClassName?: string;
  contentClassName?: string;
  imageClassName?: string;
  bgColor?: string;
  contentEnterYPercent?: number;
  contentExitYPercent?: number;
  contentTransitionDuration?: number;
  contentDelay?: number;
  stepGap?: number;
  endHold?: number;
  initialImageScale?: number;
  activeImageScale?: number;
  exitImageScale?: number;
}

export function StickyContentComp({
  items = [],
  className = "",
  wrapperClassName = "",
  leftClassName = "",
  rightClassName = "",
  contentClassName = "",
  imageClassName = "",
  bgColor,
  contentEnterYPercent = 2.5,
  contentExitYPercent = -2.5,
  contentTransitionDuration = 0.75,
  contentDelay = 0.25,
  stepGap = 2,
  endHold = 1.2,
  initialImageScale = 1.08,
  activeImageScale = 1.0,
  exitImageScale = 0.96,
}: StickyContentCompProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const contentRefsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isHoveredRef = useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current || !stickyRef.current || items.length < 2) {
      return;
    }

    const context = gsap.context(() => {
      const contents = contentRefsRef.current;
      const images = imageRefsRef.current;

      const numSteps = items.length - 1;
      const totalTimelineDuration = Math.max(1, numSteps * stepGap + endHold);

      // Initial visual states
      contents.forEach((content, index) => {
        if (!content) return;
        gsap.set(content, {
          autoAlpha: index === 0 ? 1 : 0,
          yPercent: index === 0 ? 0 : contentEnterYPercent,
          zIndex: index === 0 ? 30 : 1,
          pointerEvents: index === 0 ? "auto" : "none",
        });
      });

      images.forEach((image, index) => {
        if (!image) return;
        gsap.set(image, {
          autoAlpha: 1,
          zIndex: items.length - index,
          clipPath: "inset(0% 0% 0% 0%)",
          WebkitClipPath: "inset(0% 0% 0% 0%)",
          scale: index === 0 ? activeImageScale : initialImageScale,
          transformOrigin: "center center",
        });
      });

      // Snapping points for each card with proper resting positions
      const snapValues = Array.from(
        { length: items.length },
        (_, index) => (index * stepGap) / totalTimelineDuration
      );

      // Dynamically calculate scroll distance per slide with mobile calibration
      const getScrollDistance = () => {
        if (typeof window === "undefined") return (numSteps + 0.8) * 650;
        const vh = window.innerHeight;
        const isMobile = window.innerWidth < 1024;
        const perStep = isMobile
          ? Math.min(Math.max(vh * 0.75, 500), 650)
          : Math.min(Math.max(vh * 0.85, 580), 750);
        return (numSteps + 0.8) * perStep;
      };

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 76px",
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          snap: {
            snapTo: (value: number) => {
              // When user's cursor is inside the interactive card or button, NEVER snap/auto-scroll away!
              if (isHoveredRef.current) return value;
              return snapValues.reduce((prev, curr) =>
                Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
              );
            },
            duration: { min: 0.18, max: 0.32 },
            ease: "power1.out",
            delay: 0.2, // 200ms delay after scroll stops, so active scrolling feels natural
            inertia: false,
          },
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            // Map progress to active item based on snap distribution
            let activeIndex = 0;
            let minDiff = Infinity;
            snapValues.forEach((snapVal, idx) => {
              const diff = Math.abs(progress - snapVal);
              if (diff < minDiff) {
                minDiff = diff;
                activeIndex = idx;
              }
            });

            contents.forEach((content, idx) => {
              if (!content) return;
              if (idx === activeIndex) {
                content.style.pointerEvents = "auto";
                content.style.zIndex = "30";
              } else {
                content.style.pointerEvents = "none";
                content.style.zIndex = "1";
              }
            });
          },
        },
      });

      items.forEach((_, index) => {
        if (index === items.length - 1) return;

        const currentContent = contents[index];
        const nextContent = contents[index + 1];
        const currentImage = images[index];
        const nextImage = images[index + 1];
        const stepStart = index * stepGap;
        const nextContentStart =
          stepStart + contentTransitionDuration + contentDelay;

        // 1. Current text exits before next begins (zero text overlap)
        if (currentContent) {
          timeline.to(
            currentContent,
            {
              autoAlpha: 0,
              yPercent: contentExitYPercent,
              duration: contentTransitionDuration,
              ease: "power2.inOut",
            },
            stepStart
          );
        }

        // 2. Next text enters cleanly
        if (nextContent) {
          timeline.fromTo(
            nextContent,
            {
              autoAlpha: 0,
              yPercent: contentEnterYPercent,
            },
            {
              autoAlpha: 1,
              yPercent: 0,
              duration: contentTransitionDuration,
              ease: "power2.inOut",
            },
            nextContentStart
          );
        }

        // 3. Cinematic squeeze image peel (clipPath wipe upwards revealing next underneath)
        if (currentImage) {
          timeline.to(
            currentImage,
            {
              clipPath: "inset(0% 0% 100% 0%)",
              WebkitClipPath: "inset(0% 0% 100% 0%)",
              scale: exitImageScale,
              duration: stepGap,
              ease: "none",
            },
            stepStart
          );
        }

        if (nextImage) {
          timeline.to(
            nextImage,
            {
              scale: activeImageScale,
              duration: stepGap,
              ease: "none",
            },
            stepStart
          );
        }
      });

      // Timeline duration includes endHold so last card rests completely before unpinning
      timeline.duration(totalTimelineDuration);
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => context.revert();
  }, [
    items,
    contentEnterYPercent,
    contentExitYPercent,
    contentTransitionDuration,
    contentDelay,
    stepGap,
    endHold,
    initialImageScale,
    activeImageScale,
    exitImageScale,
  ]);

  if (!items.length) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative w-full h-auto lg:h-[calc(100vh-80px)] lg:min-h-[460px] flex items-center justify-center overflow-x-clip",
        className
      )}
      style={{
        ...(bgColor ? { backgroundColor: bgColor } : null),
      }}
    >
      <div
        ref={stickyRef}
        className="w-full flex items-center justify-center px-3 sm:px-6 lg:px-8 xl:px-12 py-1 sm:py-2 lg:py-3"
      >
        {/* Unified Card Showcase Wrapper */}
        <div
          onMouseEnter={() => {
            isHoveredRef.current = true;
          }}
          onMouseLeave={() => {
            isHoveredRef.current = false;
          }}
          className={cn(
            "w-full max-w-[1240px] xl:max-w-[1280px] mx-auto rounded-2xl sm:rounded-3xl border border-neutral-200/90 bg-white p-4 sm:p-5 lg:p-6 xl:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col lg:flex-row items-stretch justify-between gap-3 sm:gap-5 lg:gap-6 xl:gap-8 overflow-hidden",
            wrapperClassName
          )}
        >
          {/* Image Column - Top on Mobile (order-1), Right on Desktop (lg:order-2) */}
          <div
            className={cn(
              "order-1 lg:order-2 relative w-full lg:w-1/2 h-[200px] xs:h-[220px] sm:h-[260px] md:h-[290px] lg:h-[clamp(300px,calc(100vh-220px),460px)] xl:h-[clamp(320px,calc(100vh-210px),480px)] shrink-0 flex-none lg:flex-1 overflow-hidden rounded-xl sm:rounded-2xl border border-neutral-200/80 shadow-md",
              rightClassName
            )}
          >
            {items.map((item, index) => (
              <div
                key={`image-${index}`}
                ref={(element) => {
                  imageRefsRef.current[index] = element;
                }}
                style={{
                  zIndex: items.length - index,
                  clipPath: "inset(0% 0% 0% 0%)",
                  WebkitClipPath: "inset(0% 0% 0% 0%)",
                }}
                className={cn("absolute inset-0 h-full w-full transform-gpu", imageClassName)}
              >
                <img
                  src={item.image}
                  alt={item.alt || item.imageAlt || `sticky-image-${index + 1}`}
                  className="h-full w-full object-cover"
                  width={1200}
                  height={1200}
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Content Column - Bottom on Mobile (order-2), Left on Desktop (lg:order-1) */}
          <div
            className={cn(
              "order-2 lg:order-1 relative w-full lg:w-1/2 min-h-[260px] xs:min-h-[280px] sm:min-h-[290px] lg:min-h-0 lg:h-[clamp(300px,calc(100vh-220px),460px)] xl:h-[clamp(320px,calc(100vh-210px),480px)] shrink-0 flex-none lg:flex-1 flex items-center",
              bgColor ? "" : "bg-transparent",
              leftClassName
            )}
          >
            {items.map((item, index) => (
              <div
                key={`content-${index}`}
                ref={(element) => {
                  contentRefsRef.current[index] = element;
                }}
                className={cn(
                  "absolute inset-0 flex flex-col justify-center",
                  index === 0
                    ? "opacity-100 z-30 pointer-events-auto"
                    : "opacity-0 z-1 pointer-events-none",
                  contentClassName
                )}
              >
                {renderStickyContent(item)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export interface StickyContentWrapperProps {
  items?: StickyContentItem[];
  bgColor?: string;
  className?: string;
  wrapperClassName?: string;
  contentEnterYPercent?: number;
  contentTransitionDuration?: number;
  initialImageScale?: number;
  activeImageScale?: number;
  exitImageScale?: number;
}

export default function StickyContentWrapper({
  items = defaultItems,
  bgColor,
  className = "",
  wrapperClassName = "",
  contentEnterYPercent = 2.5,
  contentTransitionDuration = 0.75,
  initialImageScale = 1.08,
  activeImageScale = 1.0,
  exitImageScale = 0.96,
}: StickyContentWrapperProps) {
  return (
    <StickyContentComp
      items={items}
      bgColor={bgColor}
      className={className}
      wrapperClassName={wrapperClassName}
      contentEnterYPercent={contentEnterYPercent}
      contentExitYPercent={-2.5}
      contentTransitionDuration={contentTransitionDuration}
      contentDelay={0.25}
      endHold={1.2}
      initialImageScale={initialImageScale}
      activeImageScale={activeImageScale}
      exitImageScale={exitImageScale}
    />
  );
}
