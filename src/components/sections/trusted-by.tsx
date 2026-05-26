"use client";

import { useRef } from "react";

interface Logo {
  name: string;
  src: string;
  accent: string;
}

const logos: Logo[] = [
  { name: "GO ERP", src: "/images/logo/goerp1.jpg", accent: "#3b82f6" },
  { name: "Nuvento", src: "/images/logo/nuvento.jpg", accent: "#06b6d4" },
  { name: "Kwiz", src: "/images/logo/kwiz.png", accent: "#8b5cf6" },
  { name: "Jonians", src: "/images/logo/jonians.jpg", accent: "#10b981" },
  { name: "Export Control", src: "/images/logo/ecg.png", accent: "#ef4444" },
  { name: "SP Marketplace", src: "/images/logo/sp-marketplace.png", accent: "#f59e0b" },
  { name: "Bosch", src: "/images/logo/bosch.png", accent: "#ef4444" },
  { name: "Emscale", src: "/images/logo/emscale_logo.png", accent: "#22c55e" },
  { name: "Link Innovation", src: "/images/logo/link-innovation.png", accent: "#0ea5e9" },
  { name: "Intellectt", src: "/images/logo/Intellectt_logo.png", accent: "#a855f7" },
];

// ─── Logo Card ────────────────────────────────────────────────────────────────

function LogoCard({ logo }: { logo: Logo }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);

  const handleError = () => {
    if (imgRef.current) imgRef.current.style.display = "none";
    if (fallbackRef.current) fallbackRef.current.style.display = "flex";
  };

  return (
    <div
      style={{
        position: "relative",
        width: 160,
        height: 85,
        borderRadius: 10,
        border: "0.5px solid #f9731666",
        background: "linear-gradient(135deg, #141414 0%, #0f0f0f 100%)",
        boxShadow: "0 0 15px #f9731615, inset 0 0 15px #f9731608",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        flexShrink: 0,
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {/* Radial glow overlay */}
      <div
        className="card-glow"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.8,
          borderRadius: 10,
          pointerEvents: "none",
          background: "radial-gradient(ellipse at 50% 100%, #f9731612 0%, transparent 65%)",
        }}
      />

      {/* Bottom accent line */}
      <div
        className="card-line"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1.5,
          background: "#f97316",
          boxShadow: "0 0 4px #f97316",
          transform: "scaleX(1)",
          transformOrigin: "left",
          pointerEvents: "none",
        }}
      />

      {/* Logo image */}
      <div
        style={{
          width: 120,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
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
            filter: "grayscale(0) brightness(1.1)",
            transition: "filter 0.3s",
          }}
        />
        <div
          ref={fallbackRef}
          style={{
            display: "none",
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: `${logo.accent}18`,
            border: `1px solid ${logo.accent}44`,
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 16,
            letterSpacing: "0.06em",
            color: logo.accent,
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
          fontSize: 9,
          fontWeight: 500,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#f97316",
        }}
      >
        {logo.name}
      </span>
    </div>
  );
}

// ─── Marquee Row ──────────────────────────────────────────────────────────────

function MarqueeRow({
  items,
  reverse = false,
  duration = "35s",
}: {
  items: Logo[];
  reverse?: boolean;
  duration?: string;
}) {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div style={{ overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          gap: 10,
          width: "max-content",
          padding: "10px 0 14px",
          animation: `marqueeScroll ${duration} linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.animationPlayState = "paused")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.animationPlayState = "running")
        }
      >
        {repeated.map((logo, i) => (
          <LogoCard key={`${logo.name}-${i}`} logo={logo} />
        ))}
      </div>
    </div>
  );
}

// ─── Star Icon ────────────────────────────────────────────────────────────────

function StarIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width={12} height={12}>
      <path
        d="M8 2L9.5 6.5H14L10.5 9L12 13.5L8 11L4 13.5L5.5 9L2 6.5H6.5L8 2Z"
        fill="#f97316"
        opacity={0.9}
      />
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function LogoMarquee() {
  const row1 = logos.slice(0, 5);
  const row2 = logos.slice(5);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.7); }
        }
      `}</style>

      <section
        style={{
          position: "relative",
          overflow: "hidden",
          paddingBottom: "3rem",
          background: "#0a0a0a",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >

        {/* Header */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            padding: "3rem 2rem 2.5rem",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              border: "0.5px solid #f9731666",
              background: "#f9731612",
              borderRadius: 100,
              padding: "4px 14px",
              marginBottom: "1.2rem",
              boxShadow: "0 0 18px #f9731622",
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#f97316",
                boxShadow: "0 0 8px #f97316, 0 0 14px #f97316aa",
                animation: "pulseDot 2s ease-in-out infinite",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#f97316",
                fontWeight: 500,
              }}
            >
              Trusted worldwide
            </span>
          </div>

          {/* Heading */}
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 52,
              letterSpacing: "0.06em",
              lineHeight: 1,
              color: "#fff",
              marginBottom: "0.5rem",
            }}
          >
            Companies That{" "}

            Trust Us

          </h2>

          {/* Subtext */}
          <p
            style={{
              fontSize: 13,
              color: "#666",
              letterSpacing: "0.02em",
              fontWeight: 300,
              margin: 0,
            }}
          >
            Partner with industry leaders across the globe
          </p>
        </div>

        {/* Marquee rows */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Edge fades */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 140,
              zIndex: 2,
              pointerEvents: "none",
              background: "linear-gradient(to right, #0a0a0a 20%, transparent)",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: 140,
              zIndex: 2,
              pointerEvents: "none",
              background: "linear-gradient(to left, #0a0a0a 20%, transparent)",
            }}
          />

          <MarqueeRow items={row1} duration="35s" />
          <MarqueeRow items={row2} reverse duration="28s" />
        </div>

        {/* Separator */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            gap: 20,
            margin: "2.5rem auto 0",
            padding: "0 2rem",
            maxWidth: 560,
          }}
        >
          <div
            style={{
              flex: 1,
              height: "0.5px",
              background: "linear-gradient(to right, transparent, #f9731633, transparent)",
            }}
          />
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              border: "0.5px solid #f9731655",
              background: "#f9731612",
              boxShadow: "0 0 14px #f9731630",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <StarIcon />
          </div>
          <div
            style={{
              flex: 1,
              height: "0.5px",
              background: "linear-gradient(to right, transparent, #f9731633, transparent)",
            }}
          />
        </div>

        {/* Stats */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "stretch",
            justifyContent: "center",
            margin: "2rem auto 0",
            maxWidth: 340,
          }}
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
                  i < arr.length - 1 ? "0.5px solid #f9731622" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 36,
                  letterSpacing: "0.06em",
                  color: "#f97316",
                  lineHeight: 1,
                  textShadow: "0 0 30px #f9731488, 0 0 60px #f9731444",
                }}
              >
                {stat.num}
              </div>
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#555",
                  marginTop: 4,
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