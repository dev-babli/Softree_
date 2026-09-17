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
    title: "Healthcare-Aware Engineering Teams",
    desc: "Experienced AI and software engineers who understand healthcare workflows and build AI solutions for healthcare applications, data, and digital platforms.",
  },

  {
    icon: Expand,
    title: "White-Label Delivery",
    desc: "Extend your healthcare technology capabilities with white-label AI and software engineering services delivered behind your brand and client relationships.",
  },

  {
    icon: BrainCircuit,
    title: "Flexible Engagement Models",
    desc: "Choose a delivery model that fits your needs, from project-based healthcare AI development and consulting to team augmentation and dedicated engineering teams.",
  },

  {
    icon: UserPlus,
    title: "Dedicated Engineering Teams",
    desc: "Build a dedicated healthcare engineering team with AI engineers, software developers, data engineers, QA specialists, and cloud experts aligned with your roadmap.",
  },
  {
    icon: Globe,
    title: "Long-Term Partnership",
    desc: "Support your healthcare technology roadmap beyond initial development with ongoing engineering, application modernization, AI enhancement, maintenance, and optimization.",
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

  /* AUTOPLAY */
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev >= reviews.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [paused]);

  return (
    <section className="text-gray-900 py-12 md:py-16 lg:py-20 font-sans">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-14 lg:items-stretch items-start">
        {/* ================= LEFT : WHY CHOOSE ================= */}
        <div className="relative flex flex-col justify-start">
          <div>
            {/* Small Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 typo-caption text-[#FF6B00] uppercase mb-3 sm:mb-4 shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse"></div>
              Why Softree
            </div>

            {/* Heading */}
            <h2 className="typo-heading-2 text-slate-900 leading-tight mb-5 sm:mb-6">
              Why Partners{" "}
              <span className="bg-gradient-to-r from-[#FF5812] to-[#FF6B2C] bg-clip-text text-transparent">
                Choose Softree
              </span>
            </h2>          
          </div>

          {/* Features */}
          <div className="relative space-y-3 sm:space-y-3.5">
            {/* ✅ Vertical Accent Line (Aligned to items) */}
            <div className="absolute left-[11px] top-3 bottom-3 w-px bg-gradient-to-b from-orange-500/40 via-orange-400/20 to-transparent hidden md:block" />
            {whyChoose.map((item, i) => {
              const Icon = item.icon;

              return (
                <div key={i} className="relative flex gap-3 items-start group">
                  {/* Number */}
                  <div className="relative z-10 flex items-center justify-center w-6 h-6 mt-0.5 typo-caption-meta font-semibold text-orange-600 bg-white shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  {/* Content */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <div className="w-5 h-5 flex items-center justify-center rounded-md bg-orange-50 text-orange-600 shrink-0">
                        <Icon size={12} />
                      </div>

                      <h3 className="typo-heading-4 text-slate-900 group-hover:text-orange-600 transition-colors">{item.title}</h3>
                    </div>

                    <p className="typo-body-sm text-gray-600 max-w-xl">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= RIGHT : TESTIMONIALS ================= */}
        <div className="rounded-2xl p-6 sm:p-8 xl:p-10 bg-gradient-to-r from-black via-[#4c1c02] to-black border border-white/10 shadow-2xl h-full flex flex-col justify-between">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <div className="text-white typo-caption uppercase tracking-widest mb-2 sm:mb-3">
              Client Feedback
            </div>

            <h3 className="typo-heading-3 mb-4 sm:mb-6 text-white leading-tight">
              Trusted by Healthcare Teams
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

              <p className="typo-body font-semibold text-white">4.9 / 5</p>
              <p className="typo-body-sm text-gray-300">average rating</p>
            </div>

            <p className="typo-body-sm text-gray-400">
              Based on{" "}
              <span className="font-medium text-white">
                150+ client reviews
              </span>
            </p>
          </div>

          {/* Reviews Slider */}
          <div className="overflow-hidden relative w-full my-auto">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {reviews.map((review, i) => (
                <div key={i} className="w-full shrink-0">
                  <div className="max-w-xl min-h-[140px] flex flex-col justify-between">
                    <div>
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
                      <p className="typo-description text-gray-200 mb-5 leading-relaxed">
                        “{review.comment}”
                      </p>
                    </div>

                    {/* Reviewer Info */}
                    <div className="space-y-1 mt-2">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-orange-400 shrink-0" />
                        <div>
                          <p className="typo-body-sm font-semibold text-white">
                            {review.name}
                          </p>

                          {/* ✅ Company added here */}
                          <p className="typo-body-sm text-gray-400">
                            {review.company}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin size={13} className="text-gray-400 shrink-0" />
                        <p className="typo-body-sm text-gray-400">
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
          <div className="flex items-center gap-6 mt-6 pt-6 border-t border-white/10 text-gray-400">
            <button
              onClick={() =>
                setIndex((i) => (i === 0 ? reviews.length - 1 : i - 1))
              }
              aria-label="Previous review"
              className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={() => setPaused(!paused)}
              aria-label={paused ? "Play slideshow" : "Pause slideshow"}
              className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition"
            >
              {paused ? <Play size={16} /> : <Pause size={16} />}
            </button>

            <button
              onClick={() =>
                setIndex((i) => (i >= reviews.length - 1 ? 0 : i + 1))
              }
              aria-label="Next review"
              className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
