"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";

export default function AboutHeroWithTestimonial() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const hero = canvas.parentElement!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    };
    resize();

    const pts = Array.from({ length: 48 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      o: Math.random() * 0.35 + 0.08,
    }));

    let raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(165,243,252,${p.o})`;
        ctx.fill();
      });

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(165,243,252,${0.09 * (1 - d / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* ================= UI ================= */
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0b3ea8] via-[#1557c0] to-[#1e73d8] text-white">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Glow orbs */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 420,
          height: 420,
          top: -120,
          left: -120,
          background:
            "radial-gradient(circle,rgba(99,179,237,0.22) 0%,transparent 65%)",
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 360,
          height: 360,
          top: -60,
          right: -80,
          background:
            "radial-gradient(circle,rgba(6,182,212,0.18) 0%,transparent 65%)",
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 280,
          height: 280,
          bottom: 60,
          left: "33%",
          background:
            "radial-gradient(circle,rgba(139,92,246,0.12) 0%,transparent 65%)",
        }}
      />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-12 text-center mt-5">
        {/* Badge */}
        <span className="inline-block mb-5 px-4 py-2 rounded-full bg-white/10 backdrop-blur text-xs tracking-widest uppercase">
          About Softree
        </span>

        {/* Heading */}
        <h1 className="text-4xl md:text-4xl lg:text-5xl font-semibold leading-tight">
          Building Intelligent Microsoft Solutions &
          <br />
          <span className="bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent">
            Modern Digital Application
          </span>
        </h1>

        {/* Description */}
        <p className="mt-5 text-lg text-white/75 max-w-3xl mx-auto">
          Softree is a global technology delivery partner specializing in
          Microsoft ecosystem solutions and modern full-stack application
          engineering.
        </p>

        {/* ================= GLASS INFO PANEL ================= */}
        <div className="mt-5 mx-auto max-w-3xl rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl p-7 shadow-2xl">
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
          <div className="my-3 h-px bg-white/15" />

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
