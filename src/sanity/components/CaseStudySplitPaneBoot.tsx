"use client"

import type { StringInputProps } from "sanity"

import { useCaseStudySplitPane } from "@/sanity/hooks/useCaseStudySplitPane"

/** Hidden field input — opens Edit + Live preview side-by-side on document load. */
export default function CaseStudySplitPaneBoot(_props: StringInputProps) {
  useCaseStudySplitPane()
  return null
}
