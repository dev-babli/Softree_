import type { Metadata } from "next";
import Home from "./home-page";
import { getHomepageCaseStudies } from "@/lib/homepage-case-studies";
import {
  DEFAULT_OG_IMAGE,
  ogImages,
  SITE_URL,
  twitterImages,
} from "@/lib/site-metadata";

export const metadata: Metadata = {
  title: "Softree | Power Platform, AI, Data & Modern App Development",

  description:
    "Softree delivers Power Platform solutions, AI-driven applications, data engineering, and modern web development using React, Next.js, and cloud technologies.",

  alternates: {
    canonical: `${SITE_URL}/`,
  },

  openGraph: {
    title: "Softree | AI & Modern Application Development",
    description:
      "Build scalable AI-powered and modern web applications with Softree.",
    url: `${SITE_URL}/`,
    siteName: "Softree",
    images: ogImages(DEFAULT_OG_IMAGE),
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Softree | AI, Data & Web Development",
    description:
      "Power Platform, AI solutions, and modern web development services.",
    images: twitterImages(DEFAULT_OG_IMAGE),
  },
};

export default async function Page() {
  const homepageCaseStudies = await getHomepageCaseStudies();
  return <Home homepageCaseStudies={homepageCaseStudies} />;
}
