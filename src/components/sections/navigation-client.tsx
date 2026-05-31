"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useCallback, useMemo } from "react";
import { client, liveClient } from "@/sanity/client";
import { navBlogsQuery, navCaseStudiesQuery } from "@/sanity/queries";
import { buildCaseStudyNavCategories } from "@/sanity/buildCaseStudyNav";
import type {
  SanityNavCategory,
  SanityNavCaseStudy,
} from "@/sanity/types";

const Navigation = dynamic(() => import("./navigation"), {
  ssr: false,
});

export default function NavigationClient() {
  const [blogCategories, setBlogCategories] = useState<SanityNavCategory[]>([]);
  const [caseStudies, setCaseStudies] = useState<SanityNavCaseStudy[]>([]);

  const fetchBlogCategories = useCallback(() => {
    client
      .fetch<SanityNavCategory[]>(navBlogsQuery, {}, { cache: "no-store" })
      .then((data) => setBlogCategories(data || []))
      .catch(() => {});
  }, []);

  const fetchCaseStudies = useCallback(() => {
    client
      .fetch<SanityNavCaseStudy[]>(navCaseStudiesQuery, {}, { cache: "no-store" })
      .then((data) => setCaseStudies(data || []))
      .catch(() => {});
  }, []);

  const caseStudyCategories = useMemo(
    () => buildCaseStudyNavCategories(caseStudies),
    [caseStudies],
  );

  useEffect(() => {
    fetchBlogCategories();
    fetchCaseStudies();

    const blogSubscription = liveClient
      .listen('*[_type == "post" || _type == "category"]')
      .subscribe(() => {
        fetchBlogCategories();
      });

    const caseStudySubscription = liveClient
      .listen('*[_type == "caseStudy"]')
      .subscribe(() => {
        fetchCaseStudies();
      });

    return () => {
      blogSubscription.unsubscribe();
      caseStudySubscription.unsubscribe();
    };
  }, [fetchBlogCategories, fetchCaseStudies]);

  return (
    <Navigation
      blogCategories={blogCategories}
      caseStudyCategories={caseStudyCategories}
    />
  );
}
