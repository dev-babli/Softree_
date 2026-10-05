"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { typography } from "@/lib/typography";

export default function SecurityTestingSilkHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Shorter timeout to avoid large delay
    const timer = setTimeout(() => setIsLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;
    const speed = 0.012; // Slower, more elegant flow
    // Scale for performance. We render at 0.5 resolution for performance.
    const resolutionScale = 0.5;
    const scale = 1.5; // Larger folds for clearer flow
    const noiseIntensity = 0.2; // Reduced noise for smoother silk

    const resizeCanvas = () => {
      // Use internal resolution scaled down for better performance
      canvas.width = window.innerWidth * resolutionScale;
      canvas.height = window.innerHeight * resolutionScale;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const noise = (x: number, y: number) => {
      const G = 2.71828;
      const rx = G * Math.sin(G * x);
      const ry = G * Math.sin(G * y);
      return (rx * ry * (1 + x)) % 1;
    };

    const animate = () => {
      const { width, height } = canvas;

      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#0a0500");
      gradient.addColorStop(0.5, "#140a00");
      gradient.addColorStop(1, "#0a0500");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          const u = (x / width) * scale;
          const v = (y / height) * scale;

          const tOffset = speed * time;
          const tex_x = u;
          const tex_y = v + 0.03 * Math.sin(8.0 * tex_x - tOffset);

          // Smoother, clearer silk pattern
          let pattern = 0.5 + 0.5 * Math.sin(
            5.0 * (tex_x + tex_y +
              Math.cos(3.0 * tex_x + 5.0 * tex_y) +
              0.02 * tOffset) +
            Math.sin(15.0 * (tex_x + tex_y - 0.1 * tOffset))
          );
          
          // Sharpen the folds
          pattern = Math.pow(pattern, 1.6);

          const rnd = noise(x, y);
          const intensity = Math.max(0, pattern - (rnd * noiseIntensity * 0.1));

          // Deep beautiful vibrant orange
          // Dark reds in the shadows, glowing orange (#FF6B2C) in the highlights
          const r = intensity * 280;
          const g = Math.pow(intensity, 1.5) * 140;
          const b = Math.pow(intensity, 2.0) * 44;
          const a = 255;

          const index = (y * width + x) * 4;
          data[index] = r;
          data[index + 1] = g;
          data[index + 2] = b;
          data[index + 3] = a;
        }
      }

      ctx.putImageData(imageData, 0, 0);

      const overlayGradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) / 2
      );
      overlayGradient.addColorStop(0, "rgba(0, 0, 0, 0.1)");
      overlayGradient.addColorStop(1, "rgba(0, 0, 0, 0.6)");

      ctx.fillStyle = overlayGradient;
      ctx.fillRect(0, 0, width, height);

      time += 1;
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
    <section className="relative w-full min-h-[100svh] overflow-hidden bg-black flex items-center justify-center">
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

      {/* Animated Silk Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/20 to-black/70 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-6 py-20 text-center pt-32 lg:pt-20">

        {/* Eyebrow */}
        <div className={`
          inline-flex items-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-4 py-1.5 
          mb-8
          ${isLoaded ? 'animate-hero-1' : 'opacity-0'}
        `}>
          <span className="text-[11px] font-medium tracking-[0.2em] text-white/90 uppercase">
            SECURITY TESTING SERVICES
          </span>
        </div>

        {/* H1 Headline */}
        <h1 className={`
          ${typography.heading.h1}
          text-white mb-8
          ${isLoaded ? 'animate-hero-2' : 'opacity-0'}
        `}>
          Your Offshore
          Security Testing <br className="hidden sm:block" />
          & QA Partner
        </h1>

        {/* Subheading */}
        <p className={`
          ${typography.description.default}
          max-w-2xl text-white/70 mx-auto mb-10
          ${isLoaded ? 'animate-hero-3' : 'opacity-0'}
        `}>
          Secure your applications with Softree’s comprehensive security testing services, including application security, web and mobile testing, API security, vulnerability assessment, and penetration testing for reliable, resilient software.
        </p>

        {/* CTA */}
        {/* <div className={`${isLoaded ? 'animate-hero-4' : 'opacity-0'}`}>
          <Link 
            href="/contact" 
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-all hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
          >
            Talk to Our Security Testing Team
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div> */}
      </div>
    </section>
  );
}
