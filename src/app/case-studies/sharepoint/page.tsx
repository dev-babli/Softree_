import NavigationClient from "@/components/sections/navigation-client"
import Footer from "@/components/sections/footer"
import LightContactSection from "@/components/qc/homepage-light/LightContactSection"
import LightFAQExact from "@/components/homepage-light/LightFAQExact"
import CaseStudyHero from "../CaseStudyHero"
import CaseStudyGridNew from "../CaseStudyGrid"
import type { CaseStudyItem } from "../CaseStudyGrid"
import CaseStudyProofCTA from "../CaseStudyProofCTA"

const SP_CASE_STUDIES: CaseStudyItem[] = [
  {
    title: "Custom Copy & Move Panel for SharePoint Lists",
    description: "SPFx solution with Fluent UI for seamless copy and move operations — reduced list management time by 78% and eliminated manual copy errors.",
    href: "https://www.softreetechnology.com/wp-content/uploads/2025/03/Enhancing-SharePoint-List-Management-with-a-Custom-Copy-Move-Panel-Using-SPFx-and-Fluent-UI.pdf",
    category: "SPFx Extension",
    industry: "Intranet & Collaboration",
    metrics: [{ label: "Task Time Saved", value: "-78%" }, { label: "Copy Errors", value: "0" }],
  },
  {
    title: "SharePoint Library Folders with Power Apps",
    description: "Power Apps solution for managing SharePoint document library folders — cut folder setup time from 20 minutes to under 2 minutes.",
    href: "https://www.softreetechnology.com/wp-content/uploads/2025/03/Managing-SharePoint-Library-Folders-with-Power-Apps-Updated-.pdf",
    category: "Power Apps + SharePoint",
    industry: "Document Management",
    metrics: [{ label: "Folder Setup Time", value: "20min → 2min" }, { label: "User Adoption", value: "100%" }],
  },
  {
    title: "Dynamic Navigation Bar Using SPFx",
    description: "SPFx Application Customizer delivering role-based navigation across SharePoint — improved site findability by 65% and reduced support tickets by 40%.",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Creating-a-Dynamic-Navigation-Bar-using-SPFx-Application-Customizer.pdf",
    category: "SPFx Customizer",
    industry: "Intranet Design",
    metrics: [{ label: "Findability", value: "+65%" }, { label: "Support Tickets", value: "-40%" }],
  },
  {
    title: "Custom Footer for SharePoint Online",
    description: "Reusable SPFx footer enhancing branding and accessibility across all SharePoint pages — deployed site-wide in under 2 hours with zero re-training.",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Enhancing-User-Experience-with-a-Custom-Footer-using-SPFx.pdf",
    category: "SPFx UI",
    industry: "Corporate Intranet",
    metrics: [{ label: "Deploy Time", value: "<2hrs" }, { label: "Re-training", value: "0" }],
  },
  {
    title: "Global Notification Banner",
    description: "SharePoint-wide notification banner via SPFx Application Customizer — critical alerts now reach 100% of users within seconds, replacing email chains.",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Implementing-a-Global-Notification-Banner-with-SPFx-Application-Customizer.pdf",
    category: "SPFx Customizer",
    industry: "Internal Communications",
    metrics: [{ label: "Alert Reach", value: "100%" }, { label: "Email Chains Replaced", value: "Yes" }],
  },
  {
    title: "Browse Documents Panel",
    description: "Custom SPFx panel for browsing documents in SharePoint libraries without context switching — reduced document retrieval time by 60%.",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Inside-a-panel-Browse-Document-From-file-explorer.pdf",
    category: "SPFx Web Part",
    industry: "Document Management",
    metrics: [{ label: "Retrieval Time", value: "-60%" }, { label: "Context Switches", value: "Eliminated" }],
  },
  {
    title: "Parent Panel for List & Library Creation",
    description: "Guided SPFx panel for creating SharePoint lists or libraries with governance standards — ensured 100% governance compliance across new sites.",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/SPFx-1.pdf",
    category: "SPFx Web Part",
    industry: "Governance & Compliance",
    metrics: [{ label: "Governance Compliance", value: "100%" }, { label: "Setup Errors", value: "0" }],
  },
  {
    title: "Custom Command Extension",
    description: "SharePoint command extension adding contextual toolbar actions — reduced multi-step operations to single clicks, saving 8 hours per user per month.",
    href: "https://www.softreetechnology.com/wp-content/uploads/2025/03/The-Implementation-of-a-Custom-Command-Extension-in-the-SharePoint-Framework-1.pdf",
    category: "SPFx Command",
    industry: "Productivity Tools",
    metrics: [{ label: "Time Saved", value: "8hrs/user/mo" }, { label: "Clicks Reduced", value: "1-click" }],
  },
  {
    title: "PnP PowerShell — Manage Web Parts",
    description: "PnP PowerShell automation for adding, removing, and retrieving web parts from modern pages — cut page maintenance overhead by 90%.",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Add-Remove-And-Get-All-Web-Parts-From-Modern-Site-Page-Using-PnP-PowerShell.pdf",
    category: "PnP PowerShell",
    industry: "SharePoint Administration",
    metrics: [{ label: "Maintenance Overhead", value: "-90%" }, { label: "Automation Rate", value: "100%" }],
  },
  {
    title: "Enable & Disable MFA Using PowerShell",
    description: "PowerShell automation for managing MFA settings for Microsoft 365 users — reduced IT admin time for MFA changes from 30 minutes to under 1 minute.",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/How-To-Enable-And-Disable-MFA-Using-PowerShell-1.pdf",
    category: "M365 Automation",
    industry: "IT Security",
    metrics: [{ label: "MFA Change Time", value: "30min → 1min" }, { label: "Manual Errors", value: "0" }],
  },
  {
    title: "Fetch SharePoint List Items in Power Apps",
    description: "Power Apps implementation for dynamically retrieving and displaying SharePoint data — replaced a manual Excel report workflow saving 6 hours per week.",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/How-To-Fetch-Items-From-SharePoint-List-To-PowerApps-Gallery-Calculate.pdf",
    category: "Power Apps + SharePoint",
    industry: "Business Reporting",
    metrics: [{ label: "Weekly Time Saved", value: "6hrs" }, { label: "Manual Reports", value: "Eliminated" }],
  },
]

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
export default function SharePointCaseStudiesPage() {
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
        items={SP_CASE_STUDIES}
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
