import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineCliConfig } from 'sanity/cli'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  },
  vite: (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...(config.resolve?.alias as Record<string, string> | undefined),
        '@': path.resolve(__dirname, 'src'),
      },
    },
  }),
  /**
   * Enable automatic TypeGen during development and build.
   * Types regenerate when schema or queries change.
   */
  typegen: {
    enabled: true,
    // Scan these files for GROQ queries
    path: './src/**/*.{ts,tsx,js,jsx}',
    // Schema file from extract (auto-generated)
    schema: './schema.json',
    // Output file for generated types
    generates: './sanity.types.ts',
    // Auto-type client.fetch() calls
    overloadClientMethods: true,
  },
})
