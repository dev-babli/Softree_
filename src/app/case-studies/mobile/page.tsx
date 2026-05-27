import type { Metadata } from "next";
import NavigationClient from "@/components/sections/navigation-client"
import Footer from "@/components/sections/footer"
import LightContactSection from "@/components/qc/homepage-light/LightContactSection"
import LightFAQExact from "@/components/homepage-light/LightFAQExact"
import CaseStudyHero from "../CaseStudyHero"
import CaseStudyGridNew from "../CaseStudyGrid"
import CaseStudyProofCTA from "../CaseStudyProofCTA"
import { getCaseStudyItemsByCategory } from "../categoryCards"

export const metadata: Metadata = {
  title: "Mobile App Case Studies",
  description:
    "Discover how Softree Technology delivers high-performance iOS, Android, and cross-platform mobile applications with measurable business impact.",
  alternates: {
    canonical: "https://www.softreetechnology.com/case-studies/mobile",
  },
  openGraph: {
    title: "Mobile App Case Studies | Softree Technology",
    description: "Real-world mobile development projects — iOS, Android, and React Native apps.",
    url: "https://www.softreetechnology.com/case-studies/mobile",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Mobile Case Studies" }],
  },
};

const mobileFAQs = [
  { id: 1, serial: "question 01", question: "What mobile app projects are featured in your case studies?", answer: "Our mobile case studies showcase iOS and Android apps, cross-platform solutions, and enterprise mobile applications. We highlight the challenges, technical solutions, and measurable results for each project." },
  { id: 2, serial: "question 02", question: "What technologies do you use for mobile app development?", answer: "We use React Native and Flutter for cross-platform development, and native technologies (Swift, Kotlin) for platform-specific needs. Each case study details the technology stack and rationale." },
  { id: 3, serial: "question 03", question: "How do you measure success in mobile app projects?", answer: "We measure success through app store ratings, user engagement, download numbers, and business impact. Our case studies include quantitative metrics and user feedback on app performance." },
  { id: 4, serial: "question 04", question: "Can you build similar mobile apps for my business?", answer: "Yes, we can build similar mobile solutions tailored to your business requirements. Contact us to discuss your project and we can provide a detailed proposal based on our proven expertise." },
  { id: 5, serial: "question 05", question: "What industries do you serve with mobile app development?", answer: "We serve various industries including healthcare, finance, retail, and logistics. Our case studies demonstrate our experience delivering mobile solutions across different sectors." },
]

/**
 * MOBILE CASE STUDIES — Redesigned to match About Us / Contact / Blog design language.
 */
export default async function MobileCaseStudiesPage() {
  const mobileCaseStudies = await getCaseStudyItemsByCategory("mobile")

  return (
    <div className="min-h-screen pt-[100px]">
      <NavigationClient />
      <CaseStudyHero
        title="Mobile"
        titleItalic="case studies"
        eyebrow="iOS&nbsp;&nbsp;&middot;&nbsp;&nbsp;Android&nbsp;&nbsp;&middot;&nbsp;&nbsp;Cross-Platform"
        description="Real-world mobile applications delivering performance, scale, and measurable business impact across iOS and Android."
        accentColor="#F97316"
        heroStat="-54%"
        heroStatLabel="no-show rate for Doctor Appointment Booking System"
        projectCount={30}
      />
      <CaseStudyGridNew
        items={mobileCaseStudies}
        sectionTitle="Mobile app projects"
        sectionSubtitle="Healthcare, fintech, education, and hospitality apps built for real users."
        accentColor="#F97316"
      />
      <CaseStudyProofCTA
        challengeText="Need a mobile app your users will actually keep using?"
        solutionText="From zero-downtime backends to 5-star store ratings — we’ve shipped apps that users return to every day."
        accentColor="#F97316"
        quote="Our no-show rate dropped 54% within 8 weeks of launch. The app paid for itself before the warranty period ended."
        quoteName="Healthcare Operations Lead"
        quoteRole="Medical Practice · Healthcare"
      />
      <LightContactSection />
      <LightFAQExact faqs={mobileFAQs} />
      <Footer />
    </div>
  )
}
