const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2024-01-01";

export const config = {
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
};

export function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }
  return v;
}

export const projectIdAsserted = assertValue(
  projectId,
  "NEXT_PUBLIC_SANITY_PROJECT_ID is not set"
);
export const datasetAsserted = assertValue(
  dataset,
  "NEXT_PUBLIC_SANITY_DATASET is not set"
);
