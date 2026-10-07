import type { Metadata } from "next";
import ServicesHubIntro from "./services-hub-intro";
import ServicesHubSticky from "./services-hub-sticky";
import ServicesHubProcess from "./services-hub-process";
import ServicesHubCases from "./services-hub-cases";
import ServicesHubTestimonial from "./services-hub-testimonial";
import StartProject from "./start-project";

export const metadata: Metadata = {
  title: "Services | Softree Technology - Microsoft, Data, AI & Modern Engineering",
  description:
    "Explore Softree Technology's engineering services: Agentic AI, Azure OpenAI, Microsoft Fabric, Power Platform, SharePoint, Web, and Mobile app development.",
  alternates: {
    canonical: "https://www.softreetechnology.com/services",
  },
  openGraph: {
    title: "Services | Softree Technology",
    description:
      "Enterprise AI, Microsoft Fabric, Power Platform, and full-stack engineering delivery.",
    url: "https://www.softreetechnology.com/services",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#F3F0EE] text-[#0a0a1a]">
      <ServicesHubIntro />
      <ServicesHubSticky />
      <ServicesHubProcess />
      <ServicesHubCases />
      <ServicesHubTestimonial />
      <StartProject />
    </main>
  );
}
