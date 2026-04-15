"use client";
import Link from "next/link";

import { useEffect, useRef } from "react";

export default function ContactHero() {
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

  const chips = [
    {
      label: "AI & Machine Learning",
      icon: (
        <svg
          viewBox="0 0 14 14"
          fill="none"
          style={{ width: 14, height: 14, flexShrink: 0 }}
        >
          <rect width="14" height="14" rx="3" fill="#67e8f9" opacity=".7" />
          <path
            d="M4 7h6M7 4v6"
            stroke="#0b3ea8"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: "SharePoint",
      icon: (
        <svg
          viewBox="0 0 14 14"
          fill="none"
          style={{ width: 14, height: 14, flexShrink: 0 }}
        >
          <rect width="14" height="14" rx="3" fill="#818cf8" opacity=".7" />
          <path
            d="M3 5h8M3 7h8M3 9h5"
            stroke="#fff"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: "Power Platform",
      icon: (
        <svg
          viewBox="0 0 14 14"
          fill="none"
          style={{ width: 14, height: 14, flexShrink: 0 }}
        >
          <rect width="14" height="14" rx="3" fill="#34d399" opacity=".7" />
          <path
            d="M4 10V7l3-3 3 3v3"
            stroke="#fff"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "Modern Apps",
      icon: (
        <svg
          viewBox="0 0 14 14"
          fill="none"
          style={{ width: 14, height: 14, flexShrink: 0 }}
        >
          <rect width="14" height="14" rx="3" fill="#fbbf24" opacity=".7" />
          <circle cx="7" cy="7" r="2.5" stroke="#fff" strokeWidth="1.2" />
        </svg>
      ),
    },
  ];

  const stats = [
    { num: "150+", label: "Projects delivered" },
    { num: "98%", label: "Client satisfaction" },
    { num: "12+", label: "Years experience" },
  ];

  return (
    <section
      className="relative overflow-hidden text-white"
      style={{
        background: "#0b3ea8",
        borderRadius: "1rem",
        minHeight: 520,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1.5rem 7rem",
      }}
    >
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

      {/* ── Content ── */}
      <div className="relative z-10 text-center" style={{ maxWidth: 680 }}>
        {/* Badge */}
        <div
          className="mt-10 inline-flex items-center gap-2 mb-2"
          style={{
            padding: "6px 16px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.10)",
            border: "0.5px solid rgba(255,255,255,0.20)",
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.85)",
          }}
        >
          <span
            className="animate-pulse"
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#67e8f9",
            }}
          />
          Get in touch
        </div>

        {/* Heading */}
        <h1
          className="font-semibold text-white mb-5"
          style={{ fontSize: "clamp(28px,5.5vw,52px)", lineHeight: 1.15 }}
        >
          Start Your Next
          <br />
          <span
            style={{
              background:
                "linear-gradient(100deg,#67e8f9 0%,#a5f3fc 40%,#fff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Digital Transformation
          </span>
        </h1>

        {/* Description */}
        <p
          className="mx-auto mb-8"
          style={{
            fontSize: 15,
            color: "rgba(255,255,255,0.70)",
            lineHeight: 1.75,
            maxWidth: 520,
          }}
        >
          Partner with Softree to build intelligent solutions across AI,
          SharePoint, Power Platform, and modern applications — turning ideas
          into scalable, high-impact products.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex items-center justify-center flex-wrap mb-4"
          style={{ gap: 12 }}
        >
          <Link href="/services">
            <button
              className="inline-flex items-center transition-transform hover:-translate-y-0.5 active:scale-95"
              style={{
                gap: 8,
                padding: "11px 24px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.88)",
                fontSize: 14,
                fontWeight: 400,
                border: "0.5px solid rgba(255,255,255,0.22)",
                cursor: "pointer",
              }}
            >
              Explore services
              <svg
                viewBox="0 0 16 16"
                fill="none"
                style={{ width: 16, height: 16 }}
              >
                <path
                  d="M4 12L12 4M12 4H7M12 4v5"
                  stroke="rgba(255,255,255,0.8)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </Link>
        </div>

        {/* Tech chips */}
        <div
          className="flex items-center justify-center flex-wrap mb-5"
          style={{ gap: 8 }}
        >
          {chips.map((chip) => (
            <div
              key={chip.label}
              className="inline-flex items-center"
              style={{
                gap: 6,
                padding: "5px 14px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.07)",
                border: "0.5px solid rgba(255,255,255,0.15)",
                fontSize: 12,
                color: "rgba(255,255,255,0.65)",
              }}
            >
              {chip.icon}
              {chip.label}
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="flex items-center justify-center flex-wrap">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="text-center"
              style={{
                padding: "0 2rem",
                borderRight:
                  i < stats.length - 1
                    ? "0.5px solid rgba(255,255,255,0.15)"
                    : "none",
              }}
            >
              <div style={{ fontSize: 24, fontWeight: 500, color: "#fff" }}>
                {s.num}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.50)",
                  marginTop: 2,
                  letterSpacing: "0.04em",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Double-layer wave */}
      <div
        className="absolute bottom-0 left-0 w-full overflow-hidden"
        style={{ lineHeight: 0 }}
      >
        <svg
          viewBox="0 0 1440 110"
          className="w-full block"
          style={{ height: 80 }}
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            d="M0,50 C200,90 400,20 600,55 C800,90 1000,20 1200,55 C1320,75 1400,65 1440,58 L1440,110 L0,110 Z"
            fill="url(#waveGrad)"
          />
          <path
            d="M0,70 C240,40 480,95 720,65 C960,35 1200,90 1440,60 L1440,110 L0,110 Z"
            fill="#ffffff"
            opacity="0.5"
          />
        </svg>
      </div>
    </section>
  );
}
