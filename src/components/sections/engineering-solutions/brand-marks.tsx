"use client";

/* ============================================================================
 * Brand wordmarks — v2 (refined silhouettes).
 *
 * Each mark is a recognisable, simplified inline-SVG icon paired with the
 * wordmark in Inter. Marks render at ~22px height to match a typical
 * marketing trust strip. All glyphs use a single grayscale token so the row
 * reads as a unified "trusted by" group instead of a multi-coloured collage.
 * ========================================================================= */

import * as React from "react";

const TONE = "#3F3E4F";

function Wordmark({
    children,
    className = "",
    weight = 600,
    italic = false,
    size = 15,
    spacing = "tracking-tight",
}: {
    children: React.ReactNode;
    className?: string;
    weight?: 400 | 500 | 600 | 700 | 800;
    italic?: boolean;
    size?: number;
    spacing?: string;
}) {
    return (
        <span
            className={`font-sans ${spacing} ${className}`}
            style={{
                color: TONE,
                fontSize: size,
                fontWeight: weight,
                fontStyle: italic ? "italic" : "normal",
                lineHeight: 1,
                letterSpacing: "-0.01em",
            }}
        >
            {children}
        </span>
    );
}

/* ── Airbnb — Bélo silhouette ── */
export function AirbnbMark({ className = "" }: { className?: string }) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <svg viewBox="0 0 32 32" className="h-[22px] w-[22px]" aria-hidden="true">
                <path
                    fill={TONE}
                    d="M16 2.2c-2.4 0-4.4 1.4-5.6 3.4L3.5 18.2c-1.5 2.6-1.4 5.7.6 7.6 1.7 1.6 4 1.6 6 .4 1.7-1 3.6-2.9 5.9-6 2.3 3.1 4.2 5 5.9 6 2 1.2 4.3 1.2 6-.4 2-1.9 2.1-5 .6-7.6L21.6 5.6C20.4 3.6 18.4 2.2 16 2.2zm0 3.4c1 0 1.9.5 2.5 1.5l6.7 12.4c1 1.7.9 3.4-.2 4.4-1 .9-2.6.7-4.1-.2-1.6-.9-3.4-2.8-4.9-5.1.7-1 1.3-2 1.8-2.9.6-1.1.9-2.1.6-3-.3-.9-1.2-1.4-2.4-1.4s-2.1.5-2.4 1.4c-.3.9 0 1.9.6 3 .5.9 1.1 1.9 1.8 2.9-1.5 2.3-3.3 4.2-4.9 5.1-1.5.9-3.1 1.1-4.1.2-1.1-1-1.2-2.7-.2-4.4L13.5 7.1C14.1 6.1 15 5.6 16 5.6z"
                />
            </svg>
            <Wordmark weight={500} size={16}>
                airbnb
            </Wordmark>
        </div>
    );
}

/* ── Microsoft — 4-square logo ── */
export function MicrosoftMark({ className = "" }: { className?: string }) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <svg viewBox="0 0 22 22" className="h-[18px] w-[18px]" aria-hidden="true">
                <rect x="1" y="1" width="9" height="9" fill={TONE} />
                <rect x="12" y="1" width="9" height="9" fill={TONE} />
                <rect x="1" y="12" width="9" height="9" fill={TONE} />
                <rect x="12" y="12" width="9" height="9" fill={TONE} />
            </svg>
            <Wordmark weight={500} size={16}>
                Microsoft
            </Wordmark>
        </div>
    );
}

/* ── Verizon — wordmark with red checkmark ── */
export function VerizonMark({ className = "" }: { className?: string }) {
    return (
        <div className={`flex items-baseline ${className}`}>
            <Wordmark weight={700} size={18} spacing="tracking-tighter">
                verizon
            </Wordmark>
            <svg viewBox="0 0 14 14" className="ml-[2px] h-3.5 w-3.5" aria-hidden="true">
                <path d="M2 4 L 12 2 L 5 12 z" fill="#E60000" />
            </svg>
        </div>
    );
}

/* ── PayPal — overlapping P silhouettes + wordmark ── */
export function PaypalMark({ className = "" }: { className?: string }) {
    return (
        <div className={`flex items-center gap-1.5 ${className}`}>
            <svg viewBox="0 0 26 26" className="h-[22px] w-[22px]" aria-hidden="true">
                {/* Back P */}
                <path
                    fill={TONE}
                    opacity="0.55"
                    d="M9 4 h7 c4 0 6 2.5 5.4 6.4 c-0.7 4.4 -3.7 6.6 -8.1 6.6 h-3 l-0.9 6 H 6 z"
                />
                {/* Front P */}
                <path
                    fill={TONE}
                    d="M6 1 h7 c4 0 6 2.5 5.4 6.4 c-0.7 4.4 -3.7 6.6 -8.1 6.6 h-3 l-0.9 6 H 3 z"
                />
            </svg>
            <Wordmark weight={700} italic size={16} spacing="tracking-tighter">
                PayPal
            </Wordmark>
        </div>
    );
}

/* ── Shopify — bag silhouette + wordmark ── */
export function ShopifyMark({ className = "" }: { className?: string }) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" aria-hidden="true">
                <path
                    fill={TONE}
                    d="M19.5 6.4c0-.2-.1-.3-.3-.3-.1 0-2-.1-2-.1S15.7 4.5 15.5 4.3c-.2-.2-.6-.1-.7-.1l-.6.2c-.4-1-1-2-2.3-2-1 0-1.8.7-2.4 1.5-.7.3-1.2.4-1.2.4-.5.1-.5.2-.6.7-.1.4-1.4 10.5-1.4 10.5L13 17l4.4-1c.1 0 2.1-9.5 2.1-9.6zm-5.6-1.7l-1 .3v-.2c0-.7-.1-1.2-.3-1.6.5.1.8 1 1.3 1.5zm-1.7.5l-2 .6c.2-.7.6-1.5 1.1-2 .2-.2.5-.3.8-.4.1.4.2.9.2 1.5l-.1.3zm-1.5-2.1c.2 0 .4 0 .5.1-.4.2-.8.6-1 1.1-.4.5-.6 1.2-.8 1.9l-1.6.5c.5-1.7 1.7-3.6 2.9-3.6z"
                />
            </svg>
            <Wordmark weight={500} size={16}>
                shopify
            </Wordmark>
        </div>
    );
}

/* ── Slack — pinwheel ── */
export function SlackMark({ className = "" }: { className?: string }) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]" aria-hidden="true">
                <g fill={TONE}>
                    {/* Top horizontal pair */}
                    <rect x="3" y="9" width="6" height="2.6" rx="1.3" />
                    <rect x="3" y="12.4" width="6" height="2.6" rx="1.3" />
                    {/* Vertical pair */}
                    <rect x="9" y="3" width="2.6" height="6" rx="1.3" />
                    <rect x="12.4" y="3" width="2.6" height="6" rx="1.3" />
                    {/* Right pair */}
                    <rect x="15" y="9" width="6" height="2.6" rx="1.3" />
                    <rect x="15" y="12.4" width="6" height="2.6" rx="1.3" />
                    {/* Bottom vertical pair */}
                    <rect x="9" y="15" width="2.6" height="6" rx="1.3" />
                    <rect x="12.4" y="15" width="2.6" height="6" rx="1.3" />
                </g>
            </svg>
            <Wordmark weight={700} italic size={16} spacing="tracking-tighter">
                slack
            </Wordmark>
        </div>
    );
}

/* ── Dropbox — open box silhouette ── */
export function DropboxMark({ className = "" }: { className?: string }) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]" aria-hidden="true">
                <g fill={TONE}>
                    <path d="M6 2 L 1 6 l 5 4 l 5 -4 z" />
                    <path d="M18 2 L 13 6 l 5 4 l 5 -4 z" />
                    <path d="M6 14 L 1 18 l 5 4 l 5 -4 z" />
                    <path d="M18 14 L 13 18 l 5 4 l 5 -4 z" />
                    <path d="M6 11 L 12 7 l 6 4 l -6 4 z" opacity="0.85" />
                </g>
            </svg>
            <Wordmark weight={500} size={16}>
                Dropbox
            </Wordmark>
        </div>
    );
}
