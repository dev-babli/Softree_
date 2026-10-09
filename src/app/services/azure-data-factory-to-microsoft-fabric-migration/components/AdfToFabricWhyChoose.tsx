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
  Layers,
  GitMerge,
  ShieldCheck,
  Zap,
  Database,
  Settings,
} from "lucide-react";

const whyChoose = [
  {
    icon: Layers,
    title: "Migration Architecture",
    desc: "Design future-proof data lakehouse architectures on Microsoft Fabric aligned with business goals.",
  },
  {
    icon: GitMerge,
    title: "Automated Conversion",
    desc: "Accelerate migration with programmatic conversion of legacy ADF and SSIS pipelines to Fabric.",
  },
  {
    icon: Database,
    title: "Unified Data Platform",
    desc: "Consolidate scattered data silos into a single source of truth on OneLake.",
  },
  {
    icon: Zap,
    title: "Performance Tuning",
    desc: "Optimize Spark notebooks and DirectLake BI models for sub-second query performance.",
  },
  {
    icon: ShieldCheck,
    title: "Governance & Security",
    desc: "Implement Purview data lineage, access controls, and sensitivity labels across your data estate.",
  },
  {
    icon: Settings,
    title: "Zero-Downtime Execution",
    desc: "Ensure seamless cutover with parallel runs, data parity validation, and CI/CD pipelines.",
  },
];

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

export default function AdfToFabricWhyChoose() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev >= reviews.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [paused]);

  return (
    <section className="text-gray-900 py-12 md:py-16 lg:py-20">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-[2cm] grid grid-cols-1 lg:grid-cols-2 gap-16 lg:items-stretch items-start">
        <div className="relative">
          <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-3.5 py-1 rounded-full border border-white/60 mb-4 inline-block">
            <span className="typo-caption text-[#FF6B2C] uppercase">WHY SOFTREE</span>
          </div>

          <h2 className="typo-heading-2 text-slate-900 mb-4 max-w-2xl text-balance">
            Your Dedicated{" "}
            <span className="bg-gradient-to-r from-[#FF5812] to-[#FF6B2C] bg-clip-text text-transparent">
              Microsoft Fabric Migration Team
            </span>
          </h2>

          <p className="typo-description text-slate-600 mb-8 max-w-xl">
            We don't just move your data.<br />We re-engineer your data platform for the AI era.
          </p>

          <div className="relative space-y-4">
            <div className="absolute left-[11px] top-3 bottom-3 w-px bg-gradient-to-b from-orange-500/40 via-orange-400/20 to-transparent hidden md:block" />
            {whyChoose.map((item, i) => {
              const Icon = item.icon;

              return (
                <div key={i} className="relative flex gap-4 items-start">
                  <div className="relative z-10 flex items-center justify-center w-6 h-6 mt-1 typo-caption-meta font-semibold text-orange-600 bg-white">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-7 h-7 flex items-center justify-center rounded-md bg-orange-50 text-orange-600 shrink-0">
                        <Icon size={14} />
                      </div>

                      <h3 className="typo-heading-4 text-slate-900">{item.title}</h3>
                    </div>

                    <p className="typo-body-sm text-gray-600 max-w-xl xl:max-w-none xl:whitespace-nowrap">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl p-10 bg-gradient-to-r from-black via-[#4c1c02] to-black border border-white/10 shadow-2xl h-full flex flex-col">
          <div className="mb-10">
            <div className="typo-caption text-white uppercase mb-3">
              Client Feedback
            </div>

            <h3 className="typo-heading-3 text-white mb-6">
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

              <p className="typo-heading-4 text-white">4.9 / 5</p>
              <p className="typo-body text-gray-300">average rating</p>
            </div>

            <p className="typo-body text-gray-400">
              Based on{" "}
              <span className="text-white">
                150+ client reviews
              </span>
            </p>
          </div>

          <div className="overflow-hidden relative w-full">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {reviews.map((review, i) => (
                <div key={i} className="w-full shrink-0">
                  <div className="max-w-xl">
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

                    <p className="typo-body text-gray-200 mb-6">
                      “{review.comment}”
                    </p>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-orange-400" />
                        <div>
                          <p className="typo-heading-4 text-white">
                            {review.name}
                          </p>

                          <p className="typo-caption text-gray-400">
                            {review.company}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
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
