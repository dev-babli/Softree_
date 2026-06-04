"use client";

import type { ReactNode } from "react";

type GradientVariant = "white" | "warm" | "cool" | "peach";

const GRADIENT: Record<GradientVariant, string> = {
  white: "bg-white",
  warm: "bg-gradient-to-br from-white from-30% via-[#FFFCF8] to-[#FFF3E8]",
  cool: "bg-gradient-to-br from-white from-30% via-[#F9FBFF] to-[#EEF3FF]",
  peach: "bg-gradient-to-br from-[#FFF9F5] via-white to-[#FFF0E6]",
};

export function BentoPanel({
  children,
  className = "",
  gradient = "white",
}: {
  children: ReactNode;
  className?: string;
  gradient?: GradientVariant;
}) {
  return (
    <article
      className={`relative overflow-hidden rounded-[20px] border border-[#0a0a1a]/[0.07] shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_22px_48px_-28px_rgba(10,10,26,0.14)] transition-[box-shadow,transform] duration-300 hover:shadow-[0_28px_60px_-32px_rgba(10,10,26,0.18)] ${GRADIENT[gradient]} ${className}`}
    >
      {children}
    </article>
  );
}
