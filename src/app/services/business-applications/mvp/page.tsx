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
import Certifications from "../power-platform/certification";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import LightFAQExact from "@/components/homepage-light/LightFAQExact";

/* ------------------------------------------------------------------ */
/* Shared Layout Spacing Config                                        */
/* ------------------------------------------------------------------ */
const SECTION_WRAPPER = "mx-auto max-w-8xl px-8 sm:px-10 md:px-14 lg:px-20";
const SECTION_GAP = "space-y-24 py-24";

const mvpFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "What MVP development services do you offer?",
    answer:
      "We build minimum viable products for startups and enterprises using modern technologies. We focus on rapid development to validate ideas, test market fit, and get your product to market quickly while maintaining quality.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "How long does it take to build an MVP?",
    answer:
      "Our MVPs typically ship in 6-8 weeks for web applications and 8-10 weeks for mobile applications. We use agile development with weekly sprints and milestone checkpoints to ensure rapid delivery.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "What technologies do you use for MVP development?",
    answer:
      "We use modern, scalable technologies: React.js, Next.js, Node.js for web apps; React Native and Flutter for mobile; and cloud platforms like AWS and Azure. We choose the right stack for your MVP based on requirements and scalability needs.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "Can you help with product strategy and MVP features?",
    answer:
      "Yes, we provide product strategy consultation to help define MVP scope, prioritize features, and identify core value propositions. We focus on building what matters most for initial market validation.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "What happens after the MVP is delivered?",
    answer:
      "We provide a smooth handoff with full code ownership, documentation, and deployment support. We also offer ongoing development partnerships to scale your MVP into a full product based on user feedback and market response.",
  },
]

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
      <LightContactSection />
      <LightFAQExact faqs={mvpFAQs} />
      <Footer />
    </main>
  );
}
