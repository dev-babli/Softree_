"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Rocket,
  Users,
  ShieldCheck,
  User,
  MapPin,
  Sliders,
} from "lucide-react";

/* ================= WHY CHOOSE DATA ================= */
const whyChoose = [
  {
    icon: Rocket,
    title: "Agile Engineering",
    desc: "Rapid iterations and modern delivery practices.",
  },
  {
    icon: Users,
    title: "Leadership Access",
    desc: "Direct communication with decision-makers.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Since 2013",
    desc: "A decade of proven enterprise delivery.",
  },
  {
    icon: Sliders,
    title: "Flexible Engagement",
    desc: "Scalable teams and adaptable delivery models aligned to your business goals.",
  },
];

/* ================= REVIEWS DATA ================= */
const reviews = [
  {
    name: "Rajesh Kumar",
    rating: 5,
    comment:
      "Softree delivered a well-architected SharePoint and Power Platform solution that significantly improved our internal workflows.",
    location: "India",
  },
  {
    name: "Sarah Thompson",
    rating: 5,
    comment:
      "Their consultants clearly understood our requirements and delivered high-quality results on time.",
    location: "United Kingdom",
  },
  {
    name: "Michael Roberts",
    rating: 5,
    comment:
      "Strong technical expertise and clear communication throughout the project.",
    location: "Canada",
  },
  {
    name: "Neha Sharma",
    rating: 5,
    comment:
      "Softree’s Power BI and analytics implementation gave our leadership clear visibility into performance metrics. The dashboards are intuitive and highly impactful.",
    location: "India",
  },
  {
    name: "David Wilson",
    rating: 5,
    comment:
      "We engaged Softree for an Azure cloud migration project. The transition was smooth, secure, and completed within the expected timeline.",
    location: "United States",
  },
  {
    name: "Emma Clarke",
    rating: 4,
    comment:
      "The team demonstrated strong technical depth in Microsoft 365 and SharePoint customization. Communication was consistent and delivery was dependable.",
    location: "Australia",
  },
];

export default function WhyChooseWithTestimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const CARD_WIDTH = 350;

  /* AUTOPLAY */
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev >= reviews.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [paused]);

  useEffect(() => {
    if (!trackRef.current) return;
    trackRef.current.style.transform = `translateX(-${index * 100}%)`;
  }, [index]);

  return (
    <section className="relative py-28 bg-gradient-to-b from-black via-[#020d1a] to-black text-white overflow-hidden">
      {/* Glow */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-600/20 blur-[120px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* ================= LEFT : WHY CHOOSE ================= */}
        <div className="relative">
          {/* Small Label */}
          <div className="text-red-400 text-xs uppercase tracking-[0.15em] mb-3">
            Why Choose Softree
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-8 max-w-xl">
            Built for{" "}
            <span className="bg-white bg-clip-text text-transparent">
              Long-Term Impact
            </span>
          </h2>

          {/* Vertical Accent Line */}
          <div className="absolute left-4 top-[120px] bottom-0 w-px bg-gradient-to-b from-blue-600/40 to-transparent hidden md:block" />

          {/* Features */}
          <div className="space-y-8">
            {whyChoose.map((item, i) => {
              const Icon = item.icon;

              return (
                <div key={i} className="relative flex gap-6 items-start group">
                  {/* Number */}
                  <div className="relative z-10 flex items-center justify-center w-8 h-8 text-xs font-semibold text-blue-400">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    {/* Icon + Title */}
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 flex items-center justify-center rounded-md bg-blue-600/20 text-blue-400">
                        <Icon size={16} />
                      </div>

                      <h3 className="text-lg md:text-xl font-semibold tracking-tight">
                        {item.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-white/70 text-sm leading-relaxed max-w-md">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= RIGHT : TESTIMONIALS ================= */}
        <div
          className="relative rounded-2xl p-10
  bg-gradient-to-br from-[#0b1220] via-[#0f172a] to-[#020617]
  border border-white/10
  backdrop-blur-xl
  shadow-[0_0_40px_rgba(59,130,246,0.15)]
  overflow-hidden"
        >
          {/* subtle glow overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 pointer-events-none rounded-2xl" />

          {/* Header Section */}
          <div className="relative z-10 mb-10">
            {/* Top Label */}
            <div className="text-red-400 text-xs uppercase tracking-widest mb-3">
              Softree Client Feedback
            </div>

            {/* Main Heading */}
            <h3 className="text-3xl font-semibold mb-6">
              Trusted by Enterprise Teams
            </h3>

            {/* Rating Row */}
            <div className="flex items-center gap-4 mb-2">
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Rating Text */}
              <p className="text-white font-semibold">4.9 / 5</p>

              <p className="text-white/60 text-sm">average rating</p>
            </div>

            {/* Review Count */}
            <p className="text-sm text-white/60">
              Based on{" "}
              <span className="text-white font-medium">
                150+ client reviews
              </span>
            </p>
          </div>

          {/* Slider Wrapper */}
          <div className="overflow-hidden relative z-10 w-full">
            <div
              ref={trackRef}
              className="flex transition-transform duration-700 ease-in-out"
            >
              {reviews.map((review, i) => (
                <div key={i} className="w-full shrink-0">
                  <div className="relative max-w-2xl">
                    {/* Stars */}
                    <div className="mb-3 flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className={`w-4 h-4 ${
                            idx < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Comment */}
                    <p className="text-white/80 text-base leading-relaxed mb-5">
                      “{review.comment}”
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        {/* Name */}
                        <div className="flex items-center gap-2">
                          <User size={14} className="text-blue-400" />
                          <p className="text-white font-semibold text-sm">
                            {review.name}
                          </p>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-2">
                          <MapPin size={13} className="text-white/50" />
                          <p className="text-xs text-white/50">
                            {review.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-6 mt-8 text-gray-400 relative z-10">
            <button
              onClick={() =>
                setIndex((i) => (i === 0 ? reviews.length - 1 : i - 1))
              }
              className="hover:text-white transition"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={() => setPaused(!paused)}
              className="hover:text-white transition"
            >
              {paused ? <Play size={16} /> : <Pause size={16} />}
            </button>

            <button
              onClick={() =>
                setIndex((i) => (i >= reviews.length - 1 ? 0 : i + 1))
              }
              className="hover:text-white transition"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
