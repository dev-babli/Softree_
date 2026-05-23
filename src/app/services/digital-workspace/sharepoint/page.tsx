import type { Metadata } from "next";
import NavigationClient from "@/components/sections/navigation-client";
import SharePointMigration from "./sp-migrarion";
import SharePointFeatures from "./feature";
import TechStack from "./tech-stack";
import SharePointMigrationProcess from "./sp-process";
import AIDrivenSharePointMigration from "./ai-sp";
import Footer from "@/components/sections/footer";
import PowerAppsCaseStudies from "./casestudies";
import TimelinePage from "./timeline";
import SharePointHero from "./hero";
import HireSharePointPricing from "./pricing-cards";
import WhyChooseUs from "./why-chose";
import TrustedBrandsMarquee from "../../business-applications/power-platform/trust";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import LightFAQExact from "@/components/homepage-light/LightFAQExact";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "SharePoint Development & Migration Services | Softree Technology",
  description:
    "SharePoint Online development, migration, and customization services. Modern intranets, document management, and collaboration solutions by Softree Technology.",
  alternates: {
    canonical: "https://www.softreetechnology.com/services/digital-workspace/sharepoint",
  },
  openGraph: {
    title: "SharePoint Development & Migration | Softree Technology",
    description:
      "Modern SharePoint intranets, migration services, and custom solutions for enterprise collaboration.",
    url: "https://www.softreetechnology.com/services/digital-workspace/sharepoint",
    siteName: "Softree Technology",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SharePoint Services" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SharePoint Development | Softree Technology",
    description: "SharePoint Online development, migration, and modern intranet solutions.",
    images: ["/og-image.png"],
  },
};
const FIXED_WIDTH = "mx-auto max-w-8xl px-8 sm:px-10 md:px-14 lg:px-20";

const digitalWorkspaceSharePointFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "What SharePoint solutions do you build for digital workspaces?",
    answer:
      "We build modern SharePoint intranets, document management systems, collaboration portals, and team sites for digital workspaces. Our solutions enhance information sharing, streamline workflows, and improve team productivity.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "How do SharePoint solutions integrate with Microsoft 365?",
    answer:
      "Our SharePoint solutions integrate seamlessly with Teams, Power Apps, Power Automate, Power BI, and other Microsoft 365 services. We create unified digital workspaces where all your tools work together efficiently.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "Can you migrate from legacy intranets to modern SharePoint?",
    answer:
      "Yes, we specialize in migrating from legacy intranets, file shares, and older SharePoint versions to modern SharePoint Online. We ensure data integrity, preserve permissions, and improve the user experience during migration.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "How long does a SharePoint intranet implementation take?",
    answer:
      "Simple SharePoint sites take 4-6 weeks. Comprehensive intranet implementations with custom workflows, branding, and integrations take 8-12 weeks. We provide detailed timelines based on your requirements.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "Do you provide training and ongoing support for SharePoint?",
    answer:
      "We provide comprehensive user training, administrator documentation, and ongoing support packages. We ensure your team can effectively use SharePoint and provide maintenance to keep your solutions running smoothly.",
  },
]

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#141414]">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.softreetechnology.com" },
          { name: "Services", url: "https://www.softreetechnology.com/services" },
          { name: "Digital Workspace", url: "https://www.softreetechnology.com/services/digital-workspace/sharepoint" },
          { name: "SharePoint", url: "https://www.softreetechnology.com/services/digital-workspace/sharepoint" },
        ]}
      />
      <NavigationClient />

      {/* HERO (can stay full-width or internally centered) */}
      <SharePointHero />

      {/* MAIN CONTENT – FIXED WIDTH */}
      <section className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
        <div className={FIXED_WIDTH}>
          {/* <SharePointFeatures /> */}
          <TrustedBrandsMarquee />
          <PowerAppsCaseStudies />
          <SharePointMigration />
          <SharePointMigrationProcess />
          <AIDrivenSharePointMigration />
          <WhyChooseUs />
          <TechStack />
          <HireSharePointPricing />
          <TimelinePage />
          {/* <Certifications /> */}
        </div>
      </section>

      <LightContactSection />
      <LightFAQExact faqs={digitalWorkspaceSharePointFAQs} />

      <Footer />
    </main>
  );
}
