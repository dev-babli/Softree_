const fs = require('fs');
const filePath = 'src/app/services/amazon-bedrock-agentcore-development/components/AgentCoreSystems.tsx';
let code = fs.readFileSync(filePath, 'utf8');

// Replace the span classes
const searchRegex = /text-\[9\.5px\] xl:text-\[9\.5px\] font-bold text-slate-700 group-hover:text-orange-600 leading-\[1\.15\] break-normal w-full/g;
const replacement = 'text-[7px] sm:text-[7.5px] xl:text-[8px] font-bold text-slate-700 group-hover:text-orange-600 leading-[1.1] break-words w-full px-0.5';

code = code.replace(searchRegex, replacement);

fs.writeFileSync(filePath, code);
console.log("Font size decreased and break-words restored.");
