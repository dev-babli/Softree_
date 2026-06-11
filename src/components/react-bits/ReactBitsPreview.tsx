"use client"

import { Component, type ComponentType, type ReactNode, Suspense, useEffect, useMemo, useState } from "react"

import { REACT_BITS_BY_ID } from "./catalog"
import { reactBitsRegistry } from "./registry"

type PreviewProps = {
  componentId: string
  className?: string
}

type PreviewState =
  | { status: "loading" }
  | { status: "ready"; Component: ComponentType<Record<string, unknown>>; props: Record<string, unknown> }
  | { status: "error"; message: string }

function categoryFallbackProps(category: string, name: string): Record<string, unknown> {
  switch (category) {
    case "TextAnimations":
      return { text: "Softree Studio preview", className: "text-3xl font-semibold text-neutral-900" }
    case "Backgrounds":
      return {}
    case "Animations":
      return { children: "Hover or scroll to preview" }
    case "Components":
      return { text: name, title: name, label: name }
    default:
      return {}
  }
}

function mergeProps(entry: (typeof REACT_BITS_BY_ID)[string]): Record<string, unknown> {
  const [category] = entry.id.split("/")
  return {
    ...categoryFallbackProps(category, entry.name),
    ...(entry.defaultProps ?? {}),
  }
}

class PreviewErrorBoundary extends Component<
  { children: ReactNode; onError: (message: string) => void },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    this.props.onError(error.message)
  }

  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}

export function ReactBitsPreview({ componentId, className }: PreviewProps) {
  const entry = REACT_BITS_BY_ID[componentId]
  const [state, setState] = useState<PreviewState>({ status: "loading" })

  const props = useMemo(() => (entry ? mergeProps(entry) : {}), [entry])

  useEffect(() => {
    if (!entry) {
      setState({ status: "error", message: `Unknown component: ${componentId}` })
      return
    }

    const load = reactBitsRegistry[entry.id]
    if (!load) {
      setState({ status: "error", message: `Registry missing: ${entry.id}` })
      return
    }

    setState({ status: "loading" })
    load()
      .then((mod) => setState({ status: "ready", Component: mod.default, props }))
      .catch((err: Error) => setState({ status: "error", message: err.message }))
  }, [componentId, entry, props])

  if (!entry) {
    return <PreviewMessage className={className}>Component not found.</PreviewMessage>
  }

  if (state.status === "loading") {
    return <PreviewMessage className={className}>Loading preview…</PreviewMessage>
  }

  if (state.status === "error") {
    return (
      <PreviewMessage className={className}>
        Preview unavailable: {state.message}
      </PreviewMessage>
    )
  }

  const { Component: BitsComponent } = state
  const isBackground = entry.category === "Backgrounds"

  return (
    <div className={className ?? "relative min-h-[420px] w-full overflow-hidden rounded-xl bg-neutral-950"}>
      {isBackground ? (
        <div className="relative h-[min(70vh,640px)] w-full">
          <BitsComponent {...state.props} />
          <div className="pointer-events-none absolute inset-0 flex items-end justify-center p-8">
            <p className="rounded-full bg-black/50 px-4 py-2 text-sm text-white/90 backdrop-blur">
              {entry.name} background
            </p>
          </div>
        </div>
      ) : (
        <div className="flex min-h-[420px] w-full items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 p-8 dark:from-neutral-900 dark:to-neutral-950">
          <PreviewErrorBoundary onError={(message) => setState({ status: "error", message })}>
            <Suspense fallback={<PreviewMessage>Loading…</PreviewMessage>}>
              <BitsComponent {...state.props} />
            </Suspense>
          </PreviewErrorBoundary>
        </div>
      )}
    </div>
  )
}

function PreviewMessage({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={
        className ??
        "flex min-h-[420px] items-center justify-center rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-6 text-sm text-neutral-600"
      }
    >
      {children}
    </div>
  )
}
