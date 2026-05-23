import type { Metadata } from "next";
import NavigationClient from "@/components/sections/navigation-client"
import Footer from "@/components/sections/footer"
import LightContactSection from "@/components/qc/homepage-light/LightContactSection"
import LightFAQExact from "@/components/homepage-light/LightFAQExact"
import CaseStudyHero from "../CaseStudyHero"
import CaseStudyGridNew from "../CaseStudyGrid"
import type { CaseStudyItem } from "../CaseStudyGrid"
import CaseStudyProofCTA from "../CaseStudyProofCTA"

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

const PP_CASE_STUDIES: CaseStudyItem[] = [
  {
    title: "Barcode Scanner App",
    description: "Power Apps barcode scanner for inventory and asset management with SharePoint integration — reduced manual data entry 85% and inventory errors by 72%.",
    href: "/pdf/Barcode Scanner App.pdf",
    category: "Power Apps",
    image: "/images/case-study/power-apps/barcode.png",
    industry: "Inventory & Logistics",
    metrics: [{ label: "Manual Entry Reduced", value: "-85%" }, { label: "Inventory Errors", value: "-72%" }],
  },
  {
    title: "ES Speaks & Travel Requests",
    description: "Internal communication and travel request platform with Teams integration — cut approval cycle from 3 days to 4 hours and eliminated paper-based processes.",
    href: "/pdf/ES Speaks and Travel Requests Management System.pdf",
    category: "Power Platform",
    image: "/images/case-study/power-apps/travel.jpg",
    industry: "Corporate Operations",
    metrics: [{ label: "Approval Cycle", value: "3d → 4hr" }, { label: "Paper Processes", value: "Eliminated" }],
  },
  {
    title: "New Store Opening Process",
    description: "Centralized store setup management with task assignments and approval workflows — reduced store launch time by 40% and coordination errors by 90%.",
    href: "/pdf/New Store Opening Process.pdf",
    category: "Power Platform",
    image: "/images/case-study/power-apps/store.png",
    industry: "Retail Operations",
    metrics: [{ label: "Launch Time", value: "-40%" }, { label: "Coordination Errors", value: "-90%" }],
  },
  {
    title: "Employee Details Tracking System",
    description: "Centralized employee management with org hierarchy and reporting — saved 12 hours per week in HR admin and reduced data discrepancies by 95%.",
    href: "/pdf/power-platform/Employee-Details-Tracking-System.pdf",
    category: "Power Apps",
    image: "/images/case-study/power-apps/emp.jpg",
    industry: "Human Resources",
    metrics: [{ label: "HR Admin Time", value: "-12hrs/wk" }, { label: "Data Discrepancies", value: "-95%" }],
  },
  {
    title: "Health Plan Selector Mobile App",
    description: "Mobile-first app enabling employees to compare and select health plans by eligibility — reduced HR support calls by 68% and improved enrollment completion by 44%.",
    href: "/pdf/power-platform/Health-Plan-Selector.pdf",
    category: "Power Apps",
    image: "/images/case-study/power-apps/health.jpg",
    industry: "Healthcare Benefits",
    metrics: [{ label: "HR Support Calls", value: "-68%" }, { label: "Enrollment Completion", value: "+44%" }],
  },
  {
    title: "Projects Portfolio Management",
    description: "Dataverse-based portfolio tracker for projects and KPIs — gave leadership real-time visibility across 50+ projects and reduced reporting time by 75%.",
    href: "/pdf/power-platform/Projects-Portfolio-Management.pdf",
    category: "Power Apps",
    image: "/images/case-study/power-apps/projectm.avif",
    industry: "Project Management",
    metrics: [{ label: "Projects Tracked", value: "50+" }, { label: "Reporting Time", value: "-75%" }],
  },
  {
    title: "Students Portal Mobile App",
    description: "Student portal centralizing academic info and attendance — improved student engagement by 52% and reduced admin queries to institution staff by 60%.",
    href: "/pdf/power-platform/Students-Portal-Mobile-App.pdf",
    category: "Power Apps",
    image: "/images/case-study/power-apps/student.avif",
    industry: "Education",
    metrics: [{ label: "Student Engagement", value: "+52%" }, { label: "Admin Queries", value: "-60%" }],
  },
  {
    title: "Ticket Generation Mobile App",
    description: "Mobile ticketing for incident logging and resolution monitoring — cut average resolution time by 58% and improved SLA compliance to 99%.",
    href: "/pdf/power-platform/Ticket-Generation-Mobile-App.pdf",
    category: "Power Apps",
    image: "/images/case-study/power-apps/ticket.avif",
    industry: "IT Service Management",
    metrics: [{ label: "Resolution Time", value: "-58%" }, { label: "SLA Compliance", value: "99%" }],
  },
  {
    title: "Interview Management System",
    description: "End-to-end interview automation for scheduling, evaluation, and feedback consolidation — reduced hiring cycle by 35% and eliminated scheduling conflicts entirely.",
    href: "/pdf/power-platform/Interview-Managing-System.pdf",
    category: "Power Apps",
    image: "/images/case-study/power-apps/interview.avif",
    industry: "Human Resources",
    metrics: [{ label: "Hiring Cycle", value: "-35%" }, { label: "Scheduling Conflicts", value: "0" }],
  },
]

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
export default function PowerAppsCaseStudiesPage() {
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
        items={PP_CASE_STUDIES}
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
