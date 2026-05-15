"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 15 + 5;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            setTimeout(onDone, 600);
          }, 400);
          return 100;
        }
        return next;
      });
    }, 120);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-100 flex items-center justify-center"
          style={{ background: "var(--cp-bg)" }}
        >
          <div className="flex flex-col items-center gap-6">
            {/* SVG Mask Preloader */}
            <div className="relative h-20 w-20">
              <svg viewBox="0 0 162 162" className="h-full w-full">
                <defs>
                  <mask id="ob-mask">
                    <rect width="162" height="162" fill="white" />
                    <path
                      d="M108 88.7c-10.8 0-19.7 8.8-19.7 19.7v47.4c0 1.9-1.5 3.4-3.4 3.4h-8.6c-1.9 0-3.4-1.5-3.4-3.4v-47.4c0-10.8-8.8-19.7-19.7-19.7H6.4c-1.9 0-3.4-1.5-3.4-3.4v-8c0-1.9 1.5-3.4 3.4-3.4h46.9c10.8 0 19.7-8.8 19.6-19.7V6.4c0-1.9 1.5-3.4 3.4-3.4H85c1.9 0 3.4 1.5 3.4 3.4v47.8c0 10.8 8.8 19.7 19.7 19.7h46.6c1.9 0 3.4 1.5 3.4 3.4v8c0 1.9-1.5 3.4-3.4 3.4H108z"
                      fill="black"
                    />
                    <path
                      d="M146.1 134.4h-.7c-6.5 0-11.9 5.3-11.9 11.9v.7c0 6.7 5.5 12.2 12.2 12.2s12.2-5.5 12.2-12.2v-.7c0-6.6-5.2-11.9-11.8-11.9z"
                      fill="black"
                    />
                  </mask>
                </defs>
                <rect
                  width="162"
                  height="162"
                  fill="var(--cp-text)"
                  mask="url(#ob-mask)"
                />
              </svg>
              {/* Fill sweep */}
              <motion.div
                className="absolute inset-0"
                style={{ background: "var(--cp-primary)" }}
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                animate={{ clipPath: `inset(${100 - progress}% 0 0 0)` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-(--cp-text-alt)">
                build
              </span>
              <span className="text-[11px] font-medium tabular-nums text-(--cp-text)">
                {Math.round(progress)}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
