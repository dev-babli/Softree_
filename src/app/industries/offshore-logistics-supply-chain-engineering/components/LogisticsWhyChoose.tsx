"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  User,
  MapPin,
  Users,
  Tag,
  Expand,
  BrainCircuit,
  UserPlus,
  Globe,
} from "lucide-react";

/* ================= WHY CHOOSE DATA ================= */
const whyChoose = [
  {
    icon: Users,
    title: "Dedicated Logistics Tech Teams",
    desc: "Experienced supply chain software, EDI, and AI engineers providing dedicated long-term capacity for your freight technology roadmap.",
  },
  {
    icon: Tag,
    title: "Flexible Engagement Models",
    desc: "Choose between dedicated offshore squads, staff augmentation, fixed-scope pilots, or fully managed engineering delivery.",
  },
  {
    icon: Expand,
    title: "End-to-End Engineering",
    desc: "From initial supply chain assessment and architecture design to TMS/WMS integration, continuous testing, and rollout.",
  },
  {
    icon: BrainCircuit,
    title: "High-Availability Cloud Architecture",
    desc: "Enterprise cloud systems built for 99.99% uptime, real-time GPS telemetry streams, and high-volume freight transactions.",
  },
  {
    icon: UserPlus,
    title: "Frictionless Enterprise Integration",
    desc: "Seamlessly integrate custom applications with SAP, Oracle, Manhattan, Blue Yonder, and legacy AS400 freight systems.",
  },
  {
    icon: Globe,
    title: "Post-Launch Continuous Optimization",
    desc: "24/7 monitoring, telemetry pipeline support, SLA governance, and continuous model retraining as shipment volumes scale.",
  },
];

/* ================= REVIEWS DATA ================= */
const reviews = [
  {
    name: "Arkady Fedorovtsjev",
    company: "ECG Group (Export Control)",
    rating: 5,
    comment:
      "Softree's offshore engineering team exceeded our expectations in modernizing our shipment data pipelines. Their responsiveness and attention to detail ensured our compliance workflows operated flawlessly across European trade corridors.",
    location: "Netherlands",
  },
  {
    name: "Natasha Adams",
    company: "Wicked Point Logistics",
    rating: 5,
    comment:
      "We had a very positive experience working with Softree Technology. The developers were responsive and delivery was on time. The automated tracking and dispatch integration was exactly what we needed to scale our regional freight operations.",
    location: "Virginia, US",
  },
  {
    name: "Darrell Trimble",
    company: "SP Marketplace",
    rating: 5,
    comment:
      "Softree staff worked closely with us to learn our automation requirements and built exactly what we needed. Their team integrates seamlessly with ours as a true extension of our engineering force.",
    location: "California, US",
  },
];

export default function LogisticsWhyChoose() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  /* AUTOPLAY */
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev >= reviews.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [paused]);

  return (
    <section className="w-full bg-white text-gray-900 py-12 md:py-16 lg:py-20 font-sans">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-[2cm] grid grid-cols-1 lg:grid-cols-2 gap-16 lg:items-stretch items-start">
        {/* ================= LEFT : WHY CHOOSE ================= */}
        <div className="relative">
          {/* Small Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-xs sm:text-[12px] font-bold tracking-widest text-[#FF6B00] uppercase mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
            WHY CHOOSE SOFTREE
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold font-['Plus_Jakarta_Sans',sans-serif] text-slate-900 leading-[1.12] mb-6 tracking-tight">
            Engineering Built for{" "}
            <span className="bg-gradient-to-r from-[#FF5812] to-[#FF6B2C] bg-clip-text text-transparent">
              Resilient Supply Chains
            </span>
          </h2>

          {/* Features */}
          <div className="relative space-y-4">
            {/* Vertical Accent Line */}
            <div className="absolute left-[11px] top-3 bottom-3 w-px bg-gradient-to-b from-orange-500/40 via-orange-400/20 to-transparent hidden md:block" />
            {whyChoose.map((item, i) => {
              const Icon = item.icon;

              return (
                <div key={i} className="relative flex gap-4 items-start">
                  {/* Number */}
                  <div className="relative z-10 flex items-center justify-center w-6 h-6 mt-1 text-xs sm:text-[13px] font-mono font-bold text-orange-600 bg-white">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  {/* Content */}
                  <div>
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-orange-50 text-orange-600 shrink-0">
                        <Icon size={16} />
                      </div>

                      <h3 className="text-base sm:text-[17px] font-bold text-slate-900">{item.title}</h3>
                    </div>

                    <p className="text-slate-500 text-sm sm:text-[14.5px] leading-relaxed max-w-md">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= RIGHT : TESTIMONIALS ================= */}
        <div className="rounded-2xl p-8 sm:p-10 bg-gradient-to-r from-black via-[#4c1c02] to-black border border-white/10 shadow-2xl h-full flex flex-col">
          {/* Header */}
          <div className="mb-8 sm:mb-10">
            <div className="text-orange-400 text-xs sm:text-[12px] uppercase font-bold tracking-widest mb-3">
              Client Feedback
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
              Trusted by Supply Chain &amp; Logistics Teams
            </h3>

            <div className="flex items-center gap-4 mb-2">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-base sm:text-lg font-bold text-white">4.9 / 5</p>
              <p className="text-gray-300 text-sm sm:text-[14.5px]">average rating</p>
            </div>

            <p className="text-sm sm:text-[14.5px] text-gray-400">
              Based on{" "}
              <span className="font-semibold text-white">
                150+ enterprise client reviews
              </span>
            </p>
          </div>

          {/* Reviews Slider */}
          <div className="overflow-hidden relative w-full">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {reviews.map((review, i) => (
                <div key={i} className="w-full shrink-0">
                  <div className="max-w-xl">
                    {/* Rating Stars */}
                    <div className="mb-3 flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className={`w-4 h-4 ${
                            idx < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-500"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Review Comment */}
                    <p className="text-gray-100 text-base sm:text-[17px] leading-relaxed mb-6 font-normal">
                      “{review.comment}”
                    </p>

                    {/* Reviewer Info */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <User size={15} className="text-orange-400" />
                        <div>
                          <p className="font-semibold text-white text-sm sm:text-base">
                            {review.name}
                          </p>
                          <p className="text-xs sm:text-[13px] text-gray-300">
                            {review.company}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-gray-400" />
                        <p className="text-xs sm:text-[13px] text-gray-300">
                          {review.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-6 mt-auto pt-8 text-gray-400">
            <button
              onClick={() =>
                setIndex((i) => (i === 0 ? reviews.length - 1 : i - 1))
              }
              className="hover:text-white transition cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={() => setPaused(!paused)}
              className="hover:text-white transition cursor-pointer"
            >
              {paused ? <Play size={16} /> : <Pause size={16} />}
            </button>

            <button
              onClick={() =>
                setIndex((i) => (i >= reviews.length - 1 ? 0 : i + 1))
              }
              className="hover:text-white transition cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
