"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroWithTestimonial() {
  /* ================= TESTIMONIAL DATA ================= */
  const testimonials = [
    {
      text: "They helped us launch our MVP in just weeks and validate our idea quickly.",
      name: "Rohit Verma",
      role: "Startup Founder",
      avatar: "https://i.pravatar.cc/100?img=11",
    },
    {
      text: "Fast development, clean UI, and scalable architecture from day one.",
      name: "Sneha Patel",
      role: "Product Manager",
      avatar: "https://i.pravatar.cc/100?img=5",
    },
    {
      text: "Our first version went live smoothly and impressed early customers.",
      name: "Aarav Mehta",
      role: "Co-Founder & CTO",
      avatar: "https://i.pravatar.cc/100?img=15",
    },
    {
      text: "A reliable team that understands startup speed and execution.",
      name: "Neha Sharma",
      role: "CEO, SaaS Startup",
      avatar: "https://i.pravatar.cc/100?img=32",
    },
  ];

  /* ================= STATE ================= */
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const active = testimonials[index];

  /* ================= AUTO ROTATE ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % testimonials.length);
        setVisible(true);
      }, 250);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  /* ================= UI ================= */
  return (
    <section className="relative overflow-hidden text-white bg-gradient-to-br from-[#0b3ea8] via-[#1557c0] to-[#1e73d8]">
      {/* glow background */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-white/10 blur-[140px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-400/10 blur-[140px] rounded-full" />

      {/* SAME HERO HEIGHT + LAYOUT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-20 min-h-[70vh] grid lg:grid-cols-2 gap-10 items-center">
        {/* ================= LEFT CONTENT ================= */}
        <div>
          <span className="inline-block mb-4 px-4 py-2 rounded-full bg-white/10 text-xs tracking-widest uppercase">
            MVP Development
          </span>

          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight">
            Launch Your Product
            <br />
            <span className="text-white/90">Faster with MVP</span>
          </h1>

          <p className="mt-5 text-white/80 max-w-xl text-lg">
            We design and build Minimum Viable Products that help startups and
            businesses validate ideas quickly, reduce risks, and reach the
            market faster with scalable, production-ready solutions.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap gap-4 mt-8">
            <Link href="/contact">
              <button className="bg-white text-blue-700 px-6 py-3 rounded-xl font-medium shadow-lg hover:scale-105 hover:bg-blue-50 transition">
                Start Your MVP
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-10 text-sm text-white/80">
            <div>
              <p className="text-xl font-semibold text-white">4–8 Weeks</p>
              Launch Time
            </div>
            <div>
              <p className="text-xl font-semibold text-white">70%</p>
              Cost Savings
            </div>
            <div>
              <p className="text-xl font-semibold text-white">100%</p>
              Scalable Code
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE (ADVANCED PREMIUM) ================= */}
        <div className="relative w-full flex flex-col gap-8">
          {/* ================= FLOATING BACKGROUND GLOW ================= */}
          <div className="absolute -top-10 -right-10 w-56 h-56 bg-cyan-500/20 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 -left-10 w-56 h-56 bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

          {/* ================= TESTIMONIAL CARD ================= */}
          <div
            className={`
      relative
      rounded-3xl
      p-8 lg:p-10
      
      shadow-[0_25px_70px_rgba(0,0,0,0.45)]
      overflow-hidden
      group
      transition-all duration-500
      hover:-translate-y-2
      hover:shadow-[0_35px_90px_rgba(0,0,0,0.6)]
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
    `}
          >
            {/* animated gradient border glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition duration-500" />

            {/* text */}
            <p className="relative text-lg lg:text-xl text-white/90 leading-relaxed mb-6 z-10">
              "{active.text}"
            </p>

            {/* profile */}
            <div className="relative flex items-center gap-4 z-10">
              <img
                src={active.avatar}
                alt={active.name}
                className="
          w-14 h-14 rounded-full
          object-cover
          ring-2 ring-cyan-400/40
          shadow-lg
        "
              />

              <div>
                <p className="font-semibold text-white">{active.name}</p>
                <p className="text-sm text-white/60">{active.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* wave bottom svg */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-[120px]"
          preserveAspectRatio="none"
        >
          <path
            d="M0,64 C240,96 480,96 720,80 960,64 1200,32 1440,32 L1440,120 L0,120 Z"
            fill="#FAFAFA"
          />
        </svg>
      </div>
    </section>
  );
}
