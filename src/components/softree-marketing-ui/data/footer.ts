/**
 * Site Footer fixture (Requirement 14.1, 14.7; task 16.1).
 *
 * Source: `public/softree-source-sections.html` `<footer class="footer">` —
 * `.footer-head` (brand logo + tagline + language toggle), `.footer-body`
 * (`.footer-links-grid` link columns + `.flex-verti` RFP CTA & social row), and
 * `.footer-foot` (copyright + legal links + back-to-top).
 *
 * Asset URLs flow through `assets.ts` (Requirement 24); the three social icon
 * SVGs come from `assets.footer` (square-linkedin / square-youtube /
 * square-x-twitter).
 *
 * ── DESIGN ↔ SOURCE DISCREPANCIES (flagged, not silently resolved) ──────────
 *
 *  1. COLUMN COUNT. design.md `KoreFooterProps.columns` is a 4-tuple
 *     (`[FooterColumn, FooterColumn, FooterColumn, FooterColumn]`) and
 *     Requirement 14.1 says "the four link columns". The Source_Document
 *     `.footer-links-grid` actually contains SIX `.footer-links-block` columns:
 *     Pre-Built Applications, Softree agent platform, Industries, company,
 *     resources, GET INVOLVED. Because the spec's prime directive is a
 *     no-simplification, pixel-perfect clone (Req intro), dropping two whole
 *     navigation columns would break fidelity and visual diffs. This fixture
 *     therefore preserves all six source columns and widens `columns` to
 *     `readonly FooterColumn[]`. The individual `FooterColumn` shape is
 *     unchanged from design.md. → reconcile design.md/Req 14.1 to six columns,
 *     or confirm the intended four.
 *
 *  2. BRAND LOGO. design.md types `KoreFooterProps.logo: AssetRef`, but the
 *     source footer logo is an INLINE `<svg>` (anchor `.footer-logo`,
 *     `href="#"`, `aria-label="softreetechnology.com homepage"`) with no external asset URL,
 *     so it cannot be represented as a `cdn-passthrough`/`local` AssetRef. The
 *     logo is modelled here as `FooterBrandLogo` (href + ariaLabel); the
 *     `KoreFooter` component renders the SVG markup inline. → reconcile design.md.
 */

import { assets, type ImageAssetRef } from '../assets';
import type { CtaBlock, LanguageToggleData, LinkData } from './_shared';

/** A footer link column: a heading label plus its list of links. (design.md) */
export interface FooterColumn {
    readonly heading: string;
    readonly links: readonly LinkData[];
}

/**
 * Footer brand logo. The source renders an inline SVG (no asset URL), so this
 * captures only the anchor metadata; the component inlines the SVG paths.
 * (Deviation from design.md `logo: AssetRef` — see file header note 2.)
 */
export interface FooterBrandLogo {
    readonly href: string;
    readonly ariaLabel: string;
}

/** Props for `KoreFooter` (design.md, with the two documented deviations). */
export interface KoreFooterProps {
    readonly logo: FooterBrandLogo;
    readonly tagline: string;
    readonly languageToggle: LanguageToggleData;
    /** Source `.footer-links-grid` columns in DOM order (six in source). */
    readonly columns: readonly FooterColumn[];
    readonly rfpCta: CtaBlock;
    readonly social: readonly LinkData[];
    readonly legal: readonly LinkData[];
    readonly copyright: string;
}

// --- Social icon images (Source_Document `.social-links`, DOM order) ---------

const linkedinIcon: ImageAssetRef = {
    ...assets.footer['68ef6f7e22a77b2a1bcdafe4-square-linkedin-svg'],
    alt: '',
    loading: 'lazy',
};
const youtubeIcon: ImageAssetRef = {
    ...assets.footer['68ef6f7e872240a4ae91207a-square-youtube-svg'],
    alt: '',
    loading: 'lazy',
};
const twitterIcon: ImageAssetRef = {
    ...assets.footer['68ef6f7e1089f67e31928fc9-square-x-twitter-svg'],
    alt: '',
    loading: 'lazy',
};

/** Re-export the resolved social icons for the component (DOM order). */
export const footerSocialIcons = {
    linkedin: linkedinIcon,
    youtube: youtubeIcon,
    twitter: twitterIcon,
} as const;

// --- footerData --------------------------------------------------------------

export const footerData: KoreFooterProps = {
    logo: {
        href: '#',
        ariaLabel: 'softreetechnology.com homepage',
    },
    tagline: 'Agentic AI applications for the enterprise',
    // `.lang-toggle` — current label "English"; the open list shows "Spanish"
    // four times in the source (`.lang-link` x4).
    languageToggle: {
        current: 'English',
        languages: [
            { code: 'es', label: 'Spanish' },
            { code: 'es', label: 'Spanish' },
            { code: 'es', label: 'Spanish' },
            { code: 'es', label: 'Spanish' },
        ],
    },
    columns: [
        {
            heading: 'Pre-Built Applications',
            links: [
                { label: 'Banking', href: '/ai-for-service/ai-for-banking' },
                { label: 'Healthcare', href: '/ai-for-service/ai-for-healthcare' },
                { label: 'Retail', href: '/ai-for-service/ai-for-retail' },
                { label: 'Recruiting', href: '/ai-for-work/ai-for-recruiting' },
                { label: 'HR', href: '/ai-for-work/ai-for-hr' },
                { label: 'IT', href: '/ai-for-work/ai-for-it' },
            ],
        },
        {
            heading: 'Softree agent platform',
            links: [
                { label: 'Platform Overview', href: '/ai-agent-platform' },
                { label: 'AI for Service', href: '/ai-for-service' },
                { label: 'AI for Work', href: '/ai-for-work' },
                {
                    label: 'Agent Marketplace',
                    href: 'https://marketplace.softreetechnology.com',
                },
            ],
        },
        {
            heading: 'Industries',
            links: [
                { label: 'Healthcare (Payer)', href: '/industry/healthcare-payer' },
                {
                    label: 'Healthcare (Provider)',
                    href: '/industry/healthcare-provider',
                },
            ],
        },
        {
            heading: 'company',
            links: [
                { label: 'About Softree', href: '/about-us' },
                { label: 'Leadership', href: '/about-us#leadership' },
                { label: 'Customer Stories', href: '/customer-stories' },
                { label: 'Partners', href: '/partners' },
                { label: 'Analyst Recognition', href: '/analyst-recognition' },
                { label: 'Newsroom', href: '/news' },
            ],
        },
        {
            heading: 'resources',
            links: [
                { label: 'Documentation', href: 'https://docs.softreetechnology.com' },
                { label: 'Blog', href: '/blog' },
                { label: 'Whitepapers', href: '/whitepaper' },
                { label: 'Webinars', href: '/webinar' },
                { label: 'AI Research Reports', href: '/ai-research-reports' },
                { label: 'AI Glossary', href: '/ai-glossary' },
                { label: 'Videos', href: '/videos' },
                { label: 'Generative AI 101', href: '/generative-ai-101' },
                {
                    label: 'Responsive AI framework',
                    href: '/responsible-ai-framework',
                },
                { label: 'CXO Toolkit', href: 'https://softreetechnology.com/whitepaper/cxo-toolkit' },
            ],
        },
        {
            heading: 'GET INVOLVED',
            links: [
                { label: 'Events', href: '/event' },
                { label: 'Support', href: '/support' },
                {
                    label: 'Academy',
                    href: 'https://bots.softreetechnology.com/accounts/?return_to=saml&showLogin=true&hideSSOButtons=true&hideResourcesPageLink=true&comingFromKey=saml&samlReqId=sar-eee28ed1-023f-5074-840f-95108c381173&RelayState=A1H33GV1WRfMkFobaqVGRuXAs1yf5GdeonEBRxJMoVabE0UD2oZ85-Qd',
                },
                {
                    label: 'Community',
                    href: 'https://community.softreetechnology.com',
                    target: '_blank',
                },
                { label: 'Careers', href: '/careers' },
            ],
        },
    ],
    // `.info-block` RFP CTA — heading + body + "Submit RFP" ghost button.
    rfpCta: {
        id: 'submit-rfp',
        heading: 'Let’s work together',
        body: 'Get answers and a customized quote for your projects',
        primary: {
            label: 'Submit RFP',
            href: '/request-for-proposal',
            variant: 'secondary', // is-ghost="1"
        },
    },
    // `.social-links` DOM order: LinkedIn, YouTube, X. All open in a new tab.
    social: [
        {
            label: 'Follow us on Linkedin',
            href: 'https://in.linkedin.com/company/softree-technology',
            target: '_blank',
            ariaLabel: 'Follow us on Linkedin',
        },
        {
            label: 'Follow us on Youtube',
            href: 'https://www.youtube.com/@Koreai',
            target: '_blank',
            ariaLabel: 'Follow us on Youtube',
        },
        {
            label: 'Follow us on X',
            href: 'https://x.com/koredotai',
            target: '_blank',
            ariaLabel: 'Follow us on X',
        },
    ],
    // `.footer-foot-links-list` legal row, DOM order.
    legal: [
        {
            label: 'Trust Center',
            href: 'https://trust.softreetechnology.com/',
            target: '_blank',
        },
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Terms of Service', href: '/terms-of-service' },
        { label: 'Acceptable Use Policy', href: '/acceptable-use-policy' },
        { label: 'Cookie Policy', href: '/cookie-policy' },
        { label: 'Intellectual Property Rights', href: '#' },
    ],
    copyright:
        '© 2026 Softree Inc. All trademarks are property of their respective owners.',
} as const;
