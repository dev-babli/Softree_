/**
 * Modals_Layer fixture (Requirement 15.1, 15.2; task 17.1).
 *
 * Source: `public/softree-source-sections.html` — four `<dialog class="modal">`
 * nodes, in DOM order:
 *   1. `#enterprise-modal`       → kind 'content' (Softree marketecture / tech stack)
 *   2. `#ai-for-work-modal`      → kind 'video'
 *   3. `#ai-for-service-modal`   → kind 'video'
 *   4. `#ai-for-process-modal`   → kind 'video'
 *
 * Asset URLs flow through `assets.ts` (Requirement 24). The content modal uses
 * the `assets.modals` Tech-stack (`.bg`) + Softree_ai Marketecture webp images.
 *
 * ── SOURCING NOTES (per task 17.1 instructions) ────────────────────────────
 *
 *  • VIDEO SOURCES are NOT `.riv` files and are NOT reused from
 *    `assets.businessOutcomes`. Each video modal embeds a Webflow
 *    `<video-source-player data-provider="youtube" data-src="…youtube.com…">`.
 *    The businessOutcomes `68c2dd38…_ai_for_work__2.riv` /
 *    `68c2dd38…_ai_for_service_2.riv` files are the Business_Outcomes tab
 *    animations — a DIFFERENT surface — so the modals do NOT reuse them.
 *
 *  • These YouTube URLs are external (youtube.com), so they are intentionally
 *    absent from `assets.ts` (which only models `cdn.prod.website-files.com`
 *    passthrough + `/softree-marketing/` local assets, Req 24). They cannot be typed as the
 *    design's `VideoAssetRef` (whose `src` must be a cdn.prod/local `AssetRef`).
 *    → DEVIATION (flagged): video modals carry a `youtubeVideo` embed descriptor
 *      instead of `video: VideoAssetRef`. The `poster` field still uses an
 *      `ImageAssetRef` from `assets.modals` per design.md.
 *
 *  • All four dialogs share the same `.bg` poster image
 *    (`68bedbd0…_Tech stack.webp`) and the same `.modal-close` SVG; the close
 *    control has no source `aria-label`, so an accessible "Close" name is
 *    supplied (an accessibility addition required by `closeAriaLabel`).
 */

import { assets, type ImageAssetRef } from '../assets';
import type { PortableContentNode } from './_shared';

/** A YouTube embed source (Webflow `video-source-player[data-provider=youtube]`). */
export interface YoutubeVideoEmbed {
    readonly provider: 'youtube';
    readonly src: `https://www.youtube.com/watch?v=${string}`;
    /** The `<video-source-player id>` attribute, e.g. `ai-for-work-video`. */
    readonly playerId: string;
}

/**
 * A single modal descriptor (design.md `ModalDescriptor`).
 *
 * `dialogId` captures the Source_Document `<dialog id>` (e.g. `enterprise-modal`)
 * which differs from the logical `id` used by the spec/design.
 */
export interface ModalDescriptor {
    readonly id:
    | 'enterprise-tech-stack'
    | 'ai-for-work'
    | 'ai-for-service'
    | 'ai-for-process';
    /** Source_Document `<dialog id>` (the `data-modal-trigger` target). */
    readonly dialogId: string;
    readonly kind: 'content' | 'video';
    readonly heading: string;
    readonly body: string | ReadonlyArray<PortableContentNode>;
    /**
     * YouTube embed for `kind === 'video'`. (Deviation from design's
     * `video: VideoAssetRef`; see file header note.)
     */
    readonly youtubeVideo?: YoutubeVideoEmbed;
    /** Background / poster image (`.bg`). */
    readonly poster?: ImageAssetRef;
    readonly closeAriaLabel: string;
}

/** Props for `SoftreeModalsLayer` (design.md). */
export interface SoftreeModalsLayerProps {
    readonly modals: readonly ModalDescriptor[]; // length 4
}

// --- Shared poster (`.bg` image — Tech stack.webp, in every dialog) ----------

const techStackBg = assets.modals['68bedbd0eb9a2b6759187ac5-tech-stack-webp'];
const techStackPoster: ImageAssetRef = {
    ...techStackBg,
    alt: '',
    sizes: '100vw',
    loading: 'lazy',
    srcset: [
        `${assets.modals['68bedbd0eb9a2b6759187ac5-tech-stack-p-500-webp'].url} 500w`,
        `${assets.modals['68bedbd0eb9a2b6759187ac5-tech-stack-p-800-webp'].url} 800w`,
        `${assets.modals['68bedbd0eb9a2b6759187ac5-tech-stack-p-1080-webp'].url} 1080w`,
        `${assets.modals['68bedbd0eb9a2b6759187ac5-tech-stack-p-1600-webp'].url} 1600w`,
        `${assets.modals['68bedbd0eb9a2b6759187ac5-tech-stack-p-2000-webp'].url} 2000w`,
        `${techStackBg.url} 2160w`,
    ].join(', '),
};

// --- Enterprise tech-stack content image (`.modal_stack_image` — Marketecture)

const marketectureBase =
    assets.modals['698b3841f0a01edefe465a15-softree-agentic-marketecture-webp'];
const marketectureImage: ImageAssetRef = {
    ...marketectureBase,
    alt: '',
    sizes: '100vw',
    loading: 'lazy',
    srcset: [
        `${assets.modals['698b3841f0a01edefe465a15-softree-agentic-marketecture-p-500-webp'].url} 500w`,
        `${assets.modals['698b3841f0a01edefe465a15-softree-agentic-marketecture-p-800-webp'].url} 800w`,
        `${assets.modals['698b3841f0a01edefe465a15-softree-agentic-marketecture-p-1080-webp'].url} 1080w`,
        `${assets.modals['698b3841f0a01edefe465a15-softree-agentic-marketecture-p-1600-webp'].url} 1600w`,
        `${assets.modals['698b3841f0a01edefe465a15-softree-agentic-marketecture-p-2000-webp'].url} 2000w`,
        `${assets.modals['698b3841f0a01edefe465a15-softree-agentic-marketecture-p-2600-webp'].url} 2600w`,
        `${assets.modals['698b3841f0a01edefe465a15-softree-agentic-marketecture-p-3200-webp'].url} 3200w`,
        `${marketectureBase.url} 3552w`,
    ].join(', '),
};

// Body of the enterprise content modal mirrors the `.tech-stack-content`
// structure (`.tech-stack-block` groups). The visible surface is the
// marketecture image; the structured groups are preserved for parity.
const enterpriseTechStackBody: readonly PortableContentNode[] = [
    { type: 'group', heading: 'Marketplace', items: ['AI for Work', 'AI for Process', 'AI for Service'] },
    {
        type: 'group',
        heading: 'Agent Platform',
        items: [
            'Multi-Agent Orchestration',
            'Search and Data AI (Agent Context)',
            'No-code & Pro-code Tools',
            'AI Engineering Tools',
            'Observability',
            'AI Safety, Security, Compliance & Governance',
        ],
    },
    { type: 'group', heading: 'Enterprise date sources', items: ['Enterprise Apps', 'Unstructured Data'] },
    { type: 'group', heading: 'Enterprise  Integrations', items: ['Enterprise Apps', 'Unstructured Data'] },
    { type: 'image', image: marketectureImage },
];

const CLOSE_ARIA_LABEL = 'Close';

export const modalsData: SoftreeModalsLayerProps = {
    modals: [
        {
            id: 'enterprise-tech-stack',
            dialogId: 'enterprise-modal',
            kind: 'content',
            heading: 'Marketplace',
            body: enterpriseTechStackBody,
            poster: techStackPoster,
            closeAriaLabel: CLOSE_ARIA_LABEL,
        },
        {
            id: 'ai-for-work',
            dialogId: 'ai-for-work-modal',
            kind: 'video',
            heading: 'AI for Work',
            body: '',
            youtubeVideo: {
                provider: 'youtube',
                src: 'https://www.youtube.com/watch?v=ddmaFsqf_Z8',
                playerId: 'ai-for-work-video',
            },
            poster: techStackPoster,
            closeAriaLabel: CLOSE_ARIA_LABEL,
        },
        {
            id: 'ai-for-service',
            dialogId: 'ai-for-service-modal',
            kind: 'video',
            heading: 'AI for Service',
            body: '',
            youtubeVideo: {
                provider: 'youtube',
                src: 'https://www.youtube.com/watch?v=8FhVu9vZID4',
                playerId: 'ai-for-service-video',
            },
            poster: techStackPoster,
            closeAriaLabel: CLOSE_ARIA_LABEL,
        },
        {
            id: 'ai-for-process',
            dialogId: 'ai-for-process-modal',
            kind: 'video',
            heading: 'AI for Process',
            body: '',
            youtubeVideo: {
                provider: 'youtube',
                src: 'https://www.youtube.com/watch?v=wAWg3MCt5kw',
                playerId: 'ai-for-process-video',
            },
            poster: techStackPoster,
            closeAriaLabel: CLOSE_ARIA_LABEL,
        },
    ],
} as const;
