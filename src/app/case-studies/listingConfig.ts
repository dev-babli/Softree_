import { DEFAULT_ACCENT } from '@/lib/brand-defaults'

export const CASE_STUDIES_HUB_ACCENT = DEFAULT_ACCENT

export const CASE_STUDIES_HUB_FAQS = [
  {
    id: 1,
    serial: 'question 01',
    question: 'What types of projects appear in Softree case studies?',
    answer:
      'Our library covers AI automation, Power Platform, SharePoint, web platforms, mobile apps, and data analytics — each story documents the business problem, delivery approach, and measurable outcomes.',
  },
  {
    id: 2,
    serial: 'question 02',
    question: 'How are case studies organized?',
    answer:
      'Stories are grouped by technology category and tagged by industry, use case, and company size so you can filter to projects most relevant to your context.',
  },
  {
    id: 3,
    serial: 'question 03',
    question: 'Can Softree deliver a project similar to one in the library?',
    answer:
      'Yes. Most engagements start from a comparable reference story. Share your goals in a consultation and we will map an approach based on proven delivery patterns from similar work.',
  },
  {
    id: 4,
    serial: 'question 04',
    question: 'Are the metrics in case studies verified?',
    answer:
      'Published outcomes come from client-approved project data. Where a metric is directional or estimated, it is labeled accordingly in the full case study narrative.',
  },
] as const

export const CASE_STUDIES_HUB_PROOF = {
  challengeText: 'Ready to become the next customer story on this page?',
  solutionText:
    'Every project here started with understanding a specific operational challenge — not a technology checklist. Tell us yours.',
  quote:
    'Softree mapped our workflow, shipped in phases, and gave us metrics we could present to leadership within the first month.',
  quoteName: 'Program Director',
  quoteRole: 'Enterprise Client · Operations',
  ctaHref: '/contact',
  ctaLabel: 'Discuss your project',
}
