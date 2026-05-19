"use client";
import NavigationClient from "@/components/sections/navigation-client";
import Certifications from "../../business-applications/power-platform/certification";
import Footer from "@/components/sections/footer";
import TrustedBrandsMarquee from "../../business-applications/power-platform/trust";
import MobileAppHero from "./hero";
import MobileAppCaseStudies from "./case-studies";
import WhoWeWorkWith from "./who-we";
import MobileAppLifecycle from "./lifecycle";
import ServicesShowcase from "./services";
import Technologies from "./tech-stack";
import WhyChooseSoftreeMobileApps from "./why-chose";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import LightFAQExact from "@/components/homepage-light/LightFAQExact";
/* ------------------------------------------------------------------ */
/* Shared Layout Spacing Config                                        */
/* ------------------------------------------------------------------ */
const SECTION_WRAPPER = "mx-auto max-w-8xl px-8 sm:px-10 md:px-14 lg:px-20";
const SECTION_GAP = "space-y-24 py-24";

const digitalWorkspaceMobileFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "What mobile apps do you build for digital workspaces?",
    answer:
      "We build mobile apps for digital workspaces including employee portals, task management apps, collaboration tools, and productivity apps that integrate with your existing digital workplace ecosystem.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "How do mobile apps integrate with digital workspace platforms?",
    answer:
      "We integrate mobile apps with SharePoint, Teams, Microsoft 365, project management tools, and other digital workspace platforms. We ensure seamless data synchronization and consistent user experience across all devices.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "Do you develop for both iOS and Android?",
    answer:
      "Yes, we develop native iOS and Android apps, as well as cross-platform solutions using React Native and Flutter. We recommend the best approach based on your requirements, timeline, and budget.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "How long does it take to develop a digital workspace mobile app?",
    answer:
      "Simple mobile apps take 6-8 weeks. Complex digital workspace apps with multiple integrations and offline capabilities take 10-14 weeks. We provide detailed timelines based on your specific requirements.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "Do you provide app store submission and maintenance?",
    answer:
      "Yes, we handle app store submission for both iOS and Android, including all necessary documentation and compliance requirements. We also offer ongoing maintenance, updates, and support packages.",
  },
]

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      <NavigationClient />

      {/* HERO */}
      <MobileAppHero />

      {/* MAIN CONTENT SECTIONS */}
      <section className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
        <TrustedBrandsMarquee />
        <div className={`${SECTION_WRAPPER} ${SECTION_GAP}`}>
          <MobileAppCaseStudies />
          <WhoWeWorkWith />
          <MobileAppLifecycle />
          <ServicesShowcase />
          <Technologies />
          <WhyChooseSoftreeMobileApps />
        </div>
      </section>

      <LightContactSection />
      <LightFAQExact faqs={digitalWorkspaceMobileFAQs} />

      <Footer />
    </main>
  );
}
