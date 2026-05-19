import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import Certifications from "../../business-applications/power-platform/certification";
import FullStackTeams from "./full-stack";
import ThreePillars from "./three-pillar";
import CollaborationTabs from "./collab-tab";
import WebDevelopmentHero from "./process";
import QualityBenchmark from "./quality";
import WhyChooseSoftreeWebDevelopment from "./why-chose";
import WebDevelopmentCaseStudies from "./case-studies";
import WebDevHero from "./hero";
import TrustedBrandsMarquee from "../../business-applications/power-platform/trust";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import LightFAQExact from "@/components/homepage-light/LightFAQExact";

const digitalWorkspaceWebFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "What digital workspace web development services do you offer?",
    answer:
      "We build modern web applications for digital workspaces, intranets, collaboration platforms, and productivity tools. We focus on creating user-friendly interfaces that enhance team collaboration and workflow efficiency.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "How do you ensure web apps integrate with existing digital tools?",
    answer:
      "We integrate web applications with Microsoft 365, Google Workspace, Slack, project management tools, and other digital platforms your team uses. We ensure seamless data flow and unified user experiences.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "What is the typical timeline for a digital workspace web app?",
    answer:
      "Digital workspace web apps typically take 6-10 weeks. Complex platforms with multiple integrations and custom workflows take 10-14 weeks. We provide detailed timelines during the discovery phase.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "Do you support responsive design for mobile and desktop?",
    answer:
      "Yes, all our web applications are fully responsive and optimized for desktop, tablet, and mobile devices. We ensure consistent user experience across all screen sizes and devices.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "Can you help with user adoption and training?",
    answer:
      "We provide comprehensive user documentation, training sessions, and change management support to ensure high adoption rates. We focus on intuitive design that requires minimal training.",
  },
]

/* ------------------------------------------------------------------ */
/* Shared Layout Config                                                */
/* ------------------------------------------------------------------ */
const SECTION_WRAPPER = "mx-auto max-w-full px-8 sm:px-10 md:px-14 lg:px-20";
const SECTION_GAP = "space-y-24";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      <NavigationClient />

      {/* HERO */}
      <WebDevHero />

      {/* MAIN CONTENT — COMPONENT BACKGROUND */}
      <section className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
        <TrustedBrandsMarquee />
        <WebDevelopmentCaseStudies />
        <WebDevelopmentHero />
        <FullStackTeams />
        <ThreePillars />
        <CollaborationTabs />
        <QualityBenchmark />
        <WhyChooseSoftreeWebDevelopment />
        {/* <Certifications /> */}
      </section>

      <LightContactSection />
      <LightFAQExact faqs={digitalWorkspaceWebFAQs} />

      <Footer />
    </main>
  );
}
