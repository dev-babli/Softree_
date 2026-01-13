"use client";

import React from "react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[700px] bg-[#00091A] overflow-hidden">
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

            <h1
              className="
    leading-[1.08]
    text-4xl md:text-5xl lg:text-6xl
    tracking-tight
    bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300
    bg-clip-text text-transparent
    animate-in fade-in slide-in-from-left-4 duration-1000
  "
              style={{ fontFamily: "Times New Roman, serif" }}
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
              style={{ fontFamily: "Times New Roman, serif" }}
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

            {/* Stats Cards */}
            <div
              className="
    grid grid-cols-1 sm:grid-cols-3
    gap-10 pt-8
    animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400
  "
            >
              {[
                { value: "15+", label: "Years of Experience" },
                { value: "500+", label: "Projects Delivered" },
                { value: "90%", label: "Client Retention" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="
        rounded-2xl
        p-[1px]
        bg-gradient-to-r
        from-cyber-blue
        via-blue-400
        to-sky-300
      "
                >
                  <div
                    className="
          rounded-2xl
          bg-[#0B1220]
          px-8 py-8
        "
                  >
                    {/* Value */}
                    <span
                      className="
            block text-4xl md:text-5xl
            font-semibold tracking-tight
            bg-gradient-to-r
            from-cyber-blue via-blue-400 to-sky-300
            bg-clip-text text-transparent
          "
                      style={{ fontFamily: "Times New Roman, serif" }}
                    >
                      {stat.value}
                    </span>

                    {/* Divider */}
                    <div className="my-4 h-px bg-white/20" />

                    {/* Label */}
                    <span
                      className="block text-white/85 text-sm md:text-base"
                      style={{ fontFamily: "Times New Roman, serif" }}
                    >
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div
              className="
    pt-6
    animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-600
  "
            >
              <a
                href="/contact"
                className="
      group inline-flex items-center justify-center
      px-12 py-4 rounded-xl
      bg-gradient-to-r from-cyber-blue via-blue-500 to-sky-400
      text-lg font-semibold
      text-transparent bg-clip-text
      border border-cyber-blue
      transition-colors duration-300
      hover:bg-transparent
    "
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                <span className="bg-gradient-to-r from-cyber-blue via-blue-500 to-sky-400 bg-clip-text text-transparent">
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
