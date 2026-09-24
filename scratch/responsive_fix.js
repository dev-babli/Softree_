const fs = require('fs');

const filePath = 'src/app/services/amazon-bedrock-agentcore-development/components/AgentCoreSystems.tsx';
let code = fs.readFileSync(filePath, 'utf8');

// 1. Change lg: to xl: for structural grid classes so it stacks earlier
// Outer grid
code = code.replace(/lg:grid-cols-12 gap-6 lg:gap-8/g, 'xl:grid-cols-12 gap-6 xl:gap-8');
code = code.replace(/lg:col-span-3/g, 'xl:col-span-3');
code = code.replace(/lg:col-span-9/g, 'xl:col-span-9');

// Inner grid
code = code.replace(/grid grid-cols-1 lg:grid-cols-12/g, 'grid grid-cols-1 xl:grid-cols-12');
code = code.replace(/lg:col-span-6/g, 'xl:col-span-6');
code = code.replace(/lg:col-span-2/g, 'xl:col-span-2');
code = code.replace(/lg:col-span-4/g, 'xl:col-span-4');

// Heights
code = code.replace(/lg:h-\[550px\]/g, 'xl:h-[550px]');
// SVG wrapper
code = code.replace(/hidden lg:block/g, 'hidden xl:block');
// Right side pl
code = code.replace(/lg:pl-3/g, 'xl:pl-3');
// Padding inside right card
code = code.replace(/lg:p-2 xl:p-2\.5/g, 'xl:p-2.5');
code = code.replace(/lg:pl-9 xl:pl-10/g, 'xl:pl-10');

// 2. Fix the left Stack cards wrapping issues
// Reduce width of the label from 130px to 110px
code = code.replace(/w-full sm:w-\[130px\] shrink-0 text-left/g, 'w-full sm:w-[105px] shrink-0 text-left');

// Change grid cols to give more breathing room on xl:
code = code.replace(/grid grid-cols-3 lg:grid-cols-5/g, 'grid grid-cols-3 xl:grid-cols-5');
code = code.replace(/grid grid-cols-3 lg:grid-cols-6/g, 'grid grid-cols-3 xl:grid-cols-6');

// Update the text styles: change break-words to break-normal, increase base size slightly, remove px-0.5 to save space
code = code.replace(/text-\[8\.5px\] lg:text-\[7\.5px\] xl:text-\[8px\] font-bold text-slate-700 group-hover:text-orange-600 leading-\[1\.1\] px-0\.5 break-words/g, 'text-[9.5px] xl:text-[9.5px] font-bold text-slate-700 group-hover:text-orange-600 leading-[1.15] break-normal');

// 3. Make the isometric block container a bit smaller on smaller xl screens so it fits
code = code.replace(/w-40 h-40 sm:w-52 sm:h-52/g, 'w-40 h-40 sm:w-48 sm:h-48 xl:w-52 xl:h-52');

fs.writeFileSync(filePath, code);
console.log("Responsive fixes applied successfully.");
