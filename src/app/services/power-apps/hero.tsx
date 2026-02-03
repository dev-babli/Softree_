"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroWithTestimonial() {
  /* ================= TESTIMONIAL DATA ================= */
  const testimonials = [
    {
      text: "They automated our entire workflow using Power Apps and saved hundreds of manual hours every month.",
      name: "Rohit Verma",
      role: "Operations Head",
      avatar: "https://i.pravatar.cc/100?img=11",
    },
    {
      text: "The custom business apps integrate perfectly with SharePoint and Microsoft 365.",
      name: "Sneha Patel",
      role: "IT Manager",
      avatar: "https://i.pravatar.cc/100?img=5",
    },
    {
      text: "Fast delivery, clean architecture, and scalable low-code solutions for our enterprise needs.",
      name: "Aarav Mehta",
      role: "Startup Founder",
      avatar: "https://i.pravatar.cc/100?img=15",
    },
    {
      text: "Our internal processes are now fully digitized thanks to their Power Platform expertise.",
      name: "Neha Sharma",
      role: "Business Director",
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

      {/* SAME LAYOUT + HEIGHT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-20 min-h-[70vh] grid lg:grid-cols-2 gap-10 items-center">
        {/* ================= LEFT CONTENT ================= */}
        <div>
          <span className="inline-block mb-4 px-4 py-2 rounded-full bg-white/10 text-xs tracking-widest uppercase">
            Power Apps Development
          </span>

          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight">
            Transform Your Business with
            <br />
            <span className="text-white/90">Custom Power Apps</span>
          </h1>

          <p className="mt-5 text-white/80 max-w-xl text-lg">
            We design and build secure, scalable low-code applications that
            automate workflows, digitize operations and seamlessly integrate with
            Microsoft 365, SharePoint and the Power Platform ecosystem.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap gap-4 mt-8">
            <Link href="/contact">
              <button className="bg-white text-blue-700 px-6 py-3 rounded-xl font-medium shadow-lg hover:scale-105 hover:bg-blue-50 transition">
                Talk to a Power Apps Expert
              </button>
            </Link>

            <Link href="/services/power-apps">
              <button className="border border-white/40 px-6 py-3 rounded-xl hover:bg-white/10 transition">
                View Services
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-10 text-sm text-white/80">
            <div>
              <p className="text-xl font-semibold text-white">60+</p>
              Apps Built
            </div>
            <div>
              <p className="text-xl font-semibold text-white">65%</p>
              Process Automation
            </div>
            <div>
              <p className="text-xl font-semibold text-white">50%</p>
              Productivity Boost
            </div>
          </div>
        </div>

        {/* ================= RIGHT TESTIMONIAL ================= */}
        <div className="flex justify-center lg:justify-end">
          <div
            className={`
              max-w-sm w-full
              rounded-3xl
              border border-white/20
              bg-gradient-to-br from-white/20 to-white/5
              backdrop-blur-2xl
              p-6
              shadow-2xl shadow-black/30
              transition-all duration-500
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
          >
            {/* Quote */}
            <div className="mb-4 w-10 h-10 flex items-center justify-center rounded-xl bg-cyan-400/15">
              <svg
                className="text-cyan-300"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
              >
                <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.558-.906 1.491-1.385 2.396-1.385V6C6.57 6 5 7.832 5 10c0 1.657.895 3 2 3 1.105 0 2-.895 2-2s-.895-1-2-1zm8 0c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.558-.906 1.491-1.385 2.396-1.385V6c-1.93 0-3.5 1.832-3.5 4 0 1.657.895 3 2 3 1.105 0 2-.895 2-2s-.895-1-2-1z" />
              </svg>
            </div>

            {/* Text */}
            <p className="text-sm text-white/90 leading-relaxed mb-5">
              “{active.text}”
            </p>

            {/* User */}
            <div className="flex items-center gap-3">
              <img
                src={active.avatar}
                alt={active.name}
                className="w-10 h-10 rounded-full object-cover border border-white/20"
              />
              <div>
                <p className="text-sm font-semibold">{active.name}</p>
                <p className="text-xs text-white/60">{active.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* wave bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 120" className="w-full h-[120px]" preserveAspectRatio="none">
          <path
            d="M0,64 C240,96 480,96 720,80 960,64 1200,32 1440,32 L1440,120 L0,120 Z"
            fill="#FAFAFA"
          />
        </svg>
      </div>
    </section>
  );
}
