"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { client } from "@/cms/lib/client";
import { navBlogsQuery, navCaseStudiesQuery } from "@/cms/lib/queries/queries";
import { buildCaseStudyNavCategories } from "@/cms/lib/buildCaseStudyNav";
import type {
  SanityNavCategory,
  SanityNavCaseStudy,
  SanityNavCaseStudyCategory,
} from "@/cms/lib/types";
import Navigation from "./navigation";

type NavigationClientProps = {
  initialBlogCategories?: SanityNavCategory[];
  initialCaseStudyCategories?: SanityNavCaseStudyCategory[];
};

export default function NavigationClient({
  initialBlogCategories,
  initialCaseStudyCategories,
}: NavigationClientProps = {}) {
  const [blogCategories, setBlogCategories] = useState<SanityNavCategory[]>(
    initialBlogCategories ?? [],
  );
  const [caseStudies, setCaseStudies] = useState<SanityNavCaseStudy[]>([]);
  const [caseStudyCategories, setCaseStudyCategories] = useState<
    SanityNavCaseStudyCategory[]
  >(initialCaseStudyCategories ?? []);

  const hasInitialData =
    (initialBlogCategories?.length ?? 0) > 0 ||
    (initialCaseStudyCategories?.length ?? 0) > 0;

  const fetchNavData = useCallback(() => {
    Promise.all([
      client.fetch<SanityNavCategory[]>(navBlogsQuery),
      client.fetch<SanityNavCaseStudy[]>(navCaseStudiesQuery),
    ])
      .then(([blogs, studies]) => {
        setBlogCategories(blogs || []);
        setCaseStudies(studies || []);
        setCaseStudyCategories(buildCaseStudyNavCategories(studies || []));
      })
      .catch(() => {});
  }, []);

  const resolvedCaseStudyCategories = useMemo(() => {
    if (caseStudyCategories.length > 0) return caseStudyCategories;
    return buildCaseStudyNavCategories(caseStudies);
  }, [caseStudyCategories, caseStudies]);

  useEffect(() => {
    if (!hasInitialData) fetchNavData();
  }, [fetchNavData, hasInitialData]);

  return (
    <Navigation
      blogCategories={blogCategories}
      caseStudyCategories={resolvedCaseStudyCategories}
    />
  );
}
