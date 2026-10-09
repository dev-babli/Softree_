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
  Database,
  Layers,
  RefreshCw,
  Zap,
  ShieldCheck,
  GitBranch,
} from "lucide-react";

/* ================= WHY CHOOSE DATA ================= */
const whyChoose = [
  {
    icon: RefreshCw,
    title: "Pipeline & Data Architecture Assessment",
    desc: "Complete audit of your existing ADF pipelines, triggers, copy activities, SSIS packages, and ADLS Gen2 lakes.",
  },
  {
    icon: Layers,
    title: "Automated ADF & SSIS Conversion",
    desc: "Convert legacy pipeline code, expressions, and SSIS packages into native Fabric Data Pipelines and PySpark notebooks.",
  },
  {
    icon: Database,
    title: "OneLake & Delta Lakehouse Engineering",
    desc: "Unify storage into OneLake shortcuts and high-throughput Delta Parquet tables for zero-duplication data access.",
  },
  {
    icon: Zap,
    title: "DirectLake Power BI Optimization",
    desc: "Accelerate report response times by upgrading import mode models to DirectLake on OneLake.",
  },
  {
    icon: ShieldCheck,
    title: "Purview Governance & RBAC Security",
    desc: "Configure automated Microsoft Purview sensitivity labels, column/row level security, and access controls.",
  },
  {
    icon: GitBranch,
    title: "Enterprise DevOps & CI/CD Pipelines",
    desc: "Set up automated Git integration and deployment pipelines for seamless dev, test, and production release cycles.",
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

export default function AdfToFabricWhySoftree() {
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
    <section className="text-slate-900 py-12 md:py-16 lg:py-20 bg-white">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-[2cm] grid grid-cols-1 lg:grid-cols-2 gap-16 lg:items-stretch items-start">
        {/* ================= LEFT : WHY CHOOSE ================= */}
        <div className="relative">
          {/* Small Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 typo-caption text-[#FF6B00] uppercase mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
            WHY SOFTREE
          </div>

          {/* Heading */}
          <h2 className="typo-heading-2 text-slate-900 mb-4 max-w-2xl text-balance">
            Your Offshore{" "}
            <span className="bg-gradient-to-r from-[#FF5812] to-[#FF6B2C] bg-clip-text text-transparent">
              Fabric Migration Engineering Team
            </span>
          </h2>

          <p className="typo-description text-slate-600 mb-8 max-w-xl">
            We don't just copy ADF pipelines.<br />We architect high-performance, cost-optimized Microsoft Fabric lakehouses.
          </p>

          {/* Features */}
          <div className="relative space-y-4">
            <div className="absolute left-[11px] top-3 bottom-3 w-px bg-gradient-to-b from-orange-500/40 via-orange-400/20 to-transparent hidden md:block" />
            {whyChoose.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="relative flex gap-4 items-start">
                  {/* Number */}
                  <div className="relative z-10 flex items-center justify-center w-6 h-6 mt-1 typo-caption-meta font-semibold text-orange-600 bg-white">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  {/* Content */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-7 h-7 flex items-center justify-center rounded-md bg-orange-50 text-orange-600 shrink-0">
                        <Icon size={14} />
                      </div>
                      <h3 className="typo-heading-4 text-slate-900 font-semibold">{item.title}</h3>
                    </div>

                    <p className="typo-body-sm text-slate-600 max-w-xl">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= RIGHT : TESTIMONIALS CARD ================= */}
        <div className="rounded-2xl p-8 sm:p-10 bg-gradient-to-r from-black via-[#4c1c02] to-black border border-white/10 shadow-2xl h-full flex flex-col justify-between">
          {/* Header */}
          <div className="mb-10">
            <div className="typo-caption text-orange-400 uppercase tracking-widest mb-3 font-semibold">
              CLIENT FEEDBACK
            </div>

            <h3 className="typo-heading-3 text-white mb-6 font-bold text-3xl">
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

              <p className="typo-heading-4 text-white font-bold">4.9 / 5</p>
              <p className="typo-body text-gray-300">average rating</p>
            </div>

            <p className="typo-body text-gray-400">
              Based on{" "}
              <span className="text-white font-medium">
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
                    <p className="typo-body text-gray-200 mb-6 text-base sm:text-lg leading-relaxed italic">
                      “{review.comment}”
                    </p>

                    {/* Reviewer Info */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-orange-400" />
                        <div>
                          <p className="typo-heading-4 text-white font-semibold">
                            {review.name}
                          </p>
                          <p className="typo-caption text-gray-400">
                            {review.company}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <MapPin size={13} className="text-gray-400" />
                        <p className="typo-caption text-gray-400">
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
          <div className="flex items-center gap-6 mt-8 pt-8 border-t border-white/10 text-gray-400">
            <button
              onClick={() =>
                setIndex((i) => (i === 0 ? reviews.length - 1 : i - 1))
              }
              className="hover:text-white transition p-1"
              aria-label="Previous review"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={() => setPaused(!paused)}
              className="hover:text-white transition p-1"
              aria-label={paused ? "Play" : "Pause"}
            >
              {paused ? <Play size={18} /> : <Pause size={18} />}
            </button>

            <button
              onClick={() =>
                setIndex((i) => (i >= reviews.length - 1 ? 0 : i + 1))
              }
              className="hover:text-white transition p-1"
              aria-label="Next review"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
