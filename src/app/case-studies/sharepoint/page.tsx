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
  title: "SharePoint Case Studies",
  description:
    "Explore Softree Technology's SharePoint success stories — modern intranets, migration projects, and collaboration solutions for enterprises.",
  alternates: {
    canonical: "https://www.softreetechnology.com/case-studies/sharepoint",
  },
  openGraph: {
    title: "SharePoint Case Studies | Softree Technology",
    description: "SharePoint migration and development case studies — intranets, portals, and DMS.",
    url: "https://www.softreetechnology.com/case-studies/sharepoint",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SharePoint Case Studies" }],
  },
};

const spFAQs = [
  { id: 1, serial: "question 01", question: "What SharePoint solutions are featured in your case studies?", answer: "Our SharePoint case studies showcase intranet portals, document management systems, migration projects, and custom SharePoint solutions. We highlight the challenges, solutions, and measurable results for each project." },
  { id: 2, serial: "question 02", question: "What types of SharePoint migrations have you completed?", answer: "We have migrated from on-premises SharePoint to SharePoint Online, legacy file shares to SharePoint, and older SharePoint versions to modern platforms. Our case studies detail the migration strategies and outcomes." },
  { id: 3, serial: "question 03", question: "How do you measure success in SharePoint projects?", answer: "We measure success through user adoption rates, productivity improvements, cost savings, and system performance. Our case studies include quantitative metrics and client feedback on project outcomes." },
  { id: 4, serial: "question 04", question: "Can you help with similar SharePoint projects for my organization?", answer: "Yes, we can deliver similar SharePoint solutions tailored to your organization&apos;s needs. Contact us to discuss your requirements and we can provide a detailed proposal based on our proven expertise." },
  { id: 5, serial: "question 05", question: "What industries do you serve with SharePoint solutions?", answer: "We serve various industries including healthcare, finance, manufacturing, and government. Our case studies demonstrate our experience delivering SharePoint solutions across different sectors." },
]

/**
 * SHAREPOINT CASE STUDIES — Redesigned to match About Us / Contact / Blog design language.
 */
export default async function SharePointCaseStudiesPage() {
  const sharepointCaseStudies = await getCaseStudyItemsByCategory("sharepoint")

  return (
    <div className="min-h-screen pt-[100px]">
      <NavigationClient />
      <CaseStudyHero
        title="SharePoint"
        titleItalic="& SPFx"
        eyebrow="SharePoint Online&nbsp;&nbsp;&middot;&nbsp;&nbsp;SPFx&nbsp;&nbsp;&middot;&nbsp;&nbsp;Microsoft 365"
        description="Modern SharePoint intranet portals, SPFx extensions, document management systems, and workflow automation solutions that drive collaboration."
        accentColor="#3B82F6"
        heroStat="-78%"
        heroStatLabel="list management time saved via Custom Copy & Move Panel"
        projectCount={45}
      />
      <CaseStudyGridNew
        items={sharepointCaseStudies}
        sectionTitle="SharePoint & SPFx projects"
        sectionSubtitle="Intranet portals, SPFx web parts, command extensions, and PowerShell automation."
        accentColor="#3B82F6"
      />
      <CaseStudyProofCTA
        challengeText="Is your SharePoint still just a file dump nobody uses?"
        solutionText="We build SharePoint solutions people actually adopt — governed, branded, and integrated with your M365 tools from day one."
        accentColor="#3B82F6"
        quote="List management time dropped 78%. Our team stopped complaining about SharePoint and started using it as their primary workspace."
        quoteName="IT Operations Lead"
        quoteRole="Corporate Intranet · Intranet & Collaboration"
      />
      <LightContactSection />
      <LightFAQExact faqs={spFAQs} />
      <Footer />
    </div>
  )
}
