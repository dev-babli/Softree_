import type { Metadata } from "next"
import { applyPageOg, SITE_URL } from "@/lib/site-metadata"
import WebsiteModernizationPageClient from "./page-client"
import { MODERNIZATION_FAQS } from "./faqs"

const PATH = "/services/website-modernization"

export const metadata: Metadata = applyPageOg(
  PATH,
  {
    title: "Website Modernisation Services | Free AI Blueprint | Softree",
    description:
      "Modernise your corporate website with Softree. Free AI blueprint: scan your URL, audit trust and positioning, compare competitors, and get a wireframe — then build with Next.js experts.",
    keywords: [
      "website modernisation",
      "website modernization services",
      "website redesign",
      "WordPress to Next.js migration",
      "corporate website refresh",
      "website CRO",
      "Core Web Vitals optimisation",
      "free website audit",
    ],
    alternates: {
      canonical: `${SITE_URL}${PATH}`,
    },
    openGraph: {
      title: "Website Modernisation | Free AI Blueprint | Softree Technology",
      description:
        "Paste your URL. Get a free modernisation blueprint — problem audit, trust gaps, competitor comparison, and wireframe preview.",
      url: `${SITE_URL}${PATH}`,
      siteName: "Softree Technology",
      type: "website",
    },
  },
  "Softree Website Modernisation Services",
)

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Website Modernisation",
  provider: {
    "@type": "Organization",
    name: "Softree Technology",
    url: SITE_URL,
  },
  description:
    "AI-powered website modernisation: audit, competitor analysis, wireframe blueprint, and Next.js rebuild.",
  areaServed: ["US", "GB", "AU", "IN"],
  serviceType: "Website redesign and modernisation",
  url: `${SITE_URL}${PATH}`,
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
    {
      "@type": "ListItem",
      position: 3,
      name: "Website Modernisation",
      item: `${SITE_URL}${PATH}`,
    },
  ],
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: MODERNIZATION_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
}

export default function WebsiteModernizationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <h1 className="sr-only">Website Modernisation Services — Free AI Blueprint</h1>
      <WebsiteModernizationPageClient />
    </>
  )
}
