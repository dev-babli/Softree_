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
import SectionHeader from "@/components/homepage-light/SectionHeader";

const ACCENT = "#FF5812" as const;

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

  /* AUTOPLAY */
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev >= reviews.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [paused]);

  return (
    <section
      data-section="web-dev-why"
      className="py-16 text-[#0a0a1a] md:py-20"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-start gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-12">
        <div className="relative">
          <SectionHeader
            badge="Why choose Softree"
            accent={ACCENT}
            headline={
              <>
                Built for{" "}
                <span className="text-[#FF5812]">long-term impact</span>
              </>
            }
          />

          <div className="absolute left-4 top-[120px] bottom-0 hidden w-px bg-gradient-to-b from-[#FF5812]/40 via-[#FF5812]/15 to-transparent md:block" />

          <div className="mt-10 space-y-10">
            {whyChoose.map((item, i) => {
              const Icon = item.icon;

              return (
                <div key={i} className="relative flex gap-6 items-start">
                  <div className="relative z-10 flex h-8 w-8 items-center justify-center text-xs font-semibold text-[#FF5812]">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  <div>
                    <div className="mb-2 flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#FF5812]/10 text-[#FF5812]">
                        <Icon size={18} />
                      </div>

                      <h3 className="text-lg font-semibold">{item.title}</h3>
                    </div>

                    <p className="max-w-md text-sm leading-relaxed text-[#0a0a1a]/65">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="overflow-hidden rounded-[24px] border border-[#0a0a1a]/[0.08] bg-white p-8 shadow-[0_24px_70px_-40px_rgba(10,10,26,0.14)] md:p-10">
          <div className="mb-10">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF5812]">
              Client feedback
            </p>

            <h3 className="mb-6 text-2xl font-semibold text-[#0a0a1a]">
              Trusted by enterprise teams
            </h3>

            <div className="mb-2 flex items-center gap-4">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-[#FF5812] text-[#FF5812]"
                  />
                ))}
              </div>

              <p className="font-semibold text-[#0a0a1a]">4.9 / 5</p>
              <p className="text-sm text-[#0a0a1a]/50">average rating</p>
            </div>

            <p className="text-sm text-[#0a0a1a]/50">
              Based on{" "}
              <span className="font-medium text-[#0a0a1a]">
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
                          className={`h-4 w-4 ${
                            idx < review.rating
                              ? "fill-[#FF5812] text-[#FF5812]"
                              : "text-[#0a0a1a]/20"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Review Comment */}
                    <p className="mb-6 text-base leading-relaxed text-[#0a0a1a]/72">
                      &ldquo;{review.comment}&rdquo;
                    </p>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-[#FF5812]" />
                        <div>
                          <p className="text-sm font-semibold text-[#0a0a1a]">
                            {review.name}
                          </p>
                          <p className="text-xs text-[#0a0a1a]/50">
                            {review.company}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin size={13} className="text-[#0a0a1a]/40" />
                        <p className="text-xs text-[#0a0a1a]/50">
                          {review.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-6 text-[#0a0a1a]/40">
            <button
              type="button"
              onClick={() =>
                setIndex((i) => (i === 0 ? reviews.length - 1 : i - 1))
              }
              className="transition hover:text-[#0a0a1a]"
              aria-label="Previous review"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              onClick={() => setPaused(!paused)}
              className="transition hover:text-[#0a0a1a]"
              aria-label={paused ? "Play reviews" : "Pause reviews"}
            >
              {paused ? <Play size={16} /> : <Pause size={16} />}
            </button>

            <button
              type="button"
              onClick={() =>
                setIndex((i) => (i >= reviews.length - 1 ? 0 : i + 1))
              }
              className="transition hover:text-[#0a0a1a]"
              aria-label="Next review"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
