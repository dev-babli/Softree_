const fs = require('fs');
const filePath = 'src/app/services/amazon-bedrock-agentcore-development/components/AgentCoreSystems.tsx';
let code = fs.readFileSync(filePath, 'utf8');

// 1. Remove overflow-x-auto and no-scrollbar from the parent
code = code.replace(/w-full overflow-x-auto no-scrollbar/g, 'w-full');

// 2. Change the inner container to use flex-wrap instead of flex-nowrap
code = code.replace(/flex flex-nowrap items-center justify-between sm:justify-center w-max sm:w-full min-w-full gap-2 sm:gap-4 lg:gap-6 relative z-10 whitespace-nowrap px-4 sm:px-0/g, 'flex flex-wrap items-center justify-center w-full gap-x-2 gap-y-3 sm:gap-x-4 sm:gap-y-4 lg:gap-x-5 lg:gap-y-4 relative z-10 px-2 sm:px-0');

// 3. Update the text span to decrease font size and ensure whitespace-nowrap on the text itself
code = code.replace(/<span className="typo-caption text-slate-900 uppercase select-none transition-colors group-hover:text-orange-600">/g, '<span className="text-[8.5px] sm:text-[9px] xl:text-[10px] font-bold tracking-[0.05em] text-slate-900 uppercase select-none transition-colors group-hover:text-orange-600 whitespace-nowrap">');

// 4. Slightly decrease the size of the target circle icon container
code = code.replace(/h-8 w-8 sm:h-10 sm:w-10/g, 'h-7 w-7 sm:h-8 sm:w-8');
code = code.replace(/w-4 h-4 sm:w-5 sm:h-5 text-orange-600 animate-pulse/g, 'w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-600 animate-pulse');

// 5. Update chevron size slightly smaller to match new font
code = code.replace(/w-4 h-4 sm:w-5 sm:h-5 text-slate-300/g, 'w-3 h-3 sm:w-4 sm:h-4 text-slate-300');

fs.writeFileSync(filePath, code);
console.log("Bottom strip made responsive and font size decreased.");
