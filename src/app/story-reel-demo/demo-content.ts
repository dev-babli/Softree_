import type { Story } from "@/components/story-reel";
import type { TestimonialSlide } from "@/components/testimonial-slider";
import type { BlogPostMock, CaseStudyMock } from "@/components/bento-layout";
import { BENTO_ABSTRACT } from "@/components/bento-layout/bento-media";

export const demoStories: Story[] = [
  {
    id: "power-platform",
    image: BENTO_ABSTRACT.iridescent,
    date: "2025-11-12",
    category: "Microsoft Power Platform",
    title: "Governed low-code at enterprise scale",
    description: "Low-code apps and workflows with enterprise governance built in.",
    metric: "6-week rollout",
    ctaLabel: "Power Platform",
    href: "/services/offshore-power-platform-development",
  },
  {
    id: "ai-copilot",
    image: BENTO_ABSTRACT.holographic,
    date: "2025-10-28",
    category: "AI & Automation",
    title: "Copilots on your Microsoft estate",
    description: "Copilots on SharePoint and Power Platform with audit-ready responses.",
    metric: "40% faster resolution",
    ctaLabel: "AI delivery",
    href: "/services/offshore-ai-development",
  },
  {
    id: "fabric-analytics",
    image: BENTO_ABSTRACT.fluidMesh,
    date: "2025-10-06",
    category: "Microsoft Fabric",
    title: "Lakehouse dashboards in six weeks",
    description: "Fabric lakehouse dashboards replacing fragmented BI in six weeks.",
    metric: "Single source of truth",
    ctaLabel: "Data platforms",
    href: "/services/offshore-data-analytics",
  },
  {
    id: "modern-web",
    image: BENTO_ABSTRACT.tealGlow,
    date: "2025-09-18",
    category: "Web Engineering",
    title: "Product squads on bi-weekly trains",
    description: "Embedded offshore squads shipping composable web platforms bi-weekly.",
    metric: "Bi-weekly releases",
    ctaLabel: "Web engineering",
    href: "/services/offshore-web-app-development",
  },
];

export const CLIENT_LOGOS = {
  wickedPoint: "/images/logo/wickedpoint.jpg",
  ecg: "/images/logo/ecg.png",
  spMarketplace: "/images/logo/sp-marketplace.png",
} as const;

export const demoTestimonials: TestimonialSlide[] = [
  {
    id: "natasha-adams",
    quote:
      "We had a very positive experience working with Softree Technology. The developers were responsive and delivery was on time. We appreciate the attention they gave our project and their great communication. The final product was exactly what we wanted and we look forward to working with Softree in the future.",
    name: "Natasha Adams",
    company: "Wicked Point LLC",
    location: "Virginia",
    logo: CLIENT_LOGOS.wickedPoint,
    logoAlt: "Wicked Point LLC",
    rating: 5,
  },
  {
    id: "arkady-fedorovtsjev",
    quote:
      "Overall, we are satisfied with our collaboration in the past and your last action and response to our reported issue, really makes a difference.",
    name: "Arkady Fedorovtsjev",
    company: "ECG Group",
    location: "Netherlands",
    logo: CLIENT_LOGOS.ecg,
    logoAlt: "ECG Group",
    rating: 5,
  },
  {
    id: "darrell-trimble",
    quote:
      "SOFTREE staff worked with us to learn our installation automation technology and built exactly what we needed.",
    name: "Darrell Trimble",
    company: "SP Marketplace",
    location: "California",
    logo: CLIENT_LOGOS.spMarketplace,
    logoAlt: "SP Marketplace",
    rating: 5,
  },
];

export const demoCaseStudies: CaseStudyMock[] = [
  {
    id: "1",
    title: "Power Platform Delivery",
    category: "Microsoft Power Platform",
    image: BENTO_ABSTRACT.iridescent,
    href: "/case-studies",
  },
  {
    id: "2",
    title: "Enterprise AI Copilot",
    category: "AI Integration",
    image: BENTO_ABSTRACT.holographic,
    href: "/case-studies",
  },
  {
    id: "3",
    title: "Microsoft Fabric",
    category: "Data Platform",
    image: BENTO_ABSTRACT.fluidMesh,
    href: "/case-studies",
  },
  {
    id: "4",
    title: "Modern Web Platform",
    category: "Web Application",
    image: BENTO_ABSTRACT.ember,
    href: "/case-studies",
  },
  {
    id: "5",
    title: "Softree Enterprise Portal",
    category: "Web Application",
    image: BENTO_ABSTRACT.cobalt,
    href: "/case-studies",
  },
];

export const demoBlogPosts: BlogPostMock[] = [
  {
    id: "b1",
    title: "Shipping governed Power Apps without slowing delivery",
    category: "Power Platform",
    excerpt:
      "Environment strategy, ALM, and review gates that keep citizen developers productive.",
    image: BENTO_ABSTRACT.iridescent,
    href: "/blog",
    publishedAt: "2025-11-08",
  },
  {
    id: "b2",
    title: "Grounding copilots in SharePoint and Fabric",
    category: "AI",
    excerpt: "Retrieval patterns that keep answers auditable for regulated teams.",
    image: BENTO_ABSTRACT.holographic,
    href: "/blog",
    publishedAt: "2025-10-22",
  },
  {
    id: "b3",
    title: "Lakehouse cutover in six weeks",
    category: "Fabric",
    excerpt: "A pragmatic migration sequence when BI sprawl is the real enemy.",
    image: BENTO_ABSTRACT.liquid,
    href: "/blog",
    publishedAt: "2025-10-05",
  },
  {
    id: "b4",
    title: "Offshore squads on bi-weekly release trains",
    category: "Engineering",
    excerpt: "How we align product owners, design, and QA across time zones.",
    image: BENTO_ABSTRACT.spectrum,
    href: "/blog",
    publishedAt: "2025-09-14",
  },
  {
    id: "b5",
    title: "Accessibility as a launch criterion",
    category: "Design",
    excerpt: "Checklists we run before every enterprise go-live.",
    image: BENTO_ABSTRACT.aurora,
    href: "/blog",
    publishedAt: "2025-08-30",
  },
];
