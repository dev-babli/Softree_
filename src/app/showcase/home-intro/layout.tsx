import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Intro Variants | Softree Showcase",
  description:
    "Post-hero preview: Avoora trust + about band, then production ClarityControl glass cards.",
  robots: { index: false, follow: false },
};

export default function HomeIntroShowcaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
