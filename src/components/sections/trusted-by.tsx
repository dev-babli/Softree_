"use client";

import { useRef, useState, useEffect } from "react";

interface Logo {
  name: string;
  src: string;
}

const LOGOS: Logo[] = [
  { name: "GO ERP", src: "/images/logo/goerp1.jpg" },
  { name: "Nuvento", src: "/images/logo/nuvento.jpg" },
  { name: "Kwiz", src: "/images/logo/kwiz.png" },
  { name: "Jonians", src: "/images/logo/jonians.jpg" },
  { name: "Export Control", src: "/images/logo/ecg.png" },
  { name: "SP Marketplace", src: "/images/logo/sp-marketplace.png" },
  { name: "Bosch", src: "/images/logo/bosch.png" },
  { name: "Emscale", src: "/images/logo/emscale_logo.png" },
  { name: "Link Innovation", src: "/images/logo/link-innovation.png" },
  { name: "Intellectt", src: "/images/logo/Intellectt_logo.png" },
];

/* ---------------------------------------------------------------------------
 * LogoCard
 * White tile keeps mixed JPG/PNG logos legible and on-brand.
 * Apple/Stripe trust-grid convention with Jhey's dynamic spotlight border tracking.
 * ------------------------------------------------------------------------- */
function LogoCard({ logo }: { logo: Logo }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);
  
  // Jhey's Cursor Spotlight Tracking
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleError = () => {
    if (imgRef.current) imgRef.current.style.display = "none";
    if (fallbackRef.current) fallbackRef.current.style.display = "flex";
  };

  return (
    <div
      className="logo-card group/card"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        width: 172,
        height: 92,
        padding: 1, // acts as border width for dynamic spotlight border
        borderRadius: 14,
        // The border itself lights up at the cursor coordinates!
        background: isHovered
          ? `radial-gradient(circle 80px at ${mousePos.x}px ${mousePos.y}px, rgba(249, 115, 22, 0.45) 0%, rgba(249, 115, 22, 0.15) 100%)`
          : "rgba(249, 115, 22, 0.12)",
        boxShadow: isHovered
          ? "0 12px 24px rgba(0, 0, 0, 0.5), 0 0 20px rgba(249, 115, 22, 0.12)"
          : "0 4px 10px rgba(0, 0, 0, 0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        overflow: "hidden",
        cursor: "default",
        transition: "transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.5s ease, background 0.5s ease",
        willChange: "transform, box-shadow, background",
      }}
    >
      {/* Inner Content Card Container */}
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 13,
          background: "linear-gradient(135deg, rgba(18, 18, 18, 0.9) 0%, rgba(10, 10, 10, 0.98) 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dynamic Cursor Spotlight (Jhey's Inner Card Glow) */}
        {isHovered && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background: `radial-gradient(circle 60px at ${mousePos.x}px ${mousePos.y}px, rgba(249, 115, 22, 0.12) 0%, transparent 100%)`,
              zIndex: 0,
            }}
          />
        )}

        {/* Ambient bottom glow (tactile feel) */}
        <div
          className="card-glow"
          style={{
            position: "absolute",
            inset: 0,
            opacity: isHovered ? 1 : 0.4,
            borderRadius: 13,
            pointerEvents: "none",
            background: "radial-gradient(ellipse at 50% 100%, rgba(249, 115, 22, 0.06) 0%, transparent 60%)",
            transition: "opacity 0.5s ease",
            zIndex: 0,
          }}
        />

        {/* Dynamic Expanding Bottom Accent Line (Jakub's Finish) */}
        <div
          className="card-line"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 1.5,
            background: "linear-gradient(90deg, transparent, #f97316 20%, #f97316 80%, transparent)",
            boxShadow: "0 0 8px #f97316, 0 0 14px rgba(249, 115, 22, 0.4)",
            transform: isHovered ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "center",
            transition: "transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* Logo image container */}
        <div
          style={{
            width: 124,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
            padding: 4,
          }}
        >
          <img
            ref={imgRef}
            src={logo.src}
            alt={logo.name}
            loading="lazy"
            onError={handleError}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              // Softly desaturated by default, lifts and pops into full color/contrast on hover
              filter: isHovered 
                ? "grayscale(0) brightness(1.1) contrast(1.05)" 
                : "grayscale(1) opacity(0.65) brightness(1.3)",
              transform: isHovered ? "scale(1.06) translateY(-1px)" : "scale(1) translateY(0)",
              transition: "filter 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",
            }}
          />
          
          {/* Glassmorphic Fallback Avatar */}
          <div
            ref={fallbackRef}
            style={{
              display: "none",
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.01) 100%)",
              border: `1.5px solid #f9731655`,
              boxShadow: `0 0 10px #f9731622`,
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: "0.06em",
              color: "#fff",
              textShadow: `0 0 8px #f97316`,
            }}
          >
            {logo.name.slice(0, 2).toUpperCase()}
          </div>
        </div>

        {/* Name label */}
        <span
          className="card-name"
          style={{
            position: "relative",
            zIndex: 1,
            fontSize: 9.2,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: isHovered ? "#fff" : "rgba(249, 115, 22, 0.7)",
            transition: "color 0.5s ease",
          }}
        >
          {logo.name}
        </span>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * MarqueeRow
 * - Pauses when off-screen (battery / GPU)
 * - Pauses on hover so users can read a logo
 * - Honors prefers-reduced-motion
 * ------------------------------------------------------------------------- */
function MarqueeRow({
  items,
  reverse = false,
  duration = "60s",
}: {
  items: Logo[];
  reverse?: boolean;
  duration?: string;
}) {
  const repeated = [...items, ...items, ...items, ...items];
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const track = el.querySelector<HTMLElement>(".marquee-row-anim");
        if (!track) return;
        track.style.animationPlayState = entry.isIntersecting
          ? "running"
          : "paused";
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="overflow-hidden">
      <div
        className="marquee-row-anim"
        style={{
          display: "flex",
          gap: 14,
          width: "max-content",
          padding: "12px 0 16px",
          animation: `marqueeScroll ${duration} linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
          willChange: "transform",
          transform: "translate3d(0, 0, 0)", // Promotion to GPU composite layer
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.animationPlayState = "paused";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.animationPlayState = "running";
        }}
      >
        {repeated.map((logo, i) => (
          <LogoCard key={`${logo.name}-${i}`} logo={logo} />
        ))}
      </div>
    </div>
  );
}

// ─── Star Icon Component ───────────────────────────────────────────────────────
function StarIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width={13} height={13}>
      <path
        d="M8 2L9.5 6.5H14L10.5 9L12 13.5L8 11L4 13.5L5.5 9L2 6.5H6.5L8 2Z"
        fill="#f97316"
        opacity={0.9}
      />
    </svg>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function TrustedBy() {
  const row1 = LOGOS.slice(0, 5);
  const row2 = LOGOS.slice(5);

  return (
    <>
      <style>{`
        /* GPU accelerated scrolling keyframes */
        @keyframes marqueeScroll {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }

        /* Separator Star Breathing Glow */
        @keyframes starPulse {
          0%, 100% { box-shadow: 0 0 10px rgba(249, 115, 22, 0.15); transform: scale(1); }
          50% { box-shadow: 0 0 20px rgba(249, 115, 22, 0.4); transform: scale(1.05); }
        }

        /* Hover floating micro-feedback */
        .logo-card:hover {
          transform: translateY(-4px) !important;
        }

        /* Emil's Accessibility Requirement: Strict prefers-reduced-motion support */
        @media (prefers-reduced-motion: reduce) {
          .marquee-row-anim {
            animation: none !important;
            transform: none !important;
          }
          .logo-card {
            transition: none !important;
            transform: none !important;
          }
          .logo-card:hover {
            transform: none !important;
          }
        }
      `}</style>

      <section
        style={{
          position: "relative",
          overflow: "hidden",
          paddingBottom: "4.5rem",
          background: "#0a0a0a",
        }}
      >
        {/* Subtle Ambient Background Gradient Glow (Atmospheric sense of branding depth) */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "650px",
            height: "250px",
            background: "radial-gradient(circle, rgba(249, 115, 22, 0.045) 0%, transparent 80%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Header */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            padding: "3.5rem 2rem 2rem",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              border: "1px solid rgba(249, 115, 22, 0.25)",
              background: "rgba(249, 115, 22, 0.08)",
              borderRadius: 100,
              padding: "5px 16px",
              marginBottom: "1.4rem",
              boxShadow: "0 0 15px rgba(249, 115, 22, 0.1)",
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#f97316",
                boxShadow: "0 0 8px #f97316, 0 0 14px rgba(249, 115, 22, 0.6)",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: 10.5,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#f97316",
                fontWeight: 600,
              }}
            >
              Trusted worldwide
            </span>
          </div>

          {/* Heading */}
          <h2
            style={{
              fontSize: 42,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              color: "#fff",
              marginBottom: "0.6rem",
              textShadow: "0 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            Companies That <span style={{ color: "#f97316" }}>Trust Us</span>
          </h2>

          {/* Subtext */}
          <p
            style={{
              fontSize: 13.5,
              color: "rgba(255, 255, 255, 0.45)",
              letterSpacing: "0.02em",
              fontWeight: 400,
              margin: 0,
            }}
          >
            Partnering with enterprise leaders and innovators across the globe
          </p>
        </div>

        {/* Marquee rows */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Broad, feathered edge fades for premium blending */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 180,
              zIndex: 2,
              pointerEvents: "none",
              background: "linear-gradient(to right, #0a0a0a 15%, transparent 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: 180,
              zIndex: 2,
              pointerEvents: "none",
              background: "linear-gradient(to left, #0a0a0a 15%, transparent 100%)",
            }}
          />

          <MarqueeRow items={row1} duration="36s" />
          <MarqueeRow items={row2} reverse duration="30s" />
        </div>

        {/* Separator */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            gap: 20,
            margin: "2.8rem auto 0",
            padding: "0 2rem",
            maxWidth: 580,
          }}
        >
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "linear-gradient(to right, transparent, rgba(249, 115, 22, 0.25), transparent)",
            }}
          />
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              border: "1px solid rgba(249, 115, 22, 0.3)",
              background: "rgba(249, 115, 22, 0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "starPulse 3s ease-in-out infinite",
            }}
          >
            <StarIcon />
          </div>
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "linear-gradient(to right, transparent, rgba(249, 115, 22, 0.25), transparent)",
            }}
          />
        </div>

        {/* Glassmorphic Metrics Container (Analytics Dashboard feel) */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "stretch",
            justifyContent: "center",
            margin: "3rem auto 0",
            maxWidth: 380,
            padding: "20px 24px",
            borderRadius: 16,
            border: "1px solid rgba(249, 115, 22, 0.12)",
            background: "linear-gradient(135deg, rgba(22, 22, 22, 0.6) 0%, rgba(12, 12, 12, 0.8) 100%)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow: "0 15px 35px rgba(0, 0, 0, 0.45), inset 0 0 15px rgba(249, 115, 22, 0.03)",
            transition: "all 0.5s ease",
          }}
          className="hover:scale-[1.02] hover:border-rgba(249, 115, 22, 0.2) duration-500"
        >
          {[
            { num: "100%", label: "Satisfaction" },
            { num: "Global", label: "Reach" },
          ].map((stat, i, arr) => (
            <div
              key={stat.label}
              style={{
                flex: 1,
                textAlign: "center",
                padding: "0 24px",
                borderRight:
                  i < arr.length - 1 ? "1px solid rgba(249, 115, 22, 0.15)" : "none",
              }}
            >
              <div
                style={{
                  fontSize: 38,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "#f97316",
                  lineHeight: 1,
                  textShadow: "0 0 25px rgba(249, 115, 22, 0.5), 0 0 45px rgba(249, 115, 22, 0.2)",
                }}
              >
                {stat.num}
              </div>
              <div
                style={{
                  fontSize: 10.5,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(255, 255, 255, 0.35)",
                  marginTop: 5,
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
