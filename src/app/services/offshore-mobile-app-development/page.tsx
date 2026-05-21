"use client";
import NavigationClient from "@/components/sections/navigation-client";
import Certifications from "../offshore-power-platform-development/certification";
import Footer from "@/components/sections/footer";
import TrustedBrandsMarquee from "../offshore-power-platform-development/trust";
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

const mobileAppFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "What mobile app development services do you offer?",
    answer:
      "We develop native iOS and Android apps, cross-platform apps using React Native and Flutter, and hybrid solutions. We build consumer apps, enterprise mobile solutions, and progressive web apps (PWAs).",
  },
  {
    id: 2,
    serial: "question 02",
    question: "How long does it take to develop a mobile app?",
    answer:
      "Mobile app MVPs typically take 8-12 weeks. Complex enterprise apps with backend integration take 12-16 weeks. We provide a detailed timeline with milestone checkpoints during the discovery phase.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "Do you develop for both iOS and Android?",
    answer:
      "Yes, we develop for both platforms. We can build separate native apps for iOS and Android, or use cross-platform frameworks like React Native and Flutter to develop a single codebase for both platforms efficiently.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "Can you integrate mobile apps with backend systems?",
    answer:
      "Absolutely. We integrate mobile apps with REST APIs, GraphQL, databases, authentication systems, third-party services, and enterprise systems. We ensure secure data synchronization and real-time updates.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "What post-launch support do you provide?",
    answer:
      "We offer comprehensive post-launch support including app store submission, bug fixes, performance monitoring, security updates, feature enhancements, and 24/7 technical support to ensure your app runs smoothly.",
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
      <LightFAQExact faqs={mobileAppFAQs} />

      <Footer />
    </main>
  );
}
