"use client";

// Placeholder SanityLive component
// Live Content API requires next-sanity v5+ with defineLive
// For now, this is a no-op component that satisfies the import
export function SanityLive() {
  return null;
}

// Fallback fetch function for when defineLive is not available
export async function sanityFetch<T>({ query }: { query: string }): Promise<T> {
  const { client } = await import('./client');
  return client.fetch(query) as Promise<T>;
}
