"use client";

import React from "react";

export default function AboutUsWithTestimonials() {
  const testimonials = [
    {
      text: "Softree delivered a scalable solution that transformed our internal operations. Their technical expertise and communication were exceptional.",
      name: "Rahul Mehta",
      role: "CTO, FinTech Company",
    },
    {
      text: "The Softree team understood our requirements quickly and delivered a secure, high-performance platform ahead of schedule.",
      name: "Ananya Sharma",
      role: "Product Manager, SaaS Startup",
    },
    {
      text: "From architecture to execution, Softree exceeded expectations. Their approach to problem-solving is truly impressive and helped us scale faster than expected.",
      name: "Michael Johnson",
      role: "Director of Engineering",
    },
    {
      text: "We partnered with Softree for digital transformation, and the results were measurable, scalable, and impactful across multiple business units.",
      name: "Priya Verma",
      role: "Operations Lead, Enterprise Client",
    },
  ];

  return (
    <main className="relative bg-black text-white overflow-hidden">
      {/* ================= AMBIENT GLOW ================= */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[520px] rounded-full bg-sky-500/10 blur-[160px]" />
      <div className="pointer-events-none absolute top-40 -right-40 h-[420px] w-[420px] rounded-full bg-purple-500/10 blur-[160px]" />

      {/* ================= HERO ================= */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:42px_42px]" />

        {/* Glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-sky-500/25 blur-[200px]" />
        <div className="absolute top-32 right-[-160px] h-[480px] w-[480px] rounded-full bg-purple-500/25 blur-[200px]" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8">
            <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-xs tracking-widest text-sky-400 font-semibold uppercase">
              Softree · Software Engineering
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-8">
            Engineering Digital Products
            <span className="block bg-gradient-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent">
              That Power Business Growth
            </span>
          </h1>

          {/* Subheadline */}
          <p className="max-w-3xl mx-auto text-gray-300 text-base md:text-lg leading-relaxed mb-10">
            Softree helps startups and enterprises design, build, and scale
            secure, high-performance software — from cloud platforms to
            mission-critical digital products.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="rounded-full px-9 py-4 text-sm font-semibold bg-sky-500 text-black hover:bg-sky-400 transition"
            >
              Start a Project
            </a>

            <a
              href="#services"
              className="rounded-full px-9 py-4 text-sm font-semibold border border-white/20 text-white hover:border-sky-400 hover:text-sky-400 transition"
            >
              View Our Services
            </a>
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="relative overflow-hidden -mt-12">
        {/* Heading */}
        <div className="text-center mb-12 relative z-10">
          <p className="text-sky-400 font-extrabold tracking-widest text-sm mb-4">
            CLIENT TESTIMONIALS
          </p>
          <h3 className="text-3xl md:text-4xl font-semibold">
            Trusted by Growing Businesses
          </h3>
        </div>

     {/* Slider */}
<div className="relative overflow-hidden">
  <div className="flex gap-10 px-16 w-max animate-smooth-slide pause-on-hover">
    {[...testimonials, ...testimonials].map((item, i) => (
      <div
        key={i}
        className="
          w-[520px] md:w-[640px]
          p-10
          rounded-3xl
          relative
          flex flex-col justify-between
          min-h-[260px]

          bg-white/5
          backdrop-blur-2xl

          border border-white/20
          shadow-[0_10px_45px_rgba(56,189,248,0.15)]

          transition-all duration-300
          hover:-translate-y-1
          hover:border-sky-400/40
          hover:shadow-[0_16px_70px_rgba(56,189,248,0.25)]
        "
      >
        {/* Glass highlight */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/12 via-transparent to-transparent" />

        {/* Quote */}
        <p className="relative z-10 text-white/85 text-base md:text-lg leading-relaxed">
          “{item.text}”
        </p>

        {/* Author */}
        <div className="relative z-10 pt-8 border-t border-white/10 mt-8">
          <p className="text-white font-medium text-lg">
            {item.name}
          </p>
          <p className="text-white/60 text-sm">
            {item.role}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>

        {/* Edge Fade */}
        <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 h-[300px] w-32 bg-gradient-to-r from-black to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-[300px] w-32 bg-gradient-to-l from-black to-transparent z-20" />
      </section>
    </main>
  );
}
