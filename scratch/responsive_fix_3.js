const fs = require('fs');
const filePath = 'src/app/services/amazon-bedrock-agentcore-development/components/AgentCoreSystems.tsx';
let code = fs.readFileSync(filePath, 'utf8');

// 1. Change Inner Grid Spans
code = code.replace(/xl:col-span-6 flex flex-col justify-between/g, 'xl:col-span-7 flex flex-col justify-between');
code = code.replace(/xl:col-span-4 flex flex-col justify-between/g, 'xl:col-span-3 flex flex-col justify-between');

// 2. Adjust SVG Left Branches (450 -> 525, 465 -> 540, 475 -> 550)
code = code.replace(/M 450 (\d+) L 465 (\d+) L 475 (\d+)/g, 'M 525 $1 L 540 $2 L 550 $3');

// 3. Adjust SVG Right Branches (575 -> 650, 585 -> 660, 600 -> 675)
code = code.replace(/M 575 (\d+) L 585 (\d+) L 600 (\d+)/g, 'M 650 $1 L 660 $2 L 675 $3');

// 4. Change right Capabilities text size to be smaller since column is narrower now (span-3 instead of span-4)
code = code.replace(/text-sm sm:text-\[14px\] font-bold/g, 'text-sm sm:text-[13px] xl:text-[12px] font-bold');
code = code.replace(/text-\[9px\] sm:text-\[10px\] leading-\[1\.3\] font-medium/g, 'text-[9px] sm:text-[10px] xl:text-[9px] leading-[1.3] font-medium');

// 5. Optionally, make the stack title column slightly narrower to give even more room to the grid
code = code.replace(/sm:w-\[105px\]/g, 'sm:w-[100px]');

fs.writeFileSync(filePath, code);
console.log("Inner grid proportions updated and SVG recalculated.");
