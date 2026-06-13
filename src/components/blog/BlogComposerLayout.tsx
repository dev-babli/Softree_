import { mergeComposerStyleVars } from "@/lib/composer-style-vars"
import type { DesignTokenSettings } from "@/lib/design-tokens"
import type { CaseStudyLayoutData } from "@/components/case-studies/layouts/types"
import type { CaseStudyComposerSection } from "@/components/case-studies/composer/types"
import { CaseStudyComposer } from "@/components/case-studies/composer/CaseStudyComposer"
import { csLightClasses } from "@/components/case-studies/layouts/design-system/caseStudyLightTokens"
import { BlogHeroSection } from "./BlogHeroSection"

export function BlogComposerLayout({
  data,
  sections,
  authorName,
  publishedLabel,
  readTime,
  designTokens,
}: {
  data: CaseStudyLayoutData
  sections?: CaseStudyComposerSection[] | null
  authorName: string
  publishedLabel: string
  readTime: string
  designTokens?: DesignTokenSettings | null
}) {
  return (
    <article className={csLightClasses.shell} style={mergeComposerStyleVars(designTokens)}>
      <BlogHeroSection
        data={data}
        authorName={authorName}
        publishedLabel={publishedLabel}
        readTime={readTime}
      />
      <div id="content">
        <CaseStudyComposer sections={sections} data={data} contentMode="blog" />
      </div>
    </article>
  )
}
