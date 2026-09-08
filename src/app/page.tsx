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
  title: "Softree | Agentic AI, Power Platform & Offshore Technology Partner",

  description:
    "Softree is a white-label offshore technology partner helping agencies, consultancies, and technology companies deliver Agentic AI, Power Platform, data, and modern application solutions.",

  alternates: {
    canonical: `${SITE_URL}/`,
  },

  openGraph: {
    title: "Softree | Agentic AI, Power Platform & Offshore Delivery",
    description:
      "Extend your technology delivery capacity with Softree's offshore, white-label expertise in Agentic AI, Power Platform, data engineering, and modern application development.",
    url: `${SITE_URL}/`,
    siteName: "Softree",
    images: ogImages(DEFAULT_OG_IMAGE),
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Softree | Agentic AI, Power Platform & Offshore Delivery",
    description:
      "Extend your technology delivery capacity with Softree's offshore, white-label expertise in Agentic AI, Power Platform, data engineering, and modern application development.",
    images: twitterImages(DEFAULT_OG_IMAGE),
  },
};

export default async function Page() {
  const homepageCaseStudies = await getHomepageCaseStudies();
  return <Home homepageCaseStudies={homepageCaseStudies} />;
}
