import fs from "node:fs"

const h = fs.readFileSync("Softree_/client.html", "utf8")
const og = h.match(/property="og:url" content="([^"]+)"/)
const canon = h.match(/rel="canonical" href="([^"]+)"/)
console.log("og", og?.[1])
console.log("canon", canon?.[1])
const scripts = [...h.matchAll(/src="(https:\/\/framerusercontent\.com\/sites\/[^"]+)"/g)].map((m) => m[1])
console.log("scripts", [...new Set(scripts)].slice(0, 10))
