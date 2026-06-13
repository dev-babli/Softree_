import type { Metadata } from "next";

import { applyPageOg } from "@/lib/site-metadata";

export const metadata: Metadata = applyPageOg("/avoora", {
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
    type: "website",
  },
  twitter: {
    title: "Avoora | AI-Powered Digital Solutions",
    description:
      "Avoora by Softree Technology delivers intelligent automation and enterprise-grade AI capabilities.",
  },
}, "Avoora by Softree Technology");

export default function AvooraLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
