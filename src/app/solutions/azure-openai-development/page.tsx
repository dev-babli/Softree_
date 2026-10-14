import type { Metadata } from "next";
import { applyPageOg } from "@/lib/site-metadata";
import dynamic from "next/dynamic";
import NavigationClient from "@/components/sections/navigation-client";
import AzureOpenAIHero2 from "./components/AzureOpenAIHero2";
import TrustedBrandsMarquee from "@/app/services/offshore-power-platform-development/trust";
import AzureOpenAIReadinessBanner from "./components/AzureOpenAIReadinessBanner";
import { AzureOpenAIServicesSection } from "./components/AzureOpenAIServicesSection";
import AzureOpenAIWhoDoWeServeSection from "./components/AzureOpenAIWhoDoWeServeSection";
import { AzureOpenAIStickyScroll } from "./components/AzureOpenAIStickyScroll";
import { AzureOpenAISuccessStories } from "./components/AzureOpenAISuccessStories";
import { AzureOpenAITechnologyStack } from "./components/AzureOpenAITechnologyStack";
import { AzureOpenAIOffshoreEngineeringSection } from "./components/AzureOpenAIOffshoreEngineeringSection";
import { AzureOpenAIHowWeWork } from "./components/AzureOpenAIHowWeWork";
import AzureOpenAIWhyChooseWithTestimonials from "./components/AzureOpenAIWhyChooseWithTestimonials";
import AzureOpenAIFAQNew from "./components/AzureOpenAIFAQNew";
import AzureOpenAIRelatedServicesNew from "./components/AzureOpenAIRelatedServicesNew";
import Footer from "@/components/sections/footer";
import { faqs } from "./data/faqs";

const LightContactSection = dynamic(
  () => import("@/components/homepage-light/LightContactSection"),
  { ssr: true }
);

export const metadata: Metadata = applyPageOg(
  "/solutions/azure-openai-development",
  {
    title: "Azure OpenAI Development Services | Offshore GPT-4o, RAG & Copilot Engineers | Softree",
    description:
      "Hire Softree's offshore Azure OpenAI development team to build GPT-4o applications, RAG pipelines with Azure AI Search, Microsoft Copilot extensions, and governed AI Foundry deployments — all inside your own Azure subscription.",
    keywords: [
      "Azure OpenAI development services",
      "offshore Azure OpenAI developers",
      "hire Azure OpenAI development team",
      "outsource Azure OpenAI development",
      "GPT-4o application development",
      "Azure AI development company",
      "RAG pipeline development Azure",
      "Azure AI Search RAG development",
      "Microsoft Copilot development services",
      "offshore GPT-4o developers",
      "Azure OpenAI consulting services",
      "outsource GPT app development",
      "Azure AI Foundry development",
      "Copilot Studio development services",
      "Semantic Kernel LangChain development",
      "offshore AI development team India",
      "white label Azure OpenAI development",
      "Azure OpenAI integration services",
      "hire Azure AI engineers",
      "outsource Microsoft AI development",
    ],
    alternates: {
      canonical: "https://www.softreetechnology.com/solutions/azure-openai-development",
    },
    openGraph: {
      title: "Azure OpenAI Development Services | Offshore GPT-4o, RAG & Copilot Engineers | Softree",
      description:
        "Softree's offshore Azure OpenAI development team builds GPT-4o apps, RAG pipelines, and Microsoft Copilot extensions inside your own Azure subscription. IP is yours. Teams scale on demand.",
      url: "https://www.softreetechnology.com/solutions/azure-openai-development",
      siteName: "Softree Technology",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Azure OpenAI Development Services | Offshore GPT-4o, RAG & Copilot Engineers | Softree",
      description:
        "Hire Softree's offshore Azure OpenAI engineers to build GPT-4o apps, RAG search pipelines, and Microsoft Copilot extensions — deployed securely inside your Azure subscription.",
    },
  }
);


export default function AzureOpenAIDevelopmentPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.softreetechnology.com/#organization",
        name: "Softree Technology",
        url: "https://www.softreetechnology.com",
        logo: {
          "@type": "ImageObject",
          url: "https://www.softreetechnology.com/logo/Softree-Technology-Final-Logo.png",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.softreetechnology.com/solutions/azure-openai-development#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.softreetechnology.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Solutions",
            item: "https://www.softreetechnology.com/solutions",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Azure OpenAI Development",
            item: "https://www.softreetechnology.com/solutions/azure-openai-development",
          },
        ],
      },
      {
        "@type": "Service",
        "@id": "https://www.softreetechnology.com/solutions/azure-openai-development#service",
        name: "Azure OpenAI Development Services — Offshore GPT-4o, RAG Pipeline & Microsoft Copilot Engineering",
        serviceType: "Offshore Azure OpenAI Development & Generative AI Engineering",
        provider: {
          "@id": "https://www.softreetechnology.com/#organization",
        },
        description:
          "Softree provides offshore Azure OpenAI development services — hire a dedicated team to build GPT-4o applications, RAG pipelines with Azure AI Search, Microsoft Copilot extensions, and governed AI Foundry solutions deployed inside your own Azure subscription.",
        areaServed: "Worldwide",
        url: "https://www.softreetechnology.com/solutions/azure-openai-development",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Azure OpenAI Development Capabilities",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Offshore GPT-4o Application & REST API Development",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "RAG Pipeline Development with Azure AI Search, Hybrid Retrieval & Semantic Re-ranking",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Microsoft 365 Copilot, Teams AI Bot, Power Platform & SharePoint AI Integrations",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Secure VNet Landing Zone, Entra ID RBAC, Key Vault & AI Content Safety Setup",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Azure OpenAI Token Cost Optimisation, Semantic Caching & AI Governance",
              },
            },
          ],
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.softreetechnology.com/solutions/azure-openai-development#faq",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      {
        "@type": "VideoObject",
        name: "Enterprise Azure OpenAI Development & AI Architecture Overview",
        description:
          "Discover how Softree Technology builds enterprise-grade Azure OpenAI solutions including GPT-4o integration, RAG architectures with Azure AI Search, and secure enterprise workflows.",
        thumbnailUrl: [
          "https://www.softreetechnology.com/ai-development-service-video/ai-agent-video-poster.webp",
          "https://www.softreetechnology.com/og-image.png"
        ],
        uploadDate: "2025-01-15T08:00:00+00:00",
        contentUrl: "https://www.softreetechnology.com/images/solutions/azure-openai-development/azure-openai-hero.mp4",
        embedUrl: "https://www.softreetechnology.com/solutions/azure-openai-development",
        duration: "PT45S",
        publisher: {
          "@type": "Organization",
          name: "Softree Technology",
          logo: {
            "@type": "ImageObject",
            url: "https://www.softreetechnology.com/logo/logo.png"
          }
        }
      },
    ],
  };

  return (
    <main className="relative min-h-screen bg-white selection:bg-orange-500 selection:text-white overflow-x-clip">
      {/* Centralized JSON-LD Structured Data Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <NavigationClient />

      {/* Hero Section */}
      <AzureOpenAIHero2 />

      {/* Trusted By Marquee */}
      <TrustedBrandsMarquee />

      {/* AI Readiness Banner */}
      <AzureOpenAIReadinessBanner />

      {/* Services Grid */}
      <AzureOpenAIServicesSection />

      {/* Who Do We Serve Section */}
      {/* <AzureOpenAIWhoDoWeServeSection className="bg-white" />

      {/* Sticky Scroll Section */}
      <AzureOpenAIStickyScroll />

      {/* Success Stories & Case Studies */}
      <AzureOpenAISuccessStories />

      {/* Technology Stack Marquee */}
      <AzureOpenAITechnologyStack />

      {/* Offshore Engineering & Scope Section */}
      {/* <AzureOpenAIOffshoreEngineeringSection /> */}

      {/* How We Work 5-Stage Process */}
      {/* <AzureOpenAIHowWeWork /> */}

      {/* Why Choose Softree with Client Testimonials */}
      <AzureOpenAIWhyChooseWithTestimonials />

      {/* 8 FAQs Accordion */}
      <AzureOpenAIFAQNew />

      {/* Topic Cluster & Related AI Services */}
      {/* <AzureOpenAIRelatedServicesNew /> */}

      {/* Contact Section */}
      <LightContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
