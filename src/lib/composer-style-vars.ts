import { csCssVars } from '@/components/case-studies/layouts/variants/manufacturing/tokens'

import { resolveDesignTokenCssVars, type DesignTokenSettings } from '@/lib/design-tokens'

/** Case study / blog composer shells — base layout vars + resolved brand tokens. */
export function mergeComposerStyleVars(
  settings?: DesignTokenSettings | null,
): Record<string, string> {
  return { ...csCssVars, ...resolveDesignTokenCssVars(settings) }
}
