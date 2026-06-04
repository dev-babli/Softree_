"use client";

import Image from "next/image";
import { useCallback, useRef, type CSSProperties } from "react";

const GRAIN_SVG =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")";

/** Lightweight sculpture frame — reference art + CSS parallax, zero WebGL. */
export default function GradientSculpture({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const setParallax = useCallback((x: number, y: number) => {
    const el = containerRef.current;
    if (!el) return;
    el.style.setProperty("--mx", String(x));
    el.style.setProperty("--my", String(y));
  }, []);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setParallax(
        (event.clientX - rect.left) / rect.width - 0.5,
        (event.clientY - rect.top) / rect.height - 0.5,
      );
    },
    [setParallax],
  );

  const handleMouseLeave = useCallback(() => setParallax(0, 0), [setParallax]);

  const parallaxStyle = { "--mx": "0", "--my": "0" } as CSSProperties;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={parallaxStyle}
      className={`relative isolate h-[min(720px,88vh)] w-full overflow-hidden bg-transparent motion-reduce:[--mx:0] motion-reduce:[--my:0] ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 motion-reduce:translate-none"
        style={{
          transform:
            "translate3d(calc(var(--mx) * -28px), calc(var(--my) * -20px), 0)",
        }}
      >
        <div className="absolute left-[4%] top-[18%] h-[min(420px,55%)] w-[min(420px,55%)] rounded-full bg-[#d8d1ff]/35 blur-[90px]" />
        <div className="absolute bottom-[12%] right-[2%] h-[min(380px,50%)] w-[min(380px,50%)] rounded-full bg-[#ffd6b0]/40 blur-[90px]" />
      </div>

      <div
        className="absolute inset-[2%_0_2%_8%] motion-reduce:translate-none md:inset-[0_0_0_4%]"
        style={{
          transform: "translate3d(calc(var(--mx) * 14px), calc(var(--my) * 10px), 0)",
        }}
      >
        <Image
          src="/showcase/gradient-sculpture.png"
          alt="Premium gradient glass sculpture with violet and peach tones"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1100px"
          className="object-contain object-center select-none"
          draggable={false}
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 mix-blend-multiply opacity-[0.035]"
        style={{ backgroundImage: GRAIN_SVG }}
      />
    </div>
  );
}
