import type { CaseStudyMock } from "@/components/bento-layout";
import { BENTO_ABSTRACT } from "@/components/bento-layout/bento-media";

export const HOMEPAGE_FALLBACK_CASE_STUDIES: CaseStudyMock[] = [
  {
    id: "fallback-wicked",
    title: "62% Faster Approvals in 8 Weeks",
    category: "Microsoft Power Platform",
    image: BENTO_ABSTRACT.iridescent,
    href: "/case-studies/wicked-point-power-platform-governance",
  },
  {
    id: "fallback-ecg",
    title: "40% Faster Resolution with Grounded Copilots",
    category: "AI & Automation",
    image: BENTO_ABSTRACT.holographic,
    href: "/case-studies/ecg-group-ai-copilot-transformation",
  },
  {
    id: "fallback-sp",
    title: "97.8% Install Success on a Bi-Weekly Train",
    category: "Product Engineering",
    image: BENTO_ABSTRACT.fluidMesh,
    href: "/case-studies/sp-marketplace-installation-automation",
  },
];
