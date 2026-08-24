import type { Template } from 'sanity'

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
  block('normal', "Present Softree's point of view and recommended approach."),
  block('h2', 'Implications for your roadmap'),
  block('normal', 'Translate the idea into decisions executives can make this quarter.'),
]

const productUpdateBody = [
  block('h2', "What's new"),
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
}

export const composerStarterSections: Array<Record<string, unknown>> = [
  { _type: 'csOverviewSection' },
  {
    _type: 'csNarrativeSection',
    label: 'The challenge',
    heading: 'What the client was up against',
    content: caseStudySections.challenge,
    layout: 'text',
  },
  {
    _type: 'csNarrativeSection',
    label: 'Our approach',
    heading: 'How we tackled it',
    content: caseStudySections.approach,
    layout: 'split',
  },
  {
    _type: 'csNarrativeSection',
    label: 'The outcome',
    heading: 'Results that matter',
    content: caseStudySections.outcome,
    layout: 'text',
  },
  {
    _type: 'csMetricsSection',
    label: 'Impact',
    heading: 'Results & business impact',
    metrics: [
      { _type: 'composerMetric', value: '—', label: 'Metric 1' },
      { _type: 'composerMetric', value: '—', label: 'Metric 2' },
      { _type: 'composerMetric', value: '—', label: 'Metric 3' },
    ],
  },
  {
    _type: 'csFaqSection',
    heading: 'Common questions',
    faqs: [
      {
        _type: 'composerFaq',
        question: 'What challenge did the client face?',
        answer: 'Describe the business problem in one or two sentences.',
      },
      {
        _type: 'composerFaq',
        question: 'What results were achieved?',
        answer: 'Summarize measurable outcomes and impact.',
      },
    ],
  },
  { _type: 'csContactSection' },
]

export const caseStudyComposerValue = {
  status: 'published' as const,
  visibility: 'published' as const,
  reviewStatus: 'approved' as const,
  featuredRank: 0,
  storyType: 'standard' as const,
  industry: 'Technology',
}

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

/** Editor-facing templates (sidebar + global Create) */
const editorTemplates: Template[] = [
  {
    id: 'caseStudy-composer',
    title: 'Case study',
    schemaType: 'caseStudy',
    value: caseStudyComposerValue,
  },
  {
    id: 'post-composer',
    title: 'Blog post',
    schemaType: 'post',
    value: {
      status: 'published',
      visibility: 'published',
      reviewStatus: 'approved',
      displayMode: 'classic',
      body: blogIntroBody,
    },
  },
  {
    id: 'marketing-landing',
    title: 'Marketing landing page',
    schemaType: 'marketingPage',
    value: {
      status: 'published',
      visibility: 'published',
      reviewStatus: 'approved',
      sections: marketingLandingSections,
    },
  },
]

/** Legacy templates — registered for old intents only; hidden from Create menu */
const legacyTemplates: Template[] = [
  {
    id: 'post-article',
    title: 'Blog — standard article (legacy)',
    schemaType: 'post',
    value: { status: 'published', visibility: 'published', reviewStatus: 'approved', displayMode: 'classic', body: blogIntroBody },
  },
  {
    id: 'post-how-to',
    title: 'Blog — how-to guide (legacy)',
    schemaType: 'post',
    value: { status: 'published', visibility: 'published', reviewStatus: 'approved', displayMode: 'classic', body: howToBody },
  },
  {
    id: 'post-thought-leadership',
    title: 'Blog — thought leadership (legacy)',
    schemaType: 'post',
    value: { status: 'published', visibility: 'published', reviewStatus: 'approved', displayMode: 'classic', body: thoughtLeadershipBody },
  },
  {
    id: 'post-product-update',
    title: 'Blog — product update (legacy)',
    schemaType: 'post',
    value: { status: 'published', visibility: 'published', reviewStatus: 'approved', displayMode: 'classic', body: productUpdateBody },
  },
]

export const documentTemplates: Template[] = [...editorTemplates, ...legacyTemplates]
