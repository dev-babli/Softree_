/** Editorial copy — homepage post-hero unified section */

export const HOME_INTRO = {
  accent: "#FF5812" as const,
  surface: "#F3F0EE" as const,
  ink: "#0a0a1a",
  whatWeDo: {
    badge: "What we do",
    headline: "Clarity and control for every part of your business.",
    subcopy:
      "Structured delivery across software, AI, and cloud — one senior team, one standard.",
  },
  about: {
    badge: "About us",
    headline: "We collaborate with forward-thinking brands.",
    body: "Engineering impact that lasts — Microsoft and AI specialists embedded in your delivery model.",
    cta: "Read more",
    href: "/about-us",
  },
  marquee: {
    badge: "Co-engineered with",
    headline: "Technology leaders trust our teams inside their stack.",
  },
  practicesLabel: "Three practices",
} as const;

export const STATS = [
  { value: "200+", label: "Deployments", desc: "Enterprise programs shipped globally" },
  { value: "98%", label: "Retention", desc: "Multi-year co-engineering relationships" },
  { value: "50+", label: "Certifications", desc: "Microsoft & AI platform credentials" },
] as const;
