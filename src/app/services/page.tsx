import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import ServicesHeader from "./header";
import ServicesDetails from "./service-details";
import CaseStudiesSlider from "./cases";
import ProjectProcessSection from "./start-project";
import Certifications from "./offshore-power-platform-development/certification";
import ServicesHero from "./hero";
import CTASection from "@/components/sections/cta-banner";
import ProcessTimeline from "./process";
import ServicesSection from "./services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Softree Technology",
  description:
    "Comprehensive software development services including web, mobile, CRM, AI, and e-commerce solutions by Softree Technology.",
  keywords: [
    "software development services",
    "web development India",
    "mobile app development",
    "CRM development",
    "AI development",
    "ecommerce development",
    "software company India",
  ],
  alternates: {
    canonical: "https://www.softreetechnology.com/services",
  },
  openGraph: {
    title: "Services | Softree Technology",
    description:
      "Comprehensive software development services by Softree Technology.",
    url: "https://www.softreetechnology.com/services",
    siteName: "Softree Technology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Softree Technology Services",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Softree Technology",
    description:
      "Comprehensive software development services by Softree Technology.",
    images: ["/og-image.png"],
  },
};

export default function Home() {
  return (
    <>
      {/* FIXED NAVIGATION */}
      <NavigationClient />
      {/* MAIN CONTENT – space reserved for pill navbar */}
      <main className="bg-[#09090f]">
        <ServicesHero />
        <ServicesHeader />
        <ServicesSection />
        <ProcessTimeline />
        <CTASection />
      </main>
      {/* FOOTER */}
      <Footer />
    </>
  );
}
