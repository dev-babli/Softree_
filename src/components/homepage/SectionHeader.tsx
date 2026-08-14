"use client";

import { ReactNode } from "react";

export type SectionHeaderAccent = "#FF6B00" | "#FF5812" | "#1852FF";

export interface SectionHeaderProps {
  badge: string;
  accent: SectionHeaderAccent;
  headline: ReactNode;
  body?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
}

function withAlpha(hex: SectionHeaderAccent, alpha: number): string {
  const a = Math.round(Math.max(0, Math.min(1, alpha)) * 255)
    .toString(16)
    .padStart(2, "0")
    .toUpperCase();
  return `${hex}${a}`;
}

export function SectionHeader({
  badge,
  accent,
  headline,
  body,
  as = "h2",
  className,
}: SectionHeaderProps) {
  const HeadingTag = as;
  const headlineFontSize =
    as === "h1" ? "clamp(48px, 8vw, 110px)" : "clamp(32px, 4.5vw, 56px)";
  const wrapperClass = ["flex flex-col gap-6", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClass}>
      <span
        className="inline-flex w-max items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.20em]"
        style={{
          color: accent,
          borderColor: withAlpha(accent, 0.2),
          backgroundColor: withAlpha(accent, 0.08),
        }}
      >
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: accent }}
        />
        {badge}
      </span>

      <HeadingTag
        className="font-semibold leading-[0.9] tracking-[-0.04em] text-[#0a0a1a]"
        style={{ fontSize: headlineFontSize }}
      >
        {headline}
      </HeadingTag>

      {body !== undefined && body !== null && body !== "" ? (
        <p className="max-w-[640px] text-base leading-relaxed text-[#0a0a1a]/70">
          {body}
        </p>
      ) : null}
    </div>
  );
}

export default SectionHeader;
