/**
 * Webflow passthrough attributes. React forwards unknown string attributes to
 * the DOM at runtime (needed for Webflow CSS selectors like [is-white] and
 * IX2 hooks like data-anim / transition-delay), but TypeScript rejects
 * non-`data-*` attributes on intrinsic elements. Casting to an empty-shape
 * object lets the spread type-check while the real attributes are preserved at
 * runtime and forwarded to the DOM by React.
 */
export const wf = (attrs: Record<string, string | number | boolean | undefined>) =>
  attrs as unknown as Record<never, never>
