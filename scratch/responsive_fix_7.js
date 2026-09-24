const fs = require('fs');
const filePath = 'src/app/services/amazon-bedrock-agentcore-development/components/AgentCoreSystems.tsx';
let code = fs.readFileSync(filePath, 'utf8');

// 1. Decrease icon sizes in the array
code = code.replace(/w-6 h-6 lg:w-\[26px\] lg:h-\[26px\] text-\[\#FF6B2C\]/g, 'w-4 h-4 xl:w-5 xl:h-5 text-[#FF6B2C]');

// 2. Decrease the outer circle for the icon
code = code.replace(/h-10 w-10 sm:h-12 sm:w-12/g, 'h-8 w-8 sm:h-9 sm:w-9');

// 3. Decrease title text size
code = code.replace(/text-\[9\.5px\] sm:text-\[10\.5px\] xl:text-\[11px\] font-bold tracking-\[0\.08em\] block uppercase mb-1\.5/g, 'text-[7.5px] sm:text-[8.5px] xl:text-[8.5px] font-bold tracking-[0.05em] block uppercase mb-1');

// 4. Decrease description text size
code = code.replace(/text-\[9\.5px\] sm:text-\[10\.5px\] xl:text-\[10px\] leading-\[1\.35\] font-medium text-slate-500 block group-hover:text-slate-700 transition-colors duration-200 pr-1/g, 'text-[8px] sm:text-[9px] xl:text-[8.5px] leading-[1.3] font-medium text-slate-500 block group-hover:text-slate-700 transition-colors duration-200 pr-0.5');

// 5. Adjust padding to give more width to text (since icon is smaller now)
// Previously: xl:p-3 pl-8 sm:pl-10 lg:pl-9 xl:pl-10 rounded-lg
// Replace with: p-2 xl:p-2.5 pl-6 sm:pl-8 xl:pl-8 rounded-lg
code = code.replace(/xl:p-3 pl-8 sm:pl-10 lg:pl-9 xl:pl-10 rounded-lg/g, 'p-2 xl:p-2.5 pl-6 sm:pl-8 xl:pl-8 rounded-lg');
// Also it originally had p-2.5 sm:p-2.5 lg:p-2 before the xl:p-3 part. Let's just fix the whole string.
// Let's use a regex to capture everything between bg-white and rounded-lg
code = code.replace(/bg-white([^]+?)rounded-lg/g, 'bg-white p-2 xl:p-2.5 pl-7 sm:pl-9 xl:pl-8 rounded-lg');

fs.writeFileSync(filePath, code);
console.log("Right side cards font size, icon size, and padding adjusted.");
