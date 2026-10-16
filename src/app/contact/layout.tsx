import type { Metadata } from "next";

import { applyPageOg } from "@/lib/site-metadata";

export const metadata: Metadata = applyPageOg("/contact", {
  title: {
    absolute: "Contact Softree Technology | Software & AI Solutions",
  },
  description:
    "Contact Softree Technology to discuss your software engineering, AI, or cloud project. Book a discovery call or send an inquiry for a response within 1 business day.",
  keywords: [
    "Contact Softree",
    "Contact Softree Technology",
    "AI development company",
    "enterprise software development",
    "AI consulting",
    "software development India",
    "IT services",
  ],
  alternates: {
    canonical: "https://www.softreetechnology.com/contact",
  },
  openGraph: {
    title: "Contact Softree Technology | Software & AI Solutions",
    description:
      "Contact Softree Technology to discuss your software engineering, AI, or cloud project. Book a discovery call or send an inquiry for a response within 1 business day.",
    url: "https://www.softreetechnology.com/contact",
    siteName: "Softree Technology",
    type: "website",
  },
  twitter: {
    title: "Contact Softree Technology | Software & AI Solutions",
    description:
      "Contact Softree Technology to discuss your software engineering, AI, or cloud project. Book a discovery call or send an inquiry for a response within 1 business day.",
  },
}, "Contact Softree Technology");

const contactPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://www.softreetechnology.com/contact#webpage",
      "url": "https://www.softreetechnology.com/contact",
      "name": "Contact Softree Technology | Software & AI Solutions",
      "description":
        "Contact Softree Technology to discuss your software engineering, AI, or cloud project. Book a discovery call or send an inquiry for a response within 1 business day.",
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
        "@id": "https://www.softreetechnology.com/contact#breadcrumb",
      },
      "inLanguage": "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.softreetechnology.com/contact#breadcrumb",
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
          "name": "Contact",
          "item": "https://www.softreetechnology.com/contact",
        },
      ],
    },
  ],
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      {children}
    </>
  );
}

