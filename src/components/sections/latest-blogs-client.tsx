"use client";

import { useEffect, useState } from "react";
import { client } from "@/cms/lib/client";
import { latestBlogsQuery } from "@/cms/lib/queries/queries";
import type { SanityBlogPost } from "@/cms/lib/types";
import LatestBlogsSection from "./ai-insights-blog";

export default function LatestBlogsClient() {
    const [posts, setPosts] = useState<SanityBlogPost[]>([]);

    useEffect(() => {
        client
            .fetch<SanityBlogPost[]>(latestBlogsQuery, {}, { cache: "no-store" })
            .then((data) => setPosts(data || []))
            .catch(() => { });
    }, []);

    return <LatestBlogsSection posts={posts} />;
}
