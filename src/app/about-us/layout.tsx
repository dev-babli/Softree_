import type { Metadata } from "next";

import { applyPageOg } from "@/lib/site-metadata";

export const metadata: Metadata = applyPageOg("/about-us", {
  title: {
    absolute: "About Softree Technology | Software & AI Solutions",
  },

  description:
    "Learn about Softree Technology, its software development expertise, AI solutions, technology services, and approach to helping businesses solve digital challenges.",

  keywords: [
    "About Softree Technology",
    "Softree Technology",
    "AI solutions",
    "software development company",
    "technology services",
    "enterprise software development",
    "offshore software development",
    "cloud solutions",
    "IT consulting firm",
  ],

  alternates: {
    canonical: "https://www.softreetechnology.com/about-us",
  },

  openGraph: {
    title: "About Softree Technology | Software & AI Solutions",
    description:
      "Learn about Softree Technology, its software development expertise, AI solutions, technology services, and approach to helping businesses solve digital challenges.",
    url: "https://www.softreetechnology.com/about-us",
    siteName: "Softree Technology",
    type: "website",
  },

  twitter: {
    title: "About Softree Technology | Software & AI Solutions",
    description:
      "Learn about Softree Technology, its software development expertise, AI solutions, technology services, and approach to helping businesses solve digital challenges.",
  },
}, "About Softree Technology");

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://www.softreetechnology.com/about-us#webpage",
      "url": "https://www.softreetechnology.com/about-us",
      "name": "About Softree Technology | Software & AI Solutions",
      "description":
        "Learn about Softree Technology, its software development expertise, AI solutions, technology services, and approach to helping businesses solve digital challenges.",
      "isPartOf": {
        "@id": "https://www.softreetechnology.com/#website",
      },
      "about": {
        "@id": "https://www.softreetechnology.com/#organization",
      },
      "mainEntity": {
        "@id": "https://www.softreetechnology.com/#organization",
      },
      "breadcrumb": {
        "@id": "https://www.softreetechnology.com/about-us#breadcrumb",
      },
      "inLanguage": "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.softreetechnology.com/about-us#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.softreetechnology.com",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "About Us",
          "item": "https://www.softreetechnology.com/about-us",
        },
      ],
    },
  ],
};

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      {children}
    </>
  );
}

