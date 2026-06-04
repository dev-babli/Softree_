import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hero Intro — Editorial Studio Showcase",
  description:
    "Premium Avoora-style editorial agency section — hero, trust strip, bento metrics, capabilities carousel, and CTA.",
  robots: { index: false, follow: false },
};

export default function HeroIntroLayout({ children }: { children: React.ReactNode }) {
  return children;
}
