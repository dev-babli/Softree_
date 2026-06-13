import { readClient } from "@/sanity/lib/readClient";
import { navBlogsQuery, navCaseStudiesQuery } from "@/sanity/queries";
import { buildCaseStudyNavCategories } from "@/sanity/buildCaseStudyNav";
import type {
  SanityNavCategory,
  SanityNavCaseStudy,
} from "@/sanity/types";
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
