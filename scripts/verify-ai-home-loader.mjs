import { AI_HOME_LOADER_HTML, AI_HOME_LOADER_TIMINGS } from "../src/components/softree-ai-home/loaderContent.ts"

const total =
  AI_HOME_LOADER_TIMINGS.t0 +
  AI_HOME_LOADER_TIMINGS.tLogo1 +
  AI_HOME_LOADER_TIMINGS.tBetween +
  AI_HOME_LOADER_TIMINGS.tLogo2 +
  AI_HOME_LOADER_TIMINGS.tHtmlAfter

if (!AI_HOME_LOADER_HTML.includes('class="loader"')) {
  console.error("FAIL: loader HTML missing .loader root")
  process.exit(1)
}
if (!AI_HOME_LOADER_HTML.includes("softree-logo-1") || !AI_HOME_LOADER_HTML.includes("softree-logo-2")) {
  console.error("FAIL: loader HTML missing logo stages")
  process.exit(1)
}
if (AI_HOME_LOADER_TIMINGS.tLogo1 !== 700 || AI_HOME_LOADER_TIMINGS.tLogo2 !== 700) {
  console.error("FAIL: loader timings do not match reference defaults")
  process.exit(1)
}

console.log("OK: AI home loader extracted")
console.log("  stages: softree-logo-1 → softree-logo-2")
console.log("  active sequence ~", total, "ms (+", AI_HOME_LOADER_TIMINGS.tBotDelay, "ms bot delay)")
