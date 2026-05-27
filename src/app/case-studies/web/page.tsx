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
  title: "Web Development Case Studies",
  description:
    "See how Softree Technology builds high-performance web applications — React, Next.js, and full-stack solutions delivering real business outcomes.",
  alternates: {
    canonical: "https://www.softreetechnology.com/case-studies/web",
  },
  openGraph: {
    title: "Web Development Case Studies | Softree Technology",
    description: "Real-world web development projects — React, Next.js, and enterprise web applications.",
    url: "https://www.softreetechnology.com/case-studies/web",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Web Case Studies" }],
  },
};

const webFAQs = [
  { id: 1, serial: "question 01", question: "What types of web application case studies do you feature?", answer: "Our web case studies showcase enterprise web applications, SaaS platforms, e-commerce solutions, and custom web portals. We highlight the challenges, solutions, and results for each project." },
  { id: 2, serial: "question 02", question: "What technologies are used in your web application projects?", answer: "We use modern web technologies including React.js, Next.js, Node.js, TypeScript, and cloud platforms like AWS and Azure. Each case study details the specific technology stack used." },
  { id: 3, serial: "question 03", question: "How do you measure success in your web application projects?", answer: "We measure success through metrics like performance improvements, user adoption rates, cost savings, and business impact. Our case studies include quantitative results and client testimonials." },
  { id: 4, serial: "question 04", question: "Can you build similar web applications for my business?", answer: "Yes, we can build similar solutions tailored to your specific business requirements. Contact us to discuss your project and we can provide a detailed proposal based on our experience." },
  { id: 5, serial: "question 05", question: "What industries do you serve with web application development?", answer: "We serve various industries including healthcare, finance, e-commerce, education, and manufacturing. Our case studies demonstrate our expertise across different sectors." },
]

/**
 * WEB CASE STUDIES — Redesigned to match About Us / Contact / Blog design language.
 */
export default async function WebCaseStudiesPage() {
  const webCaseStudies = await getCaseStudyItemsByCategory("web")

  return (
    <div className="min-h-screen pt-[100px]">
      <NavigationClient />
      <CaseStudyHero
        title="Web"
        titleItalic="case studies"
        eyebrow="Web Development&nbsp;&nbsp;&middot;&nbsp;&nbsp;Modern Platforms"
        description="Real-world web platforms engineered for performance, scalability, and measurable business growth. Explore how we build digital experiences that drive results."
        heroStat="+210%"
        heroStatLabel="online bookings for Auto Repair Pro"
        projectCount={40}
      />
      <CaseStudyGridNew
        items={webCaseStudies}
        sectionTitle="Web development projects"
        sectionSubtitle="Enterprise platforms, SaaS apps, and marketing websites delivering real business outcomes."
      />
      <CaseStudyProofCTA
        challengeText="Need a web platform that actually moves the numbers?"
        solutionText="Every project above started with a free consultation. We scope, build, and deliver — then show you the metrics that matter."
        accentColor="#1852FF"
        quote="Our online bookings jumped 210% in the first quarter. The ROI paid for the project in 6 weeks."
        quoteName="Auto Repair Pro"
        quoteRole="Service Business · United States"
      />
      <LightContactSection />
      <LightFAQExact faqs={webFAQs} />
      <Footer />
    </div>
  )
}
