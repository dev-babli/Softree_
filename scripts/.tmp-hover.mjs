import fs from 'node:fs';

const assetsSrc = fs.readFileSync('src/components/softree-marketing-ui/assets.ts', 'utf8');
const entryRe = /"([^"]+)":\s*\{\s*kind:\s*"(?:cdn-passthrough|local)",\s*url:\s*"([^"]+)",/g;
const byUrl = new Map();
let m;
while ((m = entryRe.exec(assetsSrc)) !== null) {
    byUrl.set(m[2], m[1]);
}

const dataImgs = [
    'https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6995c91deb819e1f8addcbd3_d756428fc7dc918582cfbdcd37e9b226_Banking%20Guide.webp',
    'https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6995c91d3f323ea9470d6de5_aca0a5c70b4821d2787e22d0b0b0790a_Healthcare%20Guide.webp',
    'https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6995c91dfd5b7b2c603989c6_3aa20f01a358284b496dcc9bccd47bd0_Retail%20Guide.webp',
    'https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c937f8dd12b13380ffe842_Choosing-GenAI-Platform.webp',
    'https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c92f043432c6dd415b5762_Forrester-Wave-for-CX-Leadership.webp',
    'https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c921a54acd20be92d340b6_Scale-Enterprise-with-AI-Agents.webp',
];

for (const u of dataImgs) {
    const key = byUrl.get(u);
    console.log((key ? 'FOUND ' : 'MISS  ') + (key || '') + '  <-  ' + u.split('/').pop());
}

// Also report which section each found key lives in
console.log('\n--- section scan for found keys ---');
for (const u of dataImgs) {
    const key = byUrl.get(u);
    if (!key) continue;
    const idx = assetsSrc.indexOf('"' + key + '"');
    // find nearest preceding top-level section label
    const before = assetsSrc.slice(0, idx);
    const secMatch = [...before.matchAll(/^\s{4}(\w+):\s*\{$/gm)].pop();
    console.log(key + '  ->  section: ' + (secMatch ? secMatch[1] : '??'));
}
