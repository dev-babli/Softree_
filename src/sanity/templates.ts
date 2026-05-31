import type { Template } from 'sanity'

import { CASE_STUDY_LAYOUTS } from '@/lib/case-study-layouts'

const block = (style: string, text: string) => ({
  _type: 'block' as const,
  style,
  markDefs: [],
  children: [{ _type: 'span' as const, text, marks: [] as string[] }],
})

const sectionParagraph = (text: string) => [block('normal', text)]

const blogIntroBody = [
  block('h2', 'Introduction'),
  block('normal', 'Open with the problem your reader cares about and why this topic matters now.'),
  block('h2', 'Key takeaways'),
  block('normal', 'Summarize the most important points in a short paragraph.'),
  block('h2', 'What we learned'),
  block('normal', 'Share practical insights, examples, and recommendations your audience can apply.'),
  block('h2', 'Next steps'),
  block('normal', 'Close with a clear action or invitation to continue the conversation with Softree.'),
]

const howToBody = [
  block('h2', 'Who this is for'),
  block('normal', 'Describe the audience and prerequisites in one short paragraph.'),
  block('h2', 'Step 1 — Prepare'),
  block('normal', 'Explain the first concrete step with enough detail to act on.'),
  block('h2', 'Step 2 — Implement'),
  block('normal', 'Walk through the core implementation or process.'),
  block('h2', 'Step 3 — Validate'),
  block('normal', 'How to verify success and common pitfalls to avoid.'),
  block('h2', 'When to get help'),
  block('normal', 'Offer Softree as a partner for complex or scaled rollouts.'),
]

const thoughtLeadershipBody = [
  block('h2', 'The shift'),
  block('normal', 'Frame the industry or technology change in plain language.'),
  block('h2', 'What most teams get wrong'),
  block('normal', 'Challenge a common assumption with evidence or examples.'),
  block('h2', 'A better operating model'),
  block('normal', 'Present Softree\'s point of view and recommended approach.'),
  block('h2', 'Implications for your roadmap'),
  block('normal', 'Translate the idea into decisions executives can make this quarter.'),
]

const productUpdateBody = [
  block('h2', 'What\'s new'),
  block('normal', 'Lead with the headline capability or release in one sentence.'),
  block('h2', 'Why it matters'),
  block('normal', 'Connect the release to customer outcomes and use cases.'),
  block('h2', 'How to use it'),
  block('normal', 'Short usage notes or links to documentation.'),
]

const caseStudySections = {
  challenge: sectionParagraph(
    'Describe the business context, constraints, and pain points the client faced before the project.',
  ),
  approach: sectionParagraph(
    'Explain the strategy, architecture, and delivery choices that shaped the solution.',
  ),
  outcome: sectionParagraph(
    'Highlight measurable results, operational improvements, and long-term impact.',
  ),
  extra: [
    block('h2', 'What\'s next'),
    block(
      'normal',
      'Optional closing section on roadmap, expansion, or lessons for similar organizations.',
    ),
  ],
}

const caseStudyBase = (category: string, technologies: string[] = []) => ({
  status: 'published' as const,
  featured: false,
  category,
  technologies,
  challengeContent: caseStudySections.challenge,
  approachContent: caseStudySections.approach,
  outcomeContent: caseStudySections.outcome,
  body: caseStudySections.extra,
  highlights: [
    { _type: 'highlight', value: '—', label: 'Metric 1' },
    { _type: 'highlight', value: '—', label: 'Metric 2' },
    { _type: 'highlight', value: '—', label: 'Metric 3' },
  ],
})

const marketingLandingSections = [
  {
    _type: 'pageHeroBlock',
    eyebrow: 'Softree Technology',
    headline: 'Headline for your campaign',
    subheadline: 'One sentence on the outcome you deliver.',
    primaryCta: { label: 'Talk to us', href: '/contact' },
  },
  {
    _type: 'pageFeatureGridBlock',
    heading: 'Why teams choose Softree',
    features: [
      { _type: 'object', title: 'Capability one', description: 'Short benefit statement.' },
      { _type: 'object', title: 'Capability two', description: 'Short benefit statement.' },
      { _type: 'object', title: 'Capability three', description: 'Short benefit statement.' },
    ],
  },
  {
    _type: 'pageCtaBlock',
    headline: 'Ready to start?',
    body: 'Tell us about your goals and timeline.',
    buttonLabel: 'Book a call',
    buttonHref: '/contact',
  },
]

const premiumLayoutTemplate = (layout: string, category = 'web') => ({
  ...caseStudyBase(category),
  detailLayout: layout,
  status: 'draft' as const,
})

export const documentTemplates: Template[] = [
  {
    id: 'post-article',
    title: 'Blog — standard article',
    schemaType: 'post',
    value: { status: 'published', body: blogIntroBody },
  },
  {
    id: 'post-how-to',
    title: 'Blog — how-to guide',
    schemaType: 'post',
    value: { status: 'published', body: howToBody },
  },
  {
    id: 'post-thought-leadership',
    title: 'Blog — thought leadership',
    schemaType: 'post',
    value: { status: 'published', body: thoughtLeadershipBody },
  },
  {
    id: 'post-product-update',
    title: 'Blog — product update',
    schemaType: 'post',
    value: { status: 'published', body: productUpdateBody },
  },
  {
    id: 'caseStudy-article',
    title: 'Case study — general',
    schemaType: 'caseStudy',
    value: caseStudyBase('web'),
  },
  {
    id: 'caseStudy-ai',
    title: 'Case study — AI & ML',
    schemaType: 'caseStudy',
    value: caseStudyBase('ai', ['Azure OpenAI', 'Python', 'RAG']),
  },
  {
    id: 'caseStudy-power-platform',
    title: 'Case study — Power Platform',
    schemaType: 'caseStudy',
    value: caseStudyBase('power-platform', ['Power Apps', 'Power Automate', 'Dataverse']),
  },
  {
    id: 'caseStudy-sharepoint',
    title: 'Case study — SharePoint',
    schemaType: 'caseStudy',
    value: caseStudyBase('sharepoint', ['SharePoint Online', 'Microsoft 365']),
  },
  {
    id: 'caseStudy-web',
    title: 'Case study — web',
    schemaType: 'caseStudy',
    value: caseStudyBase('web', ['Next.js', 'React', 'TypeScript']),
  },
  {
    id: 'caseStudy-mobile',
    title: 'Case study — mobile',
    schemaType: 'caseStudy',
    value: caseStudyBase('mobile', ['React Native', 'iOS', 'Android']),
  },
  {
    id: 'caseStudy-data-analytics',
    title: 'Case study — data analytics',
    schemaType: 'caseStudy',
    value: caseStudyBase('data-analytics', ['Power BI', 'Azure Synapse', 'SQL']),
  },
  {
    id: 'marketing-landing',
    title: 'Marketing — landing page',
    schemaType: 'marketingPage',
    value: {
      status: 'draft',
      sections: marketingLandingSections,
    },
  },
  ...CASE_STUDY_LAYOUTS.map((layout) => ({
    id: `caseStudy-layout-${layout.value}`,
    title: `Case study — ${layout.title}`,
    schemaType: 'caseStudy' as const,
    value: premiumLayoutTemplate(layout.value),
  })),
]

/** Map category value → preferred case study template id for structure shortcuts. */
export const caseStudyTemplateByCategory: Record<string, string> = {
  ai: 'caseStudy-ai',
  'power-platform': 'caseStudy-power-platform',
  sharepoint: 'caseStudy-sharepoint',
  web: 'caseStudy-web',
  mobile: 'caseStudy-mobile',
  'data-analytics': 'caseStudy-data-analytics',
}
