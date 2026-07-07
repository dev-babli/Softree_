"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { applySoftreeSectionHtml } from "./softreeAgenticHtmlCopy"
import { SOFTREE_AGENTIC_SECTIONS } from "./referenceContent"
import "./softree-demo-video-fix.css"

type VimeoTimeUpdate = {
  seconds: number
  duration?: number
}

type VimeoPlayer = {
  ready: () => Promise<void>
  getDuration: () => Promise<number>
  setCurrentTime: (seconds: number) => Promise<void>
  setMuted: (muted: boolean) => Promise<void>
  setVolume: (volume: number) => Promise<void>
  setLoop: (loop: boolean) => Promise<void>
  play: () => Promise<void>
  pause: () => Promise<void>
  on: (event: "timeupdate" | "ended", handler: (event: VimeoTimeUpdate) => void | Promise<void>) => void
  off?: (event: "timeupdate" | "ended", handler: (event: VimeoTimeUpdate) => void | Promise<void>) => void
}

type VimeoWindow = Window & {
  Vimeo?: {
    Player: new (element: HTMLIFrameElement) => VimeoPlayer
  }
  _hsMeetingScriptAdded?: boolean
}

const preview = {
  start: 137,
  end: 161,
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`
}

function mountDemoVideo(sectionNode: HTMLElement, overlay: HTMLElement): () => void {
  const iframe = sectionNode.querySelector<HTMLIFrameElement>("#vimeo-player")
  const play = sectionNode.querySelector<HTMLButtonElement>("#custom-play")
  const pause = sectionNode.querySelector<HTMLButtonElement>("#custom-pause")
  const clickLayer = sectionNode.querySelector<HTMLElement>("#video-click-layer")
  const cta = sectionNode.querySelector<HTMLElement>("#bamform-cta")
  const progress = sectionNode.querySelector<HTMLElement>("#video-progress-container")
  const bar = sectionNode.querySelector<HTMLElement>("#video-progress-bar")
  const wrap = sectionNode.querySelector<HTMLElement>("#video-progress-wrap")
  const current = sectionNode.querySelector<HTMLElement>("#current-time")
  const total = sectionNode.querySelector<HTMLElement>("#total-time")
  const openButtons = Array.from(sectionNode.querySelectorAll<HTMLButtonElement>(".bam-open"))
  const popup = overlay.querySelector<HTMLElement>("#bamform-popup")
  const meeting = overlay.querySelector<HTMLElement>("#bamform-meeting")
  const close = overlay.querySelector<HTMLButtonElement>("#bamform-close")

  if (!iframe || !play || !pause || !clickLayer || !cta || !progress || !bar || !wrap || !current || !total || !popup || !meeting || !close) {
    return () => {}
  }

  const win = window as VimeoWindow
  let player: VimeoPlayer | null = win.Vimeo?.Player ? new win.Vimeo.Player(iframe) : null
  const state = {
    playing: false,
    activated: false,
    meetingLoaded: false,
    ctaShown: false,
    firstPlay: false,
    duration: 929,
    fallbackSeconds: preview.start,
    fallbackTimer: 0,
    pauseTimer: 0,
  }

  const setProgress = (seconds: number, duration = state.duration) => {
    if (duration > 0) {
      const percent = Math.min(100, Math.max(0, (seconds / duration) * 100))
      bar.style.width = `${percent}%`
      wrap.setAttribute("aria-valuenow", String(Math.round(percent)))
    }
    current.textContent = formatTime(seconds)
    total.textContent = formatTime(duration)
  }

  const showPlay = () => play.classList.remove("hidden")
  const hidePlay = () => play.classList.add("hidden")
  const showPause = () => pause.classList.add("show")
  const hidePause = () => pause.classList.remove("show")

  const clearPauseTimer = () => {
    if (state.pauseTimer) window.clearTimeout(state.pauseTimer)
    state.pauseTimer = 0
  }

  const clearFallbackTimer = () => {
    if (state.fallbackTimer) window.clearInterval(state.fallbackTimer)
    state.fallbackTimer = 0
  }

  const flashPause = () => {
    if (!state.playing) return
    clearPauseTimer()
    showPause()
    state.pauseTimer = window.setTimeout(() => {
      if (state.playing) hidePause()
    }, 2000)
  }

  const tickFallback = () => {
    clearFallbackTimer()
    state.fallbackTimer = window.setInterval(() => {
      if (!state.playing) return
      state.fallbackSeconds += 0.25
      if (!state.ctaShown && state.fallbackSeconds >= 5) {
        state.ctaShown = true
        cta.classList.add("show")
      }
      if (!state.activated && state.fallbackSeconds >= preview.end) state.fallbackSeconds = preview.start
      setProgress(state.fallbackSeconds)
    }, 250)
  }

  const playVideo = async (fromStart = false) => {
    state.playing = true
    state.activated = true
    hidePlay()
    flashPause()
    progress.classList.add("show")

    if (fromStart) {
      state.ctaShown = false
      state.fallbackSeconds = 0
      cta.classList.remove("show")
      setProgress(0)
    }

    if (player) {
      try {
        if (fromStart) await player.setCurrentTime(0)
        await player.setMuted(false)
        await player.setVolume(1)
        await player.setLoop(false)
        await player.play()
      } catch {
        tickFallback()
      }
    } else {
      tickFallback()
    }
  }

  const pauseVideo = async () => {
    state.playing = false
    clearPauseTimer()
    clearFallbackTimer()
    hidePause()
    showPlay()
    if (player) {
      try {
        await player.pause()
      } catch {
        // UI state is already correct.
      }
    }
  }

  const onPlayClick = (event: Event) => {
    event.stopPropagation()
    if (!state.firstPlay) {
      state.firstPlay = true
      void playVideo(true)
    } else {
      void playVideo(false)
    }
  }

  const onPauseClick = (event: Event) => {
    event.stopPropagation()
    void pauseVideo()
  }

  const onLayerKeydown = (event: KeyboardEvent) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault()
      clickLayer.click()
    }
  }

  const onLayerClick = () => {
    if (!state.activated) {
      state.firstPlay = true
      void playVideo(true)
      return
    }
    void (state.playing ? pauseVideo() : playVideo(false))
  }

  const onTimeUpdate = (event: VimeoTimeUpdate) => {
    const seconds = event.seconds
    if (!state.activated && seconds >= preview.end) {
      void player?.setCurrentTime(preview.start)
      return
    }

    if (state.playing && !state.ctaShown && seconds >= 5) {
      state.ctaShown = true
      cta.classList.add("show")
    }

    if (event.duration && event.duration !== state.duration) state.duration = event.duration
    setProgress(seconds, state.duration)
  }

  const onEnded = async () => {
    state.playing = false
    state.activated = false
    state.firstPlay = false
    state.ctaShown = false
    clearPauseTimer()
    clearFallbackTimer()
    hidePause()
    showPlay()
    cta.classList.remove("show")

    try {
      await player?.setMuted(true)
      await player?.setVolume(0)
      await player?.setLoop(true)
      await player?.setCurrentTime(preview.start)
      await player?.play()
    } catch {
      state.fallbackSeconds = preview.start
    }
  }

  const seekTo = async (event: MouseEvent) => {
    event.stopPropagation()
    if (!state.activated || state.duration === 0) return

    const rect = wrap.getBoundingClientRect()
    const percent = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
    const target = state.duration * percent

    bar.classList.add("no-transition")
    bar.style.width = `${percent * 100}%`
    requestAnimationFrame(() => bar.classList.remove("no-transition"))
    state.fallbackSeconds = target
    setProgress(target)

    try {
      await player?.setCurrentTime(target)
    } catch {
      // Fallback state already reflects the seek.
    }
  }

  const openPopup = () => {
    void pauseVideo()
    overlay.classList.add("show")
    popup.classList.remove("is-confirmation")

    if (state.meetingLoaded) return
    state.meetingLoaded = true
    meeting.innerHTML =
      '<div class="meetings-iframe-container" data-src="https://meetings.hubspot.com/talkwithteam/demo-schedule?embed=true"></div>'

    if (!win._hsMeetingScriptAdded) {
      win._hsMeetingScriptAdded = true
      const script = document.createElement("script")
      script.src = "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"
      script.async = true
      document.body.appendChild(script)
    }
  }

  const closePopup = () => {
    overlay.classList.remove("show")
    window.setTimeout(() => popup.classList.remove("is-confirmation"), 700)
  }

  const onOverlayClick = (event: MouseEvent) => {
    if (event.target === overlay) closePopup()
  }

  const onEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape" && overlay.classList.contains("show")) closePopup()
  }

  play.addEventListener("click", onPlayClick)
  pause.addEventListener("click", onPauseClick)
  clickLayer.addEventListener("click", onLayerClick)
  clickLayer.addEventListener("keydown", onLayerKeydown)
  wrap.addEventListener("click", seekTo)
  close.addEventListener("click", closePopup)
  overlay.addEventListener("click", onOverlayClick)
  document.addEventListener("keydown", onEscape)
  openButtons.forEach((button) => button.addEventListener("click", openPopup))
  player?.on("timeupdate", onTimeUpdate)
  player?.on("ended", onEnded)

  setProgress(state.fallbackSeconds)

  const bindPlayer = () => {
    if (!win.Vimeo?.Player || player) return
    player = new win.Vimeo.Player(iframe)
    player.on("timeupdate", onTimeUpdate)
    player.on("ended", onEnded)
    void player.ready().then(async () => {
      try {
        state.duration = await player!.getDuration()
        setProgress(state.fallbackSeconds, state.duration)
        await player!.setCurrentTime(preview.start)
      } catch {
        setProgress(state.fallbackSeconds)
      }
    })
  }

  bindPlayer()
  const vimeoWait = window.setInterval(() => {
    if (!win.Vimeo?.Player) return
    window.clearInterval(vimeoWait)
    bindPlayer()
  }, 200)

  return () => {
    window.clearInterval(vimeoWait)
    play.removeEventListener("click", onPlayClick)
    pause.removeEventListener("click", onPauseClick)
    clickLayer.removeEventListener("click", onLayerClick)
    clickLayer.removeEventListener("keydown", onLayerKeydown)
    wrap.removeEventListener("click", seekTo)
    close.removeEventListener("click", closePopup)
    overlay.removeEventListener("click", onOverlayClick)
    document.removeEventListener("keydown", onEscape)
    openButtons.forEach((button) => button.removeEventListener("click", openPopup))
    player?.off?.("timeupdate", onTimeUpdate)
    player?.off?.("ended", onEnded)
    clearPauseTimer()
    clearFallbackTimer()
  }
}

export function SoftreeAgenticDemoVideoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null)
  const section = useMemo(() => {
    const raw = SOFTREE_AGENTIC_SECTIONS.find((item) => item.name === "SoftreeAgenticSection7Section")
    if (!raw) return null
    return { ...raw, html: applySoftreeSectionHtml("SoftreeAgenticSection7Section", raw.html) }
  }, [])

  useEffect(() => {
    setPortalRoot(document.body)
  }, [])

  useEffect(() => {
    const sectionNode = sectionRef.current
    const overlay = overlayRef.current
    if (!sectionNode || !overlay) return

    let unbind = mountDemoVideo(sectionNode, overlay)

    const onIntroComplete = () => {
      unbind()
      unbind = mountDemoVideo(sectionNode, overlay)
    }

    window.addEventListener("softree-agentic-intro-complete", onIntroComplete)

    return () => {
      window.removeEventListener("softree-agentic-intro-complete", onIntroComplete)
      unbind()
    }
  }, [portalRoot])

  if (!section) return null

  const overlay = (
    <div
      ref={overlayRef}
      className="bamform-overlay"
      id="bamform-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Book a demo meeting"
    >
      <div className="bamform-popup" id="bamform-popup">
        <button className="bamform-close" id="bamform-close" aria-label="Close booking form" type="button">
          &times;
        </button>
        <div className="bamform-meeting" id="bamform-meeting" />
      </div>
    </div>
  )

  return (
    <>
      <section ref={sectionRef} className="k2-section k2-section-demo-video" dangerouslySetInnerHTML={{ __html: section.html }} />
      {portalRoot ? createPortal(overlay, portalRoot) : null}
    </>
  )
}
