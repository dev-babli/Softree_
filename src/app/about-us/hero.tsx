"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AboutHeroWithTestimonial() {
  /* ================= TESTIMONIAL DATA ================= */
  const testimonials = [
    {
      text: "Softree helped us modernize our entire digital ecosystem with exceptional execution.",
      name: "Rohit Verma",
      role: "CTO, Enterprise Client",
      avatar: "https://i.pravatar.cc/100?img=11",
    },
    {
      text: "A highly reliable technology partner who truly understands business challenges.",
      name: "Sneha Patel",
      role: "Product Manager",
      avatar: "https://i.pravatar.cc/100?img=5",
    },
    {
      text: "Their team delivered scalable solutions that accelerated our growth significantly.",
      name: "Aarav Mehta",
      role: "Startup Founder",
      avatar: "https://i.pravatar.cc/100?img=15",
    },
    {
      text: "From strategy to launch, Softree provided complete ownership and clarity.",
      name: "Neha Sharma",
      role: "CEO, Digital Product",
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
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0b3ea8] via-[#1557c0] to-[#1e73d8] text-white">
      {/* Glow accents */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-600/20 blur-[160px] rounded-full" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/20 blur-[140px] rounded-full" />

   {/* ================= CONTENT ================= */}
<div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-12 text-center mt-5">
  {/* Badge */}
  <span className="inline-block mb-5 px-4 py-2 rounded-full bg-white/10 backdrop-blur text-xs tracking-widest uppercase">
    About Softree
  </span>

  {/* Heading */}
  <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
    Building Intelligent Solutions for a
    <br />
    <span className="bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent">
      Digital-First World
    </span>
  </h1>

  {/* Description */}
  <p className="mt-5 text-lg text-white/75 max-w-3xl mx-auto">
    Softree is a fast-growing software startup specializing in AI-driven
    solutions, SharePoint, Power Platform, mobile apps, and modern web
    development. We help businesses automate processes, unlock insights,
    and create seamless digital experiences.
  </p>

  {/* ================= GLASS INFO PANEL ================= */}
  <div className="mt-10 mx-auto max-w-3xl rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl p-7 shadow-2xl">

    {/* Tech Focus Pills */}
    <div className="flex flex-wrap justify-center gap-3 text-xs text-white/70 mb-6">
      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
        AI Solutions
      </span>
      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
        SharePoint & SPFx
      </span>
      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
        Power Apps & Automate
      </span>
      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
        Mobile & Web Apps
      </span>
      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
        Power BI & Data
      </span>
    </div>

    {/* Buttons */}
    <div className="flex flex-wrap justify-center gap-4">
      <Link
        href="/contact"
        className="px-7 py-3 rounded-xl bg-white text-blue-700 font-medium shadow-lg hover:scale-105 transition inline-block"
      >
        Start a Conversation
      </Link>

      <Link
        href="/services"
        className="px-7 py-3 rounded-xl border border-white/30 hover:bg-white/10 transition inline-block text-white"
      >
        View Our Services
      </Link>
    </div>

    {/* Divider */}
    <div className="my-6 h-px bg-white/15" />

    {/* Trust Stats */}
    <div className="grid grid-cols-3 gap-4 text-center text-sm">
      <div>
        <p className="text-xl font-bold">200+</p>
        <p className="text-white/60">Projects Delivered</p>
      </div>
      <div>
        <p className="text-xl font-bold">13+</p>
        <p className="text-white/60">Years Experience</p>
      </div>
      <div>
        <p className="text-xl font-bold">98%</p>
        <p className="text-white/60">Client Satisfaction</p>
      </div>
    </div>
  </div>
</div>

      {/* ================= PREMIUM SOFT WAVE ================= */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 160"
          className="w-full h-[120px]"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="contactFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#FAFAFA" />
            </linearGradient>
          </defs>

          <path
            d="M0,90 C300,140 900,140 1440,90 L1440,160 L0,160 Z"
            fill="url(#contactFade)"
          />
        </svg>
      </div>
    </section>
  );
}
