"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SuccessStoryCard from "./SuccessStoryCard";
import { successStoriesList } from "../../ai-development-services/data/success-stories";

export default function SuccessStoriesShowcase() {
  const [startIndex, setStartIndex] = useState(0);

  const visibleStories = Array.from(
    { length: 3 },
    (_, index) =>
      successStoriesList[(startIndex + index) % successStoriesList.length],
  );

  const showPrevious = () => {
    setStartIndex(
      (current) =>
        (current - 1 + successStoriesList.length) % successStoriesList.length,
    );
  };

  const showNext = () => {
    setStartIndex((current) => (current + 1) % successStoriesList.length);
  };

  return (
    <section className="overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50 py-20">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          <div className="text-center md:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200/50 bg-orange-50/50 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF5812]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF5812] animate-pulse" />
              Success Stories
            </div>
            <h2 className="section-h2 text-[#0a0a1a]">
              Enterprise AI with{" "}
              <span className="bg-gradient-to-r from-[#FF5812] to-[#FF7A2F] bg-clip-text text-transparent font-bold">
                measurable impact
              </span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#0a0a1a]/70">
              Explore how focused AI solutions turn operational challenges into
              faster workflows, stronger decisions, and measurable business results.
            </p>
          </div>

          <div className="flex shrink-0 gap-3">
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Show previous success stories"
              className="grid h-11 w-11 place-items-center rounded-full border border-orange-200 bg-white text-[#0a0a1a] shadow-sm transition hover:border-[#FF5812] hover:text-[#FF5812]"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Show next success stories"
              className="grid h-11 w-11 place-items-center rounded-full bg-[#FF5812] text-white shadow-[0_8px_20px_rgba(255,88,18,0.25)] transition hover:bg-[#FF6B00]"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {visibleStories.map((story, index) => (
            <div
              key={`${startIndex}-${story.id}`}
              className={`h-full w-full ${
                index === 1
                  ? "mx-auto block max-w-xl lg:max-w-none"
                  : "hidden lg:block"
              }`}
            >
              <SuccessStoryCard item={story} isActive={index === 1} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
