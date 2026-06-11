import type { CaseStudyMock } from "@/components/bento-layout";
import { BENTO_ABSTRACT } from "@/components/bento-layout/bento-media";

export const HOMEPAGE_FALLBACK_CASE_STUDIES: CaseStudyMock[] = [
  {
    id: "fallback-process-discovery",
    title: "AI-Powered Process Discovery Copilot",
    category: "Power Platform",
    image: BENTO_ABSTRACT.iridescent,
    href: "/case-studies/ai-powered-process-discovery-copilot",
  },
  {
    id: "fallback-barcode-scanner",
    title: "Barcode Scanner App",
    category: "Power Platform",
    image: BENTO_ABSTRACT.holographic,
    href: "/case-studies/barcode-scanner-app-audio-equipment-management",
  },
  {
    id: "fallback-service-management",
    title: "IT Service Management Analytics",
    category: "Enterprise IT Operations",
    image: BENTO_ABSTRACT.fluidMesh,
    href: "/case-studies/ai-it-service-management-analytics-platform",
  },
  {
    id: "fallback-employee-separation",
    title: "Employee Separation Process Automation",
    category: "Public Sector Automation",
    image: BENTO_ABSTRACT.ember,
    href: "/case-studies/employee-separation-process-automation",
  },
];
