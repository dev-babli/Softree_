const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const DIRS = [
  path.join(__dirname, '../public/images/serve'),
  path.join(__dirname, '../public/images/ai-development-services'),
  path.join(__dirname, '../public/images/ai-development-service')
];

async function convertDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`Directory does not exist: ${dir}`);
    return;
  }
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      await convertDirectory(fullPath);
    } else if (/\.(jpg|jpeg|png)$/i.test(fullPath)) {
      const ext = path.extname(fullPath);
      const webpPath = fullPath.replace(new RegExp(`${ext}$`, 'i'), '.webp');
      if (!fs.existsSync(webpPath)) {
        console.log(`Converting ${fullPath} to .webp`);
        await sharp(fullPath).webp({ quality: 82 }).toFile(webpPath);
      }
    }
  }
}

async function main() {
  for (const dir of DIRS) {
    await convertDirectory(dir);
  }
  console.log('Conversion complete.');
}

main().catch(console.error);
