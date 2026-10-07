const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();

const IGNORE_DIRS = new Set([
  'node_modules',
  '.next',
  '.git',
  '.gemini',
  '.agents',
  'dist',
  'build',
  '.vscode',
  '.idea',
  'coverage'
]);

const IGNORE_FILES = new Set([
  'package-lock.json',
  'yarn.lock',
  'pnpm-lock.yaml',
  'npm-debug.log'
]);

function getAllFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (IGNORE_DIRS.has(file)) continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath));
    } else {
      if (!IGNORE_FILES.has(file)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

const allProjectFiles = getAllFiles(rootDir);

// 1. Separate code/markup/config files from media assets
const ASSET_EXTENSIONS = new Set([
  '.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif', '.mp4', '.webm', '.ogg',
  '.ico', '.pdf', '.avif', '.woff', '.woff2', '.ttf', '.eot', '.mp3', '.wav'
]);

const CODE_EXTENSIONS = new Set([
  '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.json', '.css', '.scss', '.sass',
  '.html', '.md', '.mdx', '.yaml', '.yml'
]);

const publicAssets = [];
const srcAssets = [];
const codeFiles = [];

for (const f of allProjectFiles) {
  const rel = path.relative(rootDir, f).replace(/\\/g, '/');
  const ext = path.extname(f).toLowerCase();

  if (rel.startsWith('public/')) {
    if (ASSET_EXTENSIONS.has(ext)) {
      publicAssets.push({ fullPath: f, relPath: rel, publicRel: rel.replace(/^public\//, ''), ext });
    }
  } else if (rel.startsWith('src/') && ASSET_EXTENSIONS.has(ext)) {
    srcAssets.push({ fullPath: f, relPath: rel, ext });
  }

  if (CODE_EXTENSIONS.has(ext) && !rel.startsWith('scripts/audit_unused')) {
    codeFiles.push({ fullPath: f, relPath: rel });
  }
}

console.log(`Found ${codeFiles.length} code files to search.`);
console.log(`Found ${publicAssets.length} public media assets.`);
console.log(`Found ${srcAssets.length} src media assets.`);

// Preload all code file contents into memory
const codeContents = [];
for (const c of codeFiles) {
  try {
    const text = fs.readFileSync(c.fullPath, 'utf8');
    codeContents.push({ relPath: c.relPath, text });
  } catch (err) {
    console.error(`Failed reading ${c.relPath}:`, err.message);
  }
}

// Check unused public assets
const unusedPublicAssets = [];
const usedPublicAssets = [];

for (const asset of publicAssets) {
  const filename = path.basename(asset.fullPath);
  const pathWithSlash = '/' + asset.publicRel;
  const pathNoSlash = asset.publicRel;
  
  // Also handle URL encoded versions
  const encodedPath = encodeURI(pathWithSlash);
  const encodedPathNoSlash = encodeURI(pathNoSlash);

  let isUsed = false;
  let matches = [];

  for (const code of codeContents) {
    // We shouldn't match public json files referencing themselves unless they are data
    if (
      code.text.includes(pathWithSlash) ||
      code.text.includes(pathNoSlash) ||
      code.text.includes(encodedPath) ||
      code.text.includes(encodedPathNoSlash) ||
      (filename.length > 5 && code.text.includes(filename))
    ) {
      isUsed = true;
      matches.push(code.relPath);
      break;
    }
  }

  const stat = fs.statSync(asset.fullPath);
  const assetInfo = {
    relPath: asset.relPath,
    publicRel: asset.publicRel,
    filename,
    size: stat.size,
    ext: asset.ext
  };

  if (isUsed) {
    usedPublicAssets.push(assetInfo);
  } else {
    unusedPublicAssets.push(assetInfo);
  }
}

// Check unused src assets
const unusedSrcAssets = [];
const usedSrcAssets = [];

for (const asset of srcAssets) {
  const filename = path.basename(asset.fullPath);
  const basenameNoExt = path.parse(filename).name;
  let isUsed = false;

  for (const code of codeContents) {
    if (code.relPath === asset.relPath) continue;
    if (code.text.includes(filename) || code.text.includes(basenameNoExt)) {
      isUsed = true;
      break;
    }
  }

  const stat = fs.statSync(asset.fullPath);
  const assetInfo = {
    relPath: asset.relPath,
    filename,
    size: stat.size,
    ext: asset.ext
  };

  if (isUsed) {
    usedSrcAssets.push(assetInfo);
  } else {
    unusedSrcAssets.push(assetInfo);
  }
}

// 2. Check for potentially unused TS/TSX/JS/JSX components/files in src/
const nextjsSpecialFiles = new Set([
  'page.tsx', 'page.ts', 'page.jsx', 'page.js',
  'layout.tsx', 'layout.ts', 'layout.jsx', 'layout.js',
  'loading.tsx', 'loading.ts',
  'error.tsx', 'error.ts',
  'not-found.tsx', 'not-found.ts',
  'global-error.tsx', 'global-error.ts',
  'template.tsx', 'template.ts',
  'default.tsx', 'default.ts',
  'route.ts', 'route.js',
  'sitemap.ts', 'sitemap.js',
  'robots.ts', 'robots.js',
  'manifest.ts', 'manifest.js',
  'middleware.ts', 'middleware.js'
]);

const srcCodeFiles = codeFiles.filter(f => f.relPath.startsWith('src/') && /\.(tsx|ts|jsx|js)$/.test(f.relPath));
const unusedCodeFiles = [];

for (const srcFile of srcCodeFiles) {
  const filename = path.basename(srcFile.fullPath);
  const nameNoExt = path.parse(filename).name;
  
  // Next.js App router special files are entry points
  if (nextjsSpecialFiles.has(filename)) {
    continue;
  }

  // Check if this file is imported anywhere
  let isImported = false;
  // Patterns to match:
  // import ... from '@/...' or from './...' or from '../...'
  const relFromSrc = srcFile.relPath.replace(/^src\//, '');
  const relNoExt = relFromSrc.replace(/\.(tsx|ts|jsx|js)$/, '');
  const relWithIndex = relNoExt.endsWith('/index') ? relNoExt.replace(/\/index$/, '') : null;

  for (const code of codeContents) {
    if (code.relPath === srcFile.relPath) continue;

    if (
      code.text.includes(filename) ||
      code.text.includes(`/${nameNoExt}`) ||
      code.text.includes(`@/${relNoExt}`) ||
      (relWithIndex && code.text.includes(`@/${relWithIndex}`)) ||
      code.text.includes(nameNoExt)
    ) {
      isImported = true;
      break;
    }
  }

  if (!isImported) {
    unusedCodeFiles.push(srcFile.relPath);
  }
}

// Group unused public assets by directory
const groupedUnused = {};
for (const item of unusedPublicAssets) {
  const dir = path.dirname(item.publicRel);
  if (!groupedUnused[dir]) groupedUnused[dir] = [];
  groupedUnused[dir].push(item);
}

const totalUnusedPublicSize = unusedPublicAssets.reduce((sum, a) => sum + a.size, 0);
const totalPublicSize = [...publicAssets, ...srcAssets].reduce((sum, a) => sum + fs.statSync(a.fullPath).size, 0);

const result = {
  summary: {
    totalPublicAssets: publicAssets.length,
    usedPublicAssets: usedPublicAssets.length,
    unusedPublicAssets: unusedPublicAssets.length,
    totalUnusedPublicSizeMB: (totalUnusedPublicSize / (1024 * 1024)).toFixed(2),
    totalPublicSizeMB: (totalPublicSize / (1024 * 1024)).toFixed(2),
    unusedSrcAssetsCount: unusedSrcAssets.length,
    potentiallyUnusedCodeFilesCount: unusedCodeFiles.length
  },
  groupedUnusedPublic: groupedUnused,
  unusedSrcAssets: unusedSrcAssets,
  potentiallyUnusedCodeFiles: unusedCodeFiles
};

fs.writeFileSync('scripts/unused_audit_results.json', JSON.stringify(result, null, 2));

console.log('\n=========================================');
console.log('AUDIT COMPLETED');
console.log('=========================================');
console.log(`Total Public Assets: ${publicAssets.length}`);
console.log(`Used Public Assets:  ${usedPublicAssets.length}`);
console.log(`Unused Public Assets: ${unusedPublicAssets.length} (${(totalUnusedPublicSize / (1024 * 1024)).toFixed(2)} MB)`);
console.log(`Unused Src Assets:    ${unusedSrcAssets.length}`);
console.log(`Potentially Unused Code Files: ${unusedCodeFiles.length}`);
console.log('\nTop folders with unused assets:');

const sortedDirs = Object.entries(groupedUnused)
  .map(([dir, items]) => ({
    dir,
    count: items.length,
    sizeMB: (items.reduce((s, i) => s + i.size, 0) / (1024 * 1024)).toFixed(2)
  }))
  .sort((a, b) => b.count - a.count);

for (const d of sortedDirs.slice(0, 20)) {
  console.log(` - ${d.dir === '.' ? 'root (/)' : d.dir}: ${d.count} files (${d.sizeMB} MB)`);
}
