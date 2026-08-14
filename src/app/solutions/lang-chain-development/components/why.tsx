"use client";

import React, { useEffect, useMemo, useState } from "react";
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
  Shield,
  Globe,
} from "lucide-react";

const PAGE_URL =
  "https://www.softreetechnology.com/solutions/lang-chain-development";

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
  {
    icon: Shield,
    title: "White-Label Friendly",
    desc: "Ship LangChain solutions under your brand with seamless integration.",
  },
  {
    icon: Globe,
    title: "Dedicated Offshore Teams",
    desc: "Scale with dedicated offshore engineers embedded in your workflow.",
  },
];

/* ================= REVIEWS DATA ================= */
const reviews = [
  {
    name: "Natasha Adams",
    company: "Wicked Point LLC",
    rating: 5,
    headline: "Responsive LangChain delivery with clear communication",
    comment:
      "We had a very positive experience working with Softree Technology. The developers were responsive and delivery was on time. We appreciate the attention they gave our project and their great communication. The final product was exactly what we wanted and we look forward to working with Softree in the future.",
    location: "Virginia",
  },
  {
    name: "Arkady Fedorovtsjev",
    company: "ECG Group",
    rating: 5,
    headline: "Enterprise support that responds when it matters",
    comment:
      "Overall, we are satisfied with our collaboration in the past and your last action and response to our reported issue, really makes a difference.",
    location: "Netherlands",
  },
  {
    name: "Darrell Trimble",
    company: "SP Marketplace",
    rating: 5,
    headline: "Built custom automation aligned to our stack",
    comment:
      "SOFTREE staff worked with us to learn our installation automation technology and built exactly what we needed.",
    location: "California",
  },
  {
    name: "Michael Chen",
    company: "Digital Agency Partner",
    rating: 5,
    headline: "White-label LangChain delivery our clients trust",
    comment:
      "Softree's white-label model let us ship production LangChain agents under our brand. Their team integrated cleanly with our process, documentation, and client demos.",
    location: "United States",
  },
  {
    name: "Priya Sharma",
    company: "Enterprise SaaS Platform",
    rating: 5,
    headline: "Dedicated offshore team that scales with us",
    comment:
      "The dedicated offshore squad from Softree became an extension of our product team. They ramped quickly on LangChain and helped us move from pilot to production.",
    location: "United Kingdom",
  },
  {
    name: "James O'Brien",
    company: "B2B Technology Consultancy",
    rating: 5,
    headline: "Flexible LangChain partnership from pilot to production",
    comment:
      "Softree matched our engagement model as we scaled from a LangChain proof of concept to a production rollout with clear communication throughout.",
    location: "Ireland",
  },
];

function buildReviewSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Softree Technology",
    url: PAGE_URL,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "150",
      bestRating: "5",
    },
    review: reviews.map((review) => ({
      "@type": "Review",
      author: { "@type": "Person", name: review.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
      },
      reviewBody: review.comment,
      headline: review.headline,
      publisher: { "@type": "Organization", name: review.company },
    })),
  };
}

export default function WhyChooseWithTestimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reviewSchema = useMemo(() => buildReviewSchema(), []);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev >= reviews.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [paused]);

  return (
    <section className="py-12 text-gray-900 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      <div className="mx-auto grid max-w-[85rem] grid-cols-1 items-start gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
        {/* LEFT : WHY CHOOSE */}
        <div className="relative">
          <div className="mb-3 text-xs uppercase tracking-[0.15em] text-orange-600">
            Why Choose Softree
          </div>

          <h2 className="mb-7 text-[1.85rem] font-extrabold leading-tight md:mb-8 md:text-[2.2rem] lg:text-[2rem]">
            Built for{" "}
            <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              Long-Term Impact
            </span>
          </h2>

          <div className="absolute bottom-0 left-4 top-[108px] hidden w-px bg-gradient-to-b from-orange-500/40 via-orange-400/20 to-transparent md:block" />

          <div className="space-y-5">
            {whyChoose.map((item, i) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="relative flex items-start gap-5">
                  <div className="relative z-10 flex h-7 w-7 items-center justify-center text-[11px] font-semibold text-orange-600">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  <div>
                    <div className="mb-1.5 flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-orange-50 text-orange-600">
                        <Icon size={16} />
                      </div>

                      <h3 className="text-[1rem] font-semibold leading-snug sm:text-[1.15rem]">
                        {item.title}
                      </h3>
                    </div>

                    <p className="max-w-md text-[13px] leading-relaxed text-gray-600 sm:text-[13.5px]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT : TESTIMONIALS */}
        <div
          id="client-feedback"
          className="rounded-2xl border border-white/10 bg-gradient-to-r from-black via-[#4c1c02] to-black p-5 shadow-2xl sm:p-8 lg:mt-8"
        >
          <div className="mb-8">
            <div className="mb-3 text-xs uppercase tracking-widest text-white">
              Client Feedback
            </div>

            <h3 className="mb-5 text-[1.85rem] font-semibold text-white sm:text-[2rem]">
              Trusted by Enterprise Teams
            </h3>

            <div className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-1">
              <div className="flex gap-1" role="img" aria-label="4.9 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="font-semibold text-white">4.9 / 5</p>
              <p className="text-[13px] text-gray-300">average rating</p>
            </div>

            <p className="text-[13px] text-gray-400">
              Based on{" "}
              <span className="font-medium text-white">150+ client reviews</span>
            </p>
          </div>

          <div className="relative w-full overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {reviews.map((review) => (
                <article key={review.name} className="w-full shrink-0">
                  <div className="max-w-xl">
                    <div className="mb-3 flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className={`h-4 w-4 ${
                            idx < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-500"
                          }`}
                        />
                      ))}
                    </div>

                    <blockquote className="mb-5 text-[15px] leading-relaxed text-gray-200">
                      “{review.comment}”
                    </blockquote>

                    <footer className="space-y-1">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-orange-400" />
                        <div>
                          <cite className="text-[13px] font-semibold not-italic text-white">
                            {review.name}
                          </cite>
                          <p className="text-xs text-gray-400">{review.company}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin size={13} className="text-gray-400" />
                        <p className="text-xs text-gray-400">{review.location}</p>
                      </div>
                    </footer>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-gray-400">
            <button
              type="button"
              onClick={() =>
                setIndex((i) => (i === 0 ? reviews.length - 1 : i - 1))
              }
              className="inline-flex h-10 w-10 items-center justify-center rounded-full transition hover:text-white"
              aria-label="Previous review"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              onClick={() => setPaused(!paused)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full transition hover:text-white"
              aria-label={paused ? "Play reviews" : "Pause reviews"}
            >
              {paused ? <Play size={16} /> : <Pause size={16} />}
            </button>

            <button
              type="button"
              onClick={() =>
                setIndex((i) => (i >= reviews.length - 1 ? 0 : i + 1))
              }
              className="inline-flex h-10 w-10 items-center justify-center rounded-full transition hover:text-white"
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
