import NavigationClient from "@/components/sections/navigation-client";
import SharePointHero from "./hero";
import Footer from "@/components/sections/footer";
import SpfxBenefits from "./spfx-benefits";
import SpfxTabs from "./spfx-tab";
import SoftreeExpertiseTimeline from "./spfx.expertise";
import SpfxShowcase from "./case-study";
import TrustedBrandsMarquee from "../../business-applications/power-platform/trust";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import LightFAQExact from "@/components/homepage-light/LightFAQExact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SPFx Development | SharePoint Framework Solutions",
  description:
    "Expert SharePoint Framework (SPFx) development services. Custom web parts, extensions, and Microsoft 365 integrations for modern digital workspaces by Softree Technology.",
  alternates: {
    canonical: "https://www.softreetechnology.com/services/digital-workspace/spfx-developments",
  },
  openGraph: {
    title: "SPFx Development | SharePoint Framework Solutions",
    description:
      "Custom SharePoint Framework web parts and extensions for Microsoft 365 digital workspaces by Softree Technology.",
    url: "https://www.softreetechnology.com/services/digital-workspace/spfx-developments",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SPFx Development" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SPFx Development | SharePoint Framework Solutions",
    description: "Custom SharePoint Framework solutions for Microsoft 365 by Softree Technology.",
  },
};

const digitalWorkspaceSpfxFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "What SPFX solutions do you build for digital workspaces?",
    answer:
      "We build custom SharePoint Framework web parts and extensions for modern digital workspaces, intranets, and collaboration portals. Our solutions enhance Microsoft 365 with custom functionality tailored to your workflows.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "How do SPFX solutions improve digital workspace productivity?",
    answer:
      "Our SPFX solutions integrate seamlessly with Teams, SharePoint, and Microsoft 365, providing custom dashboards, workflow tools, document management enhancements, and collaboration features that streamline daily operations.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "Can SPFX web parts work across different Microsoft 365 environments?",
    answer:
      "Yes, our SPFX solutions are designed to work across SharePoint Online, Teams, and Microsoft 365 environments. We ensure compatibility and consistent user experience across your digital workspace ecosystem.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "How long does it take to develop a custom SPFX solution?",
    answer:
      "Simple web parts take 2-4 weeks. Complex SPFX solutions with multiple integrations and custom features take 6-10 weeks. We provide detailed timelines based on your specific requirements.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "Do you provide maintenance and updates for SPFX solutions?",
    answer:
      "Yes, we offer ongoing maintenance, bug fixes, feature enhancements, and updates to ensure your SPFX solutions remain compatible with Microsoft 365 updates and continue to meet your evolving needs.",
  },
]
export default function Page() {
  return (
    <div>
      <NavigationClient />
      <SharePointHero />
      <TrustedBrandsMarquee />

      <SpfxTabs />
      <SpfxShowcase />
      <SpfxBenefits />
      <SoftreeExpertiseTimeline />
      {/* <Certifications /> */}
      <LightContactSection />
      <LightFAQExact faqs={digitalWorkspaceSpfxFAQs} />

      <Footer />
    </div>
  );
}
