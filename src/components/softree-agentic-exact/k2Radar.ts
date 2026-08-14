const RADAR_SVG_URL =
  "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a1d2a4d25a0a23d15414f4a_integrations-radar-new.svg"

type GsapLike = typeof import("gsap").gsap

type LogoState = {
  el: SVGGElement
  angle: number
  setOpacity: (value: number) => void
  activated?: boolean
  prevOpacity?: number
}

type QuadrantState = {
  startDeg: number
  endDeg: number
  g: HTMLElement | null
  path: SVGPathElement | null
  active: boolean
}

type CardGroup = SVGGElement & { _cx?: number; _cy?: number }

function getGsap(): GsapLike | null {
  const gsap = (window as Window & { gsap?: GsapLike }).gsap
  return gsap ?? null
}

export function bindK2Radar(scope: ParentNode = document): () => void {
  const wrap = scope.querySelector<HTMLElement>("#radar-wrap")
  if (!wrap) return () => {}

  let radarLoaded = false
  let startRadarGlobal: (() => void) | null = null

  const loadRadar = () => {
    if (radarLoaded || !wrap) return
    radarLoaded = true

    void fetch(RADAR_SVG_URL)
      .then((response) => response.text())
      .then((svgText) => {
        wrap.innerHTML = svgText
        window.setTimeout(() => initRadar(), 50)
      })
      .catch((error) => {
        console.error("Radar SVG failed:", error)
      })
  }

  const checkRadarTab = () => {
    const panel = scope.querySelector<HTMLElement>(".radar-panel.on")
    if (!panel) return
    if (!radarLoaded) loadRadar()
    else startRadarGlobal?.()
  }

  const observer = new MutationObserver(checkRadarTab)
  observer.observe(scope instanceof Document ? scope.body : scope, {
    subtree: true,
    attributes: true,
    attributeFilter: ["class"],
  })
  checkRadarTab()

  function initRadar(attempt = 0) {
    if (!wrap) return
    const gsap = getGsap()
    if (!gsap) {
      if (attempt < 30) window.setTimeout(() => initRadar(attempt + 1), 200)
      return
    }

    const RADAR_DURATION = 10
    const RADAR_OFFSET = 95
    const LOGO_RANGE = 1
    const LOGO_MIN_OPACITY = 0.05
    const LOGO_ACTIVE_OPACITY = 1
    const DOT_ACTIVE_COLOR = "#5CC83A"
    const DOT_INACTIVE_COLOR = "#3a3a3a"
    const DOT_ACTIVE_GLOW = "drop-shadow(0 0 6px rgba(92,200,58,0.85))"
    const DOT_FADE_IN = 0.3
    const DOT_FADE_OUT = 0.3
    const QUADRANTS = [
      { dotId: "dot-tl", startDeg: 270, endDeg: 360 },
      { dotId: "dot-tr", startDeg: 0, endDeg: 90 },
      { dotId: "dot-br", startDeg: 90, endDeg: 180 },
      { dotId: "dot-bl", startDeg: 180, endDeg: 270 },
    ]
    const SVG_NS = "http://www.w3.org/2000/svg"
    const svg = wrap.querySelector("svg")
    if (!svg) {
      console.error("SVG not found")
      return
    }

    const createSVG = <K extends keyof SVGElementTagNameMap>(tag: K) =>
      document.createElementNS(SVG_NS, tag)

    QUADRANTS.forEach((quadrant) => {
      const el = document.getElementById(quadrant.dotId)
      const path = el?.querySelector("path")
      path?.setAttribute("fill", DOT_INACTIVE_COLOR)
    })

    const cardGroups: CardGroup[] = []
    svg.querySelectorAll("foreignObject").forEach((foreign) => {
      let sibling = foreign.nextSibling
      while (sibling && sibling.nodeType !== 1) sibling = sibling.nextSibling
      if (sibling && (sibling as Element).tagName.toLowerCase() === "g") {
        const group = createSVG("g") as CardGroup
        foreign.parentNode?.insertBefore(group, foreign)
        group.appendChild(foreign)
        group.appendChild(sibling)
        group._cx =
          Number.parseFloat(foreign.getAttribute("x") || "0") +
          Number.parseFloat(foreign.getAttribute("width") || "0") / 2
        group._cy =
          Number.parseFloat(foreign.getAttribute("y") || "0") +
          Number.parseFloat(foreign.getAttribute("height") || "0") / 2
        cardGroups.push(group)
      }
    })

    const radar = createSVG("g")
    const defs = svg.querySelector("defs") || svg.insertBefore(createSVG("defs"), svg.firstChild)

    const makeStop = (offset: string, opacity: string) => {
      const stop = createSVG("stop")
      stop.setAttribute("offset", offset)
      stop.setAttribute("stop-color", "#5CC83A")
      stop.setAttribute("stop-opacity", opacity)
      return stop
    }

    if (!svg.querySelector("#userRadarFill")) {
      const fill = createSVG("linearGradient")
      fill.id = "userRadarFill"
      fill.setAttribute("x1", "149.829")
      fill.setAttribute("y1", "190.969")
      fill.setAttribute("x2", "264.829")
      fill.setAttribute("y2", "359.969")
      fill.setAttribute("gradientUnits", "userSpaceOnUse")
      fill.append(makeStop("0%", "0"), makeStop("100%", ".4"))
      defs.appendChild(fill)
    }

    if (!svg.querySelector("#userRadarStroke")) {
      const stroke = createSVG("linearGradient")
      stroke.id = "userRadarStroke"
      stroke.setAttribute("x1", "108.829")
      stroke.setAttribute("y1", "133.469")
      stroke.setAttribute("x2", "351.829")
      stroke.setAttribute("y2", "372.469")
      stroke.setAttribute("gradientUnits", "userSpaceOnUse")
      stroke.append(makeStop("0%", "0"), makeStop("100%", "1"))
      defs.appendChild(stroke)
    }

    const sector = createSVG("path")
    sector.setAttribute(
      "d",
      "M1.5 1.5C47.4626 1.5 92.9753 10.553 135.439 28.1422C177.903 45.7313 216.487 71.5121 248.987 104.013C281.488 136.513 307.269 175.097 324.858 217.561C342.447 260.025 351.5 305.537 351.5 351.5L75.9483 351.5C75.9483 341.723 74.0226 332.042 70.2812 323.01C66.5399 313.977 61.0561 305.77 54.1429 298.857C47.2297 291.944 39.0226 286.46 29.9901 282.719C20.9576 278.977 11.2767 277.052 1.5 277.052V1.5Z",
    )
    sector.setAttribute("fill", "url(#userRadarFill)")
    sector.setAttribute("stroke", "url(#userRadarStroke)")
    sector.setAttribute("stroke-width", "3")
    sector.setAttribute("transform", "translate(454 470) scale(1) translate(-1.5 -351.5)")
    radar.appendChild(sector)

    const greenCircle = createSVG("circle")
    greenCircle.setAttribute("cx", "454")
    greenCircle.setAttribute("cy", "470")
    greenCircle.setAttribute("r", "76")
    greenCircle.setAttribute("fill", "none")
    greenCircle.setAttribute("stroke", "#5CC83A")
    greenCircle.setAttribute("stroke-width", "3")
    greenCircle.style.filter = "drop-shadow(0 0 10px rgba(92,200,58,.8))"
    svg.append(greenCircle, radar)

    const logos: LogoState[] = cardGroups.map((group) => {
      const cx = group._cx ?? 0
      const cy = group._cy ?? 0
      const angle = (Math.atan2(cy - 470, cx - 454) * (180 / Math.PI) + RADAR_OFFSET + 360) % 360
      group.style.willChange = "opacity"
      return {
        el: group,
        angle,
        setOpacity: gsap.quickSetter(group, "opacity") as (value: number) => void,
      }
    })

    const quadrantStates: QuadrantState[] = QUADRANTS.map((quadrant) => {
      const el = document.getElementById(quadrant.dotId)
      return {
        startDeg: quadrant.startDeg,
        endDeg: quadrant.endDeg,
        g: el,
        path: el?.querySelector("path") ?? null,
        active: false,
      }
    })

    const updateHighlight = (rot: number) => {
      logos.forEach((logo) => {
        let diff = Math.abs(rot - logo.angle)
        if (diff > 180) diff = 360 - diff
        const strength = Math.max(0, 1 - diff / LOGO_RANGE)
        if (strength > 0.15) logo.activated = true
        const opacity = logo.activated ? LOGO_MIN_OPACITY + LOGO_ACTIVE_OPACITY : LOGO_MIN_OPACITY
        if (Math.abs(opacity - (logo.prevOpacity ?? -1)) < 0.005) return
        logo.prevOpacity = opacity
        gsap.to(logo.el, {
          opacity,
          duration: opacity > LOGO_MIN_OPACITY ? 0.1 : 0.25,
          ease: "power2.out",
          overwrite: true,
        })
      })

      quadrantStates.forEach((quadrant) => {
        if (!quadrant.path || !quadrant.g) return
        const nowIn =
          quadrant.startDeg < quadrant.endDeg
            ? rot >= quadrant.startDeg && rot < quadrant.endDeg
            : rot >= quadrant.startDeg || rot < quadrant.endDeg
        if (nowIn === quadrant.active) return
        quadrant.active = nowIn
        gsap.to(quadrant.path, {
          attr: { fill: nowIn ? DOT_ACTIVE_COLOR : DOT_INACTIVE_COLOR },
          duration: nowIn ? DOT_FADE_IN : DOT_FADE_OUT,
          overwrite: true,
        })
        gsap.to(quadrant.g, {
          filter: nowIn ? DOT_ACTIVE_GLOW : "none",
          duration: nowIn ? DOT_FADE_IN : DOT_FADE_OUT,
          overwrite: true,
        })
      })
    }

    let radarTween: { kill: () => void } | null = null

    const startRadar = () => {
      radarTween?.kill()
      gsap.set(radar, { rotation: -90, svgOrigin: "454 470" })
      logos.forEach((logo) => {
        logo.prevOpacity = -1
        logo.activated = false
        logo.setOpacity(LOGO_MIN_OPACITY)
      })
      quadrantStates.forEach((quadrant) => {
        quadrant.active = false
        quadrant.path?.setAttribute("fill", DOT_INACTIVE_COLOR)
        if (quadrant.g) quadrant.g.style.filter = "none"
      })
      radarTween = gsap.to(radar, {
        rotation: 270,
        svgOrigin: "454 470",
        duration: RADAR_DURATION,
        repeat: -1,
        ease: "none",
        onUpdate() {
          updateHighlight((this.progress() * 360) % 360)
        },
      })
    }

    startRadar()
    startRadarGlobal = startRadar

    Array.from(svg.querySelectorAll("circle"))
      .filter((circle) => Number.parseFloat(circle.getAttribute("r") || "0") > 120)
      .forEach((ring, index) => {
        gsap.to(ring, {
          rotation: index % 2 ? 360 : -360,
          svgOrigin: "454 470",
          duration: 150 + index * 35,
          repeat: -1,
          ease: "none",
        })
      })
  }

  return () => observer.disconnect()
}
