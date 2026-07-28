"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";
import { FileText, AlertTriangle, Lightbulb, Briefcase, BookOpen } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

import { successStoriesData } from "../data/successStories";

export default function SuccessStories() {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex items-center ">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-8 w-full">
        {/* ================= HEADER ================= */}
        <div className="text-center mb-10 px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-[#FF5812]/20"></div>
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5812]"></span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF5812]">
                {successStoriesData.badge}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5812]"></span>
            </div>
            <div className="w-8 h-[1px] bg-[#FF5812]/20"></div>
          </div>

          <h2 className="text-[clamp(32px,4.5vw,56px)] font-semibold leading-[0.9] tracking-[-0.04em] text-[#0A0A1A]">
            {successStoriesData.heading.prefix}
            <span className="text-[#FF5812]">
              {successStoriesData.heading.highlight}
            </span>
            {successStoriesData.heading.suffix}
          </h2>

          <p className="mt-6 text-base leading-relaxed text-[#0a0a1a]/70 max-w-3xl mx-auto">
            {successStoriesData.subheading}
          </p>
        </div>

        <div
          className="
                w-full
                h-auto min-h-[680px] md:h-[70vh] md:max-h-[680px]
                bg-gradient-to-r from-[#eef2f7] via-[#ffedd5] to-[#eef2f7]
                rounded-[32px]
                border border-slate-200
                shadow-xl
                overflow-hidden
              "
        >
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            loop
            observer={true}
            observeParents={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={900}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="h-full w-full overflow-hidden"
          >
            {successStoriesData.items.map((item, index) => (
              <SwiperSlide key={index} className="h-full w-full">
                {/* FULL WIDTH CARD */}
                <div className="relative w-full h-full overflow-hidden rounded-[32px]">
                  {/* Border */}
                  <div className="pointer-events-none absolute inset-0 rounded-[32px] ring-1 ring-white/15" />

                  {/* CARD BODY */}
                  <div
                    className="
                          w-full
                          h-full
                          bg-gradient-to-r from-black via-[#4c1c02] to-black
                          p-10
                          flex flex-col justify-center
                        "
                  >
                    {/* Header */}
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-semibold text-white">
                        {item.title}
                      </h3>

                      <div className="mt-2 text-sm text-slate-300 flex items-center justify-center gap-2">
                        <Briefcase className="w-4 h-4 text-orange-400" />
                        <span className="text-slate-400">Industry:</span>
                        <span className="font-medium text-white">
                          {item.industry}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
                      {/* Image */}
                      <div className="flex justify-center w-full min-w-0 max-w-sm mx-auto lg:max-w-none">
                        <div className="w-full aspect-video overflow-hidden rounded-xl shadow-md ring-1 ring-white/10 shrink-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>


                      {/* Text */}
                      <div className="space-y-5 min-w-0 w-full">
                        {/* SUMMARY */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-orange-400" />
                            <h4 className="text-xs font-semibold tracking-wide text-orange-400 uppercase">
                              Summary
                            </h4>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {item.summary}
                          </p>
                        </div>

                        {/* PROBLEM */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-rose-400" />
                            <h4 className="text-xs font-semibold tracking-wide text-rose-400 uppercase">
                              Problem
                            </h4>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {item.challenge}
                          </p>
                        </div>

                        {/* SOLUTION */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Lightbulb className="w-4 h-4 text-cyan-400" />
                            <h4 className="text-xs font-semibold tracking-wide text-cyan-400 uppercase">
                              Solution
                            </h4>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {item.solution}
                          </p>
                        </div>

                        {/* IMPACT BOX */}
                        <div
                          className="
                    relative
                    rounded-xl
                    px-5 py-4
                    flex flex-col gap-4
                    xl:flex-row xl:items-center xl:justify-between
                    bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500
                    text-white
                    shadow-lg
                    overflow-hidden
                    w-full
                  "
                        >
                          <div className="relative z-10 space-y-0.5 flex-1 min-w-0 pr-3">
                            <p className="text-xs uppercase tracking-wider text-white/70 truncate">
                              Impact
                            </p>
                            <ul className="text-sm font-semibold leading-snug break-words list-disc pl-4 space-y-1">
                              {item.impact.map((point, i) => (
                                <li key={i}>{point}</li>
                              ))}
                            </ul>
                          </div>

                          {(item as any).link ? (
                            <a
                              href={(item as any).link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="relative z-10 inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wide rounded-full bg-white text-orange-700 hover:scale-105 transition-all duration-300 whitespace-nowrap flex-shrink-0"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              {item.buttonText}
                            </a>
                          ) : (
                            <button
                              className="relative z-10 inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wide rounded-full bg-white text-orange-700 hover:scale-105 transition-all duration-300 whitespace-nowrap flex-shrink-0"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              {item.buttonText}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* ================= PAGINATION (clean spacing) ================= */}
        <div className="flex justify-center">
          <div className="flex flex-col items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-200 shadow-md">
            <div className="flex items-center gap-5">
              {successStoriesData.items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => swiperRef.current?.slideToLoop(i)}
                  className={`text-xs font-medium tracking-widest transition
                ${
                  activeIndex === i
                    ? "text-orange-600 scale-125"
                    : "text-gray-400 hover:text-gray-700"
                }
              `}
                >
                  {String(i + 1).padStart(2, "0")}
                </button>
              ))}
            </div>

            <div className="w-36 h-[3px] bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-600 to-amber-500 transition-all duration-500"
                style={{
                  width: `${((activeIndex + 1) / successStoriesData.items.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
