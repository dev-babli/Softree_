const css = await fetch(
  "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/css/vovi-starter-9d8b21f567cf-f7c28d5917abe.shared.a651666e8.min.css",
).then((r) => r.text())

const patterns = [
  /\[data-scroll\][^{]*\{[^}]+\}/g,
  /\[data-scroll\]:not\(\.on\)[^{]*\{[^}]+\}/g,
  /\[data-stagger\][^{]*\{[^}]+\}/g,
  /\[data-flip-target\][^{]*\{[^}]+\}/g,
  /\.k2-section-hero[^{]*\{[^}]+\}/g,
  /\.k2-container-hero[^{]*\{[^}]+\}/g,
]

for (const re of patterns) {
  const hits = css.match(re) ?? []
  console.log(`\n=== ${re.source.slice(0, 40)} (${hits.length}) ===`)
  hits.slice(0, 15).forEach((h) => console.log(h))
}
