"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE_T, VIEWPORT } from "@/lib/motion";

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

const DIGIT_COUNT = DIGITS.length;
const STRIP_STEP = 100 / DIGIT_COUNT;

function DigitColumn({ value, animate }: { value: number; animate: boolean }) {
  return (
    <div className="about-counter-number-wrap">
      <motion.div
        className="about-counter-number-strip"
        initial={{ y: 0 }}
        animate={animate ? { y: `${-value * STRIP_STEP}%` } : { y: 0 }}
        transition={{ duration: 1.4, ease: EASE_T.silk }}
      >
        {DIGITS.map((d) => (
          <h3 key={d} className="about-counter-number">
            {d}
          </h3>
        ))}
      </motion.div>
    </div>
  );
}

export type OdometerPart =
  | { type: "digit"; value: number }
  | { type: "char"; value: string };

/** Webflow-style vertical odometer + static suffix chars (K, Y, +). */
export function StuxenOdometer({ parts }: { parts: OdometerPart[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, VIEWPORT.default);

  return (
    <div ref={ref} className="about-counter-number-wrapper">
      {parts.map((part, i) =>
        part.type === "digit" ? (
          <DigitColumn key={`d-${i}`} value={part.value} animate={inView} />
        ) : (
          <h3 key={`c-${i}`} className="about-counter-number">
            {part.value}
          </h3>
        )
      )}
    </div>
  );
}
