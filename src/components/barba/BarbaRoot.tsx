"use client"

import { usePathname, useRouter } from "next/navigation"
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"

import { prefersReducedMotion } from "@/lib/motion"

import { cinematicEnter, cinematicLeave } from "./transitions"
import { isInternalLink, pathnameToNamespace } from "./utils"
import "./barba-curtain.css"

let barbaBooted = false

type BarbaRootProps = {
  children: ReactNode
}

export function BarbaRoot({ children }: BarbaRootProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [namespace, setNamespace] = useState(() => pathnameToNamespace(pathname))

  const isTransitioning = useRef(false)
  const pendingPath = useRef<string | null>(null)
  const pathnameRef = useRef(pathname)
  const pushedRef = useRef(false)

  pathnameRef.current = pathname

  const navigateWithTransition = useCallback(
    async (href: string) => {
      const path = new URL(href, window.location.origin).pathname
      if (path === pathnameRef.current || isTransitioning.current) return

      const html = document.documentElement
      if (html.classList.contains("loading") || !html.classList.contains("ready")) return

      isTransitioning.current = true
      pendingPath.current = path
      pushedRef.current = false

      router.prefetch(href)

      try {
        await cinematicLeave({
          onCovered: () => {
            if (pushedRef.current) return
            pushedRef.current = true
            router.push(href)
          },
        })
        if (!pushedRef.current) {
          pushedRef.current = true
          router.push(href)
        }
      } catch {
        isTransitioning.current = false
        pendingPath.current = null
        document.documentElement.classList.remove("barba-is-transitioning")
      }
    },
    [router],
  )

  useEffect(() => {
    setNamespace(pathnameToNamespace(pathname))
  }, [pathname])

  useEffect(() => {
    if (!pendingPath.current || pathname !== pendingPath.current) return

    pendingPath.current = null
    window.scrollTo(0, 0)

    if (prefersReducedMotion()) {
      isTransitioning.current = false
      document.documentElement.classList.remove("barba-is-transitioning")
      window.dispatchEvent(new CustomEvent("barba:enter-complete"))
      return
    }

    void cinematicEnter().finally(() => {
      isTransitioning.current = false
    })
  }, [pathname])

  useEffect(() => {
    if (barbaBooted) return
    barbaBooted = true

    void (async () => {
      const [{ default: barba }, { default: barbaPrefetch }] = await Promise.all([
        import("@barba/core"),
        import("@barba/prefetch"),
      ])

      barba.use(barbaPrefetch)

      barba.init({
        debug: false,
        prevent: ({ el }: { el: HTMLAnchorElement }) => {
          if (el.getAttribute("data-barba-prevent") === "self") return true
          if (el.getAttribute("target") === "_blank") return true
          if (el.hasAttribute("download")) return true
          const href = el.getAttribute("href")
          if (!href) return true
          return !isInternalLink(href)
        },
      })
    })()
  }, [])

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }

      const anchor = (event.target as Element | null)?.closest("a")
      if (!anchor) return
      if (anchor.getAttribute("data-barba-prevent") === "self") return
      if (anchor.getAttribute("target") === "_blank") return

      const href = anchor.getAttribute("href")
      if (!href || !isInternalLink(href)) return

      const path = new URL(href, window.location.origin).pathname
      if (path === pathnameRef.current) {
        event.preventDefault()
        return
      }

      event.preventDefault()
      void navigateWithTransition(href)
    }

    document.addEventListener("click", onClick, { capture: true })
    return () => document.removeEventListener("click", onClick, { capture: true })
  }, [navigateWithTransition])

  return (
    <div data-barba="wrapper" className="relative min-h-full">
      <div className="barba-transition-stage" aria-hidden>
        <div className="barba-transition-curtain" />
      </div>
      <div data-barba="container" data-barba-namespace={namespace}>
        {children}
      </div>
    </div>
  )
}
