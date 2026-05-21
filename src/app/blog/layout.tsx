import type { Metadata } from "next";

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
    canonical: "https://www.softreetechnology.com/blog",
  },

  openGraph: {
    title: "Blog | Softree Technology",
    description:
      "Expert insights on AI, Microsoft 365, web development, and digital transformation strategies.",
    url: "https://www.softreetechnology.com/blog",
    siteName: "Softree Technology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Softree Technology Blog",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Blog | Softree Technology",
    description:
      "Expert insights on AI, Microsoft 365, web development, and digital transformation.",
    images: ["/og-image.png"],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
