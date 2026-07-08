export async function suggestSlugFromTitle(title: string): Promise<string> {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  if (!slug) throw new Error('Could not derive slug from title')
  return slug.slice(0, 96)
}
