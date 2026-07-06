import type { CaseStudyMock } from "@/components/bento-layout";
import { BENTO_ABSTRACT } from "@/components/bento-layout/bento-media";

export const HOMEPAGE_FALLBACK_CASE_STUDIES: CaseStudyMock[] = [
  {
    id: "fallback-perf-mon",
    title: "AI Website Performance",
    category: "AI & Automation",
    image: BENTO_ABSTRACT.iridescent,
    href: "/case-studies/ai-website-performance-monitoring",
  },
  {
    id: "fallback-barcode-scanner",
    title: "Barcode Scanner App",
    category: "Power Platform",
    image: BENTO_ABSTRACT.holographic,
    href: "/case-studies/barcode-scanner-app-audio-equipment-management",
  },
  {
    id: "fallback-itsm-analytics",
    title: "ITSM Analytics Platform",
    category: "Microsoft Fabric",
    image: BENTO_ABSTRACT.fluidMesh,
    href: "/case-studies/ai-driven-itsm-analytics-platform-microsoft-fabric",
  },
  {
    id: "fallback-leave-mgmt",
    title: "Leave Management System",
    category: "Power Platform",
    image: BENTO_ABSTRACT.ember,
    href: "/case-studies/enterprise-leave-management-system",
  },
];
