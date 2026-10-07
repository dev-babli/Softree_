const fs = require('fs');
const path = require('path');

// Target production static routes
const proposedStaticRoutes = [
  // Primary Core Pages (Priority 1.0 - 0.95)
  { url: '/', priority: 1.0, changeFrequency: 'weekly' },
  { url: '/ai', priority: 0.95, changeFrequency: 'weekly' },
  { url: '/agentic-ai-platform', priority: 0.95, changeFrequency: 'weekly' },
  { url: '/ai-workflow-orchestration', priority: 0.95, changeFrequency: 'weekly' },
  { url: '/services', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/who-do-we-serve', priority: 0.85, changeFrequency: 'monthly' },
  { url: '/avoora', priority: 0.85, changeFrequency: 'monthly' },
  { url: '/showcase', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/webanalyser', priority: 0.8, changeFrequency: 'monthly' },

  // AI & Automation Services
  { url: '/services/ai-development-services', priority: 0.95, changeFrequency: 'weekly' },
  { url: '/services/generative-ai', priority: 0.95, changeFrequency: 'weekly' },
  { url: '/services/enterprise-generative-ai-development', priority: 0.95, changeFrequency: 'weekly' },
  { url: '/services/offshore-ai-development', priority: 0.95, changeFrequency: 'weekly' },
  { url: '/services/ai-consulting-services', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/services/ai-chatbot-development', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/services/ai-healthcare-development-service', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/services/enterprise-ai-solution', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/services/multi-agent-systems-development', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/services/azure-openai-development-partner', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/services/amazon-bedrock-agentcore-development', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/services/amazon-nova-2-sonic-solutions', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/services/offshore-langchain-development', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/services/offshore-langgraph-development', priority: 0.9, changeFrequency: 'weekly' },

  // QA & Testing Services
  { url: '/services/ai-powered-test-automation', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/services/automation-testing-services', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/services/agentic-ai-testing-services', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/services/security-testing-services', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/services/logistics-testing-services', priority: 0.9, changeFrequency: 'weekly' },

  // Solutions Hub
  { url: '/solutions/enterprise-rag-development', priority: 0.95, changeFrequency: 'weekly' },
  { url: '/solutions/lang-chain-development', priority: 0.95, changeFrequency: 'weekly' },
  { url: '/solutions/lang-graph-development', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/solutions/ai-agents-development', priority: 0.95, changeFrequency: 'weekly' },
  { url: '/solutions/ai-copilot-development', priority: 0.95, changeFrequency: 'weekly' },
  { url: '/solutions/ai-workflow-automation', priority: 0.95, changeFrequency: 'weekly' },
  { url: '/solutions/ai-chatbot-development', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/solutions/azure-openai-development', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/solutions/document-ai-solutions', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/solutions/multi-agent-systems', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/solutions/ai-for-healthcare', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/solutions/ai-for-financial-services', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/solutions/ai-for-logistics', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/solutions/ai-for-manufacturing', priority: 0.9, changeFrequency: 'weekly' },

  // Microsoft, Power Platform & Modern Workspace Services
  { url: '/services/power-bi-development-services', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/services/microsoft-fabric-development-services', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/services/offshore-power-platform-development', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/services/offshore-sharepoint-development', priority: 0.85, changeFrequency: 'monthly' },
  { url: '/services/offshore-spfx-development', priority: 0.85, changeFrequency: 'monthly' },
  { url: '/services/offshore-web-app-development', priority: 0.85, changeFrequency: 'monthly' },
  { url: '/services/offshore-mobile-app-development', priority: 0.85, changeFrequency: 'monthly' },
  { url: '/services/legacy-application-modernization', priority: 0.85, changeFrequency: 'monthly' },
  { url: '/services/website-modernization', priority: 0.85, changeFrequency: 'monthly' },
  { url: '/services/mvp', priority: 0.85, changeFrequency: 'monthly' },

  // Industry Solutions
  { url: '/industries/healthcare-ai-solutions', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/industries/healthcare-software-testing-services', priority: 0.85, changeFrequency: 'monthly' },
  { url: '/industries/offshore-logistics-supply-chain-engineering', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/industries/ai-for-it-services-solutions', priority: 0.85, changeFrequency: 'monthly' },

  // Case Studies & Categories
  { url: '/case-studies', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/case-studies/ai', priority: 0.85, changeFrequency: 'weekly' },
  { url: '/case-studies/data-analytics', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/case-studies/mobile', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/case-studies/power-platform', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/case-studies/sharepoint', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/case-studies/web', priority: 0.8, changeFrequency: 'monthly' },

  // Blog & Information
  { url: '/blog', priority: 0.9, changeFrequency: 'daily' },
  { url: '/about-us', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/contact', priority: 0.85, changeFrequency: 'monthly' },
  { url: '/careers', priority: 0.75, changeFrequency: 'weekly' },
  { url: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
  { url: '/terms', priority: 0.3, changeFrequency: 'yearly' },
];

console.log(`Total proposed static sitemap URLs: ${proposedStaticRoutes.length}`);

// Verify all exist in filesystem
let missing = 0;
proposedStaticRoutes.forEach(r => {
  const relPath = r.url === '/' ? 'page.tsx' : `${r.url.slice(1)}/page.tsx`;
  const fullPath = path.resolve('./src/app', relPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ MISSING FILE FOR ROUTE: ${r.url} -> ${fullPath}`);
    missing++;
  }
});

// Check against next.config.ts redirects
const nextConfig = fs.readFileSync('./next.config.ts', 'utf8');
const redirectRegex = /source:\s*['"]([^'"]+)['"]/g;
let m;
const redirects = [];
while ((m = redirectRegex.exec(nextConfig)) !== null) {
  redirects.push(m[1]);
}

let redirectConflicts = 0;
proposedStaticRoutes.forEach(r => {
  if (redirects.includes(r.url)) {
    console.error(`❌ ROUTE CONFLICTS WITH REDIRECT: ${r.url}`);
    redirectConflicts++;
  }
});

if (missing === 0 && redirectConflicts === 0) {
  console.log('✅ ALL 69 routes exist on disk AND NONE conflict with redirects!');
}
