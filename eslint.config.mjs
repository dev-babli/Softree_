import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import softreeDesign from "./eslint-rules/index.js";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),

  // Custom homepage Design_Tokens enforcement rule
  // (homepage-about-design-language spec, Task 1.5).
  // Scoped strictly to homepage section directories.
  {
    files: [
      "src/components/sections/**/*.{ts,tsx,js,jsx}",
      "src/components/homepage-light/**/*.{ts,tsx,js,jsx}",
      "src/components/qc/homepage-light/**/*.{ts,tsx,js,jsx}",
    ],
    plugins: {
      "softree-design": softreeDesign,
    },
    rules: {
      "softree-design/no-untokenized-design-literals": "error",
    },
  },
]);

export default eslintConfig;
