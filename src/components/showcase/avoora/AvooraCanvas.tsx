"use client";

import { useEffect, useRef, useState } from "react";

const DESIGN_WIDTH = 682;

/** Scales a fixed 682px mockup canvas to fit viewport — matches reference proportions */
export function AvooraCanvas({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState(1);
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(1024);

  useEffect(() => {
    const update = () => {
      const pad = 32;
      setScale(Math.min(Math.max((window.innerWidth - pad) / DESIGN_WIDTH, 0.55), 1.9));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!innerRef.current) return;
    const ro = new ResizeObserver(() => {
      if (innerRef.current) setHeight(innerRef.current.offsetHeight);
    });
    ro.observe(innerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="flex w-full justify-center overflow-x-hidden bg-white">
      <div className="relative" style={{ width: DESIGN_WIDTH * scale, height: height * scale }}>
        <div
          ref={innerRef}
          className="absolute left-0 top-0 origin-top-left bg-white text-[#111111] antialiased"
          style={{ width: DESIGN_WIDTH, transform: `scale(${scale})` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export const CANVAS = {
  w: DESIGN_WIDTH,
  px: 40,
} as const;
