"use client";

import { useEffect, useState } from "react";
import { CALENDLY_URL } from "@/lib/contactConfig";

const testimonials = [
  {
    text: "Softree Technology helped us launch our MVP in record time and validate our idea with real users.",
    name: "Amit Kulkarni",
    role: "Founder, Early-Stage Startup",
  },
  {
    text: "Their MVP-first approach saved us months of development and gave us a scalable foundation.",
    name: "Sneha Patel",
    role: "Product Manager, SaaS Startup",
  },
  {
    text: "From concept to launch, Softree delivered an MVP that impressed users and investors alike.",
    name: "Rohit Verma",
    role: "Co-Founder & CTO",
  },
];

export default function MvpHero() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % testimonials.length);
        setVisible(true);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const active = testimonials[index];

  return (
    <section className="relative bg-[#00091A] pt-24 pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D0057]/70 via-black/40 to-[#240F8E]/30" />

      {/* HERO CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center mt-4">
        {/* BACKGROUND ACCENTS */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl -z-10" />
        <div className="absolute top-16 right-0 h-56 w-56 rounded-full bg-indigo-500/15 blur-2xl -z-10" />

        {/* EYEBROW */}
        <div className="mb-6 flex justify-center">
          <span
            className="
              inline-flex items-center gap-2
              px-5 py-2
              rounded-full
              text-xs md:text-sm
              font-semibold
              tracking-widest uppercase
              bg-white/10
              border border-white/25
              text-white
              backdrop-blur-md
            "
          >
            🚀 MVP Development Services
          </span>
        </div>

        {/* MAIN HEADING */}
        <h1
          className="
            text-3xl md:text-4xl lg:text-5xl xl:text-5xl
            font-bold
            leading-[1.25]
            text-white
          "
        >
          Build{" "}
          <span className="text-blue-400">
            Scalable MVPs
          </span>{" "}
          That Validate Your Idea
          <br className="hidden md:block" />
          and Prepare You for{" "}
          <span className="relative inline-block pb-3">
            <span
              className="
                absolute left-0 right-0 bottom-0
                h-1.5 bg-blue-500/40 rounded-full
              "
            />
            <span className="relative text-white/90 font-semibold">
              Market Growth
            </span>
          </span>
        </h1>

        {/* SUB HEADING */}
        <p
          className="
            mt-8
            max-w-3xl mx-auto
            text-lg md:text-xl
            leading-relaxed
            text-white/85
          "
        >
          We help startups and founders design, build, and launch{" "}
          <span className="text-white font-semibold">lean</span>,{" "}
          <span className="text-white font-semibold">high-impact</span>, and{" "}
          <span className="text-white font-semibold">future-ready</span> MVPs —
          from idea validation to real users, traction, and{" "}
          <span className="text-white font-semibold">
            investor-ready products
          </span>
          .
        </p>

        {/* CTA SECTION */}
        <div className="mt-16 flex justify-center">
          <div
            className="
              relative
              flex flex-col sm:flex-row
              gap-6
              px-8 sm:px-12
              py-8
              rounded-3xl
              bg-white/10
              border border-white/20
              backdrop-blur-xl
              shadow-[0_30px_80px_rgba(0,0,0,0.45)]
            "
          >
            {/* Glow */}
            <div className="absolute -top-10 -left-10 h-40 w-40 bg-blue-500/20 blur-3xl rounded-full -z-10" />
            <div className="absolute -bottom-10 -right-10 h-40 w-40 bg-indigo-500/20 blur-3xl rounded-full -z-10" />

            {/* PRIMARY CTA */}
            <a
              href={CALENDLY_URL}
              target="_blank"
              className="
                relative inline-flex items-center justify-center
                px-12 py-4 rounded-full
                font-semibold text-white
                bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500
                shadow-[0_18px_40px_rgba(59,130,246,0.45)]
                transition-all duration-300
                hover:scale-105 overflow-hidden
              "
            >
              <span className="absolute inset-0 bg-white/10 backdrop-blur-sm pointer-events-none" />
              <span className="relative z-10 whitespace-nowrap">
                Validate Your Idea
              </span>
            </a>

            {/* SECONDARY CTA */}
            <a
              href="#services"
              className="
                relative inline-flex items-center justify-center
                px-12 py-4 rounded-full
                font-semibold text-white
                border border-white/35 bg-white/10
                backdrop-blur-sm
                shadow-[0_12px_30px_rgba(0,0,0,0.25)]
                transition-all duration-300
                hover:bg-white/15 hover:border-white/60 hover:scale-105
                overflow-hidden
              "
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <span className="relative z-10 whitespace-nowrap">
                View MVP Services
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* TESTIMONIAL */}
      <div className="relative z-10 mt-10 flex justify-center">
        <div
          className="
            relative flex gap-6
            px-10 py-8
            w-[80%] md:w-[60%] lg:w-[50%]
            rounded-full
            backdrop-blur-xl
            shadow-[0_40px_120px_rgba(0,0,0,0.6)]
          "
          style={{
            background: `
              linear-gradient(
                110deg,
                rgb(2, 119, 249) 0.09%,
                rgba(0, 7, 67, 0) 26%
              ),
              rgb(1, 7, 67)
            `,
          }}
        >
          <svg
            className="flex-shrink-0 text-white/70"
            viewBox="0 0 24 24"
            height="40"
            width="40"
            fill="currentColor"
          >
            <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68..."></path>
          </svg>

          <div className="flex flex-col justify-center">
            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-2">
              "{active.text}"
            </p>
            <p className="text-right text-white/80 text-sm md:text-base font-medium">
              — {active.name}
            </p>
            <p className="text-right text-white/50 text-xs">
              {active.role}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
