import puppeteer from "puppeteer"

async function probe(url, label) {
  const b = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
  const p = await b.newPage()
  await p.setViewport({ width: 1600, height: 900 })
  await p.goto(url, { waitUntil: "networkidle2", timeout: 120000 }).catch(() => {})
  await new Promise((r) => setTimeout(r, 4500))

  const info = await p.evaluate(() => {
    const pick = (el) => {
      if (!el) return null
      const r = el.getBoundingClientRect()
      const cs = getComputedStyle(el)
      return {
        name: el.getAttribute("data-framer-name"),
        tag: el.tagName,
        cls: (el.className || "").toString().slice(0, 90),
        w: Math.round(r.width),
        h: Math.round(r.height),
        t: Math.round(r.top),
        l: Math.round(r.left),
        op: cs.opacity,
        pos: cs.position,
        z: cs.zIndex,
        text: (el.innerText || "").slice(0, 140).replace(/\n/g, " | "),
      }
    }

    const fixed = [...document.querySelectorAll("*")]
      .filter((el) => {
        const cs = getComputedStyle(el)
        const r = el.getBoundingClientRect()
        return (
          (cs.position === "fixed" || cs.position === "sticky") &&
          r.height > 24 &&
          r.width > 80 &&
          r.top < 200
        )
      })
      .slice(0, 12)
      .map(pick)

    const messy = [...document.querySelectorAll("p,h1,h2,h3,h4,h5,h6,a,button,span")]
      .filter((el) => {
        const t = el.textContent || ""
        return /Ahoj|I.?m|Hanza|GET IN TOUCH|START PROJECT|MENU|LOCAL TIME|Designer/i.test(t) && t.length < 180
      })
      .slice(0, 20)
      .map((el) => ({
        tag: el.tagName,
        text: JSON.stringify((el.textContent || "").slice(0, 100)),
        html: el.innerHTML.slice(0, 180),
        op: getComputedStyle(el).opacity,
        tf: getComputedStyle(el).transform.slice(0, 70),
        name: el.getAttribute("data-framer-name") || el.parentElement?.getAttribute("data-framer-name"),
      }))

    const names = [
      ...new Set(
        [...document.querySelectorAll("[data-framer-name]")].map((e) => e.getAttribute("data-framer-name")),
      ),
    ].filter((n) => /nav|menu|cta|button|about|header|touch|project|time/i.test(n || ""))

    return {
      fixed,
      names: names.slice(0, 50),
      messy,
      bodyTop: document.body.innerText.slice(0, 350),
    }
  })

  await p.screenshot({ path: `scripts/_probe-${label}.png`, fullPage: false })
  await p.evaluate(() => {
    const about = document.querySelector('[data-framer-name="Section About"], #home-about')
    about?.scrollIntoView({ behavior: "instant", block: "center" })
  })
  await new Promise((r) => setTimeout(r, 900))
  await p.screenshot({ path: `scripts/_probe-${label}-about.png`, fullPage: false })

  console.log("====", label)
  console.log(JSON.stringify(info, null, 2))
  await b.close()
}

await probe("https://hanza-template.framer.website/", "hanza")
await probe("http://localhost:3000/client", "client")
