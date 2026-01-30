"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaReact, FaAndroid, FaApple } from "react-icons/fa";
import { SiFlutter } from "react-icons/si";

const testimonials = [
  {
    text: "They delivered our mobile app faster than expected with exceptional quality.",
    name: "Rohit Verma",
    role: "Co-Founder & CTO",
  },
  {
    text: "Outstanding UI/UX and a very smooth development process from start to launch.",
    name: "Sneha Patel",
    role: "Product Manager",
  },
  {
    text: "A reliable team that truly understands scalable mobile app development.",
    name: "Aarav Mehta",
    role: "Startup Founder",
  },
  {
    text: "Our iOS and Android apps were built with great performance and attention to detail.",
    name: "Neha Sharma",
    role: "CEO, Digital Product",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % testimonials.length);
        setVisible(true);
      }, 300);
    }, 3000); // every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const active = testimonials[index];

  return (
    <section
      className="
    relative min-h-screen overflow-hidden
    flex items-center justify-center px-6
    bg-gradient-to-br from-[#2563eb] via-[#3b82f6] to-[#93c5fd]
  "
    >
      {/* BACKGROUND FADE */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />

      {/* HERO CARD */}
      <div className="relative z-10 max-w-6xl w-full rounded-[28px] bg-[#0f131a]/90 backdrop-blur-2xl border border-white/10 shadow-[0_60px_180px_rgba(0,0,0,0.85)] p-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* ================= LEFT ================= */}
          <div className="text-white space-y-6">
            <p className="text-sm font-semibold tracking-wide text-cyan-300">
              + Mobile App Development
            </p>

            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              <span className="text-slate-100">THE</span> <br />
              <span className="text-blue-300">FUTURE</span>{" "}
              <span className="text-slate-200">OF</span> <br />
              <span className="text-cyan-300">MOBILE</span>{" "}
              <span className="text-blue-200">APPS</span>
            </h1>

            <p className="text-white/70 max-w-md">
              We design and build high-performance mobile applications for iOS
              and Android—crafted for seamless user experiences, scalability,
              and real business growth.
            </p>

            <Link href="/contact">
              <button
                className="
      inline-flex items-center gap-3
      rounded-full
      bg-gradient-to-r from-cyan-400 to-blue-400
      px-7 py-3
      font-semibold text-slate-900
      shadow-lg shadow-cyan-500/30
      transition-all duration-300
      hover:scale-105 hover:shadow-cyan-400/50
      active:scale-95
    "
              >
                Build Your App
                <span className="text-lg">→</span>
              </button>
            </Link>
            {/* ================= ROTATING TESTIMONIAL ================= */}
            <div
              className={`
    mt-8 flex gap-4 items-start
    rounded-2xl
    bg-gradient-to-br from-white/15 to-white/5
    p-5
    border border-white/20
    backdrop-blur-xl
    max-w-sm
    shadow-lg shadow-black/20
    transition-all duration-500 ease-out
    ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
  `}
            >
              {/* Quote Icon */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-400/15">
                  <svg
                    className="text-cyan-300"
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="currentColor"
                  >
                    <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.558-.906 1.491-1.385 2.396-1.385V6C6.57 6 5 7.832 5 10c0 1.657.895 3 2 3 1.105 0 2-.895 2-2s-.895-1-2-1zm8 0c-.223 0-.437.034-.65.065.069-.232.140-.468.254-.68.558-.906 1.491-1.385 2.396-1.385V6c-1.93 0-3.5 1.832-3.5 4 0 1.657.895 3 2 3 1.105 0 2-.895 2-2s-.895-1-2-1z" />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div>
                <p className="text-sm text-blue-100 leading-relaxed mb-2">
                  “{active.text}”
                </p>

                <div className="flex items-center gap-2">
                  <p className="text-sm text-white font-semibold">
                    {active.name}
                  </p>
                  <span className="w-1 h-1 rounded-full bg-white/40" />
                  <p className="text-xs text-white/60">{active.role}</p>
                </div>
              </div>
            </div>
          </div>
          {/* ================= RIGHT ================= */}
          <div className="relative flex justify-center items-center">
            <div
              className="
      relative rounded-[28px] p-3
      bg-gradient-to-br from-[#0b1220] via-[#020617] to-black
      border border-white/10
      backdrop-blur-xl
      shadow-[0_40px_120px_rgba(0,0,0,0.8)]
    "
            >
              {/* IMAGE */}
              <div
                className="relative w-[300px] sm:w-[360px] lg:w-[420px]
      aspect-square overflow-hidden rounded-[32px]"
                style={{
                  clipPath:
                    "path('M 0 40 Q 0 0 40 0 L 320 0 Q 360 0 360 40 L 360 280 Q 360 360 280 360 L 40 360 Q 0 360 0 320 Z')",
                }}
              >
                <Image
                  src="/images/1.png"
                  alt="Mobile App UI"
                  fill
                  priority
                  className="object-cover"
                />

                {/* INNER GLASS HIGHLIGHT */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-[22px]
        ring-1 ring-white/20"
                />
              </div>

              {/* TECH STACK PILL */}
              <div className="relative mt-6 flex justify-center isolate z-10">
                {/* OUTER PILL */}
                <div
                  className="
          rounded-full p-[6px]
          bg-white/10
          backdrop-blur-xl
          border border-white/10
          shadow-[0_20px_50px_rgba(0,0,0,0.6)]
        "
                >
                  {/* INNER GLASS PILL */}
                  <div
                    className="
            relative flex items-center justify-center gap-10
            rounded-full px-10 py-5
            bg-white/5 backdrop-blur-md
            ring-1 ring-white/10
          "
                  >
                    {/* ICON – React */}
                    <div className="group relative flex items-center justify-center">
                      <div
                        className="absolute -top-12 opacity-0 scale-95
              group-hover:opacity-100 group-hover:scale-100
              transition-all duration-200 pointer-events-none hidden md:block z-20"
                      >
                        <div
                          className="px-4 py-1.5 rounded-full text-[12px]
                bg-black text-white shadow-lg"
                        >
                          React
                        </div>
                      </div>

                      <div
                        className="
              h-12 w-12 rounded-full
              bg-gradient-to-br from-[#0f172a] via-[#020617] to-black
              border border-white/10
              backdrop-blur-md
              shadow-[0_8px_30px_rgba(34,211,238,0.35)]
              flex items-center justify-center
              transition-all duration-300
              group-hover:-translate-y-1.5
              group-hover:shadow-[0_12px_40px_rgba(34,211,238,0.55)]
              text-cyan-400"
                      >
                        <FaReact size={34} />
                      </div>
                    </div>

                    <span className="h-1 w-1 rounded-full bg-white/30" />

                    {/* Flutter */}
                    <div className="group relative flex items-center justify-center">
                      <div
                        className="
              h-12 w-12 rounded-full
              bg-gradient-to-br from-[#0f172a] via-[#020617] to-black
              border border-white/10
              backdrop-blur-md
              shadow-[0_8px_30px_rgba(56,189,248,0.35)]
              flex items-center justify-center
              transition-all duration-300
              group-hover:-translate-y-1.5
              group-hover:shadow-[0_12px_40px_rgba(56,189,248,0.55)]
              text-sky-400"
                      >
                        <SiFlutter size={34} />
                      </div>
                    </div>

                    <span className="h-1 w-1 rounded-full bg-white/30" />

                    {/* Android */}
                    <div className="group relative flex items-center justify-center">
                      <div
                        className="
              h-12 w-12 rounded-full
              bg-gradient-to-br from-[#0f172a] via-[#020617] to-black
              border border-white/10
              backdrop-blur-md
              shadow-[0_8px_30px_rgba(74,222,128,0.35)]
              flex items-center justify-center
              transition-all duration-300
              group-hover:-translate-y-1.5
              group-hover:shadow-[0_12px_40px_rgba(74,222,128,0.55)]
              text-green-400"
                      >
                        <FaAndroid size={34} />
                      </div>
                    </div>

                    <span className="h-1 w-1 rounded-full bg-white/30" />

                    {/* iOS */}
                    <div className="group relative flex items-center justify-center">
                      <div
                        className="
              h-12 w-12 rounded-full
              bg-gradient-to-br from-[#0f172a] via-[#020617] to-black
              border border-white/10
              backdrop-blur-md
              shadow-[0_8px_30px_rgba(255,255,255,0.25)]
              flex items-center justify-center
              transition-all duration-300
              group-hover:-translate-y-1.5
              group-hover:shadow-[0_12px_40px_rgba(255,255,255,0.45)]
              text-white"
                      >
                        <FaApple size={34} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FLOATING ARROW */}
              <div
                className="
        absolute -top-3 -right-3 h-11 w-11 rounded-full
        bg-white/10 backdrop-blur-md
        border border-white/20
        text-white flex items-center justify-center
        shadow-lg font-semibold
      "
              >
                ↗
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
