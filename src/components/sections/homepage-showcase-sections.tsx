"use client";

import { useEffect, useState } from "react";
import { TestimonialSlider } from "@/components/testimonial-slider";
import { BentoGridLayout } from "@/components/bento-layout";
import type { BlogPostMock } from "@/components/bento-layout";
import { BENTO_ABSTRACT } from "@/components/bento-layout/bento-media";
import { homepageTestimonials } from "@/data/homepage-showcase-content";
import SuccessStoriesBentoSection from "@/components/sections/SuccessStoriesBentoSection";
import { client } from "@/sanity/lib/client";
import { latestBlogsQuery } from "@/sanity/queries";
import type { SanityBlogPost } from "@/sanity/types";

const BENTO_IMAGE_POOL = [
  BENTO_ABSTRACT.iridescent,
  BENTO_ABSTRACT.holographic,
  BENTO_ABSTRACT.fluidMesh,
  BENTO_ABSTRACT.ember,
  BENTO_ABSTRACT.cobalt,
  BENTO_ABSTRACT.spectrum,
  BENTO_ABSTRACT.aurora,
] as const;

function mapBlogPosts(posts: SanityBlogPost[]): BlogPostMock[] {
  return posts.slice(0, 5).map((post, index) => {
    const image =
      post.mainImage?.asset?.url ||
      BENTO_IMAGE_POOL[(index + 2) % BENTO_IMAGE_POOL.length];

    return {
      id: post._id,
      title: post.title,
      category: post.categories?.[0]?.title ?? "Insights",
      excerpt: post.excerpt,
      image,
      href: `/blog/${post.slug.current}`,
      publishedAt: post.publishedAt,
    };
  });
}

export default function HomepageShowcaseSections() {
  const [posts, setPosts] = useState<BlogPostMock[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const blogs = await client.fetch<SanityBlogPost[]>(
          latestBlogsQuery,
          {},
          { cache: "no-store" },
        );
        if (blogs?.length) setPosts(mapBlogPosts(blogs));
      } catch {
        /* blog band hidden if CMS unavailable */
      }
    }

    load();
  }, []);

  return (
    <>
      <SuccessStoriesBentoSection />

      <section
        id="client-testimonials"
        className="bg-[#F3F0EE] px-4 py-12 md:px-6 md:py-16 scroll-mt-24"
      >
        <div className="mx-auto w-full max-w-[1100px]">
          <TestimonialSlider
            slides={homepageTestimonials}
            eyebrowLabel="Client stories"
            variant="softree"
          />
        </div>
      </section>

      {posts.length > 0 ? (
        <section className="border-t border-[#d7dce9] bg-[#f6f7fb] px-4 py-16 md:py-20">
          <div className="mx-auto max-w-[1240px]">
            <BentoGridLayout posts={posts} viewAllHref="/blog" />
          </div>
        </section>
      ) : null}
    </>
  );
}
