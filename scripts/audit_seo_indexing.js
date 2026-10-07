const fs = require('fs');
const path = require('path');

// 1. Collect all app router page files
function getAppPages(dir, baseDir = dir) {
  let pages = [];
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      pages = pages.concat(getAppPages(fullPath, baseDir));
    } else if (item === 'page.tsx' || item === 'page.ts') {
      const relDir = path.relative(baseDir, path.dirname(fullPath)).replace(/\\/g, '/');
      const route = relDir === '' ? '/' : `/${relDir}`;
      pages.push({ route, filePath: fullPath });
    }
  }
  return pages;
}

const appPages = getAppPages(path.resolve('./src/app'));
console.log(`\n========================================`);
console.log(`TOTAL APP ROUTER ROUTES: ${appPages.length}`);
console.log(`========================================\n`);

// 2. Extract redirects from next.config.ts
const nextConfigContent = fs.readFileSync(path.resolve('./next.config.ts'), 'utf8');
const redirectRegex = /{\s*source:\s*["']([^"']+)["'],\s*destination:\s*["']([^"']+)["'],\s*permanent:\s*(true|false),?\s*}/g;
let match;
const redirects = [];
while ((match = redirectRegex.exec(nextConfigContent)) !== null) {
  redirects.push({ source: match[1], destination: match[2], permanent: match[3] === 'true' });
}
console.log(`FOUND ${redirects.length} REDIRECTS IN next.config.ts:`);
redirects.forEach(r => console.log(`  ${r.source} -> ${r.destination} (${r.permanent ? '301' : '307'})`));

// 3. Inspect sitemap.ts
const sitemapContent = fs.readFileSync(path.resolve('./src/app/sitemap.ts'), 'utf8');
const sitemapUrlRegex = /url:\s*`\${BASE_URL}([^`]+)`/g;
const sitemapStaticUrls = [];
while ((match = sitemapUrlRegex.exec(sitemapContent)) !== null) {
  sitemapStaticUrls.push(match[1]);
}
console.log(`\nFOUND ${sitemapStaticUrls.length} STATIC SITEMAP URLS IN src/app/sitemap.ts:`);

// Check for sitemap URLs that are actually redirected!
const redirectedInSitemap = [];
sitemapStaticUrls.forEach(url => {
  const red = redirects.find(r => r.source === url);
  if (red) {
    redirectedInSitemap.push({ url, redirectsTo: red.destination });
  }
});

console.log(`\n⚠️ SITEMAP URLS THAT HAVE REDIRECTS (${redirectedInSitemap.length}):`);
redirectedInSitemap.forEach(r => console.log(`  CRITICAL: Sitemap URL "${r.url}" redirects to "${r.redirectsTo}"`));

// 4. Inspect canonical URLs in page files
console.log(`\n--- AUDITING CANONICAL TAGS AND METADATA IN PAGES ---`);
const canonicalIssues = [];
const missingCanonicals = [];
const nonCanonicalUrls = [];

appPages.forEach(p => {
  const content = fs.readFileSync(p.filePath, 'utf8');
  const hasMetadata = content.includes('export const metadata') || content.includes('generateMetadata') || content.includes('export const generateMetadata');
  const canonicalMatch = content.match(/canonical:\s*["'`]([^"'`]+)["'`]/);
  
  if (!hasMetadata) {
    // Check if layout has metadata
    const layoutPath = path.join(path.dirname(p.filePath), 'layout.tsx');
    if (fs.existsSync(layoutPath)) {
      const layoutContent = fs.readFileSync(layoutPath, 'utf8');
      const layoutCanonMatch = layoutContent.match(/canonical:\s*["'`]([^"'`]+)["'`]/);
      if (!layoutCanonMatch) {
        missingCanonicals.push(p.route);
      }
    } else {
      missingCanonicals.push(p.route);
    }
  } else if (canonicalMatch) {
    const canonVal = canonicalMatch[1];
    // Check for issues: e.g. softree.com vs softreetechnology.com, missing https, non-www vs www
    if (canonVal.includes('softree.com') && !canonVal.includes('softreetechnology.com')) {
      canonicalIssues.push({ route: p.route, issue: `Wrong domain: ${canonVal}` });
    } else if (canonVal.startsWith('http://')) {
      canonicalIssues.push({ route: p.route, issue: `Insecure HTTP: ${canonVal}` });
    } else if (canonVal.includes('softreetechnology.com') && !canonVal.includes('www.softreetechnology.com')) {
      canonicalIssues.push({ route: p.route, issue: `Non-www domain: ${canonVal}` });
    }
  } else {
    missingCanonicals.push(p.route);
  }
});

console.log(`\n❌ CANONICAL DOMAIN/SYNTAX ISSUES (${canonicalIssues.length}):`);
canonicalIssues.forEach(c => console.log(`  ${c.route}: ${c.issue}`));

console.log(`\nℹ️ PAGES WITHOUT EXPLICIT CANONICAL (${missingCanonicals.length}):`);
missingCanonicals.forEach(m => console.log(`  ${m}`));
