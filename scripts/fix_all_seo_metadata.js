const fs = require('fs');
const path = require('path');

// 1. Map of production pages to their metadata specifications
const prodPageUpdates = [
  {
    filePath: 'src/app/solutions/ai-for-healthcare/page.tsx',
    route: '/solutions/ai-for-healthcare',
    title: 'AI for Healthcare Solutions | Softree Technology',
    description: 'Softree builds AI for healthcare—HIPAA-aware clinical documentation, patient scheduling, medical imaging assist, secure clinical knowledge search, and governed care-team workflows.'
  },
  {
    filePath: 'src/app/solutions/ai-for-financial-services/page.tsx',
    route: '/solutions/ai-for-financial-services',
    title: 'AI for Financial Services | Softree Technology',
    description: 'Custom AI solutions for banking, insurance, and wealth management. Secure fraud detection, AML compliance, intelligent document processing, and AI advisory systems.'
  },
  {
    filePath: 'src/app/solutions/ai-for-logistics/page.tsx',
    route: '/solutions/ai-for-logistics',
    title: 'AI for Logistics & Supply Chain Solutions | Softree Technology',
    description: 'AI-powered route optimization, demand forecasting, predictive maintenance, and autonomous warehouse operations for global logistics leaders.'
  },
  {
    filePath: 'src/app/solutions/ai-for-manufacturing/page.tsx',
    route: '/solutions/ai-for-manufacturing',
    title: 'AI for Manufacturing Solutions | Softree Technology',
    description: 'Industrial AI solutions for predictive maintenance, computer vision quality inspection, production optimization, and supply chain intelligence.'
  },
  {
    filePath: 'src/app/solutions/ai-workflow-automation/page.tsx',
    route: '/solutions/ai-workflow-automation',
    title: 'AI Workflow Automation Services | Softree Technology',
    description: 'End-to-end intelligent workflow automation, combining AI agents, LLM processing pipelines, and enterprise systems to automate high-friction business operations.'
  },
  {
    filePath: 'src/app/solutions/azure-openai-development/page.tsx',
    route: '/solutions/azure-openai-development',
    title: 'Azure OpenAI Development Services | Softree Technology',
    description: 'Enterprise Azure OpenAI application development. Custom GPT models, enterprise RAG search, copilot integration, and Microsoft cloud security standards.'
  },
  {
    filePath: 'src/app/solutions/document-ai-solutions/page.tsx',
    route: '/solutions/document-ai-solutions',
    title: 'Document AI Solutions & Intelligent OCR | Softree Technology',
    description: 'Extract, analyze, and automate document workflows with AI. High-accuracy intelligent OCR, multimodal document understanding, and ERP/CRM ingestion pipelines.'
  },
  {
    filePath: 'src/app/solutions/lang-graph-development/page.tsx',
    route: '/solutions/lang-graph-development',
    title: 'LangGraph Development Services | Softree Technology',
    description: 'Build stateful multi-agent systems, cyclic graphs, and resilient agent architectures with LangGraph engineering expertise from Softree.'
  },
  {
    filePath: 'src/app/solutions/multi-agent-systems/page.tsx',
    route: '/solutions/multi-agent-systems',
    title: 'Multi-Agent Systems Development | Softree Technology',
    description: 'Architect and deploy multi-agent AI systems where specialized agent swarms collaborate, self-correct, and execute complex business goals at scale.'
  },
  {
    filePath: 'src/app/services/ai-consulting-services/page.tsx',
    route: '/services/ai-consulting-services',
    title: 'AI Consulting Services | Softree Technology',
    description: 'Strategic AI consulting, feasibility assessments, readiness roadmaps, and architecture governance for enterprise AI adoption.'
  },
  {
    filePath: 'src/app/services/ai-chatbot-development/page.tsx',
    route: '/services/ai-chatbot-development',
    title: 'AI Chatbot Development Services | Softree Technology',
    description: 'Custom AI chatbots and conversational assistants built on Azure, OpenAI, and open-source models for 24/7 customer experience and employee workflows.'
  },
  {
    filePath: 'src/app/services/ai-healthcare-development-service/page.tsx',
    route: '/services/ai-healthcare-development-service',
    title: 'AI Healthcare Development Services | Softree Technology',
    description: 'HIPAA-compliant AI healthcare software development. Clinical decision support, EHR integrations, patient triage bots, and medical data pipelines.'
  },
  {
    filePath: 'src/app/services/enterprise-ai-solution/page.tsx',
    route: '/services/enterprise-ai-solution',
    title: 'Enterprise AI Solutions | Softree Technology',
    description: 'Transform enterprise operations with custom AI architectures, foundation model fine-tuning, vector search databases, and secure private cloud deployments.'
  },
  {
    filePath: 'src/app/services/multi-agent-systems-development/page.tsx',
    route: '/services/multi-agent-systems-development',
    title: 'Multi-Agent Systems Engineering | Softree Technology',
    description: 'Engineering multi-agent collaborative networks for complex enterprise decision systems, distributed operations, and autonomous task execution.'
  },
  {
    filePath: 'src/app/services/azure-openai-development-partner/page.tsx',
    route: '/services/azure-openai-development-partner',
    title: 'Azure OpenAI Development Partner | Softree Technology',
    description: 'Microsoft-certified Azure OpenAI development partner. Production deployment of GPT-4o, embeddings, fine-tuning, and enterprise security guardrails.'
  },
  {
    filePath: 'src/app/services/amazon-bedrock-agentcore-development/page.tsx',
    route: '/services/amazon-bedrock-agentcore-development',
    title: 'Amazon Bedrock & Agent Development | Softree Technology',
    description: 'Build enterprise generative AI applications using AWS Amazon Bedrock, Claude, Titan models, Knowledge Bases, and secure cloud agents.'
  },
  {
    filePath: 'src/app/services/amazon-nova-2-sonic-solutions/page.tsx',
    route: '/services/amazon-nova-2-sonic-solutions',
    title: 'Amazon Nova & Sonic AI Solutions | Softree Technology',
    description: 'Deploy ultra-fast multimodal AI agents and generative systems powered by Amazon Nova and real-time voice architectures.'
  },
  {
    filePath: 'src/app/services/offshore-langchain-development/page.tsx',
    route: '/services/offshore-langchain-development',
    title: 'Offshore LangChain Development | Softree Technology',
    description: 'Expert offshore LangChain development teams for building RAG pipelines, agent tools, custom vector store integrations, and memory management.'
  },
  {
    filePath: 'src/app/services/offshore-langgraph-development/page.tsx',
    route: '/services/offshore-langgraph-development',
    title: 'Offshore LangGraph Development | Softree Technology',
    description: 'Dedicated offshore engineering pods specialized in stateful multi-agent workflows and LangGraph production architectures.'
  },
  {
    filePath: 'src/app/services/security-testing-services/page.tsx',
    route: '/services/security-testing-services',
    title: 'Security Testing Services | Softree Technology',
    description: 'Application security testing, penetration testing, vulnerability assessments, and AI safety evaluations for web, mobile, and cloud apps.'
  },
  {
    filePath: 'src/app/services/agentic-ai-testing-services/page.tsx',
    route: '/services/agentic-ai-testing-services',
    title: 'Agentic AI Testing Services | Softree Technology',
    description: 'Comprehensive QA and safety benchmarking for AI agents, prompt injection testing, hallucination evaluation, and autonomous behavior verification.'
  },
  {
    filePath: 'src/app/services/logistics-testing-services/page.tsx',
    route: '/services/logistics-testing-services',
    title: 'Logistics Software Testing Services | Softree Technology',
    description: 'Specialized QA and performance testing for supply chain management systems, TMS, WMS, and IoT fleet tracking platforms.'
  },
  {
    filePath: 'src/app/industries/ai-for-it-services-solutions/page.tsx',
    route: '/industries/ai-for-it-services-solutions',
    title: 'AI Solutions for IT Services & MSPs | Softree Technology',
    description: 'Accelerate IT service delivery, automated ticket triage, code generation assistance, and infrastructure anomaly detection with custom AI.'
  },
  {
    filePath: 'src/app/industries/healthcare-ai-solutions/page.tsx',
    route: '/industries/healthcare-ai-solutions',
    title: 'Healthcare AI Solutions & Engineering | Softree Technology',
    description: 'HIPAA-ready healthcare AI solutions: clinical automation, patient scheduling, automated triage, and medical data search.'
  },
  {
    filePath: 'src/app/industries/offshore-logistics-supply-chain-engineering/page.tsx',
    route: '/industries/offshore-logistics-supply-chain-engineering',
    title: 'Logistics & Supply Chain Engineering | Softree Technology',
    description: 'Offshore software engineering for global freight forwarders, 3PL providers, warehouse automation, and transportation management.'
  },
  {
    filePath: 'src/app/webanalyser/page.tsx',
    route: '/webanalyser',
    title: 'WebAnalyser | Website Performance & SEO Audit Platform',
    description: 'Free comprehensive website audit tool for performance, technical SEO, accessibility, and Core Web Vitals analysis.'
  }
];

// Helper to update production page metadata
prodPageUpdates.forEach(item => {
  const fullPath = path.resolve(item.filePath);
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️ Skip missing file: ${item.filePath}`);
    return;
  }
  let content = fs.readFileSync(fullPath, 'utf8');

  // Ensure Metadata and applyPageOg are imported
  if (!content.includes("from '@/lib/site-metadata'") && !content.includes('from "@/lib/site-metadata"')) {
    content = `import { applyPageOg } from "@/lib/site-metadata";\n` + content;
  }
  if (!content.includes("type { Metadata }") && !content.includes("type Metadata") && !content.includes("{ Metadata }")) {
    content = `import type { Metadata } from "next";\n` + content;
  }

  // Check if metadata export exists
  const metaRegex = /export\s+const\s+metadata\s*(:\s*Metadata)?\s*=\s*(applyPageOg\([^,]+,\s*)?\{[\s\S]*?\n\};?/m;
  const canonicalUrl = `https://www.softreetechnology.com${item.route}`;

  const newMetaBlock = `export const metadata: Metadata = applyPageOg("${item.route}", {
  title: "${item.title}",
  description:
    "${item.description}",
  alternates: {
    canonical: "${canonicalUrl}",
  },
  openGraph: {
    title: "${item.title}",
    description:
      "${item.description}",
    url: "${canonicalUrl}",
    siteName: "Softree Technology",
    type: "website",
  },
});`;

  if (metaRegex.test(content)) {
    content = content.replace(metaRegex, newMetaBlock);
  } else {
    // Insert before default export
    content = content.replace(/export\s+default\s+function/, `${newMetaBlock}\n\nexport default function`);
  }

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`✅ Updated metadata for: ${item.route}`);
});

// 2. Test / Preview / Scratch pages to apply robots: { index: false, follow: false }
const testPageFiles = [
  'src/app/hero-test/page.tsx',
  'src/app/human-head-hero-test/page.tsx',
  'src/app/homepage-light-demo/page.tsx',
  'src/app/particle-preview/page.tsx',
  'src/app/record-slides/page.tsx',
  'src/app/Scroll-hero-test/page.tsx',
  'src/app/sentry-example-page/page.tsx',
  'src/app/servicepage_new/page.tsx',
  'src/app/story-reel-demo/page.tsx',
  'src/app/timeline-component-05/page.tsx',
  'src/app/wireframe/page.tsx',
  'src/app/demo-vigorous/page.tsx',
  'src/app/case-studies/preview/page.tsx',
  'src/app/case-studies/layout-showcase/page.tsx',
  'src/app/engineering-solutions/page.tsx',
  'src/app/industries/healthcare-ai-solutions/curtain-slider/page.tsx',
  'src/app/services/ai-development-services/curtain-slider/page.tsx',
  'src/app/showcase/avoora-studio/page.tsx',
  'src/app/showcase/diet-soda/page.tsx',
  'src/app/showcase/gradient-sculpture/page.tsx',
  'src/app/showcase/hero-intro/page.tsx',
  'src/app/showcase/hero-intro/reference/page.tsx',
  'src/app/showcase/home-intro/page.tsx',
  'src/app/showcase/madar-case-study/page.tsx',
  'src/app/showcase/nexus-card/page.tsx',
  'src/app/showcase/react-bits/page.tsx',
  'src/app/showcase/spiral-gallery/page.tsx',
  'src/app/showcase/stuxen-hero/page.tsx',
  'src/app/showcase/vectr-staffing/page.tsx'
];

testPageFiles.forEach(rel => {
  const fullPath = path.resolve(rel);
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️ Skip missing test file: ${rel}`);
    return;
  }
  let content = fs.readFileSync(fullPath, 'utf8');

  if (!content.includes('robots: { index: false, follow: false }')) {
    if (!content.includes('Metadata')) {
      content = `import type { Metadata } from "next";\n` + content;
    }
    const noIndexMeta = `export const metadata: Metadata = {
  title: "Preview / Internal | Softree Technology",
  robots: { index: false, follow: false },
};\n\n`;

    if (content.includes('export const metadata')) {
      // Add robots property inside metadata
      content = content.replace(/export\s+const\s+metadata[^{]*\{/, `export const metadata: Metadata = {\n  robots: { index: false, follow: false },`);
    } else {
      content = content.replace(/export\s+default\s+function/, `${noIndexMeta}export default function`);
    }

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`🔒 Marked as noindex: ${rel}`);
  }
});
console.log('\nDone applying SEO metadata & noindex policies!');
