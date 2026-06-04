/**
 * AI_Insights fixture (Requirement 12.1, 12.3, 12.5; task 14.1).
 *
 * Source: `public/kore-source-sections.html` — the `.blogs_hero-section.for-homepage`
 * block containing:
 *   • one featured block  → `.blogs_hero-section_block.hide-mobile-landscape`
 *                            > one `.blog-item.height-100` (`variant: 'featured'`)
 *   • one latest list     → `.blogs_hero-section_block.for-latest.for-homepage`
 *                            > `.latest-blogs-list` with four `.blog-item.is-latest`
 *                            entries (`variant: 'latest'`), in source DOM order.
 *
 * Asset URLs flow through `assets.ts` `assets.aiInsights` (Requirement 24); each
 * cover is built as an `ImageAssetRef` from the matching `*-webp` base entry plus
 * its responsive `-p-500/-p-800/-p-1080/-p-1600` variants where the source `<img>`
 * declares a `srcset`. The final latest item (`thumbnail 01`) carries no `srcset`
 * in Source_Document, so its cover omits `srcset`/`sizes` to stay one-to-one.
 *
 * Per Requirement 12.5 this is a STATIC build-time fixture — there is NO Webflow
 * CMS feed and NO Out_Of_Scope_Backend call.
 *
 * ── SOURCING / DEVIATION NOTES ─────────────────────────────────────────────
 *
 *  • EMPTY read-time (Requirement 12.3): the source renders the read-time node
 *    as an empty `.text-color-charcoal2.w-dyn-bind-empty` div on the featured
 *    item and on latest items #1 ("Can Today's AI Agents…") and #4 ("The AI
 *    productivity paradox…"). Those are encoded as `readTime: ''` (empty string
 *    permitted). Latest #2 and #3 carry "8 Min" / "6 Min".
 *
 *  • COVER `alt`: every source `<img>` has `alt=""` (the cover is decorative —
 *    the link's `<h3>` title is the accessible name). `ImageAssetRef.alt` is
 *    required, so `alt: ''` is kept verbatim rather than inventing alt text.
 *
 *  • `id`: not present in Source_Document; derived from each item's href slug
 *    for stable React keys.
 *
 *  • TITLES/DATES are copied verbatim from Source_Document (including the curly
 *    apostrophe in "Today’s" and "What's").
 */

import { assets, type ImageAssetRef } from '../assets';
import type { ButtonData } from './_shared';

/**
 * A single AI_Insights blog entry (design.md `BlogItem`).
 *
 * `readTime` permits an empty string (Requirement 12.3). `category` / `tag`
 * are optional and absent in Source_Document for the homepage grid.
 */
export interface BlogItem {
    readonly id: string;
    readonly cover: ImageAssetRef;
    readonly title: string;
    readonly publishDate: string;
    /** Empty string permitted — source renders an empty node (Requirement 12.3). */
    readonly readTime: string;
    readonly category?: string;
    readonly tag?: string;
    readonly href: string;
    readonly variant: 'featured' | 'latest';
}

/** Props for `KoreAiInsights` (design.md). */
export interface KoreAiInsightsProps {
    readonly heading: 'AI Insights';
    readonly viewAllCta: ButtonData;
    /** Exactly one featured item (Requirement 12.1). */
    readonly featured: BlogItem;
    /** Exactly four latest items, source DOM order (Requirement 12.1). */
    readonly latest: readonly [BlogItem, BlogItem, BlogItem, BlogItem];
}

// --- Cover images (Source_Document `.blog-img-wrap > img`) --------------------

const featuredCover: ImageAssetRef = {
    ...assets.aiInsights['691463d2d3afc6512828bbda-ai-insights-thumbnail-09-webp'],
    alt: '',
    sizes: '100vw',
    loading: 'lazy',
    srcset: [
        `${assets.aiInsights['691463d2d3afc6512828bbda-ai-insights-thumbnail-09-p-500-webp'].url} 500w`,
        `${assets.aiInsights['691463d2d3afc6512828bbda-ai-insights-thumbnail-09-p-800-webp'].url} 800w`,
        `${assets.aiInsights['691463d2d3afc6512828bbda-ai-insights-thumbnail-09-p-1080-webp'].url} 1080w`,
        `${assets.aiInsights['691463d2d3afc6512828bbda-ai-insights-thumbnail-09-p-1600-webp'].url} 1600w`,
        `${assets.aiInsights['691463d2d3afc6512828bbda-ai-insights-thumbnail-09-webp'].url} 1800w`,
    ].join(', '),
};

const latestCover1: ImageAssetRef = {
    ...assets.aiInsights['6a072ac99e4c9c7cab3defb2-ai-insights-thumbnail-05-webp'],
    alt: '',
    sizes: '100vw',
    loading: 'lazy',
    srcset: [
        `${assets.aiInsights['6a072ac99e4c9c7cab3defb2-ai-insights-thumbnail-05-p-500-webp'].url} 500w`,
        `${assets.aiInsights['6a072ac99e4c9c7cab3defb2-ai-insights-thumbnail-05-p-800-webp'].url} 800w`,
        `${assets.aiInsights['6a072ac99e4c9c7cab3defb2-ai-insights-thumbnail-05-p-1080-webp'].url} 1080w`,
        `${assets.aiInsights['6a072ac99e4c9c7cab3defb2-ai-insights-thumbnail-05-p-1600-webp'].url} 1600w`,
        `${assets.aiInsights['6a072ac99e4c9c7cab3defb2-ai-insights-thumbnail-05-webp'].url} 1800w`,
    ].join(', '),
};

const latestCover2: ImageAssetRef = {
    ...assets.aiInsights['6900c68c16d8a7cd9f3fa6ed-ai-insights-thumbnail-06-webp'],
    alt: '',
    sizes: '100vw',
    loading: 'lazy',
    srcset: [
        `${assets.aiInsights['6900c68c16d8a7cd9f3fa6ed-ai-insights-thumbnail-06-p-500-webp'].url} 500w`,
        `${assets.aiInsights['6900c68c16d8a7cd9f3fa6ed-ai-insights-thumbnail-06-p-800-webp'].url} 800w`,
        `${assets.aiInsights['6900c68c16d8a7cd9f3fa6ed-ai-insights-thumbnail-06-p-1080-webp'].url} 1080w`,
        `${assets.aiInsights['6900c68c16d8a7cd9f3fa6ed-ai-insights-thumbnail-06-p-1600-webp'].url} 1600w`,
        `${assets.aiInsights['6900c68c16d8a7cd9f3fa6ed-ai-insights-thumbnail-06-webp'].url} 1800w`,
    ].join(', '),
};

const latestCover3: ImageAssetRef = {
    ...assets.aiInsights['68fa2b1e71584b6d574a1c6e-ai-insights-abstract-07-webp'],
    alt: '',
    sizes: '100vw',
    loading: 'lazy',
    srcset: [
        `${assets.aiInsights['68fa2b1e71584b6d574a1c6e-ai-insights-abstract-07-p-500-webp'].url} 500w`,
        `${assets.aiInsights['68fa2b1e71584b6d574a1c6e-ai-insights-abstract-07-p-800-webp'].url} 800w`,
        `${assets.aiInsights['68fa2b1e71584b6d574a1c6e-ai-insights-abstract-07-p-1080-webp'].url} 1080w`,
        `${assets.aiInsights['68fa2b1e71584b6d574a1c6e-ai-insights-abstract-07-p-1600-webp'].url} 1600w`,
        `${assets.aiInsights['68fa2b1e71584b6d574a1c6e-ai-insights-abstract-07-webp'].url} 1800w`,
    ].join(', '),
};

// Latest #4 ("The AI productivity paradox") — source <img> has NO srcset/sizes.
const latestCover4: ImageAssetRef = {
    ...assets.aiInsights['68c27b14f28aa19ae7a18ca4-ai-insights-thumbnail-01-webp'],
    alt: '',
    loading: 'lazy',
};

// --- "View all" CTA (Source_Document `.section-head > a.button`) --------------

const viewAllCta: ButtonData = {
    // <a … href="/ai-insights" is-ghost="1" aria-label="Discover more" is-text-link="">
    //   <div class="text-style-1line">View all</div>
    label: 'View all',
    href: '/ai-insights',
    ariaLabel: 'Discover more',
    variant: 'secondary', // is-ghost="1"
};

// --- Fixture -----------------------------------------------------------------

export const aiInsightsData: KoreAiInsightsProps = {
    heading: 'AI Insights',
    viewAllCta,
    featured: {
        id: 'configured-not-coded-the-engineering-discipline-gap-in-agent-development',
        cover: featuredCover,
        title: 'Configured, not coded. The engineering discipline gap in agent development',
        publishDate: 'May 15, 2026',
        readTime: '',
        href: '/ai-insights/configured-not-coded-the-engineering-discipline-gap-in-agent-development',
        variant: 'featured',
    },
    latest: [
        {
            id: 'can-todays-ai-agents-survive-their-own-runtime',
            cover: latestCover1,
            title: 'Can Today’s AI Agents Survive Their Own Runtime?',
            publishDate: 'May 15, 2026',
            readTime: '',
            href: '/ai-insights/can-todays-ai-agents-survive-their-own-runtime',
            variant: 'latest',
        },
        {
            id: 'whats-new-in-ai-for-work-features-that-drive-enterprise-productivity',
            cover: latestCover2,
            title: "What's new in AI for Work: features that drive enterprise productivity",
            publishDate: 'February 20, 2026',
            readTime: '8 Min',
            href: '/ai-insights/whats-new-in-ai-for-work-features-that-drive-enterprise-productivity',
            variant: 'latest',
        },
        {
            id: 'parallel-agent-processing',
            cover: latestCover3,
            title: 'Parallel Agent Processing',
            publishDate: 'January 16, 2026',
            readTime: '6 Min',
            href: '/ai-insights/parallel-agent-processing',
            variant: 'latest',
        },
        {
            id: 'ai-productivity-paradox',
            cover: latestCover4,
            title: 'The AI productivity paradox: why employees are moving faster than enterprises',
            publishDate: 'January 12, 2026',
            readTime: '',
            href: '/ai-insights/ai-productivity-paradox',
            variant: 'latest',
        },
    ],
} as const;
