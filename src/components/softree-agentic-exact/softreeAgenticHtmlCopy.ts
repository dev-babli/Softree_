/** Field-level HTML copy patches — Kore reference strings → Softree Technology copy only. */

type ReplacePair = [string, string]

function chainReplace(html: string, pairs: ReplacePair[]): string {
  let out = html
  for (const [from, to] of pairs) {
    if (!from || !out.includes(from)) continue
    out = out.split(from).join(to)
  }
  return out
}

function applyRegexCopy(html: string): string {
  return html
    .replace(
      /ABL is a typed, schema-driven language[\s\S]*?structured way\./g,
      "Structured specs for agent behavior, tools, guardrails, and handoffs — so business and engineering teams share one definition of done.",
    )
    .replace(
      /ABL is a purpose-built compilable agent language for AI agents\.[\s\S]*?highest\s+quality\./g,
      "Pre-built agent accelerators on Microsoft 365: HR, IT, finance, and customer ops with governance baked in.",
    )
    .replace(/Language \(ABL™\)/g, "definitions + governance")
    .replace(/>\s*ABL™\s*</g, ">Governance patterns<")
    .replace(/\bABL\b/g, "specs")
}

function applyShellRegex(html: string): string {
  return html
    .replace(
      /<div class="k2-logo w-embed"><svg[\s\S]*?<\/svg><\/div>/,
      '<div class="k2-logo"><img src="/logo/Softree-Technology-Final-Logo.png" alt="Softree Technology" style="height:1.625rem;width:auto;display:block" /></div>',
    )
    .replace(
      /https:\/\/cdn\.prod\.website-files\.com\/[^"']*Softree%20Logo%20White\.svg/g,
      "/logo/Softree-Technology-Final-Logo.png",
    )
    .replace(
      /https:\/\/cdn\.prod\.website-files\.com\/[^"']*Kore%20emblem\.svg/g,
      "/logo/Softree-Technology-Final-Logo.png",
    )
    .replace(/https:\/\/marketplace\.kore\.ai\/?/g, "/case-studies")
    .replace(/https:\/\/docs\.kore\.ai\/?/g, "/services")
    .replace(/https:\/\/community\.kore\.ai\/?/g, "https://www.linkedin.com/company/softree-technology-pvt-ltd/")
    .replace(/https:\/\/bots\.kore\.ai[^"']*/g, "/blog")
    .replace(
      /https:\/\/in\.linkedin\.com\/company\/kore-inc/g,
      "https://www.linkedin.com/company/softree-technology-pvt-ltd/",
    )
    .replace(/https:\/\/www\.youtube\.com\/@Koreai/g, "https://www.youtube.com/@softreetechnology")
    .replace(/https:\/\/x\.com\/koredotai/g, "https://x.com/softreetechnology")
    .replace(/Agent\s+Marketplace/g, "Case studies")
}

const CTA_LINKS: ReplacePair[] = [
  ["/get-a-demo-artemis", "/contact"],
  ["/request-for-proposal", "/book-meeting"],
  ['aria-label="Get Demo"', 'aria-label="Let\'s talk"'],
  [">Get Demo<", ">Let's talk<"],
  [">Get demo<", ">Let's talk<"],
  [">Request a demo<", ">Let's talk<"],
  ["Request a demo", "Let's talk"],
  [">BOOK NOW<", ">Book a meeting<"],
  [">Submit RFP<", ">Book a meeting<"],
  ["Submit RFP", "Book a meeting"],
]

const NAV_FOOTER: ReplacePair[] = [
  // Header nav
  ["Agent Platform { Artemis }", "Agentic AI"],
  ["AI Applications", "Services"],
  ['href="/" class="k2-nav-link w-inline-block">\n                        <div class="k2-nav-link-text">Services</div>', 'href="/services" class="k2-nav-link w-inline-block">\n                        <div class="k2-nav-link-text">Services</div>'],
  ["Agent Marketplace", "Case studies"],
  // Footer tagline + columns
  ["Agentic AI for the enterprise", "Microsoft-stack agentic AI, delivered offshore"],
  ["Pre-built applications", "Services"],
  ["Banking", "Power Platform"],
  ['href="/ai-for-service/ai-for-banking"', 'href="/services/business-applications/power-apps"'],
  ["Healthcare", "SharePoint & SPFx"],
  ['href="/ai-for-service/ai-for-healthcare"', 'href="/services/digital-workspace/sharepoint"'],
  ["Retail", "Microsoft Fabric"],
  ['href="/ai-for-service/ai-for-retail"', 'href="/services/data-analytics/microsoft-fabric"'],
  ["Recruiting", "Agentic AI"],
  ['href="/ai-for-work/ai-for-recruiting"', 'href="/services/ai-intelligence/agentic-ai"'],
  ["HR", "Web apps"],
  ['href="/ai-for-work/ai-for-hr"', 'href="/services/digital-workspace/web-app-development"'],
  ["IT", "Mobile apps"],
  ['href="/ai-for-work/ai-for-it"', 'href="/services/digital-workspace/mobile-app-development"'],
  ['href="/ai-agent-platform"', 'href="/agentic-ai-platform"'],
  ["Agent Platform", "Solutions"],
  ["AI for Service", "Offshore delivery"],
  ['href="/ai-for-service"', 'href="/services/offshore-ai-development"'],
  ["AI for Work", "Power Platform"],
  ['href="/ai-for-work"', 'href="/services/business-applications/power-apps"'],
  ["Agent\n                                Marketplace", "Case studies"],
  ["Get in touch with the team.", "Talk with our engineering team."],
  ["Leadership", "Our team"],
  ['href="/about-us#leadership"', 'href="/about-us"'],
  ["Customer Stories", "Case studies"],
  ['href="/customer-stories"', 'href="/case-studies"'],
  ["Analyst Recognition", "Why Softree"],
  ['href="/analyst-recognition"', 'href="/about-us"'],
  ["Newsroom", "Blog"],
  ['href="/news"', 'href="/blog"'],
  ["Documentation", "All services"],
  ["Whitepapers", "Case studies"],
  ['href="/whitepaper"', 'href="/case-studies"'],
  ["Webinars", "Blog"],
  ['href="/webinar"', 'href="/blog"'],
  ["AI Research Reports", "Insights"],
  ['href="/ai-research-reports"', 'href="/blog"'],
  ["AI Glossary", "Resources"],
  ['href="/ai-glossary"', 'href="/blog"'],
  ["Videos", "Work"],
  ['href="/videos"', 'href="/case-studies"'],
  ["Generative AI 101", "Agentic AI guide"],
  ['href="/generative-ai-101"', 'href="/services/ai-intelligence/agentic-ai"'],
  ["Responsible AI\n                                framework", "Governance"],
  ['href="/responsible-ai-framework"', 'href="/services/ai-intelligence/agentic-ai"'],
  ["CXO Toolkit", "Contact"],
  ['href="/cxo-tool-kit"', 'href="/contact"'],
  ["Get Involved", "Connect"],
  ["Events", "Blog"],
  ['href="/event"', 'href="/blog"'],
  ["Academy", "LinkedIn"],
  ["Community", "Twitter"],
  ["Follow us on", "Follow Softree"],
  ["Trust Center", "Privacy"],
  ['href="#" target="_blank" class="k2-footer-nav-link">Trust Center', 'href="/privacy-policy" class="k2-footer-nav-link">Privacy'],
  ['href="/terms-of-service"', 'href="/terms"'],
  ["Acceptable Use Policy", "Privacy policy"],
  ['href="/acceptable-use-policy"', 'href="/privacy-policy"'],
  ["Cookie Policy", "Terms"],
  ['href="/cookie-policy"', 'href="/terms"'],
  ["© 2026 Softree Inc.", "© 2026 Softree Technology"],
]

const SCROLL_TAB_BODIES: ReplacePair[] = [
  [
    "Nine ways the Softree Agent Platform does the work.",
    "Nine ways Softree delivers agentic AI on the Microsoft stack.",
  ],
  [
    "Nobody else has ABL™",
    "Copilot Studio patterns that ship in weeks",
  ],
  [
    "ABL is a purpose-built compilable agent language for AI agents. Using\n                                    ABL cuts thousands of code hours. Faster production; highest\n                                    quality.",
    "Pre-built agent accelerators on Microsoft 365: HR, IT, finance, and customer ops with governance baked in.",
  ],
  [
    "ABL is a purpose-built compilable agent language for AI agents. Using ABL cuts thousands of code hours. Faster production; highest quality.",
    "Pre-built agent accelerators on Microsoft 365: HR, IT, finance, and customer ops with governance baked in.",
  ],
  [
    "Others route. We orchestrate.",
    "Multi-agent handoffs your operators can trust",
  ],
  [
    "Agents run in parallel, each with a bounded context. One agent\n                                    failing won’t unwind everything.",
    "Specialist agents with memory, escalation paths, and clear ownership, not one brittle mega-prompt.",
  ],
  [
    "Deterministic; not probabilistic.",
    "Deterministic guardrails, not probabilistic hope",
  ],
  [
    "Engine-enforced constraints. An LLM can’t override them. Auditable\n                                    proof of policy.",
    "DLP, Entra ID, and approval gates enforced before agents act, with auditable proof for IT and compliance.",
  ],
  [
    "Zero production surprises.",
    "Zero production surprises",
  ],
  [
    "We validate at compile time to always avoid broken orchestration\n                                    logic at runtime.",
    "Eval suites across personas and edge cases before deployment, and after every model change.",
  ],
  [
    "System aware vs. operating in the blind.",
    "System-aware vs. operating blind",
  ],
  [
    "{ Artemis } generates compiler-validated ABL definitions against your\n                                    full topology.",
    "Agents wired to SharePoint, Dataverse, Fabric, and your APIs, deployed across Teams and channels you already use.",
  ],
  [
    "100% of AI interactions audited",
    "100% of agent sessions traced",
  ],
  [
    "{ Artemis } sets new standards for evaluation, traces, and audits\n                                    every session. Most sample 5 – 10%.",
    "Observability, evals, and audit logs so operators see what happened and why, not sampled 5–10%.",
  ],
  [
    "Your logic uniquely outlasts the model.",
    "Your agents scale on Microsoft infrastructure",
  ],
  [
    "Application definition is independent of the LLM. Swap models; the\n                                    ABL still executes.",
    "Application logic stays portable across Copilot Studio, Azure OpenAI, and Power Platform as models evolve.",
  ],
  [
    "The need for two AI systems eliminated.",
    "One delivery stack, not parallel AI systems",
  ],
  [
    "{ Artemis } runs scripted and reasoning AI on the same session\n                                    infrastructure.",
    "Softree unifies scripted workflows and reasoning agents on Teams, SharePoint, and Dataverse you already operate.",
  ],
  [
    "Optimization is no longer manual forensics.",
    "Optimization without manual log archaeology",
  ],
  [
    "The platform does the work. No engineer required at every step.",
    "Drift, cost, and quality signals surface automatically so teams improve agents without forensic digging.",
  ],
]

const PROGRAMMABLE: ReplacePair[] = [
  ["{ Artemis }", "{ Softree }"],
  [
    "designed for what<br>actually matters",
    "designed for what<br>actually ships",
  ],
  [
    "enterprise<br>AI&nbsp;Programmable<br>is the new AI advantage",
    "Agentic AI on Microsoft<br>is the new enterprise advantage",
  ],
  [
    "AI builds, runs evals, and optimizes quality agents for production\n                                with speed",
    "Copilot Studio, Azure AI, and Power Automate: from idea to governed agent in weeks, not quarters.",
  ],
  [
    "Evaluate, trace, and audit every agent session, that's 100%\n                                observability",
    "DLP, Entra ID, and approval gates with tracing and audit trails your IT team trusts.",
  ],
  [
    "Your logic is built to outlast innovation, regardless of the model",
    "Delivery patterns built to outlast model churn on the Microsoft stack.",
  ],
  [
    "Invented for the<br><em>agentic era</em>. Shaped by a decade of hard-earned enterprise AI\n                                learnings.",
    "Built for the<br><em>agentic era</em>. Shaped by offshore delivery on Copilot Studio, Azure AI, and Power Platform.",
  ],
]

const PILLARS: ReplacePair[] = [
  [
    "The two pillars<br>behind the AI-native<br>foundation<br>for agentic AI",
    "The two pillars<br>behind governed<br>agentic AI<br>on Microsoft",
  ],
  [
    "Agent Blueprint<br>Language (ABL™)",
    "Agent definitions<br>+ governance patterns",
  ],
  [
    "ABL is a typed, schema-driven language<br>purpose-built for agentic AI. It lets enterprises define agent behavior,<br>tools, guardrails, orchestration, and handoff logic in a formal,<br>structured way.",
    "Structured specs for agent behavior, tools, guardrails, and handoffs — so business and engineering teams share one definition of done.",
  ],
  [
    "ABL is a typed, schema-driven language purpose-built for agentic AI. It lets enterprises define agent behavior, tools, guardrails, orchestration, and handoff logic in a formal, structured way.",
    "Structured specs for agent behavior, tools, guardrails, and handoffs — so business and engineering teams share one definition of done.",
  ],
  ["™ARCH", "Delivery architecture"],
  [
    "Arch is the platform’s built-in AI solution<br>architect. It turns plain-language intent into a complete agent system -<br>including agents, workflows, tools, policies, and handoffs - and helps<br>teams build, manage, and optimize AI agents.",
    "Softree solution architects turn intent into Copilot Studio agents, Power Automate flows, and Azure integrations your IT team can audit and operate.",
  ],
]

const BUILD_SCALE: ReplacePair[] = [
  [
    "Build AI agents five times faster.",
    "Ship governed Copilot Studio agents in weeks, not quarters.",
  ],
  ["Agent Studio", "Copilot Studio delivery"],
  [
    "Create agents, workflows, and tools using visual and code-based<br>authoring in a unified workspace.",
    "Design agents, workflows, and approvals in Copilot Studio with pro-code extensions when you need them.",
  ],
  [
    "Move from idea to agent faster with an AI architect that helps<br>build, scale, and optimize AI agents.",
    "Move from workshop to production with Softree architects who map ROI, risk, and Microsoft stack fit.",
  ],
  [
    "Define agent behavior, tools, and guardrails in a structured and<br>compilable DSL.",
    "Document agent behavior, tools, and guardrails in specs your compliance team can review.",
  ],
  [
    "Operate AI agents with provable reliability and control, in production,<br>at scale.",
    "Run agents in Teams, SharePoint, and line-of-business systems with observability from day one.",
  ],
  [
    "Turn every agent run into a signal for incremental improvement.",
    "Turn every agent run into a signal for safer, cheaper, better automation.",
  ],
  [
    "Your agents inherit the curve",
    "Your agents ride the model curve",
  ],
  [
    "AI is on an exponential growth curve; the Al-programmable platform rides<br>it by design. Every model gain in reasoning, tool use, and context lands<br>inside your agents automatically. No rebuild. No catch-up.",
    "Model capabilities keep accelerating. Softree delivery keeps your Copilot and Azure agents current without rebuilding from scratch every release.",
  ],
  [
    "New models design and refactor better agents.",
    "New models improve prompts, tools, and eval coverage.",
  ],
  [
    "Smarter judges catch what older ones missed.",
    "Sharper eval suites catch drift before users do.",
  ],
  ["THE&nbsp;ARCH™&nbsp;LOOP", "CONTINUOUS&nbsp;IMPROVEMENT&nbsp;LOOP"],
  [
    "Every loop improves; every release evolves",
    "Every sprint improves; every release compounds",
  ],
  [
    "Same investment compounding return",
    "Same offshore squad, compounding ROI",
  ],
  ["Plugs into the stack you already run on", "Plugs into the Microsoft stack you already run"],
  ["Arch™", "Softree architects"],
  ["Arch ", "Softree "],
]

const DEMO_VIDEO: ReplacePair[] = [
  ["Play Video", "Play video"],
  [
    "Start AI-programming your next AI Agents",
    "Start your next agentic AI program on Microsoft",
  ],
]

const GET_STARTED: ReplacePair[] = [
  ["Get started with<br>&nbsp;Artemis&nbsp;", "Get started with<br>&nbsp;Softree&nbsp;"],
  [
    "Start AI-progamming your next AI Agents",
    "Start your next agentic AI program with Softree",
  ],
]

const BRAND_CLEANUP: ReplacePair[] = [
  ["ABL™", "agent specs"],
  ["ABL, ", "specs, "],
  ["ABL definitions", "agent definitions"],
  ["the ABL still", "the definitions still"],
  ["and ABL,", "and specs,"],
  ["with ABL,", "with specs,"],
  ["into ABL,", "into specs,"],
  [" designs and ABL,", " designs and specs,"],
  ["Language (ABL™)", "definitions + governance"],
]

const SHELL: ReplacePair[] = [
  ["Agent Platform { Artemis }", "Agentic AI · Softree"],
  ["Agent Platform {&nbsp;Artemis&nbsp;}", "Agentic AI · Softree"],
  ["About Softree", "About Softree"],
  ["Softree white logo in display.", "Softree Technology logo."],
  ["© 2026 Softree Inc.", "© 2026 Softree Technology"],
  ["Agent Marketplace", "Case studies"],
  [">ABL™<", ">Governance patterns<"],
  [
    "ABL is a typed, schema-driven language purpose-built for agentic AI.",
    "Structured agent definitions and governance patterns for Copilot Studio and Azure AI.",
  ],
  [
    "It lets enterprises define agent behavior, tools, guardrails, orchestration, and",
    "Softree helps you define agent behavior, tools, guardrails, orchestration, and",
  ],
  ["The ABL™<br>Advantage", "Governed delivery<br>advantage"],
  [
    "Turn plain-language intent into agent designs and ABL, so business experts",
    "Turn plain-language intent into agent designs and specs, so business experts",
  ],
  [
    "Move from idea to design, build, test, deployment, and optimization with Arch",
    "Move from idea to design, build, test, deployment, and optimization with Softree architects",
  ],
  ["Softree", "Softree"],
  ["Artemis", "Softree"],
]

export function applySoftreeSectionHtml(sectionName: string, html: string): string {
  if (!html) return html

  let out = html

  switch (sectionName) {
    case "SoftreeAgenticProgrammableSection":
      out = chainReplace(out, PROGRAMMABLE)
      break
    case "SoftreeAgenticPillarsSection":
      out = chainReplace(out, PILLARS)
      break
    case "SoftreeAgenticBuildScaleOptimizeSection":
      out = chainReplace(out, BUILD_SCALE)
      break
    case "SoftreeAgenticSection7Section":
      out = chainReplace(out, DEMO_VIDEO)
      break
    case "SoftreeAgenticScrollTabsSection":
      out = chainReplace(out, SCROLL_TAB_BODIES)
      break
    case "SoftreeAgenticGetStartedSection":
      out = chainReplace(out, GET_STARTED)
      break
    default:
      break
  }

  return applyRegexCopy(chainReplace(out, [...BRAND_CLEANUP, ...SHELL, ...CTA_LINKS]))
}

export function applySoftreeShellHtml(html: string): string {
  const chained = chainReplace(html, [...NAV_FOOTER, ...BRAND_CLEANUP, ...SHELL, ...CTA_LINKS])
  return applyShellRegex(applyRegexCopy(chained))
}

/** @deprecated Use applySoftreeSectionHtml — kept for programmatic/pillars imports */
export function patchMiddleSectionHtml(html: string, sectionName?: string) {
  if (sectionName) return applySoftreeSectionHtml(sectionName, html)
  return chainReplace(chainReplace(html, PROGRAMMABLE), PILLARS)
}
