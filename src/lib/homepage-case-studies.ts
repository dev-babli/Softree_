import "server-only";

import type { CaseStudyMock } from "@/components/bento-layout";
import { BENTO_ABSTRACT } from "@/components/bento-layout/bento-media";
import { HOMEPAGE_FALLBACK_CASE_STUDIES } from "@/data/homepage-case-studies-fallback";
import { sanityFetch } from "@/cms/lib/fetch";
import type { SanityNavCaseStudy } from "@/cms/lib/types";
import { groq } from "next-sanity";

export { HOMEPAGE_FALLBACK_CASE_STUDIES } from "@/data/homepage-case-studies-fallback";

const BENTO_IMAGE_POOL = [
  BENTO_ABSTRACT.iridescent,
  BENTO_ABSTRACT.holographic,
  BENTO_ABSTRACT.fluidMesh,
  BENTO_ABSTRACT.ember,
  BENTO_ABSTRACT.cobalt,
] as const;

const SLUG_DISPLAY_MAPPING: Record<string, { title: string; category: string; client?: string }> = {
  "barcode-scanner-app-audio-equipment-management": {
    title: "Barcode Scanner App",
    category: "Power Platform",
    client: "Global Industrial Equipment Company",
  },
  "how-an-enterprise-organization-automated-hr-operations-using-ai": {
    title: "Employee Separation Process Automation",
    category: "Power Platform",
    client: "Large Healthcare Provider",
  },
  "sharepoint-site-pages-to-pdf": {
    title: "ES Travel Request Automation",
    category: "Power Platform",
    client: "Global Manufacturing Company",
  },
  "hr-analytics-and-employee-experience-platform": {
    title: "Healthcare Revenue Intelligence",
    category: "Data & Analytics",
    client: "Multi-Specialty Hospital Group",
  },
  "ai-competitive-gap-report-businesses-outperform-competitors": {
    title: "AI Competitive Gap Report",
    category: "AI & Automation",
    client: "Technology Services Firm",
  },
};

export function mapSanityCaseStudies(studies: SanityNavCaseStudy[]): CaseStudyMock[] {
  return studies.map((study, index) => {
    const slug = study.slug?.current;
    const image =
      study.mainImage?.asset?.url ||
      study.mainImageUrl;

    const mapping = slug ? SLUG_DISPLAY_MAPPING[slug] : undefined;
    const fallback = HOMEPAGE_FALLBACK_CASE_STUDIES.find(
      (f) =>
        f.id === study._id ||
        (slug && f.href?.endsWith(slug)) ||
        (mapping && f.title === mapping.title)
    ) || HOMEPAGE_FALLBACK_CASE_STUDIES[index] || HOMEPAGE_FALLBACK_CASE_STUDIES[0];

    return {
      id: study._id,
      title: mapping?.title || study.title || fallback.title,
      category: mapping?.category || study.industry || study.category || fallback.category,
      image: image || fallback.image,
      href: slug ? `/case-studies/${slug}` : (fallback.href || "/case-studies"),
      excerpt: study.excerpt || fallback.excerpt,
      clientDetails: study.clientDetails || fallback.clientDetails,
      challenge: fallback.challenge,
      approach: fallback.approach,
      outcome: fallback.outcome,
      client: mapping?.client || study.client || fallback.client,
      location: study.location || fallback.location,
      industry: study.industry || fallback.industry,
      employees: study.employees || fallback.employees,
      region: study.region || fallback.region,
      testimonial: study.testimonial || fallback.testimonial,
      highlights: (study.highlights && study.highlights.length > 0) ? study.highlights : fallback.highlights,
    };
  });
}

const homepageFeaturedCaseStudiesQuery = groq`
  *[_type == "caseStudy" && coalesce(visibility, status, "published") == "published" && slug.current in [
    "barcode-scanner-app-audio-equipment-management",
    "how-an-enterprise-organization-automated-hr-operations-using-ai",
    "sharepoint-site-pages-to-pdf",
    "hr-analytics-and-employee-experience-platform",
    "ai-competitive-gap-report-businesses-outperform-competitors"
  ]] {
    _id,
    title,
    client,
    slug,
    excerpt,
    clientDetails,
    storyType,
    heroLayout,
    detailLayout,
    industry,
    useCase,
    companySize,
    featuredRank,
    mainImage { asset->{ url }, alt },
    mainImageUrl,
    location,
    employees,
    "region": coalesce(region, location),
    highlights[] { value, label },
    testimonial { quote, name, role },
    "challenge": challengeContent[0].children[0].text,
    "approach": approachContent[0].children[0].text,
    "outcome": outcomeContent[0].children[0].text
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
        "barcode-scanner-app-audio-equipment-management",
        "how-an-enterprise-organization-automated-hr-operations-using-ai",
        "sharepoint-site-pages-to-pdf",
        "hr-analytics-and-employee-experience-platform",
        "ai-competitive-gap-report-businesses-outperform-competitors"
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
