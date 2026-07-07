/**
 * Navigation fixture (Requirement 5.2, 5.5, 5.6, 5.7, 5.8; task 6.1).
 *
 * Source: `public/softree-source-sections.html` `<div class="nav">` —
 *   - `.nav-head .nav-logo` brand logo (inline SVG, anchor → "/")
 *   - `.menu .menu-links-list` four top-level entries:
 *       1. `Agent Platform { Artemis }`  (`.nav-dropdown`)   → mega menu
 *       2. `Agentic AI Apps`             (`.nav-dropdown`)   → mega menu
 *       3. `Agent Marketplace`           (`a.menu-link parent`, external link)
 *       4. `More`                        (`.nav-dropdown`)   → mega menu
 *   - `.nav-foot .nav-cta` → "Sign in" + the nav CTA button ("Get in touch")
 *
 * Mega menu structure is read from `.nav-dropdown .nav-dropdown-menu .mega-menu`
 * (columns = `.mega-column`, link groups = `.links-group`, product cards =
 * `.mega-card` / `.nav-card-block`, recent insights = `.recent-insight`, event
 * CTA = `.event-cta`). Asset URLs flow through `assets.ts` (`assets.navigation`,
 * Requirement 24).
 *
 * `MegaMenuItem` / `MegaMenuPanel` / `MegaColumn` / `LinkCard` mirror design.md
 * and are defined + exported here; `SoftreeNavigation` (task 6.2) imports them.
 *
 * ── DESIGN ↔ SOURCE DISCREPANCIES (flagged, not silently resolved) ──────────
 *
 *  1. AGENT MARKETPLACE HAS NO PANEL. design.md (Req 5.7) expects a Mega_Menu
 *     for Agent Marketplace ("featured cards and link groups"). In the captured
 *     Source_Document, `Agent Marketplace` is a PLAIN external anchor
 *     (`<a class="menu-link parent" href="https://marketplace.softreetechnology.com/"
 *     target="_blank">`) with NO `.nav-dropdown` / `.mega-menu`. It is modelled
 *     here as a `MegaMenuItem` with a non-null `href` and an EMPTY `menu`
 *     (`columns: []`). → reconcile design.md/Req 5.7, or confirm the link-only
 *     behavior.
 *
 *  2. LANGUAGE TOGGLE IS FOOTER-ONLY. design.md `SoftreeNavigationProps` requires
 *     `languageToggle`, and Req 5.2 lists it among the nav items. The captured
 *     Source_Document has NO `.lang-toggle` inside `.nav`; the only `.lang-toggle`
 *     in the document is in the `<footer>` (current "English", four "Spanish"
 *     `.lang-link`s — identical to `data/footer.ts`). `languageToggleData` below
 *     mirrors that single document-wide toggle so the prop can be satisfied.
 *     → reconcile design.md (the toggle may be footer-only).
 *
 *  3. NAV CTA LABEL. Req 5.2 calls the nav CTA "Get a demo". The captured
 *     `.nav-foot .nav-cta` button is labelled "Get in touch" → `/contact-us`
 *     (the literal "Get a demo" button lives in the Hero, not the nav). `demoCta`
 *     below is the actual nav-foot button verbatim; the "Sign in" link that
 *     precedes it is exported separately as `navSignInLink`. → reconcile design.md.
 *
 *  4. MEGA COLUMN RICHNESS. design.md `MegaColumn` models only `heading` +
 *     `cards` + `links`. The source columns nest link groups with their own
 *     sub-headings (e.g. "For Service" / "For Work" → "Modules" / "Departments")
 *     and carry banners. `MegaColumn` is therefore widened with documented
 *     optional fields (`groups`, `banner`) and a `LinkGroup` helper interface,
 *     following the same fidelity-over-strictness pattern as `data/footer.ts`.
 */

import { assets, type AssetRef, type ImageAssetRef } from '../assets';
import type { ButtonData, LanguageToggleData, LinkData } from './_shared';

// --- Interfaces (mirror design.md, with documented widenings) ----------------

/** A product/feature card inside a Mega_Menu column (design.md `ProductCard`). */
export interface ProductCard {
    readonly id: string;
    readonly heading: string;
    readonly href: string;
    readonly target?: '_blank' | '_self';
    /** `.products-card-head-icon` arrow / leading icon (design.md `icon`). */
    readonly icon?: AssetRef;
    /** Cover image (`.mega-card-img` / `.nav-card-img`) when the card has one. */
    readonly image?: ImageAssetRef;
    /** Supporting paragraph (`.text-body-small-medium`), optional in source. */
    readonly body?: string;
    /** `.k2-badge .badge-text` (e.g. "NEW"). */
    readonly badge?: string;
    /** Trailing dot CTA (`.button` "learn more"), when present. */
    readonly cta?: ButtonData;
}

/**
 * A labelled group of links inside a column (`.links-group`). Supports one
 * level of nesting (`subGroups`) to model the source "Modules" / "Departments"
 * split. (Widening beyond design.md `MegaColumn.links` — see header note 4.)
 */
export interface LinkGroup {
    readonly id: string;
    /** `.text-label.for-menu` or `<h6>` group heading. */
    readonly heading?: string;
    /** The group-heading arrow link (`.nav-products-card-head-icon`), if any. */
    readonly headingHref?: string;
    /** Supporting paragraph under the heading, if any. */
    readonly body?: string;
    readonly links?: readonly LinkData[];
    readonly subGroups?: readonly LinkGroup[];
}

/** A banner image-link inside a column (`.nav-img-link` + `.nav-products-head`). */
export interface MegaBanner {
    readonly image: ImageAssetRef;
    readonly href: string;
    readonly heading: string;
    readonly body?: string;
}

/**
 * An image + title + link card used by `recentInsights` and `eventCta`
 * (design.md `LinkCard`; `.recent-insight` / `.event-cta`).
 */
export interface LinkCard {
    readonly id: string;
    readonly title: string;
    readonly href: string;
    readonly target?: '_blank' | '_self';
    readonly image?: ImageAssetRef;
    /** `.tag` eyebrow (e.g. "AI INSIGHT", "Las Vegas"). */
    readonly tag?: string;
    /** `.tag` date (e.g. "15 May 2026", "22 Jun"). */
    readonly date?: string;
    /** Trailing dot CTA, used by the event card ("register"). */
    readonly cta?: ButtonData;
}

/** One `.mega-column` (design.md `MegaColumn`, widened — see header note 4). */
export interface MegaColumn {
    readonly id: string;
    readonly heading?: string;
    readonly cards?: readonly ProductCard[];
    readonly groups?: readonly LinkGroup[];
    readonly links?: readonly LinkData[];
    readonly banner?: MegaBanner;
}

/** The dropdown panel under a top-level item (design.md `MegaMenuPanel`). */
export interface MegaMenuPanel {
    /** `.mega-menu-head` / `.mega-menu-head-2` panel title. */
    readonly title?: string;
    readonly columns: readonly MegaColumn[];
    /** `.recent-insights-list` cards (with their column label). */
    readonly recentInsightsLabel?: string;
    readonly recentInsights?: readonly LinkCard[];
    /** `.event-cta` upcoming-event card (More menu). */
    readonly eventCta?: LinkCard;
    /** `.mega-block.is-cta` quick links (e.g. Talk to an expert / Request a Demo). */
    readonly ctaBlocks?: readonly ButtonData[];
}

/** One top-level nav entry (design.md `MegaMenuItem`). */
export interface MegaMenuItem {
    readonly id: 'agent-platform' | 'agentic-ai-apps' | 'agent-marketplace' | 'more';
    readonly label: string;
    readonly href: string | null;
    readonly target?: '_blank' | '_self';
    readonly menu: MegaMenuPanel;
}

/** The nav brand logo (inline SVG in source; anchor metadata only). */
export interface NavBrandLogo {
    readonly href: string;
    readonly ariaLabel: string;
}

/** Props for `SoftreeNavigation` (design.md, with the documented deviations). */
export interface SoftreeNavigationProps {
    readonly logo: NavBrandLogo;
    readonly items: readonly [MegaMenuItem, MegaMenuItem, MegaMenuItem, MegaMenuItem];
    readonly languageToggle: LanguageToggleData;
    readonly demoCta: ButtonData;
}

// --- Recent-insight thumbnails (resolved ImageAssetRefs) ---------------------

const insightConfiguredImg: ImageAssetRef = {
    ...assets.navigation[
    '6a073312c2fd95b325d5f241-configured-not-coded-the-engineering-discipline-gap-in-agent-development-webp'
    ],
    alt: 'Configured, not coded. The engineering discipline gap in agent development',
    loading: 'lazy',
};
const insightRuntimeImg: ImageAssetRef = {
    ...assets.navigation[
    '6a0732948fbd6c250a0ee418-can-todays-ai-agents-survive-their-own-runtime-webp'
    ],
    alt: 'Can Today’s AI Agents Survive Their Own Runtime?',
    loading: 'lazy',
};
const insightAi4wImg: ImageAssetRef = {
    ...assets.navigation['699860d81b1c2ed2d4b5219d-version-four-24-jpg'],
    alt: "What's new in AI for Work: features that drive enterprise productivity",
    loading: 'lazy',
};
const insightParallelImg: ImageAssetRef = {
    ...assets.navigation['69830d53e3656931c47d3225-parallel-agent-processing-jpg'],
    alt: 'Parallel Agent Processing',
    loading: 'lazy',
};
const resourceSearchToActionImg: ImageAssetRef = {
    ...assets.navigation[
    '69b9570e4da32f5ab25cdad5-from-search-to-action-what-makes-agentic-ai-work-in-practice-png'
    ],
    alt: 'From search to action: what makes agentic AI work in practice',
    loading: 'lazy',
};
const resourceUseCasesImg: ImageAssetRef = {
    ...assets.navigation[
    '68ff5a01881af38c360f28a3-ai-use-cases-insights-from-ai-s-leading-decision-makers-webp'
    ],
    alt: "AI use cases: insights from AI's leading decision makers",
    loading: 'lazy',
};
const resourceAiIslandsImg: ImageAssetRef = {
    ...assets.navigation[
    '68ff5ab61fc2800046405d5d-beyond-ai-islands-how-to-fully-build-an-enterwise-wide-ai-workforce-webp'
    ],
    alt: 'Beyond AI islands: how to fully build an enterwise-wide AI workforce',
    loading: 'lazy',
};
const guideForresterImg: ImageAssetRef = {
    ...assets.navigation['6900cd6400001f247db03abb-forrester-cx-wave-2024-webp'],
    alt: 'forrester cx wave 2024 Softree at top',
    loading: 'lazy',
};
const guideGenAi101Img: ImageAssetRef = {
    ...assets.navigation['6900ce6de331c2b312d89805-artboard-1-copy-316-2x-100-webp'],
    alt: '',
    loading: 'lazy',
};
const guideCxoImg: ImageAssetRef = {
    ...assets.navigation['6900ceea68aa38e8954d07ad-artboard-1-copy-281-2x-100-webp'],
    alt: '',
    loading: 'lazy',
};
const eventCcwImg: ImageAssetRef = {
    ...assets.navigation['69bd3c769f4b41875d8f0277-ccw-event-webp'],
    alt: '',
    loading: 'lazy',
};
const agentPlatformCardImg: ImageAssetRef = {
    ...assets.navigation['6a0dd9b872bd55926f41db60-frame-2147240289-webp'],
    alt: '',
    loading: 'lazy',
};
const useCasesBannerImg: ImageAssetRef = {
    ...assets.navigation['69c4ff7851594334cc0af967-nav-usecases-library-webp'],
    alt: '',
    loading: 'lazy',
};
const marketplaceCardImg: ImageAssetRef = {
    ...assets.navigation['698f2aa71b1ff9f5915088de-nav-marketplace-card-webp'],
    alt: '',
    loading: 'lazy',
};

// --- Shared "learn more" dot CTAs --------------------------------------------

const agentPlatformLearnMore: ButtonData = {
    label: 'learn more',
    href: '/ai-agent-platform',
    ariaLabel: 'Discover more',
    variant: 'ghost', // is-ghost="" (empty)
};
const tailoredPlatformLearnMore: ButtonData = {
    label: 'Learn more',
    href: '/ai-agent-platform',
    ariaLabel: 'Discover more',
    variant: 'ghost',
};

// --- Menu 1: Agent Platform { Artemis } --------------------------------------

const agentPlatformItem: MegaMenuItem = {
    id: 'agent-platform',
    label: 'Agent Platform { Artemis }',
    href: null,
    menu: {
        title: 'Agent Platform',
        columns: [
            {
                id: 'agent-platform-overview',
                cards: [
                    {
                        id: 'agent-platform-artemis',
                        heading: 'Agent Platform { Artemis }',
                        href: '/ai-agent-platform',
                        image: agentPlatformCardImg,
                        badge: 'NEW',
                        body: 'The AI-programmable foundation for building, scaling, and optimizing AI agents that work in production.',
                        cta: agentPlatformLearnMore,
                    },
                ],
            },
            {
                id: 'agent-platform-modules',
                groups: [
                    {
                        id: 'enterprise-modules-for-service',
                        heading: 'For Service',
                        headingHref: '/ai-for-service',
                        links: [
                            { label: 'AI Agents', href: '/ai-for-service/ai-agents' },
                            { label: 'Agent AI Assistance', href: '/ai-for-service/agent-ai' },
                            { label: 'Agentic Contact Center', href: '/ai-for-service/contact-center' },
                            { label: 'Quality Assurance', href: '/ai-for-service/quality-ai' },
                            { label: 'Proactive Outreach', href: '/ai-for-service/outbound-campaigns' },
                        ],
                    },
                    {
                        id: 'enterprise-modules-for-work',
                        heading: 'For Work',
                        headingHref: '/ai-for-work',
                        subGroups: [
                            {
                                id: 'for-work-modules',
                                heading: 'Modules',
                                links: [
                                    { label: 'Enterprise Search', href: 'https://softreetechnology.com/ai-for-work/#ai4w-enterprise-search' },
                                    { label: 'Intelligent Orchestrator', href: 'https://softreetechnology.com/ai-for-work/#ai4w-intelligent-orchestrator' },
                                    { label: 'Pre-Built AI Agents', href: 'https://softreetechnology.com/ai-for-work/#ai4w-pre-built' },
                                    { label: 'Admin Controls', href: 'https://softreetechnology.com/ai-for-work/#ai4w-admin-controls' },
                                    { label: 'AI Agent Builder', href: 'https://softreetechnology.com/ai-for-work/#ai4w-ai-agent-builder' },
                                ],
                            },
                            {
                                id: 'for-work-departments',
                                heading: 'Departments',
                                links: [
                                    { label: 'Sales', href: '/ai-for-work/sales' },
                                    { label: 'Marketing', href: '/ai-for-work/marketing' },
                                    { label: 'Engineering', href: '/ai-for-work/engineering' },
                                    { label: 'Legal', href: '/ai-for-work/legal' },
                                    { label: 'Finance', href: '/ai-for-work/finance' },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 'agent-platform-explore',
                heading: 'Explore',
                banner: {
                    image: useCasesBannerImg,
                    href: '/use-cases',
                    heading: 'Use Case Library',
                    body: 'Find the right AI use case for your business',
                },
            },
        ],
        recentInsightsLabel: 'Recent AI Insights',
        recentInsights: [
            {
                id: 'configured-not-coded',
                title: 'Configured, not coded. The engineering discipline gap in agent development',
                href: '/ai-insights/configured-not-coded-the-engineering-discipline-gap-in-agent-development',
                image: insightConfiguredImg,
                tag: 'AI INSIGHT',
                date: '15 May 2026',
            },
            {
                id: 'ai-agents-survive-runtime',
                title: 'Can Today’s AI Agents Survive Their Own Runtime?',
                href: '/ai-insights/can-todays-ai-agents-survive-their-own-runtime',
                image: insightRuntimeImg,
                tag: 'AI INSIGHT',
                date: '15 May 2026',
            },
            {
                id: 'whats-new-ai-for-work',
                title: "What's new in AI for Work: features that drive enterprise productivity",
                href: '/ai-insights/whats-new-in-ai-for-work-features-that-drive-enterprise-productivity',
                image: insightAi4wImg,
                tag: 'AI INSIGHT',
                date: '20 Feb 2026',
            },
            {
                id: 'parallel-agent-processing',
                title: 'Parallel Agent Processing',
                href: '/ai-insights/parallel-agent-processing',
                image: insightParallelImg,
                tag: 'AI INSIGHT',
                date: '16 Jan 2026',
            },
        ],
    },
};

// --- Menu 2: Agentic AI Apps -------------------------------------------------

const agenticAiAppsItem: MegaMenuItem = {
    id: 'agentic-ai-apps',
    label: 'Agentic AI Apps',
    href: null,
    menu: {
        title: 'AI Solutions',
        columns: [
            {
                id: 'agentic-solutions',
                cards: [
                    {
                        id: 'pre-built-applications',
                        heading: 'Pre-built Applications',
                        href: '/ai-for-service',
                        body: 'Ready-to-deploy applications across industries and functions.',
                    },
                    {
                        id: 'application-accelerators',
                        heading: 'Application Accelerators',
                        href: 'https://marketplace.softreetechnology.com/',
                        target: '_blank',
                        image: marketplaceCardImg,
                        body: 'Leverage pre-built AI agents, templates, and integrations from the Softree Marketplace.',
                    },
                    {
                        id: 'tailored-applications',
                        heading: 'Tailored Applications',
                        href: '/ai-agent-platform',
                        body: 'Design and build applications on our Agent Platform using our enterprise modules.',
                        cta: tailoredPlatformLearnMore,
                    },
                ],
                groups: [
                    {
                        id: 'pre-built-apps-links',
                        heading: 'Pre-built Applications',
                        links: [
                            { label: 'AI for Banking', href: '/ai-for-service/ai-for-banking' },
                            { label: 'AI for Healthcare', href: '/ai-for-service/ai-for-healthcare' },
                            { label: 'AI for Retail', href: '/ai-for-service/ai-for-retail' },
                            { label: 'AI for IT', href: '/ai-for-work/ai-for-it' },
                            { label: 'AI for HR', href: '/ai-for-work/ai-for-hr' },
                            { label: 'AI for Recruiting', href: '/ai-for-work/ai-for-recruiting' },
                        ],
                    },
                    {
                        id: 'application-accelerators-links',
                        heading: 'Application Accelerators',
                        links: [
                            { label: 'Pre-built agents', href: 'https://marketplace.softreetechnology.com/', target: '_blank' },
                            { label: 'Templates', href: 'https://marketplace.softreetechnology.com/', target: '_blank' },
                            { label: 'Integrations', href: 'https://marketplace.softreetechnology.com/', target: '_blank' },
                        ],
                    },
                    {
                        id: 'tailored-applications-links',
                        heading: 'Enterprise Modules',
                        links: [
                            { label: 'AI for Work', href: '/ai-for-work' },
                            { label: 'AI for Service', href: '/ai-for-service' },
                        ],
                    },
                ],
            },
            {
                id: 'agentic-quick-links',
                links: [
                    { label: 'About Softree', href: '/about-us' },
                    { label: 'Customer Stories', href: '/customer-stories' },
                    { label: 'Partners', href: '/partners' },
                    { label: 'Resources', href: '/resource' },
                    { label: 'Blog', href: '/blog' },
                    { label: 'Whitepapers', href: '/whitepaper' },
                    { label: 'Documentation', href: 'https://docs.softreetechnology.com' },
                    { label: 'Analyst Recognition', href: '/analyst-recognition' },
                    { label: 'Get support', href: '/support' },
                    { label: 'Community', href: 'https://community.softreetechnology.com', target: '_blank' },
                    { label: 'Academy', href: 'https://bots.softreetechnology.com/accounts/?return_to=saml&showLogin=true&hideSSOButtons=true&hideResourcesPageLink=true&comingFromKey=saml' },
                    { label: 'Careers', href: '/careers' },
                    { label: 'Contact Us', href: '/contact-us' },
                ],
            },
        ],
        recentInsightsLabel: 'Top Resources',
        recentInsights: [
            {
                id: 'from-search-to-action',
                title: 'From search to action: what makes agentic AI work in practice',
                href: '/webinar/from-search-to-action-what-makes-agentic-ai-work-in-practice?&utm_source=main-nav&utm_medium=content',
                image: resourceSearchToActionImg,
            },
            {
                id: 'ai-use-cases-insights',
                title: "AI use cases: insights from AI's leading decision makers",
                href: '/ai-research-reports/ai-use-cases-insights-report?utm_source=main-nav&utm_medium=content',
                image: resourceUseCasesImg,
            },
            {
                id: 'beyond-ai-islands',
                title: 'Beyond AI islands: how to fully build an enterwise-wide AI workforce',
                href: '/webinar/beyond-ai-islands?&utm_source=main-nav&utm_medium=content',
                image: resourceAiIslandsImg,
            },
        ],
    },
};

// --- Menu 3: Agent Marketplace (plain link, no panel — see header note 1) ----

const agentMarketplaceItem: MegaMenuItem = {
    id: 'agent-marketplace',
    label: 'Agent Marketplace',
    href: 'https://marketplace.softreetechnology.com/',
    target: '_blank',
    menu: { columns: [] },
};

// --- Menu 4: More ------------------------------------------------------------

const moreItem: MegaMenuItem = {
    id: 'more',
    label: 'More',
    href: null,
    menu: {
        title: 'More',
        columns: [
            {
                id: 'more-resources-support',
                groups: [
                    {
                        id: 'more-resources',
                        heading: 'Resources',
                        links: [
                            { label: 'Resource Hub', href: '/resource' },
                            { label: 'Blog', href: '/blog' },
                            { label: 'Whitepapers', href: '/whitepaper' },
                            { label: 'Webinars', href: '/webinar' },
                            { label: 'AI Research Reports', href: '/ai-research-reports' },
                            { label: 'AI Glossary', href: '/ai-glossary' },
                            { label: 'Videos', href: '/videos' },
                            { label: 'AI Pulse', href: '/aipulse' },
                            { label: 'Generative AI 101', href: '/generative-ai-101' },
                            { label: 'Responsive AI Framework', href: '/responsible-ai-framework' },
                            { label: 'CXO Toolkit', href: '/cxo-tool-kit' },
                            { label: 'Private equity', href: '/ai-for-private-equity' },
                        ],
                    },
                    {
                        id: 'more-support',
                        heading: 'support',
                        links: [
                            { label: 'Documentation', href: 'https://docs.softreetechnology.com' },
                            { label: 'Get support', href: '/support' },
                            { label: 'Submit RFP', href: '/request-for-proposal' },
                            { label: 'Academy', href: 'https://bots.softreetechnology.com/accounts/?return_to=saml&showLogin=true&hideSSOButtons=true&hideResourcesPageLink=true&comingFromKey=saml', target: '_blank' },
                            { label: 'Community', href: 'https://community.softreetechnology.com', target: '_blank' },
                        ],
                    },
                ],
            },
            {
                id: 'more-company',
                groups: [
                    {
                        id: 'more-company-links',
                        heading: 'COMPANY',
                        links: [
                            { label: 'About us', href: '/about-us' },
                            { label: 'Leadership', href: '/about-us#leadership' },
                            { label: 'Customer Stories', href: '/customer-stories' },
                            { label: 'Partners', href: '/partners' },
                            { label: 'Analyst Recognition', href: '/analyst-recognition' },
                            { label: 'Newsroom', href: '/news' },
                            { label: 'Events', href: '/event' },
                            { label: 'Careers', href: '/careers' },
                            { label: 'Contact us', href: '/contact-us' },
                        ],
                    },
                ],
            },
            {
                id: 'more-event',
            },
        ],
        recentInsightsLabel: 'Agentic AI Guides',
        recentInsights: [
            {
                id: 'forrester-wave-2024',
                title: 'Softree named a leader in The Forrester Wave™: Conversational AI for Customer Service, Q2 2024',
                href: '/ai-research-reports/forrester-wave-report-conversational-ai-2024',
                image: guideForresterImg,
            },
            {
                id: 'generative-ai-101',
                title: 'Generative AI 101',
                href: '/generative-ai-101',
                image: guideGenAi101Img,
            },
            {
                id: 'cxo-ai-toolkit',
                title: 'CXO AI toolkit for enterprise AI success',
                href: '/whitepaper/cxo-toolkit',
                image: guideCxoImg,
            },
        ],
        eventCta: {
            id: 'ccw-las-vegas',
            title: 'Customer Contact Week (CCW) Las Vegas is widely regarded as the world’s largest and most comprehensive event for customer contact and CX professionals.',
            href: 'https://www.customercontactweek.com/ccw-lasvegas/',
            image: eventCcwImg,
            tag: 'Las Vegas',
            date: '22 Jun',
            cta: {
                label: 'register',
                href: 'https://www.customercontactweek.com/ccw-lasvegas/',
                ariaLabel: 'Discover more',
                variant: 'ghost',
            },
        },
        ctaBlocks: [
            {
                label: 'Talk to an expert',
                href: '/talk-to-an-expert',
                variant: 'ghost',
            },
            {
                label: 'Request a Demo',
                href: '/request-a-demo',
                variant: 'ghost',
            },
        ],
    },
};

// --- Language toggle (footer-only in source — see header note 2) -------------

export const languageToggleData: LanguageToggleData = {
    current: 'English',
    languages: [
        { code: 'es', label: 'Spanish' },
        { code: 'es', label: 'Spanish' },
        { code: 'es', label: 'Spanish' },
        { code: 'es', label: 'Spanish' },
    ],
};

// --- Nav-foot CTA + Sign in (see header note 3) ------------------------------

/** `.nav-foot .nav-cta` "Sign in" link (precedes the CTA button in source). */
export const navSignInLink: LinkData = {
    label: 'Sign in',
    href: '/sign-in',
};

/**
 * Nav CTA button. Source `.nav-foot .nav-cta` button is "Get in touch" →
 * `/contact-us` (Req 5.2 calls it "Get a demo" — see header note 3).
 */
export const demoCta: ButtonData = {
    label: 'Get in touch',
    href: '/contact-us',
    ariaLabel: 'Discover more',
    variant: 'ghost', // is-ghost="" (empty)
};

// --- navigationData ----------------------------------------------------------

export const navigationData: SoftreeNavigationProps = {
    logo: {
        href: '/',
        ariaLabel: 'softreetechnology.com homepage',
    },
    items: [agentPlatformItem, agenticAiAppsItem, agentMarketplaceItem, moreItem],
    languageToggle: languageToggleData,
    demoCta,
} as const;
