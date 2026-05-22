import NavigationClient from "@/components/sections/navigation-client"
import Footer from "@/components/sections/footer"
import LightContactSection from "@/components/qc/homepage-light/LightContactSection"
import LightFAQExact from "@/components/homepage-light/LightFAQExact"
import CaseStudyHero from "../CaseStudyHero"
import CaseStudyGridNew from "../CaseStudyGrid"
import type { CaseStudyItem } from "../CaseStudyGrid"
import CaseStudyProofCTA from "../CaseStudyProofCTA"

const AI_CASE_STUDIES: CaseStudyItem[] = [
  {
    title: "AI-Powered E-Commerce Recommendation Engine",
    description: "ML-driven recommendation system that personalizes product discovery and lifted conversion rates by 28% and average order value by $42.",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/ShoppingEcommerce.pdf",
    category: "AI Recommendation",
    image: "/images/case-study/web/shopping.png",
    industry: "Retail & E-Commerce",
    locked: true,
    teaserMetrics: [
      { label: "Revenue lift", value: "34%", isBlurred: true },
      { label: "Conversion boost", value: "28%", isBlurred: true },
      { label: "Avg order value", value: "+$42", isBlurred: true },
    ],
  },
  {
    title: "AI-Based Customer Support Automation",
    description: "LLM-powered chatbot and automated ticket routing that cut support costs 47% and response time by 89%.",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/PET_CARE.pdf",
    category: "Generative AI",
    image: "/images/case-study/web/business.avif",
    industry: "Customer Service",
    locked: true,
    teaserMetrics: [
      { label: "Cost reduction", value: "47%", isBlurred: true },
      { label: "Response time", value: "-89%", isBlurred: true },
      { label: "CSAT score", value: "4.8/5", isBlurred: true },
    ],
  },
  {
    title: "Enterprise AI Decision Intelligence Platform",
    description: "AI analytics platform delivering predictive insights 10x faster with 93% accuracy, delivering 412% ROI within the first year.",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Business-Consultation-App-case-study-1.pdf",
    category: "Enterprise AI",
    image: "/images/case-study/web/noteved.png",
    industry: "Enterprise Analytics",
    locked: true,
    teaserMetrics: [
      { label: "Decision speed", value: "10x", isBlurred: true },
      { label: "Accuracy gain", value: "93%", isBlurred: true },
      { label: "ROI achieved", value: "412%", isBlurred: true },
    ],
  },
  {
    title: "AI Knowledge Assistant (RAG Architecture)",
    description: "Retrieval-augmented generation system enabling natural-language search across enterprise knowledge bases, reducing search time by 74%.",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Public-Blogging-Website-Using-the-MERN-Stack.pdf",
    category: "RAG & LLM",
    image: "/images/case-study/web/blog.png",
    industry: "Knowledge Management",
    metrics: [{ label: "Search Time Reduced", value: "-74%" }, { label: "Query Accuracy", value: "96%" }],
  },
  {
    title: "AI Marketing Intelligence Platform",
    description: "AI that analyzes customer behavior and auto-optimizes campaigns — delivered $2.3M campaign ROI and cut CPC by 56%.",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/FOOD-WINE-WEBSITE.pdf",
    category: "AI Analytics",
    image: "/images/case-study/web/food.png",
    industry: "Marketing & AdTech",
    locked: true,
    teaserMetrics: [
      { label: "Campaign ROI", value: "$2.3M", isBlurred: true },
      { label: "CPC reduction", value: "-56%", isBlurred: true },
      { label: "Lead quality", value: "+78%", isBlurred: true },
    ],
  },
  {
    title: "Predictive Maintenance AI System",
    description: "ML solution predicting equipment failures before they happen, reducing industrial downtime by 68% and maintenance costs by 41%.",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/AUTOREPAIR-PRO.pdf",
    category: "Machine Learning",
    image: "/images/case-study/web/auto.avif",
    industry: "Industrial / Manufacturing",
    metrics: [{ label: "Downtime Reduced", value: "-68%" }, { label: "Maintenance Cost", value: "-41%" }],
  },
  {
    title: "AI-Driven Education Intelligence Platform",
    description: "AI education platform with performance analytics and adaptive learning — improved student outcomes by 38% and instructor efficiency by 52%.",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/EdTech-Management-Information-System-.pdf",
    category: "AI for Education",
    image: "/images/case-study/web/edtech.avif",
    industry: "Education Technology",
    metrics: [{ label: "Student Outcomes", value: "+38%" }, { label: "Instructor Efficiency", value: "+52%" }],
  },
  {
    title: "AI Operations & Monitoring Dashboard",
    description: "Centralized dashboard for monitoring AI models and pipelines in production, with real-time alerting cutting incident response by 80%.",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/NotevedAdmin.docx.pdf",
    category: "AI Ops",
    image: "/images/case-study/web/admin.png",
    industry: "MLOps & DevOps",
    metrics: [{ label: "Incident Response", value: "-80%" }, { label: "Model Uptime", value: "99.9%" }],
  },
  {
    title: "Healthcare AI Appointment Intelligence",
    description: "AI scheduling that predicts no-shows and optimizes availability — cut no-shows by 62% and recovered $890K in lost revenue.",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/LIVE-appointment-bookings.docx.pdf",
    category: "Healthcare AI",
    image: "/images/case-study/web/appointment.avif",
    industry: "Healthcare",
    locked: true,
    teaserMetrics: [
      { label: "No-show reduction", value: "-62%", isBlurred: true },
      { label: "Utilization up", value: "+41%", isBlurred: true },
      { label: "Revenue recovered", value: "$890K", isBlurred: true },
    ],
  },
]

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
export default function AICaseStudiesPage() {
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
        items={AI_CASE_STUDIES}
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
