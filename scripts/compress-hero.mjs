import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const HERO_DIR = path.join(__dirname, "../public/hero");

const images = [
  "hero_BG.png",
  "hero_subject.png",
  "hero_subject_wide.png",
  "reference.png"
];

async function compress() {
  console.log("🚀 Starting Hero image compression to WebP...");
  for (const img of images) {
    const inputPath = path.join(HERO_DIR, img);
    if (!existsSync(inputPath)) {
      console.log(`⚠️ Skip: ${img} not found.`);
      continue;
    }
    const outputPath = path.join(HERO_DIR, img.replace(".png", ".webp"));
    
    console.log(`Converting ${img} → ${path.basename(outputPath)}...`);
    try {
      const info = await sharp(inputPath)
        .webp({ quality: 80, effort: 6 })
        .toFile(outputPath);
      console.log(`✅ Success! Compressed to ${info.size} bytes (quality: 80).`);
    } catch (err) {
      console.error(`❌ Error compressing ${img}:`, err);
    }
  }
  console.log("🏁 All image compressions complete.");
}

compress();
