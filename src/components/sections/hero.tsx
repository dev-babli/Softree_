"use client";

import React, { useEffect, useState } from "react";
import { History, Layers, ShieldCheck } from "lucide-react";

const HeroSection = () => {
  // 0 = video, 1..3 = images
  const [activeBg, setActiveBg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBg((prev) => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const images = [
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000&auto=format&fit=crop",
  ];

  // 👇 Content per slide
  const slides = [
    {
      eyebrow: "Digital Transformation Partner",
      title1: "Building",
      highlight: "Digital Solutions",
      title2: "That Scale With You",
      desc: "Softree helps enterprises and startups transform ideas into secure, scalable products. From discovery and architecture to continuous delivery, we create platforms that evolve with your business and drive measurable outcomes.",
    },
    {
      eyebrow: "Microsoft & Cloud Experts",
      title1: "Modernize with",
      highlight: "SharePoint & Power Platform",
      title2: "",
      desc: "We build intelligent workplaces, automate workflows, and unlock productivity. Our solutions connect teams, simplify collaboration, and help organizations move faster with confidence.",
    },
    {
      eyebrow: "AI & Automation",
      title1: "Smarter Systems Powered by",
      highlight: "AI Innovation",
      title2: "",
      desc: "From copilots to predictive insights, we design future-ready digital ecosystems. Harness data, automate decisions, and empower teams with intelligent experiences.",
    },
    {
      eyebrow: "Product Engineering",
      title1: "End-to-End",
      highlight: "Software Development",
      title2: "",
      desc: "Secure, scalable, high-performance applications tailored for growth. We engineer modern web and mobile products with reliability, speed, and long-term maintainability.",
    },
  ];

  const current = slides[activeBg];

  return (
    <section className="relative min-h-[650px] bg-[#00091A] overflow-hidden pt-10">
      {/* ================= VIDEO ================= */}
      {/* ================= SLIDING BACKGROUNDS ================= */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="flex h-full w-full transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${activeBg * 100}%)`,
          }}
        >
          {/* VIDEO */}
          <div className="relative min-w-full h-full">
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            >
              <source src="/images/hero.mp4" type="video/mp4" />
            </video>
          </div>

          {/* IMAGES */}
          {images.map((img, i) => (
            <div key={i} className="relative min-w-full h-full">
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* ================= OVERLAY ================= */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#00091A]/90 via-[#00091A]/70 to-[#00091A]/40" />

      {/* Fade below navbar */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/60 to-transparent z-20 pointer-events-none" />

      {/* ================= CONTENT ================= */}
      <div className="relative z-30 container mx-auto px-6 lg:px-0 flex items-center min-h-[550px]">
        <div className="w-full max-w-7xl mx-auto">
          <div className="py-12 md:w-[75%] lg:w-[65%] space-y-8">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/20 bg-white/5">
              <span className="h-2 w-2 rounded-full bg-cyber-blue" />
              <span className="text-sm text-white/85 tracking-wide">
                {current.eyebrow}
              </span>
            </div>

            {/* Heading */}
            <h1
              className="
                leading-[1.08]
                text-4xl md:text-5xl lg:text-6xl
                tracking-tight
                bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300
                bg-clip-text text-transparent
              "
              style={{ fontFamily: "Calibri, serif" }}
            >
              {current.title1}{" "}
              <span className="font-semibold bg-gradient-to-r from-cyber-blue via-blue-400 to-sky-300 bg-clip-text text-transparent">
                {current.highlight}
              </span>{" "}
              {current.title2}
            </h1>

            {/* Subheading */}
            <p
              className="
                max-w-3xl
                text-lg md:text-xl
                leading-relaxed
                bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300
                bg-clip-text text-transparent
              "
              style={{ fontFamily: "Calibri, serif" }}
            >
              {current.desc}
            </p>

            {/* ================= STATS ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-0">
              {[
                {
                  value: "15+",
                  label: "Years of Experience",
                  Icon: History,
                  gradient: "from-blue-400 via-cyan-400 to-indigo-400",
                },
                {
                  value: "500+",
                  label: "Projects Delivered",
                  Icon: Layers,
                  gradient: "from-fuchsia-400 via-pink-400 to-purple-400",
                },
                {
                  value: "90%",
                  label: "Client Retention",
                  Icon: ShieldCheck,
                  gradient: "from-emerald-400 via-teal-400 to-cyan-400",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="
        relative rounded-2xl px-8 py-6
        bg-gradient-to-r from-white/10 via-white/5 to-white/10
        backdrop-blur-xl
        shadow-[0_20px_60px_rgba(0,0,0,0.45)]
      "
                >
                  <div className="flex items-center gap-4">
                    {/* ICON */}
                    <div
                      className="
            flex h-12 w-12 items-center justify-center
            rounded-xl
            bg-white/5 border border-white/10
          "
                    >
                      <stat.Icon className="h-6 w-6 text-white/80" />
                    </div>

                    {/* TEXT */}
                    <div>
                      <span
                        className={`block text-3xl font-extrabold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                      >
                        {stat.value}
                      </span>

                      <span className="block text-white/70 text-sm tracking-wide">
                        {stat.label}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ================= CTA ================= */}
            <div className="pt-1">
              <a
                href="/contact"
                className="
                  group relative inline-flex items-center justify-center
                  px-12 py-3 rounded-full
                  bg-black/40 backdrop-blur-xl
                  border border-white/20
                  transition-all duration-500
                  hover:-translate-y-1
                  hover:border-cyber-blue/50
                "
                style={{ fontFamily: "Calibri, serif" }}
              >
                <span className="relative z-10 text-base font-semibold text-white tracking-wide">
                  Talk to Our Experts
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
