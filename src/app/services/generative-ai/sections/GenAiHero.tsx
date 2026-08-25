"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";

// Trust Row Icons
function ShieldIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

export function GenAiHero({
  badgeText = "Generative AI Development",
  heading,
  subheading,
}: {
  badgeText?: string;
  heading?: React.ReactNode;
  subheading?: string;
} = {}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden font-['DM_Sans',sans-serif]">
      {/* Layer 1: Background Video */}
      {/* 👇👇 TO ADD YOUR VIDEO 👇👇 */}
      {/* Replace the file at: public/videos/generative-ai-hero.mp4 */}
      {/* Or change the src="/videos/..." path below to point to your new video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 object-cover z-0 w-full h-full"
      >
        <source src="/hero-video/generative-ai-hero.mp4" type="video/mp4" />
      </video>

      {/* Layer 2: Dark Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,.78) 0%, rgba(0,0,0,.45) 50%, rgba(0,0,0,.70) 100%)",
        }}
      />

      {/* Layer 3: Content Container */}
      <div className="relative z-20 min-h-screen flex flex-col justify-center pt-[100px] pb-24 md:pb-32 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div
          className="max-w-[700px] transition-all duration-1000 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
          }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-sm font-semibold text-orange-400 uppercase tracking-wider">
              {badgeText}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-6 font-['Syne',sans-serif]">
            {heading || (
              <>
                Offshore Generative AI
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                  Development Partner
                </span>
              </>
            )}
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed font-normal">
            {subheading || "Extend your delivery capabilities with production-ready LLM applications, RAG solutions, AI copilots, and intelligent automation built by Softree's offshore engineering team."}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="flex items-center gap-2 bg-gradient-to-r from-[#FF5812] to-[#FF6B00] text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,88,18,0.3)]"
            >
              <Phone className="w-5 h-5" />
              Talk to our Expert
            </Link>

          </div>
        </div>
      </div>

      {/* Layer 4: Trust Row */}
      <div
        className="absolute bottom-10 left-0 right-0 z-20 transition-all duration-1000 delay-300 ease-out"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="bg-[#080c14]/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Trust Item 1 */}
              <div className="flex items-center gap-4">
                <div className="text-orange-500 p-2.5 bg-white/5 rounded-xl border border-white/5">
                  <ShieldIcon />
                </div>
                <div>
                  <div className="text-base font-bold text-white mb-1 font-['Syne',sans-serif]">
                    White-Label Friendly
                  </div>
                  <div className="text-sm text-gray-400">Seamless integration</div>
                </div>
              </div>

              {/* Trust Item 2 */}
              <div className="flex items-center gap-4">
                <div className="text-orange-500 p-2.5 bg-white/5 rounded-xl border border-white/5">
                  <UsersIcon />
                </div>
                <div>
                  <div className="text-base font-bold text-white mb-1 font-['Syne',sans-serif]">
                    Dedicated Offshore Teams
                  </div>
                  <div className="text-sm text-gray-400">Scalable capacity</div>
                </div>
              </div>

              {/* Trust Item 3 */}
              <div className="flex items-center gap-4">
                <div className="text-orange-500 p-2.5 bg-white/5 rounded-xl border border-white/5">
                  <CloudIcon />
                </div>
                <div>
                  <div className="text-base font-bold text-white mb-1 font-['Syne',sans-serif]">
                    Microsoft AI Expertise
                  </div>
                  <div className="text-sm text-gray-400">Certified partners</div>
                </div>
              </div>

              {/* Trust Item 4 */}
              <div className="flex items-center gap-4">
                <div className="text-orange-500 p-2.5 bg-white/5 rounded-xl border border-white/5">
                  <CheckCircleIcon />
                </div>
                <div>
                  <div className="text-base font-bold text-white mb-1 font-['Syne',sans-serif]">
                    Enterprise-Ready Delivery
                  </div>
                  <div className="text-sm text-gray-400">Proven execution</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
