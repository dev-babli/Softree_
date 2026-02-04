"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Rocket, Workflow, TrendingUp } from "lucide-react";

export default function HeroWithTestimonial() {
  /* ================= TESTIMONIAL DATA ================= */
  const testimonials = [
    {
      text: "Their mobile app transformed how our field teams work on the go.",
      name: "Sneha Patel",
      role: "Operations Manager",
      avatar: "https://i.pravatar.cc/100?img=5",
    },
    {
      text: "Fast, intuitive, and scalable apps delivered perfectly for both iOS and Android.",
      name: "Aarav Mehta",
      role: "Startup Founder",
      avatar: "https://i.pravatar.cc/100?img=15",
    },
    {
      text: "Our customers love the seamless mobile experience and performance.",
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

      {/* ================= ADVANCED HERO LAYOUT ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-14 lg:py-16 min-h-[65vh] grid lg:grid-cols-2 gap-14 items-start">
        {/* ================= LEFT CONTENT ================= */}
        <div className="w-full space-y-7">
          <h1 className="text-4xl lg:text-5xl xl:text-5xl font-semibold leading-tight tracking-tight">
            Build Business-Centric
            <br />
            <span
              className="bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-300
 bg-clip-text text-transparent"
            >
              Mobile Apps for Enterprise
            </span>
          </h1>

          <p className="text-zinc-300 text-lg leading-relaxed max-w-xl">
            We design and develop secure, scalable and high-performance mobile
            applications that streamline operations, automate workflows and
            seamlessly connect with your business systems across iOS and Android
            platforms.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/contact">
              <button className="bg-cyan-400 text-slate-900 px-7 py-3.5 rounded-xl font-medium shadow-xl hover:scale-105 hover:bg-cyan-300 transition">
                Talk to a Mobile App Expert
              </button>
            </Link>

            <Link href="/services/mobile-app-development">
              <button className="border border-zinc-400/30 text-zinc-200 px-7 py-3.5 rounded-xl hover:bg-white/10 transition">
                View Mobile App Services
              </button>
            </Link>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="w-full flex flex-col gap-10">
          {/* ---------- Premium Testimonial Card ---------- */}
          <div
            className={`
        relative w-full
        rounded-3xl
        p-9 lg:p-11
        backdrop-blur-3xl
        bg-white/10
        border border-white/20
        shadow-[0_20px_60px_rgba(0,0,0,0.35)]
        hover:-translate-y-1
        transition-all duration-500
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
          >
            {/* gradient glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-400/10 to-blue-600/10 pointer-events-none" />

            {/* quote */}
            <p className="relative text-lg lg:text-xl text-white/90 leading-relaxed mb-4">
              “{active.text}”
            </p>

            {/* user */}
            <div className="relative flex items-center gap-4">
              <img
                src={active.avatar}
                alt={active.name}
                className="w-14 h-14 rounded-full object-cover border border-white/20"
              />
              <div>
                <p className="text-base font-semibold">{active.name}</p>
                <p className="text-sm text-white/60">{active.role}</p>
              </div>
            </div>
          </div>

          {/* ---------- Premium Stats Cards (No White Text) ---------- */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                value: "80+",
                label: "Apps Delivered",
                icon: Rocket,
                color: "text-cyan-300",
                gradient: "from-cyan-400/20 to-blue-500/20",
              },
              {
                value: "4.9★",
                label: "App Store Rating",
                icon: Workflow,
                color: "text-indigo-300",
                gradient: "from-cyan-400/20 to-blue-500/20",
              },
              {
                value: "99.9%",
                label: "Uptime",
                icon: TrendingUp,
                color: "text-cyan-300",
                gradient: "from-cyan-400/20 to-blue-500/20",
              },
            ].map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="
          group relative
          flex items-center gap-4
          rounded-2xl
         
          px-6 py-5
          hover:-translate-y-1
          hover:bg-white/10
          transition-all duration-300
        "
                >
                  {/* icon box */}
                  <div
                    className={`
            w-12 h-12
            flex items-center justify-center
            rounded-xl
            bg-gradient-to-br ${stat.gradient}
          `}
                  >
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>

                  {/* text */}
                  <div className="flex flex-col leading-tight">
                    <span className={`text-2xl font-semibold ${stat.color}`}>
                      {stat.value}
                    </span>
                    <span className="text-sm text-zinc-300">{stat.label}</span>
                  </div>
                </div>
              );
            })}
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
