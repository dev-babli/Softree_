import fs from "node:fs"

const blogPath = "src/components/client-exact/sections/BlogSection.tsx"
let blog = fs.readFileSync(blogPath, "utf8")

const blogReplacements = [
  [
    /srcSet="https:\/\/framerusercontent\.com\/images\/lwpit2bNgoGUzyqkdPw3jyiPI\.webp[^"]*"\s*/g,
    "",
  ],
  [
    'src="https://framerusercontent.com/images/lwpit2bNgoGUzyqkdPw3jyiPI.webp?width=1800&height=1800"',
    'src="/client/blog-post-1.jpg"',
  ],
  [
    /srcSet="https:\/\/framerusercontent\.com\/images\/0UkNZE7S4qruVsivS70eDa2fsHk\.webp[^"]*"\s*/g,
    "",
  ],
  [
    'src="https://framerusercontent.com/images/0UkNZE7S4qruVsivS70eDa2fsHk.webp?width=1800&height=2400"',
    'src="/client/blog-post-2.jpg"',
  ],
  [
    /srcSet="https:\/\/framerusercontent\.com\/images\/XKNn5wdz0oZLzNZE43UWd43s3x0\.webp[^"]*"\s*/g,
    "",
  ],
  [
    'src="https://framerusercontent.com/images/XKNn5wdz0oZLzNZE43UWd43s3x0.webp?width=1800&height=1800"',
    'src="/client/blog-post-3.jpg"',
  ],
  [
    /srcSet="https:\/\/framerusercontent\.com\/images\/P6MzQfBdpMKaZclGPIFk31ogUus\.webp[^"]*"\s*/g,
    "",
  ],
  [
    'src="https://framerusercontent.com/images/P6MzQfBdpMKaZclGPIFk31ogUus.webp?width=1800&height=2400"',
    'src="/client/blog-post-4.jpg"',
  ],
  ['alt="Preview Image"', 'alt="Blog post preview"'],
  ['objectFit: "contain"', 'objectFit: "cover"'],
]

for (const [a, b] of blogReplacements) {
  blog = blog.replace(a, b)
}

if (!blog.includes('id="home-blog"')) {
  blog = blog.replace(
    '<section className="framer-198bpft"',
    '<section className="framer-198bpft" id="home-blog"',
  )
}

fs.writeFileSync(blogPath, blog)

const menuPath = "src/components/client-exact/sections/MenuPanel.tsx"
let menu = fs.readFileSync(menuPath, "utf8")
menu = menu.replace(
  /srcSet="https:\/\/framerusercontent\.com\/images\/OBhRqYnNhzprFbDXTmYz6oMBA\.webp[^"]*"\s*/g,
  "",
)
menu = menu.replace(
  'src="https://framerusercontent.com/images/OBhRqYnNhzprFbDXTmYz6oMBA.webp?width=2560&height=1440"',
  'src="/client/industry-wide-bfsi.jpg"',
)
menu = menu.replace(
  /srcSet="https:\/\/framerusercontent\.com\/images\/L2rXxsYb7zPRivbHPp3oRsvjWxE\.webp[^"]*"\s*/g,
  "",
)
menu = menu.replace(
  'src="https://framerusercontent.com/images/L2rXxsYb7zPRivbHPp3oRsvjWxE.webp?width=2560&height=1440"',
  'src="/client/industry-wide-mfg.jpg"',
)
fs.writeFileSync(menuPath, menu)

console.log("fixed blog + menu images")
