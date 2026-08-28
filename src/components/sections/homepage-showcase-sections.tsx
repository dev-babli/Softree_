"use client";

import { useEffect, useState } from "react";
import { TestimonialSlider } from "@/components/testimonial-slider";
import { BentoGridLayout } from "@/components/bento-layout";
import type { BlogPostMock } from "@/components/bento-layout";
import { BENTO_ABSTRACT } from "@/components/bento-layout/bento-media";
import { homepageTestimonials } from "@/data/homepage-showcase-content";
import SuccessStoriesBentoSection from "@/components/sections/SuccessStoriesBentoSection";
import { client } from "@/cms/lib/client";
import { latestBlogsQuery } from "@/cms/lib/queries/queries";
import type { SanityBlogPost } from "@/cms/lib/types";

const BENTO_IMAGE_POOL = [
  BENTO_ABSTRACT.iridescent,
  BENTO_ABSTRACT.holographic,
  BENTO_ABSTRACT.fluidMesh,
  BENTO_ABSTRACT.ember,
  BENTO_ABSTRACT.cobalt,
  BENTO_ABSTRACT.spectrum,
  BENTO_ABSTRACT.aurora,
] as const;

const FALLBACK_BLOG_POSTS: BlogPostMock[] = [
  {
    id: "blog-ai-decision-making",
    title: "AI for Enterprise Decision Making: How Intelligent Insights Are Reshaping Modern Operations",
    category: "AI & Automation",
    excerpt: "Discover how enterprise decision engines leverage cognitive models, predictive analytics, and natural language query systems to drive operational automation and strategic growth.",
    image: "/images/blog/enterprise.png",
    href: "/blog/ai-enterprise-decision-making",
    publishedAt: "2026-08-10T12:00:00Z",
    readingTime: "5 min read",
    takeaways: [
      "Integrating predictive modeling into daily decision chains",
      "Reducing human intervention in high-volume approvals",
      "Leveraging Microsoft Fabric for real-time data ingestion"
    ]
  },
  {
    id: "blog-customer-service",
    title: "AI-Powered Customer Service Automation: Transforming Enterprise Support",
    category: "AI & Automation",
    excerpt: "Learn how modern enterprise support divisions use secure large language models, custom copilots, and multi-agent routing to scale service delivery and automate ticketing resolutions.",
    image: "/images/blog/ai-powered.png",
    href: "/blog/ai-powered-customer-service-automation",
    publishedAt: "2026-08-10T11:00:00Z",
    readingTime: "6 min read",
    takeaways: [
      "Deploying secure Copilots to deflect up to 65% of support calls",
      "Automating ticketing queues with multi-agent routing",
      "Ensuring absolute data privacy in customer chat histories"
    ]
  },
  {
    id: "blog-security-testing",
    title: "AI Security Testing Services: Ensuring Compliance and Threat Mitigation",
    category: "Cybersecurity",
    excerpt: "An in-depth review of advanced QA automation and security testing models designed to safeguard LLM integration pipelines, evaluate API compliance, and block cognitive threats.",
    image: "/images/blog/security.png",
    href: "/blog/ai-security-testing-services",
    publishedAt: "2026-08-09T10:00:00Z",
    readingTime: "4 min read",
    takeaways: [
      "Detecting and mitigating prompt injection vulnerabilities",
      "Building automated security pipelines for API integrations",
      "Maintaining continuous compliance under enterprise standards"
    ]
  },
  {
    id: "blog-data-analytics",
    title: "Data Analytics Consulting Services for Enterprise Decision Making",
    category: "Data & Analytics",
    excerpt: "Unlocking business intelligence through Microsoft Fabric, scalable data engineering pipelines, and real-time operational telemetry dashboarding for high-performance enterprise teams.",
    image: "/images/blog/data.png",
    href: "/blog/data-analytics-consulting-services-enterprise-decision-making",
    publishedAt: "2026-08-07T09:00:00Z",
    readingTime: "5 min read",
    takeaways: [
      "Architecting clean, scalable data lakes on Microsoft Fabric",
      "Creating executive-level dashboards with sub-second latency",
      "Enabling real-time field telemetry tracking across operations"
    ]
  }
];

function mapBlogPosts(posts: SanityBlogPost[]): BlogPostMock[] {
  return posts.slice(0, 5).map((post, index) => {
    // Force text-free abstract 3D gradient covers from BENTO_IMAGE_POOL for the homepage blog preview grid
    const image = BENTO_IMAGE_POOL[(index + 1) % BENTO_IMAGE_POOL.length];

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
  const [posts, setPosts] = useState<BlogPostMock[]>(FALLBACK_BLOG_POSTS);

  useEffect(() => {
    // Force specific FALLBACK_BLOG_POSTS to ensure the user's 4 requested URLs are featured on the homepage showcase
    setPosts(FALLBACK_BLOG_POSTS);
  }, []);

  return (
    <>
      <SuccessStoriesBentoSection />

      <section
        id="client-testimonials"
        className="bg-[#F3F0EE] px-4 py-0 scroll-mt-24"
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
        <section className="border-t border-[#d7dce9] bg-[#f6f7fb] px-4 py-0">
          <div className="mx-auto max-w-[1240px]">
            <BentoGridLayout 
              posts={posts} 
              viewAllHref="/blog" 
              eyebrow="Latest insights"
              headline="Technology Insights for modern enterprises"
              description="Explore expert perspectives on AI, automation, data, and digital transformation."
              viewAllLabel="View all articles"
            />
          </div>
        </section>
      ) : null}
    </>
  );
}
