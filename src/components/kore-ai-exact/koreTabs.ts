type TabGroup = {
  root: HTMLElement
  syncAutoplay?: () => void
}

function cleanId(value: string | null, fallback: string) {
  const id = (value || "").trim().replace(/^#/, "").replace(/\s+/g, "-")
  return id || fallback
}

function getSlotChildren(el: HTMLElement) {
  const slot = Array.from(el.children).find((child) => child.hasAttribute("data-slot"))
  return Array.from((slot || el).children) as HTMLElement[]
}

function getHash() {
  const hash = window.location.hash.slice(1)
  if (!hash) return ""

  try {
    return decodeURIComponent(hash)
  } catch {
    return hash
  }
}

export function installKoreTabs(scope: ParentNode) {
  const roots = Array.from(scope.querySelectorAll<HTMLElement>(".k2-tabs"))
  const groups: TabGroup[] = []
  const cleanups: Array<() => void> = []
  const usedGroups = new Map<string, number>()

  roots.forEach((root, rootIndex) => {
    const own = (selector: string) =>
      Array.from(root.querySelectorAll<HTMLElement>(selector)).find((el) => el.closest(".k2-tabs") === root)

    const menu = own(".k2-tabs-menu")
    const panelsWrap = own(".k2-tabs-panels")
    if (!menu || !panelsWrap) return

    const rawTabs = getSlotChildren(menu)
    const rawPanels = getSlotChildren(panelsWrap)
    const count = Math.min(rawTabs.length, rawPanels.length)

    if (!count) {
      root.dataset.k2Init = "true"
      rawTabs.forEach((tab) => {
        tab.hidden = true
      })
      rawPanels.forEach((panel) => {
        panel.hidden = true
      })
      return
    }

    root.dataset.k2Init = "true"
    const tabs = rawTabs.slice(0, count)
    const panels = rawPanels.slice(0, count)

    rawTabs.slice(count).forEach((tab) => {
      tab.hidden = true
    })
    rawPanels.slice(count).forEach((panel) => {
      panel.hidden = true
    })

    const groupKey = cleanId(root.getAttribute("data-tabs-id"), `tabs-${rootIndex + 1}`)
    const groupCount = (usedGroups.get(groupKey) || 0) + 1
    usedGroups.set(groupKey, groupCount)
    const groupId = groupCount > 1 ? `${groupKey}-${groupCount}` : groupKey
    const usedTabs = new Map<string, number>()
    const group: TabGroup = { root }

    menu.setAttribute("role", "tablist")
    tabs.forEach((tab, tabIndex) => {
      const panel = panels[tabIndex]
      const existingTabId = tab.id
      const tabKey = cleanId(tab.getAttribute("data-tab-id") || existingTabId, `tab-${tabIndex + 1}`)
      const baseTabId = tabKey.startsWith(`${groupId}-`) ? tabKey : `${groupId}-${tabKey}`
      const tabCount = (usedTabs.get(baseTabId) || 0) + 1
      usedTabs.set(baseTabId, tabCount)
      const tabId = existingTabId || (tabCount > 1 ? `${baseTabId}-${tabCount}` : baseTabId)

      tab.id = tabId
      panel.id = panel.id || `${tabId}-panel`
      tab.setAttribute("role", "tab")
      tab.setAttribute("aria-controls", panel.id)
      panel.setAttribute("role", "tabpanel")
      panel.setAttribute("aria-labelledby", tab.id)
    })

    groups.push(group)

    let active = tabs.findIndex((tab, index) => tab.classList.contains("on") || panels[index].classList.contains("on"))
    if (active < 0) active = 0

    const getHashIndex = () => {
      const id = getHash()
      if (!id) return -1

      const directIndex = tabs.findIndex((tab, index) => tab.id === id || panels[index].id === id)
      if (directIndex >= 0) return directIndex

      const target = document.getElementById(id)
      if (!target) return -1

      return panels.findIndex((panel) => panel.contains(target))
    }

    const resetProgress = () => {
      tabs.forEach((tab) => tab.style.setProperty("--p", "0"))
    }

    const setProgress = (index: number, progress: number) => {
      tabs[index]?.style.setProperty("--p", progress.toFixed(3))
    }

    const scrollMenuToTab = (tab: HTMLElement, smooth = true) => {
      if (menu.scrollWidth <= menu.clientWidth || !menu.clientWidth) return

      const menuBox = menu.getBoundingClientRect()
      const tabBox = tab.getBoundingClientRect()
      const left = menu.scrollLeft + tabBox.left - menuBox.left - (menuBox.width - tabBox.width) / 2

      menu.scrollTo({ left, behavior: smooth ? "smooth" : "auto" })
    }

    const scrollRootToTop = (smooth = true) => {
      const top = Math.max(0, window.scrollY + root.getBoundingClientRect().top - 100)
      window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" })
    }

    const setActive = (
      index: number,
      options: { focus?: boolean; scroll?: boolean; smooth?: boolean } = {},
    ) => {
      const { focus = false, scroll = true, smooth = true } = options
      resetProgress()

      for (let tabIndex = 0; tabIndex < count; tabIndex += 1) {
        const on = tabIndex === index

        tabs[tabIndex].classList.toggle("on", on)
        tabs[tabIndex].setAttribute("aria-selected", String(on))
        tabs[tabIndex].tabIndex = on ? 0 : -1

        panels[tabIndex].classList.toggle("on", on)
        panels[tabIndex].toggleAttribute("inert", !on)
      }

      active = index

      if (focus) tabs[index].focus()
      if (scroll) requestAnimationFrame(() => scrollMenuToTab(tabs[index], smooth))
      requestAnimationFrame(() => {
        groups.forEach((item) => item.syncAutoplay?.())
      })
    }

    const hashIndex = getHashIndex()
    if (hashIndex >= 0) active = hashIndex
    setActive(active, { smooth: false })

    let autoplayFrame = 0
    let autoplayTimer: ReturnType<typeof setTimeout> | undefined
    let autoplayStart = 0
    let autoplayElapsed = 0
    let autoplayPaused = true
    const autoplayStopped = false
    let autoplayInView = false
    let autoplayHeld = false

    const delayAttr = parseFloat(root.getAttribute("data-autoplay") || "")
    const delay = Number.isFinite(delayAttr) && delayAttr > 0 ? delayAttr : 10000
    const canAutoplay =
      root.hasAttribute("data-autoplay") &&
      count > 1 &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const cancelAutoplayFrame = () => {
      if (autoplayFrame) window.cancelAnimationFrame(autoplayFrame)
      autoplayFrame = 0
    }

    const pauseAutoplay = (reset = false) => {
      if (!autoplayPaused) autoplayElapsed = performance.now() - autoplayStart
      autoplayPaused = true
      root.classList.remove("playing")
      cancelAutoplayFrame()
      if (reset) {
        autoplayElapsed = 0
        resetProgress()
      }
    }

    const shouldAutoplay = () => autoplayInView && !autoplayHeld && !root.closest("[inert]")

    const updateAutoplay = (time: number) => {
      if (autoplayPaused || autoplayStopped) return
      if (!shouldAutoplay()) {
        pauseAutoplay()
        return
      }

      const progress = Math.min((time - autoplayStart) / delay, 1)
      setProgress(active, progress)

      if (progress >= 1) {
        setActive((active + 1) % count)
        autoplayElapsed = 0
        autoplayStart = time
      }

      autoplayFrame = window.requestAnimationFrame(updateAutoplay)
    }

    const playAutoplay = () => {
      if (autoplayStopped || !autoplayPaused) return
      autoplayPaused = false
      autoplayStart = performance.now() - autoplayElapsed
      root.classList.add("playing")
      autoplayFrame = window.requestAnimationFrame(updateAutoplay)
    }

    group.syncAutoplay = () => {
      if (shouldAutoplay()) playAutoplay()
      else pauseAutoplay()
    }

    const resumeAutoplayAfterIdle = () => {
      if (!canAutoplay) return
      if (autoplayTimer) clearTimeout(autoplayTimer)
      pauseAutoplay()
      autoplayTimer = setTimeout(() => {
        autoplayHeld = false
        group.syncAutoplay?.()
      }, 4000)
    }

    tabs.forEach((tab, tabIndex) => {
      const onClick = (event: MouseEvent) => {
        event.preventDefault()
        const sameTab = tabIndex === active
        resumeAutoplayAfterIdle()
        if (sameTab) return
        setActive(tabIndex)
        requestAnimationFrame(() => scrollRootToTop())
        autoplayElapsed = 0
      }

      const onKeydown = (event: KeyboardEvent) => {
        let target: number | null = null
        if (event.key === "ArrowRight") target = (active + 1) % count
        else if (event.key === "ArrowLeft") target = (active - 1 + count) % count
        else if (event.key === "Home") target = 0
        else if (event.key === "End") target = count - 1

        if (target === null) return
        event.preventDefault()
        if (target === active) return
        if (autoplayTimer) clearTimeout(autoplayTimer)
        pauseAutoplay()
        setActive(target, { focus: true })
        autoplayElapsed = 0
      }

      tab.addEventListener("click", onClick)
      tab.addEventListener("keydown", onKeydown)
      cleanups.push(() => {
        tab.removeEventListener("click", onClick)
        tab.removeEventListener("keydown", onKeydown)
      })
    })

    if (canAutoplay) {
      const onFocusIn = () => {
        autoplayHeld = true
        group.syncAutoplay?.()
      }
      const onFocusOut = () => {
        requestAnimationFrame(() => {
          if (!root.contains(document.activeElement)) {
            autoplayHeld = false
            group.syncAutoplay?.()
          }
        })
      }
      const observer = new IntersectionObserver(
        ([entry]) => {
          const ratio = entry.intersectionRatio
          const leavingTop = entry.boundingClientRect.top < 0
          autoplayInView = leavingTop && ratio <= 0.05 ? false : ratio >= 0.25
          group.syncAutoplay?.()
        },
        { threshold: [0, 0.05, 0.25, 1] },
      )

      resetProgress()
      root.addEventListener("focusin", onFocusIn)
      root.addEventListener("focusout", onFocusOut)
      observer.observe(root)

      cleanups.push(() => {
        root.removeEventListener("focusin", onFocusIn)
        root.removeEventListener("focusout", onFocusOut)
        observer.disconnect()
        if (autoplayTimer) clearTimeout(autoplayTimer)
        cancelAutoplayFrame()
      })
    }
  })

  const onHashChange = () => {
    roots.forEach((root) => {
      const activeTarget = root.querySelector<HTMLElement>(`#${CSS.escape(getHash())}`)
      activeTarget?.scrollIntoView({ block: "start" })
    })
  }

  window.addEventListener("hashchange", onHashChange)
  cleanups.push(() => window.removeEventListener("hashchange", onHashChange))

  return () => {
    cleanups.forEach((cleanup) => cleanup())
  }
}
