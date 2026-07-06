"use client";

/**
 * SignalStrip — credibility pulse. Story-spec §2.
 * The page's ONE marquee: hairline-framed cells, real numbers only.
 * Paused offscreen (IO) and on hover; reduced-motion = static scrollable row.
 * NOTE(verified): no standalone client logo files exist in public/ — cells are
 * text lockups at white/55 per spec fallback. TODO: swap in real monochrome
 * logo assets when marketing provides them.
 */
import { useEffect, useRef, useState } from "react";

import styles from "./signal-strip.module.css";

const CELLS = [
  "140+ ENGINEERS",
  "JETBRAINS·IDE TOOLING", // TODO(verify): confirm public referenceability of client names
  "9 SERVICE LINES",
  "GLOBAL BANKING GROUP",
  "4 CONTINENTS",
  "ECG GROUP",
  "MICROSOFT POWER PLATFORM",
  "HEALTHCARE PLATFORMS",
  "SHIPPED, NOT SLIDEWARE",
] as const;

export default function SignalStrip() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cells = (keyPrefix: string, ariaHidden = false) => (
    <div className="flex" aria-hidden={ariaHidden || undefined}>
      {CELLS.map((c, i) => (
        <span
          key={`${keyPrefix}-${i}`}
          className="hairline font-mono-meta mx-2 my-4 whitespace-nowrap px-5 py-3 text-white/55"
        >
          {c}
        </span>
      ))}
    </div>
  );

  return (
    <section ref={ref} id="signals" aria-label="Clients and delivery signals" className="hairline-t hairline-b overflow-hidden bg-[#0a0a0a]">
      <div className={`${styles.track} ${visible ? "" : styles.paused}`}>
        {cells("a")}
        {cells("b", true) /* duplicate for seamless loop, hidden from AT */}
      </div>
    </section>
  );
}
