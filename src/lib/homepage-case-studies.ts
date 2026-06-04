import "server-only";

import type { CaseStudyMock } from "@/components/bento-layout";
import { BENTO_ABSTRACT } from "@/components/bento-layout/bento-media";
import { HOMEPAGE_FALLBACK_CASE_STUDIES } from "@/data/homepage-case-studies-fallback";
import {
  featuredCaseStudiesNavQuery,
  navCaseStudiesQuery,
} from "@/sanity/queries";
import { sanityFetch } from "@/sanity/lib/fetch";
import type { SanityNavCaseStudy } from "@/sanity/types";

export { HOMEPAGE_FALLBACK_CASE_STUDIES } from "@/data/homepage-case-studies-fallback";

const BENTO_IMAGE_POOL = [
  BENTO_ABSTRACT.iridescent,
  BENTO_ABSTRACT.holographic,
  BENTO_ABSTRACT.fluidMesh,
  BENTO_ABSTRACT.ember,
  BENTO_ABSTRACT.cobalt,
] as const;

export function mapSanityCaseStudies(studies: SanityNavCaseStudy[]): CaseStudyMock[] {
  return studies.slice(0, 5).map((study, index) => {
    const slug = study.slug?.current;
    const image =
      study.mainImage?.asset?.url ||
      study.mainImageUrl ||
      BENTO_IMAGE_POOL[index % BENTO_IMAGE_POOL.length];

    return {
      id: study._id,
      title: study.client || study.title,
      category: study.industry || study.category || "Case study",
      image,
      href: slug ? `/case-studies/${slug}` : "/case-studies",
    };
  });
}

export async function getHomepageCaseStudies(): Promise<CaseStudyMock[]> {
  try {
    let studies = await sanityFetch<SanityNavCaseStudy[]>(
      featuredCaseStudiesNavQuery,
      {},
    );

    if (!studies?.length) {
      studies = await sanityFetch<SanityNavCaseStudy[]>(navCaseStudiesQuery, {});
    }

    if (studies?.length) {
      return mapSanityCaseStudies(studies);
    }
  } catch {
    /* fall through */
  }

  return HOMEPAGE_FALLBACK_CASE_STUDIES;
}
