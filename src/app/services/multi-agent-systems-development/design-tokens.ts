/**
 * Softree Multi-Agent page design tokens
 * Accent: surgical Softree orange on light zinc only.
 */
export const mas = {
  accent: "#FF5812",
  accentSoft: "rgba(255, 88, 18, 0.1)",
  ink: "#18181B", // zinc-900
  muted: "#52525B", // zinc-600
  line: "#E4E4E7", // zinc-200
  surface: "#FAFAFA", // zinc-50
  white: "#FFFFFF",
  radius: {
    sm: "0.5rem", // rounded-lg
    md: "0.75rem", // rounded-xl
    lg: "1rem", // rounded-2xl
  },
  container: "max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8",
  sectionY: "py-16 lg:py-24",
  eyebrow:
    "text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF5812]",
  h2: "text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900",
  body: "text-[15px] leading-relaxed text-zinc-600",
} as const;
