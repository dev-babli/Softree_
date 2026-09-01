"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export interface StepWipeStep {
  /** Big background image for this step */
  image: string;
  /** Small image shown inside the centered card */
  cardImage?: string;
  /** Step title */
  title: string;
  /** Optional short description */
  description?: string;
  /** Key capability items / deliverables */
  items?: string[];
  /** Optional metric or telemetry pill */
  metric?: string;
  /** Optional CTA button link */
  buttonLink?: string;
  /** Optional CTA button text */
  buttonText?: string;
}

interface StepWipeProps {
  steps: StepWipeStep[];
  /** Seconds each step's clip-open transition takes */
  duration?: number;
  /** GSAP ease for each step's transition */
  ease?: string;
  /** Delay (in seconds) between the background and card starting */
  stagger?: number;
  /** Extra scroll distance per step, in viewport heights */
  scrollPerStep?: number;
  /** Optional extra CSS classes */
  className?: string;
}

export default function StepWipe({
  steps,
  duration = 0.9,
  ease = "expo.out",
  stagger = 0.00875,
  scrollPerStep = 1,
  className = "",
}: StepWipeProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgRefs = useRef<HTMLDivElement[]>([]);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  bgRefs.current = [];
  cardRefs.current = [];

  const addBgRef = (el: HTMLDivElement | null) => {
    if (el && !bgRefs.current.includes(el)) bgRefs.current.push(el);
  };
  const addCardRef = (el: HTMLDivElement | null) => {
    if (el && !cardRefs.current.includes(el)) cardRefs.current.push(el);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || steps.length === 0) return;

    const ctx = gsap.context(() => {
      // Start state: everything after step 0 is clipped shut
      gsap.set(bgRefs.current.slice(1), { clipPath: "inset(0 0 100% 0)" });
      gsap.set(cardRefs.current.slice(1), { clipPath: "inset(0 0 100% 0)" });
      gsap.set(bgRefs.current[0], { clipPath: "inset(0 0 0% 0)" });
      gsap.set(cardRefs.current[0], { clipPath: "inset(0 0 0% 0)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${scrollPerStep * steps.length * 100}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(
              steps.length - 1,
              Math.floor(self.progress * steps.length)
            );
            setActiveIndex(idx);
          },
        },
      });

      steps.forEach((_, i) => {
        if (i === 0) return;
        const pos = i - 1;

        tl.to(
          bgRefs.current[i],
          { clipPath: "inset(0 0 0% 0)", duration, ease },
          pos
        ).to(
          cardRefs.current[i],
          { clipPath: "inset(0 0 0% 0)", duration, ease },
          pos + stagger
        );
      });
    }, section);

    return () => ctx.revert();
  }, [steps, duration, ease, stagger, scrollPerStep]);

  const active = steps[activeIndex];

  return (
    <section ref={sectionRef} className={`step-wipe ${className}`}>
      {/* Background layers, stacked, clip-open in sequence */}
      <div className="step-wipe__backgrounds">
        {steps.map((step, i) => (
          <div
            key={i}
            ref={addBgRef}
            className="step-wipe__bg"
            style={{ backgroundImage: `url(${step.image})` }}
          />
        ))}
      </div>

      {/* Dark Vignette & Scrim Gradient for 100% Text Legibility */}
      <div className="step-wipe__overlay" aria-hidden="true" />

      {/* Right-aligned card layers, clip-open in sync with backgrounds */}
      <div className="step-wipe__card-wrap">
        <div className="step-wipe__card">
          {steps.map((step, i) => (
            <div
              key={i}
              ref={addCardRef}
              className="step-wipe__card-layer"
              style={{
                backgroundImage: `url(${step.cardImage ?? step.image})`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Advanced High-End Text & HUD Overlay on the Left */}
      <div className="step-wipe__text">
        <div key={activeIndex} className="step-wipe__content-anim">
          {/* Top HUD Row: Massive Tech Number + Live Status Badge + Progress Dots */}
          <div className="flex flex-wrap items-center gap-3.5 mb-4">
            {/* Big Advanced Number Display */}
            <div className="flex items-baseline gap-2 font-mono">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-base sm:text-lg lg:text-xl font-bold text-zinc-500 tracking-wider">
                / {String(steps.length).padStart(2, "0")}
              </span>
            </div>

            {/* Glowing Tech Stage Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6B2C]/10 border border-[#FF6B2C]/30 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B2C] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6B2C]" />
              </span>
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase text-[#FF8243]">
                Core AI Capability
              </span>
            </div>

            {/* Segmented Step Progress Dots / Bars */}
            <div className="hidden sm:flex items-center gap-1.5 ml-auto">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "w-6 bg-[#FF6B2C] shadow-[0_0_10px_#FF6B2C]"
                      : i < activeIndex
                      ? "w-2 bg-white/40"
                      : "w-2 bg-white/15"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Big Bold Headline */}
          <h2 className="step-wipe__title">{active?.title}</h2>

          {/* Advanced Bigger Description */}
          {active?.description && (
            <p className="step-wipe__description">{active.description}</p>
          )}

          {/* Advanced Capability Feature Pills */}
          {active?.items && active.items.length > 0 && (
            <div className="flex flex-col gap-2.5 my-4">
              {active.items.slice(0, 3).map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.18] hover:bg-white/[0.08] backdrop-blur-md transition-all duration-200"
                >
                  <span className="w-5 h-5 rounded-lg bg-[#FF6B2C]/20 border border-[#FF6B2C]/40 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(255,107,44,0.25)]">
                    <Check className="w-3 h-3 text-[#FF6B2C] stroke-[2.5]" />
                  </span>
                  <span className="text-xs sm:text-sm lg:text-[14.5px] font-medium text-zinc-200">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Telemetry / Impact Stat Pill */}
          {active?.metric && (
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/25 backdrop-blur-md text-xs sm:text-sm font-mono font-semibold text-emerald-300 my-1 shadow-[0_0_16px_rgba(16,185,129,0.12)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              </span>
              <span>{active.metric}</span>
            </div>
          )}

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 mt-5 pointer-events-auto">
            <Link
              href={active?.buttonLink || "/services"}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FF6B2C] to-[#ff5714] hover:from-[#ff5714] hover:to-[#e04505] text-white text-sm sm:text-base font-bold shadow-[0_8px_28px_rgba(255,107,44,0.45)] hover:shadow-[0_12px_38px_rgba(255,107,44,0.65)] hover:scale-105 active:scale-95 transition-all duration-200 whitespace-nowrap cursor-pointer group"
            >
              <span>{active?.buttonText || "Explore Services"}</span>
              <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.08] hover:bg-white/[0.18] text-white text-sm sm:text-base font-semibold border border-white/20 hover:border-white/40 backdrop-blur-xl transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer group"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform duration-200 opacity-70 group-hover:opacity-100" />
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .step-wipe {
          position: relative;
          width: 100%;
          height: min(88vh, 740px);
          overflow: hidden;
          background: #07090e;
          color: #f5f5f5;
          border-radius: 28px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.65), 0 0 50px rgba(255, 107, 44, 0.08);
        }

        .step-wipe__backgrounds {
          position: absolute;
          inset: 0;
        }

        .step-wipe__bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          filter: brightness(0.32) saturate(0.95);
          transition: filter 0.3s ease;
        }

        .step-wipe__overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 80% 50%, rgba(7, 9, 14, 0.05) 0%, rgba(7, 9, 14, 0.7) 100%),
                      linear-gradient(to right, rgba(7, 9, 14, 0.98) 0%, rgba(7, 9, 14, 0.92) 36%, rgba(7, 9, 14, 0.42) 68%, transparent 100%),
                      linear-gradient(to top, rgba(7, 9, 14, 0.85) 0%, transparent 35%);
          pointer-events: none;
          z-index: 1;
        }

        .step-wipe__card-wrap {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: max(2.5cm, 6%);
          padding-left: max(2.5cm, 6%);
          z-index: 2;
          pointer-events: none;
        }

        .step-wipe__card {
          position: relative;
          width: min(42vw, 540px);
          height: min(64vh, 560px);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 35px 90px rgba(0, 0, 0, 0.9), 0 0 50px rgba(255, 107, 44, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.18);
          pointer-events: auto;
        }

        .step-wipe__card-layer {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          filter: brightness(1.02) contrast(1.06);
        }

        .step-wipe__text {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: max(2.5cm, 6%);
          max-width: min(48vw, 620px);
          z-index: 10;
          pointer-events: none;
          padding: 0;
          background: transparent;
          border: none;
          box-shadow: none;
        }

        .step-wipe__content-anim {
          animation: stepContentIn 0.32s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes stepContentIn {
          from {
            opacity: 0.2;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .step-wipe__title {
          font-size: clamp(1.75rem, 2.7vw, 2.65rem);
          margin: 0 0 0.85rem 0;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.18;
          color: #ffffff;
          white-space: normal;
          text-shadow: 0 3px 18px rgba(0, 0, 0, 0.95), 0 6px 32px rgba(0, 0, 0, 0.8);
        }

        .step-wipe__description {
          margin: 0;
          font-size: clamp(0.98rem, 1.18vw, 1.12rem);
          line-height: 1.68;
          color: #cbd5e1;
          font-weight: 400;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.9);
        }

        @media (max-width: 1024px) {
          .step-wipe {
            height: auto;
            min-height: 840px;
          }

          .step-wipe__card-wrap {
            justify-content: center;
            padding: 0;
            top: auto;
            bottom: 32px;
            align-items: flex-end;
          }

          .step-wipe__text {
            top: 40px;
            transform: none;
            left: 6%;
            right: 6%;
            max-width: none;
          }

          .step-wipe__title {
            font-size: clamp(1.45rem, 4.2vw, 2rem);
          }

          .step-wipe__card {
            width: min(88vw, 460px);
            height: min(38vh, 340px);
          }
        }
      `}</style>
    </section>
  );
}