"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    let x = 0, y = 0, targetX = 0, targetY = 0;

    const handleMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const handleEnter = () => setHovering(true);
    const handleLeave = () => setHovering(false);

    window.addEventListener("mousemove", handleMove);

    // Auto-detect interactive elements
    const addHoverListeners = () => {
      const els = document.querySelectorAll("a, button, [role='button'], input, textarea, label, .cursor-hover");
      els.forEach((el) => {
        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);
      });
      return els;
    };

    // initial setup + observe DOM changes
    let els = addHoverListeners();
    const observer = new MutationObserver(() => {
      els.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
      els = addHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    let raf: number;
    const tick = () => {
      x += (targetX - x) * 0.15;
      y += (targetY - y) * 0.15;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${hovering ? 0.55 : 1})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
      els.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, [hovering]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-9999"
      style={{ mixBlendMode: "difference" }}
    >
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-5 w-5 rounded-full bg-white/60 transition-[transform] duration-300 ease-out will-change-transform"
      />
    </div>
  );
}
