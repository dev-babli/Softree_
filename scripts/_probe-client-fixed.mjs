import puppeteer from "puppeteer"

const b = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
const p = await b.newPage()
const errors = []
p.on("pageerror", (e) => errors.push(e.message.slice(0, 200)))
await p.setViewport({ width: 1600, height: 900 })
await p.goto("http://localhost:3000/client", { waitUntil: "domcontentloaded", timeout: 120000 })
await new Promise((r) => setTimeout(r, 4000))

const info = await p.evaluate(() => {
  const top = document.querySelector(".cx-topbar, .framer-1iup1yh-container")
  const ahoj = document.querySelector(".framer-1lsrsdw p")
  const profession = [...document.querySelectorAll("p")].find((el) =>
    /Designer/.test(el.textContent || ""),
  )
  const cs = top ? getComputedStyle(top) : null
  return {
    hasMenu: /MENU/i.test(document.body.innerText),
    hasStart: /START PROJECT/i.test(document.body.innerText),
    hasLocal: /LOCAL TIME/i.test(document.body.innerText),
    ahojText: (ahoj?.innerText || "").slice(0, 120),
    ahojHasSpaces: /\s/.test(ahoj?.innerText || ""),
    profession: profession?.textContent,
    topPos: cs?.position,
    topZ: cs?.zIndex,
    topText: (top?.innerText || "").slice(0, 120).replace(/\n/g, " | "),
    iconUse: document.querySelector('use[href="#3166100823"]') != null,
    iconDef: document.getElementById("3166100823") != null,
  }
})

await p.screenshot({ path: "scripts/_probe-client-fixed.png", fullPage: false })
await p.evaluate(() => {
  document.querySelector('[data-framer-name="Section About"]')?.scrollIntoView({ block: "center" })
})
await new Promise((r) => setTimeout(r, 1200))
const about = await p.evaluate(() => {
  const ahoj = document.querySelector(".framer-1lsrsdw p")
  const spans = [...(ahoj?.querySelectorAll(":scope > span") || [])].slice(0, 5).map((s) => ({
    t: s.textContent,
    op: getComputedStyle(s).opacity,
  }))
  return { ahoj: ahoj?.innerText?.slice(0, 160), spans }
})
await p.screenshot({ path: "scripts/_probe-client-fixed-about.png", fullPage: false })

console.log(JSON.stringify({ info, about, errors: errors.slice(0, 8) }, null, 2))
await b.close()
