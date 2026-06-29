import type { Metadata } from "next";
import {
  BLOG_OG_IMAGE,
  ogImages,
  SITE_URL,
  twitterImages,
} from "@/lib/site-metadata";

export const metadata: Metadata = {
  title: "Blog | Softree Technology - Insights on AI, Cloud & Enterprise",

  description:
    "Expert insights on Agentic AI, Microsoft 365, web development, data analytics, and digital transformation. Stay ahead with the latest technology trends.",

  keywords: [
    "technology blog",
    "AI insights",
    "Microsoft 365 blog",
    "web development articles",
    "digital transformation",
    "enterprise software insights",
    "Power Platform blog",
    "data analytics articles",
  ],

  alternates: {
    canonical: `${SITE_URL}/blog`,
  },

  openGraph: {
    title: "Blog | Softree Technology",
    description:
      "Expert insights on AI, Microsoft 365, web development, and digital transformation strategies.",
    url: `${SITE_URL}/blog`,
    siteName: "Softree Technology",
    images: ogImages(BLOG_OG_IMAGE),
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Blog | Softree Technology",
    description:
      "Expert insights on AI, Microsoft 365, web development, and digital transformation.",
    images: twitterImages(BLOG_OG_IMAGE),
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
