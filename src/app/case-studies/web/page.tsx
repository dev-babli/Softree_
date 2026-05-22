import NavigationClient from "@/components/sections/navigation-client"
import Footer from "@/components/sections/footer"
import LightContactSection from "@/components/qc/homepage-light/LightContactSection"
import LightFAQExact from "@/components/homepage-light/LightFAQExact"
import CaseStudyHero from "../CaseStudyHero"
import CaseStudyGridNew from "../CaseStudyGrid"
import type { CaseStudyItem } from "../CaseStudyGrid"
import CaseStudyProofCTA from "../CaseStudyProofCTA"

const WEB_CASE_STUDIES: CaseStudyItem[] = [
  {
    title: "Shopping E-Commerce Platform",
    description: "Scalable e-commerce platform — advanced product management, secure payments, and optimized checkout that lifted conversions by 38%.",
    href: "/pdf/web/ShoppingEcommerce.pdf",
    category: "E-Commerce",
    image: "/images/case-study/web/shopping.png",
    industry: "Retail & E-Commerce",
    metrics: [{ label: "Conversion Lift", value: "+38%" }, { label: "Revenue Growth", value: "$1.2M" }],
  },
  {
    title: "Pet Care Management Platform",
    description: "Online booking and client management system that increased appointment efficiency 65% and improved retention by 29%.",
    href: "/pdf/web/PET_CARE.pdf",
    category: "Business Platform",
    image: "/images/case-study/web/pet.png",
    industry: "Pet Services",
    metrics: [{ label: "Booking Efficiency", value: "+65%" }, { label: "Retention", value: "+29%" }],
  },
  {
    title: "Business Consultation Platform",
    description: "Client onboarding and scheduling platform that cut onboarding time by 70% and saved $85K in operational costs.",
    href: "/pdf/web/Business-Consultation-App-case-study-1.pdf",
    category: "Enterprise",
    image: "/images/case-study/web/business.avif",
    industry: "Professional Services",
    metrics: [{ label: "Onboarding Time", value: "-70%" }, { label: "Cost Saved", value: "$85K" }],
  },
  {
    title: "Public Blogging Website (MERN Stack)",
    description: "Full-stack blogging platform with content publishing and role-based auth — grew SEO traffic 85% and active users 120%.",
    href: "/pdf/web/Public-Blogging-Website-MERN.pdf",
    category: "Web App",
    image: "/images/case-study/web/blog.png",
    industry: "Media & Publishing",
    metrics: [{ label: "SEO Traffic", value: "+85%" }, { label: "Active Users", value: "+120%" }],
  },
  {
    title: "Food & Wine Website",
    description: "Immersive marketing website for food and beverage brands — boosted engagement 92% and reduced bounce rate by 48%.",
    href: "/pdf/web/FOOD-WINE-WEBSITE.pdf",
    category: "Marketing",
    image: "/images/case-study/web/food.png",
    industry: "Food & Beverage",
    metrics: [{ label: "Engagement", value: "+92%" }, { label: "Bounce Rate", value: "-48%" }],
  },
  {
    title: "Auto Repair Pro Website",
    description: "Service website for automotive repair with online booking and local SEO — online bookings jumped 210% and reached local top 3 ranking.",
    href: "/pdf/web/AUTOREPAIR-PRO.pdf",
    category: "Service Website",
    image: "/images/case-study/web/auto.avif",
    industry: "Automotive Services",
    metrics: [{ label: "Online Bookings", value: "+210%" }, { label: "Local Rank", value: "Top 3" }],
  },
  {
    title: "EdTech Management Information System",
    description: "Education management platform for student records and admin workflows — saved 30 admin hours per week at 99.8% data accuracy.",
    href: "/pdf/web/EdTech-Management-Information-System.pdf",
    category: "Education",
    image: "/images/case-study/web/edtech.avif",
    industry: "Education Technology",
    metrics: [{ label: "Admin Time Saved", value: "30hrs/wk" }, { label: "Data Accuracy", value: "99.8%" }],
  },
  {
    title: "Noteved Admin Dashboard",
    description: "Powerful admin dashboard for educational content and analytics — under 1.2s load time and 4x content output improvement.",
    href: "/pdf/web/NotevedAdmin.pdf",
    category: "Dashboard",
    image: "/images/case-study/web/noteved.png",
    industry: "EdTech Platform",
    metrics: [{ label: "Load Time", value: "<1.2s" }, { label: "Content Output", value: "+4x" }],
  },
  {
    title: "Wellkies Admin Website",
    description: "Healthcare administration portal for clinics and appointments — improved operational efficiency 55% and reduced errors by 91%.",
    href: "/pdf/web/Wellkies-Admin-Website.pdf",
    category: "Healthcare",
    image: "/images/case-study/web/admin.png",
    industry: "Healthcare Administration",
    metrics: [{ label: "Ops Efficiency", value: "+55%" }, { label: "Errors Reduced", value: "91%" }],
  },
]

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
export default function WebCaseStudiesPage() {
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
        items={WEB_CASE_STUDIES}
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
