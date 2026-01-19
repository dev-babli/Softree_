"use client";

import React from "react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[700px] bg-[#00091A] overflow-hidden pt-16 md:pt-20">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
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

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00091A]/90 via-[#00091A]/70 to-[#00091A]/40 z-10" />

        {/* Fade below navbar */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/60 to-transparent z-20 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-30 container mx-auto px-6 lg:px-0 flex items-center min-h-[700px]">
        <div className="w-full max-w-7xl mx-auto">
          <div className="py-20 md:w-[75%] lg:w-[65%] space-y-12">
            {/* Eyebrow */}
            <div
              className="
                inline-flex items-center gap-3
                px-4 py-1.5 rounded-full
                border border-white/20 bg-white/5
                animate-in fade-in slide-in-from-left-2 duration-700
              "
            >
              <span className="h-2 w-2 rounded-full bg-cyber-blue" />
              <span className="text-sm text-white/85 tracking-wide">
                Digital Transformation Partner
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
                animate-in fade-in slide-in-from-left-4 duration-1000
              "
              style={{ fontFamily: "Calibri, serif" }}
            >
              Building{" "}
              <span
                className="
                  font-semibold
                  bg-gradient-to-r
                  from-cyber-blue
                  via-blue-400
                  to-sky-300
                  bg-clip-text text-transparent
                "
              >
                Digital Solutions
              </span>{" "}
              That Scale With You
            </h1>

            {/* Subheading */}
            <p
              className="
                max-w-3xl
                text-lg md:text-xl lg:text-2xl
                leading-relaxed
                bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300
                bg-clip-text text-transparent
                animate-in fade-in slide-in-from-left-6 duration-1000 delay-200
              "
              style={{ fontFamily: "Calibri, serif" }}
            >
              Softree helps enterprises and startups transform ideas into
              secure, scalable products built on{" "}
              <span
                className="
                  font-semibold
                  bg-gradient-to-r
                  from-cyber-blue
                  via-blue-400
                  to-sky-300
                  bg-clip-text text-transparent
                "
              >
                SharePoint, Power Platform, Salesforce, and AI
              </span>
              , delivering modern web and mobile engineering solutions.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 pt-4">
              {[
                {
                  value: "15+",
                  label: "Years of Experience",
                  icon: "🚀",
                  gradient: "from-blue-400 via-cyan-400 to-indigo-400",
                },
                {
                  value: "500+",
                  label: "Projects Delivered",
                  icon: "📦",
                  gradient: "from-fuchsia-400 via-pink-400 to-purple-400",
                },
                {
                  value: "90%",
                  label: "Client Retention",
                  icon: "🤝",
                  gradient: "from-emerald-400 via-teal-400 to-cyan-400",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="
        relative rounded-full px-10 py-8
        bg-gradient-to-r from-white/10 via-white/5 to-white/10
        backdrop-blur-xl text-center
        shadow-[0_20px_60px_rgba(0,0,0,0.45)]
        transition-all duration-500
        hover:-translate-y-1
      "
                >
                  <div className="flex items-center justify-center gap-5">
                    {/* ICON */}
                    <div
                      className="
            flex h-14 w-14 items-center justify-center
            rounded-full
            bg-gradient-to-br from-blue-500/40 to-cyan-400/30
            text-2xl
          "
                    >
                      {stat.icon}
                    </div>

                    {/* TEXT */}
                    <div className="text-left">
                      {/* MULTI-COLOR NUMBER */}
                      <span
                        className={`
              block text-4xl font-extrabold
              bg-gradient-to-r ${stat.gradient}
              bg-clip-text text-transparent
            `}
                      >
                        {stat.value}
                      </span>

                      <span className="block text-white/80 text-sm tracking-wide">
                        {stat.label}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div
              className="
    pt-2
    animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-600
  "
            >
              <a
                href="/contact"
                className="
      group relative inline-flex items-center justify-center
      px-14 py-4
      rounded-full
      bg-black/40
      backdrop-blur-xl
      border border-white/20
      transition-all duration-500
      hover:-translate-y-1
      hover:border-cyber-blue/50
      hover:shadow-[0_30px_80px_rgba(56,189,248,0.35)]
    "
                style={{ fontFamily: "Calibri, serif" }}
              >
                {/* OUTER GLOW */}
                <span
                  className="
        absolute inset-0 rounded-full
        bg-gradient-to-r from-cyber-blue via-blue-500 to-sky-400
        opacity-0 blur-xl
        transition-opacity duration-500
        group-hover:opacity-30
      "
                />

                {/* TEXT */}
                <span className="relative z-10 text-lg font-semibold text-white tracking-wide">
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
