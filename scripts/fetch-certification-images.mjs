import https from "node:https";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dir = path.join(root, "public", "images", "certifications");

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

function fetchBuffer(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.request(
      {
        hostname: u.hostname,
        path: u.pathname + u.search,
        method: "GET",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
          Referer: "https://www.softreetechnology.com/",
          "Accept-Language": "en-US,en;q=0.9",
        },
      },
      (res) => {
        if (
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location &&
          redirects < 5
        ) {
          const next = new URL(res.headers.location, url).href;
          res.resume();
          fetchBuffer(next, redirects + 1).then(resolve).catch(reject);
          return;
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () =>
          resolve({ status: res.statusCode ?? 0, body: Buffer.concat(chunks) })
        );
      }
    );
    req.on("error", reject);
    req.end();
  });
}

fs.mkdirSync(dir, { recursive: true });

let failed = 0;
for (const [name, url] of FILES) {
  const out = path.join(dir, name);
  try {
    const { status, body } = await fetchBuffer(url);
    if (status === 200 && body.length > 500) {
      fs.writeFileSync(out, body);
      console.log(`OK  ${name} (${body.length} bytes)`);
    } else {
      console.error(`FAIL ${name} HTTP ${status} (${body.length} bytes)`);
      failed++;
    }
  } catch (err) {
    console.error(`FAIL ${name}`, err.message);
    failed++;
  }
}

process.exit(failed > 0 ? 1 : 0);
