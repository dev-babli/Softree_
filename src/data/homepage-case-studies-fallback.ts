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
  },
  {
    id: "fallback-employee-separation",
    title: "Employee Separation Process Automation",
    category: "Power Platform",
    image: "/images/case-study/home/emplyee.png",
    href: "/case-studies/employee-separation-process-automation",
    excerpt: "Automated employee exit processes, security approvals, asset returns, and HR record updates using Power Automate, reducing manual processing time by 75%.",
  },
  {
    id: "fallback-travel-request",
    title: "ES Travel Request Automation",
    category: "Power Platform",
    image: "/images/case-study/home/travel.png",
    href: "/case-studies/es-speaks-travel-requests-management-system",
    excerpt: "A consolidated SharePoint and Power Apps portal that automates corporate travel requests, manager approvals, cost auditing, and ticket booking tracking.",
  },
  {
    id: "fallback-healthcare-revenue",
    title: "Healthcare Revenue Intelligence",
    category: "Data & Analytics",
    image: "/images/case-study/home/health.png",
    href: "/case-studies/healthcare-revenue-cycle-intelligence-dashboard",
    excerpt: "An analytics platform that cleanses, models, and visualizes complex medical billing data, identifying leakage points and optimizing revenue cycles.",
  },
  {
    id: "fallback-competitive-gap",
    title: "AI Competitive Gap Report",
    category: "AI & Automation",
    image: "/images/case-study/home/ai.png",
    href: "/case-studies/ai-competitive-gap-report-businesses-outperform-competitors",
    excerpt: "A multi-agent market research system that crawls and benchmarks competitor digital capabilities to generate gap analysis reports in under two minutes.",
  },
];
