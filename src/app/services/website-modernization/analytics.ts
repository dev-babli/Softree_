/** GTM dataLayer events for website-modernization funnel. */

export type ModernizationEvent =
  | "hero_submit"
  | "pipeline_stage_view"
  | "blueprint_tab_view"
  | "book_call_click"
  | "analyser_scroll"
  | "scroll_depth"
  | "analyser_load"

export function trackModernizationEvent(
  event: ModernizationEvent,
  detail?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined") return
  const dataLayer = (window as Window & { dataLayer?: Array<Record<string, unknown>> }).dataLayer
  dataLayer?.push({
    event: `modernization_${event}`,
    page: "/services/website-modernization",
    ...detail,
  })
}
