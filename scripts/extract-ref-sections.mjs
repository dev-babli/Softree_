import fs from "node:fs"

const t = fs.readFileSync("src/components/softree-agentic-exact/referenceContent.ts", "utf8")
for (const name of ["SoftreeAgenticAgentsSection", "SoftreeAgenticProgrammableSection", "SoftreeAgenticPillarsSection"]) {
  const re = new RegExp(`name: "${name}"[\\s\\S]*?html: "([\\s\\S]*?)"\\s*\\}`, "m")
  const m = t.match(re)
  if (!m) {
    console.log(name, "NOT FOUND")
    continue
  }
  const html = m[1].replace(/\\n/g, "\n").replace(/\\"/g, '"').replace(/\\u2122/g, "™")
  fs.writeFileSync(`.planning/page-forge/softree-agentic-exact/ref-${name}.html`, html.slice(0, 8000))
  console.log(name, "bytes", html.length)
}
