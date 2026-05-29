"use client"

/* ─────────────────────────────────────────────────────────────────────
 *  LetsTalkButton
 *  ──────────────
 *  Shared "LET'S TALK" pill button extracted from AvooraHero so the
 *  homepage hero (SoftreeHero) and the about hero (AvooraHero) can both
 *  consume the same button without duplicating DOM, hover roll-up text
 *  animation, or the orange arrow icon.
 *
 *  Visual contract:
 *    - Rounded-full black pill with the uppercase "LET'S TALK" label.
 *    - Two stacked label spans that translate up on hover (roll-up).
 *    - White circular slot housing an orange (#FF6B00) chevron arrow
 *      that slides off to the right on hover and is replaced by an
 *      identical arrow sliding in from the left.
 *    - `compact` prop tightens vertical padding for use inside dense
 *      header rows (matches the existing inlined variant).
 *    - `href` defaults to "/contact" (Requirement 4.1, 11.1).
 * ───────────────────────────────────────────────────────────────────── */

const ACCENT = "#FF6B00"

const ArrowIcon = () => (
    <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
        <path
            d="M9.61648 5.8006L0.360093 0.0358623C0.250469 -0.0329162 0.105835 0.000195883 0.0370565 0.109843C0.0155525 0.144118 0.00328985 0.183378 0.0014624 0.223799C-0.000365041 0.264221 0.00830504 0.304427 0.0266285 0.340503L2.85674 5.99955L0.0254568 11.6595C-0.0331514 11.7749 0.0128727 11.916 0.128261 11.9746C0.164336 11.9929 0.204543 12.0016 0.244965 11.9998C0.285387 11.998 0.324647 11.9857 0.358921 11.9642L9.61531 6.19944C9.7253 6.13127 9.75924 5.98683 9.69104 5.87681C9.67198 5.84605 9.64606 5.82013 9.61531 5.80107L9.61648 5.8006Z"
            fill={ACCENT}
        />
    </svg>
)

export interface LetsTalkButtonProps {
    /** Destination URL for the CTA. Defaults to "/contact". */
    href?: string
    /** Tighter vertical padding for dense header rows. */
    compact?: boolean
    /** Optional extra class names appended to the root anchor. */
    className?: string
}

export default function LetsTalkButton({
    href = "/contact",
    compact = false,
    className,
}: LetsTalkButtonProps) {
    return (
        <a
            href={href}
            className={
                "group/btn relative inline-flex items-center gap-4 overflow-hidden rounded-full bg-[#0a0a0a] pl-5 pr-1.5 py-1.5 text-white" +
                (className ? ` ${className}` : "")
            }
            style={{ paddingTop: compact ? 4 : 6, paddingBottom: compact ? 4 : 6 }}
        >
            <span className="relative block h-[14px] overflow-hidden">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover/btn:-translate-y-full">
                    LET&rsquo;S TALK
                </span>
                <span className="absolute inset-x-0 top-full block text-[11px] font-semibold uppercase tracking-[0.18em] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover/btn:-translate-y-full">
                    LET&rsquo;S TALK
                </span>
            </span>
            <span className="relative grid h-[26px] w-[26px] place-items-center overflow-hidden rounded-full bg-white">
                <span className="absolute inset-0 grid place-items-center transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover/btn:translate-x-[250%]">
                    <ArrowIcon />
                </span>
                <span className="absolute inset-0 grid -translate-x-[250%] place-items-center transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover/btn:translate-x-0">
                    <ArrowIcon />
                </span>
            </span>
        </a>
    )
}
