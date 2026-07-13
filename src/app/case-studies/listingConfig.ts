import { DEFAULT_ACCENT } from '@/lib/brand-defaults'

export const CASE_STUDIES_HUB_ACCENT = DEFAULT_ACCENT

export const CASE_STUDIES_HUB_FAQS = [
  {
    id: 1,
    serial: 'question 01',
    question: 'What core technologies are covered in Softree\'s case studies?',
    answer:
      'Our case studies showcase enterprise solutions built across Microsoft Power Platform (Power Apps, Automate, Copilot Studio), SharePoint / SPFx, Microsoft Fabric, Azure AI, custom React/Next.js applications, and AI-powered test automation platforms.',
  },
  {
    id: 2,
    serial: 'question 02',
    question: 'Are the client metrics and success rates in these stories verified?',
    answer:
      'Yes. All metrics—such as processing time reductions, automated claims rates, and SLA improvements—are derived from actual client-approved delivery data. Where details are simplified for NDA compliance, the structural outcomes remain 100% verified.',
  },
  {
    id: 3,
    serial: 'question 03',
    question: 'Can Softree replicate or adapt a featured case study solution for my business?',
    answer:
      'Absolutely. Most of our client engagements begin with a comparable reference story. We leverage our existing accelerators, Microsoft patterns, and offshore delivery frameworks to replicate similar workflows and scale them to your specific operational needs.',
  },
  {
    id: 4,
    serial: 'question 04',
    question: 'What is the typical delivery timeline for an enterprise automation project?',
    answer:
      'As documented in our case studies, phased delivery timelines typically range from 4 to 12 weeks. We follow agile execution models with bi-weekly sprints, ensuring visible, leadership-ready milestones and ROI early in the lifecycle.',
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
