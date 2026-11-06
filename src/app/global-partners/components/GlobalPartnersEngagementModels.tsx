"use client";

import React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Check,
} from "lucide-react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { WavyBrandBackground } from "@/components/ui/wavy-brand-background";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

export interface EngagementModelItem {
  id: string;
  partIndex: number;
  tag: string;
  title: string;
  description: string;
  highlights: string[];
}

export const ENGAGEMENT_MODELS: EngagementModelItem[] = [
  {
    id: "01",
    partIndex: 0,
    tag: "01 — WHITE-LABEL DEVELOPMENT",
    title: "Your Brand. Our Engineering.",
    description:
      "Expand your service offerings with Softree's white-label software development expertise. We work behind the scenes to help you deliver technology solutions under your own brand.",
    highlights: [
      "Deliver custom software applications.",
      "Extend your services with AI-powered solutions.",
      "Serve more clients without expanding your in-house team.",
    ],
  },
  {
    id: "02",
    partIndex: 1,
    tag: "02 — DEDICATED ENGINEERING TEAMS",
    title: "Your Extended Engineering Team.",
    description:
      "Scale your development capabilities with dedicated offshore engineers who integrate with your organization, workflows, and technical requirements.",
    highlights: [
      "Access dedicated software development professionals.",
      "Align engineering teams with your technology stack.",
      "Support ongoing projects and long-term development needs.",
    ],
  },
  {
    id: "03",
    partIndex: 2,
    tag: "03 — STAFF AUGMENTATION",
    title: "The Right Talent When You Need It.",
    description:
      "Strengthen your existing development team with experienced engineers and specialized technology professionals to meet changing project requirements.",
    highlights: [
      "Access expertise across AI and Microsoft technologies.",
      "Strengthen cloud, data, and application development teams.",
      "Scale technical resources based on project demands.",
    ],
  },
  {
    id: "04",
    partIndex: 3,
    tag: "04 — PROJECT-BASED COLLABORATION",
    title: "Let's Deliver Together.",
    description:
      "Collaborate with Softree on specific software development and technology initiatives through structured project engagements with clearly defined objectives.",
    highlights: [
      "Develop custom applications and software solutions.",
      "Implement cloud solutions, AI, and system modernization.",
      "Work toward agreed scopes, milestones, and deliverables.",
    ],
  },
  {
    id: "05",
    partIndex: 4,
    tag: "05 — STRATEGIC TECHNOLOGY COLLABORATION",
    title: "Shared Expertise. Greater Opportunities.",
    description:
      "Build a strategic relationship with Softree to combine technical expertise, explore new technology opportunities, and strengthen your service capabilities.",
    highlights: [
      "Combine complementary engineering skills and technical expertise.",
      "Explore joint projects and new business opportunities.",
      "Build long-term technology relationships that support mutual growth.",
    ],
  },
  {
    id: "06",
    partIndex: 5,
    tag: "06 — TECHNOLOGY CONSULTING & ADVISORY",
    title: "Expert Guidance. Smarter Technology Decisions.",
    description:
      "Help your business evaluate technology needs, identify improvements, and plan effective solutions with Softree's engineering expertise.",
    highlights: [
      "Assess existing systems, architecture, and technology requirements.",
      "Identify opportunities for AI adoption, cloud modernization, and digital transformation.",
      "Develop technology roadmaps aligned with business goals and future growth.",
    ],
  },
];

export interface CarouselProps {
  className?: string;
  showNavigation?: boolean;
  showPagination?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  spaceBetween?: number;
}

export const Carousel_003 = ({
  className,
  showNavigation = true,
  showPagination = true,
  loop = true,
  autoplay = true,
  spaceBetween = 0,
}: CarouselProps) => {
  const css = `
  .engagement-carousel {
    width: 100%;
    padding-top: 10px;
    padding-bottom: 20px;
    overflow: visible;
  }
  
  .engagement-carousel .swiper-slide {
    width: 290px;
    height: 460px;
    border-radius: 1.5rem;
    overflow: hidden;
    transition: transform 0.4s ease, opacity 0.4s ease, filter 0.4s ease, visibility 0.4s ease;
  }

  /* On mobile screens (< 640px): show only 1 card at a time */
  @media (max-width: 639px) {
    .engagement-carousel .swiper-slide {
      width: min(330px, 90vw) !important;
      height: 465px !important;
    }

    .engagement-carousel .swiper-slide:not(.swiper-slide-active) {
      opacity: 0 !important;
      pointer-events: none !important;
      visibility: hidden !important;
    }
  }

  /* On tablet and desktop screens (>= 640px): show 3 cards (active center, prev left, next right) */
  @media (min-width: 640px) {
    .engagement-carousel .swiper-slide {
      width: 330px;
      height: 460px;
    }

    .engagement-carousel .swiper-slide:not(.swiper-slide-active):not(.swiper-slide-prev):not(.swiper-slide-next) {
      opacity: 0 !important;
      pointer-events: none !important;
      visibility: hidden !important;
    }
  }

  @media (min-width: 1024px) {
    .engagement-carousel .swiper-slide {
      width: 350px;
      height: 470px;
    }
  }

  .engagement-carousel .swiper-slide-shadow-left,
  .engagement-carousel .swiper-slide-shadow-right {
    border-radius: 1.5rem;
  }

  .engagement-swiper-pagination .swiper-pagination-bullet {
    width: 8px;
    height: 8px;
    background-color: #0a0a1a !important;
    opacity: 0.22;
    border-radius: 9999px;
    transition: all 0.3s ease;
    cursor: pointer;
    margin: 0 3px !important;
  }

  .engagement-swiper-pagination .swiper-pagination-bullet-active {
    background-color: #FF5812 !important;
    opacity: 1 !important;
    width: 24px !important;
    border-radius: 9999px !important;
  }
  `;

  return (
    <div className={cn("relative w-full", className)}>
      <style>{css}</style>

      {/* Main carousel track with responsive padding */}
      <div className="relative w-full max-w-[1080px] mx-auto px-2 sm:px-14 md:px-16">
        <Swiper
          spaceBetween={spaceBetween}
          initialSlide={0}
          autoplay={
            autoplay
              ? {
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
              : false
          }
          effect="coverflow"
          grabCursor={true}
          slideToClickedSlide={true}
          slidesPerView="auto"
          centeredSlides={true}
          loop={loop}
          coverflowEffect={{
            rotate: 22,
            stretch: 0,
            depth: 105,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={
            showPagination
              ? {
                clickable: true,
                el: ".engagement-swiper-pagination",
              }
              : false
          }
          navigation={
            showNavigation
              ? {
                nextEl: ".engagement-swiper-next",
                prevEl: ".engagement-swiper-prev",
              }
              : false
          }
          className="engagement-carousel"
          modules={[EffectCoverflow, Autoplay, Navigation, Pagination]}
        >
          {ENGAGEMENT_MODELS.map((model) => (
            <SwiperSlide key={model.id} className="cursor-grab active:cursor-grabbing">
              {/* Card Container with WavyBrandBackground from WebAppSqueezeCarousel */}
              <div className="group/card relative flex flex-col justify-between overflow-hidden rounded-[24px] w-full h-full border border-white/15 hover:border-[#FF5812]/50 shadow-2xl transition-all duration-300">
                {/* Background Component: WavyBrandBackground */}
                <div className="absolute inset-0 w-full h-full overflow-hidden -z-20">
                  <div className="w-full h-full transition-transform duration-700 group-hover/card:scale-105">
                    <WavyBrandBackground className="absolute inset-0" partIndex={model.partIndex} totalParts={6} />
                  </div>
                </div>

                {/* Directional Gradient Overlay for optimal contrast and readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/65 to-black/40 pointer-events-none -z-10" />

                {/* Content Layer (No inner black wrapper) */}
                <div className="relative z-10 p-5 sm:p-7 flex flex-col justify-between h-full select-none">
                  {/* Top section: Badge + Title */}
                  <div>
                    <div className="mb-3">
                      <div className="inline-flex items-center px-3 py-1 rounded-full border border-white/20 bg-black/40 text-[10px] sm:text-[11px] font-semibold tracking-wider text-white uppercase backdrop-blur-md shadow-sm">
                        <span className="truncate">{model.tag}</span>
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-[22px] font-bold text-white drop-shadow-md leading-tight mb-2.5">
                      {model.title}
                    </h3>
                  </div>

                  {/* Bottom section: Description & Highlights (Directly on card, without black wrapper) */}
                  <div className="pt-1">
                    <p className={`text-white/90 ${typography.body.sm} leading-relaxed text-xs sm:text-[13px] mb-3`}>
                      {model.description}
                    </p>

                    <div className="w-full h-px bg-white/15 mb-3" />

                    <ul className="space-y-2">
                      {model.highlights.map((highlight, hIdx) => (
                        <li
                          key={hIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-[12.5px] text-white/85 leading-snug"
                        >
                          <div className="mt-0.5 shrink-0 rounded-full bg-[#FF5812]/20 border border-[#FF5812]/40 p-0.5 text-[#FF6B2C]">
                            <Check className="h-3 w-3 stroke-[2.5]" />
                          </div>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Desktop Side Navigation arrows (hidden on mobile) */}
        {showNavigation && (
          <>
            <button
              type="button"
              className="engagement-swiper-prev absolute left-0 sm:left-1 md:left-2 top-1/2 -translate-y-1/2 z-30 hidden sm:flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-800 shadow-lg transition-all hover:border-[#FF5812] hover:bg-[#FF5812] hover:text-white hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Previous engagement model"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="engagement-swiper-next absolute right-0 sm:right-1 md:right-2 top-1/2 -translate-y-1/2 z-30 hidden sm:flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-800 shadow-lg transition-all hover:border-[#FF5812] hover:bg-[#FF5812] hover:text-white hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Next engagement model"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Mobile Navigation Controls: Chevron buttons and pagination dots below the cards */}
      <div className="flex sm:hidden items-center justify-center gap-3 mt-5 z-20 relative">
        {showNavigation && (
          <button
            type="button"
            className="engagement-swiper-prev flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-800 shadow-md transition-all active:scale-95 hover:border-[#FF5812] hover:text-[#FF5812] cursor-pointer"
            aria-label="Previous engagement model"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
        )}

        {showPagination && (
          <div className="engagement-swiper-pagination flex justify-center items-center gap-1.5" />
        )}

        {showNavigation && (
          <button
            type="button"
            className="engagement-swiper-next flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-800 shadow-md transition-all active:scale-95 hover:border-[#FF5812] hover:text-[#FF5812] cursor-pointer"
            aria-label="Next engagement model"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Desktop Pagination bullets */}
      {showPagination && (
        <div className="hidden sm:flex engagement-swiper-pagination justify-center items-center gap-2 mt-7 sm:mt-8 z-20 relative" />
      )}
    </div>
  );
};

export const Skiper49 = Carousel_003;

export function GlobalPartnersEngagementModels({
  className,
  showNavigation = true,
  showPagination = true,
  loop = true,
  autoplay = true,
  spaceBetween = 0,
}: CarouselProps) {
  return (
    <section
      id="engagement-models"
      className={cn(
        "relative w-full py-12 md:py-20 border-t border-[#0a0a1a]/[0.06] bg-white overflow-hidden",
        className
      )}
    >
      <div className="max-w-[1400px] px-4 sm:px-6 lg:px-12 w-full mx-auto">
        {/* Custom Section Header */}
        <div className="text-center mb-10 md:mb-14 flex flex-col items-center max-w-4xl mx-auto px-4">
          {/* Eyebrow Pill Badge */}
          <span
            className={`inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-[#FF5812]/20 bg-[#FF5812]/05 px-3 sm:px-4 py-1 sm:py-1.5 ${typography.caption.default} max-sm:!text-[9.5px] max-sm:!tracking-[0.08em] text-[#FF5812] mb-5 shadow-sm whitespace-nowrap`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5812] shrink-0" />
            IT Engagement Models
          </span>

          {/* Section Main Heading */}
          <h2
            className={`${typography.heading.h2} text-[#0a0a1a] tracking-tight mb-4 flex flex-col items-center`}
          >
            <span className="max-w-none block w-full">
              <span className="text-[#0a0a1a]">Flexible IT Engagement Models </span>
              <br className="hidden sm:inline" />
              <span className="text-[#FF5812] drop-shadow-[0_2px_12px_rgba(255,88,18,0.15)]">
                Built Around Your Business
              </span>
            </span>
          </h2>

          {/* Section Description */}
          <p
            className={`${typography.description.default} text-zinc-600/90 font-medium max-w-2xl mt-1 text-center`}
          >
            Choose the right IT engagement model to align with your business goals, team structure, project requirements, and delivery expectations.
          </p>
        </div>

        {/* Framing Wrapper for Cards Carousel with Pure White Background */}
        <div className="relative mx-auto w-full max-w-[1320px] rounded-3xl border border-neutral-200/80 bg-white px-3 py-6 sm:p-8 md:p-10 lg:p-12 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.06)] overflow-hidden">
          {/* Subtle Ambient Glows inside the Carousel Stage Wrapper */}
          <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-[220px] w-[520px] rounded-full bg-gradient-to-b from-[#FF5812]/10 via-orange-400/5 to-transparent blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 right-10 h-[200px] w-[320px] rounded-full bg-gradient-to-t from-[#FF5812]/5 to-transparent blur-3xl" />

          {/* 3D Coverflow Carousel (Continuous single loop of all 6 cards) */}
          <Carousel_003
            showNavigation={showNavigation}
            showPagination={showPagination}
            loop={loop}
            autoplay={autoplay}
            spaceBetween={spaceBetween}
          />
        </div>
      </div>
    </section>
  );
}

export default GlobalPartnersEngagementModels;
