import type { Metadata } from "next"
import Script from "next/script"
import NavigationClient from "@/components/sections/navigation-client"
import WebDevelopmentStoryExperience from "./WebDevelopmentStoryExperience"

export const metadata: Metadata = {
  title: "React Web Development Services | Softree Technology",
  description:
    "Softree builds fast, scalable React and Next.js websites, landing pages, SaaS frontends, dashboards, and web applications with UX, performance, SEO, and launch support.",
  alternates: {
    canonical: "/services/digital-workspace/web-app-development",
  },
  keywords: [
    "React web development services",
    "Next.js development company",
    "React landing page development",
    "React frontend development",
    "web application development",
    "Softree Technology",
  ],
  openGraph: {
    title: "React Web Development Services | Softree Technology",
    description:
      "React and Next.js websites, landing pages, SaaS frontends, dashboards, and web applications built with UX, performance, SEO, and launch support.",
    url: "/services/digital-workspace/web-app-development",
    siteName: "Softree Technology",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Softree React web development services",
      },
    ],
  },
}

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "React Web Development Services",
  provider: {
    "@type": "Organization",
    name: "Softree Technology",
    url: "https://softree.in",
  },
  areaServed: "Worldwide",
  serviceType: "React and Next.js website and frontend development",
  url: "https://softree.in/services/digital-workspace/web-app-development",
  description:
    "React and Next.js websites, landing pages, SaaS frontends, dashboards, and web applications built with UX, performance, SEO, and launch support.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "React web development engagement paths",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Launch Sprint",
          description: "Focused React landing page or service page build.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Growth Website",
          description: "Complete React and Next.js service website build.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Product Frontend",
          description: "React frontend for SaaS, dashboards, and web applications.",
        },
      },
    ],
  },
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://softree.in",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Services",
      item: "https://softree.in/services",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "React Web Development Services",
      item: "https://softree.in/services/digital-workspace/web-app-development",
    },
  ],
}

export default function WebAppDevelopmentPage() {
  return (
    <main className="relative min-h-[100dvh] bg-[#080a0c] text-white">
      <Script
        id="ld-react-web-development-service"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Script
        id="ld-react-web-development-breadcrumbs"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <NavigationClient />
      <WebDevelopmentStoryExperience />
    </main>
  )
}
