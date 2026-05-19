import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  },
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
