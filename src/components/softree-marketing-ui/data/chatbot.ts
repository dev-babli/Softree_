/**
 * Floating Chatbot fixture (Requirement 18.1; task 19.1).
 *
 * Source: `public/softree-source-sections.html`.
 *
 * ── SOURCING NOTE (flagged) ─────────────────────────────────────────────────
 * The Source_Document contains the `.chatbot-element` CSS rules (the collapsed
 * `:not(.ready)` width `3.5rem`, the `.chatbot-line-spacer` 0.5s /
 * `.chatbot-input` 0.8s / `.chatbot-arrow-btn` 0.3s transition-delays, and the
 * `.chatbot-element.ready .chatbot-icon { max-width: 1.25rem }` rule) and the
 * loader script that toggles `.chatbot-element.ready`, but the saved capture
 * does NOT include the chatbot's rendered DOM (no `.chatbot-input` element, no
 * `placeholder` attribute, no arrow-button label text). The Webflow runtime
 * injects that markup client-side, which is excluded from the static capture.
 *
 * Consequently the input `placeholder` and the arrow-button accessible name are
 * not directly recoverable from Source_Document. The values below use the
 * design.md defaults (`SoftreeChatbotProps` example: `arrowAriaLabel: 'Send
 * message'`) and a neutral placeholder. → Confirm the exact source strings
 * (e.g. capture the live `.chatbot-input` placeholder) before visual sign-off.
 */

/** Props for `SoftreeChatbot` (design.md `SoftreeChatbotProps`). */
export interface SoftreeChatbotProps {
    /** `.chatbot-input` placeholder text. */
    readonly placeholder: string;
    /** Accessible name for the `.chatbot-arrow-btn` send control. */
    readonly arrowAriaLabel: string;
}

export const chatbotData: SoftreeChatbotProps = {
    placeholder: 'Ask Softree',
    arrowAriaLabel: 'Send message',
} as const;
