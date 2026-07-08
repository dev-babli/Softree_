import { readClient } from "@/cms/lib/readClient";
import { navBlogsQuery, navCaseStudiesQuery } from "@/cms/lib/queries/queries";
import { buildCaseStudyNavCategories } from "@/cms/lib/buildCaseStudyNav";
import type {
  SanityNavCategory,
  SanityNavCaseStudy,
} from "@/cms/lib/types";
import NavigationClient from "./navigation-client";

export async function getNavigationData() {
  const [blogCategories, caseStudies] = await Promise.all([
    readClient.fetch<SanityNavCategory[]>(navBlogsQuery),
    readClient.fetch<SanityNavCaseStudy[]>(navCaseStudiesQuery),
  ]);

  return {
    blogCategories: blogCategories || [],
    caseStudyCategories: buildCaseStudyNavCategories(caseStudies || []),
  };
}

export default async function NavigationServer() {
  const { blogCategories, caseStudyCategories } = await getNavigationData();

  return (
    <NavigationClient
      initialBlogCategories={blogCategories}
      initialCaseStudyCategories={caseStudyCategories}
    />
  );
}
