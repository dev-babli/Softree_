import type { Metadata } from "next";
import { applyPageOg } from "@/lib/site-metadata";
import { Hero } from "./ai-consulting-services-components/Hero";
import NavigationClient from "@/components/sections/navigation-client";
import LightContactSection from "@/components/homepage-light/LightContactSection";

import Footer from "@/components/sections/footer";

import WhyChooseWithTestimonialsSoftree from "./ai-consulting-services-components/WhySoftree/WhyChooseWithTestimonialsSoftree";
import { SuccessStories } from "./ai-consulting-services-components/SuccessStories";
import AIConsultingTechStack from "./ai-consulting-services-components/AIConsultingTechStack";
import TrustedBrandsMarquee from "./ai-consulting-services-components/TrustedBrandsMarquee";
import AiReadinessBanner from "./ai-consulting-services-components/AiReadinessBanner";
import AIConsultingWhoWeHelp from "./ai-consulting-services-components/AIConsultingWhoWeHelp";
import dynamic from "next/dynamic";
import NewWhoDoWeServeSection from "@/app/services/ai-development-services/components/NewWhoDoWeServeSection";

const ReverseStickyScroll = dynamic(
  () => import('./ai-consulting-services-components/ReverseStickyScroll').then((mod) => mod.ReverseStickyScroll),
  { ssr: true }
);

import { AiConsultingFaq } from "./ai-consulting-services-components/FAQ/AiConsultingFaq";

export const metadata: Metadata = applyPageOg("/services/ai-consulting-services", {
  title: "AI Consulting Services",
  description:
    "AI consulting services for AI strategy, readiness assessments, Microsoft AI solutions, and implementation with an offshore engineering partner.",
  keywords: [
    "ai consulting services",
    "ai consulting companies",
    "ai consulting firm in india",
    "ai consulting firm",
    "ai consulting services in india",
    "generative ai consulting services",
    "ai consulting",
    "ai consultants",
    "ai and consulting",
    "artificial intelligence consulting companies",
    "ai consulting services and solutions",
    "ai consulting services list",
    "ai consulting for small business",
    "healthcare ai consulting services",
    "ai consulting firms",
    "ai strategy consulting",
    "machine learning consulting",
    "ai business consulting",
    "generative ai consultants",
  ],
  alternates: {
    canonical: "https://www.softreetechnology.com/services/ai-consulting-services",
  },
  openGraph: {
    title: "AI Consulting Services | Softree Technology",
    description:
      "AI consulting services for AI strategy, readiness assessments, Microsoft AI solutions, and implementation with an offshore engineering partner.",
    url: "https://www.softreetechnology.com/services/ai-consulting-services",
    siteName: "Softree Technology",
    type: "website",
  },
});

const aiConsultingSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.softreetechnology.com/services/ai-consulting-services#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.softreetechnology.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://www.softreetechnology.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "AI Consulting Services",
          "item": "https://www.softreetechnology.com/services/ai-consulting-services"
        }
      ]
    },
    {
      "@type": "Service",
      "@id": "https://www.softreetechnology.com/services/ai-consulting-services#service",
      "name": "AI Consulting Services",
      "serviceType": "AI Consulting & Advisory Services",
      "description":
        "AI consulting services for AI strategy, readiness assessments, Microsoft AI solutions, and implementation with an offshore engineering partner.",
      "url": "https://www.softreetechnology.com/services/ai-consulting-services",
      "provider": {
        "@type": "Organization",
        "@id": "https://www.softreetechnology.com/#organization",
        "name": "Softree Technology",
        "url": "https://www.softreetechnology.com"
      },
      "areaServed": "Global",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "AI Consulting Capabilities",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "AI Strategy & Advisory",
              "description":
                "Identify valuable AI opportunities, prioritize use cases, and develop a practical roadmap aligned with your business objectives."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "AI Readiness Assessment",
              "description":
                "Evaluate data quality, infrastructure, security, and existing workflows to identify gaps and prepare for AI implementation."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Microsoft AI Consulting",
              "description":
                "Explore and implement suitable Microsoft AI solutions, including Azure AI, Azure OpenAI, Microsoft Copilot Studio, and Power Platform."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Offshore AI Engineering Teams",
              "description":
                "Extend your delivery capacity with offshore AI engineers supporting AI development, system integration, and workflow automation."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "White-Label AI Delivery",
              "description":
                "Expand your AI services with offshore engineering support that works under your brand and delivery model."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "AI Governance & Adoption",
              "description":
                "Plan appropriate security controls, governance practices, and adoption processes for responsible AI implementation."
            }
          }
        ]
      }
    },
    {
      "@type": "VideoObject",
      "name": "Enterprise AI Consulting Services & Strategic Implementation Overview",
      "description":
        "Explore Softree Technology's AI consulting services, including AI readiness assessment, enterprise AI strategy, Microsoft AI architecture, and offshore engineering delivery.",
      "thumbnailUrl": [
        "https://www.softreetechnology.com/ai-development-service-video/ai-agent-video-poster.webp",
        "https://www.softreetechnology.com/og-image.png"
      ],
      "uploadDate": "2025-01-15T08:00:00+00:00",
      "contentUrl": "https://www.softreetechnology.com/ai-development-service-video/ai-2.mp4",
      "embedUrl": "https://www.softreetechnology.com/services/ai-consulting-services",
      "duration": "PT30S",
      "publisher": {
        "@type": "Organization",
        "name": "Softree Technology",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.softreetechnology.com/logo/logo.png"
        }
      }
    }
  ]
};

export default function AIConsultingServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aiConsultingSchema) }}
      />
      <NavigationClient />
      <main className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
        <Hero />
        <TrustedBrandsMarquee />
        <AiReadinessBanner />
        <AIConsultingWhoWeHelp />
        {/* <NewWhoDoWeServeSection className="bg-white" /> */}
        <ReverseStickyScroll />
        <SuccessStories />
        <AIConsultingTechStack />
        <WhyChooseWithTestimonialsSoftree />
        <AiConsultingFaq />
        <LightContactSection />
        <Footer />
      </main>
    </>
  );
}
