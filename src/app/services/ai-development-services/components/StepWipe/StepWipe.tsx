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
  /** Duration weight of each card slide */
  duration?: number;
  /** GSAP ease for card slide */
  ease?: string;
  /** Optional delay or stagger */
  stagger?: number;
  /** Scroll distance per step, in viewport heights */
  scrollPerStep?: number;
  /** Optional extra CSS classes */
  className?: string;
}

export default function StepWipe({
  steps,
  duration = 1,
  ease = "power2.out",
  scrollPerStep = 1,
  className = "",
}: StepWipeProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  cardRefs.current = [];

  const addCardRef = (el: HTMLDivElement | null) => {
    if (el && !cardRefs.current.includes(el)) cardRefs.current.push(el);
  };

  const goToStep = (stepIndex: number) => {
    if (!scrollTriggerRef.current || steps.length <= 1) return;
    const st = scrollTriggerRef.current;
    const progressTarget = stepIndex / (steps.length - 1);
    const targetScroll = st.start + progressTarget * (st.end - st.start);
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || steps.length === 0) return;

    const ctx = gsap.context(() => {
      // Initialize card stack: Card 0 is in place, subsequent cards are off-screen below
      gsap.set(cardRefs.current[0], {
        yPercent: 0,
        scale: 1,
        opacity: 1,
        zIndex: 1,
      });

      if (cardRefs.current.length > 1) {
        cardRefs.current.slice(1).forEach((card, idx) => {
          gsap.set(card, {
            yPercent: 100,
            scale: 1,
            opacity: 1,
            zIndex: idx + 2,
          });
        });
      }

      const totalSteps = steps.length;
      const scrollDistance = scrollPerStep * (totalSteps - 1) * 100;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85px", // Clean clearance below the fixed/floating navbar
          end: `+=${scrollDistance}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(
              totalSteps - 1,
              Math.round(self.progress * (totalSteps - 1))
            );
            setActiveIndex(idx);
          },
        },
      });

      scrollTriggerRef.current = tl.scrollTrigger ?? null;

      // Card stacking slide sequence: each full card slides up from bottom
      for (let i = 1; i < totalSteps; i++) {
        const prevCard = cardRefs.current[i - 1];
        const currCard = cardRefs.current[i];
        const pos = (i - 1) * duration;

        // Current full card slides up smoothly from yPercent: 100 to yPercent: 0
        tl.to(
          currCard,
          {
            yPercent: 0,
            duration: duration,
            ease,
          },
          pos
        );

        // Previous card subtly shifts back and scales for 3D card deck depth
        if (prevCard) {
          tl.to(
            prevCard,
            {
              scale: 0.94,
              yPercent: -6,
              opacity: 0.35,
              duration: duration,
              ease,
            },
            pos
          );
        }
      }
    }, section);

    return () => ctx.revert();
  }, [steps, duration, ease, scrollPerStep]);

  return (
    <section ref={sectionRef} className={`step-wipe-section ${className}`}>
      {/* The bounded frame in which full cards slide and stack */}
      <div className="step-wipe__frame">
        {steps.map((step, i) => (
          <div
            key={i}
            ref={addCardRef}
            className="step-wipe__card"
          >
            {/* Background Image Layer */}
            <div
              className="step-wipe__bg"
              style={{ backgroundImage: `url(${step.image})` }}
            />

            {/* Dark Vignette & Scrim Gradient for 100% Contrast & Legibility */}
            <div className="step-wipe__overlay" aria-hidden="true" />

            {/* Full Card Inner Grid Content */}
            <div className="step-wipe__card-inner">
              {/* Left Column: Full HUD, Headline, Feature Pills, Telemetry & CTAs */}
              <div className="step-wipe__left">
                {/* Top HUD Row: Massive Number, Glowing Badge & Segmented Dots */}
                <div className="flex flex-wrap items-center gap-3.5 mb-4">
                  {/* Step Number Display */}
                  <div className="flex items-baseline gap-2 font-mono">
                    <span className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]">
                      {String(i + 1).padStart(2, "0")}
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

                  {/* Segmented Step Progress Dots */}
                  <div className="hidden sm:flex items-center gap-1.5 ml-auto">
                    {steps.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        type="button"
                        onClick={() => goToStep(dotIdx)}
                        aria-label={`Go to step ${dotIdx + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          dotIdx === activeIndex
                            ? "w-6 bg-[#FF6B2C] shadow-[0_0_10px_#FF6B2C]"
                            : dotIdx < activeIndex
                            ? "w-2 bg-white/45 hover:bg-white/70"
                            : "w-2 bg-white/15 hover:bg-white/35"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Big Bold Headline */}
                <h2 className="step-wipe__title">{step.title}</h2>

                {/* Description */}
                {step.description && (
                  <p className="step-wipe__description">{step.description}</p>
                )}

                {/* Capability Feature Pills */}
                {step.items && step.items.length > 0 && (
                  <div className="flex flex-col gap-2.5 my-4">
                    {step.items.slice(0, 3).map((item, idx) => (
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
                {step.metric && (
                  <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/25 backdrop-blur-md text-xs sm:text-sm font-mono font-semibold text-emerald-300 my-1 shadow-[0_0_16px_rgba(16,185,129,0.12)]">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                    </span>
                    <span>{step.metric}</span>
                  </div>
                )}

                {/* Action CTAs */}
                <div className="flex flex-wrap items-center gap-3.5 mt-5 pointer-events-auto">
                  <Link
                    href={step.buttonLink || "/services"}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FF6B2C] to-[#ff5714] hover:from-[#ff5714] hover:to-[#e04505] text-white text-sm sm:text-base font-bold shadow-[0_8px_28px_rgba(255,107,44,0.45)] hover:shadow-[0_12px_38px_rgba(255,107,44,0.65)] hover:scale-105 active:scale-95 transition-all duration-200 whitespace-nowrap cursor-pointer group"
                  >
                    <span>{step.buttonText || "Explore Services"}</span>
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

              {/* Right Column: Preview Image Frame */}
              <div className="step-wipe__right">
                <div
                  className="step-wipe__preview-card"
                  style={{
                    backgroundImage: `url(${step.cardImage ?? step.image})`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .step-wipe-section {
          position: relative;
          width: 100%;
          padding-top: 8px;
          padding-bottom: 24px;
        }

        .step-wipe__frame {
          position: relative;
          width: 100%;
          height: min(82vh, 720px);
          overflow: hidden;
          border-radius: 28px;
        }

        .step-wipe__card {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background: #07090e;
          color: #f5f5f5;
          border-radius: 28px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          box-shadow: 0 -12px 40px rgba(0, 0, 0, 0.8), 0 30px 80px rgba(0, 0, 0, 0.75), 0 0 50px rgba(255, 107, 44, 0.08);
          overflow: hidden;
          will-change: transform, opacity;
          transform-origin: center top;
        }

        .step-wipe__bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          filter: brightness(0.28) saturate(0.95);
        }

        .step-wipe__overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 80% 50%, rgba(7, 9, 14, 0.05) 0%, rgba(7, 9, 14, 0.72) 100%),
                      linear-gradient(to right, rgba(7, 9, 14, 0.98) 0%, rgba(7, 9, 14, 0.92) 38%, rgba(7, 9, 14, 0.42) 70%, transparent 100%),
                      linear-gradient(to top, rgba(7, 9, 14, 0.85) 0%, transparent 35%);
          pointer-events: none;
          z-index: 1;
        }

        .step-wipe__card-inner {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 max(2.5cm, 6%);
          gap: 3rem;
          pointer-events: none;
        }

        .step-wipe__left {
          flex: 1 1 54%;
          max-width: min(52vw, 640px);
          pointer-events: auto;
        }

        .step-wipe__right {
          flex: 1 1 46%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          pointer-events: auto;
        }

        .step-wipe__preview-card {
          position: relative;
          width: min(40vw, 520px);
          height: min(60vh, 520px);
          border-radius: 24px;
          overflow: hidden;
          background-size: cover;
          background-position: center;
          filter: brightness(1.02) contrast(1.06);
          box-shadow: 0 35px 90px rgba(0, 0, 0, 0.9), 0 0 50px rgba(255, 107, 44, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.18);
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
          .step-wipe__frame {
            height: auto;
            min-height: 840px;
          }

          .step-wipe__card-inner {
            flex-direction: column;
            justify-content: flex-start;
            padding: 36px 6% 32px;
            gap: 1.5rem;
            overflow-y: auto;
          }

          .step-wipe__left {
            max-width: 100%;
            width: 100%;
          }

          .step-wipe__right {
            width: 100%;
            justify-content: center;
          }

          .step-wipe__title {
            font-size: clamp(1.45rem, 4.2vw, 2rem);
          }

          .step-wipe__preview-card {
            width: min(88vw, 460px);
            height: min(34vh, 320px);
          }
        }
      `}</style>
    </section>
  );
}