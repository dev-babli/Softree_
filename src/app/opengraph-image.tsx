import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Softree Technology | AI, Power Platform & Web Development";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0a0a0f",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow — top right */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 540,
            height: 540,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(24,82,255,0.28) 0%, rgba(24,82,255,0.06) 50%, transparent 70%)",
          }}
        />
        {/* Background glow — bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -60,
            width: 420,
            height: 420,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 65%)",
          }}
        />

        {/* Top rule */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "linear-gradient(90deg, #1852FF 0%, #6366f1 50%, transparent 100%)",
          }}
        />

        {/* Logo text / brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 48,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: "linear-gradient(135deg, #1852FF 0%, #6366f1 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            S
          </div>
          <span
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
          >
            Softree Technology
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 62,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.08,
            letterSpacing: "-0.04em",
            maxWidth: 800,
          }}
        >
          Build smarter.
          <br />
          <span
            style={{
              background: "linear-gradient(90deg, #1852FF 0%, #818cf8 100%)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Deliver faster.
          </span>
        </div>

        {/* Sub-description */}
        <div
          style={{
            marginTop: 28,
            fontSize: 22,
            color: "rgba(255,255,255,0.55)",
            fontWeight: 400,
            lineHeight: 1.5,
            maxWidth: 680,
          }}
        >
          AI · Power Platform · SharePoint · Modern Web Development
        </div>

        {/* URL badge */}
        <div
          style={{
            position: "absolute",
            bottom: 52,
            right: 80,
            fontSize: 16,
            color: "rgba(255,255,255,0.3)",
            fontWeight: 500,
            letterSpacing: "0.02em",
          }}
        >
          softreetechnology.com
        </div>

        {/* Corner dots — decorative */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            left: 80,
            display: "flex",
            gap: 8,
          }}
        >
          {["#1852FF", "#6366f1", "#8b5cf6"].map((color, i) => (
            <div
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: color,
                opacity: 0.7,
              }}
            />
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
