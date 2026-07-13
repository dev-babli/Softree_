import puppeteer from "puppeteer"
import fs from "node:fs"

async function audit(url, label) {
  const b = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
  const p = await b.newPage()
  const errors = []
  p.on("pageerror", (e) => errors.push(e.message.slice(0, 180)))
  await p.setViewport({ width: 1600, height: 900 })
  await p.goto(url, { waitUntil: "networkidle2", timeout: 120000 }).catch(() => {})
  await new Promise((r) => setTimeout(r, 4500))

  const before = await p.evaluate(() => {
    const sections = [...document.querySelectorAll("[data-framer-name^='Section ']")].map((el) => {
      const r = el.getBoundingClientRect()
      return {
        name: el.getAttribute("data-framer-name"),
        h: Math.round(r.height),
        w: Math.round(r.width),
        top: Math.round(r.top + window.scrollY),
      }
    })
    const fixed = [...document.querySelectorAll("*")]
      .filter((el) => {
        const cs = getComputedStyle(el)
        const r = el.getBoundingClientRect()
        return (cs.position === "fixed" || cs.position === "sticky") && r.height > 20 && r.width > 40
      })
      .slice(0, 15)
      .map((el) => ({
        name: el.getAttribute("data-framer-name"),
        cls: (el.className || "").toString().slice(0, 80),
        text: (el.innerText || "").slice(0, 80).replace(/\n/g, " | "),
        z: getComputedStyle(el).zIndex,
        t: Math.round(el.getBoundingClientRect().top),
        h: Math.round(el.getBoundingClientRect().height),
      }))

    const footerish = [...document.querySelectorAll("footer, [data-framer-name*='Footer'], [data-framer-name*='footer']")]
      .map((el) => ({
        name: el.getAttribute("data-framer-name"),
        tag: el.tagName,
        text: (el.innerText || "").slice(0, 200).replace(/\n/g, " | "),
        h: Math.round(el.getBoundingClientRect().height),
      }))

    // last section text (often footer content lives in blog/nav)
    const lastSections = sections.slice(-3)
    const bodyEnd = document.body.innerText.slice(-800)

    return {
      sections,
      fixed,
      footerish,
      lastSections,
      bodyEnd,
      hasMenuOverlay: !!document.querySelector('[data-framer-name*="Menu"], .framer-11vsk7q, [class*="menu"]'),
      navCount: document.querySelectorAll("nav").length,
      navText: [...document.querySelectorAll("nav")].map((n) => n.innerText.slice(0, 100)),
    }
  })

  await p.screenshot({ path: `scripts/_audit-${label}-top.png`, fullPage: false })

  // Click Menu and see what opens
  const menuClick = await p.evaluate(() => {
    const menu = [...document.querySelectorAll("p,button,div,a")].find(
      (el) => (el.textContent || "").trim() === "Menu" && el.getBoundingClientRect().top < 120,
    )
    if (!menu) return { found: false }
    const target = menu.closest("[data-highlight], button, a, [tabindex]") || menu
    target.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }))
    return {
      found: true,
      tag: target.tagName,
      cls: (target.className || "").toString().slice(0, 100),
      name: target.getAttribute("data-framer-name"),
    }
  })
  await new Promise((r) => setTimeout(r, 800))

  const afterMenu = await p.evaluate(() => {
    const overlays = [...document.querySelectorAll("*")]
      .filter((el) => {
        const cs = getComputedStyle(el)
        const r = el.getBoundingClientRect()
        return (
          (cs.position === "fixed" || Number(cs.zIndex) > 5) &&
          r.width > 400 &&
          r.height > 300 &&
          r.top < 100 &&
          /Home|Portfolio|About|Contact|Blog|404|Menu/i.test(el.innerText || "")
        )
      })
      .slice(0, 8)
      .map((el) => ({
        name: el.getAttribute("data-framer-name"),
        cls: (el.className || "").toString().slice(0, 100),
        text: (el.innerText || "").slice(0, 150).replace(/\n/g, " | "),
        op: getComputedStyle(el).opacity,
        vis: getComputedStyle(el).visibility,
        disp: getComputedStyle(el).display,
        z: getComputedStyle(el).zIndex,
      }))
    return {
      bodyHasNavLinks: /Home[\s\S]*Portfolio[\s\S]*About/i.test(document.body.innerText),
      overlays,
    }
  })
  await p.screenshot({ path: `scripts/_audit-${label}-menu.png`, fullPage: false })

  // Scroll to bottom for footer
  await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await new Promise((r) => setTimeout(r, 1000))
  await p.screenshot({ path: `scripts/_audit-${label}-bottom.png`, fullPage: false })

  const bottom = await p.evaluate(() => {
    const visible = [...document.querySelectorAll("section, footer, nav, [data-framer-name]")]
      .filter((el) => {
        const r = el.getBoundingClientRect()
        return r.top < window.innerHeight && r.bottom > 0 && r.height > 40
      })
      .slice(0, 20)
      .map((el) => ({
        name: el.getAttribute("data-framer-name"),
        tag: el.tagName,
        text: (el.innerText || "").slice(0, 100).replace(/\n/g, " | "),
        h: Math.round(el.getBoundingClientRect().height),
      }))
    return {
      scrollH: document.body.scrollHeight,
      visible,
      endText: document.body.innerText.slice(-500),
    }
  })

  const out = { label, menuClick, before, afterMenu, bottom, errors: errors.slice(0, 10) }
  fs.writeFileSync(`scripts/_audit-${label}.json`, JSON.stringify(out, null, 2))
  console.log("====", label)
  console.log(JSON.stringify({
    sections: before.sections.map((s) => s.name + ":" + s.h),
    fixed: before.fixed.map((f) => f.cls.slice(0, 40) + " | " + f.text.slice(0, 40)),
    footerish: before.footerish,
    menuClick,
    afterMenuOverlays: afterMenu.overlays.length,
    afterMenuSample: afterMenu.overlays[0],
    bottomVisible: bottom.visible.map((v) => v.name || v.tag),
    endText: bottom.endText.slice(0, 300),
    errors: errors.slice(0, 5),
  }, null, 2))
  await b.close()
}

await audit("https://hanza-template.framer.website/", "hanza")
await audit("http://localhost:3000/client", "client")
