import type { SanityClient } from "@sanity/client"

export async function uploadRemoteImage(
  client: SanityClient,
  url: string,
  filename: string,
  alt: string,
) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Failed to fetch image ${url}: ${res.status}`)
  }
  const buffer = Buffer.from(await res.arrayBuffer())
  const uploaded = await client.assets.upload("image", buffer, { filename })
  return {
    _type: "image" as const,
    asset: { _type: "reference" as const, _ref: uploaded._id },
    alt,
  }
}
