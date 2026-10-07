"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { typography } from "@/lib/typography";
import TrustStrip from "@/components/sections/TrustStrip";

export default function SecurityTestingWireframeHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let cx = 0;
    let cy = 0;

    let points: { x: number; y: number; z: number }[] = [];
    let edges: [number, number][] = [];
    let angleX = 0;
    let angleY = 0;

    const initShape = (radius: number) => {
      points = [];
      edges = [];
      const t = (1.0 + Math.sqrt(5.0)) / 2.0;
      const s = radius;
      const p = [
        [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
        [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
        [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]
      ];

      // Outer icosahedron
      p.forEach(v => points.push({ x: v[0] * s, y: v[1] * s, z: v[2] * s }));
      for (let i = 0; i < 12; i++) {
        for (let j = i + 1; j < 12; j++) {
          let d = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y, points[i].z - points[j].z);
          if (d < s * 2.1) edges.push([i, j]);
        }
      }

      // Inner icosahedron
      const innerScale = 0.5;
      p.forEach(v => points.push({ x: v[0] * s * innerScale, y: v[1] * s * innerScale, z: v[2] * s * innerScale }));
      const off = 12;
      for (let i = 0; i < 12; i++) {
        for (let j = i + 1; j < 12; j++) {
          let d = Math.hypot(points[off + i].x - points[off + j].x, points[off + i].y - points[off + j].y, points[off + i].z - points[off + j].z);
          if (d < s * 1.1) edges.push([off + i, off + j]);
        }
        // Connect outer to inner
        edges.push([i, off + i]);
      }

      // Add a third layer for extra complexity
      const outerScale = 1.5;
      p.forEach(v => points.push({ x: v[0] * s * outerScale, y: v[1] * s * outerScale, z: v[2] * s * outerScale }));
      const off2 = 24;
      for (let i = 0; i < 12; i++) {
        for (let j = i + 1; j < 12; j++) {
          let d = Math.hypot(points[off2 + i].x - points[off2 + j].x, points[off2 + i].y - points[off2 + j].y, points[off2 + i].z - points[off2 + j].z);
          if (d < s * 3.1) edges.push([off2 + i, off2 + j]);
        }
        // Connect outer to middle
        edges.push([i, off2 + i]);
      }
    };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const section = canvas.closest('section');

      // Use section dimensions to accurately handle scrolling content on mobile
      width = section ? section.offsetWidth : window.innerWidth;
      height = section ? section.offsetHeight : window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.scale(dpr, dpr);

      const isDesktop = width >= 1024;

      // Make the wireframe much smaller on mobile (0.08) and elegant on desktop (0.095)
      const radius = Math.min(width, height) * (isDesktop ? 0.095 : 0.08);

      if (isDesktop) {
        cx = width * 0.75; // Perfectly center it in the right half
        cy = height * 0.43; // Move slightly up to perfectly align visually with the text block
      } else {
        cx = width / 2;

        // Dynamically find the spacer to perfectly center the wireframe inside it on mobile
        const spacer = document.getElementById('mobile-wireframe-spacer');
        if (spacer && section) {
          const spacerRect = spacer.getBoundingClientRect();
          const sectionRect = section.getBoundingClientRect();
          cy = (spacerRect.top - sectionRect.top) + (spacerRect.height / 2);
        } else {
          cy = height * 0.55;
        }
      }

      initShape(radius);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const project = (p: { x: number; y: number; z: number }) => {
      let x = p.x * Math.cos(angleY) - p.z * Math.sin(angleY);
      let z = p.z * Math.cos(angleY) + p.x * Math.sin(angleY);
      let y = p.y * Math.cos(angleX) - z * Math.sin(angleX);
      z = z * Math.cos(angleX) + p.y * Math.sin(angleX);

      let fov = Math.min(width, height) * 1.5;
      let scale = fov / (fov + z);
      return { x: x * scale + cx, y: y * scale + cy, z: z };
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Slow rotation
      angleY += 0.0015;
      angleX += 0.0008;

      let projected = points.map(p => project(p));

      // Draw edges
      // Draw edges
      ctx.lineWidth = 1.5; // Thicker lines for better visibility
      edges.forEach(e => {
        let p1 = projected[e[0]];
        let p2 = projected[e[1]];
        let depth = (p1.z + p2.z) / 2;
        // Fade out lines that are further back, but keep them bright and clear
        let alpha = Math.max(0.15, Math.min(0.9, (1 - (depth / 400))));

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        // Deep Softree Orange
        ctx.strokeStyle = `rgba(255, 107, 44, ${alpha})`;
        ctx.stroke();
      });

      // Draw nodes
      projected.forEach(p => {
        let alpha = Math.max(0.3, Math.min(1.0, (1 - (p.z / 400))));
        if (alpha > 0.4) {
          // Bright glowing orange for the nodes
          ctx.fillStyle = `rgba(255, 140, 70, ${alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2); // Slightly larger nodes
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section className="relative w-full min-h-[100svh] overflow-hidden bg-[#050505] flex flex-col">
      <style>{`
        @keyframes fadeInUpHero {
          from {
            opacity: 0;
            transform: translateY(2rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-hero-1 { animation: fadeInUpHero 1s ease-out 0.1s forwards; opacity: 0; }
        .animate-hero-2 { animation: fadeInUpHero 1s ease-out 0.3s forwards; opacity: 0; }
        .animate-hero-3 { animation: fadeInUpHero 1s ease-out 0.5s forwards; opacity: 0; }
        .animate-hero-4 { animation: fadeInUpHero 1s ease-out 0.7s forwards; opacity: 0; }

        @media (prefers-reduced-motion: reduce) {
          .animate-hero-1, .animate-hero-2, .animate-hero-3, .animate-hero-4 {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      {/* Subtle radial gradients for depth */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a1528]/30 via-[#050505]/80 to-[#050505] pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_bottom,transparent_0%,#050505_100%)] pointer-events-none" />

      {/* Grid overlay for technical feel */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '4rem 4rem'
        }}
      />

      {/* Animated Wireframe Background (Drawn on top of gradients) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-[1] pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 xl:px-16 py-20 pt-32 lg:pt-24 flex-grow flex flex-col justify-center">
        <div className="flex flex-col items-start text-left max-w-xl lg:max-w-[50%] xl:max-w-[45%]">

          {/* Eyebrow */}
          <div className={`
            inline-flex items-center gap-2 rounded-full border border-[#FF6B2C]/20 bg-[#FF6B2C]/5 backdrop-blur-md px-4 py-1.5 
            mb-8
            ${isLoaded ? 'animate-hero-1' : 'opacity-0'}
          `}>
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B2C] animate-pulse" />
            <span className={`${typography.caption.default}  text-[#FF6B2C]`}>
              SECURITY TESTING SERVICES
            </span>
          </div>

          {/* H1 Headline */}
          <h1 className={`${typography.heading.h1} text-white drop-shadow-sm mb-5 sm:mb-8 ${isLoaded ? 'animate-hero-2' : 'opacity-0'}`}>
            Your Offshore <span className="text-[#FF6B2C]">Security Testing & QA Partner</span>
          </h1>

          {/* Subheading */}
          <p className={`${typography.description.default} text-slate-300 max-w-3xl drop-shadow-sm mb-10 ${isLoaded ? 'animate-hero-3' : 'opacity-0'}`}>
            Secure your applications with Softree’s comprehensive security testing services, including application security, web and mobile testing, API security, vulnerability assessment, and penetration testing for reliable, resilient software.
          </p>

          {/* CTA */}
          {/* <div className={`${isLoaded ? 'animate-hero-4' : 'opacity-0'}`}>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#050505]"
            >
              Talk to Our Security Testing Team
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div> */}
        </div>
      </div>

      {/* Mobile Wireframe Spacer (Creates guaranteed physical space between text and trust strip) */}
      <div id="mobile-wireframe-spacer" className="relative z-10 lg:hidden w-full h-[280px] shrink-0 pointer-events-none" />

      {/* Trust Strip anchored to bottom */}
      <div className="relative w-full z-20 pb-6 sm:pb-8 mt-auto">
        <TrustStrip theme="dark" />
      </div>
    </section>
  );
}
