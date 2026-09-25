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

// Module-level cache across route transitions to prevent redundant Sanity CMS round-trips
let cachedBlogCategories: SanityNavCategory[] | null = null;
let cachedCaseStudies: SanityNavCaseStudy[] | null = null;
let cachedCaseStudyCategories: SanityNavCaseStudyCategory[] | null = null;
let navFetchPromise: Promise<[SanityNavCategory[], SanityNavCaseStudy[]]> | null = null;

export default function NavigationClient({
  initialBlogCategories,
  initialCaseStudyCategories,
}: NavigationClientProps = {}) {
  if (initialBlogCategories && initialBlogCategories.length > 0 && !cachedBlogCategories) {
    cachedBlogCategories = initialBlogCategories;
  }
  if (initialCaseStudyCategories && initialCaseStudyCategories.length > 0 && !cachedCaseStudyCategories) {
    cachedCaseStudyCategories = initialCaseStudyCategories;
  }

  const [blogCategories, setBlogCategories] = useState<SanityNavCategory[]>(
    () => initialBlogCategories ?? cachedBlogCategories ?? [],
  );
  const [caseStudies, setCaseStudies] = useState<SanityNavCaseStudy[]>(
    () => cachedCaseStudies ?? [],
  );
  const [caseStudyCategories, setCaseStudyCategories] = useState<
    SanityNavCaseStudyCategory[]
  >(() => initialCaseStudyCategories ?? cachedCaseStudyCategories ?? []);

  const hasData =
    (blogCategories.length > 0 && caseStudyCategories.length > 0) ||
    (cachedBlogCategories !== null && cachedCaseStudyCategories !== null);

  const fetchNavData = useCallback(() => {
    if (cachedBlogCategories && cachedCaseStudyCategories) {
      setBlogCategories(cachedBlogCategories);
      setCaseStudyCategories(cachedCaseStudyCategories);
      if (cachedCaseStudies) setCaseStudies(cachedCaseStudies);
      return;
    }

    if (!navFetchPromise) {
      navFetchPromise = Promise.all([
        client.fetch<SanityNavCategory[]>(navBlogsQuery),
        client.fetch<SanityNavCaseStudy[]>(navCaseStudiesQuery),
      ]);
    }

    navFetchPromise
      .then(([blogs, studies]) => {
        const b = blogs || [];
        const s = studies || [];
        const c = buildCaseStudyNavCategories(s);
        cachedBlogCategories = b;
        cachedCaseStudies = s;
        cachedCaseStudyCategories = c;
        setBlogCategories(b);
        setCaseStudies(s);
        setCaseStudyCategories(c);
      })
      .catch(() => {
        navFetchPromise = null;
      });
  }, []);

  const resolvedCaseStudyCategories = useMemo(() => {
    if (caseStudyCategories.length > 0) return caseStudyCategories;
    return buildCaseStudyNavCategories(caseStudies);
  }, [caseStudyCategories, caseStudies]);

  useEffect(() => {
    if (!hasData) {
      fetchNavData();
    }
  }, [fetchNavData, hasData]);

  return (
    <Navigation
      blogCategories={blogCategories}
      caseStudyCategories={resolvedCaseStudyCategories}
    />
  );
}
