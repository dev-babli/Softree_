"use client";

import { useEffect, useRef, useState } from "react";

const SERVICES_TICKER = [
  "SharePoint",
  "SPFx",
  "Power Apps",
  "Power BI",
  "Web Apps",
  "Mobile",
  "AI Agents",
];

export default function ServicesHero() {
  const [mounted, setMounted] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);
  const [tickerVisible, setTickerVisible] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Inject fonts + keyframes
    const styleId = "hero-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes tickerIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes tickerOut {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-10px); }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.5; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes badge-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-5px); }
        }
      `;
      document.head.appendChild(style);
    }
    setMounted(true);
  }, []);

  // Cycling word ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerVisible(false);
      setTimeout(() => {
        setTickerIndex((i) => (i + 1) % SERVICES_TICKER.length);
        setTickerVisible(true);
      }, 320);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  // Subtle canvas particle field
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const dots: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      o: number;
    }[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 1.2 + 0.3,
      o: Math.random() * 0.35 + 0.05,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,158,11,${d.o})`;
        ctx.fill();
      });
      // Connect nearby dots
      dots.forEach((a, i) => {
        dots.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(245,158,11,${0.06 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  if (!mounted) return null;

  return (
    <section
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "#09090f",
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 32px",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
          backgroundSize: "52px 52px",
          pointerEvents: "none",
        }}
      />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          animation: "heroFadeIn 2s ease both",
        }}
      />

      {/* Radial glows */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            top: "-20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(245,158,11,0.09) 0%, transparent 65%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "0",
            right: "-10%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1100px",
          margin: "0 auto",
          width: "100%",
          paddingTop: "80px",
          paddingBottom: "80px",
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "40px",
            animation: "heroFadeUp 0.6s 0.1s both",
          }}
        >
          <div
            style={{
              width: "26px",
              height: "1px",
              background: "#f59e0b",
              opacity: 0.7,
            }}
          />
          <span
            style={{
              fontSize: "10.5px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#f59e0b",
            }}
          >
            Our Services
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(44px, 7vw, 96px)",
            fontWeight: 900,
            lineHeight: 1.02,
            color: "#f0f0f4",
            margin: 0,
            marginBottom: "8px",
            animation: "heroFadeUp 0.7s 0.2s both",
            letterSpacing: "-0.02em",
          }}
        >
          We build things
        </h1>

        {/* Italic + cycling word line */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "16px",
            marginBottom: "40px",
            flexWrap: "wrap",
            animation: "heroFadeUp 0.7s 0.3s both",
          }}
        >
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(44px, 7vw, 96px)",
              lineHeight: 1.02,
              color: "#888899",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            that matter —
          </h1>
          <div
            style={{
              overflow: "hidden",
              height: "clamp(44px, 7vw, 96px)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              key={tickerIndex}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(44px, 7vw, 96px)",
                fontWeight: 900,
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
                color: "#f59e0b",
                display: "block",
                animation: tickerVisible
                  ? "tickerIn 0.3s ease both"
                  : "tickerOut 0.3s ease both",
              }}
            >
              {SERVICES_TICKER[tickerIndex]}
            </span>
          </div>
        </div>

        {/* Sub-copy + CTA */}
        <div
          style={{
            animation: "heroFadeUp 0.7s 0.45s both",
          }}
        >
          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.75,
              color: "#666677",
              fontWeight: 300,
              maxWidth: "540px",
              margin: 0,
            }}
          >
            From Microsoft 365 platforms to AI-powered agents — we design,
            build, and ship enterprise software that teams actually use.
          </p>

          <div
            style={{
              display: "flex",
              gap: "14px",
              alignItems: "center",
              marginTop: "28px",
            }}
          >
            <button
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.04em",
                padding: "13px 28px",
                borderRadius: "100px",
                background: "#f59e0b",
                color: "#09090f",
                border: "none",
                cursor: "pointer",
                transition: "background .2s, transform .15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "#fbbf24";
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "#f59e0b";
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "translateY(0)";
              }}
            >
              Get in touch
            </button>
            <button
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.04em",
                padding: "13px 28px",
                borderRadius: "100px",
                background: "transparent",
                color: "#888899",
                border: "0.5px solid rgba(255,255,255,0.12)",
                cursor: "pointer",
                transition: "border-color .2s, color .2s, transform .15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "rgba(255,255,255,0.28)";
                (e.currentTarget as HTMLButtonElement).style.color = "#c8c8d8";
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "rgba(255,255,255,0.12)";
                (e.currentTarget as HTMLButtonElement).style.color = "#888899";
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "translateY(0)";
              }}
            >
              View our work
            </button>
          </div>
        </div>

        {/* Stat badges */}
        <div
          style={{
            display: "flex",
            gap: "14px",
            marginTop: "80px",
            flexWrap: "wrap",
            animation: "heroFadeUp 0.7s 0.6s both",
          }}
        >
          {[
            { value: "7+", label: "Service areas" },
            { value: "50+", label: "Delivered projects" },
            { value: "M365", label: "Certified stack" },
            { value: "AI-first", label: "Approach" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              style={{
                padding: "16px 24px",
                borderRadius: "12px",
                border: "0.5px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.022)",
                backdropFilter: "blur(8px)",
                animation: `badge-float 4s ${i * 0.4}s ease-in-out infinite`,
              }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#f0f0f4",
                  lineHeight: 1,
                  marginBottom: "4px",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 400,
                  color: "#444455",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient fade into cards section */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "120px",
          background:
            "linear-gradient(to bottom, transparent, rgba(9,9,15,0.7))",
          pointerEvents: "none",
        }}
      />
    </section>
  );
}
