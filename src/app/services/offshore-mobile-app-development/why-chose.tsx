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

<meta
  name="google-site-verification"
  content="CBKqqECDJRj5OGKmASLx9E8oM6XET_LWY_4_mWL5A3k"
/>;
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
    <section className="text-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* ================= LEFT : WHY CHOOSE ================= */}
        <div className="relative">
          {/* Small Label */}
          <div className="text-orange-600 text-xs uppercase tracking-[0.15em] mb-3">
            Why Choose Softree
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-10">
            Built for{" "}
            <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              Long-Term Impact
            </span>
          </h2>

          {/* ✅ Vertical Accent Line (Orange Version) */}
          <div className="absolute left-4 top-[120px] bottom-0 w-px bg-gradient-to-b from-orange-500/40 via-orange-400/20 to-transparent hidden md:block" />

          {/* Features */}
          <div className="space-y-10">
            {whyChoose.map((item, i) => {
              const Icon = item.icon;

              return (
                <div key={i} className="relative flex gap-6 items-start">
                  {/* Number */}
                  <div className="relative z-10 flex items-center justify-center w-8 h-8 text-xs font-semibold text-orange-600">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  {/* Content */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 flex items-center justify-center rounded-md bg-orange-50 text-orange-600">
                        <Icon size={18} />
                      </div>

                      <h3 className="text-lg font-semibold">{item.title}</h3>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed max-w-md">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= RIGHT : TESTIMONIALS ================= */}
        <div className="rounded-2xl p-10 bg-gradient-to-r from-black via-[#4c1c02] to-black border border-white/10 shadow-2xl">
          {/* Header */}
          <div className="mb-10">
            <div className="text-white text-xs uppercase tracking-widest mb-3">
              Client Feedback
            </div>

            <h3 className="text-2xl font-semibold mb-6 text-white">
              Trusted by Enterprise Teams
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
                          className={`w-4 h-4 ${
                            idx < review.rating
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
          <div className="flex items-center gap-6 mt-8 text-gray-400">
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
