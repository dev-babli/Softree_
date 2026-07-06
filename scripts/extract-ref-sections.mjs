import fs from "node:fs"

const t = fs.readFileSync("src/components/kore-ai-exact/referenceContent.ts", "utf8")
for (const name of ["KoreAiAgentsSection", "KoreAiProgrammableSection", "KorePillarsSection"]) {
  const re = new RegExp(`name: "${name}"[\\s\\S]*?html: "([\\s\\S]*?)"\\s*\\}`, "m")
  const m = t.match(re)
  if (!m) {
    console.log(name, "NOT FOUND")
    continue
  }
  const html = m[1].replace(/\\n/g, "\n").replace(/\\"/g, '"').replace(/\\u2122/g, "™")
  fs.writeFileSync(`.planning/page-forge/kore-ai-exact/ref-${name}.html`, html.slice(0, 8000))
  console.log(name, "bytes", html.length)
}
