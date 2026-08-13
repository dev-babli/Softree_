import type { Metadata } from "next";

import { applyPageOg } from "@/lib/site-metadata";

export const metadata: Metadata = applyPageOg("/about-us", {
  title: "About Us | Softree Technology - AI & Enterprise Solutions",

  description:
    "Learn about Softree Technology, a leader in AI, cloud, and custom software development with a global presence and proven expertise.",

  keywords: [
    "About Softree Technology",
    "AI development company",
    "enterprise software development",
    "cloud solutions India",
    "software company profile",
    "IT consulting firm",
  ],

  alternates: {
    canonical: "https://www.softreetechnology.com/about-us",
  },

  openGraph: {
    title: "About Us | Softree Technology",
    description:
      "Learn about Softree Technology's journey, expertise, and commitment to delivering cutting-edge AI and enterprise solutions worldwide.",
    url: "https://www.softreetechnology.com/about-us",
    siteName: "Softree Technology",
    type: "website",
  },

  twitter: {
    title: "About Us | Softree Technology",
    description:
      "Learn about Softree Technology, a leader in AI, cloud, and custom software development with a global presence.",
  },
}, "About Softree Technology");

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
