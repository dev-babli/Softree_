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
    icon: Tag,
    title: "AI + Software + Data + Cloud Expertise",
    desc: "Combine AI development, software engineering, data engineering, and cloud expertise to build scalable healthcare AI solutions and modern applications.",
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
    icon: Tag,
    title: "Scalable Delivery Capacity",
    desc: "Scale your healthcare AI development capacity as your requirements grow, adding specialized engineering expertise for new projects, products, and AI initiatives.",
  },

  {
    icon: Globe,
    title: "Long-Term Partnership",
    desc: "Support your healthcare technology roadmap beyond initial development with ongoing engineering, application modernization, AI enhancement, maintenance, and optimization.",
  },

  {
    icon: Expand,
    title: "Experience Delivering Complex Projects",
    desc: "Apply proven engineering expertise to complex healthcare AI projects involving enterprise applications, APIs, data platforms, AI integrations, and modern technology ecosystems.",
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
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-[2cm] grid grid-cols-1 lg:grid-cols-2 gap-16 lg:items-stretch items-start">
        {/* ================= LEFT : WHY CHOOSE ================= */}
        <div className="relative">
          {/* Small Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-[10px] sm:text-[11px] font-bold tracking-widest text-[#FF6B00] uppercase mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
            Why Softree
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-extrabold font-['Plus_Jakarta_Sans',sans-serif] text-slate-900 leading-tight mb-4 tracking-tight">
            Why Partners{" "}
            <span className="bg-gradient-to-r from-[#FF5812] to-[#FF6B2C] bg-clip-text text-transparent">
              Choose Softree
            </span>
          </h2>

          <p className="text-[15px] md:text-[16px] text-slate-600 mb-8 leading-relaxed max-w-xl">
            We combine healthcare understanding, engineering expertise, flexible engagement models, and delivery experience to become an extension of your team.
          </p>

          {/* Features */}
          <div className="relative space-y-4">
            {/* ✅ Vertical Accent Line (Aligned to items) */}
            <div className="absolute left-[11px] top-3 bottom-3 w-px bg-gradient-to-b from-orange-500/40 via-orange-400/20 to-transparent hidden md:block" />
            {whyChoose.map((item, i) => {
              const Icon = item.icon;

              return (
                <div key={i} className="relative flex gap-4 items-start">
                  {/* Number */}
                  <div className="relative z-10 flex items-center justify-center w-6 h-6 mt-1 text-[11px] font-semibold text-orange-600 bg-white">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  {/* Content */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-7 h-7 flex items-center justify-center rounded-md bg-orange-50 text-orange-600 shrink-0">
                        <Icon size={14} />
                      </div>

                      <h3 className="text-[15px] font-semibold">{item.title}</h3>
                    </div>

                    <p className="text-gray-600 text-[13px] leading-snug max-w-md">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= RIGHT : TESTIMONIALS ================= */}
        <div className="rounded-2xl p-10 bg-gradient-to-r from-black via-[#4c1c02] to-black border border-white/10 shadow-2xl h-full flex flex-col">
          {/* Header */}
          <div className="mb-10">
            <div className="text-white text-xs uppercase tracking-widest mb-3">
              Client Feedback
            </div>

            <h3 className="text-2xl font-semibold mb-6 text-white">
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

              <p className="font-semibold text-white">4.9 / 5</p>
              <p className="text-gray-300 text-sm">average rating</p>
            </div>

            <p className="text-sm text-gray-400">
              Based on{" "}
              <span className="font-medium text-white">
                150+ client reviews
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
                        <User size={14} className="text-orange-400" />
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
          <div className="flex items-center gap-6 mt-auto pt-8 text-gray-400">
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
