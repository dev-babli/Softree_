/**
 * Softree content rewrite pass for AI home page.
 * Maps Kore.ai product-led copy → Softree services positioning.
 * Source truth: src/components/ai-premium/data/agentic-ai-content.ts
 */

/** @type {Array<[RegExp | string, string]>} */
export const CONTENT_REPLACEMENTS = [
  // ── Hero ──────────────────────────────────────────────────────────────
  [
    /Great experiences are\s+built on a strong foundation\./g,
    "Autonomous agents built for enterprise certainty.",
  ],
  [
    /The AI-programmable foundation for building, scaling, and optimizing AI agents that work in production\./g,
    "Design, deploy, and govern AI agents across Microsoft Copilot Studio, Azure AI, and Power Platform — with offshore delivery speed and production-grade guardrails.",
  ],
  [
    /AI agents ready for\s+customers and employees\.[\s\S]*?The only agent platform you can trust\./gi,
    "Microsoft-stack agent programs that ship in weeks — not demos that stall in pilot.",
  ],
  [
    /AI agents ready for customers and employees\.\s*The only agent platform you can trust\./gi,
    "Microsoft-stack agent programs that ship in weeks — not demos that stall in pilot.",
  ],
  [
    /Find the right AI use case for your business/g,
    "Find the right AI use case for your Microsoft stack",
  ],
  [
    /Meet <span class="artemis-green-2">\{<\/span> <span\s+class="text-style-italic bold-text">Softree(?: AI)?<\/span>/g,
    'Meet <span class="artemis-green-2">{</span> <span class="text-style-italic bold-text">Softree</span>',
  ],
  // Nav dropdown label "{ Softree AI }" (post lowercase-domain swap) → "{ Softree }"
  [
    /\{\s*Softree AI\s*\}/g,
    "{ Softree }",
  ],
  // "The Softree Agent Platform" eyebrow — whitespace/newline tolerant
  [
    /The Softree Agent\s+Platform/gi,
    "Agentic AI on Microsoft",
  ],
  [
    /\bAGENT\s+PLATFORM\b/g,
    "AGENTIC AI",
  ],
  // artemis-panel leftover subhead
  [
    /The AI-programmable platform for the agentic enterprise\./gi,
    "Microsoft-stack agents your IT team can audit, scale, and operate.",
  ],
  [
    /The AI-programmable foundation for building, scaling, and optimizing AI(?:&nbsp;|\s)*agents that work in production\./gi,
    "Design, deploy, and govern AI agents across Microsoft Copilot Studio, Azure AI, and Power Platform — with offshore delivery speed and production-grade guardrails.",
  ],
  [
    /Softree named a leader in The Forrester Wave™[^<]*/gi,
    "100+ AI engineers building on Microsoft Copilot Studio and Azure AI",
  ],
  [
    /Softree named a leader in the Forrester Wave™[^<]*/gi,
    "4–16 weeks from discovery to governed production rollout",
  ],
  [
    /Softree named a leader in the 2025 Gartner® Magic Quadrant™[^<]*/gi,
    "ISO 27001 delivery discipline with offshore velocity",
  ],
  [
    /Softree named a leader in Everest Group's Agentic AI Products PEAK Matrix® Assessment 2026/gi,
    "3,000+ projects delivered with 96% client retention",
  ],
  [
    /The Forrester Wave™ for[^<]{0,180}/gi,
    "Microsoft agent delivery with governance baked in from day one.",
  ],
  [
    /named a leader in the 2025 Gartner® Magic Quadrant™/gi,
    "delivers Microsoft AI programs enterprises trust",
  ],
  [
    /named a leader in the Forrester Wave™[^<]*/gi,
    "ships governed agents in 4–16 weeks",
  ],
  [
    /The Gartner® Magic Quadrant™ for\s+Conversational AI Platforms now includes[\s\S]*?multimodal interactions\./gi,
    "Softree implements agentic workflows on Microsoft Copilot Studio, Azure AI, and Power Platform — with governance your IT team can audit from day one.",
  ],
  [
    /Forrester recognized[\s\S]*?as a leader in the Forrester Wave™:[\s\S]*?strategy category\./gi,
    "We handle Microsoft stack plumbing so your team starts at business logic. Agents ship faster with offshore velocity.",
  ],
  [
    /Report:\s*Forrester Wave/gi,
    "Case study: Agentic AI",
  ],
  [
    /Your strategic enabler for enterprise AI transformation/gi,
    "Your Microsoft AI implementation partner for enterprise transformation",
  ],
  [
    /Agent Platform Your strategic enabler/gi,
    "Agentic AI — your Microsoft implementation partner",
  ],
  [
    /The Softree Agent Platform/g,
    "Agentic AI on Microsoft",
  ],
  [
    /Get a demo/gi,
    "Let's talk",
  ],
  [
    /Request a demo/gi,
    "Start a discovery call",
  ],
  [
    /Get demo/gi,
    "Let's talk",
  ],
  [
    /Talk to an expert/gi,
    "Talk to an AI engineer",
  ],
  [
    /Submit RFP/gi,
    "Start a project brief",
  ],

  // ── Meet Artemis → Softree agentic AI ─────────────────────────────────
  [
    /Meet\s*\{\s*Artemis\s*\}/gi,
    "Meet { Softree }",
  ],
  [
    /Agent Platform\s*\{\s*Artemis\s*\}/gi,
    "Agentic AI on Microsoft",
  ],
  [
    /Meet our new Agent Platform/gi,
    "Meet our agentic AI delivery model",
  ],
  [
    /MEET\s*\{ARTEMIS\}/gi,
    "MEET {SOFTREE}",
  ],
  [
    /Months to days\.\s*Not a roadmap\.\s*A runtime\./g,
    "Weeks to production. Not a pilot. A governed rollout.",
  ],
  [
    /Leverage AI with AI/g,
    "Build with Microsoft AI",
  ],

  // ── Three product cards (Pre-built / Accelerators / Tailored) ─────────
  [
    /Ready-to-deploy applications across industries and functions\./g,
    "HR, IT, finance, and customer ops accelerators on Copilot Studio and Power Automate.",
  ],
  [
    /Leverage pre-built AI agents, templates, and integrations from the Kore\.ai Marketplace\./g,
    "SharePoint, Dataverse, Fabric, and line-of-business APIs wired into agent context.",
  ],
  [
    /Design and build applications on our Agent Platform using our enterprise modules\./g,
    "Multi-agent orchestration, RAG pipelines, and human-in-the-loop governance.",
  ],
  [
    /Pre-built Applications/g,
    "Pre-built agent patterns",
  ],
  [
    /Application Accelerators/g,
    "Integration accelerators",
  ],
  [
    /Tailored Applications/g,
    "Custom agent systems",
  ],
  [
    /Use purpose-built agentic AI applications/g,
    "Deploy governed agent patterns on Microsoft 365",
  ],
  [
    /Leverage application accelerators from the Marketplace/g,
    "Connect agents to your data and workflows",
  ],
  [
    /Build unique applications to meet your needs/g,
    "Custom multi-agent systems for your enterprise",
  ],
  [
    /Use applications for Banking, Healthcare, Retail, HR, IT, and Recruiting today\./g,
    "Banking, healthcare, manufacturing, retail, and IT service desk agents — built on Copilot Studio.",
  ],
  [
    /Leverage our Marketplace of pre-built AI agents, templates, and integrations\./g,
    "Pre-built accelerators for SharePoint, Dataverse, and Power Automate.",
  ],
  [
    /Design \/ build applications on our Agent Platform across all enterprise use cases\./g,
    "Custom agent systems orchestrated across Teams, SharePoint, and your APIs.",
  ],
  [
    /Build agentic AI applications 10x faster with 100s of pre-built AI agents and templates\./g,
    "Ship agentic workflows 4× faster with Microsoft accelerators and offshore delivery speed.",
  ],
  [
    /Start using one of the pre-built AI agents, templates, and tools today, built by both Kore\.ai and our partners\./g,
    "Start with proven Copilot Studio patterns — customized by Softree for your environment.",
  ],
  [
    /Tailor applications to your enteprise goals on our industry-leading agent platform\./g,
    "Tailor agent systems to your enterprise goals on the Microsoft stack you already trust.",
  ],

  // ── Enterprise outcomes section ───────────────────────────────────────
  [
    /We've built our business by serving global enterprises/g,
    "We've delivered 3,000+ projects for growing enterprises",
  ],
  [
    /Discover why hundreds of enterprises use Kore\.ai\./g,
    "Discover why enterprises choose Softree for Microsoft AI delivery.",
  ],
  [
    /Drive faster business outcomes in customer service and employee productivity\./g,
    "Drive faster outcomes in customer service and employee productivity.",
  ],
  [
    /Make work more efficient, intelligent, and valuable across the organization\./g,
    "Make work more efficient with agents your IT team can audit and scale.",
  ],

  // ── Industry verticals ────────────────────────────────────────────────
  [
    /Banks, Credit Unions, Financial Institutions/g,
    "Banking & financial services",
  ],
  [
    /Payers, Providers, Life Sciences/g,
    "Healthcare & life sciences",
  ],
  [
    /Consumer Goods and Services/g,
    "Manufacturing & operations",
  ],
  [
    /Telecom, Media, Communications/g,
    "Retail & commerce",
  ],
  [
    /B2B Goods and Services/g,
    "IT, HR & internal ops",
  ],
  [
    /We solve the most urgent industry and enterprise challenges with regulation-approved applications\./g,
    "We solve industry challenges with compliance-ready agents on Microsoft 365.",
  ],
  [
    /Rising customer expectations, frequent bad experiences, and overwhelmed agents create constant service bottlenecks\./g,
    "Rising expectations and overwhelmed support teams create constant service bottlenecks.",
  ],
  [
    /Autonomous AI-powered agents provide AI-driven support for human agents and enable continuous service improvement\./g,
    "Copilot Studio agents augment human agents with shared context and continuous improvement.",
  ],
  [
    /Delivering frictionless customer experiences, empowering agents to perform at their best, and driving elevated business outcomes\./g,
    "Frictionless customer experiences, empowered agents, and measurable business outcomes.",
  ],
  [
    /Coordinate self-service and agent support with shared context, consistency, and built-in compliance\./g,
    "KYC research, policy Q&A, and advisor copilots with citation trails and role-based access.",
  ],
  [
    /Enable 24\/7 patient and member self-service and reduce staff burden with HIPAA-compliant intelligent assistance\./g,
    "Prior auth prep, scheduling assistants, and internal knowledge search across SOPs.",
  ],
  [
    /Frictionless shopping and optimized operations with instant, personalized support at every touchpoint\./g,
    "Support automation, merchandising insights, and store-ops assistants.",
  ],
  [
    /Resolve incidents, reduce ticket volume, and deliver 24\/7 IT support/g,
    "Plant-floor intelligence, maintenance copilots, and supply-chain exception handling.",
  ],
  [
    /Automate, resolve, and reduce employee queries and manual workload\./g,
    "Ticket triage, access requests, and onboarding flows on Teams and SharePoint.",
  ],
  [
    /Automate screening, accelerate hiring, and engage top talent\./g,
    "Service desk agents employees actually use — deflected L1 volume, faster provisioning.",
  ],

  // ── Nine platform capabilities (H5 cards) ─────────────────────────────
  [
    /Nine ways the Kore\.ai Agent Platform does the work\./g,
    "Nine ways Softree delivers agentic AI on Microsoft.",
  ],
  [
    /AI that handles the workflows other platforms can't\./g,
    "Copilot Studio patterns that ship in weeks.",
  ],
  [
    /Handle AI infrastructure automatically so your team starts at the business logic\. More AI shipped\. Same team size\./g,
    "Softree handles Microsoft stack plumbing; your team starts at business logic. More AI shipped. Same team size.",
  ],
  [
    /Compliance that doesn't need to trust the AI\./g,
    "Deterministic guardrails, not probabilistic hope.",
  ],
  [
    /Coordinate purpose-built agents in parallel, each with independent fault recovery\. Real business complexity, handled\./g,
    "Multi-agent handoffs your operators can trust — specialist agents with memory and escalation paths.",
  ],
  [
    /Enforces controls at the runtime layer and set constraints the AI operates within, not instructions it interprets\./g,
    "DLP, Entra ID, and approval gates enforced before agents act — auditable proof for IT and compliance.",
  ],
  [
    /No more discovering broken AI in front of customers\./g,
    "Zero production surprises.",
  ],
  [
    /Validate every workflow before deployment\. What customers experience has already been proven to work\./g,
    "Eval suites across personas and edge cases before deployment — and after every model change.",
  ],
  [
    /Scale the programme\. Not the headcount\./g,
    "System-aware vs. operating blind.",
  ],
  [
    /Removes the engineering bottleneck\. One developer achieves what used to take a team of five\. The roadmap keeps moving\./g,
    "Agents wired to SharePoint, Dataverse, Fabric, and your APIs — deployed across Teams and channels you already use.",
  ],
  [
    /Complete audit trails, ready when you need them\./g,
    "100% of agent sessions traced.",
  ],
  [
    /Understand why the AI made a decision for a regulator, a board member, a customer, because 100% of interactions are logged\./g,
    "Observability, evals, and audit logs so operators see what happened and why.",
  ],
  [
    /A protected AI investment in a shifting industry\./g,
    "Microsoft stack your teams already trust.",
  ],
  [
    /No vendor lock-in\. No stranded investment\. Keep your agent definitions running regardless of the underlying LLM\./g,
    "No vendor lock-in on the Microsoft ecosystem — your agents run on Azure AI and Copilot Studio.",
  ],
  [
    /Two AI systems\? You only need one\./g,
    "One delivery partner. One Microsoft stack.",
  ],
  [
    /Scripted and reasoning AI on the same infrastructure\. Two vendor contracts\? The Kore\.ai Agent Platform 2\.0 replaces both\./g,
    "Copilot Studio for speed; Azure and Python when you need custom reasoning — one team delivers both.",
  ],
  [
    /Prove which agents delivered value\./g,
    "Prove which agents delivered ROI.",
  ],
  [
    /Tie outcome improvements to specific change and attribute every one to to a specific optimisation\./g,
    "Trace decisions, tune prompts, and improve ROI using real production signals.",
  ],
  [
    /Deliver quality service with AI agents who respond clearly in real time, while providing human agents with the necessary tools to ensure all interactions are more valuable\./g,
    "Agents that respond clearly in real time — with tools that make every human interaction more valuable.",
  ],
  [
    /Connect to your business systems, understand your data and workflows, and activate agentic RAG search, to automate and orchestrate AI agents with precision\./g,
    "Connect to SharePoint, Dataverse, and your APIs — ground agents in enterprise context, not generic chat.",
  ],

  // ── Analyst recognition → Softree proof (honest, no fake awards) ────────
  [
    /Kore\.ai named a leader in the Forrester Wave™ Cognitive Search Platforms, Q4 2025/g,
    "100+ AI engineers building on Microsoft Copilot Studio and Azure AI",
  ],
  [
    /Kore\.ai named a leader in the 2025 Gartner® Magic Quadrant™/g,
    "4–16 weeks from discovery to governed production rollout",
  ],
  [
    /Kore\.ai named a leader in Everest Group's Agentic AI Products PEAK Matrix® Assessment 2026/g,
    "ISO 27001 delivery discipline with offshore velocity",
  ],
  [
    /The Gartner® Magic Quadrant™ for Conversational AI Platforms now includes conversational AI agents and tools increasingly leveraging generative AI\. This report guides application leaders in selecting conversational AI platforms for complex automation and multimodal interactions\./g,
    "Softree implements agentic workflows on Microsoft Copilot Studio, Azure AI, and Power Platform — with governance your IT team can audit from day one.",
  ],
  [
    /ANALYST REPORTS/g,
    "DELIVERY PROOF",
  ],
  [
    /GET ACCESS TO THE REPORT/gi,
    "See our agentic AI work",
  ],
  [
    /Access the Report/gi,
    "View case studies",
  ],
  [
    /Access the report/gi,
    "View case studies",
  ],
  [
    /Forrester CAI platforms/g,
    "Copilot Studio delivery",
  ],
  [
    /Gartner CAI platforms/g,
    "Azure AI agents",
  ],
  [
    /Agentic AI Products/g,
    "Power Platform automation",
  ],
  [
    /Cognitive Search platforms/g,
    "SharePoint + Fabric RAG",
  ],
  [
    /Guide: How to choose your AI platform/g,
    "Guide: Choosing your Microsoft AI stack",
  ],
  [
    /Report: Forrester Wave/g,
    "Case study: Agentic AI delivery",
  ],
  [
    /Whitepaper: AI agents/g,
    "Whitepaper: Governed agent rollout",
  ],

  // ── Partners (reframe as implementation, not platform) ────────────────
  [
    /Strategic partners: Microsoft and AWS/g,
    "Built on Microsoft. Delivered by Softree.",
  ],
  [
    /Deploy the Kore\.ai Agent Platform and AI solutions within Microsoft environments including Azure Al Foundry , Microsoft Teams , Microsoft 365 Copilot , and Microsoft Copilot Studio to see Al value faster from your AI business use cases\./g,
    "We deploy agentic AI across Copilot Studio, Azure AI Foundry, Microsoft Teams, and M365 Copilot — so you see value faster from day one.",
  ],
  [
    /The Kore\.ai Agent Platform and AI solutions are integrated with AWS services including Amazon Bedrock , Amazon Q and Amazon Connect to accelerate the deployment of AWS Al tools across business use cases\./g,
    "We also integrate with Azure OpenAI, Amazon Bedrock, and hybrid cloud environments when your architecture requires it.",
  ],
  [
    /We work with the world's largest platforms\. Check your provider for more information or start building via their marketplaces\./g,
    "We implement on the Microsoft stack your enterprise already runs — and extend to Azure, Fabric, and Power Platform.",
  ],
  [
    /AZURE MARKETPLACE/g,
    "MICROSOFT STACK",
  ],
  [
    /AWS MARKETPLACE/g,
    "AZURE AI",
  ],

  // ── Customer testimonials section header ──────────────────────────────
  [
    /Customer testimonials/g,
    "What clients say",
  ],
  [
    /Discover how organizations deliver AI value with Kore\.ai\./g,
    "How organizations deliver AI value with Softree.",
  ],
  [
    /more CUSTOMER stories/gi,
    "More client stories",
  ],

  // ── AI Insights / blog teasers ────────────────────────────────────────
  [
    /AI Insights/g,
    "AI insights",
  ],
  [
    /Configured, not coded\. The engineering discipline gap in agent development/g,
    "Governed, not guessed. The delivery discipline gap in agent programs",
  ],
  [
    /Can Today's AI Agents Survive Their Own Runtime\?/g,
    "Can your Copilot agents survive production load?",
  ],
  [
    /What's new in AI for Work: features that drive enterprise productivity/g,
    "What's new in Copilot Studio: features that drive enterprise productivity",
  ],
  [
    /Parallel Agent Processing/g,
    "Multi-agent orchestration patterns",
  ],
  [
    /The AI productivity paradox: why employees are moving faster than enterprises/g,
    "The AI delivery gap: why pilots stall and how to fix it",
  ],

  // ── CTA / closing ─────────────────────────────────────────────────────
  [
    /Let's work together/g,
    "Let's build your agent program",
  ],
  [
    /Find out how Kore\.ai can help/g,
    "Find out how Softree can help",
  ],
  [
    /Get answers and a customized quote for your projects/g,
    "Get a scoped proposal for your Microsoft AI project",
  ],
  [
    /You are now leaving Kore\.ai's website\./g,
    "You are now leaving Softree Technology's website.",
  ],

  // ── Nav / footer labels ───────────────────────────────────────────────
  [
    /About Kore\.ai/g,
    "About Softree",
  ],
  [
    /Kore\.ai Marketplace/g,
    "Case studies",
  ],
  [
    /Agent Marketplace/g,
    "Agent patterns",
  ],
  [
    /Analyst Recognition/g,
    "Our work",
  ],
  [
    /AI Agent Builder/g,
    "Agent development",
  ],
  [
    /Agentic Contact Center/g,
    "Contact center AI",
  ],
  [
    /Intelligent Orchestrator/g,
    "Agent orchestration",
  ],
  [
    /Pre-Built AI Agents/g,
    "Pre-built patterns",
  ],
  [
    /Agent Platform/g,
    "Agentic AI",
  ],
  [
    /Platform Overview/g,
    "Services overview",
  ],
  [
    /AI for Service/g,
    "AI for service",
  ],
  [
    /AI for Work/g,
    "AI for work",
  ],
  [
    /AI Glossary/g,
    "AI glossary",
  ],
  [
    /Generative AI 101/g,
    "Generative AI 101",
  ],
  [
    /Responsive AI framework/g,
    "Responsible AI framework",
  ],
  [
    /CXO Toolkit/g,
    "CXO toolkit",
  ],
  [
    /Academy/g,
    "Resources",
  ],
  [
    /Community/g,
    "LinkedIn",
  ],
  [
    /Trust Center/g,
    "Security",
  ],
  [
    /Build with AI/g,
    "Build with Microsoft AI",
  ],
  [
    /Orchestrate with AI/g,
    "Orchestrate agents",
  ],
  [
    /Prove with AI/g,
    "Prove with governance",
  ],
  [
    /Test with AI/g,
    "Test before deploy",
  ],
  [
    /Deploy with AI/g,
    "Deploy to production",
  ],
  [
    /Govern with AI/g,
    "Govern with audit trails",
  ],
  [
    /Scale with AI/g,
    "Scale with observability",
  ],
  [
    /Simplify with AI/g,
    "Simplify with accelerators",
  ],
  [
    /Optimize with AI/g,
    "Optimize with data",
  ],
  [
    /Ai4 is a leading annual AI conference in Las Vegas where business leaders, technologists, and innovators gather to explore real-world AI applications\./g,
    "Softree delivers Microsoft AI programs for enterprises that need production-grade agents — not another pilot.",
  ],
]

/** Softree testimonials — cycle across carousel slides */
export const SOFTREE_TESTIMONIALS = [
  {
    company: "SP Marketplace",
    quote:
      "SOFTREE staff worked with us to learn our installation automation technology and built exactly what we needed.",
    name: "Darrell Trimble",
    role: "CEO",
  },
  {
    company: "Wicked Point LLC",
    quote:
      "We had a very positive experience working with Softree Technology. The developers were responsive and delivery was on time. We appreciate the attention they gave our project and their great communication.",
    name: "Natasha Adams",
    role: "Partner",
  },
  {
    company: "ECG International",
    quote:
      "Overall, we are satisfied with our collaboration in the past and your last action and response to our reported issue, really makes a difference.",
    name: "Arkady Fedorovtsjev",
    role: "IT Specialist",
  },
]

/**
 * Replace every testimonial-card in the HTML with Softree quotes (cycled).
 * @param {string} html
 */
export function rewriteTestimonials(html) {
  let idx = 0
  return html.replace(
    /<div class="testimonial-card">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/g,
    (match) => {
      const t = SOFTREE_TESTIMONIALS[idx % SOFTREE_TESTIMONIALS.length]
      idx++
      return `<div class="testimonial-card">
                                                <div class="heading-style-h5">${t.company}</div>
                                                <div class="testimonial-card-body">
                                                    <p>"${t.quote}"</p>
                                                    <div class="testimonial-card-detail-wrap">
                                                        <div class="testimonial-card-detail">
                                                            <div>${t.name}</div>
                                                            <div class="text-color-charcoal2">${t.role}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`
    },
  )
}

/**
 * Apply all content replacements + testimonial rewrite.
 * @param {string} html
 */
export function applySoftreeContent(html) {
  let out = html
  for (const [from, to] of CONTENT_REPLACEMENTS) {
    out = out.replace(from, to)
  }
  out = rewriteTestimonials(out)
  return out
}
