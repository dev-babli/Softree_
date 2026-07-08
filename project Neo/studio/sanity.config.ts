import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { assist } from "@sanity/assist";
import { presentationTool } from "sanity/presentation";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "default",
  title: "Project Neo Studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",
  plugins: [
    structureTool(),
    visionTool(),
    unsplashImageAsset(),
    assist(),
    presentationTool({
      previewUrl: {
        origin: "http://localhost:3000",
        previewMode: {
          enable: "/api/draft",
        },
      },
      prepareOptions(context) {
        return {
          ...context,
          token: process.env.SANITY_API_READ_TOKEN,
        };
      },
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
