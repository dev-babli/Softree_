import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Showcase | Softree Technology - Our Work & Portfolio",
  description:
    "Explore Softree Technology's portfolio of enterprise AI, Power Platform, SharePoint, and modern web applications delivered for clients worldwide.",
  alternates: {
    canonical: "https://www.softreetechnology.com/showcase",
  },
  openGraph: {
    title: "Showcase | Softree Technology Portfolio",
    description:
      "See our work — enterprise AI, Power Platform, and web development projects delivered by Softree Technology.",
    url: "https://www.softreetechnology.com/showcase",
    siteName: "Softree Technology",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Softree Technology Portfolio" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Showcase | Softree Technology",
    description:
      "Explore Softree Technology's portfolio of AI, cloud, and enterprise solutions.",
    images: ["/og-image.png"],
  },
};

export default function ShowcaseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
