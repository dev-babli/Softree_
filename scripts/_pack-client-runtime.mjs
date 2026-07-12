import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const runtimeDir = path.join(root, "src/components/client-exact/runtime")

function toTsStringModule(name, code) {
  return `/* auto-generated — do not edit */\nexport default ${JSON.stringify(code)} as string\n`
}

const animator = fs.readFileSync(path.join(runtimeDir, "animator.js"), "utf8")
const runner = fs.readFileSync(path.join(runtimeDir, "appear-runner.js"), "utf8")
fs.writeFileSync(path.join(runtimeDir, "animator.ts"), toTsStringModule("animator", animator))
fs.writeFileSync(path.join(runtimeDir, "appear-runner.ts"), toTsStringModule("runner", runner))

// appear-content.json and breakpoints.json already JSON — ensure valid
const appear = fs.readFileSync(path.join(runtimeDir, "appear-content.json"), "utf8")
const bp = fs.readFileSync(path.join(runtimeDir, "breakpoints.json"), "utf8")
JSON.parse(appear)
JSON.parse(bp)
console.log("runtime ts modules ok", animator.length, runner.length, appear.length, bp.length)
