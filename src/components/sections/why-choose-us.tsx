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
    name: "Natasha Adams",
    company: "Wicked Point LLC",
    rating: 5,
    comment:
      "We had a very positive experience working with Softree Technology. The developers were responsive and delivery was on time. We appreciate the attention they gave our project and their great communication. The final product was exactly what we wanted and we look forward to working with Softree in the future.",
    location: "Virginia",
  },
  {
    name: "Arkady Fedorovtsjev",
    company: "ECG Group",
    rating: 5,
    comment:
      "Overall, we are satisfied with our collaboration in the past and your last action and response to our reported issue, really makes a difference.",
    location: "Netherlands",
  },
  {
    name: "Darrell Trimble",
    company: "SP Marketplace",
    rating: 5,
    comment:
      "SOFTREE staff worked with us to learn our installation automation technology and built exactly what we needed.",
    location: "California",
  },
];

export default function WhyChooseWithTestimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const CARD_WIDTH = 350; // eslint-disable-line @typescript-eslint/no-unused-vars

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
    <section className="relative py-28 bg-[#0a0a0a] text-white overflow-hidden">
      {/* Glow */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#ff7a2f]/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#ff7a2f]/8 blur-[120px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* ================= LEFT : WHY CHOOSE ================= */}
        <div className="relative">
          {/* Small Label */}
          <p
            className="text-xs uppercase tracking-[0.15em] mb-3 inline-block bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #ff7a2f 0%, #c75a2a 35%, #b98817ff 70%, #ff7500ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Why Choose Softree
          </p>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-8 max-w-xl">
            Built for{" "}
            <span className="bg-white bg-clip-text text-transparent">
              Long-Term Impact
            </span>
          </h2>

          {/* Vertical Accent Line */}
          <div className="absolute left-4 top-[120px] bottom-0 w-px bg-gradient-to-b from-[#ff7a2f]/40 to-transparent hidden md:block" />

          {/* Features */}
          <div className="space-y-8">
            {whyChoose.map((item, i) => {
              const Icon = item.icon;

              return (
                <div key={i} className="relative flex gap-6 items-start group">
                  {/* Number */}
                  <div className="relative z-10 flex items-center justify-center w-8 h-8 text-xs font-semibold text-[#ff7a2f]">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    {/* Icon + Title */}
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 flex items-center justify-center rounded-md bg-[#ff7a2f]/15 text-[#ff7a2f]">
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
  bg-gradient-to-br from-[#111111] via-[#0e0e0e] to-[#0a0a0a]
  border border-white/8
  shadow-[0_0_40px_rgba(255,122,47,0.08)]
  overflow-hidden"
        >
          {/* subtle glow overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#ff7a2f]/3 to-transparent pointer-events-none rounded-2xl" />

          {/* Header Section */}
          <div className="relative z-10 mb-10">
            {/* Top Label */}
            <div
              className="text-xs uppercase tracking-widest mb-3 inline-block bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #ff7a2f 0%, #c75a2a 35%, #b98817ff 70%, #ff7500ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
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
                  <div className="max-w-xl">
                    {/* Rating Stars */}
                    <div className="mb-3 flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className={`w-4 h-4 ${idx < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-500"
                            }`}
                        />
                      ))}
                    </div>

                    {/* Review Comment */}
                    <p className="text-gray-200 text-base leading-relaxed mb-6">
                      “{review.comment}”
                    </p>

                    {/* Reviewer Info */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-[#ff7a2f]" />
                        <div>
                          <p className="font-semibold text-white text-sm">
                            {review.name}
                          </p>

                          {/* ✅ Company added here */}
                          <p className="text-xs text-gray-400">
                            {review.company}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin size={13} className="text-gray-400" />
                        <p className="text-xs text-gray-400">
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
