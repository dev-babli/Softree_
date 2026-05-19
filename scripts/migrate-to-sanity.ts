#!/usr/bin/env tsx
/**
 * Data Migration Script: Hardcoded Content → Sanity CMS
 * 
 * This script extracts content from your existing Next.js pages
 * and creates corresponding documents in Sanity.
 * 
 * Usage:
 *   npx tsx scripts/migrate-to-sanity.ts
 * 
 * Prerequisites:
 *   - Set SANITY_API_WRITE_TOKEN in .env.local
 *   - Sanity project initialized
 */

import { createClient } from '@sanity/client'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// =============================================================================
// CONFIGURATION
// =============================================================================

const SANITY_CONFIG = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN || '',
}

if (!SANITY_CONFIG.token) {
  console.error('❌ Error: SANITY_API_WRITE_TOKEN environment variable is required')
  console.error('   Get your token from: https://www.sanity.io/manage')
  process.exit(1)
}

// Create write client
const client = createClient({
  ...SANITY_CONFIG,
  useCdn: false,
})

// =============================================================================
// SERVICE DATA (Extracted from your existing pages)
// =============================================================================

const SERVICES_DATA = [
  {
    _type: 'service',
    _id: 'sharepoint-service',
    title: 'SharePoint Development',
    slug: { _type: 'slug', current: 'digital-workspace/sharepoint' },
    serviceCategory: 'digital-workspace',
    subCategory: 'sharepoint',
    heroHeadline: 'Enterprise SharePoint Solutions for Modern Workplaces',
    heroSubheadline: 'Custom SharePoint development, intranets, document management, and Microsoft 365 integration tailored to your business workflow.',
    metaTitle: 'SharePoint Development Services | Softree Technology',
    metaDescription: 'Expert SharePoint development services for intranets, document management, workflows, and Microsoft 365 integration. UK, USA, Australia, UAE.',
    keywords: ['SharePoint Development', 'SharePoint Intranet', 'Microsoft 365', 'Document Management', 'SharePoint Online'],
    features: [
      { title: 'Custom Intranet Development', description: 'Modern, responsive intranets with Power Platform integration', icon: 'Layout' },
      { title: 'Document Management', description: 'Advanced versioning, metadata, and automated workflows', icon: 'Files' },
      { title: 'SPFx Web Parts', description: 'Custom React/TypeScript web parts for SharePoint', icon: 'Code' },
      { title: 'Power Platform Integration', description: 'Connect Power Apps, Automate, and BI with SharePoint', icon: 'Zap' },
    ],
    benefits: [
      { title: '40% Faster Document Retrieval', description: 'Intelligent search and metadata tagging' },
      { title: 'Streamlined Collaboration', description: 'Real-time co-authoring and version control' },
      { title: 'Compliance Ready', description: 'GDPR, HIPAA, and industry-specific compliance features' },
    ],
    isActive: true,
    isFeatured: true,
    order: 1,
  },
  {
    _type: 'service',
    _id: 'power-platform-service',
    title: 'Power Platform Solutions',
    slug: { _type: 'slug', current: 'business-applications/power-platform' },
    serviceCategory: 'business-applications',
    subCategory: 'power-platform',
    heroHeadline: 'Low-Code Business Applications with Power Platform',
    heroSubheadline: 'Rapid application development using Power Apps, Power Automate, Power BI, and Power Virtual Agents.',
    metaTitle: 'Microsoft Power Platform Services | Softree Technology',
    metaDescription: 'Power Apps, Power Automate, Power BI development services. Build low-code business applications 10x faster.',
    keywords: ['Power Platform', 'Power Apps', 'Power Automate', 'Power BI', 'Low-Code Development'],
    features: [
      { title: 'Power Apps Development', description: 'Canvas and model-driven apps for web and mobile', icon: 'Smartphone' },
      { title: 'Power Automate Flows', description: 'Automated workflows connecting 400+ services', icon: 'Workflow' },
      { title: 'Power BI Dashboards', description: 'Interactive reports and real-time analytics', icon: 'BarChart' },
      { title: 'AI Builder Integration', description: 'AI-powered predictions and form processing', icon: 'Brain' },
    ],
    benefits: [
      { title: '10x Faster Development', description: 'Low-code approach reduces build time dramatically' },
      { title: '80% Cost Reduction', description: 'Compared to traditional custom development' },
      { title: 'Enterprise Security', description: 'Built on Microsoft 365 security framework' },
    ],
    isActive: true,
    isFeatured: true,
    order: 2,
  },
  {
    _type: 'service',
    _id: 'agentic-ai-service',
    title: 'Agentic AI Solutions',
    slug: { _type: 'slug', current: 'ai-intelligence/agentic-ai' },
    serviceCategory: 'ai-intelligence',
    subCategory: 'agentic-ai',
    heroHeadline: 'Autonomous AI Agents for Enterprise Automation',
    heroSubheadline: 'Deploy intelligent AI agents that automate complex workflows, make decisions, and integrate with your existing systems.',
    metaTitle: 'Agentic AI Development Services | Softree Technology',
    metaDescription: 'Build autonomous AI agents for workflow automation, decision intelligence, and enterprise process optimization.',
    keywords: ['Agentic AI', 'AI Agents', 'Autonomous AI', 'Workflow Automation', 'Enterprise AI'],
    features: [
      { title: 'Autonomous Task Execution', description: 'AI agents that complete multi-step tasks independently', icon: 'Bot' },
      { title: 'Decision Intelligence', description: 'AI-powered decision making with explainable reasoning', icon: 'GitBranch' },
      { title: 'Multi-System Integration', description: 'Connect with ERP, CRM, SharePoint, and custom APIs', icon: 'Link' },
      { title: 'Human-in-the-Loop', description: 'Seamless escalation for complex approvals', icon: 'Users' },
    ],
    benefits: [
      { title: '24/7 Operation', description: 'AI agents work continuously without breaks' },
      { title: '90% Error Reduction', description: 'Consistent execution eliminates human error' },
      { title: 'Scalable Intelligence', description: 'Deploy once, replicate across departments' },
    ],
    isActive: true,
    isFeatured: true,
    order: 3,
  },
  {
    _type: 'service',
    _id: 'react-web-development',
    title: 'React Web Development',
    slug: { _type: 'slug', current: 'digital-workspace/react-web-development' },
    serviceCategory: 'digital-workspace',
    subCategory: 'react-web-development',
    heroHeadline: 'Modern React & Next.js Web Applications',
    heroSubheadline: 'High-performance web apps built with React, Next.js, TypeScript, and cutting-edge architecture.',
    metaTitle: 'React Web Development Services | Softree Technology',
    metaDescription: 'Expert React and Next.js development. Fast, SEO-friendly web applications with modern architecture.',
    keywords: ['React Development', 'Next.js', 'TypeScript', 'Web Development', 'Frontend'],
    features: [
      { title: 'Next.js Architecture', description: 'Server components, App Router, and edge deployment', icon: 'Globe' },
      { title: 'Performance Optimization', description: 'Core Web Vitals, lazy loading, and code splitting', icon: 'Gauge' },
      { title: 'SEO Excellence', description: 'Server-side rendering for search visibility', icon: 'Search' },
      { title: 'Type Safety', description: 'Full TypeScript implementation across the stack', icon: 'Shield' },
    ],
    benefits: [
      { title: 'Lightning Fast', description: 'Sub-second load times with edge caching' },
      { title: 'SEO Optimized', description: 'Perfect Lighthouse scores for search rankings' },
      { title: 'Future Proof', description: 'Latest React patterns and best practices' },
    ],
    isActive: true,
    isFeatured: false,
    order: 4,
  },
]

// =============================================================================
// TESTIMONIALS DATA
// =============================================================================

const TESTIMONIALS_DATA = [
  {
    _type: 'testimonial',
    _id: 'testimonial-1',
    quote: 'Softree transformed our SharePoint intranet into a modern, user-friendly platform. Our employee engagement increased by 60% and document retrieval time dropped by 80%.',
    author: 'Sarah Mitchell',
    authorTitle: 'Chief Technology Officer',
    company: 'GlobalFin Solutions',
    rating: 5,
    category: 'sharepoint',
    isFeatured: true,
    order: 1,
  },
  {
    _type: 'testimonial',
    _id: 'testimonial-2',
    quote: 'The Power Platform solution Softree built automated our entire invoice processing workflow. What used to take 3 days now happens in 2 hours with zero errors.',
    author: 'Michael Chen',
    authorTitle: 'Operations Director',
    company: 'Manufacturing Corp',
    rating: 5,
    category: 'power-platform',
    isFeatured: true,
    order: 2,
  },
  {
    _type: 'testimonial',
    _id: 'testimonial-3',
    quote: 'Their AI agents handle our customer service triage 24/7. We\'ve reduced response time by 90% and our human agents can focus on complex issues.',
    author: 'Priya Sharma',
    authorTitle: 'Head of Customer Experience',
    company: 'TechServe Ltd',
    rating: 5,
    category: 'ai-intelligence',
    isFeatured: true,
    order: 3,
  },
]

// =============================================================================
// FAQ DATA
// =============================================================================

const FAQS_DATA = [
  {
    _type: 'faq',
    _id: 'faq-sharepoint-1',
    question: 'What is SharePoint and how can it help my business?',
    answer: [
      {
        _type: 'block',
        _key: 'answer-1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span-1',
            text: 'Microsoft SharePoint is a cloud-based platform for collaboration, document management, and intranet sites. It helps businesses by providing a centralized hub for content, streamlined workflows, and seamless integration with Microsoft 365. Benefits include improved team collaboration, secure document sharing, automated business processes, and enterprise search capabilities.',
            marks: [],
          },
        ],
      },
    ],
    category: 'sharepoint',
    isActive: true,
    order: 1,
  },
  {
    _type: 'faq',
    _id: 'faq-sharepoint-2',
    question: 'How long does a typical SharePoint intranet project take?',
    answer: [
      {
        _type: 'block',
        _key: 'answer-1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span-1',
            text: 'A typical SharePoint intranet project takes 6-12 weeks depending on complexity. This includes requirements gathering, design, development, content migration, user training, and launch. Simple intranets with standard features can be delivered in 4-6 weeks, while complex custom solutions with multiple integrations may take 3-4 months.',
            marks: [],
          },
        ],
      },
    ],
    category: 'sharepoint',
    isActive: true,
    order: 2,
  },
  {
    _type: 'faq',
    _id: 'faq-power-platform-1',
    question: 'What is Microsoft Power Platform?',
    answer: [
      {
        _type: 'block',
        _key: 'answer-1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span-1',
            text: 'Microsoft Power Platform is a suite of low-code tools including Power Apps (custom applications), Power Automate (workflow automation), Power BI (business intelligence), and Power Virtual Agents (chatbots). It enables rapid development of business solutions with minimal coding, connecting to 400+ data sources including SharePoint, Dynamics 365, and external APIs.',
            marks: [],
          },
        ],
      },
    ],
    category: 'power-platform',
    isActive: true,
    order: 1,
  },
  {
    _type: 'faq',
    _id: 'faq-agentic-ai-1',
    question: 'What are AI agents and how do they differ from traditional automation?',
    answer: [
      {
        _type: 'block',
        _key: 'answer-1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span-1',
            text: 'AI agents are autonomous software entities that can perceive their environment, make decisions, and take actions to achieve goals. Unlike traditional automation (RPA) which follows rigid rules, AI agents use machine learning to handle variability, make judgments, and learn from experience. They can handle complex, multi-step workflows that require reasoning, such as customer service triage, content moderation, or intelligent document processing.',
            marks: [],
          },
        ],
      },
    ],
    category: 'agentic-ai',
    isActive: true,
    order: 1,
  },
]

// =============================================================================
// TEAM MEMBERS DATA
// =============================================================================

const TEAM_DATA = [
  {
    _type: 'teamMember',
    _id: 'team-ceo',
    name: 'Soumeet Kumar Barik',
    slug: { _type: 'slug', current: 'soumeet-kumar-barik' },
    role: 'Founder & CEO',
    department: 'leadership',
    bio: [
      {
        _type: 'block',
        _key: 'bio-1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span-1',
            text: 'Soumeet founded Softree Technology in 2013 with a vision to deliver enterprise-grade software solutions from India to the world. With expertise in Microsoft technologies and AI, he has grown Softree into a trusted partner for clients across the UK, USA, Australia, and UAE.',
            marks: [],
          },
        ],
      },
    ],
    expertise: ['Strategic Leadership', 'Microsoft Technologies', 'AI Strategy', 'Offshore Development'],
    isActive: true,
    order: 1,
  },
]

// =============================================================================
// GLOBAL SETTINGS
// =============================================================================

const GLOBAL_SETTINGS_DATA = {
  _type: 'globalSettings',
  _id: 'global-settings',
  siteName: 'Softree Technology',
  siteUrl: 'https://www.softreetechnology.com',
  defaultMetaTitle: 'Softree Technology - Microsoft SharePoint, Power Platform & AI Solutions',
  defaultMetaDescription: 'India-based offshore software development company specializing in Microsoft SharePoint, Power Platform, and Agentic AI solutions for UK, USA, Australia, UAE.',
  socialLinks: {
    linkedin: 'https://www.linkedin.com/company/softree-technology',
    clutch: 'https://clutch.co/profile/softree-technology',
  },
  contactInfo: {
    email: 'info@softreetechnology.com',
    phone: '+91 70086 99927',
  },
  analytics: {
    gtmId: 'GTM-TQ7JWSNQ',
  },
}

// =============================================================================
// MIGRATION FUNCTIONS
// =============================================================================

async function migrateDocument(doc: any): Promise<void> {
  try {
    await client.createOrReplace(doc)
    console.log(`✅ Migrated: ${doc._type} (${doc._id})`)
  } catch (error) {
    console.error(`❌ Failed: ${doc._type} (${doc._id})`, error)
    throw error
  }
}

async function runMigration(): Promise<void> {
  console.log('🚀 Starting Sanity Migration...\n')
  console.log(`📍 Project: ${SANITY_CONFIG.projectId}`)
  console.log(`📊 Dataset: ${SANITY_CONFIG.dataset}\n`)

  const startTime = Date.now()

  // Migrate services
  console.log('📦 Migrating Services...')
  for (const service of SERVICES_DATA) {
    await migrateDocument(service)
  }
  console.log(`✅ ${SERVICES_DATA.length} services migrated\n`)

  // Migrate testimonials
  console.log('💬 Migrating Testimonials...')
  for (const testimonial of TESTIMONIALS_DATA) {
    await migrateDocument(testimonial)
  }
  console.log(`✅ ${TESTIMONIALS_DATA.length} testimonials migrated\n`)

  // Migrate FAQs
  console.log('❓ Migrating FAQs...')
  for (const faq of FAQS_DATA) {
    await migrateDocument(faq)
  }
  console.log(`✅ ${FAQS_DATA.length} FAQs migrated\n`)

  // Migrate team
  console.log('👥 Migrating Team Members...')
  for (const member of TEAM_DATA) {
    await migrateDocument(member)
  }
  console.log(`✅ ${TEAM_DATA.length} team members migrated\n`)

  // Migrate global settings
  console.log('⚙️  Migrating Global Settings...')
  await migrateDocument(GLOBAL_SETTINGS_DATA)
  console.log('✅ Global settings migrated\n')

  const duration = (Date.now() - startTime) / 1000
  console.log(`✨ Migration complete in ${duration.toFixed(2)}s`)
  console.log('\n📋 Summary:')
  console.log(`   • ${SERVICES_DATA.length} services`)
  console.log(`   • ${TESTIMONIALS_DATA.length} testimonials`)
  console.log(`   • ${FAQS_DATA.length} FAQs`)
  console.log(`   • ${TEAM_DATA.length} team members`)
  console.log(`   • 1 global settings document`)
  console.log(`\n🌐 View your content at: https://${SANITY_CONFIG.projectId}.sanity.studio`)
}

// Run migration
runMigration().catch((error) => {
  console.error('\n💥 Migration failed:', error)
  process.exit(1)
})
