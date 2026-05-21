"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroWithTestimonial() {
  /* ================= CASE STUDY TESTIMONIAL DATA ================= */
  const testimonials = [
    {
      text: "We reduced manual approval cycles by over 60% after implementing a custom Power Apps solution integrated with SharePoint and Dataverse.",
      name: "Sneha Patel",
      role: "IT Manager · Manufacturing Enterprise",
      avatar: "https://i.pravatar.cc/100?img=5",
    },
    {
      text: "The Power Apps platform enabled real-time data visibility and streamlined workflows across multiple departments.",
      name: "Aarav Mehta",
      role: "Founder · SaaS Startup",
      avatar: "https://i.pravatar.cc/100?img=15",
    },
    {
      text: "Legacy processes were fully digitized using Power Apps and Power Automate, delivering measurable efficiency and faster decision-making.",
      name: "Neha Sharma",
      role: "Business Director · Consulting Firm",
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
      {/* Background glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-white/10 blur-[140px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-400/10 blur-[140px] rounded-full" />

      {/* ================= HERO LAYOUT ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-14 lg:py-16 min-h-[65vh] grid lg:grid-cols-2 gap-14 items-start mt-8">
        {/* ================= LEFT CONTENT ================= */}
        <div className="w-full space-y-7">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs text-white/80">
            📘 Power Apps Case Study
          </span>

          <h1 className="text-4xl lg:text-5xl xl:text-4xl font-semibold leading-tight tracking-tight">
            Automating Enterprise Workflows with{" "}
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
              Microsoft Power Apps
            </span>
          </h1>

          <div className="flex gap-4 mt-8">
            <Link
              href="/contact"
              className="bg-white text-blue-700 px-6 py-3 rounded-lg font-medium inline-flex items-center justify-center hover:bg-blue-50 transition"
            >
              Talk to a Power App Expert
            </Link>

            <Link
              href="/services/offshore-power-platform-development"
              className="border border-white/40 px-6 py-3 rounded-lg inline-flex items-center justify-center hover:bg-white/10 transition"
            >
              View Power App Services
            </Link>
          </div>
        </div>
        {/* RIGHT GLASS CARD */}
        <div className="relative">
          {/* Outer glow */}
          <div className="absolute -inset-2 rounded-2xl bg-cyan-400/20 blur-xl"></div>

          {/* Glass box */}
          <div className="relative rounded-2xl border border-white/20 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl shadow-2xl p-5 text-white">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="text-xs text-white/70">
                Power Platform Dashboard
              </span>
            </div>

            {/* Title */}
            <h3 className="text-base font-semibold mb-1">
              Power Apps Performance Overview
            </h3>
            <p className="text-xs text-white/70 mb-4">
              Real-time insights from enterprise Power Apps & Dataverse
            </p>

            {/* KPIs */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-white/10 rounded-lg p-2 text-center">
                <p className="text-[10px] text-white/60">Apps Deployed</p>
                <p className="text-lg font-semibold">52+</p>
              </div>
              <div className="bg-white/10 rounded-lg p-2 text-center">
                <p className="text-[10px] text-white/60">Active Users</p>
                <p className="text-lg font-semibold">85K+</p>
              </div>
              <div className="bg-white/10 rounded-lg p-2 text-center">
                <p className="text-[10px] text-white/60">Automation Gain</p>
                <p className="text-lg font-semibold">+60%</p>
              </div>
            </div>

            {/* Chart mock */}
            <div>
              <p className="text-[10px] text-white/60 mb-2">
                Workflow Automation Trend
              </p>
              <div className="grid grid-cols-5 gap-2 items-end h-20">
                <div className="bg-cyan-400/40 rounded h-8" />
                <div className="bg-cyan-400/60 rounded h-14" />
                <div className="bg-cyan-400/80 rounded h-20" />
                <div className="bg-cyan-400/50 rounded h-12" />
                <div className="bg-cyan-400/35 rounded h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
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
