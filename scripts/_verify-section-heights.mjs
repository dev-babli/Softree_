import puppeteer from "puppeteer"
import fs from "node:fs"

async function measure(url, label) {
  const b = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
  const p = await b.newPage()
  await p.setViewport({ width: 1600, height: 900 })
  await p.goto(url, { waitUntil: "networkidle2", timeout: 120000 })
  await new Promise((r) => setTimeout(r, 4500))
  const data = await p.evaluate(() => {
    const sections = [...document.querySelectorAll("[data-framer-name^='Section ']")]
      .map((el) => {
        const r = el.getBoundingClientRect()
        return {
          name: el.getAttribute("data-framer-name"),
          h: Math.round(r.height),
          top: Math.round(r.top + window.scrollY),
        }
      })
    const footer = document.querySelector("footer")
    const fr = footer?.getBoundingClientRect()
    return {
      sections,
      footerH: fr ? Math.round(fr.height) : 0,
      scrollH: document.body.scrollHeight,
    }
  })
  await b.close()
  return { label, ...data }
}

const client = await measure("http://localhost:3000/client", "client")
const hanza = await measure("https://hanza-template.framer.website/", "hanza")

const byName = Object.fromEntries(hanza.sections.map((s) => [s.name, s]))
const cmp = client.sections.map((s) => {
  const h = byName[s.name]
  return {
    name: s.name,
    clientH: s.h,
    hanzaH: h?.h ?? null,
    delta: h ? s.h - h.h : null,
  }
})
cmp.push({
  name: "FOOTER",
  clientH: client.footerH,
  hanzaH: hanza.footerH,
  delta: client.footerH - hanza.footerH,
})

const out = {
  clientScroll: client.scrollH,
  hanzaScroll: hanza.scrollH,
  cmp,
}
fs.writeFileSync("scripts/_verify-section-heights.json", JSON.stringify(out, null, 2))
console.log(JSON.stringify(out, null, 2))
