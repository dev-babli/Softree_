"use client"



import { useEffect } from "react"



const STAGGER_STEP_MS = 80

const MAGNETIC_STRENGTH_X = 7

const MAGNETIC_STRENGTH_Y = 5



/**

 * Scoped scroll-reveal for the `.ai-premium` page only.

 * Uses a plain IntersectionObserver + CSS classes — no GSAP, no ScrollTrigger,

 * no global `<html>` class — so it cannot interfere with the sticky footer

 * or any other component on the page.

 */

export function AiMotionBoot() {

  useEffect(() => {

    const root = document.querySelector<HTMLElement>(".ai-premium")

    if (!root) return



    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const targets = root.querySelectorAll<HTMLElement>(

      "[data-anim], [data-anim-scale], [data-stagger]",

    )



    const magneticCleanups: Array<() => void> = []



    if (!reduced) {

      root.querySelectorAll<HTMLElement>(".ai-btn").forEach((btn) => {

        const onMove = (event: MouseEvent) => {

          const rect = btn.getBoundingClientRect()

          const x = ((event.clientX - rect.left) / rect.width - 0.5) * MAGNETIC_STRENGTH_X

          const y = ((event.clientY - rect.top) / rect.height - 0.5) * MAGNETIC_STRENGTH_Y

          btn.style.setProperty("--mag-x", `${x}px`)

          btn.style.setProperty("--mag-y", `${y}px`)

        }



        const onLeave = () => {

          btn.style.setProperty("--mag-x", "0px")

          btn.style.setProperty("--mag-y", "0px")

        }



        btn.addEventListener("mousemove", onMove)

        btn.addEventListener("mouseleave", onLeave)

        magneticCleanups.push(() => {

          btn.removeEventListener("mousemove", onMove)

          btn.removeEventListener("mouseleave", onLeave)

        })

      })

    }



    if (reduced) {

      targets.forEach((el) => el.classList.add("is-in"))

      return () => {

        magneticCleanups.forEach((cleanup) => cleanup())

      }

    }



    // Arms the hidden initial state only once JS is running (no-JS stays visible).

    root.classList.add("motion-armed")



    const observer = new IntersectionObserver(

      (entries) => {

        for (const entry of entries) {

          if (!entry.isIntersecting) continue

          const el = entry.target as HTMLElement

          if (el.hasAttribute("data-stagger")) {

            Array.from(el.children).forEach((child, i) => {

              ;(child as HTMLElement).style.transitionDelay = `${i * STAGGER_STEP_MS}ms`

            })

          }

          el.classList.add("is-in")

          observer.unobserve(el)

        }

      },

      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },

    )



    targets.forEach((el) => observer.observe(el))



    return () => {

      observer.disconnect()

      magneticCleanups.forEach((cleanup) => cleanup())

      root.classList.remove("motion-armed")

    }

  }, [])



  return null

}


