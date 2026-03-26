"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroWithTestimonial() {
  /* ================= TESTIMONIAL DATA ================= */

  /* ================= UI ================= */
  return (
  <section className="relative overflow-hidden bg-gradient-to-br from-[#0b3ea8] via-[#1557c0] to-[#1e73d8] text-white min-h-[600px] flex items-center pt-24 pb-16">
      {/* Glow accents */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-600/20 blur-[160px] rounded-full" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/20 blur-[140px] rounded-full" />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur text-xs tracking-widest uppercase">
          MVP Development
        </span>

        {/* Heading */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight">
          Build Your MVP
          <br />
          <span className="bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent">
            Launch Faster, Validate Smarter
          </span>
        </h1>

        {/* Description */}
        <p className="mt-5 text-base md:text-lg text-white/75 max-w-2xl mx-auto">
          Turn your idea into a real product in weeks. We design and develop
          scalable MVPs that help you validate quickly, reduce risk, and get to
          market with confidence.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/contact">
            <button className="bg-white text-blue-700 px-6 py-3 rounded-xl font-medium shadow-lg hover:scale-105 hover:bg-blue-50 transition">
              Start Your MVP
            </button>
          </Link>

          <button className="px-6 py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition">
            View Demo
          </button>
        </div>

        {/* Quick Trust / Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-10 text-sm text-white/80">
          <div>
            <p className="text-xl font-semibold text-white">4–8 Weeks</p>
            Delivery Time
          </div>
          <div>
            <p className="text-xl font-semibold text-white">70%</p>
            Cost Efficient
          </div>
          <div>
            <p className="text-xl font-semibold text-white">Scalable</p>
            Production Ready
          </div>
        </div>
      </div>

      {/* ================= SOFT WAVE ================= */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 160"
          className="w-full h-[90px]"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="contactFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#FAFAFA" />
            </linearGradient>
          </defs>

          <path
            d="M0,90 C300,140 900,140 1440,90 L1440,160 L0,160 Z"
            fill="url(#contactFade)"
          />
        </svg>
      </div>
    </section>
  );
}
