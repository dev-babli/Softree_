/** Monochrome brand marks — match mockup trust strip */
export function BrandLogos() {
  return (
    <ul className="flex items-center justify-between gap-2">
      <li>
        <svg viewBox="0 0 74 24" className="h-[18px] w-auto" aria-label="Google">
          <text x="0" y="18" fill="#111" fillOpacity="0.82" fontSize="17" fontWeight="700" fontFamily="Inter, Arial, sans-serif">
            Google
          </text>
        </svg>
      </li>
      <li>
        <svg viewBox="0 0 68 24" className="h-[16px] w-auto" aria-label="Stripe">
          <text x="0" y="17" fill="#111" fillOpacity="0.82" fontSize="16" fontWeight="700" fontFamily="Inter, Arial, sans-serif" letterSpacing="-0.02em">
            stripe
          </text>
        </svg>
      </li>
      <li>
        <svg viewBox="0 0 72 24" className="h-[17px] w-auto" aria-label="Notion">
          <text x="0" y="17" fill="#111" fillOpacity="0.82" fontSize="16" fontWeight="600" fontFamily="Inter, Arial, sans-serif">
            Notion
          </text>
        </svg>
      </li>
      <li>
        <svg viewBox="0 0 88 24" className="h-[16px] w-auto" aria-label="Webflow">
          <text x="0" y="17" fill="#111" fillOpacity="0.82" fontSize="15" fontWeight="700" fontFamily="Inter, Arial, sans-serif">
            Webflow
          </text>
        </svg>
      </li>
      <li>
        <svg viewBox="0 0 78 24" className="h-[17px] w-auto" aria-label="Shopify">
          <text x="0" y="17" fill="#111" fillOpacity="0.82" fontSize="15" fontWeight="700" fontFamily="Inter, Arial, sans-serif">
            shopify
          </text>
        </svg>
      </li>
      <li>
        <svg viewBox="0 0 68 24" className="h-[16px] w-auto" aria-label="Vercel">
          <text x="0" y="17" fill="#111" fillOpacity="0.82" fontSize="16" fontWeight="700" fontFamily="Inter, Arial, sans-serif" letterSpacing="-0.03em">
            ▲ Vercel
          </text>
        </svg>
      </li>
    </ul>
  );
}
