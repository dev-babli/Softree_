"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion, useSpring, useTransform, motion } from "framer-motion";

import type { SuccessStoryMetric } from "./types";

type AnimatedMetricProps = SuccessStoryMetric & {
  /** Change when slide changes to re-run count-up */
  animateKey: string;
  variant?: "light" | "dark";
};

export function AnimatedMetric({
  value,
  prefix = "",
  suffix = "",
  label,
  animateKey,
  variant = "light",
}: AnimatedMetricProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(reduceMotion ? value : 0);

  const spring = useSpring(reduceMotion ? value : Math.round(value * 0.55), {
    stiffness: 55,
    damping: 22,
    restDelta: 0.5,
  });

  const display = useTransform(spring, (v) => Math.round(v));

  useEffect(() => {
    const unsub = display.on("change", (v) => setDisplayValue(v));
    return unsub;
  }, [display]);

  useEffect(() => {
    if (reduceMotion) {
      setDisplayValue(value);
      return;
    }
    spring.set(Math.round(value * 0.55));
    const id = requestAnimationFrame(() => spring.set(value));
    return () => cancelAnimationFrame(id);
  }, [animateKey, value, spring, reduceMotion]);

  const ink = variant === "dark" ? "#fff" : "#0c0c0c";
  const muted = variant === "dark" ? "rgba(255,255,255,0.55)" : "rgba(12, 12, 12, 0.55)";

  return (
    <div ref={ref}>
      <motion.p
        key={`${animateKey}-${label}-value`}
        className="text-2xl font-bold tabular-nums tracking-tight sm:text-[1.75rem]"
        style={{ color: ink }}
        initial={reduceMotion ? false : { opacity: 0.4, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {prefix}
        {displayValue}
        {suffix}
      </motion.p>
      <p className="mt-1 text-[13px] leading-snug" style={{ color: muted }}>
        {label}
      </p>
    </div>
  );
}
