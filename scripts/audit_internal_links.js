const fs = require('fs');
const path = require('path');

// Read all tsx/ts files in src
function getAllFiles(dir, exts = ['.tsx', '.ts', '.jsx', '.js']) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (item !== 'node_modules' && item !== '.next') {
        results = results.concat(getAllFiles(full, exts));
      }
    } else {
      if (exts.includes(path.extname(item))) {
        results.push(full);
      }
    }
  }
  return results;
}

// 1. Collect all app router valid paths
function getAppRoutes(dir = path.resolve('./src/app'), baseDir = dir) {
  let routes = new Set(['/']);
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      const subRoutes = getAppRoutes(fullPath, baseDir);
      subRoutes.forEach(r => routes.add(r));
    } else if (item === 'page.tsx' || item === 'page.ts') {
      const relDir = path.relative(baseDir, path.dirname(fullPath)).replace(/\\/g, '/');
      const route = relDir === '' ? '/' : `/${relDir}`;
      routes.add(route);
    }
  }
  return routes;
}

const validRoutes = getAppRoutes();

// Next.config redirects & rewrites
const nextConfigContent = fs.readFileSync(path.resolve('./next.config.ts'), 'utf8');
const redirectRegex = /{\s*source:\s*["']([^"']+)["'],\s*destination:\s*["']([^"']+)["'],\s*permanent:\s*(true|false),?\s*}/g;
let match;
const redirects = [];
while ((match = redirectRegex.exec(nextConfigContent)) !== null) {
  redirects.push({ source: match[1], destination: match[2], permanent: match[3] === 'true' });
}

console.log(`Found ${validRoutes.size} actual page routes in src/app`);

// Scan all source files for internal links
const allSourceFiles = getAllFiles(path.resolve('./src'));
const linkRegex = /href=["'](\/[^"'#?]*)["'?#]/g;
const linksFound = new Map(); // link -> [files where it appeared]

allSourceFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = linkRegex.exec(content)) !== null) {
    const target = m[1];
    // Ignore api and static assets
    if (target.startsWith('/api') || target.startsWith('/images') || target.startsWith('/icons') || target.startsWith('/logo') || target.startsWith('/og') || target.endsWith('.png') || target.endsWith('.svg') || target.endsWith('.webp') || target.endsWith('.jpg') || target.endsWith('.mp4') || target.endsWith('.pdf')) {
      continue;
    }
    if (!linksFound.has(target)) {
      linksFound.set(target, []);
    }
    const relFile = path.relative(path.resolve('.'), file).replace(/\\/g, '/');
    if (!linksFound.get(target).includes(relFile)) {
      linksFound.get(target).push(relFile);
    }
  }
});

console.log(`\nFound ${linksFound.size} unique internal navigation links across src/`);

const brokenLinks = [];
const redirectLinks = [];
const dynamicRoutes = ['/blog/', '/case-studies/', '/p/'];

linksFound.forEach((files, link) => {
  // Check if link is a redirect
  const red = redirects.find(r => r.source === link);
  if (red) {
    redirectLinks.push({ link, destination: red.destination, files });
    return;
  }
  
  // Check if link directly matches a valid route
  if (validRoutes.has(link)) {
    return;
  }
  
  // Check if link matches dynamic route prefix
  const isDynamic = dynamicRoutes.some(d => link.startsWith(d) && link.length > d.length);
  if (isDynamic) {
    return;
  }

  brokenLinks.push({ link, files });
});

console.log(`\n⚠️ INTERNAL LINKS POINTING TO REDIRECTS (${redirectLinks.length}):`);
redirectLinks.forEach(r => {
  console.log(`  "${r.link}" -> REDIRECTS TO "${r.destination}"`);
  console.log(`    Found in: ${r.files.slice(0, 3).join(', ')}${r.files.length > 3 ? ' (+' + (r.files.length - 3) + ' more)' : ''}`);
});

console.log(`\n❌ POTENTIALLY BROKEN INTERNAL LINKS (404s) (${brokenLinks.length}):`);
brokenLinks.forEach(b => {
  console.log(`  "${b.link}"`);
  console.log(`    Found in: ${b.files.slice(0, 3).join(', ')}${b.files.length > 3 ? ' (+' + (b.files.length - 3) + ' more)' : ''}`);
});
