import { createClient } from "next-sanity";
import { config } from "./config";

export const client = createClient(config);

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
}) {
  return client.fetch<T>(query, params, {
    next: {
      revalidate: process.env.NODE_ENV === "production" ? 3600 : 0,
      tags,
    },
  });
}
