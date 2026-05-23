import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Avoora | Softree Technology - AI-Powered Digital Solutions",
  description:
    "Avoora by Softree Technology — an AI-powered digital solution platform delivering intelligent automation, analytics, and enterprise-grade capabilities.",
  alternates: {
    canonical: "https://www.softreetechnology.com/avoora",
  },
  openGraph: {
    title: "Avoora | AI-Powered Digital Solutions by Softree",
    description:
      "Discover Avoora — Softree Technology's AI-powered platform for intelligent automation and enterprise digital transformation.",
    url: "https://www.softreetechnology.com/avoora",
    siteName: "Softree Technology",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Avoora by Softree Technology" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Avoora | AI-Powered Digital Solutions",
    description:
      "Avoora by Softree Technology delivers intelligent automation and enterprise-grade AI capabilities.",
    images: ["/og-image.png"],
  },
};

export default function AvooraLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
