import type { Metadata } from "next";
import NavigationClient from "@/components/sections/navigation-client"
import Footer from "@/components/sections/footer"
import LightContactSection from "@/components/qc/homepage-light/LightContactSection"
import LightFAQExact from "@/components/homepage-light/LightFAQExact"
import CaseStudyHero from "./CaseStudyHero"
import CaseStudyGridNew from "./CaseStudyGrid"
import type { CaseStudyItem } from "./CaseStudyGrid"
import CaseStudyProofCTA from "./CaseStudyProofCTA"

export const metadata: Metadata = {
  title: "Case Studies | Softree Technology",
  description:
    "Explore real-world case studies showcasing how Softree Technology delivers AI, Power Platform, SharePoint, and web solutions that drive measurable business results.",
  alternates: {
    canonical: "https://www.softreetechnology.com/case-studies",
  },
  openGraph: {
    title: "Case Studies | Softree Technology",
    description: "Real-world project results — AI, Power Platform, SharePoint, web, and mobile app case studies.",
    url: "https://www.softreetechnology.com/case-studies",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Softree Technology Case Studies" }],
  },
};

const ALL_CASE_STUDIES: CaseStudyItem[] = [
  // ── Web Development ──
  {
    title: "Shopping E-Commerce Platform",
    description: "Scalable e-commerce platform — advanced product management, secure payments, and optimized checkout that lifted conversions by 38%.",
    href: "/pdf/web/ShoppingEcommerce.pdf",
    category: "Web",
    image: "/images/case-study/web/shopping.png",
    industry: "E-Commerce · Retail & E-Commerce",
    metrics: [{ label: "Conversion Lift", value: "+38%" }, { label: "Revenue Growth", value: "$1.2M" }],
  },
  {
    title: "Pet Care Management Platform",
    description: "Online booking and client management system that increased appointment efficiency 65% and improved retention by 29%.",
    href: "/pdf/web/PET_CARE.pdf",
    category: "Web",
    image: "/images/case-study/web/pet.png",
    industry: "Pet Services · Business Platform",
    metrics: [{ label: "Booking Efficiency", value: "+65%" }, { label: "Retention", value: "+29%" }],
  },
  {
    title: "Business Consultation Platform",
    description: "Client onboarding and scheduling platform that cut onboarding time by 70% and saved $85K in operational costs.",
    href: "/pdf/web/Business-Consultation-App-case-study-1.pdf",
    category: "Web",
    image: "/images/case-study/web/business.avif",
    industry: "Professional Services · Enterprise",
    metrics: [{ label: "Onboarding Time", value: "-70%" }, { label: "Cost Saved", value: "$85K" }],
  },
  {
    title: "Public Blogging Website (MERN Stack)",
    description: "Full-stack blogging platform with content publishing and role-based auth — grew SEO traffic 85% and active users 120%.",
    href: "/pdf/web/Public-Blogging-Website-MERN.pdf",
    category: "Web",
    image: "/images/case-study/web/blog.png",
    industry: "Media & Publishing · Web App",
    metrics: [{ label: "SEO Traffic", value: "+85%" }, { label: "Active Users", value: "+120%" }],
  },
  {
    title: "Food & Wine Website",
    description: "Immersive marketing website for food and beverage brands — boosted engagement 92% and reduced bounce rate by 48%.",
    href: "/pdf/web/FOOD-WINE-WEBSITE.pdf",
    category: "Web",
    image: "/images/case-study/web/food.png",
    industry: "Food & Beverage · Marketing",
    metrics: [{ label: "Engagement", value: "+92%" }, { label: "Bounce Rate", value: "-48%" }],
  },
  {
    title: "Auto Repair Pro Website",
    description: "Service website for automotive repair with online booking and local SEO — online bookings jumped 210% and reached local top 3 ranking.",
    href: "/pdf/web/AUTOREPAIR-PRO.pdf",
    category: "Web",
    image: "/images/case-study/web/auto.avif",
    industry: "Automotive Services · Service Website",
    metrics: [{ label: "Online Bookings", value: "+210%" }, { label: "Local Rank", value: "Top 3" }],
  },
  {
    title: "EdTech Management Information System",
    description: "Education management platform for student records and admin workflows — saved 30 admin hours per week at 99.8% data accuracy.",
    href: "/pdf/web/EdTech-Management-Information-System.pdf",
    category: "Web",
    image: "/images/case-study/web/edtech.avif",
    industry: "Education Technology · Education",
    metrics: [{ label: "Admin Time Saved", value: "30hrs/wk" }, { label: "Data Accuracy", value: "99.8%" }],
  },
  {
    title: "Noteved Admin Dashboard",
    description: "Powerful admin dashboard for educational content and analytics — under 1.2s load time and 4x content output improvement.",
    href: "/pdf/web/NotevedAdmin.pdf",
    category: "Web",
    image: "/images/case-study/web/noteved.png",
    industry: "EdTech Platform · Dashboard",
    metrics: [{ label: "Load Time", value: "<1.2s" }, { label: "Content Output", value: "+4x" }],
  },
  {
    title: "Wellkies Admin Website",
    description: "Healthcare administration portal for clinics and appointments — improved operational efficiency 55% and reduced errors by 91%.",
    href: "/pdf/web/Wellkies-Admin-Website.pdf",
    category: "Web",
    image: "/images/case-study/web/admin.png",
    industry: "Healthcare Administration · Healthcare",
    metrics: [{ label: "Ops Efficiency", value: "+55%" }, { label: "Errors Reduced", value: "91%" }],
  },

  // ── Artificial Intelligence ──
  {
    title: "AI-Powered E-Commerce Recommendation Engine",
    description: "ML-driven recommendation system that personalizes product discovery and lifted conversion rates by 28% and average order value by $42.",
    href: "/pdf/web/ShoppingEcommerce.pdf",
    category: "AI",
    image: "/images/case-study/web/shopping.png",
    industry: "Retail & E-Commerce · AI Recommendation",
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
    href: "/pdf/web/PET_CARE.pdf",
    category: "AI",
    image: "/images/case-study/web/business.avif",
    industry: "Customer Service · Generative AI",
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
    href: "/pdf/web/Business-Consultation-App-case-study-1.pdf",
    category: "AI",
    image: "/images/case-study/web/noteved.png",
    industry: "Enterprise Analytics · Enterprise AI",
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
    href: "/pdf/web/Public-Blogging-Website-MERN.pdf",
    category: "AI",
    image: "/images/case-study/web/blog.png",
    industry: "Knowledge Management · RAG & LLM",
    metrics: [{ label: "Search Time Reduced", value: "-74%" }, { label: "Query Accuracy", value: "96%" }],
  },
  {
    title: "AI Marketing Intelligence Platform",
    description: "AI that analyzes customer behavior and auto-optimizes campaigns — delivered $2.3M campaign ROI and cut CPC by 56%.",
    href: "/pdf/web/FOOD-WINE-WEBSITE.pdf",
    category: "AI",
    image: "/images/case-study/web/food.png",
    industry: "Marketing & AdTech · AI Analytics",
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
    href: "/pdf/web/AUTOREPAIR-PRO.pdf",
    category: "AI",
    image: "/images/case-study/web/auto.avif",
    industry: "Industrial / Manufacturing · Machine Learning",
    metrics: [{ label: "Downtime Reduced", value: "-68%" }, { label: "Maintenance Cost", value: "-41%" }],
  },
  {
    title: "AI-Driven Education Intelligence Platform",
    description: "AI education platform with performance analytics and adaptive learning — improved student outcomes by 38% and instructor efficiency by 52%.",
    href: "/pdf/web/EdTech-Management-Information-System.pdf",
    category: "AI",
    image: "/images/case-study/web/edtech.avif",
    industry: "Education Technology · AI for Education",
    metrics: [{ label: "Student Outcomes", value: "+38%" }, { label: "Instructor Efficiency", value: "+52%" }],
  },
  {
    title: "AI Operations & Monitoring Dashboard",
    description: "Centralized dashboard for monitoring AI models and pipelines in production, with real-time alerting cutting incident response by 80%.",
    href: "/pdf/web/NotevedAdmin.pdf",
    category: "AI",
    image: "/images/case-study/web/admin.png",
    industry: "MLOps & DevOps · AI Ops",
    metrics: [{ label: "Incident Response", value: "-80%" }, { label: "Model Uptime", value: "99.9%" }],
  },
  {
    title: "Healthcare AI Appointment Intelligence",
    description: "AI scheduling that predicts no-shows and optimizes availability — cut no-shows by 62% and recovered $890K in lost revenue.",
    href: "/pdf/web/LIVE-appointment-bookings.pdf",
    category: "AI",
    image: "/images/case-study/web/appointment.avif",
    industry: "Healthcare · Healthcare AI",
    locked: true,
    teaserMetrics: [
      { label: "No-show reduction", value: "-62%", isBlurred: true },
      { label: "Utilization up", value: "+41%", isBlurred: true },
      { label: "Revenue recovered", value: "$890K", isBlurred: true },
    ],
  },

  // ── SharePoint & SPFx ──
  {
    title: "Custom Copy & Move Panel for SharePoint Lists",
    description: "SPFx solution with Fluent UI for seamless copy and move operations — reduced list management time by 78% and eliminated manual copy errors.",
    href: "/pdf/sharepoint/Custom-Copy-Move-Panel-SPFx.pdf",
    category: "SharePoint",
    image: "/images/case-study/mobile/education.png",
    industry: "Intranet & Collaboration · SPFx Extension",
    metrics: [{ label: "Task Time Saved", value: "-78%" }, { label: "Copy Errors", value: "0" }],
  },
  {
    title: "SharePoint Library Folders with Power Apps",
    description: "Power Apps solution for managing SharePoint document library folders — cut folder setup time from 20 minutes to under 2 minutes.",
    href: "/pdf/sharepoint/Managing-SharePoint-Folders-PowerApps.pdf",
    category: "SharePoint",
    image: "/images/case-study/power-apps/automated.jpg",
    industry: "Document Management · Power Apps + SharePoint",
    metrics: [{ label: "Folder Setup Time", value: "20min → 2min" }, { label: "User Adoption", value: "100%" }],
  },
  {
    title: "Dynamic Navigation Bar Using SPFx",
    description: "SPFx Application Customizer delivering role-based navigation across SharePoint — improved site findability by 65% and reduced support tickets by 40%.",
    href: "/pdf/sharepoint/Dynamic-Navigation-Bar-SPFx.pdf",
    category: "SharePoint",
    image: "/images/case-study/mobile/education.png",
    industry: "Intranet Design · SPFx Customizer",
    metrics: [{ label: "Findability", value: "+65%" }, { label: "Support Tickets", value: "-40%" }],
  },
  {
    title: "Custom Footer for SharePoint Online",
    description: "Reusable SPFx footer enhancing branding and accessibility across all SharePoint pages — deployed site-wide in under 2 hours with zero re-training.",
    href: "/pdf/sharepoint/Custom-Footer-SPFx.pdf",
    category: "SharePoint",
    image: "/images/case-study/mobile/education.png",
    industry: "Corporate Intranet · SPFx UI",
    metrics: [{ label: "Deploy Time", value: "<2hrs" }, { label: "Re-training", value: "0" }],
  },
  {
    title: "Global Notification Banner",
    description: "SharePoint-wide notification banner via SPFx Application Customizer — critical alerts now reach 100% of users within seconds, replacing email chains.",
    href: "/pdf/sharepoint/Global-Notification-Banner-SPFx.pdf",
    category: "SharePoint",
    image: "/images/case-study/mobile/education.png",
    industry: "Internal Communications · SPFx Customizer",
    metrics: [{ label: "Alert Reach", value: "100%" }, { label: "Email Chains Replaced", value: "Yes" }],
  },
  {
    title: "Browse Documents Panel",
    description: "Custom SPFx panel for browsing documents in SharePoint libraries without context switching — reduced document retrieval time by 60%.",
    href: "/pdf/sharepoint/Browse-Documents-Panel-SPFx.pdf",
    category: "SharePoint",
    image: "/images/case-study/mobile/education.png",
    industry: "Document Management · SPFx Web Part",
    metrics: [{ label: "Retrieval Time", value: "-60%" }, { label: "Context Switches", value: "Eliminated" }],
  },
  {
    title: "Parent Panel for List & Library Creation",
    description: "Guided SPFx panel for creating SharePoint lists or libraries with governance standards — ensured 100% governance compliance across new sites.",
    href: "/pdf/sharepoint/Parent-Panel-List-Library-Creation.pdf",
    category: "SharePoint",
    image: "/images/case-study/mobile/education.png",
    industry: "Governance & Compliance · SPFx Web Part",
    metrics: [{ label: "Governance Compliance", value: "100%" }, { label: "Setup Errors", value: "0" }],
  },
  {
    title: "Custom Command Extension",
    description: "SharePoint command extension adding contextual toolbar actions — reduced multi-step operations to single clicks, saving 8 hours per user per month.",
    href: "/pdf/sharepoint/Custom-Command-Extension-SPFx.pdf",
    category: "SharePoint",
    image: "/images/case-study/mobile/education.png",
    industry: "Productivity Tools · SPFx Command",
    metrics: [{ label: "Time Saved", value: "8hrs/user/mo" }, { label: "Clicks Reduced", value: "1-click" }],
  },

  // ── Mobile Applications ──
  {
    title: "Doctor Appointment Booking System",
    description: "Healthcare mobile app enabling patients to book appointments with real-time notifications — reduced no-shows by 54% and cut booking time by 80%.",
    href: "/pdf/mobile/Doctor-Appointment-Booking.pdf",
    category: "Mobile",
    image: "/images/case-study/mobile/appointment.avif",
    industry: "Healthcare · iOS & Android App",
    metrics: [{ label: "No-show Rate", value: "-54%" }, { label: "Booking Time", value: "-80%" }],
  },
  {
    title: "Education App Backend",
    description: "Scalable backend powering mobile education platforms with RESTful APIs and real-time data sync — supporting 10,000+ concurrent users at 99.9% uptime.",
    href: "/pdf/mobile/Education-App-Backend.pdf",
    category: "Mobile",
    image: "/images/case-study/mobile/education.avif",
    industry: "Education Technology · Backend Systems",
    metrics: [{ label: "Concurrent Users", value: "10K+" }, { label: "Uptime", value: "99.9%" }],
  },
  {
    title: "Movie Ticket Booking App",
    description: "High-performance ticket booking app with seat selection and real-time availability — processed 50K+ bookings in launch month with zero payment failures.",
    href: "/pdf/mobile/Movie-Ticket-Booking-App.pdf",
    category: "Mobile",
    image: "/images/case-study/mobile/movie.png",
    industry: "Entertainment · Entertainment App",
    metrics: [{ label: "Launch Month Bookings", value: "50K+" }, { label: "Payment Failures", value: "0" }],
  },
  {
    title: "Payment Gateway Integration",
    description: "Secure multi-payment gateway enabling encrypted transactions across mobile platforms — reduced payment friction 62% and chargebacks by 91%.",
    href: "/pdf/mobile/Payment-Gateway-Integration.pdf",
    category: "Mobile",
    image: "/images/case-study/mobile/payment.avif",
    industry: "Financial Technology · Fintech",
    metrics: [{ label: "Payment Friction", value: "-62%" }, { label: "Chargebacks", value: "-91%" }],
  },
  {
    title: "Education Mobile App",
    description: "Student-centric app providing courses, assessments, and progress tracking — improved course completion rates by 47% and daily active users by 3x.",
    href: "/pdf/mobile/Education-Mobile-App.pdf",
    category: "Mobile",
    image: "/images/case-study/mobile/school.avif",
    industry: "E-Learning · Education App",
    metrics: [{ label: "Course Completion", value: "+47%" }, { label: "Daily Active Users", value: "+3x" }],
  },
  {
    title: "Resort Management App",
    description: "Hospitality mobile solution for reservations and guest check-ins — cut front-desk wait time by 70% and lifted guest satisfaction scores by 34%.",
    href: "/pdf/mobile/Resort-Management-App.pdf",
    category: "Mobile",
    image: "/images/case-study/mobile/resort.avif",
    industry: "Hospitality · Resort App",
    metrics: [{ label: "Wait Time", value: "-70%" }, { label: "Guest Satisfaction", value: "+34%" }],
  },
  {
    title: "Room Rental App",
    description: "Real estate rental platform enabling property search and booking — grew listings by 120% and reduced time-to-booking by 65%.",
    href: "/pdf/mobile/Homi-Room-Rental-App.pdf",
    category: "Mobile",
    image: "/images/case-study/mobile/room.avif",
    industry: "Real Estate · Rental App",
    metrics: [{ label: "Listings Growth", value: "+120%" }, { label: "Time-to-Booking", value: "-65%" }],
  },
  {
    title: "Wellkies — Doctors App",
    description: "Healthcare app empowering doctors to manage appointments and digital consultations — reduced admin overhead 55% and improved consultation efficiency by 40%.",
    href: "/pdf/mobile/Wellkies-Doctors-App.pdf",
    category: "Mobile",
    image: "/images/case-study/mobile/doctor.jpg",
    industry: "Healthcare · Doctor Portal",
    metrics: [{ label: "Admin Overhead", value: "-55%" }, { label: "Consultation Efficiency", value: "+40%" }],
  },
  {
    title: "Wellkies — Clinic App",
    description: "Clinic management app optimizing patient handling, scheduling, and billing — reduced operational errors by 88% and billing cycle time by 3 days.",
    href: "/pdf/mobile/Wellkies-Clinic-App.pdf",
    category: "Mobile",
    image: "/images/case-study/mobile/clinic.png",
    industry: "Healthcare Administration · Clinic App",
    metrics: [{ label: "Operational Errors", value: "-88%" }, { label: "Billing Cycle", value: "-3 days" }],
  },

  // ── Power Platform ──
  {
    title: "Barcode Scanner App",
    description: "Power Apps barcode scanner for inventory and asset management with SharePoint integration — reduced manual data entry 85% and inventory errors by 72%.",
    href: "/pdf/Barcode Scanner App.pdf",
    category: "Power Platform",
    image: "/images/case-study/power-apps/barcode.png",
    industry: "Inventory & Logistics · Power Apps",
    metrics: [{ label: "Manual Entry Reduced", value: "-85%" }, { label: "Inventory Errors", value: "-72%" }],
  },
  {
    title: "ES Speaks & Travel Requests",
    description: "Internal communication and travel request platform with Teams integration — cut approval cycle from 3 days to 4 hours and eliminated paper-based processes.",
    href: "/pdf/ES Speaks and Travel Requests Management System.pdf",
    category: "Power Platform",
    image: "/images/case-study/power-apps/travel.jpg",
    industry: "Corporate Operations · Power Platform",
    metrics: [{ label: "Approval Cycle", value: "3d → 4hr" }, { label: "Paper Processes", value: "Eliminated" }],
  },
  {
    title: "New Store Opening Process",
    description: "Centralized store setup management with task assignments and approval workflows — reduced store launch time by 40% and coordination errors by 90%.",
    href: "/pdf/New Store Opening Process.pdf",
    category: "Power Platform",
    image: "/images/case-study/power-apps/store.png",
    industry: "Retail Operations · Power Platform",
    metrics: [{ label: "Launch Time", value: "-40%" }, { label: "Coordination Errors", value: "-90%" }],
  },
  {
    title: "Employee Details Tracking System",
    description: "Centralized employee management with org hierarchy and reporting — saved 12 hours per week in HR admin and reduced data discrepancies by 95%.",
    href: "/pdf/power-platform/Employee-Details-Tracking-System.pdf",
    category: "Power Platform",
    image: "/images/case-study/power-apps/emp.jpg",
    industry: "Human Resources · Power Apps",
    metrics: [{ label: "HR Admin Time", value: "-12hrs/wk" }, { label: "Data Discrepancies", value: "-95%" }],
  },
  {
    title: "Health Plan Selector Mobile App",
    description: "Mobile-first app enabling employees to compare and select health plans by eligibility — reduced HR support calls by 68% and improved enrollment completion by 44%.",
    href: "/pdf/power-platform/Health-Plan-Selector.pdf",
    category: "Power Platform",
    image: "/images/case-study/power-apps/health.jpg",
    industry: "Healthcare Benefits · Power Apps",
    metrics: [{ label: "HR Support Calls", value: "-68%" }, { label: "Enrollment Completion", value: "+44%" }],
  },
  {
    title: "Projects Portfolio Management",
    description: "Dataverse-based portfolio tracker for projects and KPIs — gave leadership real-time visibility across 50+ projects and reduced reporting time by 75%.",
    href: "/pdf/power-platform/Projects-Portfolio-Management.pdf",
    category: "Power Platform",
    image: "/images/case-study/power-apps/projectm.avif",
    industry: "Project Management · Power Apps",
    metrics: [{ label: "Projects Tracked", value: "50+" }, { label: "Reporting Time", value: "-75%" }],
  },
  {
    title: "Students Portal Mobile App",
    description: "Student portal centralizing academic info and attendance — improved student engagement by 52% and reduced admin queries to institution staff by 60%.",
    href: "/pdf/power-platform/Students-Portal-Mobile-App.pdf",
    category: "Power Platform",
    image: "/images/case-study/power-apps/student.avif",
    industry: "Education · Power Apps",
    metrics: [{ label: "Student Engagement", value: "+52%" }, { label: "Admin Queries", value: "-60%" }],
  },
  {
    title: "Ticket Generation Mobile App",
    description: "Mobile ticketing for incident logging and resolution monitoring — cut average resolution time by 58% and improved SLA compliance to 99%.",
    href: "/pdf/power-platform/Ticket-Generation-Mobile-App.pdf",
    category: "Power Platform",
    image: "/images/case-study/power-apps/ticket.avif",
    industry: "IT Service Management · Power Apps",
    metrics: [{ label: "Resolution Time", value: "-58%" }, { label: "SLA Compliance", value: "99%" }],
  },
  {
    title: "Interview Management System",
    description: "End-to-end interview automation for scheduling, evaluation, and feedback consolidation — reduced hiring cycle by 35% and eliminated scheduling conflicts entirely.",
    href: "/pdf/power-platform/Interview-Managing-System.pdf",
    category: "Power Platform",
    image: "/images/case-study/power-apps/interview.avif",
    industry: "Human Resources · Power Apps",
    metrics: [{ label: "Hiring Cycle", value: "-35%" }, { label: "Scheduling Conflicts", value: "0" }],
  },
];

const generalFAQs = [
  { id: 1, serial: "question 01", question: "What types of case studies do you feature?", answer: "Our case studies showcase enterprise solutions across AI, Microsoft Power Platform, SharePoint Online, modern Web platforms, and Mobile applications. Each study outlines the business challenge, our technical approach, and quantitative ROI results." },
  { id: 2, serial: "question 02", question: "How do you measure success and ROI in these projects?", answer: "We measure success through concrete metrics such as manual hours eliminated, operational cost savings, conversion rate lifts, and system response improvements. Our outcomes are verified directly by our enterprise clients." },
  { id: 3, serial: "question 03", question: "Are the technical details in the case studies customizable for my business?", answer: "Absolutely. The solutions featured are custom-engineered for specific client needs. We can implement similar architectures (such as SPFx extensions, RAG AI systems, or low-code Power Platform apps) tailored precisely to your operational workflows." },
  { id: 4, serial: "question 04", question: "How can I access the full PDF version of a locked case study?", answer: "Simply enter your work email in the unlock form. The full PDF report—including complete architectural breakdowns and detailed ROI analyses—will be sent directly to your inbox instantly." },
  { id: 5, serial: "question 05", question: "What is the typical delivery timeline for solutions like these?", answer: "Timelines vary by scope: Power Platform and SPFx solutions can often be deployed in 2-4 weeks, while complex full-stack web applications and custom AI integrations typically take 8-12 weeks from discovery to launch." },
];

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen pt-[100px]">
      <NavigationClient />
      <CaseStudyHero
        title="Case"
        titleItalic="studies"
        eyebrow="Softree Technology&nbsp;&nbsp;&middot;&nbsp;&nbsp;Proven ROI"
        description="Real-world success stories across Web, AI, SharePoint, Mobile, and Power Platform development. Explore how we design, build, and deliver high-impact enterprise solutions."
        accentColor="#FF7A2F"
        heroStat="100%"
        heroStatLabel="On-time delivery and verified quantitative client ROI"
        projectCount={150}
      />
      <CaseStudyGridNew
        items={ALL_CASE_STUDIES}
        sectionTitle="Proven business outcomes"
        sectionSubtitle="Browse and filter our case studies to see how we help clients optimize operations, scale platforms, and embed intelligence."
        accentColor="#FF7A2F"
        filterLabels={["Web", "AI", "SharePoint", "Mobile", "Power Platform"]}
      />
      <CaseStudyProofCTA
        challengeText="Ready to transform your business operations and see similar results?"
        solutionText="Our enterprise development experts work with your team to scope, design, and deliver bespoke high-impact solutions with verified ROI."
        accentColor="#FF7A2F"
        quote="Softree is a world-class engineering partner. They took our legacy workflows and completely modernized them with zero business disruption."
        quoteName="Director of Engineering"
        quoteRole="Enterprise Client · USA"
      />
      <LightContactSection />
      <LightFAQExact faqs={generalFAQs} />
      <Footer />
    </div>
  );
}
