import "server-only";

import type { CaseStudyMock } from "@/components/bento-layout";
import { BENTO_ABSTRACT } from "@/components/bento-layout/bento-media";
import { HOMEPAGE_FALLBACK_CASE_STUDIES } from "@/data/homepage-case-studies-fallback";
import { sanityFetch } from "@/sanity/lib/fetch";
import type { SanityNavCaseStudy } from "@/sanity/types";
import { groq } from "next-sanity";

export { HOMEPAGE_FALLBACK_CASE_STUDIES } from "@/data/homepage-case-studies-fallback";

const BENTO_IMAGE_POOL = [
  BENTO_ABSTRACT.iridescent,
  BENTO_ABSTRACT.holographic,
  BENTO_ABSTRACT.fluidMesh,
  BENTO_ABSTRACT.ember,
  BENTO_ABSTRACT.cobalt,
] as const;

const SLUG_DISPLAY_MAPPING: Record<string, { title: string; category: string }> = {
  "ai-website-performance-monitoring": {
    title: "AI Website Performance",
    category: "AI & Automation",
  },
  "barcode-scanner-app-audio-equipment-management": {
    title: "Barcode Scanner App",
    category: "Power Platform",
  },
  "ai-driven-itsm-analytics-platform-microsoft-fabric": {
    title: "ITSM Analytics Platform",
    category: "Microsoft Fabric",
  },
  "enterprise-leave-management-system": {
    title: "Leave Management System",
    category: "Power Platform",
  },
};

export function mapSanityCaseStudies(studies: SanityNavCaseStudy[]): CaseStudyMock[] {
  return studies.map((study, index) => {
    const slug = study.slug?.current;
    const image =
      study.mainImage?.asset?.url ||
      study.mainImageUrl ||
      BENTO_IMAGE_POOL[index % BENTO_IMAGE_POOL.length];

    const mapping = slug ? SLUG_DISPLAY_MAPPING[slug] : undefined;

    return {
      id: study._id,
      title: mapping?.title || study.client || study.title,
      category: mapping?.category || study.industry || study.category || "Case study",
      image,
      href: slug ? `/case-studies/${slug}` : "/case-studies",
    };
  });
}

const homepageFeaturedCaseStudiesQuery = groq`
  *[_type == "caseStudy" && coalesce(status, "published") == "published" && slug.current in [
    "ai-website-performance-monitoring",
    "barcode-scanner-app-audio-equipment-management",
    "ai-driven-itsm-analytics-platform-microsoft-fabric",
    "enterprise-leave-management-system"
  ]] {
    _id,
    title,
    client,
    slug,
    excerpt,
    storyType,
    heroLayout,
    detailLayout,
    industry,
    useCase,
    companySize,
    featuredRank,
    mainImage { asset->{ url }, alt },
    mainImageUrl,
    "keyResults": keyResults[] { value, label, description }
  }
`;

export async function getHomepageCaseStudies(): Promise<CaseStudyMock[]> {
  try {
    const studies = await sanityFetch<SanityNavCaseStudy[]>(
      homepageFeaturedCaseStudiesQuery,
      {},
    );

    if (studies?.length) {
      const order = [
        "ai-website-performance-monitoring",
        "barcode-scanner-app-audio-equipment-management",
        "ai-driven-itsm-analytics-platform-microsoft-fabric",
        "enterprise-leave-management-system"
      ];
      const sortedStudies = [...studies].sort((a, b) => {
        const aSlug = a.slug?.current || "";
        const bSlug = b.slug?.current || "";
        return order.indexOf(aSlug) - order.indexOf(bSlug);
      });
      return mapSanityCaseStudies(sortedStudies);
    }
  } catch (error) {
    console.error("Failed to fetch homepage case studies:", error);
  }

  return HOMEPAGE_FALLBACK_CASE_STUDIES;
}
