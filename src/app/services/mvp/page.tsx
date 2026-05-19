import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import MvpHero from "./hero";
import BenefitsSection from "./benefits";
import Link from "next/link";
import { CALENDLY_URL } from "@/lib/contactConfig";
import MvpProcessTimeline from "./mvp-timeline";
import MvpTechStack from "./tech";
import WhyChooseUsMVP from "./why";
import MvpServices from "./services";
import CtaMvp from "./cta";
import Certifications from "../offshore-power-platform-development/certification";
import { Metadata } from "next";

/* ------------------------------------------------------------------ */
/* Shared Layout Spacing Config                                        */
/* ------------------------------------------------------------------ */
const SECTION_WRAPPER = "mx-auto max-w-8xl px-8 sm:px-10 md:px-14 lg:px-20";
const SECTION_GAP = "space-y-24 py-24";

export const metadata: Metadata = {
  title:
    "MVP Development Services in India | Quick MVP Creation & Validation | Softree",

  description:
    "Softree offers expert MVP development services in India, helping startups and enterprises launch their Minimum Viable Products quickly, validate business ideas, and secure funding with high-quality, cost-effective MVP solutions.",

  keywords: [
    "MVP development services",
    "MVP development India",
    "Minimum Viable Product development",
    "startup MVP development",
    "app development India",
    "web application development India",
    "fast MVP development",
    "affordable MVP development",
    "startup technology partner",
  ],

  alternates: {
    canonical: "https://www.softreetechnology.com/services/mvp",
  },

  openGraph: {
    title: "MVP Development Services in India | Quick MVP Solutions",

    description:
      "Launch your Minimum Viable Product quickly and cost-effectively with Softree’s expert MVP development services.",

    url: "https://www.softreetechnology.com/services/mvp",

    siteName: "Softree Technology",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Softree MVP Development Services India",
      },
    ],

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "MVP Development Services India | Quick MVP Launch",

    description:
      "Fast, affordable MVP development services for startups and enterprises. Build and validate your product quickly with Softree.",

    images: ["/og-image.png"],
  },
};

export default function Home() {
  return (
    <main
      className="relative min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-50

 "
    >
      <NavigationClient />
      <MvpHero />
      <MvpServices />
      <BenefitsSection />
      <MvpProcessTimeline />
      <MvpTechStack />
      <WhyChooseUsMVP />
      <Certifications />
      <CtaMvp />
      <Footer />
    </main>
  );
}
