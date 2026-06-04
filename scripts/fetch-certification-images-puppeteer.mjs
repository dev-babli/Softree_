import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "images", "certifications");

const FILES = [
  ["stpi.webp", "https://www.softreetechnology.com/wp-content/uploads/2024/12/STPI.webp"],
  [
    "startup-india.webp",
    "https://www.softreetechnology.com/wp-content/uploads/2024/12/startupindia.webp",
  ],
  ["mcpd.webp", "https://www.softreetechnology.com/wp-content/uploads/2024/12/MCPD.webp"],
  ["mcts.webp", "https://www.softreetechnology.com/wp-content/uploads/2024/12/MCTS.webp"],
  [
    "iso-9001-2015.webp",
    "https://www.softreetechnology.com/wp-content/uploads/2024/12/ISO-9001-2015.webp",
  ],
  [
    "iso-27001-2022.webp",
    "https://www.softreetechnology.com/wp-content/uploads/2024/12/ISO-27001-2022.webp",
  ],
];

fs.mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setUserAgent(
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
);
await page.goto("https://www.softreetechnology.com/", {
  waitUntil: "domcontentloaded",
  timeout: 60000,
});

let failed = 0;
for (const [filename, url] of FILES) {
  const response = await page.goto(url, { waitUntil: "load", timeout: 60000 });
  const status = response?.status() ?? 0;
  const contentType = response?.headers()["content-type"] ?? "";
  const buffer = response ? await response.buffer() : Buffer.alloc(0);
  const isImage =
    contentType.startsWith("image/") ||
    (buffer.length > 500 && buffer[0] === 0x52 && buffer[1] === 0x49); // RIFF/webp

  if (status === 200 && isImage) {
    fs.writeFileSync(path.join(outDir, filename), buffer);
    console.log(`OK  ${filename} (${buffer.length} bytes, ${contentType})`);
  } else {
    console.error(
      `FAIL ${filename} HTTP ${status} (${buffer.length} bytes, ${contentType})`
    );
    failed++;
  }
}

await browser.close();
process.exit(failed > 0 ? 1 : 0);
