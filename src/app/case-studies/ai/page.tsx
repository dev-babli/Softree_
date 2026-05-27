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
  title: "AI Case Studies",
  description:
    "Explore how Softree Technology delivers AI-powered solutions — recommendation engines, chatbots, computer vision, and intelligent automation driving measurable ROI.",
  alternates: {
    canonical: "https://www.softreetechnology.com/case-studies/ai",
  },
  openGraph: {
    title: "AI Case Studies | Softree Technology",
    description: "Real-world AI project results — ML, NLP, generative AI, and automation case studies.",
    url: "https://www.softreetechnology.com/case-studies/ai",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AI Case Studies" }],
  },
};

const aiFAQs = [
  { id: 1, serial: "question 01", question: "What AI projects are featured in your case studies?", answer: "Our AI case studies showcase generative AI solutions, AI agents, intelligent automation, and machine learning applications. We highlight the challenges, technical approaches, and measurable business outcomes for each project." },
  { id: 2, serial: "question 02", question: "What AI technologies do you use in your projects?", answer: "We use OpenAI, Azure OpenAI, custom LLMs, and machine learning frameworks. Each case study details the specific AI technologies, models, and architectures used to solve business problems." },
  { id: 3, serial: "question 03", question: "How do you measure success in AI projects?", answer: "We measure success through accuracy improvements, efficiency gains, cost savings, and user satisfaction. Our case studies include quantitative metrics and qualitative feedback on AI solution performance." },
  { id: 4, serial: "question 04", question: "Can you build similar AI solutions for my organization?", answer: "Yes, we can build similar AI solutions tailored to your business needs. Contact us to discuss your requirements and we can provide a detailed proposal based on our proven AI expertise." },
  { id: 5, serial: "question 05", question: "What industries do you serve with AI solutions?", answer: "We serve various industries including healthcare, finance, customer service, and operations. Our case studies demonstrate our experience delivering AI solutions across different business sectors." },
]

/**
 * AI CASE STUDIES — Redesigned to match About Us / Contact / Blog design language.
 */
export default async function AICaseStudiesPage() {
  const aiCaseStudies = await getCaseStudyItemsByCategory("ai")

  return (
    <div className="min-h-screen pt-[100px]">
      <NavigationClient />
      <CaseStudyHero
        title="AI"
        titleItalic="case studies"
        eyebrow="Artificial Intelligence&nbsp;&nbsp;&middot;&nbsp;&nbsp;Machine Learning"
        description="Real-world AI solutions engineered to automate workflows, enhance decision-making, and drive measurable business impact across industries."
        accentColor="#8B5CF6"
        heroStat="412%"
        heroStatLabel="ROI achieved for Enterprise AI Decision Platform"
        projectCount={25}
      />
      <CaseStudyGridNew
        items={aiCaseStudies}
        sectionTitle="AI & machine learning projects"
        sectionSubtitle="Generative AI, predictive analytics, and intelligent automation delivering transformative results."
        accentColor="#8B5CF6"
      />
      <CaseStudyProofCTA
        challengeText="Ready to turn your data into a competitive advantage?"
        solutionText="Every AI project above started with understanding a specific business problem — not a technology. Let’s find yours."
        accentColor="#8B5CF6"
        quote="The AI decision platform delivered 412% ROI in year one. We now make faster, more accurate decisions at every level."
        quoteName="Chief Analytics Officer"
        quoteRole="Enterprise Client · Financial Services"
      />
      <LightContactSection />
      <LightFAQExact faqs={aiFAQs} />
      <Footer />
    </div>
  )
}
