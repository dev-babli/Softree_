"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useCallback } from "react";
import { client, liveClient } from "@/sanity/client";
import { navBlogsQuery } from "@/sanity/queries";
import type { SanityNavCategory } from "@/sanity/types";

const Navigation = dynamic(() => import("./navigation"), {
  ssr: false,
});

export default function NavigationClient() {
  const [blogCategories, setBlogCategories] = useState<SanityNavCategory[]>([]);

  const fetchCategories = useCallback(() => {
    client
      .fetch<SanityNavCategory[]>(navBlogsQuery, {}, { cache: "no-store" })
      .then((data) => setBlogCategories(data || []))
      .catch(() => { });
  }, []);

  useEffect(() => {
    // Initial fetch
    fetchCategories();

    // Subscribe to real-time updates for posts and categories
    const subscription = liveClient
      .listen('*[_type == "post" || _type == "category"]')
      .subscribe(() => {
        // Re-fetch when any post or category changes
        fetchCategories();
      });

    return () => subscription.unsubscribe();
  }, [fetchCategories]);

  return <Navigation blogCategories={blogCategories} />;
}
