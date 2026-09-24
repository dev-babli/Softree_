const fs = require('fs');
const filePath = 'src/app/services/amazon-bedrock-agentcore-development/components/AgentCoreSystems.tsx';
let code = fs.readFileSync(filePath, 'utf8');

// 1. Force one line by using flex-nowrap and reduce gaps
code = code.replace(/flex flex-wrap items-center justify-center w-full gap-x-2 gap-y-3 sm:gap-x-4 sm:gap-y-4 lg:gap-x-5 lg:gap-y-4 relative z-10 px-2 sm:px-0/g, 'flex flex-nowrap items-center justify-center w-full gap-x-1 sm:gap-x-2 lg:gap-x-3 relative z-10 px-1 sm:px-2 whitespace-nowrap overflow-x-auto no-scrollbar');

// 2. Decrease the font size further
code = code.replace(/text-\[8\.5px\] sm:text-\[9px\] xl:text-\[10px\] font-bold tracking-\[0\.05em\]/g, 'text-[6.5px] sm:text-[7.5px] lg:text-[8.5px] font-bold tracking-normal');

// 3. Make icons slightly smaller to match
code = code.replace(/h-7 w-7 sm:h-8 sm:w-8/g, 'h-6 w-6 sm:h-7 sm:w-7');
code = code.replace(/w-3\.5 h-3\.5 sm:w-4 sm:h-4 text-orange-600/g, 'w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange-600');
code = code.replace(/w-3 h-3 sm:w-4 sm:h-4 text-slate-300/g, 'w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-300');

fs.writeFileSync(filePath, code);
console.log("Forced single line and decreased font sizes.");
