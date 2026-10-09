import type { Metadata } from "next";
import OffshoreHome from "./offshore-home-page";
import { getHomepageCaseStudies } from "@/lib/homepage-case-studies";
import {
  DEFAULT_OG_IMAGE,
  ogImages,
  SITE_URL,
  twitterImages,
} from "@/lib/site-metadata";

export const metadata: Metadata = {
  title: "Softree | Offshore Home",

  description:
    "Softree is a white-label offshore technology partner helping agencies, consultancies, and technology companies deliver Agentic AI, Power Platform, data, and modern application solutions.",

  alternates: {
    canonical: `${SITE_URL}/offshore-home`,
  },

  openGraph: {
    title: "Softree | Offshore Home",
    description:
      "Extend your technology delivery capacity with Softree's offshore, white-label expertise.",
    url: `${SITE_URL}/offshore-home`,
    siteName: "Softree",
    images: ogImages(DEFAULT_OG_IMAGE),
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Softree | Offshore Home",
    description:
      "Extend your technology delivery capacity with Softree's offshore, white-label expertise.",
    images: twitterImages(DEFAULT_OG_IMAGE),
  },
};

export default async function Page() {
  const homepageCaseStudies = await getHomepageCaseStudies();
  return <OffshoreHome homepageCaseStudies={homepageCaseStudies} />;
}
