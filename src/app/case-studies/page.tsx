import { client } from "@/sanity/client"
import { groq } from "next-sanity"
import type { Metadata } from "next"
import NavigationClient from "@/components/sections/navigation-client"
import Footer from "@/components/sections/footer"
import CaseStudyHero from "./CaseStudyHero"
import CaseStudiesGrid from "./CaseStudiesGrid"
import LightContactSection from "@/components/qc/homepage-light/LightContactSection"
import LightFAQExact from "@/components/homepage-light/LightFAQExact"

const caseStudiesQuery = groq`
  *[_type == "caseStudy"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    category,
    industry,
    client,
    mainImage { asset->{ url }, alt },
    technologies,
    metrics,
    publishedAt
  }
`

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
    title: "Case Studies | Softree Technology",
    description:
        "Explore real-world case studies showcasing how Softree Technology delivers AI, Power Platform, SharePoint, and web solutions that drive measurable business results.",
    alternates: {
        canonical: "https://www.softreetechnology.com/case-studies",
    },
}

const caseStudyFAQs = [
    {
        id: 1,
        serial: "question 01",
        question: "What types of case studies do you have?",
        answer:
            "We showcase projects across AI & Machine Learning, Power Platform, SharePoint, Web Development, Mobile Apps, and Data Analytics. Each case study includes the challenge, our approach, technologies used, and measurable outcomes.",
    },
    {
        id: 2,
        serial: "question 02",
        question: "Can you build a similar solution for my business?",
        answer:
            "Yes. Every case study represents a repeatable pattern we've refined across multiple clients. Contact us with your requirements and we'll provide a tailored proposal based on our proven expertise in that domain.",
    },
    {
        id: 3,
        serial: "question 03",
        question: "How do you measure project success?",
        answer:
            "We define success metrics upfront with each client — revenue lift, cost reduction, efficiency gains, user adoption rates. Our case studies include quantitative outcomes so you can evaluate real impact.",
    },
    {
        id: 4,
        serial: "question 04",
        question: "Are these real client projects?",
        answer:
            "Yes, every case study is a real delivered project. Some clients prefer anonymity, so we use descriptive labels like 'Fortune 500 Retailer' while still sharing the full technical approach and results.",
    },
    {
        id: 5,
        serial: "question 05",
        question: "How long do your projects typically take?",
        answer:
            "Timelines vary by scope: Power Apps MVPs ship in 6 weeks, web app MVPs in 12 weeks, and enterprise AI solutions in 10-16 weeks. Each case study includes the actual delivery timeline.",
    },
]

export default async function CaseStudiesPage() {
    const caseStudies = await client.fetch(caseStudiesQuery)

    return (
        <div className="min-h-screen pt-[100px]">
            <NavigationClient />

            <CaseStudyHero
                title="Case"
                titleItalic="studies"
                eyebrow="Real Projects&nbsp;&nbsp;&middot;&nbsp;&nbsp;Measurable Results"
                description="Explore how we've helped businesses transform with AI, Power Platform, SharePoint, and modern web development — with quantifiable outcomes."
                accentColor="#1852FF"
                heroStat="200+"
                heroStatLabel="projects delivered across industries"
                projectCount={200}
            />

            <CaseStudiesGrid caseStudies={caseStudies} />

            <LightContactSection />
            <LightFAQExact faqs={caseStudyFAQs} />
            <Footer />
        </div>
    )
}
