/**
 * Strategic_Partners fixture (Requirement 11.1; task 13.1).
 *
 * Source: `public/kore-source-sections.html` — the `.grid._2-column` containing
 * two `.image-card` nodes, in source DOM order:
 *   1. Microsoft → `Frame%201984079612.avif`
 *   2. AWS       → `Frame%201984079611.avif`
 *
 * Section heading: `<h3>Strategic partners: Microsoft and AWS</h3>`.
 *
 * Asset URLs flow through `assets.ts` `assets.strategicPartners` (Requirement
 * 24) — the two `Frame*.avif` entries.
 *
 * ── SOURCING / DEVIATION NOTES ─────────────────────────────────────────────
 *
 *  • CARD `heading`: Source_Document `.image-card` nodes have NO heading element
 *    (the card is image + body copy + two CTAs only). design.md `PartnerCard`
 *    requires a `heading: string`; to stay faithful, the brand name ("Microsoft"
 *    / "AWS") — which is also the required image `alt` per Req 11.2 — is used as
 *    the card heading. The component MAY render it visually-hidden if the source
 *    shows no visible heading; the value still pins the brand for parity.
 *
 *  • CARD CTAs: each source card carries TWO `.button` anchors — a primary
 *    "Read more" news link and a secondary marketplace link
 *    (Azure Marketplace / AWS Marketplace). design.md `PartnerCard` models a
 *    single `cta: ButtonData`. The primary "Read more" link is mapped to `cta`
 *    (it is the card's main action and carries the descriptive `aria-label`);
 *    the marketplace link is exported alongside as `secondaryCta` so the
 *    component can render both without breaking the documented `cards` tuple
 *    shape. Both carry `target`/`rel` per the task (`Read more` is same-tab in
 *    source; the marketplace links open external marketplaces).
 *
 *  • `image.alt`: set to the brand name per Requirement 11.2 (source `alt=""`).
 *
 *  • `target`/`rel`: Source_Document anchors declare neither `target` nor `rel`
 *    on these links (no `target="_blank"`). Per the task's "target+rel"
 *    instruction, the external marketplace + news links are given
 *    `target: '_blank'` + `rel: 'noopener noreferrer'` (the safe default for
 *    off-site navigation, Requirement 11.6); this is flagged as an addition
 *    since the source omits them.
 */

import { assets, type ImageAssetRef } from '../assets';
import type { ButtonData } from './_shared';

/**
 * A single strategic-partner card (design.md `PartnerCard`).
 *
 * `secondaryCta` is an additive field (see file header) carrying the card's
 * marketplace link; `cta` is the primary "Read more" news link.
 */
export interface PartnerCard {
    readonly id: 'microsoft' | 'aws';
    readonly image: ImageAssetRef;
    readonly heading: string;
    readonly body: string;
    readonly cta: ButtonData; // includes target + rel (Req 11.6)
    readonly secondaryCta: ButtonData;
}

/** Props for `KoreStrategicPartners` (design.md). */
export interface KoreStrategicPartnersProps {
    readonly heading: string;
    /** Exactly two cards, Microsoft first (Requirement 11.1). */
    readonly cards: readonly [PartnerCard, PartnerCard];
}

// --- Card images (Source_Document `.image-card-image.c2 > img`) --------------

const microsoftImage: ImageAssetRef = {
    ...assets.strategicPartners['68acb73e632d51db064e1b3b-frame-1984079612-avif'],
    alt: 'Microsoft', // brand name (Req 11.2); source alt=""
    loading: 'lazy',
};

const awsImage: ImageAssetRef = {
    ...assets.strategicPartners['68acb73efa1938400f416b0b-frame-1984079611-avif'],
    alt: 'AWS', // brand name (Req 11.2); source alt=""
    loading: 'lazy',
};

// --- Fixture -----------------------------------------------------------------

export const strategicPartnersData: KoreStrategicPartnersProps = {
    heading: 'Strategic partners: Microsoft and AWS',
    cards: [
        {
            id: 'microsoft',
            image: microsoftImage,
            heading: 'Microsoft',
            body:
                'Deploy the Kore.ai Agent Platform and AI solutions within Microsoft ' +
                'environments including Azure Al Foundry, Microsoft Teams, Microsoft 365 ' +
                'Copilot, and Microsoft Copilot Studio to see Al value faster from your ' +
                'AI business use cases.',
            cta: {
                label: 'Read more',
                href: '/news/kore-ai-forges-strategic-partnership-with-microsoft-to-accelerate-enterprise-ai-transformation',
                ariaLabel: 'Discover more about Kore.ai and Microsoft partnership',
                variant: 'ghost', // is-ghost="" (empty)
                target: '_blank',
                rel: 'noopener noreferrer',
            },
            secondaryCta: {
                label: 'AZURE MARKETPLACE',
                href: 'https://azuremarketplace.microsoft.com/en-us/marketplace/apps?search=kore.ai&page=1',
                ariaLabel: 'Discover more',
                variant: 'secondary', // is-ghost="1"
                target: '_blank',
                rel: 'noopener noreferrer',
            },
        },
        {
            id: 'aws',
            image: awsImage,
            heading: 'AWS',
            body:
                'The Kore.ai Agent Platform and AI solutions are integrated with AWS ' +
                'services including Amazon Bedrock, Amazon Q and Amazon Connect to ' +
                'accelerate the deployment of AWS Al tools across business use cases.',
            cta: {
                label: 'Read more',
                href: '/news/kore-ai-announces-strategic-collaboration-agreement-with-aws-to-accelerate-enterprise-ai-adoption',
                ariaLabel: 'Discover more about Kore.ai and AWS partnership',
                variant: 'ghost', // is-ghost="" (empty)
                target: '_blank',
                rel: 'noopener noreferrer',
            },
            secondaryCta: {
                label: 'AWS MARKETPLACE',
                href: 'https://aws.amazon.com/marketplace/seller-profile?id=seller-ihhlsmvs4dyow',
                ariaLabel: 'Discover more',
                variant: 'secondary', // is-ghost="1"
                target: '_blank',
                rel: 'noopener noreferrer',
            },
        },
    ],
} as const;
