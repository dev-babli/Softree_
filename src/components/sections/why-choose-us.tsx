"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { Star, Quote, ArrowLeft, ArrowRight, Zap, Users, ShieldCheck, Layers } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ================= DATA ================= */
const pillars = [
  {
    icon: Zap,
    number: "01",
    title: "Agile Engineering",
    desc: "Rapid sprint cycles, CI/CD pipelines, and battle-tested delivery practices that ship features without breaking production.",
    stat: "3×",
    statLabel: "Faster delivery",
  },
  {
    icon: Users,
    number: "02",
    title: "Direct Leadership Access",
    desc: "You work with senior engineers and decision-makers from day one — no account managers, no communication layers.",
    stat: "100%",
    statLabel: "Senior team",
  },
  {
    icon: ShieldCheck,
    number: "03",
    title: "Trusted Since 2013",
    desc: "Over a decade of building robust enterprise software. Our track record speaks through 150+ delivered projects across 4 continents.",
    stat: "12+",
    statLabel: "Years of craft",
  },
  {
    icon: Layers,
    number: "04",
    title: "Flexible Engagement",
    desc: "Staff augmentation, dedicated squads, or full-project ownership — our models adapt to your roadmap, not the other way around.",
    stat: "50+",
    statLabel: "Active clients",
  },
];

const reviews = [
  {
    name: "Natasha Adams",
    company: "Wicked Point LLC",
    role: "Founder & CEO",
    rating: 5,
    comment:
      "We had a very positive experience working with Softree Technology. The developers were responsive and delivery was on time. The final product was exactly what we wanted and we look forward to working with Softree in the future.",
    location: "Virginia, USA",
    initials: "NA",
  },
  {
    name: "Arkady Fedorovtsjev",
    company: "ECG Group",
    role: "Head of Engineering",
    rating: 5,
    comment:
      "We are thoroughly satisfied with our collaboration. Your last action and response to our reported issue really makes a difference — it shows genuine commitment to quality.",
    location: "Netherlands",
    initials: "AF",
  },
  {
    name: "Darrell Trimble",
    company: "SP Marketplace",
    role: "VP of Product",
    rating: 5,
    comment:
      "Softree staff took the time to deeply understand our installation automation technology and built precisely what we needed. Exceptional technical depth.",
    location: "California, USA",
    initials: "DT",
  },
];

/* ================= STAT COUNTER ================= */
function StatCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const numMatch = value.match(/[\d.]+/);
    if (!numMatch) return;
    const target = parseFloat(numMatch[0]);
    const suffix = value.replace(numMatch[0], "");

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => {
        if (hasRun.current) return;
        hasRun.current = true;
        const proxy = { val: 0 };
        gsap.fromTo(
          proxy,
          { val: 0 },
          {
            val: target,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent =
                (Number.isInteger(target)
                  ? Math.round(proxy.val)
                  : proxy.val.toFixed(1)) + suffix;
            },
          }
        );
      },
    });

    return () => trigger.kill();
  }, [value]);

  return (
    <div className="text-center">
      <span ref={ref} className="block text-2xl font-bold text-[#ff7a2f] tabular-nums">
        {value}
      </span>
      <span className="text-[11px] uppercase tracking-widest text-white/40 mt-0.5 block">
        {label}
      </span>
    </div>
  );
}

/* ================= MAIN COMPONENT ================= */
export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animating, setAnimating] = useState(false);

  const prev = useCallback(() => {
    if (animating) return;
    setAnimating(true);
    setIndex((i) => (i === 0 ? reviews.length - 1 : i - 1));
    setTimeout(() => setAnimating(false), 500);
  }, [animating]);

  const next = useCallback(() => {
    if (animating) return;
    setAnimating(true);
    setIndex((i) => (i >= reviews.length - 1 ? 0 : i + 1));
    setTimeout(() => setAnimating(false), 500);
  }, [animating]);

  /* AUTOPLAY */
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next]);

  /* GSAP SCROLL ANIMATIONS */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Heading fade-up */
      gsap.from(headingRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
      });

      /* Pillar cards stagger */
      const cards = pillarsRef.current?.querySelectorAll(".pillar-card");
      if (cards) {
        gsap.from(cards, {
          y: 50,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: pillarsRef.current,
            start: "top 78%",
          },
        });
      }

      /* Testimonials panel slide-in */
      gsap.from(testimonialsRef.current, {
        x: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const review = reviews[index];

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-[#0a0a0a] text-white overflow-hidden"
    >
      {/* ── Ambient glows ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#ff7a2f]/6 blur-[140px]" />
        <div className="absolute bottom-0 right-1/5 w-[400px] h-[400px] rounded-full bg-[#ff7a2f]/4 blur-[120px]" />
      </div>

      {/* ── Grain texture ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Section heading ── */}
        <div ref={headingRef} className="mb-20">
          <p className="text-xs uppercase tracking-[0.2em] text-[#ff7a2f] mb-4 font-medium">
            Why Softree
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] max-w-xl">
              Built for{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(120deg, #ff7a2f 0%, #ffb347 50%, #ff7500 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                long-term impact,
              </span>{" "}
              not short-term wins.
            </h2>
            <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-xs md:text-right">
              Four core principles that define how we build, collaborate, and deliver — consistently.
            </p>
          </div>
        </div>

        {/* ── Main grid: Pillars left + Testimonials right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px] gap-8 items-start">

          {/* ── LEFT: Pillars ── */}
          <div ref={pillarsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.number}
                  className="pillar-card group relative rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6
                    hover:border-[#ff7a2f]/30 hover:bg-[#ff7a2f]/[0.04]
                    transition-all duration-300 cursor-default"
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center
                        bg-[#ff7a2f]/10 text-[#ff7a2f]
                        group-hover:bg-[#ff7a2f]/20 transition-colors duration-300"
                    >
                      <Icon size={18} />
                    </div>
                    <span className="text-[11px] font-mono text-white/20 group-hover:text-[#ff7a2f]/50 transition-colors">
                      {p.number}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-base font-semibold tracking-tight mb-2 text-white/90">
                    {p.title}
                  </h3>
                  <p className="text-sm text-white/45 leading-relaxed mb-5">
                    {p.desc}
                  </p>

                  {/* Stat */}
                  <div className="pt-4 border-t border-white/[0.06]">
                    <StatCounter value={p.stat} label={p.statLabel} />
                  </div>

                  {/* Hover line accent */}
                  <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#ff7a2f]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              );
            })}
          </div>

          {/* ── RIGHT: Testimonials ── */}
          <div
            ref={testimonialsRef}
            className="relative rounded-2xl border border-white/[0.07] bg-white/[0.03] overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#ff7a2f]/5 via-transparent to-transparent pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 px-7 pt-7 pb-6 border-b border-white/[0.06]">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#ff7a2f] mb-3 font-medium">
                Client Feedback
              </p>
              <h3 className="text-xl font-semibold text-white/90 mb-4 tracking-tight">
                Trusted by enterprise teams worldwide
              </h3>
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#ff7a2f] text-[#ff7a2f]" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-white">4.9</span>
                <span className="text-white/40 text-xs">·</span>
                <span className="text-xs text-white/40">150+ reviews</span>
              </div>
            </div>

            {/* Review card */}
            <div className="relative z-10 px-7 py-7 min-h-[260px]">
              {/* Quote icon */}
              <Quote
                size={28}
                className="text-[#ff7a2f]/25 mb-4 fill-[#ff7a2f]/10"
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
                  transition={{ type: "spring", duration: 0.45, bounce: 0 }}
                >
                  {/* Stars for review */}
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#ff7a2f] text-[#ff7a2f]" />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-white/75 text-sm leading-[1.75] mb-7">
                    &ldquo;{review.comment}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-[#ff7a2f]"
                      style={{ background: "rgba(255,122,47,0.12)" }}
                    >
                      {review.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white leading-none mb-0.5">
                        {review.name}
                      </p>
                      <p className="text-xs text-white/40">
                        {review.role} · {review.company}
                      </p>
                    </div>
                    <span className="ml-auto text-[11px] text-white/25">
                      {review.location}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="relative z-10 px-7 pb-6 flex items-center justify-between">
              {/* Dots */}
              <div className="flex gap-1.5">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to review ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${i === index
                      ? "w-5 h-1.5 bg-[#ff7a2f]"
                      : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                      }`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  aria-label="Previous review"
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center
                    text-white/40 hover:text-white hover:border-white/30 transition-all duration-200
                    active:scale-95"
                >
                  <ArrowLeft size={14} />
                </button>
                <button
                  onClick={next}
                  aria-label="Next review"
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center
                    text-white/40 hover:text-white hover:border-white/30 transition-all duration-200
                    active:scale-95"
                >
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Keyframe animations ── */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
