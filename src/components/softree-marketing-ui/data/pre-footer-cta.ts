/**
 * Pre_Footer_CTA fixture (Requirement 13.1, 13.2; task 15.1).
 *
 * Source: `public/softree-source-sections.html` `<footer> … .footer-cta-content`
 * — the `.grid._2-column` containing two `.cta-block` nodes, followed by the
 * section `.full-bg` background image and the `.wrapper-bg-cover` background
 * image.
 *
 * Block order (source DOM order, Requirement 13.1):
 *   1. `accelerate-time-to-value`  — "Accelerate time-to-value from AI"
 *   2. `start-using-artemis-today` — "Start using { Artemis } today"
 *
 * Asset URLs flow through `assets.ts` (Requirement 24); the two
 * `bg-wave-simple-4` avif entries under `assets.preFooterCta` back the section.
 */

import { assets, type ImageAssetRef } from '../assets';
import type { ButtonData, CtaBlock } from './_shared';

/** Props for `KorePreFooterCta` (design.md). */
export interface KorePreFooterCtaProps {
    /** Exactly two CTA blocks, Microsoft-style fixed tuple in source order. */
    readonly blocks: readonly [CtaBlock, CtaBlock];
}

// --- CTA buttons (verbatim from Source_Document) -------------------------

const talkToAnExpertCta: ButtonData = {
    // <a … href="/talk-to-an-expert" is-ghost="1" …><div>Talk to an expert</div>
    label: 'Talk to an expert',
    href: '/talk-to-an-expert',
    variant: 'secondary', // is-ghost="1"
};

const meetArtemisCta: ButtonData = {
    // <a … href="/ai-agent-platform" is-ghost="" aria-label="Discover more" …>
    //   <div>MEET {ARTEMIS}</div>
    label: 'MEET {ARTEMIS}',
    href: '/ai-agent-platform',
    ariaLabel: 'Discover more',
    variant: 'ghost', // is-ghost="" (empty)
};

// --- CTA blocks ----------------------------------------------------------

export const preFooterCtaData: KorePreFooterCtaProps = {
    blocks: [
        {
            id: 'accelerate-time-to-value',
            heading: 'Accelerate time-to-value from AI',
            body: 'Find out how Softree can help',
            primary: talkToAnExpertCta,
        },
        {
            id: 'start-using-artemis-today',
            heading: 'Start using { Artemis } today',
            body: 'Meet our new Agent Platform',
            primary: meetArtemisCta,
        },
    ],
} as const;

// --- Section background images (Source_Document .full-bg + .wrapper-bg-cover)
// The CtaBlock interface (design.md) carries copy only; the wave backgrounds
// are section-level layers, exported separately so `KorePreFooterCta` can
// render them while `preFooterCtaData` stays conformant to the documented props.

/** Inner `.full-bg` image sitting behind the two-column CTA grid. */
export const preFooterCtaFullBg: ImageAssetRef = {
    ...assets.preFooterCta['68934634672a08409268f696-bg-wave-simple-4-avif'],
    alt: 'Background Image 4',
    sizes: '100vw',
    srcset: `${assets.preFooterCta['68934634672a08409268f696-bg-wave-simple-4-p-500-avif'].url} 500w, ${assets.preFooterCta['68934634672a08409268f696-bg-wave-simple-4-avif'].url} 1438w`,
    loading: 'lazy',
};

/** Outer `.wrapper-bg-cover` image layered over the section wrapper. */
export const preFooterCtaWrapperBg: ImageAssetRef = {
    ...assets.preFooterCta['682decdbef429c9ff5b9949c-bg-wave-simple-4-avif'],
    alt: 'Background Image 9',
    sizes: '100vw',
    srcset: `${assets.preFooterCta['682decdbef429c9ff5b9949c-bg-wave-simple-4-p-500-avif'].url} 500w, ${assets.preFooterCta['682decdbef429c9ff5b9949c-bg-wave-simple-4-avif'].url} 1438w`,
    loading: 'lazy',
};
