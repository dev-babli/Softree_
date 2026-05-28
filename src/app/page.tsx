import type { Metadata } from "next";
import Home from "./home-page";

export const metadata: Metadata = {
  title: "Softree | Power Platform, AI, Data & Modern App Development",

  description:
    "Softree delivers Power Platform solutions, AI-driven applications, data engineering, and modern web development using React, Next.js, and cloud technologies.",

  alternates: {
    canonical: "https://www.softreetechnology.com/",
  },

  openGraph: {
    title: "Softree | AI & Modern Application Development",
    description:
      "Build scalable AI-powered and modern web applications with Softree.",
    url: "https://www.softreetechnology.com/",
    siteName: "Softree",
    images: ["/og-image.png"],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Softree | AI, Data & Web Development",
    description:
      "Power Platform, AI solutions, and modern web development services.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return <Home />;
}
