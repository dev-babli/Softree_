"use client";

import React, { useRef, useEffect } from "react";
import { ArrowRight, ShieldCheck, Users, Cloud, CheckCircle2 } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HealthcareHeroProps {
  videoSrc?: string;
  posterSrc?: string;
}

export function HealthcareHero({
  videoSrc = "/videos/ai-healthcare-hero.mp4",
  posterSrc = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600&auto=format&fit=crop",
}: HealthcareHeroProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !wrapperRef.current || !textRef.current || !mediaRef.current) return;

    // Create GSAP ScrollTrigger timeline
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 1,
          pin: stickyRef.current,
          anticipatePin: 1,
        },
      });

      // 1. Media Section slides up seamlessly to cover the text section (top 100% -> 0%)
      tl.to(
        mediaRef.current,
        {
          yPercent: -100,
          ease: "none",
        },
        0
      );

      // 2. Hero Text translates down slightly (y: 150) and fades out to opacity: 0
      tl.to(
        textRef.current,
        {
          y: 150,
          opacity: 0,
          scale: 0.95,
          ease: "power1.inOut",
        },
        0
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full h-[200vh] bg-gradient-to-b from-zinc-50 via-white to-zinc-50"
    >

      {/* FIXED STICKY CONTAINER (h-screen w-full overflow-hidden relative) */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden relative flex flex-col items-center justify-center"
      >
        {/* HERO TEXT SECTION (z-index: 10, positioned absolutely in center) */}
        <div
          ref={textRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-6 z-10 will-change-transform"
        >
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#FF5812]/20 bg-orange-50 text-[#FF5812] text-xs font-semibold mb-5 shadow-xs backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FF5812]" />
            <span>AI Healthcare Development Services</span>
          </div>

          {/* H1 Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-[38px] lg:text-[42px] xl:text-[44px] font-bold tracking-tight text-gray-900 leading-[1.2] mb-5 max-w-3xl mx-auto">
            Build Secure, Intelligent & Scalable Healthcare Solutions{" "}
            <span className="text-[#FF5812]">
              With an Offshore AI Development Team
            </span>
          </h1>

          {/* Subheading Paragraph */}
          <p className="text-sm sm:text-base md:text-[17px] text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto font-normal">
            Custom AI solutions for healthcare providers, health-tech companies, hospitals, clinics and healthcare platforms.
          </p>

          {/* Action Button */}
          <div className="flex justify-center w-full">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#FF5812] text-white text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-black transition-all duration-300 shadow-lg shadow-orange-500/20 group"
            >
              <span>TALK TO OUR AI EXPERTS</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* MEDIA SECTION OVERLAY (z-index: 20, positioned absolutely at top: 100%) */}
        <div
          ref={mediaRef}
          className="absolute top-[100%] left-0 w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 z-20 will-change-transform"
        >
          <div className="relative w-full max-w-[1400px] h-[82vh] min-h-[580px] max-h-[820px] bg-[#0B0F19] rounded-3xl overflow-hidden border border-gray-200/80 shadow-2xl flex flex-col justify-between p-6 sm:p-8 md:p-10 lg:p-12">
            {/* Background HTML5 Video / AI Robot Image */}
            <video
              autoPlay
              loop
              muted
              playsInline
              disablePictureInPicture
              disableRemotePlayback
              poster={posterSrc}
              className="absolute inset-0 w-full h-full object-cover filter brightness-95 contrast-105 pointer-events-none"
            >
              <source src={videoSrc} type="video/mp4" />
              <source src="/hero-video/generative-ai-hero.mp4" type="video/mp4" />
              <source src="/hero-video/herobg-video.mp4" type="video/mp4" />
              <source
                src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b%2F68e6057dd670c86ab26c8544_Softree%20Hero%20Banner%20Ripple%20BG-transcode.mp4"
                type="video/mp4"
              />
            </video>

            {/* Dark Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/70 pointer-events-none" />

            {/* HERO CONTENT OVERLAY IN VIDEO (Matches Screenshot 3) */}
            <div className="relative z-30 max-w-3xl pt-2 sm:pt-4">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#FF5812] animate-pulse" />
                <span>Offshore AI Healthcare Development Partner</span>
              </div>

              {/* H1 / H2 Title */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold tracking-tight text-white leading-[1.18] mb-4">
                Build Secure, Intelligent & Scalable Healthcare Solutions{" "}
                <span className="text-[#FF5812]">
                  With an Offshore AI Development Team
                </span>
              </h2>

              {/* Subheading Paragraph */}
              <p className="text-sm sm:text-base md:text-[17px] text-gray-300 leading-relaxed mb-6 max-w-2xl font-normal">
                Custom AI solutions for healthcare providers, health-tech companies, hospitals, clinics and healthcare platforms.
              </p>

              {/* Action CTA Button */}
              <div className="flex items-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#FF5812] text-white text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 shadow-lg shadow-orange-500/20 group"
                >
                  <span>TALK TO OUR AI EXPERTS</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            {/* FEATURE BAR: Positioned at bottom */}
            <div className="relative z-30 w-full pt-4">
              <div className="bg-[#0B0F19]/90 border border-white/15 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
                  {/* Item 1 */}
                  <div className="flex items-center gap-4 sm:border-r border-white/10 sm:pr-4 last:border-r-0">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF5812] shrink-0">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white leading-tight">
                        White-Label Friendly
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5 font-medium">
                        Seamless integration
                      </div>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-center gap-4 lg:border-r border-white/10 lg:pr-4 last:border-r-0">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF5812] shrink-0">
                      <Users size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white leading-tight">
                        Dedicated Offshore Teams
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5 font-medium">
                        Scalable capacity
                      </div>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="flex items-center gap-4 sm:border-r border-white/10 sm:pr-4 last:border-r-0">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF5812] shrink-0">
                      <Cloud size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white leading-tight">
                        Microsoft AI Expertise
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5 font-medium">
                        Certified partners
                      </div>
                    </div>
                  </div>

                  {/* Item 4 */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF5812] shrink-0">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white leading-tight">
                        Enterprise-Ready Delivery
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5 font-medium">
                        Proven execution
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
