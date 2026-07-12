/** Field-level HTML copy patches — Kore reference strings → Softree Technology copy only. */

import {
  buildScaleContent,
  demoVideoContent,
  getStartedContent,
  pillarsContent,
  programmableContent,
  scrollTabsContent,
  shellContent,
} from "./softreeAgenticContent"

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
  ["Agentic AI for the enterprise", shellContent.footerTagline],
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
    "Nine ways the Kore Agent Platform does the work.",
    scrollTabsContent.sectionIntro,
  ],
  [
    "Nine ways the Softree Agent Platform does the work.",
    scrollTabsContent.sectionIntro,
  ],
  [
    "Nobody else has ABL™",
    scrollTabsContent.tabs[0].title,
  ],
  [
    "ABL is a purpose-built compilable agent language for AI agents. Using\n                                    ABL cuts thousands of code hours. Faster production; highest\n                                    quality.",
    scrollTabsContent.tabs[0].body,
  ],
  [
    "ABL is a purpose-built compilable agent language for AI agents. Using ABL cuts thousands of code hours. Faster production; highest quality.",
    scrollTabsContent.tabs[0].body,
  ],
  [
    "Others route. We orchestrate.",
    scrollTabsContent.tabs[1].title,
  ],
  [
    "Agents run in parallel, each with a bounded context. One agent\n                                    failing won’t unwind everything.",
    scrollTabsContent.tabs[1].body,
  ],
  [
    "Deterministic; not probabilistic.",
    scrollTabsContent.tabs[2].title,
  ],
  [
    "Engine-enforced constraints. An LLM can’t override them. Auditable\n                                    proof of policy.",
    scrollTabsContent.tabs[2].body,
  ],
  [
    "Zero production surprises.",
    scrollTabsContent.tabs[3].title,
  ],
  [
    "We validate at compile time to always avoid broken orchestration\n                                    logic at runtime.",
    scrollTabsContent.tabs[3].body,
  ],
  [
    "System aware vs. operating in the blind.",
    scrollTabsContent.tabs[4].title,
  ],
  [
    "{ Artemis } generates compiler-validated ABL definitions against your\n                                    full topology.",
    scrollTabsContent.tabs[4].body,
  ],
  [
    "100% of AI interactions audited",
    scrollTabsContent.tabs[5].title,
  ],
  [
    "{ Artemis } sets new standards for evaluation, traces, and audits\n                                    every session. Most sample 5 – 10%.",
    scrollTabsContent.tabs[5].body,
  ],
  [
    "Your logic uniquely outlasts the model.",
    scrollTabsContent.tabs[6].title,
  ],
  [
    "Application definition is independent of the LLM. Swap models; the\n                                    ABL still executes.",
    scrollTabsContent.tabs[6].body,
  ],
  [
    "The need for two AI systems eliminated.",
    scrollTabsContent.tabs[7].title,
  ],
  [
    "{ Artemis } runs scripted and reasoning AI on the same session\n                                    infrastructure.",
    scrollTabsContent.tabs[7].body,
  ],
  [
    "Optimization is no longer manual forensics.",
    scrollTabsContent.tabs[8].title,
  ],
  [
    "The platform does the work. No engineer required at every step.",
    scrollTabsContent.tabs[8].body,
  ],
]

const PROGRAMMABLE: ReplacePair[] = [
  ["{ Artemis }", programmableContent.brand],
  ["designed for what<br>actually matters", programmableContent.headlineDesigned],
  [
    "enterprise<br>AI&nbsp;Programmable<br>is the new AI advantage",
    programmableContent.headlineAdvantage,
  ],
  [
    "AI builds, runs evals, and optimizes quality agents for production\n                                with speed",
    programmableContent.bullets[0],
  ],
  [
    "Evaluate, trace, and audit every agent session, that's 100%\n                                observability",
    programmableContent.bullets[1],
  ],
  [
    "Your logic is built to outlast innovation, regardless of the model",
    programmableContent.bullets[2],
  ],
  [
    "Invented for the<br><em>agentic era</em>. Shaped by a decade of hard-earned enterprise AI\n                                learnings.",
    programmableContent.closing,
  ],
]

const PILLARS: ReplacePair[] = [
  ["{ Pillars }", pillarsContent.eyebrow],
  [
    "The two pillars<br>behind the AI-native<br>foundation<br>for agentic AI",
    pillarsContent.headline,
  ],
  [
    "Agent Blueprint<br>Language (ABL™)",
    pillarsContent.pillar1.title,
  ],
  [
    "ABL is a typed, schema-driven language<br>purpose-built for agentic AI. It lets enterprises define agent behavior,<br>tools, guardrails, orchestration, and handoff logic in a formal,<br>structured way.",
    pillarsContent.pillar1.body,
  ],
  [
    "ABL is a typed, schema-driven language purpose-built for agentic AI. It lets enterprises define agent behavior, tools, guardrails, orchestration, and handoff logic in a formal, structured way.",
    pillarsContent.pillar1.body,
  ],
  ["™ARCH", pillarsContent.pillar2.title],
  [
    "Arch is the platform’s built-in AI solution<br>architect. It turns plain-language intent into a complete agent system -<br>including agents, workflows, tools, policies, and handoffs - and helps<br>teams build, manage, and optimize AI agents.",
    pillarsContent.pillar2.body,
  ],
]

const BUILD_SCALE: ReplacePair[] = [
  [
    "Build AI agents five times faster.",
    buildScaleContent.headline,
  ],
  ["Agent Studio", buildScaleContent.tabs.build.title],
  [
    "Create agents, workflows, and tools using visual and code-based<br>authoring in a unified workspace.",
    buildScaleContent.tabs.build.body,
  ],
  [
    "Move from idea to agent faster with an AI architect that helps<br>build, scale, and optimize AI agents.",
    buildScaleContent.tabs.build.architect,
  ],
  [
    "Define agent behavior, tools, and guardrails in a structured and<br>compilable DSL.",
    buildScaleContent.tabs.build.specs,
  ],
  [
    "Operate AI agents with provable reliability and control, in production,<br>at scale.",
    buildScaleContent.tabs.scale.body,
  ],
  [
    "Turn every agent run into a signal for incremental improvement.",
    buildScaleContent.tabs.scale.signals,
  ],
  [
    "Your agents inherit the curve",
    buildScaleContent.tabs.optimize.inherit,
  ],
  [
    "AI is on an exponential growth curve; the Al-programmable platform rides<br>it by design. Every model gain in reasoning, tool use, and context lands<br>inside your agents automatically. No rebuild. No catch-up.",
    buildScaleContent.tabs.optimize.inheritBody,
  ],
  [
    "New models design and refactor better agents.",
    buildScaleContent.tabs.optimize.judges,
  ],
  ["THE&nbsp;ARCH™&nbsp;LOOP", buildScaleContent.tabs.optimize.loop],
  [
    "Every loop improves; every release evolves",
    buildScaleContent.tabs.optimize.loopTagline,
  ],
  [
    "Same investment compounding return",
    buildScaleContent.tabs.optimize.compound,
  ],
  ["Plugs into the stack you already run on", buildScaleContent.tabs.optimize.stack],
  ["Arch™", "Softree architects"],
  ["Arch ", "Softree "],
]

const DEMO_VIDEO: ReplacePair[] = [
  ["Play Video", demoVideoContent.playLabel],
  [
    "Start AI-programming your next AI Agents",
    demoVideoContent.headline,
  ],
]

const GET_STARTED: ReplacePair[] = [
  ["Get started with<br>&nbsp;Artemis&nbsp;", getStartedContent.headline],
  [
    "Start AI-progamming your next AI Agents",
    getStartedContent.subhead,
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
  ["Agent Platform { Artemis }", shellContent.navProduct],
  ["Agent Platform {&nbsp;Artemis&nbsp;}", `${shellContent.navProduct} · Softree`],
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
