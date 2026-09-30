const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const directories = [
  'public/images/case-study/power-apps',
  'public/images/case-study/home',
  'public/images/ai-consulting-service-image/success-stories',
  'public/images/power-apps'
];

async function convertImages() {
  for (const dir of directories) {
    const fullDirPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(fullDirPath)) {
      console.log(`Directory does not exist: ${fullDirPath}`);
      continue;
    }

    const files = fs.readdirSync(fullDirPath);
    for (const file of files) {
      if (file.endsWith('.png') || file.endsWith('.jpg')) {
        const filePath = path.join(fullDirPath, file);
        const ext = path.extname(file);
        const webpFilePath = path.join(fullDirPath, file.replace(ext, '.webp'));
        
        if (!fs.existsSync(webpFilePath)) {
          console.log(`Converting ${file} to .webp...`);
          try {
            await sharp(filePath)
              .webp({ quality: 80 })
              .toFile(webpFilePath);
            console.log(`Successfully converted ${file} to .webp`);
          } catch (err) {
            console.error(`Failed to convert ${file}:`, err);
          }
        } else {
          console.log(`${webpFilePath} already exists, skipping.`);
        }
      }
    }
  }
  console.log('Finished converting images.');
}

convertImages();
