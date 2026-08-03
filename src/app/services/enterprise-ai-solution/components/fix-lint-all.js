const fs = require('fs');
const path = require('path');

const replacements = {
  'ease-\\[var\\(--legacy-ease-0_4_0_0_2_1\\)\\]': 'ease-(--legacy-ease-0_4_0_0_2_1)',
  'bg-gradient-to-b': 'bg-linear-to-b',
  'bg-gradient-to-r': 'bg-linear-to-r',
  'bg-gradient-to-br': 'bg-linear-to-br',
  'flex-shrink-0': 'shrink-0',
  'max-w-\\[1400px\\]': 'max-w-350',
  'h-\\[3px\\]': 'h-0.75',
  'rounded-\\[32px\\]': 'rounded-4xl',
  'max-w-\\[520px\\]': 'max-w-130',
  'w-\\[400px\\]': 'w-100',
  'h-\\[400px\\]': 'h-100',
  'w-\\[500px\\]': 'w-125',
  'h-\\[500px\\]': 'h-125',
  'max-w-\\[85rem\\]': 'max-w-340',
  'flex-grow': 'grow',
  'min-h-\\[250px\\]': 'min-h-62.5',
  'lg:min-h-\\[300px\\]': 'lg:min-h-75',
  'break-words': 'wrap-break-word',
  'max-w-\\[300px\\]': 'max-w-75',
  'top-\\[120px\\]': 'top-30',
  'rounded-\\[24px\\]': 'rounded-3xl',
  '-inset-\\[3px\\]': '-inset-0.75',
  '-inset-\\[2px\\]': '-inset-0.5',
  'h-\\[150px\\]': 'h-37.5',
  'sm:h-\\[170px\\]': 'sm:h-42.5',
  'leading-\\[1\\.5\\]': 'leading-normal'
};

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      for (const [oldStr, newStr] of Object.entries(replacements)) {
        const regex = new RegExp(oldStr, 'g');
        content = content.replace(regex, newStr);
      }

      // Handle the hidden flex conflict
      content = content.replace(/hidden md:flex/g, '##TEMP##'); // preserve valid responsive classes
      content = content.replace(/flex hidden/g, 'hidden');
      content = content.replace(/hidden flex/g, 'hidden');
      content = content.replace(/##TEMP##/g, 'hidden md:flex');

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory(__dirname);
