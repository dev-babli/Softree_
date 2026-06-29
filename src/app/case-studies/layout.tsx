import type { Metadata } from "next";

import {
  CASE_STUDIES_OG_IMAGE,
  ogImages,
  SITE_URL,
  twitterImages,
} from "@/lib/site-metadata";

export const metadata: Metadata = {
  title: {
    template: "%s | Softree Technology Case Studies",
    default: "Case Studies | Softree Technology",
  },
  description:
    "Explore real-world case studies showcasing how Softree Technology delivers AI, Power Platform, SharePoint, and web solutions that drive measurable business results.",
  alternates: {
    canonical: `${SITE_URL}/case-studies`,
  },
  openGraph: {
    title: "Case Studies | Softree Technology",
    description:
      "See how Softree Technology helped businesses transform with AI, Power Platform, and modern web development.",
    url: `${SITE_URL}/case-studies`,
    siteName: "Softree Technology",
    images: ogImages(CASE_STUDIES_OG_IMAGE),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies | Softree Technology",
    description:
      "Real-world results from AI, Power Platform, and web development projects by Softree Technology.",
    images: twitterImages(CASE_STUDIES_OG_IMAGE),
  },
};

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
