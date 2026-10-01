const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '../src/app/services/ai-development-services');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;

  // 1. Replace image extensions for specific paths we converted
  const regexPaths = /(["'`])(\/images\/(?:serve|ai-development-services|ai-development-service)\/.*?)\.(png|jpg|jpeg)(["'`])/gi;
  content = content.replace(regexPaths, (match, p1, p2, p3, p4) => {
    return `${p1}${p2}.webp${p4}`;
  });

  const logoRegex = /(["'`])(\/logo\/Softree-Technology-Final-Logo-Dark-BG)\.(png)(["'`])/gi;
  content = content.replace(logoRegex, (match, p1, p2, p3, p4) => {
    return `${p1}${p2}.webp${p4}`; 
  });

  // 2. Add loading="lazy" to raw <img> tags if missing
  const imgRegex = /<img\s+(?![^>]*loading=["']lazy["'])((?:[^>](?!loading=))*)>/gi;
  content = content.replace(imgRegex, '<img loading="lazy" $1>');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${filePath}`);
  }
}

function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (/\.(ts|tsx)$/.test(fullPath)) {
      processFile(fullPath);
    }
  }
}

processDirectory(DIR);
console.log('Component references updated.');
