"use client";

import React from "react";
import { SectionLabel } from "../ui/SectionLabel";
import SuccessStoryCarousel from "./SuccessStoryCarousel";

export default function SuccessStories() {
  return (
    <section className="relative w-full py-20 bg-transparent overflow-hidden">
      {/* Background Decorators */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] border-b border-r border-[#FF6B2C]/10 rounded-br-[100%] opacity-20 pointer-events-none -translate-x-1/4 -translate-y-1/4"></div>

      <div className="relative z-10 flex flex-col items-center w-full">
        <div className="relative z-10 mb-10 text-center w-full">
          <SectionLabel>Success Stories</SectionLabel>

          <h2 className="section-h2 text-[#0a0a1a]">
            Real-World{" "}
            <span className="bg-gradient-to-r from-[#FF5812] to-[#FF7A2F] bg-clip-text text-transparent font-bold">
              AI Success Stories
            </span>
          </h2>

          <p className="body-prose mx-auto mt-4 max-w-2xl text-[#0a0a1a]/70">
            Discover how our enterprise AI solutions solve real business challenges and deliver
            measurable outcomes across industries.
          </p>
        </div>

        {/* Full width Carousel Wrapper */}
        <SuccessStoryCarousel />
      </div>
    </section>
  );
}
