"use client"

import type { ReactNode } from "react"

import { BarbaRoot } from "@/components/barba/BarbaRoot"

import { SoftreeLoader } from "./SoftreeLoader"

/**
 * Motion shell: first-visit loader + in-app Barba nav transitions.
 * Loader and curtain are intentionally separate systems.
 */
export function SoftreeMotionShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SoftreeLoader />
      <BarbaRoot>{children}</BarbaRoot>
    </>
  )
}
