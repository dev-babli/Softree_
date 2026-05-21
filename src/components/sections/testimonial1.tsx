"use client";

import React, { useEffect, useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

/* ================= TYPES ================= */
type Review = {
  name: string;
  rating: number;
  location: string;
  time: string;
  verified: boolean;
  comment: string;
};

/* ================= DATA ================= */
const reviews: Review[] = [
  {
    name: "Rajesh Kumar",
    rating: 5,
    location: "Bengaluru, India",
    time: "6 months ago",
    verified: true,
    comment:
      "Softree delivered a well-architected SharePoint and Power Platform solution that significantly improved our internal workflows. The team was knowledgeable, responsive, and easy to work with.",
  },
  {
    name: "Sarah Thompson",
    rating: 5,
    location: "London, United Kingdom",
    time: "9 months ago",
    verified: true,
    comment:
      "We partnered with Softree for a Microsoft 365 and Azure modernization project. Their consultants clearly understood our requirements and delivered high-quality results on time.",
  },
  {
    name: "Amit Verma",
    rating: 4,
    location: "Pune, India",
    time: "1 year ago",
    verified: true,
    comment:
      "Softree supported us with custom Power Apps and Power Automate workflows. The solution reduced manual effort and improved visibility across teams.",
  },
  {
    name: "Michael Roberts",
    rating: 5,
    location: "Toronto, Canada",
    time: "8 months ago",
    verified: true,
    comment:
      "Excellent experience working with Softree on an enterprise web application using React and Azure. Strong technical expertise and clear communication throughout the project.",
  },
  {
    name: "Neha Sharma",
    rating: 5,
    location: "Hyderabad, India",
    time: "10 months ago",
    verified: true,
    comment:
      "Softree’s AI-driven automation helped streamline our document processing and reporting. The team demonstrated deep understanding of modern cloud and AI technologies.",
  },
  {
    name: "Vikram Malhotra",
    rating: 5,
    location: "Gurugram, India",
    time: "4 months ago",
    verified: true,
    comment:
      "Softree helped us redesign our SharePoint intranet and migrate content to Microsoft 365. The delivery was smooth and the solution is now widely adopted across teams.",
  },
  {
    name: "Laura Mitchell",
    rating: 5,
    location: "Austin, United States",
    time: "7 months ago",
    verified: true,
    comment:
      "We engaged Softree for a Power BI and reporting solution. Their consultants understood our data challenges and delivered dashboards that leadership actually uses.",
  },
];

/* ================= MAIN COMPONENT ================= */
export default function ReviewsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [index, setIndex] = useState(0);

  const CARD_WIDTH = 320;
  const VISIBLE_CARDS = 2;

  /* ================= AUTOPLAY ================= */
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setIndex((prev) => {
        const maxIndex = reviews.length - VISIBLE_CARDS;
        return prev >= maxIndex ? 0 : prev + VISIBLE_CARDS;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [paused]);

  /* ================= MOVE TRACK ================= */
  useEffect(() => {
    if (!trackRef.current) return;
    trackRef.current.style.transform = `translateX(-${index * CARD_WIDTH}px)`;
  }, [index]);

  return (
    <section className="bg-gradient-to-b from-black via-[#020d1a] to-black">
      <div className="py-2">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-[#0f172a] via-[#020617] to-black rounded-2xl p-10">
            <div className="grid grid-cols-12 gap-10 items-start">
              {/* ================= LEFT ================= */}
              <div className="col-span-12 md:col-span-3 text-white">
                <h3 className="text-xl font-semibold mb-3">
                  Trusted by Enterprise Teams
                </h3>

                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-sm text-gray-300">
                  <strong className="text-white">4.9 / 5</strong> average rating
                </p>

                <p className="text-sm text-gray-300 mb-6">
                  Based on <strong className="text-white">150+</strong> client
                  reviews
                </p>

                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="font-semibold tracking-wide">
                    Softree Client Feedback
                  </span>
                </div>
              </div>

              {/* ================= RIGHT SLIDER ================= */}
              <div
                className="col-span-12 md:col-span-9 relative overflow-hidden"
                style={{ width: `${CARD_WIDTH * VISIBLE_CARDS}px` }}
              >
                <div
                  ref={trackRef}
                  className="flex gap-10 transition-transform duration-700 ease-in-out"
                  style={{ width: reviews.length * CARD_WIDTH }}
                >
                  {reviews.map((review, i) => (
                    <ReviewCard key={i} review={review} />
                  ))}
                </div>

                {/* ================= CONTROLS ================= */}
                <div className="flex justify-end items-center gap-6 mt-6 text-gray-300">
                  <button
                    onClick={() =>
                      setIndex((i) => Math.max(i - VISIBLE_CARDS, 0))
                    }
                    className="hover:text-white transition"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <button
                    onClick={() => setPaused(!paused)}
                    className="flex items-center gap-2 text-xs uppercase tracking-wide hover:text-white transition"
                  >
                    {paused ? <Play size={14} /> : <Pause size={14} />}
                    {paused ? "Play" : "Pause"}
                  </button>

                  <button
                    onClick={() =>
                      setIndex((i) => {
                        const maxIndex = reviews.length - VISIBLE_CARDS;
                        return i >= maxIndex ? 0 : i + VISIBLE_CARDS;
                      })
                    }
                    className="hover:text-white transition"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= CARD ================= */
function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="w-[390px] pr-10">
      <div className="text-sm font-semibold text-white mb-1">{review.name}</div>

      {review.verified && (
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
          ✔ Verified Customer
        </div>
      )}

      <div className="flex gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < review.rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-600"
            }`}
          />
        ))}
      </div>

      <p className="text-sm text-gray-300 leading-relaxed mb-4">
        {review.comment}
      </p>

      <p className="text-xs text-gray-500">
        {review.location}, {review.time}
      </p>
    </div>
  );
}
