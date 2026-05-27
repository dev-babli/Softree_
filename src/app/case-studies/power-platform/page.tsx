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
  title: "Power Platform Case Studies",
  description:
    "See how Softree Technology automates business processes with Microsoft Power Platform — Power Apps, Power Automate, and Power BI success stories.",
  alternates: {
    canonical: "https://www.softreetechnology.com/case-studies/power-platform",
  },
  openGraph: {
    title: "Power Platform Case Studies | Softree Technology",
    description: "Enterprise automation case studies — Power Apps, Power Automate, and Power BI projects.",
    url: "https://www.softreetechnology.com/case-studies/power-platform",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Power Platform Case Studies" }],
  },
};

const ppFAQs = [
  { id: 1, serial: "question 01", question: "What Power Platform solutions are featured in your case studies?", answer: "Our Power Platform case studies showcase Power Apps, Power Automate workflows, Power BI dashboards, and Dataverse solutions. We highlight the business challenges, technical solutions, and measurable outcomes for each project." },
  { id: 2, serial: "question 02", question: "What types of business processes have you automated with Power Platform?", answer: "We have automated various processes including approval workflows, data entry, reporting, document management, and business operations. Our case studies demonstrate significant efficiency gains and cost savings." },
  { id: 3, serial: "question 03", question: "How do you measure success in Power Platform projects?", answer: "We measure success through time savings, error reduction, user adoption, and ROI. Our case studies include quantitative metrics like hours saved, processes automated, and business impact." },
  { id: 4, serial: "question 04", question: "Can you build similar Power Platform solutions for my organization?", answer: "Yes, we can deliver similar Power Platform solutions tailored to your business processes. Contact us to discuss your requirements and we can provide a detailed proposal based on our proven expertise." },
  { id: 5, serial: "question 05", question: "What industries do you serve with Power Platform solutions?", answer: "We serve various industries including manufacturing, healthcare, finance, and retail. Our case studies demonstrate our experience delivering Power Platform solutions across different business sectors." },
]

/**
 * POWER PLATFORM CASE STUDIES — Redesigned to match About Us / Contact / Blog design language.
 */
export default async function PowerAppsCaseStudiesPage() {
  const powerPlatformCaseStudies = await getCaseStudyItemsByCategory("power-platform")

  return (
    <div className="min-h-screen pt-[100px]">
      <NavigationClient />
      <CaseStudyHero
        title="Power"
        titleItalic="platform"
        eyebrow="Power Apps&nbsp;&nbsp;&middot;&nbsp;&nbsp;Power Automate&nbsp;&nbsp;&middot;&nbsp;&nbsp;Dataverse"
        description="Enterprise low-code solutions built on Microsoft Power Platform — automating workflows, digitizing processes, and driving operational efficiency."
        accentColor="#34D399"
        heroStat="-85%"
        heroStatLabel="manual data entry eliminated via Barcode Scanner App"
        projectCount={35}
      />
      <CaseStudyGridNew
        items={powerPlatformCaseStudies}
        sectionTitle="Power Platform projects"
        sectionSubtitle="Power Apps, Power Automate, and Dataverse solutions solving real business challenges."
        accentColor="#34D399"
      />
      <CaseStudyProofCTA
        challengeText="Still running your business on spreadsheets and email chains?"
        solutionText="We build Power Platform solutions that eliminate manual processes — deployed in weeks, not months, with your existing Microsoft 365 licences."
        accentColor="#34D399"
        quote="Manual data entry dropped 85% overnight. The team couldn’t believe the same work now takes seconds instead of hours."
        quoteName="Operations Manager"
        quoteRole="Retail Enterprise · Inventory & Logistics"
      />
      <LightContactSection />
      <LightFAQExact faqs={ppFAQs} />
      <Footer />
    </div>
  )
}
