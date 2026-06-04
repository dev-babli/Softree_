/**
 * Exit_Modal fixture (Requirement 13.6; task 15.1).
 *
 * Source: `public/kore-source-sections.html` `.exitpage-modal` block —
 * heading `<h5>`, the `.exitpage-content-text` body paragraph, and the two
 * `.exitpage-buttons` anchors (`#continueBtn` "CONTINUE", `#backBtn` "GO BACK").
 *
 * The exit-intent open/close behavior is implemented by `KoreExitModal`
 * (task 15.3); this fixture supplies copy only and matches the documented
 * `KoreExitModalProps` shape (design.md).
 */

import type { ButtonData } from './_shared';

/** Props for `KoreExitModal` (design.md). */
export interface KoreExitModalProps {
    readonly heading: string;
    readonly body: string;
    readonly primary: ButtonData;
    readonly secondary: ButtonData;
}

// Body text mirrors the `.exitpage-content-text` paragraph verbatim, including
// the line breaks the source renders via <br><br> (joined here as spaces — the
// source paragraph is a single rich-text node).
const EXIT_BODY =
    'Kore.ai does not endorse, has not verified, and is not responsible for, ' +
    'any content, views, products, services, or policies of any third-party ' +
    'websites, or for any verification or updates of such websites. ' +
    'Third-party websites may also include "forward-looking statements" which ' +
    'are inherently subject to risks and uncertainties, some of which cannot ' +
    'be predicted or quantified. Actual results could differ materially from ' +
    'those indicated in such forward-looking statements. Click ‘Continue’ to ' +
    'acknowledge the above and leave Kore.ai’s website. If you don’t want to ' +
    'leave Kore.ai’s website, simply click ‘Back’.';

export const exitModalData: KoreExitModalProps = {
    heading: 'You are now leaving Kore.ai’s website.',
    body: EXIT_BODY,
    // <a id="continueBtn" href="#" class="button w-button">CONTINUE</a>
    primary: {
        label: 'CONTINUE',
        href: '#',
        variant: 'primary',
    },
    // <a id="backBtn" href="#" class="button is-outline w-button">GO BACK</a>
    secondary: {
        label: 'GO BACK',
        href: '#',
        variant: 'secondary', // .is-outline
    },
} as const;
