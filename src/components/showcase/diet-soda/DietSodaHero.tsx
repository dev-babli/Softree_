"use client"

import Script from "next/script"
import { createElement, useEffect, useRef } from "react"
import gsap from "gsap"

const ASSET_BASE_URL = "https://api.getlayers.ai/storage/v1/object/public/public/assets/soda-14ff8a788d"

const ASSETS = {
  leaves: `${ASSET_BASE_URL}/leaves.glb`,
  cherry: `${ASSET_BASE_URL}/cherry.glb`,
  blueberry: `${ASSET_BASE_URL}/blueberry.glb`,
  can: `${ASSET_BASE_URL}/deit_soda2.glb`,
  greenSoda: `${ASSET_BASE_URL}/Green%20Soda.png`,
  blueSoda: `${ASSET_BASE_URL}/Blue%20Soda.png`,
  greenTexture: `${ASSET_BASE_URL}/green%20base%20color.jpg`,
  blueTexture: `${ASSET_BASE_URL}/blue%20base%20color.jpg`,
  bubble: `${ASSET_BASE_URL}/bubble.png`,
} as const

type ModelViewerProps = Record<string, unknown> & {
  className?: string
  id?: string
  src?: string
  alt?: string
}

function ModelViewer(props: ModelViewerProps) {
  return createElement("model-viewer", props)
}

const leafModels = [
  { className: "leaf l1", orbit: "45deg 75deg 105%" },
  { className: "leaf l2", orbit: "-30deg 60deg 105%" },
  { className: "leaf l3", orbit: "120deg 85deg 105%" },
  { className: "leaf l4", orbit: "10deg 45deg 105%" },
]

const berryModels = [
  { className: "berry b1", orbit: "45deg 120deg 105%" },
  { className: "berry b2", orbit: "-120deg 45deg 105%" },
  { className: "berry b3", orbit: "200deg 90deg 105%" },
  { className: "berry b4", orbit: "10deg 20deg 105%" },
  { className: "berry b5", orbit: "-45deg 160deg 105%" },
  { className: "berry b6", orbit: "80deg 75deg 105%" },
]

const backgroundBerries = [
  { className: "berry b7", orbit: "-20deg 110deg 105%" },
  { className: "berry b8", orbit: "160deg 45deg 105%" },
  { className: "berry b9", orbit: "45deg 20deg 105%" },
]

export default function DietSodaHero() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const previousBodyOverflow = document.body.style.overflow
    const previousBodyHeight = document.body.style.height
    document.body.style.overflow = "hidden"
    document.body.style.height = "100vh"

    const modelViewer = root.querySelector<HTMLElement>("#product-model") as (HTMLElement & {
      cameraOrbit?: string
      createTexture?: (url: string) => Promise<unknown>
      model?: {
        materials?: Array<{
          pbrMetallicRoughness?: {
            baseColorTexture?: {
              setTexture?: (texture: unknown) => void
            }
          }
        }>
      }
    }) | null
    const berriesFG = root.querySelector<HTMLElement>(".berries-container")
    const berriesBG = root.querySelector<HTMLElement>(".berries-container-bg")
    const leavesBG = root.querySelector<HTMLElement>(".leaves-container")
    const allBerries = Array.from(root.querySelectorAll<HTMLElement>(".berry"))
    const cards = Array.from(root.querySelectorAll<HTMLElement>(".card"))
    const bubblesContainer = root.querySelector<HTMLElement>("#bubbles-container")
    let isSwitching = false
    let switchSpin = 0
    let blueTexture: unknown = null
    let greenTexture: unknown = null
    let frame = 0
    let bubbleTimer = 0
    let disposed = false

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const applyTexture = (texture: unknown) => {
      modelViewer?.model?.materials?.forEach((material) => {
        const target = material.pbrMetallicRoughness?.baseColorTexture
        if (target?.setTexture) target.setTexture(texture)
      })
    }

    const onModelLoad = async () => {
      try {
        if (!modelViewer?.createTexture) return
        blueTexture = await modelViewer.createTexture(ASSETS.blueTexture)
        greenTexture = await modelViewer.createTexture(ASSETS.greenTexture)

        const material = modelViewer.model?.materials?.[0]
        const target = material?.pbrMetallicRoughness?.baseColorTexture
        if (target?.setTexture) {
          target.setTexture(blueTexture)
          await new Promise((resolve) => requestAnimationFrame(resolve))
          target.setTexture(greenTexture)
        }
      } catch (error) {
        console.error("Texture preload failed", error)
      }
    }

    modelViewer?.addEventListener("load", onModelLoad)

    allBerries.forEach((berry) => {
      berry.dataset.rx = "0"
      berry.dataset.ry = "0"
      berry.dataset.angle = `${Math.random() * 360}`
      berry.dataset.baseX = "0"
      berry.dataset.baseY = "0"
      berry.dataset.targetRx = "0"
      berry.dataset.targetRy = "0"
    })

    const switchFlavor = async (flavor: string) => {
      if (isSwitching || !modelViewer) return
      isSwitching = true
      const body = root
      const berries = Array.from(root.querySelectorAll<HTMLElement>(".berry"))
      const heroCenter = root.querySelector<HTMLElement>(".hero-center")

      const targetColors =
        flavor === "blue"
          ? { inner: "#0b4f8a", mid: "#04294e", outer: "#010c14" }
          : { inner: "#0b8a78", mid: "#044e3b", outer: "#011411" }

      gsap.to(body, {
        "--bg-inner": targetColors.inner,
        "--bg-mid": targetColors.mid,
        "--bg-outer": targetColors.outer,
        duration: reduceMotion ? 0 : 1.5,
        ease: "power2.inOut",
      })

      const spinObj = { val: 0, blur: 0 }
      gsap.to(spinObj, {
        val: 360,
        blur: reduceMotion ? 0 : 15,
        duration: reduceMotion ? 0.01 : 0.6,
        ease: "power2.in",
        onUpdate: () => {
          switchSpin = spinObj.val
          modelViewer.style.filter = `blur(${spinObj.blur}px)`
        },
        onComplete: async () => {
          if (flavor === "blue") {
            body.classList.add("blue-theme")
            if (blueTexture) applyTexture(blueTexture)
          } else {
            body.classList.remove("blue-theme")
            if (greenTexture) applyTexture(greenTexture)
          }

          gsap.to(spinObj, {
            val: 720,
            blur: 0,
            duration: reduceMotion ? 0.01 : 1.5,
            ease: "back.out(0.7)",
            onUpdate: () => {
              switchSpin = spinObj.val
              modelViewer.style.filter = `blur(${spinObj.blur}px)`
            },
            onComplete: () => {
              switchSpin = 0
              modelViewer.style.filter = "none"
            },
          })
        },
      })

      let completedBerries = 0
      berries.forEach((berry) => {
        const bW = berry.offsetWidth / 2
        const bH = berry.offsetHeight / 2
        const centerX = window.innerWidth / 2 - berry.offsetLeft - bW
        const centerY = window.innerHeight / 2 - berry.offsetTop - bH

        const startAngle = parseFloat(berry.dataset.angle || "0")
        const currentBaseX = parseFloat(berry.dataset.baseX || "0")
        const currentBaseY = parseFloat(berry.dataset.baseY || "0")

        const nextBaseX = (Math.random() - 0.5) * 200
        const nextBaseY = (Math.random() - 0.5) * 200

        gsap.set(berry, {
          rotation: startAngle,
          x: currentBaseX,
          y: currentBaseY,
        })

        const berryTl = gsap.timeline()

        berryTl
          .to(berry, {
            x: centerX,
            y: centerY,
            rotation: startAngle + 45,
            scale: 0.1,
            opacity: 0,
            duration: reduceMotion ? 0.01 : 0.5,
            ease: "power2.in",
            onComplete: () => {
              berry.setAttribute("src", flavor === "blue" ? ASSETS.blueberry : ASSETS.cherry)
              if (heroCenter) heroCenter.style.zIndex = "50"
            },
          })
          .to(berry, {
            duration: reduceMotion ? 0 : 0.3,
          })
          .to(berry, {
            onStart: () => {
              if (heroCenter) heroCenter.style.zIndex = "1"
            },
            x: nextBaseX,
            y: nextBaseY,
            rotation: startAngle + 90,
            scale: 1,
            opacity: 1,
            duration: reduceMotion ? 0.01 : 0.9,
            ease: "back.out(1.5)",
            onComplete: () => {
              berry.dataset.angle = `${startAngle + 90}`
              berry.dataset.baseX = `${nextBaseX}`
              berry.dataset.baseY = `${nextBaseY}`
              berry.dataset.rx = "0"
              berry.dataset.ry = "0"

              completedBerries++
              if (completedBerries === berries.length) {
                isSwitching = false
              }
            },
          })
      })
    }

    const onCardClick = (card: HTMLElement) => {
      if (isSwitching) return
      cards.forEach((item) => item.classList.remove("active"))
      card.classList.add("active")
      const flavor = card.dataset.flavor || "classic"
      void switchFlavor(flavor)
    }

    const cardListeners = cards.map((card) => {
      const handler = () => onCardClick(card)
      card.addEventListener("click", handler)
      return () => card.removeEventListener("click", handler)
    })

    const mouse = { x: 0, y: 0, px: 0, py: 0 }
    const currentMouse = { x: 0, y: 0 }

    const onMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX / window.innerWidth - 0.5
      mouse.y = event.clientY / window.innerHeight - 0.5
      mouse.px = event.clientX
      mouse.py = event.clientY
    }

    window.addEventListener("mousemove", onMouseMove)

    const animate = () => {
      if (disposed) return
      const time = Date.now() * 0.001
      currentMouse.x += (mouse.x - currentMouse.x) * 0.05
      currentMouse.y += (mouse.y - currentMouse.y) * 0.05

      if (modelViewer) {
        modelViewer.cameraOrbit = `${currentMouse.x * 40 + switchSpin}deg ${90 + currentMouse.y * 20}deg 380%`
      }

      if (berriesFG) berriesFG.style.transform = `translate(${currentMouse.x * 60}px, ${currentMouse.y * 60}px)`
      if (berriesBG) berriesBG.style.transform = `translate(${currentMouse.x * -30}px, ${currentMouse.y * -30}px)`
      if (leavesBG) leavesBG.style.transform = `translate(${currentMouse.x * -15}px, ${currentMouse.y * -15}px)`

      if (!isSwitching && !reduceMotion) {
        allBerries.forEach((berry, index) => {
          const berryRect = berry.getBoundingClientRect()
          const berryX = berryRect.left + berryRect.width / 2
          const berryY = berryRect.top + berryRect.height / 2

          const diffX = mouse.px - berryX
          const diffY = mouse.py - berryY
          const distance = Math.sqrt(diffX * diffX + diffY * diffY)

          let targetRx = 0
          let targetRy = 0
          let speedMult = 1

          if (distance > 0 && distance < 400) {
            const force = (400 - distance) / 400
            targetRx = (diffX / distance) * force * -80
            targetRy = (diffY / distance) * force * -80
            speedMult = 1 + force * 5
          }

          let rx = parseFloat(berry.dataset.rx || "0")
          let ry = parseFloat(berry.dataset.ry || "0")
          let angle = parseFloat(berry.dataset.angle || "0")
          const baseX = parseFloat(berry.dataset.baseX || "0")
          const baseY = parseFloat(berry.dataset.baseY || "0")

          rx += (targetRx - rx) * 0.1
          ry += (targetRy - ry) * 0.1
          angle += 0.2 * speedMult

          berry.dataset.rx = `${rx}`
          berry.dataset.ry = `${ry}`
          berry.dataset.angle = `${angle}`

          const dur = [5, 7, 6, 8, 5.5, 6.5, 9, 11, 10][index % 9]
          const phase = (time + index * 0.7) * ((Math.PI * 2) / dur)
          const floatY = Math.sin(phase) * 15
          const floatAngle = Math.cos(phase) * 6

          berry.style.transform = `translate(calc(${rx + baseX}px), calc(${ry + baseY}px + ${floatY}px)) rotate(calc(${angle}deg + ${floatAngle}deg))`
        })
      }

      root.querySelectorAll<HTMLElement>(".leaf").forEach((leaf, index) => {
        if (reduceMotion) return
        const dur = 10 + index * 2
        const phase = (time + index * 1.2) * ((Math.PI * 2) / dur)
        const floatY = Math.sin(phase) * 20
        const floatX = Math.cos(phase * 0.5) * 15
        const floatAngle = Math.sin(phase * 0.3) * 15
        leaf.style.transform = `translate(${floatX}px, ${floatY}px) rotate(${floatAngle}deg)`
      })

      frame = requestAnimationFrame(animate)
    }

    animate()

    const createBubble = () => {
      if (!bubblesContainer || reduceMotion) return
      const bubble = document.createElement("img")
      bubble.src = ASSETS.bubble
      bubble.className = "bubble-img"
      bubble.alt = ""
      const size = `${Math.random() * 20 + 10}px`
      bubble.style.width = size
      bubble.style.height = "auto"
      bubble.style.left = `${Math.random() * 100}%`
      bubble.style.bottom = "-50px"
      bubble.style.opacity = `${Math.random() * 0.4 + 0.2}`

      const duration = Math.random() * 6 + 4
      bubble.style.animation = `floatUpImg ${duration}s linear forwards`

      bubblesContainer.appendChild(bubble)
      window.setTimeout(() => bubble.remove(), duration * 1000)
    }

    bubbleTimer = window.setInterval(createBubble, 400)

    return () => {
      disposed = true
      document.body.style.overflow = previousBodyOverflow
      document.body.style.height = previousBodyHeight
      window.removeEventListener("mousemove", onMouseMove)
      modelViewer?.removeEventListener("load", onModelLoad)
      cardListeners.forEach((remove) => remove())
      window.clearInterval(bubbleTimer)
      cancelAnimationFrame(frame)
      gsap.killTweensOf(root)
      allBerries.forEach((berry) => gsap.killTweensOf(berry))
    }
  }, [])

  return (
    <>
      <Script
        type="module"
        src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
        strategy="afterInteractive"
      />
      <div ref={rootRef} className="diet-soda-page">
        <div id="bubbles-container" />

        <header className="header">
          <div className="logo">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span>Soda</span>
          </div>
          <nav className="nav glass" aria-label="Diet Soda navigation">
            {["Home", "Ingredients", "Taste", "Eco", "Reviews"].map((item, index) => (
              <a key={item} href="#" className={`nav-item${index === 0 ? " active" : ""}`}>
                {item}
              </a>
            ))}
          </nav>
          <button className="contact-btn" type="button">
            Contact Us
          </button>
        </header>

        <main className="hero">
          <div className="hero-content">
            <div className="leaves-container">
              {leafModels.map((leaf) => (
                <ModelViewer
                  key={leaf.className}
                  className={leaf.className}
                  src={ASSETS.leaves}
                  environment-image="neutral"
                  exposure="1.0"
                  interaction-prompt="none"
                  camera-orbit={leaf.orbit}
                />
              ))}
            </div>

            <div className="hero-left">
              <h1 className="main-title large-animation-1">
                <span className="outline">Pure</span>
                <br />
                Zero
              </h1>
              <p className="description">
                Unleash the crisp taste of zero sugar. <br />
                Refreshment redefined in every bubble — <br />
                all in one sleek design.
              </p>
              <div className="cta-group">
                <button className="primary-btn" type="button">
                  Shop Now
                  <span className="plus-icon">+</span>
                </button>
              </div>
              <div className="award-badge">
                <div className="award-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 15L15 18L19 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 10L12 15L17 10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="award-text">
                  <span className="award-title">DESIGN AWARDS</span>
                  <span className="award-subtitle">PREMIUM BEVERAGE 2025</span>
                </div>
              </div>
            </div>

            <div className="berries-container-bg">
              {backgroundBerries.map((berry) => (
                <ModelViewer
                  key={berry.className}
                  className={berry.className}
                  src={ASSETS.cherry}
                  environment-image="neutral"
                  exposure="1.0"
                  interaction-prompt="none"
                  camera-orbit={berry.orbit}
                />
              ))}
            </div>

            <div className="hero-center">
              <ModelViewer
                id="product-model"
                src={ASSETS.can}
                alt="Diet Soda 3D Model"
                camera-controls
                disable-zoom
                shadow-intensity="0"
                environment-image="neutral"
                exposure="1.5"
                interaction-prompt="none"
                camera-orbit="0deg 90deg 380%"
                field-of-view="30deg"
                className="main-product-3d"
              />
            </div>

            <div className="berries-container">
              {berryModels.map((berry) => (
                <ModelViewer
                  key={berry.className}
                  className={berry.className}
                  src={ASSETS.cherry}
                  environment-image="neutral"
                  exposure="1.2"
                  interaction-prompt="none"
                  camera-orbit={berry.orbit}
                />
              ))}
            </div>

            <div className="hero-right">
              <div className="product-carousel">
                <div className="carousel-cards">
                  <button className="card active" data-flavor="classic" type="button">
                    <img src={ASSETS.greenSoda} alt="Diet Classic" />
                    <div className="card-info">
                      <span>Diet Classic</span>
                      <span>$2.99</span>
                    </div>
                  </button>
                  <button className="card" data-flavor="blue" type="button">
                    <img src={ASSETS.blueSoda} alt="Zero Lime" style={{ filter: "brightness(0.7)" }} />
                    <div className="card-info">
                      <span>Zero Lime</span>
                      <span>$2.99</span>
                    </div>
                  </button>
                </div>
                <div className="carousel-nav">
                  <button className="nav-arrow" type="button" aria-label="Previous flavor">
                    ←
                  </button>
                  <button className="nav-arrow" type="button" aria-label="Next flavor">
                    →
                  </button>
                </div>
              </div>
              <h2 className="side-title large-animation-1">
                <span className="outline">Refreshingly</span>
                <br />
                Clean
              </h2>
            </div>
          </div>
        </main>

        <svg className="frosted-svg" aria-hidden="true">
          <filter id="frosted">
            <feTurbulence type="fractalNoise" baseFrequency="0.0125" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="80" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>

        <div className="preload-models" aria-hidden="true">
          <ModelViewer src={ASSETS.blueberry} />
          <ModelViewer src={ASSETS.cherry} />
        </div>
      </div>

      <style jsx global>{`
        .diet-soda-page {
          --bg-color: #0a0a0a;
          --text-color: #ffffff;
          --accent-color: #ffffff;
          --muted-color: rgba(255, 255, 255, 0.7);
          --glass-bg: rgba(255, 255, 255, 0.05);
          --glass-border: rgba(255, 255, 255, 0.1);
          --font-main: "Inter", sans-serif;
          --font-heading: "Galada", cursive;
          --bg-inner: #0b8a78;
          --bg-mid: #044e3b;
          --bg-outer: #011411;
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background: radial-gradient(circle at center, var(--bg-inner) 0%, var(--bg-mid) 50%, var(--bg-outer) 100%);
          color: var(--text-color);
          font-family: var(--font-main);
          transition: background 1.2s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 0;
        }

        .diet-soda-page.blue-theme {
          --bg-inner: #0b4f8a;
          --bg-mid: #04294e;
          --bg-outer: #010c14;
        }

        .diet-soda-page *,
        .diet-soda-page *::before,
        .diet-soda-page *::after {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .diet-soda-page #bubbles-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .diet-soda-page .bubble-img {
          position: absolute;
          pointer-events: none;
        }

        @keyframes floatUpImg {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.4;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-110vh) translateX(30px) rotate(360deg);
            opacity: 0;
          }
        }

        .diet-soda-page .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem 4%;
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 100;
        }

        .diet-soda-page .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          font-size: 1.2rem;
          font-family: var(--font-heading);
        }

        .diet-soda-page .nav {
          display: flex;
          gap: 0.5rem;
          background: var(--glass-bg);
          padding: 0.4rem;
          border-radius: 100px;
          border: 1px solid var(--glass-border);
        }

        .diet-soda-page .nav.glass {
          position: relative;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .diet-soda-page .nav-item {
          font-family: "Manrope", sans-serif;
          color: var(--muted-color);
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          padding: 0.5rem 1.2rem;
          border-radius: 100px;
          transition: all 0.3s ease;
        }

        .diet-soda-page .nav-item:hover,
        .diet-soda-page .nav-item.active {
          background: #fbcfe8;
          color: #011d17;
        }

        .diet-soda-page .contact-btn {
          background: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          padding: 0.9rem 2rem;
          border-radius: 100px;
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: none;
        }

        .diet-soda-page .contact-btn:hover {
          background: rgba(0, 0, 0, 0.7);
          transform: translateY(-2px);
          box-shadow: none;
        }

        .diet-soda-page .hero {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 4%;
          padding-top: 5rem;
        }

        .diet-soda-page .hero-content {
          display: flex;
          justify-content: space-between;
          align-items: stretch;
          width: 100%;
          max-width: 100%;
          padding: 0;
          height: 100%;
          position: relative;
        }

        .diet-soda-page .main-title,
        .diet-soda-page .side-title {
          font-family: var(--font-heading);
          font-size: clamp(5rem, 10vw, 12rem);
          line-height: 0.8;
          font-weight: 400;
          text-transform: none;
          white-space: nowrap;
          color: white;
          letter-spacing: normal;
        }

        .diet-soda-page .outline {
          color: var(--text-color);
        }

        .diet-soda-page .leaves-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: -1;
          transition: transform 0.1s ease-out;
        }

        .diet-soda-page .leaf {
          position: absolute;
          width: 60px;
          height: 60px;
          pointer-events: none;
          z-index: -1;
          filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.2));
        }

        .diet-soda-page .l1 {
          top: 10%;
          left: 15%;
        }
        .diet-soda-page .l2 {
          top: 40%;
          left: 80%;
          width: 140px;
          height: 140px;
          opacity: 0.4;
        }
        .diet-soda-page .l3 {
          top: 70%;
          left: 75%;
          width: 80px;
          height: 80px;
        }
        .diet-soda-page .l4 {
          top: 85%;
          left: 20%;
          width: 120px;
          height: 120px;
          opacity: 0.3;
        }

        .diet-soda-page .hero-left {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 6rem 0;
          gap: 2rem;
          z-index: 100;
        }

        @keyframes fadeInEntry {
          to {
            opacity: 1;
            transform: none;
          }
        }

        .diet-soda-page .description {
          color: var(--muted-color);
          font-size: 1.1rem;
          line-height: 1.6;
          max-width: 400px;
        }

        .diet-soda-page .primary-btn {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          background: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          padding: 0.4rem 0.4rem 0.4rem 1.5rem;
          border-radius: 100px;
          font-weight: 700;
          cursor: pointer;
          width: fit-content;
          transition: all 0.3s ease;
          box-shadow: none;
        }

        .diet-soda-page .primary-btn:hover {
          background: rgba(0, 0, 0, 0.7);
          transform: translateY(-3px);
          box-shadow: none;
        }

        .diet-soda-page .plus-icon {
          background: #fbcfe8;
          color: #011d17;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 1.4rem;
          font-weight: 900;
          line-height: 1;
          padding-bottom: 2px;
          border: none;
        }

        .diet-soda-page .award-badge {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: auto;
        }

        .diet-soda-page .award-icon {
          width: 48px;
          height: 48px;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .diet-soda-page .award-text {
          display: flex;
          flex-direction: column;
        }
        .diet-soda-page .award-title {
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          color: var(--muted-color);
        }
        .diet-soda-page .award-subtitle {
          font-size: 0.85rem;
          font-weight: 600;
        }

        .diet-soda-page .hero-center {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          opacity: 0;
          animation: fadeIn 1.5s ease-out 0.3s forwards, float 6s ease-in-out infinite;
          pointer-events: none;
          background: radial-gradient(circle at center, rgba(16, 185, 129, 0.1) 0%, transparent 70%);
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .diet-soda-page .main-product-3d {
          width: 80vw;
          height: 80vh;
          outline: none;
          --progress-bar-color: transparent;
          --poster-color: transparent;
          z-index: 1;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(25deg);
          pointer-events: none;
        }

        .diet-soda-page .main-product-3d[camera-controls] {
          pointer-events: auto;
        }

        .diet-soda-page .berries-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 110;
          transition: transform 0.1s ease-out;
        }

        .diet-soda-page .berries-container-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
          transition: transform 0.1s ease-out;
        }

        .diet-soda-page .berry {
          position: absolute;
          width: 120px;
          height: 120px;
          outline: none;
          --progress-bar-color: transparent;
          filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3));
          transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .diet-soda-page .berry.no-animation {
          animation: none !important;
        }

        .diet-soda-page .b1 {
          top: 25%;
          left: 30%;
          width: 220px;
          height: 220px;
        }
        .diet-soda-page .b2 {
          top: 60%;
          left: 42%;
          width: 100px;
          height: 100px;
        }
        .diet-soda-page .b3 {
          top: 30%;
          left: 62%;
          width: 250px;
          height: 250px;
        }
        .diet-soda-page .b4 {
          top: 15%;
          left: 48%;
          width: 140px;
          height: 140px;
        }
        .diet-soda-page .b5 {
          top: 75%;
          left: 20%;
          width: 120px;
          height: 120px;
        }
        .diet-soda-page .b6 {
          top: 45%;
          left: 75%;
          width: 180px;
          height: 180px;
        }
        .diet-soda-page .b7 {
          top: 15%;
          left: 40%;
          width: 80px;
          height: 80px;
          opacity: 0.7;
        }
        .diet-soda-page .b8 {
          top: 50%;
          left: 55%;
          width: 70px;
          height: 70px;
          opacity: 0.6;
        }
        .diet-soda-page .b9 {
          top: 80%;
          left: 35%;
          width: 75px;
          height: 75px;
          opacity: 0.7;
        }

        .diet-soda-page .hero-right {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-end;
          text-align: right;
          height: 100%;
          padding: 6rem 0;
          z-index: 100;
          width: 450px;
          pointer-events: none;
        }

        @keyframes fadeInLeft {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .diet-soda-page .product-carousel {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          align-items: flex-end;
          pointer-events: auto;
        }

        .diet-soda-page .carousel-cards {
          display: flex;
          gap: 1rem;
        }

        .diet-soda-page .card {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          padding: 5rem 1rem 1rem;
          border-radius: 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          width: 135px;
          position: relative;
          backdrop-filter: blur(10px);
          text-align: center;
          color: white;
        }

        .diet-soda-page .card:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.4);
        }

        .diet-soda-page .card.active {
          border-color: #fbcfe8;
          border-width: 1px;
          background: var(--glass-bg);
          box-shadow: none;
        }

        .diet-soda-page .card img {
          width: 140px;
          height: auto;
          margin-top: -8rem;
          filter: drop-shadow(0 20px 35px rgba(0, 0, 0, 0.5));
          transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
          display: block;
          will-change: transform;
          pointer-events: none;
        }

        .diet-soda-page .card:hover img {
          transform: translateY(-30px) rotate(-12deg) scale(1.15) !important;
        }

        .diet-soda-page .card-info {
          display: flex;
          flex-direction: column;
          font-size: 0.7rem;
          width: 100%;
          word-wrap: break-word;
        }

        .diet-soda-page .card-info span:first-child {
          font-weight: 600;
        }
        .diet-soda-page .card-info span:last-child {
          color: var(--muted-color);
        }

        .diet-soda-page .carousel-nav {
          display: flex;
          gap: 1rem;
        }

        .diet-soda-page .nav-arrow {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          color: white;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s;
        }

        .diet-soda-page .nav-arrow:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .diet-soda-page .side-title {
          align-self: flex-end;
          text-align: right;
        }

        .diet-soda-page .frosted-svg {
          position: absolute;
          width: 0;
          height: 0;
          opacity: 0;
          pointer-events: none;
        }

        .diet-soda-page .preload-models {
          display: none;
        }

        @keyframes shine {
          from {
            transform: translateX(-100%) rotate(45deg);
          }
          to {
            transform: translateX(200%) rotate(45deg);
          }
        }

        @media (max-width: 1200px) {
          .diet-soda-page .main-product-3d {
            width: 100vw;
            height: 60vh;
            top: 40%;
          }
        }

        @media (max-width: 1200px) {
          .diet-soda-page .hero-content {
            grid-template-columns: 1fr;
            padding-top: 8rem;
          }
          .diet-soda-page .hero-center {
            order: -1;
          }
          .diet-soda-page .main-title,
          .diet-soda-page .side-title {
            font-size: 5rem;
          }
          .diet-soda-page .hero-right {
            align-items: center;
            text-align: center;
          }
          .diet-soda-page .side-title {
            align-self: center;
            text-align: center;
          }
        }

        @media (max-width: 760px) {
          .diet-soda-page .header {
            padding: 1rem 4%;
          }
          .diet-soda-page .nav {
            display: none;
          }
          .diet-soda-page .contact-btn {
            padding: 0.75rem 1.2rem;
          }
          .diet-soda-page .hero {
            padding-top: 4.5rem;
          }
          .diet-soda-page .hero-content {
            flex-direction: column;
          }
          .diet-soda-page .hero-left {
            padding: 4rem 0 1rem;
            gap: 1rem;
          }
          .diet-soda-page .description,
          .diet-soda-page .award-badge {
            display: none;
          }
          .diet-soda-page .hero-right {
            width: 100%;
            padding: 0 0 2rem;
          }
          .diet-soda-page .product-carousel {
            align-items: center;
            width: 100%;
          }
          .diet-soda-page .carousel-cards {
            transform: scale(0.78);
          }
          .diet-soda-page .main-title,
          .diet-soda-page .side-title {
            font-size: 4rem;
          }
          .diet-soda-page .side-title {
            display: none;
          }
          .diet-soda-page .berry {
            transform: scale(0.65);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .diet-soda-page .hero-center {
            opacity: 1;
            animation: none;
          }
          .diet-soda-page *,
          .diet-soda-page *::before,
          .diet-soda-page *::after {
            transition-duration: 0.001ms !important;
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>
    </>
  )
}
