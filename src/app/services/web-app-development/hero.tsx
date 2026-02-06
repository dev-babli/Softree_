"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Rocket, Workflow, TrendingUp } from "lucide-react";

export default function HeroWithTestimonial() {
  /* ================= TESTIMONIAL DATA (WEB) ================= */
  const testimonials = [
    {
      text: "Their web platform streamlined our operations and improved team productivity instantly.",
      name: "Sneha Patel",
      role: "Operations Manager",
      avatar: "https://i.pravatar.cc/100?img=5",
    },
    {
      text: "Fast, scalable and beautifully designed web apps delivered ahead of schedule.",
      name: "Aarav Mehta",
      role: "Startup Founder",
      avatar: "https://i.pravatar.cc/100?img=15",
    },
    {
      text: "Our customers love the speed and seamless experience of the new web application.",
      name: "Neha Sharma",
      role: "Product Director",
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
      {/* background glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-white/10 blur-[140px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-400/10 blur-[140px] rounded-full" />

      {/* ================= HERO LAYOUT ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-14 lg:py-16 min-h-[65vh] grid lg:grid-cols-2 gap-14 items-start">
        {/* ================= LEFT CONTENT ================= */}
        <div className="w-full space-y-7">
          <h1 className="text-4xl lg:text-5xl xl:text-5xl font-semibold leading-tight tracking-tight">
            Build Business-Centric
            <br />
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
              Web Apps for Enterprise
            </span>
          </h1>

          <p className="text-zinc-300 text-lg leading-relaxed max-w-xl">
            We design and develop secure, scalable and high-performance web
            applications that streamline operations, automate workflows and
            seamlessly integrate with your business systems using modern
            technologies like React, Next.js and cloud platforms.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/contact">
              <button className="bg-cyan-400 text-slate-900 px-7 py-3.5 rounded-xl font-medium shadow-xl hover:scale-105 hover:bg-cyan-300 transition">
                Talk to a Web Expert
              </button>
            </Link>

            <Link href="/services/web-development">
              <button className="border border-zinc-400/30 text-zinc-200 px-7 py-3.5 rounded-xl hover:bg-white/10 transition">
                View Web Services
              </button>
            </Link>
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
      bg-white/10
      backdrop-blur-3xl
      border border-white/20
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

      {/* wave bottom */}
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
