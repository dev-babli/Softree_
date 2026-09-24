const fs = require('fs');
const filePath = 'src/app/services/amazon-bedrock-agentcore-development/components/AgentCoreSystems.tsx';
let code = fs.readFileSync(filePath, 'utf8');

// 1. Remove the subtitle rendering block completely
const subtitleJSXRegex = /<span className="text-sm sm:text-\[13px\] xl:text-\[12px\] font-bold text-slate-900 leading-tight block mb-1">\s*\{cap\.subtitle\}\s*<\/span>/g;
code = code.replace(subtitleJSXRegex, '');

// 2. Increase the size of the title span and adjust margin
const titleRegex = /<span className=\{`text-\[8\.5px\] sm:text-\[9\.5px\] font-bold tracking-\[0\.1em\] block uppercase mb-0\.5 \$\{cap\.textClass\}`\}>/g;
code = code.replace(titleRegex, '<span className={`text-[9.5px] sm:text-[10.5px] xl:text-[11px] font-bold tracking-[0.08em] block uppercase mb-1.5 ${cap.textClass}`}>');

// 3. Slightly increase the description text size to fill the card
const descRegex = /<span className="text-\[9px\] sm:text-\[10px\] xl:text-\[9px\] leading-\[1\.3\] font-medium/g;
code = code.replace(descRegex, '<span className="text-[9.5px] sm:text-[10.5px] xl:text-[10px] leading-[1.35] font-medium');

// 4. Adjust the gap on the container (currently it's gap-3 lg:gap-0, change to gap-3 xl:gap-2)
// Since it's justify-between, adding a small gap ensures they don't squish too much, but it's mostly handled by justify-between.
code = code.replace(/gap-3 lg:gap-0 py-1 h-auto xl:h-\[550px\]/g, 'gap-3 xl:gap-0 py-2 h-auto xl:h-[550px]');

// 5. Adjust card inner padding slightly
code = code.replace(/xl:p-2\.5 pl-8 sm:pl-10 lg:pl-9 xl:pl-10 rounded-lg/g, 'xl:p-3 pl-8 sm:pl-10 lg:pl-9 xl:pl-10 rounded-lg');

fs.writeFileSync(filePath, code);
console.log("Subtitles removed and typography adjusted on right cards.");
