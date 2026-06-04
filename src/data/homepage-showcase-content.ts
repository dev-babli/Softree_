import type { Story } from "@/components/story-reel";
import type { TestimonialSlide } from "@/components/testimonial-slider";
import { BENTO_ABSTRACT } from "@/components/bento-layout/bento-media";
import type { SuccessStoryMetric } from "@/components/sections/success-stories/types";

export const HOMEPAGE_CLIENT_LOGOS = {
  wickedPoint: "/images/logo/wickedpoint.jpg",
  ecg: "/images/logo/ecg.png",
  spMarketplace: "/images/logo/1.jpg",
} as const;

/** Corporate / architecture photos for success-stories bento (Unsplash) */
export const SUCCESS_STORY_BUILDING_IMAGES = {
  glassTower:
    "https://images.unsplash.com/photo-1486406146926-c627a92fd1b2?auto=format&fit=crop&w=1200&q=85",
  citySkyline:
    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1200&q=85",
  modernFacade:
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85",
} as const;

/** Impact stats shown in success-stories bento (animated) */
export const SUCCESS_STORY_METRICS: Record<string, [SuccessStoryMetric, SuccessStoryMetric]> = {
  "natasha-adams": [
    { value: 40, prefix: "+", suffix: "%", label: "Faster delivery" },
    { value: 98, suffix: "%", label: "On-time milestones" },
  ],
  "arkady-fedorovtsjev": [
    { value: 30, prefix: "+", suffix: "%", label: "Release velocity" },
    { value: 52, prefix: "+", suffix: "%", label: "Sprint throughput" },
  ],
  "darrell-trimble": [
    { value: 35, prefix: "+", suffix: "%", label: "Automation coverage" },
    { value: 3, prefix: "×", suffix: "", label: "Deployment speed" },
  ],
};

/** Service story reel slides — used in BentoWireframe band on homepage */
export const homepageShowcaseStories: Story[] = [
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

export const homepageTestimonials: TestimonialSlide[] = [
  {
    id: "natasha-adams",
    quote:
      "We had a very positive experience working with Softree Technology. The developers were responsive and delivery was on time. We appreciate the attention they gave our project and their great communication.",
    name: "Natasha Adams",
    company: "Wicked Point LLC",
    location: "Virginia",
    logo: HOMEPAGE_CLIENT_LOGOS.wickedPoint,
    logoAlt: "Wicked Point LLC",
    image: SUCCESS_STORY_BUILDING_IMAGES.glassTower,
    imageAlt: "Wicked Point LLC — Virginia headquarters building",
    rating: 5,
  },
  {
    id: "arkady-fedorovtsjev",
    quote:
      "Overall, we are satisfied with our collaboration in the past and your last action really makes a difference.",
    name: "Arkady Fedorovtsjev",
    company: "ECG Group",
    location: "Netherlands",
    logo: HOMEPAGE_CLIENT_LOGOS.ecg,
    logoAlt: "ECG Group",
    image: SUCCESS_STORY_BUILDING_IMAGES.citySkyline,
    imageAlt: "Urban corporate skyline",
    rating: 5,
  },
  {
    id: "darrell-trimble",
    quote:
      "SOFTREE staff worked with us to learn our installation automation technology and built exactly what we needed.",
    name: "Darrell Trimble",
    company: "SP Marketplace",
    location: "California",
    logo: HOMEPAGE_CLIENT_LOGOS.spMarketplace,
    logoAlt: "SP Marketplace",
    image: SUCCESS_STORY_BUILDING_IMAGES.modernFacade,
    imageAlt: "Contemporary commercial building facade",
    rating: 5,
  },
];
