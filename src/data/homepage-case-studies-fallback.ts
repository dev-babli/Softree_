import type { CaseStudyMock } from "@/components/bento-layout";
import { BENTO_ABSTRACT } from "@/components/bento-layout/bento-media";

export const HOMEPAGE_FALLBACK_CASE_STUDIES: CaseStudyMock[] = [
  {
    id: "fallback-barcode-scanner",
    title: "Barcode Scanner App",
    category: "Power Platform",
    image: "/images/case-study/home/bar-code.png",
    href: "/case-studies/barcode-scanner-app-audio-equipment-management",
    excerpt: "We built a custom Power Apps mobile application with real-time barcode scanning to streamline warehouse operations and audio equipment check-in/check-out cycles.",
    clientDetails: "A global broadcasting and event management company coordinating high-value logistics and audio equipment tracking for massive scale events.",
    challenge: "Warehouse teams were relying on manual barcode processes to manage equipment movement across multiple locations—leading to delays, errors, and limited visibility.",
    approach: "We built a mobile Power Platform solution that streamlined scanning, validation, and equipment management within their existing operational workflow.",
    outcome: "Deploying the scanning application eliminated tracking discrepancies across event venues, providing event coordinators with immediate inventory verification and complete asset history.",
    client: "Global Industrial Equipment Company",
    location: "Chicago, Illinois, USA",
    industry: "Industrial Equipment",
    employees: "5,000+",
    region: "40+ Countries",
    highlights: [
      { value: "40%", label: "Faster processing of equipment transactions" },
      { value: "60%", label: "Reduction in manual effort and errors" },
      { value: "100%", label: "Real-time visibility across operations" }
    ],
    testimonial: {
      quote: "The mobile scanning solution transformed how our teams work. We now have speed, accuracy, and visibility like never before.",
      name: "Operations Director",
      role: "Global Industrial Equipment Company"
    }
  },
  {
    id: "fallback-employee-separation",
    title: "Employee Separation Process Automation",
    category: "Power Platform",
    image: "/images/case-study/home/emplyee.png",
    href: "/case-studies/employee-separation-process-automation",
    excerpt: "Automated employee exit processes, security approvals, asset returns, and HR record updates using Power Automate, reducing manual processing time by 75%.",
    clientDetails: "A major regional financial services organization handling sensitive employee transitions, requiring rigorous compliance auditing and asset recovery.",
    challenge: "Manual offboarding coordination led to security revocation delays and physical hardware return gaps, threatening compliance audits.",
    approach: "A unified Power Automate workflow integrating HR records, active directories, and automated asset recovery notification sequences.",
    outcome: "The automated offboarding workflow reduced administrative overhead by 75%, secured core systems instantly upon employee departure, and guaranteed 100% compliance record-keeping.",
    client: "Large Healthcare Provider",
    location: "Dallas, Texas, USA",
    industry: "Healthcare",
    employees: "12,000+",
    region: "Regional Network",
    highlights: [
      { value: "75%", label: "Reduced processing cycles" },
      { value: "100%", label: "Access revoked on time" },
      { value: "24/7", label: "Audit compliance log generation" }
    ],
    testimonial: {
      quote: "Offboarding automation saved our HR and security teams hundreds of hours while securing core systems instantly.",
      name: "Chief Information Officer",
      role: "Large Healthcare Provider"
    }
  },
  {
    id: "fallback-travel-request",
    title: "ES Travel Request Automation",
    category: "Power Platform",
    image: "/images/case-study/home/travel.png",
    href: "/case-studies/es-speaks-travel-requests-management-system",
    excerpt: "A consolidated SharePoint and Power Apps portal that automates corporate travel requests, manager approvals, cost auditing, and ticket booking tracking.",
    clientDetails: "A multi-national consulting group managing heavy travel volumes across regional offices, aiming to cut approval delays and travel budget leakage.",
    challenge: "Legacy email travel approvals caused booking bottlenecks, budget policy leaks, and missing expense tracking for team transfers.",
    approach: "A centralized SharePoint and Power Apps booking hub with built-in budget limits checks and approval routing workflows.",
    outcome: "Consolidating corporate travel workflows reduced approval cycles from days to minutes, stopped budget leaks via automated policy checks, and automated ticket tracking.",
    client: "Global Manufacturing Company",
    location: "Munich, Bavaria, Germany",
    industry: "Manufacturing",
    employees: "8,500+",
    region: "Global Offices",
    highlights: [
      { value: "92%", label: "Auto-approval within policy limit" },
      { value: "15m", label: "Average booking process time" },
      { value: "0", label: "Manual emails for travel booking" }
    ],
    testimonial: {
      quote: "Travel request routing stopped our budget leakage overnight while making bookings frictionless for teams.",
      name: "Global Travel Lead",
      role: "Global Manufacturing Company"
    }
  },
  {
    id: "fallback-healthcare-revenue",
    title: "Healthcare Revenue Intelligence",
    category: "Data & Analytics",
    image: "/images/case-study/home/health.png",
    href: "/case-studies/healthcare-revenue-cycle-intelligence-dashboard",
    excerpt: "An analytics platform that cleanses, models, and visualizes complex medical billing data, identifying leakage points and optimizing revenue cycles.",
    clientDetails: "A large healthcare network operating over 40 facilities, processing millions in monthly insurance claims and facing complex revenue reconciliation cycles.",
    challenge: "Scattered claims and billing billing records across legacy platforms delayed reconciliation audits and blocked weekly cash-flow tracking.",
    approach: "An automated data ingestion pipeline and custom Power BI dashboard unifying claims status, lifecycle metrics, and billing anomalies.",
    outcome: "The medical billing dashboard identified key revenue leakage channels, cutting auditing overhead and accelerating weekly financial reporting cycles.",
    client: "Multi-Specialty Hospital Group",
    location: "Toronto, Ontario, Canada",
    industry: "Healthcare Finance",
    employees: "3,500+",
    region: "National Care Network",
    highlights: [
      { value: "95%", label: "Accuracy in cash flow projections" },
      { value: "2.5x", label: "Audit cycle acceleration" },
      { value: "$1.2M", label: "Identified revenue leaks" }
    ],
    testimonial: {
      quote: "This dashboard turned billing files into strategic assets, giving us granular cash-flow clarity in seconds.",
      name: "VP of Finance",
      role: "Multi-Specialty Hospital Group"
    }
  },
  {
    id: "fallback-competitive-gap",
    title: "AI Competitive Gap Report",
    category: "AI & Automation",
    image: "/images/case-study/home/ai.png",
    href: "/case-studies/ai-competitive-gap-report-businesses-outperform-competitors",
    excerpt: "A multi-agent market research system that crawls and benchmarks competitor digital capabilities to generate gap analysis reports in under two minutes.",
    clientDetails: "A hyper-growth digital agency that needs to generate deep technical sales audits and competitive landscape reports for high-value prospects.",
    challenge: "Sales consulting teams spent hours manually researching digital footprint metrics and platform gaps to prepare prospect pitches.",
    approach: "A multi-agent web intelligence crawler powered by LLMs that scans public digital stacks and returns gap analysis structures.",
    outcome: "Marketing teams can now run technical competitor audits in under two minutes, saving significant research time and accelerating sales cycles.",
    client: "Technology Services Firm",
    location: "London, England, UK",
    industry: "Digital Services",
    employees: "1,200+",
    region: "Global Agency Network",
    highlights: [
      { value: "2m", label: "To audit competitor capabilities" },
      { value: "90%", label: "Pitch prep time saved" },
      { value: "3x", label: "Increase in sales presentation volume" }
    ],
    testimonial: {
      quote: "Gap automation changed our agency sales pitches. Prospects are stunned by audits we generate in minutes.",
      name: "VP of Business Development",
      role: "Technology Services Firm"
    }
  },
];
