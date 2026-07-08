/** Alternating section surfaces for page-composer rhythm */
export const CASE_STUDY_DETAIL_SURFACES = [
  "bg-white",
  "bg-[#f8f4ec]",
  "bg-[#fafaf9]",
] as const

export function caseStudySectionSurface(index: number): string {
  return CASE_STUDY_DETAIL_SURFACES[index % CASE_STUDY_DETAIL_SURFACES.length]
}
