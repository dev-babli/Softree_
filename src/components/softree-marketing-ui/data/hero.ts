/**
 * Hero section fixture (Requirement 6.2, 6.3, 6.4; task 7.1).
 *
 * Source: `public/softree-source-sections.html` `<section class="section-home-hero
 * _100vh pb-0">` —
 *   - `.home-hero-content-text` → `<h1 class="home-main-heading">` headline +
 *     `<p class="heading-style-h5">` subhead
 *   - `.button-group.home-hero-btn` → "Get a demo" (`/request-a-demo`) and
 *     "ANALYST REPORTS" (`/analyst-recognition`) CTAs
 *   - `.home-hero-meet-box` → the Artemis announcement card (links to
 *     `/ai-agent-platform`, round Union-Arrow icon)
 *   - `.grid.for-home-hero` → three `.products-card` Rive blocks in DOM order
 *   - `.home-hero-video` → background `<video>` (mp4 + webm sources, poster)
 *
 * Asset URLs flow through `assets.ts` (`assets.hero`, Requirement 24). The three
 * `.riv` entries each carry a CDN `url` (→ `riveSrc`) and a `fallback` local
 * asset (→ `posterFallback`), per the task brief and Requirement 6.9 / 26.5.
 *
 * `RiveCardData` and `ArtemisAnnouncementCard` mirror design.md and are defined
 * + exported here; `KoreHero` (task 7.2) imports them from this module.
 *
 * ── DESIGN ↔ SOURCE NOTES (flagged, not silently invented) ──────────────────
 *
 *  1. `backgroundVideo` is typed `VideoAssetRef` (assets.ts), which models a
 *     SINGLE `src`. The source `<video>` declares TWO `<source>`s (mp4 + webm).
 *     `heroData.backgroundVideo.src` references the mp4 (primary); the webm
 *     alternative is exported separately as `heroBackgroundVideoWebm` so
 *     `KoreHero` can emit it as a second `<source>` without mutating the
 *     `VideoAssetRef` contract. (Same pattern as `pre-footer-cta.ts`.)
 *
 *  2. `ArtemisAnnouncementCard` (design.md) has `badge`/`heading`/`body`/`cta`/
 *     `image`. The source card also has an eyebrow span ("The Softree Agent
 *     Platform"); it is preserved as the documented extra field `eyebrow`.
 *     The whole `.home-hero-meet-box` is a single anchor to
 *     `/ai-agent-platform`; that link is modelled as `cta`.
 *
 *  3. `posterFallback` is typed `AssetRef` and design.md describes it as a local
 *     poster image. The actual `assets.hero[...].fallback` staged for each `.riv`
 *     is a local `.riv` file under `/softree-marketing/rive/` (task 1.8). Per the explicit
 *     task brief ("`fallback` (posterFallback local)") that local fallback is
 *     used here verbatim.
 */

import {
    assets,
    type AssetRef,
    type CdnPassthroughAsset,
    type ImageAssetRef,
    type LocalAsset,
    type VideoAssetRef,
} from '../assets';
import type { ButtonData, PortableHeading } from './_shared';

// --- Interfaces (mirror design.md) -------------------------------------------

/** The Hero "Meet { Artemis }" announcement card. Mirrors design.md. */
export interface ArtemisAnnouncementCard {
    /** `.announcment-span` eyebrow above the title (source extra; see note 2). */
    readonly eyebrow: string;
    /** `.k2-badge .badge-text` — "NEW". */
    readonly badge: string;
    /** `.artemis-panel-title` — "Meet { Artemis }". */
    readonly heading: string;
    /** `.artemis-panel-description` body copy. */
    readonly body: string;
    /** The card-wide link (`.home-hero-meet-box` → `/ai-agent-platform`). */
    readonly cta: ButtonData;
    /** `.round-arrow-btn` icon (Union Arrow Icon SVG). */
    readonly image: ImageAssetRef;
}

/**
 * One Hero product card backed by a Rive animation with a local fallback.
 * Mirrors design.md `RiveCardData`.
 */
export interface RiveCardData {
    readonly id:
    | 'pre-built-applications'
    | 'application-accelerators'
    | 'tailored-applications';
    /** `.riv` CDN passthrough URL (`data-rive-src`). */
    readonly riveSrc: AssetRef;
    /** Local fallback staged under `/softree-marketing/rive/` (Req 6.9, 26.5). */
    readonly posterFallback: AssetRef;
    /** `.heading-style-h6` card title. */
    readonly title: string;
    /** `.text-color-black.text-weight-normal` card body. */
    readonly body: string;
    /** The card-wide anchor (`.products-card` → in-page `#…` target). */
    readonly cta: ButtonData;
}

/** Props for `KoreHero` (design.md). */
export interface KoreHeroProps {
    readonly headline: PortableHeading;
    readonly subhead: string;
    readonly demoCta: ButtonData;
    readonly analystReportsCta: ButtonData;
    readonly artemisAnnouncement: ArtemisAnnouncementCard;
    readonly backgroundVideo: VideoAssetRef;
    /** Exactly three Rive cards in source DOM order (Req 6.4). */
    readonly riveCards: readonly [RiveCardData, RiveCardData, RiveCardData];
}

// --- Helpers -----------------------------------------------------------------

/** Narrow a `.riv` CDN asset's optional `fallback` to a guaranteed `LocalAsset`. */
function riveFallback(asset: CdnPassthroughAsset): LocalAsset {
    if (!asset.fallback) {
        throw new Error(`Rive asset is missing a local fallback: ${asset.url}`);
    }
    return asset.fallback;
}

// --- Background video (Source_Document `.home-hero-video`) --------------------

const heroVideoMp4 =
    assets.hero[
    '6717a0dfaf71071a80dfce8b-68e6057dd670c86ab26c8544-softree-hero-banner-ripple-bg-transcode-mp4'
    ];

/** webm alternative `<source>` (see file-header note 1). */
export const heroBackgroundVideoWebm: AssetRef =
    assets.hero[
    '6717a0dfaf71071a80dfce8b-68e6057dd670c86ab26c8544-softree-hero-banner-ripple-bg-transcode-webm'
    ];

const heroVideoPoster =
    assets.hero[
    '6717a0dfaf71071a80dfce8b-68e6057dd670c86ab26c8544-softree-hero-banner-ripple-bg-poster-00001-jpg'
    ];

// --- Rive card source assets -------------------------------------------------

const preBuiltRive =
    assets.hero['69942ca43878add673c056c0-pre-built-applications-riv'];
const acceleratorRive =
    assets.hero['69933a25e901a06cbc06c28b-accelerator-application-riv'];
const tailoredRive =
    assets.hero['69942ca45c9fb7ab98c06f1e-tailored-applications-riv'];

// --- heroData ----------------------------------------------------------------

export const heroData: KoreHeroProps = {
    // <h1 class="home-main-heading">Great experiences are built on a strong
    // foundation.</h1> — no inline <span> highlights.
    headline: {
        text: 'Great experiences are built on a strong foundation.',
    },
    // <p class="heading-style-h5">AI agents ready for customers and employees.
    // <br>The only agent platform you can trust.</p> — the <br> is preserved as
    // a newline.
    subhead:
        'AI agents ready for customers and employees.\nThe only agent platform you can trust.',
    // <a href="/request-a-demo" is-ghost="" is-light-theme="" is-text-link="">
    //   <div class="text-style-1line">Get a demo</div>
    demoCta: {
        label: 'Get a demo',
        href: '/request-a-demo',
        variant: 'ghost', // is-ghost="" (empty)
    },
    // <a href="/analyst-recognition" is-ghost="1" …>
    //   <div class="text-style-1line">ANALYST REPORTS</div>
    analystReportsCta: {
        label: 'ANALYST REPORTS',
        href: '/analyst-recognition',
        variant: 'secondary', // is-ghost="1"
    },
    artemisAnnouncement: {
        eyebrow: 'The Softree Agent Platform',
        badge: 'NEW',
        heading: 'Meet { Artemis }',
        body: 'The AI-programmable platform for the agentic enterprise. The foundation for building AI agents for customer and employee experiences with certainty.',
        cta: {
            label: 'Meet { Artemis }',
            href: '/ai-agent-platform',
            variant: 'ghost',
        },
        image: {
            ...assets.hero['6a05f1194d8f8de6627db138-union-arrow-icon-svg'],
            alt: '',
            loading: 'lazy',
        },
    },
    backgroundVideo: {
        src: heroVideoMp4,
        poster: heroVideoPoster,
        autoplay: true, // <video autoplay="">
        loop: false, // data-loop="false"; no `loop` attribute on <video>
        muted: true, // <video muted="">
        playsInline: true, // <video playsinline="">
    },
    riveCards: [
        {
            id: 'pre-built-applications',
            riveSrc: preBuiltRive,
            posterFallback: riveFallback(preBuiltRive),
            title: 'Pre-built Applications',
            body: 'Use applications for Banking, Healthcare, Retail, HR, IT, and Recruiting today.',
            cta: {
                label: 'Pre-built Applications',
                href: '#Pre-built-Applications',
                variant: 'ghost',
            },
        },
        {
            id: 'application-accelerators',
            riveSrc: acceleratorRive,
            posterFallback: riveFallback(acceleratorRive),
            title: 'Application Accelerators',
            body: 'Leverage our Marketplace of pre-built AI agents, templates, and integrations.',
            cta: {
                label: 'Application Accelerators',
                href: '#Application-Accelerators',
                variant: 'ghost',
            },
        },
        {
            id: 'tailored-applications',
            riveSrc: tailoredRive,
            posterFallback: riveFallback(tailoredRive),
            title: 'Tailored Applications',
            body: 'Design / build applications on our Agent Platform across all enterprise usecases.',
            cta: {
                label: 'Tailored Applications',
                href: '#Tailored-Applications',
                variant: 'ghost',
            },
        },
    ],
} as const;
