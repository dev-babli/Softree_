"use client";
import { useRef, useEffect } from "react";

export default function TrustedBy() {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const logos = [
    { name: "GO ERP", src: "/images/logo/goerp1.jpg" },
    { name: "Nuvento", src: "/images/logo/nuvento.jpg" },
    { name: "Kwiz", src: "/images/logo/kwiz.png" },
    { name: "Jonians", src: "/images/logo/jonians.jpg" },
    { name: "Export Control Group", src: "/images/logo/ecg.png" },
    { name: "SP Marketplace", src: "/images/logo/1.jpg" },
    { name: "Bosch", src: "/images/logo/bosch.png" },
    { name: "Emscale", src: "/images/logo/emscale_logo.png" },
    { name: "Link Innovation", src: "/images/logo/link-innovation.png" },
    { name: "Intellectt", src: "/images/logo/Intellectt_logo.png" },
  ];

  return (
    <section className="relative py-20 bg-[#0a0a0a] text-white overflow-hidden">
      <style>{`
        .logo-marquee-wrap {
          overflow: hidden;
          width: 100%;
          position: relative;
          padding: 1rem 0;
        }
        .logo-marquee-wrap::before,
        .logo-marquee-wrap::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 120px;
          z-index: 2;
          pointer-events: none;
        }
        .logo-marquee-wrap::before {
          left: 0;
          background: linear-gradient(to right, #0a0a0a, transparent);
        }
        .logo-marquee-wrap::after {
          right: 0;
          background: linear-gradient(to left, #0a0a0a, transparent);
        }
        .logo-marquee-track {
          display: flex;
          gap: 48px;
          width: max-content;
        }
        @media (prefers-reduced-motion: no-preference) {
          .logo-marquee-track {
            animation: marqueeScroll 30s linear infinite;
          }
          .logo-marquee-track:hover {
            animation-play-state: paused;
          }
          @keyframes marqueeScroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        }
        .logo-marquee-item {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 140px;
          height: 60px;
          opacity: 0.4;
          transition: opacity 0.4s ease;
          filter: grayscale(1) brightness(1.5);
        }
        .logo-marquee-item:hover {
          opacity: 0.85;
          filter: grayscale(0) brightness(1);
        }
        .logo-marquee-item img {
          max-height: 44px;
          width: auto;
          object-fit: contain;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div
          ref={headingRef}
          className="flex items-center gap-6 mb-12"
          style={{ opacity: 0, transform: "translateY(16px)" }}
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <p className="shrink-0 text-[11px] font-semibold tracking-[0.2em] uppercase text-white/40">
            Trusted by partners and clients
          </p>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Marquee */}
        <div className="logo-marquee-wrap">
          <div className="logo-marquee-track">
            {[...logos, ...logos].map((logo, index) => (
              <div key={index} className="logo-marquee-item">
                <img src={logo.src} alt={logo.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
