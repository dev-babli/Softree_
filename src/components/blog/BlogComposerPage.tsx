"use client"

import NavigationClient from "@/components/sections/navigation-client"
import Footer from "@/components/sections/footer"
import type { SanityNavCategory, SanityNavCaseStudyCategory } from "@/sanity/types"
import type { CaseStudyComposerSection } from "@/components/case-studies/composer/types"
import { BlogComposerLayout } from "./BlogComposerLayout"
import { mapPostToLayoutData, mapRelatedPosts, type SanityPostDoc } from "./mapPostToLayoutData"

export function BlogComposerPage({
  post,
  relatedPosts,
  slug,
  authorName,
  publishedLabel,
  readTime,
  initialBlogCategories,
  initialCaseStudyCategories,
}: {
  post: SanityPostDoc & { composerSections?: CaseStudyComposerSection[] | null }
  relatedPosts: Parameters<typeof mapRelatedPosts>[0]
  slug: string
  authorName: string
  publishedLabel: string
  readTime: string
  initialBlogCategories?: SanityNavCategory[]
  initialCaseStudyCategories?: SanityNavCaseStudyCategory[]
}) {
  const related = mapRelatedPosts(relatedPosts)
  const data = mapPostToLayoutData(post, related)

  return (
    <div className="min-h-screen bg-white">
      <NavigationClient
        initialBlogCategories={initialBlogCategories}
        initialCaseStudyCategories={initialCaseStudyCategories}
      />
      <BlogComposerLayout
        data={data}
        sections={post.composerSections}
        authorName={authorName}
        publishedLabel={publishedLabel}
        readTime={readTime}
      />
      <Footer />
    </div>
  )
}
